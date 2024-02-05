ShopTrack


import { StyleSheet, Text, View,ScrollView,TouchableOpacity,Image} from 'react-native'
import React,{useEffect,useState} from 'react'
import { useLoginContext } from '../Login/LoginCartProvider';
import { useCartContext } from '../Context/WomenContext';
import axios from 'axios';
import StarRating from '../StarRating';
import star1 from '../star1.png';

const ShopTrack = ({navigation}) => {

   const{selectedAddress,allSavedAddress,orderItemPrice,placedOrder,setPlacedOrder,
         trackCurrentOrder,setTrackCurrentOrder,
         trackCurrentOrderId,setTrackCurrentOrderId,totalAmount}=useCartContext();
   
   const {ip,token,popFromStack,pushToStack,
          currentPage, setCurrentPage,
          currentPageIndex,setCurrentPageIndex,
          currentPageIndexCategory,setCurrentPageIndexCategory}=useLoginContext(); 
     
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
    
    const [loading, setLoading] = useState(true);


    const [feedbackRating, setFeedbackRating] = useState(0);

    const handleFeedbackRatingChange = (newRating) => {
      setFeedbackRating(newRating);
    };
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`http://${ip}:5454/api/orders/user`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
  
          setPlacedOrder(response.data);
        } catch (error) {
          console.error('Error fetching PlacedOrderdata1:', error);
        }
      }
  
      fetchData();
  
      return () => {
        setLoading(false); // Set loading to false when the component unmounts or the dependency changes
      };
    }, [token]);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          let orderIdToFetch;
  
          if (placedOrder && placedOrder.length > 0) {
            // If placedOrder is not null, set orderIdToFetch to the last ID
            orderIdToFetch = placedOrder[placedOrder.length - 1].id+1;
            // orderIdToFetch=orderIdToFetch+1;
            // Set trackCurrentOrderId to the last ID
            setTrackCurrentOrderId(orderIdToFetch);
            console.log("\n\n\nTrcal"+orderIdToFetch);
          } else {
            // If placedOrder is null, set orderIdToFetch to 1
            orderIdToFetch = 1;
            setTrackCurrentOrderId(orderIdToFetch)
          }
  
          const response = await axios.get(`http://${ip}:5454/api/orders/${orderIdToFetch}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
  
          setTrackCurrentOrder(response.data);
        } catch (error) {
          console.error('Error fetching PlacedOrderdata2:', error);
        }
      }
  
      fetchData();
  
      return () => {
        setLoading(false); // Set loading to false when the component unmounts or the dependency changes
      };
    }, [trackCurrentOrderId, placedOrder]);
  
    if (loading) {
      return <Text>Loading...</Text>;
    }
    let totalQuantity = 0;
totalQuantity = (trackCurrentOrder && trackCurrentOrder.orderItems && trackCurrentOrder.orderItems.length) ? (
  trackCurrentOrder.orderItems.reduce(
    (accumulator, orderItem) => accumulator + (orderItem?.quantity || 0),
    0
  )
) : 0;

    
 
  
console.log(JSON.stringify(trackCurrentOrder));

return (
  <View style={{flex:1,backgroundColor:'white'}}>
    {/* <Text>{trackCurrentOrderId}</Text> */}
   
  <TouchableOpacity onPress={() => {forNavigate('mainHome')}}>
      <Image
        source={{ uri: 'https://shorturl.at/ckGU2' }}
        style={{ width: 100, height: 100, marginLeft: '4%' }}
      />
    </TouchableOpacity>

      <ScrollView showsVerticalScrollIndicator={false}>
      {/* <Text>{JSON.stringify(placedOrder)}</Text> */}
    
      {/* {placedOrder.orderItems.map((orderItem, index) => (
        <Text key={index}>Quantity: {orderItem.quantity}</Text>
      ))} */}
      
       
      
        <View style={{backgroundColor:'#00338D',padding:'6%'}}>
          <Text style={{fontSize:24,textAlign:'center',color:'white',fontWeight:'700'}}>Thank You {'\n'}for Shopping with us</Text>
          <Text style={{color:'white',textAlign:'center',marginTop:'6%',fontWeight:'400',fontSize:16,marginBottom:'-3%'}}>We've received your order</Text>
        </View>
        <View style={{flexDirection:'row',justifyContent:'space-between',height:50,width:414,alignItems:'center',borderWidth:0.2,marginTop:'3%',borderColor:'grey'}}>

          <TouchableOpacity style={{width:'50%',padding:'3%'}} onPress={()=>{forNavigate('mainHome')}}>
              <Text style={{color:'#00A3A1',fontSize:16}}>CONTINUE SHOPPING</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{width:'50%',borderLeftWidth:0.2,borderColor:'grey',height:50}}
           onPress={()=>{navigation.navigate('pdf')}}>
              <Text style={{color:'#00A3A1',marginLeft:'34%',padding:'8%',fontSize:16}}>RATE US</Text>
          </TouchableOpacity>

        </View>
        {/* <Text>{JSON.stringify(placedOrder)}</Text> */}
          <Text style={{color:'black',fontSize:16,padding:'4%'}}>Order Details</Text>
         <View style={{borderRadius:8,borderWidth:0.2,marginLeft:'4%',marginRight:'4%',marginTop:'2%',borderColor:'grey'}}>
            <View style={{flexDirection:'row',justifyContent:'space-between',borderBottomWidth:0.2,borderColor:'grey'}}>
               <View style={{padding:'4%'}}>
                   <Text style={{color:'#00338D',}}>ORDER ID</Text>
                   <Text style={{color:'grey',fontSize:12,padding:1}}>KPMG-RT-4498
                   {trackCurrentOrder && trackCurrentOrder.id && (
                     <Text>{trackCurrentOrder.id}</Text>
                    )}
                   </Text>
               </View>
               <View style={{padding:'4%'}}>
                   <Text style={{color:'#00338D',}}>ORDER DATE</Text>
                   {/* <Text style={{color:'grey',fontSize:12,padding:1}}>Wedensday 05 apr 2023</Text> */}
                   <Text style={{color:'grey',fontSize:12,padding:1}}>
                   {trackCurrentOrder && (
                    <>
                      <Text> {new Date(trackCurrentOrder.orderDate).toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' })}</Text>
                    </>
                   )}

                   </Text>

               </View>
            </View>
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
              <View style={{padding:'4%',}}>
                <Text style={{color:'#00338D',fontWeight:'300',fontSize:16}}>Order value</Text>
                <Text style={{color:'#00338D',fontSize:15,fontWeight:'300'}}>QTY.</Text>
                <Text style={{color:'#00338D',fontSize:15,fontWeight:'300'}}>Payment Mode</Text>
                <Text style={{color:'#00338D',fontSize:15,fontWeight:'300'}}>Name</Text>
                <Text style={{color:'#00338D',fontSize:15,fontWeight:'300'}}>Mobile Number</Text>
              </View>
              <View style={{padding:'4%',borderLeftWidth:0.2,marginRight:'24%',borderColor:'grey', marginTop:'2%',}}>
                <Text style={{color:'grey',fontWeight:'400',fontSize:14}}>₹ {totalAmount}</Text>
                <Text style={{color:'grey',fontWeight:'400',fontSize:14}}>{totalQuantity}</Text>
                <Text style={{color:'grey',fontWeight:'400',fontSize:14}}>Credit Card</Text>
                <Text style={{color:'grey',fontWeight:'400',fontSize:14}}>
  {(trackCurrentOrder?.user?.firstName)} {(trackCurrentOrder?.user?.lastName)}
</Text>
              
                <Text style={{color:'grey',fontWeight:'400',fontSize:14}}>
  {trackCurrentOrder?.user?.mobile}
</Text>
    
              </View>
            
            </View>
         </View>
         <Text style={{color:'black',fontSize:16,padding:'4%'}}>Shipping Details</Text>

         {/* <View style={{ borderRadius: 8, borderWidth: 0.2, marginLeft: '4%', marginRight: '4%', marginTop: '2%', borderColor: 'grey', }}>
{allSavedAddress.map((address, index) => (
  index === selectedAddress && (
    <View key={index} style={{ marginBottom: 10, }}>
      <Text style={{ marginLeft: '3%', fontWeight: '400', fontSize: 14.6,marginLeft:'5%' ,marginTop:'3%'}}>{address.streetAddress}, {address.city}</Text>
      <Text style={{ marginLeft: '3%', fontWeight: '400', fontSize: 14.6 ,marginLeft:'5%' }}>{address.state}, {address.zipCode}</Text>
      <Text style={{ marginLeft: '3%', fontWeight: '400', fontSize: 14.6,marginLeft:'5%' , marginBottom: '6%' }}>{address.mobile}</Text>
    </View>
  )
))}
<Text style={{ textAlign: 'center', marginBottom: '3%',}}>Track your order</Text>
</View> */}
        <View style={{ borderRadius: 8, borderWidth: 0.2, marginLeft: '4%', marginRight: '4%', marginTop: '2%', borderColor: 'grey',marginBottom:'5%' }}>
        {trackCurrentOrder && trackCurrentOrder.shippingAddress && (
  <View style={{ marginBottom: 10, padding: 12 }}>
    <Text style={{ fontWeight: '400', fontSize: 14.6 }}>{trackCurrentOrder.shippingAddress.streetAddress}, {trackCurrentOrder.shippingAddress.city}</Text>
    <Text style={{ fontWeight: '400', fontSize: 14.6 }}>{trackCurrentOrder.shippingAddress.state}, {trackCurrentOrder.shippingAddress.zipCode}</Text>
    {/* Uncomment the following line if you have mobile in shippingAddress */}
    {/* <Text style={{ fontWeight: '400', fontSize: 14.6 }}>{trackCurrentOrder.shippingAddress.mobile}</Text> */}

    <TouchableOpacity onPress={() => { forNavigate('orderStatus') }}>
      <Text style={{ textAlign: 'center', color: '#b31717', textDecorationLine: 'underline',marginTop:'4%' }}>Track your order</Text>
    </TouchableOpacity>
  </View>
)}

        </View>
         
         {/* <Text style={{color:'black',fontSize:16,padding:'4%'}}>Shipping Details{selectedAddress}</Text>

         <View style={{borderRadius:8,borderWidth:0.2,marginLeft:'4%',marginRight:'4%',marginTop:'2%',borderColor:'grey',}}>
         {
                 allSavedAddress.map((address, index) => (
                  <View key={index} style={{ marginBottom: 10, }}>
                    {index === selectedAddress && (
                      <>
                       <Text style={{ marginLeft:'3%',fontWeight: '400', fontSize: 15.6 }}>{address.streetAddress}, {address.city}</Text>
                       <Text style={{ marginLeft:'3%', fontWeight: '400', fontSize: 15.6 }}>{address.state}, {address.zipCode}</Text>
                       <Text style={{ marginLeft:'3%', fontWeight: '400', fontSize: 15.6, paddingTop: '0.3%', marginBottom: '6%' }}>{address.mobile}</Text>
                     </>
                    )}
                 </View>
                ))}
              <View>
                <Text style={{textAlign:'center'}}>Track your order</Text>
              </View>

         </View> */}
   <View style={{ alignItems: 'flex-start', justifyContent: 'center', padding: '1%',marginLeft:'4%' }}>
    <Text style={{ color: 'black', fontSize: 16,padding:'1%',fontWeight:'500' }}>
      List of Products    
    </Text>
    {trackCurrentOrder && trackCurrentOrder.orderItems && (
      <>
       {trackCurrentOrder.orderItems.map((item, index) => (
          <View key={index} style={{padding:'3%'}}>
          <View style={{flexDirection:'row',alignItems:'center'}}>
            <Image source={{uri:item.product.imageUrl}} style={{width:80,height:110}}/>
            <View style={{marginLeft:'14%'}}>
              <Text style={{color:'#00338D',fontWeight:'500'}}>{item.product.brand}</Text>
              <Text style={{color:'#00338D',fontWeight:'300',fontSize:12}}>{item.product.title}</Text>
              <Text style={{marginTop:'2%',fontWeight:'300',marginTop:"12%"}}>Fit: {item.product.fit}</Text>
              <View style={{}}>
                <Text style={{fontSize:13}}>Size:{item.size}</Text>
                <Text style={{fontSize:13}}>Qty:{item.quantity}</Text>
              </View>
              <Text>₹ {item.product.discountedPrice.toLocaleString('en-IN')}</Text>
            </View> 
          </View>
        </View>
    ))}
      </>
    )}
    

  </View> 
 {/* <Text>{JSON.stringify(trackCurrentOrder.orderItems[0].quantity)}</Text> */}
 {/* {trackCurrentOrder.orderItems.map((orderItem, index) => (
        <Text key={index}>
          Item {index + 1}: Quantity: {orderItem.quantity}
        </Text>
      ))} */}
  <View style={{ backgroundColor: '#00338D', height: 0.3, marginTop: '4%'  }} />
  <View style={{ height: 8, backgroundColor: '#f7f5f5'}} />

  <View style={{ alignItems: 'flex-start', justifyContent: 'center', padding: '1%',marginLeft:'4%' }}>
    <Text style={{ color: 'black', fontSize: 16,padding:'1%',fontWeight:'500' }}>
      Rate your Experience
    </Text>
  </View>
  <Text style={{marginLeft:'6%',fontSize:16}}>How was your Overall Shopping Experience?</Text>
  <View style={{padding:'4%'}}>
   <View style={{flexDirection:'row',marginLeft:'18%'}}>
   <Image source={star1} style={{width:40,height:40}}/>
   <Image source={star1} style={{width:40,height:40}}/>
   <Image source={star1} style={{width:40,height:40}}/>
   <Image source={star1} style={{width:40,height:40}}/>
   <Image source={star1} style={{width:40,height:40}}/>
   </View>
  </View>

   </ScrollView>
  </View>
)
}

export default ShopTrack

const styles = StyleSheet.create({})
