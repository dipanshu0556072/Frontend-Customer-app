/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */


import './src/ignoreWarnings.js';

import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LoginCartProvider from './src/Login/LoginCartProvider'
import WomenCartProvider from './src/Context/WomenContext'
import StepProvider from './src/StepNavigator.jsx';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack=createNativeStackNavigator();

// import HomeBar from './src/MainScreen/HomeBar.jsx';
// import CategoryBar from './src/MainScreen/CategoryBar.jsx';
// import NotificationBar from './src/MainScreen/NotificationBar.jsx';
// import ProfileBar from './src/MainScreen/ProfileBar.jsx';

import userProfile from './src/Login/UserProfile'
import mobileVerify from './src/Login/MobileVerify';
// import MobileSign from './src/Login/MobileLogin';
import Login3 from './src/Login/Login3';
import Login2 from './src/Login/Login2';
import Login1 from './src/Login/Login1';
// import Gender from './src/Login/Gender'
// import EmailVerify from './src/Login/EmailVerify';
import EmailLogin from './src/Login/EmaiLogin';
import EmailLoginValidation from './src/Login/EmailLoginValidation';
import Footer from './src/Footer';


import SignIn from './src/Login/SignIn';
import MobileVerify from './src/Login/MobileVerify';
import EmailVerify from './src/Login/EmailVerify';
import Gender from './src/Login/Gender';
import MainHome from './src/MainHome';
import Profile from './src/Profile';
import Notification from './src/Notification';
import Fashion from './src/Fashion';
import MainPlp from './src/MainPlp';
import MainPDP from './src/MainPDP';
import WishList from './src/WishList';
import Topper from './src/TopBar3';
import MainBag from './src/MainBag';
import CardPayment from './src/Payment/CardPayment';
import Payment1 from './src/Payment/Payment1';
import Payment2 from './src/Payment/Payment2';
import PaymentSuccess from './src/Payment/PaymentSuccess';
import Address from './src/Address/Address';
import AddressDetail from './src/Address/AddressDetail';
import AddressList from './src/Address/AddressList';
import SavedAddress from './src/Address/SavedAddress';
import OrderSummary from './src/Order/OrderSummary.jsx';
import ShopTrack from './src/Order/ShopTrack.jsx';
import Elastic from './src/Elastic.jsx';
import EditProfile from './src/EditProfile.jsx';
import Test from './src/Test.jsx';
import OrderStatus from './src/Order/OrderStatus.jsx';
import order from './src/Order/Order.jsx'
import StarRating from './src/StarRating.jsx';
import ExportPdf from './src/ExportPdf.jsx';
import CategoryPage from './src/CategoryPage.jsx';
import Progress from './src/Progress.jsx';





const App = () => {
  return (
   <StepProvider> 
    <LoginCartProvider>
      <WomenCartProvider>
        <NavigationContainer>
        <Stack.Navigator
          initialRouteName="SignIn"
          screenOptions={{
            headerShown: false,
            // Define your custom transition here
            cardStyleInterpolator: ({ current, layouts }) => {
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
          }}
        >
           <Stack.Screen name="SignIn" component = {SignIn} />
           <Stack.Screen name="Login1" component = {Login1} />
           <Stack.Screen name="Login2" component = {Login2} />
           <Stack.Screen name="Login3" component = {Login3} />
           <Stack.Screen name="mobileVerify" component = {MobileVerify} />           
           <Stack.Screen name="EmailLogin" component={EmailLogin}/> 
           <Stack.Screen name="EmailLoginValid" component={EmailLoginValidation} />           
           <Stack.Screen name="EmailVerify" component={EmailVerify} />    
           <Stack.Screen name="Gender" component = {Gender} />           
           <Stack.Screen name="Footer" component={Footer}/>
           <Stack.Screen name="Notification" component={Notification}/>

           <Stack.Screen name="mainHome" component={MainHome} />         
           <Stack.Screen name="Fashion" component = {Fashion} />
           <Stack.Screen name="mainPlp" component={MainPlp}/> 
           <Stack.Screen name="mainPDP" component={MainPDP}/> 
           <Stack.Screen name="WishList" component = {WishList} /> 
           <Stack.Screen name="Topper" component = {Topper} /> 
           <Stack.Screen name="mainBag" component={MainBag}/> 
           <Stack.Screen name="paymentSuccess" component={PaymentSuccess}/>
           <Stack.Screen name="cardPayment" component={CardPayment}/>
           <Stack.Screen name="Payment1" component={Payment1}/>
           <Stack.Screen name="Payment2" component={Payment2}/>
           <Stack.Screen name="AddressList" component={AddressList}/>
           <Stack.Screen name="savedAddress" component={SavedAddress}/>
           <Stack.Screen name="Address" component={Address}/>
           <Stack.Screen name="AddressDetail" component={AddressDetail}/>
           <Stack.Screen name="orderSummary" component={OrderSummary}/>
           <Stack.Screen name="ShopTrack" component={ShopTrack}/>
           <Stack.Screen name="Elastic" component={Elastic}/>
           <Stack.Screen name="orderStatus" component={OrderStatus}/>


           <Stack.Screen name="order" component={order}/>
           <Stack.Screen name="starRating" component={StarRating}/>

           
           <Stack.Screen name="userProfile" component={userProfile}/>

           <Stack.Screen name="exportPdf" component={ExportPdf}/>
           <Stack.Screen name="categoryPage" component={CategoryPage}/>
           {/* <Stack.Screen name="progress" component={Progress}/> */}

         </Stack.Navigator>
        </NavigationContainer>
      </WomenCartProvider>
    </LoginCartProvider>
  </StepProvider>
  )
}

export default App

const styles = StyleSheet.create({})