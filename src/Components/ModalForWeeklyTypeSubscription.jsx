import {
    StyleSheet,
    Text,
    View,
    Modal,
    Image,
    TouchableOpacity,
    Alert,
  } from 'react-native';
  import React, {useState} from 'react';
  import CheckBox from '@react-native-community/checkbox';
  import minus from '../PlpScreen/images/minus.png';
  import calendar from '../PlpScreen/images/calendar12.png';
  
  import {useCartContext} from '../Context/WomenContext';
  
  const ModalForWeeklyTypeSubscrip = ({ visible, onClose}) => {
    const { setScheduleSubscriptionOption,date,endDate,setTotalDaysOfSubscription,checkedDays, setCheckedDays,setTargetDaysOfSubscription} = useCartContext();

    const [errorMessage, setErrorMessage] = useState('');
  
    // Function to calculate total delivery days
    const calculateWeeklyDays = (date, endDate, selectedDays) => {
      let totalDays = 0;
      const start = new Date(date);
      const end = new Date(endDate);
  
      let currentDate = new Date(start);
      while (currentDate <= end) {
        const currentDay = currentDate.getDay(); // 0=Sunday, 1=Monday, ..., 6=Saturday
        if (selectedDays.includes(currentDay)) {
          totalDays++; // Increment if the day matches the selected day(s)
        }
        currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
      }
  
      return totalDays;
    };
  
    const toggleDay = (day) => {
      setCheckedDays((prevState) => {
        const updatedDays = {
          ...prevState,
          [day]: !prevState[day],
        };
        setTargetDaysOfSubscription(Object.keys(updatedDays).filter(d => updatedDays[d])); // Update targetDaysOfSubscription
        return updatedDays;
      });
      setErrorMessage('');
    };
    
  
    const onPressOfSubmitBtn = () => {
      const selectedDays = Object.keys(checkedDays)
        .filter((day) => checkedDays[day])
        .map((day) =>
          ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].indexOf(day)
        );
  
      if (selectedDays.length === 0) {
        setErrorMessage('Please select at least one day.');
      } else {
        // Call the calculateWeeklyDays function with date, endDate, and selectedDays
        const totalDays = calculateWeeklyDays(date, endDate, selectedDays);
        setTotalDaysOfSubscription(totalDays);
        // Alert.alert('Total Subscription Days:', JSON.stringify(totalDays)); // Use totalDays as needed
        setErrorMessage('');
        onClose();
      }
    };
  
    const onPressOfCrossBtn = () => {
      onClose();
      setScheduleSubscriptionOption('0');
    };
  
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={onClose}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeModalBtn} onPress={onPressOfCrossBtn}>
            <Text style={{ fontSize: 23 }}>╳</Text>
          </TouchableOpacity>
          <View style={styles.weeklyModal}>
            <Text style={styles.weeklyHead}>Select Delivery Days</Text>
            <View style={styles.checkBox}>
              {Object.keys(checkedDays).map((day) => (
                <View key={day} style={styles.checkBoxContainer}>
                  <CheckBox
                    disabled={false}
                    value={checkedDays[day]}
                    onValueChange={() => toggleDay(day)}
                  />
                  <Text style={[styles.checkBoxContainerText]}>{day}</Text>
                </View>
              ))}
            </View>
            {errorMessage ? (
              <Text style={styles.errorText}>{errorMessage}</Text>
            ) : null}
            <TouchableOpacity style={styles.sumbitBtn} onPress={onPressOfSubmitBtn}>
              <Text style={styles.submitBtnText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };
  
  
  export default ModalForWeeklyTypeSubscrip;
  
  const styles = StyleSheet.create({
    modalContainer: {
      height: '100%', 
      width: '100%',
      backgroundColor: 'rgba(0,0,0,0.3)',
      justifyContent: 'center', 
      alignItems: 'center', 
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
    },
    weeklyModal: {
      width: '100%', 
      backgroundColor: 'white',
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
      height: 500, 
   
    },
    weeklyHead: {
      fontSize: 16,
      color: 'black',
      fontWeight: '500',
      marginTop: '3%',
      marginLeft: '4%',
    },
    //checkBox container
    checkBox: {
      margin: '4%',
    },
    checkBoxContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      margin: '1%',
    },
    checkBoxContainerText: {
      color: 'black',
      margin: '1%',
    },
    
  
    //calendar Image
    calendarImage: {
      width: 38,
      height: 40,
      margin: '3%',
    },
    sumbitBtn: {
      backgroundColor: '#00338D',
      width: '90%',
      height: 40,
      alignSelf: 'center',
      borderRadius: 20,
      justifyContent: 'center',
      marginTop:'4%'
    },
    submitBtnText: {
      textAlign: 'center',
      fontSize: 15,
      color: 'white',
    },
    closeModalBtn: {
      backgroundColor: 'white',
      width: 40,
      height: 40,
      alignSelf: 'center',
      alignItems: 'center',
      borderRadius: 20,
      marginTop: '100%',
      marginBottom: '3%',
      padding: 3,
    },
    //errorText
    errorText:{
      color:'red',
      fontSize:11,
      marginLeft:'7%'
    }
  });
  
  