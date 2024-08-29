
import React, { useEffect, useState } from 'react';
import {
  View,
  Image,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ActivityIndicator,
  Alert
} from 'react-native';
import TopBar from '../TopBar1';
import back from '../PlpScreen/images/back.png';
import axios from 'axios';
import { useLoginContext } from '../Login/LoginCartProvider';
import { useCartContext } from '../Context/WomenContext';
import MobileVerify from '../Login/MobileVerify';
import CheckBox from '@react-native-community/checkbox';
import { json } from 'react-router-dom';

export default function AddressDetail({ navigation}) {
  const [BtnColor, setBtnColor] = useState(false);
  const [Error, setError] = useState(false);
  const [showActivityIndicator, setShowActivityIndicator] = useState(false);
  const [flag,setFlag]=useState(true);
  //for checking that we're updating address or not 

  const {
    deliveryAddress,
    setDeliveryAddress,
    orderIdCounter,
    setOrderIdCounter,
    setCartItem,
    userName,
    setUserName,
    streetaddress1,
    setStreetAddress1,
    city,
    DefaultAddress,
    setDefaultAddres,
    setCity,
    state,
    setState,
    pinCode,
    setPinCode,
    mobile,
    setMobile,
    houseNo,
    setHouseNo,
    userprofile,
    setUserProfile,
    allSavedAddress,
    profileAddress,
    setAllSavedAddress,
    selectedAddressListIndex,setSelectedAddressListindex,
    setProfileAddress
  } = useCartContext();

  const userNameArray = userName.split(' ');

  const {loginUserId,token,popFromStack,pushToStack,
    currentPage, setCurrentPage,
    currentPageIndex,setCurrentPageIndex,
    currentPageIndexCategory,setCurrentPageIndexCategory,ip,currentPageIndexCategory1}=useLoginContext();  const [remove1,setRemove1]=useState(0);

  const editMode=currentPageIndexCategory1;
  const selectedAddress  = currentPageIndex;
  const [getCurrentUser,setCurrentUser]=useState([]);
  const[]=useState();

  useEffect(() => {
    if (currentPageIndex > 0) {
      getProfileData2(currentPageIndex);
    }
    if(pinCode && pinCode.length>5){
     getState();
    }
  }, [currentPageIndex,pinCode,isChecked]);
  
  useEffect(() => {
    if (
      userName &&
      streetaddress1 &&
      city &&
      state &&
      pinCode &&
      mobile &&
      houseNo
    ) {
      setBtnColor(true);
      setError(false);
    }
  }, [BtnColor,setAllProfileId]);

   async function addNewAddress()
   {

    const data={
      firstName:userName.split(' ')[0],
      lastName: userName.split(' ')[1]?userName.split(' ')[1]:'',
      streetAddress: streetaddress1,
      city: city,
      state: state,
      zipCode: pinCode,
      mobile: mobile
   }
   try{
    
    axios.post(`http://${ip}:5454/api/orders/addresses`,data,{      
      headers: {
      'Authorization': `Bearer ${token}`,         
     },})  
     setDoesAddedNewAddress(true);
     fetchData();
   }catch(error){
     console.log("Error in postAddress in scheduleSubscription.jsx",error);
   }  
   getProfileData(); 
   }

  function NowUpdate(){
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
}
  const getProfileData = async () => {
    try {
      const response = await axios.get(`http://${ip}:5454/api/users/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`,         
         },
      });
      // console.log(response.data);
      
      setProfileAddress((prevProducts) => {
        const newProducts = response.data;
        // console.log("ProfiledataArray:" + JSON.stringify(newProducts));
        return newProducts;
      }); 
      NowUpdate();
      setAllSavedAddress((prevProducts) => {
        const newProducts = response.data.addresses;
        console.log("ProfiledataArray:" + JSON.stringify(newProducts));
        return newProducts;
      });
      console.log("\n\n\nAddress"+JSON.stringify(response.data.addresses));
      
      console.log("\n\n\nTOKEN:"+token);
    } catch (error) {
      console.error('Error fetching Profiledata:', error);
    }
  }
  async function feedCurrentUser(){
    console.log("\n\nfeedCurrentUser"+JSON.stringify(getCurrentUser));
  }
  const getProfileData2 = async (id) => {
     const data=allSavedAddress.filter(obj=>obj.id===id);
    //  Alert.alert("allSavedAddress"+JSON.stringify(data));
    setUserName(data[0].firstName+" "+data[0].lastName);
    setMobile(data[0].mobile);
    if(flag){
      setPinCode(data[0].zipCode);
      setFlag(false);
    }
    setState(data[0].state);
    setStreetAddress1(data[0].streetAddress);
    setCity(data[0].city);
    setHouseNo(data[0].houseNo);
  }
