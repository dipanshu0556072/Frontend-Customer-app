import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import Footer from './Footer';
import back from './PlpScreen/images/back.png';
import TopBar2 from './TopBar1';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
const Tab = createMaterialTopTabNavigator();

const Notification = ({ navigation }) => {

  function AllNotification(){
    return(
      <View style={{flex:1,backgroundColor:'white'}}>
        <View style={{marginTop:'4%'}}>
          <View style={{width:'100%',height:200,borderTopWidth:0.5,borderBottomWidth:0.5,borderTopColor:'grey',borderBottomColor:'grey'}}>
            <Text>Play & Earn.<Text style={{textDecorationLine:'underline',color:'#00338D'}}>Play now</Text></Text>
          </View>
        </View>
      </View>
    );
  }

  return (
    <>
      <View style={{ flex: 1 }}>
        {/* Content */}
        <View style={{ flexDirection: 'row', alignItems: 'center', alignItems: 'center',marginLeft:'0.8%',marginTop:'8%' }}>
          <View>
            <TouchableOpacity onPress={() => { navigation.navigate('Home') }}>
              <Image source={back} style={{ marginLeft: 12 }} />
            </TouchableOpacity>
          </View>
          <View>
            <Text style={{ paddingLeft: 10, color: 'black', textAlign: 'center' }}>Notification</Text>
          </View>
        </View>
        <View style={{}}>
          <Text>Notification is Empty</Text>
        </View>
        {/* Footer */}
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
        </View>
        {/* Tab Navigator should be placed here within the main view */}
        <Tab.Navigator
          initialRouteName="AllNotification"
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
            component={AllNotification}
            options={{ tabBarLabel: 'All' }}
          />
          <Tab.Screen
            name="Used"
            component={AllOrders}
            options={{ tabBarLabel: 'Orders' }}
          />
          <Tab.Screen
            name="Used"
            component={AllOffers}
            options={{ tabBarLabel: 'Orders' }}
          />
        </Tab.Navigator>        
      </View>
    </>
  );
};


export default Notification;

const styles = StyleSheet.create({});
