import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, SafeAreaView, Modal, 
  Dimensions } from 'react-native';
import back from './PlpScreen/images/back.png';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import home1 from './PlpScreen/images/home1.png';
import categories1 from './PlpScreen/images/category1.png';
import bell1 from './PlpScreen/images/bell1.png';
import user1 from './PlpScreen/images/user1.png';
import { useCartContext } from './Context/WomenContext';
import Home1 from './Fashion';
import HomeBar from './HomeBar';
import ProfileBar from './ProfileBar'; 
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import user from './PlpScreen/images/user3.png';
import shop from './PlpScreen/images/shop1.png';
import refer from './PlpScreen/images/refer1.png';
import offer from './PlpScreen/images/offer1.png';
import discount from './PlpScreen/images/discount1.png';
import coupon from './PlpScreen/images/coupon1.png';
import play from './PlpScreen/images/play1.png';
import next from './PlpScreen/images/next.png';
import correct from './PlpScreen/images/correct.png';
import { useLoginContext } from './Login/LoginCartProvider';

const Tab1 = createMaterialTopTabNavigator();

const Tab = createBottomTabNavigator();

function NotificationBar({navigation})
{
  const{popFromStack,}=useLoginContext();

  function forNavigate(page) {
    pushToStack(page);
    navigation.navigate(page);
  }
  function AllNotification(){
    return(<>
      <View style={{flex:1,backgroundColor:'white'}}>
        <View style={{marginTop:'3%',width:'100%',height:420,}}>
          <View style={{borderColor:'#00338D',borderWidth:0.5,width:'100%',flexDirection:'row',backgroundColor:'#f5f2f2',height:70}}>
            <View style={{width:'100%',flexDirection:'row',alignItems:'center'}}>
              <View style={{marginLeft:'2%'}}>
                <Image source={play} style={{width:24,height:24,}}/>
              </View>
              <View style={{marginLeft:'2%'}}>
                  <Text style={{color:'black',}}>Play & Earn Rewards. 
                    <Text style={{textDecorationLine:'underline',fontWeight:'300',color:'#00338D',fontSize:12}}> Play now</Text>
                  </Text>
                  <Text style={{fontSize:11.5,color:'#00A3A1',marginTop:'4%'}}>12hr ago</Text>
              </View>
              <Image source={next} style={{width:10,height:10,marginLeft:'38%'}}/>
            </View>
          </View>

          <View style={{borderColor:'#00338D',borderWidth:0.5,width:'100%',flexDirection:'row',backgroundColor:'white',height:70}}>
            <View style={{width:'100%',flexDirection:'row',alignItems:'center'}}>
              <View style={{marginLeft:'2%'}}>
                <Image source={offer} style={{width:24,height:24,}}/>
              </View>
              <View style={{marginLeft:'2%'}}>
                  <Text style={{color:'black',}}>25% discount on Women Kurta's. 
                    <Text style={{textDecorationLine:'underline',fontWeight:'300',color:'#00338D',fontSize:12}}> Shop now</Text>
                  </Text>
                  <Text style={{fontSize:11.5,color:'#00A3A1',marginTop:'4%'}}>15hr ago</Text>
              </View>
              <Image source={next} style={{width:10,height:10,marginLeft:'20%'}}/>
            </View>
          </View>

          <View style={{borderColor:'#00338D',borderWidth:0.5,width:'100%',flexDirection:'row',backgroundColor:'#f5f2f2',height:70}}>
            <View style={{width:'100%',flexDirection:'row',alignItems:'center'}}>
              <View style={{marginLeft:'2%'}}>
                <Image source={coupon} style={{width:24,height:24,}}/>
              </View>
              <View style={{marginLeft:'2%'}}>
                  <Text style={{color:'black',}}>Slash and Save more this April. 
                    <Text style={{textDecorationLine:'underline',fontWeight:'300',color:'#00338D',fontSize:12}}> Know more</Text>
                  </Text>
                  <Text style={{fontSize:11.5,color:'#00A3A1',marginTop:'4%'}}>2 days ago</Text>
              </View>
              <Image source={next} style={{width:10,height:10,marginLeft:'20%'}}/>
            </View>
          </View>

          <View style={{borderColor:'#00338D',borderWidth:0.5,width:'100%',flexDirection:'row',backgroundColor:'white',height:70}}>
            <View style={{width:'100%',flexDirection:'row',alignItems:'center'}}>
              <View style={{marginLeft:'2%'}}>
                <Image source={shop} style={{width:24,height:24,}}/>
              </View>
              <View style={{marginLeft:'2%'}}>
                  <Text style={{color:'black',}}>Order Delivered Successfully. 
                    <Text style={{textDecorationLine:'underline',fontWeight:'300',color:'#00338D',fontSize:12}}> Know more</Text>
                  </Text>
                  <Text style={{fontSize:11.5,color:'#00A3A1',marginTop:'4%'}}>2 weeks ago</Text>
              </View>
              <Image source={next} style={{width:10,height:10,marginLeft:'22%'}}/>
            </View>
          </View>
          <View style={{borderColor:'#00338D',borderWidth:0.5,width:'100%',flexDirection:'row',backgroundColor:'#f5f2f2',height:70}}>
            <View style={{width:'100%',flexDirection:'row',alignItems:'center'}}>
              <View style={{marginLeft:'2%'}}>
                <Image source={correct} style={{width:24,height:24,}}/>
              </View>
              <View style={{marginLeft:'2%'}}>
                  <Text style={{color:'black',}}>Order Placed Successfully. 
                    <Text style={{textDecorationLine:'underline',fontWeight:'300',color:'#00338D',fontSize:12}}> View more</Text>
                  </Text>
                  <Text style={{fontSize:11.5,color:'#00A3A1',marginTop:'4%'}}>3 weeks ago</Text>
              </View>
              <Image source={next} style={{width:10,height:10,marginLeft:'27%'}}/>
            </View>
          </View>

          <View style={{borderColor:'#00338D',borderWidth:0.5,width:'100%',flexDirection:'row',backgroundColor:'white',height:70}}>
            <View style={{width:'100%',flexDirection:'row',alignItems:'center'}}>
              <View style={{marginLeft:'2%'}}>
                <Image source={user} style={{width:24,height:24,}}/>
              </View>
              <View style={{marginLeft:'2%'}}>
                  <Text style={{color:'black',}}>Update your profile. 
                    <Text style={{textDecorationLine:'underline',fontWeight:'300',color:'#00338D',fontSize:12}}> View</Text>
                  </Text>
                  <Text style={{fontSize:11.5,color:'#00A3A1',marginTop:'4%'}}>5 weeks ago</Text>
              </View>
              <Image source={next} style={{width:10,height:10,marginLeft:'46%'}}/>
            </View>
          </View>
          <View style={{borderColor:'#00338D',borderWidth:0.5,width:'100%',flexDirection:'row',backgroundColor:'#f5f2f2',height:70}}>
            <View style={{width:'100%',flexDirection:'row',alignItems:'center'}}>
              <View style={{marginLeft:'2%'}}>
                <Image source={refer} style={{width:24,height:24,}}/>
              </View>
              <View style={{marginLeft:'2%'}}>
                  <Text style={{color:'black',}}>Refer & Earn Reward coins. 
                    <Text style={{textDecorationLine:'underline',fontWeight:'300',color:'#00338D',fontSize:12}}> Refer now</Text>
                  </Text>
                  <Text style={{fontSize:11.5,color:'#00A3A1',marginTop:'4%'}}>10 weeks ago</Text>
              </View>
              <Image source={next} style={{width:10,height:10,marginLeft:'27%'}}/>
            </View>
          </View>
          <View style={{borderColor:'#00338D',borderWidth:0.5,width:'100%',flexDirection:'row',backgroundColor:'white',height:70}}>
            <View style={{width:'100%',flexDirection:'row',alignItems:'center'}}>
              <View style={{marginLeft:'2%'}}>
                <Image source={discount} style={{width:24,height:24,}}/>
              </View>
              <View style={{marginLeft:'2%'}}>
                  <Text style={{color:'black',}}>Republic Day Sale is Live. 
                    <Text style={{textDecorationLine:'underline',fontWeight:'300',color:'#00338D',fontSize:12}}> Shop now.</Text>
                  </Text>
                  <Text style={{fontSize:11.5,color:'#00A3A1',marginTop:'4%'}}>46 weeks ago</Text>
              </View>
              <Image source={next} style={{width:10,height:10,marginLeft:'29%'}}/>
            </View>
          </View>
        </View>
      </View>
    </>);
  }
  function AllOrders(){
    return(<>
      <View style={{flex:1,backgroundColor:'white'}}>
      <View style={{borderColor:'#00338D',borderWidth:0.5,width:'100%',flexDirection:'row',backgroundColor:'white',height:70}}>
            <View style={{width:'100%',flexDirection:'row',alignItems:'center'}}>
              <View style={{marginLeft:'2%'}}>
                <Image source={discount} style={{width:24,height:24,}}/>
              </View>
              <View style={{marginLeft:'2%'}}>
                  <Text style={{color:'black',}}>Republic Day Sale is Live. 
                    <Text style={{textDecorationLine:'underline',fontWeight:'300',color:'#00338D',fontSize:12}}> Shop now.</Text>
                  </Text>
                  <Text style={{fontSize:11.5,color:'#00A3A1',marginTop:'4%'}}>46 weeks ago</Text>
              </View>
              <Image source={next} style={{width:10,height:10,marginLeft:'29%'}}/>
            </View>
          </View>        
      </View>
    </>);
  }
  function AllOffers(){
    return(<>
      <View style={{flex:1,backgroundColor:'white'}}>
      <View style={{borderColor:'#00338D',borderWidth:0.5,width:'100%',flexDirection:'row',backgroundColor:'white',height:70}}>
            <View style={{width:'100%',flexDirection:'row',alignItems:'center'}}>
              <View style={{marginLeft:'2%'}}>
                <Image source={offer} style={{width:24,height:24,}}/>
              </View>
              <View style={{marginLeft:'2%'}}>
                  <Text style={{color:'black',}}>25% discount on Women Kurta's. 
                    <Text style={{textDecorationLine:'underline',fontWeight:'300',color:'#00338D',fontSize:12}}> Shop now</Text>
                  </Text>
                  <Text style={{fontSize:11.5,color:'#00A3A1',marginTop:'4%'}}>15hr ago</Text>
              </View>
              <Image source={next} style={{width:10,height:10,marginLeft:'20%'}}/>
            </View>
          </View>
      </View>
    </>);    
  }
  return(<>
            <View style={{flex:1,backgroundColor:'white'}}>
            <View style={{marginLeft:'5%',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
             <TouchableOpacity
                onPress={() => forNavigate('mainHome')}>
                <Image
                  source={{ uri: 'https://shorturl.at/ckGU2' }}
                  style={{ width: 100, height: 100 }}                />
             </TouchableOpacity>
             </View>
             <View style={{ flexDirection: 'row', alignItems: 'center',}}>
              <TouchableOpacity onPress={() => popFromStack(navigation)}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {/* <Image source={back} style={{ marginLeft: 12 }} /> */}
                 <Text style={{ marginLeft: '10%',color:'black',fontSize:16,fontWeight:'400'}}>Notifications</Text>
               </View>
             </TouchableOpacity>
             </View>
             <Tab1.Navigator
  initialRouteName="AllNotification"
  screenOptions={{
    tabBarActiveTintColor: 'white',
    tabBarInactiveTintColor: 'grey',
    tabBarLabelStyle: { fontSize: 12 },
    tabBarStyle: {
      backgroundColor: '#00338D', 
      borderColor: 'grey', // Border color
      borderWidth: 0.4,      // Border width
      marginTop:'4%',
      width:'93%',
      borderTopLeftRadius:15,
      borderTopRightRadius:15,
      borderBottomRightRadius:10,
      borderBottomLeftRadius:10,
      marginLeft:'3%',
      marginRight:'3%',
      borderColor:'grey'
    },
    tabBarLabelStyle: {
      fontWeight: 'bold', // Make the font bold for the selected tab
    }
  }}

>
  <Tab1.Screen
    name="AllNotification"
    component={AllNotification}
    options={{ tabBarLabel: 'All' }}
  />
  <Tab1.Screen
    name="AllOrders"
    component={AllOrders}
    options={{ tabBarLabel: 'Orders' }}
  />
  <Tab1.Screen
    name="AllOffers"
    component={AllOffers}
    options={{ tabBarLabel: 'Offers' }}
  />
</Tab1.Navigator>  
            </View>

  </>);

}


function MainHome({navigation}) {

  const {userprofile}=useCartContext();
  return (
    <Tab.Navigator 
      tabBarOptions={{
        activeTintColor: '#00338D',
        showIcon: true,
        labelStyle: {
            margin:1,  
           fontSize: 10, // Adjust label font size as needed
           marginBottom:4
         },
         tabStyle: {
            height: 50, // Adjust the height as needed
          },
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeBar} 
        options={{
          headerShown: false,
          tabBarLabel: 'home',
          tabBarIcon: ({ color, size }) => (
            <Image 
              source={home1}
              style={{ width: 20, height: 20, tintColor: color }}
            />
          ),
        }}
      />
      <Tab.Screen 
        name="Home1" 
        component={Home1} 
        options={{
          headerShown: false,
          tabBarLabel: 'Category',
          tabBarIcon: ({ color, size }) => (
            <Image 
              source={categories1}
              style={{ width: 20, height: 20, tintColor: color }}
            />
          ),
        }}
      />
      <Tab.Screen 
        name="Notification" 
        component={NotificationBar} 
        options={{  
          headerShown: false,
          tabBarLabel: 'Notification',
          tabBarIcon: ({ color, size }) => (
            <Image 
              source={bell1}
              style={{ width: 20, height: 20, tintColor: color }}
            />
          ),
        }}
        listeners={({ navigation }) => ({
            tabPress: (e) => {
              // Prevent default action
              // e.preventDefault();
    
              // Do something with the `navigation` object
              // navigation.navigate("Elastic"); // Here!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            },
          })}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileBar} 
        options={{
          headerShown: false,
          tabBarLabel: userprofile?.firstName || 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Image 
              source={user1}
              style={{ width: 20, height: 20, tintColor: color }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default MainHome

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingRight: 16,
  },
  container: {
    marginTop: 30,
    paddingLeft: '4%',
    width: '20%',
    flexDirection: 'row',
    backgroundColor:'red'
  },
  columnContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryItem: {
    width: '100%', // Adjust as needed
    marginBottom: 16,
    alignItems: 'center',
  },
  categoryImage: {
    width: 60,
    height: 60,
    borderRadius: 40,
  },
  categoryText: {
    color: 'black',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 8,
  },
  categoryText2: {
    color: 'black',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 8,
    fontWeight:'bold'
  },
  verticalLine: {
    width: 1,
    backgroundColor: '#d1cfcf',
    height: '100%',
    marginLeft: '28%', // Adjust as needed
  },
  column2:{
   width:'485%',
   marginLeft:'2%',
  },
  mainRow:{
  },
  profileContainer:{
    padding:'9%',
    backgroundColor:'#00338D',
    marginBottom:'1%'
 },
 txt1:{
     fontSize:18,
     color:'white',
     padding:'0.5%'
 },
 txt2:{
     fontSize:14,
     color:'white',
     padding:'0.5%',
     fontWeight:'200'
 },
 txt3:{
     fontSize:15,
     color:'#52514e',
     marginLeft:'5%'
 },    
 txt4:{
     fontSize:15,
     color:'#52514e',
     marginLeft:'5%',
     color:'#A4343A'
 },

 row2:{
     marginTop:'0.8%',
     justifyContent:'space-between'
 },
 column:{
     flexDirection:'row',
     justifyContent:'space-between',
     alignItems:'center',
     padding:15,
     borderColor:'#e6e3e3',
     borderTopWidth:1
 },
 modalContainer: {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center',
   backgroundColor: 'rgba(0, 0, 0, 0.5)',
 },
 modalContent: {
   width: '70%',
   height: '23%',
   marginTop:'10%',
   backgroundColor: 'white',
   padding: 20,
   bottom:0,
   position:'fixed',
   borderRadius: 10,
   backgroundColor:'white',
 },
 horizontalLine1: {
  borderBottomWidth: 0.3,
  borderBottomColor: '#d1d1d1',
  marginVertical: 8,
},
container1: {
  alignItems: 'center',
  width: '100%',
  height: Dimensions.get('screen').height,
  justifyContent: 'center',
},
button: {
  padding: 16,
  backgroundColor: '#E9EBED',
  borderColor: '#f4f5f6',
  borderWidth: 1,
},
})