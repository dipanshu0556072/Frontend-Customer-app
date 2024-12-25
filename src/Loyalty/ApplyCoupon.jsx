import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import TopBar from '../PlpScreen/TopBar.jsx';
import back from '../PlpScreen/images/back.png';
import {useCartContext} from '../Context/WomenContext.jsx';
import {useLoginContext} from '../Login/LoginCartProvider.jsx';
import axios from 'axios';

const ApplyCoupon = ({navigation}) => {
  const {
    totalAmount,
    userLoyaltyTier,
    setUserLoyaltyTier,
    flag,
    isLoyaltyCouponApplied,
    setIsLoyaltyCouponApplied,
    setTotalAmount,
  } = useCartContext();
  const {ip, token, loginUserId, popFromStack} = useLoginContext();
  const [isCouponEnable, setIsCouponEnable] = useState(true);
  const [showMoreDetailsOfCoupon, setShowMoreDetailsOfCoupon] = useState(false);
  const [MemberShipStatusDate, setMemberShipStatusDate] = useState('');

  //fetch the Loyalty tier of the user
  const getUserTier = async () => {
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
  };
  const getMemberShipStatus = async () => {
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
      // Alert.alert('Hi', 'Coupon is applied');
        setIsLoyaltyCouponApplied(true); // Coupon is applied
      } else {
       //Alert.alert('Bye', 'Coupon is not applied');
        setIsLoyaltyCouponApplied(false); // Coupon is not applied
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  //Apply Coupon
  const applyCouponAPI = async () => {
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
      setIsLoyaltyCouponApplied(true);
    } catch (error) {
      console.error('Error Posting in Apply Coupon data:', error);
    }
  };

  //show more details of the coupon
  const MORECouponDetail = () => {
    setShowMoreDetailsOfCoupon(true);
  };

  // Format the date as "01 April, 2024"
  const date = new Date(MemberShipStatusDate);
  const formattedDate = date.toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  //show loyalty
  const loyaltyTiers = {
    PLATINUM: 15000,
    GOLD: 8000,
    SILVER: 3000,
  };
  const loyaltyDiscounts = {
    PLATINUM: '12%',
    GOLD: '8%',
    SILVER: '3%',
  };

  const requiredAmount = loyaltyTiers[userLoyaltyTier] - totalAmount;

  // Function to calculate the discounted amount based on loyalty tier
  const calculateDiscountedAmount = (totalAmount, loyaltyTier) => {
    const discountPercentage = loyaltyDiscounts[loyaltyTier];
    if (discountPercentage) {
      const discount = parseFloat(discountPercentage.replace('%', ''));
      const discountAmount = (discount / 100) * totalAmount;
      const finalAmount = totalAmount - discountAmount;
      return finalAmount;
    } else {
      return totalAmount;
    }
  };

  //apply coupon
  const applyCoupon = () => {
    {
      // Call the calculateDiscountedAmount function to get the final amount after discount
      if (!isLoyaltyCouponApplied && requiredAmount <= 0) {
        const finalAmount = calculateDiscountedAmount(
          totalAmount,
          userLoyaltyTier,
        );

        setTotalAmount(calculateDiscountedAmount(totalAmount, userLoyaltyTier));
        applyCouponAPI();
      }
      // Alert.alert(JSON.stringify(finalAmount));
      // setTimeout(()=>{
      //   navigation.navigate('mainBag');
      // },800);
    }
  };

  useEffect(() => {}, [totalAmount, isLoyaltyCouponApplied]);
  useEffect(() => {
    getUserTier();
    getMemberShipStatus();
    checkIsCouponApplied();
  }, []);

  return (
    <View style={styles.mainContainer}>
      <TopBar
        navigation={navigation}
        showKPMGLogo={true}
        showSearchLogo={false}
        showCartLogo={false}
        showWishListLogo={false}
      />

      <View style={styles.rowContainer}>
        <TouchableOpacity
          onPress={() => {
            popFromStack(navigation);
          }}>
          <View style={styles.rowContainer}>
            <View>
              <Image source={back} style={styles.backImage} />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.applyCouponText}>Apply Coupon</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <Text style={styles.cartText}>Your Cart ₹{totalAmount}</Text>

      {/*show the loyalty-Apply-Coupon*/}
      <View
        style={[
          styles.applyCouponContainer,
          {
            borderColor:
              isCouponEnable && requiredAmount <= 0 ? '#00338D' : 'grey',
          },
        ]}>
        <View
          style={[
            styles.leftCouponContainer,
            {backgroundColor: requiredAmount <= 0 ? '#00338D' : 'grey'},
          ]}>
          <Text style={styles.showTextDegree}>
            GET{'\n'}FLAT {loyaltyDiscounts[userLoyaltyTier] || ''} OFF
          </Text>
        </View>
        <View style={styles.rightCouponContainer}>
          <TouchableOpacity
            style={styles.applyBtn}
            onPress={() => {
              applyCoupon();
            }}>
            <Text
              style={[
                styles.applyBtnText,
                {color: requiredAmount <= 0 ? '#00338D' : 'grey'},
              ]}>
              {isLoyaltyCouponApplied ? 'APPLIED' : 'APPLY'}
            </Text>
          </TouchableOpacity>
          <Text style={styles.textStyle}>
            {userLoyaltyTier in loyaltyTiers ? (
              requiredAmount > 0 ? (
                <>
                  Add <Text style={styles.boldText}>₹{requiredAmount}</Text>{' '}
                  more to avail this offer
                </>
              ) : (
                <>On this amount, you can redeem this coupon, hurry up!</>
              )
            ) : (
              ''
            )}
          </Text>

          <Text style={{marginTop: '2%', marginLeft: '5%'}}>
            Get FLAT {loyaltyDiscounts[userLoyaltyTier] || ''} OFF
          </Text>

          {/* Dashed Line */}
          <View style={styles.dashedLine} />

          {/*More button */}
          {!showMoreDetailsOfCoupon && (
            <TouchableOpacity
              onPress={() => {
                MORECouponDetail();
              }}>
              <Text style={styles.moreBtn}>+MORE</Text>
            </TouchableOpacity>
          )}

          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>
              Click APPLY button and get FLAT{' '}
              {loyaltyDiscounts[userLoyaltyTier] || ''} OFF on{'\n'}
              order above{' '}
              <Text style={styles.thresholdText}>
                Rs.{' '}
                {loyaltyTiers[userLoyaltyTier]
                  ? loyaltyTiers[userLoyaltyTier] - 1
                  : ''}
              </Text>
              .
            </Text>
          </View>
        </View>
      </View>

      {showMoreDetailsOfCoupon && (
        <View style={styles.containerTerms}>
          <View style={styles.innerContainerTerms}>
            <Text style={styles.termsTitle}>Terms & Conditions apply</Text>
            <View style={styles.offerDetailsContainer}>
              <View style={styles.offerItemRow}>
                <View style={styles.offerDot} />
                <Text style={styles.offerDescription}>
                  Offer applied on all products.
                </Text>
              </View>
              <View style={styles.offerItemRow}>
                <View style={styles.offerDot} />
                <Text style={styles.offerDescription}>
                  Coupon Code Offer Valid till
                  <Text style={styles.boldOfferText}> {formattedDate}</Text>
                </Text>
              </View>
              <View style={styles.offerItemRow}>
                <View style={styles.offerDot} />
                <Text style={styles.offerDescription}>
                  Other <Text style={styles.underlinedText}>T&C</Text> may
                  apply.
                </Text>
              </View>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default ApplyCoupon;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'white',
    flex: 1,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backImage: {
    marginLeft: 12,
  },
  textContainer: {
    marginLeft: '10%',
  },
  applyCouponText: {
    color: 'black',
  },
  cartText: {
    fontSize: 10,
    marginLeft: '11%',
  },
  applyCouponContainer: {
    width: '93%',
    height: 195,
    margin: '4%',
    borderRadius: 18,
    flexDirection: 'row',
    borderWidth: 1,
  },
  leftCouponContainer: {
    width: '15%',
    height: '100%',
    borderBottomLeftRadius: 18,
    borderTopLeftRadius: 18,
    justifyContent: 'center', // Vertically center the content
    alignItems: 'center', // Horizontally center the content
    position: 'relative', // Needed for absolute positioning of the text
  },
  rightCouponContainer: {
    width: '80%',
    position: 'relative',
  },
  //show text in 90 degree tilt
  showTextDegree: {
    fontWeight: '800',
    color: 'white',
    transform: [{rotate: '-90deg'}],
    position: 'absolute',
    left: '86%',
    top: '10%',
    transform: [{rotate: '-90deg'}, {translateX: -50}, {translateY: -50}],
    textAlign: 'center',
  },

  applyBtn: {
    position: 'absolute',
    right: 0,
    top: 10,
  },
  applyBtnText: {
    fontWeight: '800',
  },
  //show the text
  textStyle: {
    marginTop: '12%',
    marginLeft: '5%',
  },
  boldText: {
    fontWeight: 'bold',
  },
  dashedLine: {
    marginTop: '7%',
    marginLeft: '3%',
    width: '100%',
    height: 1,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: 'gray',
    marginVertical: 7,
  },
  //
  infoContainer: {
    height: 60,
    justifyContent: 'center',
  },
  infoText: {
    marginLeft: '5%',
    fontSize: 14,
    marginBottom: '7%',
    marginTop: '2%',
  },
  thresholdText: {
    fontWeight: '600',
  },
  //more Btn
  moreBtn: {
    color: 'black',
    marginLeft: '4%',
    fontWeight: '600',
  },

  //show terms & condition
  containerTerms: {
    marginTop: '3%',
    width: '95%',
    height: 100,
    borderWidth: 1,
    borderColor: '#D3D3D3',
    borderRadius: 12,
    margin: '3%',
  },
  innerContainerTerms: {
    padding: '2%',
    marginLeft: '5%',
  },
  termsTitle: {
    color: 'black',
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
  offerDetailsContainer: {
    marginTop: '3%',
  },
  offerItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  offerDot: {
    height: 5,
    backgroundColor: 'black',
    width: 5,
    borderRadius: 12,
  },
  offerDescription: {
    fontSize: 12,
    marginLeft: '3%',
  },
  underlinedText: {
    textDecorationLine: 'underline',
    fontWeight: '600',
  },
  boldOfferText: {
    fontWeight: '600',
  },
});
