import React, { useState, useEffect } from 'react';
import TopBar1 from '../TopBar1';
import {Alert, Image, Text, View, TextInput, TouchableOpacity } from 'react-native';
import back from '../PlpScreen/images/back.png';
import { useCartContext } from '../Context/WomenContext';
import axios from 'axios';
import { useLoginContext } from '../Login/LoginCartProvider';
import visa from '../Order/visa.png'

export default function WalletCardPayment({ navigation }) {
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolderName, setCardHolderName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [cardNumberFocus, setCardNumberFocus] = useState(false);
  const [cardHolderNameFocus, setCardHolderNameFocus] = useState(false);
  const [expiryFocus, setExpiryFocus] = useState(false);
  const [cvvFocus, setCvvFocus] = useState(false);

  const [cardNumberError, setCardNumberError] = useState(false);
  const [cardHolderNameError, setCardHolderNameError] = useState(false);
  const [expiryError, setExpiryError] = useState(false);
  const [cvvError, setCvvError] = useState(false);
  const [visaImage,setVisaImage]=useState(false);

  useEffect(()=>{
    if(cardNumber && cardNumber.length>4){
      setVisaImage(true);
    }else{
      setVisaImage(false);
    }
    
  },[visaImage,cardNumber,expiry]);

  const {cartItem,setCartItem,selectedAddress,
    setSelectedAddress,orderItemPrice,
    totalAmount,orderIdCounter ,
    userName, setUserName,
    streetaddress1, setStreetAddress1,
    city, setCity,
    state, setState,
    pinCode, setPinCode,
    mobile, setMobile,
    allSavedAddress,setAllSavedAddress,
    placedOrder,setPlacedOrder,
    trackCurrentOrderId,setTrackCurrentOrderId,addedMoney}=useCartContext();

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

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get("http://192.168.0.107:5454/api/orders/user", {
  //         headers: {
  //           'Authorization': 'Bearer ${token}',
  //         },
  //       });

  //       setPlacedOrder(response.data);
  //     } catch (error) {
  //       console.error('Error fetching PlacedOrderdata1:', error);
  //     }
  //   }

  //   fetchData();

  //   return () => {
  //     setIsLoading(false); // Set loading to false when the component unmounts or the dependency changes
  //   };
  // }, [token]);

  //storing the selected AddressData
useEffect(() => {
  if (selectedAddress !== null && allSavedAddress[selectedAddress]) {
    const selectedAddressData = allSavedAddress[selectedAddress];

    // Update the dataAdd object with the selected address data
    setUserName(`${selectedAddressData.firstName} ${selectedAddressData.lastName}`);
    setStreetAddress1(selectedAddressData.streetAddress);
    setCity(selectedAddressData.city);
    setState(selectedAddressData.state);
    setPinCode(selectedAddressData.zipCode);
    setMobile(selectedAddressData.mobile);
  }
}, [selectedAddress, allSavedAddress, setUserName, setStreetAddress1, setCity, setState, setPinCode, setMobile]);

       const userNameArray = userName?userName.split(' '):'';
        const dataAdd={
          firstName:userNameArray[0],
          lastName:userNameArray[1],
          streetAddress:streetaddress1,
          city:city,
          state:state,
          zipCode:pinCode,
          mobile:mobile
        }

  const handleFocus = (field) => {
    switch (field) {
      case 'cardNumber':
        setCardNumberFocus(true);
        setCardHolderNameFocus(false);
        setExpiryFocus(false);
        setCvvFocus(false);
        break;
      case 'cardHolderName':
        setCardNumberFocus(false);
        setCardHolderNameFocus(true);
        setExpiryFocus(false);
        setCvvFocus(false);
        break;
      case 'expiry':
        setCardNumberFocus(false);
        setCardHolderNameFocus(false);
        setExpiryFocus(true);
        setCvvFocus(false);
        break;
      case 'cvv':
        setCardNumberFocus(false);
        setCardHolderNameFocus(false);
        setExpiryFocus(false);
        setCvvFocus(true);
        break;
      default:
        break;
    }
  };

 const proceedToPay=async()=>{
  const enteredMonth = parseInt(expiry.substring(0, 2), 10);
  if (cardNumber.length < 16 || cardHolderName.length <= 0 || expiry.length < 5 || cvv.length < 3) {
    if (cardNumber.length < 16) {
      setCardNumberError(true);
    }
    if (cardHolderName.length <= 0) {
      setCardHolderNameError(true);
    }
    if (expiry.length < 5) {
      setExpiryError(true);
    }
  
    if (cvv.length < 3) {
      setCvvError(true);
      // Display error message for invalid CVV
      Alert.alert('Error', 'Please enter a valid CVV (3 digits)');
      return;
    }
  }
  else if (enteredMonth > 12) {
    // Display error message for invalid month
    Alert.alert('Please enter a valid month (1-12)');
    return;
  }
  else{
    pushToStack('walletpaymentSuccess');
    navigation.navigate('walletpaymentSuccess');
  }
  console.log("here"+userName +" "+ mobile +" "+ city +" "+pinCode  +" "+ state  +" "+streetaddress1);
  if (userName && mobile && city &&  state && streetaddress1) {
    // Assuming dataAdd is available here
  //   axios.post('http://192.168.0.107:5454/api/orders/', dataAdd, {
  //     headers: {
  //       'Authorization': Bearer ${token},
  //     },
  //   }).then(response => {
  //     setDeliveryAddress(response.data);
  //     console.log(response.data);
  //     navigation.navigate('paymentSuccess');
  //   }).catch(error => {
  //     console.log(error);
  //   });
  // } else {
  //   setError(true);
  

  }
 }
 useEffect(()=>{
  
  setTimeout(()=>{
    setCardNumberError(false);
    setCardHolderNameError(false);
    setExpiryError(false);
    setCvvError(false);
  },5000);

 },[cardNumberError,cardHolderNameError,expiryFocus,cvvError,expiry]);
  

 
  


  return (
    <>
    <View style={{ flex: 1, backgroundColor: 'white' }}>

    <TouchableOpacity onPress={() => {forNavigate('mainHome')}}>
        <Image
          source={{ uri: 'https://shorturl.at/ckGU2' }}
          style={{ width: 100, height: 100, marginLeft: '4%' }}
        />
      </TouchableOpacity>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: '1%', marginBottom: '3%' }}>
  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    <TouchableOpacity onPress={() => {popFromStack(navigation) }}>
      <Image source={back} style={{ marginLeft: 12 }} />
    </TouchableOpacity>
    <Text style={{ paddingLeft: 10, color: 'black', textAlign: 'center' }}>
   
    </Text>
  </View>
  <TouchableOpacity style={{ marginRight: '4%' }} onPress={() => {popFromStack(navigation)}}>
    <Text style={{ color: 'black' }}>CANCEL</Text>
  </TouchableOpacity>
</View>

      <View style={{ padding: '4%',}}>
        <Text style={{ color: 'black', textAlign: 'center',marginRight:'53%',padding:'3%',fontWeight:'600',fontSize:19}}>Add Card Details</Text>
        <View style={styles.container}>
       
          <View style={{ position: 'relative' }}>
  <TextInput
    style={[
      styles.inputField,
      { borderColor: cardNumberFocus ? '#00338D' : cardNumberError ? 'red' : '#D3D3D3' },
    ]}
    placeholder='Card Number'
    maxLength={16}
    inputMode='numeric'
    onFocus={() => handleFocus('cardNumber')}
    placeholderTextColor='#999'
    onChangeText={(text) => setCardNumber(text)}
  />
  {
    visaImage && (
      <Image
      source={visa} // Replace 'yourImageSource' with the actual source for your image
      style={{
        position: 'absolute',
        top: 8, // Adjust the top value to position the image vertically
        right: 8, // Adjust the right value to position the image horizontally
        width: 37, // Adjust the width of the image
        height: 12, // Adjust the height of the image
      }}
    />
    )
  }

</View>

        <TextInput
            style={[
              styles.inputField,
              { borderColor: cardHolderNameFocus ? '#00338D' : cardHolderNameError ? 'red' : '#D3D3D3' },
            ]}
            value={cardHolderName}
            placeholder='Card Holder Name'
            onFocus={() => handleFocus('cardHolderName')}
            placeholderTextColor='#999'
            onChangeText={(text) => setCardHolderName(text.toUpperCase())}
            />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <TextInput
      style={[
        styles.inputField,
        { borderColor: expiryFocus ? '#00338D' : expiryError ? 'red' : '#D3D3D3' },
      ]}
      placeholder='MM-YY'
      inputMode='numeric'
      onFocus={() => handleFocus('expiry')}
      placeholderTextColor='#999'
      maxLength={5}
      onChangeText={(text) => {
        setExpiry(text)

      }}
    
    
    />


            <TextInput
              style={[
                styles.inputField,
                { borderColor: cvvFocus ? '#00338D' : cvvError ? 'red' : '#D3D3D3' },
              ]}
              placeholder='cvv'
              onFocus={() => handleFocus('cvv')}
              placeholderTextColor='#999'
              maxLength={3}
              onChangeText={(text)=>setCvv(text)}
              inputMode='numeric'
              secureTextEntry={true}
            />
          </View>
          <View style={styles.horizontalLine1}></View>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: '5%' }}>
            <Text style={{ padding: '4%', color: 'black', fontSize: 17 }}>TOTAL ₹{addedMoney}</Text>
            <TouchableOpacity
               onPress={proceedToPay}
              style={{ backgroundColor: '#00338D', padding: '4%', borderRadius: 7 }}>
              <Text style={{ color: 'white', fontWeight: '500' }}>PROCEED TO PAY</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      </View>
    </>
  );
}

const styles = {
  container: {
    width: 365,
    borderWidth: 1,
    borderColor: '#D3D3D3',
    borderRadius: 12,
    padding: 22,
 

  },
  labelContainer: {
    marginBottom: 10,
  },
  inputField: {
    borderBottomWidth: 1,
    marginTop: '10%',
    color: 'black',
  },
  horizontalLine1: {
    borderBottomWidth: 0.6,
    borderBottomColor: '#D3D3D3',
    marginVertical: 8,
    marginTop: '10%',
  },
};