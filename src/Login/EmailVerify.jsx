import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useEffect} from 'react';
import checked from './images/checked.png'; // Image source for verification check
import {useLoginContext} from './LoginCartProvider';
import axios from 'axios';

const EmailVerify = ({navigation}) => {
  //context values used within the component
  const {ip, emailId, password, setUserLogin, token, setToken,} =
    useLoginContext();

  // Body for the sign-in API request
  const signInBody = {
    email: emailId,
    password: password,
  };

  // Function to handle the sign-in process
  async function SignInBtn() {
    const header = {
      Authorization: `Bearer ${token}`,
    };

    try {
      const response = await axios.post(
        `http://${ip}:5454/auth/signin`,
        signInBody,
        {header},
      );
      setUserLogin(response.data);
      setToken(response.data.jwt);

      if (response.status === 200) {
        // Successful authentication
        console.log('Authentication Token:', response.data.jwt);
      } else {
        // Authentication failed
        console.log(
          'Authentication failed: EmailVerify.jsx',
          response.data.error,
        );
      }
    } catch (error) {
      console.log('Error fetching:', error);
    }
  }

  // Effect to automatically sign in after a delay and navigate to the main home screen
  useEffect(() => {
    setTimeout(() => {
      SignInBtn();

      // Resets the navigation stack and navigates to the main home screen
      navigation.reset({
        index: 0,
        routes: [{name: 'mainHome'}],
      });
    }, 2300);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Email Id {'\n'}verified successfully</Text>
      <View style={styles.imageContainer}>
        <Image source={checked} style={styles.image} />
      </View>
    </View>
  );
};

export default EmailVerify;

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
