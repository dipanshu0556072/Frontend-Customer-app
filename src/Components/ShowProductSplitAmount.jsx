import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  Image,
} from 'react-native';
import cross from '../PlpScreen/images/close.png';

const ShowProductSplitAmount = ({isModalVisible, onClose, cartItem}) => {
  let promotionsData = cartItem?.product?.appliedPromotion;

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={isModalVisible}
      onRequestClose={onClose}>
      <View style={styles.modalBackground}>
        <View>
          <TouchableOpacity style={styles.crossMark} onPress={onClose}>
            <Image source={cross} style={styles.crossImage} />
          </TouchableOpacity>

          <View style={styles.modalContainer}>
            <Text style={styles.heading}>Price Detail</Text>
            <View style={styles.priceContainer}>
              <View style={styles.priceContainerR1}>
                <Text style={styles.priceText1}>MRP</Text>
                <Text style={styles.priceText2}>
                  ₹{cartItem?.product?.price}
                </Text>
              </View>
              <View style={styles.priceContainerR1}>
                <Text style={styles.priceText1}>Selling Price</Text>
                <Text style={styles.discountedPriceText}>
                  ₹{cartItem?.product?.discountedPrice}
                </Text>
              </View>
              <View style={styles.priceContainerR1}>
                <Text style={styles.priceText1}>Quantity</Text>
                <Text style={styles.promotionText}>{cartItem?.quantity}</Text>
              </View>
              {promotionsData && Object.keys(promotionsData).length > 0 && (
                <View style={styles.promotionsContainer}>
                  <Text style={styles.promotionsHeading}>
                    Promotions discount
                  </Text>
                  {Object.entries(promotionsData).map(
                    ([promoCode, discount], index) => (
                      <View style={styles.appliedPromotionContainer}>
                        <Text key={index} style={styles.promotionText}>
                          {promoCode}
                        </Text>
                        <Text style={styles.promotionText}>
                          - ₹{discount?.toFixed(2)}
                        </Text>
                      </View>
                    ),
                  )}
                </View>
              )}
            </View>

            <View style={styles.appliedPromotionContainer}>
              <Text style={styles.promotionsHeading}>Total</Text>
              <Text style={[styles.discountedPriceText, {fontWeight: '500'}]}>
                {cartItem?.discountedPrice}
              </Text>
            </View>
          </View>

          {/* <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity> */}
        </View>
      </View>
    </Modal>
  );
};
export default ShowProductSplitAmount;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    position: 'relative',
  },
  modalContainer: {
    width: '100%',
    height: '45%',
    backgroundColor: 'white',
    elevation: 5,
    marginTop: '125%',
    padding: '2%',
  },
  heading: {
    fontSize: 18,
    fontWeight: '500',
    color: 'black',
    margin: '1%',
  },
  priceContainer: {
    width: '100%',
    marginTop: '4%',
    borderTopColor: 'rgba(128, 128, 128, 0.3)',
    borderTopWidth: 1,
    borderBottomColor: 'rgba(128, 128, 128, 0.3)',
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  priceContainerR1: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '3%',
  },
  priceText1: {
    fontSize: 14,
    color: 'black',
    fontWeight: '400',
  },
  priceText2: {
    textDecorationLine: 'line-through',
    color: 'black',
    fontWeight: '400',
  },
  discountedPriceText: {
    color: 'green',
  },
  promotionsContainer: {
    marginTop: 10,
  },
  promotionsHeading: {
    fontSize: 14,
    fontWeight: '500',
    color: 'black',
    marginBottom: '5%',
  },
  promotionText: {
    fontSize: 14,
    color: 'black',
  },
  closeButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  appliedPromotionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 6,
  },
  crossImage: {
    height: 14,
    width: 14,
    padding: 10,
    borderRadius: 50,
  },
  crossMark: {
    position: 'absolute',
    top: '50%',
    alignSelf: 'center',
    backgroundColor: 'white',
    padding: 4,
    borderRadius: 50,
  },
});
