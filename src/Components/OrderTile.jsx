import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  Modal,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useLoginContext} from '../Login/LoginCartProvider';
import {useCartContext} from '../Context/WomenContext';
import axios from 'axios';

const OrderTile = ({navigation}) => {
  const {ip, token, pushToStack, popFromStack} = useLoginContext();
  const [userOrderHistory, setUserOrderHistory] = useState([]);
  const {setReceiptData} = useCartContext();
  const [isModalVisible, setModalVisible] = useState(false);

  // Get all userOrderHistory
  const orderHistory = async () => {
    try {
      const response = await axios.get(`http://${ip}:5454/api/orders/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserOrderHistory(response.data);
      setReceiptData(response.data);
    } catch (error) {
      console.error('Error in orderHistory API:', error);
    }
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
  //onPress of Download
  const onPressOfDownload = orderId => {
    //store current selectedOrderReceiptData
    storeReceiptData(orderId);
    handlePress();
    setTimeout(() => {
      closeModal();
    }, 2000);
    setTimeout(() => {
      navigation.navigate('exportPdf', {pageName: 'orderHome'});
    }, 3000);
  };
  //onPress of order details button
const onPressOfOrderDetailsBtn = (page, orderId) => {
    pushToStack(page); // Ensure pushToStack is defined elsewhere
    navigation.navigate(page, { orderId }); // Wrap orderId in an object
  };

  //get date as 08/10/2024
  const formatDate = (dateString, daysOffset = 0) => {
    const date = new Date(dateString);

    // Add the days offset if provided
    date.setDate(date.getDate() + daysOffset);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  //show modal of downloading....
  const handlePress = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    orderHistory(); // Fetch order history on component mount
  }, []);

  // Render each order item
  const OrderData = ({item}) => {
    return (
      <View style={[styles.orderTileContainer]}>
        <View style={styles.orderTileRow1}>
          <View>
            <Text style={styles.orderIdHeading}>ORDER ID</Text>
            <Text style={styles.orderId}>KPMG-RT-1445678-98{item.id}</Text>
          </View>
          <TouchableOpacity
            style={styles.orderDetails}
            onPress={() => {
              onPressOfOrderDetailsBtn('orderStatus', item.id); 
            }}>
            <Text style={styles.orderDetailsText}>Order Details</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.orderTileRow2}>
          <Text style={styles.orderStatusText}>
            {item.orderItems?.length} Item(s) {item.orderStatus}
          </Text>
          <Text style={styles.orderedDate}>
            Ordered on: {formatDate(item.orderDate)}
          </Text>
          <Text style={styles.orderedDate}>
            Expected Delivery Date: {formatDate(item.orderDate, 3)}
          </Text>
        </View>

        {/* Show all images of order */}
        <FlatList
          data={item.orderItems.map(item => item.product.imageUrl[0])} // Extracting the first image URL from each order item
          renderItem={({item}) => (
            <Image
              source={{uri: item}} // Assuming item is the image URL
              style={styles.orderImage} // Using the defined style for the image
            />
          )}
          keyExtractor={(item, index) => index.toString()} // Using index as a key
          horizontal // If you want to display images horizontally
          contentContainerStyle={styles.imageListContainer} // Styling the container of the FlatList
        />

        <View style={styles.orderTileRow3}>
          <TouchableOpacity style={styles.rateExperienceTile}>
            <Text style={styles.rateExperienceTileText}>
              Rate your Experience
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.rateExperienceTile}
            onPress={() => {
              onPressOfDownload(item.id);
            }}>
            <Text style={styles.downloadInvoiceTileText}>Download Invoice</Text>
          </TouchableOpacity>
        </View>
        <Modal
          visible={isModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={closeModal}>
          <View>
            <View style={styles.modalContent}>
              <Text style={styles.downloadingText}>Downloading...</Text>
            </View>
          </View>
        </Modal>
      </View>
    );
  };

  return (
    <>
      <ScrollView>
        {userOrderHistory.map((item, index) => (
          // Rendering individual OrderData for each order object
          <OrderData key={index} item={item} />
        ))}
      </ScrollView>
    </>
  );
};

export default OrderTile;

const styles = StyleSheet.create({
  //order tile container
  orderTileContainer: {
    margin: '4%',
    padding: '4%',
    backgroundColorL: 'green',
    borderWidth: 2,
    borderColor: 'rgba(211, 211, 211, 1)',
    borderRadius: 12,
  },
  orderTileRow1: {flexDirection: 'row', justifyContent: 'space-between'},
  orderIdHeading: {
    color: 'black',
    fontSize: 13,
    fontWeight: '500',
  },
  orderId: {
    marginTop: '3%',
    fontSize: 11,
  },
  orderDetails: {
    borderColor: 'rgba(211, 211, 211, 0.5)',
    width: 120,
    height: 30,
    borderWidth: 1,
    borderRadius: 12,
    alignItems: 'center',
    padding: '1.4%',
  },
  orderDetailsText: {
    fontSize: 12.8,
    color: '#b31717',
    fontWeight: '500',
  },
  orderTileRow2: {
    marginTop: '5%',
  },
  orderStatusText: {
    color: 'black',
    fontWeight: '500',
  },
  orderedDate: {
    fontWeight: '300',
    fontSize: 13,
    marginTop: '2%',
  },
  orderTileRow3: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rateExperienceTile: {
    marginTop: '4%',
    borderRadius: 12,
    borderColor: 'rgba(211, 211, 211, 1)',
    borderWidth: 1,
    padding: 10,
  },
  rateExperienceTileText: {
    fontSize: 14,
    color: '#00A3A1',
    fontWeight: '500',
  },
  downloadInvoiceTileText: {
    color: '#00338D',
    fontWeight: '500',
  },
  imageListContainer: {
    paddingVertical: 10, // Adds vertical padding to the FlatList
    paddingHorizontal: 5, // Adds horizontal padding to the FlatList
  },
  orderImage: {
    width: 100, // Width of each image
    height: 100, // Height of each image
    marginRight: 10, // Space between images
    borderRadius: 8, // Optional: rounded corners for images
    backgroundColor: '#f0f0f0', // Optional: background color for better visibility
  },
  //show download modal
  modalContent: {
    backgroundColor: '#00A3A1',
    borderRadius: 3.1,
    elevation: 5, // shadow on Android
    height: '5%',
    width: '120%',
    marginTop: '200%', // Adjust this value to position the modal properly
    padding: 5,
  },
  downloadingText: {padding: '1%', fontWeight: '600', color: 'white'},
});
