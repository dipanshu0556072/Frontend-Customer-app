
import { StyleSheet, Text, View,ScrollView,TouchableOpacity,Image} from 'react-native'
import React,{useEffect,useState} from 'react'
import { useLoginContext } from '../Login/LoginCartProvider';
import { useCartContext } from '../Context/WomenContext';
import axios from 'axios';
import StarRating from '../StarRating';
import star1 from '../star1.png';
import confirmOrder from '../PlpScreen/images/confirmOrder.png';

const ShopTrack = ({navigation}) => {

   const{selectedAddress,allSavedAddress,orderItemPrice,placedOrder,setPlacedOrder,
         trackCurrentOrder,setTrackCurrentOrder,
         trackCurrentOrderId,setTrackCurrentOrderId,totalAmount,filteredData,
         selectedStorePickupDay,selectedStorePickupTime}=useCartContext();
   
   const {ip,token,popFromStack,pushToStack,
          currentPage, setCurrentPage,
          currentPageIndex,setCurrentPageIndex,
          currentPageIndexCategory,setCurrentPageIndexCategory,updateUserName,setUpdateUserName,}=useLoginContext(); 
     
          const forNavigate=(page)=>{
            if(page==='mainHome'){
             setCurrentPage('mainHome');
             navigation.navigate('mainHome');
            }else{
              console.log(page+" "+currentPage[currentPage.length-1]);
              if(currentPage && currentPage[currentPage.length-1]!==page){
                setCurrentPage('mainHome');
                navigation.navigate(page)
              }else{
                popFromStack(navigation);
              }  
            }
  
          }
    
    const [loading, setLoading] = useState(true);


    const [feedbackRating, setFeedbackRating] = useState(0);

    const handleFeedbackRatingChange = (newRating) => {
      setFeedbackRating(newRating);
    };

    const getData = async () => {
      let profileData;
      try {
        const response = await axios.get(`http://${ip}:5454/api/users/profile`, {
          headers: {
            'Authorization': `Bearer ${token}`,         
          },
        });
        profileData=response.data;
        // Handle the response data

        // setMobile(profileData.mobile);
        // setUserName(profileData.firstName +" "+profileData.lastName);
        // console.log(JSON.stringify("Profile:"+JSON.stringify(response.data.mobile))+"\n"+JSON.stringify(userprofile.mobile));
  
        setUpdateUserName(profileData.firstName + (profileData.lastName ? ` ${profileData.lastName}` : ''));
      } catch (error) {
        // Handle errors
        console.error('Error fetching data:', error);
      }
    }
 
    //get current ordered Id
    const [orderIdToFetch,setOrderIdToFetch]=useState("");
    
   

    let totalQuantity = 0;
totalQuantity = (trackCurrentOrder && trackCurrentOrder.orderItems && trackCurrentOrder.orderItems.length) ? (
  trackCurrentOrder.orderItems.reduce(
    (accumulator, orderItem) => accumulator + (orderItem?.quantity || 0),
    0
  )
) : 0;

    
 
  
console.log(JSON.stringify(trackCurrentOrder));


useEffect(()=>{
 getData();
},[token]);
return (
  <View style={{flex:1,backgroundColor:'white'}}>
    {/* <Text>{trackCurrentOrderId}</Text> */}
   
  <TouchableOpacity onPress={() => {forNavigate('mainHome')}}>
      <Image
        source={{ uri: 'https://shorturl.at/ckGU2' }}
        style={{ width: 100, height: 100, marginLeft: '4%' }}
      />
    </TouchableOpacity>

      <ScrollView showsVerticalScrollIndicator={false}>

      
       
      
        <View style={{backgroundColor:'#00338D',padding:'6%'}}>
          <Text style={{fontSize:24,textAlign:'center',color:'white',fontWeight:'700'}}>Thank You {'\n'}for Shopping with us</Text>
          <Text style={{color:'white',textAlign:'center',marginTop:'6%',fontWeight:'400',fontSize:16,marginBottom:'-3%'}}>We've received your order</Text>
        </View>
        <View style={{flexDirection:'row',justifyContent:'space-between',height:50,width:414,alignItems:'center',borderWidth:0.2,marginTop:'3%',borderColor:'grey'}}>

          <TouchableOpacity style={{width:'50%',padding:'3%'}} onPress={()=>{forNavigate('mainHome')}}>
              <Text style={{color:'#00A3A1',fontSize:16}}>CONTINUE SHOPPING</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{width:'50%',borderLeftWidth:0.2,borderColor:'grey',height:50}}
           onPress={()=>{navigation.navigate('pdf')}}>
              <Text style={{color:'#00A3A1',marginLeft:'34%',padding:'8%',fontSize:16}}>RATE US</Text>
          </TouchableOpacity>

        </View>
     

      <View style={styles.confirmOrderBox}>
         <Image source={confirmOrder} style={styles.confirmOrderImage}/>
         <Text style={styles.confirmOrderUserNameText1}>Hey {updateUserName},</Text>
         <Text style={styles.confirmOrderUserNameText2}>Your Order is Confirmed!</Text>
         <Text style={styles.confirmOrderUserNameText3}>We'll send you a shipping confirmation email{'\n'}as soon as your order ships.</Text>
      </View>
      <TouchableOpacity style={styles.checkOrderStatusBtn} onPress={()=>{forNavigate('order')}}>
        <Text style={styles.checkOrderStatusBtnText}>CHECK STATUS</Text>
      </TouchableOpacity>


  <View style={{ backgroundColor: '#00338D', height: 0.3, marginTop: '4%'  }} />
  <View style={{ height: 8, backgroundColor: '#f7f5f5'}} />

  <View style={{ alignItems: 'flex-start', justifyContent: 'center', padding: '1%',marginLeft:'4%' }}>
    <Text style={{ color: 'black', fontSize: 16,padding:'1%',fontWeight:'500' }}>
      Rate your Experience
    </Text>
  </View>
  <Text style={{marginLeft:'6%',fontSize:16}}>How was your Overall Shopping Experience?</Text>
  <View style={{padding:'4%'}}>
   <View style={{flexDirection:'row',marginLeft:'18%'}}>
   <Image source={star1} style={{width:40,height:40}}/>
   <Image source={star1} style={{width:40,height:40}}/>
   <Image source={star1} style={{width:40,height:40}}/>
   <Image source={star1} style={{width:40,height:40}}/>
   <Image source={star1} style={{width:40,height:40}}/>
   </View>
  </View>
  <View style={{ backgroundColor: '#00338D', height: 0.3, marginTop: '4%'  }} />
  <View style={{ height: 8, backgroundColor: '#f7f5f5'}} />

   </ScrollView>
  </View>
)
}

export default ShopTrack

const styles = StyleSheet.create({
  confirmOrderBox:{
    margin:'4%'
  },
  confirmOrderImage:{
    margin:'7%',
    alignSelf:'center',
    width:70,
    height:70
  },
  confirmOrderUserNameText1:{
    fontWeight:'500',
    fontSize:16,
    alignSelf:'center',
    marginTop:'-3%',
    color:'rgba(0,0,0,0.7)'
  },
  confirmOrderUserNameText2:{
    fontWeight:'700',
    fontSize:23,
    alignSelf:'center',
    color:'rgba(0,0,0,1)',
    marginTop:'4%'
  },
  confirmOrderUserNameText3:{
    fontWeight:'500',
    fontSize:15,
    alignSelf:'center',
    marginTop:'2%',
    color:'rgba(0,0,0,0.7)',
    textAlign:'center'
  },
  checkOrderStatusBtn:{
    backgroundColor:'#00338D',
    alignSelf:'center',
    padding:'3.5%',
    width:200,
    marginTop:'4%'
  },
  checkOrderStatusBtnText:{
   color:'white',
   fontWeight:'700',
   textAlign:'center',
   fontSize:14
  }
})
