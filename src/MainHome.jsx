import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, SafeAreaView, Modal, 
  Dimensions } from 'react-native';
import back from './PlpScreen/images/back.png';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import home1 from './PlpScreen/images/home1.png';
import categories1 from './PlpScreen/images/category1.png';
import bell1 from './PlpScreen/images/bell1.png';
import user1 from './PlpScreen/images/user1.png';
import { useCartContext } from './Context/WomenContext';
import Home1 from './Fashion';
import HomeBar from './HomeBar';
import ProfileBar from './ProfileBar';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import user from './PlpScreen/images/user3.png';
import shop from './PlpScreen/images/shop1.png';
import refer from './PlpScreen/images/refer1.png';
import offer from './PlpScreen/images/offer1.png';
import discount from './PlpScreen/images/discount1.png';
import coupon from './PlpScreen/images/coupon1.png';
import play from './PlpScreen/images/play1.png';
import next from './PlpScreen/images/next.png';
import correct from './PlpScreen/images/correct.png';
import { useLoginContext } from './Login/LoginCartProvider';

const Tab1 = createMaterialTopTabNavigator();

const Tab = createBottomTabNavigator();

// function HomeBar({navigation})
// {
 
//   const {setProducts,setCartItem,profileAddress,setProfileAddress,setWishListData,setAllSavedAddress,setIsItForPlaceOrder}=useCartContext();
  
//   const {ip,token,setLoginUserId,pushToStack, setCurrentPage,currentPage,
//     popFromStack,currentPageIndexCategory,setCurrentPageIndexCategory} = useLoginContext();

//   // Ref for flatlist
//   const flatlistRef = useRef();
  
//   // Screen width for layout
//   const screenWidth = Dimensions.get('window').width - 1;
  
//   // State for the active index of the carousel
//   const [activeIndex, setActiveIndex] = useState(0);

  



//   useEffect(() => {

// //getting WishList Data
// const getWishListData = async () => {
//   try {
//     const response = await axios.get(`http://${ip}:5454/api/wishlist/`, {
//       headers: {
//         'Authorization': `Bearer ${token}`,         
//        },
//     });
//     console.log(response.data);
//     setWishListData((prevProducts) => {
//       const newProducts = response.data;
//       console.log("ProfiledataArray:" + JSON.stringify(newProducts));
//       return newProducts;
//     });
//     console.log("\n\n\nTOKEN:"+token);
//   } catch (error) {
//     console.error('Error fetching WishListdata:', error);
//   }
// }


    
// //getting profile Adddress
//     const getProfileData = async () => {
//       try {
//         const response = await axios.get(`http://${ip}:5454/api/users/profile`, {
//           headers: {
//             'Authorization': `Bearer ${token}`,         
//            },
//         });
//         // console.log(response.data);
        
//         setProfileAddress((prevProducts) => {
//           const newProducts = response.data;
//           // console.log("ProfiledataArray:" + JSON.stringify(newProducts));
//           return newProducts;
//         }); 
        
//         setAllSavedAddress((prevProducts) => {
//           const newProducts = response.data.addresses;
//           console.log("ProfiledataArray:" + JSON.stringify(newProducts));
//           return newProducts;
//         });
//         console.log("\n\n\nAddress"+JSON.stringify(response.data.addresses));
        
//         console.log("\n\n\nTOKEN:"+token);
//       } catch (error) {
//         console.error('Error fetching Profiledata:', error);
//       }
//     }
  
   

//     const getData = async () => {
//       try {
//         const response = await axios.get(`http://${ip}:5454/api/admin/products/all`, {
//           headers: {
//             'Authorization': `Bearer ${token}`,         
//            },
//         });
//         // console.log(response.data);
//         setProducts((prevProducts) => {
//           const newProducts = response.data;
          
//           // console.log("dataArray:" + JSON.stringify(newProducts));
//           return newProducts;
//         });
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     }
//     const getCartData = async () => {
//       try {
//         const response = await axios.get(`http://${ip}:5454/api/cart/`, {
//           headers: {
//             'Authorization': `Bearer ${token}`,         
//            },
//          });
//         // console.log(response.data);
//         setCartItem((prevProducts) => {
//           const newProducts = response.data;
          
//           // console.log("dataArray:" + JSON.stringify(newProducts));
//           return newProducts;
//         });
//         // console.log("\n\n\nTOKEN:"+token);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     }

//     //get Order Data
//     const getOrder=async()=>{
//       try {
//         const response = await axios.get(`http://${ip}:5454/api/orders/user`, {
//           headers: {
//             'Authorization': `Bearer ${token}`,         
//           },
//         });
  
//         // Handle the response data
      
       
//       } catch (error) {
//         // Handle errors
//         console.error('Error fetching Placed1Orderdata:', error);
//       }
//     }

//     getData();
//     getCartData();
//     getProfileData();
//     getWishListData();
//     getOrder();
//   }, [token]);



//   // Auto Scroll
//   useEffect(() => {
//     let interval = setInterval(() => {
//       // Scroll logic for auto-scrolling
//       if (activeIndex === carouselData.length - 1) {
//         flatlistRef.current.scrollToIndex({
//           index: 0,
//           animated: true,
//         });
//       } else {
//         flatlistRef.current.scrollToIndex({
//           index: (activeIndex + 1) % carouselData.length,
//           animated: true,
//         });
//       }
//     }, 2000);
    
//     // Cleanup the interval on component unmount
//     return () => clearInterval(interval);
//   }, [activeIndex]);

//   // Function to calculate layout for flatlist items
//   const getItemLayout = (_, index) => ({
//     length: screenWidth,
//     offset: screenWidth * index,
//     index,
//   });

//   // Data for the carousel
//   const carouselData = [
//     { id: 1, image: add1 },
//     { id: 2, image: add2 },
//     { id: 3, image: add3 },
//     { id: 4, image: add4 },
//     { id: 5, image: add5 },
//   ];

//   // Display Images
//   const renderItem = ({ item, index }) => (
//     <View style={{}}>
//       <View style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 6, padding: 8 }}>
//         <TouchableOpacity>
//           <Image source={item.image} style={{ width: 395, height: 220 }} />
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
 
  

//   // Handle Scroll
//   const handleScroll = (event) => {
//     const scrollPosition = event.nativeEvent.contentOffset.x;
//     // Use Math.round to get the correct active index
//     const index = Math.round(scrollPosition / screenWidth);
//     setActiveIndex(index);
//   };

//   // Render Dot Indicators
//   const renderDotIndicators = () => (
//     carouselData.map((dot, index) => (
//       <View
//         key={index}
//         style={{
//           backgroundColor: activeIndex === index ? '#00338D' : '#D5D5D5',
//           height: 10,
//           width: 10,
//           borderRadius: 5,
//           marginHorizontal: 6,
//         }}
//       />
//     ))
//   );

//     const data1 = [
//         { id: '1', source: brand1 },
//         { id: '2', source: brand2 },
//         { id: '3', source: brand3 },
//         { id: '4', source: brand4 },
//         { id: '5', source: brand5},
//         { id: '6', source: brand6 },
//         // Add more images as needed
//       ];
//       const data2 = [
//         { id: '1', source: bestSell1 },
//         { id: '2', source: bestSell2 },
//         { id: '3', source: bestSell3  },
//         { id: '4', source: bestSell4  },
//         { id: '5', source: bestSell5  },
//         { id: '6', source: bestSell6  },
//         // Add more images as needed
//       ];

