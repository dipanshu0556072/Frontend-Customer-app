import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  Alert,
  Dimensions,
  TextInput,
  ScrollView,
  Modal,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import TopBar from '../PlpScreen/TopBar.jsx';
import back from '../PlpScreen/images/back.png';
import {useCartContext} from '../Context/WomenContext.jsx';
import {useLoginContext} from '../Login/LoginCartProvider.jsx';
import {useGroceryContext} from '../Grocery/GroceryContext';
import CheckBox from '@react-native-community/checkbox';
import CalendarPicker from 'react-native-calendar-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import {RadioButton} from 'react-native-paper';
import dropDownArrow from '../PlpScreen/images/downarrow.png';
import ModalForSubscription from '../Components/ModalForAlternativeTypeSubscription.jsx';
import ModalForWeeklyTypeSubscription from '../Components/ModalForWeeklyTypeSubscription.jsx';
import AddressModal2ForSubscription from '../Components/AddressModal2ForSubscription.jsx';
import {CalendarList} from 'react-native-calendars';
import axios from 'axios';

const ScheduleSubscription = ({navigation}) => {
  const {ip, token, popFromStack, loginUserId} = useLoginContext();
  const {
    scheduleSubscriptionOption,
    setScheduleSubscriptionOption,
    setShowActivityIndicator,
    currentProductIdOnPDP,
    LeaveMessage,
    setLeaveMessage,
    date,
    setDate,
    endDate,
    setEndDate,
    walletBalance,
    setWalletBalance,
    totalDaysOfSubscription,
    setTotalDaysOfSubscription,
    targetDaysOfSubscription,
  } = useCartContext();
  const {
    setAddressList,
    selectedAddress,
    setSelectedAddress,
    isSubscriptionModifyRequest,
    setIsSubcriptionModifyRequest,
    selectQuantity,
    setSelectQuantity,
    currentSubscriptionId,
    subsribedSelectedDatesCount,
  } = useGroceryContext();
  const [product, setProduct] = useState(null);

  const [isChecked, setIsChecked] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [timeSlot, setTimeSlot] = useState(null);
  const [showPicker, setShowPicker] = useState(false);
  const [showWeeklyModal, setShowWeeklyModal] = useState(false);
  const [showAlternativeModal, setShowAlternativeModal] = useState(false);
  const [showAddressModal2, setShowAddressModal2] = useState(false);
  const [markedSubscriptionDates, setMarkedSubscriptionDates] = useState([]);
  const [selectedDates, setSelectedDates] = useState([]);

  // Function to handle modifying the subscription
  const modifySubscription = async () => {
    let data ={};
    if(selectedDates.length>0){
      data={
        subscriptionTimeSlot: timeSlot,
        targetDay:selectedDates
      };
    }else{
      data={
        subscriptionTimeSlot: timeSlot,
      };
    }
    

    try {
      await axios.post(
        `http://${ip}:5454/subscription/modifySubscription/userId=${loginUserId}/subscriptionId=${currentSubscriptionId}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setTimeout(() => {
        Alert.alert(
          'Subscription Modified',
          'Your subscription has been modified successfully!',
          [{text: 'Ok', onPress: () => console.log('Subscription resumed')}],
        );
        navigation.navigate('mainHome');
      }, 800);
    } catch (error) {
      console.error('Error Resuming subscription:', error);
    }
    console.log('Subscription modified');
  };
  //proceed to create subscription from backend API
  const proceedForSubscriptionAPI = async () => {
    let data = {};
    if (scheduleSubscriptionOption == '0') {
      data = {
        productId: product?.id,
        quantity: selectQuantity,
        subscriptionType: 'Daily',
        subscriptionStartTime: formatDate(date),
        subscriptionEndTime: formatDate(endDate),
        subscriptionTimeSlot: timeSlot,
        instructions: LeaveMessage,
        addressId: selectedAddress,
        subscriptionPaused: false,
        subscriptionModify: false,
      };
    } else if (scheduleSubscriptionOption == '1') {
      data = {
        productId: product?.id,
        quantity: selectQuantity,
        subscriptionType: 'Weekly',
        subscriptionStartTime: formatDate(date),
        subscriptionEndTime: formatDate(endDate),
        subscriptionTimeSlot: timeSlot,
        instructions: LeaveMessage,
        addressId: selectedAddress,
        subscriptionPaused: false,
        subscriptionModify: false,
        targetDay: targetDaysOfSubscription,
      };
    } else if (scheduleSubscriptionOption == '2') {
      data = {
        productId: product?.id,
        quantity: selectQuantity,
        subscriptionType: 'Alternative',
        subscriptionStartTime: formatDate(date),
        subscriptionEndTime: formatDate(endDate),
        subscriptionTimeSlot: timeSlot,
        instructions: LeaveMessage,
        addressId: selectedAddress,
        subscriptionPaused: false,
        subscriptionModify: false,
        targetDay: targetDaysOfSubscription,
      };
    } else if (scheduleSubscriptionOption == '3') {
      data = {
        productId: product?.id,
        quantity: selectQuantity,
        subscriptionType: 'custom',
        subscriptionStartTime: formatDate(date),
        subscriptionEndTime: formatDate(endDate),
        subscriptionTimeSlot: timeSlot,
        instructions: LeaveMessage,
        addressId: selectedAddress,
        subscriptionPaused: false,
        subscriptionModify: false,
        targetDay: selectedDates,
      };
    } else if (scheduleSubscriptionOption == '4') {
      data = {
        productId: product?.id,
        quantity: selectQuantity,
        subscriptionType: 'monthly',
        subscriptionStartTime: formatDate(date),
        subscriptionEndTime: formatDate(endDate),
        subscriptionTimeSlot: timeSlot,
        instructions: LeaveMessage,
        addressId: selectedAddress,
        subscriptionPaused: false,
        subscriptionModify: false,
        targetDay: selectedDates,
      };
    }

    try {
      await axios.post(
        `http://${ip}:5454/subscription/subscribed/userId=${loginUserId}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      navigation.navigate('subscribedProductSuccess');
      console.log('subscriptiop created succesfully!');
    } catch (error) {
      console.error('Error Posting AddMoney data:', error);
    }
  };

  //fetch addressList
  const fetchData = async () => {
    const header = {
      Authorization: `Bearer ${token}`,
    };

    try {
      const response = await axios.get(`http://${ip}:5454/api/users/profile`, {
        headers: header,
      });
      if (
        response.data &&
        response.data.wallet &&
        response.data.wallet.balance
      ) {
        setWalletBalance(response.data.wallet.balance);
      }
      setAddressList(response.data.addresses);
    } catch (error) {
      console.log('Error fetching profile:', error);
      // Handle the error as needed
    }
  };

  // Fetch product data based on productId
  async function fetchProduct() {
    const header = {
      Authorization: `Bearer ${token}`,
    };
    try {
      const response = await axios.get(
        `http://${ip}:5454/api/products/id/${currentProductIdOnPDP}`,
        {headers: header},
      );
      setProduct(response.data);
      setShowActivityIndicator(false);
    } catch (error) {
      console.log('Error fetching product:', error);
      setShowActivityIndicator(false);
    }
  }
  //onPress schedule subscription btn
  const onPressScheuleSubscriptionType = val => {
    if (val == '1') {
      onPressOfWeeklyCheckBox();
      if (date != null) {
        setScheduleSubscriptionOption(val);
      }
    } else {
      if (val == '2') {
        onPressOfAlternativeCheckBox();
      }
      if ((val == '3' || val == '4') && date == null) {
        Alert.alert(
          'Kindly select subscription start date to continue with custom subscription!',
        );
        return;
      }
      setScheduleSubscriptionOption(val);
    }
  };

  //show subscriptionType btn
  const SubscriptionBtn = ({
    val,
    title,
    selectedOption,
    onPressOption,
    isDisabled,
  }) => (
    <TouchableOpacity
      onPress={() => !isDisabled && onPressOption(val)} // Disable onPress when isDisabled is true
      style={[
        styles.subscriptionBtnContainer,
        isDisabled && styles.disabledBtn,
      ]}>
      <RadioButton
        value={val}
        status={selectedOption === val ? 'checked' : 'unchecked'}
        onPress={() => !isDisabled && onPressOption(val)} // Disable RadioButton onPress
        color={isDisabled ? 'grey' : 'black'} // Set the color to grey when disabled
      />
      <Text style={styles.subscriptionBtnText}>{title}</Text>
    </TouchableOpacity>
  );

  {
    /* Handler for date change*************************/
  }
  const onDateChange = (event, selectedDate) => {
    if (!isSubscriptionModifyRequest) {
      if (selectedDate) {
        setDate(selectedDate); // Set the selected start date
        // Calculate the end date (30 days ahead)
        const calculatedEndDate = new Date(selectedDate);
        calculatedEndDate.setDate(calculatedEndDate.getDate() + 30);
        setEndDate(calculatedEndDate);
      }
      setShowDatePicker(false);
    }
  };

  // Format date to 'DD/MM/YY' format
  const formatDate = date => {
    if (!isSubscriptionModifyRequest && date) {
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear().toString().slice(-2);
      return `${day}/${month}/${year}`;
    }
    return ''; // Return empty if date is not selected or subscription modification request is true
  };

  {
    /**************pick time slot***********/
  }
  const onChange = (event, selectedTime) => {
    setShowPicker(false);
    if (selectedTime) {
      const startTime = selectedTime;
      const endTime = new Date(startTime.getTime() + 60 * 60 * 1000);

      // Format time to "HH:MM AM/PM"
      const formatTime = date =>
        date.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        });

      const timeSlot = `${formatTime(startTime)} - ${formatTime(endTime)}`;
      setTimeSlot(timeSlot); // Update state with the time slot
    }
  };

  const showTimePicker = () => {
    setShowPicker(true);
  };

  // onPress handler for showing the date picker
  const onPressOfSubscriptionDate = () => {
    setShowDatePicker(true); // Show date picker
  };

  //quantity button
  const increaseProductQuantity = () => {
    setSelectQuantity(prevQuantity => {
      if (prevQuantity >= 10) {
        Alert.alert(
          'Maximum Quantity Reached',
          'You can subscribe to a maximum of 10 quantities.',
        );
        return prevQuantity; // Do not increase beyond 10
      }
      return prevQuantity + 1;
    });
  };
  const decreaseProductQuantity = () =>
    setSelectQuantity(prevQuantity => Math.max(1, prevQuantity - 1));

  ////////////////weekly subscription operation start here//////////////////////////////////////
  const onPressOfWeeklyCheckBox = () => {
    if (date == null) {
      Alert.alert(
        'Kindly select subscription start date to proceed with the weekly subscription!',
      );
    } else {
      handleAlternativeModalClose();
      console.log('Weekly checkbox function called');
      setShowWeeklyModal(true);
    }
  };

  const handleWeeklyModalClose = () => {
    console.log('Modal close triggered');
    setShowWeeklyModal(false);
  };
  ////////////////alternative subscription operation start here//////////////////////////////////////
  const onPressOfAlternativeCheckBox = () => {
    handleWeeklyModalClose();
    console.log('Weekly checkbox function called');
    setShowAlternativeModal(true);
  };

  const handleAlternativeModalClose = () => {
    console.log('Modal close triggered');
    setShowAlternativeModal(false);
  };

  ////////////////AddressModal operation start here//////////////////////////////////////
  const onPressOfAdressModal2CheckBox = () => {
    // Close other modals before opening this one
    handleWeeklyModalClose();
    handleAlternativeModalClose();

    // Now open AddressModal2
    setShowAddressModal2(true);
  };

  ///////////////Custom subscription operation start here //////////////////

  // Function to handle date selection and deselection
  const handleDateChange = date => {
    const dateString = date.dateString;

    if (
      isSubscriptionModifyRequest &&
      scheduleSubscriptionOption === '3' &&
      selectedDates.length == subsribedSelectedDatesCount
    ) {
      Alert.alert(
        'Oops! Limit Exhausted', // Title of the alert
        'You reached the max limit !', // Message of the alert
        [{ text: 'OK' }] // Button to close the alert
      );
    } else {
      if (
        scheduleSubscriptionOption === '4' &&
        !selectedDates.includes(dateString) &&
        selectedDates.length >= 1
      ) {
        // Show an alert if the limit is reached for option 4
        Alert.alert(
          'Oops! Limit Exhausted',
          'You can choose only one date in the monthly subscription.',
          [{text: 'OK'}],
        );
      } else {
        if (selectedDates.includes(dateString)) {
          // Deselect the date
          setSelectedDates(selectedDates.filter(item => item !== dateString));
        } else {
          // Add the new selected date
          setSelectedDates([...selectedDates, dateString]);
        }
      }
    }
  };

  // Mark selected dates with color
  const markedDates = selectedDates.reduce((acc, curr) => {
    acc[curr] = {selected: true, selectedColor: '#00338d'}; // Mark selected dates
    return acc;
  }, {});

  ///////////////

  const handleAddressModal2Close = () => {
    console.log('Modal close triggered');
    setShowAddressModal2(false);
  };
  //////////////////////////onPress of back button///////////////////////////
  const onPressOfBackButton = () => {
    popFromStack(navigation);
    setScheduleSubscriptionOption('0');
    setTimeSlot(null);
    setDate(null);
    setEndDate(null);
    setSelectedAddress(null);
    setIsSubcriptionModifyRequest(false);
    setSelectQuantity(1);
  };
  //////////////////////////onPress of proceed button///////////////////////////
  const onPressOfProceedButton = () => {
    if (isSubscriptionModifyRequest) {
      if (timeSlot == null) {
        Alert.alert('Kindly select a time slot for the subscription.');
      } else {
        Alert.alert(
          'Confirm Subscription Modification', // Title of the alert
          'Are you sure you want to proceed with modifying your subscription?', // Message
          [
            {
              text: 'No', // Option to decline
              onPress: () => console.log('Modification cancelled'), // Optional: Log or handle action for "No"
              style: 'cancel', // Style for "No" option
            },
            {
              text: 'Yes', // Option to proceed
              onPress: () => modifySubscription(), // Proceed with modifying the subscription
            },
          ]
        );
      }
    } else {
      if (date == null || timeSlot == null || selectedAddress == null) {
        if (date == null) {
          Alert.alert('Kindly select subscription start date.');
        } else if (timeSlot == null) {
          Alert.alert('Kindly select a time slot for the subscription.');
        } else if (selectedAddress == null) {
          onPressOfAdressModal2CheckBox();
        }
      } else {
        //calculate total amount to freeze
        let totalAmountToFreeze = 0;
        let totalDays = 0;
        let productAmount = product?.discountedPrice;
        let totalSelectedQuantity = selectQuantity;
        if (scheduleSubscriptionOption == '0') {
          totalDays = 30;
          totalAmountToFreeze =
            parseInt(productAmount) *
            parseInt(totalSelectedQuantity) *
            totalDays;
        } else if (scheduleSubscriptionOption == '1') {
          totalDays = totalDaysOfSubscription;
          totalAmountToFreeze =
            parseInt(productAmount) *
            parseInt(totalSelectedQuantity) *
            totalDays;
        } else if (scheduleSubscriptionOption == '2') {
          totalDays = 15;
          totalAmountToFreeze =
            parseInt(productAmount) *
            parseInt(totalSelectedQuantity) *
            totalDays;
        } else if (scheduleSubscriptionOption == '3') {
          totalDays = selectedDates.length;
          totalAmountToFreeze =
            parseInt(productAmount) *
            parseInt(totalSelectedQuantity) *
            totalDays;
        } else if (scheduleSubscriptionOption == '4') {
          totalDays = selectedDates.length;
          totalAmountToFreeze =
            parseInt(productAmount) *
            parseInt(totalSelectedQuantity) *
            totalDays;
        }
        if (walletBalance >= totalAmountToFreeze) {
          // Proceed with the action, as the wallet balance is sufficient
          Alert.alert(
            'Confirmation',
            `\nWould you like to proceed with the subscription, wherein ₹${totalAmountToFreeze} will be frozen in your wallet?`,
            [
              {
                text: 'No',
                onPress: () => console.log('User chose No'),
                style: 'cancel',
              },
              {
                text: 'Proceed',
                onPress: () => {
                  proceedForSubscriptionAPI();
                },
              },
            ],
          );
        } else {
          // Show the alert with the required balance and current wallet balance
          Alert.alert(
            'Insufficient Wallet Balance',
            `Your wallet balance is insufficient.\nRequired Balance: ${totalAmountToFreeze}\nYour Balance: ${walletBalance}\nWould you like to add funds?`,
            [
              {
                text: 'Yes',
                onPress: handleYesPress, // Call handleYesPress when Yes is clicked
              },
              {
                text: 'No',
                style: 'cancel', // Optional: Style for the 'No' button
              },
            ],
          );
        }
      }
    }
  };

  // Function to convert dd/MM/yy to YYYY-MM-dd
  const convertDateFormat = date => {
    const [day, month, year] = date.split('/'); // Split by '/' to extract day, month, year
    const fullYear = '20' + year; // Assuming the year is in the 2000s
    return `${fullYear}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`; // Return in YYYY-MM-dd format
  };

  // Get the full width of the screen
  const {width: screenWidth} = Dimensions.get('window');

  useEffect(() => {
    fetchProduct();
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      {/*show TopBar*/}
      <View style={styles.rowContainer}>
        <TopBar
          navigation={navigation}
          showKPMGLogo={true}
          showCartLogo={false}
          showWishListLogo={false}
          showSearchLogo={false}
        />
        <View style={styles.walletBalanceContainer}>
          <Text style={[styles.walletBalanceText, {fontWeight: '500'}]}>
            Wallet Balance
          </Text>
          <Text style={styles.walletBalanceText}>₹{walletBalance}</Text>
        </View>
      </View>
      <View style={styles.row}>
        <TouchableOpacity
          onPress={() => {
            onPressOfBackButton();
          }}>
          <View style={styles.row}>
            <View>
              <Image source={back} style={styles.backImage} />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.text}>
                Schedule Subscription{JSON.stringify(selectedDates)}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/*show to be subscribed product detail */}
        {product && (
          <View style={styles.productContainer}>
            {/* Images */}
            <View style={styles.imageContainer}>
              <Image
                source={{uri: product.imageUrl[0]}}
                style={{width: 100, height: 120}}
              />
            </View>
            {/*product details*/}
            <View style={styles.productDetails}>
              <View>
                <Text style={styles.productBrand}>{product.brand}</Text>
                <Text style={styles.productTitle}>{product.title}</Text>
                <View>
                  <Text style={styles.productPrice}>
                    ₹{product.discountedPrice}/
                    <Text style={{textDecorationLine: 'line-through'}}>
                      ₹{product.price}
                    </Text>
                  </Text>
                </View>
                <Text style={styles.productQuantity}>
                  Qty. {selectQuantity}
                </Text>
              </View>
              {/*quanity button */}
              <View style={styles.quantitySelectorContainer}>
                <TouchableOpacity
                  onPress={decreaseProductQuantity}
                  style={
                    isSubscriptionModifyRequest
                      ? styles.disableQuantityButton
                      : styles.quantityButton
                  }
                  disabled={isSubscriptionModifyRequest}>
                  <Text style={styles.quantityButtonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.productQuantityText}>{selectQuantity}</Text>
                <TouchableOpacity
                  onPress={increaseProductQuantity}
                  style={
                    isSubscriptionModifyRequest
                      ? styles.disableQuantityButton
                      : styles.quantityButton
                  }
                  disabled={isSubscriptionModifyRequest}>
                  <Text style={styles.quantityButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}

        {/*show the subscription Type btn */}
        <Text style={styles.mainHeading}>Subscription Type</Text>
        <View style={styles.showSubscriptionTypeBtn}>
          <SubscriptionBtn
            val="0"
            title="Daily"
            selectedOption={scheduleSubscriptionOption}
            onPressOption={onPressScheuleSubscriptionType}
            isDisabled={isSubscriptionModifyRequest} // Pass the isSubscriptionModifyRequest state
          />
          <TouchableOpacity
            onPress={() => {
              if (!isSubscriptionModifyRequest) {
                onPressOfWeeklyCheckBox();
              }
            }}
            disabled={isSubscriptionModifyRequest} // Disable TouchableOpacity when isSubscriptionModifyRequest is true
          >
            <SubscriptionBtn
              val="1"
              title="Weekly"
              selectedOption={scheduleSubscriptionOption}
              onPressOption={onPressScheuleSubscriptionType}
              isDisabled={isSubscriptionModifyRequest} // Pass the isSubscriptionModifyRequest state
            />
          </TouchableOpacity>
          {/* Modal for weekly operation */}
          <ModalForWeeklyTypeSubscription
            visible={showWeeklyModal}
            onClose={handleWeeklyModalClose}
          />

          <TouchableOpacity
            onPress={() => {
              if (!isSubscriptionModifyRequest) {
                onPressOfAlternativeCheckBox();
              }
            }}
            disabled={isSubscriptionModifyRequest} // Disable TouchableOpacity when isSubscriptionModifyRequest is true
          >
            <SubscriptionBtn
              val="2"
              title="Alternative"
              selectedOption={scheduleSubscriptionOption}
              onPressOption={onPressScheuleSubscriptionType}
              isDisabled={isSubscriptionModifyRequest} // Pass the isSubscriptionModifyRequest state
            />
          </TouchableOpacity>
          <ModalForSubscription
            visible={showAlternativeModal}
            onClose={handleAlternativeModalClose}
          />
        </View>
        <View style={[styles.showSubscriptionTypeBtn2]}>
          <SubscriptionBtn
            val="3"
            title="Custom"
            selectedOption={scheduleSubscriptionOption}
            onPressOption={onPressScheuleSubscriptionType}
            isDisabled={isSubscriptionModifyRequest} // Pass the isSubscriptionModifyRequest state
          />
          <SubscriptionBtn
            val="4"
            title="Monthly"
            selectedOption={scheduleSubscriptionOption}
            onPressOption={onPressScheuleSubscriptionType}
            isDisabled={isSubscriptionModifyRequest} // Pass the isSubscriptionModifyRequest state
          />
        </View>

        {/**show calendar-chart */}
        {(scheduleSubscriptionOption === '3' ||
          scheduleSubscriptionOption === '4') && (
          <CalendarList
            current={new Date().toISOString().split('T')[0]} // Set the current date
            markingType="simple"
            horizontal={true}
            pagingEnabled={true}
            style={{marginTop: 20, width: screenWidth}}
            calendarWidth={screenWidth}
            // Conditionally set the minDate and maxDate
            minDate={
              isSubscriptionModifyRequest
                ? convertDateFormat('30/01/25')
                : convertDateFormat(formatDate(date))
            } // Convert and set the minimum date
            maxDate={
              isSubscriptionModifyRequest
                ? convertDateFormat('01/03/25')
                : convertDateFormat(formatDate(endDate))
            } // Convert and set the maximum date
            markedDates={{...markedDates}}
            onDayPress={handleDateChange}
          />
        )}

        {/*subscription  Time */}
        <Text style={styles.mainHeading}>Subscription Delivery</Text>
        <Text style={styles.subHeading}>Subscription Start Date</Text>
        <TouchableOpacity
          style={[
            styles.touchableContainer,
            isSubscriptionModifyRequest && styles.disabledTouchable, // Add disabled style conditionally
          ]}
          onPress={
            isSubscriptionModifyRequest ? null : onPressOfSubscriptionDate
          } // Disable onPress if isSubscriptionModifyRequest is true
          disabled={isSubscriptionModifyRequest} // Disable the TouchableOpacity
        >
          <Text
            style={[
              styles.selectDateText,
              date ? styles.selectedDateText : styles.defaultDateText,
              isSubscriptionModifyRequest && styles.disableText, // Add disabled text style
            ]}>
            {isSubscriptionModifyRequest
              ? date
              : date
              ? formatDate(date)
              : 'Select date'}
          </Text>
          <View style={{flex: 1}} />
          <View>
            <Image source={dropDownArrow} style={styles.image} />
          </View>
        </TouchableOpacity>

        {/* Show DateTimePicker */}
        {/* {showDatePicker && (
          <DateTimePicker
            value={date || new Date()}
            mode="date"
            display="default"
            onChange={onDateChange}
            minimumDate={new Date()}
          />
        )} */}
        {!isSubscriptionModifyRequest && showDatePicker && (
          <DateTimePicker
            value={date || new Date()}
            mode="date"
            display="default"
            onChange={onDateChange}
            minimumDate={new Date(Date.now() + 24 * 60 * 60 * 1000)} // Set minimum date to tomorrow
          />
        )}

        {/* End Date Display */}
        {endDate && (
          <>
            {/* Display heading only if end date exists */}
            <Text style={styles.subHeading}>Subscription End Date</Text>
            <View
              style={[
                styles.touchableContainer,
                isSubscriptionModifyRequest && styles.disabledTouchable, // Add disabled style conditionally
              ]}
              disabled={isSubscriptionModifyRequest} // Disable the TouchableOpacity
            >
              <Text
                style={[
                  styles.selectDateText,
                  endDate ? styles.selectedDateText : styles.defaultDateText,
                  isSubscriptionModifyRequest && styles.disableText, // Add disabled text style
                ]}>
                {isSubscriptionModifyRequest
                  ? endDate
                  : `${formatDate(endDate)}`}{' '}
                {/* Display the formatted end date */}
              </Text>
              <View style={{flex: 1}} />
              <View>
                <Image source={dropDownArrow} style={styles.image} />
              </View>
            </View>
          </>
        )}

        {/*Choose a time Slot*/}
        <Text style={[styles.subHeading]}>Choose a Time Slot</Text>
        <TouchableOpacity
          style={[styles.touchableContainer]}
          onPress={showTimePicker}>
          <Text style={[styles.selectDateText, timeSlot && {color: '#00338D'}]}>
            {timeSlot ? timeSlot : 'Select Time'}
          </Text>
          <View style={{flex: 1}} />
          <View>
            <Image source={dropDownArrow} style={styles.image} />
          </View>
        </TouchableOpacity>

        {showPicker && (
          <DateTimePicker
            value={new Date()} // Use current time as a fallback for the picker
            mode="time"
            display="default"
            onChange={onChange}
          />
        )}
        <Text style={styles.subHeading1}>Share Your Instruction Here</Text>
        <View style={styles.LeaveMessage}>
          <TextInput
            value={LeaveMessage}
            onChangeText={text => setLeaveMessage(text)}
            placeholder="Type your message here..."
            placeholderTextColor="grey"
            multiline
          />
        </View>
        {/*select terms and condition term box */}
        <View style={styles.checkboxContainer}>
          <CheckBox
            disabled={false}
            value={isChecked}
            onValueChange={newValue => setIsChecked(newValue)}
          />
          <Text style={styles.termsText}>
            By clicking below, you agree to our{' '}
            <Text style={styles.linkText}>
              Terms of services & Privacy Policy
            </Text>
          </Text>
        </View>
        {/*show to proceed btn*/}
        <TouchableOpacity
          style={styles.proceedBtn}
          onPress={() => {
            onPressOfProceedButton();
          }}>
          <Text style={styles.proceedBtnText}>PROCEED</Text>
        </TouchableOpacity>

        {/*show addressModal */}
        <AddressModal2ForSubscription
          visible={showAddressModal2}
          onClose={handleAddressModal2Close}
        />
      </ScrollView>
    </View>
  );
};

