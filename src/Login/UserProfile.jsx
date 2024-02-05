import { StyleSheet, Text, View,Image,TouchableOpacity,TextInput, ScrollView} from 'react-native'

import arrow from '../PlpScreen/images/back.png';
import profile1 from './images/profile1.png';
import profile2 from './images/profile2.png';
import profile3 from './images/profile3.png';
import React,{useState,useEffect} from 'react';
import LoginTop2 from './LoginTop2';
import { useLoginContext } from './LoginCartProvider';
import { useCartContext } from '../Context/WomenContext';
import correct from './images/correct.png';
import arrow1 from './images/arrow2.png';
import user from './images/user.png';
import mobile from './images/smartphone.png';
import email from './images/email.png';
import calendar from './images/calendar.png';
import { RadioButton } from 'react-native-paper';
import { Calendar } from 'react-native-calendars';
import CalendarPicker from 'react-native-calendar-picker';
import Footer from '../Footer';
import lock from '../lock.png';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';

const UserProfile = ({navigation}) => {
  
  let profileData;
  const {mobileNumber, 
    emailId,gender,userName,
    loginUserId} = useLoginContext();
    const {ip,token,popFromStack,pushToStack,
      currentPage, setCurrentPage,
      currentPageIndex,setCurrentPageIndex,
      currentPageIndexCategory,setCurrentPageIndexCategory,
      updateUserName,setUpdateUserName,
updateMobileName,setUpdateMobileName,
updateEmail,setUpdateEmail,updateGender,setUpdateGender,
updatePassword,setUpdatePassword}=useLoginContext();        
 
          const forNavigate=(page)=>{
            if(page==='mainHome'){
             setCurrentPage('mainHome');
             navigation.navigate('mainHome');
            }else{
              console.log(page+" "+currentPage[currentPage.length-1]);
              if(currentPage && currentPage[currentPage.length-1]!==page){
                pushToStack(page);
                navigation.navigate(page)
              }else{
                popFromStack(navigation);
              }  
            }
          }

  const [isLoading, setIsLoading] = useState(false);      

 
        useEffect(() => {
      
          fetchData(); // Call the function when the component mounts
        }, []); // Empty dependency array ensures it only runs once on mount
      
        
        const fetchData = async () => {
          const header = {
            'Authorization': `Bearer ${token}`,
          };
    
          try {
            const response = await axios.get(`http://${ip}:5454/api/users/profile`, { headers: header });
    
             profileData = response.data;
          console.log(JSON.stringify(response.data));
            // Set the state with the fetched profile data
            setUpdateUserName(profileData.firstName + (profileData.lastName ? ` ${profileData.lastName}` : ''));
            setUpdateMobileName(profileData.mobile);
            setUpdateEmail(profileData.email);
            setUpdateGender(profileData.gender);
            // You might want to fetch and set other fields as needed
          } catch (error) {
            console.log('Error fetching profile:', error);
            // Handle the error as needed
          }
        };


// //update userName
// const [updateUserName,setUpdateUserName]=useState(userName);
// //update mobileNumber
// const [updateMobileName,setUpdateMobileName]=useState(mobileNumber);
// //update emailId
// const [updateEmail,setUpdateEmail]=useState(emailId);
// //update gender
// const [updateGender,setUpdateGender]=useState(gender);
// //update Password
// const [updatePassword,setUpdatePassword]=useState("");
// const [emailError,setEmailError]=useState(false);


const [error,setError]=useState(false);

const isEmailValid = (email) => {





  // Regular expression for a basic email pattern
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Test the email against the pattern
  return emailPattern.test(email);
};


const nameArray = updateUserName.split(" ");
const handleSave=async ()=>{

  const isValid = isEmailValid(updateEmail);
 
  if (!isValid) {
   setEmailError(true);
   return; // Stop further execution if email is not valid
  }
  if(updateUserName.length<=0||updateMobileName.length<=0||
      updateEmail.length<=0||updateGender.length<=0||updatePassword.length<=0||updateMobileName.length<10){
       setError(true);
   }else{
     
    const dataAdd={
       firstName: nameArray[0],
      lastName:nameArray[1]||"",
      gender:updateGender,
      mobile:updateMobileName,
      email:updateEmail
    }
    const header = {
      'Authorization': `Bearer ${token}`,         
    }
    try{
      const response = await axios.put(`http://${ip}:5454/api/users/update/${loginUserId}`, dataAdd, { headers: header });
      console.log("Profile updated successfully: UserProfile.jsx", response.data);
      setIsLoading(true);
      fetchData();
      setTimeout(()=>{
        setIsLoading(false);
        navigation.navigate('Home');
      },2000)
    }catch(error){
     console.log("Error in updating Profile: UserProfile.jsx",error);
    }

   }
}





 return (
  <>
 <View style={{flex:1,backgroundColor:'white'}}> 
  <ScrollView>
    <View style={styles.container}>
     <Text>{JSON.stringify(profileData)}</Text>
      <View style={{flexDirection:'row',alignItems:'center'}}>
        <View>
        <TouchableOpacity  onPress={()=>{forNavigate('mainHome')}}>
             <Image source={arrow}  
                   style={{marginLeft:12}}/>
          </TouchableOpacity>
        </View>
       
      </View>
      <View style={{marginTop:'8%'}}>
        <Text style={{textAlign:'center',fontSize:25,fontWeight:'500',color:'#00338D'}}>Edit Your Profile</Text>
      </View>
      <View style={{ height: 0.6, backgroundColor: '#00338D',marginTop:'3%' }} />
      <View style={{ height: 6, backgroundColor: '#ebebeb',}} />

      <View style={{flexDirection:'row',justifyContent:'center',marginTop:'8%'}}>
        <Image source={
          gender==="Male"?profile1:
          gender==="Female"?profile1:profile1
        } style={styles.profile}/>
      </View>
      
      <View style={styles.row}>
          <View style={{flexDirection:'row',alignItems:'center',padding:1}}>
            <Image source={user} style={{width:'5%',height:18}}/>
            <TextInput 
                placeholder='Full Name'
                style={ {      
                  borderBottomWidth:0.5,
                  width:'92%',
                  marginTop:'2%',
                  marginLeft:'3%',
                  color: updateUserName ? '#00338D' : 'grey', 
                  borderColor:!error?'grey':'red'
                }}
                value={updateUserName}
                placeholderTextColor='grey'
                onChangeText={(text)=>setUpdateUserName(text)}
                />
          </View>
          <View style={{flexDirection:'row',alignItems:'center',padding:1}}>
            <Image source={mobile} style={{width:'5%',height:22}}/>
            <TextInput
                style={ {      
                  borderBottomWidth:0.5,
                  width:'92%',
                  marginTop:'2%',
                  marginLeft:'3%',
                  color: updateMobileName ? '#00338D' : 'grey',
                  borderColor:!error?'grey':'red'
                }}

                placeholder='Mobile Number'
                placeholderTextColor='grey'
                keyboardType='numeric'
                maxLength={12}
                value={updateMobileName}
                onChangeText={(text)=>setUpdateMobileName(text)}
                />
          </View>
          <View style={{flexDirection:'row',alignItems:'center',padding:1}}>
            <Image source={email} style={{width:'6%',height:21}}/>
            <TextInput 
                style={ {      
                  borderBottomWidth:0.5,
                  width:'92%',
                  marginTop:'2%',
                  marginLeft:'3%',
                  color: updateEmail ? '#00338D' : 'grey' ,
                  borderColor: !error || !emailError ? 'grey' : 'red'
                }}

                placeholder='Email Id'
                placeholderTextColor='grey'
                value={updateEmail}
                onChangeText={(text)=>setUpdateEmail(text)}
                />
          </View>
          {/* <View style={{flexDirection:'row',alignItems:'center',padding:1}}>
            <Image source={calendar} style={{width:'6%',height:21}}/>
            <TextInput
                style={ {      
                  borderBottomWidth:0.5,
                  width:'92%',
                  marginTop:'2%',
                  marginLeft:'3%',
                  color: updateEmail ? '#00338D' : 'grey',
                 
                }}
                value='20/08/2001'
                editable={false} 

  placeholder='DOB'
  placeholderTextColor='grey'
  
/>

          </View> */}
          <View style={{flexDirection:'row',alignItems:'center',padding:1}}>
          <Image source={lock} style={{width:'6%',height:21}}/>
            <TextInput
                style={ {      
                  borderBottomWidth:0.5,
                  width:'92%',
                  marginTop:'2%',
                  marginLeft:'3%',
                  color: updatePassword ? '#00338D' : 'grey',
                  borderColor: !error?'grey':'red'
                 
                }}
                value={updatePassword}
                onChangeText={(text)=>setUpdatePassword(text)}

                

  placeholder='password'
  placeholderTextColor='grey'
  
/>

          </View>
          <Text style={{marginTop:'10%',marginLeft:'10%',color:'#474746',fontSize:15}}>Gender</Text>
          <View style={{flexDirection:'row',justifyContent:'space-around',marginTop:'5%'}}>
            <View style={{flexDirection:'row',alignItems:'center'}}>
              <RadioButton
                    value="Male"
                    status={updateGender === 'Male' ? 'checked' : 'unchecked'}
                    onPress={() => setUpdateGender('Male')}
              />
              <Text style={{color:'#00338D'}}>Male</Text>
            </View>
            <View style={{flexDirection:'row',alignItems:'center'}}>
              <RadioButton
                    value="Female"
                    status={updateGender === 'Female' ? 'checked' : 'unchecked'}
                    onPress={() => setUpdateGender('Female')}
              />
              <Text style={{color:'#00338D'}}>Female</Text>
            </View>
            <View style={{flexDirection:'row',alignItems:'center'}}>
              <RadioButton
                    value="Prefer not to say"
                    status={updateGender === 'Prefer not to say' ? 'checked' : 'unchecked'}
                    onPress={() => setUpdateGender('Prefer not to say')}
              />
              <Text style={{color:'#00338D'}}>Prefer not{'\n'} to say</Text>
            </View>
          </View>
          <TouchableOpacity style={{backgroundColor:'#00338D',marginTop:'18%',padding:'2%'}}
            onPress={handleSave}
          >
              <Text style={{color:'white',textAlign:'center',fontWeight:'800',fontSize:16}}>SAVE</Text>
          </TouchableOpacity>
      </View>
    </View>
    </ScrollView>
    <Spinner
          visible={isLoading}
          textContent={'Updating...'}
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

export default UserProfile

const styles = StyleSheet.create({
    container:{
        marginTop:'7%'
    },
    profile:{
        width:'19%',
        height:78,
    },
  
    row:{
      padding:'7%',
      marginTop:'5%'
    },
    txtInpt:{
      borderBottomWidth:0.5,
      width:'92%',
      marginTop:'2%',
      marginLeft:'3%'
    },

})