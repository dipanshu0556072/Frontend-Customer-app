import React,{ createContext, useContext, useState, useEffect, Children } from 'react';
const manFormal=[
    // {
    //     id:1,
    //     category:'Men Formal',
    //     brandName:'Striped Shirt',
    //     productName:'Opaque Striped Formal Shirt',
    //     image:'http://surl.li/nwnrx',
    //     rating:4.5,
    //     discount:'0',
    //     price:899,  
    //     mrp:1299,
    //     country:'India',
    //     wearType:'formals',
    //     Fabric:'Polyviscode with Satin Lining',
    //     sleeves:'Full Sleeves',
    //     fit:'Regular fit',
    //     materialCare:'Dry clean only', 
    //     productDescription:"If you're on the hunt for a shoe that's got you covered in every way, look no further than the avant men's rainbow sports shoes. These shoes combine performance, comfort, durability, and style to suit a variety of sports. Get ready to conquer your activities with confidence and flair!",
    //     productCode:'74268923',
    //     seller:'Beige Blazer'
      
    //   },
    // {
    //     id:2,
    //     category:'Men Formal',
    //     brandName:'Blue Blazer',
    //     productName:'Women Navy Blue Blazer',
    //     image:'http://surl.li/nwntx',
    //     rating:4.7,
    //     discount:'15',
    //     price:3199,
    //     mrp:3999,
    //     country:'India',
    //     wearType:'formals',
    //     Fabric:'Polyviscode with Satin Lining',
    //     sleeves:'Full Sleeves',
    //     fit:'Regular fit',
    //     materialCare:'Dry clean only',
    //     productDescription:"If you're on the hunt for a shoe that's got you covered in every way, look no further than the avant men's rainbow sports shoes. These shoes combine performance, comfort, durability, and style to suit a variety of sports. Get ready to conquer your activities with confidence and flair!",
    //     productCode:'74268923',
    //     seller:'Beige Blazer'
    //   },
    // {
    //     id:3,
    //     category:'Men Formal',
    //     brandName:'Striped Shirt',
    //     productName:'Opaque Striped Formal Shirt',
    //     image:'http://surl.li/nwnsd',
    //     rating:4.5,
    //     discount:'0',
    //     price:899,  
    //     mrp:1299,
    //     country:'India',
    //     wearType:'formals',
    //     Fabric:'Polyviscode with Satin Lining',
    //     sleeves:'Full Sleeves',
    //     fit:'Regular fit',
    //     materialCare:'Dry clean only',
    //     productDescription:"If you're on the hunt for a shoe that's got you covered in every way, look no further than the avant men's rainbow sports shoes. These shoes combine performance, comfort, durability, and style to suit a variety of sports. Get ready to conquer your activities with confidence and flair!",
    //     productCode:'74268923',
    //     seller:'Beige Blazer'
    //   },
    // {
    //     id:4,
    //     category:'Men Formal',
    //     brandName:'White Shirt',
    //     productName:'Women Cotton White Shirt',
    //     image:'http://surl.li/nwnul',
    //     rating:4.3,
    //     discount:'0',
    //     price:3199,
    //     mrp:3999,
    //     country:'India',
    //     wearType:'formals',
    //     Fabric:'Polyviscode with Satin Lining',
    //     sleeves:'Full Sleeves',
    //     fit:'Regular fit',
    //     materialCare:'Dry clean only',
    //     productDescription:"If you're on the hunt for a shoe that's got you covered in every way, look no further than the avant men's rainbow sports shoes. These shoes combine performance, comfort, durability, and style to suit a variety of sports. Get ready to conquer your activities with confidence and flair!",
    //     productCode:'74268923',
    //     seller:'Beige Blazer'
    //   },
    // {
    //     id:5,
    //     category:'Men Formal',
    //     brandName:'Lined Shirt',
    //     productName:'Women Printed Green Shirt',
    //     image:'http://surl.li/nwnwg',
    //     rating:4.4,
    //     discount:'0',
    //     price:1034,
    //     mrp:2899,
    //     country:'India',
    //     wearType:'formals',
    //     Fabric:'Polyviscode with Satin Lining',
    //     sleeves:'Full Sleeves',
    //     fit:'Regular fit',
    //     materialCare:'Dry clean only',
    //     productDescription:"If you're on the hunt for a shoe that's got you covered in every way, look no further than the avant men's rainbow sports shoes. These shoes combine performance, comfort, durability, and style to suit a variety of sports. Get ready to conquer your activities with confidence and flair!",
    //     productCode:'74268923',
    //     seller:'Beige Blazer'
    //   },
    // {
    //     id:6,
    //     category:'Men Formal',
    //     brandName:'Beige Blazer',
    //     productName:'Women satin Formal Blazer',
    //     image:'http://surl.li/nwnwt',
    //     rating:4.8,
    //     discount:'0',
    //     price:4899,
    //     mrp:5999,
    //     country:'India',
    //     wearType:'formals',
    //     Fabric:'Polyviscode with Satin Lining',
    //     sleeves:'Full Sleeves',
    //     fit:'Regular fit',
    //     materialCare:'Dry clean only',
    //     productDescription:"If you're on the hunt for a shoe that's got you covered in every way, look no further than the avant men's rainbow sports shoes. These shoes combine performance, comfort, durability, and style to suit a variety of sports. Get ready to conquer your activities with confidence and flair!",
    //     productCode:'74268923',
    //     seller:'Beige Blazer'
    //   },
    // {
    //     id:7,
    //     category:'Men Formal',
    //     brandName:'Beige Blazer',
    //     productName:'Women satin Formal Blazer',
    //     image:'http://surl.li/nwnxe',
    //     rating:4.8,
    //     discount:'0',
    //     price:1034,
    //     mrp:2899,
    //     country:'India',
    //     wearType:'formals',
    //     Fabric:'Polyviscode with Satin Lining',
    //     sleeves:'Full Sleeves',
    //     fit:'Regular fit',
    //     materialCare:'Dry clean only',
    //     productDescription:"If you're on the hunt for a shoe that's got you covered in every way, look no further than the avant men's rainbow sports shoes. These shoes combine performance, comfort, durability, and style to suit a variety of sports. Get ready to conquer your activities with confidence and flair!",
    //     productCode:'74268923',
    //     seller:'Beige Blazer'
    //   },
    // {
    //     id:8,
    //     category:'Men Formal',
    //     brandName:'Beige Blazer',
    //     productName:'Women satin Formal Blazer',
    //     image:'http://surl.li/nwnvt',
    //     rating:4.8,
    //     discount:'0',
    //     price:2899,
    //     mrp:3299,
    //     country:'India',
    //     wearType:'formals',
    //     Fabric:'Polyviscode with Satin Lining',
    //     sleeves:'Full Sleeves',
    //     fit:'Regular fit',
    //     materialCare:'Dry clean only',
    //     productDescription:"If you're on the hunt for a shoe that's got you covered in every way, look no further than the avant men's rainbow sports shoes. These shoes combine performance, comfort, durability, and style to suit a variety of sports. Get ready to conquer your activities with confidence and flair!",
    //     productCode:'74268923',
    //     seller:'Beige Blazer'
    //   },
]
const womanFormal=[
  //   {
  //       id:1,
  //       category:'Women Formal',
  //       brandName:'Beige Blazer',
  //       productName:'Women satin Formal Blazer',
  //       image:'http://surl.li/nrqaa',
  //       rating:4.8,
  //       discount:'38',
  //       price:4899,
  //       mrp:5999,
  //       country:'India',
  //       wearType:'formals',
  //       Fabric:'Polyviscode with Satin Lining',
  //       sleeves:'Full Sleeves',
  //       fit:'Regular fit',
  //       materialCare:'Dry clean only',
  //       productDescription:"If you're on the hunt for a shoe that's got you covered in every way, look no further than the avant men's rainbow sports shoes. These shoes combine performance, comfort, durability, and style to suit a variety of sports. Get ready to conquer your activities with confidence and flair!",
  //       productCode:'74268923',
  //       seller:'Beige Blazer'
  //  },
  //   {
  //       id:2,
  //       category:'Women Formal',
  //       brandName:'Blue Blazer',
  //       productName:'Women Navy Blue Blazer',
  //       image:'http://surl.li/myjqm',
  //       rating:4.7,
  //       discount:'15',
  //       price:3199,
  //       mrp:3999,
  //       country:'India',
  //       wearType:'formals',
  //       Fabric:'Polyviscode with Satin Lining',
  //       sleeves:'Full Sleeves',
  //       fit:'Regular fit',
  //       materialCare:'Dry clean only',
  //       productDescription:"If you're on the hunt for a shoe that's got you covered in every way, look no further than the avant men's rainbow sports shoes. These shoes combine performance, comfort, durability, and style to suit a variety of sports. Get ready to conquer your activities with confidence and flair!",
  //       productCode:'74268923',
  //       seller:'Beige Blazer'
  //  },
  //   {
  //       id:3,
  //       category:'Women Formal',
  //       brandName:'Striped Shirt',
  //       productName:'Opaque Striped Formal Shirt',
  //       image:'http://surl.li/myjrn',
  //       rating:4.5,
  //       discount:'0',
  //       price:899,
  //       mrp:1299,
  //       country:'India',
  //       wearType:'formals',
  //       Fabric:'Polyviscode with Satin Lining',
  //       sleeves:'Full Sleeves',
  //       fit:'Regular fit',
  //       materialCare:'Dry clean only',
  //       productDescription:"If you're on the hunt for a shoe \nthat's got you covered in every way,\n look no further than the avant men's rainbow sports shoes. These shoes combine performance, comfort, durability, and style to suit a variety of sports. Get ready to conquer your activities with confidence and flair!",
  //  },
  //   {
  //       id:4,
  //       category:'Women Formal',
  //       brandName:'White Shirt',
  //       productName:'Women Cotton White Shirt',
  //       image:'http://surl.li/myjsg',
  //       rating:4.3,
  //       discount:'0',
  //       price:3199,
  //       mrp:3999,
  //       country:'India',
  //       wearType:'formals',
  //       Fabric:'Polyviscode with Satin Lining',
  //       sleeves:'Full Sleeves',
  //       fit:'Regular fit',
  //       materialCare:'Dry clean only',
  //       productDescription:"If you're on the hunt for a shoe \nthat's got you covered in every way,\n look no further than the avant men's rainbow sports shoes. These shoes combine performance, comfort, durability, and style to suit a variety of sports. Get ready to conquer your activities with confidence and flair!",
  //   },
  //   {
  //       id:5,
  //       category:'Women Formal',
  //       brandName:'Lined Shirt',
  //       productName:'Women Printed Green Shirt',
  //       image:'http://surl.li/myjtj',
  //       rating:4.4,
  //       discount:'0',
  //       price:1034,
  //       mrp:2899,
  //       country:'India',
  //       wearType:'formals',
  //       Fabric:'Polyviscode with Satin Lining',
  //       sleeves:'Full Sleeves',
  //       fit:'Regular fit',
  //       materialCare:'Dry clean only',
  //       productDescription:"If you're on the hunt for a shoe \nthat's got you covered in every way,\n look no further than the avant men's rainbow sports shoes. These shoes combine performance, comfort, durability, and style to suit a variety of sports. Get ready to conquer your activities with confidence and flair!",
  //   },
  //   {
  //       id:6,
  //       category:'Women Formal',
  //       brandName:'Beige Blazer',
  //       productName:'Women satin Formal Blazer',
  //       image:'http://surl.li/myjsg',
  //       rating:4.8,
  //       discount:'0',
  //       price:4899,
  //       mrp:5999,
  //       country:'India',
  //       wearType:'formals',
  //       Fabric:'Polyviscode with Satin Lining',
  //       sleeves:'Full Sleeves',
  //       fit:'Regular fit',
  //       materialCare:'Dry clean only',
  //       productDescription:"If you're on the hunt for a shoe \nthat's got you covered in every way,\n look no further than the avant men's rainbow sports shoes. These shoes combine performance, comfort, durability, and style to suit a variety of sports. Get ready to conquer your activities with confidence and flair!",
  // },
  //   {
  //       id:7,
  //       category:'Women Formal',
  //       brandName:'Beige Blazer',
  //       productName:'Women satin Formal Blazer',
  //       image:'http://surl.li/myjty',
  //       rating:4.8,
  //       discount:'0',
  //       price:1034,
  //       mrp:2899,
  //       country:'India',
  //       wearType:'formals',
  //       Fabric:'Polyviscode with Satin Lining',
  //       sleeves:'Full Sleeves',
  //       fit:'Regular fit',
  //       materialCare:'Dry clean only',
  //       productDescription:"If you're on the hunt for a shoe that's got you covered in every way,\n look no further than the avant men's rainbow sports shoes. These shoes combine performance, comfort, durability, and style to suit a variety of sports. Get ready to conquer your activities with confidence and flair!",
  // },
  //   {
  //       id:8,
  //       category:'Women Formal',
  //       brandName:'Beige Blazer',
  //       productName:'Women satin Formal Blazer',
  //       image:'http://surl.li/nrpee',
  //       rating:4.8,
  //       discount:'0',
  //       price:2899,
  //       mrp:3299,
  //       country:'India',
  //       wearType:'formals',
  //       Fabric:'Polyviscode with Satin Lining',
  //       sleeves:'Full Sleeves',
  //       fit:'Regular fit',
  //       materialCare:'Dry clean only',
  //       productDescription:"If you're on the hunt for a shoe \nthat's got you covered in every way,\n look no further than the avant men's rainbow sports shoes. These shoes combine performance, comfort, durability, and style to suit a variety of sports. Get ready to conquer your activities with confidence and flair!",
  //  },
  //  {
  //   id:9,
  //   category:'Women Formal',
  //   brandName:'Beige Blazer',
  //   productName:'Women satin Formal Blazer',
  //   image:'https://shorturl.at/xKSX9',
  //   rating:4.8,
  //   discount:'0',
  //   price:2899,
  //   mrp:3299,
  //   country:'India',
  //   wearType:'formals',
  //   Fabric:'Polyviscode with Satin Lining',
  //   sleeves:'Full Sleeves',
  //   fit:'Regular fit',
  //   materialCare:'Dry clean only',
  //   productDescription:"If you're on the hunt for a shoe \nthat's got you covered in every way,\n look no further than the avant men's rainbow sports shoes. These shoes combine performance, comfort, durability, and style to suit a variety of sports. Get ready to conquer your activities with confidence and flair!",
  // },
]
const bestSeller=[
  // {
  //   id:1,
  //   category:'bestSaled',
  //   brandName:'Beige Blazer',
  //   productName:'Women satin Formal Blazer',
  //   image:'http://surl.li/nsckx',
  //   rating:4.8,
  //   discount:'0',
  //   price:2899,
  //   mrp:3299,
  //   country:'India',
  //   wearType:'formals',
  //   Fabric:'Polyviscode with Satin Lining',
  //   sleeves:'Full Sleeves',
  //   fit:'Regular fit',
  //   materialCare:'Dry clean only',
  //   productDescription:"If you're on the hunt for a shoe \nthat's got you covered in every way,\n look no further than the avant men's rainbow sports shoes. These shoes combine performance, comfort, durability, and style to suit a variety of sports. Get ready to conquer your activities with confidence and flair!",
  // },
  // {
  //   id:2,
  //   category:'bestSaled',
  //   brandName:'Beige Blazer',
  //   productName:'Women satin Formal Blazer',
  //   image:'http://surl.li/nscqv',
  //   rating:4.8,
  //   discount:'0',
  //   price:2899,
  //   mrp:3299,
  //   country:'India',
  //   wearType:'formals',
  //   Fabric:'Polyviscode with Satin Lining',
  //   sleeves:'Full Sleeves',
  //   fit:'Regular fit',
  //   materialCare:'Dry clean only',
  //   productDescription:"If you're on the hunt for a shoe \nthat's got you covered in every way,\n look no further than the avant men's rainbow sports shoes. These shoes combine performance, comfort, durability, and style to suit a variety of sports. Get ready to conquer your activities with confidence and flair!",
  // },
  // {
  //   id:3,
  //   category:'bestSaled',
  //   brandName:'Beige Blazer',
  //   productName:'Women satin Formal Blazer',
  //   image:'http://surl.li/nscvx',
  //   rating:4.8,
  //   discount:'0',
  //   price:2899,
  //   mrp:3299,
  //   country:'India',
  //   wearType:'formals',
  //   Fabric:'Polyviscode with Satin Lining',
  //   sleeves:'Full Sleeves',
  //   fit:'Regular fit',
  //   materialCare:'Dry clean only',
  //   productDescription:"If you're on the hunt for a shoe \nthat's got you covered in every way,\n look no further than the avant men's rainbow sports shoes. These shoes combine performance, comfort, durability, and style to suit a variety of sports. Get ready to conquer your activities with confidence and flair!",
  // },
  // {
  //   id:4,
  //   category:'bestSaled',
  //   brandName:'Beige Blazer',
  //   productName:'Women satin Formal Blazer',
  //   image:'http://surl.li/nscsu',
  //   rating:4.8,
  //   discount:'0',
  //   price:2899,
  //   mrp:3299,
  //   country:'India',
  //   wearType:'formals',
  //   Fabric:'Polyviscode with Satin Lining',
  //   sleeves:'Full Sleeves',
  //   fit:'Regular fit',
  //   materialCare:'Dry clean only',
  //   productDescription:"If you're on the hunt for a shoe \nthat's got you covered in every way,\n look no further than the avant men's rainbow sports shoes. These shoes combine performance, comfort, durability, and style to suit a variety of sports. Get ready to conquer your activities with confidence and flair!",
  // },
  // {
  //   id:5,
  //   category:'bestSaled',
  //   brandName:'Beige Blazer',
  //   productName:'Women satin Formal Blazer',
  //   image:'http://surl.li/nscxp',
  //   rating:4.8,
  //   discount:'0',
  //   price:2899,
  //   mrp:3299,
  //   country:'India',
  //   wearType:'formals',
  //   Fabric:'Polyviscode with Satin Lining',
  //   sleeves:'Full Sleeves',
  //   fit:'Regular fit',
  //   materialCare:'Dry clean only',
  //   productDescription:"If you're on the hunt for a shoe \nthat's got you covered in every way,\n look no further than the avant men's rainbow sports shoes. These shoes combine performance, comfort, durability, and style to suit a variety of sports. Get ready to conquer your activities with confidence and flair!",
  // },
  // {
  //   id:6,
  //   category:'bestSaled',
  //   brandName:'Beige Blazer',
  //   productName:'Women satin Formal Blazer',
  //   image:'http://surl.li/nsczp',
  //   rating:4.8,
  //   discount:'0',
  //   price:2899,
  //   mrp:3299,
  //   country:'India',
  //   wearType:'formals',
  //   Fabric:'Polyviscode with Satin Lining',
  //   sleeves:'Full Sleeves',
  //   fit:'Regular fit',
  //   materialCare:'Dry clean only',
  //   productDescription:"If you're on the hunt for a shoe \nthat's got you covered in every way,\n look no further than the avant men's rainbow sports shoes. These shoes combine performance, comfort, durability, and style to suit a variety of sports. Get ready to conquer your activities with confidence and flair!",
  // },

]  
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

    //for sorting filter  
    const [sortBy,setSortBy]=useState("asc");
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
    const [productIds, setProductIds]=useState([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,104]);

    //order ReceiptData
    const [receiptData,setReceiptData]=useState([]);

    const [checkproductAvailabilityAtPincode1,setCheckproductAvailabilityAtPincode1]=useState(false);


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

        checkproductAvailabilityAtPincode1,
        setCheckproductAvailabilityAtPincode1

        
    }
    return (
        <WomenContext.Provider value={contextvalue}>
          {children}  
        </WomenContext.Provider>
    );
}