import { StyleSheet, Text, View ,Image, ScrollView,TouchableOpacity,Platform, Animated, Easing,} from 'react-native'
import React,{useState,useEffect,Component } from 'react'
import loyalback from '../PlpScreen/images/Loyaltywall.png'
import kpmg from '../PlpScreen/kpmglogo.png';
import crown from '../PlpScreen/images/crown.png';
import coin from '../PlpScreen/images/coin.png';
import LinearGradient from 'react-native-linear-gradient';
import Slider from '@react-native-community/slider';
import membership from '../PlpScreen/images/membership.png'
import gift from '../PlpScreen/images/gift1.png'
import  coin1 from '../PlpScreen/images/coin1.png'
import  star1 from '../PlpScreen/images/star3.png';
import  star2 from '../PlpScreen/images/star4.png';
import  star3 from '../PlpScreen/images/star5.png';
import  downArrow from '../PlpScreen/images/downarrow.png';
import { useLoginContext } from '../Login/LoginCartProvider';
import { useCartContext } from '../Context/WomenContext';
import axios from 'axios';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
const Tab = createMaterialTopTabNavigator();
import nextArrow from '../PlpScreen/images/next.png';
import back from '../PlpScreen/images/back1.png'

const LoyaltyHome = ({navigation}) => {
  const { availablePoints,setAvailablePoints,
    userLoyaltyTier,setUserLoyaltyTier}=useCartContext();
  const {ip,token,popFromStack,pushToStack,
    currentPage, setCurrentPage,
    currentPageIndex,setCurrentPageIndex,
    currentPageIndexCategory,setCurrentPageIndexCategory,
    currentPageIndexCategory1,setCurrentPageIndexCategory1,loginUserId,userName,setUserName}=useLoginContext();  

  const [flag, setFlag] = useState(true);
  const [sliderValue, setSliderValue] = useState(0);
  const minValue = 550;
  const maxValue = 1500;
  const pointValue = 1000; // The point to fill the slider until

  useEffect(() => {
    if (flag) {
      // Calculate the slider value based on the point value
      const calculatedSliderValue = (pointValue - minValue) / (maxValue - minValue);
      setSliderValue(calculatedSliderValue);
    } else {
      // Reset the slider value to minimum when flag becomes false
      setSliderValue(0);
    }
  }, [flag]);

  const currentValue = Math.round(minValue + (maxValue - minValue) * sliderValue);


    
const forNavigate=(page)=>{
    console.log(page+" "+currentPage[currentPage.length-1]);
    if(currentPage && currentPage[currentPage.length-1]!==page){
      pushToStack(page);
      navigation.navigate(page)
    }else{
      popFromStack(navigation);
    }
  } 


 //get all available points & Tier

 async function getAvailablePoints(){
  const header = {
    'Authorization': `Bearer ${token}`,
  };

  try {
    const response = await axios.get(`http://${ip}:5454/api/rewards/user/${loginUserId}/redeemed-points`, { headers: header });
    setAvailablePoints(response.data);
  } catch (error) {
    console.log('Error fetching profile:', error);
  }
}

 async function getUserTier(){
  const header = {
    'Authorization': `Bearer ${token}`,
  };

  try {
    const response = await axios.get(`http://${ip}:5454/api/tiers/${loginUserId}`, { headers: header });
    setUserLoyaltyTier(response.data);
  } catch (error) {
    console.log('Error fetching profile:', error);
  }
}

const formattedTier = userLoyaltyTier ? userLoyaltyTier.charAt(0).toUpperCase() + userLoyaltyTier.slice(1).toLowerCase() : '';

useEffect(()=>{
  getAvailablePoints();
  getUserTier();
},[availablePoints]);

// getMemberShip Status
 const [MemberShipStatusDate,setMemberShipStatusDate]=useState("");
 const date = new Date(MemberShipStatusDate);
 // Format the date as "01 April, 2024"
const formattedDate = date.toLocaleDateString('en-US', {
  day: '2-digit',
  month: 'long',
  year: 'numeric'
});
 async function getMemberShipStatus(){
  const header = {
    'Authorization': `Bearer ${token}`,
  };

  try {
    const response = await axios.get(`http://${ip}:5454/api/users/profile`, { headers: header });
    setMemberShipStatusDate(response.data.membershipStartDate);
    setUserName(response.data.firstName);
  }catch(error){
    console.log('Error fetching profile:', error);
  }
 }
 useEffect(()=>{
  getMemberShipStatus();
 },[MemberShipStatusDate]);

function FAQS(){
  return(<>
    <View style={{backgroundColor:'white'}}>
      <TouchableOpacity style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',alignContent:'center'}}
       onPress={()=>{forNavigate('allLoyaltyInfo')}}>
        <Text style={{marginTop:'6%',marginLeft:'4%',color:'black'}}>What are the benefits of each tier?</Text>
        <Image source={nextArrow} style={{width:10,height:10,marginTop:'6%',marginRight:'4%'}}/>
      </TouchableOpacity>
      <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',alignContent:'center'}}>
        <Text style={{marginTop:'4%',marginLeft:'4%',color:'black'}}>How do I move to the next tier?</Text>
        <Image source={nextArrow} style={{width:10,height:10,marginTop:'6%',marginRight:'4%'}}/>
      </View>
      <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',alignContent:'center'}}>
        <Text style={{marginTop:'4%',marginLeft:'4%',color:'black',marginBottom:'8%'}}>How do I use my reward points? </Text>
        <Image source={nextArrow} style={{width:10,height:10,marginRight:'4%',}}/>
      </View>
    </View>
  </>);
}
function TermsConditions(){
  return(<>
    <View style={{width:'100%',marginLeft:'4%',flex:1,backgroundColor:'white'}}>
      <ScrollView>

      <View style={{flexDirection:'row',alignItems:'center'}}>
         <View style={{width:6,height:6,backgroundColor:'black',borderRadius:13}}/>
         <View style={{marginTop:'2%',marginLeft:'2%',marginRight:'4%'}}>
          <Text style={{fontSize:12}}><Text style={{color:'black'}}>Membership Eligibility:</Text> Membership to the Loyalty Program   is open to all customers of Customer & Loyalty App who   meet the eligibility criteria outlined in our program   guidelines.</Text>
         </View>
      </View>
      <View style={{flexDirection:'row',alignItems:'center'}}>
         <View style={{width:6,height:6,backgroundColor:'black',borderRadius:13}}/>
         <View style={{marginTop:'1%',marginLeft:'2%',marginRight:'6%'}}>
          <Text style={{fontSize:12}}><Text style={{color:'black'}}>Governing Law:</Text> These terms and conditions shall be governed by and construed in accordance with the laws of [Jurisdiction], without regard to its conflict of law provisions.</Text>
         </View>
      </View>
      <View style={{flexDirection:'row',alignItems:'center',marginBottom:'1%'}}>
         <View style={{width:6,height:6,backgroundColor:'black',borderRadius:13}}/>
         <View style={{marginTop:'1%',marginLeft:'2%',marginRight:'6%'}}>
          <Text style={{fontSize:12}}><Text style={{color:'black'}}>Enrollment:</Text> Customers can enroll in the Loyalty Program by creating an account on Customer & Loyalty App and opting into the program during the registration process.</Text>
         </View>
      </View>
      <View style={{marginTop:'12%'}}>

      </View>
      </ScrollView>

    </View>  
  </>);
}



  return (
    <View style={{flex:1,backgroundColor:'white'}}>
      <ScrollView>
        
      <View>
       <Image source={loyalback} style={{width:'100%',height:430,position:'relative'}}/>
       <TouchableOpacity style={{ position: 'absolute', top: '8%', left: '4%' }}
        onPress={()=>{popFromStack(navigation)}}
        >
               <Image source={back} style={{ width: 25, height: 16,}} />

        </TouchableOpacity>
       {/* <Image source={back} style={{position:'absolute',marginLeft:'19%',marginTop:"20%",width:1,height:1}}/> */}
       
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', position: 'absolute', top: '50%', left: '34%', marginLeft: -50, marginTop: -100,}}>       
 
          <View style={{height:135,width:250,backgroundColor:'white',borderRadius:12}}>
          <Image source={kpmg} style={{position:'absolute',width:100,height:40,margin:'10%',marginTop:'3%',marginLeft:'20%'}}/>
           <Text style={{textAlign:'center',color:'#00338D',fontWeight:'700',marginTop:'30%',fontSize:20}}>RETAIL {'\n'}<Text>LOYALTY PROGRAM</Text></Text>
          </View>
        </View> 
        </View>
        <LinearGradient colors={['#00338D', '#00A3A1']} style={{width:'100%',height:380,marginTop:'-8%',borderTopLeftRadius:32,borderTopRightRadius:32}}>
      <View style={{width:190,height:190,borderRadius:90,alignSelf:'center',marginTop:'-20%',backgroundColor:'white',borderColor:'#00A3A1',borderWidth:3}}>
        <Image source={crown} style={{width:30,height:30,alignSelf:'center',marginTop:'10%',borderWidth:1}}/>   
        <Text style={{textAlign:'center',color:'#CA2127',fontSize:20,fontWeight:'600'}}>{userLoyaltyTier && <Text>{formattedTier}</Text>} Tier</Text>        
        <View style={{flexDirection:"row",alignItems:'center',alignContent:'center',marginTop:'4%'}}>
          <Image source={coin} style={{width:40,height:40,marginLeft:'18%',}}/>
          <Text style={{fontSize:34,marginLeft:'8%',fontWeight:'700',color:'#00338D'}}>{availablePoints}</Text>
        </View>
        <Text style={{textAlign:'center',color:'#00A3A1',fontSize:13,fontWeight:'500',marginTop:'7%'}}>Available Points{'\n'} to redeem</Text>
      </View>
      <Text style={{textAlign:'center',color:'white',marginTop:'3%',fontSize:18}}>Congratulations! {userName}</Text>

     <View style={{flexDirection:'row',marginLeft:'14%',marginTop:'3%'}}>
     <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
      {/* <View style={{ width: 25, height: 25, borderRadius: 50, backgroundColor: 'green',marginRight:'-4%' }}/>
      <Slider
        style={{ width: 150, height: 40 ,marginLeft:'-4%'}}
        minimumValue={minValue}
        maximumValue={maxValue}
        minimumTrackTintColor="#8f171b"
        maximumTrackTintColor="white"
        value={currentValue}
        onValueChange={(value) => setSliderValue((value - minValue) / (maxValue - minValue))} // Allow manual adjustment of the slider
      /> */}
      {/* <Text style={{ textAlign: 'center' }}>Current Value: {currentValue}</Text> */}

    </View>     
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center',marginLeft:'-14%' }}>
      {/* <View style={{ width: 25, height: 25, borderRadius: 50, backgroundColor: '#ebac46',marginLeft:'16%' }}/>
      <Slider
        style={{ width: 150, height: 40,marginRight:'4%'}}
        minimumValue={minValue}
        maximumValue={maxValue}
        minimumTrackTintColor="#8f171b"
        maximumTrackTintColor="white"
        value={currentValue}
        onValueChange={(value) => setSliderValue((value - minValue) / (maxValue - minValue))} // Allow manual adjustment of the slider
      />
      <View style={{ width: 25, height: 25, borderRadius: 50, backgroundColor: 'grey',marginLeft:'-10%' }}/> */}
      {/* <Text style={{ textAlign: 'center' }}>Current Value: {currentValue}</Text> */}
    </View>      
     </View>
     {
      userLoyaltyTier==='PLATINUM' && 
      <Text style={{color:'white',fontSize:13,textAlign:'center',fontWeight:'300'}}>You are Platinum Member</Text>
     }
     {
      userLoyaltyTier==='GOLD' &&
      <Text style={{color:'white',fontSize:13,textAlign:'center',fontWeight:'300'}}>You are {5000-availablePoints} points away to become Platinum Member</Text>
     }
     {
      userLoyaltyTier==='SILVER' &&
      <Text style={{color:'white',fontSize:13,textAlign:'center',fontWeight:'300'}}>You are {3000-availablePoints} points away to become Gold Member</Text>
     }

     <TouchableOpacity style={{backgroundColor:'white',width:'20%',padding:'0.8%',borderRadius:12,alignSelf:'center',marginTop:'4%'}}
      onPress={()=>{forNavigate('allLoyaltyInfo')}}>
      <Text style={{color:'#00338D',textAlign:'center',fontWeight:'500'}}>Know more</Text>
     </TouchableOpacity>
     <View style={{flexDirection:'row',justifyContent:'space-around',marginTop:'14%'}}>
      <TouchableOpacity style={{backgroundColor:'white',borderRadius:4}}
        onPress={()=>{forNavigate('redeemPoint')}}>
        <Text style={{color:'#8f171b',padding:'1.5%',fontWeight:'500'}}>Redeem Points</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{backgroundColor:'white',borderRadius:4}}
       onPress={()=>{forNavigate('rewardHistory')}}>
        <Text style={{color:'#8f171b',padding:'1.5%',fontWeight:'500'}}>Reward History</Text>
      </TouchableOpacity>
     </View>
    </LinearGradient>
    <View style={{
  flexDirection: 'row',
  borderWidth:0.4,
  borderColor:'grey',
  width: '90%',
  height: 110,
  marginTop: '4%',
  alignSelf: 'center',
  borderRadius: 12,
  backgroundColor: 'white', // Add a background color for iOS shadow effect
  ...Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
    },
    android: {
      elevation: 5,
    },
  })
}}>
  <View style={{ width: '50%' }}>
    <Text style={{ fontSize: 14, margin: '4%', marginLeft: '14%', fontWeight: '400', color: '#00338D' }}>MEMBERSHIP STATUS</Text>
    <Text style={{ fontSize: 14, margin: '4%', marginLeft: '14%', fontWeight: '400', color: '#00338D' }}>{formattedTier} Tier Member {'\n'}Since
    <Text style={{ fontWeight: '500'}}> {formattedDate}</Text>
    </Text>

  </View>
  <View style={{ width: '48%' }}>
    <Image source={membership} style={{ width: '103%', height: 105, borderTopRightRadius: 10, borderBottomRightRadius: 10 }} />
  </View>
