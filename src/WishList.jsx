import React, {useEffect, useMemo, useState} from 'react';
import {
  Modal,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import 'react-native-gesture-handler';
import TopBar from './PlpScreen/TopBar';
import back from './PlpScreen/images/back.png';
import cross from './PlpScreen/images/close.png';
import heart from './PlpScreen/images/heart2.png';
import axios from 'axios';
import {useCartContext} from './Context/WomenContext';
import {useLoginContext} from './Login/LoginCartProvider';
import add from './PlpScreen/images/add.png';

export default function WishList({navigation}) {
  const {wishListData, setWishListData, setCartItem, setLovedItems} =
    useCartContext();
  const {ip, token, popFromStack, pushToStack, currentPage} = useLoginContext();

  // Notification for moving product to bag
  const [isModalVisible, setModalVisible] = useState(false);
  const handlePress = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    if (isModalVisible) {
      setTimeout(() => {
        setModalVisible(false);
      }, 2000);
    }
  }, [isModalVisible]);

  // Update Bag
  const getCartData = async () => {
    try {
      const response = await axios.get(`http://${ip}:5454/api/cart/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCartItem(response.data);
      console.log('Updated CartItem: ', JSON.stringify(response.data));
    } catch (error) {
      console.error('Error fetching updated cart data:', error);
    }
  };

  // Fetch wishlist data
  const getWishlistData = async () => {
    try {
      const response = await axios.get(`http://${ip}:5454/api/wishlist/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLovedItems(
        response.data.wishlistItems.map(
          wishlistItem => wishlistItem.product.id,
        ),
      );
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
    [wishListData],
  );

  const removeBagItem = async itemId => {
    try {
      await axios.delete(`http://${ip}:5454/api/wishlist_items/${itemId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      getWishlistData();
    } catch (error) {
      console.log('Error:', error);
    }
  };

  async function MoveToCart(
    itemId,
    targetId,
    selectedSizes,
    selectedQuantity,
    targetCategory,
    selectedColor,
  ) {
    console.log(
      '\n\n\n' +
        targetId +
        ' ' +
        selectedSizes +
        ' ' +
        selectedQuantity +
        ' ' +
        targetCategory +
        ' ' +
        selectedColor,
    );
    const dataBag = {
      productId: targetId,
      size: selectedSizes,
      quantity: selectedQuantity,
      category: targetCategory,
      color: selectedColor,
    };

    axios
      .put(`http://${ip}:5454/api/cart/add`, dataBag, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        // Handle successful response
        removeBagItem(itemId);
        getCartData();
        console.log(response.data);
      })
      .catch(error => {
        // Handle error
        console.error('Error making API requestjhjhjhjhj:', error);
      });
  }

  const navigateToFashion = page => {
    if (
      currentPage &&
      currentPage.length > 0 &&
      currentPage[currentPage.length - 1] !== page
    ) {
      pushToStack(page);
      navigation.navigate(page);
    }
  };

  return (
    <>
      <View style={{flex:1, backgroundColor:'white'}}>
        <TopBar
          navigation={navigation}
          showKPMGLogo={true}
          showSearchLogo={false}
          showCartLogo={true}
          showWishListLogo={false}
        />

        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => popFromStack(navigation)}>
            <View style={styles.headerContent}>
              <Image source={back} style={styles.backImage} />
              <Text style={styles.headerText}>WishList</Text>
            </View>
          </TouchableOpacity>
        </View>
        <Text style={styles.itemCount}>{sortedWishlist.length} Items</Text>

        <ScrollView style={styles.scrollView}>
          {sortedWishlist.length > 0 ? (
            <>
              <View style={styles.divider} />
              {sortedWishlist.map(item => (
                <View key={item.id} style={styles.itemContainer}>
                  <View style={styles.itemContent}>
                    <Image
                      source={{uri: item.product.imageUrl[0]}}
                      style={styles.itemImage}
                    />
                    <View style={styles.itemDetails}>
                      <Text style={styles.itemBrand}>{item.product.brand}</Text>
                      <Text style={styles.itemTitle}>{item.product.title}</Text>
                      <View style={styles.priceContainer}>
                        <Text style={styles.discountedPrice}>
                          ₹{item.product.discountedPrice} / ₹{' '}
                        </Text>
                        <Text style={styles.originalPrice}>
                          {item.product.price}
                        </Text>
                        {item.discountPercent > 0 && (
                          <Text style={styles.discountPercent}>
                            {item.discountPercent}% OFF
                          </Text>
                        )}
                      </View>
                      <View style={styles.exchangeContainer}>
                        <Image
                          source={{uri: 'https://shorturl.at/cktvN'}}
                          style={styles.exchangeImage}
                        />
                        <Text style={styles.exchangeText}>
                          15 days store exchange available
                        </Text>
                      </View>
                    </View>
                    <TouchableOpacity onPress={() => removeBagItem(item.id)}>
                      <Image source={cross} style={styles.removeImage} />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      style={styles.removeButton}
                      onPress={() => removeBagItem(item.id)}>
                      <Text style={styles.removeButtonText}>Remove</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.moveToBagButton}
                      onPress={() => {
                        MoveToCart(
                          item.id,
                          item.product.id,
                          'M',
                          1,
                          item.product.category.name,
                          item.product.color,
                        );
                        handlePress();
                      }}>
                      <Text style={styles.moveToBagButtonText}>
                        Move to Bag
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </>
          ) : (
            <>
              <View style={styles.emptyWishlistContainer}>
                <View style={styles.emptyWishlistBar} />
                <View
                  style={[
                    styles.emptyWishlistBar,
                    styles.emptyWishlistBarMargin,
                  ]}
                />
                <View style={styles.emptyWishlistRow}>
                  <View>
                    <View
                      style={[
                        styles.emptyWishlistSmallBar,
                        styles.emptyWishlistSmallBarMargin,
                      ]}
                    />
                    <View style={styles.emptyWishlistSmallBar} />
                  </View>
                  <Image source={heart} style={styles.heartImage} />
                </View>
              </View>
              <View style={styles.emptyWishlistTextContainer}>
                <Text style={styles.emptyWishlistText}>
                  Your wishlist is empty!
                </Text>
              </View>
              <Text style={styles.emptyWishlistSubtitle}>
                Create multiple wishlist collections and share {'\n'} them with
                your loved ones.
              </Text>
              <TouchableOpacity
                style={styles.addCollectionButton}
                onPress={() => {
                  navigateToFashion('Fashion');
                }}>
                <Image source={add} style={styles.addImage} />
                <Text style={styles.addText}>Add collection</Text>
              </TouchableOpacity>
            </>
          )}
          <Modal
            visible={isModalVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={closeModal}>
            <TouchableWithoutFeedback onPress={closeModal}>
              <View>
                <TouchableWithoutFeedback>
                  <View style={styles.modalContent}>
                    <Text style={styles.modalText}>
                      Successfully moved item to bag{' '}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        </ScrollView>
      </View>
    </>
  );
}

const styles = {
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backImage: {
    marginLeft: 12,
  },
  headerText: {
    paddingLeft: 10,
    color: 'black',
  },
  itemCount: {
    marginLeft: '10%',
    fontSize: 10,
    color: '#949292',
  },
  scrollView: {
    marginBottom: 20,
  },
  divider: {
    height: 0.5,
    backgroundColor: '#00338D',
    marginTop: '4%',
    marginBottom: '4%',
  },
  itemContainer: {
    borderBottomWidth: 0.6,
  },
  itemContent: {
    flexDirection: 'row',
    padding: 14,
  },
  itemImage: {
    width: 130,
    height: 150,
    borderRadius: 12,
  },
  itemDetails: {
    padding: 7,
    marginLeft: '5%',
  },
  itemBrand: {
    fontWeight: 'bold',
    color: 'black',
  },
  itemTitle: {
    color: 'black',
    fontSize: 10,
    padding: '1%',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  discountedPrice: {
    color: 'black',
    padding: '1%',
  },
  originalPrice: {
    color: 'black',
    textDecorationLine: 'line-through',
  },
  discountPercent: {
    color: '#A4343A',
    marginLeft: '1%',
    fontSize: 10,
  },
  exchangeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    justifyContent: 'space-between',
  },
  exchangeImage: {
    width: 20,
    height: 20,
  },
  exchangeText: {
    fontSize: 11,
    color: '#484848',
    padding: 5,
  },
  removeImage: {
    width: 13,
    height: 14,
  },
  buttonContainer: {
    flexDirection: 'row',
    borderWidth: 0.3,
    borderColor: 'black',
  },
  removeButton: {
    width: '50%',
    padding: 12,
    marginTop: '1%',
    borderRightWidth: 0.2,
  },
  removeButtonText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#000000',
  },
  moveToBagButton: {
    width: '50%',
    padding: 12,
    marginTop: '1%',
  },
  moveToBagButtonText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#00338D',
  },
  emptyWishlistContainer: {
    marginTop: '15%',
    marginLeft: '30%',
  },
  emptyWishlistBar: {
    width: 150,
    height: 10,
    backgroundColor: '#00A3A1',
    borderRadius: 4,
  },
  emptyWishlistBarMargin: {
    marginTop: '6%',
  },
  emptyWishlistRow: {
    flexDirection: 'row',
  },
  emptyWishlistSmallBar: {
    width: 80,
    height: 10,
    backgroundColor: '#00A3A1',
    borderRadius: 4,
  },
  emptyWishlistSmallBarMargin: {
    marginTop: '20%',
  },
  heartImage: {
    width: 53,
    height: 50,
    marginTop: '3%',
    marginLeft: '6%',
  },
  emptyWishlistTextContainer: {
    marginTop: '14%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  emptyWishlistText: {
    color: 'black',
    fontSize: 22,
    fontWeight: '500',
  },
  emptyWishlistSubtitle: {
    marginTop: '8%',
    fontSize: 15,
    fontWeight: '500',
    alignSelf: 'center',
    textAlign: 'center',
  },
  addCollectionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: '14%',
  },
  addImage: {
    width: 20,
    height: 20,
  },
  addText: {
    marginLeft: 5,
    color: 'black',
    fontSize: 15,
    fontWeight: '500',
    textDecorationLine: 'underline',
    padding: 1,
  },
  modalContent: {
    backgroundColor: '#00A3A1',
    borderRadius: 3.1,
    elevation: 5, // shadow on Android
    height: '5%',
    width: '120%',
    marginTop: '200%', // Adjust this value to position the modal properly
    padding: 5,
  },
  modalText: {
    padding: '1%',
    fontWeight: '600',
    color: 'white',
    marginLeft: '2%',
  },
};
