import { StyleSheet, Text, View,TextInput,TouchableOpacity } from 'react-native'
import React,{useEffect, useState} from 'react';
import LoginTop from './LoginTop1';
import { useLoginContext } from './LoginCartProvider';
const Login2 = ({navigation}) => {
    const{mobileNumber, setMobileNumber,checkMobile,setCheckMobile}=useLoginContext();
    const[otp,setOtp]=useState('');
    const[btnColor,setBtnColor]=useState(false);
    const[error1,setError1]=useState(false);
    const[error2,setError2]=useState(false);
    const[txtInpt,setTxtInpt]=useState(false);


    const handleTextInputChange = (text) => {
      setOtp(text);
    };    

    useEffect(()=>{
      if(otp.length===6){
        setBtnColor(true);
        setTxtInpt(false);
      }else{
        setBtnColor(false);
      }
    });
    
    
    if(txtInpt){
      setTimeout(() => {
        setTxtInpt(false);
      }, 4000);
    }

    function handleBtn()
    {
      if(otp==="000000"){
        setMobileNumber(checkMobile);
        setOtp("");
        navigation.navigate('mobileVerify');
      }else{
        setError2(true);
        setTxtInpt(true);
      }
      if(error2){
        setTimeout(()=>{
          setError2(false);
        },2500);
      }
    if(otp.length===0){
        setError1(true);
        if(error1){
          setTimeout(()=>{
            setError1(false);
          },2500);
        }
      }
    }

    return (
    <View style={styles.container}>
      <LoginTop />
      <View style={styles.row2}>
             <Text style={{fontSize:28,fontWeight:'bold',textAlign:'center',marginTop:'10%',color:'#00338D'}}>Verify Mobile</Text>
             <Text style={{textAlign:'center'}}>Enter the 6-digit OTP sent to ******{checkMobile[checkMobile.length-4]}{checkMobile[checkMobile.length-3]}{checkMobile[checkMobile.length-2]}{checkMobile[checkMobile.length-1]}</Text>

             <TextInput style={{ borderBottomWidth:0.8,width:'90%',
             marginTop:'7%',marginLeft:'5%',borderColor:txtInpt?'red':'black'}}
             placeholder='OTP'
             keyboardType='numeric'
             maxLength={6}
             value={otp}
             onChangeText={handleTextInputChange}
             />

             <TouchableOpacity style={{backgroundColor:btnColor?'#00338D':'grey',height:'13%',width:'90%',padding:10,
                 marginTop:'8%',marginLeft:'5%',alignItems:'center'}}
                 onPress={handleBtn}
                 >
                    <Text style={{color:'white',fontSize:17}}>Submit</Text>
             </TouchableOpacity>
            {
              error1?
              <Text style={{color:'red',textAlign:'center',marginTop:'3%'}}>please enter otp</Text>:
              <Text></Text>
            }
            {
              error2?
              <Text style={{color:'red',textAlign:'center',marginTop:'3%'}}>otp is not valid</Text>:
              <Text></Text>
            }
        </View>
    </View>
  )
}

export default Login2

const styles = StyleSheet.create({
    container:{
        width:'100%',
        height:'100%',
      },
      row2:{
        marginTop:'7%'
      },
      textInput:{
      },
})