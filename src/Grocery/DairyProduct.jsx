
import { StyleSheet, Text, View, FlatList, TouchableOpacity, TouchableHighlight ,Image, ScrollView, SafeAreaView, Modal, Alert, TouchableWithoutFeedback } from 'react-native'
import React, { useState, useEffect, useMemo } from 'react';
import { useCartContext } from '../Context/WomenContext';
import TopBar from '../PlpScreen/TopBar';
import back from '../PlpScreen/images/back.png';
import star2 from '../PlpScreen/images/star2.png';
import close from '../close3.png';
import { RadioButton } from 'react-native-paper';
import checkSymbol from '../PlpScreen/images/checkSymbol.png';
import love1 from '../PlpScreen/images/love1.png'
import love2 from '../PlpScreen/images/love2.png'
import TopBar1 from '../TopBar1.jsx';
import calender from '../PlpScreen/images/calendar2.png'
import axios from 'axios';
import { useLoginContext } from '../Login/LoginCartProvider';
import filter from '../PlpScreen/images/filter.png'
import CheckBox from '@react-native-community/checkbox';
import cross from '../PlpScreen/images/close.png';
import check1 from '../PlpScreen/images/check11.png';
import check2 from '../PlpScreen/images/check22.png';
import { useGroceryContext } from './GroceryContext.jsx';


    const data=[
        {
            id:1,
            title:"Plain Yogurt",
            image:['https://shorturl.at/kvyAF'],
            quantity:'250 gm',
            discountedPrice:95,
            price:110,
            discountPercent:"5%"
        },
        {
            id:2,
            title:"Blue Berry Yogurt",
            image:['https://shorturl.at/kvyAF'],
            quantity:'1 lt',
            discountedPrice:129,
            price:145,
            discountPercent:""
        },
        {
            id:3,
            title:"Milk",
            image:['https://shorturl.at/kvyAF'],
            quantity:'1 lt',
            discountedPrice:89,
            price:99,
            discountPercent:""
        },
        {
            id:4,
            title:"Slim Fit Milk",
            image:['https://shorturl.at/kvyAF'],
            quantity:'500 gm',
            discountedPrice:103,
            price:110,
            discountPercent:""
        },
        {
            id:5,
            title:"Milk",
            image:['https://shorturl.at/kvyAF'],
            quantity:'250gm',
            discountedPrice:89,
            price:99,
            discountPercent:' '
        },
        {
            id:6,
            title:"Paneer",
            image:['https://shorturl.at/kvyAF'],
            quantity:'500 gm',
            discountedPrice:165,
            price:195,
            discountPercent:""
        },
        {
            id:7,
            title:"Flavored Milk",
            image:['https://shorturl.at/kvyAF'],
            quantity:'1 lt',
            discountedPrice:156,
            price:160,
            discountPercent:""
        },  
    ]

    

    export default function DairyProduct({navigation}) {

        const {ip,token,popFromStack,pushToStack,
            currentPage, setCurrentPage,
            currentPageIndex,setCurrentPageIndex,
            currentPageIndexCategory,setCurrentPageIndexCategory,
            currentPageIndexCategory1,setCurrentPageIndexCategory1,loginUserId,setLoginUserId}=useLoginContext();      

            const {
                products,
                setProducts,
                dataArray,
                setDataArray,
                sortBy,
                setSortBy,
                wishListData,
                setWishListData,
                seeMoreFilter,setSeeMoreFilter,
                seeMoreFilterCatefory,setSeeMoreFilterCategory,
                productIds,filteredDataArray, setFilteredDataArray,
                backUpPageIndex,setBackUpPageIndex,
                lovedItems, setLovedItems
                
              } = useCartContext();
    
        const{walletBalance,addedMoney,setAddedMoney}=useCartContext();
        const {groceryAllProduct,setGroceryAllProduct,subscribedGroceryProductId,setSubscribedGroceryProductId,setIsRequestedForSubscriptionExtend,setSubscribedSelectedDatesCount}=useGroceryContext();


        const [selectedItems, setSelectedItems] = useState([]);
        const [selectHeart,setSelectHeart]=useState([]);
        const [selectedProduct,setSelectedProduct]=useState([]);
        const [proIndex,setProIndex]=useState(0);

        const handlePress = (item) => {
        if (selectedItems.includes(item.id)) {
            setSelectedItems(selectedItems.filter((id) => id !== item.id));
        } else {
            setSelectedItems([...selectedItems, item.id]);
        }
        };
        const isItemSelected = (itemId) => selectedItems.includes(itemId);
    
        const AddToWishList = (item) => {
        
            if (selectHeart.includes(item.id)) {
            // Item is already selected, so remove it from the list
            setSelectHeart(selectHeart.filter((id) => id !== item.id));
            } else {
            // Item is not selected, so add it to the list
            setSelectHeart([...selectHeart, item.id]);
            }
        };
    const ProductDetail=(item)=>{
        if (selectedProduct.includes(item.id)) {
        // Item is already selected, so remove it from the list
        setSelectedProduct(selectedProduct.filter((id) => id !== item.id));
        } else {
        // Item is not selected, so add it to the list
        setProIndex(item.id);
        setSelectedProduct([...selectedProduct, item.id]);
        }  
    }
    
    const forNavigate=(page)=>{
        console.log(page+" "+currentPage[currentPage.length-1]);
        if(currentPage && currentPage[currentPage.length-1]!==page){
        pushToStack(page);
        navigation.navigate(page)
        }else{
        popFromStack(navigation);
        }
    } 
  async function getCart() {
    try {
      const response = await axios.get(`http://${ip}:5454/api/cart/`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
      setCartItem(response.data);
      console.log("\nThis is cartItem"+JSON.stringify(cartItem));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }  

    const getWishListData = async () => {
        try {
          const response = await axios.get(`http://${ip}:5454/api/wishlist/`, {
            headers: {
              'Authorization': `Bearer ${token}`,         
            },
          });
          
          setLovedItems(response.data.wishlistItems.map(wishlistItem => wishlistItem.product.id));
          // setWishListData((prevProducts) => {
          //   const newProducts = response.data;
          //   const mergedProducts = [...prevProducts, ...newProducts];
          //   console.log("WishlistdataArray:" + JSON.stringify(mergedProducts));
          //   return mergedProducts;
          // });
         setWishListData((prevProducts) => {
            const newProducts = response.data;
            // console.log("\n\n\nWishList:" + JSON.stringify(newProducts));
            return newProducts;
          });      
      
          // console.log("\n\n\nTOKEN:" + token);
        } catch (error) {
          console.error('Error fetching WishListdata:', error);
        }
      };
      const addToWish=async(itemId,size,targetCategory)=>{

        // console.log("\n\n\n"+targetCategory);
        const data={
          productId:itemId,
          size:size,
          quantity:1,
          category:targetCategory,
       }
      
          try {
            const response = await axios.put(`http://${ip}:5454/api/wishlist/add`, data, {
              headers: {
                'Authorization': `Bearer ${token}`,         
               },
            });
            // console.log(response.data);
            // ((prevProducts) => {
            //   const newProducts = response.data;
            //   console.log("\n\n\nWishList:" + JSON.stringify(newProducts));
            //   return newProducts;
            // });
            getWishListData();
          } catch (error) {
            console.error('Error fetching WishListdata:', error);
          }
         
        }
      const handleLovePress = async (itemId,size,targetCategory) => {
        // console.log("Current loved items:", lovedItems);
      
        const isLoved = lovedItems.includes(itemId);
        // console.log("Is loved?", isLoved);
      
        const newLovedItems = isLoved ? lovedItems.filter((id) => id !== itemId) : [...lovedItems, itemId];
        // console.log("New loved items:", newLovedItems);
      
        setLovedItems(newLovedItems);
      
        if (isLoved) {
          // console.log("\n\n\n\nRemoving from wishlist:", itemId);
          removeBagItem(itemId);
        } else {
          // console.log("Adding to wishlist:", itemId);
          addToWish(itemId,size,targetCategory);
        }
      };
       
      const getGroceryProduct=async()=>{
        const header = {
            'Authorization': `Bearer ${token}`,
          };
          try {
            const response = await axios.get(`http://${ip}:5454/api/admin/products/all`, { headers: header });
            // Filter products with parent category "grocery"

            setGroceryAllProduct(response.data.filter(item=>
              item.category.name==='dairyProducts'  
            ));
          } catch (error) {
            console.log('Error fetching profile:', error);
            // Handle the error as needed
          }
      }

       useEffect(()=>{
         getGroceryProduct();
       },[token]);

       const [sortModalVisible, setSortModalVisible] = useState(false);
       const [filterModalVisible, setFilterModalVisible] = useState(false);
       const handleSortPress = () => {
        setSortModalVisible(true);
      };
    
      const handleFilterPress = () => {
        setFilterModalVisible(true);
      };
    
      const handleSortModalClose = () => {
        // Additional logic to handle sorting or other actions
        setTimeout(() => {
          setSortModalVisible(false);
        }, 100);
      };


      const AddToCartBtn=async(targetId)=>{
        const dataBag = {
          productId: targetId,
          quantity: 1,
          category:'grocery',
        };
  
           axios.put(`http://${ip}:5454/api/cart/add`, dataBag, {
             headers: {
              'Authorization': `Bearer ${token}`,         
            },
          })
        .then(response => {
          // Handle successful response

          console.log(response.data);
      
        })
        .catch(error => {
          // Handle error
          console.error('Error making API requestjhjhjhjhj:', error);
        });
       }       
      
//notiication for moving product to bag  
const [isModalVisible, setModalVisible] = useState(false);
const handlePress1 = () => { 
    setModalVisible(true);
};
const closeModal = () => {
  setModalVisible(false);
};

       const [isProductInBag,setIsProductInBag]=useState(false);
      
        return (
        <>
        <TopBar navigation={navigation}/>


  
        <View style={{flex:1,backgroundColor:'white'}}>

            <TouchableOpacity
            onPress={()=>{popFromStack(navigation)}}
            style={{ flexDirection: 'row', alignItems: 'center' }}
            >
                <Image source={back} style={{ marginLeft: 12 }} />
            <View>
                <Text style={{ paddingLeft: 10, fontWeight: 'bold' }}>Dairy Products</Text>
            </View>
            </TouchableOpacity>


            <ScrollView>
            <SafeAreaView>
                <FlatList
                data={groceryAllProduct}
                vertical={true}
                nestedScrollEnabled={true}
                numColumns={2}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.container}>
                        <TouchableOpacity onPress={()=>{
                                                       setCurrentPageIndex(item.id);
                                                       setCurrentPageIndexCategory(item.category.name);
                                                       forNavigate('groceryPdpPage')}}>
                          <Image source={{ uri: item.imageUrl[0] }}    style={styles.image} />
                        </TouchableOpacity>
                        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                          <Text style={styles.itemName}>{item.title}</Text>
                          <TouchableOpacity onPress={()=>{
                                               handleLovePress(item.id,'50',item.category.name)
                                               lovedItems.includes(item.id)?forNavigate('WishList'):''
                                              }} style={{ position: 'absolute', top: 10, right: 10 }}>
                <Image  source={lovedItems.includes(item.id)?love1:love2}  style={{ height: 25, width: 25,marginTop:-150 }} />
               </TouchableOpacity>
                        </View>
                        <Text style={styles.quantity}>{item.quantity} ml</Text>
                        <Text style={styles.price}>₹{item.discountedPrice} /  <Text style={{textDecorationLine:'line-through',color:'rgba(0, 163, 161, 0.6)'}}>{item.price}</Text></Text>
                        <View style={styles.btnDescription}>
                           <TouchableOpacity onPress={()=>{
                                     forNavigate('scheduleSubscription')
                                     setSubscribedGroceryProductId(item.id)
                                     setIsRequestedForSubscriptionExtend(false);
                                     setSubscribedSelectedDatesCount(0);
                                      }}>
                             <Image source={calender} style={{height:25,width:25}}/> 
                           </TouchableOpacity> 
                           <TouchableOpacity style={styles.btn} onPress={() => {AddToCartBtn(item.id)}}>
                              <Text style={styles.btnText}>ADD TO CART</Text>
                           </TouchableOpacity>
                        </View>
                    </View>
                )}
                />
            </SafeAreaView>

            </ScrollView>
            

        </View> 
        </>
        );
    }
    const styles = StyleSheet.create({
        container:{
          margin:'4%'
        },
        image:{
            width: 40,
            height: 130, 
            padding: 70 
        },
        itemName:{
            color:'black',
            fontWeight:'500',
            fontSize:15,
            marginLeft:'4%'
        },
        quantity:{
            marginLeft:'4%',
            color:'black',
            fontSize:13
        },
        price:{
            color:'#00A3A1',
            fontSize:15,
            fontWeight:'600',
            marginLeft:'3%'
        },
        btn:{
         margin:'2%',   
         backgroundColor:'#00338D',
         padding:'3%',

         borderRadius:6
        },
        btnText:{
            textAlign:'center',
            color:'white',
            fontWeight:'500'
        },
        btnDescription:{
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'space-between',
            margin:'4%'
        }
    })