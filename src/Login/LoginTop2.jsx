import { StyleSheet, Text, View,Image } from 'react-native'
import React from 'react';
import kpmg from './images/kpmg2.png'
import { useLoginContext } from './LoginCartProvider';

const LoginTop2 = () => {
  const{isFocused, setIsFocused,}=useLoginContext();
  return (
    <View style={styles.row1}>
      <View style={styles.image}>
        <Image source={kpmg} style={{width:'32%',height:50,marginTop:'5%'}}/>
      </View>
      <Text style={isFocused?styles.text1:styles.text}>Welcome to{'\n'}
          <Text style={{fontWeight:'bold'}}>KPMG Retail Store</Text>
        </Text>
        <Text style={{color:'white',textAlign:'center',fontSize:12,marginTop:'2%'}}>One stop for all your beauty,jewels and apparels</Text>
     
 
    </View>
 )
}

export default LoginTop2

const styles = StyleSheet.create({
    row1:{
        height:'30%',
        width:'100%',
        backgroundColor:'#005eb5',
      },
      image:{
        width:'100%',
        justifyContent:'center',
        flexDirection:'row'
      },
      text:{
        color:'white',
        textAlign:'center',
        marginTop:'13%',
        fontSize:30
      },
      text1:{
        color:'white',
        textAlign:'center',
        marginTop:'4%',
        fontSize:19
      }
 })