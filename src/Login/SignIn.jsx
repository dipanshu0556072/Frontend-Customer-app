import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import google from './images/google.png';
import fb from './images/fb.png';
import LoginTop from './LoginTop1';
import {useLoginContext} from './LoginCartProvider';
import eye1 from '../Login/images/view2.png';
import eye2 from '../Login/images/view1.png';
import axios from 'axios';


const SignIn = ({navigation}) => {
  const {
    ip,
    emailId,
    setEmailId,
    password,
    setPassword,
    setToken,
    setUserLogin,
  } = useLoginContext();



  const [seePassword, setSeePassword] = useState(true);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [authError, setAuthError] = useState('');
  const [btnColor, setBtnColor] = useState('grey');
  const [showActivityIndicator, setShowActivityIndicator] = useState(false);


  // Function to validate email
  const validateEmail = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailId)) {
      setEmailError('Enter a valid email');
      return false;
    }
    setEmailError('');
    return true;
  };




  // Function to handle form submission
  const handleSubmit = async () => {
    if (!emailId || !password) {
      // Check if any field is empty
      if (!emailId) setEmailError('Please fill the email field');
      if (!password) setPasswordError('Please fill the password field');
      return;
    }

    if (validateEmail()) {
      // Call the signInApi function
      try {
        setAuthError(''); // Clear previous errors
        setShowActivityIndicator(true); // Show loader
        const response = await signInApi(emailId, password);

        // If Successful authentication
        if (response.status === 200) {
          setUserLogin(response.data);
          setToken(response.data.jwt);
          console.log('jwt:' + response.data.jwt);
          setTimeout(() => {
            navigation.navigate('mainHome');
          }, 3500);
        
        } else if (
          response &&
          (response.data.error === 'password not match' ||
            response.data.error.includes('user not found'))
        ) {
          setTimeout(() => {
            setAuthError('EmailId or Password is incorrect');
            setShowActivityIndicator(false);
          }, 2000);
        }
      } catch (error) {
        // Handle authentication errors
        if (error.response?.data?.error === 'password not match') {
          setAuthError('Password is incorrect');
          setShowActivityIndicator(false);
        } else if (error.response?.data?.error.includes('user not found')) {
          setAuthError(`EmailId not found: ${emailId}`);
          setShowActivityIndicator(false);
        } else {
          setShowActivityIndicator(false);
          setAuthError('An error occurred. Please try again.');
        }
      }
    }
  };

  // Function to make the API call
  const signInApi = async (email, password) => {
    const data = {
      email: email.toLowerCase(),
      password: password,
    };

    try {
      const response = await axios.post(
        `http://${ip}:5454/auth/signin`,
        data,
        null,
      );
      return response;
    } catch (error) {
      console.log('Error in signInApi: ', error);
      throw error;
    }
  };



  // Effect to update button color based on field validity
  useEffect(() => {
    setBtnColor(emailId && password ? '#00338D' : 'grey');
  }, [emailId, password]);

  {
    /*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  }

  return (
    <View style={styles.container}>
      <LoginTop />
      <View style={styles.loginContainer}>
        <Text style={styles.mainHeading}>Login</Text>

        <TextInput
          style={[styles.txtInpt, emailError ? styles.errorInput : null]}
          placeholder="Email ID"
          value={emailId}
          onChangeText={setEmailId}
        />
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

        <View
          style={[
            styles.loginInputContainer,
            passwordError ? styles.errorInput : null,
          ]}>
          <TextInput
            style={styles.txtInpt2}
            placeholder="Password"
            secureTextEntry={seePassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            onPress={() => setSeePassword(!seePassword)}
            style={styles.eyeBtnContainer}>
            <Image source={seePassword ? eye1 : eye2} style={styles.eyeBtn} />
          </TouchableOpacity>
        </View>
        {passwordError ? (
          <Text style={styles.errorText}>{passwordError}</Text>
        ) : null}

        <TouchableOpacity
          style={[styles.submitBtn, {backgroundColor: btnColor}]}
          onPress={handleSubmit}>
          <Text style={styles.submitBtnText}>Submit</Text>
        </TouchableOpacity>

        {authError ? <Text style={styles.errorText1}>{authError}</Text> : null}

        {/* SignUp box */}
        <View style={styles.signUpBox}>
          <View style={styles.signUpRow}>
            <Text style={styles.signUpBoxText1}>Sign Up using </Text>
            <TouchableOpacity onPress={() => navigation.navigate('EmailLogin')}>
              <Text style={styles.signUpBoxText2}>Email</Text>
            </TouchableOpacity>
          </View>

          <Image source={fb} style={styles.signUpImage} />
          <Image source={google} style={styles.signUpImage} />
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('forgotPassword');
          }}>
          <Text style={styles.forgotPasswordText}>forgot password</Text>
        </TouchableOpacity>

        {/* Terms & conditions box */}
        <View style={styles.conditionsBox}>
          <Text style={styles.conditionText1}>
            By signing up you're agree to our
          </Text>
          <TouchableOpacity>
            <Text style={styles.conditionText2}>
              {' '}
              Terms of services & Privacy Policy
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/*-------------------------------------------show activity indicator-------------------------------------------------------------*/}
      {showActivityIndicator && (
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator size="large" color="#00338D" />
        </View>
      )}
      {/*--------------------------------------------------------------------------------------------------------*/}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor:'white'
  },
  loginContainer: {
    width: '100%',
  },
  mainHeading: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: '10%',
    color: '#00338D',
  },
  txtInpt: {
    borderBottomWidth: 0.5,
    width: '90%',
    marginTop: '7%',
    marginLeft: '5%',
  },
  txtInpt2: {
    width: '85%',
    marginTop: '7%',
  },
  eyeBtn: {
    width: 21,
    height: 21,
  },
  eyeBtnContainer: {
    position: 'absolute',
    right: 10,
  },
  loginInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    width: '90%',
    height: 80,
    marginLeft: '5%',
    marginRight: '5%',
  },
  submitBtn: {
    height: '8%',
    width: '90%',
    padding: 9,
    marginTop: '8%',
    marginLeft: '5%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitBtnText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: '700',
    fontSize: 15,
  },
  signUpBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    height: 85,
  },
  signUpBoxText1: {
    color: 'black',
  },
  signUpBoxText2: {
    marginRight: '1%',
    fontWeight: '700',
    color: 'black',
    textDecorationLine: 'underline',
  },
  signUpRow: {
    flexDirection: 'row',
    borderRightWidth: 0.7,
    padding: 5,
  },
  signUpImage: {
    width: 25,
    height: 25,
    marginLeft: '3%',
  },
  conditionsBox: {
    marginTop: '6%',
    flexDirection: 'row',
    height: 100,
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
  },

  conditionText1: {
    fontSize: 12,
  },
  conditionText2: {
    fontSize: 12,
    textDecorationLine: 'underline',
    color: '#00338D',
    fontWeight: '600',
  },
  errorText: {
    color: 'red',
    marginLeft: '5%',
    fontSize: 10,
    marginTop: 5,
  },
  errorText1: {
    color: 'red',
    marginLeft: '5%',
    fontSize: 10,
    marginTop: 5,
    textAlign: 'center',
  },
  errorInput: {
    borderColor: 'red',
    borderBottomWidth: 1,
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
  forgotPasswordText: {
    textAlign: 'center',
    fontSize: 12,
    marginRight: '14%',
    textDecorationLine: 'underline',
  },
});

export default SignIn;
