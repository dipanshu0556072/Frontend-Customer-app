import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Image,Alert } from 'react-native';
import checked from '../Login/images/checked.png';
import { useCartContext } from '../Context/WomenContext';
import axios from 'axios';
import { useLoginContext } from '../Login/LoginCartProvider';

const PaymentSuccess = ({ navigation, route }) => {
  const { userName, streetaddress1, city, state, pinCode, mobile,orderId,setOrderId,redeemYouPoints,setRedeemYourPoints,
    isCouponApplied,deliveryOption,selectedStoreId
  } = useCartContext();
  const {ip,token,popFromStack,pushToStack,
    currentPage, setCurrentPage,
    currentPageIndex,setCurrentPageIndex,
    currentPageIndexCategory,setCurrentPageIndexCategory,loginUserId}=useLoginContext(); 

  function createOrder(){
    Alert.alert("hu"+userName+"-> "+mobile +" "+ city +" "+ pinCode +" "+ state+" "+ streetaddress1);
    if (
      userName && mobile && city && pinCode && state && streetaddress1
    ) {
      const userNameArray = userName.split(' ');
      const dataAdd ={
        firstName:userNameArray[0],
        lastName:userNameArray[1],
        streetAddress:streetaddress1,
        city:city,
        state:state,
        zipCode:pinCode,
        mobile:mobile
    }

      console.log('\n\n\n\n\ndataAdd', JSON.stringify(dataAdd));
      console.log('\n\ndataUserName',userNameArray[0]+" "+userNameArray[1]+" "+
                 streetaddress1+" "+city+" "+state+" "+pinCode+" "+mobile);

                 if(redeemYouPoints && redeemYouPoints.length>0){
                  nowRedeemYourPointsManually();
               } 
                 
      //if user choosed storePickUp
      if(deliveryOption=='2'){
        axios.post(`http://${ip}:5454/api/orders/?storePickupId=${selectedStoreId}`, dataAdd, {
          headers: {
            'Authorization': `Bearer ${token}`,         
          },
        }).then(response => {
            // Handle successful response
            console.log(response.data);
            // Additional logic can be added here if needed
            deleteCartItems();
          })
          .catch(error => {
            console.error('Error making API request:', error);
          });
      }else{
        // Make a POST request for creating  normal order
   
        axios.post(`http://${ip}:5454/api/orders/`, dataAdd, {
          headers: {
            'Authorization': `Bearer ${token}`,         
          },
        }).then(response => {
            // Handle successful response
           
            console.log(response.data);
            // Additional logic can be added here if needed
       
            deleteCartItems();
          })
          .catch(error => {
            // Handle error
            console.error('Error making API request:', error);
          });
      }
      Alert.alert(JSON.stringify("jjkjkjkd"));
    }
    
  }

  useEffect(() => {
    
    //for creating new Order 
    createOrder();
    //If Coupon is Applied then call API of Apply Coupon
    if(isCouponApplied){
      applyCoupon();
    }

    setTimeout(() => {
      setOrderId(orderId+1);
      // pushToStack('ShopTrack');
      navigation.navigate('ShopTrack');
    }, 2000);
 
  }, [isCouponApplied, token,userName ,mobile,city ,pinCode ,state ,streetaddress1]);


  const deleteCartItems = async () => {
    try {
     Alert.alert(JSON.stringify("jk"));
     await axios.delete(`http://${ip}:5454/api/cart/clear`, {
       headers: {
         'Authorization': `Bearer ${token}`,
       },
     });
   } catch (error) {
     console.error('Error delete PaymentSuccess.jsx data:', error);
   }
 }; 

 //Redeem Coupon
    const nowRedeemYourPointsManually = async () => {
     try {

      await axios.post(`http://${ip}:5454/api/rewards/redeem?userId=${loginUserId}&points=${redeemYouPoints}`, null, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error('Error Posting nowRedeemYourPointsManually data:', error);
    }
  };

  //Apply Coupon 
  const applyCoupon = async () => {
    try {

     await axios.post(`http://${ip}:5454/api/coupons/generate/${loginUserId}`, null, {
       headers: {
         'Authorization': `Bearer ${token}`,
       },
     });
   } catch (error) {
     console.error('Error Posting in Apply Coupon data:', error);
   }
 };
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={styles.container}>
        <Text style={styles.text}>Payment {'\n'} successful</Text>
        <View style={{ justifyContent: 'center', width: '100%', flexDirection: 'row' }}>
          <Image source={checked} style={{ width: 80, height: 80, marginTop: '14%' }} />
        </View>
      </View>
    </View>
  );
};

export default PaymentSuccess;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#005eb5',
    width: '100%',
    height: '100%',
  },
  text: {
    color: 'white',
    fontWeight: '400',
    fontSize: 48,
    textAlign: 'center',
    marginTop: '34%',
  },
});
