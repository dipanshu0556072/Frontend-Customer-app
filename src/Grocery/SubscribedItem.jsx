import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import TopBar from '../PlpScreen/TopBar';
import {useLoginContext} from '../Login/LoginCartProvider';
import {useGroceryContext} from './GroceryContext';
import axios from 'axios';

const SubscribedItem = ({navigation}) => {
  const {ip, token, popFromStack, loginUserId, pushToStack} = useLoginContext();
  const {currentSubscriptionId, setCurrentSubscriptionId} = useGroceryContext();
  const [subscribedProduct, setSubscribedProduct] = useState([]);

  // Fetch all user subscriptions
  const fetchAllUserSubscription = async () => {
    const header = {
      Authorization: `Bearer ${token}`,
    };

    try {
      const response = await axios.get(
        `http://${ip}:5454/subscription/subscribed/products/summary/userId=${loginUserId}`,
        {
          headers: header,
        },
      );
      setSubscribedProduct(response.data);
    } catch (error) {
      console.log('Error fetching profile:', error);
    }
  };

  //onPress of subscription tile
  const onPressOfSubscriptionTile = itemId => {
    pushToStack('subscribedProductDetail');
    navigation.navigate('subscribedProductDetail');
    setCurrentSubscriptionId(itemId);
  };
  //show buffering on the page
  const [showActivityIndicator, setShowActivityIndicator] = useState(false);
  useEffect(() => {
    // Set the indicator to visible
    setShowActivityIndicator(true);

    // Simulate an API call or data fetching process
    setTimeout(() => {
      // Hide the activity indicator after 2 seconds
      setShowActivityIndicator(false);
    }, 2000);

    // Fetch user subscription data
    fetchAllUserSubscription();
  }, []);

  // Render each subscribed item
  const renderItem = ({item, index}) => (
    <TouchableOpacity
      style={styles.subscriptionItem}
      onPress={() => {
        onPressOfSubscriptionTile(item?.id);
      }}>
      {/* Serial number in black */}
      <Text style={styles.serialNo}>{index + 1}</Text>

      {/* Subscription type in black, first letter capitalized */}
      <Text style={styles.subscriptionType}>
        {item.subscriptionType.charAt(0).toUpperCase() +
          item.subscriptionType.slice(1)}
      </Text>

      {/* Start date in green */}
      <Text style={styles.startDate}>{item.subscriptionStartTime}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.mainContainer}>
      {!showActivityIndicator && (
        <>
          <TopBar
            navigation={navigation}
            showKPMGLogo={true}
            showCartLogo={false}
            showWishListLogo={false}
            showSearchLogo={false}
          />

          <ScrollView style={styles.scroll}>
            {/* Conditionally render based on subscribedProduct length */}
            {subscribedProduct.length === 0 ? (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('groceryHome');
                }}>
                <Text style={styles.lowerHead}>
                  Shop & Subscribe more products
                </Text>
              </TouchableOpacity>
            ) : (
              <>
                <Text style={styles.mainHeading}>Subscribed Item List</Text>
                {/* Header row */}
                <View style={styles.headerRow}>
                  <Text style={[styles.headerText, {}]}>Sr. No.</Text>
                  <Text style={styles.headerText}>Subscription Type</Text>
                  <Text style={styles.headerText}>Start Date</Text>
                </View>

                {/* FlatList for subscribed items */}
                <FlatList
                  data={subscribedProduct}
                  renderItem={renderItem}
                  keyExtractor={item => item.id.toString()}
                />
              </>
            )}
          </ScrollView>
        </>
      )}
      {showActivityIndicator && (
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator size="large" color="#00338D" />
        </View>
      )}
    </View>
  );
};

export default SubscribedItem;

const styles = StyleSheet.create({
  scroll: {},
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  mainHeading: {
    alignSelf: 'center',
    color: '#00338D',
    marginTop: '10%',
    fontSize: 19,
    fontWeight: '500',
    marginBottom: '10%',
  },
  lowerHead: {
    alignSelf: 'center',
    fontSize: 15,
    color: '#00338D',
    textDecorationLine: 'underline',
    fontWeight: '500',
    margin: '5%',
  },
  subscriptionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginLeft: '5%',
    marginRight: '5%',
  },
  serialNo: {
    fontSize: 16,
    color: 'black',
    width: '33%', // Adjust width to match header column
  },
  subscriptionType: {
    fontSize: 16,
    color: 'black',
    width: '33%', // Adjust width to match header column
  },
  startDate: {
    fontSize: 16,
    color: 'green',
    width: '34%', // Adjust width to match header column
    textAlign: 'right', // Align the start date to the right
  },
  // Header row styling
  headerRow: {
    flexDirection: 'row',
    padding: 1,
    backgroundColor: '#f5f5f5', // Light background for the header
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    width: '100%', // Ensure header row takes full width
  },

  // Header text styling
  headerText: {
    fontSize: 16,
    color: 'black',
    flex: 1, // Use flex to make sure the columns take equal space
    fontWeight: 'bold',
    textAlign: 'center',
  },
  activityIndicatorContainer: {
    position: 'absolute',
    top: 0,
    bottom: '10%',
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.7)', // Semi-transparent background
  },
});
