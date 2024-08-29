import React,{useEffect,useState} from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View,Alert,PermissionsAndroid, Platform ,Button} from 'react-native';
import TopBar1 from '../TopBar1';
import back from '../PlpScreen/images/back.png';
import { FlatList } from 'react-native-gesture-handler';
import gpay from '../Payment/images/gpay.png';
import mastercard from '../Payment/images/mastercard.jpeg';
import walletpay from '../Payment/images/walletpay.png';
import upperArrow from '../Payment/images/upperArrow.png';
import visa from '../Payment/images/visa.png';
import wallet from '../Payment/images/wallet.png';
import { useCartContext } from '../Context/WomenContext';
import { useLoginContext } from '../Login/LoginCartProvider';
import axios from 'axios';
import wallet2 from '../PlpScreen/images/wallet.png';
import Geolocation from '@react-native-community/geolocation';



const paymentMethod={
        method1:{
            id:1,
            payMethod:'UPI',
            payPlatform:'Google Pay',
            payUpi:'Krishna@okbankname',
        },
        method2:{
            id:1,
            payMethod:'DEBIT CARD',
            payPlatform:'MasterCard',
            cardNo:'** ** ** 1157',       
        },
        method3:{
            id:1,
            payMethod:'CREDIT CARD',
            payPlatform:'VISA',
            cardNo:'** ** ** 3456',       
        },
}
export default function Payment1({navigation})
{
    const {cartItem,deliveryAddress,setDeliveryAddress,
      selectedAddress,setSelectedAddress,selectedAddressIndex,
      orderPlaced,setOrderPlaced,setCartItem,
      allSavedAddress,setAllSavedAddres,filteredData,
      selectedStorePickupDay,selectedStorePickupTime,disableAction,setDisableAction,selectedStoreId,deliveryOption}=useCartContext();
     
    const { userName,setUserName, streetaddress1, setStreetAddress1,city,setCity, state,setState, pinCode,setPinCode, mobile,setMobile,setHouseNo,orderId,setOrderId} = useCartContext();


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
  //   if (
  //     userName && mobile && city && pinCode && state && streetaddress1
  //   ) {
  //     const userNameArray = userName.split(' ');
  //     const dataAdd ={
  //       firstName:userNameArray[0],
  //       lastName:userNameArray[1],
  //       streetAddress:streetaddress1,
  //       city:city,
  //       state:state,
  //       zipCode:pinCode,
  //       mobile:mobile
  //   }

  //     console.log('\n\n\n\n\ndataAdd', JSON.stringify(dataAdd));
  //     console.log('\n\ndataUserName',userNameArray[0]+" "+userNameArray[1]+" "+
  //                streetaddress1+" "+city+" "+state+" "+pinCode+" "+mobile);

  //     // Make a POST request to the specified API endpoint
  //     axios.post('http://192.168.0.107:5454/api/orders/', dataAdd, {
  //       headers: {
  //         'Authorization': Bearer ${token},         
  //       },
  //     })
  //       .then(response => {
  //         // Handle successful response
  //         console.log(response.data);
  //         // Additional logic can be added here if needed
  //       })
  //       .catch(error => {
  //         // Handle error
  //         console.error('Error making API request:', error);
  //       });
  //   }

  //   setTimeout(() => {
  //     setOrderId(orderId+1);
  //     navigation.navigate('ShopTrack');
  //   }, 2000);
  // }, [navigation, token, userName, streetaddress1, city, state, pinCode, mobile]);


    
  
      function naviGating(page){
        pushToStack(page);
        navigation.navigate(page);
      }
  
    
      
    function payBtn()
    {
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
            'Authorization': 'Bearer ${token}',         
          },
        })
          .then(response => {
            // Handle successful response
            console.log(response.data);
            // Additional logic can be added here if needed
          })
          .catch(error => {
            // Handle error
            console.error('Error making API request:', error);
          });
      }
        setTimeout(()=>{
            pushToStack('paymentSuccess');
            navigation.navigate('paymentSuccess')
        },3000)
    }
    function payBtn1(){
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
            'Authorization': 'Bearer ${token}',         
          },
        })
          .then(response => {
            // Handle successful response
            console.log(response.data);
            // Additional logic can be added here if needed
          })
          .catch(error => {
            // Handle error
            console.error('Error making API request:', error);
          });
      }
       pushToStack('cardPayment');
       navigation.navigate('cardPayment');
    }


      //show user the currently unavailable options
      const showAlert = () => {
        Alert.alert(
          "Alert",
          "We regret to inform you that this tender options is currently unavailable."
        );
      };
      

      const [location, setLocation] = useState({ latitude: null, longitude: null });

      useEffect(() => {
        const requestLocationPermission = async () => {
          if (Platform.OS === 'android') {
            try {
              const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                  title: 'Location Permission',
                  message: 'This app needs access to your location.',
                  buttonNeutral: 'Ask Me Later',
                  buttonNegative: 'Cancel',
                  buttonPositive: 'OK',
                }
              );
              if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('You can use the location');
              } else {
                console.log('Location permission denied');
              }
            } catch (err) {
              console.warn(err);
            }
          }
        };
    
        requestLocationPermission();
      }, []);
    
      const getLocation = () => {
        Geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setLocation({ latitude, longitude });
          },
          (error) => {
            console.log(error.code, error.message);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
      };
      console.log(JSON.stringify("Latitude: "+ location.latitude+" "+"Longitude: "+location.longitude));

      useEffect(() => {
   {
          if (allSavedAddress && allSavedAddress.length > 0) {
            const selected = allSavedAddress[selectedAddress]; // Use index to find the selected address
            Alert.alert(JSON.stringify(selected));
            if (selected) {
              setUserName(`${selected.firstName} ${selected.lastName}`);
              setStreetAddress1(selected.streetAddress);
              setCity(selected.city);
              setState(selected.state);
              setPinCode(selected.zipCode?selected.zipCode:'122001');
              setMobile(selected.mobile);
            }
          }
        }
      }, [
        userName,
        mobile,
        city,
        pinCode,
        state,
        streetaddress1,
        allSavedAddress,
        selectedAddress,
        setUserName,
        setStreetAddress1,
        setCity,
        setState,
        setPinCode,
        setMobile,
      ]);
     

    return( 
        <>
     <View style={{ flex: 1, backgroundColor: 'white' }}>
{/*    
     <View>
      <Button title="Get Location" onPress={getLocation} />
      {location.latitude && location.longitude ? (
        <Text>Latitude: {location.latitude}, Longitude: {location.longitude}</Text>
      ) : (
        <Text>No location data</Text>
      )}
    </View> */}

     <TouchableOpacity  onPress={() => {naviGating('Home')
                                       setDisableAction(true)
     }}>
        <Image
          source={{ uri: 'https://shorturl.at/ckGU2' }}
          style={{ width: 100, height: 100, marginLeft: '4%',}}
        />
      </TouchableOpacity>   
     <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3%' }}>

    <TouchableOpacity  style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => popFromStack(navigation)}>
      <Image source={back} style={{ marginLeft: 12 }} />

    <Text style={{ paddingLeft: 10, color: 'black', textAlign: 'center' }}>
      Payment Method
    </Text>
    </TouchableOpacity>

  <TouchableOpacity style={{ marginRight: '4%' }} onPress={() => {popFromStack(navigation)}}>
    <Text style={{ color: 'black' }}>CANCEL</Text>
  </TouchableOpacity>
