import {
  Alert,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import LoginTop1 from './LoginTop1';
import eye1 from './images/view1.png';
import eye2 from './images/view2.png';
import fb from './images/fb.png';
import google from './images/google.png';
import arrow from './images/arrow.png';
import {useLoginContext} from './LoginCartProvider';
import axios from 'axios';

const EmaiLogin = ({navigation}) => {
  const {
    ip,
    emailId,
    setEmailId,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    setCheckEmail
  } = useLoginContext();

  const [seePassword, setSeePassword] = useState({
    password: true, // Initially hide password
    'confirm-password': true, // Initially hide confirm password
  });

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [authError, setAuthError] = useState('');
  const [btnColor, setBtnColor] = useState('grey');
  const [showActivityIndicator, setShowActivityIndicator] = useState(false);
  const [referralCode, setReferralCode] = useState('');

  // Function to toggle password visibility
  const toggleButton = (id) => {
    setSeePassword((prev) => ({ 
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Function to check if all fields are filled correctly
  const updateButtonColor = () => {
    if (emailId && password && confirmPassword &&
        !emailError && !passwordError && !confirmPasswordError) {
      setBtnColor('#00338D'); // Set button color to blue
    } else {
      setBtnColor('grey'); // Set button color to grey
    }
  };

  // Function to handle form submission
  const handleSubmit = () => {
    let isValid = true;
    setShowActivityIndicator(true);
    // Email validation
    if (!emailId) {
      setEmailError('Please fill the field');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(emailId)) {
      setEmailError('Please provide a valid email ID');
      isValid = false;
    } else {
      setEmailError('');
    }

    // Password validation
    if (!password) {
      setPasswordError('Please fill the field');
      isValid = false;
    } else if (!/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)) {
      setPasswordError('Please provide a valid password');
      isValid = false;
    } else {
      setPasswordError('');
    }

    // Confirm password validation
    if (!confirmPassword) {
      setConfirmPasswordError('Please fill the field');
      isValid = false;
    } else if (confirmPassword !== password) {
      setConfirmPasswordError('Passwords do not match');
      isValid = false;
    } else {
      setConfirmPasswordError('');
    }
    setShowActivityIndicator(isValid);
    if (isValid) {
      // Proceed with form submission
      userCreate();
      console.log('Form is valid');
    }

    // Update button color based on validation
    updateButtonColor();
  };


 //create user
 const createUser = {
  email: emailId, 
  password: confirmPassword,
};
const userCreate=async()=>{
  try{
    if(referralCode==''){
      const response=await axios.post(`http://${ip}:5454/auth/signup`,createUser);
    }else{
      const response=await axios.post(`http://${ip}:5454/auth/signup?referralCode=${referralCode}`, createUser);      
    }  
  }catch(error){
   console.log("error in emailLogin in createUser"+error);
  }

  setTimeout(()=>{
    setCheckEmail(emailId);
    navigation.navigate('EmailLoginValid');
  },4000);
}


  useEffect(() => {
    // Update button color whenever fields change
    updateButtonColor();
  }, [emailId, password, confirmPassword, emailError, passwordError, confirmPasswordError]);

  return (
    <View style={styles.container}>
      <LoginTop1 />
      <View style={styles.fieldContainer}>
        <Text style={styles.mainHeading}>Sign Up</Text>

        <TextInput
          style={[styles.txtInpt, emailError ? styles.errorInput : null]}
          placeholder="Email ID"
          value={emailId}
          onChangeText={setEmailId}
        />
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

        <View>
          <View
            style={[
              styles.loginInputContainer,
              passwordError ? styles.errorInput : null,
            ]}>
            <TextInput
              style={styles.txtInpt2}
              placeholder="Password"
              secureTextEntry={seePassword['password']}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity
              onPress={() => toggleButton('password')}
              style={styles.eyeBtnContainer}>
              <Image source={seePassword['password'] ? eye2 : eye1} style={styles.eyeBtn} />
            </TouchableOpacity>
          </View>
          {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

          <View
            style={[
              styles.loginInputContainer,
              confirmPasswordError ? styles.errorInput : null,
            ]}>
            <TextInput
              style={styles.txtInpt2}
              placeholder="Confirm Password"
              secureTextEntry={seePassword['confirm-password']}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <TouchableOpacity
              onPress={() => toggleButton('confirm-password')}
              style={styles.eyeBtnContainer}>
              <Image source={seePassword['confirm-password'] ? eye2 : eye1} style={styles.eyeBtn} />
            </TouchableOpacity>
          </View>
          {confirmPasswordError ? <Text style={styles.errorText}>{confirmPasswordError}</Text> : null}

          <View style={[styles.loginInputContainer]}>
            <TextInput
              style={styles.txtInpt2}
              placeholder="Referral Code"
              value={referralCode}
              onChangeText={setReferralCode}
            />
          </View>
        </View>

        <TouchableOpacity
          style={[styles.submitBtn, {backgroundColor: btnColor}]}
          onPress={handleSubmit}>
          <Text style={styles.submitBtnText}>Submit</Text>
        </TouchableOpacity>

        {authError ? <Text style={styles.errorText1}>{authError}</Text> : null}

        {/* SignUp box */}
        <View style={styles.signUpBox}>
          <View style={styles.signUpRow}>
            <Text style={styles.signUpBoxText1}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
              <Text style={styles.signUpBoxText2}>Log In</Text>
            </TouchableOpacity>
          </View>

          <Image source={fb} style={styles.signUpImage} />
          <Image source={google} style={styles.signUpImage} />
        </View>

        {/* Terms & conditions box */}
        <View style={styles.conditionsBox}>
          <Text style={styles.conditionText1}>
            By signing up you're agreeing to our
          </Text>
          <TouchableOpacity>
            <Text style={styles.conditionText2}>
              {' '}
              Terms of services & Privacy Policy
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Show activity indicator */}
      {showActivityIndicator && (
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator size="large" color="#00338D" />
        </View>
      )}
    </View>
  );
};

export default EmaiLogin;



const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },
  fieldContainer: {
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
    height: 50,
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
    flexDirection: 'row',
    height: 35,
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
    alignItems:'flex-end'
  },

  conditionText1: {
    fontSize: 11,
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
});