</View>
<View style={{
  width: '90%',
  borderWidth: 0.4,
  borderColor: 'grey',
  height: 110,
  marginTop: '4%',
  alignSelf: 'center',
  borderRadius: 12,
  backgroundColor: 'white', // Add a background color for iOS shadow effect
  ...Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
    },
    android: {
      elevation: 5,
    },
  }),
}}>
  <Text style={{ fontSize: 14, margin: '4%', textAlign: 'center', color: '#00338D', fontSize: 15, fontWeight: '500' }}>Point Usage</Text>
  
  <Text style={{ color: '#CA2127', textAlign: 'center' }}>Your <Text style={{ fontWeight: '500' }}>200 Points</Text> will expire next month.</Text>
  
  <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
    <Text style={{ color: '#CA2127' }}>Hurry!</Text>
    <TouchableOpacity onPress={()=>{forNavigate('redeemPoint')}}>
      <Text style={{ textDecorationLine: 'underline', color: '#CA2127' }}> Use now</Text>
    </TouchableOpacity>
  </View>
</View>
   <Text style={{marginTop:'7%',marginLeft:'4%',color:'#00338D',fontWeight:'500',fontSize:15}}>Tier Benefits</Text>
   <LinearGradient colors={['#00338D', '#00A3A1']} style={{width:'100%',height:75,marginTop:'5%',borderRadius:12,}}>
    <View style={{flexDirection:'row',justifyContent:'space-around',margin:'5%'}}>
      <Image source={coin1} style={{width:40,height:40}}/>
      <Text style={{color:'white',textAlign:'center',fontSize:16,marginLeft:'5%'}}>Upto 2x Reward Point on every {'\n'} purchase made</Text>
    </View>
   </LinearGradient> 
   <LinearGradient colors={['#00338D', '#00A3A1']} style={{width:'100%',height:75,marginTop:'5%',borderRadius:12,}}>
    <View style={{flexDirection:'row',justifyContent:'space-around',margin:'5%'}}>
      <Image source={gift} style={{width:40,height:40}}/>
      <Text style={{color:'white',textAlign:'center',fontSize:16,marginLeft:'5%'}}>Get a gift for shopping in your{'\n'} birthday month</Text>
    </View>
   </LinearGradient> 
   <TouchableOpacity>
    <Text style={{textDecorationLine:'underline',color:'#00338D',textAlign:'center',margin:'3%',fontWeight:'400'}}>View all benefits</Text>
   </TouchableOpacity>
   
     <View style={{marginTop:'4%'}}>
       <View>
          <View style={{flexDirection:'row',justifyContent:"space-between",marginLeft:'5%'}}>
              <View style={{flexDirection:'row',}}>
                <Image source={star1} style={{width:20,height:20}}/>
                <Text style={{fontSize:17,fontWeight:'500',color:'#969393',marginLeft:'14%'}}>Silver Tier</Text>
              </View>

              <TouchableOpacity>
                 <Image source={downArrow} style={{width:10,height:14,marginRight:'4%'}}/>
              </TouchableOpacity>
          </View>
          <View style={{ height: 0.2, backgroundColor: 'grey' }} />
          <View style={{marginLeft:'15%'}}>
           <Text style={{fontWeight:'400',color:'#c2c0c0'}}>
             By registering to KPMG Retail App, you {'\n'}become eligible for the benefits of Silver{'\n'}
             <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                <Text style={{color:'#c2c0c0'}}>tier</Text>
                <TouchableOpacity onPress={()=>{forNavigate('silverTier')}}>
                   <Text style={{textDecorationLine:'underline',fontWeight:'500',color:'#00A3A1'}}>  Know more</Text>
                </TouchableOpacity>
             </View>
           </Text>
          </View>
       </View>
     </View>

     <View style={{marginTop:'4%'}}>
       <View>
          <View style={{flexDirection:'row',justifyContent:"space-between",marginLeft:'5%'}}>
              <View style={{flexDirection:'row',}}>
                <Image source={star2} style={{width:20,height:20}}/>
                <Text style={{fontSize:17,fontWeight:'500',color:'#d1bb47',marginLeft:'14%'}}>Gold Tier</Text>
              </View>

              <TouchableOpacity>
                 <Image source={downArrow} style={{width:10,height:14,marginRight:'4%'}}/>
              </TouchableOpacity>
          </View>
          <View style={{ height: 0.5, backgroundColor: 'grey' }} />
          <View style={{marginLeft:'15%'}}>
           <Text style={{fontWeight:'400',color:'#c2c0c0'}}>
             Spend above <Text>1001 to 2,999 </Text>in the last {'\n'}12 months to enjoy the Gold Tier Member {'\n'}
             <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                <Text style={{color:'#c2c0c0'}}>benefits</Text>
                <TouchableOpacity onPress={()=>{forNavigate('goldTier')}}>
                   <Text style={{textDecorationLine:'underline',fontWeight:'500',color:'#00A3A1'}}>  Know more</Text>
                </TouchableOpacity>
             </View>
           </Text>
          </View>
       </View>
     </View>

     <View style={{marginTop:'4%'}}>
       <View>
          <View style={{flexDirection:'row',justifyContent:"space-between",marginLeft:'5%'}}>
              <View style={{flexDirection:'row',}}>
                <Image source={star3} style={{width:20,height:20}}/>
                <Text style={{fontSize:17,fontWeight:'500',color:'#847276',marginLeft:'14%'}}>Platinum Tier</Text>
              </View>

              <TouchableOpacity>
                 <Image source={downArrow} style={{width:10,height:14,marginRight:'4%'}}/>
              </TouchableOpacity>
          </View>
          <View style={{ height: 0.3, backgroundColor: 'grey' }} />
          <View style={{marginLeft:'15%'}}>
           <Text style={{fontWeight:'400',color:'#c2c0c0'}}>
             Spend above <Text>4,999 </Text>in the last 12 months{'\n'}to enjoy the Platinum Tier Member{'\n'}
             <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                <Text style={{color:'#c2c0c0'}}>benefits</Text>
                <TouchableOpacity onPress={()=>{forNavigate('platinumTier')}}>
                   <Text style={{textDecorationLine:'underline',fontWeight:'500',color:'#00A3A1'}}>  Know more</Text>
                </TouchableOpacity>
             </View>
           </Text>
          </View>
       </View>
     </View>


   <View style={{marginTop:'4%'}}>

   </View>
    <View style={{marginTop:'4%',width:'100%',height:210,backgroundColor:'white'}}>
    <Tab.Navigator
  initialRouteName="FAQS"
  screenOptions={{
    tabBarActiveTintColor: '#00338D',
    tabBarInactiveTintColor: 'grey',
    tabBarLabelStyle: { fontSize: 12 },
    tabBarLabelStyle: {
      fontWeight: 'bold', // Make the font bold for the selected tab
    }
  }}

>
  <Tab.Screen
    name="Earned"
    component={FAQS}
    options={{ tabBarLabel: 'FAQs' }}
  />
  <Tab.Screen
    name="Used"
    component={TermsConditions}
    options={{ tabBarLabel: 'Terms & Conditions' }}
  />
</Tab.Navigator>
      
    </View>    
  </ScrollView>
 


   </View>
  )
}

export default LoyaltyHome

const styles = StyleSheet.create({})