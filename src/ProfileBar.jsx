import React, { useEffect, useState,useRef } from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList, TouchableOpacity, Image, SafeAreaView, Modal, 
  Dimensions,TouchableWithoutFeedback, PermissionsAndroid, Platform } from 'react-native';
import axios from 'axios';
import edit from './PlpScreen/images/edit.png';
import kpmg from './PlpScreen/images/kpmglogo.png';
import kpmg1 from './PlpScreen/images/kpmg56.jpeg';
import profile1 from './Login/images/profile1.png';
import { useLoginContext } from './Login/LoginCartProvider';
import back from './PlpScreen/images/back.png';
import grocery from './PlpScreen/images/grocery.jpeg';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import home1 from './PlpScreen/images/home1.png';
import categories1 from './PlpScreen/images/category1.png';
import bell1 from './PlpScreen/images/bell1.png';
import user1 from './PlpScreen/images/user1.png';
import discount from './PlpScreen/images/discount.png';
import selfcheckout from './PlpScreen/images/selfcheckout.png';
import pickup from './PlpScreen/images/pickup.png';
import cashback from './PlpScreen/images/cashback.png';
import playearn1 from './PlpScreen/images/playearn1.png';
import playearn2 from './PlpScreen/images/playearn2.png';
import fortune from './PlpScreen/images/fortune.png';
import scrollarrow from './PlpScreen/images/scrollarrow.png';
import plus1 from './PlpScreen/plus.png';
import TopBar from './PlpScreen/TopBar';
import quickshop from './PlpScreen/images/quickshop.jpeg';
import beauty from './PlpScreen/images/beauty.webp';
import add1 from './PlpScreen/images/add1.png';
import add2 from './PlpScreen/images/add2.png';
import add3 from './PlpScreen/images/add3.png';
import add4 from './PlpScreen/images/add4.png';
import add5 from './PlpScreen/images/add5.png';
import banner1 from './PlpScreen/images/banner1.png';
import banner2 from './PlpScreen/images/banner2.png';
import brand1 from './PlpScreen/images/brand1.png';
import brand2 from './PlpScreen/images/brand2.png';
import brand3 from './PlpScreen/images/brand3.png';
import brand4 from './PlpScreen/images/brand4.png';
import brand5 from './PlpScreen/images/brand5.png';
import brand6 from './PlpScreen/images/brand6.png';
import bestSell1 from './PlpScreen/images/bestSell1.png';
import bestSell2 from './PlpScreen/images/bestSell2.png';
import bestSell3 from './PlpScreen/images/bestSell3.png';
import bestSell4 from './PlpScreen/images/bestSell4.png';
import bestSell5 from './PlpScreen/images/bestSell5.png';
import bestSell6 from './PlpScreen/images/bestSell6.png';
import fashion from './PlpScreen/images/fashion.jpeg';
import { useCartContext } from './Context/WomenContext';
import electronics from './PlpScreen/images/electronics.png';
import referral from './copy.png'
import Home1 from './Fashion';
import Clipboard from '@react-native-clipboard/clipboard';
import QRCode from 'react-native-qrcode-svg';
import cross from './PlpScreen/images/close.png';