export default ScheduleSubscription;

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  walletBalanceContainer: {
    marginLeft: '35%',
    color: 'black',
  },
  walletBalanceText: {
    color: 'black',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    padding: 12,
  },
  //back button
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
    color: '#00338D', // Color for selected date
  },
  //product detail
  imageContainer: {
    backgroundColor: 'white',
    height: 134,
    width: '32%',
    padding: 8,
  },
  productDetails: {
    backgroundColor: 'white',
    height: 134,
    padding: 8,
    width: '68%',
    flexDirection: 'row',
  },
  productBrand: {
    fontWeight: '400',
    color: 'grey',
    fontSize: 11,
    marginTop: '2%',
    margin: '0.5%',
    marginTop: '8%',
  },
  productQuantity: {
    fontSize: 12,
    margin: '0.5%',
  },
  productTitle: {
    color: 'black',
    fontWeight: '500',
    fontSize: 13,
    margin: '0.5%',
  },
  productPrice: {
    fontSize: 13,
    margin: '0.5%',
    color: 'black',
  },
  //set product quantity button
  quantitySelectorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    marginLeft: '20%',
  },
  quantityButton: {
    backgroundColor: '#00338D',
    padding: 10,
    borderRadius: 5,
    height: 40,
  },
  disableQuantityButton: {
    backgroundColor: 'grey',
    padding: 10,
    borderRadius: 5,
    height: 40,
  },
  quantityButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  productQuantityText: {
    color: '#00338D',
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 20,
    paddingVertical: 5,
  },
  //
  mainHeading: {
    marginLeft: '5%',
    marginTop: '7%',
    fontWeight: '600',
    fontSize: 16,
    color: '#00338D',
  },
  subHeading: {
    marginLeft: '6%',
    fontWeight: '400',
    fontSize: 13,
    color: '#00338D',
    marginTop: '2%',
  },
  subHeading1: {
    marginLeft: '6%',
    fontWeight: '400',
    fontSize: 13,
    color: '#00338D',
    marginTop: '6%',
  },

  //leave message
  LeaveMessage: {
    borderWidth: 1,
    borderRadius: 12,
    padding: '1%',
    height: 120,
    margin: 10,
    borderColor: '#D3D3D3',
  },
  showSubscriptionTypeBtn: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-between',
    marginTop: '3%',
    alignSelf: 'center',
  },
  showSubscriptionTypeBtn2: {
    flexDirection: 'row',
    width: '52%',
    justifyContent: 'space-between',
    marginTop: '2%',
    marginLeft: '4.9%',
  },
  subscriptionBtnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  touchableContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'grey',
    margin: '2%',
    borderRadius: 10,
    height: 40,
    alignItems: 'center',
  },
  selectDateText: {marginLeft: '3%'},
  image: {
    height: 17,
    width: 12,
    marginRight: 10,
  },
  //product container
  productContainer: {
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.08)',
    height: 150,
    flexDirection: 'row',
    padding: '2%',
  },

  //checkbox
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '6%',
  },
  termsText: {
    fontSize: 14,
    color: 'black', // Adjust as per your design
    marginLeft: 8, // Space between the checkbox and text
  },
  linkText: {
    color: '#00338D',
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
  //proceed btn
  proceedBtn: {
    width: 370,
    height: 40,
    backgroundColor: '#00338D',
    alignSelf: 'center',
    borderRadius: 12,
    marginTop: '4%',
    justifyContent: 'center',
  },
  proceedBtnText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 15,
  },
  //disable on modify
  disabledTouchable: {
    borderWidth: 1,
    borderColor: 'grey',
    backgroundColor: 'rgba(236,236,236,0.3)',
  },
  disableText: {
    color: 'grey',
  },
});
