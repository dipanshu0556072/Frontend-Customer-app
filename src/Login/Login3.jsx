import { StyleSheet, Text, TextInput, View,Image, TouchableOpacity,ActivityIndicator} from 'react-native'
import React,{useState,useEffect} from 'react';
import LoginTop2 from './LoginTop2';
import { useLoginContext } from './LoginCartProvider';
import correct from './images/correct.png';
import arrow from './images/arrow2.png';
import eye1 from '../Login/images/view1.png';
import eye2 from '../Login/images/view2.png';
import axios from "axios";
import { useNavigation } from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';
const Login3 = ({navigation}) => {

 const {token,setToken}=useLoginContext();

  function Eye(){
    setSeePassword(false);
  }
  function Eye1(){
    setSeePassword1(false);
  }

  const {ip,mobileNumber, setMobileNumber,isFocused, setIsFocused,
         mobileverify,setMobileVerify,
         emailverify,setEmailVerify,checkEmail,setCheckEmail,
         emailId,setCheckMobile,gender,userName,setUserName,password,setPassword,confirmPassword,setConfirmPassword} = useLoginContext();
  
    const[btnColor,setBtnColor]=useState(false);
    const [inputUser, setInputUser] = useState(userName || '');  
    const [inputMobile, setInputMobile] = useState(mobileNumber || '');  
    const [inputEmail, setInputEmail] = useState(emailId || '');  
    const [seePassword,setSeePassword]=useState(true);
    const [seePassword1,setSeePassword1]=useState(true);
    const [error1,setError1]=useState(false);
    const [goodError1,setGoodError1]=useState(false);
    const [isLoading, setIsLoading] = useState(false);
    
    
    const handleFocus = () => {
      setIsFocused(true);
    };
  
    const handleBlur = () => {
      setIsFocused(false);
    };

    useEffect(()=>{
       if(inputUser.length>0){
        setUserName(inputUser);
       }
    },[inputUser]);

  //for changing submit btn color
  useEffect(()=>{
     if(inputUser!=="" && mobileNumber!=="" && emailId!=="" && gender!==""){
        setBtnColor(true);
        console.log(gender);    
     }else{
        setBtnColor(false);
     }
  });

  useEffect(() => {
    if (mobileNumber.length >= 10) {
      setMobileVerify(true);
    } else {
      setMobileVerify(false);
    }
  }, [mobileNumber]);
 
  useEffect(()=>{
    if(inputMobile.length>0 && inputMobile!==mobileNumber){
      setMobileVerify(false);
    }
    setTimeout(()=>{
      if(inputMobile.length===0 && mobileNumber.length>=10){
        setInputMobile(mobileNumber);
        setMobileVerify(true);
      }  
    },30000);
  },[inputMobile]);

  useEffect(()=>{
    if(emailId.length>0){
      setEmailVerify(true);
    }else{
      setEmailVerify(false);
    }
  },[emailId]);

  useEffect(()=>{
    if(inputEmail.length>0 && inputEmail!==emailId){
      setEmailVerify(false);
    }
    setTimeout(()=>{
      if(inputEmail.length===0 && emailId.length>=10){
        setInputEmail(emailId);
        setEmailVerify(true);
      }  
    },10000);
  },[inputEmail]);

  function getOtp(){
   if(inputMobile.length>=10 && inputMobile!==mobileNumber){
     setCheckMobile(inputMobile);
     setTimeout(()=>{
      navigation.navigate('Login2');
     },1000);
    } 
  }

  function getEmailOtp(){
    if(inputEmail[inputEmail.length-1]==='m' && 
       inputEmail[inputEmail.length-2]==='o' && 
       inputEmail[inputEmail.length-3]==='c' && inputEmail!==emailId){
      console.log(inputEmail); 
      setMobileNumber(inputMobile); 
      setCheckMobile(inputMobile);
      setCheckEmail(inputEmail);
      setTimeout(()=>{
       navigation.navigate('EmailLoginValid');
      },4500);
     }  
  }

  async function CreateIn(){
    const nameParts = userName.split(' ');

 

    if(btnColor){
      
      const post = 
      {
         firstName:nameParts[0],
         lastName:nameParts[1],
         email:emailId,
         mobile:mobileNumber,
         gender:gender,
         password:password,
      } 
      if(post.lastName===undefined){
        post.lastName="";
      }
  
    
      setIsLoading(true);
      console.log("here userData \n"+post.firstName+" "+post.lastName+" "+post.email+" "+post.mobile+" "+post.gender+" "+post.password);

      // axios.post('http://192.168.1.101:5454/auth/signup',post).then((res) => {
      //   console.log(res.data)
      //   setTimeout(()=>{
      //     setIsLoading(false);
      //   },4000);
      // }).catch((err)=> {
      //   console.log(err)
      // })

      
      axios.post(`http://${ip}:5454/auth/signup`, post)
                 
      .then((res) => 
      {
         console.log("This is user Data"+post);
        
         setGoodError1(true);
          setTimeout(()=>{
            setGoodError1(false);
            navigation.navigate('SignIn');             
          },4000);

      }).catch((err) => {
        console.error('user already exist', err);
        setIsLoading(false);
        setTimeout(()=>{
          navigation.reset({
            index: 0,
            routes: [{ name: 'SignIn' }],
          });  
        },4000);
        setError1(true);
        useEffect(()=>{
          setTimeout(()=>{
           setError1(false); 
          },2000);
        });
      })
     
    
    }
  }
  
  return (
    <>
    <View style={styles.container}>
    <LoginTop2/>

    <View style={styles.row1}>
          <Text style={{color:'black',fontWeight:'500',textAlign:'center',marginTop:'4%'}}>Let's get you registered!</Text>
          <TextInput
            style={styles.txtInpt}
            placeholder='full name*'
            value={inputUser}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChangeText={(text)=>{setInputUser(text)}}
          />
          <View style={{flexDirection:'row',alignItems:'center'}}>
            <View>
             <TextInput
              style={styles.txtInpt1}
              placeholder='Mobile Number*'
              maxLength={12}            
              keyboardType='numeric'
              onFocus={handleFocus}
              onBlur={handleBlur}
              value={inputMobile}
              onChangeText={(text) => setInputMobile(text)}
            />
            </View>
            {
              mobileverify?
              <View style={{marginLeft:'44%'}}>
               <Image source={correct} style={{width:18,height:18}}/>
              </View>:
               <TouchableOpacity style={{marginLeft:'38%'}}
                  onPress={getOtp()}
                 >
                 <Text style={{color:'#00338D',textDecorationLine:'underline'}}>Verify</Text>
               </TouchableOpacity>
           }
          </View>

          <View style={{justifyContent:'space-between',alignItems:'center',
              flexDirection:'row',marginLeft:'8%',marginTop:'3%',width:'85%',borderBottomWidth:0.5}}>
            <View>
               <TextInput style={{width:'100%'}}
                placeholder='email*'
                value={inputEmail}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChangeText={(text) => setInputEmail(text)}
                />
            </View>
            {
              emailverify?
              <View>
               <Image source={correct} style={{width:18,height:18}}/>
              </View>:
               <TouchableOpacity style={{}}
                  onPress={()=>getEmailOtp()}
                 >
                 <Text style={{color:'#00338D',textDecorationLine:'underline'}}>Verify</Text>
               </TouchableOpacity>
           }
          </View>


         <View style={{borderBottomWidth:0.5,marginTop:'8%',width:'85%',marginLeft:'8%'}}
          >
            <TouchableOpacity
               onPress={()=>{navigation.navigate('Gender')}}
               style={{flexDirection:'row',justifyContent:'space-between'}}>
             
             {
              gender.length>0?
              <Text style={{paddingBottom:'2%',color:'#4f4c4c'}}>{gender}</Text>:
              <Text style={{paddingBottom:'2%'}}>Gender*</Text>
             }
             <View>
              <Image source={arrow} style={{width:15,height:14}}/>
             </View>
            </TouchableOpacity> 
          </View>          

       </View>
       <TouchableOpacity style={{backgroundColor:btnColor?'#00338D':'grey',
                 height:'5%',width:'86%',
                 marginTop:'15%',marginLeft:'8%',alignItems:'center',padding:11}}
                 onPress={()=>CreateIn()}
                 >
                    <Text style={{color:'white',fontSize:17}}>Submit</Text>
       </TouchableOpacity>


       {
              error1?
              <Text style={{textAlign:'center',marginTop:'2%',color:'red'}}>user already exist!</Text>:
              <Text></Text>
       }
       {
              goodError1?
              <Text style={{textAlign:'center',marginTop:'2%',color:'green'}}>account created successfully!</Text>:
              <Text></Text>
       }
        {/* <ActivityIndicator  size="large" color="#00338D"/> */}
        <Spinner
          visible={isLoading}
          textContent={'Creating...'}
          textStyle={styles.spinnerTextStyle}
          animation="fade"  // Set the animation type (fade, slide, none)
          overlayColor="rgba(0, 51, 141, 0.6)"  // Set the overlay color
          color="#00338D"
          size="large"
          speed={2}  // Set the speed of the animation
        />
    </View>
    </>
  )
}

export default Login3

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  row1: {
    marginTop: '12%',
  },
  txtInpt: {
    borderBottomWidth: 0.5,
    width: '85%',
    marginTop: '10%',
    marginLeft: '8%',
  },
  txtInpt1: {
    borderBottomWidth: 0.5,
    width: '190%',
    marginTop: '4%',
    marginLeft: '18%',
  },
  txtInpt2: {
    borderBottomWidth: 0.5,
    width: '85%',
    marginTop: '4%',
    marginLeft: '8%',
  },
})