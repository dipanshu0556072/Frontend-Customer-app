import { StyleSheet, Text, View,Image } from 'react-native'
import React, { useEffect } from 'react';
import checked from './images/checked.png';

const MobileVerify = ({navigation}) => {
  useEffect(()=>{
    setTimeout(()=>{
      navigation.navigate('mainHome');
    },1000);
  });
  return (
    <View style={styles.container}>
        <Text style={styles.text}>Mobile Number {'\n'}verified successfully</Text>
        <View style={{justifyContent:'center',width:'100%',flexDirection:'row'}}>
          <Image source={checked} style={{width:80,height:80,marginTop:'14%',}}/>
        </View>
    </View>
  )
}

export default MobileVerify

const styles = StyleSheet.create({
  container:{
    backgroundColor:'#005eb5',
    width:'100%',
    height:'100%'
  },
  text:{
    color:'white',
    fontWeight:'400',
    fontSize:48,
    textAlign:'center',
    marginTop:'34%'
  }
})