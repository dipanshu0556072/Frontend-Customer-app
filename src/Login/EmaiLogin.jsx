import {Alert, StyleSheet, Text, View ,TextInput,Image, TouchableOpacity,ActivityIndicator} from 'react-native'
import React,{useEffect, useState} from 'react';
import LoginTop1 from './LoginTop1';
import eye1 from './images/view1.png';
import eye2 from './images/view2.png';
import fb from './images/fb.png';
import google from './images/google.png';
import arrow from './images/arrow.png';
import { useLoginContext } from './LoginCartProvider';
import axios from 'axios';

const EmaiLogin = ({navigation}) => {



  const [seePassword,setSeePassword]=useState(true);
  const [seePassword1,setSeePassword1]=useState(true);
  const [btnColor,setBtnColor]=useState(false);
  const [showActivityIndicator, setShowActivityIndicator] = useState(false);

  
  const {ip,checkEmail,setCheckEmail,password,setPassword,
    confirmPassword,setConfirmPassword}=useLoginContext();
  const [inputEmail, setInputEmail] = useState('');  
  const [error1,setError1]=useState(false);

 
  const createUser = {
    email: inputEmail, 
    password: confirmPassword,
  };
  async function userCreate1() {
    // Alert.alert("HI");
    setShowActivityIndicator(true);
    try {
      const response = await axios.post(`http://${ip}:5454/auth/signup?referralCode=${enteredReferralCode}`, createUser);
      console.log(response.data);
      navigation.navigate('EmailLoginValid');
    } catch (error) {
      console.log("Error occurred while creating user:", error);
      // Handle error here, e.g., set an error state
      setError1(true);
      useEffect(()=>{
        setTimeout(()=>{
         setError1(false); 
        },2000);
      });
    }
  }

  async function userCreate2() {
    // Alert.alert("BY");
    setShowActivityIndicator(true);
    try {
      const response = await axios.post(`http://${ip}:5454/auth/signup`, createUser);
      console.log(response.data);
      navigation.navigate('EmailLoginValid');
    } catch (error) {
      console.log("Error occurred while creating user:", error);
      // Handle error here, e.g., set an error state
      setError1(true);
      useEffect(()=>{
        setTimeout(()=>{
         setError1(false); 
        },2000);
      });
    }
  }
   useEffect(()=>{
    if(inputEmail!=="" && password!=="" && password===confirmPassword){
      setBtnColor(true);
    }else{
      setBtnColor(false);
    }
   });
   

 

  function Eye() {
    setSeePassword((prevState) => !prevState);
  }

  function Close() {
    setSeePassword((prevState) => !prevState);
  }

  // Updated Eye1 and Close1 functions to toggle seePassword1 state
  function Eye1() {
    setSeePassword1((prevState) => !prevState);
  }

  function Close1() {
    setSeePassword1((prevState) => !prevState);
  }

  const[EmailNullValidation,setEmailNullValidation]=useState(false);
  const[PasswordNullValidation,setPasswordNullValidation]=useState(false);
  const[confirmPasswordNullValidation,setConfirmPasswordNullValidation]=useState(false);
  const[EmailValidation,setEmailValidation]=useState(false);
  const[activityIndicator,setActivityIndicator]=useState(false);
  const [enteredReferralCode,setEnteredReferralCode]=useState('');
  useEffect(()=>{
 
   setTimeout(()=>{
    setEmailValidation(false);
   },4000);
  },[EmailNullValidation,PasswordNullValidation,confirmPasswordNullValidation],EmailValidation);
  
  
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };


  function SignInBtn(){

    const isPasswordValid = validatePassword(password);

    if(inputEmail.length===0||PasswordNullValidation.length===0||confirmPasswordNullValidation.length===0){
      if(!inputEmail){
        setEmailNullValidation(true);
      }
      if(!PasswordNullValidation){
       setPasswordNullValidation(true);
      }
      if(!confirmPasswordNullValidation){
       setConfirmPasswordNullValidation(true);
      }

    }else{
      if(inputEmail.length>0 && !validateEmail(inputEmail)){
        setEmailValidation(true);
      }
      else{
        if(password===confirmPassword && password!="" ){
          console.log(password+" "+confirmPassword);
          setCheckEmail(inputEmail);
          if(enteredReferralCode && enteredReferralCode.length>0){
            userCreate1(); 
          }else{
            userCreate2();
          }
          //navigation.navigate('EmailLoginValid');
        }
        console.log("Data "+checkEmail+" "+password+" "+confirmPassword);
  
      }
      
  
    }

  }
  const handleChangeText1=(text)=>{
    console.log(text);
    setPassword(text);    
  }
  const handleChangeText2=(text)=>{
    setConfirmPassword(text);
  }


//Validate Password

const [passwordError, setPasswordError] = useState(false);

useEffect(() => {
}, [password]);

