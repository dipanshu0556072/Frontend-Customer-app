import {
  Alert,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useCartContext} from '../Context/WomenContext';
import back from '../PlpScreen/images/back.png';
import {useLoginContext} from '../Login/LoginCartProvider';
import axios from 'axios';
import confirmImage from '../PlpScreen/images/checkmark.png';
import TopBar from '../PlpScreen/TopBar';

const CancellationConfirmation = ({navigation}) => {
  const {
    trackCurrentOrderId,
    setReceiptData,
    orderCancelReason,
    cancelLeaveMessage,
    orderStatus,
    cancelledOrderItems
  } = useCartContext();
  const {
    ip,
    token,
    popFromStack,
    currentPage,
    setCurrentPage,
  } = useLoginContext();
  const [getOrderStatus, setGetOrderStatus] = useState([]);

  const forNavigate = page => {
    console.log(page + ' ' + currentPage[currentPage.length - 1]);
    if (currentPage && currentPage[currentPage.length - 1] !== page) {
      if (page === 'mainBag') {
        navigation.navigate(page);
      }
      setCurrentPage(currentPage.slice(0, -3));
      navigation.navigate(page);
    } else {
      popFromStack(navigation);
    }
  };

  
  
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={styles.topContainer}>
      {/*topBar header*/}
      <TopBar
        navigation={navigation}
        showCartLogo={false}
        showWishListLogo={false}
        showSearchLogo={false}
      />
        <TouchableOpacity
          onPress={() => {
            setCurrentPage(['mainHome'], navigation.navigate('mainHome'));
          }}>
          <View style={styles.backBtn}>
            <Image source={back} style={styles.backBtnImg} />
            <View style={styles.backBtnTextContainer}>
              <Text style={styles.backBtnText}>ORDER CANCEL</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <ScrollView>
        <Text style={styles.orderCancelText}>Order Cancelled</Text>
        <View style={styles.horizontalLine2} />
        <Text style={styles.mainHead}>
        {cancelledOrderItems?.length} item is cancelled
        </Text>

          {/*show items*/}
          {cancelledOrderItems &&
            cancelledOrderItems.map((item, index) => (
              <View style={styles.cancelledItemsContainer} key={index}>
                <View style={styles.cancelledItemImage}>
                  <Image
                    source={{uri: item?.product?.imageUrl[0]}}
                    style={styles.cancelledItemImage}
                  />
                </View>
                <View style={styles.cancelledItemData}>
                  <Text style={styles.brandText}>{item?.product?.brand}</Text>
                  <Text style={styles.titleText}>{item?.product?.title}</Text>
                  <View
                    style={[
                      styles.colorIndicator,
                      {
                        backgroundColor: item?.product?.color,
                        borderWidth: item?.product?.color === '#FFFFFF' ? 1 : 0,
                      },
                    ]}
                  />
                  <Text style={styles.infoText}>Fit: {item?.product?.fit}</Text>
                  <Text style={styles.infoText}>Size: {item?.size}</Text>
                  <Text style={styles.infoText}>Qty: {item?.quantity}</Text>
                  <Text style={styles.priceText}>₹{item?.discountedPrice}</Text>
                </View>
              </View>
            ))}


        <View style={{margin: '4%'}}>
          <View style={styles.refundDetails}>
            <Image source={confirmImage} style={styles.refundImage} />
            <Text style={styles.refundText1}> Refund Details</Text>
          </View>
          <Text style={styles.refundText2}>
            A refund is not applicable on this order as it is a Pay on {'\n'}
            delivery order
          </Text>

          <View style={styles.refundDetails}>
            <Image source={confirmImage} style={styles.refundImage} />
            <Text style={styles.refundText1}> PLEASE NOTE</Text>
          </View>
          <Text style={styles.refundText2}>
            You will receive an email/sms confirming the {'\n'}cancellation of
            order shortly.
          </Text>
        </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.doneBtn}
        onPress={() => {
          forNavigate('mainHome');
        }}>
        <Text style={styles.dontBtnText}>DONE</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CancellationConfirmation;

const styles = StyleSheet.create({
  horizontalLine2: {
    height: 2,
    backgroundColor: '#F5F5F5',
    marginTop: '7%',
  },
  correctImage: {
    width: 180,
    height: 180,
    alignSelf: 'center',
  },
  orderCancelText: {
    color: 'black',
    fontWeight: '500',
    textAlign: 'center',
    marginTop: '-9%',
    fontWeight: '700',
    fontSize: 16,
  },
  mainHead: {
    color: 'black',
    margin: '1%',
    fontWeight: '600',
    margin: '4%',
    fontSize: 14,
  },
  productContainer: {
    padding: '3%',
    backgroundColor: '#F5F5F5',
    margin: '2%',
    borderRadius: 12,
  },
  image: {
    width: 80,
    height: 110,
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
  refundDetails: {
    flexDirection: 'row',
    marginTop: '4%',
  },
  refundImage: {
    width: 20,
    height: 20,
  },
  refundText1: {
    fontWeight: '700',
    fontSize: 12,
  },
  refundText2: {
    marginLeft: '8%',
    fontSize: 13,
  },
  doneBtn: {
    backgroundColor: '#00338D',
    width: '90%',
    padding: '3%',
    alignSelf: 'center',
    marginBottom: '2.5%',
  },
  dontBtnText: {
    color: 'white',
    fontWeight: '600',
    alignSelf: 'center',
    fontSize: 15,
  },
  topContainer: {
    backgroundColor: '#F5F5F5',
    height: 160,
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
  backBtnText: {
    color: 'black',
    fontWeight: '800',
    fontSize: 17,
  },

  //
  cancelledItemsContainer: {
    flexDirection: 'row',
    width: '100%',
    padding: '2%',
    borderRadius: 30,
  },
  cancelledItemImage: {
    width: 90,
    height: 153,
  },

  cancelledItemData: {
    marginLeft: '2%',
    width: '75%',
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  brandText: {
    fontSize: 13,
    fontWeight: 'bold',
  },
  titleText: {
    fontSize: 14,
    color: '#333',
  },
  infoText: {
    fontSize: 12,
    color: '#666',
  },
  priceText: {
    fontSize: 14,
    color: '#000',
    fontWeight: 'bold',
  },

  colorIndicator: {
    width: 12,
    height: 12,
    borderRadius: 50,
    margin: 2,
  },
});
