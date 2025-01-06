import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import moment from 'moment';
import { useCartContext } from '../Context/WomenContext';

const ModalForSubscription = ({ visible, onClose }) => {
  const { setDate, setEndDate, setScheduleSubscriptionOption } = useCartContext();
  const [selectedDate, setSelectedDate] = useState(moment().toDate());  // Initially set to a native Date object
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [errorMessage, setErrorMessage] = useState(''); // State for storing error messages

  // Handle when a date number is selected
  const handleNumberPress = (number) => {
    const selectedDay = moment(selectedDate).date(number); // Selected date
    const selectedDayFormatted = selectedDay.format('YYYY-MM-DD');
  
    // Store the selected date
    setDate(new Date(selectedDayFormatted));
  
    // Calculate alternate days within a 30-day window
    const alternateDays = [];
    const endDate = selectedDay.clone().add(29, 'days'); // Inclusive 30-day window
    for (let i = 0; i < 30; i += 2) { // Increment by 2 days
      const alternateDay = selectedDay.clone().add(i, 'days');
      if (alternateDay.isAfter(endDate)) break; // Stop if outside the 30-day window
      alternateDays.push(alternateDay.format('YYYY-MM-DD'));
    }
  
    setSelectedNumbers(alternateDays);
  
    // Calculate and store the end date
    setEndDate(endDate.toDate());
  
    // Clear error message when a date is selected
    setErrorMessage('');
  };

  const isDateEnabled = (date) => {
    const today = moment(); // Current date
    return date.isAfter(today, 'day'); // Enable future dates only
  };

  const previousMonthCalendar = () => {
    setSelectedDate(moment(selectedDate).subtract(1, 'month').toDate());
  };

  const nextMonthCalendar = () => {
    setSelectedDate(moment(selectedDate).add(1, 'month').toDate());
  };

  const renderCalendar = () => {
    const startOfMonth = moment(selectedDate).startOf('month');
    const daysInMonth = startOfMonth.daysInMonth();

    return [...Array(daysInMonth)].map((_, index) => {
      const dayNumber = index + 1;
      const currentDate = moment(selectedDate).date(dayNumber);

      const isEnabled = isDateEnabled(currentDate);
      const isSelected = selectedNumbers.includes(currentDate.format('YYYY-MM-DD'));

      return (
        <TouchableOpacity
          key={dayNumber}
          style={[
            styles.number,
            isSelected && styles.selected,
            !isEnabled && styles.disabled,
          ]}
          onPress={() => isEnabled && handleNumberPress(dayNumber)} // Set the selected date when pressed
          disabled={!isEnabled}>
          <Text
            style={[
              styles.numberText,
              isSelected ? styles.selectedText : styles.unselectedText,
            ]}>
            {dayNumber}
          </Text>
        </TouchableOpacity>
      );
    });
  };

  const onPressOfSubmitBtn = () => {
    if (!selectedNumbers.length) {
      // If no dates are selected, set the error message
      setErrorMessage("Please select subscription date's.");
    } else {
      // If a date is selected, proceed with closing the modal
      onClose();
    }
  };

  const onPressOfCrossBtn = () => {
    onClose();
    setScheduleSubscriptionOption('0');
    setSelectedNumbers([]);
    setErrorMessage(''); // Clear error message on close
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <TouchableOpacity style={styles.closeModalBtn} onPress={onPressOfCrossBtn}>
          <Text style={{ fontSize: 23 }}>╳</Text>
        </TouchableOpacity>
        <View style={styles.weeklyModal}>
          <Text style={styles.weeklyHead}>
            {moment(selectedDate).format('MMMM YYYY')}
          </Text>
          <View style={styles.container}>{renderCalendar()}</View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 16 }}>
            <TouchableOpacity onPress={previousMonthCalendar}>
              <Text style={styles.nextPreviousBtn}>Previous Month</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={nextMonthCalendar}>
              <Text style={styles.nextPreviousBtn}>Next Month</Text>
            </TouchableOpacity>
          </View>
                    
          {errorMessage ? (
            <Text style={styles.errorText}>{errorMessage}</Text> // Display error message
          ) : null}

          <TouchableOpacity style={styles.submitBtn} onPress={onPressOfSubmitBtn}>
            <Text style={styles.submitBtnText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ModalForSubscription;

// Keep your CSS styles unchanged

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  weeklyModal: {
    backgroundColor: 'white',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
    height: '55%',
  },
  weeklyHead: {
    fontSize: 16,
    color: 'black',
    fontWeight: '500',
    marginBottom: 16,
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  number: {
    width: '13%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  selected: {
    backgroundColor: '#00338D',
  },
  disabled: {
    backgroundColor: '#f0f0f0',
    borderColor: '#d3d3d3',
  },
  numberText: {
    fontSize: 14,
  },
  selectedText: {
    color: 'white',
  },
  unselectedText: {
    color: 'black',
  },
  closeModalBtn: {
    alignSelf: 'center',
    backgroundColor: 'white',
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginBottom: 8,
  },
  submitBtn: {
    backgroundColor: '#00338D',
    borderRadius: 20,
    padding: 12,
    marginTop: '4%',
    alignSelf: 'center',
    width: '90%',
  },
  submitBtnText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  nextPreviousBtn: {
    color: '#00338D', textDecorationLine: 'underline',
    marginTop: '4%',
  },
  errorText: {
    color: 'red',
    fontSize: 11,
    textAlign: 'center',
    marginTop: '4%',
  },
});
