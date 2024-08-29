import React, { createContext,useState,useEffect } from 'react';
import TopBar1 from '../TopBar1';
import { Image, Text, View, ViewBase,TouchableOpacity,Modal,TouchableWithoutFeedback,Alert } from 'react-native';
import back from '../PlpScreen/images/back.png';
import { ScrollView } from 'react-native';
import gpay from '../Payment/images/gpay.png';
import wallet from '../PlpScreen/images/wallet.png';
import amazonpay from '../Payment/images/amazonpay.png';
import upperArrow from '../Payment/images/upperArrow.png';
import walletpay from '../Payment/images/walletpay.jpeg';
import { RadioButton } from 'react-native-paper';
import phonepay from '../Payment/images/phonepe.png';
import airtel from '../Payment/images/airtel.png';
import freecharge from '../Payment/images/freecharge.png';
import mobilwik from '../Payment/images/mobilwik.png';
import { useCartContext } from '../Context/WomenContext';
import cross2 from '../PlpScreen/images/close.png';
import amazon  from '../PlpScreen/images/amazon.png'
import plus from '../PlpScreen/images/plus.png'
import { useLoginContext } from '../Login/LoginCartProvider';
import axios from 'axios';
export default function Payment2({navigation})
{
  const { userName, streetaddress1, city, state, pinCode, mobile,orderId,setOrderId,deliveryOption,filteredData,
    selectedStorePickupDay,selectedStorePickupTime,disableAction,setDisableAction,
    addMoneyToWalletTender,setAddMoneyToWalletTender,
    walletBalance,setWalletBalance
  } = useCartContext();
  const { setUserName, setStreetAddress1,setCity, setState, setPinCode, setMobile,setHouseNo} = useCartContext();


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


    function naviGating(page){
      pushToStack(page);
      navigation.navigate(page);
    }



  const closeModal = () => {
    setModalVisible(false);
  };

  const openModal = () => {
    setModalVisible(true);
  };

   const {selectedAddress,allSavedAddress,orderItemPrice,totalAmount, SubtotalAmount,placedOrder,setPlacedOrder}=useCartContext();
   const [checked, setChecked] = React.useState('');
   const [modalVisible, setModalVisible] = useState(false);




function createdProductOrder(){
  // if (
  //   userName && mobile && city && pinCode && state && streetaddress1
  // ) {
  //   const userNameArray = userName.split(' ');
  //   const dataAdd ={
  //     firstName:userNameArray[0],
  //     lastName:userNameArray[1],
  //     streetAddress:streetaddress1,
  //     city:city,
  //     state:state,
  //     zipCode:pinCode,
  //     mobile:mobile
  // }

  //   console.log('\n\n\n\n\ndataAdd', JSON.stringify(dataAdd));
  //   console.log('\n\ndataUserName',userNameArray[0]+" "+userNameArray[1]+" "+
  //              streetaddress1+" "+city+" "+state+" "+pinCode+" "+mobile);

  //   // Make a POST request to the specified API endpoint
  //   axios.post('http://192.168.0.107:5454/api/orders/', dataAdd, {
  //     headers: {
  //       'Authorization': `Bearer ${token}`,         
  //     },
  //   })
  //     .then(response => {
  //       // Handle successful response
  //       console.log(response.data);
  //       // Additional logic can be added here if needed
  //     })
  //     .catch(error => {
  //       // Handle error
  //       console.error('Error making API request:', error);
  //     });
  // }

     let page='cardPayment';
     console.log(page+" "+currentPage[currentPage.length-1]);
     if(currentPage && currentPage[currentPage.length-1]!==page){
       pushToStack(page);
       navigation.navigate(page)
     }else{
       popFromStack(navigation);
     }  
  // navigation.navigate('cardPayment');
}

//fetch the wallet balance
const fetchData = async () => {
  const header = {
    'Authorization': `Bearer ${token}`,
  };

  try {
    const response = await axios.get(`http://${ip}:5454/api/users/profile`, { headers: header });
    if(response.data && response.data.wallet && response.data.wallet.balance){
      setWalletBalance(response.data.wallet.balance);
   }
  } catch (error) {
    console.log('Error fetching profile:', error);
    // Handle the error as needed
  }
};

//payment through wallet
const payThroughWallet = () => {
  if (totalAmount <= walletBalance) {
    Alert.alert(
      "Want to proceed?",
      `Do you want to proceed with the payment of ₹${totalAmount} ?`,
      [
        {
          text: "No",
          onPress: () => console.log("No Pressed"),
          style: "cancel"
        },
        {
          text: "Proceed",
          onPress: () => navigation.navigate('paymentSuccess')
        }
      ]
    );
  } else {
    Alert.alert(
      "Insufficient balance",
      "Please add balance to your wallet.",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "ADD",
          onPress: () => {
            navigation.navigate('addMoney')
            setAddMoneyToWalletTender(true);          
          }
        }
      ]
    );
  }
};

      //show user the currently unavailable options
      const showAlert = () => {
        Alert.alert(
          "Alert",
          "We regret to inform you that this tender options is currently unavailable."
        );
      };

      useEffect(()=>{
        fetchData();
      },[token]);
      
      useEffect(() => {

          if (allSavedAddress && allSavedAddress.length > 0) {
            const selected = allSavedAddress[selectedAddress]; // Use index to find the selected address
            //Alert.alert(JSON.stringify(selected));

              setUserName(`${allSavedAddress[selectedAddress].firstName} ${allSavedAddress[selectedAddress].lastName}`);
              setStreetAddress1(allSavedAddress[selectedAddress].streetAddress);
              setCity(allSavedAddress[selectedAddress].city);
              setState(allSavedAddress[selectedAddress].state);
              setPinCode(allSavedAddress[selectedAddress].zipCode);
              setMobile(allSavedAddress[selectedAddress].mobile);


          }
        
      }, [token,
        userName,
        mobile,
        city,
        pinCode,
        state,
        streetaddress1,
        allSavedAddress,
      ]);


    return (
        <View style={{backgroundColor:'white'}}>
          <View style={{padding:12,flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
            <TouchableOpacity onPress={()=>{forNavigate('mainHome')
                                           setDisableAction(true);
            }}>
             <Image
                   source={{ uri: 'https://shorturl.at/ckGU2' }}
                   style={{ width: 100, height: 100 }}                
              />
            </TouchableOpacity>    
            <Text style={{textAlign:'center',color:'black'}}>Wallet Amount{'\n'}
              <Text style={{fontWeight:'700'}}>₹{walletBalance?walletBalance:' 0.00'}</Text>
            </Text>      
          </View>
         <TouchableOpacity style={{flexDirection:'row',alignItems:'center'}}
            onPress={() => popFromStack(navigation)}>
             <View>
               <Image source={back} style={{marginLeft:12}}/>
             </View>
             <View>
               <Text style={{paddingLeft:10,color:'black'}}>Payment Method</Text>              
             </View>
           </TouchableOpacity>  
           
           <ScrollView>
             {
              !disableAction && (
              filteredData && filteredData.length>0 ?
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',marginTop:'4%' }}>
    
                <Text style={{ marginLeft: '4%', fontSize: 16,color:'#00338D' }}>Shipped to:
                <Text  style={{marginLeft:'-15%', color: 'black', fontWeight: '400',color:'#00338D',marginLeft:'14%' }}>{filteredData[0].name ? filteredData[0].name.toUpperCase() : ''}</Text>

                </Text>

              <TouchableOpacity onPress={() => { navigation.navigate('AddressDetail') }}>
                <Text style={{ marginTop: '34%', marginRight: '4%', color: 'black', textDecorationLine: 'underline' }}>Change</Text>
              </TouchableOpacity>
            </View>:     
           <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',marginTop:'4%' }}>
           <Text style={{ marginLeft: '4%', fontSize: 16,color:'#00338D' }}>Deliver to:
           {allSavedAddress.map((address, index) => (
             index === selectedAddress && (
               <>
                 <Text key={index+8}style={{ color: 'black', fontWeight: '400',color:'#00338D',marginLeft:'14%' }}>  {address.firstName},{address.city}</Text>
               </>
             )
           ))}
            {allSavedAddress.map((address, index) => (
             index === selectedAddress && (
               <>
                 <Text key={index+9}style={{ color: 'black', fontWeight: '400',color:'#00338D' }}>{'\n'}{address.zipCode}</Text>
               </>
             )
           ))}
           </Text>
           <TouchableOpacity onPress={() => { navigation.navigate('AddressDetail') }}>
             <Text style={{ marginTop: '34%', marginRight: '4%', color: 'black', textDecorationLine: 'underline' }}>Change</Text>
           </TouchableOpacity>
         </View>
              )
}

{ !disableAction && 
<View style={{flexDirection:'row',justifyContent:'space-between'}}>
   <Text style={{marginLeft:'4%',marginTop:"4%",color:'#00338D',fontWeight:"300",fontSize:16}}>Total Payable Amount</Text>
   <Text style={{ padding: '4%', color: 'black', fontSize: 17 }}> ₹{totalAmount}</Text>
</View>
}
<View style={{ borderBottomWidth: 0.9, borderBottomColor: '#00338D',marginTop:'4%'}}></View>
            

              <View style={{padding:12}}>
                <Text style={{marginLeft:'1%',color:'#00338D',fontSize:15}}>UPI Payment</Text>
                  
                   <TouchableOpacity style={{alignItems:'center',marginTop:'3%'}} onPress={()=>{showAlert()}}>
                     <View style={{borderWidth:1,height:140,width:'90%',borderRadius:12,flexDirection:'row',justifyContent:"space-evenly",borderColor:'#D3D3D3',backgroundColor:'rgba(237, 235, 235, 0.7)'}}>
                       <View style={{marginTop:'6%',borderWidth:1,height:'70%',borderRadius:12,borderColor:'#D3D3D3',padding:'3%',backgroundColor:"white"}}>
                          <Image source={gpay}/>
                          <Text style={{textAlign:'center',fontSize:12}}>GPay</Text>
                       </View>
                       <View style={{marginTop:'6%',borderWidth:1,height:'70%',borderRadius:12,borderColor:'#D3D3D3',padding:'3%',backgroundColor:"white"}}>
                          <Image source={amazon} style={{width:50,height:50}}/>
                          <Text style={{textAlign:'center',fontSize:12,}}>Amazon</Text>
                       </View>
                       <View style={{marginTop:'6%',borderWidth:1,height:'70%',borderRadius:12,borderColor:'#D3D3D3',padding:'3%',backgroundColor:"white"}}>
                          <Image source={plus}  style={{width:50,height:50}}/>
                          <Text style={{textAlign:'center',fontSize:12}}>Other UPI</Text>
                       </View>
                   </View>
                </TouchableOpacity>

                  <Text style={{marginLeft:'6%',marginTop:'5%',color:'#00338D'}}>Card Payment</Text>
                
               <View style={{flexDirection:'row',justifyContent:'center'}}>                
                <TouchableOpacity onPress={()=>{
                  // navigation.navigate("cardPayment")
                  showAlert()
                }} style={styles.cardPayment}
            
                
                  >
                <TouchableOpacity  style={{flexDirection:'row',alignItems:'center'}}
                    // onPress={()=>{createdProductOrder()
                    
                    // }}
                    onPress={()=>{showAlert()}}
                   
                    >
                        <Image source={walletpay} style={{width:52,height:32}}/>
                       <Text style={styles.offerText}>Debit Card</Text>
                     </TouchableOpacity>
                     
                     <View>
                       <Image source={upperArrow} style={{width:22,height:12,transform: [{rotate:'-90deg'}],marginTop:'10%'}}/>
                     </View>
                  </TouchableOpacity>
                </View>

                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
      <TouchableOpacity 
        onPress={payThroughWallet}
        style={styles.walletPayment}
        disabled={disableAction}
      >
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image source={wallet} style={{width: 36, height: 31, marginLeft: '4%'}}/>
          <Text style={styles.walletText}>Wallet</Text>
        </View>
        <View>
          <Image 
            source={upperArrow} 
            style={{width: 22, height: 12, transform: [{rotate: '-90deg'}], marginTop: '10%'}}
          />
        </View>
      </TouchableOpacity>
    </View>
             


                   <Text style={{marginLeft:'6%',marginTop:'5%',color:'#00338D'}}>Wallet Payment</Text>
                <TouchableOpacity onPress={()=>{showAlert()}}>

                 <View style={{justifyContent:'center',flexDirection:'row',marginTop:'2%',}}>
                   <View style={styles.disabledSection}>
                      <View style={{flexDirection:'row',justifyContent:'space-between',padding:8}}>
                        <Image  source={{ uri: 'https://shorturl.at/mEUW8' }}  style={{width:27,height:27}}/>
                         <Text style={{marginLeft:'5%',padding:2,color:'black'}}>Phonepay</Text>
                      </View>
                      <View>
                        <RadioButton
                          value="first"
                          status={ checked === 'first' ? 'checked' : 'unchecked' }
                          onPress={() => setChecked('first')}
                          disabled={true}
                       />                    
                     </View>
                    </View>
                 </View>
                 <View style={{justifyContent:'center',flexDirection:'row',}}>
                 <View style={styles.disabledSection}>
                   <View style={{flexDirection:'row',justifyContent:'space-between',padding:8}}>
                        <Image  source={{ uri: 'https://shorturl.at/BU345' }}  style={{width:27,height:27}}/>
                         <Text style={{marginLeft:'5%',padding:2,color:'black'}}>Airtel Money</Text>
                      </View>
                      <View>
                        <RadioButton
                          value="second"
                          status={ checked === 'second' ? 'checked' : 'unchecked' }
                          onPress={() => setChecked('second')}
                          disabled={true}                      
                           />                    
                     </View>
                    </View>
                 </View>
                 <View style={{justifyContent:'center',flexDirection:'row',}}>
                 <View style={styles.disabledSection}>
                      <View style={{flexDirection:'row',justifyContent:'space-between',padding:8}}>
                        <Image  source={{ uri: 'https://shorturl.at/zFJWY' }}  style={{width:27,height:27}}/>
                         <Text style={{marginLeft:'5%',padding:2,color:'black'}}>freecharge</Text>
                      </View>
                      <View>
                        <RadioButton
                          value="third"
                          status={ checked === 'third' ? 'checked' : 'unchecked' }
                          onPress={() => setChecked('third')}
                          disabled={true}
                       />                    
                     </View>
                    </View>
                 </View>
                 <View style={{justifyContent:'center',flexDirection:'row',}}>
                 <View style={styles.disabledSection}>
                      <View style={{flexDirection:'row',justifyContent:'space-between',padding:8}}>
                        <Image  source={{ uri: 'https://shorturl.at/CLV17' }}  style={{width:27,height:27}}/>
                         <Text style={{marginLeft:'5%',padding:2,color:'black'}}>MobilKwik</Text>
                      </View>
                      <View>
                        <RadioButton
                          value="fourth"
                          status={ checked === 'fourth' ? 'checked' : 'unchecked' }
                          onPress={() => setChecked('fourth')}
                          disabled={true}
                       />                    
                     </View>
                    </View>
                 </View>
                 </TouchableOpacity>   

                 <Text style={{marginLeft:'6%',marginTop:'5%',color:'#00338D'}}>Netbanking</Text>
                 <TouchableOpacity style={{alignItems:'center',marginTop:'3%',borderColor:'#D3D3D3',}} onPress={()=>{showAlert()}}>
                     <View style={{borderWidth:1,height:110,width:'90%',borderRadius:12,flexDirection:'row',justifyContent:"space-evenly",borderColor:'#d3d3d3',backgroundColor:'rgba(237, 235, 235, 0.7)'}}>
                       <View style={{marginTop:'6%',}}>
                          <Image source={{ uri: 'https://rb.gy/gdhxu9' }} style={{width:34,height:33,padding:22}}/>
                          <Text style={{textAlign:'center',fontSize:12,padding:4,color:'black'}}>SBI</Text>
                       </View>
                       <View style={{marginTop:'6%',}}>
                          <Image    source={{ uri: 'https://rb.gy/txhyt6' }} style={{padding:21.6}}/>
                          <Text style={{textAlign:'center',fontSize:12,padding:4,color:'black'}}>AXIS</Text>
                       </View>
                       <View style={{marginTop:'6%',}}>
                          <Image    source={{ uri: 'https://rb.gy/vbgqfp' }} style={{width:34,height:33,padding:22}}/>
                          <Text style={{textAlign:'center',fontSize:12,padding:4,color:'black'}}>HDFC</Text>
                       </View>
                       <View style={{marginTop:'6%',}}>
                          <Image    source={{ uri: 'https://rb.gy/x6hv6x' }} style={{width:34,height:33,padding:22}}/>
                          <Text style={{textAlign:'center',fontSize:12,padding:4,color:'black'}}>ICICI</Text>
                       </View>
                   </View>
                </TouchableOpacity>

                <TouchableOpacity style={{flexDirection:'row',justifyContent:'center',marginTop:'5%'}} onPress={()=>{showAlert()}}>                
                  <View style={styles.offers}>
                    <View style={{flexDirection:'row',alignItems:'center',}}>
                      <Image source={{uri:'https://shorturl.at/iqtA4'}} style={{width:40,height:28}}/>
                       <Text style={styles.offerText}>Gift Card / e-Voucher</Text>
                     </View>
                     <View>
                       <Image source={upperArrow} style={{width:22,height:12,transform: [{rotate:'-90deg'}],marginTop:'10%'}}/>
                     </View>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity style={{flexDirection:'row',justifyContent:'center',marginTop:'2%'}}>                
                   <TouchableOpacity style={styles.offers}>
                     <TouchableOpacity style={{flexDirection:'row',alignItems:'center'}} 
                      onPress={()=>{forNavigate('')}}>
                        <Image source={{uri:'https://shorturl.at/cdUW6'}} style={{width:52,height:32}}/>
                        <Text style={styles.offerText}>Cash on Delivery</Text>
                    </TouchableOpacity>
                     <View>
                       <Image source={upperArrow} style={{width:22,height:12,transform: [{rotate:'-90deg'}],marginTop:'16%'}}/>
                     </View>
                  </TouchableOpacity>
                </TouchableOpacity>
                <View style={{flexDirection:'row',justifyContent:'center',marginTop:'2%'}}>                
                  <View style={styles.offers}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Image source={{uri:'http://surl.li/mxkts'}} style={{width:52,height:32}}/>
                       <Text style={styles.offerText}>Pay using Reward points</Text>
                     </View>
                     <View>
                       <Image source={upperArrow} style={{width:22,height:12,transform: [{rotate:'-90deg'}],marginTop:'10%'}}/>
                     </View>
                  </View>
                </View>


            </View>
           </ScrollView>  
           <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
  <Text style={{ padding: '4%', color: 'black', fontSize: 17, color: '#00338D', fontWeight: '400', fontSize: 20 }}>
    Total Price: ₹{totalAmount}.00
  </Text>
  <TouchableOpacity style={{ padding: '4%' }}  onPress={() => setModalVisible(true)}>
    <Text style={{ textDecorationLine: 'underline', color: 'black' }}>
      View details
    </Text>
  </TouchableOpacity>
</View>
<Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <TouchableWithoutFeedback onPress={closeModal}>
        <View style={styles.modalContainer}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
  <View>
    <Text style={{ marginRight: 10,color:'black',fontWeight:'500',fontSize:18}}>Payment Summary</Text>
  </View>
  <View>
    <Image source={cross2} style={{ width: 13, height: 14 }} />
  </View>

</View>
<View style={{borderWidth:0.2,padding:'5%',marginTop:'13%',height:'65%'}}>
  <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:'2%'}}>
   <Text style={{fontSize:16,color:'#333232',padding:'3%'}}>Sub Total</Text>
   <Text style={{fontSize:16,color:'black',padding:'3%',fontWeight:"500"}}>₹{totalAmount}</Text>
  </View>
  <View style={{flexDirection:'row',justifyContent:'space-between'}}>
    <Text style={{fontSize:16,color:'#333232',padding:'3%'}}>Delivery Charges</Text>
    {/* <Text style={{fontSize:16,color:'#00A3A1',padding:'3%'}}>Free</Text> */}
    {
                    deliveryOption==='1'?
                    <Text style={{fontSize:16,color:'#00A3A1',padding:'3%'}}>50</Text>:
                    <Text style={{fontSize:16,color:'#00A3A1',padding:'3%'}}>Free</Text>
     }
  
  </View>
  <View style={{flexDirection:'row',justifyContent:'space-between'}}>
    {/* <Text style={{fontSize:16,color:'#333232',padding:'3%'}}>Offer Discount</Text>
    <Text style={{fontSize:16,color:'#00A3A1',padding:'3%'}}>0</Text> */}
  </View>
  <View style={{flexDirection:'row',justifyContent:'space-between'}}>
    <Text style={{fontSize:16,color:'#333232',padding:'3%'}}>Total Payable Amount</Text>
    <Text style={{fontSize:16,color:'#333232',padding:'3%'}}>₹{totalAmount}.00</Text>
  </View>
</View>

        </View>
        </TouchableWithoutFeedback>
      </Modal>
        </View>
    );
}
const styles={
  cardPayment:{
    backgroundColor:'rgba(237, 235, 235, 0.7)',
    flexDirection:'row',
    borderWidth:1,
    borderColor:'#C8C8C8',
    height:55,
    width:355,
    borderRadius:10,
    textAlign:'center',
    marginTop:'1%',
    justifyContent:'space-between',
    padding:12,
    alignItems:'center',
  },
  walletPayment:{

    justifyContent:'center',
    flexDirection:'row',
    borderWidth:1,
    borderColor:'#C8C8C8',
    height:55,
    width:355,
    borderRadius:10,
    textAlign:'center',
    marginTop:'1%',
    justifyContent:'space-between',
    padding:12,
    alignItems:'center',

  },
   offers:{
      flexDirection:'row',
      borderWidth:1,
      borderColor:'#C8C8C8',
      height:55,
      width:355,
      borderRadius:10,
      textAlign:'center',
      marginTop:'1%',
      justifyContent:'space-between',
      padding:12,
      alignItems:'center',
      backgroundColor:'rgba(237, 235, 235, 0.7)'

  },
  offerText:{
      fontSize:15,
      color:'#00338D',  
      marginLeft:'4%'   
  },
  walletText:{
    fontSize:15,
    color:'#00338D',  
    marginLeft:'9%'   
},
  offerText1:{
    marginLeft:'10%',
    fontSize:15,
    color:'#00338D',  
  },
  modalContainer: {
    width: '100%',
    height: '40%',
    marginTop:'130%',
    backgroundColor: 'white',
    padding: 20,
    bottom:0,
    position:'fixed',
    borderRadius: 10,
    backgroundColor:'white',
},
disabledSection:{
  flexDirection:'row',justifyContent:'space-between',borderWidth:1,borderRadius:6,borderColor:'#D3D3D3',alignItems:'center',width:360,backgroundColor:'rgba(237, 235, 235, 0.7)'}
  
}