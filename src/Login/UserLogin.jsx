import { Alert, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import LoginTop from './LoginTop1';
import { useLoginContext } from './LoginCartProvider';
import axios from 'axios';

const Login2 = ({ navigation, route }) => {
  // Extracts the mobile number from the navigation route parameters
  const { mob } = route.params;

  const {
    setMobileNumber,
    checkMobile,
    setCheckMobile,
    loginUserId,
    ip,
    token,
    AlternativeMobileNumber,
    updateMobileName,
    profileData,
  } = useLoginContext();

  // State variables for OTP input, button color, and error messages
  const [otp, setOtp] = useState('');
  const [btnColor, setBtnColor] = useState(false);
  const [error1, setError1] = useState(false);
  const [error2, setError2] = useState(false);
  const [txtInpt, setTxtInpt] = useState(false);

  // Updates button color based on OTP length
  useEffect(() => {
    setBtnColor(otp.length === 6);
  }, [otp]);

  // Resets input error state after a timeout
  useEffect(() => {
    if (txtInpt) {
      setTimeout(() => {
        setTxtInpt(false);
      }, 4000);
    }
  }, [txtInpt]);

  // Sets the initial value of the mobile number when component mounts
  useEffect(() => {
    if (mob) {
      setCheckMobile(mob);
    }
  }, [mob]);

  // Handles OTP input change
  const handleTextInputChange = (text) => {
    setOtp(text);
  };

  // Handles the OTP submission button click
  const handleBtn = () => {
    if (otp === '000000') {
      storeMobileNumber();
      setMobileNumber(checkMobile);
      setOtp('');
      setCheckMobile('');
      navigation.navigate('mobileVerify');
    } else {
      setError2(true);
      setTxtInpt(true);
      setTimeout(() => setError2(false), 2500);
    }

    if (otp.length === 0) {
      setError1(true);
      setTimeout(() => setError1(false), 2500);
    }
  };

  // Function to store the user's mobile number and other profile details
  const storeMobileNumber = async () => {
    const dataAdd = {
      mobile: updateMobileName,
      firstName: profileData.firstName || '',
      lastName: profileData.lastName || '',
      gender: profileData.gender || '',
      dateOfBirth: profileData.dateOfBirth || '',
      alternativeMobileNumber: AlternativeMobileNumber,
    };
    const headers = { Authorization: `Bearer ${token}` };

    try {
      const response = await axios.put(
        `http://${ip}:5454/api/users/update/${loginUserId}`,
        dataAdd,
        { headers }
      );
      console.log('Profile updated successfully: UserProfile.jsx', response.data);
    } catch (error) {
      console.log('Error in updating Profile: UserProfile.jsx', error);
    }
  };

  return (
    <View style={styles.container}>
      <LoginTop />

      {/* OTP Input and Verification Section */}
      <View style={styles.row2}>
        <Text style={styles.title}>Verify Mobile</Text>
        <Text style={styles.subtitle}>
          Enter the 6-digit OTP sent to ******{checkMobile.slice(-4)}
        </Text>

        {/* OTP Input Field */}
        <TextInput
          style={[styles.input, { borderColor: txtInpt ? 'red' : 'black' }]}
          placeholder="OTP"
          keyboardType="numeric"
          maxLength={6}
          value={otp}
          onChangeText={handleTextInputChange}
        />

        {/* Submit Button */}
        <TouchableOpacity
          style={[styles.submitButton, { backgroundColor: btnColor ? '#00338D' : 'grey' }]}
          onPress={handleBtn}
        >
          <Text style={styles.submitText}>Submit</Text>
        </TouchableOpacity>

        {/* Error Messages */}
        {error1 && <Text style={styles.errorText}>Please enter OTP</Text>}
        {error2 && <Text style={styles.errorText}>OTP is not valid</Text>}
      </View>
    </View>
  );
};

export default Login2;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  row2: {
    marginTop: '7%',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: '10%',
    color: '#00338D',
  },
  subtitle: {
    textAlign: 'center',
  },
  input: {
    borderBottomWidth: 0.8,
    width: '90%',
    marginTop: '7%',
    marginLeft: '5%',
  },
  submitButton: {
    height: '13%',
    width: '90%',
    padding: 10,
    marginTop: '8%',
    marginLeft: '5%',
    alignItems: 'center',
  },
  submitText: {
    color: 'white',
    fontSize: 17,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: '3%',
  },
});