const validatePassword = (password) => {
  // Regex for password: at least 8 characters, one uppercase letter, one lowercase letter, one digit, and one special character
  const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

useEffect(()=>{
 if(error1){
   setTimeout(()=>{
    setShowActivityIndicator(false);
   },3000);
 }
},[error1]);

  return (
  <View style={styles.container}>
    <LoginTop1/>
     <View style={styles.row1}>
          <Text style={{fontSize:28,fontWeight:'bold',textAlign:'center',marginTop:'10%',color:'#00338D'}}>SignUp</Text>
          
          <TextInput style={{
               borderBottomWidth:0.5,
               width:'86%',
               marginTop:'4%',
               marginLeft:'5%',
               borderColor:EmailNullValidation?'red':'grey'
            }}
            placeholder='Email Id*'
            value={inputEmail}
            onChangeText={(text)=>{setInputEmail(text)}}
            
            
            />

          <View style={{flexDirection:'row',alignItems:'center'}}>
          <TextInput
  style={{
    borderBottomWidth: 0.5,
    width: '86%',
    marginTop: '4%',
    marginLeft: '5%',
    borderColor: PasswordNullValidation ? 'red' : 'grey',
  }}
  secureTextEntry={seePassword}
  placeholder='Set Password*'
  onChangeText={(text) => handleChangeText1(text)}
/>

           {
            seePassword ?
          (
           <TouchableOpacity onPress={Eye}>
             <Image source={eye2} style={{width:21,height:18}}/>
           </TouchableOpacity>
          ) :
         (
           <TouchableOpacity onPress={Close}>
             <Image source={eye1} style={{width:21,height:18}}/>
          </TouchableOpacity>
         )
          }  
          </View>  
          

       
          <View style={{flexDirection:'row',alignItems:'center'}}>
             <TextInput style={{
               borderBottomWidth:0.5,
               width:'86%',
               marginTop:'4%',
               marginLeft:'5%',
               borderBottomColor: EmailNullValidation ? 'red' : 'grey',
             }}
                secureTextEntry={seePassword1}
                onChangeText={(text)=>handleChangeText2(text)}
                placeholder='Confirm Password*'/>
             {
              seePassword1 ?
              (
               <TouchableOpacity onPress={Eye1}>
                 <Image source={eye2} style={{width:21,height:18}}/>
               </TouchableOpacity>
              ) :
             (
              <TouchableOpacity onPress={Close1}>
                <Image source={eye1} style={{width:21,height:18}}/>
              </TouchableOpacity>
              )
           }  
        </View>    
        <TextInput
        style={{
         borderBottomWidth: 0.5,
         width: '86%',
         marginTop: '4%',
         marginLeft: '5%',
         borderColor:'grey'
        }}
        placeholder='Referral Code'
        onChangeText={(text) => setEnteredReferralCode(text)}
     />             
    </View>
   
    <TouchableOpacity style={{backgroundColor:btnColor?'#00338D':'grey',width:'90%',padding:10,
                 marginTop:'8%',marginLeft:'5%',alignItems:'center'}}
                 onPress={SignInBtn}
                 >
                  <Text style={{color:'white',fontWeight:'700',fontSize:15}}>Submit</Text>
      </TouchableOpacity>
      {
              error1?
              <Text style={{textAlign:'center',marginTop:'2%',color:'red'}}>user already exist!</Text>:
              <Text></Text>
       }
    {
      EmailValidation?
      <Text style={{color:'red',marginLeft:'34%',margin:'3%',fontSize:12}}>Please enter a valid email Id</Text>:
      <Text></Text>
    }
    <View style={styles.row3}>
      <Text style={{color:'black',fontSize:15}}>Already account</Text>
      <View>

      </View>
      <TouchableOpacity
            onPress={()=>{navigation.navigate('SignIn')}}
            >
            <Text style={{color:'black',fontWeight:'bold',textDecorationLine:'underline',fontSize:15}}> Login In</Text>
      </TouchableOpacity>
      <View style={{height:'120%',width:0.8,backgroundColor:'black',marginLeft:'4%'}}></View>
          <Image source={fb} style={{width:30,height:30,marginLeft:'5%'}}/>
          <Image source={google} style={{width:30,height:30,marginLeft:'5%'}}/>
    </View>
    <View style={styles.row4}>
           <Text style={{padding:1}}>By signing up your agree to our <Text style={{color:'#00338D',fontWeight:'500',textDecorationLine:'underline'}}>Terms of services &{'\n'} Privacy Policy</Text></Text>
        </View>
        {showActivityIndicator && (
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator size="large" color="#00338D" />
        </View>
      )}
</View>
  )
}

export default EmaiLogin

const styles = StyleSheet.create({
    container:{
        width:'100%',
        height:'100%',
      },  
      row1:{

      }  ,
      row2:{
      },
    inpt:{
        borderBottomWidth:0.5,
        width:'86%',
        marginTop:'4%',
        marginLeft:'5%',
    },
    row3:{
        flexDirection:'row',
        justifyContent:'center',
        marginTop:'10%'
      },   
      row4:{
        marginLeft:'8%',
        marginTop:'35%'
      },
      activityIndicatorContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.7)', // Semi-transparent background
      },
})