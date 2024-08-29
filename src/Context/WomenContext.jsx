import React,{ createContext, useContext, useState, useEffect, Children } from 'react';
const WomenContext=createContext();
export function useCartContext(){
    return useContext(WomenContext);
}
export default function WomenCartProvider({children}){
    const [selectedBagItem,setSelectedBagItem]=useState([]);
    const [selectedWishListItem,setSelectedWishListItem]=useState([]);
    const [dataArray, setDataArray] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedSizes, setSelectedSizes] = useState([]);
    const[selectedColor, setSelectedColor]=useState([]);    
    const[selectedQuantity, setselectedQuantity]=useState(1);    
    const[address, setAddress]=useState([]);  
    const[decreaseTotalAmount,setDecreaseTotalAmount]=useState(1100);
    const[deliveryOption,setDeliveryOption]=useState('0');
    const [filteredDataArray, setFilteredDataArray]=useState([]);
    const[pt,setPt]=useState('');

    //show loading buffering
    const [showActivityIndicator, setShowActivityIndicator] = useState(false);

    //for sorting filter  
    const [sortBy,setSortBy]=useState("asc");
    const [lovedItems, setLovedItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);

    const[categorySelect, setCategorySelect]=useState(1); 
    const[deliveryAddress,setDeliveryAddress]=useState([]); 

    //
    const [wishedData,setWishedData]=useState([]);
      
   //add wishlistData
   const [wishListData,setWishListData]=useState([]);

   //set user profile
   const [userprofile,setUserProfile]=useState([]);

    const [productRatings, setProductRatings] = useState({});

   //store cart added data
    const [cartItem,setCartItem]=useState([]);
    const [selectedAddress,setSelectedAddress]=useState(0);
    const [orderItemPrice,setOrderItemPrice]=useState(0);
    const [totalAmount,setTotalAmount]=useState(0);
    const [SubtotalAmount,setSubTotalAmount]=useState(0);
    const [orderIdCounter,setOrderIdCounter]=useState(0);
    const [orderPlaced,setOrderPlaced]=useState(false);

    //store Address Data
    const [userName, setUserName] = useState("");
    const [streetaddress1, setStreetAddress1] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [pinCode, setPinCode] = useState("");
    const [mobile, setMobile] = useState("");
    const [houseNo, setHouseNo] = useState("");
    const [DefaultAddress,setDefaultAddres]=useState(false);

    // It will all saved Addresses
    const [allSavedAddress,setAllSavedAddress]=useState([]);
    const [profileAddress,setProfileAddress]=useState([]);

    //store placed order
    const [placedOrder,setPlacedOrder]=useState([]);

    //check orderStatus
    const [orderStatus, setOrderStatus]=useState(false);

    const [orderId,setOrderId]=useState(1);

    //get orderId for orderStatus 
    const [getOrderId,setGetOrderId]=useState(1);

    const [seeMoreFilter,setSeeMoreFilter]=useState(false);
    const [seeMoreFilterCatefory,setSeeMoreFilterCategory]=useState("");

    //track current order
    const [trackCurrentOrderId,setTrackCurrentOrderId]=useState(0);

    //track current order item
    const [trackCurrentOrder,setTrackCurrentOrder]=useState(null);

    //
    const [isItForPlaceOrder,setIsItForPlaceOrder]=useState(false);
    
    //
    const [isCouponApplied,setIsCouponApplied]=useState(false);

    //
    const [redeemYouPoints,setRedeemYourPoints]=useState('');   

    //
    const [productIds, setProductIds] = useState([]);
    

    //order ReceiptData
    const [receiptData,setReceiptData]=useState([]);

    const [isProductFoundAtPincode,setIsProductFoundAtPincode]=useState(false);

    const [backUpPageIndex,setBackUpPageIndex]=useState();
    const [searchedCiy,setSearchedCity]=useState("");
    const [search, setSearch] = useState('');

    const [dataStore,setDataStore]=useState([]);
    const [selectedStoreAvailableSlots,setSelectedStoreAvailableSlots]=useState([]);
   
    //in wallet
    const[addedMoney,setAddedMoney]=useState("");
    //in wallet
    const[transactionDetail,setTransactionDetail]=useState([]); 
    //
    const [selectedOption1,setSelectedOption1]=useState('31');
    //in subscription of the product
    const [scheduleSubscriptionOption,setScheduleSubscriptionOption]=useState('0');

    //selected address tile indes
    const [selectedAddressListIndex,setSelectedAddressListindex]=useState(0)
    const DeleteBagItem=(itemId,itemCategory)=>{
      console.log("here "+itemId+" "+itemCategory);
      const updatedBag=selectedBagItem.filter(item=>!(item.id===itemId && item.selcategory===itemCategory));
      updatedBag.map((item,index)=>(
        console.log("pair "+item.id+" "+item.category)
      ))
      setSelectedBagItem(updatedBag);      
    }

    const [emailError,setEmailError]=useState(false);
    const [error,setError]=useState(false);

    const [selectedStoreId,setSelectedStoreId]=useState(0);
    const [selectedStorePickupDay,setSelectedStorePickupDay]=useState("")
    const [selectedStorePickupTime,setSelectedStorePickupTime]=useState("")
    const [filteredData, setFilteredData] = useState([]);

    //get all available points & Tier
    const [availablePoints,setAvailablePoints]=useState("");
    const [userLoyaltyTier,setUserLoyaltyTier]=useState("");
    
    //get all reward points in history
    const [getRewardHistoryPoint,setGetRewardHistoryPoint]=useState([]);
    //get all reward Used points in history
    const [getRewardHistoryUsedPoint,setGetRewardHistoryUsedPoint]=useState([]);
    //
    const[walletBalance,setWalletBalance]=useState("");
    //cancel order reason
    const[orderCancelReason,setOrderCancelReason]=useState(0);
    //cancel reason LeaveMessage
    const [cancelLeaveMessage,setCancelLeaveMessage]=useState(""); 
    //return reason LeaveMessage
    const [returnSelectedReason,setReturnSelectedReason]=useState(1);
    const [returnLeaveMessage,setReturnLeaveMessage]=useState(""); 
    //exchange reason LeaveMessage
    const [exchangeLeaveMessage,setExchangeLeaveMessage]=useState(""); 
        

    //disable action of navigate from profileBar to storeLocator,My Payment, 
    const [disableAction,setDisableAction]=useState(true);
    //add money wallet through tender page
    const [addMoneyToWalletTender,setAddMoneyToWalletTender]=useState(false); 

    //use to store all productId,productSize,productQuantity for storePickUp Schedule
    const [storeProductWithSizeAndQuantity,setStoreProductWithSizeAndQuantity]=useState();
    
    //use for modify the storePickUp Order Timing
    const [modifyStorePickUp,setModifyStorePickUp]=useState(false);
    const [showStorePickUpName,setShowStorePickUpName]=useState("");

   //select exchange/return tab
   const [isChecked, setChecked] = useState([]);


  // select All Checkbox
   const [selectAllCheckBox, setSelectAllCheckBox] = useState([]);

  //show status of returned Product
  const [showReturnedProductStatus,setShowReturnedProductStatus]=useState(false);

  //isPromotionCouponApplied
  const[promotionCouponApplied,setPromotionCouponApplied]=useState(false);
    //apply promotion coupon 
    const [inputPromotionCoupon,setInputPromotionCoupon]=useState("");
    //show coupon burst
    const [showConfetti, setShowConfetti] =useState(true);

    //check is promtion coupon is applied or not 
   const [checkIsPromotionCouponApplied,setCheckIsPromotionCouponApplied]=useState(0);

   //currentProduct which is on PDP Page, store the productId of it
   const [productIdOnPdp,setProductIdOnPdp]=useState(0);

    const DeleteWishItem=(itemId,itemCategory)=>{
      console.log("here "+itemId+" "+itemCategory);
      const updatedBag=selectedWishListItem.filter(item=>!(item.id===itemId && item.selcategory===itemCategory));
      setSelectedWishListItem(updatedBag);      
    }
    const MoveToWishList=(itemId)=>{
        // const updatedBag = selectedBagItem.filter((item) =>(item.id === itemId && item.selcategory===itemCategory));
        // DeleteBagItem(itemId,itemCategory);
        // console.log("Before "+updatedBag);
        // setSelectedWishListItem((prevWishData)=>[...prevWishData,...updatedBag]);
        console.log("\nAfter WIshList "+itemId);
        
     }
     const MoveToBag=(itemId,itemCategory)=>{
      const updatedBag = selectedWishListItem.filter((item) =>(item.id === itemId && item.selcategory===itemCategory));
      DeleteWishItem(itemId,itemCategory);
      console.log("Before "+updatedBag);
      setSelectedBagItem((prevWishData)=>[...prevWishData,...updatedBag]);
      console.log("After Bag "+selectedBagItem);
   }
  const contextvalue={
        //selected bag items
        selectedBagItem,
        setSelectedBagItem,

        //selected Wishlist Item
        selectedWishListItem,
        setSelectedWishListItem,

        //for Delete Bag Item
        DeleteBagItem,
        MoveToBag,

        //for Move item to wishlist
        MoveToWishList,DeleteWishItem,
        dataArray,setDataArray,
        products, setProducts,
        selectedSizes, setSelectedSizes,
        selectedColor, setSelectedColor,
        selectedQuantity, setselectedQuantity,
        address, setAddress,
        categorySelect, setCategorySelect,
        decreaseTotalAmount,setDecreaseTotalAmount,
        sortBy,setSortBy,
        cartItem,setCartItem,
        deliveryAddress,setDeliveryAddress,
        selectedAddress,setSelectedAddress,
        orderItemPrice,setOrderItemPrice,
        totalAmount,setTotalAmount,
        orderIdCounter,setOrderIdCounter,
        orderPlaced,setOrderPlaced,

        //order Placing address Details
        userName, setUserName,
        streetaddress1, setStreetAddress1,
        city, setCity,
        state, setState,
        pinCode, setPinCode,
        mobile, setMobile,
        houseNo, setHouseNo,
        DefaultAddress,setDefaultAddres,

        // stored all saved addresses
        allSavedAddress,setAllSavedAddress,
        profileAddress,setProfileAddress,

        placedOrder,setPlacedOrder,

        // add to wishlist
        wishListData,setWishListData,

        // for order status
        orderStatus, setOrderStatus,
        orderId,setOrderId,

        //set user profile
        userprofile,setUserProfile,
        cartCount, setCartCount,
        SubtotalAmount,setSubTotalAmount,

        getOrderId,setGetOrderId,

        seeMoreFilter,setSeeMoreFilter,

        seeMoreFilterCatefory,setSeeMoreFilterCategory,

        trackCurrentOrderId,setTrackCurrentOrderId,
        trackCurrentOrder,setTrackCurrentOrder,
        productIds, setProductIds,


       // in order summary
        selectedAddressListIndex,setSelectedAddressListindex,

        isItForPlaceOrder,setIsItForPlaceOrder  ,
        deliveryOption,setDeliveryOption,

        receiptData,setReceiptData,
        filteredDataArray, setFilteredDataArray,

        isProductFoundAtPincode,setIsProductFoundAtPincode,
        backUpPageIndex,setBackUpPageIndex,
        searchedCiy,setSearchedCity,
        search, setSearch,
        dataStore,setDataStore,
        selectedStoreId,setSelectedStoreId,
        selectedStoreAvailableSlots,setSelectedStoreAvailableSlots,
        selectedStorePickupDay,setSelectedStorePickupDay,
        selectedStorePickupTime,setSelectedStorePickupTime,
        filteredData, setFilteredData,
        availablePoints,setAvailablePoints,
        userLoyaltyTier,setUserLoyaltyTier,
        getRewardHistoryPoint,setGetRewardHistoryPoint,
        getRewardHistoryUsedPoint,setGetRewardHistoryUsedPoint,
        lovedItems, setLovedItems,
        isCouponApplied,setIsCouponApplied,
        redeemYouPoints,setRedeemYourPoints,
        pt,setPt,
        walletBalance,setWalletBalance,
        addedMoney,setAddedMoney,
        transactionDetail,setTransactionDetail,
        selectedOption1,setSelectedOption1,

        scheduleSubscriptionOption,setScheduleSubscriptionOption,
        orderCancelReason,setOrderCancelReason,
        cancelLeaveMessage,setCancelLeaveMessage,
        returnLeaveMessage,setReturnLeaveMessage,
        exchangeLeaveMessage,setExchangeLeaveMessage,
        
        disableAction,setDisableAction,
        showActivityIndicator, setShowActivityIndicator,
        addMoneyToWalletTender,setAddMoneyToWalletTender,
        storeProductWithSizeAndQuantity,setStoreProductWithSizeAndQuantity,
        modifyStorePickUp,setModifyStorePickUp,
        showStorePickUpName,setShowStorePickUpName,
        isChecked, setChecked,
        selectAllCheckBox, setSelectAllCheckBox,
        returnSelectedReason,setReturnSelectedReason,
        showReturnedProductStatus,setShowReturnedProductStatus,
        promotionCouponApplied,setPromotionCouponApplied,
        inputPromotionCoupon,setInputPromotionCoupon,
        showConfetti, setShowConfetti,
        checkIsPromotionCouponApplied,setCheckIsPromotionCouponApplied,
        productIdOnPdp,setProductIdOnPdp
    }
    return (
        <WomenContext.Provider value={contextvalue}>
          {children}  
        </WomenContext.Provider>
    );
}