import React, {
  useState,
  useEffect,
  useCallback,
  createContext,
  useContext,
  useRef,
} from 'react';

import TopBar from './PlpScreen/TopBar';
import back from './PlpScreen/images/back.png';
import star from './PlpScreen/images/star2.png';
import {
  Animated,
  Easing,
  Modal,
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';
import heart from './PlpScreen/images/heart3.png';
import bag from './PlpScreen/images/bag2.png';
import {useCartContext} from './Context/WomenContext';
import axios from 'axios';
import {useLoginContext} from './Login/LoginCartProvider';
import next from './PlpScreen/images/next.png';
import cross from './PlpScreen/images/close.png';
import xcross from './PlpScreen/images/xMark.png';
import {ProgressBar, MD3Colors} from 'react-native-paper';
import star1 from './PlpScreen/images/star.png';
import {TextInput, Alert} from 'react-native';
import {json} from 'react-router-dom';
import WishList from './WishList';
import offerDiscount from './PlpScreen/images/offerDiscount.png';
import {useIsFocused} from '@react-navigation/native';

export const BagContext = createContext();

const MainPDP = ({navigation}) => {
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      getAllCoupons();
      getBestCouponByProductId();
    }
  }, [isFocused]);

  //get all active coupons
  async function getAllCoupons() {
    try {
      const response = await axios.get(
        `http://${ip}:5454/api/promotions/active`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setActiveCoupons(response.data);
    } catch (error) {
      console.log('Got error in mainPdp from activeCoupons access' + error);
    }
  }

  //get best coupon available for the particular productId
  const [getBestCoupon, setGetBestCoupon] = useState([]);
  async function getBestCouponByProductId() {
    try {
      const response = await axios.get(
        `http://${ip}:5454/api/bestdeals/best/${productIdOnPdp}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setGetBestCoupon(response.data);
    } catch (error) {
      console.log('Got error in mainPdp from activeCoupons access' + error);
    }
  }

  const scrollY = new Animated.Value(0);

  const [cartCount, setCartCount] = useState(0);
  //get the rating of the currentProduct
  const [productRatings, setProductRatings] = useState({});
  useEffect(() => {
    const getProductRatings = async productId => {
      try {
        const response = await axios.get(
          `http://${ip}:5454/api/ratings/product/${productId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        // Calculate the average rating
        const ratingsArray = response.data.map(ratingObj => ratingObj.rating);
        const averageRating =
          ratingsArray.length > 0
            ? ratingsArray.reduce((a, b) => a + b) / ratingsArray.length
            : 0;

        setProductRatings(prevRatings => ({
          ...prevRatings,
          [productId]: averageRating,
        }));
      } catch (error) {
        console.error(
          `Error fetching ratings for product ${productId}:`,
          error.message,
        );
      }
    };

    // Assuming you have an array of product IDs

    // Fetch and process ratings for all products concurrently
    const fetchRatings = async () => {
      // productIds.forEach((productId) => {
      //   getProductRatings(productId);
      // });
      getProductRatings(productIdOnPdp);
    };

    fetchRatings();
    return () => {
      setTimeout(() => {
        setShowActivityIndicator(false); // Set loading to false when the component unmounts or the dependency changes
      }, 100);
    };
  }, []);

  const [pincode1, setPincode1] = useState('');
  const [pinError, setPinError] = useState(false);
  const [productAvailability, setProductAvailability] = useState(true);
  const [
    checkproductAvailabilityAtPincode,
    setCheckProductAvailabilityAtPincode,
  ] = useState([]);
  const [checkBtn, setCheckBtn] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setPinError(false);
    }, 4000);
    setTimeout(() => {
      setCheckBtn(false);
    }, 8000);
    return () => {
      setTimeout(() => {
        setShowActivityIndicator(false); // Set loading to false when the component unmounts or the dependency changes
      }, 100);
    };
  }, [pinError, isProductFoundAtPincode, checkBtn, productAvailability]);

  const handleSearch = async () => {
    // Perform search based on the entered pincode
    if (!pincode1) {
      setPinError(true);
    } else {
      setCheckBtn(true);
      setCheckProductAvailabilityAtPincode([]);
      try {
        const response = await axios.get(
          `http://${ip}:5454/api/pincodes/${pincode1}/products`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        console.log('Entered Pincode' + JSON.stringify(response.data));
        setCheckProductAvailabilityAtPincode(response.data);
      } catch (error) {
        console.log('Got error in mainPdp from pincode api' + error);
        //  setIsProductFoundAtPincode(false);
        setProductAvailability(false);
      }
      if (
        checkproductAvailabilityAtPincode &&
        checkproductAvailabilityAtPincode.length > 0
      ) {
        setProductAvailability(true);
      } else {
        setProductAvailability(false);
        // Alert.alert('Search', `Searching for pincode: ${pincode1}`);
      }
    }
  };

  const {
    ip,
    token,
    popFromStack,
    pushToStack,
    currentPage,
    setCurrentPage,
    currentPageIndex,
    setCurrentPageIndex,
    currentPageIndexCategory,
    setCurrentPageIndexCategory,
  } = useLoginContext();

  // const {category,id}=route.params;

  const targetCategory = currentPageIndexCategory;
  const targetId = currentPageIndex;
  const [isButtonSelected, setIsButtonSelected] = useState(false);
  const [isWishButtonSelected, setIsWishButtonSelected] = useState(false);
  const [nullError, setNullError] = useState(false);
  const {
    selectedBagItem,
    setSelectedBagItem,
    setSelectedWishListItem,
    products,
    cartItem,
    setCartItem,
    orderPlaced,
    setOrderPlaced,
    allSavedAddress,
    setAllSavedAddress,
    profileAddress,
    setProfileAddress,
    wishListData,
    setWishListData,
    seeMoreFilter,
    setSeeMoreFilter,
    seeMoreFilterCatefory,
    setSeeMoreFilterCategory,
    productIds,
    productIdOnPdp,
    setProductIds,
    isProductFoundAtPincode,
    setIsProductFoundAtPincode,
    backUpPageIndex,
    setBackUpPageIndex,
    showActivityIndicator,
    setShowActivityIndicator,
  } = useCartContext();
  const getProgressBarColor = rating => {
    // Add your logic to determine color based on the rating
    switch (rating) {
      case 5:
        return '#00A3A1';
      case 4:
        return '#04bfbd';
      case 3:
        return '#06d4d1';
      case 2:
        return '#FFBF00';
      case 1:
        return 'red';
      default:
        return 'grey'; // Default color for unknown ratings
    }
  };

  const idsToBeDeleted = [];
  const [isSupplierModalVisible, setSupplierModalVisible] = useState(false);
  const [isCouponModalVisible, setCouponModalVisible] = useState(false);

  const toggleSupplierModal = () => {
    setSupplierModalVisible(!isSupplierModalVisible);
  };

  const toggleCouponModal = () => {
    setCouponModalVisible(!isCouponModalVisible);
  };

  const prevSelectedSizes = useRef(selectedQuantity);
  const prevSelectedColor = useRef(selectedColor);
  const prevSelectedQuantity = useRef(selectedQuantity);
  useEffect(() => {
    if (nullError) {
      setTimeout(() => {
        setNullError(false);
      }, 3000);
    }
    return () => {
      setTimeout(() => {
        setShowActivityIndicator(false); // Set loading to false when the component unmounts or the dependency changes
      }, 100);
    };
  }, [
    cartItem,
    isButtonSelected,
    selectedSizes,
    selectedColor,
    selectedQuantity,
    cartItem,
  ]);

  console.log(
    'selected things:\n' +
      prevSelectedColor +
      '\n' +
      prevSelectedQuantity +
      '\n' +
      prevSelectedSizes +
      '\n',
  );
  const {
    selectedSizes,
    setSelectedSizes,
    selectedColor,
    setSelectedColor,
    selectedQuantity,
    setselectedQuantity,
  } = useCartContext();

  useEffect(() => {
    // Clean up the state when the component is unmounted
    return () => {
      setSelectedSizes([]);
      setSelectedColor([]);
      setselectedQuantity(0);
    };
  }, []);

  const handleSizePress = size => {
    // If the selected size is already in the list, deselect it
    if (selectedSizes.includes(size)) {
      setSelectedSizes([]);
    } else {
      // If a size is selected, exclude others and include the current one
      setSelectedSizes([size]);
    }
  };

  useEffect(() => {
    handleColorPress('green');
    return () => {
      setTimeout(() => {
        setShowActivityIndicator(false); // Set loading to false when the component unmounts or the dependency changes
      }, 100);
    };
  }, []);

  const handleColorPress = color => {
    // If the selected color is already in the list, deselect it
    if (selectedColor.includes(color)) {
      setSelectedColor([]);
    } else {
      // If a color is selected, exclude others and include the current one
      setSelectedColor([color]);
    }
  };

  console.log('\ndata:' + targetCategory + ' \nid:' + targetId);
  const selectedImage = products.filter(
    product =>
      product.category.name === targetCategory && product.id == targetId,
  );

  const removeFromSelectedBag = async targetId => {
    if (cartItem.length > 0) {
      cartItem.cartItems.forEach(item => {
        if (
          selectedSizes.includes(item.size) &&
          selectedColor.includes(item.color) &&
          item.quantity === selectedQuantity
        ) {
          idsToBeDeleted.push(item.id);
        }
      });
    } else {
      console.log('Found Nothing');
    }
    const updatedSelectedBagItem = selectedBagItem.filter(
      item => item.id !== targetId,
    );
    setSelectedBagItem(updatedSelectedBagItem);
    setIsButtonSelected(false);
    setSelectedColor([]);
    setSelectedSizes([]);
    setselectedQuantity(0);
  };

  const addToSelectedBag = (
    targetId,
    selectedSizes,
    selectedQuantity,
    targetCategory,
    selectedColor,
  ) => {
    const existingItemIndex = selectedBagItem.findIndex(
      item => item.id === targetId,
    );
    const pair = {
      id: targetId,
      selectsize: selectedSizes,
      selectquantity: selectedQuantity,
      selcategory: targetCategory,
      selcolor: selectedColor,
    };
    setSelectedBagItem([...selectedBagItem, pair]);
    prevSelectedQuantity.current = selectedQuantity;
  };

  console.log(
    '\nThis is addToselected:' + JSON.stringify(selectedBagItem) + '\n\n',
  );

  //Add to wishList
  async function AddToWishListBtn() {
    if (isProductWishlisted) {
      navigation.navigate('WishList');
    } else {
      const dataBag = {
        productId: targetId,
        size: selectedSizes[0],
        quantity: selectedQuantity,
        category: targetCategory,
        color: selectedColor[0],
      };

      if (!nullError && !isWishButtonSelected) {
        axios
          .put(`http://${ip}:5454/api/wishlist/add`, dataBag, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then(response => {
            // Handle successful response
            setTimeout(() => {
              setShowActivityIndicator(false);
            }, 200);
            console.log('\n\n\nWishList' + response.data);
            setIsProductWishlisted(true);
            getWishList();
            handlePress1();
          })
          .catch(error => {
            // Handle error
            console.error('Error making API requestjhjhjhjhj:', error);
          });
      }
      // Check if any of the selected values are empty and set nullError accordingly
      if (selectedColor.length === 0 || selectedSizes.length === 0) {
        setNullError(true);
        setIsWishButtonSelected(false);
      } else {
        setNullError(false);
      }
    }
  }

  //Get added WishList Data
  async function getWishList() {
    try {
      const response = await axios.get(`http://${ip}:5454/api/wishlist/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTimeout(() => {
        setShowActivityIndicator(false);
      }, 200);

      setWishListData(response.data);
      console.log('\nThis is WishListItem' + JSON.stringify(cartItem));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  async function AddToCartBtn() {
    //getting profile Adddress
    // Assuming this is part of a function or component
    if (
      profileAddress &&
      profileAddress.addresses &&
      profileAddress.addresses.length > 0
    ) {
      // Check and merge profile addresses into allSavedAddress
      const updatedSavedAddress = [...allSavedAddress]; // Create a copy of the existing addresses

      profileAddress.addresses.forEach(profileAddressItem => {
        // Check if the profile address is unique
        const isProfileAddressUnique = !allSavedAddress.some(
          address =>
            address.streetAddress === profileAddressItem.streetAddress &&
            address.city === profileAddressItem.city &&
            address.state === profileAddressItem.state &&
            address.pinCode === profileAddressItem.pinCode &&
            address.mobile === profileAddressItem.mobile,
        );

        // If the profile address is unique, add it to the updatedSavedAddress array
        if (isProfileAddressUnique) {
          console.log('\n\nYES:' + JSON.stringify(profileAddress));
          updatedSavedAddress.push(profileAddressItem);
        }
      });

      // Update the state with the new addresses
      setAllSavedAddress(updatedSavedAddress);
    }
    handleSearch();
    if (!pincode1 && !isProductInBag) {
      Alert.alert('Please check the product availability at your pincode');
    } else if (isProductInBag) {
      navigation.navigate('mainBag');
    } else if (productAvailability && checkBtn) {
      setOrderPlaced(false);
      addToSelectedBag(
        targetId,
        selectedSizes,
        selectedQuantity,
        targetCategory,
        selectedColor,
      );

      const dataBag = {
        productId: targetId,
        size: selectedSizes[0],
        quantity: 1,
        category: targetCategory,
        color: selectedColor[0],
      };
      console.log(
        'this is target id ' +
          parseInt(targetId) +
          ' ' +
          selectedSizes +
          ' ' +
          selectedQuantity +
          ' ' +
          targetCategory +
          ' ' +
          selectedColor,
      );

      // console.log("\n\n\n"+JSON.stringify(products));

      if (!nullError && selectedSizes.length > 0 && selectedColor.length > 0) {
        axios
          .put(`http://${ip}:5454/api/cart/add`, dataBag, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then(response => {
            // Handle successful response
            setTimeout(() => {
              setShowActivityIndicator(false);
            }, 200);

            setIsProductInBag(true);
            console.log(response.data);
            getCart();
            handlePress();
          })
          .catch(error => {
            // Handle error
            console.error('Error making API requestjhjhjhjhj:', error);
          });
      }

      if (isButtonSelected) {
        removeFromSelectedBag(targetId);
      }

      // Check if any of the selected values are empty and set nullError accordingly
      if (
        selectedColor.length === 0 ||
        selectedQuantity === 0 ||
        selectedSizes.length === 0
      ) {
        setNullError(true);
        setIsButtonSelected(false);
      } else {
        setNullError(false);
      }
    }
  }
  const getProgressValue = (rating, targetRating) => {
    if (typeof rating !== 'number' || isNaN(rating) || rating < targetRating) {
      return 0; // Default to 0 if rating is not a valid number or less than targetRating
    }

    const totalRatings = 5; // Assuming 5 stars is the maximum rating
    const targetRatingCount = rating >= targetRating ? 1 : 0; // 1 if the target rating is achieved, 0 otherwise

    return targetRatingCount / totalRatings; // Return the progress as a value between 0 and 1
  };

  async function getCart() {
    try {
      const response = await axios.get(`http://${ip}:5454/api/cart/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTimeout(() => {
        setShowActivityIndicator(false);
      }, 200);

      setCartItem(response.data);
      console.log('\nThis is cartItem' + JSON.stringify(cartItem));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  function Bottle1() {
    axios
      .delete(`http://${ip}:5454/api/cart_items/` + idToBeDeleted, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        console.log('\n\n\nID To Be Deleted\n\n\n');
      })
      .catch(error => {
        console.log('Error' + error);
      });
  }
  useEffect(() => {
    if (cartItem && cartItem.cartItems && cartItem.cartItems.length > 0) {
      setCartCount(cartItem.cartItems.length);
    } else {
      setCartCount(0);
    }
    return () => {
      setTimeout(() => {
        setShowActivityIndicator(false); // Set loading to false when the component unmounts or the dependency changes
      }, 100);
    };
  }, [cartItem]);
  //add to WishList
  const addToWish = async itemId => {
    console.log('\n\n\n' + targetCategory);
    const data = {
      productId: itemId,
      size: 'M',
      quantity: 1,
      category: 'Men formal',
      color: targetCategory,
    };

    try {
      const response = await axios.put(
        `http://${ip}:5454/api/wishlist/add`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(response.data);
      // ((prevProducts) => {
      //   const newProducts = response.data;
      //   console.log("\n\n\nWishList:" + JSON.stringify(newProducts));
      //   return newProducts;
      // });
      getWishListData();
    } catch (error) {
      console.error('Error fetching WishListdata:', error);
    }
  };
  const getWishListData = async () => {
    try {
      const response = await axios.get(`http://${ip}:5454/api/wishlist/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // setWishListData((prevProducts) => {
      //   const newProducts = response.data;
      //   const mergedProducts = [...prevProducts, ...newProducts];
      //   console.log("WishlistdataArray:" + JSON.stringify(mergedProducts));
      //   return mergedProducts;
      // });
      setTimeout(() => {
        setShowActivityIndicator(false);
      }, 200);

      setWishListData(prevProducts => {
        const newProducts = response.data;
        console.log('\n\n\nWishList:' + JSON.stringify(newProducts));
        return newProducts;
      });

      console.log('\n\n\nTOKEN:' + token);
    } catch (error) {
      console.error('Error fetching WishListdata:', error);
    }
  };

  //check if the product is in wishList or not
  const [isProductWishlisted, setIsProductWishlisted] = useState(false);

  useEffect(() => {
    if (
      wishListData &&
      wishListData.wishlistItems &&
      wishListData.wishlistItems.length > 0
    ) {
      // Check if any wishlist item matches the targetId
      const isWishlisted = wishListData.wishlistItems.some(
        wishlistItem => wishlistItem.product.id === targetId,
      );
      setIsProductWishlisted(isWishlisted);
    } else {
      setIsProductWishlisted(false);
    }
    return () => {
      setTimeout(() => {
        setShowActivityIndicator(false); // Set loading to false when the component unmounts or the dependency changes
      }, 100);
    };
  }, [wishListData, targetId]);

  //check if the product is in the bag
  const [isProductInBag, setIsProductInBag] = useState(false);
  useEffect(() => {
    if (cartItem && cartItem.cartItems && cartItem.cartItems.length > 0) {
      const productInBag = cartItem.cartItems.some(
        item => item.product.id === targetId,
      );
      setIsProductInBag(productInBag);
    } else {
      setIsProductInBag(false);
    }
    return () => {
      setTimeout(() => {
        setShowActivityIndicator(false); // Set loading to false when the component unmounts or the dependency changes
      }, 100);
    };
  }, [cartItem, targetId]);

  console.log(JSON.stringify(selectedImage));

  const forNavigate = page => {
    if (
      currentPage &&
      currentPage.length > 0 &&
      currentPage[currentPage.length - 1] !== page
    ) {
      setCurrentPageIndex(itemId);
      pushToStack('mainPlp');
      navigation.navigate('mainPlp');
    }
  };

  //notiication for moving product to bag
  const [isModalVisible, setModalVisible] = useState(false);
  const handlePress = () => {
    setModalVisible(true);
  };

  //notiication for moving product to WishList
  const [isModalVisible1, setModalVisible1] = useState(false);
  const handlePress1 = () => {
    setModalVisible1(true);
  };

  const formatTimeDifference = createdAt => {
    const currentDate = new Date();
    const reviewDate = new Date(createdAt);

    const secondsAgo = Math.floor((currentDate - reviewDate) / 1000);
    const minutesAgo = Math.floor(secondsAgo / 60);
    const hoursAgo = Math.floor(minutesAgo / 60);
    const daysAgo = Math.floor(hoursAgo / 24);
    const monthsAgo = Math.floor(daysAgo / 30);
    const yearsAgo = Math.floor(monthsAgo / 12);

    if (secondsAgo < 60) {
      return `${secondsAgo} sec. ago`;
    } else if (minutesAgo < 60) {
      return `${minutesAgo} min. ago`;
    } else if (hoursAgo < 24) {
      return `${hoursAgo} hours ago`;
    } else if (daysAgo < 30) {
      return `${daysAgo} days ago`;
    } else if (monthsAgo < 12) {
      return `${monthsAgo} months ago`;
    } else {
      return `${yearsAgo} years ago`;
    }
  };

  // useEffect(()=>{

  //      setModalVisible(false);

  // },[isModalVisible]);
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

  const closeModal1 = () => {
    setModalVisible1(false);
  };
  useEffect(() => {
    if (isModalVisible1) {
      setTimeout(() => {
        setModalVisible1(false);
      }, 2000);
    }
  }, [isModalVisible1]);
  const [productReviews, setProductReviews] = useState([]);

  const importReviews = async productId => {
    try {
      const response = await axios.get(
        `http://${ip}:5454/api/reviews/products/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setTimeout(() => {
        setShowActivityIndicator(false);
      }, 200);

      setProductReviews(response.data);
    } catch (error) {
      console.log('Error in mainPDP importReviews ' + error);
    }
  };

  const [expandedIndex, setExpandedIndex] = useState(null);

  const handleSeeMore = index => {
    setExpandedIndex(index === expandedIndex ? null : index);
  };

  useEffect(() => {
    if (targetCategory?.split(' ')[0] === 'Men') {
      setBackUpPageIndex(1);
    } else {
      setBackUpPageIndex(2);
    }
    return () => {
      setTimeout(() => {
        setShowActivityIndicator(false); // Set loading to false when the component unmounts or the dependency changes
      }, 100);
    };
  }, [targetCategory, backUpPageIndex, currentPageIndex]);

  // if(showActivityIndicator){
  //   return (
  //     <>
  //       <View style={styles.activityIndicatorContainer}>
  //         <Text>Loading...</Text>
  //         <ActivityIndicator size="large" color="#00338D" />
  //       </View>
  //     </>
  //   );
  // }

  //get all active coupons
  const [getActiveCoupons, setActiveCoupons] = useState([]);

  return (
    <>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <TopBar navigation={navigation} />
        {/* <Text>{JSON.stringify(checkproductAvailabilityAtPincode)}</Text> */}

        {/* <Text>{currentPage}</Text> */}

        {/* <Text>{JSON.stringify(selectedImage.map(product =>
  product?.sizes.find(size => size.name === "M")?.quantity
))}</Text> */}

        {/* <View style={{flexDirection:'row',alignItems:'center'}}>
          <TouchableOpacity
             onPress={() => navigation.navigate('Fashion')}
            >              
               <View>
                    <Image source={back}  
                      style={{marginLeft:12}}
                      />
               </View>
          </TouchableOpacity> 
          </View> */}

        {selectedImage.map((product, index) => (
          <>
            <ScrollView
              onScroll={Animated.event(
                [{nativeEvent: {contentOffset: {y: scrollY}}}],
                {useNativeDriver: false},
              )}>
              <View key={index + 9} style={{}}>
                {/* <Text>{`Brand: ${product.brand}`}</Text>
          <Text>{`Product Name: ${product.title}`}</Text>
          <Text>{`Price: ₹${product.id}`}</Text>
          <Text>{`category: ${product.category.name}`}</Text>
          <Text>{`Image: ${product.imageUrl}`}</Text>
          <Text>{`Image: ${product.color}`}</Text>  */}

                {/* <Text>here {JSON.stringify(checkproductAvailabilityAtPincode)}</Text> */}

                {/* <Text>{JSON.stringify(selectedImage)}</Text> */}
                <View style={{justifyContent: 'center', padding: 12}}>
                  <ScrollView horizontal>
                    <Image
                      // key={index}
                      source={{uri: product.imageUrl[0]}}
                      style={{width: 380, height: 480, marginTop: '6%'}}
                    />
                  </ScrollView>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <TouchableOpacity
                      onPress={() => {
                        popFromStack(navigation);
                        setCurrentPageIndex(backUpPageIndex);
                      }}
                      style={{
                        top: '-122%',
                        marginRight: '-712%',
                        padding: '4%',
                      }}>
                      <Image source={back} style={{marginLeft: 12}} />
                    </TouchableOpacity>
                  </View>

                  {/* <Text>{backUpPageIndex}</Text> */}
                  <Text
                    style={{
                      color: 'black',
                      padding: 2,
                      fontWeight: 'bold',
                      fontSize: 18,
                      marginLeft: '3%',
                    }}>
                    {product.brand}
                  </Text>
                  <Text
                    style={{
                      padding: 1,
                      marginLeft: '3%',
                      color: 'black',
                      fontFamily: 'montserrat',
                      fontSize: 15,
                      fontWeight: '100',
                    }}>
                    {product.title}
                  </Text>
                  <View style={{flexDirection: 'row'}}>
                    <Text
                      style={{
                        color: '#000000',
                        fontWeight: '700',
                        marginLeft: '3%',
                      }}>
                      ₹{product.discountedPrice} /{' '}
                    </Text>
                    <Text
                      style={{
                        color: '#a19d9d',
                        textDecorationLine: 'line-through',
                        marginLeft: '1%',
                      }}>
                      ₹ {product.price}
                    </Text>
                    {/* <Text>{JSON.stringify(profileAddress)}</Text> */}
                    {product.discountPercent === 0 ? (
                      <Text style={{color: '#A4343A', marginLeft: '3%'}}></Text>
                    ) : (
                      <Text style={{color: '#A4343A', marginLeft: '3%'}}>
                        ({product.discountPercent}% OFF)
                      </Text>
                    )}
                    <Text>{}</Text>
                  </View>
                  <Text
                    style={{
                      color: '#00A3A1',
                      marginLeft: '3%',
                      marginTop: '1%',
                      padding: 1,
                    }}>
                    Inclusive of all taxes
                  </Text>
                  <View style={{width: '84%'}}>
                    <Text
                      style={{
                        fontSize: 12,
                        backgroundColor: '#e8e6e6',
                        marginLeft: '3%',
                      }}>
                      14 days easy return / excahnge applicable for this product
                    </Text>
                  </View>

                  <View style={styles.sizeColorContainer}>
                    {targetCategory !== 'Grocery' &&
                      targetCategory !== 'Beauty' && (
                        <>
                          <Text style={styles.heading}>Size</Text>
                          <View style={{flexDirection: 'row'}}>
                            {selectedImage.map(item => (
                              <View key={item.id}>
                                {item.sizes.map((pro, id) => (
                                  //  <Text key={id}>{pro.name}</Text>
                                  <></>
                                ))}
                              </View>
                            ))}

                            {selectedImage.map(product => (
                              <>
                                {product?.sizes.find(size => size.name === 'S')
                                  ?.quantity > 0 ? (
                                  <>
                                    <TouchableOpacity
                                      style={{
                                        marginTop: '2%',
                                        marginLeft: '3%',
                                        borderWidth: 1,
                                        width: '10%',
                                        padding: '0.3%',
                                        borderRadius: 5,
                                        backgroundColor: selectedSizes.includes(
                                          'S',
                                        )
                                          ? '#00338D'
                                          : 'white',
                                        alignItems: 'center',
                                        justifyContent: 'center', // Center the content vertically and horizontally
                                      }}
                                      onPress={() => handleSizePress('S')}>
                                      <View>
                                        <Text
                                          style={{
                                            color: selectedSizes.includes('S')
                                              ? 'white'
                                              : 'black',
                                          }}>
                                          S
                                        </Text>
                                      </View>
                                    </TouchableOpacity>
                                  </>
                                ) : (
                                  <>
                                    <TouchableOpacity
                                      style={{
                                        marginTop: '2%',
                                        marginLeft: '3%',
                                        borderWidth: 1,
                                        width: '10%',
                                        borderRadius: 5,
                                        backgroundColor: selectedSizes.includes(
                                          'S',
                                        )
                                          ? '#00338D'
                                          : 'white',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderColor: 'grey',
                                      }}
                                      onPress={() => {
                                        Alert.alert(
                                          'Out of Stock',
                                          'This size is currently out of stock.',
                                        );
                                      }}>
                                      <View
                                        style={{
                                          flexDirection: 'row',
                                          alignItems: 'center',
                                        }}>
                                        <View
                                          style={{
                                            flex: 1,
                                            height: 0.6,
                                            backgroundColor: 'grey', // Set the color of the line
                                          }}
                                        />
                                        <Text
                                          style={{
                                            color: 'grey',
                                            textAlign: 'center',
                                            textDecorationLine: 'line-through',
                                            marginLeft: 5, // Adjust the margin to separate the line from the text
                                          }}>
                                          S
                                        </Text>
                                        <View
                                          style={{
                                            flex: 4,
                                            height: 0.6,
                                            backgroundColor: 'grey', // Set the color of the line
                                          }}
                                        />
                                      </View>
                                    </TouchableOpacity>
                                  </>
                                )}

                                {product?.sizes.find(size => size.name === 'M')
                                  ?.quantity > 0 ? (
                                  <>
                                    <TouchableOpacity
                                      style={{
                                        marginTop: '2%',
                                        marginLeft: '3%',
                                        borderWidth: 1,
                                        width: '10%',
                                        padding: '0.3%',
                                        borderRadius: 5,
                                        backgroundColor: selectedSizes.includes(
                                          'M',
                                        )
                                          ? '#00338D'
                                          : 'white',
                                        alignItems: 'center',
                                        justifyContent: 'center', // Center the content vertically and horizontally
                                      }}
                                      onPress={() => handleSizePress('M')}>
                                      <View>
                                        <Text
                                          style={{
                                            color: selectedSizes.includes('M')
                                              ? 'white'
                                              : 'black',
                                          }}>
                                          M
                                        </Text>
                                      </View>
                                    </TouchableOpacity>
                                  </>
                                ) : (
                                  <>
                                    <TouchableOpacity
                                      style={{
                                        marginTop: '2%',
                                        marginLeft: '3%',
                                        borderWidth: 1,
                                        width: '10%',
                                        borderRadius: 5,
                                        backgroundColor: selectedSizes.includes(
                                          'M',
                                        )
                                          ? '#00338D'
                                          : 'white',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderColor: 'grey',
                                      }}
                                      onPress={() => {
                                        Alert.alert(
                                          'Out of Stock',
                                          'This size is currently out of stock.',
                                        );
                                      }}>
                                      <View
                                        style={{
                                          flexDirection: 'row',
                                          alignItems: 'center',
                                        }}>
                                        <View
                                          style={{
                                            flex: 1,
                                            height: 0.6,
                                            backgroundColor: 'grey', // Set the color of the line
                                          }}
                                        />
                                        <Text
                                          style={{
                                            color: 'grey',
                                            textAlign: 'center',
                                            textDecorationLine: 'line-through',
                                            marginLeft: 5, // Adjust the margin to separate the line from the text
                                          }}>
                                          S
                                        </Text>
                                        <View
                                          style={{
                                            flex: 4,
                                            height: 0.6,
                                            backgroundColor: 'grey', // Set the color of the line
                                          }}
                                        />
                                      </View>
                                    </TouchableOpacity>
                                  </>
                                )}

                                {product?.sizes.find(size => size.name === 'L')
                                  ?.quantity > 0 ? (
                                  <>
                                    <TouchableOpacity
                                      style={{
                                        marginTop: '2%',
                                        marginLeft: '3%',
                                        borderWidth: 1,
                                        width: '10%',
                                        padding: '0.3%',
                                        borderRadius: 5,
                                        backgroundColor: selectedSizes.includes(
                                          'L',
                                        )
                                          ? '#00338D'
                                          : 'white',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                      }}
                                      onPress={() => handleSizePress('L')}>
                                      <View>
                                        <Text
                                          style={{
                                            color: selectedSizes.includes('L')
                                              ? 'white'
                                              : 'black',
                                          }}>
                                          L
                                        </Text>
                                      </View>
                                    </TouchableOpacity>
                                  </>
                                ) : (
                                  <>
                                    <TouchableOpacity
                                      style={{
                                        marginTop: '2%',
                                        marginLeft: '3%',
                                        borderWidth: 1,
                                        width: '10%',
                                        borderRadius: 5,
                                        backgroundColor: selectedSizes.includes(
                                          'L',
                                        )
                                          ? '#00338D'
                                          : 'white',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderColor: 'grey',
                                      }}
                                      onPress={() => {
                                        Alert.alert(
                                          'Out of Stock',
                                          'This size is currently out of stock.',
                                        );
                                      }}>
                                      <View
                                        style={{
                                          flexDirection: 'row',
                                          alignItems: 'center',
                                        }}>
                                        <View
                                          style={{
                                            flex: 1,
                                            height: 0.6,
                                            backgroundColor: 'grey', // Set the color of the line
                                          }}
                                        />
                                        <Text
                                          style={{
                                            color: 'grey',
                                            textAlign: 'center',
                                            textDecorationLine: 'line-through',
                                            marginLeft: 5, // Adjust the margin to separate the line from the text
                                          }}>
                                          L
                                        </Text>
                                        <View
                                          style={{
                                            flex: 4,
                                            height: 0.6,
                                            backgroundColor: 'grey', // Set the color of the line
                                          }}
                                        />
                                      </View>
                                    </TouchableOpacity>
                                  </>
                                )}

                                {product?.sizes.find(size => size.name === 'XL')
                                  ?.quantity > 0 ? (
                                  <>
                                    <TouchableOpacity
                                      style={{
                                        marginTop: '2%',
                                        marginLeft: '3%',
                                        borderWidth: 1,
                                        width: '10%',
                                        padding: '0.3%',
                                        borderRadius: 5,
                                        backgroundColor: selectedSizes.includes(
                                          'XL',
                                        )
                                          ? '#00338D'
                                          : 'white',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                      }}
                                      onPress={() => handleSizePress('XL')}>
                                      <View>
                                        <Text
                                          style={{
                                            color: selectedSizes.includes('XL')
                                              ? 'white'
                                              : 'black',
                                          }}>
                                          XL
                                        </Text>
                                      </View>
                                    </TouchableOpacity>
                                  </>
                                ) : (
                                  <>
                                    <TouchableOpacity
                                      style={{
                                        marginTop: '2%',
                                        marginLeft: '3%',
                                        borderWidth: 1,
                                        width: '10%',
                                        borderRadius: 5,
                                        backgroundColor: selectedSizes.includes(
                                          'XL',
                                        )
                                          ? '#00338D'
                                          : 'white',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderColor: 'grey',
                                      }}
                                      onPress={() => {
                                        Alert.alert(
                                          'Out of Stock',
                                          'This size is currently out of stock.',
                                        );
                                      }}>
                                      <View
                                        style={{
                                          flexDirection: 'row',
                                          alignItems: 'center',
                                        }}>
                                        <View
                                          style={{
                                            flex: 1,
                                            height: 0.6,
                                            backgroundColor: 'grey', // Set the color of the line
                                          }}
                                        />
                                        <Text
                                          style={{
                                            color: 'grey',
                                            textAlign: 'center',
                                            textDecorationLine: 'line-through',
                                            marginLeft: 5, // Adjust the margin to separate the line from the text
                                          }}>
                                          XL
                                        </Text>
                                        <View
                                          style={{
                                            flex: 4,
                                            height: 0.6,
                                            backgroundColor: 'grey', // Set the color of the line
                                          }}
                                        />
                                      </View>
                                    </TouchableOpacity>
                                  </>
                                )}
                              </>
                            ))}

                            {product?.sizes.find(size => size.name === 'XXL')
                              ?.quantity > 0 ? (
                              <>
                                <TouchableOpacity
                                  style={{
                                    marginTop: '2%',
                                    marginLeft: '3%',
                                    borderWidth: 1,
                                    width: '10%',
                                    padding: '0.3%',
                                    borderRadius: 5,
                                    backgroundColor: selectedSizes.includes(
                                      'XXL',
                                    )
                                      ? '#00338D'
                                      : 'white',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                  }}
                                  onPress={() => handleSizePress('XXL')}>
                                  <View>
                                    <Text
                                      style={{
                                        color: selectedSizes.includes('XXL')
                                          ? 'white'
                                          : 'black',
                                      }}>
                                      XXL
                                    </Text>
                                  </View>
                                </TouchableOpacity>
                              </>
                            ) : (
                              <>
                                <TouchableOpacity
                                  style={{
                                    marginTop: '2%',
                                    marginLeft: '3%',
                                    borderWidth: 1,
                                    width: '10%',
                                    borderRadius: 5,
                                    backgroundColor: selectedSizes.includes(
                                      'XXL',
                                    )
                                      ? '#00338D'
                                      : 'white',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderColor: 'grey',
                                  }}
                                  onPress={() => {
                                    Alert.alert(
                                      'Out of Stock',
                                      'This size is currently out of stock.',
                                    );
                                  }}>
                                  <View
                                    style={{
                                      flexDirection: 'row',
                                      alignItems: 'center',
                                    }}>
                                    <View
                                      style={{
                                        flex: 1,
                                        height: 0.6,
                                        backgroundColor: 'grey', // Set the color of the line
                                      }}
                                    />
                                    <Text
                                      style={{
                                        color: 'grey',
                                        textAlign: 'center',
                                        textDecorationLine: 'line-through',
                                        marginLeft: 5, // Adjust the margin to separate the line from the text
                                      }}>
                                      XXL
                                    </Text>
                                    <View
                                      style={{
                                        flex: 4,
                                        height: 0.6,
                                        backgroundColor: 'grey', // Set the color of the line
                                      }}
                                    />
                                  </View>
                                </TouchableOpacity>
                              </>
                            )}
                          </View>
                          <Text
                            style={{
                              color: '#A4343A',
                              marginLeft: '4%',
                              marginTop: '1%',
                              fontSize: 12,
                            }}>
                            {selectedSizes && selectedSizes[0]
                              ? 'Hurry up! '
                              : ''}
                            <Text style={{fontWeight: '600'}}>
                              {
                                product?.sizes.find(
                                  size => size.name === selectedSizes[0],
                                )?.quantity
                              }
                            </Text>
                            {selectedSizes && selectedSizes[0]
                              ? ' items left.'
                              : ''}
                          </Text>
                          <Text style={styles.heading}>Available Color</Text>

                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              alignContent: 'center',
                              alignItems: 'center',
                            }}>
                            <View style={{flexDirection: 'row'}}>
                              <TouchableOpacity
                                style={{
                                  borderRadius: 50,
                                  borderWidth: 12,
                                  backgroundColor: product.color,
                                  marginLeft: '10%',
                                  padding: '10%',
                                  height: '20%',
                                  width: '5%',
                                  marginTop: '4%',
                                  marginBottom: '3%',
                                  borderWidth: selectedColor.includes('green')
                                    ? 2
                                    : 2,
                                  borderColor: selectedColor.includes('green')
                                    ? 'red'
                                    : 'white',
                                }}
                                onPress={() =>
                                  handleColorPress('green')
                                }></TouchableOpacity>
                            </View>
                          </View>
                        </>
                      )}

                    <View style={styles.offerMainContainer}>
                      <View style={styles.containerWrapper}>
                        <View style={styles.couponContainer}>
                          <View style={styles.offerMainHead}>
                            <Image
                              source={offerDiscount}
                              style={styles.offerImage}
                            />
                        
                              <View>
                                <Text style={styles.offerHeading}>Coupon</Text>
                                <Text style={styles.couponOfferText}>{getBestCoupon.promotionDetails}</Text>
                                <View
                                  style={{
                                    marginTop: '6%',
                                    width: 65,
                                    alignContent: 'center',
                                    borderStyle: 'dashed',
                                    borderColor: 'rgb(53, 94, 59)',
                                    borderWidth: 1,
                                  }}>
                                  <Text
                                    style={{
                                      color: 'black',
                                      fontWeight: '500',
                                      backgroundColor:
                                        'rgba(144, 238, 144,0.4)',
                                      textAlign: 'center',
                                      fontSize: 12,
                                      padding: 4,
                                    }}>
                                  
                                  </Text>
                                </View>
                              </View>
                      
                          </View>
                        </View>
                        <TouchableOpacity
                          style={styles.moreOfferOption}
                          onPress={toggleCouponModal}>
                          <Text style={styles.seeMoreText}>
                            +{getActiveCoupons.length>1 && `${getActiveCoupons.length-1} Coupon offers`} 
                          </Text>
                        </TouchableOpacity>
                      </View>

                      <View style={styles.containerWrapper}>
                        <View style={styles.promotionContainer}>
                          <View style={styles.offerMainHead}>
                            <Image
                              source={offerDiscount}
                              style={styles.offerImage}
                            />
                            <View>
                              <Text style={styles.offerHeading}>Promotion</Text>
                              <Text style={styles.bankOfferText}>
                              {getBestCoupon.promotionDetails}
                              </Text>
                              <View
                                  style={{
                                    marginTop: '6%',
                                    width: 65,
                                    alignContent: 'center',
                                    borderStyle: 'dashed',
                                    borderColor: 'rgb(53, 94, 59)',
                                    borderWidth: 1,
                                  }}>
                                  <Text
                                    style={{
                                      color: 'black',
                                      fontWeight: '500',
                                      backgroundColor:
                                        'rgba(144, 238, 144,0.4)',
                                      textAlign: 'center',
                                      fontSize: 12,
                                      padding: 4,
                                    }}>
                                  
                                  </Text>
                                </View>
                            </View>
                            
                          </View>
                        </View>
                        <TouchableOpacity style={styles.moreOfferOption}>
                          <Text style={styles.seeMoreText}>
                            +10 Bank offers
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>

                  <View>
                    <Text style={styles.mainHeading}>Product Details</Text>
                    <View style={{flexDirection: 'row', marginLeft: '-1%'}}>
                      {targetCategory !== 'Grocery' && (
                        <>
                          <View style={{}}>
                            <Text style={styles.detail2}>
                              Country of Origin
                            </Text>
                            <Text style={styles.detail2}>Wear Type</Text>
                            <Text style={styles.detail2}>Fabric</Text>
                            <Text style={styles.detail2}>Sleeves</Text>
                            <Text style={styles.detail2}>Fit</Text>
                            <Text style={styles.detail2}>Material & Care</Text>
                          </View>
                        </>
                      )}

                      <View style={{width: '70%'}}>
                        <Text style={styles.detail3}>
                          {product.country?.charAt(0).toUpperCase() +
                            product.country?.slice(1)}
                        </Text>
                        <Text style={styles.detail3}>
                          {product.wearType?.charAt(0).toUpperCase() +
                            product.wearType?.slice(1)}
                        </Text>
                        <Text style={styles.detail3}>
                          {product.fabric?.charAt(0).toUpperCase() +
                            product.fabric?.slice(1)}
                        </Text>
                        <Text style={styles.detail3}>
                          {product.sleeves?.charAt(0).toUpperCase() +
                            product.sleeves?.slice(1)}
                        </Text>
                        <Text style={styles.detail3}>
                          {product.fit?.charAt(0).toUpperCase() +
                            product.fit?.slice(1)}
                        </Text>
                        <Text style={styles.detail3}>
                          {product.materialCare?.charAt(0).toUpperCase() +
                            product.materialCare?.slice(1)}
                        </Text>
                      </View>
                    </View>
                    <View style={{padding: '3%'}}>
                      <Text
                        style={{
                          color: 'black',
                          fontSize: 14,
                          marginBottom: '2%',
                          fontWeight: '500',
                        }}>
                        Product Descritption
                      </Text>
                      <Text style={{fontSize: 12}}>{product.description}</Text>
                    </View>
                    <View
                      style={{
                        marginLeft: '3%',
                        flexDirection: 'row',
                        textAlign: 'center',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          color: 'black',
                          fontSize: 13,
                          marginBottom: '2%',
                          fontWeight: '400',
                        }}>
                        Product Code:
                      </Text>
                      <Text
                        style={{
                          fontSize: 13,
                          marginLeft: '1%',
                          marginTop: '-2%',
                        }}>
                        {product.productCode}
                      </Text>
                    </View>
                    <View
                      style={{
                        marginLeft: '3%',
                        flexDirection: 'row',
                        textAlign: 'center',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          color: 'black',
                          fontSize: 13,
                          marginBottom: '2%',
                          fontWeight: '400',
                        }}>
                        Seller:
                      </Text>
                      <Text
                        style={{
                          fontSize: 13,
                          marginLeft: '1%',
                          marginTop: '-2%',
                        }}>
                        {product.seller}
                      </Text>
                    </View>
                    <View
                      style={{
                        marginLeft: '3%',
                        flexDirection: 'row',
                        textAlign: 'center',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          color: '#A4343A',
                          fontSize: 14,
                          marginBottom: '2%',
                          fontWeight: '300',
                          textDecorationLine: 'underline',
                        }}
                        onPress={toggleSupplierModal}>
                        View Supplier Information
                      </Text>
                    </View>
                    <View style={styles.container}>
                      <View style={styles.lineContainer}>
                        <View style={styles.horizontalLine} />
                        <View style={styles.verticalLine} />
                      </View>
                    </View>

                    <Modal
                      animationType="slide"
                      transparent={true}
                      visible={isCouponModalVisible}
                      onRequestClose={() => {
                        toggleCouponModal();
                      }}>
                      <View
                        style={{
                          flex: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor: 'rgba(0,0,0,0.5)',
                        }}>
                        {/* Your modal content goes here */}
                        <TouchableOpacity onPress={toggleCouponModal}>
                          <Image
                            source={xcross}
                            style={{width: 26, height: 26, marginTop: '10%'}}
                          />
                        </TouchableOpacity>
                        <View style={styles.couponModalContainer}>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                            }}>
                            <View
                              style={{
                                flexDirection: 'row',
                                alignContent: 'center',
                                alignItems: 'center',
                              }}>
                              <Image
                                source={offerDiscount}
                                style={styles.offerImage}
                              />
                              <Text
                                style={{
                                  color: 'black',
                                  fontSize: 18,
                                  fontWeight: '400',
                                }}>
                                Coupons
                              </Text>
                            </View>
                          </View>
                          <ScrollView
                            style={styles.scrollView}
                            nestedScrollEnabled={true}
                            showsVerticalScrollIndicator={false} // Add this line
                          >
                            {getActiveCoupons.map((item, index) => (
                              <View style={styles.offerContainer} key={index}>
                                <View style={styles.offerBox}>
                                  <Text style={styles.offerHead}>
                                    {item.description}
                                  </Text>
                                  <View
                                    style={{
                                      width: 120,
                                      marginLeft: '4%',
                                      marginBottom: '2%',
                                      alignContent: 'center',
                                      borderStyle: 'dashed',
                                      borderColor: 'rgb(53, 94, 59)',
                                      borderWidth: 1,
                                    }}>
                                    <Text
                                      style={{
                                        color: 'black',
                                        fontWeight: '500',
                                        backgroundColor:
                                          'rgba(144, 238, 144,0.4)',
                                        textAlign: 'center',
                                        fontSize: 12,
                                        padding: 4,
                                      }}>
                                      {item.promoCode}
                                    </Text>
                                  </View>

                                  <View style={styles.offerValidity}>
                                    <View
                                      style={{
                                        height: 5,
                                        backgroundColor: 'black',
                                        width: 5,
                                        borderRadius: 12,
                                      }}
                                    />
                                    <Text style={styles.offerText}>
                                      Offer start date{' '}
                                      <Text style={styles.dateText}>
                                        {new Date(
                                          item.startDate,
                                        ).toLocaleDateString('en-US', {
                                          day: '2-digit',
                                          month: 'long',
                                          year: 'numeric',
                                        })}
                                      </Text>
                                    </Text>
                                  </View>
                                  <View style={styles.offerValidity}>
                                    <View
                                      style={{
                                        height: 5,
                                        backgroundColor: 'black',
                                        width: 5,
                                        borderRadius: 12,
                                      }}
                                    />
                                    <Text style={styles.offerText}>
                                      Offer end date{' '}
                                      <Text style={styles.dateText}>
                                        {new Date(
                                          item.endDate,
                                        ).toLocaleDateString('en-US', {
                                          day: '2-digit',
                                          month: 'long',
                                          year: 'numeric',
                                        })}
                                      </Text>
                                    </Text>
                                  </View>
                                </View>
                              </View>
                            ))}
                          </ScrollView>
                        </View>
                      </View>
                    </Modal>

                    <Modal
                      animationType="slide"
                      transparent={true}
                      visible={isSupplierModalVisible}
                      onRequestClose={() => {
                        toggleSupplierModal();
                      }}>
                      <View
                        style={{
                          flex: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor: 'rgba(0,0,0,0.5)',
                        }}>
                        {/* Your modal content goes here */}
                        <View
                          style={{
                            backgroundColor: 'white',
                            padding: 20,
                            borderRadius: 10,
                            width: '80%',
                            height: '60%',
                          }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                            }}>
                            <Text
                              style={{
                                color: 'black',
                                fontSize: 18,
                                fontWeight: '400',
                              }}>
                              Supplier Information
                            </Text>
                            <TouchableOpacity onPress={toggleSupplierModal}>
                              <Image
                                source={cross}
                                style={{width: 13, height: 14}}
                              />
                            </TouchableOpacity>
                          </View>
                          <View>
                            <Text style={{padding: '5%', marginTop: '14%'}}>
                              {product.seller} is Modern jeans began to appear
                              in the 1920s, but sales were largely confined to
                              the working people of the western United States,
                              such as cowboys, lumberjacks, and railroad
                              workers.{product.seller} jeans apparently were
                              first introduced to the East during the dude ranch
                              craze of the 1930s, when vacationing Easterners
                              returned home with tales (and usually examples) of
                              the hard-wearing pants with rivets. Another boost
                              came in World War II, when blue jeans were
                              declared an essential commodity and were sold only
                              to people engaged in defense work.
                            </Text>
                          </View>
                        </View>
                      </View>
                    </Modal>
                    <Text
                      style={{
                        color: 'black',
                        fontSize: 13,
                        marginBottom: '2%',
                        fontWeight: '400',
                        marginLeft: '3%',
                      }}>
                      Availabilty
                    </Text>
                    <Text
                      style={{
                        fontWeight: '300',
                        fontSize: 12,
                        marginLeft: '2%',
                        padding: '1%',
                      }}>
                      Check availabilty at your pincode
                    </Text>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <TextInput
                        style={{
                          borderWidth: 0.2,
                          height: 23,
                          padding: 1,
                          flex: 1,
                          marginRight: 10,
                          marginLeft: '3%',
                        }}
                        maxLength={6}
                        placeholder="Enter Pincode"
                        value={pincode1}
                        keyboardType="numeric"
                        onChangeText={text => setPincode1(text)}
                      />
                      <TouchableOpacity onPress={handleSearch}>
                        {/* You can customize the button component (icon, text, etc.) */}
                        <View
                          style={{
                            padding: 3,
                            backgroundColor: '#00338D',
                            borderRadius: 5,
                          }}>
                          {/* Customize the button content (icon, text, etc.) */}
                          <Text style={{color: 'white', padding: '0.7%'}}>
                            Check
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                    {pinError ? (
                      <Text style={{color: '#A4343A', marginLeft: '3%'}}>
                        Please enter pincode
                      </Text>
                    ) : (
                      <></>
                    )}
                    {!productAvailability && checkBtn && (
                      <Text
                        style={{marginLeft: '3%', color: 'red', fontSize: 12}}>
                        Sorry, product is not available at this pincode.
                      </Text>
                    )}
                    {productAvailability && checkBtn && (
                      <Text
                        style={{
                          marginLeft: '3%',
                          fontSize: 12,
                          color: 'green',
                          fontWeight: '500',
                        }}>
                        Product is available at this pincode.
                      </Text>
                    )}

                    <Text style={styles.heading}>Ratings & Reviews :</Text>

                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignContent: 'center',
                          alignItems: 'center',
                          width: '30%',
                          marginTop: '6%',
                          marginLeft: '5%',
                        }}>
                        {selectedImage.map(product => (
                          <Text
                            style={{
                              marginLeft: '13%',
                              marginTop: '6%',
                              fontSize: 24,
                              color: 'black',
                              paddingRight: '2%',
                            }}>
                            {productRatings[product.id] !== undefined
                              ? productRatings[product.id].toFixed(1)
                              : 'N/A'}
                          </Text>
                        ))}

                        <TouchableOpacity onPress={getCart}>
                          <Image
                            source={star}
                            style={{marginLeft: '8%', width: 30}}
                          />
                        </TouchableOpacity>
                      </View>
                      <View style={{marginTop: '8%', flexDirection: 'column'}}>
                        {selectedImage.map(product => (
                          <View key={product.id} style={{marginBottom: '2%'}}>
                            {[5, 4, 3, 2, 1].map(rating => (
                              <View
                                key={rating}
                                style={{
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                }}>
                                <Text
                                  style={{color: 'black', marginRight: '1%'}}>
                                  {rating}
                                </Text>
                                <Image
                                  source={star1}
                                  style={{width: 10, height: 10}}
                                />
                                <ProgressBar
                                  progress={getProgressValue(
                                    rating,
                                    productRatings[product.id],
                                  )}
                                  color={getProgressBarColor(rating)}
                                  style={{
                                    width: 145,
                                    height: 8,
                                    borderRadius: 12,
                                    marginRight: '1%',
                                  }}
                                />
                              </View>
                            ))}
                          </View>
                        ))}
                      </View>
                    </View>

                    {productReviews.length <= 0 && (
                      <TouchableOpacity
                        onPress={() => importReviews(product.id)}>
                        <Text
                          style={{
                            textAlign: 'center',
                            color: '#4d79ff',
                            marginTop: '10%',
                            textDecorationLine: 'underline',
                          }}>
                          View all
                        </Text>
                      </TouchableOpacity>
                    )}
                    {productReviews &&
                      productReviews.map((item, index) => (
                        <View
                          key={index}
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginTop: '4%',
                          }}>
                          <View style={{marginBottom: '2%'}}>
                            <Text
                              style={{
                                fontSize: 10,
                                color: 'black',
                                padding: '1%',
                              }}>
                              {formatTimeDifference(item.createdAt)}
                            </Text>
                            {/* <Text style={{color:'black',fontSize:12}}>{item.review}</Text>  */}
                            {item.review.length > 30 ? (
                              <TouchableOpacity
                                onPress={() => handleSeeMore(index)}
                                style={{
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                }}>
                                {expandedIndex === index ? (
                                  <Text style={{color: 'black', fontSize: 12}}>
                                    {item.review}
                                  </Text>
                                ) : (
                                  <>
                                    <Text
                                      style={{color: 'black', fontSize: 12}}>
                                      {item.review.slice(0, 30)}
                                    </Text>
                                    <Text
                                      style={{
                                        color: '#00338D',
                                        fontSize: 12,
                                        fontWeight: 'bold',
                                      }}>
                                      ... See more
                                    </Text>
                                  </>
                                )}
                              </TouchableOpacity>
                            ) : (
                              <Text style={{color: 'black', fontSize: 12}}>
                                {item.review}
                              </Text>
                            )}
                          </View>
                          <View style={{}}></View>
                        </View>
                      ))}

                    <TouchableOpacity
                      style={{
                        marginTop: '7%',
                        borderBottomWidth: 0.2,
                        borderColor: 'grey',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                      onPress={() => {
                        setSeeMoreFilter(true);
                        setSeeMoreFilterCategory(product.brand);
                        navigation.navigate('mainPlp', 1);
                      }}>
                      <Text
                        style={{
                          paddingLeft: '4%',
                          fontWeight: '500',
                          color: 'black',
                          fontSize: 15,
                          marginTop: '3%',
                          padding: '1%',
                        }}>
                        More {targetCategory.split(' ')[1]} from this Brand
                      </Text>
                      <Image
                        source={next}
                        style={{width: 10, height: 10, marginRight: '4%'}}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        borderBottomWidth: 0.2,
                        borderColor: 'grey',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                      onPress={() => {
                        navigation.navigate('mainPlp', 1);
                      }}>
                      <Text
                        style={{
                          paddingLeft: '4%',
                          fontWeight: '500',
                          color: 'black',
                          fontSize: 15,
                          marginTop: '3%',
                          padding: '1%',
                        }}>
                        See More {targetCategory.split(' ')[1]}
                      </Text>
                      <Image
                        source={next}
                        style={{width: 10, height: 10, marginRight: '4%'}}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </ScrollView>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: '7%',
                padding: '3%',
              }}>
              <TouchableOpacity
                style={{
                  backgroundColor: '#00A3A1',
                  width: 182,
                  borderRadius: 5,
                  padding: 12,
                  alignItems: 'center',
                }}
                onPress={() => {
                  AddToWishListBtn();
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={heart}
                    style={{width: 20, height: 20, marginRight: '3%'}}
                  />
                  {isProductWishlisted ? (
                    <Text
                      style={{
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: 18,
                      }}>
                      WISHLISTED
                    </Text>
                  ) : (
                    <Text
                      style={{
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: 18,
                      }}>
                      WISHLIST
                    </Text>
                  )}
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  backgroundColor: '#00338D',
                  width: 182,
                  padding: 12,
                  alignItems: 'center',
                  borderRadius: 5,
                }}
                onPress={() => {
                  AddToCartBtn();
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    width: 140,
                    alignItems: 'center',
                  }}>
                  <Image source={bag} style={{width: 17, height: 21}} />
                  {isProductInBag ? (
                    <Text
                      style={{
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: 17,
                      }}>
                      {' '}
                      Go to Bag{' '}
                    </Text>
                  ) : (
                    <Text
                      style={{
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: 17,
                      }}>
                      {' '}
                      ADD TO BAG
                    </Text>
                  )}
                </View>
              </TouchableOpacity>
            </View>
          </>
        ))}

        <Modal
          visible={isModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={closeModal}>
          <TouchableWithoutFeedback onPress={closeModal}>
            <View>
              <TouchableWithoutFeedback>
                <View style={styles.modalContent}>
                  <Text
                    style={{padding: '1%', fontWeight: '600', color: 'white'}}>
                    Item added to cart{' '}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

        <Modal
          visible={isModalVisible1}
          animationType="slide"
          transparent={true}
          onRequestClose={closeModal}>
          <TouchableWithoutFeedback onPress={closeModal}>
            <View>
              <TouchableWithoutFeedback>
                <View style={styles.modalContent}>
                  <Text
                    style={{padding: '1%', fontWeight: '600', color: 'white'}}>
                    Item added to wishlist{' '}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
    </>
  );
};

