import { StyleSheet, Text, View,TouchableOpacity,Image, ScrollView,TextInput,Modal,TouchableWithoutFeedback,ActivityIndicator,Alert} from 'react-native'
import React,{useEffect, useState} from 'react'
import { useCartContext } from '../Context/WomenContext'
import { useLoginContext } from '../Login/LoginCartProvider'
import back from '../PlpScreen/images/back.png';
import axios from 'axios';
import { useGroceryContext } from './GroceryContext';

const ExtendSubscription = ({navigation}) => {


    const{currentSelectedSubscribedProduct,setCurrentSelectedSubscribedProduct}=useGroceryContext();
    const {ip,token,popFromStack,pushToStack,
        currentPage, setCurrentPage,
        currentPageIndex,setCurrentPageIndex,
        currentPageIndexCategory,setCurrentPageIndexCategory,
        currentPageIndexCategory1,setCurrentPageIndexCategory1,loginUserId,}=useLoginContext();  
    
    const { search, setSearch,dataStore,selectedStoreId,setSelectedStoreId,
            selectedStoreAvailableSlots,setSelectedStoreAvailableSlots,
            selectedStorePickupDay,setSelectedStorePickupDay,
            selectedStorePickupTime,setSelectedStorePickupTime,filteredData, 
            setFilteredData,scheduleSubscriptionOption,setScheduleSubscriptionOption} = useCartContext();
    
    
    
            const forNavigate=(page)=>{
                console.log(page+" "+currentPage[currentPage.length-1]);
                if(currentPage && currentPage[currentPage.length-1]!==page){
                  if(page==='mainBag'){
                  }
                  pushToStack(page);
                  setTimeout(()=>{
                    navigation.navigate(page);
                  },1000);
                  // createSubscription1();
                }else{
                  popFromStack(navigation);
                }
              } 
    
              
            const[allSubscribedProducts,setAllSubscribedProducts]=useState([]);
            const getAllSubscribedProducts = async () => {
             const header = {
               'Authorization': `Bearer ${token}`,
             };
             try {
               const response = await axios.get(`http://${ip}:5454/api/subscriptions/all`, { headers: header });
               setAllSubscribedProducts(response.data);
             } catch (error) {
               console.log('Error fetching profile:', error);
               // Handle the error as needed
             }
           };
         useEffect(()=>{
           getAllSubscribedProducts();
         },[allSubscribedProducts]);   
         
         const [selectedNumbers, setSelectedNumbers] = useState([]);
         const handleNumberPress = (number) => {
           // Check if the number is already selected
           if (selectedNumbers.includes(number)) {
             // If it is selected, remove it from the array
             setSelectedNumbers(selectedNumbers.filter((num) => num !== number));
           } else {
             let newNumbers = [];
             if (number % 2 === 0) {
               // If the selected number is even, deselect all odd numbers and select even numbers
               newNumbers = selectedNumbers.filter((num) => num % 2 === 0);
               for (let i = number; i <= 31; i += 2) {
                 newNumbers.push(i);
               }
             } else {
               // If the selected number is odd, deselect all even numbers and select odd numbers
               newNumbers = selectedNumbers.filter((num) => num % 2 !== 0);
               for (let i = number; i <= 31; i += 2) {
                 newNumbers.push(i);
               }
             }
             setSelectedNumbers(newNumbers);
           }
         };
         const numbers = Array.from({ length: 31 }, (_, index) => index + 1);
         const [storeDate, setStoreDate] = useState([]);
         const [dates, setDates] = useState([]);
       
         // Extract day portion from each date and filter to include only days present in the dates array
         useEffect(() => {
            // Extract day portion from each date and filter to include only days present in the dates array
            // const filteredDates = dates
            //   .map(date => new Date(date).getDate()) // Extract day portion
            //   .filter((day, index, self) => self.indexOf(day) === index); // Filter to include unique days only
        
            // // Set filtered days to storeDate state
            setSelectedNumbers(dates);
          }, [dates]); 
          useEffect(() => {
            // Extracting delivery days for the selected subscribed product
            const deliveryDays = allSubscribedProducts
              .filter(item => item.id === currentSelectedSubscribedProduct)
              .map(item => item.deliveryDays)
              .flat();
        
            // Removing duplicate days
            const uniqueDeliveryDays = [...new Set(deliveryDays)];
        
            // Extracting day portion from each delivery day
            const dayNumbers = uniqueDeliveryDays.map(day => new Date(day).getDate());
        
            // Storing the unique day numbers as dates state
            setDates(dayNumbers);
          }, [allSubscribedProducts, currentSelectedSubscribedProduct]);
    
    
    
      const cancelSubscription = async () => {
        const header = {
          'Authorization': `Bearer ${token}`,
        };
        try {
          const response = await axios.post(`http://${ip}:5454/api/${currentSelectedSubscribedProduct}/cancel`,null, { headers: header });
        } catch (error) {
          console.log('Error fetching profile:', error);
          // Handle the error as needed
        }
      };
      const handleCancelPress = () => {
        Alert.alert(
          'Cancel Subscription',
          'Do you want to cancel your subscription?',
          [
            {
              text: 'No',
              style: 'cancel'
            },
            {
              text: 'Yes',
              onPress: () => cancelSubscription() // Call cancelSubscription if user selects 'Yes'
            }
          ]
        );
      };
    
      const handlePauseSubscription = () => {
        Alert.alert(
          "Pause Subscription",
          "Would you like to pause your subscription?",
          [
            {
              text: "No",
              onPress: () => console.log("Subscription not paused"),
              style: "cancel"
            },
            { text: "Yes", onPress: () => giveErrorPress() }
          ]
        );
      };
    
    
      function formatDeliveryTime(deliveryTime) {
        // Splitting the delivery time into hours, minutes, and seconds
        const [hours, minutes, seconds] = deliveryTime.split(':');
        
        // Creating a new Date object to work with time
        const deliveryDate = new Date();
        deliveryDate.setHours(hours);
        deliveryDate.setMinutes(minutes);
        deliveryDate.setSeconds(seconds);
      
        // Getting hours and minutes in 12-hour format
        let hour = deliveryDate.getHours();
        const minute = deliveryDate.getMinutes();
        const ampm = hour >= 12 ? 'PM' : 'AM';
        hour = hour % 12 || 12;
      
        // Constructing the time range (assuming delivery takes 1 hour)
        const startTime = `${hour}:${minute < 10 ? '0' : ''}${minute} ${ampm}`;
        deliveryDate.setHours(deliveryDate.getHours() + 1);
        const endHour = deliveryDate.getHours();
        const endMinute = deliveryDate.getMinutes();
        const endAmpm = endHour >= 12 ? 'PM' : 'AM';
        const endTime = `${endHour % 12 || 12}:${endMinute < 10 ? '0' : ''}${endMinute} ${endAmpm}`;
      
        return `${startTime} - ${endTime}`;
      }
    
      const [sortModalVisible, setSortModalVisible] = useState(false);    
      const handleSortModalClose = () => {
        // Additional logic to handle sorting or other actions
          setSortModalVisible(false);
      };
      const giveErrorPress = () => {
        setSortModalVisible(true);
      };       
    
  return (
    <View style={{flex:1,backgroundColor:'white'}}>
    <TouchableOpacity style={{margin:'3%'}} onPress={()=>{forNavigate('mainHome')}}>
        <Image source={{ uri: 'https://shorturl.at/ckGU2' }} style={{height:100,width:100}}/>
     </TouchableOpacity>
     <View style={styles.backBtn}>
      <TouchableOpacity onPress={() => popFromStack(navigation)}>
        <View style={styles.backBtn}>
             <Image source={back} style={{ marginLeft: 12 }} />
            <Text style={{ color: 'black',marginLeft:'3%'}}>Subscribed Item</Text>
        </View>          
      </TouchableOpacity>
     </View>

     <Text style={styles.mainHeading1}>Subscription : 
     {
  allSubscribedProducts.map((item, index) => (
    <>
      {
        item.id === currentSelectedSubscribedProduct && (
          <>
            <Text style={styles.mainHeading}> {item.type.charAt(0).toUpperCase() + item.type.slice(1).toLowerCase()}</Text>
          </>
        )
      }  
    </>
  ))
}
    </Text>

     <View style={styles.productContainer}>
     <View style={{flexDirection:'row',marginLeft:'5%'}}>
{
  allSubscribedProducts.map((item, index) => (
    <View key={index} style={{marginTop:'4%'}}>
      {
        item.id === currentSelectedSubscribedProduct && item.product && (
          <View style={{flexDirection:'row',justifyContent:'space-between',margin:'1%'}}>
            <View style={{width:140,height:150}}>
             <Image source={{ uri: item.product.imageUrl[0] }} style={{width: 120, height: 120}} />
            </View>  
            <View style={{width:250}}>
            <Text  style={styles.productBrand}>{item.product.brand}</Text>
            <Text style={styles.productTitle}>{item.product.title}</Text>
            <Text style={styles.productQuantity}>{item.product.quantity} ml</Text>
            <Text style={styles.productQuantity}>
              <Text style={{color:'grey',fontSize:12,margin:'0.5%',fontWeight:'700'}}> QTY : </Text>
              1 </Text>
            <Text style={styles.productPrice}>
              <Text style={{color:'grey',fontSize:12,margin:'0.5%',fontWeight:'700'}}> MRP : </Text>
               ₹{item.product.discountedPrice} / <Text style={{color: 'grey', textDecorationLine: 'line-through'}}>₹{item.product.price}</Text></Text>
               <Text style={styles.productPrice}>
              <Text style={{color:'grey',fontSize:12,margin:'0.5%',fontWeight:'700'}}> Delivery Slot : </Text>
               {formatDeliveryTime(item.deliveryTime)}</Text>                
            </View>    
            {/* Add more information you want to display */}

          </View>
        )
      }
    </View>
  ))
}
</View>

  </View>
  <View>
<Text style={styles.subscribeDates}>Subscribed Dates</Text>
{allSubscribedProducts.map((item, index) => (
  <View key={index} style={{  }}>
    {item.id === currentSelectedSubscribedProduct && item.product && (
      <>
          <View style={styles.container}>
          {numbers.map((number, index) => (
      <TouchableOpacity
        key={index}
        style={[
          styles.number,
          selectedNumbers.includes(number) ? styles.selected : styles.unselected,
        ]}
        onPress={() => handleNumberPress(number)}
      >
        <Text style={[styles.numberText, selectedNumbers.includes(number) ? styles.selectedText : styles.unselectedText]}>{number}</Text>
      </TouchableOpacity>
    ))}
    </View>
      </>
    )}

  </View>
))}
</View>
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
                {/* <View style={{ width: '100%', borderBottomWidth: 0.8, borderColor: '#dbd9d9',marginTop:'1%' }}></View> */}
                <Text style={styles.popUpText}>Would you prefer to suspend your milk subscription indefinitely or specify particular dates for the pause?
                </Text>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal> 

  </View>
  )
}

