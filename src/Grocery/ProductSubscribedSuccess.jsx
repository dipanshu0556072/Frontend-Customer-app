import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Image, Alert,TouchableOpacity } from 'react-native';
import checked from '../Login/images/checked.png';
import { useLoginContext } from '../Login/LoginCartProvider';
const ProductSubscribedSuccess = ({navigation}) => {
 

 
  useEffect(()=>{
    setTimeout(()=>{
      navigation.navigate('subscribedItem');
    },1200);
  },[]);
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={styles.container}>
        <View style={{ justifyContent: 'center', width: '100%', flexDirection: 'row' }}>
          <Image source={checked} style={{ width: 100, height: 100, marginTop: '35%' }} />
        </View>
        <Text style={styles.text}>You've{'\n'} Successfully{'\n'}Subscribed Product</Text>
      </View>
    </View>
  );
};

export default ProductSubscribedSuccess;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#00338D',
    width: '100%',
    height: '100%',
  },
  text: {
    color: 'white',
    fontWeight: '700',
    fontSize: 28,
    textAlign: 'center',
    marginTop: '10%',
    textShadowColor: 'rgba(0, 0, 0, 0.5)', // Shadow color
    textShadowOffset: { width: 3, height: 5 }, // Shadow offset
    textShadowRadius: 5, // Shadow radius
  },
});
