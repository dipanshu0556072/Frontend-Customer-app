import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View,Modal, TouchableWithoutFeedback } from 'react-native'
import React,{useEffect, useState} from 'react';
import profile1 from './Login/images/profile1.png';
import profile2 from './Login/images/profile2.png';
import profile3 from './Login/images/profile3.png';
import arrow from './Login/images/next.png'
import coupon from './Login/images/voucher.png';
import support from './Login/images/support.png';
import payment from './Login/images/wallet.png';
import box from './Login/images/box.png';
import account from './Login/images/skills.png';
import heart from './Login/images/heart.png';
import bell from './Login/images/bell.png';
import kpmg3 from './Login/images/kpmg3.png';
import exit from './Login/images/exit.png';
import location from './Login/images/location.png';
import { useLoginContext } from './Login/LoginCartProvider';
import axios from 'axios';
import back from './PlpScreen/images/back.png';

const Profile = ({navigation}) => {
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
const [logOut, setLogOut] = useState(false);
  const [userprofile,setUserProfile]=useState([]);
  const [sortModalVisible, setSortModalVisible] = useState(false);

  useEffect(()=>{
    const getData = async () => {
      try {
        const response = await axios.get(`http://${ip}:5454/api/users/profile`, {
          headers: {
            'Authorization': `Bearer ${token}`,         
          },
        });
  
        // Handle the response data
        setUserProfile(response.data);
        console.log(JSON.stringify("Profile:"+JSON.stringify(response.data.mobile))+"\n"+JSON.stringify(userprofile.mobile));
       
      } catch (error) {
        // Handle errors
        console.error('Error fetching data:', error);
      }
    }

    getData();
    
  },[]);
  console.log("userProfike"+JSON.stringify(userprofile.mobile));

  const handleSortModalClose = () => {
    // Additional logic to handle sorting or other actions
    
      setSortModalVisible(false);
    
  };

  const {mobileNumber, setMobileNumber,isFocused, setIsFocused,
        mobileverify,setMobileVerify,
        emailverify,setEmailVerify,checkEmail,setCheckEmail,
        emailId,setCheckMobile,gender,userName,setUserName,  homeIcon, setHomeIcon,
        categoryIcon, setCategoryIcon,
        bellIcon, setBellIcon,
        userIcon, setUserIcon} = useLoginContext();
 
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
            pushToStack('mainHome');
            navigation.navigate('mainHome');
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
    return (
        <>
  <ScrollView>    

    <View style={styles.profileContainer}>
      <TouchableOpacity style={{marginTop:'6%'}}
        onPress={()=>{homeFooter()}}
        >
          <Image source={back}  style={{marginLeft:5}}/>
        </TouchableOpacity>
      <View style={{flexDirection:'row',justifyContent:'space-between'}}>
        <View style={{marginTop:'8%'}}>
            <Text style={styles.txt1}>
            Hby! 
                 <Text style={{fontWeight:'bold'}}> {userprofile.firstName}
                
                 </Text>
                 
            </Text>
            <Text style={styles.txt2}>{userprofile.email}</Text>
            <Text style={styles.txt2}>{userprofile.mobile}</Text>
        </View>
        <Image source={
          userprofile.gender==="male"?profile1:
          userprofile.gender==="emale"?profile2:profile3
        } style={{width:80,height:80,marginTop:'8%'}}/>
      </View>  
    </View>

    <View style={{heigth:'100%',height:60,
                  backgroundColor:'#e8e8e8',
                  marginTop:'10%',marginLeft:'2%',marginRight:'2%',flexDirection:'row',justifyContent:'space-around'}}>
        
        <View style={{  justifyContent: 'center', alignItems: 'center' }}>
         <Image source={coupon} style={{ width: 23, height: 23 }} />
         <Text style={{fontSize:12,color:'#474746'}}>Coupons</Text>
        </View>
        <View style={{  justifyContent: 'center', alignItems: 'center' }}>
         <Image source={support} style={{ width: 23, height: 23 }} />
         <Text style={{fontSize:12,color:'#474746'}}>Support</Text>
        </View>
        <TouchableOpacity style={{  justifyContent: 'center', alignItems: 'center' }}
          onPress={()=>{navigation.navigate('Payment1')}}
        >
         <Image source={payment} style={{ width: 23, height: 23 }} />
         <Text style={{fontSize:12,color:'#474746'}}>Payment</Text>
        </TouchableOpacity>


    </View>






      <View style={styles.row2}>
       <View style={styles.column}>
        <TouchableOpacity style={{flexDirection:'row'}}
          onPress={()=>{navigation.navigate('order')}}
         >
            <Image source={box} style={{width:20,height:20,}}/>
            <Text style={styles.txt3}>Your orders</Text>
         </TouchableOpacity>
         <View>
            <Image source={arrow} style={{width:20,height:14}}/>
         </View>
       </View>

       <View style={styles.column}>
        <TouchableOpacity style={{flexDirection:'row'}}
         onPress={()=>{forNavigate('userProfile')}}
        >
            <Image source={account} style={{width:20,height:20,}}/>
            <Text style={styles.txt3}>Manage account</Text>
         </TouchableOpacity>
         <View>
            <Image source={arrow} style={{width:20,height:14}}/>
         </View>
       </View>

       <View style={styles.column}>
        <TouchableOpacity style={{flexDirection:'row'}}
          onPress={()=>{forNavigate('Address')}}
        >
            <Image source={location} style={{width:20,height:20,}}/>
            <Text style={styles.txt3}>Address</Text>
         </TouchableOpacity>
         <View>
            <Image source={arrow} style={{width:20,height:14}}/>
         </View>
       </View>
       <View style={styles.column}>
        <TouchableOpacity style={{flexDirection:'row'}}
         onPress={()=>{navigation.navigate('Notification')}}>
            <Image source={bell} style={{width:20,height:20,}}/>
            <Text style={styles.txt3}>Notications</Text>
         </TouchableOpacity>
         <View>
            <Image source={arrow} style={{width:20,height:14}}/>
         </View>
       </View>
       <View style={styles.column}>
        <TouchableOpacity style={{flexDirection:'row'}}
         onPress={()=>{forNavigate('WishList')}}>
            <Image source={heart} style={{width:20,height:20,}}/>
            <Text style={styles.txt3}>Wishlist</Text>
         </TouchableOpacity>
         <View>
            <Image source={arrow} style={{width:20,height:14}}/>
         </View>
       </View>
       <View style={styles.column}>
        <TouchableOpacity style={{flexDirection:'row'}}
          onPress={handleLogOutPress}
        >
            <Image source={exit} style={{width:20,height:20,}}/>
            <Text style={styles.txt4}>Log out</Text>
         </TouchableOpacity>
         <Modal animationType="slide" transparent={true} visible={sortModalVisible} onRequestClose={handleSortModalClose}>
          <TouchableWithoutFeedback onPress={handleSortModalClose}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <View>
                  <Text style={{alignItems:'center',color:'black',fontWeight:'700',textAlign:'center',fontSize:16.5}}>Log out of {"\n"} your account?</Text>
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
         <View>
            <Image source={arrow} style={{width:20,height:14}}/>
         </View>
       </View>
      </View> 
    </ScrollView>
       
      </>
  
  )
}

export default Profile

const styles = StyleSheet.create({
    profileContainer:{
       padding:'3%',
    },
    txt1:{
        fontSize:18,
        color:'black',
        padding:'0.5%'
    },
    txt2:{
        fontSize:15,
        color:'#4a4948',
        padding:'0.5%'
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

})