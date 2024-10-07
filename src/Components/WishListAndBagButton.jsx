import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import heart from '../PlpScreen/images/heart3.png';
import bag from '../PlpScreen/images/bag2.png';
import axios from 'axios';
import {useCartContext} from '../Context/WomenContext';
import {useLoginContext} from '../Login/LoginCartProvider';
import {useNavigation} from '@react-navigation/native';

const WishListAndBagButton = ({product, img, title}) => {
  const {
    selectedSizes,
    cartProductId,
    setCartProductId,
    wishListProductId,
    setWishListProductId,
  } = useCartContext();
  const {ip, token} = useLoginContext();
  const navigation = useNavigation(); // Use this to navigate to other components
  const productId = product?.id;

  // Function to handle button click based on title (WISHLIST or CART)
  const handleButtonPress = async () => {
    if (title === 'WISHLIST') {
      if (wishListProductId.includes(productId)) {
        // If product is already in the wishlist, navigate to the Wishlist component
        navigation.navigate('Wishlist');
      } else {
        // Add the product to the wishlist
        await addProductToWishlist();
      }
    } else {
      if (cartProductId.includes(productId)) {
        // If product is already in the cart, navigate to the Cart component
        navigation.navigate('mainBag');
      } else {
        // Add the product to the cart
        await addProductToCart();
      }
    }
  };

  // Function to add product to wishlist
  const addProductToWishlist = async () => {
    const cartProduct = {
      productId: productId,
      size: selectedSizes[0],
      quantity: 1,
      category: product?.category?.parentCategory?.parentCategory?.name,
      color: product?.color,
    };

    const header = {Authorization: `Bearer ${token}`};
    try {
      const response = await axios.put(
        `http://${ip}:5454/api/wishlist/add`,
        cartProduct,
        {headers: header},
      );
      setWishListProductId([...wishListProductId, productId]); // Add product to wishlist
      console.log('Product added to wishlist successfully!');
    } catch (error) {
      console.log('Error adding product to wishlist:', error);
    }
  };

  // Function to add product to cart
  const addProductToCart = async () => {
    const cartProduct = {
      productId: productId,
      size: selectedSizes[0],
      quantity: 1,
      category: product?.category?.parentCategory?.parentCategory?.name,
      color: product?.color,
    };

    const header = {Authorization: `Bearer ${token}`};

    try {
      const response = await axios.put(
        `http://${ip}:5454/api/cart/add`,
        cartProduct,
        {headers: header},
      );
      setCartProductId([...cartProductId, productId]); // Add product to cart
      console.log('Product added to cart successfully!');
    } catch (error) {
      console.log('Error adding product to cart:', error);
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.wishListButton,
        {backgroundColor: title === 'WISHLIST' ? '#00A3A1' : '#00338D'},
      ]}
      onPress={handleButtonPress}>
      <View style={styles.wisListIconContainer}>
        <Image source={img} style={styles.wisListIcon} />
        <Text style={styles.wishListText}>
          {title === 'WISHLIST'
            ? wishListProductId.includes(productId)
              ? 'WISHLISTED'
              : 'WISHLIST'
            : cartProductId.includes(productId)
            ? 'Go to Bag'
            : 'Add to Bag'}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default WishListAndBagButton;

const styles = StyleSheet.create({
  wishListButton: {
    width: (Dimensions.get('window').width - 45) / 2,
    height: 45,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wisListIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  wisListIcon: {
    width: 20,
    height: 20,
  },
  wishListText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    paddingLeft: 7,
  },
});
