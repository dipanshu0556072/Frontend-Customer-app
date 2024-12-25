import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, { useState,useEffect } from 'react';
import { useCartContext } from '../Context/WomenContext';
import { useLoginContext } from '../Login/LoginCartProvider';
import axios from 'axios';

const ButtonWishOrBag = ({ item }) => {
  const { setCartItem,wishListProductId,setWishListProductId,cartProductId, setCartProductId,} = useCartContext();
  const { ip, token } = useLoginContext();
  const [showActivityIndicator, setShowActivityIndicator] = useState(false);
  const [modified, setModified] = useState(false); // Track modification


  //add to wishList
const addToWish = async (item) => {
  const data = {
    productId: item?.product?.id,
    // size: item?.size,
    // quantity: item?.quantity,
    category: item?.product?.category?.name,
    color: item?.product?.color,
  };

  const header = {
    Authorization: `Bearer ${token}`,
  };

  try {
    const response = await axios.put(`http://${ip}:5454/api/wishlist/add`, data, {
      headers: header,
    });
    setWishListProductId([...wishListProductId,item?.product?.id]);
    removeCartItem(item?.id);
    console.log("added item in wishList successfully!");
  } catch (error) {
    console.error("Error adding to wishlist:", error); // Log the error
  } finally {
    setTimeout(() => {
      setShowActivityIndicator(false);
    }, 400);
  }
};


  //remove cartItem
  const removeCartItem = async (itemId) => {
    setShowActivityIndicator(true);
    const header = {
      Authorization: `Bearer ${token}`,
    };

    try {
      await axios.delete(`http://${ip}:5454/api/cart_items/${itemId}`, {
        headers: header,
      });

      setCartProductId(productId =>
        productId.filter(id => id !== productId)
    );
      
      setModified(true); // Set modification flag
      console.log("Removed cart item successfully!");
    } catch (error) {
     
    } finally {
      setTimeout(()=>{
        setShowActivityIndicator(false);        
      },400);
    }
  };

  const getCart = async () => {
    try {
      const response = await axios.get(`http://${ip}:5454/api/cart/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCartItem(response.data);
    } catch (error) {
      console.error('Error fetching cart data:', error);
    }
  };


  // UseEffect to get updated cart if modified
useEffect(() => {
    if (modified) {
      getCart();
      setModified(false); // Reset modification flag after fetching
    }
  }, [modified]);

 

  return (
    <View>
      <View style={styles.btnContainer}>
        <TouchableOpacity style={[styles.row1, { width: '45%'}]}
          onPress={() => {removeCartItem(item?.id) }}>
          <Text style={styles.textColor}>Remove</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.row1, { width: '55%' }]}
          onPress={()=>{addToWish(item)}}
         >
          <Text style={styles.wishListText}>Move to WishList</Text>
        </TouchableOpacity>
      </View>
      {showActivityIndicator && (
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator size="large" color="#00338D" />
        </View>
      )}
    </View>
  );
};

export default ButtonWishOrBag;

const styles = StyleSheet.create({
  btnContainer: {
    height: 40,
    flexDirection: 'row',
    width: 440,
  },
  row1: {
    width: '45%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.9,
    borderColor: 'rgba(241, 242, 244, 255)',
    borderBottomWidth: 7,
  },
  wishListText: { textAlign: 'center', color: '#00338D' },
  textColor: {
    color: 'rgba(0,0,0,2)',
  },
  activityIndicatorContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.7)', // Semi-transparent background
  },
});
