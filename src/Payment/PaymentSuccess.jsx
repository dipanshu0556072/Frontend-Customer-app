import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import checked from '../Login/images/checked.png';
import { useCartContext } from '../Context/WomenContext';
import axios from 'axios';
import { useLoginContext } from '../Login/LoginCartProvider';

const PaymentSuccess = ({ navigation, route }) => {
  const { userName, streetaddress1, city, state, pinCode, mobile,orderId,setOrderId} = useCartContext();
  const {ip,token,popFromStack,pushToStack,
    currentPage, setCurrentPage,
    currentPageIndex,setCurrentPageIndex,
    currentPageIndexCategory,setCurrentPageIndexCategory}=useLoginContext(); 


  useEffect(() => {
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

      // Make a POST request to the specified API endpoint
      axios.post(`http://${ip}:5454/api/orders/`, dataAdd, {
        headers: {
          'Authorization': `Bearer ${token}`,         
        },
      }).then(response => {
          // Handle successful response
          console.log(response.data);
          // Additional logic can be added here if needed
        })
        .catch(error => {
          // Handle error
          console.error('Error making API request:', error);
        });
    }

    setTimeout(() => {
      setOrderId(orderId+1);
      pushToStack('ShopTrack');
      navigation.navigate('ShopTrack');
    }, 2000);
 
  }, [navigation, token, userName, streetaddress1, city, state, pinCode, mobile]);

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
