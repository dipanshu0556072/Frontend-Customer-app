import {StyleSheet, Text, View, TouchableOpacity, Image, Alert} from 'react-native';
import React from 'react';
import {useCartContext} from '../Context/WomenContext.jsx';
import { useLoginContext } from '../Login/LoginCartProvider.jsx';
import wishlistImage1 from '../PlpScreen/images/love2.png';
import wishlistImage2 from '../PlpScreen/images/love1.png';
import axios from 'axios';

const PLPComponent = ({item, navigation}) => {
  const {setShowActivityIndicator, wishListProductId, setWishListProductId} =
    useCartContext();
  const {ip,token}=useLoginContext();  

  // If the image is touched
  const onPressOfImage = productId => {
    setShowActivityIndicator(true);
    navigation.navigate('mainPDP', {productId}); // Pass productId only
  };

  // Function to handle button click based on title (WISHLIST or CART)
  const handleButtonPress = async (productId) => {
        if (wishListProductId.includes(productId)) {
          // If product is already in the wishlist, navigate to the Wishlist component
          navigation.navigate('WishList');
        } else {
          // Add the product to the wishlist
          await addProductToWishlist(productId);
        }
  } 
  //add product to the wishList 
  const addProductToWishlist = async (productId) => {
    const wishProduct = {
      productId: productId,
      size: 'M',
      quantity: 1,
      category: item?.category?.parentCategory?.parentCategory?.name,
      color: item?.color,
    };

    const header = {Authorization: `Bearer ${token}`};
    try {
      const response = await axios.put(
        `http://${ip}:5454/api/wishlist/add`,
        wishProduct,
        {headers: header},
      );
      setWishListProductId([...wishListProductId, productId]); // Add product to wishlist
      console.log('Product added to wishlist successfully!');
    } catch (error) {
      console.log('Error adding product to wishlist:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.productContainer}>
        <View style={styles.imageContainer}>
          <TouchableOpacity onPress={() => onPressOfImage(item.id)}>
            <Image
              source={{uri: item.imageUrl[0]}} // Use the colorKey to access the URL
              style={styles.productImage}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.wishListImageContainer} onPress={()=>{handleButtonPress(item.id)}}>
          <Image
            source={
              wishListProductId.includes(item.id)
                ? wishlistImage2
                : wishlistImage1
            }
            style={styles.wishlistImage}
          />

          </TouchableOpacity>
 <View style={styles.ratingContainer}>
  <Text style={styles.ratingText}>
    {parseFloat(item?.productRating.toFixed(1))}
  </Text>
</View>
        </View>

        <View style={styles.productDetailContainer}>
          <Text
            style={{
              fontWeight: '500',
              fontSize: item.brand.length > 10 ? 14 : 16,
              color: 'black',
            }}>
            {item.brand}
          </Text>
          <Text style={{fontSize: 13, color: '#2E2E2E'}}>{item.title}</Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={{color: '#00A3A1', fontWeight: '700'}}>
              ₹{item.discountedPrice} / ₹{' '}
            </Text>
            <Text
              style={{color: '#00A3A1', textDecorationLine: 'line-through'}}>
              {item.price}
            </Text>
          </View>
          {item.discountPercent === 0 ? (
            <Text style={{color: '#A4343A'}}></Text>
          ) : (
            <Text style={{color: '#A4343A'}}>
              ({item.discountPercent}% OFF)
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};

export default PLPComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: '1%',
    width: 450,
    height: 300,
    marginBottom: '8%',
  },
  productContainer: {
    width: '100%',
    height: 230,
  },
  imageContainer: {
    position: 'relative', // Allows absolute positioning for child components
    width: '100%',
    height: '100%',
  },
  productImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  wishListImageContainer:{    position: 'absolute',
    top: 10, // Adjust to position the image
    right: 10, // Adjust to position the image
},
  wishlistImage: {
    width: 27,
    height: 27,
  },
  ratingContainer: {
    marginLeft:'1%',
    position: 'absolute',
    bottom: 5, // Adjust to position the image
    left: 7, // Adjust to position the image
    width: 44,
    height: 24,
    borderRadius: 30,
    backgroundColor: 'rgba(128, 128, 128, 0.6)',
    justifyContent: 'center', // Ensures content is centered vertically
    alignItems: 'center',    // Ensures content is centered horizontally
  },
  ratingText: {
    color: 'white',
    fontWeight: '500',
    textAlign: 'center',
  },
  productDetailContainer: {
    width: '100%',
    height: 70,
    marginTop: '3%',
  },
});