export default function ProfileBar({navigation})
{
  const {ip,mobileNumber, 
    emailId,gender,userName,
    loginUserId} = useLoginContext();
    const {token,popFromStack,pushToStack,
      currentPage, setCurrentPage,
      currentPageIndex,setCurrentPageIndex,
      currentPageIndexCategory,setCurrentPageIndexCategory,
      updateUserName,setUpdateUserName,
updateMobileName,setUpdateMobileName,
updateEmail,setUpdateEmail,updateGender,setUpdateGender,
updatePassword,setUpdatePassword}=useLoginContext();     
    const forNavigate=(page)=>{
     {
        console.log(page+" "+currentPage[currentPage.length-1]);
        if(currentPage && currentPage[currentPage.length-1]!==page){
          pushToStack(page);
          navigation.navigate(page)
        }else{
          popFromStack(navigation);
        }  
      }
    }
  const [logOut, setLogOut] = useState(false);
  const {userprofile,setUserProfile,setUserName,mobile,setMobile,setIsItForPlaceOrder,setAllSavedAddress,
    disableAction,setDisableAction
  }=useCartContext();
  const [sortModalVisible, setSortModalVisible] = useState(false);




  useEffect(()=>{
   
    getData();
    getReferralCode();
    
  },[token,mobile,userName]);
  // console.log("userProfike"+JSON.stringify(userprofile.mobile));
  const getData = async () => {
    let profileData;
    try {
      const response = await axios.get(`http://${ip}:5454/api/users/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`,         
        },
      });
      profileData=response.data;
      // Handle the response data
      setUserProfile(response.data);
      setAllSavedAddress(response.data.addresses);
      // setMobile(profileData.mobile);
      // setUserName(profileData.firstName +" "+profileData.lastName);
      // console.log(JSON.stringify("Profile:"+JSON.stringify(response.data.mobile))+"\n"+JSON.stringify(userprofile.mobile));
      setUpdateMobileName(profileData.mobile);
      setUpdateEmail(profileData.email);     
      setUpdateUserName(profileData.firstName + (profileData.lastName ? ` ${profileData.lastName}` : ''));
    } catch (error) {
      // Handle errors
      console.error('Error fetching data:', error);
    }
  }

  const handleSortModalClose = () => {
    // Additional logic to handle sorting or other actions
      setSortModalVisible(false);
  };

  const {  homeIcon, setHomeIcon,setCategoryIcon,
         setBellIcon,setUserIcon} = useLoginContext();
 
        const [password,setPassword]=useState("");
        const [confirmPassword,setConfirmPassword]=useState("");  
        const [seePassword,setSeePassword]=useState(true);
        const [seePassword1,setSeePassword1]=useState(true);
      
        function homeFooter(){
          if(!homeIcon){
            setBellIcon(false);
            setCategoryIcon(false);
            setUserIcon(false);
            setHomeIcon(true);
           
          }
       }

       const handleLogOutPress = () => {
        setSortModalVisible(true);
      };

      function logOutExit(){
        navigation.reset({
          index: 0,
          routes: [{ name: 'SignIn' }],
        });  
      }
     
    const [userReferralCode,setUserReferralCode]=useState("");  
    async function getReferralCode(){
      try{
        const response=await axios.get(`http://${ip}:5454/auth/referral-link/${loginUserId}`,{  
          headers: {
          'Authorization': `Bearer ${token}`,
        },})
      
      // Set the referral code state
      setUserReferralCode(response.data.substring(response.data.indexOf("referralCode=") + 13));

    }
      catch(error){
        console.error('Error fetching data in getReferralCode() ProfileBar.jsx :', error);
      }
    }

    const copyToClipboard = () => {
      Clipboard.setString(userReferralCode);
    };
    

   //show QR Code in whole Screen
   const [showFullSizeQRCode, setShowFullSizeQRCode] = useState(false);
    const handleQRCODE = () => {
      setShowFullSizeQRCode(true);
    };
    const handleQRCODEModalClose = () => {
      // Additional logic to handle sorting or other actions
      setTimeout(() => {
        setShowFullSizeQRCode(false);
      }, 100);
    };
   

    return (
        <>
<View style={{ flex: 1, backgroundColor: 'white' }}>   
  <ScrollView >    
   {/* <Text>{JSON.stringify(userprofile)}</Text> */}
    <View style={styles.profileContainer}>
     <View style={{flexDirection:'row',justifyContent:'space-between',alignContent:'center',alignItems:'center',width:230,height:80,margin:'5%',alignSelf:'center',marginLeft:'35%'}}>
     <Image source={kpmg} style={{width:100,height:60,alignSelf:'center'}}/>
    <TouchableOpacity onPress={()=>{handleQRCODE()}}>
    <QRCode   
      value={`UserName: ${updateUserName}\nMobileNumber: ${updateMobileName}`}
      backgroundColor='#00338D'
      size={55}
      color='white'
    />
    </TouchableOpacity>

     </View>

      <View style={{flexDirection:'row',marginTop:'3%',}}>
      <Image source={
          userprofile.gender==="male"?profile1:
          userprofile.gender==="emale"?profile1:profile1
        } style={{width:40,height:40,marginTop:'8%',marginRight:'5%'}}/>

        <View style={{marginTop:'8%'}}>
            <Text style={styles.txt2}>
                Name: {updateUserName=='null'?'':updateUserName} 
            </Text>
            <Text style={styles.txt2}>Email: {updateEmail}</Text>
            <Text style={styles.txt2}>Mobile: {updateMobileName}</Text>
            <Text style={styles.txt2}>Referral Code: {userReferralCode}</Text>

        </View>
        <View>
        <TouchableOpacity style={{marginTop:'8%'}} 
         onPress={()=>{forNavigate('userProfile')}}>

          <Image source={edit} style={{width:18,height:18,marginLeft:'25%',marginTop:'18%'}}/>
          </TouchableOpacity>
         <TouchableOpacity onPress={copyToClipboard}>
           <Image source={referral} style={{width:18,height:18,marginLeft:'25%',marginTop:'45%'}}/>
         </TouchableOpacity>
        </View>

      </View>  

    </View>

    <TouchableOpacity
       style={{
            flex: 1, // Adjust as needed based on your layout
            justifyContent: 'flex-end', // Align the content at the bottom of the parent container
          }}
       >
  <TouchableOpacity
        onPress={() => forNavigate('changePassword')}
      style={{
         backgroundColor: '#e8e8e8',
         marginTop: '-5%',
         marginBottom: 10,
         width: '70%',
         alignSelf: 'center',
         height: 40,
         borderRadius: 5,
         shadowColor: '#000',
         shadowOffset: {
         width: 0,
         height: 4,
       },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5, // This is for Android
      }}
    >
    <Text
      style={{
          textAlign: 'center',
          padding: '3%',
          color: 'black',
          fontWeight: '500',
       }}
    >
      Change Password
    </Text>
  </TouchableOpacity>
</TouchableOpacity>

<TouchableOpacity
  style={{
    flex: 1,
    justifyContent: 'flex-end',
  }}
>
  <TouchableOpacity
    style={{
      backgroundColor: '#e8e8e8',
      marginTop: '5%',
      marginBottom: 10,
      width: '90%',
      alignSelf: 'center',
      height: 40,
      borderRadius: 5,
      flexDirection: 'row', // Set flexDirection to 'row'
      justifyContent: 'space-between',
      alignItems: 'center', // Align items in the center vertically
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 5, // This is for Android
    }}
  >
    <Text
      style={{
        textAlign: 'center',
        padding: '3%',
        color: 'black',
        fontWeight: '400',
      }}
    >
      My Offers
    </Text>
    <Image source={plus1} style={{ marginRight: 10,width:15,height:15 }} />
  </TouchableOpacity>
</TouchableOpacity>

<TouchableOpacity
  style={{
    flex: 1,
    justifyContent: 'flex-end',
  }}
>
  <TouchableOpacity
    style={{
      backgroundColor: '#e8e8e8',
      marginTop: '2%',
      marginBottom: 10,
      width: '90%',
      alignSelf: 'center',
      height: 40,
      borderRadius: 5,
      flexDirection: 'row', // Set flexDirection to 'row'
      justifyContent: 'space-between',
      alignItems: 'center', // Align items in the center vertically
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 5, // This is for Android
    }}
    onPress={()=>{forNavigate('loyaltyWelcome')}}
  >
    <Text
      style={{
        textAlign: 'center',
        padding: '3%',
        color: 'black',
        fontWeight: '400',
      }}
    >
     My Rewards
    </Text>
    <Image source={plus1} style={{ marginRight: 10,width:15,height:15 }} />
  </TouchableOpacity>
</TouchableOpacity><TouchableOpacity
  style={{
    flex: 1,
    justifyContent: 'flex-end',
  }}
>
  <TouchableOpacity
    style={{
      backgroundColor: '#e8e8e8',
      marginTop: '2%',
      marginBottom: 10,
      width: '90%',
      alignSelf: 'center',
      height: 40,
      borderRadius: 5,
      flexDirection: 'row', // Set flexDirection to 'row'
      justifyContent: 'space-between',
      alignItems: 'center', // Align items in the center vertically
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 5, // This is for Android
    }}
    onPress={()=>{navigation.navigate('subscribedItem')}}
  >
    <Text
      style={{
        textAlign: 'center',
        padding: '3%',
        color: 'black',
        fontWeight: '400',
      }}
    >
      My Subscriptions
    </Text>
    <Image source={plus1} style={{ marginRight: 10,width:15,height:15 }} />
  </TouchableOpacity>
</TouchableOpacity>
<TouchableOpacity
  onPress={() => forNavigate('Payment1')}
  style={{
    flex: 1,
    justifyContent: 'flex-end',
  }}
>
  <TouchableOpacity
    onPress={() => forNavigate('Payment1')}
    style={{
      backgroundColor: '#e8e8e8',
      marginTop: '2%',
      marginBottom: 10,
      width: '90%',
      alignSelf: 'center',
      height: 40,
      borderRadius: 5,
      flexDirection: 'row', // Set flexDirection to 'row'
      justifyContent: 'space-between',
      alignItems: 'center', // Align items in the center vertically
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 5, // This is for Android
    }}
  >
    <Text
      style={{
        textAlign: 'center',
        padding: '3%',
        color: 'black',
        fontWeight: '400',
      }}
    >
      My Payments
    </Text>
    <Image source={plus1} style={{ marginRight: 10,width:15,height:15 }} />
  </TouchableOpacity>
</TouchableOpacity><TouchableOpacity
  style={{
    flex: 1,
    justifyContent: 'flex-end',
  }}
>
  <TouchableOpacity
    style={{
      backgroundColor: '#e8e8e8',
      marginTop: '2%',
      marginBottom: 10,
      width: '90%',
      alignSelf: 'center',
      height: 40,
      borderRadius: 5,
      flexDirection: 'row', // Set flexDirection to 'row'
      justifyContent: 'space-between',
      alignItems: 'center', // Align items in the center vertically
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 5, // This is for Android
    }}
    onPress={()=>{forNavigate('walletHome')}}
  >
    <Text
      style={{
        textAlign: 'center',
        padding: '3%',
        color: 'black',
        fontWeight: '400',
      }}
    >
      My Wallet
    </Text>
    <Image source={plus1} style={{ marginRight: 10,width:15,height:15 }} />
  </TouchableOpacity>
</TouchableOpacity>
<TouchableOpacity
 onPress={()=>{forNavigate('order')}}
  style={{
    flex: 1,
    justifyContent: 'flex-end',
  }}
>
  <TouchableOpacity
   onPress={()=>{forNavigate('order')}}
    style={{
      backgroundColor: '#e8e8e8',
      marginTop: '2%',
      marginBottom: 10,
      width: '90%',
      alignSelf: 'center',
      height: 40,
      borderRadius: 5,
      flexDirection: 'row', // Set flexDirection to 'row'
      justifyContent: 'space-between',
      alignItems: 'center', // Align items in the center vertically
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 5, // This is for Android
    }}
  >
    <Text
      style={{
        textAlign: 'center',
        padding: '3%',
        color: 'black',
        fontWeight: '400',
      }}
    >
      My Orders
    </Text>
    <Image source={plus1} style={{ marginRight: 10,width:15,height:15 }} />
  </TouchableOpacity>
</TouchableOpacity>


<TouchableOpacity
  style={{
    flex: 1,
    justifyContent: 'flex-end',
  }}
>
  <TouchableOpacity
    style={{
      backgroundColor: '#e8e8e8',
      marginTop: '2%',
      marginBottom: 10,
      width: '90%',
      alignSelf: 'center',
      height: 40,
      borderRadius: 5,
      flexDirection: 'row', // Set flexDirection to 'row'
      justifyContent: 'space-between',
      alignItems: 'center', // Align items in the center vertically
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 5, // This is for Android
    }}
  >
    <Text
      style={{
        textAlign: 'center',
        padding: '3%',
        color: 'black',
        fontWeight: '400',
      }}
    >
      Play & Earn
    </Text>
    <Image source={plus1} style={{ marginRight: 10,width:15,height:15 }} />
  </TouchableOpacity>
</TouchableOpacity>


<TouchableOpacity
  style={{
    flex: 1,
    justifyContent: 'flex-end',
  }}
>
  <TouchableOpacity
    style={{
      backgroundColor: '#e8e8e8',
      marginTop: '2%',
      marginBottom: 10,
      width: '90%',
      alignSelf: 'center',
      height: 40,
      borderRadius: 5,
      flexDirection: 'row', // Set flexDirection to 'row'
      justifyContent: 'space-between',
      alignItems: 'center', // Align items in the center vertically
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 5, // This is for Android
    }}
    onPress={()=>{forNavigate('referWelcome')}}
  >
    <Text
      style={{
        textAlign: 'center',
        padding: '3%',
        color: 'black',
        fontWeight: '400',
      }}
    >
      Refer & Earn
    </Text>
    <Image source={plus1} style={{ marginRight: 10,width:15,height:15 }} />
  </TouchableOpacity>
</TouchableOpacity>
<TouchableOpacity
  style={{
    flex: 1,
    justifyContent: 'flex-end',
  }}
>
  <TouchableOpacity
    style={{
      backgroundColor: '#e8e8e8',
      marginTop: '2%',
      marginBottom: 10,
      width: '90%',
      alignSelf: 'center',
      height: 40,
      borderRadius: 5,
      flexDirection: 'row', // Set flexDirection to 'row'
      justifyContent: 'space-between',
      alignItems: 'center', // Align items in the center vertically
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 5, // This is for Android
    }}
    onPress={()=>{forNavigate('Notification')}}
  >
    <Text
      style={{
        textAlign: 'center',
        padding: '3%',
        color: 'black',
        fontWeight: '400',
      }}
    >
      Notifications
    </Text>
    <Image source={plus1} style={{ marginRight: 10,width:15,height:15 }} />
  </TouchableOpacity>
</TouchableOpacity>

<TouchableOpacity
        onPress={() => {
          setIsItForPlaceOrder(false);
          forNavigate('orderSummary');
        }}
  style={{
    flex: 1,
    justifyContent: 'flex-end',
  }}
>
  <TouchableOpacity
         onPress={() => {
          setIsItForPlaceOrder(false);
          forNavigate('orderSummary');
        }}
    style={{
      backgroundColor: '#e8e8e8',
      marginTop: '2%',
      marginBottom: 10,
      width: '90%',
      alignSelf: 'center',
      height: 40,
      borderRadius: 5,
      flexDirection: 'row', // Set flexDirection to 'row'
      justifyContent: 'space-between',
      alignItems: 'center', // Align items in the center vertically
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 5, // This is for Android
    }}
  >
    <Text
      style={{
        textAlign: 'center',
        padding: '3%',
        color: 'black',
        fontWeight: '400',
      }}
    >
      My Addresses
    </Text>
    <Image source={plus1} style={{ marginRight: 10,width:15,height:15 }} />
  </TouchableOpacity>
</TouchableOpacity><TouchableOpacity
  style={{
    flex: 1,
    justifyContent: 'flex-end',
  }}
>
  <TouchableOpacity
    style={{
      backgroundColor: '#e8e8e8',
      marginTop: '2%',
      marginBottom: 10,
      width: '90%',
      alignSelf: 'center',
      height: 40,
      borderRadius: 5,
      flexDirection: 'row', // Set flexDirection to 'row'
      justifyContent: 'space-between',
      alignItems: 'center', // Align items in the center vertically
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 5, // This is for Android
    }}
    onPress={()=>{forNavigate('selectStore')}}
  >
    <Text
      style={{
        textAlign: 'center',
        padding: '3%',
        color: 'black',
        fontWeight: '400',
      }}
    >
      Store Locator
    </Text>
    <Image source={plus1} style={{ marginRight: 10,width:15,height:15 }} />
  </TouchableOpacity>
</TouchableOpacity><TouchableOpacity
  style={{
    flex: 1,
    justifyContent: 'flex-end',
  }}
>
  <TouchableOpacity
    style={{
      backgroundColor: '#e8e8e8',
      marginTop: '2%',
      marginBottom: 10,
      width: '90%',
      alignSelf: 'center',
      height: 40,
      borderRadius: 5,
      flexDirection: 'row', // Set flexDirection to 'row'
      justifyContent: 'space-between',
      alignItems: 'center', // Align items in the center vertically
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 5, // This is for Android
    }}
  >
    <Text
      style={{
        textAlign: 'center',
        padding: '3%',
        color: 'black',
        fontWeight: '400',
      }}
    >
      Need Help
    </Text>
    <Image source={plus1} style={{ marginRight: 10,width:15,height:15 }} />
  </TouchableOpacity>
</TouchableOpacity>
<TouchableOpacity
  onPress={handleLogOutPress}
  style={{
    flex: 1,
    justifyContent: 'flex-end',
  }}
>
  <TouchableOpacity
   onPress={handleLogOutPress}
    style={{
      backgroundColor: '#e8e8e8',
      marginTop: '3%',
      marginBottom: 10,
      width: '90%',
      alignSelf: 'center',
      height: 40,
      borderRadius: 5,
      flexDirection: 'row', // Set flexDirection to 'row'
      justifyContent: 'space-between',
      alignItems: 'center', // Align items in the center vertically
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 5, // This is for Android
    }}
  >
    <Text
      style={{
        textAlign: 'center',
        padding: '3%',
        fontWeight: '400',
        color:'#A4343A'
      }}
    >
      Log Out
    </Text>
  </TouchableOpacity>
</TouchableOpacity>
<Modal animationType="slide" transparent={true} visible={showFullSizeQRCode} onRequestClose={handleQRCODEModalClose}>
          <TouchableWithoutFeedback onPress={handleQRCODEModalClose}>
            <View style={styles.modalContainer11}>
              <View style={styles.modalContent11}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1%',
                  }}>
                
                 
                </View>
                <View style={{ flexDirection: 'row', alignSelf: 'center', margin: '5%', borderColor: '#00338D', borderWidth: 1, width: 350, height: 350 }}>
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <QRCode
      value={`UserName: ${updateUserName}\nEmail: ${updateEmail}\nReferral Code: ${userReferralCode}`}
      size={305}
      color='#00338D'
      logo={kpmg1}
      
    />
  </View>
