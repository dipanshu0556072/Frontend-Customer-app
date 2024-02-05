import { StyleSheet, Text, View,Image, TextInput, TouchableOpacity,ActivityIndicator } from 'react-native'
import React,{useEffect, useState} from 'react';
import arrow from './images/arrow.png';
import google from './images/google.png';
import fb from './images/fb.png';
import LoginTop from './LoginTop1';
import { useLoginContext } from './LoginCartProvider';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { useLoginContext } from './LoginCartProvider';

const MobileSign = ({navigation}) => {
  const {ip}=useLoginContext();
  const {emailId, setEmailId,password,setPassword,userLogin,setUserLogin,token,setToken} = useLoginContext()
  const[btnColor,setBtnColor]=useState(false);
  const[Error,setError]=useState(false);
  const[authError,setAuthError]=useState(false);

  const [showActivityIndicator, setShowActivityIndicator] = useState(false);



  useEffect(()=>{
    if(emailId.length>=10 && password.length>0){
      setBtnColor(true);
    }else{
      setBtnColor(false);
    }
  });

  const signInBody = {
    "email":emailId,
    "password":password
  }
  
  const postSignIn = async (signInBody) => {
    console.log(signInBody);

  if(token===""){
    try {
      const response = await axios.post("http://192.168.0.107:5454/auth/signin", signInBody);
      setUserLogin(response.data);
      // console.log("Here userLogin " + userLogin + "\nhere login \n" + JSON.stringify(response.data));
      // console.log("here login \n" + JSON.stringify(response.data.jwt));
      
        setToken(response.data.jwt);
      
      
     
      if (response.status === 200) {
         // Successful authentication
      setUserLogin(response.data);
      setToken(response.data.jwt);
  
          // Show Activity Indicator
    setShowActivityIndicator(true);

    setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: 'mainHome' }],
      });  
      setShowActivityIndicator(false);
    }, 3000);

      console.log("Authentication Token: "+response.data.jwt);
      } else {
     // Authentication failed
     console.log("Authentication failed:", response.data.error);
     setAuthError(true);     
     }
    }
    catch (error) {
      console.log('Error fetching:', error);
      setError(true);
    }
  }else{
    const header = {
      'Authorization': `Bearer ${token}`,         
    }
    try {
      const response = await axios.post('http://192.168.0.107:5454/auth/signin', signInBody,{header});
      setUserLogin(response.data);
      // console.log("Here userLogin " + userLogin + "\nhere login \n" + JSON.stringify(response.data));
      // console.log("here login \n" + JSON.stringify(response.data.jwt));
      
        setToken(response.data.jwt);
      
      
     
      if (response.status === 200) {
         // Successful authentication
      setUserLogin(response.data);
      setToken(response.data.jwt);
  
          // Show Activity Indicator
    setShowActivityIndicator(true);

      console.log("Authentication Token: "+response.data.jwt);
      } else {
     // Authentication failed
     console.log("Authentication failed:", response.data.error);
     setAuthError(true);     
     }
    }
    catch (error) {
      console.log('Error fetching:', error);
      setError(true);
    }

  }
}

  
  useEffect(() => {
    let timeout;
    if (Error) {
      timeout = setTimeout(() => {
        setError(false);
      }, 5000);
    }
    if (authError) {
      timeout = setTimeout(() => {
        setAuthError(false);
      }, 5000);
    }
  
    return () => clearTimeout(timeout); // Clear timeout on component unmount or when useEffect runs again
  }, [Error, authError]);
    
  const handleTextInputChange = (text) => {
    setEmailId(text);
  };
//   
  const handleTextInputChange1 = (text) => {
    setPassword(text);
  };
  async function SignInBtn(){
    console.log("submitbtn");
    postSignIn(signInBody);

  }

  return (
  <> 
     <View style={styles.container}>
        <LoginTop/>
        <View style={styles.row2}>
             <Text style={{fontSize:28,fontWeight:'bold',textAlign:'center',marginTop:'10%',color:'#00338D'}}>Login</Text>
             <TextInput   style={{
    borderBottomWidth: 0.5,
    width: '90%',
    marginTop: '7%',
    marginLeft: '5%',
    borderBottomColor: authError ? 'red' : 'black',  // Fix: Use lowercase "error"
  }}             
             
             placeholder='email id'
             value={emailId}
             onChangeText={handleTextInputChange}
             />
             <TextInput  style={{
    borderBottomWidth: 0.5,
    width: '90%',
    marginTop: '7%',
    marginLeft: '5%',
    borderBottomColor: authError ? 'red' : 'black',  // Fix: Use lowercase "error"
  }}
             placeholder='password'
             value={password}
             secureTextEntry={true}
             onChangeText={handleTextInputChange1}
             />
            
             <TouchableOpacity style={{backgroundColor:btnColor?'#00338D':'grey',height:'11%',width:'90%',padding:9,
                 marginTop:'8%',marginLeft:'5%',alignItems:'center'}}
                 onPress={SignInBtn}
                 >
                  <Text style={{color:'white',fontWeight:'700',fontSize:15}}>Submit</Text>
             </TouchableOpacity>
             {
              authError?
              <Text style={{textAlign:'center',marginTop:'2%',color:'#d10808'}}>invalid credentials!</Text>:
              <Text></Text>
             }
        </View>
        <View style={styles.row3}>
          <Text style={{color:'black',fontSize:15}}>Signup using</Text>
          <TouchableOpacity
            onPress={()=>{navigation.navigate('EmailLogin')}}
            >
            <Text style={{color:'black',fontWeight:'bold',textDecorationLine:'underline',fontSize:15}}> Email</Text>
          </TouchableOpacity>
          <View style={{height:'120%',width:0.8,backgroundColor:'black',marginLeft:'4%'}}></View>
          <Image source={fb} style={{width:30,height:30,marginLeft:'5%'}}/>
          <Image source={google} style={{width:30,height:30,marginLeft:'5%'}}/>
        </View> 
        <View style={styles.row4}>
           <Text style={{padding:1}}>By signing up your agree to our <Text style={{color:'#00338D',fontWeight:'500',textDecorationLine:'underline'}}>Terms of services &{'\n'} Privacy Policy</Text></Text>
        </View>
     </View>
     {showActivityIndicator && (
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator size="large" color="#00338D" />
        </View>
      )}

  </>
  )
}

export default MobileSign

const styles = StyleSheet.create({
  container:{
    width:'100%',
    height:'100%',
  },

  row2:{
    marginTop:'7%'
  },
  textInput:{
    borderBottomWidth:0.5,
    width:'90%',
    marginTop:'7%',
    marginLeft:'5%',
  },
  row3:{
    flexDirection:'row',
    justifyContent:'center'
  },
  row4:{
    height:'28%',
    width:'100%',
    justifyContent:'flex-end',
    padding:'10%'
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