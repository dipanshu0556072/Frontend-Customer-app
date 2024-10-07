import React, { useState, useEffect } from 'react';
import TopBar1 from '../TopBar1';
import { Alert, Image, Text, View, TextInput, TouchableOpacity } from 'react-native';
import back from '../PlpScreen/images/back.png';
import { useCartContext } from '../Context/WomenContext';
import axios from 'axios';
import { useLoginContext } from '../Login/LoginCartProvider';
import visa from '../Order/visa.png';
import TopBar from '../PlpScreen/TopBar';

export default function CardPayment({ navigation }) {
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
  const [visaImage, setVisaImage] = useState(false);

  useEffect(() => {
    if (cardNumber && cardNumber.length > 4) {
      setVisaImage(true);
    } else {
      setVisaImage(false);
    }
  }, [visaImage, cardNumber]);

  const {
    cartItem, setCartItem, selectedAddress,
    setSelectedAddress, orderItemPrice,
    totalAmount, orderIdCounter,
    userName, setUserName,
    streetaddress1, setStreetAddress1,
    city, setCity,
    state, setState,
    pinCode, setPinCode,
    mobile, setMobile, disableAction, setDisableAction,
    allSavedAddress, setAllSavedAddress,
    placedOrder, setPlacedOrder,
    trackCurrentOrderId, setTrackCurrentOrderId
  } = useCartContext();

  const {
    ip, token, popFromStack, pushToStack,
    currentPage, setCurrentPage,
    currentPageIndex, setCurrentPageIndex,
    currentPageIndexCategory, setCurrentPageIndexCategory
  } = useLoginContext();

  const forNavigate = (page) => {
    if (page === 'mainHome') {
      setCurrentPage('mainHome');
      navigation.navigate('mainHome');
    } else {
      console.log(page + " " + currentPage[currentPage.length - 1]);
      if (currentPage && currentPage[currentPage.length - 1] !== page) {
        pushToStack(page);
        navigation.navigate(page)
      } else {
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
    setDisableAction(true);
  }, [disableAction, selectedAddress, allSavedAddress, setUserName, setStreetAddress1, setCity, setState, setPinCode, setMobile]);

  const userNameArray = userName.split(' ');
  const dataAdd = {
    firstName: userNameArray[0],
    lastName: userNameArray[1],
    streetAddress: streetaddress1,
    city: city,
    state: state,
    zipCode: pinCode,
    mobile: mobile
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

  const proceedToPay = async () => {
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
    else {
      pushToStack('paymentSuccess');
      navigation.navigate('paymentSuccess');
    }
    console.log("here" + userName + " " + mobile + " " + city + " " + pinCode + " " + state + " " + streetaddress1);
    if (userName && mobile && city && state && streetaddress1) {
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
  useEffect(() => {

    setTimeout(() => {
      setCardNumberError(false);
      setCardHolderNameError(false);
      setExpiryError(false);
      setCvvError(false);
    }, 5000);

  }, [cardNumberError, cardHolderNameError, expiryFocus, cvvError]);

  return (
    <>
      <View style={styles.mainContainer}>
      <TopBar
          navigation={navigation}
          showCartLogo={false}
          showWishListLogo={false}
          showSearchLogo={false}
        />
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity onPress={() => { popFromStack(navigation) }}>
              <Image source={back} style={styles.backIcon} />
            </TouchableOpacity>
            <Text style={styles.headerText}></Text>
          </View>
          <TouchableOpacity style={styles.cancelButton} onPress={() => { popFromStack(navigation) }}>
            <Text style={styles.cancelText}>CANCEL</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.contentContainer}>
          <Text style={styles.title}>Add Card Details</Text>
          <View style={styles.container}>
            <View style={styles.labelContainer}></View>
            <View style={styles.inputWrapper}>
              <TextInput
                style={[
                  styles.inputField,
                  { borderColor: cardNumberFocus ? '#00338D' : cardNumberError ? 'red' : '#D3D3D3' },
                ]}
                placeholder='Card Number'
                maxLength={16}
                inputMode='numeric'
                onFocus={() => handleFocus('cardNumber')}
                placeholderTextColor='#767272'
                onChangeText={(text) => setCardNumber(text)}
              />
            </View>

            <View style={styles.labelContainer}></View>
            <View style={styles.inputWrapper}>
              <TextInput
                style={[
                  styles.inputField,
                  { borderColor: cardHolderNameFocus ? '#00338D' : cardHolderNameError ? 'red' : '#D3D3D3' },
                ]}
                placeholder='Card Holder Name'
                onFocus={() => handleFocus('cardHolderName')}
                placeholderTextColor='#767272'
                onChangeText={(text) => setCardHolderName(text)}
              />
            </View>

            <View style={styles.labelContainer}></View>
            <View style={styles.expiryCvvContainer}>
              <View style={styles.expiryWrapper}>
                <TextInput
                  style={[
                    styles.expiryInput,
                    { borderColor: expiryFocus ? '#00338D' : expiryError ? 'red' : '#D3D3D3' },
                  ]}
                  placeholder='MM/YY'
                  maxLength={5}
                  onFocus={() => handleFocus('expiry')}
                  placeholderTextColor='#767272'
                  onChangeText={(text) => setExpiry(text)}
                />
              </View>

              <View style={styles.cvvWrapper}>
                <TextInput
                  style={[
                    styles.cvvInput,
                    { borderColor: cvvFocus ? '#00338D' : cvvError ? 'red' : '#D3D3D3' },
                  ]}
                  placeholder='CVV'
                  maxLength={3}
                  inputMode='numeric'
                  onFocus={() => handleFocus('cvv')}
                  placeholderTextColor='#767272'
                  onChangeText={(text) => setCvv(text)}
                />
              </View>
            </View>
            <View>
              {visaImage && <Image source={visa} style={styles.visaIcon} />}
            </View>
          </View>

          <View style={styles.proceedButtonContainer}>
            <TouchableOpacity onPress={proceedToPay} disabled={isLoading} style={styles.proceedButton}>
              <Text style={styles.proceedButtonText}>PROCEED TO PAY</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  )
}

const styles = {
  mainContainer: {
    flex: 1,
    backgroundColor: 'white'
  },
  topImage: {
    width: '100%',
    height: 160,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backIcon: {
    width: 25,
    height: 25,
    marginLeft: 10,
  },
  headerText: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  cancelButton: {
    marginRight: 10,
  },
  cancelText: {
    color: 'red',
    fontSize: 16,
  },
  contentContainer: {
    margin: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  container: {
    marginBottom: 10,
  },
  labelContainer: {
    marginBottom: 5,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputField: {
    flex: 1,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  expiryCvvContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  expiryWrapper: {
    flex: 0.5,
    marginRight: 5,
  },
  expiryInput: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  cvvWrapper: {
    flex: 0.5,
    marginLeft: 5,
  },
  cvvInput: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  visaIcon: {
    width: 60,
    height: 40,
    marginTop: 10,
  },
  proceedButtonContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  proceedButton: {
    backgroundColor: '#00338D',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  proceedButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
};
