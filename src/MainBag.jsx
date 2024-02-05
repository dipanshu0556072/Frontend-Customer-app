import React,{useEffect, useState,useRef, useMemo } from 'react';
import TopBar from './TopBar3';
import back from './PlpScreen/images/back.png';
import {Alert,TouchableWithoutFeedback ,Modal,StyleSheet,Text,View,Image,Button, TouchableOpacity, ScrollView,TextInput, FlatList, SafeAreaView} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { RadioButton } from 'react-native-paper';
import point from './PlpScreen/images/point.png';
import 'react-native-gesture-handler';
import { useCartContext } from './Context/WomenContext';
import shopBag from './PlpScreen/images/shopBag.webp'
import axios from 'axios';
import Payment1 from './Payment/Payment2';
import { useLoginContext } from './Login/LoginCartProvider';
import TopBar1 from './TopBar3';
import cross from './PlpScreen/images/close.png';
import bag from './PlpScreen/images/bag.png';
import heart from './PlpScreen/images/heart.png';
import down from './down.png';

const lastViewData=[
  {
    id:9,
    productImage:'http://surl.li/njtmm',
    productName:'Shampoo',
  },
  {
    id:10, 
    productImage:'https://shorturl.at/xKSX9',
    productName:'Women-Blue Jeans',
  },
  {
    id:11,
    productImage:'http://surl.li/niupv',
    productName:'Milk',
  },
  {
    id:12,
    productImage:'http://surl.li/njmyo',
    productName:'Belt',
  },
  {
    id:13,
    productImage:'http://surl.li/njmzf',
    productName:'Denim Jacket'
  },
 {
   id:14,
   productImage:'http://surl.li/njmzu',
   productName:'Pink Blazer'
 }
]

