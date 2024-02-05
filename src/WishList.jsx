import React, { useEffect, useMemo,useState} from 'react';
import {Modal, Text, View, Image, TouchableOpacity, ScrollView,TouchableWithoutFeedback } from 'react-native';
import 'react-native-gesture-handler';
import Topper from './TopBar3';
import back from './PlpScreen/images/back.png';
import cross from './PlpScreen/images/close.png';
import heart from './PlpScreen/images/heart2.png';
import axios from 'axios';
import { useCartContext } from './Context/WomenContext';
import { useLoginContext } from './Login/LoginCartProvider';
import { json } from 'react-router-dom';

export default function WishList({ navigation }) {
  const {
    wishListData,
    setWishListData,
    cartItem,
    setCartItem,
    setIsProductWishlisted
  } = useCartContext();
  const {ip,token,popFromStack,pushToStack,currentPage}=useLoginContext();

//notiication for moving product to bag  
  const [isModalVisible, setModalVisible] = useState(false);
  const handlePress = () => {
      setModalVisible(true);
  };
  
  // useEffect(()=>{
   
  //      setModalVisible(false);
  
  // },[isModalVisible]);
  const closeModal = () => {
    setModalVisible(false);
  };
  useEffect(()=>{
    if(isModalVisible){
      setTimeout(()=>{
       setModalVisible(false);
      },2000);
    }
  },[isModalVisible]);


  //Update Bag
  // useEffect(() => {
  //   getCartData();
  // }, [token,cartItem]);
  const getCartData = async () => {
    try {
      const response = await axios.get(`http://${ip}:5454/api/cart/`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
      setCartItem(response.data);
      console.log("Updated CartItem: ", JSON.stringify(response.data));
    } catch (error) {
      console.error('Error fetching updated cart data:', error);
    }
  };

  
  // Fetch wishlist data
  const getWishlistData = async () => {
    try {
      const response = await axios.get(`http://${ip}:5454/api/wishlist/`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setWishListData(response.data);
      console.log('Updated Wishlist Data:', JSON.stringify(response.data));
    } catch (error) {
      console.error('Error fetching wishlist data:', error);
    }
  };

  useEffect(() => {
    getWishlistData();
  }, [token]);

  // Memoize and sort wishlist items
  const sortedWishlist = useMemo(
    () =>
      wishListData?.wishlistItems
        ? [...wishListData.wishlistItems].sort((a, b) => a.id - b.id)
        : [],
    [wishListData]
  );

  const removeBagItem = async (itemId) => {
    try {
      await axios.delete(`http://${ip}:5454/api/wishlist_items/${itemId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
   
      getWishlistData();
    } catch (error) {
      console.log('Error:', error);
    }
  };


  async function MoveToCart(itemId,targetId,selectedSizes,selectedQuantity,targetCategory,selectedColor){

      console.log("\n\n\n"+targetId+" "+selectedSizes+" "+selectedQuantity+" "+targetCategory+" "+selectedColor);
    const dataBag = {
        productId: targetId,
        size: selectedSizes,
        quantity: selectedQuantity,
        category: targetCategory,
        color: selectedColor,
      };

    
    axios.put(`http://${ip}:5454/api/cart/add`, dataBag, {
      headers: {
       'Authorization': `Bearer ${token}`,         
     },
   })
 .then(response => {
   // Handle successful response
   removeBagItem(itemId);
   console.log(response.data);


 })
 .catch(error => {
   // Handle error
   console.error('Error making API requestjhjhjhjhj:', error);
 });

  }


  return (
    <>
       <Topper navigation={navigation} />

       {/* <Text>{JSON.stringify(wishListData)}</Text> */}

       <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity   onPress={() => popFromStack(navigation)}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image source={back} style={{ marginLeft: 12 }} />
            <Text style={{ paddingLeft: 10, color: 'black' }}>WishList</Text>
          </View>
        </TouchableOpacity>
      </View>
      <Text style={{marginLeft:'10%',fontSize:10,color:'#949292'}}>{sortedWishlist.length} Items</Text>

      <ScrollView style={{ marginBottom: 20 }}>
        {sortedWishlist.length > 0 ? (
          <>
            <View style={{ height: 0.5, backgroundColor: '#00338D', marginTop: '4%',marginBottom:'4%'}} />
            {sortedWishlist.map((item) => (
              <View key={item.id} style={{borderBottomWidth:0.6,}}>
                {/* <Text>                 {item.id}: {item.product.title}, {item.product.discountedPrice}
</Text> */}
                <View style={{ flexDirection: 'row', padding: 14,}}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('mainPDP', { category: item.category.name, id: item.id })}
                  >
                    <Image source={{ uri: item.product.imageUrl }} style={{ width: 130, height: 150, borderRadius: 12 }} />
                  </TouchableOpacity>
                  <View style={{ padding: 7, marginLeft: '5%' ,}}>
                    <Text style={{ fontWeight: 'bold', color: 'black' }}>{item.product.brand}</Text>
                    <Text style={{ color: 'black', fontSize: 10, padding: '1%' }}>{item.product.title}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' ,}}>
                      <Text style={{ color: 'black', padding: '1%' }}>₹{item.product.discountedPrice} / ₹ </Text>
                      <Text style={{ color: 'black', textDecorationLine: 'line-through' }}>{item.product.price}</Text>
                      {item.discountPercent > 0 ?
                        <Text style={{ color: '#A4343A', marginLeft: '1%', fontSize: 10 }}> {item.discountPercent}% OFF</Text>
                      : <Text></Text>
                      }
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', padding: 5, justifyContent: 'space-between' }}>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: '3%' }}>
                      <Image source={{ uri: 'https://shorturl.at/cktvN' }} style={{ width: 20, height: 20 }} />
                      <Text style={{ fontSize: 11, color: '#484848', padding: 5 }}>15 days store exchange available</Text>
                    </View>

                  </View>
                  <TouchableOpacity onPress={() => removeBagItem(item.id)}>
                    <Image source={cross} style={{ width: 13, height: 14 }} />
                  </TouchableOpacity>

                </View>
                <View style={{ flexDirection: 'row', borderWidth: 0.3, borderColor: 'black' }}>
                  <TouchableOpacity
                    style={{ width: '50%', padding: 12, marginTop: '1%',  borderRightWidth: 0.2 }}
                    onPress={() => removeBagItem(item.id)}
                  >
                    <Text style={{ textAlign: 'center', fontSize: 16, color: '#000000' }}>Remove</Text>
                  </TouchableOpacity>
                  {/* 
                    const dataBag = {
        productId: targetId,
        size: selectedSizes[0],
        quantity: selectedQuantity,
        category: targetCategory,
        color: selectedColor[0],
      };
                  */}
                  <TouchableOpacity
                    style={{ width: '50%', padding: 12, marginTop: '1%' }}
                    onPress={() => {
                      MoveToCart(item.id, item.product.id, 'M', 1, item.product.category.name, item.product.color);
                      handlePress();
                    }}
                     >
                    <Text style={{ textAlign: 'center', fontSize: 16, color: '#00338D' }}>Move to Bag</Text>
                  </TouchableOpacity>


              </View>
                {/* <Text>{item.product.color}{item.product.category.name}</Text> */}
              </View>
            ))}
          </>
        ) : (
          <>
            <View style={{ marginTop: '30%', marginLeft: '30%' }}>
              <View style={{ width: 150, height: 10, backgroundColor: '#00A3A1', borderRadius: 4 }}></View>
              <View style={{ width: 150, height: 10, backgroundColor: '#00A3A1', borderRadius: 4, marginTop: '6%' }}></View>
              <View style={{ flexDirection: 'row' }}>
                <View>
                  <View style={{ width: 80, height: 10, backgroundColor: '#00A3A1', borderRadius: 4, marginTop: '20%' }}></View>
                  <View style={{ width: 80, height: 10, backgroundColor: '#00A3A1', borderRadius: 4, marginTop: '20%' }}></View>
                </View>
                <Image source={heart} style={{ width: 53, height: 50, marginTop: '3%', marginLeft: '6%' }} />
              </View>
            </View>
            <View style={{ marginTop: '20%', flexDirection: 'row', justifyContent: 'center' }}>
              <Text style={{ color: 'black', fontSize: 22 }}>Your wishlist is empty!</Text>
            </View>
            <View style={{ marginTop: '10%', flexDirection: 'row', justifyContent: 'center' }}>
              <Text style={{ fontSize: 15 }}>Create multiple wishlist collections and share {'\n'}them with your loved ones.</Text>
            </View>
          
          </>
        )}
            <Modal
              visible={isModalVisible}
              animationType="slide"
              transparent={true}
              onRequestClose={closeModal}
            >
              <TouchableWithoutFeedback onPress={closeModal}>
                <View>
                  <TouchableWithoutFeedback>
                    <View style={styles.modalContent}>
                      <Text style={{padding:'1%',fontWeight:'600',color:'white'}}>Successfully moved item to bag </Text>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </TouchableWithoutFeedback>
            </Modal>
      </ScrollView>
    </>
  );
}

const styles = {
 
  modalContent: {
    backgroundColor: '#00A3A1',
    borderRadius: 3.1,
    elevation: 5, // shadow on Android
    height: '5%',
    width: '120%',
    marginTop: '200%', // Adjust this value to position the modal properly
    padding:5,
  },
};

