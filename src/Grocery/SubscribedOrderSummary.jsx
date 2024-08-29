import { StyleSheet, Text, View,TouchableOpacity,Image, ScrollView,TextInput,Modal,TouchableWithoutFeedback,ActivityIndicator,} from 'react-native'
import React,{useEffect, useState} from 'react'
import { useCartContext } from '../Context/WomenContext'
import { useLoginContext } from '../Login/LoginCartProvider'
import back from '../PlpScreen/images/back.png';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
import { useGroceryContext } from './GroceryContext';
import { format } from 'date-fns';
import kpmg from '../PlpScreen/images/kpmg3.png'

const SubscribedOrderSummary = ({navigation}) => {
  const {ip,token,popFromStack,pushToStack,
    currentPage, setCurrentPage,
    currentPageIndex,setCurrentPageIndex,
    currentPageIndexCategory,setCurrentPageIndexCategory,
    currentPageIndexCategory1,setCurrentPageIndexCategory1,updateMobileName,setUpdateMobileName,
    updateUserName, setUpdateUserName,updateEmail,setUpdateEmail,loginUserId}=useLoginContext();  

const { search, setSearch,dataStore,selectedStoreId,setSelectedStoreId,
        selectedStoreAvailableSlots,setSelectedStoreAvailableSlots,
        selectedStorePickupDay,setSelectedStorePickupDay,
        selectedStorePickupTime,setSelectedStorePickupTime,filteredData, 
        setFilteredData,scheduleSubscriptionOption,setScheduleSubscriptionOption,userName,setUserName} = useCartContext();
const [isLoading, setIsLoading] = useState(false); 

const {grocerySubscribedDate,grocerySubscribedTime,
  grocerySubscribedDate1,setGrocerySubscribedDate1,subscribedGroceryProductId,groceryAllProduct,LeaveMessage,
  getLastSubscribedId,setGetLastSubscribedId,selectedDate,subscriptionEndDate,subscriptionTimeSlot,subscribedSelectedDates,
  addressList,selectedAddress,mobileNumber, setMobileNumber,qtyValue}=useGroceryContext();
  const{setGrocerySubscribedDate,setGrocerySubscribedTime,setLeaveMessage,
   setSubscribedSelectedDates,selectedTime,setSelectedTime}=useGroceryContext();

const {subscribedSelectedDays,setSubscribedSelectedDays, setSubscriptionEndDate,
     setWhichPageToNavigate,
  setAddressList,
     setSelectedDate,

     pinCode, setPinCode,
     streetAddress, setStreetAddress,

     houseNumber, setHouseNumber,
     state, setState,
     city, setCity,
setSelectedAddress,
setSubscriptionTimeSlot}=useGroceryContext();


 

  const forNavigate=(page)=>{
    console.log(page+" "+currentPage[currentPage.length-1]);
    if(currentPage && currentPage[currentPage.length-1]!==page){
      if(page==='mainBag'){
        setCurrentPage(currentPage.splice(-3));
      }
      pushToStack(page);
      navigation.navigate('subscribedItem');
      // createSubscription1();
    }else{
      popFromStack(navigation);
    }
  } 



  const[getOrderData,setGetOrderData]=useState([]);
  const getLastOrderId = async () => {
   const header = {
     'Authorization': `Bearer ${token}`,
   };
   try {
     const response = await axios.get(`http://${ip}:5454/api/orders/user`, { headers: header });
    setGetOrderData(response.data);
   } catch (error) {
     console.log('Error fetching profile:', error);
     // Handle the error as needed
   }
 };

  const[getSubscribedData,setGetLastSubscribedData]=useState([]);
  const getLastSubscribedProductId = async () => {
   const header = {
     'Authorization': `Bearer ${token}`,
   };
   try {
     const response = await axios.get(`http://${ip}:5454/api/subscriptions/${loginUserId}`, { headers: header });
     setGetLastSubscribedData(response.data);
     if(getSubscribedData && getSubscribedData.length>0){
      for(let i=0;i<getSubscribedData.length;i++){
           if(i===getSubscribedData.length-1){
                 setGetLastSubscribedId(getSubscribedData[getSubscribedData.length - 1].id);
                 break;
           }
      }
    }
   } catch (error) {
     console.log('Error fetching profile:', error);
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
        'ALTERNATIVE':'CUSTOM',
      startDate:grocerySubscribedDate,
      endDate:grocerySubscribedDate
  }
    const header = {
      'Authorization': `Bearer ${token}`,
    };
    try {
      const response = await axios.post(`http://${ip}:5454/api/subscriptions`,data, { headers: header });

    } catch (error) {
      console.log('Error fetching profile:', error);
      // Handle the error as needed
    }
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
   // Function to reset all state variables to initial values
   const resetState = () => {
    setGrocerySubscribedDate("");
    setGrocerySubscribedDate1("");
    setGrocerySubscribedTime("");
    setLeaveMessage("");
    setGetLastSubscribedId("");
    setSubscribedSelectedDays([]);
    setSubscribedSelectedDates([]);
    setSelectedDate(new Date());
    setSubscriptionEndDate("");
    setSubscriptionTimeSlot("");
    setWhichPageToNavigate("");
    setAddressList([]);
    setUserName("");
    setPinCode("");
    setStreetAddress("");
    setMobileNumber("");
    setHouseNumber("");

    setCity("");
    setSelectedAddress(-1);

    setSelectedTime("");
  };



  // const date = new Date(grocerySubscribedDate);
  // const options = { year: 'numeric', month: 'long', day: 'numeric' };
  // const formattedDate = date.toLocaleDateString('en-GB', options); // en-GB for British English locale
  
  function getOrdinalSuffix(number) {
    if (number % 100 >= 11 && number % 100 <= 13) {
        return 'th';
    }
    switch (number % 10) {
        case 1:
            return 'st';
        case 2:
            return 'nd';
        case 3:
            return 'rd';
        default:
            return 'th';
    }
}

const date = new Date(grocerySubscribedDate);
const day = date.getDate();
const month = date.toLocaleString('en-US', { month: 'long' });
const year = date.getFullYear();

const ordinalDay = `${day}${getOrdinalSuffix(day)}`;

const formattedDate = `${ordinalDay} ${month}, ${year}`;
const Address = (
  <>
    {addressList.map((item, index) => (
       <Text key={index}>{selectedAddress === index ? `${item.city}, ${item.state}` : ''}</Text>
    ))}
  </>
);
// Define a constant to store the mobile number
const selectedMobileNumber = selectedAddress >= 0 && selectedAddress < addressList.length
  ? addressList[selectedAddress].mobile
  : "";
useEffect(() => {
  getLastOrderId();
  getLastSubscribedProductId();  
  fetchData(); // Call the function when the component mounts

}, [ip,token,userName,getLastSubscribedId]); // Empty dependency array ensures it only runs once on mount

const [SubscribedAddress,setSubsribedAddress]=useState([]);
const fetchData = async () => {
  const header = {
    'Authorization': `Bearer ${token}`,
  };

  try {
    const response = await axios.get(`http://${ip}:5454/api/users/profile`, { headers: header });
    console.log(JSON.stringify(response.data));
    // Set the state with the fetched profile data
    setUpdateUserName(response.data.firstName + (response.data.lastName ? ` ${response.data.lastName}` : ''));
    setUpdateMobileName(response.data.mobile);
    setUpdateEmail(response.data.email);
    setUserName(response.data.firstName);

    // setUpdatePassword(profileData.password);
    // You might want to fetch and set other fields as needed
  } catch (error) {
    console.log('Error fetching profile:', error);
    // Handle the error as needed
  }
};



  return (
    <View style={{flex:1,backgroundColor:'white'}}>
       <TouchableOpacity style={{margin:'3%'}} onPress={()=>{forNavigate('mainHome')}}>
       <Image source={kpmg} style={{ width: 100, height: 100 }} />
       </TouchableOpacity>
       <View style={styles.backBtn}>
        <TouchableOpacity onPress={() => popFromStack(navigation)}>
          <View style={styles.backBtn}>
               <Image source={back} style={{ marginLeft: 12 }} />
              <Text style={{ color: 'black',marginLeft:'3%'}}>Order Details</Text>
          </View>          
        </TouchableOpacity>
       </View>
       <ScrollView>

       <Text style={styles.mainHeading}>List of Products{JSON.stringify()}</Text>
       <View>
       <View style={styles.productContainer}>
  {
    groceryAllProduct.map(item => {
      if (item.id === subscribedGroceryProductId) {
        return (
          <React.Fragment key={item.id}>
            <Image source={{uri: item.imageUrl[0]}} style={{width: 100, height: 100}}/>
            <View style={{margin: '3%'}}>
              <Text style={styles.productHeading}>{item.title}</Text>
              <Text style={styles.productHeading1}>{item.brand}</Text>
              <Text>Qty. {item.quantity} gm</Text>
              <Text>Type: {scheduleSubscriptionOption==='0'?
        'DAILY':scheduleSubscriptionOption==='1'?
        'WEEKLY':scheduleSubscriptionOption==='2'?
        'MONTHLY':'CUSTOM'}</Text>
              <Text style={{color: 'black', fontWeight: '500'}}>₹{item.discountedPrice} / <Text style={{color: 'grey', textDecorationLine: 'line-through'}}>₹{item.price}</Text></Text>
            </View>
          </React.Fragment>
        );
      } else {
        return null; // Render nothing if item.id !== '1'
      }
    })
  }
</View>

         <View style={{height:0.7,backgroundColor:'grey',width:'94%',alignSelf:'center'}}/>
       </View>



       <Text style={styles.mainHeading}>Subscription Details</Text>
       <View style={styles.mainContainer}>
       <View style={styles.subContainer}>
               <View>
                 <Text style={styles.subHeading1}>ORDER ID</Text>
                 <Text style={styles.subHeading2}>KPMG-RT-145624626
                 {getOrderData.map(order => (
                  <Text key={order.id}>{order.id}</Text>
                 ))}
                 </Text>
               </View>
               <View>
                <Text style={styles.subHeading1}>ORDER DATE</Text>
                <Text style={styles.subHeading2}>{format(new Date(), 'EEEE, dd MMMM yyyy')}</Text>
               </View>
            </View>
            <View style={styles.horizontalLine}/>
            <View style={styles.subContainer}>
              <View style={{borderRightWidth:0.9,width:170,borderColor:'#D3D3D3'}}>
                <Text style={styles.subContainerHeading1}>Type</Text>
                <Text style={styles.subContainerHeading1}>Start Date</Text>
                <Text style={styles.subContainerHeading1}>End Date</Text>                
                <Text style={styles.subContainerHeading1}>Delivery Time</Text>
                <Text style={styles.subContainerHeading1}>Payment Mode</Text>
              </View>
              <View style={{width:170}}>
                <Text style={styles.subContainerHeading2}>{scheduleSubscriptionOption==='0'?
        'DAILY':scheduleSubscriptionOption==='1'?
        'WEEKLY':scheduleSubscriptionOption==='2'?
        'MONTHLY':'CUSTOM'}</Text>
                <Text style={styles.subContainerHeading2}>{formatDate2(selectedDate)}</Text>
                <Text style={styles.subContainerHeading2}>{formatDate2(subscriptionEndDate)}</Text>
                <Text style={styles.subContainerHeading2}>{subscriptionTimeSlot}</Text>
                <Text style={styles.subContainerHeading2}>E-Wallet</Text>
              </View>
            </View>             
       </View>


       <Text style={styles.mainHeading}>Order Details</Text>
       <View style={styles.mainContainer}>
            <View style={styles.subContainer}>
               <View>
                 <Text style={styles.subHeading1}>ORDER ID</Text>
                 <Text style={styles.subHeading2}>KPMG-RT-145624626</Text>
               </View>
               <View>
                <Text style={styles.subHeading1}>ORDER DATE</Text>
                <Text style={styles.subHeading2}>{format(new Date(), 'EEEE, dd MMMM yyyy')}</Text>
               </View>
            </View>
            <View style={styles.horizontalLine}/>
            <View style={styles.subContainer}>
              <View style={{borderRightWidth:0.9,width:170,borderColor:'#D3D3D3'}}>
                <Text style={styles.subContainerHeading1}>Order Value</Text>
                <Text style={styles.subContainerHeading1}>QTY.</Text>
                <Text style={styles.subContainerHeading1}>Name</Text>
                <Text style={styles.subContainerHeading1}>Mobile Number</Text>
                <Text style={styles.subContainerHeading1}>Address</Text>
              </View>
              <View style={{borderRightWidth:0.9,width:170,borderColor:'#D3D3D3'}}>
                <Text style={styles.subContainerHeading3}>
                {
                groceryAllProduct.map(item => {
                if (item.id === subscribedGroceryProductId) {
                  return <Text>₹{(parseInt(item.discountedPrice)) * (parseInt(qtyValue))*subscribedSelectedDates.length}</Text>;
                } else {
                  return null; // Render nothing if item.id doesn't match subscribedGroceryProductId
                }
               })
              }

                </Text>
                <Text style={styles.subContainerHeading3}>{subscribedSelectedDates.length}</Text>
                <Text style={styles.subContainerHeading3}>{userName?.split(" ")[0]}</Text>
                <Text style={styles.subContainerHeading3}>{selectedMobileNumber}</Text>
                <Text style={styles.subContainerHeading3}>{Address}</Text>
              </View>           
            </View>
       </View>




       <Text style={styles.mainHeading}>Payment Summary</Text>
       <View style={styles.mainContainer}>
          <View style={styles.paymentContainer}>
            <Text>Sub Total</Text>

              {
                groceryAllProduct.map(item => {
                if (item.id === subscribedGroceryProductId) {
                  return <Text style={{color:'black',fontWeight:'500'}}>₹{(parseInt(item.price) )*(parseInt(qtyValue)) * subscribedSelectedDates.length}</Text>;
                } else {
                  return null; // Render nothing if item.id doesn't match subscribedGroceryProductId
                }
               })
              }

          </View>
          <View style={styles.paymentContainer}>
            <Text>Delivery Charges</Text>
            <Text style={{color:'#00A3A1',fontWeight:'500'}}>Free</Text>
          </View>
          <View style={styles.paymentContainer}>
            <Text>Offer Discount</Text>
            <Text style={{color:'#CA2127',fontWeight:'500'}}>₹0</Text>
          </View>
          <View style={styles.paymentContainer}>
            <Text>Total Payable Amount</Text>
              {
                groceryAllProduct.map(item => {
                if (item.id === subscribedGroceryProductId) {
                  return <Text style={{color:'black',fontWeight:'500'}}>₹{(parseInt(item.discountedPrice)) * (parseInt(qtyValue))*subscribedSelectedDates.length}</Text>;
                } else {
                  return null; // Render nothing if item.id doesn't match subscribedGroceryProductId
                }
               })
              }

          </View>
       </View>




       <TouchableOpacity style={styles.scheduleBtn} onPress={()=>{
                                                              forNavigate('subscribedItem')
                                                                resetState();
                                                                }}>
          <Text style={{textAlign:'center',color:'white',fontWeight:'600',fontSize:14}}>View Subscribed Products</Text>
       </TouchableOpacity>
     </ScrollView>
     <Spinner
          visible={isLoading}
          textContent={'Subscribing...'}
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

export default SubscribedOrderSummary

const styles = StyleSheet.create({
  backBtn:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
  },
  mainHeading:{
    color:'black',
    fontWeight:'500',
    marginLeft:'4%',
    marginTop:'5%'
  },
  mainContainer:{
    borderWidth:0.8,
    margin:'5%',
    borderRadius:13,
    borderColor:'#D3D3D3',
    padding:'2%'
  },
  subContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: '3%',
    alignItems: 'center',
  },
  subColumn: {
    width: '49%', // Adjust this value as needed
    justifyContent: 'space-between',
    alignItems: 'flex-start', // Align items to the start of the column
    padding: 5 // Add padding for spacing between items
  },
  subHeading1: {
    color: '#00338D',
    fontWeight: '500'
  },
  subHeading2: {
    fontSize: 12
  },  
  horizontalLine:{
    height:0.5,
    backgroundColor:'#D3D3D3',
    width:'94%',
    alignSelf:'center',
  },
  subContainerHeading1:{
    color:'#00338D',
    fontWeight:'400',
    margin:'4.6%'
  },
  subContainerHeading2:{
    margin:'3%'
  },
  subContainerHeading3:{

    fontWeight:'400',
    margin:'4.6%'
  },  
  subContainerHeading4:{
    fontWeight:'400',
    margin:'3%'
  }, 
   subContainerHeading5:{
    fontWeight:'400',
    margin:'4%',
  },
  subContainerHeading6:{
    fontWeight:'400',
    margin:'3%'
  },
  productContainer:{
    flexDirection:'row',
    margin:'7%',
    alignItems:'center'
  },
  productHeading:{
    color:'#00338D',
    fontWeight:'600'
  },
  productHeading1:{
    color:'#00338D',
    fontWeight:'400'
  },  paymentContainer:{
    marginLeft:'5%',
    marginRight:'5%',
   flexDirection:'row',
   justifyContent:'space-between'
  },
  scheduleBtn:{
    marginTop:'5%',
    borderRadius:8,
    backgroundColor:'#00338D',
    alignSelf:'center',
    width:'90%',
    marginBottom:'8%',
    padding:'2.5%'
  },
  spinnerTextStyle:{
    marginBottom:'58%'
  }
})