//       const data3 = [
//         { id: '1', source: 'http://surl.li/nrpwq' },
//         { id: '2', source: 'http://surl.li/nrpee' },
//         { id: '3', source: 'http://surl.li/nrpee'},
//         { id: '4', source: 'http://surl.li/nrpwq' },
//         { id: '5', source: 'http://surl.li/nrpwq' },
//         { id: '6', source: 'http://surl.li/nrpwq' },
//         { id: '7', source: 'http://surl.li/nrpwq' },
//         { id: '8', source: 'http://surl.li/nrpee' },
//         // Add more images as needed
//       ];
//       const data4 = [
//         { id: '1', source: 'http://surl.li/nspkc' },
//         { id: '2', source: 'http://surl.li/nrqaa' },
//         { id: '3', source: 'http://surl.li/nspjm' },
//         { id: '4', source: 'http://surl.li/nsppt' },
//         { id: '5', source: 'http://surl.li/nspmp'},
//         { id: '6', source: 'http://surl.li/nspkc' },
//         { id: '7', source: 'http://surl.li/nrpwq' },
//         { id: '8', source: 'http://surl.li/nrqaa' },
//         { id: '9', source: 'http://surl.li/nspjm' },
//         { id: '10', source: 'http://surl.li/nsppt' },
//         { id: '11', source: 'http://surl.li/nspmp'},
//         { id: '12', source: 'http://surl.li/nrpwq' },
//         // Add more images as needed
//       ];
//       const data5 = [
//           { id:'1',image:[quickshop,quickshop,quickshop]},
//           { id:'2',image:[quickshop,quickshop]},    
//           { id:'3',image:[quickshop,quickshop]},
//           { id:'4',image:[quickshop,quickshop]},
//           { id:'5',image:[quickshop,quickshop]},
//           { id:'6',image:[quickshop,quickshop]},
//       ];
//       const [isModalVisible, setModalVisible] = useState(false);

//       const toggleModal = () => {
//         setModalVisible(!isModalVisible);
//       };
//       // function Fashion(){
//       //   pushToStack('Fashion');
//       //   navigation.navigate('Fashion');
//       // }
//       const Fashion=(page)=>{
//         console.log(page+" "+currentPage[currentPage.length-1]);
//         if(currentPage && currentPage[currentPage.length-1]!==page){
//           pushToStack(page);
//           navigation.navigate(page)
//         }else{
//           popFromStack(navigation);
//         }
//       }
//       setLoginUserId(profileAddress.id);


//   return (
//         <>
//  <ScrollView>       
    
    
//     <View style={{ flexDirection: 'column',backgroundColor:'white' }}>
//     {/* <Text>{currentPage}</Text> */}

//         <TopBar navigation={navigation}/>
//         {/* <Text>{JSON.stringify(loginUserId)}</Text> */}
//         <View style={styles.horizontalLine1}/>
//          <View style={{flexDirection:'row',padding:10,justifyContent:'space-evenly',marginLeft:'6%'}}>
//            <TouchableOpacity
//               onPress={()=>{Fashion('Fashion')}}
//              >
//               <Image source={fashion} style={{width:72,height:80,borderRadius:12,borderColor:'#00338D',borderWidth:0.4,}}/>
//               <Text style={{textAlign:'center',fontWeight:'bold',color:'#00338D',fontSize:13,padding:12}}>FASHION</Text>
//            </TouchableOpacity>
//            <TouchableOpacity 
//               onPress={()=>{navigation.navigate('GroceryHome')}}>
//               <Image source={grocery} style={{width:72,height:80,borderRadius:12,borderColor:'#00338D',borderWidth:0.4,marginLeft:'24%',}}/>
//               <Text style={{textAlign:'center',fontWeight:'bold',color:'#00338D',fontSize:13,padding:12}}>GROCERIES</Text>
//            </TouchableOpacity>
//            <TouchableOpacity>
//               <Image source={beauty} style={{width:72,height:80,borderRadius:12,borderColor:'#00338D',borderWidth:0.4,marginLeft:'7%',}}/>
//               <Text style={{textAlign:'center',fontWeight:'bold',color:'#00338D',fontSize:13,padding:12}}>BEAUTY</Text>
//            </TouchableOpacity>
//            <TouchableOpacity
//              style={{marginLeft:'3%'}}
//              >
//               <Image source={electronics} style={{width:82,height:80,borderRadius:12,marginLeft:'10%',borderColor:'#00338D',borderWidth:0.4}}/>
//               <Text style={{textAlign:'center',fontWeight:'bold',color:'#00338D',padding:11,fontSize:13,marginRight:'4%'}}>ELECTRONICS</Text>
//            </TouchableOpacity>
//         </View>


//     <SafeAreaView>
//     <FlatList
//      nestedScrollEnabled={true}
//      data={carouselData}
//      ref={flatlistRef}
//      horizontal={true}
//      pagingEnabled={true}
//      onScroll={handleScroll}
//      getItemLayout={getItemLayout}
//      keyExtractor={(item) => item.id.toString()} // Use toString() to ensure it's a string
//      showsHorizontalScrollIndicator={false}
//      renderItem={renderItem}
// />
  
//   </SafeAreaView>
//       <View
//         style={{flexDirection:'row',justifyContent:'center',marginTop:30}}
//         >
//        {renderDotIndicators()}
//       </View>  
 

//       <View style={{flexDirection:'row',paddingTop:10,padding:4,justifyContent:'space-evenly'}}>
//          <View style={{flexDirection:'row'}}>
//             <Image source={discount} style={{width:30,height:30,alignItems:'center',}}/>
//             <Text style={{color:'#005EBB',alignItems:'center',fontSize:13,paddingLeft:3}}>Amazing Deals {'\n'} & Offers</Text>
//          </View>
//          <View style={{flexDirection:'row'}}>
//             <Image source={selfcheckout} style={{width:35,height:35}}/>
//             <Text style={{color:'#005EBB',flexWrap:'wrap',fontSize:13,paddingLeft:3}}>Store Self{'\n'} Checkout</Text>
//          </View>
//          <View style={{flexDirection:'row'}}>
//             <Image source={pickup} style={{width:35,height:35,alignItems:'center',}}/>
//             <Text style={{color:'#005EBB',alignItems:'center',fontSize:13,paddingLeft:3}}>Express Store {'\n'}Pickup</Text>
//          </View>
//       </View>
//       <View style={styles.horizontalLine1}/>



//       <View style={{}}>
//  <View style={{padding:'2%',}}>

//         {/* <View style={{flexDirection:'row'}}> 
//       <SafeAreaView>
//         <FlatList
//         nestedScrollEnabled={true}
//         data={data4}
//         horizontal={true}
//         showsHorizontalScrollIndicator={false} // Optional: hide horizontal scrollbar
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <TouchableOpacity style={{marginStart:10}}>  
//             <Image source={{uri:item.source}} style={{width:80,height:80,borderRadius:50}} />
//           </TouchableOpacity>
//         )}
//     />   
// </SafeAreaView>
//        </View>    */}
//      </View>