export default MainPDP;

const styles = StyleSheet.create({
  size: {
    marginTop: '2%',
    paddingLeft: '2.8%',
    marginLeft: '3%',
    borderWidth: 1,
    width: '9%',
    borderRadius: 5,
    backgroundColor: 'blue',
  },

  circle2: {
    borderRadius: 50,
    backgroundColor: 'green',
    marginLeft: '4%',
    padding: '3%',
    height: '20%',
    width: '5%',
    marginTop: '3%',
    marginBottom: '3%',
  },
  circle3: {
    borderRadius: 50,
    backgroundColor: 'orange',
    marginLeft: '4%',
    padding: '3%',
    height: '20%',
    width: '5%',
    marginTop: '3%',
    marginBottom: '3%',
  },
  heading: {
    marginTop: '2.5%',
    paddingLeft: 12,
    color: 'black',
    fontSize: 14,
    fontWeight: '500',
  },
  detail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '50%',
    marginLeft: '3%',
    padding: 0.4,
  },
  detail2: {
    color: 'black',
    fontSize: 12.4,
    marginLeft: '10%',
    padding: 3.2,
  },
  detail3: {
    fontSize: 12.4,
    marginLeft: '10%',
    padding: 3.2,
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
  sizeColorContainer: {
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
    marginTop: '2%',
  },

  offerMainContainer: {
    width: 370,
    margin: '3%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '5%',
  },

  containerWrapper: {
    width: '45%',
  },

  couponContainer: {
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 20,
    width: '100%', // Adjust width to fill the wrapper
    minHeight: 140,
  },

  promotionContainer: {
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 20,
    width: '100%', // Adjust width to fill the wrapper
    minHeight: 140,
  },

  seeMoreText: {
    marginTop: 5, // Adjust spacing between the container and the text
    color: 'rgba(0, 51, 141, 0.8)',
    fontSize: 12,
    fontWeight: '800',
  },

  mainHeading: {
    marginTop: '2%',
    marginLeft: '3%',
    color: 'black',
    fontSize: 14,
    marginBottom: '2%',
    fontWeight: '500',
  },
  offerMainHead: {
    margin: '4%',
    flexDirection: 'row',
  },
  offerImage: {
    width: 16,
    height: 16,
    marginRight: '3%',
  },
  offerHeading: {
    fontSize: 11,
    color: 'black',
  },
  moreOfferOption: {
    marginLeft: '10%',
  },
  couponOfferText: {
    fontSize: 11,
    color: 'rgba(0,0,0,0.8)',
    marginTop: '13%',
    flexShrink: 1,
    flexWrap: 'wrap',
    maxWidth: '90%',
  },
  bankOfferText: {
    fontSize: 11,
    color: 'rgba(0,0,0,0.8)',
    marginTop: '13%',
    flexShrink: 1,
    flexWrap: 'wrap',
    maxWidth: '90%',
  },
  couponModalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '95%',
    height: '82%',
    marginTop: '10%',
  },
  offerContainer: {
    marginTop: '3%',
    width: '100%',
    height: 120,
    borderWidth: 0.6,
    borderColor: '#D3D3D3',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  offerHead: {
    color: 'rgba(0, 0, 0, 0.7)',
    fontSize: 12,
    marginLeft: '4%',
    marginTop: '2%',
    marginBottom: '4%',
  },
  offerBox: {
    width: '100%',
  },
  offerValidity: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: '7%',
  },
  offerText: {
    fontSize: 12,
    marginLeft: '3%',
  },
  dateText: {
    fontWeight: '500',
    color: 'rgba(0, 0, 0, 0.7)',
  },
  scrollView: {
    flex: 1,
  },
});
