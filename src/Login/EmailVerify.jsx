import { StyleSheet, Text, View,Image } from 'react-native'
import React, { useEffect } from 'react';
import checked from './images/checked.png';

const EmailVerify = ({navigation}) => {
  useEffect(()=>{
    setTimeout(()=>{
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login3' }],
      });
      },300);
  });
  return (
    <View style={styles.container}>
        <Text style={styles.text}>Email Id {'\n'}verified successfully</Text>
        <View style={{justifyContent:'center',width:'100%',flexDirection:'row'}}>
          <Image source={checked} style={{width:80,height:80,marginTop:'14%',}}/>
        </View>
    </View>
  )
}

export default EmailVerify

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