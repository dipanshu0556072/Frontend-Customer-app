import React, { useEffect, useState } from 'react';
import home1 from './PlpScreen/images/home1.png';
import home2 from './PlpScreen/images/home2.png';
import categories1 from './PlpScreen/images/category1.png';
import categories2 from './PlpScreen/images/categories2.png';
import bell1 from './PlpScreen/images/bell1.png';
import bell2 from './PlpScreen/images/bell2.png';
import user1 from './PlpScreen/images/user1.png';
import user2 from './PlpScreen/images/user2.png';
import { StyleSheet, Text, TextInput, View, Image, TouchableOpacity } from 'react-native';
import { useLoginContext } from './Login/LoginCartProvider';
import axios from 'axios';
export default function Footer({ navigation }) {

  const {ip,userName,homeIcon, setHomeIcon,
      categoryIcon, setCategoryIcon,
      bellIcon, setBellIcon,
      userIcon, setUserIcon,token} = useLoginContext();

  const firstName=userName.split(' ');;


 function homeFooter(){
    if(!homeIcon){
      setBellIcon(false);
      setCategoryIcon(false);
      setUserIcon(false);
      setHomeIcon(true);
      navigation.navigate('Home');
    }
 }
 function categoryFooter(){
  if(!categoryIcon){
    setBellIcon(false);
    setCategoryIcon(true);
    setUserIcon(false);
    setHomeIcon(false);
    navigation.navigate('category');
  }
}
function notifyFooter(){
  if(!bellIcon){
    setBellIcon(true);
    setCategoryIcon(false);
    setUserIcon(false);
    setHomeIcon(false);
    navigation.navigate('Notification');
  }
}
function userFooter(){
  if(!userIcon){
    setBellIcon(false);
    setCategoryIcon(false);
    setUserIcon(true);
    setHomeIcon(false);
    navigation.navigate('Profile');
  }
}
const [userprofile,setUserProfile]=useState([]);
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
      console.log(JSON.stringify(response.data));
     
    } catch (error) {
      // Handle errors
      console.error('Error fetching data:', error);
    }
  }

  getData();
  
},[]);


  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity
         onPress={()=>{homeFooter()}}>
          <Image source={homeIcon?home2:home1} style={styles.icon}/>
        </TouchableOpacity>
        <TouchableOpacity
         onPress={()=>{categoryFooter()}}
         >
          <Image source={categoryIcon?categories2:categories1} style={styles.icon}/>
        </TouchableOpacity>
        <TouchableOpacity
         onPress={()=>{notifyFooter()}}
        >
         <View style={{justifyContent:'center'}}>
          <Image source={bellIcon?bell2:bell1} style={{width:24,height:25,}}/>
         </View>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={()=>{userFooter()}}>
          <View style={{justifyContent:'center'}}>
            <View style={{flexDirection:'row',justifyContent:'center'}}> 
              <Image source={userIcon?user2:user1} style={styles.icon}/>
            </View>
            <View>  
              <Text style={{color:'#00338D',fontWeight:'bold'}}>{userprofile.firstName}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent:'space-between',
    backgroundColor:'white',
    height:'7%',
    padding:'4%',

  },
  icon:{
    width:24,
    height:24,
  }
});