</View>


              
              {/* <TouchableOpacity onPress={handleSortModalClose }
                style={{ flexDirection: 'row', justifyContent: 'center', backgroundColor: '#00338D', width: '26%',padding:'2.5%', alignSelf: 'flex-end',borderRadius:12}}>
                 <Text style={{ color: 'white', textAlign: 'center',fontWeight:'600'}}>APPLY</Text>
              </TouchableOpacity> */}
             </View>
  

              </View>
          </TouchableWithoutFeedback>
        </Modal>


<Modal animationType="slide" transparent={true} visible={sortModalVisible} onRequestClose={handleSortModalClose}>
          <TouchableWithoutFeedback onPress={handleSortModalClose}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <View>
                  <Text style={{alignItems:'center',color:'black',fontWeight:'700',textAlign:'center',fontSize:16.5}}>Do you want{"\n"} to logout?</Text>
                  <View style={{ width: '100%', borderBottomWidth: 0.8, borderColor: '#dbd9d9',marginTop:'17%' }}></View>
                  <TouchableOpacity
                   style={{flexDirection:'row',justifyContent:'center'}}
                   onPress={()=>{logOutExit()}}>
                    <Text style={{color:'red',padding:'4%'}}>Log Out</Text>
                  </TouchableOpacity>
                  <View style={{ width: '100%', borderBottomWidth: 0.8, borderColor: '#dbd9d9',marginTop:'1%' }}></View>
                  <TouchableOpacity
                   style={{flexDirection:'row',justifyContent:'center'}}
                   onPress={()=>{setSortModalVisible(false)}}>
                    <Text style={{color:'black',padding:'4%'}}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>  

