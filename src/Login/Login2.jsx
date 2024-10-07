import {
  Alert,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import LoginTop from './LoginTop1';
import {useLoginContext} from './LoginCartProvider';
import axios from 'axios';

const Login2 = ({navigation, route}) => {
  // Destructuring parameters from route
  const {mob} = route.params;

  // Getting context values
  const {
    setMobileNumber,
    loginUserId,
    ip,
    token,
    updateMobileName,
    setUpdateMobileName,
    profileData,
    AlternativeMobileNumber,
  } = useLoginContext();

  // State management for OTP, button color, and errors
  const [otp, setOtp] = useState('');
  const [btnColor, setBtnColor] = useState(false);
  const [error1, setError1] = useState(false);
  const [error2, setError2] = useState(false);
  const [txtInpt, setTxtInpt] = useState(false);

  // OTP input change handler
  const handleTextInputChange = text => {
    setOtp(text);
  };

  // Button color toggle based on OTP length
  useEffect(() => {
    if (otp.length === 6) {
      setBtnColor(true);
    } else {
      setBtnColor(false);
    }
  }, [otp]);

  // Auto-hide error message after 4 seconds
  useEffect(() => {
    if (txtInpt) {
      setTimeout(() => {
        setTxtInpt(false);
      }, 4000);
    }
  }, [txtInpt]);

  // OTP submission handler
  const handleBtn = () => {
    if (otp === '000000') {
      storeMobileNumber();
      setMobileNumber(updateMobileName);
      setOtp('');
      setUpdateMobileName('');
      navigation.navigate('mobileVerify');
    } else {
      setError2(true);
      setTxtInpt(true);
    }

    if (otp.length === 0) {
      setError1(true);
      setTimeout(() => setError1(false), 2500);
    }
  };

  // Store mobile number to backend
  async function storeMobileNumber() {
    const dataAdd = {
      mobile: updateMobileName,
      firstName: profileData.firstName || '',
      lastName: profileData.lastName || '',
      gender: profileData.gender || '',
      dateOfBirth: profileData.dateOfBirth || '',
      alternativeMobileNumber: AlternativeMobileNumber,
    };

    const header = {Authorization: `Bearer ${token}`};

    try {
      const response = await axios.put(
        `http://${ip}:5454/api/users/update/${loginUserId}`,
        dataAdd,
        {headers: header},
      );
      console.log(
        'Profile updated successfully: UserProfile.jsx',
        response.data,
      );
    } catch (error) {
      console.log('Error in updating Profile: UserProfile.jsx', error);
    }
  }



  return (
    <View style={styles.container}>
      <LoginTop />

      <View style={styles.row2}>
        <Text style={styles.title}>Verify Mobile</Text>
        <Text style={styles.subtitle}>
          Enter the 6-digit OTP sent to ******{updateMobileName.slice(-4)}
        </Text>

        <TextInput
          style={[styles.input, {borderColor: txtInpt ? 'red' : 'black'}]}
          placeholder="OTP"
          keyboardType="numeric"
          maxLength={6}
          value={otp}
          onChangeText={handleTextInputChange}
        />

        <TouchableOpacity
          style={[
            styles.submitButton,
            {backgroundColor: btnColor ? '#00338D' : 'grey'},
          ]}
          onPress={handleBtn}>
          <Text style={styles.submitText}>Submit</Text>
        </TouchableOpacity>

        {error1 && <Text style={styles.errorText}>Please enter OTP</Text>}
        {error2 && <Text style={styles.errorText}>OTP is not valid</Text>}
      </View>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  row2: {
    marginTop: '7%',
    alignItems: 'center',
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
    marginVertical: '2%',
  },
  input: {
    borderBottomWidth: 0.8,
    width: '90%',
    marginTop: '7%',
  },
  submitButton: {
    height: '13%',
    width: '90%',
    padding: 10,
    marginTop: '8%',
    justifyContent: 'center',
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

export default Login2;
