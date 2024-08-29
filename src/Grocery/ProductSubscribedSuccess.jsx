import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Image, Alert,TouchableOpacity } from 'react-native';
import checked from '../Login/images/checked.png';
import { useCartContext } from '../Context/WomenContext';
import axios from 'axios';
import { useLoginContext } from '../Login/LoginCartProvider';
import { useGroceryContext } from './GroceryContext';


const ProductSubscribedSuccess = ({ navigation, route }) => {
  const {  streetaddress1,  mobile,orderId,setOrderId,redeemYouPoints,setRedeemYourPoints,addedMoney,setAddedMoney,setWalletBalance} = useCartContext();
  const {ip,token,popFromStack,pushToStack,
    currentPage, setCurrentPage,
    currentPageIndex,setCurrentPageIndex,
    currentPageIndexCategory,setCurrentPageIndexCategory,loginUserId,}=useLoginContext(); 
    const{setGrocerySubscribedDate,grocerySubscribedTime,setGrocerySubscribedTime,
      grocerySubscribedDate1,setGrocerySubscribedDate1,getLastSubscribedId,setGetLastSubscribedId,LeaveMessage,setLeaveMessage,
      subscribedSelectedDates,setSubscribedSelectedDates,groceryAllProduct,selectedTime,setSelectedTime}=useGroceryContext();

const {subscribedSelectedDays,setSubscribedSelectedDays,subscriptionEndDate, setSubscriptionEndDate,
       subscribedGroceryProductId,setWhichPageToNavigate,
       addressList,setAddressList,
       selectedDate, setSelectedDate,
       userName, setUserName,
       pinCode, setPinCode,
       streetAddress, setStreetAddress,
       mobileNumber, setMobileNumber,
       houseNumber, setHouseNumber,
       state, setState,
       city, setCity,
       selectedAddress,setSelectedAddress,
       subscriptionTimeSlot,setSubscriptionTimeSlot}=useGroceryContext();


   
       const clearCart = async () => {
        const header = {
          'Authorization': `Bearer ${token}`,
        };
        try {
          const response = await axios.delete(`http://${ip}:5454/api/cart/clear`, { headers: header });
    
        } catch (error) {
          console.log('Error delete cartItem:', error);
          // Handle the error as needed
        }
      };

    const forNavigate=(page)=>{
      console.log(page+" "+currentPage[currentPage.length-1]);
      if(currentPage && currentPage[currentPage.length-1]!==page){
        if(page==='mainBag'){
          setCurrentPage(currentPage.splice(-3));
        }
        pushToStack(page);
      }else{
        
        popFromStack(navigation);
      }
    } 
     useEffect(()=>{
      clearCart();
       setTimeout(()=>{
        setCurrentPage(['mainHome']);
        navigation.navigate('subscribedOrder');
       },3000);
    },[token]);
 
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={styles.container}>
      {/* <TouchableOpacity style={{backgroundColor:'white',width:'100%'}} onPress={()=>{forNavigate('mainHome')}}>
          <Image source={{ uri: 'https://shorturl.at/ckGU2' }} style={{height:100,width:100,marginLeft:'3%'}}/>
       </TouchableOpacity> */}
        <View style={{ justifyContent: 'center', width: '100%', flexDirection: 'row' }}>
          <Image source={checked} style={{ width: 100, height: 100, marginTop: '35%' }} />
        </View>
        <Text style={styles.text}>You've{'\n'} Successfully{'\n'}Subscribed Product</Text>
        {/* <TouchableOpacity onPress={()=>{forNavigate('subscribedItem')}}>
            <Text style={{marginTop:'24%',color:'white',fontSize:17,alignSelf:'center',textDecorationLine:'underline'}}>View Subscribed Products</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

export default ProductSubscribedSuccess;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#00338D',
    width: '100%',
    height: '100%',
  },
  text: {
    color: 'white',
    fontWeight: '700',
    fontSize: 28,
    textAlign: 'center',
    marginTop: '10%',
    textShadowColor: 'rgba(0, 0, 0, 0.5)', // Shadow color
    textShadowOffset: { width: 3, height: 5 }, // Shadow offset
    textShadowRadius: 5, // Shadow radius
  },
});
