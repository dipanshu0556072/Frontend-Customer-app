import { StyleSheet, Text, View,TouchableOpacity,ScrollView ,Image,TextInput, Alert} from 'react-native'
import React,{useState,useEffect} from 'react';
import back from '../PlpScreen/images/back.png';
import kpmg from '../PlpScreen/images/kpmg.png';
import padlock from '../PlpScreen/images/padlock.png';
import lock from '../PlpScreen/images/lock.png';
import eye1 from './images/view1.png';
import eye2 from './images/view2.png';
import CheckBox from '@react-native-community/checkbox';
import { useLoginContext } from './LoginCartProvider';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
import { useCartContext } from '../Context/WomenContext';

const ChangePassword = ({navigation}) => {
   

    const {ip,token,popFromStack,pushToStack,
      currentPage, setCurrentPage,
      currentPageIndex,setCurrentPageIndex,
      currentPageIndexCategory,setCurrentPageIndexCategory,loginUserId,setLoginUserId,}=useLoginContext(); 
    const [isFocused, setIsFocused] = useState(false); 
    const [seePassword1,setSeePassword1]=useState(true); 
    const [seePassword2,setSeePassword2]=useState(true); 
    const [seePassword3,setSeePassword3]=useState(true); 
    const [currentPassword,setCurrentPassword]=useState("");
    const [newPassword,setNewPassword]=useState("");
    const [confirmPassword,setConfirmPassword]=useState("");

    const [currentPasswordError,setcurrentPasswordError]=useState(false);
    const [newPasswordError,setNewPasswordError]=useState(false);
    const [confirmPasswordError,setConfirmPasswordError]=useState(false);
    const [newPassConfirmPassMatch,setNewPassConfirmMatch]=useState(false);

    const [isLoading, setIsLoading] = useState(false);

    const [passwordChanged,setPasswordChanged]=useState(false);

    const [currentPasswordBackendMatched,setCurrentPasswordBackendMatched]=useState(true);

    
    
    //button color
    const [btnColor,setBtnColor]=useState(false);
  

   async function changePassword(){

       if(currentPassword===''||newPassword===''||confirmPassword===''){
         if(currentPassword===''){
            setcurrentPasswordError(true);
         }
         if(newPassword===''){
            setNewPasswordError(true);
         }
         if(confirmPassword===''){
            setConfirmPasswordError(true);
         }
         return;
       }else{
           if(newPassword!==confirmPassword){
              setNewPassConfirmMatch(true);
              setNewPasswordError(true);
              setConfirmPasswordError(true);           
           }else{
            try {
              const response = await axios.put(`http://${ip}:5454/api/users/change-password/${loginUserId}?currentPassword=${currentPassword}&newPassword=${newPassword}`, null, {
                  headers: {
                      'Authorization': `Bearer ${token}`,
                  },
              });
              // Password change was successful
              setCurrentPasswordBackendMatched(true);
              setIsLoading(true);
              setTimeout(()=>{
                navigation.navigate('SignIn');
              },5000);
              console.log("Password changed successfully!");
          } catch (error) {
              if (error.response && error.response.status === 401) {
                  // Handle 401 error (unauthorized access)
                  setcurrentPasswordError(true);
                  setCurrentPassword("");
                  setCurrentPasswordBackendMatched(false);
                  // Alert.alert("Unauthorized access", "Please log in again.");
              } else {
                  console.error("Error:", error.message);
                  Alert.alert("Error", error.message);
              }
          }
            
             
           }
       }
    }



useEffect(()=>{
   if(currentPassword && newPassword && confirmPassword){
     setBtnColor(true);
   }else{
    setBtnColor(false);
   }
   if(newPassConfirmPassMatch){
     setTimeout(()=>{
      setNewPassConfirmMatch(false);
     },5000);
   }
   if(currentPasswordError && currentPassword.length>0){
      setcurrentPasswordError(false);
   }
   if(newPasswordError && newPassword.length>0 && newPassword===confirmPassword){
    setNewPasswordError(false);
    setConfirmPasswordError(false);
   }
   if(isLoading){
   setTimeout(()=>{
    setIsLoading(false);
    setPasswordChanged(true);
   },2000);
   }
   if(passwordChanged){
    setTimeout(()=>{
     setPasswordChanged(false);
    },7000);
    
    if(!currentPasswordBackendMatched){
      setTimeout(()=>{
       setCurrentPasswordBackendMatched(true);
      },1000);
    }
   }
},[currentPassword,newPassword,confirmPassword,
   newPassConfirmPassMatch,currentPasswordError,isLoading,passwordChanged,currentPasswordBackendMatched]);

  function Eye() {
    setSeePassword1((prevState) => !prevState);
  }

  function Close() {
    setSeePassword1((prevState) => !prevState);
  }

  // Updated Eye1 and Close1 functions to toggle seePassword1 state
  function Eye1() {
    setSeePassword2((prevState) => !prevState);
  }

  function Close1() {
    setSeePassword2((prevState) => !prevState);
  }
  function Eye3() {
    setSeePassword3((prevState) => !prevState);
  }

  function Close3() {
    setSeePassword3((prevState) => !prevState);
  }

  function forNavigate(page){
    console.log(page+" "+currentPage[currentPage.length-1]);
    if(currentPage && currentPage[currentPage.length-1]!==page){
      pushToStack(page);
      navigation.navigate(page)
    }else{
      popFromStack(navigation);
    }
  }

  return (
    <View style={{flex:1,backgroundColor:'white'}}>
               <View>
                {/* <Text>{currentPassword}{newPassword}{confirmPassword}{loginUserId}</Text> */}
                <TouchableOpacity onPress={() => forNavigate('mainHome')}>
                     <Image source={kpmg} style={{ width: 160, height: 90, }} />
                 </TouchableOpacity>
                  <TouchableOpacity
                    style={{marginTop:'2%'}}
                    onPress={() => popFromStack(navigation)}>
                    <Image source={back}  
                      style={{marginLeft:12}}/>
                  </TouchableOpacity>
               </View>
               <ScrollView showsVerticalScrollIndicator={false}>
                    <Image source={padlock} style={{alignSelf:'center',width:30,height:30,marginTop:'4%'}}/> 
                    <Text style={{fontSize:24,color:'#00338D',padding:'3%',alignSelf:'center',fontWeight:'500'}}>Change Password</Text>
                    <Text style={{color:'#00338D',textAlign:'center',fontSize:13}}>Please add the following details to {'\n'}update your password</Text>

                   <View style={{flexDirection:'row',alignItems:'center',alignContent:'center',marginTop:'4%'}}>
                     <Image source={lock} style={{width:22,height:20,marginTop:'14%',marginLeft:'3%',padding:'2%'}}/>
                      <TextInput 
                       style={ {      
                        borderBottomWidth:0.6,
                        width:'80%',
                        marginTop:'12%',
                        marginLeft:'3%',
                        color:  'grey' ,
                        borderColor: currentPasswordError?'red':'#00338D'
                        }}
                        placeholder='Current Password'
                        placeholderTextColor='grey'
                        value={currentPassword}
                        secureTextEntry={seePassword1}
                        onChangeText={(text)=>{setCurrentPassword(text)}}

                    />
                    {
                     seePassword1 ?
                    (
                     <TouchableOpacity onPress={Eye}>
                      <Image source={eye2} style={{width:21,height:18,marginTop:40,marginRight:74}}/>
                     </TouchableOpacity>
                    ) :
                    (
                    <TouchableOpacity onPress={Close}>
                     <Image source={eye1} style={{width:21,height:18,marginTop:40,marginRight:74}}/>
                    </TouchableOpacity>
                   )
                  }  

                 </View>
                 <View style={{marginTop:'8%',flexDirection:'row',alignItems:'center',alignContent:'center'}}>
                  <Image source={lock} style={{width:22,height:20,marginLeft:'3%',padding:'2%'}}/>
                  <TextInput
                       style={ {      
                        borderBottomWidth:0.6,
                        width:'80%',
                        marginLeft:'3%',
                        color:  'grey' ,
                        borderColor: newPasswordError?'red':'#00338D'
                        }}
                        placeholder='New Password'
                        placeholderTextColor='grey'
                        value={newPassword}
                        secureTextEntry={seePassword2}
                        onChangeText={(text)=>{setNewPassword(text)}}
                   />
           {
            seePassword2 ?
          (
           <TouchableOpacity onPress={Eye1}>
             <Image source={eye2} style={{width:21,height:18,marginTop:10,marginRight:94}}/>
           </TouchableOpacity>
          ) :
         (
           <TouchableOpacity onPress={Close1}>
             <Image source={eye1} style={{width:21,height:18,marginTop:10,marginRight:94}}/>
          </TouchableOpacity>
         )
          }  

                 </View>
                 <View style={{marginTop:'8%',flexDirection:'row',alignItems:'center',alignContent:'center'}}>
                  <Image source={lock} style={{width:22,height:20,marginLeft:'3%',padding:'2%'}}/>
                  <TextInput
                       style={ {      
                        borderBottomWidth:0.6,
                        width:'80%',
                        marginLeft:'3%',
                        color:  'grey' ,
                        borderColor: confirmPasswordError?'red':'#00338D'
                        }}
                        placeholder='Confirm Password'
                        placeholderTextColor='grey'
                        value={confirmPassword}
                        secureTextEntry={seePassword3}
                        onChangeText={(text)=>{setConfirmPassword(text)}}
                   />
           {
            seePassword3 ?
          (
           <TouchableOpacity onPress={Eye3}>
             <Image source={eye2} style={{width:21,height:18,marginTop:10,marginRight:94}}/>
           </TouchableOpacity>
          ) :
         (
           <TouchableOpacity onPress={Close3}>
             <Image source={eye1} style={{width:21,height:18,marginTop:10,marginRight:94}}/>
          </TouchableOpacity>
         )
          }  
         

                 </View>
                 {
            newPassConfirmPassMatch ?
            <Text style={{color:'red',alignSelf:'center',margin:'4%',fontSize:12}}>New password & confirm not matched</Text>
            :
            <Text style={{margin:'4%'}}></Text>
          }
          {
            !currentPasswordBackendMatched ?
              <Text style={{textAlign:'center',color:'red',fontSize:12}}>Please enter correct current password.</Text>
            :
            <Text></Text>
          }

                 <TouchableOpacity style={{backgroundColor: btnColor ? '#00338D' : 'grey',marginTop:'20%',margin:'5%',padding:'2%',width:'80%',alignSelf:'center'}}
                    onPress={()=>{changePassword()}}
                    >
                    <Text style={{textAlign:'center',color:'white',fontWeight:'500'}}>SAVE</Text>
                 </TouchableOpacity>
                 {
                  passwordChanged ?
                  <Text style={{color:'green',fontWeight:'600',textAlign:'center'}}>password changed successfully!</Text>:
                  <Text></Text>
                 }

              </ScrollView>
              <Spinner
          visible={isLoading}
          textContent={'Changing Password...'}
          textStyle={styles.spinnerTextStyle}
          animation="fade"  // Set the animation type (fade, slide, none)
          overlayColor="rgba(0, 51, 141, 0.6)"  // Set the overlay color
          color="#00338D"
          size="large"
          speed={2}  // Set the speed of the animation
        />
    </View>
  )
}

export default ChangePassword

const styles = StyleSheet.create({})