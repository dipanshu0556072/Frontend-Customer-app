import { StyleSheet, Text, View,Image } from 'react-native'
import React, { useEffect } from 'react';
import checked from './images/checked.png';
import { useLoginContext } from './LoginCartProvider';
import axios from 'axios';

const EmailVerify = ({navigation}) => {

  const {ip,emailId, setEmailId,password,setPassword,userLogin,setUserLogin,token,setToken,loginUserId,setLoginUserId,userList} = useLoginContext()

  
 
  const signInBody = {
    "email":emailId,
    "password":password
  }
  async function SignInBtn(){
    const header = {
      'Authorization': `Bearer ${token}`,         
    }
    try {
      const response = await axios.post(`http://${ip}:5454/auth/signin`, signInBody,{header});
        setUserLogin(response.data);
        setToken(response.data.jwt);
        console.log("\n\n\nhereUserId"+response.data);
        console.log(response.data.jwt);
      
     
      if (response.status === 200) {
         // Successful authentication
      setUserLogin(response.data);
      setToken(response.data.jwt);
  

      console.log("Authentication Token: "+response.data.jwt);
      } else {
     // Authentication failed
     console.log("Authentication failed:EmailVerify.jsx", response.data.error);
     }
    }
    catch (error) {
      console.log('Error fetching:', error);
    } 
  }

  useEffect(()=>{

    setTimeout(()=>{


     SignInBtn();
      
      navigation.reset({
        index: 0,
        routes: [{ name: 'mainHome' }],
      });
      },2300); 
  });
  return (
    <View style={styles.container}>
        <Text style={styles.text}>Email Id {'\n'}verified successfully</Text>
        <View style={{justifyContent:'center',width:'100%',flexDirection:'row'}}>
          <Image source={checked} style={{width:80,height:80,marginTop:'14%',}}/>
        </View>
    </View>
  )
}

export default EmailVerify

const styles = StyleSheet.create({
  container:{
    backgroundColor:'#005eb5',
    width:'100%',
    height:'100%'
  },
  text:{
    color:'white',
    fontWeight:'400',
    fontSize:48,
    textAlign:'center',
    marginTop:'34%'
  }
})