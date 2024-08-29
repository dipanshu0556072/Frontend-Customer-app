
import React, { useEffect, useState, useRef } from 'react';
import { Alert, FlatList,TextInput,StyleSheet, View, Text, TouchableOpacity, Image, ScrollView, RefreshControl } from 'react-native';
import { useCartContext } from '../Context/WomenContext';
import back from '../PlpScreen/images/back.png';
import { RadioButton,  } from 'react-native-paper';
import axios, { all } from 'axios';
import { useLoginContext } from '../Login/LoginCartProvider';
import next from '../PlpScreen/images/next.png';
import Address from '../savedAddress.png';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();
import HomeBar from '../HomeBar';
import ProfileBar from '../ProfileBar';
import Home1 from '../Fashion';
import bell1 from '../PlpScreen/images/bell1.png';
import categories1 from '../PlpScreen/images/category1.png';
import home1 from '../PlpScreen/images/home1.png';
import user1 from '../PlpScreen/images/user1.png';
import Notification from '../Notification';

const OrderSummary = ({ navigation }) => {
  const [check, setCheck] = useState([]);
  const [defaultAddressIndex, setDefaultAddressIndex] = useState(null);
  const [dropdownData, setDropdownData] = useState([]);
  const [isAddressListNULL,setIsAddressListNULL]=useState(false);

  const {
    selectedAddress,
    setSelectedAddress,
    allSavedAddress,
    setAllSavedAddress,
    setSelectedAddressListindex,
    isItForPlaceOrder,
    setUserName,
    setStreetAddress1,
    setCity,setState,
    setPinCode, setMobile,
    setHouseNo,setDefaultAddres,setDisableAction
  } = useCartContext();

  
  
  useEffect(() => {
    // Extract street addresses from allSavedAddress and set it as dropdownData
    const addresses = allSavedAddress.map(address => address.streetAddress);
    setDropdownData(addresses);
  }, [allSavedAddress]);

  const {ip,token,popFromStack,pushToStack,
    currentPage, setCurrentPage,
    currentPageIndex,setCurrentPageIndex,
    currentPageIndexCategory,setCurrentPageIndexCategory1}=useLoginContext(); 


  const [selectedAddressIndex, setSelectedAddressIndex] = useState(null);
  const toggleSelectedAddress = (addressIndex) => {
    setSelectedAddress((prevIndex) => (prevIndex === addressIndex ? null : addressIndex));
  };

  // function orderPlaced() {
  //   navigation.navigate('Payment1');
  // }
  const forNavigate=(page)=>{
    console.log(page+" "+currentPage[currentPage.length-1]);
    if(page==='mainHome'){
      setCurrentPage('mainHome');
      navigation.navigate(page)
    }else{
      if(isAddressListNULL && isAddressListNULL.length<=0){
        if(currentPage && currentPage[currentPage.length-1]!==page){
          pushToStack('Payment2');
          navigation.navigate('Payment2')
        }else{
          popFromStack(navigation);
        }            
      }else{
      if(currentPage && currentPage[currentPage.length-1]!==page){
        pushToStack(page);
        navigation.navigate(page)
      }else{
        popFromStack(navigation);
      }  
    }
   }
  }
  function resetFeilds(){
    setUserName("");
    setMobile("");
    setPinCode("");
    setStreetAddress1("");
    setState("");
    setHouseNo("");
    setCity("");
  }
  const forNavigate1=(page,id,tileIndex)=>{
    console.log(page+" "+currentPage[currentPage.length-1]);
    // Alert.alert(JSON.stringify(id));
   
    if(id===-1){
     resetFeilds();
    }
    if(page==='mainHome'){
      setCurrentPage('mainHome');
      navigation.navigate(page)
    }else{
      if(currentPage && currentPage[currentPage.length-1]!==page){
        pushToStack(page);
        navigation.navigate(page)
      }else{
        popFromStack(navigation);
      }  
    }
    setCurrentPageIndex(id);
    setCurrentPageIndexCategory1(tileIndex);
  }
  const forNavigate2=(page)=>{
    console.log(page+" "+currentPage[currentPage.length-1]);
    // Alert.alert(JSON.stringify(id));
    setDisableAction(false);

    if(page==='mainHome'){
      setCurrentPage('mainHome');
      navigation.navigate(page)
    }else{
      if(currentPage && currentPage[currentPage.length-1]!==page){
        if(allSavedAddress.length<=1){
          pushToStack('Payment2');
          navigation.navigate('Payment2')
        }else{
          pushToStack('Payment1');
          navigation.navigate('Payment1')
        }
      }else{
        popFromStack(navigation);
      }  
    }
  }

  const areAddressesEqual = (address1, address2) => {
    return address1.firstName === address2.firstName && address1.lastName === address2.lastName;
  };

  const uniqueAddresses = allSavedAddress.filter((address, index, self) => {
    return index === self.findIndex((a) => areAddressesEqual(a, address));
  });

  
  const handleEditAddressPress = (id,tileIndex) => {
    // Navigate to addressdetail page with a parameter indicating edit mode
    setSelectedAddressListindex(tileIndex);
    navigation.navigate('AddressDetail', { editMode: true, selectedAddress: id });
  };

  console.log(JSON.stringify(dropdownData));

  const [value, setValue] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleChange = (text) => {
    setValue(text);
    if(text.length>0){
     setShowAllSavedAddress(false);
    }else{
     setShowAllSavedAddress(); 
    }
    if (text) {
      const filteredOptions = dropdownData.filter((option) =>
        option.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredData(filteredOptions);
      setIsDropdownOpen(true);
    } else {
      setFilteredData([]);
      setIsDropdownOpen(false);
    }
  };
  const handleOptionSelect = (item) => {
    setValue(item);
    setIsDropdownOpen(false);
  };
  const renderHighlightedText = (item) => {
    const index = item.toLowerCase().indexOf(value.toLowerCase());
    const prefix = item.substring(0, index);
    const match = item.substring(index, index + value.length);
    const suffix = item.substring(index + value.length);

    return (
      <Text>
        {prefix}
        <Text style={styles.boldText}>{match}</Text>
        {suffix}
      </Text>
    );
  };
  console.log(JSON.stringify(allSavedAddress));

  const [showAllSavedAddress,setShowAllSavedAddress]=useState(true);
useEffect(()=>{
  
},[showAllSavedAddress]);


const getProfileData = async () => {
  try {
    const response = await axios.get(`http://${ip}:5454/api/users/profile`, {
      headers: {
        'Authorization': `Bearer ${token}`,         
       },
    });
    // console.log(response.data);
   setAllSavedAddress(response.data.addresses);
    setIsAddressListNULL((prevProducts) => {
      const newProducts = response.data.addresses;
      console.log("ProfiledataArray:" + JSON.stringify(newProducts));
      return newProducts;
    });
    
    console.log("\n\n\nTOKEN:"+token);
  } catch (error) {
    console.error('Error fetching Profiledata: in OrderSummary.jsx', error);
  }
}
useEffect(()=>{
  getProfileData();
},[token]);
  return (
    <>
      {/* <Text>{JSON.stringify(allSavedAddress)}</Text> */}
      <View style={{ flex: 1, backgroundColor: 'white',}}>
       {/* <Text>{JSON.stringify(allSavedAddress)}</Text> */}
        {/* <Text>{currentPage}</Text> */}
        <TouchableOpacity onPress={() => {forNavigate('mainHome')
                                          setDisableAction(true)
        }}>
          <Image
            source={{ uri: 'https://shorturl.at/ckGU2' }}
            style={{ width: 100, height: 100, marginLeft: '4%' ,marginTop:'3%'}}
          />
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: '1%', marginBottom: '3%' }}>
   
            <TouchableOpacity onPress={() => { popFromStack(navigation) }}
             style={{ flexDirection: 'row', alignItems: 'center',padding:'4%' }}>
              <Image source={back} />

            <Text style={{ paddingLeft: 10, color: 'black', textAlign: 'center' }}>
              Address
            </Text>
            </TouchableOpacity>
          {
            isItForPlaceOrder?
            <TouchableOpacity style={{ marginRight: '4%' }} onPress={() => {popFromStack(navigation)}}>
              <Text style={{ color: 'black',fontSize:13 }}>CANCEL</Text>
            </TouchableOpacity>:
            <TouchableOpacity style={{ marginRight: '4%' }} onPress={() => {popFromStack(navigation)}}>
              <Text style={{ color: 'black' }}></Text>
            </TouchableOpacity>
          }
        </View>
        <ScrollView showsVerticalScrollIndicator={false} style={{ marginBottom: '14%' }} refreshControl={<RefreshControl refreshing={false} onRefresh={() => { }} />}>

            <Text style={{ color: 'black', padding: '3%', fontSize: 18, fontWeight: '800',  }}>
            Select a delivery address
          </Text>
{/* <TextInput
  style={{
    width: 360,
    height: 40,
    marginLeft: '6%',
    marginBottom: '4%',
    borderBottomColor: '#00338D',  // Set the bottom border color to #00338D
    borderBottomWidth: 0.6,          // You can adjust the borderWidth as needed
    paddingLeft: 5,  
    backgroundColor:'white'              // Add some padding to the left for better appearance
  }}
  onChangeText={handleChange}
  placeholder="Search Address"
/> */}

{
  allSavedAddress && allSavedAddress.length<=0 && 
  (<>
  <Image source={Address} style={{width:400,height:220,marginTop:'23%'}}/>
  </>)
}
{isDropdownOpen && (
        <FlatList
          data={filteredData}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.dropdownOption}
              onPress={() => handleOptionSelect(item)}>
              {renderHighlightedText(item)}
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.toString()}
        />
      )}


         
          {showAllSavedAddress && allSavedAddress.map((address, addressIndex) => (
            <>
            <View key={addressIndex} style={{ padding: '1%'}}>
              <TouchableOpacity
                style={{
                  borderWidth: 1,
                  borderColor: selectedAddress === addressIndex ? '#00338D' : 'grey',
                  marginLeft: '4%',
                  marginRight: '4%',
                  padding: '4%',
                  flexDirection: 'row',
                  borderWidth: 2,
                  borderRadius: 12,
                }}
                onPress={() => toggleSelectedAddress(addressIndex)}
                activeOpacity={1}
              >
                <View style={{ marginTop: '4%' }}>
                  <RadioButton
                    value={addressIndex}
                    status={selectedAddress === addressIndex ? 'checked' : 'unchecked'}
                    onPress={() => toggleSelectedAddress(addressIndex)}
                    color="#00338D"
                  />
                </View>
                <View>
                  <Text style={{ color: 'black', fontWeight: '500', fontSize: 15 }}>
                    {address.firstName} {address.lastName}
                  </Text>
                  <Text style={{ color: 'black', fontWeight: '300', fontSize: 13.6 }}>{address.houseNo}</Text>
                  <Text style={{ color: 'black', fontWeight: '300', fontSize: 13.6 }}>{address.streetAddress}</Text>
                  <Text style={{ color: 'black', fontWeight: '300', fontSize: 13.6 }}>
                    {address.city}, {address.state}, {address.zipCode}
                  </Text>
                  <Text style={{ color: 'black', fontWeight: '300', fontSize: 13.6, paddingTop: '0.3%', marginBottom: '6%' }}>
                    {address.mobile}
                  </Text>
                  {selectedAddress === addressIndex && (
                    <>
                      {
                        isItForPlaceOrder?
                        <TouchableOpacity
                          style={{ backgroundColor: '#00338D', padding: '6%', borderRadius: 6,  width: 250,height:50 }}
                          onPress={() => {forNavigate2('Payment1')}}
                         >
                         <Text style={{ color: 'white', textAlign: 'center',}}>Deliver to this address</Text>
                       </TouchableOpacity>:
                       <></>
                      }
                      <TouchableOpacity
                        style={{ borderColor: '#00338D', borderWidth: 1, padding: '6%', borderRadius: 6,  width: 250,height:50 , marginTop: '6%', marginBottom: '7%' }}
                        // onPress={() => handleEditAddressPress(address.id,selectedAddress)}
                        onPress={()=>{forNavigate1('AddressDetail',address.id,true)}}
                      >
                        <Text style={{ color: '#00338D', textAlign: 'center' }}>Edit address</Text>
                      </TouchableOpacity>
                    </>
                  )}
                </View>
              </TouchableOpacity>
            </View>
            </>
          ))
          }

            <TouchableOpacity
            style={{
              borderTopWidth: 1,
              borderBottomWidth: 1,
              borderRightWidth: 1,
              borderLeftWidth: 1,
              borderColor: 'black',
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: '3%',
              marginLeft: '4%',
              marginRight: '4%',
              borderRadius: 12,
              marginTop:'3%'
            }}
            // onPress={() => { navigation.navigate('AddressDetail', { editMode: false, selectedAddress: -1 })}}
            onPress={()=>{forNavigate1('AddressDetail',-1,false)}}
          >
            <Text style={{ color: 'black', fontWeight: '400'}}>Add new Address</Text>
            <Image source={next} style={{ width: 10, height: 15 }} />
          </TouchableOpacity>
          

        

        </ScrollView>
        {BottomNavigator()}
      </View>
    </>
  );
  function EmptyScreen() {
    return null; // Render nothing
  }
  function BottomNavigator(){
    return (
      <Tab.Navigator 
        initialRouteName="null"
        tabBarOptions={{
          activeTintColor: '#00338D',
          showIcon: true,
          labelStyle: {
            margin: 1,  
            fontSize: 10,
            marginBottom: 4
          },
          tabStyle: {
            height: 50,
          },
        }}
      >
        <Tab.Screen 
          name="HomeBar" 
          component={EmptyScreen}
          options={{
            headerShown: false,
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
              <Image 
                source={home1}
                style={{ width: 20, height: 20, tintColor: navigation.isFocused() ? 'grey' : color }}
              />
            ),
            tabBarLabelStyle: { // Add this property to change the label color
              color: 'grey', // Change the color to whatever color you prefer
              marginBottom:'3%'
            }
          }}
          listeners={{
            tabPress: () => {
              setCurrentPage('mainHome');
              navigation.navigate('mainHome');
            },
          }}
          
        />
        <Tab.Screen 
          name="Home1" 
          component={EmptyScreen} 
          options={{
            headerShown: false,
            tabBarLabel: 'Category',
            tabBarIcon: ({ color, size }) => (
              <Image 
                source={categories1}
                style={{ width: 20, height: 20, tintColor: navigation.isFocused() ? 'grey' : color }}
              />
            ),
            tabBarLabelStyle: { // Add this property to change the label color
              color: 'grey', // Change the color to whatever color you prefer
              marginBottom:'3%'
            }

          }}
          listeners={{
            tabPress: () => {
              navigation.navigate('Home1');
              setCurrentPage(['mainHome','Home1']);
            },
          }}
        />
        <Tab.Screen 
          name="Notification" 
          component={EmptyScreen} 
          options={{  
            headerShown: false,
            tabBarLabel: 'Notification',
            tabBarIcon: ({ color, size }) => (
              <Image 
                source={bell1}
                style={{ width: 20, height: 20, tintColor: navigation.isFocused() ? 'grey' : color }}
              />
            ),
            tabBarLabelStyle: { // Add this property to change the label color
              color: 'grey', // Change the color to whatever color you prefer
              marginBottom:'3%'
            }

          }}
          listeners={{
            tabPress: () => {
              // navigation.navigate('Notification');
            },
          }}
        />
        <Tab.Screen 
          name="Profile" 
          component={EmptyScreen} 
          options={{
            headerShown: false,
            // tabBarLabel: userprofile?.firstName,
            tabBarIcon: ({ color, size }) => (
              <Image 
                source={user1}
                style={{ width: 20, height: 20, tintColor: navigation.isFocused() ? 'grey' : color }}
              />
            ),
            tabBarLabelStyle: { // Add this property to change the label color
              color: 'grey', // Change the color to whatever color you prefer
              marginBottom:'3%'
            }

          }}
          listeners={{
            tabPress: () => {
              navigation.navigate('mainHome');
              setCurrentPage(['mainHome']);
            },
          }}
        />
      </Tab.Navigator>
    );
  }

  
}

export default OrderSummary;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
  },
  horizontalLine2: {
    borderBottomWidth: 0.9,
    borderBottomColor: 'grey',
    marginVertical: 8,
    height: 20,
  },
  horizontalLine1: {
    borderBottomWidth: 0.3,
    borderBottomColor: 'grey',
    marginVertical: 8,
  },
  addressContainer: {
    marginLeft: '4%',
    marginRight: '4%'
  },
  container2: {
    marginTop: '7%',
  },
  boldText: {
    fontWeight: 'bold',
    backgroundColor: 'yellow' 
  },
  dropdownOption: {
    padding: 10,
    marginLeft:'4%'
  },
});