//  </View>





    
//  <View style={{backgroundColor:'#f7f8fc',marginLeft:'4%',marginBottom:'3%'}}>
//     <Text style={{color:'#00338D',fontSize:14,fontWeight:'500',marginBottom:'3%'}}>DEALS ON TOP BRANDS</Text>
//     <View style={{flexDirection:'row',paddingRight:'3%'}}> 
//       <SafeAreaView>
//         <FlatList
//         nestedScrollEnabled={true}
//         data={data1}
//         horizontal={true}
//         showsHorizontalScrollIndicator={false} // Optional: hide horizontal scrollbar
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//         <TouchableOpacity style={{marginStart:10}}>  
//           <Image source={item.source} style={{width:100,height:130,borderRadius:12,paddingRight:'2%'}} />
//         </TouchableOpacity>
//       )}
//     />   
// </SafeAreaView>
//      </View>

//  </View>



//        <TouchableOpacity style={{justifyContent:'center',alignItems:'center',paddingTop:25}}>
//          <Image source={banner1} style={{width:395,height:300}}/>
//        </TouchableOpacity>
//        <View style={{backgroundColor:'#f7f8fc',marginTop:'4%'}}>

//        <View style={{paddingTop:30,padding:10,}}>
//         <Text style={{color:'#00338D',fontSize:14,fontWeight:'500'}}>BEST SELLERS</Text>
//         <View style={{flexDirection:'row'}}> 
//       <View style={{justifyContent:'center'}}>
//          <Image source={scrollarrow}/>
//       </View>
//       <SafeAreaView>
//         <FlatList
//         nestedScrollEnabled={true}
//         data={data2}
//         horizontal={true}
//         showsHorizontalScrollIndicator={false} // Optional: hide horizontal scrollbar
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//         <TouchableOpacity
//         onPress={()=>navigation.navigate('mainPDP',{ category: 'Men Formal', id: item.id })}  
//          style={{marginStart:10,padding:8}}>  
//           <Image source={item.source} style={{width:120,height:150,borderRadius:12}} />
//         </TouchableOpacity>
//       )}
//     />   
// </SafeAreaView>

//        </View>    
//      </View>
//     </View> 

//      <View style={{paddingTop:30,padding:10,}}>
//         <Text style={{color:'#00338D',fontSize:14,fontWeight:'500'}}>SLASH & SAVE ON TOP BEAUTY PRODUCTS</Text>
//         <TouchableOpacity style={{justifyContent:'center',alignItems:'center',paddingTop:10}}>
//          <Image source={banner2} style={{width:395,height:200}}/>
//        </TouchableOpacity>
//      </View>

//      {/* <View style={{backgroundColor:'#f7f8fc',marginTop:'4%'}}>
//      <View style={{padding:'3%',}}>
//         <Text style={{color:'#00338D',fontSize:14,fontWeight:'500'}}>BUDGET BUYS</Text>
//       <View style={{flexDirection:'row',marginTop:'1%'}}> 
//       <SafeAreaView>
//         <FlatList
//         nestedScrollEnabled={true}
//         data={data3}
//         numColumns={4}
//         showsHorizontalScrollIndicator={false} // Optional: hide horizontal scrollbar
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//         <TouchableOpacity style={{marginStart:2,padding:4}}>  
//           <Image source={{uri:item.source}} style={{width:85,height:107,borderRadius:12,marginBottom:'5%'}} />
//         </TouchableOpacity>
//       )}
//     />   
// </SafeAreaView>

//        </View>  
//      </View>
//      </View>
//  */}

     
//      <View style={{marginTop:'4%'}}>
//         <Image source={cashback} style={{width:395,}}/>
//      </View>

//      <View style={{paddingTop:30,padding:10,}}>
//         <Text style={{color:'#00338D',fontSize:17,fontWeight:'500'}}>PLAY & EARN</Text>
//         <View style={{flexDirection:'row',justifyContent:'space-evenly'}}>
//              <View>
//                 <Image source={playearn1} style={{width:150,height:100}}/>
//              </View>
//              <View>
//                 <Image source={playearn2} style={{width:180,height:100}}/>
//              </View>
//         </View>
//     </View>
    

//     <View style={{paddingTop:10,padding:10,justifyContent:'center',flexDirection:'row'}}>
//         <Image source={fortune} style={{}}/>
//     </View>
//   </View>

