import { StyleSheet, Text, View,TextInput,TouchableOpacity,ActivityIndicator} from 'react-native'
import React,{useEffect, useState} from 'react';
import LoginTop1 from './LoginTop1';
import { useLoginContext } from './LoginCartProvider';
import RnOtpTimer from 'react-native-otp-timer';
import axios from 'axios';
const EmailLoginValidation = ({navigation}) => {

  const {checkEmail,setCheckEmail,
         emailverify,setEmailVerify,
         }=useLoginContext();
  const {ip,emailId, setEmailId,password,setPassword,userLogin,setUserLogin,token,setToken,loginUserId,setLoginUserId,} = useLoginContext()

  const[otp,setOtp]=useState('');
  const[error1,setError1]=useState(false);
  const[error2,setError2]=useState(false);
  const[btnColor,setBtnColor]=useState(false);
  const[activityIndicator,setActivityIndicator]=useState(false);
  const [showActivityIndicator, setShowActivityIndicator] = useState(false);
  const [resendCountDown,setResendCountDown]=useState(false);

  // useEffect(()=>{
  //  if(!resendCountDown)
  //   setResendCountDown(true);
  //  }
  // },[resendCountDown]);
  const createUser = {
    email: checkEmail, 
    password: password,
  };
  
  async function userCreate() {
    try {
      const response = await axios.post(`http://${ip}:5454/auth/signup`, createUser);
      console.log(response.data);
    } catch (error) {
      console.log("Error occurred while creating user:", error);
      // Handle error here, e.g., set an error state
    }
  }
  async function sendEmailOtp(){
    try {
      const response = await axios.post(`http://${ip}:5454/auth/verify-otp?email=${checkEmail}&otp=${otp}`);
      console.log(response.data);
      submitEmailOtp();
    } catch (error) {
      console.log("Error occurred while creating user:", error);
      setError2(true);
      // Handle error here, e.g., set an error state
    }  
  }


  useEffect(() => {
    setBtnColor(otp.length === 6);

  }, [otp]);

  const handleChangeText=(text)=>{
   setOtp(text);
   console.log(text);
  }
 

  function submitEmailOtp(){
    // if(otp==="000000"){
      if(!error2){
        
        // userCreate();
        setEmailId(checkEmail);
        setEmailVerify(true);
        setOtp("");
       // Show Activity Indicator
     
       setShowActivityIndicator(true);
       setTimeout(() => {
         setShowActivityIndicator(false);
        navigation.reset({
         index: 0,
         routes: [{ name: 'EmailVerify' }],
       });  
     }, 5000);
   
       }
       
  }
  function handleBtn(){
  
    if(otp===""){
        setError1(true);
    }else{
      sendEmailOtp();
    }

}
if(error1){
    setTimeout(()=>{
      setError1(false);
    },2500);
}
if(error2){
    setTimeout(()=>{
      setError2(false);
    },2500);
  }
  async function applyCoupon(){

  }
 async function memberShipStatus(){
    
  }
  return (
    <View style={styles.container}>
        <LoginTop1/>
        {/* <Text>{checkEmail}{password}</Text> */}
        <View style={styles.row2}>
             <Text style={{fontSize:28,fontWeight:'bold',textAlign:'center',marginTop:'10%',color:'#00338D'}}>Verify Email</Text>
             <Text style={{textAlign:'center'}}>Enter the 6-digit OTP sent to your email id{'\n'}******
             <Text style={{color:'black',fontWeight:'600'}}>
             {checkEmail[checkEmail.length-12]}
             {checkEmail[checkEmail.length-11]}
             {checkEmail[checkEmail.length-10]}
             {checkEmail[checkEmail.length-9]}
             {checkEmail[checkEmail.length-8]}
             {checkEmail[checkEmail.length-7]}
             {checkEmail[checkEmail.length-6]}
             {checkEmail[checkEmail.length-5]}
             {checkEmail[checkEmail.length-4]}
             {checkEmail[checkEmail.length-3]}
             {checkEmail[checkEmail.length-2]}
             {checkEmail[checkEmail.length-1]}
             </Text>
             </Text>

             <TextInput style={{ borderBottomWidth:0.8,width:'90%',
             marginTop:'7%',marginLeft:'5%',}}
             placeholder='OTP'
             keyboardType='numeric'
             value={otp}
             onChangeText={(text)=>{handleChangeText(text)}}
             maxLength={6}
             />
 
           <TouchableOpacity style={{backgroundColor:btnColor?'#00338D':'grey',height:'12%',width:'90%',padding:10,
                 marginTop:'8%',marginLeft:'5%',alignItems:'center'}}
                 onPress={handleBtn}
                 >
                  <Text style={{color:'white',fontWeight:'700',fontSize:15.4,padding:'0.4%'}}>Submit</Text>
           </TouchableOpacity>
           <View style={{flexDirection:'row',justifyContent:'center',marginTop:'3%'}}>
            {
              resendCountDown?
              <Text>Send in </Text>:
              <Text></Text>
            }
      <RnOtpTimer
        minute={0}
        second={30}
        fontsize={20}
        fontfamily={'Poppins-Regular'}
        textcolor={'#00338D'}  // Set text color to #00338D
        labelfontsize={15}
        labelfontfamily={'Poppins-Regular'}
        labelcolor={'#00338D'}  // Set label color to #00338D
        labeltext="want otp again"
        labelStyle={{ textDecorationLine: 'underline' }}  // Add underline to label
        onCountdownStart={() => {
          // Handle the countdown start event here
          setResendCountDown(true);
          console.log("Countdown has started!");
        }}         
        onCountdownOver={() => {
          // Handle the countdown over event here
          setResendCountDown(true)
          console.log("Countdown is over!");
        }}
    />

           </View>

             {
              error1?
              <Text style={{color:'red',textAlign:'center',marginTop:'3%',fontSize:12}}>Please enter OTP</Text>:
              <Text></Text>
            }
            {
              error2?
              <Text style={{color:'red',textAlign:'center',marginTop:'3%',fontSize:12}}>Invalid OTP</Text>:
              <Text></Text>
            }
        </View>
        {showActivityIndicator && (
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator size="large" color="#00338D" />
        </View>
      )}
    </View>
    
  )
}

export default EmailLoginValidation

const styles = StyleSheet.create({
    container:{
        width:'100%',
        height:'100%',
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