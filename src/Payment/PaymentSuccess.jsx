import React, {useEffect} from 'react';
import {StyleSheet, Text, View, Image, Alert} from 'react-native';
import checked from '../Login/images/checked.png';
import {useCartContext} from '../Context/WomenContext';
import axios from 'axios';
import {useLoginContext} from '../Login/LoginCartProvider';

const PaymentSuccess = ({navigation, route}) => {
  const {orderId, setOrderId} = useCartContext();

  useEffect(() => {
    setTimeout(() => {
      setOrderId(orderId + 1);
      navigation.navigate('ShopTrack');
    }, 2000);
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={styles.container}>
        <Text style={styles.text}>Payment {'\n'} successful</Text>
        <View
          style={{
            justifyContent: 'center',
            width: '100%',
            flexDirection: 'row',
          }}>
          <Image
            source={checked}
            style={{width: 80, height: 80, marginTop: '14%'}}
          />
        </View>
      </View>
    </View>
  );
};

export default PaymentSuccess;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#005eb5',
    width: '100%',
    height: '100%',
  },
  text: {
    color: 'white',
    fontWeight: '400',
    fontSize: 48,
    textAlign: 'center',
    marginTop: '34%',
  },
});
