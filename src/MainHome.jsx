import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Modal,
  Dimensions,
} from 'react-native';
import back from './PlpScreen/images/back.png';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import home1 from './PlpScreen/images/home1.png';
import categories1 from './PlpScreen/images/category1.png';
import bell1 from './PlpScreen/images/bell1.png';
import user1 from './PlpScreen/images/user1.png';
import {useCartContext} from './Context/WomenContext';
import Home1 from './Fashion';
import HomeBar from './HomeBar';
import ProfileBar from './ProfileBar';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import user from './PlpScreen/images/user3.png';
import shop from './PlpScreen/images/shop1.png';
import refer from './PlpScreen/images/refer1.png';
import offer from './PlpScreen/images/offer1.png';
import discount from './PlpScreen/images/discount1.png';
import coupon from './PlpScreen/images/coupon1.png';
import play from './PlpScreen/images/play1.png';
import next from './PlpScreen/images/next.png';
import correct from './PlpScreen/images/correct.png';
import {useLoginContext} from './Login/LoginCartProvider';

const Tab1 = createMaterialTopTabNavigator();

const Tab = createBottomTabNavigator();

function NotificationBar({navigation}) {
  const {popFromStack} = useLoginContext();

  function forNavigate(page) {
    pushToStack(page);
    navigation.navigate(page);
  }
  function AllNotification() {
    return (
      <>
        <View style={styles.mainContainer}>
          <View style={styles.row1}>
            <View style={styles.topRow}>
              <View style={styles.topColumn}>
                <View style={styles.iconWrapper}>
                  <Image source={play} style={styles.iconImage} />
                </View>
                <View style={styles.textWrapper}>
                  <Text style={styles.primaryText}>
                    Play & Earn Rewards.
                    <Text style={styles.linkText}> Play now</Text>
                  </Text>
                  <Text style={styles.timestamp}>12hr ago</Text>
                </View>
                <Image source={next} style={styles.nextIcon} />
              </View>
            </View>

            <View style={styles.notificationBox}>
              <View style={styles.notificationContent}>
                <View style={styles.iconWrapper}>
                  <Image source={offer} style={styles.iconImage} />
                </View>
                <View style={styles.textWrapper}>
                  <Text style={styles.primaryText}>
                    25% discount on Women Kurta's.
                    <Text style={styles.linkText}> Shop now</Text>
                  </Text>
                  <Text style={styles.timestamp}>15hr ago</Text>
                </View>
                <Image source={next} style={styles.nextIcon} />
              </View>
            </View>

            <View style={styles.notificationBoxAlternate}>
              <View style={styles.notificationContent}>
                <View style={styles.iconWrapper}>
                  <Image source={coupon} style={styles.iconImage} />
                </View>
                <View style={styles.textWrapper}>
                  <Text style={styles.primaryText}>
                    Slash and Save more this April.
                    <Text style={styles.linkText}> Know more</Text>
                  </Text>
                  <Text style={styles.timestamp}>2 days ago</Text>
                </View>
                <Image source={next} style={styles.nextIcon} />
              </View>
            </View>

            <View style={styles.notificationBox}>
              <View style={styles.notificationContent}>
                <View style={styles.iconWrapper}>
                  <Image source={shop} style={styles.iconImage} />
                </View>
                <View style={styles.textWrapper}>
                  <Text style={styles.primaryText}>
                    Order Delivered Successfully.
                    <Text style={styles.linkText}> Know more</Text>
                  </Text>
                  <Text style={styles.timestamp}>2 weeks ago</Text>
                </View>
                <Image source={next} style={styles.nextIcon} />
              </View>
            </View>

            <View style={styles.notificationBoxAlternate}>
              <View style={styles.notificationContent}>
                <View style={styles.iconWrapper}>
                  <Image source={correct} style={styles.iconImage} />
                </View>
                <View style={styles.textWrapper}>
                  <Text style={styles.primaryText}>
                    Order Placed Successfully.
                    <Text style={styles.linkText}> View more</Text>
                  </Text>
                  <Text style={styles.timestamp}>3 weeks ago</Text>
                </View>
                <Image source={next} style={styles.nextIcon} />
              </View>
            </View>

            <View style={styles.notificationBox}>
              <View style={styles.notificationContent}>
                <View style={styles.iconWrapper}>
                  <Image source={user} style={styles.iconImage} />
                </View>
                <View style={styles.textWrapper}>
                  <Text style={styles.primaryText}>
                    Update your profile.
                    <Text style={styles.linkText}> View</Text>
                  </Text>
                  <Text style={styles.timestamp}>5 weeks ago</Text>
                </View>
                <Image source={next} style={styles.nextIcon} />
              </View>
            </View>

            <View style={styles.notificationBoxAlternate}>
              <View style={styles.notificationContent}>
                <View style={styles.iconWrapper}>
                  <Image source={refer} style={styles.iconImage} />
                </View>
                <View style={styles.textWrapper}>
                  <Text style={styles.primaryText}>
                    Refer & Earn Reward coins.
                    <Text style={styles.linkText}> Refer now</Text>
                  </Text>
                  <Text style={styles.timestamp}>10 weeks ago</Text>
                </View>
                <Image source={next} style={styles.nextIcon} />
              </View>
            </View>

            <View style={styles.notificationBox}>
              <View style={styles.notificationContent}>
                <View style={styles.iconWrapper}>
                  <Image source={discount} style={styles.iconImage} />
                </View>
                <View style={styles.textWrapper}>
                  <Text style={styles.primaryText}>
                    Republic Day Sale is Live.
                    <Text style={styles.linkText}> Shop now.</Text>
                  </Text>
                  <Text style={styles.timestamp}>46 weeks ago</Text>
                </View>
                <Image source={next} style={styles.nextIcon} />
              </View>
            </View>
          </View>
        </View>
      </>
    );
  }
  function AllOrders() {
    return (
      <>
       <View style={styles.mainContainer}>
      <View style={styles.notificationBox}>
        <View style={styles.notificationContent}>
          <View style={styles.iconWrapper}>
            <Image source={discount} style={styles.iconImage} />
          </View>
          <View style={styles.textWrapper}>
            <Text style={styles.primaryText}>
              Republic Day Sale is Live.
              <Text style={styles.linkText}> Shop now.</Text>
            </Text>
            <Text style={styles.timestamp}>46 weeks ago</Text>
          </View>
          <Image source={next} style={styles.nextIcon} />
        </View>
      </View>
    </View>
      </>
    );
  }
  function AllOffers() {
    return (
      <>
        <View style={styles.mainContainer}>
        <View style={styles.notificationBox}>
        <View style={styles.notificationContent}>
          <View style={styles.iconWrapper}>
            <Image source={offer} style={styles.iconImage} />
          </View>
          <View style={styles.textWrapper}>
            <Text style={styles.primaryText}>
              25% discount on Women Kurta's.
              <Text style={styles.linkText}> Shop now</Text>
            </Text>
            <Text style={styles.timestamp}>15hr ago</Text>
          </View>
          <Image source={next} style={styles.nextIcon} />
        </View>
      </View>
        </View>
      </>
    );
  }
  return (
    <>
        <View style={styles.mainContainer}>
      <View style={styles.headerWrapper}>
        <TouchableOpacity onPress={() => forNavigate('mainHome')}>
          <Image
            source={{ uri: 'https://shorturl.at/ckGU2' }}
            style={styles.headerImage}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.notificationsWrapper}>
        <TouchableOpacity onPress={() => popFromStack(navigation)}>
          <View style={styles.notificationsContent}>
            {/* <Image source={back} style={styles.backIcon} /> */}
            <Text style={styles.notificationsText}>Notifications</Text>
          </View>
        </TouchableOpacity>
      </View>
      <Tab1.Navigator
        initialRouteName="AllNotification"
        screenOptions={{
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: 'grey',
          tabBarLabelStyle: styles.tabBarLabel,
          tabBarStyle: styles.tabBar,
        }}>
        <Tab1.Screen
          name="AllNotification"
          component={AllNotification}
          options={{ tabBarLabel: 'All' }}
        />
        <Tab1.Screen
          name="AllOrders"
          component={AllOrders}
          options={{ tabBarLabel: 'Orders' }}
        />
        <Tab1.Screen
          name="AllOffers"
          component={AllOffers}
          options={{ tabBarLabel: 'Offers' }}
        />
      </Tab1.Navigator>
    </View>
    </>
  );
}

