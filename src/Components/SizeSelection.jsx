import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import { useCartContext } from '../Context/WomenContext';
import axios from 'axios';

const SizeSelection = ({product}) => {
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedSizeQuantity, setSelectedSizeQuantity] = useState(null);
  const [allSizes, setAllSizes] = useState([]);
  const predefinedSize = ['S', 'M', 'L', 'XL', 'XXL'];
  const {setSelectedSizes}=useCartContext();

  //check productQuantity
  const checkQuantity = size => {
    const sizeItem = product.sizes.find(item => item.name === size);
    return sizeItem ? sizeItem.quantity : 0;
  };

  //onPress of sizeTile
  const onPressOfTile = size => {
    const isSizeAvailable = product.sizes.some(
      productSize => productSize.name === size,
    );

    if (isSizeAvailable) {
      setSelectedSizes(size);
      setSelectedSize(size);
      setSelectedSizeQuantity(checkQuantity(size));
    } else {
      // Handle the case where the size is not available
      alert('This size is not available.');
    }
  };


  useEffect(() => {
    if (product && Array.isArray(product.sizes)) {
      // Create an array of unique sizes from the product
      const uniqueSizes = [...new Set(product.sizes.map(item => item.name))];

      // Check for sizes that are not integers and add missing predefined sizes
      const sizesToAdd = predefinedSize.filter(size => {
        // Check if the size is not already in uniqueSizes and not an integer
        const isInteger = !isNaN(parseInt(size, 10)) && Number.isInteger(parseFloat(size));
        return !uniqueSizes.includes(size) && !isInteger;
      });

      // Combine uniqueSizes with sizesToAdd
      setAllSizes([...uniqueSizes, ...sizesToAdd]);
    }
  }, [product]);

  
  return (
    <>
      <View style={styles.sizeContainer}>
        {allSizes.map((size, index) => {
          const isSizeAvailable = product.sizes.some(
            productSize => productSize.name === size,
          );
          return(<>
           <TouchableOpacity
              key={index}
              style={[
                isSizeAvailable ? styles.sizeBox : styles.lineThroughBox,
                selectedSize === size && {
                  borderColor: '#00338D',
                  borderWidth: 2,
                }, // Apply border color if selected
              ]}
              onPress={() => {
                onPressOfTile(size);
              }}>
              <Text
                style={[
                  styles.sizeText,
                  selectedSize === size && {color: '#00338D'},
                ]}
                numberOfLines={1}
                ellipsizeMode="tail">
                {size}
              </Text>

              {/* Add a strikethrough line for unavailable sizes */}
              {!isSizeAvailable && <View style={styles.lineThroughBoxLine} />}
            </TouchableOpacity>
          </>)
        })}
      </View>
      {/*show productQuantity left instruction */}
      {selectedSizeQuantity && (
        <Text style={styles.itemsLeftText1}>
          Hurry Up!
          <Text style={styles.itemsLeftText2}>
            {' '}
            {selectedSizeQuantity}
          </Text>{' '}
          items left
        </Text>
      )}
    </>
  );
};
export default SizeSelection;

//sizeContainer
const styles = StyleSheet.create({
  sizeContainer: {
    width: Dimensions.get('window').width - 17,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginTop: '3%',
    marginLeft: '4%',
  },
  sizeBox: {
    margin: '1.5%', // Space between boxes
    width: '13%', // Keep this as per your requirement
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
    padding: 3,
    backgroundColor: 'white',
    position: 'relative',
    justifyContent: 'center',
  },
  lineThroughBox: {
    margin: '1.5%', // Space between boxes
    width: '13%', // Keep this as per your requirement
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'rgba(211,211,211,1)',
    alignItems: 'center',
    padding: 3,
    backgroundColor: 'rgba(211,211,211,0.3)',
    justifyContent: 'center',
  },
  lineThroughBoxLine: {
    height: 1.3,
    backgroundColor: 'grey',
    width: '100%',
    position: 'absolute',
  },
  sizeText: {
    fontSize: 16,
    color: 'black',
  },
  itemsLeftText1: {
    color: '#A4343A',
    fontSize: 12,
    marginLeft: '6%',
  },
  itemsLeftText2: {
    color: '#A4343A',
    fontSize: 13,
    fontWeight: '600',
    marginLeft: '6%',
  },
});