// </ScrollView>
// </>
//   )
// }
function CategoryBar({navigation})
{
  const {token,products,categorySelect, setCategorySelect, setProducts}=useCartContext();
  const ChooseCategory=(catg)=>{
     setCategorySelect(catg);
  }
 // useEffect(() => {
 //   const getData = async () => {
 //     try {
 //       const response = await axios.get("http://192.168.1.101:5454/api/admin/products/all", {
 //         headers: {
 //           'Authorization': `Bearer ${token}`,
 //         },
 //       });
 //       console.log(response.data);
 //       setProducts((prevProducts) => {
 //         const newProducts = response.data;
         
 //         console.log("dataArray:" + newProducts.length);
 //         return newProducts;
 //       });
 //     } catch (error) {
 //       console.error('Error fetching data:', error);
 //     }
 //   }
 
 //   getData();
 // }, [token]);


  const targetCategory =
  categorySelect === 1 ? 'Men Formal' :
  categorySelect === 2 ? 'Grocery' :
  categorySelect === 3 ? 'Women Formal' :
  categorySelect === 4 ? 'Kids' :
  categorySelect === 5 ? 'Beauty' :
  categorySelect === 6 ? 'Gift Card' :
  'Men Formal';

  const filteredDataArray = products.filter(
   (product) => product.category.name === targetCategory
 );

 products.forEach(product => {
   const categoryName = product.category.name;
  //  console.log('Category Name:', categoryName);
 });
 
//  console.log("CategoryData"+products);

 

 return (
   <>
  <View style={{ flex: 1, backgroundColor: 'white' }}>
     <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: '1%', paddingTop: '7%' }}>
       <TouchableOpacity
         onPress={() => {
            
         }}
       >
         <View style={{ flexDirection: 'row', alignItems: 'center' }}>
           <View>
             <Image source={back} style={{ marginLeft: 12 }} />
           </View>
           <View>
             <Text style={{ paddingLeft: 10, color: 'black' }}>All Categories</Text>
           </View>
         </View>
       </TouchableOpacity>
     </View>
  
    </View> 
   </>
 );
}
function product({item,navigation})
{
   return (
    <>
      <View style={styles.mainRow}>
        <TouchableOpacity
             onPress={()=>navigation.navigate('mainPDP',{ category: item.category, id: item.id })}     
          >
            <View style={{marginTop:'10%',padding:'1%',marginLeft:'10%'}}>
                 <Image source={{ uri: item.imageUrl }}  style={{ width: 120, height: 150, borderRadius: 10,}} />
            </View>
           </TouchableOpacity> 
           <View style={{marginLeft:'6%',padding:'2%'}}>
                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                  <Text style={{fontWeight:'500',fontSize:13,color:'black',marginTop:'3%'}}>{item.brand}</Text>
                  <View style={{flexDirection:'row',alignItems:'center'}}>
                  </View>
                </View>
                 <Text style={{fontSize:11,color:'#2E2E2E',marginTop:'1%'}}>{item.title}</Text>
                 <View style={{marginTop:'2%'}}>
                       <Text style={{color:'grey',textDecorationLine: 'line-through',fontSize:12}}> ₹ {item.price}</Text>                        
                       <Text style={{color:'black',fontWeight:'bold',fontSize:13}}>₹{item.discountedPrice}</Text>
                 </View>
                 {item.discountPersent===0?
                   <Text style={{color:'#A4343A'}}></Text>:
                   <Text style={{color:'#A4343A'}}>{item.discountPersent}% OFF</Text>
                 }
            </View>
          
      </View>
    </>
   );
}
function NotificationBar({navigation})
{
  const{popFromStack,}=useLoginContext();

  function forNavigate(page) {
    pushToStack(page);
    navigation.navigate(page);
  }
  function AllNotification(){
    return(<>
      <View style={{flex:1,backgroundColor:'white'}}>
        <View style={{marginTop:'3%',width:'100%',height:420,}}>
          <View style={{borderColor:'#00338D',borderWidth:0.5,width:'100%',flexDirection:'row',backgroundColor:'#f5f2f2',height:70}}>
            <View style={{width:'100%',flexDirection:'row',alignItems:'center'}}>
              <View style={{marginLeft:'2%'}}>
                <Image source={play} style={{width:24,height:24,}}/>
              </View>
              <View style={{marginLeft:'2%'}}>
                  <Text style={{color:'black',}}>Play & Earn Rewards. 
                    <Text style={{textDecorationLine:'underline',fontWeight:'300',color:'#00338D',fontSize:12}}> Play now</Text>
                  </Text>
                  <Text style={{fontSize:11.5,color:'#00A3A1',marginTop:'4%'}}>12hr ago</Text>
              </View>
              <Image source={next} style={{width:10,height:10,marginLeft:'38%'}}/>
            </View>
          </View>

          <View style={{borderColor:'#00338D',borderWidth:0.5,width:'100%',flexDirection:'row',backgroundColor:'white',height:70}}>
            <View style={{width:'100%',flexDirection:'row',alignItems:'center'}}>
              <View style={{marginLeft:'2%'}}>
                <Image source={offer} style={{width:24,height:24,}}/>
              </View>
              <View style={{marginLeft:'2%'}}>
                  <Text style={{color:'black',}}>25% discount on Women Kurta's. 
                    <Text style={{textDecorationLine:'underline',fontWeight:'300',color:'#00338D',fontSize:12}}> Shop now</Text>
                  </Text>
                  <Text style={{fontSize:11.5,color:'#00A3A1',marginTop:'4%'}}>15hr ago</Text>
              </View>
              <Image source={next} style={{width:10,height:10,marginLeft:'20%'}}/>
            </View>
          </View>

          <View style={{borderColor:'#00338D',borderWidth:0.5,width:'100%',flexDirection:'row',backgroundColor:'#f5f2f2',height:70}}>
            <View style={{width:'100%',flexDirection:'row',alignItems:'center'}}>
              <View style={{marginLeft:'2%'}}>
                <Image source={coupon} style={{width:24,height:24,}}/>
              </View>
              <View style={{marginLeft:'2%'}}>
                  <Text style={{color:'black',}}>Slash and Save more this April. 
                    <Text style={{textDecorationLine:'underline',fontWeight:'300',color:'#00338D',fontSize:12}}> Know more</Text>
                  </Text>
                  <Text style={{fontSize:11.5,color:'#00A3A1',marginTop:'4%'}}>2 days ago</Text>
              </View>
              <Image source={next} style={{width:10,height:10,marginLeft:'20%'}}/>
            </View>
          </View>

          <View style={{borderColor:'#00338D',borderWidth:0.5,width:'100%',flexDirection:'row',backgroundColor:'white',height:70}}>
            <View style={{width:'100%',flexDirection:'row',alignItems:'center'}}>
              <View style={{marginLeft:'2%'}}>
                <Image source={shop} style={{width:24,height:24,}}/>
              </View>
              <View style={{marginLeft:'2%'}}>
                  <Text style={{color:'black',}}>Order Delivered Successfully. 
                    <Text style={{textDecorationLine:'underline',fontWeight:'300',color:'#00338D',fontSize:12}}> Know more</Text>
                  </Text>
                  <Text style={{fontSize:11.5,color:'#00A3A1',marginTop:'4%'}}>2 weeks ago</Text>
              </View>
              <Image source={next} style={{width:10,height:10,marginLeft:'22%'}}/>
            </View>
          </View>
          <View style={{borderColor:'#00338D',borderWidth:0.5,width:'100%',flexDirection:'row',backgroundColor:'#f5f2f2',height:70}}>
            <View style={{width:'100%',flexDirection:'row',alignItems:'center'}}>
              <View style={{marginLeft:'2%'}}>
                <Image source={correct} style={{width:24,height:24,}}/>
              </View>
              <View style={{marginLeft:'2%'}}>
                  <Text style={{color:'black',}}>Order Placed Successfully. 
                    <Text style={{textDecorationLine:'underline',fontWeight:'300',color:'#00338D',fontSize:12}}> View more</Text>
                  </Text>
                  <Text style={{fontSize:11.5,color:'#00A3A1',marginTop:'4%'}}>3 weeks ago</Text>
              </View>
              <Image source={next} style={{width:10,height:10,marginLeft:'27%'}}/>
            </View>
          </View>

          <View style={{borderColor:'#00338D',borderWidth:0.5,width:'100%',flexDirection:'row',backgroundColor:'white',height:70}}>
            <View style={{width:'100%',flexDirection:'row',alignItems:'center'}}>
              <View style={{marginLeft:'2%'}}>
                <Image source={user} style={{width:24,height:24,}}/>
              </View>
              <View style={{marginLeft:'2%'}}>
                  <Text style={{color:'black',}}>Update your profile. 
                    <Text style={{textDecorationLine:'underline',fontWeight:'300',color:'#00338D',fontSize:12}}> View</Text>
                  </Text>
                  <Text style={{fontSize:11.5,color:'#00A3A1',marginTop:'4%'}}>5 weeks ago</Text>
              </View>
              <Image source={next} style={{width:10,height:10,marginLeft:'46%'}}/>
            </View>
          </View>
          <View style={{borderColor:'#00338D',borderWidth:0.5,width:'100%',flexDirection:'row',backgroundColor:'#f5f2f2',height:70}}>
            <View style={{width:'100%',flexDirection:'row',alignItems:'center'}}>
              <View style={{marginLeft:'2%'}}>
                <Image source={refer} style={{width:24,height:24,}}/>
              </View>
              <View style={{marginLeft:'2%'}}>
                  <Text style={{color:'black',}}>Refer & Earn Reward coins. 
                    <Text style={{textDecorationLine:'underline',fontWeight:'300',color:'#00338D',fontSize:12}}> Refer now</Text>
                  </Text>
                  <Text style={{fontSize:11.5,color:'#00A3A1',marginTop:'4%'}}>10 weeks ago</Text>
              </View>
              <Image source={next} style={{width:10,height:10,marginLeft:'27%'}}/>
            </View>
          </View>
          <View style={{borderColor:'#00338D',borderWidth:0.5,width:'100%',flexDirection:'row',backgroundColor:'white',height:70}}>
            <View style={{width:'100%',flexDirection:'row',alignItems:'center'}}>
              <View style={{marginLeft:'2%'}}>
                <Image source={discount} style={{width:24,height:24,}}/>
              </View>
              <View style={{marginLeft:'2%'}}>
                  <Text style={{color:'black',}}>Republic Day Sale is Live. 
                    <Text style={{textDecorationLine:'underline',fontWeight:'300',color:'#00338D',fontSize:12}}> Shop now.</Text>
                  </Text>
                  <Text style={{fontSize:11.5,color:'#00A3A1',marginTop:'4%'}}>46 weeks ago</Text>
              </View>
              <Image source={next} style={{width:10,height:10,marginLeft:'29%'}}/>
            </View>
          </View>
        </View>
      </View>
    </>);
  }
  function AllOrders(){
    return(<>
      <View style={{flex:1,backgroundColor:'white'}}>
      <View style={{borderColor:'#00338D',borderWidth:0.5,width:'100%',flexDirection:'row',backgroundColor:'white',height:70}}>
            <View style={{width:'100%',flexDirection:'row',alignItems:'center'}}>
              <View style={{marginLeft:'2%'}}>
                <Image source={discount} style={{width:24,height:24,}}/>
              </View>
              <View style={{marginLeft:'2%'}}>
                  <Text style={{color:'black',}}>Republic Day Sale is Live. 
                    <Text style={{textDecorationLine:'underline',fontWeight:'300',color:'#00338D',fontSize:12}}> Shop now.</Text>
                  </Text>
                  <Text style={{fontSize:11.5,color:'#00A3A1',marginTop:'4%'}}>46 weeks ago</Text>
              </View>
              <Image source={next} style={{width:10,height:10,marginLeft:'29%'}}/>
            </View>
          </View>        
      </View>
    </>);
  }
  function AllOffers(){
    return(<>
      <View style={{flex:1,backgroundColor:'white'}}>
      <View style={{borderColor:'#00338D',borderWidth:0.5,width:'100%',flexDirection:'row',backgroundColor:'white',height:70}}>
            <View style={{width:'100%',flexDirection:'row',alignItems:'center'}}>
              <View style={{marginLeft:'2%'}}>
                <Image source={offer} style={{width:24,height:24,}}/>
              </View>
              <View style={{marginLeft:'2%'}}>
                  <Text style={{color:'black',}}>25% discount on Women Kurta's. 
                    <Text style={{textDecorationLine:'underline',fontWeight:'300',color:'#00338D',fontSize:12}}> Shop now</Text>
                  </Text>
                  <Text style={{fontSize:11.5,color:'#00A3A1',marginTop:'4%'}}>15hr ago</Text>
              </View>
              <Image source={next} style={{width:10,height:10,marginLeft:'20%'}}/>
            </View>
          </View>
      </View>
    </>);    
  }
  return(<>
            <View style={{flex:1,backgroundColor:'white'}}>
            <View style={{marginLeft:'5%',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
             <TouchableOpacity
                onPress={() => forNavigate('mainHome')}>
                <Image
                  source={{ uri: 'https://shorturl.at/ckGU2' }}
                  style={{ width: 100, height: 100 }}                />
             </TouchableOpacity>
             </View>
             <View style={{ flexDirection: 'row', alignItems: 'center',}}>
              <TouchableOpacity onPress={() => popFromStack(navigation)}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {/* <Image source={back} style={{ marginLeft: 12 }} /> */}
                 <Text style={{ marginLeft: '10%',color:'black',fontSize:16,fontWeight:'400'}}>Notifications</Text>
               </View>
             </TouchableOpacity>
             </View>
             <Tab1.Navigator
  initialRouteName="AllNotification"
  screenOptions={{
    tabBarActiveTintColor: 'white',
    tabBarInactiveTintColor: 'grey',
    tabBarLabelStyle: { fontSize: 12 },
    tabBarStyle: {
      backgroundColor: '#00338D', 
      borderColor: 'grey', // Border color
      borderWidth: 0.4,      // Border width
      marginTop:'4%',
      width:'93%',
      borderTopLeftRadius:15,
      borderTopRightRadius:15,
      borderBottomRightRadius:10,
      borderBottomLeftRadius:10,
      marginLeft:'3%',
      marginRight:'3%',
      borderColor:'grey'
    },
    tabBarLabelStyle: {
      fontWeight: 'bold', // Make the font bold for the selected tab
    }
  }}

>
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

  </>);

}


// function ProfileBar({navigation})
// {
//   const {ip,mobileNumber, 
//     emailId,gender,userName,
//     loginUserId} = useLoginContext();
//     const {token,popFromStack,pushToStack,
//       currentPage, setCurrentPage,
//       currentPageIndex,setCurrentPageIndex,
//       currentPageIndexCategory,setCurrentPageIndexCategory,
//       updateUserName,setUpdateUserName,
// updateMobileName,setUpdateMobileName,
// updateEmail,setUpdateEmail,updateGender,setUpdateGender,
// updatePassword,setUpdatePassword}=useLoginContext();     
//     const forNavigate=(page)=>{
//      {
//         console.log(page+" "+currentPage[currentPage.length-1]);
//         if(currentPage && currentPage[currentPage.length-1]!==page){
//           pushToStack(page);
//           navigation.navigate(page)
//         }else{
//           popFromStack(navigation);
//         }  
//       }
//     }
//   const [logOut, setLogOut] = useState(false);
//   const {userprofile,setUserProfile,setUserName,mobile,setMobile,setIsItForPlaceOrder}=useCartContext();
//   const [sortModalVisible, setSortModalVisible] = useState(false);


  
//   useEffect(()=>{

//     getData();
    
//   },[token,mobile,userName]);
//   // console.log("userProfike"+JSON.stringify(userprofile.mobile));
//   const getData = async () => {
//     let profileData;
//     try {
//       const response = await axios.get(`http://${ip}:5454/api/users/profile`, {
//         headers: {
//           'Authorization': `Bearer ${token}`,         
//         },
//       });
//       profileData=response.data;
//       // Handle the response data
//       setUserProfile(response.data);
//       // setMobile(profileData.mobile);
//       // setUserName(profileData.firstName +" "+profileData.lastName);
//       // console.log(JSON.stringify("Profile:"+JSON.stringify(response.data.mobile))+"\n"+JSON.stringify(userprofile.mobile));
//       setUpdateMobileName(profileData.mobile);
//       setUpdateEmail(profileData.email);     
//       setUpdateUserName(profileData.firstName + (profileData.lastName ? ` ${profileData.lastName}` : ''));
//     } catch (error) {
//       // Handle errors
//       console.error('Error fetching data:', error);
//     }
//   }

//   const handleSortModalClose = () => {
//     // Additional logic to handle sorting or other actions
    
//       setSortModalVisible(false);
    
//   };

//   const {  homeIcon, setHomeIcon,setCategoryIcon,
//          setBellIcon,setUserIcon} = useLoginContext();
 
//         const [password,setPassword]=useState("");
//         const [confirmPassword,setConfirmPassword]=useState("");  
//         const [seePassword,setSeePassword]=useState(true);
//         const [seePassword1,setSeePassword1]=useState(true);
      
//         function homeFooter(){
//           if(!homeIcon){
//             setBellIcon(false);
//             setCategoryIcon(false);
//             setUserIcon(false);
//             setHomeIcon(true);
           
//           }
//        }

//        const handleLogOutPress = () => {
//         setSortModalVisible(true);
//       };

//       function logOutExit(){
//         navigation.reset({
//           index: 0,
//           routes: [{ name: 'SignIn' }],
//         });  
//       }
//     return (
//         <>
// <View style={{ flex: 1, backgroundColor: 'white' }}>   
//   <ScrollView >    
//    {/* <Text>{JSON.stringify(userprofile)}</Text> */}
//     <View style={styles.profileContainer}>
//     <Image source={kpmg} style={{width:100,height:60,alignSelf:'center'}}/>

//       <View style={{flexDirection:'row',marginTop:'8%',}}>
//       <Image source={
//           userprofile.gender==="male"?profile1:
//           userprofile.gender==="emale"?profile1:profile1
//         } style={{width:40,height:40,marginTop:'8%',marginRight:'5%'}}/>

//         <View style={{marginTop:'8%'}}>
//             <Text style={styles.txt2}>
//                 Name: {updateUserName} 
//             </Text>
//             <Text style={styles.txt2}>Email: {updateEmail}</Text>
//             <Text style={styles.txt2}>Mobile: {updateMobileName}</Text>
//             <Text style={styles.txt2}>Referral Code: sharekpmgindia/ref-11</Text>

//         </View>
//         <View>
//         <TouchableOpacity style={{marginTop:'8%'}} 
//          onPress={()=>{forNavigate('userProfile')}}>

//           <Image source={edit} style={{width:18,height:18,marginLeft:'38%',marginTop:'11%'}}/>
//           </TouchableOpacity>

//           <Image source={referral} style={{width:18,height:18,marginLeft:'38%',marginTop:'29%'}}/>
//         </View>

//       </View>  

//     </View>

//     <TouchableOpacity
//        style={{
//             flex: 1, // Adjust as needed based on your layout
//             justifyContent: 'flex-end', // Align the content at the bottom of the parent container
//           }}
//        >
//   <TouchableOpacity
//       style={{
//          backgroundColor: '#e8e8e8',
//          marginTop: '-5%',
//          marginBottom: 10,
//          width: '70%',
//          alignSelf: 'center',
//          height: 40,
//          borderRadius: 5,
//          shadowColor: '#000',
//          shadowOffset: {
//          width: 0,
//          height: 4,
//        },
//         shadowOpacity: 0.3,
//         shadowRadius: 4,
//         elevation: 5, // This is for Android
//       }}
//     >
//     <Text
//       style={{
//           textAlign: 'center',
//           padding: '3%',
//           color: 'black',
//           fontWeight: '500',
//        }}
//     >
//       Change Password
//     </Text>
//   </TouchableOpacity>
// </TouchableOpacity>

// <TouchableOpacity
//   style={{
//     flex: 1,
//     justifyContent: 'flex-end',
//   }}
// >
//   <TouchableOpacity
//     style={{
//       backgroundColor: '#e8e8e8',
//       marginTop: '5%',
//       marginBottom: 10,
//       width: '90%',
//       alignSelf: 'center',
//       height: 40,
//       borderRadius: 5,
//       flexDirection: 'row', // Set flexDirection to 'row'
//       justifyContent: 'space-between',
//       alignItems: 'center', // Align items in the center vertically
//       shadowColor: '#000',
//       shadowOffset: {
//         width: 0,
//         height: 4,
//       },
//       shadowOpacity: 0.3,
//       shadowRadius: 4,
//       elevation: 5, // This is for Android
//     }}
//   >
//     <Text
//       style={{
//         textAlign: 'center',
//         padding: '3%',
//         color: 'black',
//         fontWeight: '400',
//       }}
//     >
//       My Offers
//     </Text>
//     <Image source={plus1} style={{ marginRight: 10,width:15,height:15 }} />
//   </TouchableOpacity>
// </TouchableOpacity><TouchableOpacity
//   style={{
//     flex: 1,
//     justifyContent: 'flex-end',
//   }}
// >
//   <TouchableOpacity
//     style={{
//       backgroundColor: '#e8e8e8',
//       marginTop: '2%',
//       marginBottom: 10,
//       width: '90%',
//       alignSelf: 'center',
//       height: 40,
//       borderRadius: 5,
//       flexDirection: 'row', // Set flexDirection to 'row'
//       justifyContent: 'space-between',
//       alignItems: 'center', // Align items in the center vertically
//       shadowColor: '#000',
//       shadowOffset: {
//         width: 0,
//         height: 4,
//       },
//       shadowOpacity: 0.3,
//       shadowRadius: 4,
//       elevation: 5, // This is for Android
//     }}
//   >
//     <Text
//       style={{
//         textAlign: 'center',
//         padding: '3%',
//         color: 'black',
//         fontWeight: '400',
//       }}
//     >
//      My Rewards
//     </Text>
//     <Image source={plus1} style={{ marginRight: 10,width:15,height:15 }} />
//   </TouchableOpacity>
// </TouchableOpacity><TouchableOpacity
//   style={{
//     flex: 1,
//     justifyContent: 'flex-end',
//   }}
// >
//   <TouchableOpacity
//     style={{
//       backgroundColor: '#e8e8e8',
//       marginTop: '2%',
//       marginBottom: 10,
//       width: '90%',
//       alignSelf: 'center',
//       height: 40,
//       borderRadius: 5,
//       flexDirection: 'row', // Set flexDirection to 'row'
//       justifyContent: 'space-between',
//       alignItems: 'center', // Align items in the center vertically
//       shadowColor: '#000',
//       shadowOffset: {
//         width: 0,
//         height: 4,
//       },
//       shadowOpacity: 0.3,
//       shadowRadius: 4,
//       elevation: 5, // This is for Android
//     }}
//   >
//     <Text
//       style={{
//         textAlign: 'center',
//         padding: '3%',
//         color: 'black',
//         fontWeight: '400',
//       }}
//     >
//       My Subscriptions
//     </Text>
//     <Image source={plus1} style={{ marginRight: 10,width:15,height:15 }} />
//   </TouchableOpacity>
// </TouchableOpacity>
// <TouchableOpacity
//   onPress={() => forNavigate('Payment1')}
//   style={{
//     flex: 1,
//     justifyContent: 'flex-end',
//   }}
// >
//   <TouchableOpacity
//     onPress={() => forNavigate('Payment1')}
//     style={{
//       backgroundColor: '#e8e8e8',
//       marginTop: '2%',
//       marginBottom: 10,
//       width: '90%',
//       alignSelf: 'center',
//       height: 40,
//       borderRadius: 5,
//       flexDirection: 'row', // Set flexDirection to 'row'
//       justifyContent: 'space-between',
//       alignItems: 'center', // Align items in the center vertically
//       shadowColor: '#000',
//       shadowOffset: {
//         width: 0,
//         height: 4,
//       },
//       shadowOpacity: 0.3,
//       shadowRadius: 4,
//       elevation: 5, // This is for Android
//     }}
//   >
//     <Text
//       style={{
//         textAlign: 'center',
//         padding: '3%',
//         color: 'black',
//         fontWeight: '400',
//       }}
//     >
//       My Payments
//     </Text>
//     <Image source={plus1} style={{ marginRight: 10,width:15,height:15 }} />
//   </TouchableOpacity>
// </TouchableOpacity><TouchableOpacity
//   style={{
//     flex: 1,
//     justifyContent: 'flex-end',
//   }}
// >
//   <TouchableOpacity
//     style={{
//       backgroundColor: '#e8e8e8',
//       marginTop: '2%',
//       marginBottom: 10,
//       width: '90%',
//       alignSelf: 'center',
//       height: 40,
//       borderRadius: 5,
//       flexDirection: 'row', // Set flexDirection to 'row'
//       justifyContent: 'space-between',
//       alignItems: 'center', // Align items in the center vertically
//       shadowColor: '#000',
//       shadowOffset: {
//         width: 0,
//         height: 4,
//       },
//       shadowOpacity: 0.3,
//       shadowRadius: 4,
//       elevation: 5, // This is for Android
//     }}
//   >
//     <Text
//       style={{
//         textAlign: 'center',
//         padding: '3%',
//         color: 'black',
//         fontWeight: '400',
//       }}
//     >
//       My Wallet
//     </Text>
//     <Image source={plus1} style={{ marginRight: 10,width:15,height:15 }} />
//   </TouchableOpacity>
// </TouchableOpacity>
// <TouchableOpacity
//  onPress={()=>{forNavigate('order')}}
//   style={{
//     flex: 1,
//     justifyContent: 'flex-end',
//   }}
// >
//   <TouchableOpacity
//    onPress={()=>{forNavigate('order')}}
//     style={{
//       backgroundColor: '#e8e8e8',
//       marginTop: '2%',
//       marginBottom: 10,
//       width: '90%',
//       alignSelf: 'center',
//       height: 40,
//       borderRadius: 5,
//       flexDirection: 'row', // Set flexDirection to 'row'
//       justifyContent: 'space-between',
//       alignItems: 'center', // Align items in the center vertically
//       shadowColor: '#000',
//       shadowOffset: {
//         width: 0,
//         height: 4,
//       },
//       shadowOpacity: 0.3,
//       shadowRadius: 4,
//       elevation: 5, // This is for Android
//     }}
//   >
//     <Text
//       style={{
//         textAlign: 'center',
//         padding: '3%',
//         color: 'black',
//         fontWeight: '400',
//       }}
//     >
//       My Orders
//     </Text>
//     <Image source={plus1} style={{ marginRight: 10,width:15,height:15 }} />
//   </TouchableOpacity>
// </TouchableOpacity><TouchableOpacity
//   style={{
//     flex: 1,
//     justifyContent: 'flex-end',
//   }}
// >
//   <TouchableOpacity
//     style={{
//       backgroundColor: '#e8e8e8',
//       marginTop: '2%',
//       marginBottom: 10,
//       width: '90%',
//       alignSelf: 'center',
//       height: 40,
//       borderRadius: 5,
//       flexDirection: 'row', // Set flexDirection to 'row'
//       justifyContent: 'space-between',
//       alignItems: 'center', // Align items in the center vertically
//       shadowColor: '#000',
//       shadowOffset: {
//         width: 0,
//         height: 4,
//       },
//       shadowOpacity: 0.3,
//       shadowRadius: 4,
//       elevation: 5, // This is for Android
//     }}
//   >
//     <Text
//       style={{
//         textAlign: 'center',
//         padding: '3%',
//         color: 'black',
//         fontWeight: '400',
//       }}
//     >
//       Play & Earn
//     </Text>
//     <Image source={plus1} style={{ marginRight: 10,width:15,height:15 }} />
//   </TouchableOpacity>
// </TouchableOpacity><TouchableOpacity
//   style={{
//     flex: 1,
//     justifyContent: 'flex-end',
//   }}
// >
//   <TouchableOpacity
//     style={{
//       backgroundColor: '#e8e8e8',
//       marginTop: '2%',
//       marginBottom: 10,
//       width: '90%',
//       alignSelf: 'center',
//       height: 40,
//       borderRadius: 5,
//       flexDirection: 'row', // Set flexDirection to 'row'
//       justifyContent: 'space-between',
//       alignItems: 'center', // Align items in the center vertically
//       shadowColor: '#000',
//       shadowOffset: {
//         width: 0,
//         height: 4,
//       },
//       shadowOpacity: 0.3,
//       shadowRadius: 4,
//       elevation: 5, // This is for Android
//     }}
//   >
//     <Text
//       style={{
//         textAlign: 'center',
//         padding: '3%',
//         color: 'black',
//         fontWeight: '400',
//       }}
//     >
//       Notifications
//     </Text>
//     <Image source={plus1} style={{ marginRight: 10,width:15,height:15 }} />
//   </TouchableOpacity>
// </TouchableOpacity>

// <TouchableOpacity
//         onPress={() => {
//           setIsItForPlaceOrder(false);
//           forNavigate('orderSummary');
//         }}
//   style={{
//     flex: 1,
//     justifyContent: 'flex-end',
//   }}
// >
//   <TouchableOpacity
//          onPress={() => {
//           setIsItForPlaceOrder(false);
//           forNavigate('orderSummary');
//         }}
//     style={{
//       backgroundColor: '#e8e8e8',
//       marginTop: '2%',
//       marginBottom: 10,
//       width: '90%',
//       alignSelf: 'center',
//       height: 40,
//       borderRadius: 5,
//       flexDirection: 'row', // Set flexDirection to 'row'
//       justifyContent: 'space-between',
//       alignItems: 'center', // Align items in the center vertically
//       shadowColor: '#000',
//       shadowOffset: {
//         width: 0,
//         height: 4,
//       },
//       shadowOpacity: 0.3,
//       shadowRadius: 4,
//       elevation: 5, // This is for Android
//     }}
//   >
//     <Text
//       style={{
//         textAlign: 'center',
//         padding: '3%',
//         color: 'black',
//         fontWeight: '400',
//       }}
//     >
//       My Addresses
//     </Text>
//     <Image source={plus1} style={{ marginRight: 10,width:15,height:15 }} />
//   </TouchableOpacity>
// </TouchableOpacity><TouchableOpacity
//   style={{
//     flex: 1,
//     justifyContent: 'flex-end',
//   }}
// >
//   <TouchableOpacity
//     style={{
//       backgroundColor: '#e8e8e8',
//       marginTop: '2%',
//       marginBottom: 10,
//       width: '90%',
//       alignSelf: 'center',
//       height: 40,
//       borderRadius: 5,
//       flexDirection: 'row', // Set flexDirection to 'row'
//       justifyContent: 'space-between',
//       alignItems: 'center', // Align items in the center vertically
//       shadowColor: '#000',
//       shadowOffset: {
//         width: 0,
//         height: 4,
//       },
//       shadowOpacity: 0.3,
//       shadowRadius: 4,
//       elevation: 5, // This is for Android
//     }}
//   >
//     <Text
//       style={{
//         textAlign: 'center',
//         padding: '3%',
//         color: 'black',
//         fontWeight: '400',
//       }}
//     >
//       Store Locator
//     </Text>
//     <Image source={plus1} style={{ marginRight: 10,width:15,height:15 }} />
//   </TouchableOpacity>
// </TouchableOpacity><TouchableOpacity
//   style={{
//     flex: 1,
//     justifyContent: 'flex-end',
//   }}
// >
//   <TouchableOpacity
//     style={{
//       backgroundColor: '#e8e8e8',
//       marginTop: '2%',
//       marginBottom: 10,
//       width: '90%',
//       alignSelf: 'center',
//       height: 40,
//       borderRadius: 5,
//       flexDirection: 'row', // Set flexDirection to 'row'
//       justifyContent: 'space-between',
//       alignItems: 'center', // Align items in the center vertically
//       shadowColor: '#000',
//       shadowOffset: {
//         width: 0,
//         height: 4,
//       },
//       shadowOpacity: 0.3,
//       shadowRadius: 4,
//       elevation: 5, // This is for Android
//     }}
//   >
//     <Text
//       style={{
//         textAlign: 'center',
//         padding: '3%',
//         color: 'black',
//         fontWeight: '400',
//       }}
//     >
//       Need Help
//     </Text>
//     <Image source={plus1} style={{ marginRight: 10,width:15,height:15 }} />
//   </TouchableOpacity>
// </TouchableOpacity>
// <TouchableOpacity
//   onPress={handleLogOutPress}
//   style={{
//     flex: 1,
//     justifyContent: 'flex-end',
//   }}
// >
//   <TouchableOpacity
//    onPress={handleLogOutPress}
//     style={{
//       backgroundColor: '#e8e8e8',
//       marginTop: '3%',
//       marginBottom: 10,
//       width: '90%',
//       alignSelf: 'center',
//       height: 40,
//       borderRadius: 5,
//       flexDirection: 'row', // Set flexDirection to 'row'
//       justifyContent: 'space-between',
//       alignItems: 'center', // Align items in the center vertically
//       shadowColor: '#000',
//       shadowOffset: {
//         width: 0,
//         height: 4,
//       },
//       shadowOpacity: 0.3,
//       shadowRadius: 4,
//       elevation: 5, // This is for Android
//     }}
//   >
//     <Text
//       style={{
//         textAlign: 'center',
//         padding: '3%',
//         fontWeight: '400',
//         color:'#A4343A'
//       }}
//     >
//       Log Out
//     </Text>
//   </TouchableOpacity>
// </TouchableOpacity>
// <Modal animationType="slide" transparent={true} visible={sortModalVisible} onRequestClose={handleSortModalClose}>
//           <TouchableWithoutFeedback onPress={handleSortModalClose}>
//             <View style={styles.modalContainer}>
//               <View style={styles.modalContent}>
//                 <View>
//                   <Text style={{alignItems:'center',color:'black',fontWeight:'700',textAlign:'center',fontSize:16.5}}>Do you want{"\n"} to logout?</Text>
//                   <View style={{ width: '100%', borderBottomWidth: 0.8, borderColor: '#dbd9d9',marginTop:'17%' }}></View>
//                   <TouchableOpacity
//                    style={{flexDirection:'row',justifyContent:'center'}}
//                    onPress={()=>{logOutExit()}}>
//                     <Text style={{color:'red',padding:'4%'}}>Log Out</Text>
//                   </TouchableOpacity>
//                   <View style={{ width: '100%', borderBottomWidth: 0.8, borderColor: '#dbd9d9',marginTop:'1%' }}></View>
//                   <TouchableOpacity
//                    style={{flexDirection:'row',justifyContent:'center'}}
//                    onPress={()=>{setSortModalVisible(false)}}>
//                     <Text style={{color:'black',padding:'4%'}}>Cancel</Text>
//                   </TouchableOpacity>
//                 </View>
//               </View>
//             </View>
//           </TouchableWithoutFeedback>
//         </Modal>  

// <Text style={{marginLeft:'8%',color:'#00338D',fontSize:14,marginTop:'1%',fontWeight:'300'}}>FAQ</Text>
// <Text style={{marginLeft:'8%',color:'#00338D',fontSize:14,marginTop:'4%',fontWeight:'300'}}>About Us</Text>
// <Text style={{marginLeft:'8%',color:'#00338D',fontSize:14,marginTop:'4%',fontWeight:'300'}}>Term of Use</Text>
// <Text style={{marginLeft:'8%',color:'#00338D',fontSize:14,marginTop:'4%',fontWeight:'300',marginBottom:'8%'}}>Privacy Policy</Text>

//     </ScrollView>
//   </View>     
//       </>
  
//   )
// }



function MainHome({navigation}) {

  const {userprofile}=useCartContext();
  return (
    <Tab.Navigator 
      tabBarOptions={{
        activeTintColor: '#00338D',
        showIcon: true,
        labelStyle: {
            margin:1,  
           fontSize: 10, // Adjust label font size as needed
           marginBottom:4
         },
         tabStyle: {
            height: 50, // Adjust the height as needed
          },
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeBar} 
        options={{
          headerShown: false,
          tabBarLabel: 'home',
          tabBarIcon: ({ color, size }) => (
            <Image 
              source={home1}
              style={{ width: 20, height: 20, tintColor: color }}
            />
          ),
        }}
      />
      <Tab.Screen 
        name="Home1" 
        component={Home1} 
        options={{
          headerShown: false,
          tabBarLabel: 'Category',
          tabBarIcon: ({ color, size }) => (
            <Image 
              source={categories1}
              style={{ width: 20, height: 20, tintColor: color }}
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
          tabBarIcon: ({ color, size }) => (
            <Image 
              source={bell1}
              style={{ width: 20, height: 20, tintColor: color }}
            />
          ),
        }}
        listeners={({ navigation }) => ({
            tabPress: (e) => {
              // Prevent default action
              // e.preventDefault();
    
              // Do something with the `navigation` object
              // navigation.navigate("Elastic"); // Here!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            },
          })}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileBar} 
        options={{
          headerShown: false,
          tabBarLabel: userprofile?.firstName || 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Image 
              source={user1}
              style={{ width: 20, height: 20, tintColor: color }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default MainHome

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingRight: 16,
  },
  container: {
    marginTop: 30,
    paddingLeft: '4%',
    width: '20%',
    flexDirection: 'row',
    backgroundColor:'red'
  },
  columnContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryItem: {
    width: '100%', // Adjust as needed
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
    fontWeight:'bold'
  },
  verticalLine: {
    width: 1,
    backgroundColor: '#d1cfcf',
    height: '100%',
    marginLeft: '28%', // Adjust as needed
  },
  column2:{
   width:'485%',
   marginLeft:'2%',
  },
  mainRow:{
  },
  profileContainer:{
    padding:'9%',
    backgroundColor:'#00338D',
    marginBottom:'1%'
 },
 txt1:{
     fontSize:18,
     color:'white',
     padding:'0.5%'
 },
 txt2:{
     fontSize:14,
     color:'white',
     padding:'0.5%',
     fontWeight:'200'
 },
 txt3:{
     fontSize:15,
     color:'#52514e',
     marginLeft:'5%'
 },    
 txt4:{
     fontSize:15,
     color:'#52514e',
     marginLeft:'5%',
     color:'#A4343A'
 },

 row2:{
     marginTop:'0.8%',
     justifyContent:'space-between'
 },
 column:{
     flexDirection:'row',
     justifyContent:'space-between',
     alignItems:'center',
     padding:15,
     borderColor:'#e6e3e3',
     borderTopWidth:1
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
   marginTop:'10%',
   backgroundColor: 'white',
   padding: 20,
   bottom:0,
   position:'fixed',
   borderRadius: 10,
   backgroundColor:'white',
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
})