import {
  Alert,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  Modal,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useCartContext} from '../Context/WomenContext';
import back from '../PlpScreen/images/back.png';
import nextArrow from '../PlpScreen/images/next2.png';
import {useLoginContext} from '../Login/LoginCartProvider';
import {useGroceryContext} from '../Grocery/GroceryContext';
import axios from 'axios';
import returnlogo from '../PlpScreen/images/return.png';
import Spinner from 'react-native-loading-spinner-overlay';
import cross from '../PlpScreen/images/close.png';
import map from '../PlpScreen/images/map.png';
import {RadioButton} from 'react-native-paper';
import {SelectList} from 'react-native-dropdown-select-list';
import ReturnOrderProgressBar from './ReturnOrderProgressBar';

const ReturnOrderStatus = ({navigation}) => {
  const {
    trackCurrentOrderId,
    deliveryOption,
    setReceiptData,
    setProducts,
    modifyStorePickUp,
    setModifyStorePickUp,
    storeProductWithSizeAndQuantity,
    setStoreProductWithSizeAndQuantity,
    setSelectedStoreId,
    setSearch,
    setShowStorePickUpName,
    returnLeaveMessage,
    setReturnLeaveMessage,
    orderStatus,
    returnSelectedReason,
    showReturnedProductStatus,setShowReturnedProductStatus
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
  } = useLoginContext();

  const {
    subscribedSelectedDays,
    setSubscribedSelectedDays,
    subscriptionEndDate,
    setSubscriptionEndDate,
    subscribedGroceryProductId,
    setWhichPageToNavigate,
    addressList,
    setAddressList,
    selectedDate,
    setSelectedDate,
    userName,
    setUserName,
    pinCode,
    setPinCode,
    streetAddress,
    setStreetAddress,
    mobileNumber,
    setMobileNumber,
    houseNumber,
    setHouseNumber,
    state,
    setState,
    city,
    setCity,
    selectedAddress,
    setSelectedAddress,
    subscriptionTimeSlot,
    setSubscriptionTimeSlot,
    selectedDatesAsString,
    setSelectedDatesAsString,
    count,
  } = useGroceryContext();

  //used for buffering icon
  const [showActivityIndicator, setShowActivityIndicator] = useState(true);

  //total Amount to return
  const [totalAmountToReturn, setTotalAmountToReturn] = useState(0);

  const forNavigate = page => {
    if (page === 'mainHome') {
      setCurrentPage('mainHome');
      navigation.navigate('mainHome');
    } else {
      console.log(page + ' ' + currentPage[currentPage.length - 1]);
      if (currentPage && currentPage[currentPage.length - 1] !== page) {
        pushToStack(page);
        navigation.navigate(page);
      } else {
        popFromStack(navigation);
      }
    }
  };

  //get the current product data which you want to cancel
  const [getOrderStatus, setGetOrderStatus] = useState([]);
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

      // Handle the response data
      setGetOrderStatus(response.data);

      //make falses how activityIndicator
      setTimeout(() => {
        setShowActivityIndicator(false);
      }, 100);
    } catch (error) {
      // Handle errors
      setShowActivityIndicator(false);
      console.error('Error fetching Placed1Orderdata:', error);
    }
  };

  //call API for Return Product
  const handleReturn = async () => {
    try {
      const dataToReturn = orderStatus.orderItems.map(item => ({
        orderItemId: item.id,
      }));
      if (returnLeaveMessage.length > 0) {
        const response = await axios.put(
          `http://${ip}:5454/api/admin/orders/${trackCurrentOrderId}/${returnSelectedReason}/return?comments=${returnLeaveMessage}`,
          dataToReturn,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
      } else {
        const response = await axios.put(
          `http://${ip}:5454/api/admin/orders/${trackCurrentOrderId}/${returnSelectedReason}/return`,
          dataToReturn,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
      }

      console.log('Exchange successful:', response.data);
    } catch (error) {
      setShowActivityIndicator(false);
      console.error('Error putting data in Exchange API:');
    }
  };
  useEffect(() => {
    getOrderStatus1();
    if (orderStatus && orderStatus.orderItems) {
      const totalSum = orderStatus.orderItems.reduce((sm, item) => {
        return sm + item.discountedPrice;
      }, 0);
      setTotalAmountToReturn(totalSum);
    }
    if(!showReturnedProductStatus){
      handleReturn();
    }
  }, [orderStatus]);

  return (
    <View style={styles.mainContainer}>
      {showActivityIndicator ? (
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator size="large" color="#00338D" />
        </View>
      ) : (
        <>
          <View style={styles.topContainer}>
            <TouchableOpacity
              onPress={() => {
                forNavigate('mainHome');
              }}>
              <Image
                source={{uri: 'https://shorturl.at/ckGU2'}}
                style={{width: 100, height: 100, marginLeft: '4%'}}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setCurrentPage('mainHome', 'order');
                navigation.navigate('order');
                setShowReturnedProductStatus(false);
              }}>
              <View style={styles.backBtn}>
                <Image source={back} style={styles.backBtnImg} />
                <View style={styles.backBtnTextContainer}>
                  <Text style={styles.backBtnText1}>RETURN ORDER</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <ScrollView>
            <ReturnOrderProgressBar />
            <Text style={styles.mainHeading}>ITEMS FROM THIS ORDER</Text>
            {orderStatus && orderStatus.orderItems && (
              <>
                {orderStatus.orderItems.map((item, index) => (
                  <View key={index} style={styles.productContainer}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Image
                        source={{uri: item.product.imageUrl[0]}}
                        style={styles.image}
                      />

                      <View style={{marginLeft: '14%'}}>
                        <Text style={styles.productBrand}>
                          {item.product.brand}
                        </Text>
                        <Text style={styles.productTitle}>
                          {item.product.title}
                        </Text>
                        <Text style={styles.productFit}>
                          Fit: {item.product.fit}
                        </Text>
                        <View>
                          <Text style={styles.productText}>
                            Size: {item.size}
                          </Text>
                          <Text style={styles.productText}>
                            Qty: {item.quantity}
                          </Text>
                        </View>
                        <Text>
                          ₹{' '}
                          {item.product.discountedPrice.toLocaleString('en-IN')}
                        </Text>
                      </View>
                    </View>
                  </View>
                ))}
              </>
            )}
            <View style={styles.returnReason}>
              <Text style={styles.returnText}>REASON FOR RETURN</Text>
              <View style={{backgroundColor: 'white'}}>
              {orderStatus && orderStatus.returnReason && orderStatus.returnReason.description && (
        <Text style={{ margin: '3%' }}>
          {orderStatus.returnReason.description}
        </Text>
      )}
              </View>
            </View>
            <Text style={styles.mainHeading}>RETURN SUMMARY</Text>
            <View style={styles.returnSummaryMainContainer}>
              {orderStatus &&
                orderStatus.orderItems &&
                orderStatus.orderItems.map((item, index) => (
                  <View style={styles.returnSummaryContainer} key={index}>
                    <Text>
                      {item.quantity} X {item.product.discountedPrice}
                    </Text>
                    <Text style={styles.summaryPrice}>
                      ₹
                      {parseInt(item.quantity) *
                        parseInt(item.product.discountedPrice)}
                    </Text>
                  </View>
                ))}
              <View style={styles.horizontalLine3} />
            </View>
            <View style={styles.returnTotalSummaryContainer}>
              <Text style={styles.returnSummaryText}>TOTAL :</Text>
              <View>
                <Text style={styles.summaryTotalPrice}>
                  ₹{totalAmountToReturn}
                </Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.backBTN}
              onPress={() => {
                setCurrentPage('mainHome', 'order');
                navigation.navigate('order');
              }}>
              <Text style={styles.backBtnText}>BACK TO ORDERLIST</Text>
            </TouchableOpacity>
          </ScrollView>
        </>
      )}
    </View>
  );
};

