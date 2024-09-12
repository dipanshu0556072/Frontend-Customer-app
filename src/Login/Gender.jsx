import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useLoginContext } from './LoginCartProvider';
import check from './images/check.png';
import close from './images/close.png';
import { RadioButton } from 'react-native-paper';

const Gender = ({ navigation }) => {
  const [checked, setChecked] = useState(''); // Initialize the checked state
  const { gender, setGender } = useLoginContext();

  function changeGender() {
    if (checked !== '' && checked.length > 0) {
      setGender(checked);
      console.log(gender);
    }
    navigation.navigate('Login3');
  }

  return (
    <>
      <View style={styles.container}>
        {/* Header with navigation and title */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate('Login3')}>
            <Image source={close} style={styles.closeIcon} />
          </TouchableOpacity>
          <Text style={styles.headerText}>Gender</Text>
        </View>
        <TouchableOpacity style={styles.checkButton} onPress={changeGender}>
          <Image source={check} style={styles.checkIcon} />
        </TouchableOpacity>
      </View>
      <Text style={styles.infoText}>This won't be part of your public profile.</Text>
      <View style={styles.radioContainer}>
        {/* Radio button options for gender selection */}
        <View style={styles.radioRow}>
          <Text style={styles.radioLabel}>Female</Text>
          <RadioButton
            value="female"
            status={checked === 'Female' ? 'checked' : 'unchecked'}
            onPress={() => setChecked('Female')}
          />
        </View>
        <View style={styles.radioRow}>
          <Text style={styles.radioLabel}>Male</Text>
          <RadioButton
            value="Male"
            status={checked === 'Male' ? 'checked' : 'unchecked'}
            onPress={() => setChecked('Male')}
          />
        </View>
        <View style={styles.radioRow}>
          <Text style={styles.radioLabel}>Prefer not to say</Text>
          <RadioButton
            value="prefer not to Say"
            status={checked === 'Prefer not to Say' ? 'checked' : 'unchecked'}
            onPress={() => setChecked('Prefer not to Say')}
          />
        </View>
      </View>
    </>
  );
}

export default Gender;

const styles = StyleSheet.create({
  // Container for the entire view with flex direction and padding
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '6%',
  },
  // Header style including row direction and alignment
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  // Style for close icon image
  closeIcon: {
    width: 20,
    height: 20,
  },
  // Style for the header text
  headerText: {
    color: 'black',
    fontSize: 22,
    marginLeft: '20%',
  },
  // Style for check button container
  checkButton: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  // Style for check icon image
  checkIcon: {
    width: 20,
    height: 20,
  },
  // Style for info text below the header
  infoText: {
    fontSize: 12,
    marginLeft: '5%',
  },
  // Container style for the radio button options
  radioContainer: {
    marginTop: '7%',
    padding: '5%',
  },
  // Style for each row containing a radio button
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '8%',
  },
  // Style for radio button labels
  radioLabel: {
    fontSize: 16,
    color: 'black',
  },
});
