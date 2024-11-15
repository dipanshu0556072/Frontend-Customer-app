import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  Platform,
  Text,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import correct from '../PlpScreen/images/correct.png';
import userLogo from '../PlpScreen/images/userLogo.png';
import cellPhoneLogo from '../PlpScreen/images/cellPhone.png';
import emailLogo from '../PlpScreen/images/emailLogo.png';
import calendarLogo from '../PlpScreen/images/calendar.png';
import {useLoginContext} from '../Login/LoginCartProvider';



const EditProfileForm = ({title, showError,navigation}) => {
  const {
    updateUserName,
    setUpdateUserName,
    updateMobileName,
    setUpdateMobileName,
    AlternativeMobileNumber,
    setAlternativeMobileNumber,
    updateEmail,
    setUpdateEmail,
    DOB,
    setDOB,
    DateOfAnniversary,
    setDateOfAnniversary,
  } = useLoginContext();

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [editedFields, setEditedFields] = useState({});

  const titleMappings = {
    'User Name': {
      value: updateUserName,
      setter: setUpdateUserName,
      logo: userLogo,
    },
    'Mobile Number': {
      value: updateMobileName,
      setter: setUpdateMobileName,
      logo: cellPhoneLogo,
      keyboardType: 'numeric',
    },
    'Alternative Mobile Number': {
      value: AlternativeMobileNumber,
      setter: setAlternativeMobileNumber,
      logo: cellPhoneLogo,
      keyboardType: 'numeric',
    },
    Email: {
      value: updateEmail,
      setter: setUpdateEmail,
      logo: emailLogo,
      editable: false,
      backgroundColor: 'rgba(245, 245, 245, 1)',
    },
    'Date of Birth': {
      value: DOB,
      setter: setDOB,
      logo: calendarLogo,
      isDate: true,
    },
    'Date of Anniversary': {
      value: DateOfAnniversary,
      setter: setDateOfAnniversary,
      logo: calendarLogo,
      isDate: true,
    },
  };

  const {
    value,
    setter,
    logo,
    isDate,
    editable = true,
    keyboardType = 'default',
    backgroundColor = editable ? 'white' : 'rgba(245, 245, 245, 1)',
  } = titleMappings[title] || {};

  const handleTextChange = text => {
    setter(text);

    // Mark the field as edited
    setEditedFields(prev => ({...prev, [title]: true}));
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) setter(selectedDate.toISOString().split('T')[0]);

    // Mark the date field as edited
    setEditedFields(prev => ({...prev, [title]: true}));
  };

  const isError = showError.includes(title);

  //onPress of verify button
  const verifyMobileNumber =() => {
    navigation.navigate('mobileNumberVerify');
  };

  return (
    <View style={styles.textInputContainer}>
      <View style={styles.logoContainer}>
        <Image source={logo} style={styles.logoImage} />
      </View>
      <View style={styles.textBoxContainer}>
        {isDate ? (
          <TouchableOpacity onPress={() => setShowDatePicker(true)}>
            <TextInput
              label={title}
              value={value}
              editable={false}
              mode="flat"
              style={[
                styles.inputStyle,
                {backgroundColor}, // Conditionally set the background color
                isError && {borderBottomColor: 'red', borderBottomWidth: 1},
              ]}
              theme={{colors: {primary: '#00338D', placeholder: 'grey'}}}
              placeholderTextColor="grey"
            />
          </TouchableOpacity>
        ) : (
          <TextInput
            label={title}
            value={value}
            onChangeText={handleTextChange}
            mode="flat"
            style={[
              styles.inputStyle,
              {backgroundColor}, // Conditionally set the background color
              isError && {borderBottomColor: 'red', borderBottomWidth: 1},
            ]}
            theme={{colors: {primary: '#00338D', placeholder: 'grey'}}}
            keyboardType={keyboardType}
            editable={editable}
            placeholderTextColor="grey"
          />
        )}

        {/* Conditionally render Correct image or Verify button */}
        {title === 'Mobile Number' &&
          (value!=null && value.length < 10 ? (
            <TouchableOpacity style={styles.verifyButton}>
              <Text style={styles.verifyButtonText}>Verify</Text>
            </TouchableOpacity>
          ) : (
            <Image source={correct} style={styles.correctImage} />
          ))}

        {/* Conditionally render Correct image or Verify button */}
        {title === 'Alternative Mobile Number' &&
          (value!=null && value.length < 10 ? (
            <TouchableOpacity style={styles.verifyButton} onPress={()=>{verifyMobileNumber()}}>
              <Text style={styles.verifyButtonText}>Verify</Text>
            </TouchableOpacity>
          ) : (
            <Image source={correct} style={styles.correctImage} />
          ))}
      </View>

      {showDatePicker && (
        <DateTimePicker
          value={new Date(value || Date.now())}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleDateChange}
        />
      )}
    </View>
  );
};

export default EditProfileForm;

const styles = StyleSheet.create({
  textInputContainer: {
    width: Dimensions.get('window').width - 80,
    height: 60,
    alignSelf: 'center',
    marginTop: '4%',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative', // To contain the absolutely positioned elements
  },
  logoContainer: {
    justifyContent: 'center',
    width: '8%',
  },
  logoImage: {
    width: 19,
    height: 19,
  },
  textBoxContainer: {
    flex: 1,
  },
  inputStyle: {
    fontSize: 13,
    color: '#00338D',
  },
  verifyButton: {
    position: 'absolute',
    right: 0, // Align to the right
    height: '80%',
    justifyContent: 'center',
  },
  verifyButtonText: {
    color: 'blue',
    fontSize: 12,
    textDecorationLine: 'underline',
  },
  correctImage: {
    position: 'absolute',
    right: 0,
    width: 16,
    height: 16,
    top: 18,
  },
});
