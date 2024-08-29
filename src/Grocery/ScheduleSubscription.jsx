import React, { useEffect,useState, } from 'react';
import {TextInput, Alert,StyleSheet, Text, View, TouchableOpacity, Image, Dimensions,FlatList,SafeAreaView, ScrollView,Modal,TouchableWithoutFeedback,Animated,} from 'react-native';
import {  Button, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useCartContext } from '../Context/WomenContext';
import { useLoginContext } from '../Login/LoginCartProvider';
import back from '../PlpScreen/images/back.png';
import WebView from 'react-native-webview';
import DropDownPicker from 'react-native-dropdown-picker';
import Spinner from 'react-native-loading-spinner-overlay';
import moment from 'moment';
import axios from 'axios';
import CalendarPicker from 'react-native-calendar-picker';
import dropDownArrow from '../PlpScreen/images/downarrow.png'; 
import { RadioButton } from 'react-native-paper';
import CheckBox from '@react-native-community/checkbox';
import { useGroceryContext } from './GroceryContext';
import calendar from '../PlpScreen/images/calendar12.png';
import { Calendar } from 'react-native-calendars';
import wallet from '../PlpScreen/images/wallet21.png';
import { json } from 'react-router-dom';
import {CalendarList, Agenda } from 'react-native-calendars';
import minus from '../PlpScreen/images/minus.png'
import plus from '../PlpScreen/images/plus2.png'
import kpmg from '../PlpScreen/images/kpmg3.png'
const ScheduleSubscription = ({navigation}) => {

  const{setGrocerySubscribedDate,grocerySubscribedTime,setGrocerySubscribedTime,
        grocerySubscribedDate1,setGrocerySubscribedDate1,getLastSubscribedId,setGetLastSubscribedId,LeaveMessage,setLeaveMessage,
        subscribedSelectedDates,setSubscribedSelectedDates,groceryAllProduct,selectedTime,setSelectedTime,isRequestedForSubscriptionExtend,isRequestedForSubscriptionExtendId,setIsRequestedForSubscriptionExtend,subsribedSelectedDatesCount,qtyValue,setQtyValue,storeSubscribedCustomDates,
        isResumeCustomSubscription}=useGroceryContext();
  
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
         selectedDatesAsString,setSelectedDatesAsString,count}=useGroceryContext();


 function convertTimeSlotToISOFormat(selectedSlot) {
    // Extracting hours and minutes from the selected time slot
    const [startHour, startMinute] = selectedSlot.split(':').map(item => parseInt(item));
    
    // Creating a new Date object with current date and the selected hours and minutes
    const selectedDate = new Date();
    selectedDate.setHours(startHour);
    selectedDate.setMinutes(startMinute);
    
    // Check if the date is valid
    if (isNaN(selectedDate.getTime())) {
        // Invalid date, return an appropriate value (e.g., null)
        return null;
    }
    
    // Adjusting timezone offset to UTC+0
    const utcDate = new Date(selectedDate.getTime() - (selectedDate.getTimezoneOffset() * 60000));

    // Formatting the date to ISO string
    const isoDateString = utcDate.toISOString();
    
    return isoDateString;
}

      
         //This is used for showing timeSlot in Dropdown
         const [open, setOpen] = useState(false);
         const [value, setValue] = useState("09:00 AM");
         const [valueError, setValueError] = useState(false);
       
         // Function to generate time slots from 9:00 AM to 10:00 PM in 12-hour format
         const generateTimeSlots = () => {
           const timeSlots = [];
           for (let hour = 9; hour <= 22; hour++) {
             let label, value;
             if (hour < 12) {
               label = `${hour === 9 ? '09' : hour}:00 AM - ${hour === 11 ? '12' : (hour + 1)}:00 AM`;
               value = `${hour < 10 ? '0' + hour : hour}:00 AM - ${(hour + 1) < 10 ? '0' + (hour + 1) : (hour + 1)}:00 AM`;
             } else if (hour === 12) {
               label = '12:00 PM - 01:00 PM';
               value = '12:00 PM - 01:00 PM';
             } else {
               label = `${hour === 12 ? '12' : hour - 12}:00 PM - ${(hour === 22) ? '10' : hour - 11}:00 PM`;
               value = `${hour === 12 ? '12' : hour - 12}:00 PM - ${(hour === 22) ? '10' : hour - 11}:00 PM`;
             }
             timeSlots.push({ label, value });
           }
           return timeSlots;
         };
  const [items, setItems] = useState(generateTimeSlots()); 
  
  
  const dateParts = value?value.split('/'):'';
  const formattedDate = new Date(`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`);
   

  // Get the year, month, and day from the Date object
  const year = formattedDate.getFullYear();
  const month = String(formattedDate.getMonth() + 1).padStart(2, '0');
  const day = String(formattedDate.getDate()).padStart(2, '0');

  // Form the final date string in the desired format
  const finalDate = `${year}-${month}-${day}`;
  setGrocerySubscribedDate(finalDate);
  const[dateError,setDateError]=useState();
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [isChecked1, setChecked1] = useState(false);
  const [isChecked2, setChecked2] = useState(false);
  const [isChecked3, setChecked3] = useState(false);
  const [isChecked4, setChecked4] = useState(false);
  const [isChecked5, setChecked5] = useState(false);
  const [isChecked6, setChecked6] = useState(false);
  const [isChecked7, setChecked7] = useState(false);
  const [isChecked, setChecked] = useState(false);

  const [date, setDate] = useState(value); 
  

  const {ip,token,popFromStack,pushToStack,
        currentPage, setCurrentPage,loginUserId,
        currentPageIndex,setCurrentPageIndex,
        currentPageIndexCategory,setCurrentPageIndexCategory,
        currentPageIndexCategory1,setCurrentPageIndexCategory1}=useLoginContext();  

  const { search, setSearch,dataStore,selectedStoreId,setSelectedStoreId,
            selectedStoreAvailableSlots,setSelectedStoreAvailableSlots,
            selectedStorePickupDay,setSelectedStorePickupDay,
            selectedStorePickupTime,setSelectedStorePickupTime,filteredData, 
            setFilteredData,scheduleSubscriptionOption,setScheduleSubscriptionOption,
            walletBalance,setWalletBalance,} = useCartContext();

        const [isLoading, setIsLoading] = useState(false); 
        const [weeklyModalVisible, setWeeklytModalVisible] = useState(false);
        const [monthlyModalVisible, setMonthlytModalVisible] = useState(false);
        const [addressModalVisible, setAddressModalVisible] = useState(false);
        const [addressListModalVisible, setAddressListModalVisible] = useState(false);
        const [termsAndConditions, setTermsAndConditions] = useState(false);
        const forNavigate=(page)=>{
            console.log(page+" "+currentPage[currentPage.length-1]);
            if(currentPage && currentPage[currentPage.length-1]!==page){
              if(page==='mainBag'){
                setCurrentPage(currentPage.splice(-3));
              }
              pushToStack(page);
              setIsLoading(true);
            
                navigation.navigate(page);
              
            }else{
              popFromStack(navigation);
            }
          }
        
    const handleDateChange = (date) => {
      console.log("Dipanshu"+date);
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
     
      // Ensure proper formatting with leading zeros if needed
      const formattedDate = `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${year}`;
    
      setValue(formattedDate);
      setCalendarVisible(false);
    };
    const targetCategory = currentPageIndexCategory;
    const targetId=currentPageIndex;
    const selectedImage = groceryAllProduct.filter(
      (product) => product.category.name === 'dairyProducts' && product.id==1
  );
  

    const addOneMonth = (dateString) => {
      const date = new Date(dateString);
      // Add one month to the date
      date.setMonth(date.getMonth() + 1);
      // Return the new date in ISO string format
      return date.toISOString();
    };
    const generateSubscribedDates = () => {

        getSelectedDates();
      if(scheduleSubscriptionOption!=='1'){
        handleStoreDates();
      }

      console.log(JSON.stringify(selectedDate));
      const startDateObj = new Date(selectedDate);
      const endDateObj = new Date(subscriptionEndDate?subscriptionEndDate:addOneMonth(selectedDate));
      // Alert.alert(JSON.stringify(startDateObj));
      const datesArray = [];
      
      // Loop through the dates
      let i=1;
      for (let currentDate = startDateObj; currentDate <= endDateObj; currentDate.setDate(currentDate.getDate() + 1)) {
        // Format the date to YYYY-MM-DD
        const formattedDate = currentDate.toISOString().split('T')[0];
        // if(datesArray.length<22){
        //   datesArray.push(formattedDate);
        // }
        if(i<=30){
          datesArray.push(formattedDate);
        }
        i++;
      }
     // Alert.alert(JSON.stringify(datesArray));

        if(scheduleSubscriptionOption==='0'){
          setSubscribedSelectedDates(datesArray);
        }

    };

    const handleYesPress = () => {
      setWhichPageToNavigate('addMoney'); // Set the page to navigate to
      forNavigate('addMoney'); // Navigate to the appropriate screen
    };
    const addMonthToDate = (dateString) => {
      const date = new Date(dateString);
      date.setUTCMonth(date.getUTCMonth() + 1);
      return date.toISOString();
    };

    function SchedulePickup(){
     // Alert.alert(JSON.stringify(isDaySelected?'Y':'N'));
      // if(!isDaySelected && scheduleSubscriptionOption==='1'||selectedNumbers.length<=0 && scheduleSubscriptionOption==='2'){
      //   if(!isDaySelected && scheduleSubscriptionOption==='1'){
      //     Alert.alert("Please Select Days!");
      //   }else if(selectedNumbers.length<=0 && scheduleSubscriptionOption==='2'){
      //     Alert.alert("Please Select Dates!");
      //   }
      // }else{
    {
      setDisableBtn(true);
      if(scheduleSubscriptionOption==='4'){
        setSubscribedSelectedDates(generateTargetDates(formatDate(selectedDate),formatDate(subscriptionEndDate),targetDate[targetDate.length-1]));
      }
        if (getSubscribedData.length > 0) {
          const lastId = getSubscribedData[getSubscribedData.length - 1].id;
          setGetLastSubscribedId(lastId);
      }
        if(scheduleSubscriptionOption!=='2' && scheduleSubscriptionOption!=='4'&& !isRequestedForSubscriptionExtend){
          generateSubscribedDates();
        }
  console.log(JSON.stringify(subscribedSelectedDates));
        if (addressList && addressList.length > 0 && selectedAddress <= -1 && !isRequestedForSubscriptionExtend) {
          setAddressListModalVisible();
        } else if (addressList && addressList.length <= 0 && !isRequestedForSubscriptionExtend) {
          setAddressModalVisible();
        } else {
          let productPrice = 0;
          let totalDays = subscribedSelectedDates.length;
    
          groceryAllProduct.map(item => {
            if (item.id === subscribedGroceryProductId) {
              productPrice = item.discountedPrice;
            }
          })
          let totalAmount = (parseInt(productPrice)) * (parseInt(qtyValue)) * totalDays;

          console.log("Wallet Balance: " + walletBalance + "\nTotal Price: " + productPrice * totalDays);
         
          if (totalAmount <= walletBalance) {
            const nextMonthDate = addMonthToDate(selectedDate);
            // if(scheduleSubscriptionOption==='4'){
            //   setSubscriptionEndDate(nextMonthDate);
            // }
            Alert.alert(
              
              "Confirmation",
              isRequestedForSubscriptionExtend || isResumeCustomSubscription
              ? "Do you want to proceed with the update of the subscription?"
              : `Would you like to proceed with the subscription, wherein ₹${totalAmount} will be frozen in your wallet?`,
              [
                {
                  text: "Yes",
                  
                  onPress: async () => {
                     setIsLoading(true);
                    if(isResumeCustomSubscription){
                      createSubscription2();
                      navigation.navigate('subscribedItem');
                    } 
                    else if(isRequestedForSubscriptionExtend){
                        // Alert.alert(JSON.stringify(isRequestedForSubscriptionExtend) +" "+subscribedGroceryProductId);
                        
                        setSubscriptionTimeSlot(formatDateToTime(timeSlotStart));
                        setSelectedDatesAsString('deliveryDaysAsString='+subscribedSelectedDates);
                        // setTimeout(()=>{
                        //   createSubscription2();
                        // },3000);
                       
                         setTimeout(() => {
                          setIsLoading(false);
                          popFromStack(navigation);
                          // setSubscribedSelectedDays([]);
                          // setSubscribedSelectedDates([]);
                          // forNavigate('subscriptionUpdated');
                          navigation.navigate('subscriptionUpdated')
                        }, 4000);
                         //navigation.navigate('subscribedItem');
                    }else{
                      addToCart();
                      setTimeout(() => {
                        setIsLoading(false);
                        forNavigate('subscribedProductSuccess');
                      }, 4000);
                    }

                  },
                  style: "default"
                },
                {
                  text: "No",
                  onPress: () => console.log("Subscription cancelled"), // You can replace this with your action
                  style: "cancel"
                }
              ]
  
            );
          }
          
          else{
          Alert.alert(
            "Insufficient Wallet Balance",
            "Your wallet balance is insufficient. Would you like to add funds?",
            [
              {
                text: "Yes",
                onPress: handleYesPress // Call handleYesPress when Yes is clicked
              },
              {
                text: "No",
                style: "cancel"
              }
            ]
          );
          }
        }
        
  
      }
  
    }
  


    const getSelectedDates = () => {

      const start = new Date(selectedDate);
      const end = new Date ((subscriptionEndDate));
      const selectedDates = [];
 
    
     let i=0;
      while (start <= end) {
        if (subscribedSelectedDays.includes(start.getUTCDay())) {
          const formattedDate = start.toISOString().split('T')[0];
          selectedDates.push(formattedDate);
          i++;
        }
        start.setDate(start.getDate() + 1);
      }
      // if(subscribedSelectedDates){
      //   setSubscribedSelectedDates([]);
      // }

      setSubscribedSelectedDates(selectedDates);
    };
    

     const[getSubscribedData,setGetLastSubscribedData]=useState([]);
     const getLastSubscribedProductId = async () => {
      const header = {
        'Authorization': `Bearer ${token}`,
      };
      try {
        const response = await axios.get(`http://${ip}:5454/api/subscriptions/${loginUserId}`, { headers: header });
        setGetLastSubscribedData(response.data);
        if(response.data && response.data.wallet && response.data.wallet.balance){
           setWalletBalance(response.data.wallet.balance);
        }
      } catch (error) {
        console.log('Error fetching profile:', error);
        // Handle the error as needed
      }
    };


 
    function addOneMonth12(date) {
      // Alert.alert(JSON.stringify("EndDate"+date));
      const newDate = new Date(date);
      newDate.setMonth(newDate.getMonth() + 1);
      return newDate;
    }
    // for this format Wed May 16 2024 18:04:03 GMT+0530
    const getNextDay = (date) => {
      const nextDay = new Date(date);
      nextDay.setDate(nextDay.getDate() + 1);
      return nextDay;
    };

     const currentDate = getNextDay(new Date()); 
     console.log("hi"+currentDate);

     const handleTermsAndConditions=()=>{

     }
     const handleWeekPress = () => {
      setWeeklytModalVisible(true);
    };
    const [isDaySelected,setIsDaySelected]=useState(false);
    const closeWeekly=()=>{
      // Additional logic to handle sorting or other actions
      if(!isDaySelected){
        Alert.alert("Please Select Days!");
      }else{
        handleWeeklyModalClose();
      }
    }
    const handleWeeklyModalClose = () => {
      // Additional logic to handle sorting or other actions
      
      setTimeout(() => {
        setWeeklytModalVisible(false);
      }, 100);
    };
    const handleMonthlyPress = () => {
      setMonthlytModalVisible(true);
    };
    const handleMonthlyModalClose = () => {
      // Additional logic to handle sorting or other actions
      setTimeout(() => {
        setMonthlytModalVisible(false);
      }, 100);
    };
    const handleAddressPress = () => {
      setAddressModalVisible(true);
    };
    const handleAddressModalClose = () => {
      // Additional logic to handle sorting or other actions
      setTimeout(() => {
        setAddressModalVisible(false);
      }, 100);
    };
    const handleAddressListModalClose = () => {
      // Additional logic to handle sorting or other actions
      setTimeout(() => {
        setAddressListModalVisible(false);
      }, 100);
    };

    const formatDate2 = (dateString) => {
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
      // Create a Date object
      const date = new Date(dateString);
    
      // Get the day, month, and year
      const dayOfWeek = days[date.getUTCDay()];
      const monthName = months[date.getUTCMonth()];
      const formattedDay = date.getUTCDate();
      const formattedYear = date.getUTCFullYear();
    
      // Construct the formatted date string
      return `${dayOfWeek}, ${formattedDay} ${monthName}, ${formattedYear}`;
    };
    
  console.log(JSON.stringify(subscribedSelectedDates));
    const formattedDate21 = formatDate2(value);

   // Format the selected date to display month name with year
   const formattedDate5 = moment(selectedDate).format("MMMM YYYY");   
    // Generate numbers from 1 to 31
      // Calculate the maximum number of days in the current month


    const handleStoreDates = () => {
      // setSubscribedSelectedDates(Object.keys(selectedDatesState));

      const selectedDates = Object.keys(selectedDatesState);

// Sort the keys by converting them to Date objects
  selectedDates.sort((a,b)=>new Date(a)-new Date(b)); 
      
      if(scheduleSubscriptionOption==='3'||scheduleSubscriptionOption==='4'){
  
        setSelectedDate(convertDateFormat2(selectedDates[0]));
        // Alert.alert(JSON.stringify(selectedDates));
        // Alert.alert(JSON.stringify(selectedDate));
        if(scheduleSubscriptionOption!=='4'){
         setSubscriptionEndDate(convertDateFormat2(selectedDates[selectedDates.length-1]));
        }
        // setSubscriptionEndDate(convertDateFormat2()) 
      }


      // const limitedDates = selectedDates.slice(0, 7); // Slice the array to contain only the first 7 dates
      setSubscribedSelectedDates(selectedDates);
    };
    

