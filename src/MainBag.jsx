import React, {useEffect, useState, useRef, useMemo} from 'react';

import back from './PlpScreen/images/back.png';
import {
  Alert,
  TouchableWithoutFeedback,
  Modal,
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TouchableOpacity,
  ScrollView,
  TextInput,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import {RadioButton} from 'react-native-paper';
import point from './PlpScreen/images/point.png';
import 'react-native-gesture-handler';
import {useCartContext} from './Context/WomenContext';
import shopBag from './PlpScreen/images/shopBag.webp';
import axios from 'axios';
import {useLoginContext} from './Login/LoginCartProvider';
import cross from './PlpScreen/images/close.png';
import bag from './PlpScreen/images/bag.png';
import heart from './PlpScreen/images/heart.png';
import down from './down.png';
import moment from 'moment';
import arrow1 from './PlpScreen/images/next.png';
import check from './PlpScreen/images/check.png';
import {color} from 'react-native-elements/dist/helpers';
import xMark from './PlpScreen/images/xMark.png';
import couponDiscount from './PlpScreen/images/CouponDiscount.png';
import ConfettiCannon from 'react-native-confetti-cannon';
import animationImage from './PlpScreen/AnimationCoupon.json';
import cropCheers from './PlpScreen/images/cropCheers.png';
import {useIsFocused} from '@react-navigation/native';
import TopBar from './PlpScreen/TopBar';
import PromotionDropdown from './Components/PromotionDropdown';

const lastViewData = [
  {
    id: 9,
    productImage: 'http://surl.li/njtmm',
    productName: 'Shampoo',
  },
  {
    id: 10,
    productImage: 'https://shorturl.at/xKSX9',
    productName: 'Women-Blue Jeans',
  },
  {
    id: 11,
    productImage: 'http://surl.li/niupv',
    productName: 'Milk',
  },
  {
    id: 12,
    productImage: 'http://surl.li/njmyo',
    productName: 'Belt',
  },
  {
    id: 13,
    productImage: 'http://surl.li/njmzf',
    productName: 'Denim Jacket',
  },
  {
    id: 14,
    productImage: 'http://surl.li/njmzu',
    productName: 'Pink Blazer',
  },
];
import ProductTile from './Components/ProductTile';

const MainBag = ({navigation}) => {
  const {
    decreaseTotalAmount,
    setDecreaseTotalAmount,
    cartItem,
    setCartItem,
    totalAmount,
    setTotalAmount,
    profileAddress,
    setProfileAddress,
    setSelectedWishListItem,
    wishListData,
    setWishListData,
    allSavedAddress,
    setAllSavedAddress,
    setIsItForPlaceOrder,
    deliveryOption,
    setDeliveryOption,
    pinCode,
    setPinCode,
    filteredData,
    setFilteredData,
    setDataStore,
    selectedStorePickupDay,
    selectedStorePickupTime,
    redeemYouPoints,
    setRedeemYourPoints,
    pt,
    setPt,
    isCouponApplied,
    userLoyaltyTier,
    setUserLoyaltyTier,
    setIsCouponApplied,
    storeProductWithSizeAndQuantity,
    setStoreProductWithSizeAndQuantity,
    promotionCouponApplied,
    setPromotionCouponApplied,
    inputPromotionCoupon,
    setInputPromotionCoupon,
    showConfetti,
    setShowConfetti,
    checkIsPromotionCouponApplied,
    setCheckIsPromotionCouponApplied,
    wishListProductId,
    setWishListProductId,
    cartProductId,
    setCartProductId,
    flag,
    setFlag,
    isLoyaltyCouponApplied,
    setIsLoyaltyCouponApplied
  } = useCartContext();

  const [redeemYouPointsError, setRedeemYourPointsError] = useState(false);
  const [redeemYouPointsGoodError, setRedeemYourPointsGoodError] =
    useState(false);
  const [redeemYouPointsNULLError, setRedeemYourPointsNULLError] =
    useState(false);
  const [redeemYouPointIsMuch, setRedeemYouPointIsMuch] = useState(false);

  const [couponCode, setCouponCode] = useState('');
  const [couponCodeError, setCouponCodeError] = useState(false);
  const [couponCodeGoodError, setCouponCodeGoodError] = useState(false);
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
    currentPageIndexCategory1,
    setCurrentPageIndexCategory1,
    loginUserId,
    setLoginUserId,
  } = useLoginContext();
  const [remove1, setRemove1] = useState(0);
  const [productQuantities, setProductQuantities] = useState({});

  const scrollViewRef = useRef();
  const orderSummaryRef = useRef();
  const [orderSummaryYPosition, setOrderSummaryYPosition] = useState(0);
  const [cartCount, setCartCount] = useState(0);

  //for updating the quantity
  const [itemQuantity, setItemQuantity] = useState(0);
  const [itemQuantityId, setItemQuantityId] = useState(0);
  const [itemSize, setItemSize] = useState('');
  //for modal visible
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalSizeVisible, setModalSizeVisible] = useState(false);

  // nowRedeemYourPointsManually
  // const nowRedeemYourPointsManually = async () => {
  //    try {

  //     await axios.post(`http://${ip}:5454/api/rewards/redeem?userId=${loginUserId}&points=${redeemYouPoints}`, null, {
  //       headers: {
  //         'Authorization': `Bearer ${token}`,
  //       },
  //     });
  //      getCart();
  //     setRedeemYourPointsGoodError(true);
  //   } catch (error) {
  //     console.error('Error Posting nowRedeemYourPointsManually data:', error);
  //   }
  // };

  useEffect(() => {}, [cartItem, flag]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (cartItem && cartItem?.totalDiscountedPrice) {
      setTotalAmount(
        flag
          ? cartItem?.totalDiscountedPrice - redeemYouPoints
          : cartItem?.totalDiscountedPrice,
      );
    }
    if (isFocused) {
      checkIsPromotionCouponIsApplied();
    }
  }, [isFocused, cartItem]);

  //get user Loyalty Tier
  async function getUserTier() {
    const header = {
      Authorization: `Bearer ${token}`,
    };

    try {
      const response = await axios.get(
        `http://${ip}:5454/api/tiers/${loginUserId}`,
        {headers: header},
      );
      setUserLoyaltyTier(response.data);
    } catch (error) {
      console.log('Error fetching Loyalty applycoupon.jsx:', error);
    }
  }

  // Fetch wishlist data
  const getWishlistData = async () => {
    try {
      const response = await axios.get(`http://${ip}:5454/api/wishlist/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setWishListData(response.data);
      // console.log('Updated Wishlist Data:', JSON.stringify(response.data));
    } catch (error) {
      console.error('Error fetching wishlist data:', error);
    }
  };

  useEffect(() => {
    if (redeemYouPointsError) {
      setTimeout(() => {
        setRedeemYourPointsError(false);
      }, 4000);
    }
    if (redeemYouPointsNULLError) {
      setTimeout(() => {
        setRedeemYourPointsNULLError(false);
      }, 4000);
    }

    setRedeemYouPointIsMuch;
    if (redeemYouPointIsMuch) {
      setTimeout(() => {
        setRedeemYouPointIsMuch(false);
      }, 4000);
    }
  }, []);

  useEffect(() => {
    checkIsPromotionCouponIsApplied();
    if (promotionCouponApplied) {
      setShowPromotionAppliedCouponAnimation(true);

      setTimeout(() => {
        // setShowPromotionAppliedCouponAnimation(false);
        setPromotionCouponApplied(false);
      }, 3000);
    }
  }, [promotionCouponApplied]);

  let sm = 0;

  const getCart = async () => {
    try {
      const response = await axios.get(`http://${ip}:5454/api/cart/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSelectedWishListItem(response.data);
      setCartItem(response.data);
      // setTotalAmount(response.data.totalDiscountedPrice);
      setDecreaseTotalAmount(response.data.discounte);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Check if coupon is applied already or not
  const checkIsCouponApplied = async () => {
    try {
      const response = await axios.get(`http://${ip}:5454/api/users/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Log the response data for debugging
      console.log('Response Data:', response.data);

      // Check if `discountApplied` is true or "true"
      if (
        response.data?.discountApplied === true ||
        response.data?.discountApplied === 'true'
      ) {
     //  Alert.alert('Hi', 'Coupon is applied');
        setIsLoyaltyCouponApplied(true); // Coupon is applied
      } else {
    //   Alert.alert('Bye', 'Coupon is not applied');
        setIsLoyaltyCouponApplied(false); // Coupon is not applied
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  useEffect(() => {}, [cartItem, totalAmount, flag]);
  useEffect(() => {
    getCart();
  }, [
    couponCodeGoodError,
    token,
    deliveryOption,
    totalAmount,
    itemQuantity,
    itemQuantityId,
  ]);
  useEffect(() => {
    if (itemQuantityId !== 0) {
      getIdQunatityToUpdateQuantity();
    }
  }, []);

  useEffect(() => {}, [totalAmount]);
  useEffect(() => {
    if (cartItem && cartItem.cartItems && cartItem.cartItems.length <= 0) {
      setDataStore([]);
      setFilteredData([]);
      setPinCode('');
      setDeliveryOption('0');
    }
    checkIsCouponApplied();
  }, []);

  async function getIdQunatityToUpdateQuantity() {
    try {
      const url = `http://${ip}:5454/api/cart_items/${itemQuantityId}`;

      const response = axios.put(
        url,
        {
          quantity: itemQuantity,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );
      checkIsPromotionCouponIsApplied();
      // console.log('Response from the server:', response.data);
      // Handle the response from the server as needed
      // await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
      console.error('Error making the request:', error);
      // Handle the error as needed
    }
  }
  async function getIdSizeToUpdateSize() {
    try {
      const url = `http://${ip}:5454/api/cart_items/${itemQuantityId}`;

      const response = axios.put(
        url,
        {
          size: itemSize,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );

      // console.log('Response from the server:', response.data);
      // Handle the response from the server as needed
      // await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
      console.error('Error making the request:', error);
      // Handle the error as needed
    }
  }

  // Memoize and sort cart items
  const sortedCartItems = useMemo(() => {
    if (cartItem && cartItem.cartItems) {
      return [...cartItem.cartItems].sort(
        (a, b) => a.product.id - b.product.id,
      );
    }
    return [];
  }, [cartItem]);

  //getting cartItems
  useEffect(() => {
    setTimeout(() => {
      setCouponCodeError(false);
    }, 10000);

    if (couponCodeGoodError) {
      setCouponCodeError(false);
    }
  }, []);

  const handleApplyRedeemPoints = () => {
    if (flag) {
      setRedeemYouPointIsMuch(true);
    } else {
      if (!redeemYouPoints) {
        setRedeemYourPointsNULLError(true);
      } else if (
        redeemYouPoints &&
        totalAmount >= totalAmount &&
        redeemYouPoints > AllAvailablePointsToRedeem
      ) {
        setRedeemYouPointIsMuch(true);
        setRedeemYourPoints('');
      } else {
        //nowRedeemYourPointsManually();
        setTotalAmount(cartItem?.totalDiscountedPrice - redeemYouPoints);
        setFlag(true);
        getCart();
      }
    }
  };

  let totalDiscount = 0;
  if (cartItem && cartItem.cartItems) {
    cartItem.cartItems.forEach((item, index) => {
      totalDiscount += item.discountPercent;

      // console.log(item.product.category.name+" "+item.discountedPrice+" "+item.price+" "+parseInt(item.discountPercent));
    });
    cartItem.cartItems.forEach((item, index) => {
      // console.log("hetyt"+`${item.product.category.name} ${item.discountedPrice} ${item.price} ${parseInt(item.discountPercent)}`);
    });
  }

  // console.log(JSON.stringify(cartItem));

  const renderItem = ({item}) => (
    <View style={{padding: 10, margin: 5, backgroundColor: '#e0e0e0'}}>
      <TouchableOpacity onPress={() => navigation.navigate('PDP', item.id)}>
        <Image
          source={{uri: item.productImage}}
          style={{width: 100, height: 100}}
        />
      </TouchableOpacity>
      <Text style={{textAlign: 'center', padding: 5, color: 'black'}}>
        {item.productName}
      </Text>
    </View>
  );

  const removeBagItem = async (itemId, price) => {
    // console.log("ieiue"+itemId);
    await axios
      .delete(`http://${ip}:5454/api/cart_items/` + itemId, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        // console.log("\n\n\nID To Be Deleted\n\n\n"+price)
        
      
        setCartCount(cartCount - 1);
        getCart();
      })
      .catch(error => {
        console.log('Error' + error);
      });
  };

  function payOption() {
    if (
      cartItem &&
      cartItem.user.addresses &&
      cartItem.user.addresses.length > 0
    ) {
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
            // console.log("\n\nYES:" + JSON.stringify(profileAddress));
            updatedSavedAddress.push(profileAddressItem);
          }
        });

        // Update the state with the new addresses
        setAllSavedAddress(updatedSavedAddress);
      }

      const forNavigate = page => {
        // console.log(page+" "+currentPage[currentPage.length-1]);
        if (currentPage && currentPage[currentPage.length - 1] !== page) {
          pushToStack(page);
          navigation.navigate(page);
        } else {
          popFromStack(navigation);
        }
      };
      if (filteredData && filteredData.length > 0) {
        // Alert.alert(JSON.stringify("ih"));
        forNavigate('Payment1');
      } else {
        forNavigate('orderSummary');
      }
    } else if (filteredData && filteredData.length > 0) {
      // Alert.alert(JSON.stringify("hi"));
      forNavigate('Payment1');
    } else {
      const forNavigate = page => {
        // console.log(page+" "+currentPage[currentPage.length-1]);
        if (currentPage && currentPage[currentPage.length - 1] !== page) {
          pushToStack(page);
          navigation.navigate(page);
        } else {
          popFromStack(navigation);
        }
      };

      forNavigate('AddressDetail');
      setCurrentPageIndex(-1);
      // setCurrentPageIndexCategory(false);
      setCurrentPageIndexCategory1(false);
      // navigation.navigate('AddressDetail', { editMode: false, selectedAddress: -1 })
    }
    setIsItForPlaceOrder(true);
  }

  const addToWish = async (id, size, qty, category, removeId, price) => {
    // console.log("\n\n\n"+" "+id+" "+size+" "+qty+" "+category+" "+color+" "+p1+" "+p2);

    // console.log(JSON.stringify(wishListData));

    const data = {
      productId: id,
      size: size,
      quantity: 1,
      category: category,
      color: 'green',
    };
    //  console.log(JSON.stringify(data));

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
      // console.log(response.data);
      setWishListData(prevProducts => {
        const newProducts = response.data;
        // console.log("\n\n\nWishList:" + JSON.stringify(newProducts));
        return newProducts;
      });
      removeBagItem(removeId, price);
    } catch (error) {
      console.error('Error fetching WishListdata:', error);
    }
  };

  const handlePress = itemId => {
    setItemQuantityId(itemId);
    setModalVisible(true);
  };
  const handlePress1 = itemId => {
    setItemQuantityId(itemId);
    setModalSizeVisible(true);
  };

  const closeModal = () => {
    getIdQunatityToUpdateQuantity();
    getCart();

    setModalVisible(false);
  };
  const closeModal1 = () => {
    getIdSizeToUpdateSize();
    getIdQunatityToUpdateQuantity();
    getCart();
    setModalSizeVisible(false);
  };

  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  const handleItemPress = item => {
    if (item !== selectedItem) {
      setSelectedItem(item);
      setItemQuantity(item);
    }
  };
  const handleItemPress1 = item => {
    if (item !== selectedSize) {
      setSelectedSize(item);
      setItemSize(item);
    }
  };
  const [AllAvailablePointsToRedeem, setAllAvailablePointsToRedeem] =
    useState('');
  async function seeAllAvailablePointsToRedeem() {
    try {
      const response = await axios.get(
        `http://${ip}:5454/api/rewards/user/${loginUserId}/redeemed-points`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setAllAvailablePointsToRedeem(response.data);
    } catch (error) {
      console.error(
        'Error fetching seeAllAvailablePointsToRedeem data:',
        error,
      );
    }
  }
  useEffect(() => {
    seeAllAvailablePointsToRedeem();
  }, []);
  const renderItem1 = (item, index) => {
    const isSelected = selectedItem === item;

    return (
      <TouchableOpacity
        key={index}
        style={{
          width: 45,
          height: 45,
          borderRadius: 50,
          padding: '3%',
          borderWidth: 1,
          borderColor: '#00338D',
          marginRight: 10,
          alignItems: 'center',
          backgroundColor: isSelected ? '#00338D' : 'transparent',
        }}
        onPress={() => handleItemPress(item)}>
        <Text
          style={{
            color: isSelected ? 'white' : '#00338D',
            fontSize: 16,
            fontWeight: '800',
          }}>
          {item}
        </Text>
      </TouchableOpacity>
    );
  };
  const renderItem2 = (item, index) => {
    const isSelected = selectedSize === item;

    return (
      <TouchableOpacity
        key={index}
        style={{
          width: 45,
          height: 45,
          borderRadius: 50,
          padding: '3%',
          borderWidth: 1,
          borderColor: '#00338D',
          marginRight: 10,
          alignItems: 'center',
          backgroundColor: isSelected ? '#00338D' : 'transparent',
        }}
        onPress={() => handleItemPress1(item)}>
        <Text
          style={{
            color: isSelected ? 'white' : '#00338D',
            fontSize: 16,
            fontWeight: '800',
          }}>
          {item}
        </Text>
      </TouchableOpacity>
    );
  };

  function forNavigate(page) {
    // console.log(page+" "+currentPage[currentPage.length-1]);
    setShowActivityIndicator(false);
    if (currentPage && currentPage[currentPage.length - 1] !== page) {
      pushToStack(page);
      navigation.navigate(page);
    } else {
      popFromStack(navigation);
    }
  }
  // console.log("\n\nCartItem"+JSON.stringify(cartItem));
  const [wishlistStatus, setWishlistStatus] = useState({});

  //show applied promotion coupon Animation
  const [
    showPromotionAppliedCouponAnimation,
    setShowPromotionAppliedCouponAnimation,
  ] = useState(false);
  const handlePromotionAppliedCouponModalClose = () => {
    // Additional logic to handle sorting or other actions
    setShowPromotionAppliedCouponAnimation(false);
    setShowConfetti(false);
  };

  const [sortModalVisible, setSortModalVisible] = useState(false);
  const handleSortModalClose = () => {
    // Additional logic to handle sorting or other actions
    setSortModalVisible(false);
    setShowActivityIndicator(true);
    setTimeout(() => {
      setShowActivityIndicator(false);
    }, 100);
  };
  const showStoreNotification = () => {
    setSortModalVisible(true);
  };

  useEffect(() => {
    if (filteredData && filteredData.length > 0) {
      setDeliveryOption('2');
    }
  }, []);

  function RedeemYourPointsFn() {
    setRedeemYourPoints(AllAvailablePointsToRedeem);
    // Alert.alert("BY"+JSON.stringify(redeemYouPoints));
  }

  async function postApplyCoupon() {
    try {
      await axios.post(
        `http://${ip}:5454/api/coupons/generate/${loginUserId}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setRedeemYourPointsGoodError(true);
    } catch (error) {
      console.error('Error Posting nowRedeemYourPointsManually data:', error);
    }
  }
  const [getRewardHistoryUsedPoint, setGetRewardHistoryUsedPoint] =
    useState('');
  async function getRewardHistoryBurnedPoints() {
    const header = {
      Authorization: `Bearer ${token}`,
    };

    try {
      const response = await axios.get(
        `http://${ip}:5454/api/rewards/user/${loginUserId}/used-points`,
        {headers: header},
      );
      setGetRewardHistoryUsedPoint(response.data.map(item => item.usedPoints));
      // console.log(JSON.stringify(response.data));
    } catch (error) {
      console.log('Error fetching profile:', error);
    }
  }

  useEffect(() => {
    getRewardHistoryBurnedPoints();
  }, []);

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

  const getStoreProductWithSizeAndQuantity = () => {
    setStoreProductWithSizeAndQuantity();
    if (cartItem && cartItem.cartItems && cartItem.cartItems.length > 0) {
      const s1 = cartItem.cartItems.map(item => {
        return item.product.id + item.size + item.quantity;
      });
      setStoreProductWithSizeAndQuantity(s1);
    }
  };

  //removeAppliedPromotionCoupon
  const removePromotionCouponFn = async () => {
    setPromotionCouponApplied(false);
    try {
      await axios.post(
        `http://${ip}:5454/api/cart/removeDiscount?userId=${loginUserId}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setShowActivityIndicator(true);
      setInputPromotionCoupon('');
      setTimeout(() => {
        setShowActivityIndicator(false);
      }, 2000);
      setCheckIsPromotionCouponApplied(0);
      // setTotalAmount(0);
    } catch (error) {
      console.error('Error Posting nowRedeemYourPointsManually data:', error);
    }
  };
  //add extra amount to totalAmount for express delivery
  const addExpressDeliveryCharge = async () => {
    // setTotalAmount(0);
    setShowActivityIndicator(true);
    setTimeout(() => {
      setShowActivityIndicator(false);
    }, 300);
    const data = {
      expressDelivery: true,
    };
    try {
      await axios.post(
        `http://${ip}:5454/api/cart/${loginUserId}/express-delivery`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setTotalAmount(
        flag
          ? cartItem?.totalDiscountedPrice + 100 - redeemYouPoints
          : cartItem?.totalDiscountedPrice + 100,
      );
      getCart();
    } catch (error) {
      console.error('Error Posting expressDeliveryCharge:', error);
    }
  };
  const removeExpressDeliveryCharge = async () => {
    setTotalAmount(0);
    setShowActivityIndicator(true);
    setTimeout(() => {
      setShowActivityIndicator(false);
    }, 300);
    try {
      const response = await axios.delete(
        `http://${ip}:5454/api/cart/${loginUserId}/express-delivery`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(
        'Express delivery charge removed successfully:',
        response.data,
      );
      setTotalAmount(
        flag
          ? cartItem?.totalDiscountedPrice - 100 - redeemYouPoints
          : cartItem?.totalDiscountedPrice - 100,
      );
      return response.data; // Return the response data if needed
    } catch (error) {
      console.error(
        'Error removing express delivery charge:',
        error.response ? error.response.data : error.message,
      );
    }
  };

  const checkIsPromotionCouponIsApplied = async () => {
    try {
      const response = await axios.get(
        `http://${ip}:5454/api/cart/getDiscountAmount?userId=${loginUserId}&promoCode=${inputPromotionCoupon}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setCheckIsPromotionCouponApplied(response.data);
    } catch (error) {
      console.error('Error getting checkIsPromotionCouponIsApplied:', error);
    }
  };

  //show activityIndicator
  const [showActivityIndicator, setShowActivityIndicator] = useState(false);
  const [key, setKey] = useState(0); // Unique key for each confetti instance

  useEffect(() => {
    const interval = setInterval(() => {
      setKey(prevKey => prevKey + 1); // Change key to trigger re-render
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 8000); // Hide confetti after 1 second
    }, 9000); // Fire confetti every 2 seconds

    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <TopBar
        navigation={navigation}
        showKPMGLogo={true}
        showSearchLogo={false}
        showCartLogo={false}
        showWishListLogo={true}
      />
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity
          onPress={() => {
            popFromStack(navigation);
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View>
              <Image source={back} style={{marginLeft: 12}} />
            </View>
            <View style={{marginLeft: '10%'}}>
              <Text style={{color: 'black'}}>Cart</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      {/* <Text>{currentPage}</Text> */}
      {/* 
{
  cartItem && cartItem?.cartItems && cartItem?.cartItems?.length>0 ?
  <ProductTile/>:

} */}
      <ScrollView ref={scrollViewRef} showsVerticalScrollIndicator={false}>
        {cartItem && cartItem.cartItems && cartItem.cartItems.length <= 0 && (
          <>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                padding: '10%',
              }}>
              <Image source={shopBag} style={{width: 300, height: 249}} />
            </View>
            <View style={{padding: 8}}>
              <Text style={styles.heading}>Add from Last Viewed</Text>
              <SafeAreaView>
                <FlatList
                  nestedScrollEnabled={true}
                  showsHorizontalScrollIndicator={false}
                  data={lastViewData}
                  renderItem={renderItem}
                  keyExtractor={item => {
                    item.id;
                  }}
                  horizontal={true}
                />
              </SafeAreaView>
            </View>
            <View style={{marginLeft: '4%'}}>
              <View style={{}}>
                <View
                  style={{flexDirection: 'row', marginTop: '2%', width: 420}}>
                  <View style={{width: '20%'}}>
                    <Image
                      source={{uri: 'https://shorturl.at/yOT08'}}
                      style={{width: 80, height: 78}}
                    />
                  </View>
                  <View
                    style={{
                      padding: 6,
                      backgroundColor: '#fce1e3',
                      width: '70%',
                    }}>
                    <Text style={{fontWeight: '500', color: 'black'}}>
                      Buying for someone else
                    </Text>
                    <Text style={{fontSize: 12}}>
                      Add a gift wrap and a personalized message {'\n'}to make
                      them feel special
                    </Text>
                    <Text style={{fontSize: 12}}>Only for ₹50</Text>
                  </View>
                </View>
              </View>
            </View>
          </>
        )}

        {cartItem && cartItem.cartItems && cartItem.cartItems.length > 0 && (
          <>
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignContent: 'center',
                  alignItems: 'center',
                  marginTop: '4%',
                }}>
                <Text
                  style={{
                    marginLeft: '7%',
                    fontSize: 17,
                    color: 'black',
                    fontWeight: '500',
                    textDecorationLine: 'underline',
                  }}>
                  Choose Your Location{JSON.stringify(isLoyaltyCouponApplied)}
                </Text>
                <TouchableOpacity
                  style={{
                    borderWidth: 0.5,
                    borderColor: 'grey',
                    width: 80,
                    height: 30,
                    marginRight: '4%',
                  }}
                  onPress={() => {
                    forNavigate('chooseStoreUsingPincode');
                  }}>
                  {!pinCode && (
                    <Text style={{marginLeft: '17%', marginTop: '5%'}}>
                      Pincode
                    </Text>
                  )}
                  <Text
                    style={{
                      color: 'black',
                      fontWeight: '600',
                      marginLeft: '17%',
                      marginTop: '5%',
                    }}>
                    {pinCode}
                  </Text>
                </TouchableOpacity>
              </View>
              <Text
                style={{
                  color: 'black',
                  marginLeft: '7%',
                  fontSize: 15,
                  marginTop: '3%',
                  fontWeight: '500',
                }}>
                Delivery option available{' '}
              </Text>
              <Text style={{marginLeft: '7%', fontSize: 12}}>
                Please select delivery option
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  padding: '4%',
                }}>
                <RadioButton
                  value="0"
                  status={deliveryOption === '0' ? 'checked' : 'unchecked'}
                  onPress={() => {
                    setDeliveryOption('0');
                    setFilteredData([]);
                    removeExpressDeliveryCharge();
                  }}
                  color="black"
                />
                <Text style={{color: 'black'}}>Standard{'\n'}Delivery</Text>
                <RadioButton
                  color="black"
                  value="1"
                  status={deliveryOption === '1' ? 'checked' : 'unchecked'}
                  onPress={() => {
                    setDeliveryOption('1');
                    setFilteredData([]);
                    addExpressDeliveryCharge();
                    getCart();
                  }}
                />
                <Text style={{color: 'black'}}>Express{'\n'}Delivery</Text>
                <RadioButton
                  color="black"
                  value="0"
                  status={deliveryOption === '2' ? 'checked' : 'unchecked'}
                  onPress={() => {
                    setDeliveryOption('2');
                    showStoreNotification();
                    removeExpressDeliveryCharge();
                  }}
                />
                <Text style={{color: 'black'}}>Express Store{'\n'}Pick Up</Text>
              </View>
            </View>

            {filteredData &&
              filteredData.length > 0 &&
              deliveryOption === '2' && (
                <>
                  <Text
                    style={{
                      marginLeft: '4%',
                      color: '#9c2f2f',
                      fontSize: 13,
                      padding: '1%',
                    }}>
                    Schedule your Store Pickup basis availabilty.
                    <Text
                      style={{
                        textDecorationLine: 'underline',
                        fontWeight: '500',
                      }}>
                      T&C applied
                    </Text>
                  </Text>
                  <View style={{height: 0.6, backgroundColor: '#00338D'}} />
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      width: 400,
                      padding: '4%',
                      marginLeft: '4%',
                    }}>
                    <View style={{width: '50%'}}>
                      <Text
                        style={{
                          color: 'black',
                          fontWeight: '500',
                          marginBottom: '5%',
                        }}>
                        Store Pickup Details
                      </Text>
                      <Text style={{color: '#00338D', fontWeight: '300'}}>
                        Pick up Date
                      </Text>
                      <Text style={{color: '#00338D', fontWeight: '300'}}>
                        Pick up Time
                      </Text>
                      <Text style={{color: '#00338D', fontWeight: '300'}}>
                        Pick up Store
                      </Text>
                    </View>
                    <View style={{width: '50%', marginTop: '8%'}}>
                      <Text>
                        {selectedStorePickupDay ? selectedStorePickupDay : ''}
                      </Text>
                      <Text>
                        {selectedStorePickupTime ? selectedStorePickupTime : ''}
                      </Text>
                      <Text>
                        {filteredData[0].name
                          ? filteredData[0].name.toUpperCase()
                          : ''}
                      </Text>
                    </View>
                  </View>
                </>
              )}
            <ProductTile />
            <Modal
              animationType="slide"
              transparent={true}
              visible={sortModalVisible}
              onRequestClose={handleSortModalClose}>
              {/* <TouchableWithoutFeedback onPress={handleSortModalClose}> */}
                <View style={styles.modalContainer}>
                  <View style={styles.modalContent1}>
                    <View>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          
                        }}>
                        <Text
                          style={{
                            flex: 1,
                            textAlign: 'center',
                            color: '#00338D',
                            fontWeight: '500',
                            fontSize: 16.5,
                          }}>
                          Store Locator!
                        </Text>
                        <TouchableOpacity
                          onPress={() => {
                            handleSortModalClose();
                            setDeliveryOption('0');
                          }}>
                          <Text style={{fontSize: 23}}>╳</Text>
                        </TouchableOpacity>
                      </View>
                      <View
                        style={{
                          width: '100%',
                          borderBottomWidth: 0.8,
                          borderColor: '#dbd9d9',
                          marginTop: '1%',
                        }}></View>
                      <Text
                        style={{
                          textAlign: 'center',
                          fontSize: 18,
                          color: '#363434',
                          margin: '6%',
                          fontWeight: '400',
                        }}>
                        Choose a nearby Store for pickup
                      </Text>
                      <TouchableOpacity
                        onPress={() => {
                          forNavigate('selectStore');
                          getStoreProductWithSizeAndQuantity();
                        }}>
                        <Text
                          style={{
                            alignSelf: 'center',
                            color: '#9c2f2f',
                            fontSize: 17,
                            textDecorationLine: 'underline',
                          }}>
                          Select Store
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              {/* </TouchableWithoutFeedback> */}
            </Modal>

            <Modal
              animationType="slide"
              transparent={true}
              visible={showPromotionAppliedCouponAnimation}
              onRequestClose={() => {
                handlePromotionAppliedCouponModalClose;
              }}>
              <TouchableWithoutFeedback
                onPress={handlePromotionAppliedCouponModalClose}>
                <View style={styles.modalContainer}>
                  <View style={styles.modalContent1}>
                    <Image
                      source={cropCheers}
                      style={{
                        width: 110,
                        height: 110,
                        marginLeft: '35%',
                        marginTop: '-25%',
                      }}
                    />
                    <View>
                      {/* <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Text style={{ flex: 1, textAlign: 'center', color: '#00338D', fontWeight: '500', fontSize: 16.5 }}>Store Locator!</Text>
                      <TouchableOpacity onPress={()=>{handlePromotionAppliedCouponModalClose()}}>
                        <Text style={{fontSize:23}}>╳</Text>
                      </TouchableOpacity>
                     </View> */}
                      <Text style={styles.promotionText1}>
                        {inputPromotionCoupon.toUpperCase()} Applied
                      </Text>
                      <Text style={styles.promotionText2}>
                        ₹{Math.ceil(checkIsPromotionCouponApplied)}
                      </Text>
                      <Text style={styles.promotionText3}>
                        saved! that feels amazing, right?
                      </Text>
                    </View>
                  </View>
                  {showConfetti && (
                    <ConfettiCannon
                      key={key} // Unique key for each instance
                      count={70} // Reduced count for better performance
                      origin={{x: 0, y: 0}}
                      fadeOut={true}
                      autoStart={true}
                      fallSpeed={5000} // Adjust fall speed
                    />
                  )}
                  <TouchableOpacity
                    onPress={() => {
                      handlePromotionAppliedCouponModalClose();
                      if (cartItem) {
                        sm = cartItem.totalDiscountedPrice;
                      }
                    }}>
                    <Image source={xMark} style={styles.crossMark} />
                  </TouchableOpacity>
                </View>
              </TouchableWithoutFeedback>
            </Modal>

            <View style={{padding: 12}}>
              <View style={{marginTop: '4%'}}>
                <Text style={styles.heading}>Offers & Benefits</Text>

                {cartItem &&
                  cartItem.cartItems &&
                  cartItem.promoCode &&
                  Object.keys(cartItem.promoCode).length > 0 && (
                    <PromotionDropdown />
                  )}
                {cartItem &&
                  cartItem.cartItems &&
                  cartItem.promoCode &&
                  Object.keys(cartItem.promoCode).length === 0 && ( // Check if promoCode is not empty
                    <TouchableOpacity
                      style={{
                        flexDirection: 'row',
                        width: 420,
                        marginTop: '4%',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        borderWidth: 1,
                        width: '98%',
                        padding: '3%',
                        borderRadius: 12,
                        borderColor: 'grey',
                      }}
                      onPress={() => {
                        forNavigate('applyCoupon');
                      }}>
                      <Text style={{color: 'black'}}>Apply Coupon</Text>
                      <Image source={arrow1} style={{width: 10, height: 10}} />
                    </TouchableOpacity>
                  )}

                {couponCodeError ? (
                  <Text
                    style={{
                      textAlign: 'center',
                      marginTop: '2%',
                      color: '#d10808',
                    }}>
                    coupon not valid!
                  </Text>
                ) : (
                  <Text></Text>
                )}
                {couponCodeGoodError ? (
                  <Text
                    style={{
                      textAlign: 'center',
                      padding: '1%',
                      color: 'green',
                    }}>
                    coupon applied successfully!
                  </Text>
                ) : (
                  <Text
                    style={{
                      textAlign: 'center',
                      padding: '1%',
                      color: 'green',
                    }}></Text>
                )}

                <View style={{}}>
                  <Text style={styles.heading}>Redeem Your Points</Text>
                  <Text
                    style={{fontWeight: '700', fontSize: 13, marginTop: '1%'}}>
                    Available Points:
                    <Text style={{color: 'black', fontWeight: '900'}}>
                      {' '}
                      {AllAvailablePointsToRedeem >= redeemYouPoints &&
                      AllAvailablePointsToRedeem &&
                      flag
                        ? AllAvailablePointsToRedeem - redeemYouPoints
                        : AllAvailablePointsToRedeem}
                    </Text>
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignContent: 'center',
                      alignItems: 'center',
                      marginTop: '5%',
                    }}>
                    <RadioButton
                      value="0"
                      status={
                        redeemYouPoints === AllAvailablePointsToRedeem
                          ? 'checked'
                          : 'unchecked'
                      } // Check if redeemYouPoints is equal to AllAvailablePointsToRedeem
                      onPress={RedeemYourPointsFn} // Set redeemYouPoints to AllAvailablePointsToRedeem
                      color="black"
                    />

                    <Text style={{color: 'black'}}>All Points</Text>
                    <Text style={{marginLeft: '3%', fontWeight: '500'}}>
                      OR
                    </Text>
                    <View
                      style={{
                        marginLeft: '5%',
                        borderBottomWidth: 0.4,
                        flexDirection: 'row',
                        alignContent: 'center',
                        alignItems: 'center',
                        borderBottomWidth: 0.4,
                        width: '32%',
                        borderColor: redeemYouPointsNULLError ? 'red' : '',
                      }}>
                      <TextInput
                        style={{borderRadius: 4}}
                        placeholder="Enter points"
                        placeholderTextColor="#bfbbbb"
                        maxLength={4}
                        keyboardType="numeric"
                        value={redeemYouPoints}
                        onChangeText={text => setRedeemYourPoints(text)}
                      />
                    </View>
                    <View
                      style={{
                        textAlign: 'center',
                        alignItems: 'center',
                        flexDirection: 'row',
                        marginLeft: '2%',
                      }}>
                      <TouchableOpacity
                        style={{
                          padding: '4%',
                          width: '50%',
                          backgroundColor: '#D6D6D6',
                          borderRadius: 6,
                        }}
                        onPress={handleApplyRedeemPoints}>
                        <Text style={{textAlign: 'center', color: 'black'}}>
                          REDEEM
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                {redeemYouPointIsMuch ? (
                  <Text
                    style={{
                      margin: '3%',
                      textAlign: 'center',
                      marginTop: '2%',
                      color: 'red',
                      fontSize: 10,
                    }}>
                    Insufficient points to redeem!
                  </Text>
                ) : redeemYouPointsNULLError ? (
                  <Text
                    style={{
                      margin: '3%',
                      textAlign: 'center',
                      marginTop: '2%',
                      color: 'red',
                      fontSize: 10,
                    }}>
                    Please enter points to redeem!
                  </Text>
                ) : redeemYouPointsGoodError ? (
                  <Text
                    style={{
                      margin: '3%',
                      textAlign: 'center',
                      padding: '1%',
                      color: '#00A3A1',
                      fontSize: 12,
                    }}>
                    Points redeemed successfully!
                  </Text>
                ) : (
                  <Text
                    style={{
                      margin: '3%',
                      textAlign: 'center',
                      marginTop: '2%',
                      color: 'red',
                      fontSize: 12,
                    }}></Text>
                )}

                <View style={{flexDirection: 'row', width: 420}}>
                  <View style={{width: '20%'}}>
                    <Image
                      source={{uri: 'https://shorturl.at/yOT08'}}
                      style={{width: 80, height: 78}}
                    />
                  </View>
                  <View
                    style={{
                      padding: 6,
                      backgroundColor: '#fce1e3',
                      width: '70%',
                    }}>
                    <Text style={{fontWeight: '500', color: 'black'}}>
                      Buying for someone else
                    </Text>
                    <Text style={{fontSize: 12}}>
                      Add a gift wrap and a personalized message {'\n'}to make
                      them feel special
                    </Text>
                    <Text style={{fontSize: 12}}>Only for ₹50</Text>
                  </View>
                </View>
                <View
                  style={{marginTop: '4%'}}
                  ref={orderSummaryRef}
                  onLayout={event => {
                    const {y} = event.nativeEvent.layout;
                    setOrderSummaryYPosition(y);
                  }}>
                  <Text
                    style={{color: 'black', fontWeight: '600', fontSize: 16}}>
                    Order Summary
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={{
                        marginTop: '4%',
                        padding: '1%',
                        color: 'rgba(0,0,0,0.7)',
                        marginLeft: '1%',
                      }}>
                      Bag Total
                    </Text>

                    <Text
                      style={{
                        marginTop: '4%',
                        padding: '1%',
                        color: 'rgba(0,0,0,0.7)',
                      }}>
                      ₹{cartItem?.totalPrice}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      padding: 5,
                      justifyContent: 'space-between',
                    }}>
                    <View>
                      <Text style={{color: 'rgba(0,0,0,0.7)'}}>
                        Total Saving
                      </Text>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                      }}>
                      <Text style={{color: '#388E3C'}}>
                        - ₹{cartItem?.discounte}
                      </Text>
                    </View>
                  </View>
                  {cartItem?.promotion_discount != null &&
                    cartItem.promotion_discount > 0 && (
                      <View
                        style={{
                          flexDirection: 'row',
                          padding: 5,
                          justifyContent: 'space-between',
                        }}>
                        <View>
                          <Text style={{color: 'rgba(0,0,0,0.7)'}}>
                            Promotion Discount
                          </Text>
                        </View>

                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                          }}>
                          <Text style={{color: '#388E3C'}}>
                            - ₹{Math.ceil(cartItem.promotion_discount)}
                          </Text>
                        </View>
                      </View>
                    )}

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={{
                        padding: '1%',
                        color: 'rgba(0,0,0,0.7)',
                      }}>
                      Delivery Charge
                    </Text>

                    {deliveryOption === '1' ? (
                      <Text
                        style={{
                          padding: '1%',
                          color: '#9c2f2f',
                        }}>
                        +100
                      </Text>
                    ) : (
                      <Text
                        style={{
                          padding: '1%',
                          fontWeight: '500',
                          color: '#388E3C',
                        }}>
                        Free
                      </Text>
                    )}
                  </View>
                  {flag && (
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text
                        style={{
                          padding: '1%',
                          color: 'rgba(0,0,0,0.7)',
                        }}>
                        Redeemed Points
                      </Text>

                      <Text
                        style={{
                          padding: '1%',
                          fontWeight: '500',
                          color: '#388E3C',
                        }}>
                        {redeemYouPoints && flag ? `-${redeemYouPoints}` : '0'}
                      </Text>
                    </View>
                  )}

{isLoyaltyCouponApplied&& (
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text
                        style={{
                          padding: '1%',
                          color: 'rgba(0,0,0,0.7)',
                        }}>
                        Coupon applied
                      </Text>

                      <Text
                        style={{
                          padding: '1%',
                          fontWeight: '500',
                          color: '#388E3C',
                        }}>
                        
                      </Text>
                    </View>
                  )}

                  {isCouponApplied && (
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text
                        style={{
                          padding: '1%',
                          fontWeight: '500',
                          color: '#aba9a9',
                        }}>
                        Coupon Amount
                      </Text>
                      {isCouponApplied && (
                        <Text
                          style={{
                            padding: '1%',
                            fontWeight: '500',
                            color: '#00A3A1',
                          }}>
                          -
                          {isCouponApplied
                            ? userLoyaltyTier === 'SILVER'
                              ? Math.ceil(totalAmount / 0.97) - totalAmount
                              : userLoyaltyTier === 'GOLD'
                              ? Math.ceil(totalAmount / 0.92) - totalAmount
                              : Math.ceil(totalAmount / 0.92) - totalAmount
                            : Math.floor(totalAmount / 0.92) - totalAmount}
                        </Text>
                      )}
                    </View>
                  )}
                </View>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                padding: 8,
                borderWidth: 0.3,
                justifyContent: 'space-between',
              }}>
              <View>
                <Text style={{fontWeight: '600', color: 'black'}}>
                  Amount Payable
                </Text>
              </View>
              <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                <Text style={{fontWeight: '600', color: 'black'}}>
                  ₹{totalAmount}
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                padding: 8,
                borderWidth: 0.3,
                borderBottomWidth: 0,
                justifyContent: 'space-between',
              }}>
              <View>
                {/* <Text style={{fontWeight:'bold'}}>Total Savings</Text> */}
              </View>
              <View>
                {/* <Text style={{color:'#00A3A1',marginLeft:'72%'}}>₹{totalDiscount}</Text> */}
              </View>
            </View>
            {totalAmount > 0 && (
              <View
                style={{
                  flexDirection: 'row',
                  borderWidth: 0.3,
                  marginTop: '4%',
                  width: '85%',
                  marginLeft: '4%',
                  marginBottom: '6%',
                  backgroundColor: '#f0eded',
                }}>
                <View style={{}}>
                  <Image source={point} />
                </View>
                <View style={{marginLeft: '25%', alignItems: 'center'}}>
                  <Text style={{textAlign: 'center'}}>
                    You’ll earn {Math.floor(totalAmount / 2)} reward points{' '}
                    {'\n'}
                    from this order
                  </Text>
                </View>
              </View>
            )}

            <View style={{padding: 8}}>
              <Text style={styles.heading}>Add from Last Viewed</Text>
              <SafeAreaView>
                <FlatList
                  nestedScrollEnabled={true}
                  data={lastViewData}
                  renderItem={renderItem}
                  keyExtractor={item => {
                    item.id + 9;
                  }}
                  horizontal={true}
                />
              </SafeAreaView>
            </View>
          </>
        )}
      </ScrollView>
      {cartItem && cartItem.cartItems && cartItem.cartItems.length > 0 && (
        <View
          style={{
            flexDirection: 'row',
            width: 400,
            height: 100,
            padding: '2%',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View
            style={{width: '40%', justifyContent: 'center', marginLeft: '4%'}}>
            <TouchableOpacity
              onPress={() => {
                scrollViewRef.current.scrollToEnd({animated: true});
              }}>
              <Text style={{fontSize: 30, color: '#00338D'}}>
                ₹{totalAmount}
              </Text>
              <Text style={{textDecorationLine: 'underline'}}>
                View Details
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: '#00338D',
              width: '45%',
              marginRight: '5%',
              justifyContent: 'center',
              height: '50%',
              borderRadius: 3,
            }}
            onPress={() => {
              payOption();
            }}>
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: 16,
                textAlign: 'center',
              }}>
              PLACE ORDER
            </Text>
          </TouchableOpacity>
        </View>
      )}
      {showActivityIndicator && (
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator size="large" color="#00338D" />
        </View>
      )}
    </View>
  );
};

export default MainBag;

const styles = {
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '5%',
  },
  head: {
    color: 'black',
    fontSize: 14,
    fontWeight: '500',
  },
  heading: {
    color: 'black',
    fontSize: 14,
    fontWeight: '500',
  },
  subheading: {
    fontSize: 13,
  },
  input: {
    height: 40,
    borderWidth: 0.4,
    marginTop: 10,
    marginRight: 10,
    width: '60%',
    borderRadius: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: 'rgba(0, 0, 0, 0.2)', // semi-transparent background
  },
  modalContent: {
    backgroundColor: 'white',

    borderRadius: 10,
    elevation: 5, // shadow on Android
    height: '13%',
    width: '100%',
    marginTop: '183%',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent1: {
    width: '90%',
    height: '23%',
    marginTop: '3%',
    backgroundColor: 'white',
    padding: 20,
    bottom: 0,
    position: 'fixed',
    borderRadius: 10,
    backgroundColor: 'white',
  },
  horizontalLine1: {
    borderBottomWidth: 0.3,
    borderBottomColor: '#d1d1d1',
    marginVertical: 8,
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
  container1: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  crossMark: {
    height: 20,
    width: 20,
    marginTop: '4%',
  },
  promotionText1: {
    textAlign: 'center',
    fontSize: 18,
    color: 'rgba(0,0,0,0.9)',
    marginTop: '5%',
    fontWeight: '500',
  },
  promotionText2: {
    textAlign: 'center',
    fontSize: 34,
    color: 'black',
    marginTop: '1.6%',
  },
  promotionText3: {
    textAlign: 'center',
    fontSize: 12,
    marginTop: '1%',
    color: 'rgba(0,0,0,0.5)',
  },
  removePromotionCoupon: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  appliedCouponRemoveText1: {
    color: 'rgba(0,0,0,0.6)',
    marginLeft: '4%',
    marginTop: '4%',
  },
  appliedCouponRemoveText2: {
    color: 'black',
    fontWeight: '500',
  },
  removePromotionCouponBtn: {
    marginTop: '20%',
    color: '#00338D',
    fontWeight: '500',
    marginRight: '3%',
  },
  promtionRemoveCouponText: {
    color: '#388E3C',
    fontSize: 12,
    marginLeft: '4%',
  },
  couponImage: {
    flexDirection: 'row',
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
  container787: {},
};
