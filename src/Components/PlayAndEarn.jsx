import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import playearn1 from '../PlpScreen/images/playearn1.png';
import playearn2 from '../PlpScreen/images/playearn2.png';
import fortune from '../PlpScreen/images/fortune.png';

const PlayAndEarn = () => {
  return (
    <View>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>PLAY & EARN</Text>
        <View style={styles.imagesContainer}>
          <Image source={playearn1} style={styles.playearnImage1} />
          <Image source={playearn2} style={styles.playearnImage2} />
        </View>
      </View>

      <View style={styles.fortuneContainer}>
        <Image source={fortune} style={styles.fortuneImage} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingTop: 30,
    padding: 10,
  },
  headerText: {
    color: '#00338D',
    fontSize: 17,
    fontWeight: '500',
  },
  imagesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  playearnImage1: {
    width: 150,
    height: 100,
  },
  playearnImage2: {
    width: 180,
    height: 100,
  },
  fortuneContainer: {
    paddingTop: 10,
    padding: 10,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  fortuneImage: {
    // Add any specific styles for the fortune image if needed
  },
});

export default PlayAndEarn;
