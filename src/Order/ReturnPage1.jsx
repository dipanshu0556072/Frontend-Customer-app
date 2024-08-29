import {
  Alert,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  Modal,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useCartContext} from '../Context/WomenContext';
import back from '../PlpScreen/images/back.png';
import nextArrow from '../PlpScreen/images/next2.png';
import {useLoginContext} from '../Login/LoginCartProvider';
import {useGroceryContext} from '../Grocery/GroceryContext';
import axios from 'axios';
import returnlogo from '../PlpScreen/images/return.png';
import Spinner from 'react-native-loading-spinner-overlay';
import cross from '../PlpScreen/images/close.png';
import map from '../PlpScreen/images/map.png';
import {RadioButton} from 'react-native-paper';
import {SelectList} from 'react-native-dropdown-select-list';

const ReturnPage1 = ({navigation}) => {
  const {
    trackCurrentOrderId,
    deliveryOption,
    setReceiptData,
    setProducts,
    modifyStorePickUp,
    setModifyStorePickUp,
    storeProductWithSizeAndQuantity,
    setStoreProductWithSizeAndQuantity,
    setSelectedStoreId,
    setSearch,
    setShowStorePickUpName,
    returnLeaveMessage,
    setReturnLeaveMessage,
    orderStatus,
    setOrderStatus,
    isChecked,
    setChecked,
    returnSelectedReason,setReturnSelectedReason
  } = useCartContext();

  const {
    ip,
    token,
    popFromStack,
    pushToStack,
    currentPage,
    setCurrentPage,
    setChangeOrderStatus,
    OrderDate,
    setOrderDate,
    changeOrderStatus,
  } = useLoginContext();

  const {
    subscribedSelectedDays,
    setSubscribedSelectedDays,
    subscriptionEndDate,
    setSubscriptionEndDate,
    subscribedGroceryProductId,
    setWhichPageToNavigate,
    addressList,
    setAddressList,
    selectedDate,
    setSelectedDate,
    userName,
    setUserName,
    pinCode,
    setPinCode,
    streetAddress,
    setStreetAddress,
    mobileNumber,
    setMobileNumber,
    houseNumber,
    setHouseNumber,
    state,
    setState,
    city,
    setCity,
    selectedAddress,
    setSelectedAddress,
    subscriptionTimeSlot,
    setSubscriptionTimeSlot,
    selectedDatesAsString,
    setSelectedDatesAsString,
    count,
  } = useGroceryContext();

  //for Navigation from one page to another
  const forNavigate = page => {
    console.log(page + ' ' + currentPage[currentPage.length - 1]);
    if (currentPage && currentPage[currentPage.length - 1] !== page) {
      if (page === 'mainBag') {
      }
      pushToStack(page);
      navigation.navigate(page);
    } else {
      popFromStack(navigation);
    }
  };

  // for Add New Address
  const [addressModalVisible, setAddressModalVisible] = useState(false);
  const [userNameFocus, setUserNameFocus] = useState(false);
  const [pinCodeFocus, setPinCodeFocus] = useState(false);
  const [streetAddressFocus, setStreetAddressFocus] = useState(false);
  const [mobileNumberFocus, setmobileNumberFocus] = useState(false);
  const [houseNumberFocus, setHouseNumberFocus] = useState(false);
  const [stateFocus, setStateFocus] = useState(false);
  const [cityFocus, setCityFocus] = useState(false);

  const [userNameNull, setUserNameNull] = useState(false);
  const [pinCodeNull, setPinCodeNull] = useState(false);
  const [streetAddressNull, setStreetAddressNull] = useState(false);
  const [mobileNumberNull, setMobileNumberNull] = useState(false);
  const [houseNumberNull, setHouseNumberNull] = useState(false);
  const [stateNull, setStateNull] = useState(false);
  const [cityNull, setCityNull] = useState(false);

  const handleFocus = field => {
    switch (field) {
      case 'userName':
        setUserNameFocus(true);
        setPinCodeFocus(false);
        setStreetAddressFocus(false);
        setmobileNumberFocus(false);
        setHouseNumberFocus(false);
        setStateFocus(false);
        setCityFocus(false);
        break;
      case 'pinCode':
        setUserNameFocus(false);
        setPinCodeFocus(true);
        setStreetAddressFocus(false);
        setmobileNumberFocus(false);
        setHouseNumberFocus(false);
        setStateFocus(false);
        setCityFocus(false);
        break;
      case 'streetAddress':
        setUserNameFocus(false);
        setPinCodeFocus(false);
        setStreetAddressFocus(true);
        setmobileNumberFocus(false);
        setHouseNumberFocus(false);
        setStateFocus(false);
        setCityFocus(false);
        break;
      case 'mobileNumber':
        setUserNameFocus(false);
        setPinCodeFocus(false);
        setStreetAddressFocus(false);
        setmobileNumberFocus(true);
        setHouseNumberFocus(false);
        setStateFocus(false);
        setCityFocus(false);
        break;
      case 'houseNumber':
        setUserNameFocus(false);
        setPinCodeFocus(false);
        setStreetAddressFocus(false);
        setmobileNumberFocus(false);
        setHouseNumberFocus(true);
        setStateFocus(false);
        setCityFocus(false);
        break;
      case 'state':
        setUserNameFocus(false);
        setPinCodeFocus(false);
        setStreetAddressFocus(false);
        setmobileNumberFocus(false);
        setHouseNumberFocus(false);
        setStateFocus(true);
        setCityFocus(false);
        break;
      case 'city':
        setUserNameFocus(false);
        setPinCodeFocus(false);
        setStreetAddressFocus(false);
        setmobileNumberFocus(false);
        setHouseNumberFocus(false);
        setStateFocus(false);
        setCityFocus(true);
        break;
      default:
        break;
    }
  };

  const handleAddressModalClose = () => {
    // Additional logic to handle sorting or other actions
    setTimeout(() => {
      setAddressModalVisible(false);
    }, 100);
  };


  //show the dropdown Data
  const [selected, setSelected] = React.useState('');
  const [data, setData] = useState([]);
  // const data = [
  //   {key: '1', value: 'Mobiles'},
  //   {key: '2', value: 'Appliances'},
  //   {key: '3', value: 'Cameras'},
  //   {key: '4', value: 'Computers'},
  //   {key: '5', value: 'Vegetables'},
  //   {key: '6', value: 'Diary Products'},
  //   {key: '7', value: 'Drinks'},
  // ];

  const handleSelection = (val) => {
    setSelected(val);
    const selectedReason = data.find(item => item.value === val);
    if (selectedReason) {
      setReturnSelectedReason(selectedReason.key);
    }
  };

  //fetched all return reason
  const fetchedReturnReason=async()=>{
    try {
      const response = await axios.get(
        `http://${ip}:5454/api/return-reasons/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const returnReasons = response.data.map(reason => ({
        key: reason.id,
        value: reason.description,
      }));

      setData(returnReasons);
    } catch (error) {
      console.error('Error fetching data: in return reason', error);
    }
   }



  

  //used for buffering icon
  const [showActivityIndicator, setShowActivityIndicator] = useState(true);

  //show for blue buffering icon
  const [isLoading, setIsLoading] = useState(false);

  //get the current product data which you want to cancel
  const [getOrderStatus, setGetOrderStatus] = useState([]);

  const getOrderStatus1 = async () => {
    try {
      const response = await axios.get(
        `http://${ip}:5454/api/orders/${trackCurrentOrderId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      // Handle the response data
      setGetOrderStatus(response.data);
      setReceiptData(response.data);

      //make falses how activityIndicator
      setTimeout(() => {
        setShowActivityIndicator(false);
      }, 100);
    } catch (error) {
      // Handle errors
      setShowActivityIndicator(false);
      console.error('Error fetching Placed1Orderdata:', error);
    }
  };

  // get automatically state based on the pincode
  async function getState() {
    try {
      const response = await fetch(
        `http://www.postalpincode.in/api/pincode/${pinCode}`,
      );
      const data = await response.json(); // Parse JSON response
      console.log(data.PostOffice[0]?.State);
      // Alert.alert(JSON.stringify(data.PostOffice[0]?.State));
      setState(data.PostOffice[0]?.State);
      setCity(
        data.PostOffice[0]?.Taluk === 'NA'
          ? data.PostOffice[0]?.District
          : data.PostOffice[0]?.Taluk,
      );
    } catch (error) {
      console.log('Got error in AddressDetail.jsx in getState()' + error);
    }
  }

  //add new address
  const [doesAddedNewAddress, setDoesAddedNewAddress] = useState(false);

  const handleAddress = async () => {
    setIsLoading(true);
    if (
      userName === '' ||
      pinCode === '' ||
      streetAddress === '' ||
      mobileNumber === '' ||
      houseNumber === '' ||
      state === '' ||
      city === ''
    ) {
      if (userName === '') {
        setUserNameNull(true);
        setIsLoading(false);
      }
      if (pinCode === '') {
        setPinCodeNull(true);
        setIsLoading(false);
      }
      if (streetAddress === '') {
        setStreetAddressNull(true);
        setIsLoading(false);
      }
      if (mobileNumber === '') {
        setMobileNumberNull(true);
        setIsLoading(false);
      }
      if (houseNumber === '') {
        setHouseNumberNull(true);
        setIsLoading(false);
      }
      if (state === '') {
        setStateNull(true);
        setIsLoading(false);
      }
      if (city === '') {
        setCityNull(true);
        setIsLoading(false);
      }
    } else {
      const data = {
        firstName: userName.split(' ')[0],
        lastName: userName.split(' ')[1] ? userName.split(' ')[1] : '',
        streetAddress: streetAddress,
        city: city,
        state: state,
        zipCode: pinCode,
        mobile: mobileNumber,
      };
      try {
        axios.post(`http://${ip}:5454/api/orders/addresses`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDoesAddedNewAddress(true);

        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      } catch (error) {
        console.log('Error in postAddress in returnPage1.jsx', error);
      }
      setTimeout(() => {
        handleAddressModalClose();
      }, 1000);
    }
  };

  //total Amount to return
  const [totalAmountToReturn, setTotalAmountToReturn] = useState(0);

  //show user confirmation for proceed for return
  const showConfirmation = () => {
    Alert.alert(
      'Confirmation',
      'Would you like to proceed with returning product?',
      [
        {
          text: 'No',
          onPress: () => console.log('No Pressed'),
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            navigation.navigate('returnOrderStatus');
          },
        },
      ],
      {cancelable: false},
    );
  };

  useEffect(() => {
    getOrderStatus1();
    fetchedReturnReason();

    if (orderStatus && orderStatus.orderItems) {
      const totalSum = orderStatus.orderItems.reduce((sm, item) => {
        return sm + item.discountedPrice;
      }, 0);
      setTotalAmountToReturn(totalSum);
    }
    setTimeout(() => {
      if (userNameNull) {
        setUserNameNull(false);
      }
    }, 2000);

    setTimeout(() => {
      if (pinCodeNull) {
        setPinCodeNull(false);
      }
    }, 2000);

    setTimeout(() => {
      if (streetAddressNull) {
        setStreetAddressNull(false);
      }
    }, 2000);

    setTimeout(() => {
      if (mobileNumberNull) {
        setMobileNumberNull(false);
      }
    }, 2000);

    setTimeout(() => {
      if (houseNumberNull) {
        setHouseNumberNull(false);
      }
    }, 2000);

    setTimeout(() => {
      if (stateNull) {
        setStateNull(false);
      }
    }, 2000);

    setTimeout(() => {
      if (cityNull) {
        setCityNull(false);
      }
    }, 2000);

    if (pinCode.length > 5) {
      getState();
    }
  }, [pinCode, orderStatus]);

  return (
    <View style={styles.mainContainer}>
      {showActivityIndicator ? (
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator size="large" color="#00338D" />
        </View>
      ) : (
        <>
          <View style={styles.topContainer}>
            <TouchableOpacity
              onPress={() => {
                forNavigate('mainHome');
              }}>
              <Image
                source={{uri: 'https://shorturl.at/ckGU2'}}
                style={{width: 100, height: 100, marginLeft: '4%'}}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                popFromStack(navigation);
              }}>
              <View style={styles.backBtn}>
                <Image source={back} style={styles.backBtnImg} />
                <View style={styles.backBtnTextContainer}>
                  <Text style={styles.backBtnText}>CREATE A RETURN</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <ScrollView>
            <Text style={styles.mainHeading}>ITEMS FROM THIS ORDER</Text>
            {orderStatus && orderStatus.orderItems && (
              <>
                {orderStatus.orderItems.map((item, index) => (
                  <View key={index} style={styles.productContainer}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Image
                        source={{uri: item.product.imageUrl[0]}}
                        style={styles.image}
                      />

                      <View style={{marginLeft: '14%'}}>
                        <Text style={styles.productBrand}>
                          {item.product.brand}
                        </Text>
                        <Text style={styles.productTitle}>
                          {item.product.title}
                        </Text>
                        <Text style={styles.productFit}>
                          Fit: {item.product.fit}
                        </Text>
                        <View>
                          <Text style={styles.productText}>
                            Size: {item.size}
                          </Text>
                          <Text style={styles.productText}>
                            Qty: {item.quantity}
                          </Text>
                        </View>
                        <Text>
                          ₹{' '}
                          {item.product.discountedPrice.toLocaleString('en-IN')}
                        </Text>
                      </View>
                    </View>
                  </View>
                ))}
              </>
            )}
            <Text style={styles.returnText}>REASON FOR RETURN:</Text>
            <View style={styles.dropDownList}>
            <SelectList
        setSelected={handleSelection}
        data={data}
        save="value"
      />
            </View>
            <Text style={styles.returnText}>ADDITIONAL INFORMATION{JSON.stringify(returnSelectedReason)}</Text>
            <View style={styles.additionalComments}>
              <TextInput
                value={returnLeaveMessage}
                onChangeText={text => {
                  setReturnLeaveMessage(text);
                }}
                placeholder=" Additional Comments "
                placeholderTextColor="#c9c7c7"
                multiline
              />
            </View>
            <View style={styles.horizontalLine1} />
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.returnText}>RETURN METHOD</Text>
              <Image source={map} style={{width: 20, height: 20}} />
            </View>

            {doesAddedNewAddress ? (
              <>
                <Text style={{marginLeft: '4%'}}>
                  <Text style={styles.pickUpAddress}>
                    {mobileNumber}
                    {'\n'}
                  </Text>
                  {city}, {streetAddress},{state}, {pinCode}
                </Text>
              </>
            ) : (
              orderStatus && (
                <Text style={{marginLeft: '4%'}}>
                  <Text style={styles.pickUpAddress}>
                    {orderStatus.shippingAddress.mobile}
                    {'\n'}
                  </Text>
                  {orderStatus.shippingAddress.city},{' '}
                  {orderStatus.shippingAddress.streetAddress},{' '}
                  {orderStatus.shippingAddress.state},{' '}
                  {orderStatus.shippingAddress.zipCode}
                </Text>
              )
            )}

            {/* <View style={styles.horizontalLine2} />
            <Text style={styles.FindDropText}>ADD A DROP-OFF POINT:</Text>
            <TouchableOpacity
              style={styles.addAddressBtn}
              onPress={() => {
                setAddressModalVisible(true);
              }}>
              <Text style={styles.placeReturnBtnText}>ADD</Text>
            </TouchableOpacity> */}
            <View style={styles.horizontalLine1} />

            <Modal
              animationType="slide"
              transparent={true}
              visible={addressModalVisible}
              onRequestClose={handleAddressModalClose}>
              <TouchableWithoutFeedback onPress={handleAddressModalClose}>
                <View style={styles.modalContainer}>
                  <View style={styles.AddressModal}>
                    <Text style={styles.addressMainHead}>Address Detail</Text>
                    <ScrollView>
                      <View style={{margin: '4%'}}>
                        <TextInput
                          style={[
                            styles.inputField,
                            {
                              borderColor: userNameFocus
                                ? '#00338D'
                                : userNameNull
                                ? 'red'
                                : '#D3D3D3',
                            },
                          ]}
                          placeholder="Full Name"
                          onFocus={() => handleFocus('userName')}
                          placeholderTextColor="#999"
                          onChangeText={text => setUserName(text)}
                          value={userName}
                        />
                        <TextInput
                          style={[
                            styles.inputField,
                            {
                              borderColor: mobileNumberFocus
                                ? '#00338D'
                                : mobileNumberNull
                                ? 'red'
                                : '#D3D3D3',
                            },
                          ]}
                          placeholder="Mobile Number"
                          maxLength={10}
                          inputMode="numeric"
                          onFocus={() => handleFocus('mobileNumber')}
                          placeholderTextColor="#999"
                          onChangeText={text => setMobileNumber(text)}
                          value={mobileNumber}
                        />

                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}>
                          <TextInput
                            style={[
                              styles.inputField,
                              {
                                borderColor: pinCodeFocus
                                  ? '#00338D'
                                  : pinCodeNull
                                  ? 'red'
                                  : '#D3D3D3',
                                width: '40%',
                              },
                            ]}
                            placeholder="PIN Code"
                            maxLength={6}
                            keyboardType="numeric"
                            onChangeText={text => setPinCode(text)}
                            onFocus={() => handleFocus('pinCode')}
                            placeholderTextColor="#999"
                            value={pinCode}
                          />
                          <TextInput
                            style={[
                              styles.inputField,
                              {
                                borderColor: stateFocus
                                  ? '#00338D'
                                  : stateNull
                                  ? 'red'
                                  : '#D3D3D3',
                                width: '40%',
                              },
                            ]}
                            placeholder="State"
                            onChangeText={text => setState(text)}
                            placeholderTextColor="#999"
                            onFocus={() => handleFocus('state')}
                            value={state}
                          />
                        </View>

                        <TextInput
                          style={[
                            styles.inputField,
                            {
                              borderColor: houseNumberFocus
                                ? '#00338D'
                                : houseNumberNull
                                ? 'red'
                                : '#D3D3D3',
                            },
                          ]}
                          placeholder="House Number"
                          onFocus={() => handleFocus('houseNumber')}
                          placeholderTextColor="#999"
                          onChangeText={text => setHouseNumber(text)}
                          value={houseNumber}
                        />
                        <TextInput
                          style={[
                            styles.inputField,
                            {
                              borderColor: streetAddressFocus
                                ? '#00338D'
                                : streetAddressNull
                                ? 'red'
                                : '#D3D3D3',
                            },
                          ]}
                          placeholder="Street Address"
                          onFocus={() => handleFocus('streetAddress')}
                          placeholderTextColor="#999"
                          onChangeText={text => setStreetAddress(text)}
                          value={streetAddress}
                        />

                        <TextInput
                          style={[
                            styles.inputField,
                            {
                              borderColor: cityFocus
                                ? '#00338D'
                                : cityNull
                                ? 'red'
                                : '#D3D3D3',
                            },
                          ]}
                          placeholder="City"
                          onChangeText={text => setCity(text)}
                          placeholderTextColor="#999"
                          onFocus={() => handleFocus('city')}
                          value={city}
                        />

                        <TouchableOpacity
                          style={styles.continueBtn}
                          onPress={() => {
                            handleAddress();
                          }}>
                          <Text style={styles.continueBtnText}>Continue</Text>
                        </TouchableOpacity>
                      </View>
                    </ScrollView>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </Modal>

            <Text style={styles.mainHeading}>RETURN SUMMARY</Text>
            <View style={styles.returnSummaryMainContainer}>
              {orderStatus &&
                orderStatus.orderItems &&
                orderStatus.orderItems.map((item, index) => (
                  <View style={styles.returnSummaryContainer} key={index}>
                    <Text>
                      {item.quantity} X {item.product.discountedPrice}
                    </Text>
                    <Text style={styles.summaryPrice}>
                      ₹
                      {parseInt(item.quantity) *
                        parseInt(item.product.discountedPrice)}
                    </Text>
                  </View>
                ))}
            </View>
            <View style={styles.horizontalLine3} />
            <View style={styles.returnTotalSummaryContainer}>
              <Text style={styles.returnSummaryText}>TOTAL :</Text>
              <View>
                <Text style={styles.summaryTotalPrice}>
                  ₹{totalAmountToReturn}
                </Text>
              </View>
            </View>
            <View style={{backgroundColor: '#F5F5F5', marginTop: '4%'}}>
              <Text style={styles.returnPolicy}>
                Check out our
                <Text style={styles.returnPolicy1}> return Policy </Text>
                for more info.
              </Text>

              <TouchableOpacity
                style={styles.placeReturnBtn}
                onPress={showConfirmation}>
                <Text style={styles.placeReturnBtnText}>PLACE RETURN</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.bottomContainer}
              onPress={() => {
                navigation.navigate('mainHome');
                setCurrentPage('mainHome');
              }}>
              <Text style={styles.bottomDataText}>KPMG Homepage</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.bottomContainer}>
              <Text style={styles.bottomDataText}>Terms & Conditions</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.bottomContainer}>
              <Text style={styles.bottomDataText}>Privacy Policy</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.bottomContainer}>
              <Text style={styles.bottomDataText1}> © KPMG 2024</Text>
            </TouchableOpacity>
          </ScrollView>
        </>
      )}

      <Spinner
        visible={isLoading}
        textStyle={styles.spinnerTextStyle}
        animation="fade" // Set the animation type (fade, slide, none)
        overlayColor="rgba(0, 51, 141, 0.6)" // Set the overlay color
        color="#00338D"
        size="large"
        speed={2} // Set the speed of the animation
      />
    </View>
  );
};

