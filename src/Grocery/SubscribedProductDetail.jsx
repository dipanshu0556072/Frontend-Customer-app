import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import {CalendarList} from 'react-native-calendars'; // Import CalendarList
import axios from 'axios';
import {useLoginContext} from '../Login/LoginCartProvider';
import {useCartContext} from '../Context/WomenContext';
import {useGroceryContext} from './GroceryContext';
import TopBar from '../PlpScreen/TopBar';
import back from '../PlpScreen/images/back.png';

const SubscribedProductDetail = ({navigation}) => {
  const {ip, token, popFromStack, loginUserId} = useLoginContext();
  const {
    date,
    setDate,
    setEndDate,
    setCurrentProductIdOnPDP,
    setScheduleSubscriptionOption,
  } = useCartContext();
  const {
    currentSubscriptionId,
    setIsSubcriptionModifyRequest,
    setSelectQuantity,
    subsribedSelectedDatesCount,
    setSubscribedSelectedDatesCount
  } = useGroceryContext();
  const [subscriptionData, setSubscriptionData] = useState([]);
  const [deliveryDates, setDeliveryDates] = useState([]);
  const [isPaused, setIsPaused] = useState(false);
  const [isCanceled, setIsCanceled] = useState(false);

  // Fetch all user subscriptions
  const fetchUserSubscription = async () => {
    const header = {
      Authorization: `Bearer ${token}`,
    };

    try {
      const response = await axios.get(
        `http://${ip}:5454/subscription/subscribed/product/subscriptionId=${currentSubscriptionId}`,
        {headers: header},
      );
      setSubscriptionData(response.data);
      // Extract the delivery dates and store them in the state
      const datesArray = response.data?.deliveryDates?.map(dateObj => dateObj);
      setDeliveryDates(datesArray);
      setIsPaused(response.data?.subscriptionPaused); // Set paused status
      setIsCanceled(response.data?.subscriptionCancel); // Set canceled status
    } catch (error) {
      console.log('Error fetching subscription:', error);
    }
  };

  // Show alert if user wants to pause the subscription
  const showPauseAlert = () => {
    Alert.alert(
      'Pause Subscription',
      'Are you sure you want to pause your subscription?',
      [
        {text: 'No', onPress: () => console.log('Pause canceled')},
        {text: 'Yes', onPress: () => pauseSubscription()},
      ],
    );
  };

  // Show alert if user wants to cancel the subscription
  const showCancelAlert = () => {
    Alert.alert(
      'Cancel Subscription',
      'Are you sure you want to cancel your subscription?',
      [
        {text: 'No', onPress: () => console.log('Cancel canceled')},
        {text: 'Yes', onPress: () => cancelSubscription()},
      ],
    );
  };

  // Show alert if user wants to modify the subscription
  const showModifyAlert = (subscriptionType) => {
    const buttons = [
      { text: 'No', onPress: () => console.log('Modify canceled') },
      { text: 'Yes', onPress: () => modifySubscription() },
    ];
  
    // Check for 'custom' subscription type, ignoring case
    if (subscriptionData?.subscriptionType.toLowerCase() === 'custom') {
      buttons.splice(1, 0, { text: 'Extend Subscription', onPress: () => extendSubscription() });
    }
  
    Alert.alert(
      'Modify Subscription',
      'Are you sure you want to modify your subscription?',
      buttons,
    );
  };
  
  

  const extendSubscription = () => {
    setModificationDetails();
    const newDate = addDaysToSubscription(subscriptionData?.subscriptionStartTime);
    const newEndDate=addDaysToSubscription(subscriptionData?.subscriptionEndTime);
    setDate(newDate);
    setEndDate(newEndDate);
    setSubscribedSelectedDatesCount(subscriptionData?.deliveryDates?.length);
    navigation.navigate('scheduleSubscription');
    console.log('Subscription extended: ' + JSON.stringify(newDate)+" "+JSON.stringify(newEndDate)+" "+JSON.stringify(subsribedSelectedDatesCount));
  };
  

  // Function to handle pausing the subscription
  const pauseSubscription = async () => {
    try {
      await axios.post(
        `http://${ip}:5454/subscription/pause/userId=${loginUserId}/subscriptionId=${currentSubscriptionId}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setIsPaused(true); // Update the paused state immediately
      setTimeout(() => {
        Alert.alert(
          'Subscription Paused',
          'Your subscription has been paused successfully!',
        );
      }, 1000);
    } catch (error) {
      console.error('Error Posting paused subscription:', error);
    }
  };

  // Function to handle canceling the subscription
  // Function to handle canceling the subscription
  const cancelSubscription = async () => {
    setIsCanceled(true); // Update the canceled state immediately
    try {
      await axios.post(
        `http://${ip}:5454/subscription/cancelSubscription/userId=${loginUserId}/subscriptionId=${currentSubscriptionId}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setIsCanceled(true); // Update the canceled state immediately
      setTimeout(() => {
        Alert.alert(
          'Subscription Canceled',
          'This subscription is canceled. No actions can be performed.',
          [{text: 'Ok'}],
        );
      }, 1000);
    } catch (error) {
      console.error('Error Posting cancellation subscription:', error);
    }
    console.log('Subscription canceled');
  };
  // Function to map subscriptionType to option value
  const mapSubscriptionTypeToOption = subscriptionType => {
    const type = subscriptionType?.toLowerCase();

    switch (type) {
      case 'daily':
        return '0'; // Map Daily to '0'
      case 'weekly':
        return '1'; // Map Weekly to '1'
      case 'alternative':
        return '2'; // Map Alternative to '2'
      case 'custom':
        return '3'; // Map Alternative to '2'
      case 'monthly':
        return '4'; // Map Alternative to '2'
      default:
        return null; // Handle unexpected values
    }
  };

// Function to add 30 days to a given date string (in dd/mm/yy format)
function addDaysToSubscription(subscriptionStartTime) {
  // Parse the subscriptionStartTime into a Date object
  const [day, month, year] = subscriptionStartTime.split('/').map(num => parseInt(num, 10));
  const date = new Date(year + 2000, month - 1, day); // JavaScript Date object uses 0-based months

  // Add 30 days
  date.setDate(date.getDate() + 30);

  // Format the date to "dd/mm/yy"
  const newDay = String(date.getDate()).padStart(2, '0');
  const newMonth = String(date.getMonth() + 1).padStart(2, '0');
  const newYear = date.getFullYear().toString().slice(-2);  // Last two digits of the year

  return `${newDay}/${newMonth}/${newYear}`;
}
  // Function to handle modifying the subscription
  //set details for modifcation 
  const setModificationDetails=()=>{
    setDate(subscriptionData?.subscriptionStartTime);
    setEndDate(subscriptionData?.subscriptionEndTime);
    setIsSubcriptionModifyRequest(true);
    setScheduleSubscriptionOption(
      mapSubscriptionTypeToOption(subscriptionData?.subscriptionType),
    );
    setSelectQuantity(subscriptionData?.quantity);
    setCurrentProductIdOnPDP(subscriptionData?.productId);
  }
  const modifySubscription = async () => {
    setModificationDetails();
    navigation.navigate('scheduleSubscription');
    console.log('Subscription modified');
  };

  // Function to handle resuming the subscription
  const resumeSubscription = async () => {
    try {
      await axios.post(
        `http://${ip}:5454/subscription/reactivate/userId=${loginUserId}/subscriptionId=${currentSubscriptionId}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setIsPaused(false); // Set paused state to false
      setTimeout(() => {
        Alert.alert(
          'Subscription Resumed',
          'Your subscription has been resumed successfully!',
          [{text: 'Ok', onPress: () => console.log('Subscription resumed')}],
        );
      }, 800);
    } catch (error) {
      console.error('Error Resuming subscription:', error);
    }
  };

  useEffect(() => {
    fetchUserSubscription();
  }, []);

  useEffect(() => {
    if (isPaused && !isCanceled) {
      // Only show the resume alert if the subscription is paused and not canceled
      Alert.alert(
        'scription Paused',
        'This subscription is paused. Would you like to resume it?',
        [
          {text: 'No', onPress: () => console.log('Resume canceled')},
          {text: 'Yes', onPress: () => resumeSubscription()},
        ],
      );
    }

    // Show alert when subscription is canceled
    if (isCanceled) {
      Alert.alert(
        'Subscription Canceled',
        'This subscription is canceled. No actions can be performed.',
        [{text: 'Ok'}],
      );
    }
  }, [isPaused, isCanceled]); // Depend on isPaused and isCanceled to control this behavior

  const prepareMarkedDates = () => {
    const markedDates = {};

    deliveryDates.forEach(dateObj => {
      let color;
      switch (dateObj.deliveryStatus) {
        case 'delivered':
          color = 'green';
          break;
        case 'notdelivered':
          color = '#E97451';
          break;
        case 'pending':
        default:
          color = '#00338D';
      }

      markedDates[dateObj.date] = {
        selected: true,
        selectedColor: color,
        selectedTextColor: 'white',
      };
    });

    return markedDates;
  };


  const onPressOfBackButton = () => {
    popFromStack(navigation);
  };

  return (
    <View style={styles.mainContainer}>
      <TopBar
        navigation={navigation}
        showKPMGLogo={true}
        showCartLogo={false}
        showWishListLogo={false}
        showSearchLogo={false}
      />

      <View style={styles.statusContainer}>
        <Text style={styles.statusHeader}>Status</Text>
        <View style={styles.statusItem}>
          <View style={[styles.colorIndicator, styles.delivered]} />
          <Text style={styles.statusText}>Delivered</Text>
        </View>
        <View style={styles.statusItem}>
          <View style={[styles.colorIndicator, styles.notDelivered]} />
          <Text style={styles.statusText}>Not Delivered</Text>
        </View>
        <View style={styles.statusItem}>
          <View style={[styles.colorIndicator, styles.pending]} />
          <Text style={styles.statusText}>Pending</Text>
        </View>
      </View>

      <View style={styles.row}>
        <TouchableOpacity onPress={() => onPressOfBackButton()}>
          <View style={styles.row}>
            <Image source={back} style={styles.backImage} />
            <View style={styles.textContainer}>
              <Text style={styles.text}>Subscribed Item{JSON.stringify(currentSubscriptionId)}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.btnContainer}>
        <TouchableOpacity
          style={[
            styles.btnBox,
            (isPaused || isCanceled) && styles.disabledBox, // Apply disabledBox style conditionally
          ]}
          disabled={isPaused || isCanceled}
          onPress={showModifyAlert}>
          <Text
            style={[
              styles.btnText,
              (isPaused || isCanceled) && styles.disabledBoxText,
            ]}>
            Modify
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.btnBox,
            (isPaused || isCanceled) && styles.disabledBox, // Apply disabledBox style conditionally
          ]}
          disabled={isPaused || isCanceled}
          onPress={showPauseAlert}>
          <Text
            style={[
              styles.btnText,
              (isPaused || isCanceled) && styles.disabledBoxText,
            ]}>
            Pause
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.btnBox,
            (isPaused || isCanceled) && styles.disabledBox, // Apply disabledBox style conditionally
            {
              backgroundColor:
                isPaused || isCanceled ? 'rgba(236, 236, 236, 2)' : 'white', // Set background color based on conditions
            },
          ]}
          disabled={isPaused || isCanceled}
          onPress={showCancelAlert}>
          <Text
            style={[
              styles.btnText,
              (isPaused || isCanceled) && styles.disabledBoxText,
            ]}>
            Cancel
          </Text>
        </TouchableOpacity>
      </View>
      {/*delivery Time */}
      <Text style={styles.deliveryTime}>
        Delivery Time:{' '}
        <Text style={styles.timeSlot}>
          {subscriptionData?.subscriptionTimeSlot}
        </Text>
      </Text>

      <CalendarList
        current={new Date().toISOString().split('T')[0]}
        markedDates={prepareMarkedDates()}
        markingType={'simple'}
        style={{marginTop: 20}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backImage: {
    marginLeft: 12,
  },
  textContainer: {
    marginLeft: '10%',
  },
  text: {
    color: 'black',
  },
  selectedDateText: {
    color: '#00338D',
  },
  statusContainer: {
    position: 'absolute',
    right: 10,
    top: 50,
    alignItems: 'flex-start',
  },
  statusHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  colorIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 5,
  },
  delivered: {
    backgroundColor: 'green',
  },
  notDelivered: {
    backgroundColor: '#E97451',
  },
  pending: {
    backgroundColor: '#00338D',
  },
  statusText: {
    fontSize: 14,
  },
  btnContainer: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: 30,
  },
  btnBox: {
    width: '28%',
    padding: 6,
    borderRadius: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#00338D',
    backgroundColor: 'white',
    marginTop: '7%',
  },
  disabledBox: {
    borderWidth: 1,
    borderColor: 'grey',
    backgroundColor: 'rgba(236, 236, 236, 2)',
  },
  disabledBoxText: {
    color: 'grey',
  },

  btnText: {
    fontSize: 16,
    color: '#00338D',
    fontWeight: '400',
    textAlign: 'center',
  },
  //deliveryTime
  deliveryTime: {
    marginLeft: '2%',
    color: 'black',
    fontWeight: 'bold', // Make "Delivery Time" bold
  },
  timeSlot: {
    color: 'black',
  }, // Optional: Keep subscription time slot text styling separate
});

export default SubscribedProductDetail;
