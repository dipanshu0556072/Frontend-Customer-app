import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import back from '../PlpScreen/images/back.png';
import kpmg from '../PlpScreen/images/kpmg.png';
import padlock from '../PlpScreen/images/padlock.png';
import lock from '../PlpScreen/images/lock.png';
import eye1 from './images/view1.png';
import eye2 from './images/view2.png';
import {useLoginContext} from './LoginCartProvider';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';

// Component for ForgotChangePassword
const ForgotChangePassword = ({navigation}) => {
  const {ip, checkEmail, token, popFromStack, otp} = useLoginContext();

  // State variables
  const [seePassword2, setSeePassword2] = useState(true);
  const [seePassword3, setSeePassword3] = useState(true);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [newPasswordError, setNewPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [newPassConfirmPassMatch, setNewPassConfirmMatch] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordChanged, setPasswordChanged] = useState(false);
  const [currentPasswordBackendMatched, setCurrentPasswordBackendMatched] =
    useState(true);
  const [btnColor, setBtnColor] = useState(false);

  // Function to handle password change
  async function changePassword() {
    if (newPassword === '' || confirmPassword === '') {
      if (newPassword === '') setNewPasswordError(true);
      if (confirmPassword === '') setConfirmPasswordError(true);
      return;
    } else {
      if (newPassword !== confirmPassword) {
        setNewPassConfirmMatch(true);
        setNewPasswordError(true);
        setConfirmPasswordError(true);
      } else {
        try {
          const response = await axios.post(
            `http://${ip}:5454/auth/reset-password?email=${checkEmail}&otp=${otp}&newPassword=${newPassword}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );
          // Password change was successful
          setCurrentPasswordBackendMatched(true);
          setIsLoading(true);
    
          setTimeout(() => {
            navigation.reset({
              index: 0,
              routes: [{name: 'SignIn'}],
            });
          }, 4000);
          console.log('Password changed successfully!');
        } catch (error) {
          if (error.response && error.response.status === 401) {
            // Handle 401 error (unauthorized access)
            setCurrentPasswordBackendMatched(false);
          } else {
            console.error('Error:', error.message);
            Alert.alert('Error', error.message);
          }
        }
      }
    }
  }

  // useEffect for handling various state updates
  useEffect(() => {
    if (newPassword && confirmPassword) setBtnColor(true);
    else setBtnColor(false);

    if (newPassConfirmPassMatch) {
      setTimeout(() => {
        setNewPassConfirmMatch(false);
      }, 5000);
    }

    if (isLoading) {
      setTimeout(() => {
        setIsLoading(false);
        setPasswordChanged(true);
      }, 2000);
    }

    if (passwordChanged) {
      setTimeout(() => {
        setPasswordChanged(false);
      }, 7000);

      if (!currentPasswordBackendMatched) {
        setTimeout(() => {
          setCurrentPasswordBackendMatched(true);
        }, 1000);
      }
    }
  }, [
    newPassword,
    confirmPassword,
    newPassConfirmPassMatch,
    isLoading,
    passwordChanged,
    currentPasswordBackendMatched,
  ]);

  // Toggle password visibility functions
  function Eye1() {
    setSeePassword2(prevState => !prevState);
  }

  function Eye3() {
    setSeePassword3(prevState => !prevState);
  }

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View>
        <TouchableOpacity onPress={() => popFromStack(navigation)}>
          <Image source={kpmg} style={styles.logo} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => popFromStack(navigation)}>
          <Image source={back} style={styles.backIcon} />
        </TouchableOpacity>
      </View>
  {/*---------------------------------------------Change Password Section----------------------------------------------- */}
      <View style={styles.changePasswordHeading}>
        <Image source={padlock} style={styles.padlockIcon} />
        <Text style={styles.title}>Change Password</Text>
        <Text style={styles.subtitle}>
          Please add the following details to {'\n'}update your password
        </Text>
      </View>
{/*-----------------------------------------------Input Section------------------------------------------------*/}
      <View style={styles.inputContainer}>
        <Image source={lock} style={styles.lockIcon} />
        <TextInput
          style={[
            styles.textInput,
            {borderColor: newPasswordError ? 'red' : '#00338D'},
          ]}
          placeholder="New Password"
          placeholderTextColor="grey"
          value={newPassword}
          secureTextEntry={seePassword2}
          onChangeText={setNewPassword}
        />
        <TouchableOpacity onPress={Eye1}>
          <Image source={seePassword2 ? eye2 : eye1} style={styles.eyeIcon} />
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <Image source={lock} style={styles.lockIcon} />
        <TextInput
          style={[
            styles.textInput,
            {borderColor: confirmPasswordError ? 'red' : '#00338D'},
          ]}
          placeholder="Confirm Password"
          placeholderTextColor="grey"
          value={confirmPassword}
          secureTextEntry={seePassword3}
          onChangeText={setConfirmPassword}
        />
        <TouchableOpacity onPress={Eye3}>
          <Image source={seePassword3 ? eye2 : eye1} style={styles.eyeIcon} />
        </TouchableOpacity>
      </View>

{/*-----------------------------------------------Error Messages------------------------------------------------*/}
      {newPassConfirmPassMatch && (
        <Text style={styles.errorText}>New password & confirm not matched</Text>
      )}
      {!currentPasswordBackendMatched && (
        <Text style={styles.errorText}>Current password is not correct</Text>
      )}

{/*-----------------------------------------------Save Button------------------------------------------------*/}
      <TouchableOpacity
        style={[
          styles.saveButton,
          {backgroundColor: btnColor ? '#00338D' : 'grey'},
        ]}
        onPress={changePassword}>
        <Text style={styles.saveButtonText}>SAVE</Text>
      </TouchableOpacity>

      {/* Success Message */}
      {passwordChanged && (
        <Text style={styles.successText}>Password changed successfully!</Text>
      )}

{/*-----------------------------------------------Spinner for loading------------------------------------------------*/}
      <Spinner
        visible={isLoading}
        textContent={'Changing Password...'}
        textStyle={styles.spinnerTextStyle}
        animation="fade"
        overlayColor="rgba(0, 51, 141, 0.6)"
        color="#00338D"
        size="large"
        speed={2}
      />
    </View>
  );
};

export default ForgotChangePassword;

// Stylesheet for ForgotChangePassword component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  logo: {
    width: 160,
    height: 90,
  },
  backIcon: {
    marginLeft: 12,
    marginTop: '2%',
  },
  padlockIcon: {
    alignSelf: 'center',
    width: 30,
    height: 30,
    marginTop: '4%',
  },
  title: {
    fontSize: 24,
    color: '#00338D',
    padding: '3%',
    alignSelf: 'center',
    fontWeight: '400',
  },
  subtitle: {
    color: '#00338D',
    textAlign: 'center',
    fontSize: 13,
  },
  changePasswordHeading: {
    marginTop: '10%',
    marginBottom: '6%',
  },
  inputContainer: {
    marginTop: '8%',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
  },
  lockIcon: {
    width: 22,
    height: 20,
    marginLeft: '3%',
    padding: '2%',
  },
  textInput: {
    borderBottomWidth: 0.6,
    width: '80%',
    marginLeft: '3%',
    color: 'grey',
  },
  eyeIcon: {
    width: 21,
    height: 18,
    marginTop: 10,
    marginRight: 94,
  },
  errorText: {
    color: 'red',
    alignSelf: 'center',
    margin: '4%',
    fontSize: 10,
  },
  saveButton: {
    marginTop: '20%',
    margin: '5%',
    padding: '2%',
    width: '82%',
    alignSelf: 'center',
  },
  saveButtonText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: '500',
  },
  successText: {
    color: 'green',
    fontWeight: '600',
    textAlign: 'center',
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
});
