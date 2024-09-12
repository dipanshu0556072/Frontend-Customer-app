import { StyleSheet, Text, View, Image } from 'react-native';
import React, { useEffect } from 'react';
import checked from './images/checked.png';

const MobileVerify = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('mainHome');
    }, 1000);

    // Cleanup function to clear the timer if the component unmounts
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Mobile Number{'\n'}verified successfully</Text>
      <View style={styles.imageContainer}>
        <Image source={checked} style={styles.image} />
      </View>
    </View>
  );
};

export default MobileVerify;

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
  imageContainer: {
    justifyContent: 'center',
    width: '100%',
    flexDirection: 'row',
  },
  image: {
    width: 80,
    height: 80,
    marginTop: '14%',
  },
});
