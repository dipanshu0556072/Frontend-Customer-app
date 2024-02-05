import React,{useEffect,useMemo} from "react";
import { Image, View, Dimensions, Text, ScrollView, FlatList, TouchableOpacity,Button } from 'react-native';
import bag from './PlpScreen/images/bag.png';
import heart from './PlpScreen/images/heart.png';
import WishList from "./WishList";
import { NavigationContainer } from '@react-navigation/native';
import { useState } from 'react';
import { useCartContext } from "./Context/WomenContext";
import { json } from "react-router-dom";
import { useLoginContext } from "./Login/LoginCartProvider";

export default function Topper({navigation})
{
  const {cartCount, setCartCount,cartItem}=useCartContext();
    const {token,setLoginUserId,pushToStack, setCurrentPage,currentPage,
    popFromStack,} = useLoginContext();

    function forNavigate(page){
      console.log(page+" "+currentPage[currentPage.length-1]);
      if(currentPage && currentPage[currentPage.length-1]!==page){
        pushToStack(page);
        navigation.navigate(page)
      }else{
        popFromStack(navigation);
      }
    }

  useEffect(() => {
    // Update the cart count when the cart items change
    // You may need to fetch the actual count from your state management or storage
    // For example, useCartContext().cartCount
    if (cartItem && cartItem.cartItems && cartItem.cartItems.length > 0) {
      setCartCount(cartItem.cartItems.length);
    } else {
      setCartCount(0);
    }
  }, [cartItem]);

  // Memoize and sort cart items
  const sortedCartItems = useMemo(() => {
    if (cartItem && cartItem.cartItems) {
      return [...cartItem.cartItems].sort((a, b) => a.product.id - b.product.id);
    }
    return [];
  }, [cartItem]);

    return (
        <>
            {/* Top-Bar Start */}
            {/* <Text>{currentPage}</Text> */}
            <View style={{marginLeft:'3%',flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginRight:'3%'}}>
              <TouchableOpacity
                               onPress={()=>forNavigate('mainHome')}>
                 <Image
                  source={{ uri: 'https://shorturl.at/ckGU2' }}
                  style={{ width: 100, height: 100 }}                />
             </TouchableOpacity>
             <View style={{flexDirection:'row'}}>
                <TouchableOpacity
                   onPress={()=>forNavigate('mainBag')}
                   >
                  <View>
                    <Image source={bag} style={{marginRight:10}}/>
                  </View>
                  </TouchableOpacity> 
                  <TouchableOpacity
                   onPress={()=>forNavigate('WishList')}                                                 
                    > 
                    <View>
                        <Image source={heart} style={{}}/>
                    </View>
                  </TouchableOpacity>  
             </View>
        </View>
        <Text>{JSON.stringify()}</Text>
      {/* Top-Bar End */}
        </>
    );
}