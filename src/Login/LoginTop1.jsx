import { StyleSheet, Text, View,Image, TouchableOpacity } from 'react-native'
import React from 'react';
import kpmg from './images/kpmg2.png';
const LoginTop1 = () => {
  return (
        <View style={styles.row1}>
            <View style={{justifyContent:'center'}}>
               <Image source={kpmg} style={{marginLeft:'40%',}}/>
            </View>
           
        </View>
  )
}

export default LoginTop1

const styles = StyleSheet.create({
    row1:{
        height:'25%',
        width:'100%',
        flexDirection:'row',
        backgroundColor:'#005eb5',
        padding:'2%',
        justifyContent:'space-between'
      },
      text:{
        color:'white',
        fontWeight:'400',
        fontSize:16,
        textDecorationLine:'underline',
        padding:'3%'
      },})