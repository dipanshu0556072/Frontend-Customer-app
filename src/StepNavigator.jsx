import React, { createContext, useContext } from 'react';

const StepContext = createContext();

export function useStepContext() {
  return useContext(StepContext);
}

export default function StepProvider  ({ children }){
  // Provide your context values here
  const contextValues = {
    
    currentPage: [
      'SignIn',
      'Login1',
      'Login2',
      'mobileVerify',
      'Login3',
      'EmailLogin',
      'EmailLoginValid',
      'EmailVerify',
      'Gender',
      'Footer',
      'Notification',
      'mainHome',
      'Fashion',
      'mainPlp',
      'mainPDP',
      'WishList',
      'Topper',
      'mainBag',
      'paymentSuccess',
      'cardPayment',
      'Payment1',
      'Payment2',
      'AddressList',
      'savedAddress',
      'Address',
      'AddressDetail',
      'orderSummary',
      'ShopTrack',
      'Elastic',
      'orderStatus',
      'order',
      'starRating',
    ],
  };

  return (
    <StepContext.Provider value={contextValues}>
      {children}
    </StepContext.Provider>
  );
};


