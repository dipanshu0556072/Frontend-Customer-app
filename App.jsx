import './src/ignoreWarnings.js';

import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LoginCartProvider from './src/Login/LoginCartProvider';
import WomenCartProvider from './src/Context/WomenContext';
import StepProvider from './src/StepNavigator.jsx';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeBar from './src/HomeBar.jsx';
import RedeemPoints from './src/Loyalty/RedeemPoints.jsx';

const Stack = createNativeStackNavigator();

import ChangePassword from './src/Login/ChangePassword.jsx';
import userProfile from './src/Login/UserProfile';
import mobileVerify from './src/Login/MobileVerify';
// import MobileSign from './src/Login/MobileLogin';
import userLogin from './src/Login/UserLogin.jsx';
// import Gender from './src/Login/Gender'
// import EmailVerify from './src/Login/EmailVerify';
import EmailLogin from './src/Login/EmaiLogin';
import EmailLoginValidation from './src/Login/EmailIdValidation.jsx';
import Footer from './src/Footer';

import SignIn from './src/Login/SignIn';
import MobileVerify from './src/Login/MobileVerify';
import EmailVerify from './src/Login/EmailVerify';
import Gender from './src/Login/Gender';
import MainHome from './src/MainHome';
import Profile from './src/Profile';
import mobileNumberVerify from './src/Login/Login2.jsx';
import Notification from './src/Notification';
import Fashion from './src/Fashion';
import MainPlp from './src/PLP_Page.jsx';
import MainPDP from './src/MainPdp.jsx';
import WishList from './src/WishList';
import MainBag from './src/MainBag';
import CardPayment from './src/Payment/CardPayment';
import Payment1 from './src/Payment/Payment1';
import Payment2 from './src/Payment/Payment2';
import PaymentSuccess from './src/Payment/PaymentSuccess';
import Address from './src/Address/Address';
import AddressDetail from './src/Address/AddressDetail';
import OrderTile from './src/Components/OrderTile.jsx';

import SavedAddress from './src/Address/SavedAddress';
import OrderSummary from './src/Order/OrderSummary.jsx';
import ShopTrack from './src/Order/ShopTrack.jsx';
import Elastic from './src/Elastic.jsx';
import OrderStatus from './src/Order/OrderStatus.jsx';
import order from './src/Order/Order.jsx';
import StarRating from './src/StarRating.jsx';
import ExportPdf from './src/ExportPdf.jsx';
import CategoryPage from './src/CategoryPage.jsx';
import Progress from './src/Progress.jsx';
import ProfileBar from './src/ProfileBar.jsx';
import PDF from './src/Order/PDF.jsx';
import ForgetPassword from './src/Login/ForgetPassword.jsx';
import GpsLocation from './src/GpsLocation.jsx';
import ForgotChangePassword from './src/Login/ForgotChangePassword.jsx';
import ChooseStorePincode from './src/ChooseStorePincode.jsx';
import SelectStore from './src/SelectStore.jsx';
import LocateStoreOnMap from './src/LocateStoreOnMap.jsx';
import ScheduleStoreTime from './src/ScheduleStoreTime.jsx';
import MyDropDown from './src/MyDropDown.jsx';
import HomeScreen from './src/HomeScreen.jsx';
import LoyaltyWelcome from './src/Loyalty/LoyaltyWelcome.jsx';
import LoyaltyHome from './src/Loyalty/LoyaltyHome.jsx';
import RewardHistory from './src/Loyalty/RewardHistory.jsx';
import TopNavigator from './src/TopNavigator.jsx';
import AllLoyaltyInfo from './src/Loyalty/AllLoyaltyInfo.jsx';
import ApplyCoupon from './src/Loyalty/ApplyCoupon.jsx';
import SilverTier from './src/Loyalty/SilverTier.jsx';
import GoldTier from './src/Loyalty/GoldTier.jsx';
import PlatinumTier from './src/Loyalty/PlatinumTier.jsx';
import ReferWelcome from './src/ReferProgram/ReferWelcome.jsx';
import ReferralHome from './src/ReferProgram/ReferralHome.jsx';
import Tpop from './src/Loyalty/Tpop.jsx';
import WalletHome from './src/Wallet/WalletHome.jsx';
import RequestStatment from './src/Wallet/RequestStatment.jsx';
import AddMoney from './src/Wallet/AddMoney.jsx';
import WalletHistory from './src/Wallet/WalletHistory.jsx';
import PaymentOption from './src/Wallet/PaymentOption.jsx';
import WalletCardPayment from './src/Wallet/WalletCardPayment.jsx';
import WalletPaymentSuccess from './src/Wallet/WallletPaymentSuccess.jsx';
import WalletExportPdf from './src/Wallet/WalletExportPdf.jsx';
import GroceryHome from './src/Grocery/GroceryHome.jsx';
import DairyProduct from './src/Grocery/DairyProduct.jsx';
import ScheduleSubscription from './src/Grocery/ScheduleSubscription.jsx';
import SubscribedOrderSummary from './src/Grocery/SubscribedOrderSummary.jsx';
import ProductSubscribedSuccess from './src/Grocery/ProductSubscribedSuccess.jsx';
import SubscribedItem from './src/Grocery/SubscribedItem.jsx';
import GroceryProvider from './src/Grocery/GroceryContext.jsx';
import SubscribedProductDetail from './src/Grocery/SubscribedProductDetail.jsx';
import ExtendSubscription from './src/Grocery/ExtendSubscription.jsx';
import OrderCancel from './src/Order/OrderCancel.jsx';
import CancellationConfirmation from './src/Grocery/CancellationConfirmation.jsx';
import SubscriptionUpdate from './src/Grocery/SubscriptionUpdate.jsx';
import GroceryPdpPage from './src/Grocery/GroceryPdpPage.jsx';
import ReturnPage1 from './src/Order/ReturnPage1.jsx';
import ReturnOrderStatus from './src/Order/ReturnOrderStatus.jsx';
import ReturnOrderProgressBar from './src/Order/ReturnOrderProgressBar.jsx';
import AddCarousel from './src/Components/BannerCarousel.jsx';
import DealsOnBrands from './src/Components/DealsOnBrands.jsx';
import BestSeller from './src/Components/BestSeller.jsx';
import PlayAndEarn from './src/Components/PlayAndEarn.jsx';
import PLPComponent from './src/Components/PLPComponent.jsx';
import BottomNavigator from './src/Components/BottomNavigator.jsx';
import SelectGender from './src/Components/SelectGender.jsx';