function MainHome({navigation}) {

  const {userprofile} = useCartContext();
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#00338D',
        showIcon: true,
        labelStyle: styles.labelStyle,
        tabStyle: styles.tabStyle,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeBar}
        options={{
          headerShown: false,
          tabBarLabel: 'home',
          tabBarIcon: ({color}) => (
            <Image source={home1} style={[styles.icon, {tintColor: color}]} />
          ),
        }}
      />
      <Tab.Screen
        name="Home1"
        component={Home1}
        options={{
          headerShown: false,
          tabBarLabel: 'Category',
          tabBarIcon: ({color}) => (
            <Image
              source={categories1}
              style={[styles.icon, {tintColor: color}]}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Notification"
        component={NotificationBar}
        options={{
          headerShown: false,
          tabBarLabel: 'Notification',
          tabBarIcon: ({color}) => (
            <Image source={bell1} style={[styles.icon, {tintColor: color}]} />
          ),
        }}
        listeners={({navigation}) => ({
          tabPress: e => {
            // Prevent default action
            // e.preventDefault();
            // Do something with the `navigation` object
            // navigation.navigate("Elastic");
          },
        })}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileBar}
        options={{
          headerShown: false,
          tabBarLabel: userprofile?.firstName || 'Profile',
          tabBarIcon: ({color}) => (
            <Image source={user1} style={[styles.icon, {tintColor: color}]} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default MainHome;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  row1: {
    marginTop: '3%',
    width: '100%',
    height: 420,
  },
  topRow: {
    marginLeft: '2%',
  },
  topColumn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconWrapper: {
    marginLeft: '2%',
  },
  iconImage: {
    width: 24,
    height: 24,
  },
  textWrapper: {
    marginLeft: '2%',
  },
  primaryText: {
    color: 'black',
  },
  linkText: {
    textDecorationLine: 'underline',
    fontWeight: '300',
    color: '#00338D',
    fontSize: 12,
  },
  timestamp: {
    fontSize: 11.5,
    color: '#00A3A1',
    marginTop: '4%',
  },
  nextIcon: {
    width: 10,
    height: 10,
  },
  notificationBox: {
    borderColor: '#00338D',
    borderWidth: 0.5,
    backgroundColor: 'white',
    height: 70,
    marginBottom: 5,
    width: '100%',
  },
  notificationBoxAlternate: {
    borderColor: '#00338D',
    borderWidth: 0.5,
    backgroundColor: '#f5f2f2',
    height: 70,
    marginBottom: 5,
  },
  notificationContent: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: '2%',
  },
  labelStyle: {
    margin: 1,
    fontSize: 10,
    marginBottom: 4,
  },
  tabStyle: {
    height: 50,
  },
  icon: {
    width: 20,
    height: 20,
  },
  headerRowContainer: {
    marginLeft: '5%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logoImage: {
    width: 100,
    height: 100,
  },
  navActionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  navActionRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationText: {
    marginLeft: '10%',
    color: 'black',
    fontSize: 16,
    fontWeight: '400',
  },
  tabBarContainer: {
    backgroundColor: '#00338D',
    borderColor: 'grey',
    borderWidth: 0.4,
    marginTop: '4%',
    width: '93%',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    marginLeft: '3%',
    marginRight: '3%',
  },
  tabBarLabel: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  topRow1: {
    borderColor: '#00338D',
    borderWidth: 0.5,
    width: '100%',
    flexDirection: 'row',
    backgroundColor: '#f5f2f2',
    height: 70,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingRight: 16,
  },
  container: {
    marginTop: 30,
    paddingLeft: '4%',
    width: '20%',
    flexDirection: 'row',
    backgroundColor: 'red',
  },
  columnContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryItem: {
    width: '100%',
    marginBottom: 16,
    alignItems: 'center',
  },
  categoryImage: {
    width: 60,
    height: 60,
    borderRadius: 40,
  },
  categoryText: {
    color: 'black',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 8,
  },
  categoryText2: {
    color: 'black',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 8,
    fontWeight: 'bold',
  },
  verticalLine: {
    width: 1,
    backgroundColor: '#d1cfcf',
    height: '100%',
    marginLeft: '28%',
  },
  column2: {
    width: '485%',
    marginLeft: '2%',
  },
  mainRow: {},
  profileContainer: {
    padding: '9%',
    backgroundColor: '#00338D',
    marginBottom: '1%',
  },
  txt1: {
    fontSize: 18,
    color: 'white',
    padding: '0.5%',
  },
  txt2: {
    fontSize: 14,
    color: 'white',
    padding: '0.5%',
    fontWeight: '200',
  },
  txt3: {
    fontSize: 15,
    color: '#52514e',
    marginLeft: '5%',
  },
  txt4: {
    fontSize: 15,
    color: '#A4343A',
    marginLeft: '5%',
  },
  row2: {
    marginTop: '0.8%',
    justifyContent: 'space-between',
  },
  column: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderColor: '#e6e3e3',
    borderTopWidth: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '70%',
    height: '23%',
    marginTop: '10%',
    backgroundColor: 'white',
    padding: 20,
    bottom: 0,
    position: 'fixed',
    borderRadius: 10,
  },
  horizontalLine1: {
    borderBottomWidth: 0.3,
    borderBottomColor: '#d1d1d1',
    marginVertical: 8,
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
  headerWrapper: {
    marginLeft: '5%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerImage: {
    width: 100,
    height: 100,
  },
  notificationsWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationsContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationsText: {
    marginLeft: '10%',
    color: 'black',
    fontSize: 16,
    fontWeight: '400',
  },
  tabBar: {
    backgroundColor: '#00338D',
    borderColor: 'grey',
    borderWidth: 0.4,
    marginTop: '4%',
    width: '93%',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    marginLeft: '3%',
    marginRight: '3%',
  },
  backIcon: {
    marginLeft: 12,
  },
});
