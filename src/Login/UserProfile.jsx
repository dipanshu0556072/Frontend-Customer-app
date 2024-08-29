import { Modal,StyleSheet, Text, View,Image,TouchableOpacity,TextInput, ScrollView, Alert,TouchableWithoutFeedback} from 'react-native'

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
import kpmg from '../PlpScreen/images/kpmg.png';
import CalendarImage from '../PlpScreen/images/calendar.png';
import edit from '../PlpScreen/images/draw.png';
import DateTimePicker from '@react-native-community/datetimepicker';




const UserProfile = ({navigation}) => {
  

  const [editMobilePen,setEditMobilePen]=useState(false);
  const [editAlternativeMobilePen,setEditAlternativeMobilePen]=useState(false);

  useEffect(()=>{
    if(!mobileNumber){
     setEditMobilePen(true);
    }
    if(!editAlternativeMobilePen){
     setEditAlternativeMobilePen(true)
    }
  },[editMobilePen,editAlternativeMobilePen]);
  const {mobileNumber, 
    emailId,gender,userName,setUserName,
    loginUserId} = useLoginContext();[
   ]

    const {ip,token,popFromStack,pushToStack,
      currentPage, setCurrentPage,
      currentPageIndex,setCurrentPageIndex,
      currentPageIndexCategory,setCurrentPageIndexCategory,
      updateUserName,setUpdateUserName,
updateMobileName,setUpdateMobileName,
AlternativeMobileNumber,setAlternativeMobileNumber,
DOB,setDOB,
updateEmail,setUpdateEmail,updateGender,setUpdateGender,
updatePassword,setUpdatePassword,
profileData,setProfileData,DateOfAnniversary,setDateOfAnniversary}=useLoginContext();        
 

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
  const [password,setPassword]=useState("");    
  const [selected, setSelected] = useState('');

 
        useEffect(() => {
      
          fetchData(); // Call the function when the component mounts
        }, []); // Empty dependency array ensures it only runs once on mount
      
        
        const fetchData = async () => {
          const header = {
            'Authorization': `Bearer ${token}`,
          };
    
          try {
            const response = await axios.get(`http://${ip}:5454/api/users/profile`, { headers: header });
    
            setProfileData(response.data);
             console.log(JSON.stringify(profileData));
             console.log(JSON.stringify(response.data));
            // Set the state with the fetched profile data
            setUpdateUserName(response.data.firstName + (response.data.lastName ? ` ${response.data.lastName}` : ''));
            setUpdateMobileName(response.data.mobile);
            setUpdateEmail(response.data.email);
            setUpdateGender(response.data.gender);
            setPassword(response.data.password);
            setAlternativeMobileNumber(response.data.alternativeMobileNumber);
            setDOB(response.data.dateOfBirth);
            setUserName(response.data.firstName);

            // setUpdatePassword(profileData.password);
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
const [emailError,setEmailError]=useState(false);


const [error,setError]=useState(false);

const isEmailValid = (email) => {





  // Regular expression for a basic email pattern
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Test the email against the pattern
  return emailPattern.test(email);
};
const [updateData1,setUpdateData1]=useState(true);
const [updateData2,setUpdateData2]=useState(true);
const [updateData3,setUpdateData3]=useState(false);


const nameArray = updateUserName.split(" ");
const handleSave=async ()=>{

  const isValid = isEmailValid(updateEmail);
 
  if (!isValid) {
   setEmailError(true);
   setUpdateData2(false)
   return; // Stop further execution if email is not valid
  }
  if(updateUserName.length<=0||updateMobileName.length<=0||
      updateEmail.length<=0||updateGender.length<=0||updateMobileName.length<10){
        if(updateMobileName.length<=0){
          setError(true);
        }
        if(updateUserName.length<=0){
         setUpdateData3(false);
      }
     
   }else{
     
    const dataAdd={
       firstName: nameArray[0],
      lastName:nameArray[1]||"",
      gender:updateGender,
      mobile:updateMobileName,
      email:updateEmail,
      alternativeMobileNumber:AlternativeMobileNumber,
      dateOfBirth:DOB
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

useEffect(()=>{
  if(!updateEmail){
    setUpdateData2(false);
  }
  if(!updateMobileName){
   setUpdateData1(false);
   setError(true);
  }
  else if(!updateMobileName && updateMobileName.length>=10){
   setUpdateData1(true);
   setError(false);
  }
if(updateMobileName && updateUserName.length>0){
   setUpdateData3(false);
  }
},[updateData1,updateData2,updateEmail,updateMobileName,updateUserName,AlternativeMobileNumber])


// function getOtp(){
//   if(updateMobileName && updateMobileName?.length>=9){
     
//    }else{
//     setError(true);
//    } 
//  }

const changeImage=()=>{
   const options={
    quality:0.7,allowsEditing:true,mediaType:'photo',noData:true,
    storageOptions:{
      skipBackup:true,waitUntilSaved:true,path:'images',cameraRoll:true
    }
   }
}

const [calendarVisible, setCalendarVisible] = useState(false);

const handleDateChange = (date) => {
  // Format the date as desired (e.g., 'DD/MM/YYYY')
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  // Ensure proper formatting with leading zeros if needed
  const formattedDate = `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${year}`;

  setDOB(formattedDate);
  setCalendarVisible(false);
};



//open calendar
const[selectedDate, setSelectedDate]=useState(new Date(Date.now() + 24 * 60 * 60 * 1000));
const [showPicker, setShowPicker] = useState(false);

const showDatePicker = () => {
  setShowPicker(true);
};

const onChange = (event, newDate) => {
  const currentDate = newDate || selectedDate;
  setShowPicker(false); // Close the picker after selecting a date
  console.log(JSON.stringify("currentDate"+currentDate))
 
  setSelectedDate(currentDate);

  setSubscriptionEndDate(getPreviousTwoDaysSameDate(getNextMonthSameDate(currentDate)))
  // Alert.alert(JSON.stringify(currentDate));
};

 return (
  <>
 <View style={{flex:1,backgroundColor:'white'}}> 
  <ScrollView>
    {/* <Text>{JSON.stringify(profileData)}</Text> */}
    <View style={styles.container}>
     {/* <Text>{JSON.stringify(profileData)}</Text> */}
      <View style={{flexDirection:'row',alignItems:'center'}}>
        <View>
        {/* <Calendar
      onDayPress={day => {
        setSelected(day.dateString);
      }}
      markedDates={{
        [selected]: {selected: true, disableTouchEvent: true, selectedDotColor: 'orange'}
      }}
    /> */}
        <TouchableOpacity onPress={() => forNavigate('mainHome')}>
            <Image source={kpmg} style={{ width: 160, height: 90, marginTop:'-20%'}} />
          </TouchableOpacity>

        <TouchableOpacity  onPress={()=>{forNavigate('mainHome')}}>
             <Image source={arrow}  
                   style={{marginLeft:12}}/>
          </TouchableOpacity>
        </View>
      </View>


      <View style={{marginTop:'2%'}}>
        <Text style={{textAlign:'center',fontSize:25,fontWeight:'500',color:'#00338D'}}>Edit Your Profile</Text>
      </View>
      <View style={{ height: 0.6, backgroundColor: '#00338D',marginTop:'2%' }} />
      <View style={{ height: 6, backgroundColor: '#ebebeb',}} />

      <TouchableOpacity style={{flexDirection:'row',justifyContent:'center',marginTop:'4%'}}>
        <Image source={
          gender==="Male"?profile1:
          gender==="Female"?profile1:profile1
        } style={styles.profile}/>
      </TouchableOpacity>
      
      <View style={styles.row}>
          <View style={{flexDirection:'row',alignItems:'center',padding:10}}>
            <Image source={user} style={{width:'5%',height:18}}/>
            <TextInput 
                placeholder='Full Name'
                style={ {      
                  borderBottomWidth:0.5,
                  width:'92%',
                  marginTop:'2%',
                  marginLeft:'3%',
                  color: updateUserName ? '#00338D' : 'grey', 
                  borderColor:updateData3?'red':'grey'
                }}
                value={updateUserName=='null'?"":updateUserName}  
                placeholderTextColor='grey'
                onChangeText={(text)=>setUpdateUserName(text)}
                />

          </View>
          {/* <Text>{updateUserName}</Text> */}
          
          <View style={{flexDirection:'row',alignItems:'center',padding:10}}>
            <Image source={mobile} style={{width:'5%',height:22}}/>
            <TextInput
                style={ {      
                  borderBottomWidth:0.5,
                  width:'92%',
                  marginTop:'2%',
                  marginLeft:'3%',
                  color: updateMobileName ? '#00338D' : 'grey',
                  borderColor:'grey'
                }}

                placeholder='Mobile Number'
                placeholderTextColor='grey'
                keyboardType='numeric'
                maxLength={10}
                value={updateMobileName}
                onChangeText={(text)=>setUpdateMobileName(text)}
                editable={editMobilePen}
                />
               {/* {
                updateData1 && 
                <Image source={correct} style={{width:18,height:18,marginLeft:'-6%'}}/>
               }  */}
                {
                  profileData.mobile && updateMobileName===profileData.mobile?
                  <>
                  <TouchableOpacity style={{marginLeft:'-5%',}} onPress={()=>{setEditMobilePen(!editMobilePen)}}>
                    <Image source={edit} style={{width:15,height:15,padding:'2.5%',marginBottom:'1%'}}/>
                  </TouchableOpacity>
                    <Image source={correct} style={{width:17,height:17,marginLeft:'-14%',padding:'3%',marginBottom:'1%'}}/>
                  </>
                :
                  <TouchableOpacity style={{marginLeft:'-6%'}}
                    onPress={() => { navigation.navigate('Login2', { mob:mobile }) }}
                    >
                    <Text style={{color:'#00338D',textDecorationLine:'underline'}}>Verify</Text>
                  </TouchableOpacity>
                }
                {
                  !profileData.mobile && 
                  <TouchableOpacity style={{marginLeft:'38%'}}
                    onPress={() => { navigation.navigate('Login2', { mob:mobile }) }}
                  >
                    <Text style={{color:'#00338D',textDecorationLine:'underline',marginLeft:'-6%'}}>Verify</Text>
                  </TouchableOpacity>
                }

          </View>
          

          <View style={{flexDirection:'row',alignItems:'center',padding:10,}}>
            <Image source={email} style={{width:'6%',height:21}}/>
            <TextInput 
                style={ {      
                  borderBottomWidth:0.5,
                  width:'92%',
                  marginTop:'2%',
                  marginLeft:'3%',
                  color: updateEmail ? '#00338D' : 'grey' ,
                  borderColor: emailError ? 'red' : 'grey',
                  backgroundColor:'#f5f5f5'
                }}
                editable={false}
                placeholder='Email Id'
                placeholderTextColor='grey'
                value={updateEmail}
                onChangeText={(text)=>setUpdateEmail(text)}
                />
            {
              profileData.email && 
              <Image source={correct} style={{width:18,height:18,marginLeft:'-15%',padding:'3%'}}/>
            }
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
          {/* <Image source={lock} style={{width:'6%',height:21}}/>
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
  
/> */}

          </View>
          <View style={{flexDirection:'row',alignItems:'center',padding:10}}>
            <Image source={mobile} style={{width:'5%',height:22}}/>
            <TextInput
                style={ {      
                  borderBottomWidth:0.5,
                  width:'92%',
                  marginTop:'2%',
                  marginLeft:'3%',
                  color: AlternativeMobileNumber ? '#00338D' : 'grey',
                  borderColor:'grey'
                }}
                value={AlternativeMobileNumber}
                placeholder='Alternative Mobile Number'
                placeholderTextColor='grey'
                keyboardType='numeric'
                maxLength={10}
                onChangeText={(text)=>setAlternativeMobileNumber(text)}
                editable={editAlternativeMobilePen}
                />

                
                {
                  profileData.alternativeMobileNumber && AlternativeMobileNumber===profileData.alternativeMobileNumber?
                   <>
                    <TouchableOpacity style={{marginLeft:'-5%'}} onPress={()=>{setEditAlternativeMobilePen(!editAlternativeMobilePen)}}>
                     <Image source={edit} style={{width:15,height:15,padding:'2.5%',marginBottom:'1%'}}/>
                    </TouchableOpacity> 
                     <Image source={correct} style={{width:17,height:17,marginLeft:'-14%',padding:'3%',marginBottom:'1%'}}/>
                   </>
                   :
                  <TouchableOpacity style={{marginLeft:'-6%'}}
                   onPress={() => { navigation.navigate('Login2', { mob: AlternativeMobileNumber }) }}
      
                    >
                    <Text style={{color:'#00338D',textDecorationLine:'underline'}}>Verify</Text>
                  </TouchableOpacity>
                }
                {
                  !profileData.alternativeMobileNumber && 
                  <TouchableOpacity style={{marginLeft:'38%'}}
                     onPress={() => { navigation.navigate('Login2', { mob: AlternativeMobileNumber }) }}
                    >
                    <Text style={{color:'#00338D',textDecorationLine:'underline',marginLeft:'-6%'}}>Verify</Text>
                  </TouchableOpacity>
                }
          </View> 
  
          <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
      <TouchableOpacity onPress={() => setCalendarVisible(true)}>
        <Image source={CalendarImage} style={{ width: 24, height: 24 }} />
      </TouchableOpacity>

      <TextInput
        style={{
          borderBottomWidth: 0.5,
          width: '92%',
          marginTop: '2%',
          marginLeft: '3%',
          color: DOB ? '#00338D' : 'grey',
          borderColor: 'grey',
        }}
        placeholder="DD/MM/Year"
        placeholderTextColor="grey"
        keyboardType="numeric"
        maxLength={10}
        value={DOB}
        editable={false} // Disable direct editing of the date
      />

      <Modal
        visible={calendarVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setCalendarVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setCalendarVisible(false)}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <TouchableOpacity style={{ flex: 1 }} onPress={() => setCalendarVisible(false)} />
          <View style={{ backgroundColor: 'white', width: '95%', borderRadius: 10}}>
          <CalendarPicker
              onDateChange={handleDateChange}
              textStyle={{ color: '#00338D' }} // Customize text color
              selectedDayStyle={{ backgroundColor: '#00338D' }} // Customize selected day background color
            />
          </View>
          <TouchableOpacity style={{ flex: 1 }} onPress={() => setCalendarVisible(false)} />
        </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>

          


<View>
<View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
      <TouchableOpacity onPress={showDatePicker}>
        <Image source={CalendarImage} style={{ width: 24, height: 24 }} />
      </TouchableOpacity>
      <TextInput
        style={{
          borderBottomWidth: 0.5,
          width: '92%',
          marginTop: '2%',
          marginLeft: '3%',
          color: selectedDate ? '#00338D' : 'grey',
          borderColor: 'grey',
        }}
        placeholder="DD/MM/Year"
        placeholderTextColor="grey"
        keyboardType="numeric"
        maxLength={10}
        value={selectedDate}
        editable={false} // Disable direct editing of the date
      />
    
    {showPicker && (
      <DateTimePicker
        testID="dateTimePicker"
        value={selectedDate}
        mode="date"
        is24Hour={true}
        display="default"
        onChange={onChange}
        style={styles.dateTimePicker}
      />
    )}
  </View>
 </View> 

          <Text style={{marginTop:'3%',marginLeft:'10%',color:'#474746',fontSize:15}}>Gender</Text>
          <View style={{flexDirection:'row',justifyContent:'space-around',marginTop:'2%'}}>
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
              <Text style={{color:'#00338D'}}> Prefer not{'\n'} to say</Text>
            </View>
          </View>
          <TouchableOpacity style={{backgroundColor:'#00338D',marginTop:'8%',padding:'2%'}}
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
        width:'15.5%',
        height:63,
    },
    row:{
      padding:'7%',
    },
    txtInpt:{
      borderBottomWidth:0.5,
      width:'92%',
      marginTop:'2%',
      marginLeft:'3%'
    },

})