</View>
           <ScrollView>
                 {/* { !orderPlaced && (
                  <View style={styles.userDetail}>
                  <Text style={styles.text}>Deliver to: {cartItem.user.addresses[selectedAddress].firstName} {cartItem.user.addresses[selectedAddress].lastName}</Text>
                        <Text style={styles.text}>{cartItem.user.addresses[selectedAddress].streetAddress},{cartItem.user.addresses[selectedAddress].city}</Text>
                        <Text style={styles.text}>{cartItem.user.addresses[selectedAddress].mobile}</Text>
                        <Text style={styles.text}>{cartItem.user.addresses[selectedAddress].state},{cartItem.user.addresses[selectedAddress].zipCode}</Text>
                        <TouchableOpacity
                          style={{
                            padding: 10,
                            borderRadius: 5,
                            marginTop:18,
                            backgroundColor:'#00338D'
                         }}
                         onPress={()=>{navigation.navigate('AddressDetail')}}
                        >
                         <Text style={{ color: 'white', textAlign: 'center' }}>
                              Change or Add new Address
                         </Text>
                        </TouchableOpacity>
                  </View>
                 )
               } */}
               {
                !disableAction && (
                filteredData && filteredData.length>0 && !disableAction?
                <View style={styles.userDetail}>
                   <Text style={styles.text}>Shipped to: </Text>
                   {
                   allSavedAddress.map((address, index) => (
                    <View key={index} style={{ marginBottom: 10 }}>
                      {index === selectedAddress && (
                        <>
                         <Text style={{ color: 'black', fontWeight: '500' }}>{filteredData[0].name ? filteredData[0].name.toUpperCase() : ''}</Text>
                         <Text style={{ color: '#00338D', fontWeight: '400', fontSize: 13.6 }}>
                            <Text style={{ color: '#00338D', fontWeight: '300' }}>Pick up Date: </Text>
                          {selectedStorePickupDay ? selectedStorePickupDay : ''}
                        </Text>
                        <Text style={{ color: '#00338D', fontWeight: '400', fontSize: 13.6 }}>
                            <Text style={{ color: '#00338D', fontWeight: '300' }}>Pick up Time: </Text>
                            {selectedStorePickupTime ? selectedStorePickupTime : ''}
                        </Text>                    
                         </>
                      )}
                   </View>
                  ))}                  
                </View>:
                 <View style={styles.userDetail}>
                   <Text style={styles.text}>Deliver to: </Text>
                   {
                   allSavedAddress.map((address, index) => (
                    <View key={index} style={{ marginBottom: 10 }}>
                      {index === selectedAddress && (
                        <>
                         <Text style={{ color: 'black', fontWeight: '500' }}>{address.firstName.toUpperCase()} {address.lastName.toUpperCase()}</Text>
                         <Text style={{ color: 'black', fontWeight: '300', fontSize: 13.6 }}>{address.streetAddress}, {address.city}</Text>
                         <Text style={{ color: 'black', fontWeight: '300', fontSize: 13.6 }}>{address.state}, {address.zipCode}</Text>
                         <Text style={{ color: 'black', fontWeight: '300', fontSize: 13.6, paddingTop: '0.3%', marginBottom: '6%' }}>{address.mobile}</Text>
                       </>
                      )}
                   </View>
                  ))}

                   
                 </View>)
               }
                  
                  <Text style={styles.heading}>Your Saved Payment Methods</Text>
                  <View style={{alignItems:'center'}}>
                      <View style={styles.PayApp}>
                         <View style={{marginTop:'5%',padding:8}}>
                            <Image source={gpay} style={{width:62,height:62}}/>
                         </View>
                         <View style={{padding:12,justifyContent:'center'}}>
                                
                                <Text style={{fontWeight:'bold',color:'black',fontSize:17}}>{paymentMethod.method1.payMethod}</Text>
                                <Text>{paymentMethod.method1.payPlatform}</Text>
                                <Text>UPI id:{paymentMethod.method1.payUpi}</Text>
                                <TouchableOpacity style={styles.payBtn}
                                  onPress={()=>{showAlert()}}
                                  >                               
                                    <Text style={{color:'white',textAlign:'center',fontWeight:'bold'}}>PAY NOW</Text>
                                </TouchableOpacity>
                         </View>
                      </View>
                  </View>
                  <View style={{alignItems:'center'}}>
                      <View style={styles.PayApp}>
                         <View style={{marginTop:'5%',padding:8}}>
                         <Image source={visa} style={{width:65,height:21}}/>
                         </View>
                         <View style={{padding:12,justifyContent:'center'}}>
                                
                                <Text style={{fontWeight:'bold',color:'black',fontSize:17}}>{paymentMethod.method2.payMethod}</Text>
                                <Text>{paymentMethod.method2.payPlatform}</Text>
                                <Text>Card no : {paymentMethod.method2.cardNo}</Text>
                                <TouchableOpacity style={styles.payBtn}
                                 onPress={()=>{showAlert()}}>
                                    <Text style={{color:'white',textAlign:'center',fontWeight:'bold'}}>PAY NOW</Text>
                                </TouchableOpacity>
                         </View>
                      </View>
                  </View>             
                  <View style={{alignItems:'center'}}>
                      <View style={styles.PayApp}>
                         <View style={{marginTop:'5%',padding:8}}>
                            <Image source={mastercard} style={{width:65,height:21}}/>
                         </View>
                         <View style={{padding:12,justifyContent:'center'}}>
                                
                                <Text style={{fontWeight:'bold',color:'black',fontSize:17}}>{paymentMethod.method3.payMethod}</Text>
                                <Text>{paymentMethod.method3.payPlatform}</Text>
                                <Text>Card no : {paymentMethod.method3.cardNo}</Text>
                                <TouchableOpacity style={styles.payBtn}
                                onPress={()=>{showAlert()}}>
                                 <Text style={{color:'white',textAlign:'center',fontWeight:'bold'}}>PAY NOW</Text>
                                </TouchableOpacity>
                         </View>

                      </View>
                  </View>  

                   <Text style={styles.heading}>Payment Offers</Text>

                   <View style={{alignItems:'center',marginBottom:'12%'}}>
       
                   {/* <View style={{flexDirection:'row',justifyContent:'center',marginTop:'5%'}}>                
                  <View style={styles.offers}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                      <Image source={{uri:'https://shorturl.at/iqtA4'}} style={{width:40,height:28,marginRight:'4%'}}/>
                       <Text style={styles.offerText}>Gift Card / e-Voucher</Text>
                     </View>
                     <View>
                       <Image source={upperArrow} style={{width:22,height:12,transform: [{rotate:'-90deg'}],marginTop:'10%'}}/>
                     </View>
                  </View>
                </View> */}

                {/* <TouchableOpacity style={{flexDirection:'row',justifyContent:'center',marginTop:'2%'}}>                
                  <TouchableOpacity style={styles.offers}>
                     <TouchableOpacity style={{flexDirection:'row',alignItems:'center'}} 
                      onPress={()=>{forNavigate('paymentSuccess')}}>
                        <Image source={{uri:'https://shorturl.at/cdUW6'}} style={{width:52,height:32,marginRight:'4%'}}/>
                        <Text style={styles.offerText}>Cash on Delivery</Text>
                    </TouchableOpacity>
                     <TouchableOpacity>
                       <Image source={upperArrow} style={{width:22,height:12,transform: [{rotate:'-90deg'}],marginTop:'45%'}}/>
                     </TouchableOpacity>
                  </TouchableOpacity>
                </TouchableOpacity> */}

                <View style={{flexDirection:'row',justifyContent:'center',marginTop:'2%'}}>                
                  <TouchableOpacity style={styles.offers} activeOpacity={1}
                    onPress={() => {
                      forNavigate('Payment2');
                      
                    }}
                    >
                    <View style={{flexDirection:'row',alignItems:'center',alignContent:'center'}}>
                        <Image source={wallet2} style={{width:42,height:32,marginRight:'4%'}}/>
                       <Text style={styles.offerText}>Other Payment Option</Text>
                     </View>
                     <View>
                       <Image source={upperArrow} style={{width:22,height:12,transform: [{rotate:'-90deg'}],marginTop:'50%'}}/>
                     </View>
                  </TouchableOpacity>
                </View>
                 

                 
                 
                   </View>

           </ScrollView>
