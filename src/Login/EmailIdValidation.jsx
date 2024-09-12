import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import LoginTop1 from './LoginTop1';
import { useLoginContext } from './LoginCartProvider';
import axios from 'axios';

const EmailLoginValidation = ({ navigation }) => {
  // context values used within the component
  const { checkEmail,setEmailVerify, password,setEmailId,navigationDestination,otp, setOtp} = useLoginContext();
  const { ip } = useLoginContext();

  // local state
  const [error1, setError1] = useState(false);
  const [error2, setError2] = useState(false);
  const [btnColor, setBtnColor] = useState(false);
  const [showActivityIndicator, setShowActivityIndicator] = useState(false);



  // Function to send OTP to the provided email
  async function sendEmailOtp() {
    try {
      const response = await axios.post(`http://${ip}:5454/auth/verify-otp?email=${checkEmail}&otp=${otp}`);
      console.log(response.data);
      submitEmailOtp();
    } catch (error) {
      console.log('Error occurred while verifying OTP:', error);
      setError2(true);
    }
  }

  // Update button color based on OTP length
  useEffect(() => {
    setBtnColor(otp.length === 6);
  }, [otp]);

  // Handle OTP input change
  const handleChangeText = (text) => {
    setOtp(text);
  };

  // Function to submit the OTP
  function submitEmailOtp() {
    if (!error2) {
      setEmailId(checkEmail);
      setEmailVerify(true);
      setShowActivityIndicator(true);
      setTimeout(() => {
        setShowActivityIndicator(false);
  
        if (navigationDestination === 1) {
          navigation.reset({
            index: 0,
            routes: [{ name: 'forgotChangePassword' }],
          });
        } else {
          navigation.reset({
            index: 0,
            routes: [{ name: 'EmailVerify' }],
          });
        }
      }, 5000);
    }
  }
  

  // Handle button press event
  function handleBtn() {
    if (otp === '') {
      setError1(true);
    } else {
      sendEmailOtp();
    }
  }

  // Clear error messages after timeout
  useEffect(() => {
    if (error1) {
      const timer = setTimeout(() => {
        setError1(false);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [error1]);

  useEffect(() => {
    if (error2) {
      const timer = setTimeout(() => {
        setError2(false);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [error2]);

  return (
    <View style={styles.container}>
      <LoginTop1 />
      <View style={styles.row2}>
        <Text style={styles.title}>Verify Email</Text>
        <Text style={styles.subtitle}>
          Enter the 6-digit OTP sent to your email id{'\n'}******
          <Text style={styles.email}>
            {checkEmail.slice(-12).replace(/(.{4})/g, '$1 ')}
          </Text>
        </Text>

        <TextInput
          style={styles.input}
          placeholder='OTP'
          keyboardType='numeric'
          value={otp}
          onChangeText={handleChangeText}
          maxLength={6}
        />

        <TouchableOpacity
          style={[styles.button, { backgroundColor: btnColor ? '#00338D' : 'grey' }]}
          onPress={handleBtn}
        >
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>


        {error1 && <Text style={styles.errorText}>Please enter OTP</Text>}
        {error2 && <Text style={styles.errorText}>Invalid OTP</Text>}
      </View>

      {showActivityIndicator && (
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator size="large" color="#00338D" />
        </View>
      )}
    </View>
  );
};

export default EmailLoginValidation;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  row2: {
    marginTop: '10%',
    alignItems: 'center',
    margin:'4%',
    alignItems:'center'
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#00338D',
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
  },
  email: {
    color: 'black',
    fontWeight: '600',
  },
  input: {
    borderBottomWidth: 0.8,
    width: '90%',
    marginTop: '15%',
  },
  button: {
    height: '12%',
    width: '90%',
    marginTop: '8%',
    alignItems: 'center',
    alignSelf:'center',
    justifyContent:'center'
  },
  
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 15.4,
  },

  timerLabel: {
    textDecorationLine: 'underline',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: '3%',
    fontSize: 12,
  },
  activityIndicatorContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Semi-transparent background
  },
});
