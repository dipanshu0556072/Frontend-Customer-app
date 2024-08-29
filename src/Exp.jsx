import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Animated, Dimensions } from 'react-native';
import home from './PlpScreen/images/home.png';
import category from './PlpScreen/images/application.png';
import bell from './PlpScreen/images/bell.png';
import user from './PlpScreen/images/user.png';

const screenWidth = Dimensions.get('window').width;
const tileWidth = 80; // Width of each tile
const margin = 6; // Margin around each tile (3% on both sides)
	
const getSelectedIndex = (selected) => {
  switch (selected) {
    case 'home':
      return 0;
    case 'category':
      return 1;
    case 'bell':
      return 2;
    case 'user':
      return 3;
    default:
      return 0;
  }
};

const calculateRemainingSizes = (selectedIndex) => {
  let totalMargin, usedWidth, remainingWidth, leftSize, rightSize;

  // Define margins and widths
  totalMargin = margin * 2 * 3; // Margin on both sides of each tile

  // Calculate the used width up to and including the selected tile
  usedWidth = (selectedIndex + 1) * tileWidth + selectedIndex * margin * 2;

  // Calculate remaining width based on the selected index
  remainingWidth = screenWidth - usedWidth - totalMargin;



  if (selectedIndex === 0) {
    // If the first tile is selected, right side should show remaining tiles
        // Calculate left size based on the selected index
    leftSize = selectedIndex * (tileWidth + margin * 2);
    rightSize = (3.5 - selectedIndex) * (tileWidth + margin * 2); // Total width needed for remaining tiles on the right
  } else if (selectedIndex === 1) {
    // If the second tile is selected, calculate accordingly
    rightSize = (3.3 - selectedIndex) * (tileWidth + margin * 2);
    leftSize = selectedIndex * (tileWidth + margin+6 * 2);
  } else if (selectedIndex === 2) {
    // If the third tile is selected, calculate accordingly
    rightSize = (3.09 - selectedIndex) * (tileWidth + margin * 2);
    leftSize = selectedIndex * (tileWidth + margin+9.2 * 2);
  } else if (selectedIndex === 3) {
    // If the last tile is selected, right size should be zero as there are no more tiles
    rightSize = 0;
    leftSize = selectedIndex * (tileWidth + margin+10.7 * 2);
  }

  return {
    leftSize: Math.max(leftSize, 0),
    rightSize: Math.max(rightSize, 0), // Ensure rightSize doesn't become negative
  };
};



const Exp = () => {
  const [selected, setSelected] = useState('category');
  const position = useRef(new Animated.ValueXY()).current;
  const selectedIndex = getSelectedIndex(selected);
  const { leftSize, rightSize } = calculateRemainingSizes(selectedIndex);

  useEffect(() => {
    Animated.spring(position, {
      toValue: { x: selectedIndex * (screenWidth * 0.27), y: 0 },
      useNativeDriver: true,
    }).start();
  }, [selected]);

  const handlePress = (id) => {
    setSelected(id);
  };

  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        {/* Left background */}
        <View style={[styles.leftBackground, { width: leftSize }]} />
        {/* Right background */}
        <View style={[styles.rightBackground, { width: rightSize }]} />
        
        <View style={styles.row}>
          <Animated.View style={[styles.indicator, { transform: [{ translateX: position.x }] }]} />
          <TouchableOpacity
            onPress={() => handlePress('home')}
            style={[
              styles.column,
              selected !== 'home' && styles.unselectedColumn, // Apply background color for unselected
            ]}
          >
            <Image source={home} style={styles.image1} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handlePress('category')}
            style={[
              styles.column,
              selected !== 'category' && styles.unselectedColumn, // Apply background color for unselected
            ]}
          >
            <Image source={category} style={styles.image3} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handlePress('bell')}
            style={[
              styles.column,
              selected !== 'bell' && styles.unselectedColumn, // Apply background color for unselected
            ]}
          >
            <Image source={bell} style={styles.image} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handlePress('user')}
            style={[
              styles.column,
              selected !== 'user' && styles.unselectedColumn, // Apply background color for unselected
            ]}
          >
            <Image source={user} style={styles.image2} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Exp;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1, // Flex set to 1 for full height coverage
  },
  mainContainer: {
    width: '96%',
    height: 70,
    margin: '2%',
    marginTop: '14%',
    backgroundColor: 'transparent', // Make main container background transparent to see the left and right backgrounds
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative', // Position relative for absolute backgrounds
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 2, // Ensure row is above background colors
  },
  column: {
    width: 80,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    margin: '3%',
  },
  unselectedColumn: {
    borderRadius: 20,
  },
  image1: {
    width: 30,
    height: 30,
    marginRight: '28%',
  },
  image2: {
    width: 30,
    height: 30,
    marginLeft: '28%',
  },
  image3: {
    width: 30,
    height: 30,
    marginRight: '10%',
  },
  
  image: {
    width: 30,
    height: 30,
    marginLeft: '5%',
  },
  indicator: {
    position: 'absolute',
    width: 80,
    height: 75,
    backgroundColor: '#e24e2d',
    borderRadius: 20,
    borderWidth: 3,
    borderColor: 'white',
  },
  leftBackground: {
    position: 'absolute',
    left: 0,
    top: 0,
    height: 70,
    backgroundColor: 'rgba(60, 52, 41,255)',
    borderTopLeftRadius: 20,
    borderRadius:20,
    borderBottomLeftRadius: 20,
    zIndex: 1, // Ensure background is behind row
  },
  rightBackground: {
    position: 'absolute',
    right: 0,
    top: 0,
    height: 70,
    backgroundColor: 'rgba(60, 52, 41,255)',
    borderRadius:20,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    zIndex: 1, // Ensure background is behind row
  },
});