export default ExtendSubscription

const styles = StyleSheet.create({
    backBtn:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
      },
      mainHeading1:{
        fontWeight:'500',
        marginLeft:'5%',
        marginTop:'5%',
        fontSize:13
      },
      mainHeading:{
        color:'black',
        fontWeight:'500',
        marginLeft:'4%',
        marginTop:'5%',
        fontSize:13
      },

      productHeading:{
        color:'black',
        fontWeight:'600',
        margn:'3%'

      },
      productHeading1:{
        color:'grey',
        fontWeight:'400',
        fontSize:12
      },
      productDescription:{
        color:'black',
        fontWeight:'300'
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
        marginTop: '5%',
        padding:'2%'
  
      },
      number: {
        margin: 5,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        backgroundColor: '#D3D3D3', // Default background color
      },
      selected: {
        backgroundColor: 'rgba(0, 51, 141, 0.8)', // Change the background color when selected
      },
      unselected: {
        backgroundColor: '#e8e8e8', // Change the background color for non-selected tiles
      },
      numberText: {
        fontSize: 16,
        color: 'black', // Default text color
      },
      selectedText: {
        color: 'white', // Set text color to white for selected numbers
      },
      unselectedText: {
        color: 'grey', // Set text color to black for non-selected numbers
      },
      cancel:{
        backgroundColor:'#DD0019',
        width:150,
        marginTop:'4%',
        padding:'4%',
        margin:'3%',
        borderRadius:12
      },
      cancelText:{
        color:'white',
        textAlign:'center',
        fontWeight:'700',
        fontSize:14
      },
      break:{
        backgroundColor:'#00338D',
        width:150,
        marginTop:'4%',
        padding:'4%',
        margin:'3%',
        borderRadius:12
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
      subscribeDates:{
        color:'black',marginLeft:'3%',fontWeight:'500'
      },
      modalContainer1:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      modalContent1:{
        width: '90%',
        height: '26%',
        marginTop:'-52%',
        backgroundColor: 'white',
        padding: 20,
        bottom:0,
        position:'fixed',
        borderRadius: 10,
        backgroundColor:'white',
      },
      popUpBtn:{
        flexDirection:'row',
        justifyContent:'space-between',
        width:340,height:40,
        marginTop:'5%'
      },
      popUpText:{
        textAlign:'center',fontSize:16,color:'#363434',margin:'4%',fontWeight:'400'
      },
      popPauseBtn:{
        width:'30%',height:'100%',borderWidth:0.8,borderColor:'#00338D',borderRadius:12
      },
      popPauseText:{
        textAlign:'center',margin:'10%',color:'#00338D',fontWeight:'500'
      }
})