<Text style={{marginLeft:'8%',color:'#00338D',fontSize:14,marginTop:'1%',fontWeight:'300'}}>FAQ</Text>
<Text style={{marginLeft:'8%',color:'#00338D',fontSize:14,marginTop:'4%',fontWeight:'300'}}>About Us</Text>
<Text style={{marginLeft:'8%',color:'#00338D',fontSize:14,marginTop:'4%',fontWeight:'300'}}>Term of Use</Text>
<Text style={{marginLeft:'8%',color:'#00338D',fontSize:14,marginTop:'4%',fontWeight:'300',marginBottom:'8%'}}>Privacy Policy</Text>

    </ScrollView>
  </View>     
      </>
  
  )
}
const styles = StyleSheet.create({
    scrollContainer: {
      flexGrow: 1,
      paddingRight: 16,
    },
    container: {
      marginTop: 30,
      paddingLeft: '4%',
      width: '20%',
      flexDirection: 'row',
      backgroundColor:'red'
    },
    columnContainer: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    categoryItem: {
      width: '100%', // Adjust as needed
      marginBottom: 16,
      alignItems: 'center',
    },
    categoryImage: {
      width: 60,
      height: 60,
      borderRadius: 40,
    },
    categoryText: {
      color: 'black',
      fontSize: 12,
      textAlign: 'center',
      marginTop: 8,
    },
    categoryText2: {
      color: 'black',
      fontSize: 12,
      textAlign: 'center',
      marginTop: 8,
      fontWeight:'bold'
    },
    verticalLine: {
      width: 1,
      backgroundColor: '#d1cfcf',
      height: '100%',
      marginLeft: '28%', // Adjust as needed
    },
    column2:{
     width:'485%',
     marginLeft:'2%',
    },
    mainRow:{
    },
    profileContainer:{
      
      padding:'5%',
      backgroundColor:'#00338D',
      marginBottom:'1%'
   },
   txt1:{
       fontSize:18,
       color:'white',
       padding:'0.5%'
   },
   txt2:{
       fontSize:14,
       color:'white',
       padding:'0.5%',
       fontWeight:'200'
   },
   txt3:{
       fontSize:15,
       color:'#52514e',
       marginLeft:'5%'
   },    
   txt4:{
       fontSize:15,
       color:'#52514e',
       marginLeft:'5%',
       color:'#A4343A'
   },
  
   row2:{
       marginTop:'0.8%',
       justifyContent:'space-between'
   },
   column:{
       flexDirection:'row',
       justifyContent:'space-between',
       alignItems:'center',
       padding:15,
       borderColor:'#e6e3e3',
       borderTopWidth:1
   },
   modalContainer: {
     flex: 1,
     justifyContent: 'center',
     alignItems: 'center',
     backgroundColor: 'rgba(0, 0, 0, 0.5)',
   },
   modalContent: {
     width: '70%',
     height: '23%',
     marginTop:'10%',
     backgroundColor: 'white',
     padding: 20,
     bottom:0,
     position:'fixed',
     borderRadius: 10,
     backgroundColor:'white',
   },
   horizontalLine1: {
    borderBottomWidth: 0.3,
    borderBottomColor: '#d1d1d1',
    marginVertical: 8,
  },
  container1: {
    alignItems: 'center',
    width: '100%',
    height: Dimensions.get('screen').height,
    justifyContent: 'center',
  },
  button: {
    padding: 16,
    backgroundColor: '#E9EBED',
    borderColor: '#f4f5f6',
    borderWidth: 1,
  },
  container67: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal67: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  qrCodeContainer67: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  modalContainer11: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent11: {
    width: '100%',
    height: '50%',
    backgroundColor: 'white',
    padding: 20,
    bottom:0,
    position:'fixed',
    borderRadius: 10,
    backgroundColor:'white',
  },
  })