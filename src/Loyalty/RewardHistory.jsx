import { ScrollView, StyleSheet, Text, View,Image,TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import kpmg from '../PlpScreen/images/kpmg.png';
import back from '../PlpScreen/images/back.png';
import { useLoginContext } from '../Login/LoginCartProvider';
import LinearGradient from 'react-native-linear-gradient';
import  coin1 from '../PlpScreen/images/coin1.png'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import axios from 'axios';
import { NavigationContainer } from '@react-navigation/native';
import { useCartContext } from '../Context/WomenContext';
import { json } from 'react-router-dom';

const Tab = createMaterialTopTabNavigator();

const RewardHistory = ({navigation}) => {
    const {userLoyaltyTier,availablePoints,
           getRewardHistoryPoint,setGetRewardHistoryPoint,
           getRewardHistoryUsedPoint,setGetRewardHistoryUsedPoint}=useCartContext();
    const {ip,token,popFromStack,pushToStack,
        currentPage, setCurrentPage,userName,
        currentPageIndex,setCurrentPageIndex,
        currentPageIndexCategory,setCurrentPageIndexCategory,
        currentPageIndexCategory1,setCurrentPageIndexCategory1,loginUserId}=useLoginContext();  

 const [burnedDate,setBurnedDate]=useState("");
 const formatDate = (inputDate) => {
  // Convert the input string into a Date object
  const date = new Date(inputDate);

  // Extract day, month, and year
  const day = date.getDate();
  const month = date.getMonth() + 1; // Months are zero indexed
  const year = date.getFullYear();

  // Add leading zeros if necessary
  const formattedDay = String(day).padStart(2, '0');
  const formattedMonth = String(month).padStart(2, '0');

  // Format the date as DD/MM/YYYY
  return `${formattedDay}/${formattedMonth}/${year}`;
};


 const Earned = () => {
            return (
              <View style={{width:'100%',height:'100%',backgroundColor:'white'}}>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                    <Text style={{margin:'4%',color:'#a19f9f',fontWeight:'800'}}>Transaction Type</Text>
                    <Text style={{margin:'4%',fontWeight:'800',color:'#a19f9f'}}>Points Earned</Text>
                </View>
                <View style={{backgroundColor:'#ededed',height:5}}/>

                {
  getRewardHistoryPoint && getRewardHistoryPoint.length > 0 && (
    <>
      {getRewardHistoryPoint?.map(reward => (
        <React.Fragment key={reward.id}>
          <View style={{ backgroundColor: '#ededed', height: 2 }} />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', height: 90, alignItems: 'center', alignItems: 'center' }}>
            <View style={{ marginLeft: '4%', marginTop: '5%' }}>
              <Text style={{ fontSize: 16, color: 'black' }}>{reward.status} </Text>
              <Text style={{margin:'1%',fontSize:13}}>{formatDate(reward.creditDate)}</Text>
            </View>
            <Text style={{ fontSize: 20, marginRight: '10%', marginTop: '6%', color: 'grey', color: 'black' }}>+{reward.earnedPoints}</Text>
          </View>
          <View style={{ backgroundColor: '#ededed', height: 2 }} />
        </React.Fragment>
      ))}
    </>
  )
}


              </View>
            );
          };
    
    const Used = () => {
        return (
          <View style={{width:'100%',height:'100%',backgroundColor:'white'}}>
          <View style={{flexDirection:'row',justifyContent:'space-between'}}>
              <Text style={{margin:'4%',color:'#a19f9f',fontWeight:'800'}}>Transaction Type</Text>
              <Text style={{margin:'4%',fontWeight:'800',color:'#a19f9f'}}>Points Used</Text>
          </View>
          <View style={{backgroundColor:'#ededed',height:5}}/>
          {
  getRewardHistoryUsedPoint && getRewardHistoryUsedPoint.length > 0 && (
    <>
      {getRewardHistoryUsedPoint.map((item, index) => (
        <React.Fragment key={index}>
          <View style={{ backgroundColor: '#ededed', height: 2 }} />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', height: 90, alignItems: 'center', alignItems: 'center' }}>
            <View style={{ marginLeft: '4%', marginTop: '5%' }}>
              <Text style={{ fontSize: 16, color: 'black' }}>Burned</Text>
              <Text style={{margin:'1%',fontSize:13}}>{formatDate(item.creditDate)}</Text>
            </View>
            <Text style={{ fontSize: 20, marginRight: '10%', marginTop: '6%', color: 'grey', color: 'black' }}>{item.points}</Text>
          </View>
          <View style={{ backgroundColor: '#ededed', height: 2 }} />
        </React.Fragment>
      ))}
    </>
  )
}
          <View style={{backgroundColor:'#ededed',height:2}}/>
        </View>
  );
      };
    
      const formattedTier = userLoyaltyTier ? userLoyaltyTier.charAt(0).toUpperCase() + userLoyaltyTier.slice(1).toLowerCase() : '';
  
      // 
      const [rewardHistoryDate,setRewardHistoryDate]=useState([]);

      async function getRewardHistoryEarnedPoints(){
        const header = {
          'Authorization': `Bearer ${token}`,
        };
      
        try {
          const response = await axios.get(`http://${ip}:5454/api/rewards/user/${loginUserId}/earned-points`, { headers: header });
          setGetRewardHistoryPoint(response.data);
          console.log(JSON.stringify(response.data));
          setBurnedDate(response.data.creditDate);
        } catch (error) {
          console.log('Error fetching profile:', error);
        }      
      }
      async function getRewardHistoryBurnedPoints(){
        const header = {
          'Authorization': `Bearer ${token}`,
        };
      
        try {
          const response = await axios.get(`http://${ip}:5454/api/rewards/user/${loginUserId}/used-points`, { headers: header });
          setGetRewardHistoryUsedPoint(response.data);
          console.log(JSON.stringify(response.data));
        } catch (error) {
          console.log('Error fetching profile:', error);
        }      
      }

      useEffect(()=>{
       getRewardHistoryEarnedPoints();
       getRewardHistoryBurnedPoints();

      },[getRewardHistoryPoint,]);

      
    return (
    <View style={{flex:1,backgroundColor:'white'}}>
      <View style={{marginLeft:'3%',}}>
        <Image source={kpmg} style={{width:100,height:100}}/>
        <TouchableOpacity style={{flexDirection:'row',alignItems:'center',}}
            onPress={()=>{popFromStack(navigation)}}>
            <View>
                <Image source={back}  
                     style={{marginLeft:1}}/>
            </View>
            <View style={{marginLeft:'3%'}}>
              <Text style={{color:'black'}}>Redeem Point History</Text>
            </View>
        </TouchableOpacity>
        </View>
        <LinearGradient colors={['#00338D', '#00A3A1']} style={{width:'100%',height:80,borderRadius:12,marginTop:'6%'}}>
         <View style={{flexDirection:'row',justifyContent:'space-between',margin:'3%'}}>
           <Text style={{color:'white',marginLeft:'5%',fontSize:17}}>{userName}</Text>
           <Text style={{color:'white',fontSize:17}}>{formattedTier} Tier</Text>
         </View>
         <View style={{flexDirection:'row',justifyContent:'space-around',alignItems:'center',alignContent:'center'}}>
           <View style={{flexDirection:'row',alignItems:'center',alignContent:'center',marginRight:'34%'}}>
            <Text style={{color:'white',fontSize:12}}>Points earned till date: {availablePoints}</Text>
           </View>
           <View style={{flexDirection:'row',alignItems:'center',alignContent:'center',width:80}}>
            <Image source={coin1} style={{width:20,height:20}}/>
            <Text style={{color:'white',fontSize:17,fontWeight:'800'}}>  {availablePoints}</Text>
           </View>
         </View>
      </LinearGradient>   

      {/* <Tab.Navigator style={{borderWidth:0.5,borderColor:'grey',width:'90%',alignSelf:'center',height:45,marginTop:'4%',borderRadius:12}}>
      <Tab.Screen name="Earned" component={Earned} />
      <Tab.Screen name="Used" component={Used} />
    </Tab.Navigator> */}
<Tab.Navigator
  initialRouteName="Earned"
  screenOptions={{
    tabBarActiveTintColor: '#00338D',
    tabBarInactiveTintColor: 'grey',
    tabBarLabelStyle: { fontSize: 12 },
    tabBarStyle: {
      borderColor: 'grey', // Border color
      borderWidth: 0.4,      // Border width
      borderRadius: 6,    // Border radius
      margin:'4%',
      borderColor:'grey'
    },
    tabBarLabelStyle: {
      fontWeight: 'bold', // Make the font bold for the selected tab
    }
  }}

>
  <Tab.Screen
    name="Earned"
    component={Earned}
    options={{ tabBarLabel: 'Earned' }}
  />
  <Tab.Screen
    name="Used"
    component={Used}
    options={{ tabBarLabel: 'Used' }}
  />
</Tab.Navigator>

    </View>
  )
}

export default RewardHistory

const styles = StyleSheet.create({})