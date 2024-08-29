import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Image, Alert } from 'react-native';
import checked from '../Login/images/checked.png';
import { useCartContext } from '../Context/WomenContext';
import axios from 'axios';
import { useLoginContext } from '../Login/LoginCartProvider';
import { useGroceryContext } from '../Grocery/GroceryContext';

const WalletPaymentSuccess = ({ navigation, route }) => {
  const { userName, streetaddress1, city, state, pinCode, mobile,orderId,setOrderId,redeemYouPoints,setRedeemYourPoints,addedMoney,setAddedMoney,setWalletBalance,
    addMoneyToWalletTender,setAddMoneyToWalletTender
  } = useCartContext();
  const {ip,token,popFromStack,pushToStack,
    currentPage, setCurrentPage,
    currentPageIndex,setCurrentPageIndex,
    currentPageIndexCategory,setCurrentPageIndexCategory,loginUserId,}=useLoginContext(); 
 
    const{whichPageToNavigate}=useGroceryContext();

    async function addMoneyToWallet(){
        try {
          await axios.post(`http://${ip}:5454/api/wallet/add-money?userId=${loginUserId}&amount=${addedMoney}`, null, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
        await fetchData();
        } catch (error) {
          console.error('Error Posting AddMoney data:', error);
        }
      }

      const fetchData = async () => {

        const header = {
          'Authorization': `Bearer ${token}`,
        };
  
        try {
          const response = await axios.get(`http://${ip}:5454/api/users/profile`, { headers: header });
          setWalletBalance(response.data.wallet.balance);
        } catch (error) {
          console.log('Error fetching profile:', error);
          // Handle the error as needed
        }
      };
  
      useEffect(()=>{
       addMoneyToWallet();
      },[token]);    
  useEffect(()=>{
    if(addMoneyToWalletTender){
      setAddMoneyToWalletTender(false);
      setTimeout(()=>{
        navigation.navigate('orderSummary');
      },3000);
    }
    else if(whichPageToNavigate && whichPageToNavigate.length>0){
    setTimeout(()=>{
      navigation.navigate('scheduleSubscription');
    },3000);
   }else{
    setTimeout(()=>{
      setCurrentPage(['mainHome','walletHome']);
      setAddedMoney('')
      navigation.navigate('walletHome');
   },3000)
  }
   
  },[]);  
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={styles.container}>
        <View style={{ justifyContent: 'center', width: '100%', flexDirection: 'row' }}>
          <Image source={checked} style={{ width: 100, height: 100, marginTop: '35%' }} />
        </View>
        <Text style={styles.text}>Money has been added{'\n'} Successful{'\n'}in your Wallet</Text>
      </View>
    </View>
  );
};

export default WalletPaymentSuccess;

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