//for monthly Subscription store all date lies b/w start and end date
const generateTargetDates = (startDate, endDate, targetDate) => {
  let currentMonth = moment(startDate, 'DD/MM/YYYY').startOf('month');
  const end = moment(endDate, 'DD/MM/YYYY').endOf('month');
  const targetDay = moment(targetDate, 'YYYY-MM-DD').date();
  const dates = [];

  while (currentMonth <= end) {
    const date = moment(currentMonth).date(targetDay);
    dates.push(date.format('YYYY-MM-DD'));
    currentMonth.add(1, 'month');
  }
  return dates;
};

     function monthlyDates(){
      if(selectedNumbers.length<=0){
        Alert.alert("Please select days!");
      }else{
        // const subscriptionStartDate = moment(new Date());
        // console.log(JSON.stringify(subscriptionStartDate));
        // const selectedDays = selectedNumbers;
        // const currentMonth = subscriptionStartDate.month();
        // const currentYear = subscriptionStartDate.year();
        // const deliveryDates = selectedDays.map(day => {
        //   let date = moment().set({ year: currentYear, month: currentMonth, date: day });
        //   // If the selected day doesn't exist in the current month, set it to the first day of the next month
        //   if (!date.isValid()) {
        //     const nextMonth = (currentMonth + 1) % 12; // Next month index
        //     const nextYear = nextMonth === 0 ? currentYear + 1 : currentYear; // Handle year change
        //     date = moment().set({ year: nextYear, month: nextMonth, date: 1 });
        //   }
        //   return date.format('YYYY-MM-DD');
        // });
        // if(subscribedSelectedDates && subscribedSelectedDates.length>0){
        //  setSubscribedSelectedDates([]);
        // }

        setSubscribedSelectedDates(selectedNumbers);
      
        handleMonthlyModalClose();
      }

     }

    

    console.log("herP->"+JSON.stringify(subscribedSelectedDays));



  // Function to handle CheckBox toggle
  const handleCheckBoxToggle = (index) => {
    const newArray = [...subscribedSelectedDays]; // Create a copy of the array

    // Check if the element at the specified index is already in the array
    const isChecked = newArray.includes(index);

    // If it is, remove it; if not, add it
    if (isChecked) {
      newArray.splice(newArray.indexOf(index), 1);
    } else {
      newArray.push(index);
    }

    // Update the state with the modified array
    setSubscribedSelectedDays(newArray);
  };

  //convert format from 2024-05-16 to 2024-06-16T11:29:00.000Z
  function convertDateFormat2(dateString) {
    // Parse the date string
    const date = new Date(dateString);

    // Get the parts of the date
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed, so add 1
    const day = String(date.getDate()).padStart(2, '0');

    // Assemble the formatted date string
    const formattedDate = `${year}-${month}-${day}T00:00:00.000Z`;

    return formattedDate;
}


