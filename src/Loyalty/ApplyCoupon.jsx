import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import kpmg from '../PlpScreen/images/kpmg.png';
import back from '../PlpScreen/images/back.png';
import {useCartContext} from '../Context/WomenContext';
import {useLoginContext} from '../Login/LoginCartProvider';
import axios from 'axios';
import Clipboard from '@react-native-clipboard/clipboard';

const ApplyCoupon = ({navigation}) => {
  const {
    selectedBagItem,
    dataArray,
    DeleteBagItem,
    MoveToWishList,
    products,
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
    isItForPlaceOrder,
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
    userLoyaltyTier,
    setUserLoyaltyTier,
    isCouponApplied,
    setIsCouponApplied,
    pt,
    setPt,
    promotionCouponApplied,
    setPromotionCouponApplied,
    inputPromotionCoupon,
    setInputPromotionCoupon,
    setShowConfetti,
    checkIsPromotionCouponApplied,
    setCheckIsPromotionCouponApplied,
  } = useCartContext();
  const {
    ip,
    token,
    popFromStack,
    pushToStack,
    emailId,
    gender,
    userName,
    currentPage,
    setCurrentPage,
    currentPageIndex,
    setCurrentPageIndex,
    currentPageIndexCategory,
    setCurrentPageIndexCategory,
    currentPageIndexCategory1,
    setCurrentPageIndexCategory1,
    loginUserId,
  } = useLoginContext();

  const forNavigate = page => {
    console.log(page + ' ' + currentPage[currentPage.length - 1]);
    if (currentPage && currentPage[currentPage.length - 1] !== page) {
      pushToStack(page);
      navigation.navigate(page);
    } else {
      popFromStack(navigation);
    }
  };
  const [enteredCouponCode, setEnteredCouponCode] = useState('');
  const [couponDiscountPercentage, setCouponDiscountPercentage] = useState('');
  const [MemberShipStatusDate, setMemberShipStatusDate] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponAppliedError, setCouponAppliedError] = useState(false);
  const [couponAppliedNULLError, setCouponAppliedNULLError] = useState(false);
  //get all active Offers
  const [getActiveOffers, setActiveOffers] = useState([]);

  // Format the date as "01 April, 2024"
  // const formattedDate = date.toLocaleDateString('en-US', {
  //   day: '2-digit',
  //   month: 'long',
  //   year: 'numeric'
  // });

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

  async function getMemberShipStatus() {
    const header = {
      Authorization: `Bearer ${token}`,
    };

    try {
      const response = await axios.get(`http://${ip}:5454/api/users/profile`, {
        headers: header,
      });
      setMemberShipStatusDate(response.data.membershipStartDate);
    } catch (error) {
      console.log('Error fetching profile:', error);
    }
  }
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

  // get all active offers
  async function getAllActiveOffers() {
    const header = {
      Authorization: `Bearer ${token}`,
    };

    try {
      const response = await axios.get(
        `http://${ip}:5454/api/promotions/active`,
        {headers: header},
      );
      setShowActivityIndicator1(false);
      setActiveOffers(response.data);
    } catch (error) {
      console.log('Error fetching profile:', error);
    }
  }

  //show activityIndicator
  const [showActivityIndicator, setShowActivityIndicator] = useState(false);
  const [showActivityIndicator1, setShowActivityIndicator1] = useState(true);
  const [invalidPromotionCode, setInvalidPromotionCode] = useState(false);

  // show the error to the user when the cart amount is less then the target Amount on promotion
  const [showPromotionCouponForAmountError, setShowPromotionCouponAmountError] =
    useState(false);

  useEffect(() => {
    if (showPromotionCouponForAmountError) {
      setTimeout(() => {
        setShowPromotionCouponAmountError(false);
      }, 16000);
    }
  }, [showPromotionCouponForAmountError]);
  const targetAmount = getActiveOffers.find(
    offer =>
      offer.promoCode.toLowerCase() === inputPromotionCoupon.toLowerCase(),
  );

  const applyPromotionCoupon = async () => {
    if (inputPromotionCoupon.length > 0) {
      setShowActivityIndicator(true);
      setTimeout(() => {
        setShowActivityIndicator(false);
        if (
          getActiveOffers.find(
            offer =>
              offer.promoCode.toLowerCase() ===
              inputPromotionCoupon.toLowerCase(),
          )
        ) {
          // Alert.alert(JSON.stringify(targetAmount.minOrderValue));
          if (totalAmount >= targetAmount.minOrderValue) {
            setShowConfetti(true);

            try {
              axios.post(
                `http://${ip}:5454/api/cart/calculate-discount?userId=${loginUserId}&promoCode=${inputPromotionCoupon}`,
                null,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                },
              );
              setShowActivityIndicator(true);
              getCart();
              setTotalAmount(0);
              setShowPromotionCouponAmountError(false);
              setTimeout(() => {
                setPromotionCouponApplied(true);
              }, 900);
              setTimeout(() => {
                navigation.navigate('mainBag');
              }, 900);

              checkIsPromotionCouponIsApplied();
            } catch (error) {
              console.error('Error Posting ApplyPromtionCoupon data:', error);
            }
          } else {
            setShowPromotionCouponAmountError(true);
          }
        } else {
          setInvalidPromotionCode(true);
        }
      }, 800);
    }
  };
  useEffect(() => {
    if (invalidPromotionCode) {
      setTimeout(() => {
        setInvalidPromotionCode(false);
      }, 6000);
    }
  }, [showActivityIndicator, invalidPromotionCode]);
  // async function getUserLoyaltyDiscount(){
  //   const header = {
  //     'Authorization': `Bearer ${token}`,
  //   };

  //   try {
  //     const response = await axios.get(`http://${ip}:5454/api/coupons/${loginUserId}`, { headers: header });
  //     setCouponDiscountPercentage(response.data.discountPercentage);
  //   } catch (error) {
  //     console.log('Error fetching Loyalty applycoupon.jsx:', error);
  //   }
  // }

  // copy the coupon code
  const copyToClipboard = couponCode => {
    Clipboard.setString(couponCode);
  };

  useEffect(() => {
    getUserTier();
    //  getUserLoyaltyDiscount();
    getMemberShipStatus();
    getAllActiveOffers();
    checkIsPromotionCouponIsApplied();
  }, [userLoyaltyTier]);

  const [flag, setFlag] = useState(false);
  function MORECouponDetail() {
    setFlag(!flag);
  }
  const date = new Date(MemberShipStatusDate);
  // Format the date as "01 April, 2024"
  date.setFullYear(date.getFullYear() + 1);
  const formattedDate = date.toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
  function ApplyCouponFn() {
    if (couponApplied) {
      setCouponAppliedError(true);
    } else if (
      (userLoyaltyTier === 'PLATINUM' &&
        totalAmount > 14999 &&
        !couponApplied) ||
      (userLoyaltyTier === 'GOLD' && totalAmount > 7999 && !couponApplied) ||
      (userLoyaltyTier === 'SILVER' && totalAmount > 2999 && !couponApplied)
    ) {
      // Alert.alert("hhe"+couponApplied?'yes1':'by1');
      // applyCoupon();
      let discountedAmount = totalAmount; // Initialize discounted amount with the original total amount
      // Adjust total amount based on user's loyalty tier
      if (userLoyaltyTier === 'PLATINUM') {
        if (deliveryOption === '1') {
          discountedAmount -= 50;
        }
        discountedAmount *= 0.88; // Apply 12% discount for platinum
        if (deliveryOption === '1') {
          discountedAmount += 50;
        }
      } else if (userLoyaltyTier === 'GOLD') {
        if (deliveryOption === '1') {
          discountedAmount -= 50;
        }
        discountedAmount *= 0.92; // Apply 8% discount for gold
        if (deliveryOption === '1') {
          discountedAmount += 50;
        }
      } else if (userLoyaltyTier === 'SILVER') {
        if (deliveryOption === '1') {
          discountedAmount -= 50;
        }
        discountedAmount *= 0.97; // Apply 3% discount for silver
        if (deliveryOption === '1') {
          discountedAmount += 50;
        }
      }
      discountedAmount = Math.floor(discountedAmount);

      if (!pt) {
        setPt(discountedAmount);
        // setTotalAmountBeforeCoupon(totalAmount);
        setTotalAmount(discountedAmount);
      }

      setIsCouponApplied(true);
    } else {
      setCouponAppliedNULLError(true);
    }
  }
  //recalculate total Cart Amount
  const getCart = async () => {
    try {
      const response = await axios.get(`http://${ip}:5454/api/cart/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCartItem(response.data);
      // setTotalAmount(response.data.totalDiscountedPrice);
      recalculateCartAmount();
      setShowActivityIndicator1(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  function recalculateCartAmount() {
    if (cartItem) {
      setTotalAmount(cartItem.totalDiscountedPrice);
    }
  }
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Image
        source={kpmg}
        style={{width: 100, height: 100, marginLeft: '4%'}}
      />
      <TouchableOpacity
        style={{flexDirection: 'row', alignItems: 'center'}}
        onPress={() => {
          popFromStack(navigation);
        }}>
        <View>
          <Image source={back} style={{marginLeft: 12}} />
        </View>
        <View style={{marginLeft: '4%'}}>
          <Text style={{color: 'black'}}>APPLY COUPON</Text>
        </View>
      </TouchableOpacity>
      <Text style={{fontSize: 12, marginLeft: '11%', fontSize: 10}}>
        Your Cart ₹{totalAmount}
      </Text>
      <View style={styles.couponCodeBox}>
        <View style={styles.enterCouponCode}>
          <TextInput
            style={styles.inputField}
            maxLength={16}
            placeholder="Please enter a valid coupon code"
            inputMode="numeric"
            placeholderTextColor="rgba(0,0,0,0.6)"
            onChangeText={text => setInputPromotionCoupon(text)}
          />
        </View>
        <TouchableOpacity
          style={styles.applyCouponBtn}
          onPress={() => {
            applyPromotionCoupon();
          }}>
          <Text style={styles.couponApplyText}>Apply</Text>
        </TouchableOpacity>
      </View>
      {invalidPromotionCode && (
        <Text style={styles.invalidPromotionCode}>Coupon code is invalid</Text>
      )}
      {showPromotionCouponForAmountError && (
        <Text style={styles.invalidPromotionCode1}>
          The offer is valid for orders with a minimum amount of
          <Text style={{fontWeight: '700'}}>
            {' '}
            ₹{targetAmount.minOrderValue}
          </Text>
          {'\n'}in the bag.
        </Text>
      )}

      <View>
        <View
          style={{
            marginTop: '1%',
            width: '90%',
            alignSelf: 'center',
            height: 50,
            alignContent: 'center',
            borderRadius: 18,
          }}>
          {/* <TextInput
          placeholder="Enter Coupon Code"
          value={enteredCouponCode}
          placeholderTextColor='#636161'
          maxLength={12}
          onChangeText={(text) => setEnteredCouponCode(text)}
          style={{ marginLeft: '4%', }}
         /> */}
          {/* <TouchableOpacity style={{  position: 'absolute', right: 0, marginTop: '3.5%', marginRight: '7%' }} onPress={()=>{searchCoupon()}}>
            <Text style={{ fontWeight: '800', fontSize: 15,marginRight:'-7%'}}>APPLY</Text>
        </TouchableOpacity> */}
          <View style={{width: '80%', flexDirection: 'row', marginTop: '4%'}}>
            <View
              style={{
                width: '14%',
                backgroundColor:
                  (userLoyaltyTier === 'PLATINUM' && totalAmount > 15000) ||
                  (userLoyaltyTier === 'GOLD' && totalAmount > 8000) ||
                  (userLoyaltyTier === 'SILVER' && totalAmount > 3000)
                    ? '#00338D'
                    : '#D3D3D3',
                borderTopLeftRadius: 12,
                borderBottomLeftRadius: 12,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontWeight: '800',
                  color: 'white',
                  transform: [{rotate: '-90deg'}],
                  position: 'absolute',
                }}>
                {userLoyaltyTier === 'PLATINUM'
                  ? '12%'
                  : userLoyaltyTier === 'GOLD'
                  ? ' 8%'
                  : userLoyaltyTier === 'SILVER'
                  ? ' 3%'
                  : ''}{' '}
                OFF
              </Text>
            </View>
            <View
              style={{
                borderColor:
                  (userLoyaltyTier === 'PLATINUM' && totalAmount > 15000) ||
                  (userLoyaltyTier === 'GOLD' && totalAmount > 8000) ||
                  (userLoyaltyTier === 'SILVER' && totalAmount > 3000)
                    ? '#00338D'
                    : '#D3D3D3',
                borderWidth: 0.5,
                width: '110%',
                borderTopRightRadius: 12,
                borderBottomRightRadius: 12,
                backgroundColor: '#ffffff',
              }}>
              <TouchableOpacity
                onPress={() => {
                  ApplyCouponFn();
                }}>
                <Text
                  style={{
                    marginLeft: '78%',
                    marginTop: '4%',
                    fontWeight: '800',
                    fontSize: 15,
                  }}>
                  {isCouponApplied ? 'APPLIED' : 'APPLY'}
                </Text>
              </TouchableOpacity>
              <Text style={{marginTop: '2%', marginLeft: '5%'}}>
                {userLoyaltyTier === 'PLATINUM'
                  ? totalAmount < 15000
                    ? `Add ₹ ${15000 - totalAmount} more to avail this offer\n`
                    : `On this amount, you can redeem this coupon, hurry up!`
                  : userLoyaltyTier === 'GOLD'
                  ? totalAmount < 8000
                    ? `Add ₹ ${8000 - totalAmount} more to avail this offer\n`
                    : `On this amount, you can redeem this coupon, hurry up!`
                  : userLoyaltyTier === 'SILVER'
                  ? totalAmount < 3000
                    ? `Add ₹ ${3000 - totalAmount} more to avail this offer\n`
                    : `On this amount, you can redeem this coupon, hurry up!`
                  : ''}
              </Text>

              <Text style={{marginTop: '2%', marginLeft: '5%'}}>
                Get FLAT{' '}
                {userLoyaltyTier === 'PLATINUM'
                  ? '12%'
                  : userLoyaltyTier === 'GOLD'
                  ? '8%'
                  : userLoyaltyTier === 'SILVER'
                  ? '3%'
                  : ''}{' '}
                off
              </Text>
              <View
                style={{
                  marginTop: '7%',
                  height: 1,
                  borderColor: '#D3D3D3',
                  borderBottomWidth: 1,
                  borderStyle: 'dashed',
                  width: '94%',
                  alignSelf: 'center',
                }}
              />
              {!flag && (
                <TouchableOpacity
                  onPress={() => {
                    MORECouponDetail();
                  }}>
                  <Text
                    style={{
                      color: 'black',
                      marginLeft: '4%',
                      marginTop: '2%',
                      fontWeight: '600',
                    }}>
                    +MORE
                  </Text>
                </TouchableOpacity>
              )}
              <View style={{height: 60}}>
                <Text style={{marginLeft: '5%', marginTop: '3%'}}>
                  Click APPLY button and get FLAT {couponDiscountPercentage}%
                  off on{'\n'}order above
                  <Text style={{fontWeight: '600'}}>
                    {' '}
                    Rs.
                    {userLoyaltyTier === 'PLATINUM'
                      ? '14,999'
                      : userLoyaltyTier === 'GOLD'
                      ? '7,999'
                      : userLoyaltyTier === 'SILVER'
                      ? '2,999'
                      : ''}
                  </Text>
                  .
                </Text>
              </View>
              <Text style={{marginTop: '2%', marginLeft: '5%'}}>
                {userLoyaltyTier === 'PLATINUM'
                  ? totalAmount < 15000
                    ? ``
                    : ``
                  : userLoyaltyTier === 'GOLD'
                  ? totalAmount < 15000
                    ? ``
                    : ``
                  : userLoyaltyTier === 'SILVER'
                  ? totalAmount < 8000
                    ? ``
                    : ``
                  : ''}
              </Text>
            </View>
          </View>
          {flag && (
            <View
              style={{
                marginTop: '3%',
                width: '100%',
                height: 100,
                borderWidth: 1,
                borderColor: '#D3D3D3',
                borderRadius: 12,
              }}>
              <View style={{padding: '2%', marginLeft: '5%'}}>
                <Text style={{color: 'black', fontWeight: '500'}}>
                  Terms & Conditions apply
                </Text>
                <View style={{marginTop: '3%'}}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View
                      style={{
                        height: 5,
                        backgroundColor: 'black',
                        width: 5,
                        borderRadius: 12,
                      }}
                    />
                    <Text style={{fontSize: 12, marginLeft: '3%'}}>
                      Offer applied on all products.
                    </Text>
                  </View>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View
                      style={{
                        height: 5,
                        backgroundColor: 'black',
                        width: 5,
                        borderRadius: 12,
                      }}
                    />
                    <Text style={{fontSize: 12, marginLeft: '3%'}}>
                      Coupon Code Offer Valid till
                      <Text style={{fontWeight: '600'}}> {formattedDate}</Text>
                    </Text>
                  </View>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View
                      style={{
                        height: 5,
                        backgroundColor: 'black',
                        width: 5,
                        borderRadius: 12,
                      }}
                    />
                    <Text style={{fontSize: 12, marginLeft: '3%'}}>
                      Other T&C may apply.
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          )}
          {/* {
          couponAppliedError ?
          <Text style={{textAlign:'center',fontSize:12,color:'red',marginTop:'2%'}}>Coupon applied already!</Text>:
          <Text></Text>
         }
         {
          couponAppliedNULLError ?
          <Text style={{textAlign:'center',fontSize:12,color:'red',marginTop:'2%'}}>Coupon applied already!</Text>:
          <Text></Text>
         } */}
          {getActiveOffers && getActiveOffers?.length > 0 && (
            <Text style={styles.allOfferText}>All Offers</Text>
          )}
          {getActiveOffers.map((item, index) => (
            <View style={styles.offerContainer} key={index}>
              <View style={styles.offerBox}>
                <Text style={styles.offerHead}>{item.description}</Text>
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
                      {new Date(item.startDate).toLocaleDateString('en-US', {
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
                      {new Date(item.endDate).toLocaleDateString('en-US', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </Text>
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                style={styles.promocodeBox}
                onPress={() => copyToClipboard(item.promoCode)}>
                <Text style={styles.promocodeData}>
                  Use Code{'\n'}
                  {item.promoCode}
                  {'\n'}
                </Text>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 12,
                    fontWeight: '700',
                    color: '#00338D',
                    textDecorationLine: 'underline',
                  }}>
                  T&C
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
      {showActivityIndicator && (
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator size="large" color="#00338D" />
        </View>
      )}
      {showActivityIndicator1 && (
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator size="large" color="#00338D" />
        </View>
      )}
    </View>
  );
};

export default ApplyCoupon;

const styles = StyleSheet.create({
  allOfferText: {
    color: 'rgba(0, 0, 0, 0.5)',
    fontWeight: '400',
    fontSize: 17,
    marginTop: '5%',
  },
  offerContainer: {
    marginTop: '3%',
    width: '100%',
    height: 100,
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
  promocodeBox: {
    width: 130,
    height: 90,
    margin: '1.2%',
    borderRadius: 12,
    backgroundColor: 'rgba(0, 51, 141, 0.1)',
  },
  offerBox: {
    width: 230,
  },
  promocodeData: {
    textAlign: 'center',
    fontSize: 12,
    marginTop: '7%',
    lineHeight: 20,
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
  couponCodeBox: {
    marginLeft: '4%',
    marginTop: '4%',
    flexDirection: 'row',
    alignContent: 'center',
  },
  enterCouponCode: {
    width: 320,
    height: 45,
    backgroundColor: 'rgba(0, 51, 141, 0.06)',
  },
  couponApplyText: {
    color: '#008CBA',
    fontWeight: '400',
  },
  inputField: {
    color: 'black',
    marginLeft: '4%',
  },
  applyCouponBtn: {
    marginLeft: '4%',
    marginTop: '3%',
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
  invalidPromotionCode: {
    fontSize: 12,
    marginLeft: '5%',
    marginTop: '1%',
    color: '#9c2f2f',
  },
  invalidPromotionCode1: {
    fontSize: 11,
    marginLeft: '5%',
    marginTop: '1%',
    color: '#9c2f2f',
  },
});