export default ReturnOrderStatus;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
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
  topContainer: {
    backgroundColor: '#F5F5F5',
    height: 160,
  },
  mainHeading: {
    margin: '2%',
    fontSize: 15,
    color: 'black',
    fontWeight: '500',
    marginTop: '4%',
  },
  returnText: {
    margin: '3%',
    fontWeight: '800',
    fontSize: 14.6,
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    height: 45,
  },
  backBtnImg: {
    marginLeft: 12,
  },
  backBtnTextContainer: {
    flex: 1,
    alignItems: 'center',
  },
  backBtnText1: {
    color: 'black',
    fontWeight: '800',
    fontSize: 17,
  },
  productContainer: {
    padding: '3%',
    margin: '2%',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
  },
  image: {
    width: 80,
    height: 110,
    borderRadius: 7,
  },
  productBrand: {
    color: '#00338D',
    fontWeight: '500',
  },
  productTitle: {
    color: '#00338D',
    fontWeight: '300',
    fontSize: 12,
  },
  productFit: {
    fontWeight: '300',
  },
  productText: {
    fontSize: 13,
  },
  returnReason: {
    backgroundColor: '#F5F5F5',
    padding: '4%',
  },
  returnSummaryMainContainer: {
    marginLeft: '5%',
    marginRight: '5%',
    marginTop: '3%',
  },
  returnSummaryContainer: {
    marginTop: '1%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  horizontalLine3: {
    margin: '4%',
    height: 1.4,
    backgroundColor: '#D7D7D7',
  },
  returnTotalSummaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: '1%',
    marginRight: '4%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryPrice: {
    fontWeight: '600',
  },
  summaryTotalPrice: {
    fontWeight: '600',
    color: 'black',
  },
  returnSummaryText: {
    marginLeft: '5%',
    fontWeight: '800',
    fontSize: 13,
  },
  backBTN: {
    backgroundColor: '#00338D',
    borderWidth: 2,
    margin: '5%',
    padding: '2%',
    marginTop: '7%',
  },
  backBtnText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: '600',
  },
});