</View>
        </>
    );
}
const styles={
    userDetail:{
        borderWidth:1,
        borderColor:'#D5D5D5',
        width:'90%',
        marginLeft:'6%',
        marginTop:'5%',
        padding:'5%'
    },
    text:{
        fontWeight:"600",
        color:'black'
    },
    payMethods:{
        padding:'10%',
    },
    payMethodText:{
       fontSize:18,
       color:'#00338D'
    },
    PayApp:{
       flexDirection:'row',
       borderWidth:1,
       borderColor:'#C8C8C8',
       height:140,
       width:380,
       marginTop:'1%',
       borderRadius:10,
    },
    payBtn:{
        backgroundColor:'grey',
        padding:7,
        borderRadius:7,
        width:240,
        marginTop:'8%'
    },
    heading:{
        color:'#00338D',
        fontSize:17,
        marginLeft:'5%',
        marginTop:'4%',
        marginBottom:'2%'
    },
    offers:{
        flexDirection:'row',
        borderWidth:1,
        borderColor:'#C8C8C8',
        height:60,
        width:380,
        borderRadius:10,
        textAlign:'center',
        marginTop:'1%',
        justifyContent:'space-between',
        padding:12,
    },
    offerText:{
        fontSize:17,
        color:'black',
    },
    offerTexter:{
        fontSize:11,
    },
    offerHighlight:{
        fontSize:11,
        color:'#00A3A1',     
    }
}