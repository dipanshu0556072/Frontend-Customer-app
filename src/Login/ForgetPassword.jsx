import { StyleSheet, Text, View,TextInput,TouchableOpacity,ActivityIndicator} from 'react-native'
import React,{useEffect, useState} from 'react';
import LoginTop1 from './LoginTop1';
import { useLoginContext } from './LoginCartProvider';
import RnOtpTimer from 'react-native-otp-timer';
import axios from 'axios';

const ForgetPassword = ({navigation}) => {
    const {checkEmail,setCheckEmail,
        emailverify,setEmailVerify,
        }=useLoginContext();
 const {ip,emailId, setEmailId,password,setPassword,userLogin,setUserLogin,token,setToken,loginUserId,setLoginUserId} = useLoginContext()
 const[btnColor,setBtnColor]=useState(false);
 const[inputEmail,setInputEmail]=useState("");
 const[EmailNullValidation,setEmailNullValidation]=useState(false);
 const[EmailValidation,setEmailValidation]=useState(false);


 async function sendEmailOtp(){
  try {
    const response = await axios.post(`http://${ip}:5454/auth/forgot-password?email=${inputEmail}`);
    console.log(response.data);
    submitEmailOtp();
  } catch (error) {
    console.log("Error occurred while creating user:", error);

    // Handle error here, e.g., set an error state
  }  
}
 const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  useEffect(()=>{
 
    setTimeout(()=>{
     setEmailValidation(false);
    },4000);
    if(inputEmail){
      setBtnColor(true);
    }else{
      setBtnColor(false);
    }
   },[EmailNullValidation,inputEmail])

   function handleBtn(){
      if(inputEmail===''){
        if(!inputEmail){
            setEmailNullValidation(true);
        }
      }else{
      if(inputEmail.length>0 && !validateEmail(inputEmail)){
        setEmailValidation(true);
      }else{
        sendEmailOtp();
        setCheckEmail(inputEmail);
        navigation.navigate('forgotEmailVerify');
      }
    }
    
   }
    return (
    <View style={styles.container}>
        <LoginTop1/>      
        <Text style={{fontSize:28,fontWeight:'bold',textAlign:'center',marginTop:'10%',color:'#00338D'}}>Please Enter Email ID</Text>
        <TextInput style={{ borderBottomWidth:0.8,width:'90%',
             borderColor:EmailNullValidation?'red':'',
             marginTop:'7%',marginLeft:'5%',}}
             placeholder='email id'
             value={inputEmail}
             onChangeText={(text)=>setInputEmail(text)}
        />
 
            <TouchableOpacity style={{backgroundColor:btnColor?'#00338D':'grey',padding:'3%',width:'90%',padding:10,
                 marginTop:'8%',marginLeft:'5%',alignItems:'center'}}
                 onPress={handleBtn}
                 >
                  <Text style={{color:'white',fontWeight:'700',fontSize:15.4,padding:'0.4%'}}>Submit</Text>
           </TouchableOpacity>
           {
      EmailValidation?
      <Text style={{color:'red',marginLeft:'30%',margin:'3%'}}>Please enter a valid email Id</Text>:
      <Text></Text>
    }
    </View>
  )
}

export default ForgetPassword

const styles = StyleSheet.create({
    container:{
        width:'100%',
        height:'100%',
      },  
})