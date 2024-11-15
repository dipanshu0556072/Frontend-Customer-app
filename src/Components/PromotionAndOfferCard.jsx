import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  Modal,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import offerDiscount from '../PlpScreen/images/offerDiscount.png';
import xcross from '../PlpScreen/images/xMark.png';
import axios from 'axios';
import {useLoginContext} from '../Login/LoginCartProvider';

const PromotionAndOfferCard = ({title, productId}) => {
  const [showModal, setShowModal] = useState(false);
  const [promotionData, setPromotionData] = useState([]);
  const [storeBestDeal, setStoreBestDeal] = useState([]);
  const {ip, token} = useLoginContext();

  // Fetch promotions from backend for current product on PDP
  const fetchPromotion = async () => {
    const header = {
      Authorization: `Bearer ${token}`,
    };
    try {
      const response = await axios.get(
        `http://${ip}:5454/api/products/id/${productId}`,
        {headers: header},
      );
      if (title === 'Promotion') {
        setPromotionData(response.data.eligiblePromotions);
      }
    } catch (error) {
      console.log('Error fetching product:', error);
    }
  };

  // Fetch best deal for current product on PDP
  const fetchBestDeal = async () => {
    const header = {
      Authorization: `Bearer ${token}`,
    };
    try {
      const response = await axios.get(
        `http://${ip}:5454/api/bestdeals/best/${productId}`,
        {headers: header},
      );
      if (title === 'Best Deal') {
        setStoreBestDeal([response.data]);
      }
    } catch (error) {
      console.log('Error fetching product:', error);
    }
  };

  // Toggle modal visibility
  const onPressShowModal = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    fetchBestDeal();
    fetchPromotion();
  }, []);
  console.log(JSON.stringify(promotionData));
  return (
    <View>
      <View style={styles.offerMainContainer}>
        <View style={styles.containerWrapper}>
          {title === 'Best Deal' && storeBestDeal.length > 0 && (
            <View style={styles.couponContainer}>
              <View style={styles.containerData}>
                <View style={styles.offerMainHead}>
                  <Image source={offerDiscount} style={styles.offerImage} />
                  <Text style={styles.offerHeading}>{title}</Text>
                </View>
                <Text style={styles.couponOfferText}>
                  Sale Price ₹ {storeBestDeal[0]?.bestPrice}
                </Text>
                <Text style={styles.couponDiscountText}>
                  {storeBestDeal[0]?.promotionDetails}
                </Text>
              </View>
            </View>
          )}

          {title === 'Promotion' && promotionData.length > 0 && (
            <View style={styles.couponContainer}>
              <View style={styles.containerData}>
                <View style={styles.offerMainHead}>
                  <Image source={offerDiscount} style={styles.offerImage} />
                  <Text style={styles.offerHeading}>{title}</Text>
                </View>
                <Text style={styles.couponOfferText}>
                  {promotionData[0]?.promotionDescription}
                </Text>
                <View style={styles.couponCodeConatiner}>
                  <Text style={styles.couponCodeText}>
                    {promotionData[0]?.promotionCode}
                  </Text>
                </View>
              </View>
            </View>
          )}

          {/* Show more options if promotions are available */}
          {title !== 'Best Deal' && promotionData.length > 0 && (
            <TouchableOpacity
              style={styles.moreOfferOption}
              onPress={onPressShowModal}>
              <Text style={styles.moreOfferText}>
                +{promotionData.length-1} {title} offers
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={onPressShowModal}>
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={onPressShowModal}>
            <Image source={xcross} style={styles.closeIcon} />
          </TouchableOpacity>
          <View style={styles.couponModalContainer}>
            <View style={styles.rowContainer}>
              <View style={styles.couponsContainer}>
                <Image source={offerDiscount} style={styles.offerImage1} />
                <Text style={styles.couponsText}>{title}</Text>
              </View>
            </View>
            <ScrollView
              style={styles.offerContainer}
              nestedScrollEnabled={true}
              showsVerticalScrollIndicator={false}>
              {promotionData.map((item, index) => (
                <View key={index} style={styles.modalDiscountTile}>
                
                {item?.promotionCode!='BOGO' &&(
                  item?.promotionType == 'PERCENTAGE' ? (
                    <Text style={[styles.couponOfferText, {marginTop: '1%'}]}>
                      Sale Discount {parseInt(item.discountValue)}% OFF
                    </Text>
                  ) : (
                    <Text style={[styles.couponOfferText, {marginTop: '1%'}]}>
                      Sale Discount OFF ₹{item.discountValue}
                    </Text>
                  )
                 )
                }

                  <Text style={[styles.couponDiscountText, {marginTop: '1%'}]}>
                    {item.promotionDescription}
                  </Text>
                  <View style={styles.couponCodeConatiner}>
                    <Text style={styles.couponCodeText}>
                      {item.promotionCode}
                    </Text>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default PromotionAndOfferCard;

const styles = StyleSheet.create({
  offerMainContainer: {
    width: 180,
    margin: '3%',
  },

  containerWrapper: {
    width: 180,
  },

  couponContainer: {
    borderColor: 'grey',
    borderRadius: 20,
    width: '100%',
    minHeight: 140,
    backgroundColor: 'rgba(173, 216, 230, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(173, 216, 230, 0.6)',
  },
  containerData: {margin: '4%'},

  offerImage: {
    width: 16,
    height: 16,
    marginRight: '3%',
  },
  offerMainHead: {
    marginTop: '4%',
    marginLeft: '4%',
    flexDirection: 'row',
  },

  offerHeading: {
    fontSize: 11,
    color: 'black',
  },
  moreOfferOption: {
    marginLeft: '7%',
    marginTop: '5%',
  },
  couponOfferText: {
    fontSize: 15,
    color: 'green',
    marginTop: '4%',
  },
  couponDiscountText: {
    fontSize: 11,
    flexShrink: 1,
    flexWrap: 'wrap',
    marginTop: '2%',
  },
  couponCodeConatiner: {
    width: '70%',
    marginLeft: '2%',
    padding: '1%',
    borderStyle: 'dashed',
    borderColor: 'green',
    borderWidth: 1,
    backgroundColor: 'rgba(0, 128, 0, 0.1)',
    marginTop: '6%',
  },
  couponCodeText: {
    textAlign: 'center',
    color: 'black',
    fontSize: 13,
    fontWeight: '500',
  },

  // more offer text
  moreOfferText: {
    fontSize: 12,
    color: '#00338D',
    fontWeight: '600',
  },
  // show modal for offers
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  closeIcon: {
    width: 26,
    height: 26,
    marginTop: '10%',
  },
  couponModalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '95%',
    height: '85%',
    marginTop: '10%',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  couponsContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
  },
  couponsText: {
    color: 'black',
    fontSize: 17,
    fontWeight: '400',
  },
  offerImage1: {
    width: 20,
    height: 20,
    marginRight: '7%',
  },
  // offerContainer in modalData
  offerContainer: {
    flex: 1,
    width: Dimensions.get('window').width - 60,
  },
  modalDiscountTile: {
    width: '100%',
    borderColor: 'rgba(128, 128, 128, 0.2)',
    borderWidth: 2,
    borderRadius: 12,
    padding: '3%',
    marginTop: '5%',
  },
});