console.log("\n\nThis is data"+JSON.stringify(getCurrentUser));
  const removeAddressAtIndex = (indexToRemove) => {
    setAllSavedAddress(prevAddresses => {
      // Use filter to create a new array without the element at indexToRemove
      const newAddresses = prevAddresses.filter((address, currentIndex) => currentIndex !== indexToRemove);
       getProfileData();
      return newAddresses;
      
    });
  };
  

function updateAllSavedAddress(){
// Assuming you want to remove the address at index 1
removeAddressAtIndex(selectedAddressListIndex);
}

const onSaveAddressPress = async () => {
  // Check if it's a new address (selectedAddress is -1)
  // Alert.alert(editMode?'True':'false');
  if (selectedAddress === -1) {

    // Check if all required fields are filled
    if (
      userName.length > 0 &&
      mobile.length > 0 && mobile.length > 9 &&
      city.length > 0 &&
      pinCode.length > 0 && pinCode.length > 5 &&
      state.length > 0 &&
      streetaddress1.length > 0 &&
      houseNo.length > 0
    ) {
      // Split the user's name
      const userNameArray = userName.split(' ');

      const dataAdd = {
        firstName: userNameArray[0],
        lastName: userNameArray[1]?userNameArray[1]:'',
        streetAddress: streetaddress1,
        city: city,
        state: state,
        zipCode: pinCode,
        mobile: mobile,
        houseNo:houseNo,
        defaultAddress:isChecked?'true':'false'
      };
      // Check if the entered data is valid
      if(pinCode<6){
     
      }else{
      const isDataValid = (
        dataAdd.firstName && dataAdd.firstName.length > 0 &&
        dataAdd.lastName && dataAdd.lastName.length > 0 &&
        dataAdd.streetAddress && dataAdd.streetAddress.length > 0 &&
        dataAdd.city && dataAdd.city.length > 0 &&
        dataAdd.state && dataAdd.state.length > 0 &&
        dataAdd.zipCode && dataAdd.zipCode.length > 0 &&
        dataAdd.mobile && dataAdd.mobile.length > 0
      );
      
      if (isDataValid) {

        // Update allSavedAddress array with the new address
        addNewAddress();
        setAllSavedAddress(prevSavedAddress => {
          const isUnique = !prevSavedAddress.some(prevData => (
            prevData.zipCode === dataAdd.zipCode
          ));
          // Add the new address to the array only if it's unique
          return isUnique ? [dataAdd, ...prevSavedAddress] : prevSavedAddress;
        });
      }
      setShowActivityIndicator(true);
  
      setBtnColor(true);
      setTimeout(() => {
        navigation.navigate('orderSummary');
        setShowActivityIndicator(false);
      }, 1000);
    
    } }else {
      Alert.alert("Please fill all Details");
      setError(true);
    }
  } else if (editMode) {
    // Split the user's name
    const userNameArray = userName.split(' ');
    const dataAdd = {
      firstName: userNameArray[0],
      lastName: userNameArray.length > 1 ? userNameArray[1] : "", // Use an empty string if lastName is not provided
      streetAddress: streetaddress1,
      city: city,
      state: state,
      zipCode: pinCode,
      mobile: mobile,
      houseNo:houseNo,
    };

  
    
    try {
      // Update the existing address with a PUT request
      const response = await axios.put(
        `http://${ip}:5454/api/orders/${loginUserId}/addresses/${selectedAddress}`,
        dataAdd,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      setShowActivityIndicator(true);
      // Update the state with the new addresses
      updateAllSavedAddress();
      console.log('Address updated successfully:', response.data);
      setTimeout(() => {
        navigation.navigate('orderSummary');
        setShowActivityIndicator(false);
      }, 1000);
    
    } catch (error) {
      console.error('Error updating address:', error);
    }
  }

  // // Add 'orderSummary' to the navigation stack and navigate to it
  // pushToStack('orderSummary');
  // navigation.navigate('orderSummary');
};


  const onFocusChange = (field) => {
    setError(false);
  };

  const [isChecked, setChecked] = useState(false);

  const inputStyle = (errorCondition) => (
    {
    height: 40,
    borderBottomWidth: errorCondition ? 1 : 0.5,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    width: '90%',
    marginLeft: '5%',
    marginTop: '7%',
    borderColor: errorCondition ? 'red' : '#D3D3D3',
    backgroundColor: '#fff4f4',
  });
  console.log("\n\n\nAllsaved"+JSON.stringify(allSavedAddress));


   // get automatically state based on the pincode
   async function getState() {
    try {
      const response = await fetch(`http://www.postalpincode.in/api/pincode/${pinCode}`);
      const data = await response.json(); // Parse JSON response
      console.log(JSON.stringify(data)); // Log the parsed JSON data
      // Alert.alert(JSON.stringify(data.PostOffice[0]?.State));
      setState(data.PostOffice[0]?.State);
      setCity(data.PostOffice[0]?.Taluk==="NA"?data.PostOffice[0]?.District:data.PostOffice[0]?.Taluk);
    } catch (error) {
      console.log("Got error in AddressDetail.jsx in getState()" + error);
    }
  }
  

const [allrSavedAddressForDefaultAddress,setAllSavedAddressForDefaultAddress]=useState([]);
const [allProfileId,setAllProfileId]=useState([]);
const [FlagBoolean,setFlagBoolean]=useState(true);

// useEffect(() => {
//     storeAllProfileId();
// }, []);

function storeAllProfileId() {
  if (allSavedAddressForDefaultAddress && allSavedAddressForDefaultAddress.length > 0) {
    setAllProfileId(prevIds => (
      allSavedAddressForDefaultAddress.map(item => item.id)
    ));
  }
}

const getProfileDataForDefaultAddress = async () => {
  try {
    const response = await axios.get(`http://${ip}:5454/api/users/profile`, {
      headers: {
        'Authorization': `Bearer ${token}`,         
       },
    });
    // console.log(response.data);
    
  
    setAllSavedAddressForDefaultAddress((prevProducts) => {
      const newProducts = response.data.addresses;
      console.log("ProfiledataArray:" + JSON.stringify(newProducts));
      return newProducts;
    });
    console.log(JSON.stringify(response.data));
    storeAllProfileId();
  } catch (error) {
    console.error('Error fetching Profiledata:', error);
  }
}

useEffect(()=>{
  if(isChecked){
    getProfileDataForDefaultAddress();
  } 
},[isChecked,allProfileId]);


  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      {/* <Text>selected{selectedAddress}</Text> */}
      {/* <Text>{JSON.stringify(allProfileId)}</Text> */}
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Image
          source={{ uri: 'https://shorturl.at/ckGU2' }}
          style={{ width: 100, height: 100, marginLeft: '4%', marginTop: '3%' }}
        />
      </TouchableOpacity>
      {/* <Text>{editMode}{selectedAddress}</Text> */}
      {/* <Text>{userName}</Text> */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              alignItems: 'center',
            }}
          onPress={() => navigation.navigate('orderSummary')}>
                <Image source={back} style={{ marginLeft: 12 }} />

              <Text style={{ paddingLeft: 10, color: 'black', textAlign: 'center' }}>
                Delivery Address {allProfileId}
              </Text>
              </TouchableOpacity>
          <TouchableOpacity style={{ marginRight: '4%' }} onPress={() => {popFromStack(navigation)}}>
            <Text style={{ color: 'black',fontSize:13 }}>CANCEL</Text>
          </TouchableOpacity>

   </View>
       <ScrollView showsVerticalScrollIndicator={false}> 

      <SafeAreaView style={{ flex: 1 }}>


        <View style={styles.header}>
          <View style={styles.box1}>
            <Text style={styles.heading}>Contact Details</Text>
          </View>

          <TextInput
            style={inputStyle(!userName && Error)}
            placeholder="Full Name"
            value={userName}
            onChangeText={(text) => setUserName(text)}
            onFocus={() => onFocusChange('userName')}
          />
          <TextInput
            style={inputStyle(!mobile && Error)}
            placeholder="Mobile"
            value={mobile}
            inputMode="numeric"
            maxLength={10}
            onChangeText={(text) => setMobile(text)}
            onFocus={() => onFocusChange('mobile')}

          />
          <View style={styles.box1}>
            <Text style={styles.heading}>Address</Text>
          </View>
          <View style={{ flexDirection: 'row', marginLeft: 21, marginTop: '7%' }}>
            <View>
              <TextInput
                style={inputStyle(!pinCode && Error)}
                placeholder="Pin Code"
                inputMode="numeric"
                maxLength={6}
                onChangeText={(text) => setPinCode(text)}
                onFocus={() => onFocusChange('pinCode')}
                value={pinCode}
              />
            </View>
            <View style={{ marginLeft: '40%' }}>
              <TextInput
                style={{
                  ...inputStyle(!state && Error),
                  width: 110, // Set the desired width here
                }}
                placeholder="State"
                onChangeText={(text) => setState(text)}
                onFocus={() => onFocusChange('state')}
                value={state}
              />
            </View>
          </View>
          <TextInput
            style={inputStyle(!houseNo && Error)}
            placeholder="House / Floor No."
            value={houseNo}
            onChangeText={(text) => setHouseNo(text)}
            onFocus={() => onFocusChange('houseNo')}
          />
          <TextInput
            style={inputStyle(!streetaddress1 && Error)}
            placeholder="Street Address"
            value={streetaddress1}
            onChangeText={(text) => setStreetAddress1(text)}
            onFocus={() => onFocusChange('address')}
          />
          <TextInput
            style={inputStyle(!city && Error)}
            placeholder="City"
            onChangeText={(text) => setCity(text)}
            onFocus={() => onFocusChange('city')}
            value={city}
          />
          <View style={styles.btn}>
            {/* <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: '2%' }}>
              <CheckBox
                disabled={false}
                value={isChecked}
                onValueChange={(newValue) =>setChecked(newValue)
                                             }
              />
              <Text style={{ color: 'black', fontFamily: 'montseart' }}>Set this as my default address.</Text>
            </View> */}

            <TouchableOpacity
              style={{
                backgroundColor: BtnColor ? '#00338D' : '#00338D',
                padding: 9,
                borderRadius: 5,
              }}
              onPress={onSaveAddressPress}
            >
              <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold', fontSize: 18 }}>
                CONTINUE
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.bottomBox}></View>
        </View>

        {showActivityIndicator && (
          <View style={styles.activityIndicatorContainer}>
            <ActivityIndicator size="large" color="#00338D" />
          </View>
        )}
      </SafeAreaView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    marginTop: '1%',
  },
  box1: {
    marginTop: 20,
    height: 48,
    width: 420,
    padding: 10,
    backgroundColor: '#00338D',
  },
  heading: {
    color: 'white',
    padding: 1,
    fontSize: 17,
    fontWeight: '600',
  },
  btn: {
    width: 360,
    marginLeft: '6%',
    marginTop: '14%',
  },
  bottomBox: {
    height: 100,
    width: 420,
    backgroundColor: '#E8E8E8',
    marginTop: '12%',
  },
  activityIndicatorContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.7)',
  },
});

