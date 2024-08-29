import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Animated } from 'react-native';

const Tpop = () => {
  const [circleSize] = useState(new Animated.Value(30));
  const [expanding, setExpanding] = useState(true);

  useEffect(() => {
    const inhaleExhale = () => {
      Animated.timing(circleSize, {
        toValue: expanding ? 150 : 30,
        duration: 2000,
        useNativeDriver: false,
      }).start(() => setExpanding(!expanding));
    };

    inhaleExhale();

    const interval = setInterval(() => inhaleExhale(), 4000);

    return () => clearInterval(interval);
  }, [expanding]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.circle,
          {
            width: circleSize,
            height: circleSize,
            borderRadius: circleSize / 2,
          },
        ]}
      />
    </View>
  );
};

const LoyaltyHome = () => {
  return (
    <View style={styles.container}>
      <BreathingCircle />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    backgroundColor: 'lightblue',
  },
});

export default Tpop;
