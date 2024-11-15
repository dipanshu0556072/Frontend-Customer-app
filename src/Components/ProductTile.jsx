import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Modal,
  ScrollView,
  Alert,
  Button,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useCartContext} from '../Context/WomenContext';
import cross from '../PlpScreen/images/close.png';
import ButtonWishOrBag from './ButtonWishOrBag';
import check from '../PlpScreen/images/check.png';
import down from '../down.png';
import {useLoginContext} from '../Login/LoginCartProvider';
import axios from 'axios';
import ShowProductSplitAmount from './ShowProductSplitAmount';
import PromotionDropdown from './PromotionDropdown';

const ProductTile = ({navigation}) => {
  const {ip, token} = useLoginContext();
  const {
    cartItem,
    setCartItem,
    wishListProductId,
    setWishListProductId,
    cartProductId,
    setCartProductId,
  } = useCartContext();
  const [showActivityIndicator, setShowActivityIndicator] = useState(false);
  const [modified, setModified] = useState(false); // Track modification
  const [showModalVisible, setShowModalVisible] = useState(false);
  const [showModalData, setShowModalData] = useState([]);
  const [selectedTile, setSelectedTile] = useState(null);
  const [selectedCartItemId, setSelectedCartItemId] = useState(null);
  const [selectedCartItemCategory, setSelectedCartItemCategory] =
    useState(null);
  const [promotionsData, setPromotionsData] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);
  const productPrice = 1999; // Example product price
  const productDiscountedPrice = 699; // Example discounted price

  //get date as format 26 May,2024
  const addDays = (date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };

  const formatDate = date => {
    const options = {day: 'numeric', month: 'long', year: 'numeric'};
    return date.toLocaleDateString('en-US', options);
  };

  const getCart = async () => {
    try {
      const response = await axios.get(`http://${ip}:5454/api/cart/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCartItem(response.data);
      <PromotionDropdown/>
    } catch (error) {
      console.error('Error fetching cart data:', error);
    }
  };
  //remove cartItem
  const removeCartItem = async itemId => {
    setShowActivityIndicator(true);
    const header = {
      Authorization: `Bearer ${token}`,
    };

    try {
      await axios.delete(`http://${ip}:5454/api/cart_items/${itemId}`, {
        headers: header,
      });
      getCart();

      setCartProductId([cartProductId, item?.product?.id]);
      setModified(true); // Set modification flag
      console.log('Removed cart item successfully!');
    } catch (error) {
    } finally {
      setTimeout(() => {
        setShowActivityIndicator(false);
      }, 400);
    }
  };

  //update cartItem
  const updateCartItem = async itemId => {
    setShowActivityIndicator(true);
  

    let data;
    if (selectedCartItemCategory == 'qty') {
      data = {
        quantity: selectedTile,
      };
    } else {
      data = {
        size: selectedTile,
      };
    }

    console.log(JSON.stringify(data));
    try {
      const response = await axios.put(
        `http://${ip}:5454/api/cart_items/${selectedCartItemId}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      
      getCart();
      <PromotionDropdown/>
    } catch (error) {
    } finally {
      setTimeout(() => {
        setShowActivityIndicator(false);
      }, 400);
    }
  };

  //show modal or not
  const handleCloseModal = () => {
    setShowModalVisible(false);
  };

  // Show the size or qty modal for a specific product
  const showModal = (category, productId, itemId) => {
    if (category === 'size') {
      const selectedProduct = cartItem?.cartItems?.find(
        item => item.product.id === productId,
      );

      // Extract sizes only for the selected product
      const sizeNames = selectedProduct?.product?.sizes
        ? selectedProduct.product.sizes.map(size => size.name)
        : [];

      console.log('Size names for product ID', productId, ':', sizeNames); // Log sizes for the specific product

      setShowModalData(sizeNames);
    } else {
      const quantityArray = Array.from({length: 10}, (_, i) => i + 1);
      setShowModalData(quantityArray);
    }
    setShowModalVisible(true);
    setSelectedCartItemId(itemId);
    setSelectedCartItemCategory(category);
  };
  //modify quantity or size of the cartItem
  const modificationINCartItem = async itemId => {
    updateCartItem(selectedCartItemId);
    setShowModalVisible(false);
  };

  //get cartObject by productId
  const getCartObjectByProductId = productId => {
    return cartItem?.cartItems?.find(
      cartObject => cartObject.product.id === productId,
    );
  };

  // UseEffect to get updated cart if modified
  useEffect(() => {
    if (modified) {
      getCart();
      setModified(false); // Reset modification flag after fetching
    }
  }, [modified]);
  useEffect(() => {}, [cartItem, showModalData, selectedTile]);

  return (
    <View>
      {cartItem.cartItems.map((item, index) => (
        <View style={styles.productContainer} key={item.id || index}>
          {/* Cross mark for removing item from cart */}
          <TouchableOpacity
            style={styles.crossMark}
            onPress={() => {
              removeCartItem(item?.id);
            }}>
            <Image source={cross} style={styles.crossImage} />
          </TouchableOpacity>

          <View>
            <View style={styles.container}>
              <View style={styles.productRow1}>
                <Image
                  source={{uri: item.product.imageUrl[0]}}
                  style={styles.imageSize}
                />
              </View>

              <View style={styles.productRow2}>
                <Text style={styles.productBrand}>{item.product.brand}</Text>
                <Text style={styles.productTitle}>{item.product.title}</Text>
                <View
                  style={[
                    styles.productColor,
                    {backgroundColor: item.product.color},
                  ]}
                />
                <View style={styles.productC1}>
                  <Text style={styles.priceText}>
                    ₹
                    {item?.discountedPrice
                      ? parseInt(item?.discountedPrice)
                      : item.product.discountedPrice}{' '}
                    /
                  </Text>
                  <Text
                    style={[
                      styles.priceText,
                      {textDecorationLine: 'line-through'},
                    ]}>
                    ₹{item?.product?.price * item?.quantity}
                  </Text>
                  {item.discountPercent > 0 && (
                    <Text style={styles.discountPercent}>
                      {item.discountPercent}% OFF
                    </Text>
                  )}
                </View>

                {/* Size and quantity selection */}
                <View style={styles.sizeContainer}>
                  <TouchableOpacity
                    style={styles.sizeContainer2}
                    onPress={() => {
                      showModal('size', item?.product?.id, item?.id);
                    }}>
                    <Text style={styles.sizeText}>Size:</Text>
                    <Text
                      style={[
                        styles.sizeText,
                        {fontWeight: '400', padding: 1},
                      ]}>
                      {item.size}
                    </Text>
                    <Image source={down} style={styles.downImage} />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.sizeContainer2}
                    onPress={() => {
                      showModal('qty', item?.product?.id, item?.id);
                    }}>
                    <Text style={styles.sizeText}>Qty:</Text>
                    <Text
                      style={[
                        styles.sizeText,
                        {fontWeight: '400', padding: 1},
                      ]}>
                      {item.quantity}
                    </Text>
                    <Image source={down} style={styles.downImage} />
                  </TouchableOpacity>
                </View>

                {/* Promotion discount split */}
                {item?.product?.appliedPromotion &&
                  Object.keys(item.product.appliedPromotion).length > 0 && (
                    <>
                      <TouchableOpacity
                        style={styles.promotionOfferBox}
                        onPress={() => {
                          setModalVisible(true);
                          setPromotionsData(item.product.appliedPromotion); // Pass the object directly
                          setSelectedCartItemId(item); // Set selected item ID
                        }}>
                        <Text style={styles.promotionOfferBoxText}>
                          {Object.keys(item.product.appliedPromotion).length}{' '}
                          offers applied
                        </Text>
                      </TouchableOpacity>

                      <ShowProductSplitAmount
                        cartItem={modalVisible ? selectedCartItemId : null}
                        isModalVisible={modalVisible}
                        onClose={() => {
                          setModalVisible(false);
                          setSelectedCartItemId(null); // Reset selected item ID on close
                        }}
                      />
                    </>
                  )}

                {/* Exchange information */}
                <View style={styles.exchangeInfoContainer}>
                  <Image
                    source={{uri: 'https://shorturl.at/cktvN'}}
                    style={styles.exchangeInfoIcon}
                  />
                  <Text style={styles.exchangeInfoText}>
                    15 days store exchange available
                  </Text>
                </View>

                {/* Delivery information */}
                <View style={styles.container1}>
                  <Image source={check} style={styles.deliveryStatus} />
                  <Text style={styles.deliveryStatusText}>
                    Delivery by{' '}
                    <Text style={{fontWeight: '700'}}>
                      {formatDate(addDays(new Date(), 3))}
                    </Text>
                  </Text>
                </View>
              </View>
            </View>
            {/* Button for remove to bag or add to bag or add to wishlist */}
            <ButtonWishOrBag item={item} />
          </View>
        </View>
      ))}

      {showActivityIndicator && (
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator size="large" color="#00338D" />
        </View>
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModalVisible}
        onRequestClose={() => {
          handleCloseModal();
        }}>
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.crossModalMark}
            onPress={() => {
              handleCloseModal();
            }}>
            <Image source={cross} style={styles.modalCrossImage} />
          </TouchableOpacity>
          <View style={styles.modalContent}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              {showModalData && showModalData.length > 0 ? (
                <View style={styles.showModalData}>
                  {showModalData.map((item, index) => (
                    <>
                      <TouchableOpacity
                        key={index}
                        style={[
                          styles.itemButton,
                          {
                            backgroundColor:
                              selectedTile == item ? '#00338D' : 'white',
                          },
                        ]}
                        onPress={() => {
                          setSelectedTile(item);
                        }}>
                        <Text
                          style={[
                            styles.itemButtonText,
                            {color: selectedTile == item ? 'white' : '#00338D'},
                          ]}>
                          {item}
                        </Text>
                      </TouchableOpacity>
                    </>
                  ))}
                </View>
              ) : (
                // Optional: Provide a message if there's no data
                <Text>No data available</Text>
              )}
            </ScrollView>
            <TouchableOpacity
              style={styles.selectionButton}
              onPress={() => {
                modificationINCartItem();
              }}>
              <Text style={styles.selectionButtonText}>DONE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ProductTile;

const styles = StyleSheet.create({
  productContainer: {
    marginTop: 12,
    borderTopWidth: 0.7,
    borderTopColor: '#00338D',
    position: 'relative',
    flexDirection: 'row',
  },
  container: {flexDirection: 'row', alignItems: 'center'},
  crossMark: {
    position: 'absolute',
    top: 8,
    right: 10,
  },
  crossImage: {
    height: 15,
    width: 15,
  },
  productRow1: {
    flexDirection: 'row',
    padding: 25,
    width: '40%',
  },
  productRow2: {
    width: '60%',
    padding: 12,
  },
  imageSize: {
    width: 130,
    height: 150,
    borderRadius: 12,
  },
  productBrand: {fontWeight: 'bold', color: 'black'},
  productTitle: {color: 'black', fontSize: 10, padding: '1%'},
  productC1: {flexDirection: 'row', alignItems: 'center'},
  priceText: {color: 'black', padding: '1%'},
  discountPercent: {color: '#A4343A', marginLeft: '1%', fontSize: 10},
  productColor: {
    width: 20,
    height: 20,
    borderRadius: 13,
    marginTop: 5,
    marginBottom: 5,
  },
  exchangeInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '1%',
  },
  exchangeInfoIcon: {
    width: 17,
    height: 17,
  },
  exchangeInfoText: {
    fontSize: 10.5,
    color: '#484848',
    padding: 3,
  },
  container1: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deliveryStatus: {
    width: 13,
    height: 13,
    margin: '2%',
  },
  deliveryStatusText: {
    color: 'black',
    fontSize: 11,
    fontWeight: '400',
  },
  dropDownBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D3D3D3',
    padding: '3%',
    borderRadius: 14,
    width: '100%',
    height: '100%',
  },
  sizeText: {
    color: 'black',
    marginLeft: '1%',
    fontSize: 14,
    fontWeight: '700',
    color: 'black',
  },
  sizeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
  },
  sizeContainer2: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D3D3D3',
    padding: '3%',
    borderRadius: 14,
    width: 75,
    height: 30,
    padding: 3,
  },
  downImage: {width: 13, height: 17},
  activityIndicatorContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.7)', // Semi-transparent background
  },

  //show modal
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '100%',
    height: '13%',
    marginTop: '188%',
    backgroundColor: 'white',
    bottom: 0,
    position: 'fixed',
    backgroundColor: 'white',
  },
  showModalData: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: '2%',
  },
  itemButton: {
    margin: 2.5,
    height: 50,
    width: 50,
    borderColor: '#00338D',
    borderWidth: 1,
    borderRadius: 50,
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
    marginLeft: 13,
  },
  itemButtonText: {
    color: '#00338D',
    fontWeight: '600',
    textAlign: 'center', // Center text within the Text component
  },
  crossModalMark: {
    position: 'absolute',
    top: '83%',
    backgroundColor: 'white',
    padding: 7,
    borderRadius: 30,
  },
  modalCrossImage: {
    width: 16,
    height: 16,
  },
  selectionButton: {
    alignItems: 'center',
    width: '100%',
    height: '33%',
    backgroundColor: '#00338D',
    justifyContent: 'center',
  },
  selectionButtonText: {
    color: 'white',
    fontWeight: '600',
    marginBottom: '2%',
  },
  //show promotion box
  promotionOfferBox: {
    height: 32,
    marginTop: '2%',
    marginLeft: '2%',
    justifyContent: 'center',
  },
  promotionOfferBoxText: {
    color: 'green',
    fontWeight: '500',
    fontSize: 12,
  },
});
