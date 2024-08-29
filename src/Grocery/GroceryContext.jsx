import React,{ createContext, useContext, useState, useEffect, Children } from 'react';
const groceryContext=createContext();
export function useGroceryContext(){
    return useContext(groceryContext);
}
export default function GroceryProvider ({children})
{
  const[groceryAllProduct,setGroceryAllProduct]=useState([]);  
  const[grocerySubscribedDate,setGrocerySubscribedDate]=useState("");
  const[grocerySubscribedDate1,setGrocerySubscribedDate1]=useState("");
  const[grocerySubscribedTime,setGrocerySubscribedTime]=useState("");
  const[subscribedGroceryProductId,setSubscribedGroceryProductId]=useState();
  const [LeaveMessage,setLeaveMessage]=useState(""); 
  const[getLastSubscribedId,setGetLastSubscribedId]=useState("");
  const [subscribedSelectedDays,setSubscribedSelectedDays]=useState([]);
  const [subscribedSelectedDates,setSubscribedSelectedDates]=useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date(Date.now() + 24 * 60 * 60 * 1000));
  const [subscriptionEndDate, setSubscriptionEndDate] = useState("");
  const [subscriptionTimeSlot,setSubscriptionTimeSlot]=useState("");
  const [whichPageToNavigate,setWhichPageToNavigate]=useState('');
  const [addressList,setAddressList]=useState([]);
  const [userName, setUserName] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [houseNumber, setHouseNumber] = useState('');
  const [state, setState] = useState("");
  const [city, setCity] = useState(""); 
  const [selectedAddress,setSelectedAddress]=useState(-1);
  const[currentSelectedSubscribedProduct,setCurrentSelectedSubscribedProduct]=useState();
  const[selectedTime,setSelectedTime]=useState("");
  const[isRequestedForSubscriptionExtend,setIsRequestedForSubscriptionExtend]=useState(false);
  const[isRequestedForSubscriptionExtendId,setIsRequestedForSubscriptionExtendId]=useState(0);
  const[selectedDatesAsString,setSelectedDatesAsString]=useState("");
  const[subsribedSelectedDatesCount,setSubscribedSelectedDatesCount]=useState(0);

 //update Qty of product
 const[qtyValue,setQtyValue]=useState(1);
 //get custom resume dates in subscribed subscription 
 const [storeSubscribedCustomDates,setStoreSubscribedCustomDates]=useState([])
//count custom resume dates
const [count, setCount] = useState(0);
//resume custom subscription 
const[isResumeCustomSubscription,setIsResumeCustomSubscription]=useState(false);


  const contextValue={
    groceryAllProduct,setGroceryAllProduct,
    grocerySubscribedDate,setGrocerySubscribedDate,
    grocerySubscribedTime,setGrocerySubscribedTime,
    grocerySubscribedDate1,setGrocerySubscribedDate1,
    subscribedGroceryProductId,setSubscribedGroceryProductId,
    LeaveMessage,setLeaveMessage,
    getLastSubscribedId,setGetLastSubscribedId,
    subscribedSelectedDays,setSubscribedSelectedDays,
    subscribedSelectedDates,setSubscribedSelectedDates,
    selectedDate, setSelectedDate,
    subscriptionEndDate, setSubscriptionEndDate,
    whichPageToNavigate,setWhichPageToNavigate,
    addressList,setAddressList,
    userName, setUserName,
    pinCode, setPinCode,
    state, setState,
    city, setCity,
    streetAddress, setStreetAddress,
    mobileNumber, setMobileNumber,
    houseNumber, setHouseNumber,
    selectedAddress,setSelectedAddress,
    subscriptionTimeSlot,setSubscriptionTimeSlot,
    currentSelectedSubscribedProduct,setCurrentSelectedSubscribedProduct,
    selectedTime,setSelectedTime,
    isRequestedForSubscriptionExtend,setIsRequestedForSubscriptionExtend,
    isRequestedForSubscriptionExtendId,setIsRequestedForSubscriptionExtendId,
    selectedDatesAsString,setSelectedDatesAsString,
    subsribedSelectedDatesCount,setSubscribedSelectedDatesCount,
    qtyValue,setQtyValue,
    count, setCount,
    isResumeCustomSubscription,setIsResumeCustomSubscription
    
  }
  return (
    <groceryContext.Provider value={contextValue}>
        {children}  
    </groceryContext.Provider>
  )
}


