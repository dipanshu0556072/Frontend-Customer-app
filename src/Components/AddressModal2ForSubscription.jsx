import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
} from 'react-native';

import React, {useState} from 'react';
import {RadioButton} from 'react-native-paper';
import {useGroceryContext} from '../Grocery/GroceryContext';

import {useCartContext} from '../Context/WomenContext';
import {useLoginContext} from '../Login/LoginCartProvider';
import axios from 'axios';

const AddressModal2ForSubscription = ({visible, onClose}) => {
  const {addressList, setAddressList, selectedAddress, setSelectedAddress} =
    useGroceryContext();
  const {ip, token, popFromStack} = useLoginContext();
  const {setWalletBalance} = useCartContext();
  const {
    userName,
    setUserName,
    mobile,
    setMobile,
    state,
    setState,
    pinCode,
    setPinCode,
    houseNo,
    setHouseNo,
    streetaddress1,
    setStreetAddress1,
    city,
    setCity,
    setScheduleSubscriptionOption,
  } = useCartContext();
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
  const [showAddressModal1, setShowAddressModal1] = useState(false);

  const toggleSelectedAddress = addressIndex => {
    setSelectedAddress(prevIndex =>
      prevIndex === addressIndex ? null : addressIndex,
    );
  };

  const addNewAddressOption = () => {
    setShowAddressModal1(true); // Open the second modal
  };

  //fetch addressList
  const fetchData = async () => {
    const header = {
      Authorization: `Bearer ${token}`,
    };

    try {
      const response = await axios.get(`http://${ip}:5454/api/users/profile`, {
        headers: header,
      });
      if (
        response.data &&
        response.data.wallet &&
        response.data.wallet.balance
      ) {
        setWalletBalance(response.data.wallet.balance);
      }
      setAddressList(response.data.addresses);
    } catch (error) {
      console.log('Error fetching profile:', error);
      // Handle the error as needed
    }
  };
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
  //onPress of continue button

  const handleAddress = async () => {
    if (
      userName === '' ||
      pinCode === '' ||
      streetaddress1 === '' ||
      mobile === '' ||
      houseNo === '' ||
      state === '' ||
      city === ''
    ) {
      if (userName === '') {
        setUserNameNull(true);
      }
      if (pinCode === '') {
        setPinCodeNull(true);
      }
      if (streetaddress1 === '') {
        setStreetAddressNull(true);
      }
      if (mobile === '') {
        setMobileNumberNull(true);
      }
      if (houseNo === '') {
        setHouseNumberNull(true);
      }
      if (state === '') {
        setStateNull(true);
      }
      if (city === '') {
        setCityNull(true);
      }
    } else {
      const data = {
        firstName: userName.split(' ')[0],
        lastName: userName.split(' ')[1] ? userName.split(' ')[1] : '',
        streetAddress: streetaddress1,
        city: city,
        state: state,
        zipCode: pinCode,
        mobile: mobile,
      };
      try {
        axios.post(`http://${ip}:5454/api/orders/addresses`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Address added in adddresList successfully!');
        onClose();
        fetchData();
        setShowAddressModal1(false);
      } catch (error) {
        console.log('Error in postAddress in scheduleSubscription.jsx', error);
      }
    }
  };
  // Close modal and reset subscription type
  const onPressOfCrossBtn = () => {
    onClose();
    setShowAddressModal1(false);
  };

  return (
    <View>
      {showAddressModal1 || addressList.length === 0 ? (
        <Modal
          animationType="slide"
          transparent={true}
          visible={visible}
          onRequestClose={onClose}>
          <View style={styles.modalContainer}>
            <TouchableOpacity
              style={styles.closeModalBtn}
              onPress={onPressOfCrossBtn}>
              <Text style={{fontSize: 23}}>╳</Text>
            </TouchableOpacity>
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
                    onChangeText={text => setMobile(text)}
                    value={mobile}
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
                    onChangeText={text => setHouseNo(text)}
                    value={houseNo}
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
                    onChangeText={text => setStreetAddress1(text)}
                    value={streetaddress1}
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
        </Modal>
      ) : (
        <Modal
          animationType="slide"
          transparent={true}
          visible={visible}
          onRequestClose={onClose}>
          <ScrollView>
            <View style={styles.modalContainer}>
            <TouchableOpacity
              style={styles.closeModalBtn}
              onPress={onPressOfCrossBtn}>
              <Text style={{fontSize: 23}}>╳</Text>
            </TouchableOpacity>
              <View style={styles.AddressModal1}>
                <Text style={styles.addressMainHead1}>
                  Please Select Delivery Address
                </Text>
                <View style={styles.addressListContainer}>
                  {addressList.map((item, index) => (
                    <View
                      key={index}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        height: 100,
                        width: 360,
                        margin: '1%',
                        borderWidth: 1.6,
                        borderColor:
                          selectedAddress === index ? '#00338D' : '#D3D3D3',
                        borderRadius: 13,
                        padding: '3%',
                      }}>
                      <RadioButton
                        value={index}
                        status={
                          selectedAddress === index ? 'checked' : 'unchecked'
                        }
                        onPress={() => toggleSelectedAddress(index)}
                        color="#00338D"
                      />
                      <View>
                        <Text style={styles.addressListHead}>
                          {item.firstName} {item.lastName}
                        </Text>
                        <Text style={styles.addressListSubHead}>
                          {item.streetAddress}
                        </Text>
                        <Text style={styles.addressListSubHead}>
                          {item.city} , {item.state}
                        </Text>
                        <Text style={styles.addressListSubHead}>
                          IND,{item.zipCode}
                        </Text>
                      </View>
                    </View>
                  ))}
                </View>
                <TouchableOpacity
                  style={styles.addNewAddressBtn}
                  onPress={addNewAddressOption}>
                  <Text style={styles.addNewAddressBtnText}>
                    Add New Address
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </Modal>
      )}
    </View>
  );
};

export default AddressModal2ForSubscription;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  AddressModal1: {
    width: '100%',
    backgroundColor: 'white',

    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  addressMainHead1: {
    color: 'black',
    fontSize: 20,
    margin: '4%',
    marginTop: '10%',
    fontWeight: '600',
  },
  addressListContainer: {
    margin: '2%',
    alignItems: 'center',
  },
  addNewAddressBtn: {
    borderColor: 'black',
    borderWidth: 1.2,
    width: '86%',
    padding: '2%',
    alignSelf: 'center',
    borderRadius: 12,
    marginBottom: '4%',
  },
  addNewAddressBtnText: {
    color: 'black',
  },
  addressListHead: {
    color: 'black',
    fontWeight: '600',
  },
  addressListSubHead: {
    color: 'black',
  },
  //for fill new address details
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  AddressModal: {
    height: 960,
    width: '100%',
    backgroundColor: 'white',
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
  closeModalBtn: {
    backgroundColor: 'white',
    width: 40,
    height: 40,
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginTop: '100%',
    marginBottom: '3%',
    padding: 3,
  },
});