export default ReturnPage1;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  mainHeading: {
    margin: '2%',
    fontSize: 15,
    color: 'black',
    fontWeight: '500',
    marginTop: '4%',
  },
  topContainer: {
    backgroundColor: '#F5F5F5',
    height: 160,
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    height: 45,
  },
  backBtnImg: {
    marginLeft: 12,
  },
  backBtnTextContainer: {
    flex: 1,
    alignItems: 'center',
  },
  backBtnText: {
    color: 'black',
    fontWeight: '800',
    fontSize: 17,
  },
  productContainer: {
    padding: '3%',
    margin: '2%',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
  },
  image: {
    width: 80,
    height: 110,
    borderRadius: 7,
  },
  productBrand: {
    color: '#00338D',
    fontWeight: '500',
  },
  productTitle: {
    color: '#00338D',
    fontWeight: '300',
    fontSize: 12,
  },
  productFit: {
    fontWeight: '300',
  },
  productText: {
    fontSize: 13,
  },
  returnText: {
    margin: '3%',
    fontWeight: '800',
    fontSize: 14.6,
  },
  dropDownList: {
    margin: '3%',
  },
  activityIndicatorContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.7)', // Semi-transparent background
  },
  additionalComments: {
    height: 120,
    margin: '2%',
    borderWidth: 1,
    borderRadius: 12,
    borderColor: '#d3d3d3',
  },
  horizontalLine1: {
    marginTop: '2%',
    height: 13,
    backgroundColor: '#F5F5F5',
  },
  horizontalLine2: {
    marginTop: '4%',
    marginLeft: '4%',
    marginRight: '4%',
    height: 8,
    backgroundColor: '#F5F5F5',
  },
  horizontalLine3: {
    margin: '4%',
    height: 1.4,
    backgroundColor: '#D7D7D7',
  },
  FindDropText: {
    margin: '3%',
    fontWeight: '800',
    marginLeft: '6%',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  AddressModal: {
    height: 900,
    width: '100%',
    backgroundColor: 'white',
    marginTop: '88%',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  addressMainHead: {
    color: 'black',
    fontSize: 23,
    margin: '4%',
    marginTop: '8%',
    fontWeight: '600',
  },
  inputField: {
    borderBottomWidth: 1,
    marginTop: '7%',
    color: 'black',
  },
  continueBtn: {
    backgroundColor: '#00338D',
    marginTop: '14%',
    padding: '3%',
    width: '100%',
    borderRadius: 12,
  },
  continueBtnText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: '600',
    fontSize: 17,
  },
  pickUpAddress: {
    color: 'black',
    fontWeight: '600',
  },
  returnSummaryMainContainer: {
    marginLeft: '5%',
    marginRight: '5%',
    marginTop: '3%',
  },
  returnSummaryContainer: {
    marginTop: '1%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  returnTotalSummaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: '1%',
    marginRight: '4%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryPrice: {
    fontWeight: '600',
  },
  summaryTotalPrice: {
    fontWeight: '600',
    color: 'black',
  },
  returnSummaryText: {
    marginLeft: '5%',
    fontWeight: '800',
    fontSize: 13,
  },
  returnPolicy: {
    marginTop: '8%',
    marginLeft: '4%',
    fontWeight: '400',
    color: 'black',
    fontSize: 13,
  },
  returnPolicy1: {
    fontWeight: '500',
    color: 'black',
    textDecorationLine: 'underline',
  },
  addAddressBtn: {
    padding: '2%',
    backgroundColor: '#00338D',
    margin: '4%',
    marginTop: '1%',
  },
  placeReturnBtn: {
    padding: '2.3%',
    backgroundColor: '#00338D',
    margin: '4%',
    marginTop: '2%',
  },
  placeReturnBtnText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '500',
  },
  bottomDataText: {
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 14,
  },
  bottomDataText1: {
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 14,
    marginBottom: '5%',
  },
  bottomContainer: {
    marginTop: '7%',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});