const [showPicker, setShowPicker] = useState(false);
const [showEndPicker, setShowEndPicker] = useState(false);

const onChange = (event, newDate) => {
  const currentDate = newDate || selectedDate;
  setShowPicker(false); // Close the picker after selecting a date
  console.log(JSON.stringify("currentDate"+currentDate))
 
  setSelectedDate(currentDate);

  setSubscriptionEndDate(getPreviousTwoDaysSameDate(getNextMonthSameDate(currentDate)))
  // Alert.alert(JSON.stringify(currentDate));
};
const onChange1 = (event, newDate) => {
  if(scheduleSubscriptionOption==='4'){
  const currentDate = newDate || subscriptionEndDate;
  setShowEndPicker(false); // Close the picker after selecting a date

  if (subscriptionEndDate && subscriptionEndDate.length>0 && subscriptionEndDate <= currentDate) {
    // Selected date is not greater than or equal to the current date
    Alert.alert("Selected date cannot be less than or equal to the current date.");
  } else {
    setSubscriptionEndDate(currentDate);
  }

    setSortModalVisible(true);


 }
};
const formatDate = (receivedDate) => {
  // Ensure the received date is a Date object
  const date = new Date(receivedDate);
  
  // Check if the received date is valid
  if (isNaN(date.getTime())) {
    // Handle invalid date here, for example, return an empty string
    return '';
  }

  const day = date.getDate().toString().padStart(2, '0'); // Ensure two digits for day
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Ensure two digits for month
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const generateTimeSlotString = (startTime) => {
  const endTime = new Date(startTime.getTime() + 60 * 60000); // Adding 60 minutes to start time
  const formattedStartTime = formatTimeSlot(startTime);
  const formattedEndTime = formatTimeSlot(endTime);
  return `${formattedStartTime} - ${formattedEndTime}`;
};

const showDatePicker = () => {
  setShowPicker(true);
};
const showEndDatePicker=()=>{
  setShowEndPicker(true);
}
const [timeSlotStart, setTimeSlotStart] = useState(new Date());
const [isPickerVisible, setIsPickerVisible] = useState(false);

const handleTimeChange = (event, selectedTime) => {
  setIsPickerVisible(Platform.OS === 'ios');
  if (selectedTime) {
    // Get the current time
    const currentTime = new Date();

    // Compare the selected time with the current time
    if (selectedTime >= currentTime) {
      console.log("THis is selected Time->"+JSON.stringify(currentTime));
      setTimeSlotStart(selectedTime);
    } else {
      // If the selected time is earlier than the current time, handle it accordingly
      // For example, you can display an alert or log a message
      console.log("Selected time is earlier than the current time.");
    }
  }
};


const formatTimeSlot = (time) => {
  return time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

//console.log(JSON.stringify(selectedDate));
const productCategoryName=groceryAllProduct.map((item,index)=>{
  if(item.category && item.category.parentCategory.name){
     return item.category.parentCategory.name;
     console.log(JSON.stringify(item.category.parentCategory.name));
  }
});

const addToCart = async () => {
  const data={
    productId: subscribedGroceryProductId,
    quantity: qtyValue, 
    category: productCategoryName.toString(),
  }
  const header = {
    'Authorization': `Bearer ${token}`,
  };

  try {
    const response = await axios.put(`http://${ip}:5454/api/cart/add`, data,{ headers: header });
    console.log(JSON.stringify(response.data));
    createSubscription1();
  } catch (error) {
    console.log('Error in addToCart in SchedulescubScription.jsx:', error);
    // Handle the error as needed
  }
};
const createOrder = async () => {
  let userName, lastName,streetAddress, city, state, pinCode, mobile = '';


  addressList.map((item,index)=>{
     if(index===selectedAddress){
      userName=item.firstName;
      lastName=item.lastName;
      streetAddress=item.streetAddress;
      city=item.city;
      state=item.state,
      pinCode=item.zipCode,
      mobile=item.mobile
     }
  });
  const data={
    firstName: userName.toString(),
    lastName: lastName.toString(),
    streetAddress: streetAddress.toString(),
    city: city.toString(),
    state: state.toString(),
    zipCode: pinCode.toString(),
    mobile: mobile.toString()
  }
  const header = {
    'Authorization': `Bearer ${token}`,
  };

  try {
    const response = await axios.post(`http://${ip}:5454/api/orders/`, data,{ headers: header });
    console.log(JSON.stringify(response.data));
    
  } catch (error) {
    console.log('Error in addToCart in SchedulescubScription.jsx:', error);
    // Handle the error as needed
  }
};

const createSubscription1 = async () => {

  const data={
    user: {
        id: loginUserId
    },
    type:scheduleSubscriptionOption==='0'?
      'DAILY':scheduleSubscriptionOption==='1'?
      'WEEKLY':scheduleSubscriptionOption==='2'?
      'ALTERNATE':'CUSTOM',
    startDate:convertDateFormat(selectedDate).toString(),
    endDate:convertDateFormat(subscriptionEndDate).toString()
}
  const header = {
    'Authorization': `Bearer ${token}`,
  };
  try {
    const response = await axios.post(`http://${ip}:5454/api/subscriptions`,data, { headers: header });

    createSubscription2();
  } catch (error) {
    console.log('Error fetching profile:', error);
    // Handle the error as needed
  }
};
function formatDateToTime(date) {
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}

const createSubscription2 = async () => {
  const header = {
    'Authorization': `Bearer ${token}`,
  };
  const time=formatDateToTime(timeSlotStart);

  let queryParams = subscribedSelectedDates;
  // Alert.alert(JSON.stringify(subscribedSelectedDates));
  console.log(JSON.stringify("POPOPOPOP->"+queryParams));
  console.log(JSON.stringify("Delivery Days Length"+subscribedSelectedDates.length));
  try {
    if(isResumeCustomSubscription){
      const response = await axios.post(`http://${ip}:5454/api/${getLastSubscribedId}/schedule?deliveryTime=${time}&deliveryComments=${LeaveMessage}&deliveryDays=${queryParams}&productId=${subscribedGroceryProductId}`, null, { headers: header });
    }
    else if(isRequestedForSubscriptionExtend){
    
      // const response =  await axios.post(`http://${ip}:5454/api/${isRequestedForSubscriptionExtendId}/schedule?deliveryTime=${time}&deliveryComments=${LeaveMessage}&deliveryDays=${queryParams}&productId=${subscribedGroceryProductId}`, null, { headers: header })
      setIsRequestedForSubscriptionExtend(false);
    }else{
      // Alert.alert("HJI"+JSON.stringify(getLastSubscribedId));
      const response = await axios.post(`http://${ip}:5454/api/${getLastSubscribedId+1}/schedule?deliveryTime=${time}&deliveryComments=${LeaveMessage}&deliveryDays=${queryParams}&productId=${subscribedGroceryProductId}`, null, { headers: header });
    }
    // setSubscribedSelectedDates([]);
  } catch (error) {
    console.log('Error createSubscription2:', error);
    // Handle the error as needed
  }
   console.log(JSON.stringify(queryParams));
   setTimeout(()=>{
    setIsLoading(false);
   },2000);
};



const fetchData = async () => {
  const header = {
    'Authorization': `Bearer ${token}`,
  };

  try {
    const response = await axios.get(`http://${ip}:5454/api/users/profile`, { headers: header });
    console.log(JSON.stringify(response.data));
    if(response.data && response.data.wallet && response.data.wallet.balance){
      setWalletBalance(response.data.wallet.balance);
   }
    setAddressList(response.data.addresses);
  } catch (error) {
    console.log('Error fetching profile:', error);
    // Handle the error as needed
  }
};


const [userNameFocus, setUserNameFocus] = useState(false);
const [pinCodeFocus, setPinCodeFocus] = useState(false);
const [streetAddressFocus, setStreetAddressFocus] = useState(false);
const [mobileNumberFocus, setmobileNumberFocus] = useState(false);
const [houseNumberFocus, setHouseNumberFocus] = useState(false);
const [stateFocus, setStateFocus] = useState(false);
const [cityFocus, setCityFocus] = useState(false);

const [userNameNull, setUserNameNull] = useState(false);
const [pinCodeNull, setPinCodeNull] = useState(false);
const [streetAddressNull, setStreetAddressNull] = useState(false);
const [mobileNumberNull, setMobileNumberNull] = useState(false);
const [houseNumberNull, setHouseNumberNull] = useState(false);
const [stateNull, setStateNull] = useState(false);
const [cityNull, setCityNull] = useState(false);

const handleFocus = (field) => {
  switch (field) {
    case 'userName':
      setUserNameFocus(true);
      setPinCodeFocus(false);
      setStreetAddressFocus(false);
      setmobileNumberFocus(false);
      setHouseNumberFocus(false);
      setStateFocus(false);
      setCityFocus(false);
      break;
    case 'pinCode':
      setUserNameFocus(false);
      setPinCodeFocus(true);
      setStreetAddressFocus(false);
      setmobileNumberFocus(false);
      setHouseNumberFocus(false);
      setStateFocus(false);
      setCityFocus(false);
      break;
    case 'streetAddress':
      setUserNameFocus(false);
      setPinCodeFocus(false);
      setStreetAddressFocus(true);
      setmobileNumberFocus(false);
      setHouseNumberFocus(false);
      setStateFocus(false);
      setCityFocus(false);
      break;
    case 'mobileNumber':
      setUserNameFocus(false);
      setPinCodeFocus(false);
      setStreetAddressFocus(false);
      setmobileNumberFocus(true);
      setHouseNumberFocus(false);
      setStateFocus(false);
      setCityFocus(false);
      break;
    case 'houseNumber':
      setUserNameFocus(false);
      setPinCodeFocus(false);
      setStreetAddressFocus(false);
      setmobileNumberFocus(false);
      setHouseNumberFocus(true);
      setStateFocus(false);
      setCityFocus(false);
      break;
    case 'state':
      setUserNameFocus(false);
      setPinCodeFocus(false);
      setStreetAddressFocus(false);
      setmobileNumberFocus(false);
      setHouseNumberFocus(false);
      setStateFocus(true);
      setCityFocus(false);
      break;
    case 'city':
      setUserNameFocus(false);
      setPinCodeFocus(false);
      setStreetAddressFocus(false);
      setmobileNumberFocus(false);
      setHouseNumberFocus(false);
      setStateFocus(false);
      setCityFocus(true);
      break;
    default:
      break;
  }
};
   // get automatically state based on the pincode
   async function getState() {
    try {
      const response = await fetch(`http://www.postalpincode.in/api/pincode/${pinCode}`);
      const data = await response.json(); // Parse JSON response
      console.log(data.PostOffice[0]?.State)
      // Alert.alert(JSON.stringify(data.PostOffice[0]?.State));
      setState(data.PostOffice[0]?.State);
      setCity(data.PostOffice[0]?.Taluk==="NA"?data.PostOffice[0]?.District:data.PostOffice[0]?.Taluk);
    } catch (error) {
      console.log("Got error in AddressDetail.jsx in getState()" + error);
    }
  }
  const calculateNextMonthDate = (selectedDate) => {
    const nextMonth = new Date(selectedDate);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    
    const day = nextMonth.getDate().toString().padStart(2, '0');
    const month = (nextMonth.getMonth() + 1).toString().padStart(2, '0');
    const year = nextMonth.getFullYear();
    return `${day}/${month}/${year}`;
  };
  
  let userName1, lastName1,streetAddress1, city1, state1, pinCode1, mobile1 = '';

  const convertDateFormat = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const getLastDateFormatted = (lastDate) => {
    // Get the last date from the arr

    // Create a new Date object from the last date
    const dateObject = new Date(lastDate);

    // Format the date as per your requirement (YYYY-MM-DDTHH:MM:SS.MSZ)
    const formattedDate = dateObject.toISOString();

    return formattedDate;
}

function getPreviousTwoDaysSameDate(dateString) {
  // Create a Date object from the input string
  const date = new Date(dateString);
  
  // Get the timestamp for two days ago
  const twoDaysAgoTimestamp = date.getTime() - (2 * 24 * 60 * 60 * 1000);

  // Create a new Date object with the timestamp for two days ago
  const twoDaysAgoDate = new Date(twoDaysAgoTimestamp);

  // Return the formatted date string
  return twoDaysAgoDate.toISOString(); // Return the ISO string representation of the date
}

function getNextMonthSameDate(dateString) {
  // Create a Date object from the input string
  const date = new Date(dateString);
  
  // Get the current month
  const currentMonth = date.getMonth();
  
  // Get the current year
  const currentYear = date.getFullYear();

  // Calculate the next month
  const nextMonth = (currentMonth + 1) % 12;
  
  // Calculate the year for the next month (accounting for overflow)
  const nextYear = nextMonth === 0 ? currentYear + 1 : currentYear;

  // Create a new Date object with the next month and the same date and time
  const nextMonthDate = new Date(nextYear, nextMonth, date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds());

  return nextMonthDate.toISOString(); // Return the ISO string representation of the date
}

const[doesAddedNewAddress,setDoesAddedNewAddress]=useState(false);

let  productPrice=0;
  useEffect(() => {

    productPrice=groceryAllProduct.map(item => {
      if (item.id === subscribedGroceryProductId) {
        return item.discountedPrice;
      }
     })
   if(subscribedSelectedDays && subscribedSelectedDays.length>0){
      setIsDaySelected(true);
   }
    if(timeSlotStart){
      setSelectedTime(timeSlotStart);
    }
    if(scheduleSubscriptionOption==='2' && subscribedSelectedDates && subscribedSelectedDates.length>0){

    }
    else if(subscriptionEndDate.length<=0){
       setSubscriptionEndDate(getPreviousTwoDaysSameDate(getNextMonthSameDate(selectedDate)));
    }
  
    const timeSlotString = generateTimeSlotString(timeSlotStart);
    setSubscriptionTimeSlot(timeSlotString);

    
    setTimeout(() => {
      if (userNameNull) {
        setUserNameNull(false);
      }
    }, 2000);
    
    setTimeout(() => {
      if (pinCodeNull) {
        setPinCodeNull(false);
      }
    }, 2000);
    
    setTimeout(() => {
      if (streetAddressNull) {
        setStreetAddressNull(false);
      }
    }, 2000);
    
    setTimeout(() => {
      if (mobileNumberNull) {
        setMobileNumberNull(false);
      }
    }, 2000);
    
    setTimeout(() => {
      if (houseNumberNull) {
        setHouseNumberNull(false);
      }
    }, 2000);
    
    setTimeout(() => {
      if (stateNull) {
        setStateNull(false);
      }
    }, 2000);
    
    setTimeout(() => {
      if (cityNull) {
        setCityNull(false);
      }
    }, 2000);
    
    if(valueError){
      setTimeout(()=>{
       setValueError(false);
      },4000);
    }
    getState() ;
    fetchData();
    getLastSubscribedProductId();

   //  this is for custom modify to autofill the dates in calendar 
   if (scheduleSubscriptionOption === '3' && subscribedSelectedDates) {
    const updatedSelectedDates = {};

  
    //Alert.alert(JSON.stringify(updatedSelectedDates));
if(subscribedSelectedDates && isRequestedForSubscriptionExtend){
  subscribedSelectedDates[0].forEach(date => {
    updatedSelectedDates[date] = { selected: true };
});
setSelectedDatesState(updatedSelectedDates);
}

   // Alert.alert(JSON.stringify(updatedSelectedDates));

    // setSelectedDatesState(updatedSelectedDates);
}
if(storeSubscribedCustomDates && storeSubscribedCustomDates.length>0){
  setSelectedDatesState(storeSubscribedCustomDates);
}


  }, [disableBtn,qtyValue,doesAddedNewAddress,isDaySelected,subscriptionEndDate,selectedDate,getLastSubscribedId,subscribedSelectedDays,walletBalance,state,city,pinCode,timeSlotStart,subscribedSelectedDates]);
console.log(JSON.stringify(subscriptionEndDate));

const handleAddress = async() => {
  
  if (userName === '' || pinCode === '' || streetAddress === '' || mobileNumber === '' || houseNumber === '' || state === '' || city === '') {
    if (userName === '') {
      setUserNameNull(true);
    }
    if (pinCode === '') {
      setPinCodeNull(true);
    }
    if (streetAddress === '') {
      setStreetAddressNull(true);
    }
    if (mobileNumber === '') {
      setMobileNumberNull(true);
    }
    if (houseNumber === '') {
      setHouseNumberNull(true);
    }
    if (state === '') {
      setStateNull(true);
    }
    if (city === '') {
      setCityNull(true);
    }
  }else{
    const data={
      firstName:userName.split(' ')[0],
      lastName: userName.split(' ')[1]?userName.split(' ')[1]:'',
      streetAddress: streetAddress,
      city: city,
      state: state,
      zipCode: pinCode,
      mobile: mobileNumber
   }
   try{
    axios.post(`http://${ip}:5454/api/orders/addresses`,data,{      
      headers: {
      'Authorization': `Bearer ${token}`,         
     },})  
     setDoesAddedNewAddress(true);
     fetchData();
   }catch(error){
     console.log("Error in postAddress in scheduleSubscription.jsx",error);
   }
    setTimeout(()=>{
      handleAddressModalClose();
    },1000);
  }
};
  

const toggleSelectedAddress = (addressIndex) => {
  setSelectedAddress((prevIndex) => (prevIndex === addressIndex ? null : addressIndex));
};
console.log("Here->"+JSON.stringify(subscriptionEndDate));



  // Function to reset all state variables to initial values
  const resetState = () => {
    setGrocerySubscribedDate("");
    setGrocerySubscribedDate1("");
    setGrocerySubscribedTime("");
    setLeaveMessage("");
    setGetLastSubscribedId("");
    setSubscribedSelectedDays([]);
    setSubscribedSelectedDates([]);
    setSelectedDate(new Date(Date.now() + 24 * 60 * 60 * 1000));
    setSubscriptionEndDate("");
    setSubscriptionTimeSlot("");
    setWhichPageToNavigate("");
    setAddressList([]);
    setUserName("");
    setPinCode("");
    setStreetAddress("");
    setMobileNumber("");
    setHouseNumber("");
    setState("");
    setCity("");
    setSelectedAddress(-1);
    setSelectedTime("");
    setDisableBtn(false);
  };

  const [selectedDatesState, setSelectedDatesState] = useState({});

  // const handleDayPress = (day) => {
  //   const { dateString } = day;
  //   const updatedSelectedDates = { ...selectedDatesState };
  
  //   if (selectedDatesState[dateString]) {
  //     delete updatedSelectedDates[dateString];
  //   } else {
  //     updatedSelectedDates[dateString] = { selected: true };
  //   }
  
  //   setSelectedDatesState(updatedSelectedDates);
  // };

  function formatDateToYYYYMMDD(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Adding 1 because months are zero-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  const handleDayPress = (day) => {
    const { dateString } = day;
    const updatedSelectedDates = { ...selectedDatesState };

    if (scheduleSubscriptionOption === '4') {
        // Check if the selected date already exists
        if (Object.keys(updatedSelectedDates).length === 1 && !selectedDatesState[dateString]) {
            Alert.alert(
                'Oops Selection Limit Exhausted',
                'Monthly subscription allows only one date selection.',
                [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
                { cancelable: false }
            );
            return; // Exit function if limit reached
        }
    } else if (Object.keys(updatedSelectedDates).length >= subsribedSelectedDatesCount.length) {
        // Check if the selected date already exists
        if (!selectedDatesState[dateString]) {
            Alert.alert(
                'Oops Selection Limit Exhausted',
                `Your subscription is valid for ${subsribedSelectedDatesCount.length} days. You cannot select more than ${subsribedSelectedDatesCount.length} dates.`,
                [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
                { cancelable: false }
            );
            return; // Exit function if limit reached
        }
    }

    if (selectedDatesState[dateString]) {
        delete updatedSelectedDates[dateString];
    } else {
        if (scheduleSubscriptionOption === '4') {
            // Clear previous selection if scheduleSubscriptionOption is '4'
            Object.keys(updatedSelectedDates).forEach(date => {
                delete updatedSelectedDates[date];
            });
        }
        updatedSelectedDates[dateString] = { selected: true };
    }

    setSelectedDatesState(updatedSelectedDates);
};


 const pressQtyMinusBtn=()=>{
   if(qtyValue>1){
    setQtyValue(qtyValue-1);
   }
 }
 const pressQtyPlusBtn=()=>{
  if(qtyValue>0){
   setQtyValue(qtyValue+1);
  }
 }
   

 function addNewAddressOption(){
  handleAddressListModalClose();
  setAddressModalVisible();
 }

 const [selectedNumbers, setSelectedNumbers] = useState([]);

 // Calculate the maximum number of days in the current month
 const maxDaysInMonth = moment(selectedDate).daysInMonth();

 // Generate numbers from 1 to maxDaysInMonth
 const numbers = Array.from({ length: maxDaysInMonth }, (_, index) => index + 1);

 const handleNumberPress = (number) => {
   // Calculate the end date, which is 30 days from the selected date
   const endDate = moment(selectedDate).add(30, 'days');

   // Clear the previously selected dates
   setSelectedNumbers([]);

   let newNumbers = [];
   let currentDate = moment(selectedDate).date(number);

   // Check if the selected date is within the 30-day window
   if (currentDate.isSameOrBefore(endDate, 'day')) {
     // Select every other date from the selected date till the end of the 30-day window
     while (currentDate.isSameOrBefore(endDate, 'day')) {
       newNumbers.push(currentDate.format('YYYY-MM-DD')); // Format the date as desired
       currentDate = currentDate.add(2, 'days');
     }
     setSelectedNumbers(newNumbers); // Update selectedNumbers state with new selected dates
   } else {
     console.log('Selected date is beyond the 30-day window');
   }
 };

 const nextMonthCalendar = () => {
   const nextMonth = moment(selectedDate).add(1, 'month').toDate();
   setSelectedDate(nextMonth);
 };

 const previousMonthCalendar = () => {
   const previousMonth = moment(selectedDate).subtract(1, 'month').toDate();
   setSelectedDate(previousMonth);
 };

 const isWithinThirtyDays = (date) => {
   const thirtyDaysFromNow = moment().add(30, 'days');
   return moment(date).isSameOrBefore(thirtyDaysFromNow, 'day');
 };

 const isPastDate = (date) => {
   return moment(date).isBefore(moment(), 'day');
 };

 const targetDate=Object.keys(selectedDatesState);
 
 //disable the startDate and endDate After Pressing PROCEED Btn
 const [disableBtn,setDisableBtn]=useState(false);

//show subscribed date in Monthly Subscription 
const [sortModalVisible, setSortModalVisible] = useState(false);    
const handleSortModalClose = () => {
  // Additional logic to handle sorting or other actions
    setSortModalVisible(false);
};


  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView>
        <View style={{ marginLeft:'5%',flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <TouchableOpacity onPress={() => forNavigate('mainHome')}>
          <Image source={kpmg} style={{ width: 100, height: 100 }} />

          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center',}}>
          <TouchableOpacity onPress={() => {
                                            popFromStack(navigation)
                                            resetState()
                                          }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image source={back} style={{ marginLeft: 12 }}/>
              <Text style={{ color: 'black',marginLeft:'3%'}}> Schedule Subscription</Text>
           </View>
        </TouchableOpacity>

      </View>
    <View>
    
      {showPicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={selectedDate}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={onChange}
          minimumDate={new Date(Date.now() + 24 * 60 * 60 * 1000)} // Set minimum date to tomorrow
          style={styles.dateTimePicker}
        />
      )}
    </View>
    <View>
    {showEndPicker && (
      <DateTimePicker
        testID="dateTimePicker"
        value={selectedDate}
        mode="date"
        is24Hour={true}
        display="default"
        onChange={scheduleSubscriptionOption==='4'&&onChange1}
        minimumDate={currentDate}
        style={styles.dateTimePicker}
      />
    )}
  </View>

    <View>
      {isPickerVisible && (
        <DateTimePicker
          testID="dateTimePicker"
          value={timeSlotStart}
          mode="time"
          is24Hour={false}
          display="clock"
          onChange={handleTimeChange}
        />
      )}
    </View>
    
    {/* {subscribedSelectedDates.map((date, index) => (
          <Text>Type: {typeof date}</Text>
      ))} */}

      {
        selectedImage.map((item,index)=>(
          <>
           <View key={index} style={{flexDirection:'row'}}>
            <Image 
                  source={{ uri: item.imageUrl[0] }} 
                  style={{ width: 80, height: 80,margin:'4%'}} 
                  />
             <View style={{margin:'5%'}}>
             <Text  style={styles.productBrand}>{item.brand}</Text>
              <Text style={styles.productTitle}>{item.title}</Text>
              <Text style={styles.productQuantity}>{item.quantity} ml</Text>
      
              <Text style={styles.productQuantity}>
                <Text style={{color:'grey',fontSize:12,margin:'0.5%',fontWeight:'700'}}> ₹</Text>
                {item.discountedPrice}</Text>  
              <Text style={styles.productQuantity}>
                <Text style={{color:'grey',fontSize:12,margin:'0.5%',fontWeight:'700'}}> QTY : </Text>
                {qtyValue}</Text>                      
            </View> 
             <View style={styles.qtyBtnContainer}>
               <TouchableOpacity style={styles.qtyBtnMinus} onPress={pressQtyMinusBtn}>
                 <Image source={minus} style={styles.qtyMinusImage}/>
               </TouchableOpacity>
               <View style={styles.qtyBtn}>
                 <Text style={styles.qtyBtnText}>{qtyValue}</Text>
               </View>
               <TouchableOpacity style={styles.qtyBtnPlus} onPress={pressQtyPlusBtn}>
                <Image source={plus} style={styles.qtyPlusImage}/> 
               </TouchableOpacity>
             </View>
           </View>
           
          </>
        ))
      }

      <Text style={styles.mainHead}>Subscription Type</Text>
      <View style={styles.radioBtn}>
      <View style={styles.radioBtn}>
          <RadioButton
            value="0"
            status={scheduleSubscriptionOption === '0' ? 'checked' : 'unchecked'}
            onPress={() => {
                setScheduleSubscriptionOption('0');
                resetState();
                handleDateChange(new Date());
                setShowPicker(true)
                setValueError(true)
                }}
            color="black"
            disabled={isRequestedForSubscriptionExtend && scheduleSubscriptionOption !== '0'||isResumeCustomSubscription} 
            />  
            <Text>Daily</Text>
        </View>
        <View style={styles.radioBtn}>
          <RadioButton
            value="0"
            status={scheduleSubscriptionOption === '1' ? 'checked' : 'unchecked'}
            onPress={() => {
                setScheduleSubscriptionOption('1');
                handleDateChange(new Date());
                handleWeekPress();
                resetState();

              }}
            color="black" 
            disabled={isRequestedForSubscriptionExtend && scheduleSubscriptionOption !== '1'||isResumeCustomSubscription}
            />
            <Text>Weekly</Text>
      </View>
      <View style={styles.radioBtn}>
          <RadioButton
            value="0"
            status={scheduleSubscriptionOption === '2' ? 'checked' : 'unchecked'}
            onPress={() => {
                setScheduleSubscriptionOption('2');
                handleDateChange(new Date());
                handleMonthlyPress();
                resetState();
                handleDateChange(new Date());
              }}
            color="black" 
            disabled={isRequestedForSubscriptionExtend && scheduleSubscriptionOption !== '2'||isResumeCustomSubscription}
            />
            <Text>Alternative</Text>
      </View>
      </View>
      <View style={styles.radioBtn1}>
      <View style={styles.radioBtn}>
          <RadioButton
            value="0"
            status={scheduleSubscriptionOption === '3' ? 'checked' : 'unchecked'}
            onPress={() => {
                setScheduleSubscriptionOption('3');
                handleDateChange(new Date());
                resetState();
              }}
            color="black" 
            disabled={isRequestedForSubscriptionExtend && scheduleSubscriptionOption !== '3'}
            />
            <Text>Custom</Text>
       </View>
       <View style={styles.radioBtn2}>
          <RadioButton
            value="0"
            status={scheduleSubscriptionOption === '4' ? 'checked' : 'unchecked'}
            onPress={() => {
                setScheduleSubscriptionOption('4');
                handleDateChange(new Date());
                resetState();
              }}
            color="black" 
            disabled={isRequestedForSubscriptionExtend && scheduleSubscriptionOption !== '4'}
            />
            <Text>Monthly</Text>
       </View>
      </View>
      <View>
     {
      (scheduleSubscriptionOption==='3'||scheduleSubscriptionOption==='4') && 
       (<>
      <CalendarList
        current={formatDateToYYYYMMDD(currentDate)}
        pastScrollRange={24}
        futureScrollRange={24}
        horizontal
        pagingEnabled
        markedDates={selectedDatesState}
        onDayPress={handleDayPress}
        minDate={currentDate.toString()} 
        maxDate={scheduleSubscriptionOption!=='4' && addOneMonth12(currentDate).toString()}
      />
      {/* <View style={{ marginTop: 20 }}>
        <Text>Selected Dates:</Text>
        {Object.keys(selectedDatesState).map(date => (
          <Text key={date}>{date}</Text>
        ))}
      </View> */}
       
       </>)
     }   
    </View>

       <View>
       <Text style={styles.mainHead1}>Subscription Delivery</Text>
       <Text style={styles.subHeading}>Subscription Start Date</Text>
       <View style={{marginLeft:'4%',marginTop:'2%',borderColor:'grey',height:39,width:370,borderWidth:1,borderRadius:8,borderColor:valueError?'#00338D':'grey'}}>
         <TouchableOpacity
           disabled={disableBtn||isRequestedForSubscriptionExtend}
           style={{flexDirection:"row",justifyContent:'space-between'}} onPress={showDatePicker}>  
          <TextInput placeholder='Select a day' value={isRequestedForSubscriptionExtend?formatDate(selectedDate):formatDate(selectedDate)}
           style={{color:isRequestedForSubscriptionExtend?'grey':'#00338D',marginLeft:'1%'}}/>   
          <View>
            <Image source={dropDownArrow}  style={{height:17,width:12,padding:'3.5%',marginTop:'34%'}}/>
          </View> 
     </TouchableOpacity>
  </View>
</View>
<View style={{marginTop:'4%'}}>
       <Text style={styles.subHeading}>Subscription End Date</Text>
       <View style={{marginLeft:'4%',marginTop:'2%',borderColor:'grey',height:39,width:370,borderWidth:1,borderRadius:8,borderColor:valueError?'#00338D':'grey'}}>
         <TouchableOpacity
          disabled={scheduleSubscriptionOption !== '4' || disableBtn}
          style={{flexDirection:"row",justifyContent:'space-between'}} onPress={showEndDatePicker}>  
          <TextInput placeholder='Select a day'  value={isRequestedForSubscriptionExtend?formatDate(subscriptionEndDate):formatDate(subscriptionEndDate)}
           style={{color:isRequestedForSubscriptionExtend?'grey':'#00338D',marginLeft:'1%'}}/>   
          <View>
            <Image source={dropDownArrow}  style={{height:17,width:12,padding:'3.5%',marginTop:'34%'}}/>
          </View> 
     </TouchableOpacity>
  </View>
</View>
<Modal
      visible={calendarVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setCalendarVisible(false)}
    >
      <TouchableWithoutFeedback onPress={() => setCalendarVisible(false)}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <TouchableOpacity style={{ flex: 1 }} onPress={() => setCalendarVisible(false)} />
          <View style={{ backgroundColor: 'white', width: '98%', borderRadius: 10}}>
            <CalendarPicker
              onDateChange={handleDateChange}
              textStyle={{ color: '#00338D' }} // Customize text color
              selectedDayStyle={{ backgroundColor: '#00338D' }} // Customize selected day background color
              minDate={new Date()} // Disable all previous dates
              disabledDatesTextStyle={{ color: 'grey' }} // Style disabled dates with grey color
            />
          </View>
          <TouchableOpacity style={{ flex: 1 }} onPress={() => setCalendarVisible(false)} />
        </View>
      </TouchableWithoutFeedback>
    </Modal>
    <Modal animationType="slide" transparent={true} visible={sortModalVisible} onRequestClose={handleSortModalClose}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContainer1}>
              <View style={styles.modalContent1}>
                <View>
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ flex: 1, textAlign: 'center', color: 'red', fontWeight: '500', fontSize: 16.5 }}></Text>
                     <TouchableOpacity onPress={handleSortModalClose}>
                      <Text style={{fontSize:23}}>╳</Text>
                     </TouchableOpacity>
                  </View>
                 
                
                  {
                    
                  <Text style={{color: 'black', fontSize: 18}}>
  You will receive your product on the 
  <Text style={{color: 'black', fontWeight: '500'}}> {targetDate[targetDate.length - 1]} </Text> 
  of each month until the subscription end date.
</Text>
} 

   

                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal> 


<View style={{marginTop:'4%'}}>
  <Text style={styles.subHeading}>Choose a Time Slot</Text>
  <View style={{marginLeft:'4%',marginTop:'1%',}}>

  {/* <DropDownPicker
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      placeholder="Select Timeslot"
      containerStyle={{ width: 370 }} // Adjust the width if needed
      style={{ backgroundColor: 'white', minHeight: 39, borderColor: valueError ? 'red' : 'grey' }}
      textStyle={{ color: '#00338D' }}
      // Adjust the maxHeight as needed
      modal // Render dropdown outside of its parent
      onChangeItem={(item) =>{ setValue(item.value)
            
      }}
    />    */}
    <TouchableOpacity style={{width:'94%',borderWidth:0.9,borderColor:'grey',height:39,borderRadius:8}} onPress={() => setIsPickerVisible(true)}>
     <View style={{flexDirection:'row',justifyContent:'space-between'}}>
         <Text style={{color:'#00338D',margin:'2%'}}>
           {formatTimeSlot(timeSlotStart)} -{' '}
           {formatTimeSlot(new Date(timeSlotStart.getTime() + 60 * 60000))}
         </Text>
        <Image source={dropDownArrow} style={{width:13,height:15,margin:'3.5%'}}/>
     </View>
    </TouchableOpacity>
  </View>

</View>
<View style={{marginTop:'4%'}}> 
  {
    selectedAddress>=0 && (
      <View style={{flexDirection:'row',justifyContent:'space-between',}}>
       <Text style={styles.subHeading}>Selected Address</Text>
       <TouchableOpacity onPress={()=>{ setAddressListModalVisible()}}>
       <Text style={{marginRight:'8%',fontWeight:'700',color:'#00338D'}}>CHANGE</Text>
       </TouchableOpacity>
      </View>  
    )
  }
  { 
    addressList && addressList.length > 0 && (
      addressList.map((item, index) => (
        index === selectedAddress && (
          <View key={index} style={styles.selectedAddress}>
            <Text>{item.mobile}</Text>
            <Text>{item.firstName} {item.lastName}</Text>
            <Text>{item.streetAddress}</Text>
            <Text>{item.city}, {item.state}, {item.zipCode}</Text>
          </View>
          
        )
      ))
    )
  }

</View>



    <View>
      <Text style={styles.subHeading1}>Share Your Instruction Here</Text>
      
      <View style={styles.LeaveMessage}>
      <TextInput
        value={LeaveMessage}
        onChangeText={(text)=>setLeaveMessage(text)}
        placeholder='Type your message here...'
        placeholderTextColor='grey'
        multiline
      />
      </View>
    </View>
    <View style={{flexDirection:'row',alignItems:'center',margin:'4%'}}>
         <CheckBox
            disabled={false}
            value={isChecked}
            onValueChange={(newValue) =>setChecked(newValue)                  
            }           
              />
      <Text style={styles.TermConditionInstruction}>By clicking below, you agree to our <Text style={{color:'#00338D',fontWeight:'500',textDecorationLine:'underline'}}>Terms of services & Privacy Policy</Text></Text>
    </View>
    <TouchableOpacity style={styles.submitBtn}
      onPress={()=>{SchedulePickup()}}>
      <Text style={{fontWeight:'600', color:'white', textAlign:'center', fontSize:15}}>
  {
    selectedAddress < 0 
    ? 'PROCEED'
    : walletBalance >= ((parseInt(productPrice)) * (parseInt(qtyValue))*subscribedSelectedDates.length)
      ? `Confirm Subscription`
      : `PAY ${(parseInt(productPrice)) * (parseInt(qtyValue)) * subscribedSelectedDates.length}`
  }
</Text>

    </TouchableOpacity>
    <Modal animationType="slide" transparent={true} visible={weeklyModalVisible} onRequestClose={handleWeeklyModalClose}>
  <TouchableWithoutFeedback onPress={handleWeeklyModalClose}>
    <View style={styles.modalContainer}>
      <View style={styles.weeklyModal}>
        </View>
</View>
</TouchableWithoutFeedback>
</Modal>
    <Modal animationType="slide" transparent={true} visible={weeklyModalVisible} onRequestClose={handleWeeklyModalClose}>
  <TouchableWithoutFeedback onPress={handleWeeklyModalClose}>
    <View style={styles.modalContainer}>
      <View style={styles.weeklyModal}>
        <Text style={styles.weeklyHead}>Select Delivery Days</Text>
         <View style={{marginTop:'4%'}}>
         <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: '4%', marginTop: '2%' }}>
         <CheckBox
           disabled={false}
           value={subscribedSelectedDays.includes(0)} // Check if Monday (index 1) is in the selected days array
           onValueChange={(newValue) => {
           setChecked1(newValue);
           handleCheckBoxToggle(0); // Pass the index of Monday (1) to the handler
      }}
    />
  

      <Text style={{ color: 'black' }}>Sunday</Text>
    </View>
           <View style={{flexDirection:'row',alignItems:'center',marginLeft:'4%'}}>
           <CheckBox
           disabled={false}
           value={subscribedSelectedDays.includes(1)} // Check if Monday (index 1) is in the selected days array
           onValueChange={(newValue) => {
           setChecked2(newValue);
           handleCheckBoxToggle(1); // Pass the index of Monday (1) to the handler
      }}
    />
  
             <Text style={{color:'black'}}>Monday</Text>     
           </View>
           <View style={{flexDirection:'row',alignItems:'center',marginLeft:'4%',}}>
           <CheckBox
           disabled={false}
           value={subscribedSelectedDays.includes(2)} // Check if Monday (index 1) is in the selected days array
           onValueChange={(newValue) => {
           setChecked3(newValue);
           handleCheckBoxToggle(2); // Pass the index of Monday (1) to the handler
      }}
    />
  
             <Text style={{color:'black'}}>Tuesday</Text>     
           </View>
           <View style={{flexDirection:'row',alignItems:'center',marginLeft:'4%',}}>
           <CheckBox
           disabled={false}
           value={subscribedSelectedDays.includes(3)} // Check if Monday (index 1) is in the selected days array
           onValueChange={(newValue) => {
           setChecked4(newValue);
           handleCheckBoxToggle(3); // Pass the index of Monday (1) to the handler
      }}
    />
  
             <Text style={{color:'black'}}>Wednesday</Text>     
           </View>
           <View style={{flexDirection:'row',alignItems:'center',marginLeft:'4%',}}>
           <CheckBox
           disabled={false}
           value={subscribedSelectedDays.includes(4)} // Check if Monday (index 1) is in the selected days array
           onValueChange={(newValue) => {
           setChecked5(newValue);
           handleCheckBoxToggle(4); // Pass the index of Monday (1) to the handler
      }}
    />
  
             <Text style={{color:'black'}}>Thursday</Text>     
           </View>
           <View style={{flexDirection:'row',alignItems:'center',marginLeft:'4%',}}>
           <CheckBox
           disabled={false}
           value={subscribedSelectedDays.includes(5)} // Check if Monday (index 1) is in the selected days array
           onValueChange={(newValue) => {
           setChecked6(newValue);
           handleCheckBoxToggle(5); // Pass the index of Monday (1) to the handler
      }}
    />
  
             <Text style={{color:'black'}}>Friday</Text>     
           </View>
           <View style={{flexDirection:'row',alignItems:'center',marginLeft:'4%',}}>
           <CheckBox
           disabled={false}
           value={subscribedSelectedDays.includes(6)} // Check if Monday (index 1) is in the selected days array
           onValueChange={(newValue) => {
           setChecked7(newValue);
           handleCheckBoxToggle(6); // Pass the index of Monday (1) to the handler
      }}
    />
  
             <Text style={{color:'black'}}>Saturday</Text>     
           </View>
           <TouchableOpacity style={{borderWidth:0.8,borderRadius:8,height:80,margin:'2%',marginTop:'4%',flexDirection:'row'}} onPress={showDatePicker}>
              <Image source={calendar} style={{width:29,height:32,margin:'4%',marginTop:'5%'}}/>
              <View style={{marginTop:'4%'}}>
                <Text style={{fontSize:13}}>Subscription Start Date</Text>
                <Text style={{fontSize:15,color:'black',fontWeight:'500'}}>{formatDate2(selectedDate)}</Text>
              </View>
              <Image source={dropDownArrow}  style={{height:17,width:12,marginLeft:'40%',marginTop:'9%'}}/>
           </TouchableOpacity>
           <TouchableOpacity style={styles.subscribedDates} onPress={closeWeekly}>
              <Text style={{textAlign:'center',color:'white',fontSize:15,fontWeight:'500'}}>Submit</Text>
            </TouchableOpacity>
         </View>

      </View>
    </View>
  </TouchableWithoutFeedback>
</Modal>


<Modal animationType="slide" transparent={true} visible={monthlyModalVisible} onRequestClose={handleMonthlyModalClose}>
 
    <View style={styles.modalContainer}>
      <View style={styles.weeklyModal1}>
        <Text style={styles.weeklyHead}>Select Delivery Days</Text>
        <Text style={styles.formattedDate5}>{formattedDate5}</Text>
        <View style={styles.container}>
  {numbers.map((number, index) => {
    const currentDate = moment(selectedDate).date(number).format('YYYY-MM-DD'); // Format the currentDate

    // Calculate the end date, which is 30 days from the selected date
    const endDate = moment(selectedDate).add(30, 'days');

    const isEnabled =
    moment().isSameOrBefore(currentDate, 'day') &&
    moment(currentDate).isSameOrBefore(moment(selectedDate).add(30, 'days'), 'day') &&
    !moment().isSame(currentDate, 'day');
     const isSelected = selectedNumbers.includes(currentDate); // Check if currentDate is in selectedNumbers

    return (
      <TouchableOpacity
        key={index}
        style={[
          styles.number,
          isSelected && styles.selected,
          (!isEnabled || !isWithinThirtyDays(moment(currentDate)) || isPastDate(moment(currentDate))) && styles.disabled,
        ]}
        onPress={() => isEnabled && handleNumberPress(number)}
        disabled={!isEnabled || !isWithinThirtyDays(moment(currentDate)) || isPastDate(moment(currentDate))}
      >
        <Text style={[styles.numberText, isSelected ? styles.selectedText : styles.unselectedText]}>
          {number}
        </Text>
      </TouchableOpacity>
    );
  })}
  {/* Button to navigate to the previous month's calendar */}
  <TouchableOpacity onPress={previousMonthCalendar}>
    <Text>Previous Month</Text>
  </TouchableOpacity>
  {/* Button to navigate to the next month's calendar */}
  <TouchableOpacity onPress={nextMonthCalendar} style={{marginLeft:'2%'}}>
    <Text>Next Month</Text>
  </TouchableOpacity>
</View>




      <TouchableOpacity style={{borderWidth:0.8,borderRadius:8,height:80,margin:'2%',marginTop:'4%',flexDirection:'row'}} onPress={showDatePicker}>
              <Image source={calendar} style={{width:29,height:32,margin:'4%',marginTop:'5%'}}/>
              <View style={{marginTop:'4%',width:280}}>
                <Text style={{fontSize:13}}>Subscription Start Date</Text>
                <Text style={{fontSize:15,color:'black',fontWeight:'500'}}>{formatDate2(selectedDate)}</Text>
              </View>
              <Image source={dropDownArrow}  style={{height:17,width:12,marginLeft:'3%',marginTop:'9%'}}/>
           </TouchableOpacity>
      <TouchableOpacity style={{alignSelf:'center',backgroundColor:'#00338D',margin:'2%',width:'94%',borderRadius:13,padding:12,marginTop:'4%'}} onPress={()=>{monthlyDates()}}>
              <Text style={{textAlign:'center',color:'white',fontSize:15,fontWeight:'500'}}>Submit</Text>
      </TouchableOpacity>      

      </View>
    </View>
 
</Modal>



<Modal animationType="slide" transparent={true} visible={addressModalVisible} onRequestClose={handleAddressModalClose}>
  <TouchableWithoutFeedback onPress={handleAddressModalClose}>
    <View style={styles.modalContainer}>
       <View style={styles.AddressModal}> 
        <Text style={styles.addressMainHead}>Address Detail</Text>
       <ScrollView>
        <View style={{margin:'4%'}}>
        <TextInput
  style={[
    styles.inputField,
    { 
      borderColor: userNameFocus ? '#00338D' : userNameNull?'red':'#D3D3D3', 
  },
  ]}
  placeholder='Full Name'
  onFocus={() => handleFocus('userName')}
  placeholderTextColor='#999'
  onChangeText={(text) => setUserName(text)}
  value={userName}
/>
<TextInput
  style={[
    styles.inputField,
    { borderColor: mobileNumberFocus ? '#00338D' :mobileNumberNull?'red':'#D3D3D3' },
  ]}
  placeholder='Mobile Number'
  maxLength={10}
  inputMode='numeric'
  onFocus={() => handleFocus('mobileNumber')}
  placeholderTextColor='#999'
  onChangeText={(text) => setMobileNumber(text)}
  value={mobileNumber}
/>

<View style={{flexDirection:'row',justifyContent:'space-between'}}>
<TextInput
  style={[
    styles.inputField,
    { borderColor:pinCodeFocus ? '#00338D' :pinCodeNull?'red':'#D3D3D3',width:'40%' },
  ]}
  placeholder='PIN Code'
  maxLength={6}
  keyboardType='numeric'
  onChangeText={(text) => setPinCode(text)}
  onFocus={() => handleFocus('pinCode')}
  placeholderTextColor='#999'
  value={pinCode}

/>
<TextInput
  style={[
    styles.inputField,
    { borderColor: stateFocus ? '#00338D' : stateNull?'red':'#D3D3D3' ,width:'40%'},
    
  ]}
                placeholder="State"
                onChangeText={(text) => setState(text)}
                onFocus={() => handleFocus('state')}
                value={state}
              />
</View>

<TextInput
  style={[
    styles.inputField,
    { borderColor: houseNumberFocus ? '#00338D' : houseNumberNull?'red':'#D3D3D3' },
  ]}
  placeholder='House Number'
  onFocus={() => handleFocus('houseNumber')}
  placeholderTextColor='#999'
  onChangeText={(text) => setHouseNumber(text)}
  value={houseNumber}
/>
<TextInput
  style={[
    styles.inputField,
    { borderColor: streetAddressFocus ? '#00338D' :streetAddressNull?'red':'#D3D3D3' },
  ]}
  placeholder='Street Address'
  onFocus={() => handleFocus('streetAddress')}
  placeholderTextColor='#999'
  onChangeText={(text) => setStreetAddress(text)}
  value={streetAddress}
/>

<TextInput
   style={[
    styles.inputField,
    { borderColor: cityFocus ? '#00338D' : cityNull?'red':'#D3D3D3', }
  ]}
            placeholder="City"
            onChangeText={(text) => setCity(text)}
            onFocus={() => handleFocus('city')}
            value={city}
          />

<TouchableOpacity style={styles.continueBtn} onPress={()=>{handleAddress()}}>
  <Text style={styles.continueBtnText}>Continue</Text>
</TouchableOpacity>
        </View>
        </ScrollView>
      </View>
    </View>
  </TouchableWithoutFeedback>
</Modal>  

<Modal animationType="slide" transparent={true} visible={addressListModalVisible} onRequestClose={handleAddressListModalClose}>
  <ScrollView>
    <View style={styles.modalContainer}>
       <View style={styles.AddressModal1}> 
        <Text style={styles.addressMainHead1}>Please Select Delivery Address</Text>
   
        <View style={styles.addressListContainer}>
         {
            addressList && addressList.length > 0 && 
           (
             addressList.map((item, index) => (
              <>
                <View key={index} style={{
                      flexDirection:'row',
                      alignItems:'center',
                      height:100,
                      width:360,
                      margin:'1%',
                      borderWidth:1.6,
                      borderColor: selectedAddress === index ? '#00338D' :'#D3D3D3',
                      borderRadius:13,
                      padding:'3%'
                }}>
                 <RadioButton
                    value={index}
                    status={selectedAddress === index ? 'checked' : 'unchecked'}
                    onPress={() => toggleSelectedAddress(index)}
                   color="#00338D"
                  />
                  <View>
                  <Text style={styles.addressListHead}>{item.firstName} {item.lastName}</Text>
                  <Text style={styles.addressListSubHead} >{item.streetAddress}</Text>
                  <Text style={styles.addressListSubHead}>{item.city} , {item.state}</Text>
                  <Text style={styles.addressListSubHead}>IND,{item.zipCode}</Text>
                  </View>

                </View>
                {selectedAddress === index && ( // Conditionally render "Proceed" button
          <TouchableOpacity style={{ backgroundColor: '#00338D', padding: '2%', width: 80, borderRadius: 13,}} onPress={handleAddressListModalClose}>
            <Text style={{ color: 'white', fontWeight: '600', textAlign: 'center',fontSize:12 }}>Proceed</Text>
          </TouchableOpacity>
        )}
              </>
      ))
    )
  }
</View>

 
    <TouchableOpacity style={styles.addNewAddressBtn} onPress={()=>{addNewAddressOption()}}>
       <Text style={styles.addNewAddressBtnText}>Add New Address</Text>
    </TouchableOpacity>
       </View>
    </View>

  </ScrollView>
</Modal>  

    </ScrollView>

    <Spinner
          visible={isLoading}
          textContent={isRequestedForSubscriptionExtend||isResumeCustomSubscription?'Updating...':'Subscribing...'}
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

export default ScheduleSubscription

const styles = StyleSheet.create({
  mainHeading:{
    marginLeft:'5%',
    marginTop:'5%',
    fontWeight:'600',
    fontSize:16,
    color:'#00338D',
    margin:'4%'
  },
  mainHead1:{
    marginLeft:'5%',
    marginTop:'5%',
    fontWeight:'600',
    fontSize:16,
    color:'#00338D',
    margin:'4%'
  },
  subHeading:{
      marginLeft:'6%',
      fontWeight:'400',
      fontSize:13,
      color:'#00338D',
    },
    subHeading1:{
      marginLeft:'6%',
      fontWeight:'400',
      fontSize:14,
      color:'#00338D',
    
    },
    TermConditionInstruction:{
     fontSize:13,
     margin:'1%'
    },
    backArrow:{
        flexDirection: 'row', 
        alignItems: 'center' 
    },
    mainHead:{
        color:'#00338D',
        marginLeft:'5%',
        fontWeight:'500',
        fontSize:17,
        marginTop:'4%'
    },
    radioBtn:{
        margin:'1%',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-around'
    },
    radioBtn1:{
      flexDirection:'row',
      alignItems:'center',
      marginLeft:'6%'
  },
  radioBtn2:{
    marginLeft:'8%',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-around'
},
    dropList:{
      margin:'4%'
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    weeklyModal:{
      height: 500,
      width: '100%', 
      backgroundColor: 'white', 
      marginTop: '88%',
      borderTopLeftRadius:16,
      borderTopRightRadius:16
    },
    weeklyModal1:{
      height: 600,
      width: '100%', 
      backgroundColor: 'white', 
      marginTop: '88%',
      borderTopLeftRadius:16,
      borderTopRightRadius:16
    },
    AddressModal:{
      height:900,
      width: '100%', 
      backgroundColor: 'white', 
      marginTop: '88%',
      borderTopLeftRadius:16,
      borderTopRightRadius:16
    },
    AddressModal1:{
      width: '100%', 
      backgroundColor: 'white', 
      marginTop: '105%',
      borderTopLeftRadius:16,
      borderTopRightRadius:16
    },
    weeklyHead:{
      marginLeft: '5%', 
      marginTop: '7%', 
      fontSize: 15, 
      color: 'black',
      fontWeight:'500'
    },
    formattedDate5:{
      marginLeft: '5%', 
      marginTop: '4%', 
      fontSize: 18, 
      color: '#00338D',
      fontWeight:'800'

    },
    container: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 0.8,
      height: 280,
      width: '98%',
      alignSelf: 'center',
      marginTop:'3%',
      padding:'2%'

    },
    number: {
      margin: 5,
      padding: 10,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
    },
    disabled: {
      backgroundColor: '#e6e6e6', // Grey background color for disabled dates
    },
    selected: {
      backgroundColor: 'rgba(0, 51, 141, 0.8)', // Change the background color when selected
    },
    numberText: {
      fontSize: 16,
    },
    selectedText: {
      color: 'white', // Set text color to white for selected numbers
    },
    unselectedText: {
      color: 'black', // Set text color to black for unselected numbers
    },
    dateTimePicker: {
      backgroundColor: '#00338D', // Set background color
      color: 'white', // Set text color
    },
    subscribedDates:{
      alignSelf:'center',backgroundColor:'#00338D',margin:'2%',width:'94%',borderRadius:13,padding:12,marginTop:'4%'
    },
    addressMainHead:{
     color:'black',
     fontSize:23,
     margin:'4%',
     marginTop:'8%',
     fontWeight:'600'
    },
    addressMainHead1:{
      color:'black',
      fontSize:20,
      margin:'4%',
      marginTop:'18%',
      fontWeight:'600'
     },
  inputField: {
    borderBottomWidth: 1,
    marginTop: '7%',
    color: 'black',
  },
  continueBtn:{
   backgroundColor:'#00338D',
   marginTop:'14%',
   padding:'3%',
   width:'100%',
   borderRadius:12
  },
  continueBtnText:{
    textAlign:'center',
    color:'white',
    fontWeight:'600',
    fontSize:17
  },
  addressListContainer:{
    margin:'2%',
    alignItems:'center' 
  },

  addressListHead:{
    color:'black',
    fontWeight:'600'
  },
  addressListSubHead:{
    color:'black',

  },
  productBrand:{
    fontWeight:'400',color:'grey',fontSize:11,marginTop:'2%',margin:'0.5%'
  },
  productTitle:{
    color:'black',fontWeight:'500',fontSize:13,margin:'0.5%'
  },
  productQuantity:{
    fontSize:12,margin:'0.5%',
  },
  productPrice:{
    fontSize:13,margin:'0.5%',color:'black'
  },
  qtyBtnContainer:{
    width:'30%',
    height:'26%',
    marginLeft:'10%',
    margin:'10%',
    borderRadius:10,
    flexDirection:'row',
    borderColor:'#00338D',
    borderWidth:1.3,
  },
  qtyBtnMinus:{
   width:'30%',
   borderRadius:1,
   borderTopLeftRadius:10,
   borderBottomLeftRadius:10
  },
  qtyMinusImage:{
   width:20,
   height:20,
   margin:'14%',
   marginLeft:'24%'
  },

  qtyBtn:{
   backgroundColor:'#00338D',
   width:'40%'
  },
  qtyBtnText:{
    fontWeight:'800',
    margin:'9%',
    textAlign:'center',
    color:'white'
   },
  qtyBtnPlus:{
    width:'30%',
    borderTopRightRadius:10,
    borderBottomRightRadius:10
   },
   qtyPlusImage:{
    width:20,
    height:20,
    margin:'14%',
    marginLeft:'24%'
   },
   submitBtn:{
    backgroundColor:'#00338D',width:'90%',padding:'2.4%',alignSelf:'center',borderRadius:13,marginBottom:'5%'
   },
   addNewAddressBtn:{
    borderColor:'black',
    borderWidth:1.2,
    width:'86%',
    padding:'2%',
    alignSelf:'center',
    borderRadius:12,
    marginBottom:'4%'
   },
   addNewAddressBtnText:{
    color:'black'
   },
   selectedAddress:{
    borderWidth:1,borderRadius:12,marginTop:'1%',padding:'2.5%',height:100,margin:20,borderColor:'#D3D3D3'
   },
   LeaveMessage:{
    borderWidth:1,borderRadius:12,padding:'1%',height:120,margin:20,borderColor:'#D3D3D3'
   },
   modalContainer1:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent1:{
    width: '90%',
    height: '23%',
    marginTop:'-52%',
    backgroundColor: 'white',
    padding: 20,
    bottom:0,
    position:'fixed',
    borderRadius: 10,
    backgroundColor:'white',
  },
  
})
