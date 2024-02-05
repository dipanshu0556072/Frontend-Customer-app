import { StyleSheet, Text, View,TouchableOpacity,Image ,ScrollView, TextInput,Modal} from 'react-native'
import React, { useEffect, useState } from 'react';
import { useCartContext } from '../Context/WomenContext';
import back from '../PlpScreen/images/back.png';
import confirm1 from './confirm1.png';
import confirm2 from './confirm2.png';
import pdf from './pdf.png';
import next from '../PlpScreen/images/next.png';
import needHelp from './question.png';
import { useLoginContext } from '../Login/LoginCartProvider';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
import { Rating, AirbnbRating } from 'react-native-elements';
import { useFocusEffect } from '@react-navigation/native';
import BottomNavigation from '../BottomNavigation';
import { Alert } from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import { useColorScheme,  SafeAreaView, StatusBar, Dimensions, Platform } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Progress from '../Progress';


const OrderStatus = ({navigation}) => {
  
  const {trackCurrentOrderId,deliveryOption,setReceiptData}=useCartContext();
  const {ip,token,popFromStack,pushToStack,
    currentPage, setCurrentPage,
    setChangeOrderStatus,OrderDate,setOrderDate}=useLoginContext(); 

    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState(null);
    


  

    const forNavigate=(page)=>{
      if(page==='mainHome'){
       setCurrentPage('mainHome');
       navigation.navigate('mainHome');
      }else{
        console.log(page+" "+currentPage[currentPage.length-1]);
        if(currentPage && currentPage[currentPage.length-1]!==page){
          pushToStack(page);
          navigation.navigate(page)
        }else{
          popFromStack(navigation);
        }  
      }
    }

  const orderStat=['CONFIRMED','SHIPPED','DELIVERED'];
  
  const handleReviewTextChange = (text) => {
    setReviewText(text);
  };

  const [reviewText, setReviewText] = useState('');
  const formatText = (text) => {
    const words = text.split(' ');
    let formattedText = '';
    let currentLineWords = 0;

    for (const word of words) {
      if (currentLineWords + word.length <= 20) {
        formattedText += `${word} `;
        currentLineWords += word.length + 1; // +1 for the space between words
      } else {
        formattedText += `\n${word} `;
        currentLineWords = word.length + 1;
      }
    }

    return formattedText.trim(); // Remove trailing space
  };

   const submitReview=async(itemId)=>{
      if(reviewText.length>0){
      // console.log("\n\nThis is the ID"+itemId);
      try {
        const response = await axios.post(`http://${ip}:5454/api/reviews/create`, {
          productId: itemId,
          review: reviewText,
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // Handle the response as needed
        setReviewText("");
        setModalVisible(false);
        setTimeout(()=>{
          handlePress();
        },500);
       
      } catch (error) {
        // Handle errors
        console.log("Got error in orderStatus.jsx in submit Review"+error);
      }      
      }
   }

   const [isModalVisible1, setModalVisible1] = useState(false);
   const handlePress = () => {
       setModalVisible1(true);
   };
   const closeModal = () => {
    setModalVisible1(false);
  };
  useEffect(()=>{
    if(isModalVisible1){
      setTimeout(()=>{
       setModalVisible1(false);
      },4000);
    }
  },[isModalVisible1]);


  useFocusEffect(
    React.useCallback(() => {
      // Fetch updated ratings when the screen comes into focus
      if (getOrderStatus && getOrderStatus.orderItems) {
        getOrderStatus.orderItems.forEach((item) => {
          getProductRating(item.product.id);
        });
      }
    }, [getOrderStatus])
  );
  const [userRating, setUserRating] = useState(0);
  const [productRatings, setProductRatings] = useState({});

  const [getOrderStatus,setGetOrderStatus]=useState([]);

  const route = useRoute();
  const orderId = route.params?.orderId;
  
  
  const ratingCompleted = (rating, productId) => {
    postRatingToBackend(productId, rating);
    getProductRating(productId);
 
  };
  useEffect(() => {
    // Fetch initial ratings when the component mounts
    if (getOrderStatus && getOrderStatus.orderItems) {
      getOrderStatus.orderItems.forEach((item) => {
        getProductRating(item.product.id);
      });
    }
    setChangeOrderStatus(getOrderStatus.orderStatus);
    setOrderDate(new Date(getOrderStatus.orderDate).toLocaleDateString('en-US', {
      weekday: 'short',
      day: 'numeric',
      month: 'short'
    }));
    
  }, [getOrderStatus]);



  const sendSuggestionPost = async (productId) => {
    try {
      const dataAdd = {
        productId: productId,
        review: suggestion,
      };

      const response = await axios.post(
        `http://${ip}::5454/api/reviews/create`,
        dataAdd,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      console.log('Review submitted successfully:', response.data);
      // Handle any additional actions after submitting the review
      // ...

      // Close the rating modal
     
    } catch (error) {
      console.error('Error submitting review:', error.message);
    }
  };

  const postRatingToBackend = async (prodId, rate) => {
    console.log(`Product ID: ${prodId}, Rating: ${rate}`);
  
    const dataAdd = {
      productId: prodId,
      rating: rate,
    };
  
    try {
      const response = await axios.post(
        `http://${ip}:5454/api/ratings/create`,
        dataAdd, // Pass the dataAdd object here
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      console.log("\n\n\nRating"+JSON.stringify(response.data));
      // Check the response from the backend
      console.log('Rating posted successfully:', response.data);
    } catch (error) {
      console.error('Error posting rating to backend:', error.message);
    }
  };
    // Function to get the rating for a specific product ID
    const getProductRating = async (productId) => {
      try {
        const response = await axios.get(`http://${ip}:5454/api/ratings/product/${productId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
  
        // Update the productRatings state with the received rating
        setProductRatings(prevRatings => ({
          ...prevRatings,
          [productId]: response.data.rating,  // Assuming the API returns a property called 'rating'
        }));
  
        console.log(`Rating for product ${productId}: ${response.data.rating}`);
      } catch (error) {
        console.error(`Error fetching rating for product ${productId}:`, error.message);
      }
    };
  
  useEffect(() => {
    // Perform some action when userRating changes
    console.log("User rating updated:", userRating);

    // You can call a function, make an API request, etc.
    // Example: sendRatingToServer(userRating);
  }, [userRating]); // This effect will re-run when userRating changes

  useEffect(()=>{
    //get Order Data
    const getOrderStatus1=async()=>{
      try {
        const response = await axios.get(`http://${ip}:5454/api/orders/${trackCurrentOrderId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,         
          },
        });
  
        // Handle the response data
        setGetOrderStatus(response.data);
        setReceiptData(response.data);
       
      } catch (error) {
        // Handle errors
        console.error('Error fetching Placed1Orderdata:', error);
      }
    }

    getOrderStatus1();
  },[token])
// Ensure trackCurrentOrder is defined before trying to use reduce
// Check if getOrderStatus and orderItems are defined
const totalDiscountedPrice = getOrderStatus && getOrderStatus.orderItems
  ? getOrderStatus.orderItems.reduce((total, orderItem) => {
      return total + (orderItem.discountedPrice || 0);
    }, 0)
  : 0;

  console.log(JSON.stringify(getOrderStatus));


  return (
   <View style={{flex:1,backgroundColor:'white'}}>
      {/* <Text>{JSON.stringify(getOrderStatus)}</Text> */}
   
      {/* <ExportPdf getOrderStatus={getOrderStatus} /> */}
     <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
      <TouchableOpacity onPress={() => {forNavigate('mainHome')}}>
        <Image
          source={{ uri: 'https://shorturl.at/ckGU2' }}
          style={{ width: 100, height: 100, marginLeft: '4%' }}
        />
      </TouchableOpacity>
      <TouchableOpacity
           onPress={()=>{popFromStack(navigation)}}
          >              
           <View style={{flexDirection:'row',alignItems:'center'}}>
              <View>
                   <Image source={back}  
                     style={{marginLeft:12}}/>
              </View>
              <View style={{marginLeft:'4%'}}>
              <Text style={{color:'black'}}>Track Order</Text>
              </View>
           </View>
      </TouchableOpacity>  
      
      <View style={{padding:'5%',marginLeft:'3%',flexDirection:'row',justifyContent:'space-between'}}>
                <View>        
                    <Text style={{color:'#00338D',}}>ORDER ID</Text>
                     <Text style={{color:'grey',fontSize:12,padding:1}}>KPMG-RT-4498
                     {getOrderStatus && getOrderStatus.id && (
                     <Text>{getOrderStatus.id}</Text>
                    )}
                   </Text>
                 </View>
                 <View>
                  <Text style={{color:'#00338D',}}>TOTAL</Text>
                  <Text style={{}}>₹ {totalDiscountedPrice}</Text>
                </View>
        </View>
        <Text style={{color:'#00338D',marginLeft:'8%'}}>PLACED ON</Text>
        <Text style={{color:'grey',fontSize:12,padding:1,marginLeft:'7%'}}>
        {getOrderStatus && (
                    <>
                      <Text> {new Date(getOrderStatus.orderDate).toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' })}</Text>
                    </>
                   )}

        </Text>
        <View style={{ height: '0.5%',backgroundColor:'#f7f5f5',marginTop:'4%'}} />
        <View style={{ borderRadius: 8, marginLeft: '4%', marginRight: '4%',marginTop:'4%'}}>
           <Text style={{color:'black',fontSize:16,}}>Shipping Address{OrderDate}</Text>

            {/* {
              placedOrder.map((item,index)=>(
                <>
                 <View key={index} style={{ marginBottom: 10,padding:12 }}>
                 <Text style={{fontWeight: '300', fontSize: 13.6,padding:'0.1%'}}>{item.shippingAddress.firstName}</Text>
                  <Text style={{fontWeight: '300', fontSize: 13.6,padding:'0.1%'}}>{item.shippingAddress.streetAddress}, {item.shippingAddress.city}</Text>
                  <Text style={{fontWeight: '300', fontSize: 13.6,padding:'0.1%'}}>{item.shippingAddress.state}, {item.shippingAddress.zipCode}</Text>
                  <Text st   yle={{fontWeight: '300', fontSize: 13.6,padding:'0.1%'}}>{item.shippingAddress.mobile}</Text>
                </View>

                </>
              ))
            } */}

      {getOrderStatus && getOrderStatus.shippingAddress && (
  <View style={{ marginBottom: 10,padding:12 }}>
    <Text style={{ fontWeight: '300', fontSize: 13.6, padding: '0.1%' ,color:"#5A5A5A"}}>{getOrderStatus.shippingAddress.firstName}</Text>
    <Text style={{ fontWeight: '300', fontSize: 13.6, padding: '0.1%' ,color:"#5A5A5A"}}>{getOrderStatus.shippingAddress.streetAddress}, {getOrderStatus.shippingAddress.city}</Text>
    <Text style={{ fontWeight: '300', fontSize: 13.6, padding: '0.1%' ,color:"#5A5A5A"}}>{getOrderStatus.shippingAddress.state}, {getOrderStatus.shippingAddress.zipCode}</Text>
    <Text style={{ fontWeight: '300', fontSize: 13.6, padding: '0.1%' ,color:"#5A5A5A"}}>{getOrderStatus.shippingAddress.mobile}</Text>
  </View>
)}


        


          </View>
          <View style={{backgroundColor:'#00338D',height:0.2}}/>
          <View style={{ height: '0.01%',backgroundColor:'#00338D'}} />
          <View style={{ height: '0.8%',backgroundColor:'#f7f5f5'}} />
          <Text style={{color:'black',fontWeight:'400',marginLeft:'4%',marginTop:'4%'}}>SHIPMENT 1 OF 1</Text>
          <Text style={{marginLeft:'4%',marginTop:'1%',fontWeight:'400'}}>Typically ships between 3-5 business days</Text>

          <View style={{padding:'3%'}}>
           <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',marginTop:'7%' }}>
              <Text style={{ fontSize: 14.6, color: '#00338D' }}>Expected Delivery Date</Text>
              <Text style={{ color: 'grey', fontSize: 12,marginRight:'4%' }}>
              {getOrderStatus && (
  <>
   
    <Text>
      {new Date(new Date(getOrderStatus.orderDate).setDate(new Date(getOrderStatus.orderDate).getDate() + 3))
        .toLocaleDateString('en-US', {
          weekday: 'long',
          day: 'numeric',
          month: 'short',
          year: 'numeric'
        })}
    </Text>
  </>
)}


              </Text>
          </View>

          <Progress/>
{/*           
          <View style={{ marginLeft: '4%', padding: '2%', flexDirection: 'row', justifyContent: 'space-between', marginTop: '6%' }}>
  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: '4%' }}>
      {getOrderStatus && getOrderStatus.orderItems && getOrderStatus.orderItems.length > 0 && (
        <>
          {getOrderStatus.orderItems.map((item, index) => (


                        <React.Fragment key={index}>
                        {['CONFIRMED','SHIPPED', 'DELIVERED'].includes(getOrderStatus.orderStatus) ? (
                          index === 0 ? (
                            <Image source={confirm2} style={{ width: 30, height: 30, marginRight: '4%' }} />
                          ) : (
                            null
                          )
                        ) : (
                          index === 0 ? (
                            <Image source={confirm1} style={{ width: 30, height: 30, marginRight: '4%' }} />
                          ) : (
                            null
                          )
                        )}
                      </React.Fragment>
          ))}
        </>
      )}
      <Text style={{ marginLeft: '6%' }}>Order Confirmed</Text>
    </View>
  </View>
  <Text style={{ color: 'grey', fontSize: 12, padding: 1, marginLeft: '8%', marginTop: '3%' }}>
    {getOrderStatus && ['CONFIRMED', 'SHIPPED', 'DELIVERED'].includes(getOrderStatus.orderStatus) && (
      <Text>
        {new Date(getOrderStatus.orderDate).toLocaleDateString('en-US', {
          weekday: 'short',
          day: 'numeric',
          month: 'short'
        })}
      </Text>
    )}
  </Text>
</View>
        
   
<View style={{ marginLeft: '4%', padding: '2%', flexDirection: 'row', justifyContent: 'space-between' }}>
  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: '4%' }}>
      {getOrderStatus && getOrderStatus.orderItems && getOrderStatus.orderItems.length > 0 && (
        <>
          {getOrderStatus.orderItems.map((item, index) => (
            <React.Fragment key={index}>
              {['SHIPPED', 'DELIVERED'].includes(getOrderStatus.orderStatus) ? (
                index === 0 ? (
                  <Image source={confirm2} style={{ width: 30, height: 30, marginRight: '4%' }} />
                ) : (
                  null
                )
              ) : (
                index === 0 ? (
                  <Image source={confirm1} style={{ width: 30, height: 30, marginRight: '4%' }} />
                ) : (
                  null
                )
              )}
            </React.Fragment>
          ))}
        </>
      )}
      <Text style={{ marginLeft: '9%' }}>Shipped</Text>
    </View>
  </View>
  <Text style={{ color: 'grey', fontSize: 12, padding: 1, marginLeft: '8%', marginTop: '3%' }}>
    {getOrderStatus && ['SHIPPED', 'DELIVERED'].includes(getOrderStatus.orderStatus) && (
      <Text>
        {new Date(getOrderStatus.orderDate).toLocaleDateString('en-US', {
          weekday: 'short',
          day: 'numeric',
          month: 'short'
        })}
      </Text>
    )}
  </Text>
</View>


<View style={{ marginLeft: '4%', padding: '2%', flexDirection: 'row', justifyContent: 'space-between' }}>
  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: '4%' }}>
      {getOrderStatus && getOrderStatus.orderItems && getOrderStatus.orderItems.length > 0 && (
        <>
          {getOrderStatus.orderItems.map((item, index) => (
            <React.Fragment key={index}>
              {['DELIVERED'].includes(getOrderStatus.orderStatus) ? (
                index === 0 ? (
                  <Image source={confirm2} style={{ width: 30, height: 30, marginRight: '4%' }} />
                ) : (
                  null
                )
              ) : (
                index === 0 ? (
                  <Image source={confirm1} style={{ width: 30, height: 30, marginRight: '4%' }} />
                ) : (
                  null
                )
              )}
            </React.Fragment>
          ))}
        </>
      )}
      <Text style={{ marginLeft: '9%' }}>Delivered</Text>
    </View>
  </View>
  <Text style={{ color: 'grey', fontSize: 12, padding: 1, marginLeft: '8%', marginTop: '3%' }}>
    {getOrderStatus && ['DELIVERED'].includes(getOrderStatus.orderStatus) && (
      <Text>
        {new Date(getOrderStatus.orderDate).toLocaleDateString('en-US', {
          weekday: 'short',
          day: 'numeric',
          month: 'short'
        })}
      </Text>
    )}
  </Text>
</View> */}









</View>
<View style={{ height: 0.3, backgroundColor: '#00338D',marginTop:'4%' }}/>

<View style={{ height: '0.5',backgroundColor:'#f7f5f5'}} />
<View style={{ borderRadius: 8, marginLeft: '4%', marginRight: '4%',marginTop:'4%'}}>
<View style={{ alignItems: 'flex-start', justifyContent: 'center', padding: '1%' }}>
  <Text style={{ color: 'black', fontSize: 16, backgroundColor: '#ededed',padding:'1%',fontWeight:'500' }}>
    List of Products
  </Text>
</View>
{getOrderStatus && getOrderStatus.orderItems && (
        <>
          {getOrderStatus.orderItems.map((item, index) => (
            <View key={index} style={{ padding: '3%' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={{ uri: item.product.imageUrl }} style={{ width: 80, height: 110 }} />
                <View style={{ marginLeft: '14%' }}>
                  <Text style={{ color: '#00338D', fontWeight: '500' }}>{item.product.brand}</Text>
                  <Text style={{ color: '#00338D', fontWeight: '300', fontSize: 12 }}>{item.product.title}</Text>
                  <Text style={{ marginTop: '2%', fontWeight: '300', marginTop: '12%' }}>Fit: {item.product.fit}</Text>
                  <View style={{}}>
                    <Text style={{ fontSize: 13 }}>Size: {item.size}</Text>
                    <Text style={{ fontSize: 13 }}>Qty: {item.quantity}</Text>
                  </View>
                  <Text>₹ {item.product.discountedPrice.toLocaleString('en-IN')}</Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '105%' }}>
  <Rating
    style={{ marginTop: '7%' }}
    ratingCount={5}
    showRating={false}
    imageSize={20}
    onFinishRating={(rating) => ratingCompleted(rating, item.product.id)}
    startingValue={productRatings[item.product.id] || 0}
  />
  <TouchableOpacity
    style={{ marginTop: '8%' }}
    onPress={() => {
      setSelectedItemId(item.product.id);
      setModalVisible(true);
    }}
  >
    <Text style={{ color: '#00338D', fontWeight: '500', fontSize: 12 }}>Tell Us More</Text>
  </TouchableOpacity>
</View>
<Modal
  animationType="slide"
  transparent={true}
  visible={isModalVisible}
  onRequestClose={() => setModalVisible(false)}
>
  <View style={styles.modalContainer}>
    {/* <View style={styles.modalContent}>
      <TouchableOpacity 
        onPress={() => setModalVisible(false)}>
          <Text style={{marginTop:'30%',marginRight:'73%' }}>╳</Text>
      </TouchableOpacity>
    </View>
    <Text>{`Tell us more about item with ID: ${selectedItemId}`}</Text>

    <View>
      <Text>hi</Text>
    </View> */}
    <View  style={styles.modalContent}>
    <View style={{ flexDirection: 'row', justifyContent: 'flex-end',justifyContent:"space-between",alignItems:'center',marginTop: '4%',}}>
      
    <Text style={{color:'black',fontWeight:'700',marginLeft:'4%',fontSize:18,marginTop: '1%',
                  fontFamily: "Montserrat"}}>FEEDBACK & REVIEW</Text>
                   {/* <Text>{reviewText}</Text> */}
      <TouchableOpacity onPress={() => setModalVisible(false)}>
       <Text style={{ marginTop: '40%', marginRight: '4%' }}>╳</Text>
      </TouchableOpacity>
    </View>
   <View style={{ borderBottomColor: 'grey', borderBottomWidth: 0.3, height: 0.2 ,marginTop:'2%'}} />
   {/* <Text>{`Tell us more about item with ID: ${selectedItemId}`}</Text> */}
     
   {getOrderStatus && getOrderStatus.orderItems && (
    <>
      {getOrderStatus.orderItems.map((item, index) => (
        <View key={index} style={{ margin:'1%'}}>
          {
            item.product.id===selectedItemId && 
            (<>
              <View style={{flexDirection:'row'}}>
              <Image source={{ uri: item.product.imageUrl }} style={{ width: 80, height: 80 }} />
                <View style={{marginLeft:'4%'}}>
                <Text style={{ color: '#00338D', fontWeight: '500' }}>{item.product.brand}</Text>
                  <Text style={{ color: '#00338D', fontWeight: '300', fontSize: 12 }}>{item.product.title}</Text>
                </View>

              </View>

            </>)
          }
        </View>
       ))}
    </>
   )}
      <View style={{ borderBottomColor: 'grey', borderBottomWidth: 0.3, height: 0.2 }} />
      <View>
        <Text style={{padding:'3%',color:'#00338D',fontWeight:'600',}}>How would you rate this product</Text>
        <View style={{justifyContent:"space-between",flexDirection:"row"}}>
        <Rating
        style={{marginLeft:'3%'}}
        ratingCount={5}
        showRating={false}
        imageSize={20}
        onFinishRating={(rating) => ratingCompleted(rating, item.product.id)}
        startingValue={productRatings[item.product.id] || 0}
       />
       <Text style={{marginRight:'4%',color:'#00338D',fontWeight:'700'}}>Loved it</Text>

        </View>
      </View>
      <View style={{borderWidth:0.4,borderRadius:12,marginTop:'8%',padding:'1%',height:300,margin:10,borderColor:'#D3D3D3'}}>
      <TextInput
        placeholder='start writing here'
        placeholderTextColor='grey'
        multiline
        onChangeText={handleReviewTextChange}
      />
    </View>
    <Text style={{ fontSize: 11, margin: 12 }}>
      By submitting a review, you give us your consent to publish your feedback publicly in accordance with 
      <Text style={{ color: '#00338D', fontWeight: '500' }}> Terms of Use </Text>
      and 
      <Text style={{ color: '#00338D', fontWeight: '500' }}> Privacy Policy</Text>.
    </Text>
    <TouchableOpacity
      style={{ padding: '3%', backgroundColor: reviewText.length>0 ? '#00338D' : '#c9cdd4', margin: 12 }}
      disabled={!reviewText} // Disable the button if reviewText is empty
      onPress={()=>submitReview(selectedItemId)}
    >
      <Text style={{ textAlign: 'center', color: 'white',fontWeight:'700' }}>Submit</Text>
    </TouchableOpacity>

  </View>
 </View>
</Modal>



{/* Rating Modal */}


              
            </View>
          ))}
        </>
      )}

   
</View>

{/* <Text>{JSON.stringify(placedOrder)}</Text> */}
<View style={{padding:1}}>

</View>

<View style={{ height: 0.3, backgroundColor: '#00338D',marginTop:'4%' }}/>
  
<View style={{ height: '0.5%',backgroundColor:'#f7f5f5'}} />
 


  <Text style={{color:'black',fontSize:16,marginLeft:'4%',marginTop:'4%'}}>Payment Summary</Text>

  <View style={{padding:'4%',borderColor:'#f7f5f5',borderWidth:4,marginLeft:'4%',marginTop:'4%',marginRight:'4%'}}>
    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
      <Text style={{fontWeight:'600',padding:'0.3%'}}>Sub Total</Text>
      <Text style={{color:'black'}}>₹ {totalDiscountedPrice}</Text>
    </View>
    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
      <Text style={{fontWeight:'600',padding:'0.3%'}}>Delivery Charges</Text>
   
      {
                    deliveryOption==='1'?
                    <Text style={{color:'#00A3A1'}}>50</Text>:
                    <Text style={{color:'#00A3A1'}}>Free</Text>
                   }

    </View>
    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
      <Text style={{fontWeight:'600',padding:'0.3%'}}>Offer Discount</Text>
      <Text style={{color:'black'}}>₹ 0</Text>
    </View>
    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
      <Text style={{fontWeight:'600',padding:'0.3%'}}>Total Paid Amount</Text>
      <Text style={{color:'#b31717'}}>₹ {totalDiscountedPrice}</Text>
    </View>
    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
      <Text style={{fontWeight:'600',padding:'0.3%'}}>Total Saving</Text>
      <Text style={{color:'#00A3A1'}}>₹ 0</Text>
    </View>
  </View>
  <View style={{
  flexDirection: 'row',
  padding:'2%',
  justifyContent: 'space-between',
  marginTop: '8%',
  marginBottom: '3%',
  marginLeft: '3.8%',
  marginRight: '7%',
  borderColor: '#f7f5f5',  // Corrected typo here
  borderWidth: 3,          // Corrected typo here
  alignItems: 'center',
  width:'92%'
}}>
  <TouchableOpacity style={{flexDirection:'row',alignItems:'center'}} 
    onPress={() => navigation.navigate('exportPdf')}>
    <Image source={pdf} style={{ width: 30, height: 30,marginRight:'14%'}} />
    <Text style={{ color: '#00338D',fontSize:17 }}>Download Invoice</Text>
  </TouchableOpacity>
  <Image source={next} style={{ width: 20, height: 16 }} />
</View>
<View style={{
  flexDirection: 'row',
  padding:'2%',
  justifyContent: 'space-between',
  marginTop: '1%',
  marginBottom: '14%',
  marginLeft: '3.8%',
  marginRight: '7%',
  borderColor: '#f7f5f5',  // Corrected typo here
  borderWidth: 3,          // Corrected typo here
  alignItems: 'center',
  width:'92%'
}}>
  <View style={{flexDirection:'row',alignItems:'center'}}>
    <Image source={needHelp} style={{ width: 30, height: 30,marginRight:'14%'}} />
    <Text style={{ color: '#00338D',fontSize:17,marginLeft:'2%' }}>Need Help</Text>
  </View>
  <Image source={next} style={{ width: 20, height: 16 }} />
</View>


<Modal
  visible={isModalVisible1}
  animationType="slide"
  transparent={true}
  onRequestClose={closeModal}
>
  <View>
    <View style={styles.modalContent1}>
      <Text style={{ padding: '1%', fontWeight: '600', color: 'white' }}>Successfully stored your feedback </Text>
    </View>
  </View>
</Modal>


  </ScrollView>
 
</View>
  )

}

export default OrderStatus

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',  // You can customize this color
    borderRadius: 8,
    padding: 10,
    width:300,
    height:70,
    backgroundColor:'white'

  },
  container1: {
    alignItems: 'center',
    width: '100%',
    height: Dimensions.get('screen').height,
    justifyContent: 'center',
  },
  button: {
    padding: 16,
    backgroundColor: '#E9EBED',
    borderColor: '#f4f5f6',
    borderWidth: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
},
  modalContent: {
    width: '100%',
    height: '140%',
    marginTop:'155%',
    backgroundColor: 'white',
    bottom:0,
    position:'fixed',
    borderRadius: 10,
    backgroundColor:'white',
},
  closeButton: {
    backgroundColor: '#00338D',
    padding: 16,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
  },
  modalContent1:{
    backgroundColor: '#00A3A1',
    borderRadius: 3.1,
    elevation: 5, // shadow on Android
    height: '5%',
    width: '120%',
    marginTop: '200%', // Adjust this value to position the modal properly
    padding:5,
  }
});
