import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import LoginTop from './LoginTop1';
import { useLoginContext } from './LoginCartProvider';
import axios from 'axios';

const ForgetPassword = ({ navigation }) => {
  // Context values used within the component
  const { setCheckEmail, setNavigationDestination } = useLoginContext();
  const { ip } = useLoginContext();

  // Local state
  const [btnColor, setBtnColor] = useState(false);
  const [inputEmail, setInputEmail] = useState('');
  const [emailNullValidation, setEmailNullValidation] = useState(false);
  const [emailValidation, setEmailValidation] = useState(false);
  const [showActivityIndicator, setShowActivityIndicator] = useState(false);

  // Function to send OTP to the provided email
  async function sendEmailOtp() {
    try {
      const response = await axios.post(
        `http://${ip}:5454/auth/forgot-password?email=${inputEmail}`
      );
      setNavigationDestination(1);

      // Navigate to OTP verification screen
      navigation.navigate('EmailLoginValid');
    } catch (error) {
      console.log('Error occurred while sending OTP:', error);
      // Handle error here
    }
  }

  // Validate email format
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  useEffect(() => {
    // Reset validation states after 4 seconds
    const timer = setTimeout(() => {
      setEmailValidation(false);
      setEmailNullValidation(false);
    }, 4000);

    // Update button color based on email input
    setBtnColor(inputEmail !== '');

    // Cleanup timer on unmount
    return () => clearTimeout(timer);
  }, [inputEmail]);

  // Handle button press event
  function handleBtn() {
    setShowActivityIndicator(true);
    if (inputEmail === '') {
      // Show error if email field is empty
      setEmailNullValidation(true);
      setShowActivityIndicator(false);
      setEmailValidation(false);
    } else if (!validateEmail(inputEmail)) {
      // Show error if email is not in correct format
      setShowActivityIndicator(false);
      setEmailValidation(true);
      setEmailNullValidation(false);
    } else {
      // If validation passes, proceed to send OTP
      sendEmailOtp();
      setCheckEmail(inputEmail);
    }
  }

  return (
    <View style={styles.container}>
      <LoginTop />
      <View style={styles.inputContainer}>
        <Text style={styles.title}>Please Enter Email ID</Text>
        <TextInput
          style={[
            styles.input,
            {
              borderColor:
                emailNullValidation || emailValidation ? 'red' : 'grey',
            },
          ]}
          placeholder="email id"
          value={inputEmail}
          onChangeText={(text) => setInputEmail(text)}
        />
        {/* Error message if email field is empty */}
        {emailNullValidation && (
          <Text style={styles.errorText}>Please fill the email field</Text>
        )}
        {/* Error message if email is not valid */}
        {emailValidation && !emailNullValidation && (
          <Text style={styles.errorText}>Please provide a valid email ID</Text>
        )}
        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: btnColor ? '#00338D' : 'grey' },
          ]}
          onPress={handleBtn}
        >
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>

      {/* Show activity indicator while processing */}
      {showActivityIndicator && (
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator size="large" color="#00338D" />
        </View>
      )}
    </View>
  );
};

export default ForgetPassword;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  inputContainer: {
    margin: '5%',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: '10%',
    color: '#00338D',
  },
  input: {
    borderBottomWidth: 0.8,
    width: '90%',
    marginTop: '17%',
  },
  button: {
    width: '90%',
    marginTop: '14%',
    alignItems: 'center',
    padding: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 15.4,
    padding: '0.4%',
  },
  errorText: {
    color: 'red',
    marginLeft: '5%',
    marginTop: '3%',
    fontSize: 10,
  },
  activityIndicatorContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.7)', // Semi-transparent background
  },
});