const MainBag = ({navigation}) => {
  const [bagGetData,setBagGetData]=useState([]);
  const [intialAmount,setInitailAmount]=useState(0);
  const {selectedBagItem,dataArray,DeleteBagItem,MoveToWishList,products,
         decreaseTotalAmount,setDecreaseTotalAmount,
         cartItem,setCartItem,totalAmount,setTotalAmount,
         profileAddress,setProfileAddress,setSelectedWishListItem,wishListData,setWishListData,allSavedAddress,setAllSavedAddress,
         isItForPlaceOrder,setIsItForPlaceOrder,
         deliveryOption,setDeliveryOption}=useCartContext();     
  const [couponCode, setCouponCode] = useState('');
  const [couponCodeError, setCouponCodeError] = useState(false);
  const [couponCodeGoodError, setCouponCodeGoodError] = useState(false);
  const {ip,token,popFromStack,pushToStack,
    currentPage, setCurrentPage,
    currentPageIndex,setCurrentPageIndex,
    currentPageIndexCategory,setCurrentPageIndexCategory}=useLoginContext();  const [remove1,setRemove1]=useState(0);
  const [productQuantities, setProductQuantities] = useState({});
  

  const scrollViewRef = useRef();
  const orderSummaryRef = useRef();
  const [orderSummaryYPosition, setOrderSummaryYPosition] = useState(0);
  const [cartCount, setCartCount] = useState(0);

//for updating the quantity 
  const [itemQuantity,setItemQuantity]=useState(0);
  const [itemQuantityId,setItemQuantityId]=useState(0);
  const [itemSize,setItemSize]=useState("");
//for modal visible
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalSizeVisible, setModalSizeVisible] = useState(false);

  // Fetch wishlist data
  const getWishlistData = async () => {
    try {
      const response = await axios.get(`http://${ip}:5454/api/wishlist/`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setWishListData(response.data);
      console.log('Updated Wishlist Data:', JSON.stringify(response.data));
    } catch (error) {
      console.error('Error fetching wishlist data:', error);
    }
  };

  useEffect(() => {
    getWishlistData();
  }, [token]);

  let sm = 0;
  const getCart=async()=> {
    try {
      const response = await axios.get(`http://${ip}:5454/api/cart/`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setSelectedWishListItem(response.data);
      setCartItem(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }  

  useEffect(() => {
    getCart();
    amountCalculation();

  }, [couponCodeGoodError,token,deliveryOption,intialAmount,totalAmount,itemQuantity,itemQuantityId]);
  useEffect(() => {
    if (itemQuantityId !== 0) {
      getIdQunatityToUpdateQuantity();
    }
    
  }, [itemQuantity, itemQuantityId]);
  
  useEffect(() => {
    amountCalculation();
  }, [cartItem,deliveryOption]);
  function amountCalculation(){
    
    if (cartItem && cartItem.cartItems && cartItem.cartItems.length > 0) {
 
      cartItem.cartItems.forEach((item, index) => {
        sm += (item.product.discountedPrice*item.quantity);
       
      });
    // Adjust totalAmount based on deliveryOption
    if (deliveryOption === '1') {
      sm += 50; // Add 50 for Express Delivery
    }
      setTotalAmount(sm);
      setCartCount(cartItem.cartItems.length);
    } 
    else {
      setTotalAmount(0);
      setCartCount(0);
    }
  }

  async function getIdQunatityToUpdateQuantity() {
    try {
      const url = `http://${ip}:5454/api/cart_items/${itemQuantityId}`;
      
      const response = axios.put(
        url,
        {
          quantity: itemQuantity,
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
  
      console.log('Response from the server:', response.data);
      // Handle the response from the server as needed
     // await new Promise(resolve => setTimeout(resolve, 500));

    } catch (error) {
      console.error('Error making the request:', error);
      // Handle the error as needed
    }
 
  }
  async function getIdSizeToUpdateSize() {
    try {
      const url = `http://${ip}:5454/api/cart_items/${itemQuantityId}`;
      
      const response = axios.put(
        url,
        {
          size: itemSize,
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
  
      console.log('Response from the server:', response.data);
      // Handle the response from the server as needed
     // await new Promise(resolve => setTimeout(resolve, 500));

    } catch (error) {
      console.error('Error making the request:', error);
      // Handle the error as needed
    }
 
  }

  // Memoize and sort cart items
  const sortedCartItems = useMemo(() => {
    if (cartItem && cartItem.cartItems) {
      return [...cartItem.cartItems].sort((a, b) => a.product.id - b.product.id);
    }
    return [];
  }, [cartItem]);
   

//getting cartItems
  useEffect(()=>{
    setTimeout(()=>{
      setCouponCodeError(false);
    },10000); 

   if(couponCodeGoodError){
    setCouponCodeError(false);
   }
  },[token,remove1,couponCodeError,totalAmount]);

 
useEffect(() => {
  if (couponCode === "IZFPK" && cartItem && cartItem.cartItems && totalAmount > 1100) {
    // Adjust totalAmount by reducing 1100
    setTotalAmount(prevTotalAmount => prevTotalAmount - 1100);
  }
}, [cartItem, totalAmount]);

  const handleApplyCoupon = () => {
    if(couponCode==="IZFPK" && cartItem && cartItem.cartItems && totalAmount>1100){
      setCouponCodeGoodError(true);
      setCouponCodeError(false);
    }else{
      setCouponCodeError(true);
    }
    console.log('Applying coupon:', couponCode);
  };

  let totalDiscount=0;
  if(cartItem && cartItem.cartItems){
    cartItem.cartItems.forEach((item, index) => {
      totalDiscount+=(item.discountPercent);
  
      console.log(item.product.category.name+" "+item.discountedPrice+" "+item.price+" "+parseInt(item.discountPercent));
    }); 
    cartItem.cartItems.forEach((item, index) => {
      console.log("hetyt"+`${item.product.category.name} ${item.discountedPrice} ${item.price} ${parseInt(item.discountPercent)}`);
    });  
  }

  
  console.log(JSON.stringify(cartItem));

    const renderItem = ({ item }) => (
    <View style={{ padding: 10, margin: 5, backgroundColor: '#e0e0e0' }}>
       <TouchableOpacity
         onPress={()=>navigation.navigate('PDP',item.id)}>
         <Image source={{ uri: item.productImage }} style={{ width: 100, height: 100 }} />
       </TouchableOpacity>
     <Text style={{textAlign:'center',padding:5,color:'black'}}>{item.productName}</Text>
    </View>
);
  




const removeBagItem=async(itemId,price)=>{
  
  console.log("ieiue"+itemId);
  await axios.delete(`http://${ip}:5454/api/cart_items/`+itemId,{ headers: {
    'Authorization': `Bearer ${token}`,         
  },}).then(response=>{
    console.log("\n\n\nID To Be Deleted\n\n\n"+price)
    setCartCount(cartCount-1);
    getCart();
   }
   ).catch(error=>{
    console.log("Error"+error);
   }
   );  
 }

function payOption(){
  if(cartItem && cartItem.user.addresses && cartItem.user.addresses.length>0){
    if (profileAddress && profileAddress.addresses && profileAddress.addresses.length > 0) {
      // Check and merge profile addresses into allSavedAddress
      const updatedSavedAddress = [...allSavedAddress]; // Create a copy of the existing addresses
    
      profileAddress.addresses.forEach((profileAddressItem) => {
        // Check if the profile address is unique
        const isProfileAddressUnique = !allSavedAddress.some((address) => (
          address.streetAddress === profileAddressItem.streetAddress &&
          address.city === profileAddressItem.city &&
          address.state === profileAddressItem.state &&
          address.pinCode === profileAddressItem.pinCode &&
          address.mobile === profileAddressItem.mobile
        ));
    
        // If the profile address is unique, add it to the updatedSavedAddress array
        if (isProfileAddressUnique) {
          console.log("\n\nYES:" + JSON.stringify(profileAddress));
          updatedSavedAddress.push(profileAddressItem);
        }
      });
    
      // Update the state with the new addresses
      setAllSavedAddress(updatedSavedAddress);
    }
    
    const forNavigate=(page)=>{
      console.log(page+" "+currentPage[currentPage.length-1]);
      if(currentPage && currentPage[currentPage.length-1]!==page){
        pushToStack(page);
        navigation.navigate(page)
      }else{
        popFromStack(navigation);
      }
    }
    forNavigate('orderSummary');
  }else{
    const forNavigate=(page)=>{
      console.log(page+" "+currentPage[currentPage.length-1]);
      if(currentPage && currentPage[currentPage.length-1]!==page){
        pushToStack(page);
        navigation.navigate(page)
      }else{
        popFromStack(navigation);
      }
    }

    forNavigate('AddressDetail');
    setCurrentPageIndex(-1);
    setCurrentPageIndexCategory(false);
    // navigation.navigate('AddressDetail', { editMode: false, selectedAddress: -1 })
  }
  setIsItForPlaceOrder(true);
 }

 console.log(JSON.stringify());
 const addToWish=async(id,size,qty,category,removeId,price)=>{

  // console.log("\n\n\n"+" "+id+" "+size+" "+qty+" "+category+" "+color+" "+p1+" "+p2);
  
  console.log(JSON.stringify(wishListData));
 
  const data={
    productId:id,
    size:size,
    quantity:1,
    category:category,
    color:'green',
 }
 console.log(JSON.stringify(data));

    try {
      const response = await axios.put(`http://${ip}:5454/api/wishlist/add`, data, {
        headers: {
          'Authorization': `Bearer ${token}`,         
         },
      });
      console.log(response.data);
      setWishListData((prevProducts) => {
        const newProducts = response.data;
        console.log("\n\n\nWishList:" + JSON.stringify(newProducts));
        return newProducts;
      });
      removeBagItem(removeId,price);
    } catch (error) {
      console.error('Error fetching WishListdata:', error);
    }
   
  }


  const handlePress = (itemId) => {
    setItemQuantityId(itemId);
    setModalVisible(true);
  };
  const handlePress1 = (itemId) => {
    setItemQuantityId(itemId);
    setModalSizeVisible(true);
  };
 
  
  const closeModal = () => {
    getIdQunatityToUpdateQuantity();
    getCart();
    amountCalculation();
    setModalVisible(false);
  };
  const closeModal1 = () => {
    getIdSizeToUpdateSize();
    getIdQunatityToUpdateQuantity();
    getCart();
    setModalSizeVisible(false);
  };

 
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  
  const handleItemPress = (item) => {
    if (item !== selectedItem) {
      setSelectedItem(item);
      setItemQuantity(item);
    }
  };
  const handleItemPress1 = (item) => {
    if (item !== selectedSize) {
      setSelectedSize(item);
      setItemSize(item);
    }
  };
  

  const renderItem1 = (item, index) => {
    const isSelected = selectedItem === item;

    return (
      <TouchableOpacity
        key={index}
        style={{
          width: 45,
          height: 45,
          borderRadius: 50,
          padding: '3%',
          borderWidth: 1,
          borderColor: '#00338D',
          marginRight: 10,
          alignItems: 'center',
          backgroundColor: isSelected ? '#00338D' : 'transparent',
        }}
        onPress={() => handleItemPress(item)}
      >
        <Text style={{ color: isSelected ? 'white' : '#00338D', fontSize: 16, fontWeight: '800' }}>{item}</Text>
      </TouchableOpacity>
    );
  };
  const renderItem2 = (item, index) => {
    const isSelected = selectedSize === item;

    return (
      <TouchableOpacity
        key={index}
        style={{
          width: 45,
          height: 45,
          borderRadius: 50,
          padding: '3%',
          borderWidth: 1,
          borderColor: '#00338D',
          marginRight: 10,
          alignItems: 'center',
          backgroundColor: isSelected ? '#00338D' : 'transparent',
        }}
        onPress={() => handleItemPress1(item)}
      >
        <Text style={{ color: isSelected ? 'white' : '#00338D', fontSize: 16, fontWeight: '800' }}>{item}</Text>
      </TouchableOpacity>
    );
  };


  function forNavigate(page){
    console.log(page+" "+currentPage[currentPage.length-1]);
    if(currentPage && currentPage[currentPage.length-1]!==page){
      pushToStack(page);
      navigation.navigate(page)
    }else{
      popFromStack(navigation);
    }
  }
console.log("\n\nCartItem"+JSON.stringify(cartItem));
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
     {/* <Text>{intialAmount}</Text> */}
     {/* <Text>{JSON.stringify(profileAddress)}</Text> */}

         <View style={{ padding: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
      <TouchableOpacity onPress={() => forNavigate('mainHome')}>
        <Image source={{ uri: 'https://shorturl.at/ckGU2' }} style={{ width: 100, height: 100 }} />
      </TouchableOpacity>
      <View style={{ flexDirection: 'row' }}>
        
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
  <TouchableOpacity onPress={() => forNavigate('mainBag')} style={{ marginRight: 10 }}>
    <Image source={bag} style={{ marginRight: '-5%', }} />
    {cartCount > 0 && (
      <View
        style={{
          position: 'absolute',
          backgroundColor: 'red',
          borderRadius: 10,
          width: 20,
          height: 20,
          justifyContent: 'center',
          alignItems: 'center',
          top: -5,
          right: -5,
        }}
      >
        <Text style={{ color: 'white' }}>{cartCount}</Text>
      </View>
    )}
  </TouchableOpacity>
  <TouchableOpacity onPress={() => forNavigate('WishList')} style={{ marginLeft: 10 }}>
    <View style={{ marginLeft: '4%', }}>
      <Image source={heart} style={{}} />
    </View>
  </TouchableOpacity>
</View>

      </View>
    </View>
      <View style={{flexDirection:'row',alignItems:'center',}}> 
     
        <TouchableOpacity
            
            onPress={() => popFromStack(navigation)}
          >              
           <View style={{flexDirection:'row',alignItems:'center'}}>
              <View>
                   <Image source={back}  
                     style={{marginLeft:12}}/>
              </View>
              <View style={{marginLeft:'10%'}}>
              <Text style={{color:'black'}}>Cart</Text>
              </View>
           </View>
      </TouchableOpacity> 
      
     </View>    
        {/* <Text>{currentPage}</Text> */}
        <ScrollView ref={scrollViewRef} showsVerticalScrollIndicator={false}>

        {
        cartItem && cartItem.cartItems && cartItem.cartItems.length<=0 && (
          <>
           <View style={{flexDirection:'row',justifyContent:'center',padding:'10%'}}>
            <Image source={shopBag} style={{width:300,height:249}}/> 
           </View>
           <View style={{padding:8}}>
            <Text style={styles.heading}>Add from Last Viewed</Text>
              <SafeAreaView>
                <FlatList
                  nestedScrollEnabled={true}
                  showsHorizontalScrollIndicator={false}
                  data={lastViewData}
                  renderItem={renderItem}
                  keyExtractor={(item)=>{item.id}}
                  horizontal={true}
                />
              </SafeAreaView>
           </View>
           <View style={{marginLeft:'4%'}}>
             <View style={{}}>
                <View style={{flexDirection:'row',marginTop:'2%',width:420}}>
                  <View style={{width:'20%',}}>
                  <Image source={{uri:'http://surl.li/nimlv'}} style={{width:80,height:78}}/>
                 </View>
                 <View style={{padding:6,backgroundColor:'#fce1e3',width:'70%'}}>
                    <Text style={{fontWeight:'500',color:'black'}}>Buying for someone else</Text>
                    <Text style={{fontSize:12}}>Add a gift wrap and a personalized message {'\n'}to make them feel special</Text>
                    <Text style={{fontSize:12}}>Only for ₹50</Text>
                 </View>
               </View>   
             </View>
           </View>
          </>
         )
        }
        
        {
         cartItem &&  cartItem.cartItems &&  cartItem.cartItems.length>0 &&(
            <>
                    <View>
                      <Text style={{color:'black',marginLeft:'7%',fontSize:17,marginTop:'6%',fontWeight:'400'}}>Delivery option available </Text>
                      <Text style={{marginLeft:'7%',fontSize:15,}}>Please select delivery option</Text>
                      <View style={{flexDirection:'row',justifyContent:'space-around',padding:'4%'}}>
                       <RadioButton
                        value="0"
                        status={deliveryOption === '0' ? 'checked' : 'unchecked'}
                        onPress={() => setDeliveryOption('0')}
                        color="black" 
                        />
                        <Text style={{color:'black'}}>Standard{"\n"}Delivery</Text>
                       <RadioButton
                        color="black" 
                        value="1"
                        status={deliveryOption === '1' ? 'checked' : 'unchecked'}
                        onPress={() => setDeliveryOption('1')}
                        />
                        <Text style={{color:'black'}}>Express{"\n"}Delivery</Text>
                       <RadioButton
                        color="black" 
                        value="0"
                        status={deliveryOption === '2' ? 'checked' : 'unchecked'}
                        // onPress={() => setDeliveryOption('2')}
                        />
                        <Text style={{color:'black'}}>Express Store{"\n"}Pick Up</Text>
                      </View>
                    </View>
          
          
                    {/* {
                    sortedWishlist.length > 0 ? (
                     <>
                     <View style={{ height: 1, backgroundColor: '#00338D', marginTop: '4%', marginBottom: '4%' }} />
                      {sortedWishlist.map((item) => (
                       <View key={item.id}>
                      </View>
                     ))}
                    </>
                    ) : (
                     <>
                     </>
                    )
                   } */}
       

            {

              cartItem.cartItems.map((item, index) => (
              <>  
                <View key={index}>

                    <View style={{ height: 1, backgroundColor: '#00338D' }} />
                    <View style={{  flexDirection: 'row', padding: 14, marginTop: '4%' }}>
                
                         <Image source={{ uri: item.product.imageUrl }} style={{ width: 130, height: 150, borderRadius: 12 }} />
                 
                      <View style={{ padding: 7,marginLeft:'5%'}}>
                        <Text style={{ fontWeight: 'bold', color: 'black'}}>{item.product.brand}</Text>
                        <Text style={{ color: 'black', fontSize: 10,padding:'1%'  }}>{item.product.title}</Text>
                        <View style={{ flexDirection: 'row',alignItems:'center' }}>
                          <Text style={{ color: 'black' ,padding:'1%' }}>₹{item.product.discountedPrice} / ₹ </Text>
                          <Text style={{ color: 'black', textDecorationLine: 'line-through' }}>{item.product.price}</Text>
                          {
                            item.discountPercent > 0 ?
                              <Text style={{ color: '#A4343A', marginLeft: '1%',fontSize:10 }}> {item.discountPercent}% OFF</Text>
                              :
                              <Text></Text>
                          }
                        </View>
          
                <View style={{ flexDirection: 'row', alignItems: 'center', padding: 5,justifyContent:'space-between' }}>
                  <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', backgroundColor:'#D3D3D3',padding:'3%',borderRadius:12}}
                      onPress={()=>handlePress1(item.id)}>
                  <Text style={{ marginRight: 5,fontWeight:'900',color:'black',fontSize:14}}>Size:</Text>
                  <Text style={{color:'black',fontWeight:'400',}}>{item.size}</Text>
                  <Image source={down} style={{width:13,height:17}}/>
                  </TouchableOpacity>
                  <TouchableOpacity style={{flexDirection:'row',alignItems:'center',backgroundColor:'#D3D3D3',padding:'3%',borderRadius:14}}
                      onPress={()=>handlePress(item.id)}>
                    <Text  style={{ color: 'black', marginLeft: '1%',fontSize:14,fontWeight:'700',color:'black' }}>Qty:</Text>
                    <Text style={{color:'black',fontWeight:'400'}}> {item.quantity}</Text>
                    {/* {
                    cartItem && cartItem.cartItems && cartItem.cartItems.length>0 && (<>
                    {
                    cartItem.cartItems.map((item, index) => (
                    <Text key={index}>{}</Text>
                    ))
                   }
                  </>)
                  } */}

                    <Image source={down} style={{width:13,height:17}}/>
                  </TouchableOpacity>
                </View>
                <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeModal}
      >
        <TouchableWithoutFeedback>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
          <ScrollView horizontal  showsHorizontalScrollIndicator={false} >
          <View style={{ flexDirection: 'row', width: 470 ,padding:'4%' }}>
                  {[1, 2, 3, 4, 5, 6, 7,8].map((item, index) => renderItem1(item, index))}
            </View>
         </ScrollView>
         <TouchableOpacity  onPress={() => {
    closeModal();
    
  }}style={{backgroundColor:'#00338D',}}>
               <Text style={{textAlign:'center',color:'white',padding:'1.4%',fontSize:13,fontWeight:'500'}}>CLOSE</Text>
    </TouchableOpacity>

          </View>
        </View>

        </TouchableWithoutFeedback>
       
      </Modal>
      <Modal
        visible={isModalSizeVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeModal1}
      >
        <TouchableWithoutFeedback>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
          <ScrollView horizontal  showsHorizontalScrollIndicator={false} >
          <View style={{ flexDirection: 'row', width: 470 ,padding:'4%' }}>
                  {["S", "M", "L"].map((item, index) => renderItem2(item, index))}
            </View>
         </ScrollView>
         <TouchableOpacity  onPress={() => {
    closeModal1();
    
  }}style={{backgroundColor:'#00338D',}}>
               <Text style={{textAlign:'center',color:'white',padding:'1.4%',fontSize:13,fontWeight:'500'}}>CLOSE</Text>
    </TouchableOpacity>

          </View>
        </View>

        </TouchableWithoutFeedback>
       
      </Modal>


                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: '3%' }}>
                          <Image source={{ uri: 'https://shorturl.at/cktvN' }} style={{ width: 20, height: 20 }} />
                          <Text style={{ fontSize: 11, color: '#484848', padding: 5 }}>15 days store exchange available</Text>
                        </View>
                      </View>
                      <TouchableOpacity onPress={() => removeBagItem(item.id,item.product.discountedPrice)}>
                        <Image source={cross} style={{ width: 13, height: 14 }} />
                      </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                      <TouchableOpacity
                        style={{ width: '50%', padding: 12, marginTop: '1%', borderWidth: 0.5, borderRightWidth: 0 }}
                        onPress={() => removeBagItem(item.id,item.product.discountedPrice)}
                      >
                        <Text style={{ textAlign: 'center', fontSize: 16, color: '#000000' }}>Remove 
                        
                         {/* {item.product.discountedPrice}{item.product.category.name} */}
                        
                        </Text>
                      </TouchableOpacity>
                      {/* const data={
    productId:itemId,
    size:'M',
    quantity:1,
    category:"Men formal",
    color:'blue'
 } */}
  

  <TouchableOpacity
    style={{ width: '50%', padding: 12, borderWidth: 0.5, marginTop: '1%' }}
    onPress={()=>{addToWish(item.product.id,'M',1,item.product.category.name,item.id,item.product.discountedPrice)}}
>
    <Text style={{ textAlign: 'center', fontSize: 16, color: '#00338D' }}>Move to Wishlist</Text>
</TouchableOpacity>


  
                    </View>
                  </View>





                 </> 
            ))
            }
                
                  <View style={{padding:12}}>
              <View style={{marginTop:'4%'}}>
                <Text style={styles.heading}>Apply Coupons</Text>

                <View style={{flexDirection:'row',width:420,marginTop:'4%',}}>
                    <View style={{width:'50%',height:'90%',borderWidth:0.4,borderRadius:5}}>
                      <TextInput
                        style={{borderRadius:4}}
                        placeholder='Enter coupon code'
                        maxLength={8}
                        value={couponCode}
                        onChangeText={(text) => setCouponCode(text)}
                      /> 
                    </View>
                    <View style={{textAlign:'center',alignItems:'center',flexDirection:'row',marginLeft:'15%'}}>
                        <TouchableOpacity style={{padding:'4%',width:'50%',backgroundColor:'#D6D6D6',borderRadius:6}}
                         onPress={handleApplyCoupon}>
                          <Text style={{textAlign:'center',color:'black'}}>APPLY</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {
              couponCodeError?
              <Text style={{textAlign:'center',marginTop:'2%',color:'#d10808'}}>coupon not valid!</Text>:
              <Text></Text>
             }
            {
              couponCodeGoodError?
              <Text style={{textAlign:'center',padding:'1%',color:'green'}}>coupon applied successfully!</Text>:
              <Text style={{textAlign:'center',padding:'1%',color:'green'}}></Text>
             }


                <View style={{flexDirection:'row',marginTop:'2%',width:420}}>
                 <View style={{width:'20%',}}>
                  <Image source={{uri:'http://surl.li/nimlv'}} style={{width:80,height:78}}/>
                 </View>
                 <View style={{padding:6,backgroundColor:'#fce1e3',width:'70%'}}>
                    <Text style={{fontWeight:'500',color:'black'}}>Buying for someone else</Text>
                    <Text style={{fontSize:12}}>Add a gift wrap and a personalized message {'\n'}to make them feel special</Text>
                    <Text style={{fontSize:12}}>Only for ₹50</Text>
                 </View>
                </View>  
                <View style={{marginTop:'4%'}} 
                   ref={orderSummaryRef}
                   onLayout={(event) => {
                   const { y } = event.nativeEvent.layout;
                   setOrderSummaryYPosition(y);
                  }}>
                  <Text style={{color:'black',fontWeight:'600',fontSize:16,}} 
                  >Order Summary</Text>
                  <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                   <Text style={{marginTop:"4%",padding:"1%",fontWeight:'500',color:'#aba9a9'}}>Sub Total</Text>
                   
                   <Text style={{marginTop:"4%",padding:"1%",fontWeight:'500',color:'black'}}>₹{totalAmount}</Text>
                  </View>
                  <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                   <Text style={{padding:"1%",fontWeight:'500',color:'#aba9a9'}}>Delivery Charge</Text>
                   
                   {
                    deliveryOption==='1'?
                    <Text style={{padding:"1%",fontWeight:'500',color:'#00A3A1'}}>50</Text>:
                    <Text style={{padding:"1%",fontWeight:'500',color:'#00A3A1'}}>Free</Text>
                   }
                  </View>
                  <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                   <Text style={{padding:"1%",fontWeight:'500',color:'#aba9a9'}}>Offer discount</Text>
                   {
  couponCodeGoodError ?
    <Text style={{ padding: "1%", fontWeight: '500', color: '#00A3A1' }}>₹ {decreaseTotalAmount}</Text>
    :
    <Text style={{ padding: "1%", fontWeight: '500', color: '#00A3A1' }}>₹ 0</Text>  
}

                  </View>
                </View>
 
              </View>
           </View> 


           <View style={{flexDirection:'row',padding:8,borderWidth:0.3,justifyContent:'space-between'}}>
                <View>
                  <Text style={{fontWeight:'bold',color:'#aba9a9',}}>Total Payable Amount</Text>
                </View>
                <View style={{flexDirection:'row',justifyContent:'flex-end'}}>
                  <Text style={{color:'#A4343A',}}>₹ {totalAmount}</Text>
                </View>
           </View>
           <View style={{flexDirection:'row',padding:8,borderWidth:0.3,justifyContent:'space-between'}}>
                <View>
                  <Text style={{fontWeight:'bold',color:'#aba9a9'}}>Total Saving</Text>
                </View>
                
                <View style={{flexDirection:'row',justifyContent:'flex-end'}}>
                  
                  {
  couponCodeGoodError ?
  <Text style={{color:'#A4343A',}}>₹ {decreaseTotalAmount}</Text>
    :
    <Text style={{color:'#A4343A',}}>₹ 0</Text> 
}
                </View>
           </View>


           <View style={{flexDirection:'row',padding:8,borderWidth:0.3,borderBottomWidth:0,justifyContent:'space-between'}}>
                <View>
                  {/* <Text style={{fontWeight:'bold'}}>Total Savings</Text> */}
                </View>
                <View>
                  {/* <Text style={{color:'#00A3A1',marginLeft:'72%'}}>₹{totalDiscount}</Text> */}
                </View>
           </View>            
           <View style={{flexDirection:'row',borderWidth:0.3,marginTop:'4%',width:'85%',marginLeft:'4%',marginBottom:'6%',backgroundColor:'#f0eded',}}>
                <View style={{}}>
                  <Image source={point}/>
                </View>
                <View style={{marginLeft:'25%',alignItems:'center'}}>
                  <Text style={{textAlign:'center'}}>You’ll earn 400 reward points {'\n'}from this order</Text>
                </View>
           </View>            
           <View style={{padding:8}}>
            <Text style={styles.heading}>Add from Last Viewed</Text>
              <SafeAreaView>
                <FlatList
                  nestedScrollEnabled={true}
                  data={lastViewData}
                  renderItem={renderItem}
                  keyExtractor={(item)=>{item.id+9}}
                  horizontal={true}
                />
              </SafeAreaView>
           </View>            
            </>
          )

        }        
       </ScrollView>
       {
        
        cartItem && cartItem.cartItems && cartItem.cartItems.length>0  && 
       <View style={{flexDirection:'row',width:400,height:100,padding:'2%',justifyContent:'space-between',alignItems:'center'}}>
             <View style={{width:'40%',justifyContent:'center',marginLeft:'4%'}}>
             <TouchableOpacity 
  onPress={() => {
    scrollViewRef.current.scrollToEnd({ animated: true });
  }}
>
                  <Text style={{fontSize:30,color:'#00338D'}}>₹{totalAmount}</Text>
                  <Text style={{textDecorationLine:'underline',}}>View Details</Text>
                </TouchableOpacity>
               
             </View>
             <TouchableOpacity style={{backgroundColor:'#00338D',width:'45%',justifyContent:'center',height:'50%',borderRadius:3}}
              onPress={()=>{payOption()}}
             >
                 
                    <Text style={{color:'white',fontWeight:'bold',fontSize:16,textAlign:'center'}}>PLACE ORDER</Text>
                 
             </TouchableOpacity>
             
           </View>
}
    </View>
  )
}

export default MainBag

const styles={
  container:{
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
      marginBottom:'5%'
  },
  head:{
      color:'black',
      fontSize:14,
      fontWeight:'500',
  },
  heading:{
      color:'black',
      fontSize:14,
      fontWeight:'500',
  },
  subheading:{
      fontSize:13,
  },
  input: {
      height: 40,    
      borderWidth:0.4,
      marginTop: 10,
      marginRight: 10,
      width:'60%',
      borderRadius: 5,
  },
    modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
    backgroundColor: 'rgba(0, 0, 0, 0.2)', // semi-transparent background
  },
  modalContent: {
    backgroundColor: 'white',

    borderRadius: 10,
    elevation: 5, // shadow on Android
    height:'13%',
    width:'100%',
    marginTop:'183%'
  },
}

