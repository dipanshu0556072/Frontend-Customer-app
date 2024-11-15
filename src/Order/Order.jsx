import {
  TouchableWithoutFeedback,
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useCartContext} from '../Context/WomenContext';
import {useLoginContext} from '../Login/LoginCartProvider';
import back from '../PlpScreen/images/back.png';
import axios from 'axios';
import emptyBag from './emptyBag.png';
import {Alert} from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import {
  useColorScheme,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Platform,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import TopBar from '../PlpScreen/TopBar';
import BottomNavigator from '../Components/BottomNavigator';

const Tab = createBottomTabNavigator();
import HomeBar from '../HomeBar';
import ProfileBar from '../ProfileBar';
import Home1 from '../Fashion';
import bell1 from '../PlpScreen/images/bell1.png';
import categories1 from '../PlpScreen/images/category1.png';
import home1 from '../PlpScreen/images/home1.png';
import user1 from '../PlpScreen/images/user1.png';

const Order = ({navigation}) => {
  const {setTrackCurrentOrderId, setChecked,setReceiptData} = useCartContext();
  const {
    token,
    popFromStack,
    pushToStack,
    currentPage,
    setCurrentPage,
    currentPageIndex,
    setCurrentPageIndex,
    currentPageIndexCategory,
    setCurrentPageIndexCategory,
    ip,
  } = useLoginContext();

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

  const [getUserOrderHistory, setGetUserOrderHistory] = useState([]);

  useEffect(() => {
    const getOrderStatus1 = async () => {
      try {
        const response = await axios.get(`http://${ip}:5454/api/orders/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setGetUserOrderHistory(response.data);
      } catch (error) {
        console.error('Error fetching Placed1Orderdata:', error);
      }
    };

    getOrderStatus1();
  }, [token]);

  const formattedDate = dateString => {
    const createdAtDate = new Date(dateString);
    return `${createdAtDate.getDate()}/${
      createdAtDate.getMonth() + 1
    }/${createdAtDate.getFullYear()}`;
  };

  const formattedDate1 = dateString => {
    const createdAtDate = new Date(dateString);
    const updatedDate = new Date(
      createdAtDate.setDate(createdAtDate.getDate() + 3),
    );
    return `${updatedDate.getDate()}/${
      updatedDate.getMonth() + 1
    }/${updatedDate.getFullYear()}`;
  };

  const handlePress = (itemId, orderStatus) => {
    setTrackCurrentOrderId(itemId);
    if (orderStatus !== 'DELIVERED') {
      pushToStack('orderStatus');
      navigation.navigate('orderStatus');
    } else {
      pushToStack('orderStatus');
      navigation.navigate('orderStatus');
    }
  };

  const [rateModalVisible, setRateModalVisible] = useState(false);
  const [isModalVisible2, setModalVisible2] = useState(false);

  const handleRatetModalClose = () => {
    setTimeout(() => {
      setRateModalVisible(false);
    }, 100);
  };

  const handleRateSortPress = () => {
    setRateModalVisible(true);
  };

  const handlePress2 = () => {
    setModalVisible2(true);
  };

  const closeModal2 = () => {
    setModalVisible2(false);
  };

  //store receiptData
  const storeReceiptData = async orderId => {
    try {
      const response = await axios.get(
        `http://${ip}:5454/api/orders/${orderId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setReceiptData(response.data);
    } catch (error) {
      console.error('Error in orderHistory API:', error);
    }
  };
  const DownloadingInvoice = orderId => {
    handlePress2();
    //store current selectedOrderReceiptData
    storeReceiptData(orderId);
    setTimeout(() => {
      closeModal2();
    }, 2000);
    setTimeout(() => {
      navigation.navigate('exportPdf', {pageName: 'order'});
    }, 3000);
  };

  // Sort the order history by createdAt in descending order
  const sortedOrderHistory = getUserOrderHistory.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
  );

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <TopBar
        navigation={navigation}
        showCartLogo={false}
        showWishListLogo={false}
        showSearchLogo={false}
      />

      {getUserOrderHistory && getUserOrderHistory.length <= 0 ? (
        <Image
          source={emptyBag}
          style={{width: 330, height: 330, marginTop: '24%', marginLeft: '10%'}}
        />
      ) : (
        <>
          <ScrollView style={{marginBottom: '4%'}}>
            <View
              style={{
                marginLeft: '4%',
                marginRight: '4%',
                borderColor: '#000000',
                borderWidth: 0.8,
                marginTop: '3%',
                borderRadius: 12,
                borderColor: 'grey',
                padding: '2%',
              }}>
              {sortedOrderHistory &&
                sortedOrderHistory.length > 0 &&
                sortedOrderHistory.map((item, index) => (
                  <React.Fragment key={index}>
                    <View
                      style={{
                        margin: '2%',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <View>
                        <Text style={{color: 'black', fontWeight: '300'}}>
                          ORDER ID
                        </Text>
                        <Text style={{color: 'grey', fontSize: 12, padding: 1}}>
                          KPMG-RT-4498<Text>{item.id}</Text>
                        </Text>
                      </View>
                      <TouchableOpacity
                        key={index}
                        style={{
                          backgroundColor: 'white',
                          borderColor: '#D3D3D3',
                          borderWidth: 1,
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: 13,
                          padding: '1%',
                          width: '33%',
                        }}
                        onPress={() => {
                          handlePress(item.id, item.orderStatus);
                          setChecked([]);
                        }}>
                        <Text
                          style={{
                            textAlign: 'center',
                            textAlignVertical: 'center',
                            color: '#b31717',
                          }}>
                          Order Details
                        </Text>
                      </TouchableOpacity>
                    </View>

                    <View>
                      {item.orderItems && item.orderItems.length > 0 && (
                        <>
                          <Text
                            style={{
                              color: 'black',
                              fontSize: 18,
                              marginTop: '3%',
                            }}>
                            {item.orderItems.length} Item(s) {item.orderStatus}
                          </Text>
                          <Text
                            style={{
                              fontSize: 14,
                              marginTop: '2%',
                              color: 'grey',
                              padding: '0.4%',
                            }}>
                            Order on: {formattedDate(item.createdAt)}
                          </Text>
                          <Text
                            style={{
                              fontSize: 14,
                              padding: '0.4%',
                              color: 'grey',
                              marginBottom: '1%',
                            }}>
                            Expected Delivery Date:{' '}
                            {formattedDate1(item.createdAt)}
                          </Text>
                          <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}>
                            {item.orderItems.map((prod, prodIndex) => (
                              <View key={prodIndex} style={{marginRight: 10}}>
                                {prod.product && (
                                  <Image
                                    source={{uri: prod.product.imageUrl[0]}}
                                    style={{width: 70, height: 70}}
                                  />
                                )}
                              </View>
                            ))}
                          </ScrollView>
                        </>
                      )}
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: '5%',
                      }}>
                      <TouchableOpacity
                        style={{
                          padding: '3%',
                          borderColor: '#D3D3D3',
                          borderWidth: 1,
                          borderRadius: 12,
                          width: '48%',
                        }}
                        onPress={handleRateSortPress}>
                        <Text
                          style={{
                            textAlign: 'center',
                            fontWeight: '600',
                            color: '#00A3A1',
                          }}>
                          Rate your Experience
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{
                          padding: '3%',
                          borderColor: '#D3D3D3',
                          borderWidth: 1,
                          borderRadius: 12,
                          width: '48%',
                        }}
                        onPress={() => {
                          DownloadingInvoice(item?.id);
                        }}>
                        <Text
                          style={{
                            textAlign: 'center',
                            fontWeight: '600',
                            color: '#00338D',
                          }}>
                          Download Invoice
                        </Text>
                      </TouchableOpacity>
                    </View>

                    {index !== sortedOrderHistory.length - 1 && (
                      <View
                        style={{
                          borderBottomWidth: 0.5,
                          borderBottomColor: 'black',
                          marginTop: '6%',
                          marginBottom: '6%',
                        }}
                      />
                    )}
                  </React.Fragment>
                ))}
            </View>
          </ScrollView>
          <View style={styles.bottomBar}>
            <BottomNavigator navigation={navigation} />
          </View>
          <View style={{marginTop: '12%'}} />
        </>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={rateModalVisible}
        onRequestClose={handleRatetModalClose}>
        <TouchableWithoutFeedback onPress={handleRatetModalClose}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent1}></View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <Modal
        visible={isModalVisible2}
        animationType="slide"
        transparent={true}
        onRequestClose={closeModal2}>
        <View>
          <View style={styles.modalContent12}>
            <Text style={{padding: '1%', fontWeight: '600', color: 'white'}}>
              Downloading...
            </Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Order;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent1: {
    width: '100%',
    height: '50%',
    marginTop: '155%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
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
  modalContent2: {
    backgroundColor: '#00A3A1',
    borderRadius: 3.1,
    elevation: 5, // shadow on Android
    height: '5%',
    width: '120%',
    marginTop: '200%', // Adjust this value to position the modal properly
    padding: 5,
  },
  modalContent12: {
    backgroundColor: '#00A3A1',
    borderRadius: 3.1,
    elevation: 5, // shadow on Android
    height: '5%',
    width: '120%',
    marginTop: '200%', // Adjust this value to position the modal properly
    padding: 5,
  },
  bottomBar: {
    marginTop: '4%',
  },
});
