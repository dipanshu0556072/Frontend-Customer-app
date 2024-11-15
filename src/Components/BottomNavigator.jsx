import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeBar from '../HomeBar';
import ProfileBar from '../ProfileBar';
import Home1 from '../Fashion';
import bell1 from '../PlpScreen/images/bell1.png';
import categories1 from '../PlpScreen/images/category1.png';
import home1 from '../PlpScreen/images/home1.png';
import user1 from '../PlpScreen/images/user1.png';
import { useCartContext } from '../Context/WomenContext';
import { useLoginContext } from '../Login/LoginCartProvider';

const Tab = createBottomTabNavigator();

const BottomNavigator = ({ navigation }) => {
   
  const {userprofile}=useCartContext();
  const {setCurrentPage}=useLoginContext();  
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: '#00338D',
        showIcon: true,
        labelStyle: {
          margin: 1,
          fontSize: 10,
          marginBottom: 4,
        },
        tabStyle: {
          height: 50,
        },
      }}
    >
      <Tab.Screen
        name="HomeBar"
        component={HomeBar}
        options={{
          headerShown: false,
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={home1}
              style={{
                width: 20,
                height: 20,
                tintColor: focused ? 'grey' : color,
              }}
            />
          ),
          tabBarLabelStyle: {
            color: 'grey',
            marginBottom: '3%',
          },
        }}
        listeners={{
          tabPress: () => {
            navigation.navigate('mainHome');
            setCurrentPage(['mainHome'])
          },
        }}
      />
      <Tab.Screen
        name="Home1"
        component={Home1}
        options={{
          headerShown: false,
          tabBarLabel: 'Category',
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={categories1}
              style={{
                width: 20,
                height: 20,
                tintColor: focused ? 'grey' : color,
              }}
            />
          ),
          tabBarLabelStyle: {
            color: 'grey',
            marginBottom: '3%',
          },
        }}
        listeners={{
          tabPress: () => {
            navigation.navigate('Home1');
            setCurrentPage(['mainHome','Home1'])
          },
        }}
      />
      <Tab.Screen
        name="Notification"
        component={Home1}
        options={{
          headerShown: false,
          tabBarLabel: 'Notification',
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={bell1}
              style={{
                width: 20,
                height: 20,
                tintColor: focused ? 'grey' : color,
              }}
            />
          ),
          tabBarLabelStyle: {
            color: 'grey',
            marginBottom: '3%',
          },
        }}
        listeners={{
          tabPress: () => {
            navigation.navigate('Notification');
            setCurrentPage(['mainHome','Notification'])
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileBar}
        options={{
          headerShown: false,
          tabBarLabel: userprofile?.firstName || 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={user1}
              style={{
                width: 20,
                height: 20,
                tintColor: focused ? 'grey' : color,
              }}
            />
          ),
          tabBarLabelStyle: {
            color: 'grey',
            marginBottom: '3%',
          },
        }}
        listeners={{
          tabPress: () => {
            navigation.navigate('profileBar');
            setCurrentPage(['profileBar'])
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigator;

const styles = StyleSheet.create({});
