import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated ,Text} from 'react-native';

const AnimatedCircles = () => {
  const rotateAnimation = useRef(new Animated.Value(0)).current;
  const scaleAnimation = useRef(new Animated.Value(1)).current; // Start with scale 1 for all

  useEffect(() => {
    Animated.loop(
      Animated.parallel([
        // Rotate animation
        Animated.timing(rotateAnimation, {
          toValue: 1,
          duration: 600, // Speed up rotation to 3 seconds for full rotation
          useNativeDriver: true,
        }),
        // Scale animation (gradually decreasing the distance between boxes)
        Animated.sequence([
          Animated.timing(scaleAnimation, {
            toValue: 0.8, // Zoom in more significantly
            duration: 1500, // Half of the total duration
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnimation, {
            toValue: 1, // Back to original size
            duration: 1500, // Remaining half
            useNativeDriver: true,
          }),
        ]),
      ])
    ).start();
  }, [rotateAnimation, scaleAnimation]);

  const rotationInterpolate = rotateAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const rotateStyle = {
    transform: [{ rotate: rotationInterpolate }, { scale: scaleAnimation }],
  };

  return (
    <View style={styles.wrapper}>
      <Animated.View style={[styles.container, rotateStyle]}>
        <View style={[styles.circle, styles.circle1]} />
        <View style={[styles.circle, styles.circle2]} />
        <View style={[styles.circle, styles.circle3]} />
        <View style={[styles.circle, styles.circle4]} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  container: {
    width: 50, // Reduced container size for smaller circles
    height: 50,
    position: 'relative',
  },
  circle: {
    width: 9, // Reduced circle size
    height: 9,
    borderRadius: 10, // Circle shape
    position: 'absolute',
  },
  circle1: {
    backgroundColor: '#00338D',
    top: '5%', // Adjusted distance from the top for uniformity
    left: '50%',
    marginLeft: -3.5, // Center circle horizontally
  },
  circle2: {
    backgroundColor: '#00338D',
    top: '50%',
    left: '80%', // Adjusted space from the right for uniformity
    marginTop: -3.5, // Center circle vertically
  },
  circle3: {
    backgroundColor: '#00338D',
    bottom: '5%', // Adjusted distance from the bottom for uniformity
    left: '50%',
    marginLeft: -3.5, // Center circle horizontally
  },
  circle4: {
    backgroundColor: '#4CAF50',
    top: '50%',
    left: '8%', // Adjusted space from the left for uniformity
    marginTop: -3.5, // Center circle vertically
  },
});

export default AnimatedCircles;
