import { StyleSheet, Text, View,Image, TextInput, TouchableOpacity } from 'react-native'
import React,{useEffect, useState} from 'react';
import arrow from './images/arrow.png';
import google from './images/google.png';
import fb from './images/fb.png';
import LoginTop from './LoginTop1';
import { useLoginContext } from './LoginCartProvider';

const Login1 = ({navigation}) => {
  const {mobileNumber, setMobileNumber,checkMobile,setCheckMobile} = useLoginContext()
  const[btnColor,setBtnColor]=useState(false);
  const[error,setError]=useState(false);

  useEffect(()=>{
    if(checkMobile.length>=10){
      setBtnColor(true);
      console.log(mobileNumber);
    }else{
      setBtnColor(false);
    }
  });
  

  
  const handleTextInputChange = (text) => {
    setCheckMobile(text);
  };
  function SignInBtn(){
    if(checkMobile.length>=10){
      navigation.navigate('Login2');
    }else{
      setError(true);
      if(Error){
        setTimeout(()=>{
          setError(false);
        },2500);
      }
    }
  }

  return (
  <> 
     <View style={styles.container}>
        <LoginTop navigation={navigation}/>
        <View style={styles.row2}>
             <Text style={{fontSize:28,fontWeight:'bold',textAlign:'center',marginTop:'10%',color:'#00338D'}}>Login/SignUp</Text>
             <TextInput style={styles.textInput}
             placeholder='Mobile Number'
             keyboardType='numeric'
             maxLength={12}
             value={checkMobile}
             onChangeText={handleTextInputChange}
             />
            
             <TouchableOpacity style={{backgroundColor:btnColor?'#00338D':'grey',height:'13%',width:'90%',padding:10,
                 marginTop:'8%',marginLeft:'5%',alignItems:'center'}}
                 onPress={SignInBtn}
                 >
                  <Text style={{color:'white',fontWeight:'700',fontSize:15}}>Submit</Text>
             </TouchableOpacity>
             {
              error?
              <Text style={{textAlign:'center',marginTop:'2%',color:'red'}}>Please enter correct mobile number</Text>:
              <Text></Text>
             }
        </View>
        <View style={styles.row3}>
          <Text style={{color:'black',fontSize:15}}>Login using</Text>
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

  </>
  )
}

export default Login1

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
  }
})