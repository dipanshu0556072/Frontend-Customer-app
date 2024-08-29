import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Image, Alert,TouchableOpacity } from 'react-native';
import checked from '../Login/images/checked.png';
import { useCartContext } from '../Context/WomenContext';
import axios from 'axios';
import { useLoginContext } from '../Login/LoginCartProvider';
import { useGroceryContext } from './GroceryContext';


const  SubscriptionUpdate = ({ navigation}) => {

  const {ip,token,popFromStack,pushToStack,
    currentPage, setCurrentPage,loginUserId,
    currentPageIndex,setCurrentPageIndex,
    currentPageIndexCategory,setCurrentPageIndexCategory,
    currentPageIndexCategory1,setCurrentPageIndexCategory1}=useLoginContext();  

    const{setGrocerySubscribedDate,grocerySubscribedTime,setGrocerySubscribedTime,
        grocerySubscribedDate1,setGrocerySubscribedDate1,getLastSubscribedId,setGetLastSubscribedId,LeaveMessage,setLeaveMessage,
        subscribedSelectedDates,setSubscribedSelectedDates,groceryAllProduct,selectedTime,setSelectedTime,isRequestedForSubscriptionExtend,isRequestedForSubscriptionExtendId,setIsRequestedForSubscriptionExtend}=useGroceryContext();
  
  const {subscribedSelectedDays,setSubscribedSelectedDays,subscriptionEndDate, setSubscriptionEndDate,
         subscribedGroceryProductId,setWhichPageToNavigate,
         addressList,setAddressList,
         selectedDate, setSelectedDate,
         userName, setUserName,
         pinCode, setPinCode,
         streetAddress, setStreetAddress,
         mobileNumber, setMobileNumber,
         houseNumber, setHouseNumber,
         state, setState,
         city, setCity,
         selectedAddress,setSelectedAddress,
         subscriptionTimeSlot,setSubscriptionTimeSlot,
         selectedDatesAsString,setSelectedDatesAsString}=useGroceryContext();
        
   
      //  const updateSubscription = async () => {
      //   Alert.alert("ji");
      //   const header = {
      //       'Authorization': `Bearer ${token}`,
      //     };
      //     const time=subscriptionTimeSlot;
      //     let queryParams = subscribedSelectedDates;
      //     Alert.alert(JSON.stringify("update1->"+subscribedSelectedDates));
        
      //     try {        
      //         // const response =  await axios.post(`http://${ip}:5454/api/${isRequestedForSubscriptionExtendId}/schedule?${queryParams}&deliveryTime=${time}&deliveryComments=${LeaveMessage}&productId=${subscribedGroceryProductId}`, null, { headers: header })
      //         const response =  await axios.post(`http://${ip}:5454/api/${isRequestedForSubscriptionExtendId}/schedule?deliveryTime=${time}&deliveryComments=${LeaveMessage}&deliveryDays=${queryParams}&productId=${subscribedGroceryProductId}`, null, { headers: header })

      //       } catch (error) {
      //       console.log('Error createSubscription2:', error);
      //       // Handle the error as needed
      //     }
      // };

    const forNavigate=(page)=>{
      console.log(page+" "+currentPage[currentPage.length-1]);
      if(currentPage && currentPage[currentPage.length-1]!==page){
        if(page==='mainBag'){
          setCurrentPage(currentPage.splice(-3));
        }
        pushToStack(page);
      }else{
        
        popFromStack(navigation);
      }
    } 
    function formatDateToTime(date) {
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');
      return `${hours}:${minutes}:${seconds}`;
    }


    const convertDateFormat = (inputDate) => {
      // Split the input string by spaces to get the start time part
      const startTimePart = inputDate.split(" ")[0];
      
      // Extract hours and minutes from the start time part
      const [hours, minutes] = startTimePart.split(":");
      
      // Format the hours and minutes to ensure they are two digits
      const formattedHours = hours.padStart(2, '0');
      const formattedMinutes = minutes.padStart(2, '0');
      
      // Construct the final formatted time string
      const formattedTime = `${formattedHours}:${formattedMinutes}:00`;
      
      return formattedTime;
    };
     useEffect(()=>{
      const updateSubscription = async () => {
  
        const header = {
            'Authorization': `Bearer ${token}`,
          };
          const time=convertDateFormat(subscriptionTimeSlot);
          Alert.alert(JSON.stringify(time));
          let queryParams = subscribedSelectedDates;
          Alert.alert(JSON.stringify("update1->"+time));
          console.log(JSON.stringify(time));
        
          try {        
              // const response =  await axios.post(`http://${ip}:5454/api/${isRequestedForSubscriptionExtendId}/schedule?${queryParams}&deliveryTime=${time}&deliveryComments=${LeaveMessage}&productId=${subscribedGroceryProductId}`, null, { headers: header })
              const response =  await axios.post(`http://${ip}:5454/api/${isRequestedForSubscriptionExtendId}/schedule?deliveryTime=${time}&deliveryComments=${LeaveMessage}&deliveryDays=${queryParams}&productId=${subscribedGroceryProductId}`, null, { headers: header })

            } catch (error) {
            console.log('Error createSubscription2:', error);
            // Handle the error as needed
          }
      };

      updateSubscription();
      //  Alert.alert(JSON.stringify(subscriptionTimeSlot+" "+subscribedSelectedDates));
        setSubscribedSelectedDates([])
        setIsRequestedForSubscriptionExtend(false);
       setTimeout(()=>{
        setCurrentPage(['mainHome','subscribedItem']);
        navigation.navigate('subscribedItem');
       },3000);
    },[token]);
 
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={styles.container}>
      {/* <TouchableOpacity style={{backgroundColor:'white',width:'100%'}} onPress={()=>{forNavigate('mainHome')}}>
          <Image source={{ uri: 'https://shorturl.at/ckGU2' }} style={{height:100,width:100,marginLeft:'3%'}}/>
       </TouchableOpacity> */}
        <View style={{ justifyContent: 'center', width: '100%', flexDirection: 'row' }}>
          <Image source={checked} style={{ width: 100, height: 100, marginTop: '35%' }} />
        </View>
        <Text style={styles.text}>Subscribed Product {'\n'} Modified Successfully{'\n'}</Text>
        {/* <TouchableOpacity onPress={()=>{forNavigate('subscribedItem')}}>
            <Text style={{marginTop:'24%',color:'white',fontSize:17,alignSelf:'center',textDecorationLine:'underline'}}>View Subscribed Products</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

export default SubscriptionUpdate;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#00338D',
    width: '100%',
    height: '100%',
  },
  text: {
    color: 'white',
    fontWeight: '700',
    fontSize: 28,
    textAlign: 'center',
    marginTop: '10%',
    textShadowColor: 'rgba(0, 0, 0, 0.5)', // Shadow color
    textShadowOffset: { width: 3, height: 5 }, // Shadow offset
    textShadowRadius: 5, // Shadow radius
  },
});
