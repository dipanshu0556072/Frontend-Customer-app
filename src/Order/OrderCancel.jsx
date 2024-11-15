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
import axios from 'axios';
import returnlogo from '../PlpScreen/images/return.png';
import cross from '../PlpScreen/images/close.png';
import {RadioButton} from 'react-native-paper';
import TopBar from '../PlpScreen/TopBar';

const OrderCancel = ({navigation}) => {
  const [policyModalVisible, setPolicytModalVisible] = useState(false);
  const [orderCancellationReason, setOrderCancellationReason] = useState([]);
  const [showActivityIndicator, setShowActivityIndicator] = useState(true);
  const [totalDiscountedPrice, setTotalDiscountedPrice] = useState(0);
  const [disableCancel, setDisableCancel] = useState(false);

  const {
    trackCurrentOrderId,
    deliveryOption,
    setReceiptData,
    setProducts,
    orderCancelReason,
    setOrderCancelReason,
    cancelLeaveMessage,
    setCancelLeaveMessage,
    orderStatus,
    cancelledOrderItems,
    setGetOrderStatus,
    getOrderStatus,
  } = useCartContext();
  const {ip, token, popFromStack, pushToStack, currentPage,setCurrentPage} = useLoginContext();


  //for navigation between pages
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

  //fetch cancellation Reason from the backend
  const getOrderCancellationReason = async () => {
    try {
      const response = await axios.get(
        `http://${ip}:5454/api/cancellation-reasons/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setOrderCancellationReason(response.data);
      setTimeout(() => {
        setShowActivityIndicator(false);
      }, 2000);
    } catch (error) {
      // Handle errors
      console.error('Error fetching orderCanellationReason', error);
    }
  };
  //fetch current order
  const fetchCurrentOrder = async () => {
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

  //make orderItems from backednd
  const proceedToCancelFromBackend = async () => {
    const dataToCancel = cancelledOrderItems.map(item => ({
      orderItemId: item.id,
    }));
    try {
      if (cancelLeaveMessage.length > 0) {
        const response = await axios.put(
          `http://${ip}:5454/api/admin/orders/${trackCurrentOrderId}/${orderCancelReason}/cancel?comments=${cancelLeaveMessage}`,
          dataToCancel,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        forNavigate('orderCancelConfirm');
        //  Alert.alert("Success1");
      } else {
        const response = await axios.put(
          `http://${ip}:5454/api/admin/orders/${trackCurrentOrderId}/${orderCancelReason}/cancel`,
          dataToCancel,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        forNavigate('orderCancelConfirm');
        //   Alert.alert("Success2");
      }
    } catch (error) {
      // Handle errors
      Alert.alert('Getting some error');
      console.error('Error fetching Placed1Orderdata:', error);
    }

  };

  //if cancel button is pressed
  const onPressOfCancelBtn = () => {
    if (!orderCancelReason && !cancelLeaveMessage) {
      Alert.alert('Please provide a reason for cancellation.');
    } else {
      Alert.alert(
        'Confirm Cancellation',
        'Do you want to proceed with the cancellation?',
        [
          {
            text: 'No',
            onPress: () => {
              console.log('Cancellation aborted');
              setDisableCancel(false); // Reset if the user cancels
            },
            style: 'cancel',
          },
          {
            text: 'Yes',
            onPress: () => {
              setDisableCancel(false); // Reset when action completes
              proceedToCancelFromBackend();
              setTimeout(() => {
                //  forNavigate('orderCancelConfirm');
              }, 1000);
            },
          },
        ],
      );
    }
  };

  //if back button pressed
  const backButtonPressed = () => {
    popFromStack(navigation);
  };

  //show policies to user
  const showAllPolicies = () => {
    setPolicytModalVisible(true);
  };
  //close
  const closePoliciesModal = () => {
    setPolicytModalVisible(false);
  };

  useEffect(() => {}, [totalDiscountedPrice]);
  useEffect(() => {
    fetchCurrentOrder();
    getOrderCancellationReason();
    if (getOrderStatus != null) {
      setTotalDiscountedPrice(getOrderStatus?.filteredSum);
    }
  }, [totalDiscountedPrice]);
  return showActivityIndicator ? (
    <View style={styles.activityIndicatorContainer}>
      <ActivityIndicator size="large" color="#00338D" />
    </View>
  ) : (
    <View style={styles.container}>
      {/*topBar header*/}
      <TopBar
        navigation={navigation}
        showCartLogo={false}
        showWishListLogo={false}
        showSearchLogo={false}
      />

      {/*back button*/}
      <TouchableOpacity
        style={styles.backButtonContainer}
        onPress={() => {
          backButtonPressed();
        }}>
        <Image source={back} />
        <Text style={styles.backButtonText}>CREATE A CANCEL</Text>
      </TouchableOpacity>

      <ScrollView>
        {/*cancel Item list*/}
        <View>
          <View style={styles.mainHeadingContainer}>
            <Text style={styles.mainHeadingText}>ITEMS FROM THIS ORDER</Text>
          </View>

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
        </View>
        {/*eligible for cancellation section*/}
        <View style={styles.productCancelEligibility}>
          <View style={styles.productCancelText}>
            <Image source={returnlogo} style={styles.returnImage} />
            <Text style={{fontSize: 13}}>Eligible for cancellation</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              showAllPolicies();
            }}>
            <Text style={styles.viewPolicyBtn}>VIEW POLICY</Text>
          </TouchableOpacity>
        </View>
        {/*cancellation reason section*/}
        <View style={styles.cancelReasonContainer}>
          <Text style={styles.cancelReasonText1}>Reason for cancellation</Text>
          <Text style={styles.cancelReasonText2}>
            Please provide the accurate reason for the cancellation. This
            information is crucial for enhancing our services.
          </Text>
        </View>
        <View style={styles.cancelReasonContainer}>
          <Text style={styles.radioBoxText}>
            Select Reason
            <Text style={{color: '#d93a2e'}}>*</Text>
          </Text>

          <View style={{margin: '2%'}}>
            {orderCancellationReason.map((item, index) => (
              <View key={index}>
                <View style={styles.radioContainer}>
                  <RadioButton
                    value={item.id}
                    status={
                      orderCancelReason === item.id ? 'checked' : 'unchecked'
                    }
                    onPress={() => {
                      setOrderCancelReason(item.id);
                    }}
                    color="black"
                  />
                  <Text style={styles.radioOption}>{item.description}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/*if user want to add additional comments*/}
        <View style={styles.additionalComments}>
          <TextInput
            value={cancelLeaveMessage}
            onChangeText={text => {
              setCancelLeaveMessage(text);
            }}
            placeholder="Additional Comments"
            placeholderTextColor="#c9c7c7"
            style={{
              fontWeight: '400',
            }}
            multiline
          />
        </View>
      </ScrollView>
      <View style={styles.wrapper}>
        <View style={styles.redContainer}>
          <Text style={styles.refundDetails}>REFUND DETAILS</Text>
          <Text style={styles.priceText}>₹{getOrderStatus?.filteredSum}</Text>
        </View>
        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor:
                orderCancelReason || cancelLeaveMessage ? '#00338D' : '#d3d3d3',
            },
          ]}
          onPress={() => {
            onPressOfCancelBtn();
          }}>
          <View style={styles.buttonContent}>
            <Text style={styles.cancelText}>PROCEED TO CANCEL</Text>
            <Image source={nextArrow} style={styles.cancelImage} />
          </View>
        </TouchableOpacity>
      </View>

      {/*show policies through modal*/}
      <Modal
        animationType="slide"
        transparent={true}
        visible={policyModalVisible}
        onRequestClose={closePoliciesModal}>
        <View style={styles.modalContainer}>
          <View style={styles.weeklyModal1}>
            <View style={styles.cancelPolicy}>
              <Text style={styles.cancelHeading}>Cancellation Policy</Text>
              <TouchableOpacity
                onPress={() => {
                  closePoliciesModal();
                }}>
                <Image source={cross} style={styles.crossImage} />
              </TouchableOpacity>
            </View>
            <View style={styles.horizontalLine2} />
            <ScrollView>
              <View style={styles.Policycontainer}>
                <Text>
                  1. <Text style={styles.bold}>Cancellation Window</Text>:
                  Customers may cancel their order within 24 hours of purchase
                  for a full refund. After this period, cancellations may be
                  subject to fees or restrictions.
                </Text>
                <Text>
                  2. <Text style={styles.bold}>Cancellation Procedure</Text>: To
                  cancel an order, customers must contact our customer service
                  team via email or phone with their order details and reason
                  for cancellation.
                </Text>
                <Text>
                  3. <Text style={styles.bold}>Refund Process</Text>: Refunds
                  for cancelled orders will be processed within 5-7 business
                  days to the original payment method used at the time of
                  purchase.
                </Text>
                <Text>
                  4. <Text style={styles.bold}>Partial Cancellations</Text>:
                  Partial cancellations of orders (e.g., cancelling only certain
                  items from an order) may be permitted depending on the nature
                  of the products and the stage of fulfillment.
                </Text>
                <Text>
                  5. <Text style={styles.bold}>Cancellation Fees</Text>:
                  Depending on the circumstances, cancellation fees may apply.
                  These fees will be communicated to the customer prior to
                  cancelling the order.
                </Text>
                <Text>
                  6. <Text style={styles.bold}>Exceptions</Text>: Certain
                  products or services may have specific cancellation policies
                  outlined at the time of purchase. Customers are advised to
                  review these policies before placing their order.
                </Text>
                <Text>
                  7. <Text style={styles.bold}>Force Majeure</Text>: In the
                  event of unforeseen circumstances such as natural disasters,
                  strikes, or other force majeure events, cancellation policies
                  may be temporarily adjusted.
                </Text>
                <Text>
                  8. <Text style={styles.bold}>Policy Updates</Text>: This
                  cancellation policy is subject to change without prior notice.
                  Any updates or modifications will be communicated to customers
                  through our website or other official channels.
                </Text>
                <Text>
                  9. <Text style={styles.bold}>Customer Responsibilities</Text>:
                  Customers are responsible for providing accurate information
                  at the time of purchase and promptly notifying us of any
                  changes or cancellations.
                </Text>
                <Text>
                  10. <Text style={styles.bold}>Dispute Resolution</Text>: In
                  the event of disputes regarding cancellations, both parties
                  agree to resolve the matter through negotiation and mediation
                  in good faith.
                </Text>
                <Text style={styles.note}>
                  By making a purchase with us, customers agree to abide by the
                  terms and conditions outlined in this cancellation policy.
                </Text>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default OrderCancel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButtonContainer: {
    width: '97%',
    alignSelf: 'center',
    marginTop: '2%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    backgroundColor: 'white',
    padding: '1%',
  },
  backButtonText: {
    color: 'black',
    fontWeight: '800',
    fontSize: 17,
    textAlign: 'center',
    flex: 1,
    padding: '1.2%',
  },
  mainHeadingContainer: {
    marginTop: '4%',
    height: 40,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  mainHeadingText: {
    fontSize: 15,
    color: 'black',
    fontWeight: '500',
    margin: 10,
  },
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
  productCancelEligibility: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    backgroundColor: 'white',
    height: 50,
  },
  productCancelText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  returnImage: {
    width: 17,
    height: 17,
    margin: '2%',
  },
  viewPolicyBtn: {
    color: '#00338D',
    fontWeight: '800',
    margin: '2%',
  },

  //policy modal
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  weeklyModal1: {
    height: 400,
    width: '100%',
    backgroundColor: 'white',
    marginTop: '117%',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    margin: 14,
  },
  cancelPolicy: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  crossImage: {
    width: 17,
    height: 17,
    margin: '2%',
    marginTop: '58%',
  },
  cancelHeading: {
    fontSize: 13,
    color: 'black',
    fontSize: 18,
    fontWeight: '500',
    margin: '4%',
  },
  bold: {
    fontWeight: 'bold',
    color: '#666464',
  },

  //cancellation reason section
  cancelReasonContainer: {
    margin: '1%',
    backgroundColor: 'white',
    padding: '4%',
  },
  cancelReasonText1: {
    color: 'black',
    fontWeight: '700',
    fontSize: 17,
  },
  cancelReasonText2: {
    fontSize: 13.5,
  },
  radioBoxText: {
    margin: '2%',
    fontSize: 15,
    fontWeight: '600',
    color: '#403e3e',
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  //add additional comments
  additionalComments: {
    height: 120,
    margin: '2%',
    marginTop: '4%',
    borderWidth: 1,
    borderRadius: 12,
    borderColor: '#d3d3d3',
    backgroundColor: 'white',
    marginBottom: '10%',
  },
  activityIndicatorContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.7)',
  },

  wrapper: {
    flexDirection: 'row',
    width: '100%',
    height: 80,
    alignContent: 'center',
  },
  redContainer: {
    width: '50%',
    height: 150,
    padding: '3%',
  },

  //
  refundDetails: {
    fontWeight: '700',
    fontSize: 13,
  },
  cancelImage: {
    marginTop: '7%',
    width: 18,
    height: 18,
    margin: '6.6%',
  },
  cancelText: {
    marginTop: '7%',
    color: 'white',
    textAlign: 'center',
    margin: '6.6%',
    fontWeight: '600',
    fontSize: 13,
  },
  //cancel button
  button: {
    height: 50,
    width: 200,
    borderRadius: 10,
    marginTop: '4%',
  },
  buttonContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
