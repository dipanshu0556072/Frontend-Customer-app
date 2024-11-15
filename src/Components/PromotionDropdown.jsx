import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Easing,
  Image,
} from 'react-native';
import {useCartContext} from '../Context/WomenContext';
import {json} from 'react-router-dom';
import arrow1 from '../PlpScreen/images/next.png';

const PromotionDropdown = () => {
  const {cartItem} = useCartContext();
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const promoCodes = cartItem?.promoCode;

  // Ensure each promo code has an animated value
  const animations = useRef(
    Object.keys(promoCodes).map(() => new Animated.Value(0)),
  ).current;

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);

    if (!isDropdownVisible) {
      // Start staggered animations for each promo code row
      Animated.stagger(
        100,
        animations.map(anim =>
          Animated.timing(anim, {
            toValue: 1,
            duration: 200,
            easing: Easing.ease,
            useNativeDriver: true,
          }),
        ),
      ).start();
    } else {
      // Reset animation values when hiding
      animations.forEach(anim => anim.setValue(0));
    }
  };

  return (
    <View style={styles.container}>
      {/* Dropdown Button */}

      <TouchableOpacity style={styles.couponButton} onPress={toggleDropdown}>
        <Text style={styles.couponText}>See Applied Coupons</Text>
        <Image source={arrow1} style={styles.arrowImage} />
      </TouchableOpacity>

      {/* Animated Dropdown */}
      {isDropdownVisible && (
        <View style={styles.dropdownContent}>
          {Object.entries(promoCodes).map(([code, amount], index) => {
            const animation = animations[index]; // Fetch the correct animation
            if (!animation) return null; // Ensure animation exists

            const slideDown = animation.interpolate({
              inputRange: [0, 1],
              outputRange: [-50, 0],
            });
            const opacity = animation.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 1],
            });

            return (
              <Animated.View
                key={index}
                style={[
                  styles.row,
                  {transform: [{translateY: slideDown}], opacity},
                ]}>
                <Text style={styles.promotionName}>{code}</Text>
                <Text style={styles.promotionValue}>₹{`${amount}`}</Text>
                <View style={styles.appliedBox}>
                  <Text style={styles.appliedText}>Applied</Text>
                </View>
              </Animated.View>
            );
          })}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dropdownButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  dropdownButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  dropdownContent: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 5,
    marginBottom: 10,
    height: 40,
  },
  promotionName: {
    fontWeight: 'bold',
    fontSize: 13,
    width: '40%', // Fixed width for alignment
  },
  promotionValue: {
    fontSize: 14,
    fontWeight: '500',
    width: '40%', // Fixed width for alignment
    textAlign: 'center',
  },
  appliedBox: {
    backgroundColor: 'green',
    paddingHorizontal: 10,
    paddingVertical: 5,
    width: '20%', // Fixed width for alignment
    alignItems: 'center',
    marginLeft: '3%',
  },
  appliedText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },

  couponButton: {
    flexDirection: 'row',
    width: '98%',
    marginTop: '4%',
    justifyContent: 'space-between',
    borderWidth: 1,
    padding: '2%',
    borderRadius: 12,
    borderColor: 'grey',
  },
  couponText: {
    color: 'black',
  },
  arrowImage: {
    width: 10,
    height: 10,
    margin: '1.8%',
    transform: [{rotate: '90deg'}],
  },
});

export default PromotionDropdown;