import Exp from './src/Exp.jsx';

const App = () => {
  return (
    <StepProvider>
      <LoginCartProvider>
        <WomenCartProvider>
          <GroceryProvider>
            <NavigationContainer>
              <Stack.Navigator
                initialRouteName="SignIn"
                screenOptions={{
                  headerShown: false,
                  // Define your custom transition here
                  cardStyleInterpolator: ({current, layouts}) => {
                    return {
                      cardStyle: {
                        transform: [
                          {
                            translateX: current.progress.interpolate({
                              inputRange: [0, 1],
                              outputRange: [layouts.screen.width, 0],
                            }),
                          },
                        ],
                      },
                    };
                  },
                }}>
                {/*-------------------------------------LOGIN SECTION-----------------------------------------------------------------*/}
                <Stack.Screen name="SignIn" component={SignIn} />
                <Stack.Screen name="userLogin" component={userLogin} />
                <Stack.Screen name="EmailLogin" component={EmailLogin} />
                <Stack.Screen
                  name="EmailLoginValid"
                  component={EmailLoginValidation}
                />
                <Stack.Screen name="EmailVerify" component={EmailVerify} />
                <Stack.Screen name="mobileVerify" component={MobileVerify} />
                <Stack.Screen
                  name="forgotPassword"
                  component={ForgetPassword}
                />
                <Stack.Screen
                  name="forgotChangePassword"
                  component={ForgotChangePassword}
                />
                <Stack.Screen
                  name="mobileNumberVerify"
                  component={mobileNumberVerify}
                />

                {/*-------------------------------------HOME SECTION-----------------------------------------------------------------*/}
                <Stack.Screen name="mainHome" component={MainHome} />
                <Stack.Screen name="Fashion" component={Fashion} />
                <Stack.Screen name="mainPlp" component={MainPlp} />
                <Stack.Screen name="plpPage" component={PLPComponent} />
                <Stack.Screen name="mainPDP" component={MainPDP} />
                <Stack.Screen name="WishList" component={WishList} />
                <Stack.Screen name="Gender" component={Gender} />
                <Stack.Screen name="Footer" component={Footer} />
                <Stack.Screen name="Notification" component={Notification} />
                <Stack.Screen name="mainBag" component={MainBag} />
                <Stack.Screen
                  name="paymentSuccess"
                  component={PaymentSuccess}
                />
                                <Stack.Screen
                  name="selectGender"
                  component={SelectGender}
                />
                <Stack.Screen name="cardPayment" component={CardPayment} />
                <Stack.Screen name="Payment1" component={Payment1} />
                <Stack.Screen name="Payment2" component={Payment2} />
                <Stack.Screen name="savedAddress" component={SavedAddress} />
                <Stack.Screen name="Address" component={Address} />
                <Stack.Screen name="AddressDetail" component={AddressDetail} />
                <Stack.Screen name="orderTile" component={OrderTile} />
                <Stack.Screen name="orderSummary" component={OrderSummary} />
                <Stack.Screen name="ShopTrack" component={ShopTrack} />
                <Stack.Screen name="Elastic" component={Elastic} />
                <Stack.Screen name="orderStatus" component={OrderStatus} />
                <Stack.Screen name="bottomNavigator" component={BottomNavigator} />
                <Stack.Screen name="order" component={order} />
                <Stack.Screen name="starRating" component={StarRating} />
                <Stack.Screen name="userProfile" component={userProfile} />

                <Stack.Screen name="exportPdf" component={ExportPdf} />
                <Stack.Screen name="categoryPage" component={CategoryPage} />
                <Stack.Screen name="homeBar" component={HomeBar} />
                <Stack.Screen name="profileBar" component={ProfileBar} />
                <Stack.Screen name="Home1" component={Fashion} />
                <Stack.Screen
                  name="changePassword"
                  component={ChangePassword}
                />
                <Stack.Screen name="PDF" component={PDF} />

                <Stack.Screen
                  name="chooseStoreUsingPincode"
                  component={ChooseStorePincode}
                />
                <Stack.Screen name="selectStore" component={SelectStore} />
                <Stack.Screen name="locateStore" component={LocateStoreOnMap} />
                <Stack.Screen
                  name="locateStoreOnMap"
                  component={LocateStoreOnMap}
                />
                <Stack.Screen
                  name="scheduleStore"
                  component={ScheduleStoreTime}
                />
                <Stack.Screen name="GPS" component={GpsLocation} />

                {/*--------------------------------------------------------------------------------------------------------------------------------------------- */}

                <Stack.Screen
                  name="loyaltyWelcome"
                  component={LoyaltyWelcome}
                />
                <Stack.Screen name="loyaltyHome" component={LoyaltyHome} />
                <Stack.Screen name="redeemPoint" component={RedeemPoints} />
                <Stack.Screen name="rewardHistory" component={RewardHistory} />
                <Stack.Screen
                  name="allLoyaltyInfo"
                  component={AllLoyaltyInfo}
                />
                <Stack.Screen name="silverTier" component={SilverTier} />
                <Stack.Screen name="goldTier" component={GoldTier} />
                <Stack.Screen name="platinumTier" component={PlatinumTier} />
                <Stack.Screen name="applyCoupon" component={ApplyCoupon} />
                <Stack.Screen name="referWelcome" component={ReferWelcome} />
                <Stack.Screen name="referralHome" component={ReferralHome} />
                <Stack.Screen name="walletHome" component={WalletHome} />
                <Stack.Screen
                  name="requestStatement"
                  component={RequestStatment}
                />
                <Stack.Screen name="addMoney" component={AddMoney} />
                <Stack.Screen name="walletHistory" component={WalletHistory} />
                <Stack.Screen name="paymentOption" component={PaymentOption} />
                <Stack.Screen
                  name="walletCardPayment"
                  component={WalletCardPayment}
                />
                <Stack.Screen
                  name="walletpaymentSuccess"
                  component={WalletPaymentSuccess}
                />
                <Stack.Screen
                  name="walletexportPdf"
                  component={WalletExportPdf}
                />
                <Stack.Screen name="groceryHome" component={GroceryHome} />
                <Stack.Screen name="dairyProduct" component={DairyProduct} />
                <Stack.Screen
                  name="scheduleSubscription"
                  component={ScheduleSubscription}
                />
                <Stack.Screen
                  name="subscribedProductSuccess"
                  component={ProductSubscribedSuccess}
                />
                <Stack.Screen
                  name="subscribedOrder"
                  component={SubscribedOrderSummary}
                />
                <Stack.Screen
                  name="subscribedItem"
                  component={SubscribedItem}
                />
                <Stack.Screen
                  name="subscribedProductDetail"
                  component={SubscribedProductDetail}
                />
                <Stack.Screen
                  name="extendSubscription"
                  component={ExtendSubscription}
                />
                <Stack.Screen name="orderCancel" component={OrderCancel} />
                <Stack.Screen
                  name="orderCancelConfirm"
                  component={CancellationConfirmation}
                />
                <Stack.Screen
                  name="subscriptionUpdated"
                  component={SubscriptionUpdate}
                />
                <Stack.Screen
                  name="groceryPdpPage"
                  component={GroceryPdpPage}
                />
                <Stack.Screen name="returnPage1" component={ReturnPage1} />
                <Stack.Screen
                  name="returnOrderStatus"
                  component={ReturnOrderStatus}
                />
                <Stack.Screen
                  name="returnProgressBar"
                  component={ReturnOrderProgressBar}
                />

                {/* <Stack.Screen name="Exp" component={Exp}/>   */}
              </Stack.Navigator>
            </NavigationContainer>
          </GroceryProvider>
        </WomenCartProvider>
      </LoginCartProvider>
    </StepProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
