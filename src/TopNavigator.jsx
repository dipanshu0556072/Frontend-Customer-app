import { StyleSheet, Text, View ,ScrollView} from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {NavigationContainer} from '@react-navigation/native';
const Tab = createMaterialTopTabNavigator();

const TopNavigator = ({navigation}) => {
    const Earned = () => {
        return (
          <View style={{width:100,height:100}}>
            <Text>Points Earned</Text>
          </View>
        );
      };

const Used = () => {
    return (
      <View style={{}}>
        <Text>Points Used</Text>
      </View>
    );
  };
  return (
   <View style={{flex:1,backgroundColor:'white'}}>
   <ScrollView>
    </ScrollView>
    <Tab.Navigator
      initialRouteName="Earned"
      screenOptions={{
        tabBarActiveTintColor: '#00338D',
        tabBarLabelStyle: { fontSize: 12 },
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

export default TopNavigator

const styles = StyleSheet.create({})