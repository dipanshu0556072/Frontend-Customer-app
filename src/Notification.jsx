import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import Footer from './Footer';
import back from './PlpScreen/images/back.png';
import TopBar2 from './TopBar1';

const Notification = ({ navigation }) => {
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
        
      </View>
      
    </>
  );
};

export default Notification;

const styles = StyleSheet.create({});
