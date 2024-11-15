import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import TopBar from '../PlpScreen/TopBar';
import {useLoginContext} from './LoginCartProvider';
import back from '../PlpScreen/images/back.png';
import profile1 from './images/profile1.png';
import profile2 from './images/profile2.png';
import profile3 from './images/profile3.png';
import camera from '../PlpScreen/images/camera.png';
import {launchImageLibrary} from 'react-native-image-picker';
import EditProfileForm from '../Components/EditProfileForm';
import SelectGender from '../Components/SelectGender';
import axios from 'axios';
import BufferAnimation from '../Components/RotatingViews.jsx';

const UserProfile = ({navigation}) => {
  const {popFromStack} = useLoginContext();
  const {
    ip,
    token,
    loginUserId,
    updateUserName,
    updateMobileName,
    updateGender,
    AlternativeMobileNumber,
    updateEmail,
    DOB,
    DateOfAnniversary,
  } = useLoginContext();
  const [showError, setShowError] = useState([]);
  const [file, setFile] = useState(null);
  const [error, setError] = useState(false);
  const [showBuffering, setShowBuffering] = useState(false);

  // Function to pick an image from the device's media library
  const pickImage = async () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 93,
      maxHeight: 93,
      borderRadius: 100,
      quality: 2,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        setError('Image selection was canceled. Please try again.');
      } else if (response.error) {
        setError(response.error);
      } else if (response.assets && response.assets.length > 0) {
        const uri = response.assets[0].uri;
        const type = response.assets[0].type;
        const allowedFileType = ['image/png', 'image/jpg', 'image/jpeg'];

        if (allowedFileType.includes(type)) {
          setFile(uri);
          setError(null);
        } else {
          setError('allowed file type .png, .jpg, .jpeg');
        }
      }
    });
  };
  // onPress of back button
  const backButtonPressed = () => {
    popFromStack(navigation);
  };

  // Validation states
  const isUserNameValid = !!updateUserName;
  const isMobileNumberValid = !!updateMobileName;
  const isEmailValid = !!updateEmail;
  const isAlternativeMobileNumberValid = !!AlternativeMobileNumber;
  const isDOBValid = !!DOB;
  const isDateOfAnniversaryValid = !!DateOfAnniversary;

  // Function to handle validation
  const handleFormValidation = () => {
    let newErrors = [];

    if (!isUserNameValid) {
      newErrors.push('User Name');
    }
    if (!isEmailValid) {
      newErrors.push('Email');
    }
    if (!isDOBValid) {
      newErrors.push('Date of Birth');
    }
    if (!isDateOfAnniversaryValid) {
      newErrors.push('Date of Anniversary');
    }
    if (!isMobileNumberValid) {
      newErrors.push('Mobile Number');
    }
    // if (!isAlternativeMobileNumberValid) {
    //   newErrors.push('Alternative Mobile Number');
    // }

    // Update the showError state with the collected errors
    setShowError(newErrors);
    //if not error as not found, then proceed for update profile
    updateProfile();
    setShowBuffering(true);
  };

  //update profile onPress of submit button
  const updateProfile = async () => {
    // Add async here
    const dataAdd = {
      firstName: updateUserName,
      lastName: '',
      gender: updateGender,
      mobile: updateMobileName,
      email: updateEmail,
      alternativeMobileNumber: AlternativeMobileNumber,
      dateOfBirth: DOB,
      anniversaryDate: DateOfAnniversary,
    };

    const header = {
      Authorization: `Bearer ${token}`,
    };

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
      // setIsLoading(true);
      // fetchData();  // Call fetchData after setting isLoading to true

      setTimeout(() => {
        navigation.navigate('Home');
        setShowBuffering(false);
      }, 3000);
    } catch (error) {
      setShowBuffering(false);
      console.log('Error in updating Profile: UserProfile.jsx', error);
    }
  };

  return (
    <View style={styles.mainContainer}>
      {/* TopBar */}
      <TopBar
        navigation={navigation}
        showCartLogo={false}
        showWishListLogo={false}
        showSearchLogo={false}
      />
      {/* Back button */}
      <View style={styles.paddingWrapper}>
        <TouchableOpacity
          onPress={() => {
            backButtonPressed();
          }}>
          <Image source={back} />
        </TouchableOpacity>
        <View style={styles.mainHeadinContainer}>
          <Text style={styles.mainHeadingText}>Edit Your Profile</Text>
        </View>
      </View>
      {/*horizontalLine */}
      <View style={styles.horizontalLine} />
      {/*show buffering else show profileData */}
      {showBuffering ? (
        <View style={styles.wrapper}>
          <BufferAnimation />
          <Text style={styles.updateProdileText}>Updating profile...</Text>
        </View>
      ) : (
        <>
          {/*editProfileForm*/}
          <ScrollView
            style={styles.scollViewContainer}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}>
            {/*profileImage*/}
            <View style={styles.profileImageContainer}>
              <Image source={profile1} style={styles.profileImage} />
              <TouchableOpacity style={styles.camerButton} onPress={pickImage}>
                <Image source={camera} style={styles.cameraIcon} />
              </TouchableOpacity>
            </View>
            <EditProfileForm
              title="User Name"
              showError={showError}
              navigation={navigation}
            />
            <EditProfileForm
              title="Mobile Number"
              showError={showError}
              navigation={navigation}
            />
            <EditProfileForm
              title="Email"
              showError={showError}
              navigation={navigation}
            />
            <EditProfileForm
              title="Alternative Mobile Number"
              showError={showError}
              navigation={navigation}
            />
            <EditProfileForm
              title="Date of Birth"
              showError={showError}
              navigation={navigation}
            />
            <EditProfileForm
              title="Date of Anniversary"
              showError={showError}
              navigation={navigation}
            />

            {/*select gender*/}
            <SelectGender />
            {/*submit profile*/}
            <TouchableOpacity
              style={styles.submitProfileContainer}
              onPress={handleFormValidation}>
              <Text style={styles.submitProfileText}>Submit</Text>
            </TouchableOpacity>
          </ScrollView>
        </>
      )}
    </View>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  wrapper: {
    height:100,
    marginTop:'54%',
    backgroundColor:'red',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  updateProdileText:{
    color:'black',fontWeight:'300'
  },
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },

  // Back button wrapper
  paddingWrapper: {
    padding: 11,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  mainHeadinContainer: {
    position: 'absolute',
    right: '28%',
  },
  mainHeadingText: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: '500',
    color: '#00338D',
  },
  //horizontalLine
  horizontalLine: {height: 6, marginTop: '5%', backgroundColor: '#ebebeb'},
  //profileImageContainer
  profileImageContainer: {
    margin: '7%',
    marginTop: '1%',
    alignSelf: 'center',
    width: 130,
    height: 130,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImage: {
    width: 80,
    height: 80,
  },
  cameraOptionContainer: {
    backgroundColor: '#00338D',
    width: 30,
    height: 30,
    right: 0,
  },
  camerButton: {
    position: 'absolute',
    right: '14%',
    width: 32,
    height: 32,
    backgroundColor: 'rgba(0, 51, 141, 0.8)',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 10,
  },
  cameraIcon: {
    width: 17,
    height: 17,
  },
  scollViewContainer: {
    margin: '4%',
    padding: 12,
  },
  submitProfileContainer: {
    alignSelf: 'center',
    width: 320,
    height: 40,
    margin: '6%',
    backgroundColor: '#00338D',
    justifyContent: 'center',
  },
  submitProfileText: {color: 'white', fontWeight: '600', textAlign: 'center'},
});
