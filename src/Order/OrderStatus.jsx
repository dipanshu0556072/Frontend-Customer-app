import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  Modal,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useCartContext} from '../Context/WomenContext';
import back from '../PlpScreen/images/back.png';
import pdf from './pdf.png';
import next from '../PlpScreen/images/next.png';
import cancel from '../PlpScreen/images/cancel.png';
import needHelp from './question.png';
import {useLoginContext} from '../Login/LoginCartProvider';
import axios from 'axios';
import {useRoute} from '@react-navigation/native';
import {Rating, AirbnbRating} from 'react-native-elements';
import {useFocusEffect} from '@react-navigation/native';
import TopBar from '../PlpScreen/TopBar';
import {Dimensions} from 'react-native';
import Progress from '../Progress';
import CheckBox from '@react-native-community/checkbox';
import {RadioButton} from 'react-native-paper';

const OrderStatus = ({navigation}) => {
  const {
    trackCurrentOrderId,
    deliveryOption,
    setReceiptData,
    setProducts,
    setModifyStorePickUp,
    setStoreProductWithSizeAndQuantity,
    setSelectedStoreId,
    setSearch,
    setShowStorePickUpName,
    orderStatus,
    setOrderStatus,
    isChecked,
    setChecked,
    exchangeLeaveMessage,
    setExchangeLeaveMessage,
    selectAllCheckBox,
    setSelectAllCheckBox,
    orderCancelReason,
    setOrderCancelReason,
    showReturnedProductStatus,
    setShowReturnedProductStatus,
    checkIsPromotionCouponApplied,
    setCheckIsPromotionCouponApplied,
    setCancelledOrderItems,
    getOrderStatus, setGetOrderStatus,receiptData
  } = useCartContext();
  const {
    ip,
    token,
    popFromStack,
    pushToStack,
    currentPage,
    setCurrentPage,
    setChangeOrderStatus,
    OrderDate,
    setOrderDate,
    changeOrderStatus,
    loginUserId,
  } = useLoginContext();

  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);

  const getData = async () => {
    try {
      const response = await axios.get(
        `http://${ip}:5454/api/orders/${trackCurrentOrderId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      // console.log(response.data);
      setProducts(prevProducts => {
        const newProducts = response.data;

        // console.log("dataArray:" + JSON.stringify(newProducts));
        return newProducts;
      });
      setTimeout(() => {
        setShowActivityIndicator(false);
      }, 1000);
    } catch (error) {
      setShowActivityIndicator(false);
      console.error('Error fetching data:', error);
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

  useEffect(() => {
    getData();
    getOrderExchangeReason();
  }, [isChecked]);
  useEffect(() => {
    if (
      (isChecked.length === 0 && isSelectAllCheckBoxEnable) ||
      isChecked.length !== selectAllCheckBox.length
    ) {
      setIsSelectAllCheckBoxEnable(false);
    } else if (
      isChecked.length === selectAllCheckBox.length &&
      isChecked.length > 0
    ) {
      setIsSelectAllCheckBoxEnable(true);
    }
  }, [isChecked]);

  //used for buffering icon
  const [showActivityIndicator, setShowActivityIndicator] = useState(true);

  const forNavigate = page => {
    if (page === 'mainHome') {
      setCurrentPage('mainHome');
      navigation.navigate('mainHome');
    } else {
      if (currentPage && currentPage[currentPage.length - 1] !== page) {
        pushToStack(page);
        navigation.navigate(page);
      } else {
        popFromStack(navigation);
      }
    }
  };

  const orderStat = ['CONFIRMED', 'SHIPPED', 'DELIVERED'];

  const handleReviewTextChange = text => {
    setReviewText(text);
  };

  const [reviewText, setReviewText] = useState('');
  const formatText = text => {
    const words = text.split(' ');
    let formattedText = '';
    let currentLineWords = 0;

    for (const word of words) {
      if (currentLineWords + word.length <= 20) {
        formattedText += `${word} `;
        currentLineWords += word.length + 1; // +1 for the space between words
      } else {
        formattedText += `\n${word} `;
        currentLineWords = word.length + 1;
      }
    }

    return formattedText.trim(); // Remove trailing space
  };

  const submitReview = async itemId => {
    if (reviewText.length > 0) {
      // console.log("\n\nThis is the ID"+itemId);
      try {
        const response = await axios.post(
          `http://${ip}:5454/api/reviews/create`,
          {
            productId: itemId,
            review: reviewText,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        // Handle the response as needed
        setReviewText('');
        setModalVisible(false);
        setTimeout(() => {
          handlePress1();
        }, 500);
      } catch (error) {
        // Handle errors
        console.log('Got error in orderStatus.jsx in submit Review' + error);
      }
    }
  };

  const [isModalVisible1, setModalVisible1] = useState(false);
  const [isModalVisible2, setModalVisible2] = useState(false);
  const [isModalVisible3, setModalVisible3] = useState(false);
  const [isModalVisible4, setModalVisible4] = useState(false);

  //get the product which is selected for exchange / Return
  const getProduct = async () => {};

  const handlePress1 = () => {
    setModalVisible1(true);
  };
  const closeModal1 = () => {
    setModalVisible1(false);
  };

  const handlePress2 = () => {
    setModalVisible2(true);
  };
  const closeModal2 = () => {
    setModalVisible2(false);
  };

  const handlePress3 = async () => {
    setModalVisible3(true);
  };
  const closeModal3 = () => {
    setModalVisible3(false);
  };

  const handlePress4 = () => {
    setModalVisible4(true);
  };
  const closeModal4 = () => {
    setModalVisible4(false);
  };

  //store the product which are checked
  const checkedProduct = () => {
    if (orderStatus && orderStatus.orderItems) {
      const filteredOrderItems = orderStatus.orderItems.filter(item =>
        isChecked.includes(item.id),
      );
      setOrderStatus(prevStatus => ({
        ...prevStatus,
        orderItems: filteredOrderItems,
      }));
    }
  };
  const checkedProduct1 = itemId => {
    if (orderStatus && orderStatus.orderItems) {
      const filteredOrderItems = orderStatus.orderItems.filter(
        item => item.id === itemId,
      );
      setOrderStatus(prevStatus => ({
        ...prevStatus,
        orderItems: filteredOrderItems,
      }));
    }
  };
  const fetchProduct = async () => {
    try {
      const response = await axios.get(
        `http://${ip}:5454/api/orders/${trackCurrentOrderId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      // Filter the order items based on `isChecked`
      const filteredOrderItems = response.data;

      // Update the state with the filtered order items
      setOrderStatus(filteredOrderItems);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    if (isModalVisible1) {
      setTimeout(() => {
        setModalVisible1(false);
      }, 4000);
    }

    fetchProduct();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      // Fetch updated ratings when the screen comes into focus
      if (getOrderStatus && getOrderStatus.orderItems) {
        getOrderStatus.orderItems.forEach(item => {
          getProductRating(item.product.id);
        });
      }
    }, [getOrderStatus]),
  );
  const [userRating, setUserRating] = useState(0);
  const [productRatings, setProductRatings] = useState(0.0);



  const route = useRoute();
  const orderId = route.params?.orderId;

  const ratingCompleted = (rating, productId) => {
    postRatingToBackend(productId, rating);
    getProductRating(productId);
  };
  useEffect(() => {
    // Fetch initial ratings when the component mounts
    if (getOrderStatus && getOrderStatus.orderItems) {
      getOrderStatus.orderItems.forEach(item => {
        getProductRating(item.product.id);
      });
    }
    setChangeOrderStatus(getOrderStatus.orderStatus);
    setOrderDate(
      new Date(getOrderStatus.orderDate).toLocaleDateString('en-US', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
      }),
    );
  }, [getOrderStatus]);

  const sendSuggestionPost = async productId => {
    try {
      const dataAdd = {
        productId: productId,
        review: suggestion,
      };

      const response = await axios.post(
        `http://${ip}::5454/api/reviews/create`,
        dataAdd,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      // Handle any additional actions after submitting the review
      // ...

      // Close the rating modal
    } catch (error) {
      console.error('Error submitting review:', error.message);
    }
  };

  const postRatingToBackend = async (prodId, rate) => {
    const dataAdd = {
      givenRatingByUser: rate,
      comment: '',
      userId: loginUserId,
      productId: prodId,
    };

    try {
      const response = await axios.post(
        `http://${ip}:5454/api/ratings/create`,
        dataAdd, // Pass the dataAdd object here
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log('Rating posted successfully:', response.data);
    } catch (error) {
      console.error('Error posting rating to backend:', error.message);
    }
  };
  // Function to get the rating for a specific product ID
  const getProductRating = async productId => {
    try {
      const response = await axios.get(
        `http://${ip}:5454/api/ratings/user/${loginUserId}`, // Adjusted to use productId instead of userId
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      // If the API returns data, set the rating
      if (response.data && response.data.length > 0) {
        setProductRatings(response.data[0].givenRating);
      } else {
        // If no rating data is available, set a default value
        setProductRatings(0); // or any other default value you prefer
      }

      console.log(`Rating for product: ${JSON.stringify(response.data)}`);
    } catch (error) {
      // If it's a 404 error, handle it gracefully by setting a default value
      if (error.response && error.response.status === 404) {
        setProductRatings(0); // Default to 0 if no rating exists
      } else {
        // Handle other types of errors
        console.error(
          `Error fetching rating for product ${productId}:`,
          error.message,
        );
      }
    }
  };

  //filter OrderItemsBased on selected checkBox
  const filterProductBasedOnCheckBox = async () => {
    try {
      const response = await axios.post(
        `http://${ip}:5454/api/admin/orders/${trackCurrentOrderId}/filter`,
        isChecked,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setCancelledOrderItems(response.data);
      getOrderStatus1();
    } catch (error) {
      // Handle errors
      console.error('Error fetching orderCanellationReason', error);
    }
  };

  //modify the storePickUp Time for that storing OrderItems
  function getProductData() {
    if (getOrderStatus && getOrderStatus.storePickup) {
      setSearch(getOrderStatus.storePickup.store.city);
      setSelectedStoreId(getOrderStatus.storePickup.id);
      setShowStorePickUpName(getOrderStatus.storePickup.store.address);
    }

    setStoreProductWithSizeAndQuantity();
    if (getOrderStatus && getOrderStatus.orderItems) {
      const s1 = getOrderStatus.orderItems.map(item => {
        return item.product.id + item.size + item.quantity;
      });
      setStoreProductWithSizeAndQuantity(s1);
    }
  }
  const getOrderStatus1 = async () => {
    try {
      const response = await axios.get(
        `http://${ip}:5454/api/orders/${trackCurrentOrderId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      //make falses how activityIndicator

      // Handle the response data

      setGetOrderStatus(response.data);
      setReceiptData(response.data);
    } catch (error) {
      // Handle errors
      setShowActivityIndicator(false);
      console.error('Error fetching Placed1Orderdata:', error);
    }
  };
  useEffect(() => {
    //get Order Data
    getProductData();
    getOrderStatus1();
  }, []);
  // Ensure trackCurrentOrder is defined before trying to use reduce
  // Check if getOrderStatus and orderItems are defined
  const totalDiscountedPrice =
    getOrderStatus && getOrderStatus.orderItems
      ? getOrderStatus.totalDiscountedPrice
      : 0;

  function DownloadingInvoice() {
    handlePress2();
    setTimeout(() => {
      closeModal2();
    }, 2000);
    setTimeout(() => {
      navigation.navigate('exportPdf', {pageName: 'orderStatus'});
    }, 3000);
  }

  // Output: "14th Feb 2024"
  const formatDate = dateString => {
    const date = new Date(dateString);

    const day = date.getDate();
    const month = date.toLocaleString('default', {month: 'short'});
    const year = date.getFullYear();

    // Function to add ordinal suffix
    const getOrdinalSuffix = day => {
      if (day > 3 && day < 21) return 'th'; // special case for 'teen' numbers
      switch (day % 10) {
        case 1:
          return 'st';
        case 2:
          return 'nd';
        case 3:
          return 'rd';
        default:
          return 'th';
      }
    };

    return `${day}${getOrdinalSuffix(day)} ${month} ${year}`;
  };

  // Output: "10:00-10:30 AM"
  const formatTimeRange = dateString => {
    const date = new Date(dateString);
    const startHour = date.getHours();
    const startMinute = date.getMinutes();

    const getFormattedTime = (hour, minute) => {
      const ampm = hour >= 12 ? 'PM' : 'AM';
      const formattedHour = hour % 12 || 12; // convert 0, 12, 13, 14... to 12, 12, 1, 2...
      const formattedMinute = minute.toString().padStart(2, '0');
      return `${formattedHour}:${formattedMinute} ${ampm}`;
    };

    const startTime = getFormattedTime(startHour, startMinute);
    const endDate = new Date(date);
    endDate.setMinutes(endDate.getMinutes() + 30); // Assuming the end time is 30 minutes after the start time
    const endHour = endDate.getHours();
    const endMinute = endDate.getMinutes();
    const endTime = getFormattedTime(endHour, endMinute);

    return `${startTime.split(' ')[0]}-${endTime}`;
  };

  //select exchange/return tab
  const [selectExchangeOrReturnTab, setSelectExchangeOrReturnTab] = useState(0);
  const [selectedSizeInReturn, setSelectedSizeInReturn] = useState('');

  const storeCheckBoxId = itemId => {
    if (getOrderStatus && getOrderStatus?.length == 1) {
      setSelectAllCheckBox(true);
    }
    if (isChecked.includes(itemId)) {
      const pt = isChecked.filter(val => val !== itemId);
      setChecked(pt);
    } else {
      setChecked([...isChecked, itemId]);
    }
    fetchProduct();
  };

  //select size in Exchange
  const handleSizeSelect = (productId, size) => {
    setSelectedSizeInReturn(prev => ({
      ...prev,
      [productId]: size,
    }));
  };

  const [isSelectAllCheckBoxEnable, setIsSelectAllCheckBoxEnable] =
    useState(false);
  const [hideOrVisibleAllCheckBox, setHideOrVisibleAllCheckBox] =
    useState(false);

  useEffect(() => {
    if (orderStatus.orderItems) {
      setSelectAllCheckBox(
        orderStatus.orderItems
          .filter(
            item =>
              item.cancelStatus !== 'CANCELLED' &&
              item.exchangeStatus !== 'COMPLETED' &&
              item.returnStatus !== 'RETURNED',
          )
          .map(item => item.id),
      );
    }
  }, [isSelectAllCheckBoxEnable, isChecked]);

  //check all checkbox
  const handleSelectAllCheckBox = () => {
    if (isSelectAllCheckBoxEnable) {
      setIsSelectAllCheckBoxEnable(false);
      setChecked([]);
    } else {
      setIsSelectAllCheckBoxEnable(true);
      //  setTimeout(()=>{
      //    handlePress3();
      //  },1000);

      setChecked(selectAllCheckBox);
    }
  };

  //go for Order Return, Cancellation , or Cancel
  const goForAction = () => {
    if (isChecked.length === 0) {
      Alert.alert(
        '',
        'Please select products that you want to cancel/return or exchange.',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')}, // You can add onPress functionality here if needed
        ],
        {cancelable: false},
      );
    } else {
      if (
        changeOrderStatus === 'DELIVERED' ||
        changeOrderStatus === 'PARTIAL_RETURNED'
      ) {
        checkedProduct();
        handlePress3();
      } else {
       // checkedProduct();
        filterProductBasedOnCheckBox();
        forNavigate('orderCancel');
      }
    }
  };

  const handleExchange = async () => {
    if (orderCancelReason <= 0) {
      Alert.alert('Error', 'Please select a reason for exchange', [
        {
          text: 'OK',
        },
      ]);
      return;
    }

    closeModal4();
    setShowActivityIndicator(true);

    try {
      const dataToExchange = orderStatus.orderItems.map(item => ({
        orderItemId: item.id,
        newProductId: item.product.id,
        quantity: item.quantity,
        size: selectedSizeInReturn[item.id],
      }));

      const url = `http://${ip}:5454/api/admin/orders/${trackCurrentOrderId}/${orderCancelReason}/exchange`;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      let response;
      if (exchangeLeaveMessage.length > 0) {
        response = await axios.put(
          `${url}?comments=${exchangeLeaveMessage}`,
          dataToExchange,
          config,
        );
      } else {
        response = await axios.put(url, dataToExchange, config);
      }

      setTimeout(() => {
        setShowActivityIndicator(false);
        Alert.alert('', 'Order exchanged successfully', [
          {
            text: 'OK',
            onPress: () => navigation.navigate('mainHome'),
          },
        ]);
      }, 1000);
    } catch (error) {
      setShowActivityIndicator(false);

      if (error.response) {
        // Request was made and server responded with a status code
        // that falls out of the range of 2xx
        console.error(
          'Error putting data in Exchange API:',
          error.response.data,
        );
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received from Exchange API:', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error setting up the request:', error.message);
      }

      console.error('Error config:', error.config);
    }
  };

  //get all exchange reasons
  const [orderExchangeReason, setOrderExchangeReason] = useState([]);

  const getOrderExchangeReason = async () => {
    try {
      const response = await axios.get(
        `http://${ip}:5454/api/cancellation-reasons/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      // Handle the response data
      setOrderExchangeReason(response.data);
    } catch (error) {
      // Handle errors
      console.error('Error fetching orderCanellationReason', error);
    }
  };

  //count total item in order
  const [countOrderedItem, setCountOrderedItem] = useState(0);
  //Dont show the button of Cancel/Exchange/Return, if all item are Cancel/Exchange/Return from Order
  const [disableReturnExchangeCancel, setDisableReturnExchangeCancel] =
    useState(0);
  useEffect(() => {
    let cnt = 0;
    if (getOrderStatus.orderItems) {
      getOrderStatus.orderItems.forEach(item => {
        if (
          item.returnStatus === 'RETURNED' ||
          item.exchangeStatus === 'EXCHANGED' ||
          item.cancelStatus === 'CANCELLED' ||
          item.exchangeStatus === 'COMPLETED'
        ) {
          cnt++;
        }
      });
    }
    setDisableReturnExchangeCancel(cnt);
  }, [getOrderStatus]); // include getOrderStatus as a dependency

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      {showActivityIndicator ? (
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator size="large" color="#00338D" />
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
          <TopBar
            navigation={navigation}
            showCartLogo={false}
            showWishListLogo={false}
            showSearchLogo={false}
          />
          <TouchableOpacity
            onPress={() => {
              popFromStack(navigation);
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View>
                <Image source={back} style={{marginLeft: 12}} />
              </View>
              <View style={{marginLeft: '4%'}}>
                <Text style={{color: 'black'}}>Track Order</Text>
              </View>
            </View>
          </TouchableOpacity>
          <View style={styles.detailsWrapper}>
            <View>
              <Text style={styles.label}>ORDER ID</Text>
              <Text style={styles.greyText}>
                KPMG-RT-4498
                {getOrderStatus && getOrderStatus.id && (
                  <Text>{getOrderStatus.id}</Text>
                )}
              </Text>
            </View>
            <View>
              <Text style={styles.label}>TOTAL</Text>

              <Text style={styles.totalValue}>
                ₹ {totalDiscountedPrice ? totalDiscountedPrice : '0'}
              </Text>
            </View>
          </View>
          <Text style={{color: '#00338D', marginLeft: '8%'}}>PLACED ON</Text>
          <Text
            style={{color: 'grey', fontSize: 12, padding: 1, marginLeft: '7%'}}>
            {getOrderStatus && (
              <>
                <Text>
                  {' '}
                  {new Date(getOrderStatus.orderDate).toLocaleDateString(
                    'en-US',
                    {
                      weekday: 'long',
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    },
                  )}
                </Text>
              </>
            )}
          </Text>
          <View
            style={{
              height: '0.5%',
              backgroundColor: '#f7f5f5',
              marginTop: '4%',
            }}
          />
          <View
            style={{
              borderRadius: 8,
              marginLeft: '4%',
              marginRight: '4%',
              marginTop: '4%',
            }}>
            <Text style={{color: 'black', fontSize: 16}}>
              Shipping Address{' '}
            </Text>
            {getOrderStatus && getOrderStatus.storePickup ? (
              <>
                {getOrderStatus && getOrderStatus.storePickup && (
                  <>
                    <View style={{marginBottom: 10, padding: 12}}>
                      {/* Store Pickup Address */}
                      <Text style={styles.addressText}>
                        {getOrderStatus.storePickup.store.address}
                      </Text>
                      <Text style={styles.addressText}>
                        {getOrderStatus.storePickup.store.city},{' '}
                        {getOrderStatus.storePickup.store.pincode}
                      </Text>
                      <Text style={styles.addressText}>
                        {getOrderStatus.storePickup.user.mobile}
                      </Text>
                    </View>

                    {/* Pickup Date & Time */}
                    <Text style={styles.pickupDateTime}>
                      Pickup Date & Time
                    </Text>
                    <Text style={styles.pickupDateText}>
                      Date:
                      <Text style={styles.pickupDateText2}>
                        {' '}
                        {formatDate(getOrderStatus.storePickup.pickupDateTime)}
                      </Text>
                    </Text>
                    <Text style={styles.pickupDateText}>
                      Time:
                      <Text style={styles.pickupDateText2}>
                        {' '}
                        {formatTimeRange(
                          getOrderStatus.storePickup.pickupDateTime,
                        )}
                      </Text>
                    </Text>
                  </>
                )}
              </>
            ) : (
              <>
                {getOrderStatus && getOrderStatus.shippingAddress && (
                  <View style={styles.addressContainer}>
                    <Text style={styles.addressText}>
                      {getOrderStatus.shippingAddress.firstName}{' '}
                      {getOrderStatus.shippingAddress.lastName}
                    </Text>
                    <Text style={styles.addressText}>
                      {getOrderStatus.shippingAddress.streetAddress},{' '}
                      {getOrderStatus.shippingAddress.city}
                    </Text>
                    <Text style={styles.addressText}>
                      {getOrderStatus.shippingAddress.state},{' '}
                      {getOrderStatus.shippingAddress.zipCode}
                    </Text>
                    <Text style={styles.addressText}>
                      {getOrderStatus.shippingAddress.mobile}
                    </Text>
                  </View>
                )}
              </>
            )}
          </View>

          {getOrderStatus && getOrderStatus.storePickup && (
            <TouchableOpacity
              style={styles.modifyStoreSubscription}
              onPress={() => {
                setModifyStorePickUp(true);
                getProductData();
                navigation.navigate('scheduleStore');
              }}>
              <Text style={styles.modifyStoreSubscriptionText}>Modify</Text>
            </TouchableOpacity>
          )}

          <View style={{backgroundColor: '#00338D', height: 0.2}} />
          <View style={{height: '0.01%', backgroundColor: '#00338D'}} />
          <View style={{height: '0.8%', backgroundColor: '#f7f5f5'}} />
          <Text
            style={{
              color: 'black',
              fontWeight: '400',
              marginLeft: '4%',
              marginTop: '4%',
            }}>
            SHIPMENT {JSON.stringify(getOrderStatus?.orderItems?.length)} OF{' '}
            {JSON.stringify(getOrderStatus?.orderItems?.length)}
          </Text>
          <Text style={{marginLeft: '4%', marginTop: '1%', fontWeight: '400'}}>
            Typically ships between 3-5 business days
          </Text>

          <View style={{padding: '3%'}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: '7%',
              }}>
              <Text style={{fontSize: 14.6, color: '#00338D'}}>
                Expected Delivery Date
              </Text>
              <Text style={{color: 'grey', fontSize: 12, marginRight: '4%'}}>
                {getOrderStatus && (
                  <>
                    <Text>
                      {new Date(
                        new Date(getOrderStatus.orderDate).setDate(
                          new Date(getOrderStatus.orderDate).getDate() + 3,
                        ),
                      ).toLocaleDateString('en-US', {
                        weekday: 'long',
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </Text>
                  </>
                )}
              </Text>
            </View>

            <Progress />
            {getOrderStatus &&
              getOrderStatus.orderItems &&
              getOrderStatus.orderItems.length !==
                disableReturnExchangeCancel &&
              (changeOrderStatus === 'DELIVERED' ||
              changeOrderStatus === 'PARTIAL_RETURNED' ? (
                <TouchableOpacity
                  style={styles.cancelContainer}
                  onPress={() => {
                    if (changeOrderStatus !== 'DELIVERED') {
                      forNavigate('orderCancel');
                    }
                    setHideOrVisibleAllCheckBox(true);
                  }}>
                  <Image
                    source={cancel}
                    style={{width: 20, height: 20, alignSelf: 'center'}}
                  />
                  <Text style={styles.cancelText}>Return / Exchange</Text>
                </TouchableOpacity>
              ) : (
                changeOrderStatus !== 'CANCELLED' && (
                  <TouchableOpacity
                    style={styles.cancelContainer}
                    onPress={() => {
                      if (changeOrderStatus !== 'DELIVERED') {
                        checkedProduct();
                      }
                      setHideOrVisibleAllCheckBox(true);
                    }}>
                    <Image
                      source={cancel}
                      style={{width: 20, height: 20, alignSelf: 'center'}}
                    />
                    <Text style={styles.cancelText}>Cancel</Text>
                  </TouchableOpacity>
                )
              ))}
          </View>

          <View
            style={{height: 0.3, backgroundColor: '#00338D', marginTop: '4%'}}
          />

          <View style={{height: '0.5', backgroundColor: '#f7f5f5'}} />
          <View
            style={{
              borderRadius: 8,
              marginLeft: '4%',
              marginRight: '4%',
              marginTop: '4%',
            }}>
            <View
              style={{
                alignItems: 'flex-start',
                justifyContent: 'center',
                padding: '1%',
              }}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 16,
                  backgroundColor: '#ededed',
                  padding: '1%',
                  fontWeight: '500',
                }}>
                List of Products
              </Text>
            </View>
            {hideOrVisibleAllCheckBox && (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: '3%',
                }}>
                <CheckBox
                  disabled={false}
                  value={isSelectAllCheckBoxEnable}
                  // onValueChange={(newValue)=>{setChecked(newValue)}}
                  onValueChange={() => {
                    handleSelectAllCheckBox();
                  }}
                  style={{}}
                />
                <Text style={{color: 'black', marginLeft: '1%'}}>
                  Select All
                </Text>
              </View>
            )}
            {getOrderStatus && getOrderStatus.orderItems && (
              <>
                {getOrderStatus.orderItems.map((item, index) => (
                  <View
                    key={index+1}
                    style={{
                      padding: '3%',
                      marginTop: '1%',
                      backgroundColor:
                        item.cancelStatus === 'CANCELLED' ||
                        item.exchangeStatus === 'COMPLETED' ||
                        item.returnStatus === 'RETURNED'
                          ? '#f5f5f5'
                          : 'transparent',
                    }}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Image
                        source={{uri: item.product.imageUrl[0]}}
                        style={styles.imageSize}
                      />
                      {hideOrVisibleAllCheckBox &&
                        item.cancelStatus !== 'CANCELLED' &&
                        item.exchangeStatus !== 'COMPLETED' &&
                        item.returnStatus !== 'RETURNED' && (
                          <CheckBox
                            disabled={false}
                            value={isChecked.includes(item.id)}
                            onValueChange={() => {
                              storeCheckBoxId(item.id);
                            }}
                            style={{marginTop: '-26%', marginLeft: '-24%'}}
                          />
                        )}
                      <View style={{marginLeft: '27%'}}>
                        <Text style={{color: '#00338D', fontWeight: '500'}}>
                          {item.product.brand}
                        </Text>
                        <Text
                          style={{
                            color: '#00338D',
                            fontWeight: '300',
                            fontSize: 12,
                          }}>
                          {item.product.title}
                        </Text>
                        <Text
                          style={{
                            fontWeight: '300',
                          }}>
                          Fit: {item.product.fit}
                        </Text>
                        <View>
                          <Text style={{fontSize: 13}}>Size: {item.size}</Text>
                          <Text style={{fontSize: 13}}>
                            Qty: {item.quantity}
                          </Text>
                        </View>
                        <Text>
                          ₹{' '}
                          {item?.discountedPrice
                            ? item?.discountedPrice
                            : item?.discountedPrice.toLocaleString('en-IN')}
                        </Text>
                        {item.cancelStatus && (
                          <Text style={styles.cancelTag}>
                            {item.cancelStatus}
                          </Text>
                        )}
                        {item.exchangeStatus && (
                          <Text style={styles.exchangeTag}>
                            EXCHANGE {item.exchangeStatus}
                          </Text>
                        )}
                        {item.returnStatus && (
                          <TouchableOpacity
                            onPress={() => {
                              // setChecked([item.id]); // Correct the setChecked function call
                              checkedProduct1(item.id);
                              navigation.navigate('returnOrderStatus');
                              setShowReturnedProductStatus(true); // Specify the destination screen for navigation
                            }}>
                            <Text style={styles.returnTag}>
                              {item.returnStatus === 'RETURNED' &&
                                'CHECK RETURN'}
                            </Text>
                          </TouchableOpacity>
                        )}
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '105%',
                      }}>
                      {changeOrderStatus === 'DELIVERED' &&
                        item.exchangeStatus !== 'COMPLETED' && (
                          <Rating
                            style={{marginTop: '7%'}}
                            ratingCount={5}
                            showRating={true}
                            imageSize={20}
                            onFinishRating={rating =>
                              ratingCompleted(rating, item.product.id)
                            }
                            startingValue={productRatings || 0}
                          />
                        )}
                    </View>
                    <Modal
                      animationType="slide"
                      transparent={true}
                      visible={isModalVisible}
                      onRequestClose={() => setModalVisible(false)}>
                      <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'flex-end',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              marginTop: '4%',
                            }}>
                            <Text
                              style={{
                                color: 'black',
                                fontWeight: '700',
                                marginLeft: '4%',
                                fontSize: 18,
                                marginTop: '1%',
                                fontFamily: 'Montserrat',
                              }}>
                              FEEDBACK & REVIEW
                            </Text>
                            <TouchableOpacity
                              onPress={() => setModalVisible(false)}>
                              <Text
                                style={{marginTop: '40%', marginRight: '4%'}}>
                                ╳
                              </Text>
                            </TouchableOpacity>
                          </View>
                          <View
                            style={{
                              borderBottomColor: 'grey',
                              borderBottomWidth: 0.3,
                              height: 0.2,
                              marginTop: '2%',
                            }}
                          />
                          {getOrderStatus && getOrderStatus.orderItems && (
                            <>
                              {getOrderStatus.orderItems.map((item, index) => (
                                <View key={index+2} style={{margin: '1%'}}>
                                  {item.product.id === selectedItemId && (
                                    <>
                                      <View style={{flexDirection: 'row'}}>
                                        <Image
                                          source={{uri: item.product.imageUrl}}
                                          style={styles.imageSize}
                                        />
                                        <View style={{marginLeft: '4%'}}>
                                          <Text
                                            style={{
                                              color: '#00338D',
                                              fontWeight: '500',
                                            }}>
                                            {item.product.brand}
                                          </Text>
                                          <Text
                                            style={{
                                              color: '#00338D',
                                              fontWeight: '300',
                                              fontSize: 12,
                                            }}>
                                            {item.product.title}
                                          </Text>
                                        </View>
                                      </View>
                                    </>
                                  )}
                                </View>
                              ))}
                            </>
                          )}
                          <View
                            style={{
                              borderBottomColor: 'grey',
                              borderBottomWidth: 0.3,
                              height: 0.2,
                            }}
                          />
                          <View>
                            <Text
                              style={{
                                padding: '3%',
                                color: '#00338D',
                                fontWeight: '600',
                              }}>
                              How would you rate this product
                            </Text>
                            <View
                              style={{
                                justifyContent: 'space-between',
                                flexDirection: 'row',
                              }}>
                              <Rating
                                style={{marginLeft: '3%'}}
                                ratingCount={5}
                                showRating={false}
                                imageSize={20}
                                onFinishRating={rating =>
                                  ratingCompleted(rating, item.product.id)
                                }
                                startingValue={productRatings || 0}
                              />
                              <Text
                                style={{
                                  marginRight: '4%',
                                  color: '#00338D',
                                  fontWeight: '700',
                                }}>
                                Loved it
                              </Text>
                            </View>
                          </View>
                          <View
                            style={{
                              borderWidth: 0.4,
                              borderRadius: 12,
                              marginTop: '8%',
                              padding: '1%',
                              height: 300,
                              margin: 10,
                              borderColor: '#D3D3D3',
                            }}>
                            <TextInput
                              placeholder="start writing here"
                              placeholderTextColor="grey"
                              multiline
                              onChangeText={handleReviewTextChange}
                            />
                          </View>
                          <Text style={{fontSize: 11, margin: 12}}>
                            By submitting a review, you give us your consent to
                            publish your feedback publicly in accordance with
                            <Text style={{color: '#00338D', fontWeight: '500'}}>
                              {' '}
                              Terms of Use{' '}
                            </Text>
                            and
                            <Text style={{color: '#00338D', fontWeight: '500'}}>
                              {' '}
                              Privacy Policy
                            </Text>
                            .
                          </Text>
                          <TouchableOpacity
                            style={{
                              padding: '3%',
                              backgroundColor:
                                reviewText.length > 0 ? '#00338D' : '#c9cdd4',
                              margin: 12,
                            }}
                            disabled={!reviewText}
                            onPress={() => submitReview(selectedItemId)}>
                            <Text
                              style={{
                                textAlign: 'center',
                                color: 'white',
                                fontWeight: '700',
                              }}>
                              Submit
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </Modal>
                  </View>
                ))}
              </>
            )}
          </View>

          {/* <Text>{JSON.stringify(placedOrder)}</Text> */}
          {hideOrVisibleAllCheckBox ? (
            <View style={styles.container}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  goForAction();
                }}>
                <Text style={styles.buttonText}>
                  Continue
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.container}>
              <TouchableOpacity
                style={styles.button2}
                onPress={() => {
                  handlePress3();
                }}>
                <Text style={styles.buttonText}></Text>
              </TouchableOpacity>
            </View>
          )}
          <View
            style={{height: 0.3, backgroundColor: '#00338D', marginTop: '4%'}}
          />

          <View style={{height: '0.5%', backgroundColor: '#f7f5f5'}} />

          <Text
            style={{
              color: 'black',
              fontSize: 16,
              marginLeft: '4%',
              marginTop: '4%',
            }}>
            Payment Summary
          </Text>

          <View style={styles.wrapper}>
            <View style={styles.row}>
              <Text style={styles.label}>Sub Total</Text>
              <Text style={styles.value}>
                ₹{getOrderStatus.totalPrice ? getOrderStatus.totalPrice : 0}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Delivery Charges</Text>
              {deliveryOption === '1' ? (
                <Text style={styles.charge}>100</Text>
              ) : (
                <Text style={styles.charge}>Free</Text>
              )}
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Promotion Discount</Text>
              <Text style={styles.charge}>
                ₹
                {getOrderStatus.promotionDiscount
                  ? getOrderStatus.promotionDiscount
                  : 0}
              </Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Total Saving</Text>
              <Text style={styles.value}>
                ₹{' '}
                {getOrderStatus.discounte
                  ? getOrderStatus.discounte -
                    (getOrderStatus.promotionDiscount
                      ? getOrderStatus.promotionDiscount
                      : 0)
                  : 0}
              </Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Total Paid Amount</Text>
              <Text style={styles.total}>
                ₹ {totalDiscountedPrice ? totalDiscountedPrice : '0'}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              padding: '2%',
              justifyContent: 'space-between',
              marginTop: '8%',
              marginBottom: '3%',
              marginLeft: '3.8%',
              marginRight: '7%',
              borderColor: '#f7f5f5', // Corrected typo here
              borderWidth: 3, // Corrected typo here
              alignItems: 'center',
              width: '92%',
            }}>
            <TouchableOpacity
              style={{flexDirection: 'row', alignItems: 'center'}}
              onPress={() => {
                DownloadingInvoice();
              }}>
              <Image
                source={pdf}
                style={{width: 30, height: 30, marginRight: '14%'}}
              />
              <Text style={{color: '#00338D', fontSize: 17}}>
                Download Invoice
              </Text>
            </TouchableOpacity>
            <Image source={next} style={{width: 20, height: 16}} />
          </View>
          <View
            style={{
              flexDirection: 'row',
              padding: '2%',
              justifyContent: 'space-between',
              marginTop: '1%',
              marginBottom: '14%',
              marginLeft: '3.8%',
              marginRight: '7%',
              borderColor: '#f7f5f5', // Corrected typo here
              borderWidth: 3, // Corrected typo here
              alignItems: 'center',
              width: '92%',
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={needHelp}
                style={{width: 30, height: 30, marginRight: '14%'}}
              />
              <Text style={{color: '#00338D', fontSize: 17, marginLeft: '2%'}}>
                Need Help
              </Text>
            </View>
            <Image source={next} style={{width: 20, height: 16}} />
          </View>

          <Modal
            visible={isModalVisible1}
            animationType="slide"
            transparent={true}
            onRequestClose={closeModal1}>
            <View>
              <View style={styles.modalContent1}>
                <Text
                  style={{padding: '1%', fontWeight: '600', color: 'white'}}>
                  Successfully stored your feedback{' '}
                </Text>
              </View>
            </View>
          </Modal>
          <Modal
            visible={isModalVisible2}
            animationType="slide"
            transparent={true}
            onRequestClose={closeModal2}>
            <View>
              <View style={styles.modalContent1}>
                <Text
                  style={{padding: '1%', fontWeight: '600', color: 'white'}}>
                  Downloading...
                </Text>
              </View>
            </View>
          </Modal>

          <Modal
            visible={isModalVisible1}
            animationType="slide"
            transparent={true}
            onRequestClose={closeModal1}>
            <View>
              <View style={styles.modalContent1}>
                <Text
                  style={{padding: '1%', fontWeight: '600', color: 'white'}}>
                  Successfully stored your feedback{' '}
                </Text>
              </View>
            </View>
          </Modal>
          <Modal
            visible={isModalVisible3}
            animationType="slide"
            transparent={true}
            onRequestClose={closeModal3}>
            <View style={styles.modalContainer1}>
              <View style={styles.modalContent2}>
                <View style={styles.exchangeReturnContainer}>
                  <TouchableOpacity
                    style={{
                      width: '50%',
                      height: '100%',
                      borderWidth: 1,
                      justifyContent: 'center',
                      borderBottomWidth: selectExchangeOrReturnTab ? 4 : 4,
                    }}
                    onPress={() => {
                      setSelectExchangeOrReturnTab(true);
                      closeModal3();
                      handlePress4();
                      checkedProduct();
                    }}>
                    <Text
                      style={{
                        textAlign: 'center',
                        fontSize: 17,
                        fontWeight: selectExchangeOrReturnTab ? '600' : '400',
                      }}>
                      EXCHANGE
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      width: '50%',
                      height: '100%',
                      borderWidth: 1,
                      justifyContent: 'center',
                      borderBottomWidth: !selectExchangeOrReturnTab ? 4 : 4,
                    }}
                    onPress={() => {
                      setSelectExchangeOrReturnTab(false);
                      forNavigate('returnPage1');
                      closeModal3();
                      checkedProduct();
                    }}>
                    <Text
                      style={{
                        textAlign: 'center',
                        fontSize: 17,
                        fontWeight: !selectExchangeOrReturnTab ? '600' : '400',
                        color: !selectExchangeOrReturnTab && 'black',
                      }}>
                      RETURN
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
          <Modal
            visible={isModalVisible4}
            animationType="slide"
            transparent={true}
            onRequestClose={closeModal4}>
            <ScrollView>
              <View style={styles.modalContainer1}>
                <View style={styles.modalContent3}>
                  <Text style={styles.mainHeading}>ITEMS FROM THIS ORDER</Text>
                  <View style={styles.horizontalLine2} />
                  {orderStatus.orderItems.map(item => (
                    <View key={item.id}>
                      <Image
                        source={{uri: item.product.imageUrl[0]}}
                        style={styles.imageSize1}
                      />
                      <View style={{margin: '4%'}}>
                        <View
                          style={{
                            width: 25,
                            height: 25,
                            backgroundColor: item.product.color,
                            borderRadius: 12,
                          }}
                        />
                        <Text style={styles.mainExchangeHeading}>
                          Available sizes in the color
                        </Text>
                        <View style={styles.availableSizeMainContainer}>
                          {item.product.sizes.map(size => (
                            <TouchableOpacity
                              key={size.name}
                              style={[
                                styles.availableSizeContainer,
                                selectedSizeInReturn[item.id] === size.name &&
                                  styles.selectedSizeColor,
                              ]}
                              onPress={() =>
                                handleSizeSelect(item.id, size.name)
                              }>
                              <Text
                                style={
                                  selectedSizeInReturn[item.id] === size.name &&
                                  styles.selectedSizeColor
                                }>
                                {size.name}
                              </Text>
                            </TouchableOpacity>
                          ))}
                        </View>

                        {item.product.sizes.map(
                          size =>
                            selectedSizeInReturn[item.id] === size.name && (
                              <Text key={size.name} style={styles.hurryUpText}>
                                Hurry up!{' '}
                                <Text style={styles.quantityText}>
                                  {size.quantity}
                                </Text>{' '}
                                items left.
                              </Text>
                            ),
                        )}
                      </View>
                    </View>
                  ))}

                  <View style={styles.horizontalLine} />
                  <View style={styles.cancelReasonContainer}>
                    <Text style={styles.cancelReasonText1}>
                      Reason for exchange
                    </Text>
                    <Text style={styles.cancelReasonText2}>
                      Please provide the accurate reason for the exchange. This
                      information is crucial for enhancing our services.
                    </Text>
                  </View>
                  <View style={styles.horizontalLine2} />
                  <Text style={styles.radioBoxText}>
                    Select Reason{JSON.stringify(orderCancelReason)}
                    <Text style={{color: '#d93a2e'}}>*</Text>
                  </Text>
                  <View style={{margin: '2%'}}>
                    {orderExchangeReason.map((item, index) => (
                      <View>
                        <View style={styles.radioContainer}>
                          <RadioButton
                            value={item.id}
                            status={
                              orderCancelReason === item.id
                                ? 'checked'
                                : 'unchecked'
                            }
                            onPress={() => {
                              setOrderCancelReason(item.id);
                            }}
                            color="black"
                          />
                          <Text style={styles.radioOption}>
                            {item.description}
                          </Text>
                        </View>
                      </View>
                    ))}
                  </View>
                  <Text style={styles.exchangeText}>
                    ADDITIONAL INFORMATION
                  </Text>
                  <View style={styles.additionalComments}>
                    <TextInput
                      value={exchangeLeaveMessage}
                      onChangeText={text => {
                        setExchangeLeaveMessage(text);
                      }}
                      placeholder=" Additional Comments "
                      placeholderTextColor="#c9c7c7"
                      multiline
                    />
                  </View>

                  <TouchableOpacity
                    style={styles.continueToExchange}
                    onPress={() => {
                      handleExchange();
                    }}>
                    <Text style={styles.continueExchangeText}>Continue</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </Modal>
        </ScrollView>
      )}
    </View>
  );
};

export default OrderStatus;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: 'black', // You can customize this color
    borderRadius: 8,
    padding: 10,
    width: 300,
    height: 70,
    backgroundColor: 'white',
  },
  container1: {
    alignItems: 'center',
    width: '100%',
    height: Dimensions.get('screen').height,
    justifyContent: 'center',
  },
  button: {
    padding: 16,
    backgroundColor: '#E9EBED',
    borderColor: '#f4f5f6',
    borderWidth: 1,
  },
  button2: {
    padding: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  mainHeading: {
    margin: '2%',
    fontSize: 17,
    color: 'black',
    fontWeight: '600',
    marginTop: '4%',
  },
  modalContent: {
    width: '100%',
    height: '140%',
    marginTop: '155%',
    backgroundColor: 'white',
    bottom: 0,
    position: 'fixed',
    borderRadius: 10,
    backgroundColor: 'white',
  },
  closeButton: {
    backgroundColor: '#00338D',
    padding: 16,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
  },
  modalContainer1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent1: {
    backgroundColor: '#00A3A1',
    borderRadius: 3.1,
    elevation: 5, // shadow on Android
    height: '5%',
    width: '120%',
    marginTop: '200%', // Adjust this value to position the modal properly
    padding: 5,
  },
  modalContent2: {
    backgroundColor: '#F5f5f5',
    borderRadius: 3.1,
    elevation: 5, // shadow on Android
    height: '10%',
    width: '120%',
    marginTop: '200%', // Adjust this value to position the modal properly
  },
  modalContent3: {
    backgroundColor: '#f5f5f5',
    borderRadius: 3.1,
    elevation: 5, // shadow on Android
    width: '100%',
    marginTop: '150%', // Adjust this value to position the modal properly
  },
  cancelContainer: {
    backgroundColor: '#e6e6e6',
    padding: '3.8%',
  },
  cancelText: {
    textAlign: 'center',
    color: 'black',
    fontWeight: '500',
  },
  modifyStoreSubscription: {
    margin: '4%',
    backgroundColor: '#00338D',
    width: 100,
    borderRadius: 50,
  },
  modifyStoreSubscriptionText: {
    color: 'white',
    textAlign: 'center',
    padding: '4%',
    fontWeight: '600',
  },
  pickupDateTime: {
    color: 'black',
    fontWeight: '600',
    fontSize: 12,
  },
  pickupDateText: {
    color: 'black',
    fontWeight: '500',
    fontSize: 12,
  },
  pickupDateText2: {
    color: 'black',
    fontWeight: '400',
    fontSize: 12,
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
  exchangeReturnContainer: {
    flexDirection: 'row',
    width: 460,
    height: 63,
  },
  mainExchangeHeading: {
    fontWeight: '500',
    fontSize: 16,
    color: 'black',
    marginBottom: '4%',
  },
  availableSizeMainContainer: {
    flexDirection: 'row',
  },
  availableSizeContainer: {
    width: 95,
    height: 45,
    borderWidth: 1,
    borderColor: '#d3d3d3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedSizeColor: {
    borderColor: '#00338D',
    color: '#00338D',
    fontWeight: '700',
  },
  continueToExchange: {
    backgroundColor: '#00338D',
    width: 380,
    padding: '2%',
    alignSelf: 'center',
    margin: '5%',
  },
  continueExchangeText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '600',
  },
  imageSize: {
    width: 80,
    height: 110,
  },
  imageSize1: {
    width: 80,
    height: 110,
    margin: '4%',
  },
  returnExchangeContainer: {
    marginLeft: '8%',
    marginTop: '23%',
  },
  returnExchangeSubContainer: {
    width: 100,
    backgroundColor: '#e6e6e6',
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
    margin: '1%',
  },
  returnExchangeSubContainerText: {
    textAlign: 'center',
    fontWeight: '500',
    color: 'black',
    fontSize: 12.7,
    padding: '2%',
  },

  //for Continue Button in Exchage / Return
  container: {
    marginTop: '10%',
    flex: 1,
    justifyContent: 'center', // centers vertically
    alignItems: 'center', // centers horizontally
  },
  button: {
    borderRadius: 5,
    backgroundColor: '#00338D',
    height: 38,
    justifyContent: 'center',
    width: 370,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 17,
    color: 'white',
    fontWeight: '500',
  },

  // for Payment Summary

  wrapper: {
    padding: '4%',
    borderColor: '#f7f5f5',
    borderWidth: 4,
    marginLeft: '4%',
    marginTop: '4%',
    marginRight: '4%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    fontWeight: '600',
    padding: '0.3%',
  },
  value: {
    color: 'black',
  },
  charge: {
    color: '#00A3A1',
  },
  total: {
    color: '#b31717',
  },

  // for Order Id, Order Date , Total
  detailsWrapper: {
    padding: '5%',
    marginLeft: '3%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    color: '#00338D',
  },
  greyText: {
    color: 'grey',
    fontSize: 12,
    padding: 1,
  },
  totalValue: {
    color: 'black',
  },

  // for Shipping Address
  addressContainer: {
    marginBottom: 10,
    padding: 12,
  },
  addressText: {
    fontWeight: '300',
    fontSize: 13.6,
    paddingVertical: 1,
    color: '#5A5A5A',
  },
  //store Pick Up Details
  addressText: {
    fontWeight: '300',
    fontSize: 13.6,
    paddingVertical: 1,
    color: '#5A5A5A',
  },
  pickupDateTime: {
    marginTop: 10,
    fontWeight: '500',
    fontSize: 16,
    color: '#00338D',
  },
  pickupDateText: {
    fontWeight: '300',
    fontSize: 13.6,
    marginTop: 5,
    color: '#5A5A5A',
  },
  pickupDateText2: {
    fontWeight: '300',
    fontSize: 13.6,
    color: '#5A5A5A',
    marginLeft: 5,
  },
  //Additional Comment for Exchange
  additionalComments: {
    height: 120,
    margin: '2%',
    marginTop: '1%',
    borderWidth: 1,
    borderRadius: 12,
    borderColor: '#d3d3d3',
  },
  exchangeText: {
    margin: '3%',
    fontWeight: '800',
    fontSize: 14.6,
  },
  horizontalLine2: {
    height: 2,
    backgroundColor: '#d3d3d3',
  },
  hurryUpText: {
    color: '#A4343A',
    marginTop: '1%',
    fontSize: 12,
  },
  quantityText: {
    fontWeight: '600',
  },

  cancelReasonContainer: {
    margin: '4%',
  },
  cancelReasonText1: {
    color: 'black',
    fontWeight: '700',
    fontSize: 17,
  },
  cancelReasonText2: {
    fontSize: 13.5,
  },
  horizontalLine: {
    height: 2,
    backgroundColor: '#d3d3d3',
  },
  radioBoxText: {
    margin: '4%',
    fontSize: 15,
    fontWeight: '600',
    color: '#403e3e',
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cancelTag: {
    marginLeft: '43%',
    backgroundColor: '#00338D',
    color: 'white',
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 10,
    padding: '1%',
  },
  exchangeTag: {
    marginLeft: '25%',
    marginTop: '2%',
    backgroundColor: '#00338D',
    color: 'white',
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 10,
    padding: '1%',
  },
  returnTag: {
    marginLeft: '35%',
    marginTop: '2%',
    backgroundColor: '#00338D',
    color: 'white',
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 10,
    padding: '1.5%',
  },
  bottomBar: {
    marginTop: '4%',
  },
});
