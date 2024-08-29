import React, { useEffect,useState } from 'react';
import {TextInput, Alert,StyleSheet, Text, View, TouchableOpacity, Image, Dimensions,FlatList,SafeAreaView, ScrollView,Modal,TouchableWithoutFeedback} from 'react-native';
import { useCartContext } from './Context/WomenContext';
import { useLoginContext } from './Login/LoginCartProvider';
import back from './PlpScreen/images/back.png';
import WebView from 'react-native-webview';
import DropDownPicker from 'react-native-dropdown-picker';
import Spinner from 'react-native-loading-spinner-overlay';
import moment from 'moment';
import axios from 'axios';
import CalendarPicker from 'react-native-calendar-picker';
import dropDownArrow from './PlpScreen/images/downarrow.png'; 

const ScheduleStoreTime = ({navigation}) => {

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    // { label: 'Apple', value: 'apple' }
    // { label: 'Banana', value: 'banana' },
    // { label: 'Orange', value: 'orange' },
    // { label: 'Apple1', value: 'apple1' },
    // { label: 'Banana2', value: 'banana2' },
    // { label: 'Orange3', value: 'orange3' },
    // { label: 'Apple4', value: 'apple4' },
    // { label: 'Banana5', value: 'banana5' },
    // { label: 'Orange6', value: 'orange6' },
    // { label: 'Apple7', value: 'apple7' },
    // { label: 'Banana8', value: 'banana8' },
    // { label: 'Orange9', value: 'orange9' },

    // // Add more items as needed
  ]);
  const [open1, setOpen1] = useState(false);
  const [value1, setValue1] = useState(null);
  const [items1, setItems1] = useState([
    // { label: 'Apple', value: 'apple' },
    // { label: 'Banana', value: 'banana' },
    // { label: 'Orange', value: 'orange' },
       {label:'09:00 AM - 09:30 AM',value:'09:00 AM - 09:30 AM'},
       {label:'09:30 AM - 10:00 AM',value:'09:30 AM - 10:00 AM'},
       {label:'10:00 AM - 10:30 AM',value:'10:00 AM - 10:30 AM'},
       {label:'10:30 AM - 11:00 AM',value:'10:30 AM - 11:00 AM'}
    // Add more items as needed
  ]);
  const [calendarVisible, setCalendarVisible] = useState(false);


  const handleDateChange = (date) => {
    // Format the date as desired (e.g., 'DD/MM/YYYY')
    // const day = date.getDate();
    // const month = date.getMonth() + 1;
    // const year = date.getFullYear();
  
    // // Ensure proper formatting with leading zeros if needed
    // const formattedDate = `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${year}`;
    // console.log(JSON.stringify());
    // Alert.alert(JSON.stringify(date))
    // setValue(date.toISOString());
    // setCalendarVisible(false);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
  
    // Ensure proper formatting with leading zeros if needed
    const formattedDate = `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${year}`;
  
    setValue(formattedDate);
    setCalendarVisible(false);
  };
  const {ip,token,popFromStack,pushToStack,
        currentPage, setCurrentPage,loginUserId,
        currentPageIndex,setCurrentPageIndex,
        currentPageIndexCategory,setCurrentPageIndexCategory,
        currentPageIndexCategory1,setCurrentPageIndexCategory1}=useLoginContext();  

  const { search, setSearch,dataStore,selectedStoreId,setSelectedStoreId,
            selectedStoreAvailableSlots,setSelectedStoreAvailableSlots,
            selectedStorePickupDay,setSelectedStorePickupDay,cartItem,
            selectedStorePickupTime,setSelectedStorePickupTime,filteredData, setFilteredData,setDisableAction,
            storeProductWithSizeAndQuantity,setStoreProductWithSizeAndQuantity,showStorePickUpName,setShowStorePickUpName,
            modifyStorePickUp,setModifyStorePickUp} = useCartContext();

        const [isLoading, setIsLoading] = useState(false); 
        const [slot1,setSlot1]=useState("2024-02-14T09:00:00");

      const [LeaveMessage,setLeaveMessage]=useState("");  
        const forNavigate=(page)=>{
            console.log(page+" "+currentPage[currentPage.length-1]);
            if(currentPage && currentPage[currentPage.length-1]!==page){
              if(page==='mainBag'){
                setCurrentPage(currentPage.splice(-3));
              }
              pushToStack(page);
              setIsLoading(true);
              setTimeout(()=>{
                navigation.navigate(page);
                setIsLoading(false);
              },3000);
            }else{
              popFromStack(navigation);
            }
          } 


          useEffect(() => {
            const filtered = dataStore.filter(item => item.id === selectedStoreId);
            setFilteredData(filtered);

          }, [selectedStoreId,]);

     async function getStoreAvailableSlotData(){
      try {
        const response = await axios.get(`http://${ip}:5454/store-pickups/store/${selectedStoreId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,         
          },
        });
        setSelectedStoreAvailableSlots(response.data);
        console.log("\n\nSelectedSlot"+JSON.stringify(response.data));
      } catch (error) {
        // Handle errors
        console.error('Error fetching data:', error);
      }
     }
    useEffect(()=>{
      getStoreAvailableSlotData();
    },[selectedStoreId,]);

    useEffect(() => {
      if (selectedStoreAvailableSlots && selectedStoreAvailableSlots.length > 0) {
        // Filter out duplicate dates
        const uniqueDates = Array.from(new Set(selectedStoreAvailableSlots));
    
        // Format the unique dates
        const formattedDates = uniqueDates.map(date => {
          const parsedDate = moment(date);
          return {
            label: parsedDate.format('dddd, D MMM YYYY'),
            value: date,
            key: date,
            disabled: false,
          };
        });
    
        setItems(formattedDates);
        console.log("\n\nTHIS ARE THE FORMATTED DATES"+JSON.stringify(formattedDates));
      }
    }, [selectedStoreAvailableSlots]);
    
    useEffect(() => {
      if(selectedStoreAvailableSlots && selectedStoreAvailableSlots.length){

        const generateTimeSlots = (startTime, duration, interval) => {
        const slots = [];
        let currentTime = moment(startTime);
        const endTime = moment(startTime).add(duration, 'hours');
        
        while (currentTime.isBefore(endTime)) {
          const slotLabel = `${currentTime.format('HH:mm')}-${currentTime.add(interval, 'minutes').format('HH:mm')}`;
          slots.push({ label: slotLabel, value: slotLabel });
        }
        return slots;
      };
    
      // Get the first time slot's start time from selectedStoreAvailableSlots
      const startTime = slot1.length > 0 ? slot1 : moment().toISOString();
      const duration = 8; // Hours
      const interval = 30; // Minutes
      // Alert.alert(timeSlots);
      const timeSlots = generateTimeSlots(startTime, duration, interval);
      // setItems1(timeSlots);
     }
    }, [selectedStoreAvailableSlots]);

    const [selectedDayError,setSelectedDayError]=useState(false);
    const [selectedTimeError,setSelectedTimeError]=useState(false);



    const inputArray = ["1M13", "12L14", "29S3"];
  
  // Function to parse the array and extract the required data
  const parseProductArray = (inputArray) => {
    // Initialize arrays to store the results
    const productIds = [];
    const sizeNames = [];
    const quantities = [];

    // Loop through each product string and extract the data
    inputArray.forEach((product) => {
      const match = product.match(/(\d+)([A-Z])(\d+)/);
      if (match) {
        const [, productId, sizeName, quantity] = match;
        productIds.push(Number(productId));
        sizeNames.push(sizeName);
        quantities.push(Number(quantity));
      }
    });
    return { productIds, sizeNames, quantities };
  };

  const { productIds, sizeNames, quantities } = parseProductArray(inputArray);
    useEffect(()=>{
      parseInputStrings();
      if(selectedDayError){
        setTimeout(()=>{
           setSelectedDayError(false);
        },3000);
      }
      setTimeout(()=>{
        setSelectedTimeError(false);
     },3000);
    },[selectedDayError,selectedTimeError]);
    async function SchedulePickup(){
      if(!value||!value1){
        if(!value){
          setSelectedDayError(true);
        }
        if(!value1){
         setSelectedTimeError(true);
        }
        // Alert.alert(JSON.stringify(currentPage));  
      }else{
        // Alert.alert(JSON.stringify(value))
        setSelectedStorePickupDay(value);
        setSelectedStorePickupTime(value1);
        const [day, month, year] = value?.split("/");

// Parse the time slot string to extract the start time component
const [startTime] = value1.split("-")[0]?.split(":");

// Construct a new datetime string by combining the parsed date and time components
const formattedDateTime = `${year}-${month}-${day}T${startTime}:00:00`
// Alert.alert(formattedDateTime);
      const data={
        pickupDateTime:formattedDateTime,
        comment: LeaveMessage?LeaveMessage:'',
        userId: loginUserId,
        productIds:parsedProductIds,
        sizeNames: parsedSizeNames,
        quantities:parsedQuantities
      }
      if(modifyStorePickUp){

        try {
          await axios.put(`http://${ip}:5454/store-pickups/reschedule/${selectedStoreId}?newPickupDateTime=${formattedDateTime}&newComment=${LeaveMessage}`,null, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          setDisableAction(true);
          forNavigate('order');
        } catch (error) {
          console.error('Error Posting nowRedeemYourPointsManually data:', error);
        }
        //Alert.alert(JSON.stringify(selectedStoreId+" "+formattedDateTime+" "+LeaveMessage));
        
      }else{
        try {
          await axios.post(`http://${ip}:5454/store-pickups/${selectedStoreId}/pickups/comment`,data, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          setDisableAction(true);
          forNavigate('mainBag');
        } catch (error) {
          console.error('Error Posting nowRedeemYourPointsManually data:', error);
        }
       }
      }
    }
 // Calculate the minDate to disable dates before the current date
 const currentDate = moment().toDate(); // Get the current date
 const minDate = moment(currentDate).add(1, 'day').toDate();

 const [parsedProductIds, setParsedProductIds] = useState([]);
 const [parsedSizeNames, setParsedSizeNames] = useState([]);
 const [parsedQuantities, setParsedQuantities] = useState([]);

 
 const inputStrings = storeProductWithSizeAndQuantity;

 const parseInputStrings = () => {
   const newProductIds = [];
   const newSizeNames = [];
   const newQuantities = [];

   inputStrings.forEach((item) => {
     const match = item.match(/(\d+)([A-Z])(\d+)/);
     if (match) {
       const [, productId, sizeName, quantity] = match;
       newProductIds.push(Number(productId));
       newSizeNames.push(sizeName);
       newQuantities.push(Number(quantity));
     }
   });

  //  Alert.alert(
  //    'Parsed Data',
  //    `Product IDs: ${JSON.stringify(newProductIds)}\nSizes: ${JSON.stringify(newSizeNames)}\nQuantities: ${JSON.stringify(newQuantities)}`
  //  );

   setParsedProductIds((prevIds) => [...prevIds, ...newProductIds]);
   setParsedSizeNames((prevSizes) => [...prevSizes, ...newSizeNames]);
   setParsedQuantities((prevQuantities) => [...prevQuantities, ...newQuantities]);
 };

 
    return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView>
      <View style={{ padding: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <TouchableOpacity onPress={() => forNavigate('mainHome')}>
          <Image source={{ uri: 'https://shorturl.at/ckGU2' }} style={{ width: 100, height: 100 }} />
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => popFromStack(navigation)}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View>
              <Image source={back} style={{ marginLeft: 12 }} />
            </View>

            <View>
      {/* <Text>Product IDs: {JSON.stringify(productIds)}</Text>
      <Text>Size Names: {JSON.stringify(sizeNames)}</Text>
      <Text>Quantities: {JSON.stringify(quantities)}</Text> */}
    </View>
            <View style={{ marginLeft: '10%' }}>
              <Text style={{ color: 'black' }}>Schedule Pickup{JSON.stringify(selectedStoreId)}</Text>
              {/* <Text>Today, {today.format('D MMM YYYY')}</Text>
      <Text>{firstDate.format('dddd')}, {firstDate.format('D MMM YYYY')}</Text>
      <Text>{secondDate.format('dddd')}, {secondDate.format('D MMM YYYY')}</Text> */}

            </View>
          </View>
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center', marginTop: '2%' }}>
        <Text style={{ marginLeft: '7%', fontSize: 17, color: 'black', fontWeight: '500', fontSize: 16 }}>Choose Your Location</Text>
        <TouchableOpacity style={{ width: 120, height: 30, marginRight: '1%' }} onPress={() => { forNavigate('chooseStoreUsingPincode') }}>
          <Text style={{ fontWeight: '600', marginLeft: '17%', marginTop: '5%' }}>{search.toUpperCase()}</Text>
        </TouchableOpacity>
      </View>
      <View style={{flexDirection:'row',width:400}}>
        <View style={{ height:100, width: '50%' ,margin:'2%'}}>
          {
            modifyStorePickUp?(<>
               <Text style={{marginLeft:'10%'}}>{showStorePickUpName}</Text>
            </>):(
              <>
                    {filteredData.length > 0 && (
        <>
        <Text style={{marginLeft:'10%',fontWeight:'500',color:'#00338D',fontSize:16}}>{filteredData[0].name}</Text>
        <Text style={{marginLeft:'10%',fontWeight:'700',color:'#00338D',fontSize:16}}>{filteredData[0].city}</Text>
        <Text style={{marginLeft:'10%',marginTop:'20%'}}>{filteredData[0].address}</Text>
        </>
      )}  
              </>
            )
          }
       
        </View>
        <View style={{ height:220, width:'45%' ,marginRight:'7%'}}>
          <WebView
            scalesPageToFit={true}
            bounces={false}
            javaScriptEnabled={true}
            automaticallyAdjustContentInsets={false}
            source={{ html: `<iframe width="100%" height="800" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=${search}+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"><a href="https://www.gps.ie/">gps systems</a></iframe>` }}
          />
        <Text style={{padding:'1%',color:'#00338D',fontWeight:'500'}}>Mon-Fri 
           <Text style={{fontWeight:'400'}}>:9:00 - 23:00</Text>
        </Text>
        <Text style={{padding:'1%',color:'#00338D',fontWeight:'500'}}>Sat-Sun
           <Text style={{fontWeight:'400'}}>:9:00 - 23:00</Text>
        </Text>
        </View>
      </View>
       <Text style={{marginLeft:'6%',marginTop:'7%',fontWeight:'600',fontSize:16,color:'black'}}>Schedule Pickup</Text>
       <View style={{marginTop:'4%'}}>
  <Text style={{marginLeft:'6%',fontWeight:'400',fontSize:16,color:'#00338D'}}>Select a Day</Text>
   <View style={{marginLeft:'4%',marginTop:'2%',borderColor:'grey',height:39,width:370,borderWidth:1,borderRadius:8}}>
     <TouchableOpacity style={{flexDirection:"row",justifyContent:'space-between'}}  onPress={() => setCalendarVisible(true)}>  
        <TextInput placeholder='Select a day' value={value}
         style={{color:'#00338D',marginLeft:'1%'}}/>   
        <View>
          <Image source={dropDownArrow}  style={{height:17,width:12,padding:'3.5%',marginTop:'24%'}}/>
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
          <View style={{ backgroundColor: 'white', width: '95%', borderRadius: 10}}>
          <CalendarPicker
              onDateChange={handleDateChange}
              minDate={minDate} // Set minDate to disable dates before the current date

              textStyle={{ color: '#00338D' }} // Customize text color
              selectedDayStyle={{ backgroundColor: '#00338D' }} // Customize selected day background color
            />
          </View>
          <TouchableOpacity style={{ flex: 1 }} onPress={() => setCalendarVisible(false)} />
        </View>
        </TouchableWithoutFeedback>
      </Modal>


<View style={{marginTop:'6%'}}>
  <Text style={{marginLeft:'6%',fontWeight:'400',fontSize:16,color:'#00338D'}}>Choose a Time Slot</Text>
  <View style={{marginLeft:'4%',marginTop:'1%'}}>

    <DropDownPicker
      open={open1}
      value={value1}
      items={items1}
      setOpen={setOpen1}
      setValue={setValue1}
      setItems={setItems1}
      placeholder="Select Timeslot"
      placeholderStyle={{color:'grey'}}
      containerStyle={{ width: 370 }} // Adjust the width if needed
      style={{minHeight: 39,borderColor:selectedTimeError?'red':'grey'}}
      textStyle={{ color: '#00338D' }}
      dropDownContainerStyle={{ maxHeight: 200 }} // Adjust the maxHeight as needed
      modal // Render dropdown outside of its parent
      onChangeItem={(item) => setValue1(item.value)}
    />      
  </View>

</View>
    <View>
      <Text style={{color:'#00338D',fontSize:16,marginLeft:'5%',marginTop:'4%'}}>Share Your Instruction Here</Text>
      <View style={{borderWidth:1,borderRadius:12,marginTop:'4%',padding:'1%',height:100,margin:10,borderColor:'#D3D3D3'}}>
      <TextInput
        value={LeaveMessage}
        onChangeText={(text)=>setLeaveMessage(text)}
        placeholder='Start writing here'
        placeholderTextColor='grey'
        multiline
      />
    </View>
    </View>
    <TouchableOpacity style={{backgroundColor:'#00338D',width:'90%',padding:'2.4%',alignSelf:'center',borderRadius:13,marginTop:'4%'}}
      onPress={()=>{SchedulePickup()}}>
       <Text style={{fontWeight:'700',color:'white',textAlign:'center',fontSize:17}}>SCHEDULE</Text>
    </TouchableOpacity>

    </ScrollView>
    <Spinner
          visible={isLoading}
          textContent={'Scheduling...'}
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

export default ScheduleStoreTime

const styles = StyleSheet.create({})