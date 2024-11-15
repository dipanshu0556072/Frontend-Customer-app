import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {RadioButton} from 'react-native-paper';
import { useLoginContext } from '../Login/LoginCartProvider';
import axios from 'axios';
const SelectGender = () => {
  const { updateGender, setUpdateGender } = useLoginContext();

  return (
    <View style={styles.container}>
      <Text style={styles.genderHeading}>Gender</Text>
      <View style={styles.radioContainer}>
        <View style={styles.radioButtonGroup}>
          <RadioButton
            value="male"
            status={updateGender === 'male' ? 'checked' : 'unchecked'}
            onPress={() => setUpdateGender('male')}
          />
          <Text style={styles.radioLabel}>Male</Text>
        </View>
        <View style={styles.radioButtonGroup}>
          <RadioButton
            value="female"
            status={updateGender === 'female' ? 'checked' : 'unchecked'}
            onPress={() => setUpdateGender('female')}
          />
          <Text style={styles.radioLabel}>Female</Text>
        </View>
        <View style={styles.radioButtonGroup}>
          <RadioButton
            value="Prefer not to say"
            status={updateGender === 'Prefer not to say' ? 'checked' : 'unchecked'}
            onPress={() => setUpdateGender('Prefer not to say')}
          />
          <Text style={styles.radioLabel}>Prefer not{'\n'}to say</Text>
        </View>
      </View>
    </View>
  );
};


export default SelectGender;

const styles = StyleSheet.create({
  container: {
    padding: '7%',
  },
  genderHeading: {
    color: '#474746',
    fontSize: 15,
    fontWeight:'500'
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // ensures the radio buttons are evenly spaced
    marginTop: '5%',
  },
  radioButtonGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20, // Adjust the margin as needed for spacing
  },
  radioLabel: {
    color: '#00338D',
  },
});
