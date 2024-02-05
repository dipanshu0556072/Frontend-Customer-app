import React, { useEffect, useState,useRef } from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList, TouchableOpacity, Image, SafeAreaView, Modal, 
  Dimensions,TouchableWithoutFeedback } from 'react-native';
import axios from 'axios';
import edit from './PlpScreen/images/edit.png';
import kpmg from './PlpScreen/images/kpmglogo.png';
import profile1 from './Login/images/profile1.png';
import profile2 from './Login/images/profile2.png';
import profile3 from './Login/images/profile3.png';
import arrow from './Login/images/next.png'
import coupon from './Login/images/voucher.png';
import support from './Login/images/support.png';
import payment from './Login/images/wallet.png';
import box from './Login/images/box.png';
import account from './Login/images/skills.png';
import heart from './Login/images/heart.png';
import bell from './Login/images/bell.png';
import kpmg3 from './Login/images/kpmg3.png';
import exit from './Login/images/exit.png';
import location from './Login/images/location.png';
import { useLoginContext } from './Login/LoginCartProvider';
import back from './PlpScreen/images/back.png';
import grocery from './PlpScreen/images/grocery.jpeg';
import womens from './PlpScreen/images/womens.png';
import kid from './PlpScreen/images/kid.png';
import banner5 from './PlpScreen/images/banner2.png';
import star2 from './PlpScreen/images/star2.png';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Notification from './Notification';
import Profile from './Profile';
import Category from './Category';
import home1 from './PlpScreen/images/home1.png';
import home2 from  './PlpScreen/images/home2.png';
import categories1 from './PlpScreen/images/category1.png';
import categories2 from './PlpScreen/images/categories2.png';
import bell1 from './PlpScreen/images/bell1.png';
import bell2 from './PlpScreen/images/bell2.png';
import user1 from './PlpScreen/images/user1.png';
import user2 from './PlpScreen/images/user2.png';
import discount from './PlpScreen/images/discount.png';
import selfcheckout from './PlpScreen/images/selfcheckout.png';
import pickup from './PlpScreen/images/pickup.png';
import cashback from './PlpScreen/images/cashback.png';
import playearn1 from './PlpScreen/images/playearn1.png';
import playearn2 from './PlpScreen/images/playearn2.png';
import fortune from './PlpScreen/images/fortune.png';
import scrollarrow from './PlpScreen/images/scrollarrow.png';
import plus1 from './PlpScreen/plus.png';

import TopBar from './PlpScreen/TopBar';
import Footer from './Footer';
import quickshop from './PlpScreen/images/quickshop.jpeg';
import milk from './PlpScreen/images/milk.webp';
import milk1 from './PlpScreen/images/milk1.jpeg';
import milk2 from './PlpScreen/images/milk3.jpeg';
import beauty from './PlpScreen/images/beauty.webp';
import gift from './PlpScreen/images/gift.png';
import add1 from './PlpScreen/images/add1.png';
import add2 from './PlpScreen/images/add2.png';
import add3 from './PlpScreen/images/add3.png';
import add4 from './PlpScreen/images/add4.png';
import add5 from './PlpScreen/images/add5.png';
import banner1 from './PlpScreen/images/banner1.png';
import banner2 from './PlpScreen/images/banner2.png';
import brand1 from './PlpScreen/images/brand1.png';
import brand2 from './PlpScreen/images/brand2.png';
import brand3 from './PlpScreen/images/brand3.png';
import brand4 from './PlpScreen/images/brand4.png';
import brand5 from './PlpScreen/images/brand5.png';
import brand6 from './PlpScreen/images/brand6.png';
import bestSell1 from './PlpScreen/images/bestSell1.png';
import bestSell2 from './PlpScreen/images/bestSell2.png';
import bestSell3 from './PlpScreen/images/bestSell3.png';
import bestSell4 from './PlpScreen/images/bestSell4.png';
import bestSell5 from './PlpScreen/images/bestSell5.png';
import bestSell6 from './PlpScreen/images/bestSell6.png';
import fashion from './PlpScreen/images/fashion.jpeg';
import { useCartContext } from './Context/WomenContext';
import electronics from './PlpScreen/images/electronics.png';
import TopBar2 from './TopBar1';
import referral from './copy.png'
import { useNavigation } from 'react-router-dom';
import { useStepContext } from './StepNavigator';
import Home1 from './Fashion';
import { Alert } from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import { useColorScheme, StatusBar, Platform } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const Tab = createBottomTabNavigator();

function HomeBar({navigation})
{
 
  const {setProducts,setCartItem,profileAddress,setProfileAddress,setWishListData,setAllSavedAddress,setIsItForPlaceOrder}=useCartContext();
  
  const {ip,token,setLoginUserId,pushToStack, setCurrentPage,currentPage,
    popFromStack,currentPageIndexCategory,setCurrentPageIndexCategory} = useLoginContext();

  // Ref for flatlist
  const flatlistRef = useRef();
  
  // Screen width for layout
  const screenWidth = Dimensions.get('window').width - 1;
  
  // State for the active index of the carousel
  const [activeIndex, setActiveIndex] = useState(0);

  



  useEffect(() => {

//getting WishList Data
const getWishListData = async () => {
  try {
    const response = await axios.get(`http://${ip}:5454/api/wishlist/`, {
      headers: {
        'Authorization': `Bearer ${token}`,         
       },
    });
    console.log(response.data);
    setWishListData((prevProducts) => {
      const newProducts = response.data;
      console.log("ProfiledataArray:" + JSON.stringify(newProducts));
      return newProducts;
    });
    console.log("\n\n\nTOKEN:"+token);
  } catch (error) {
    console.error('Error fetching WishListdata:', error);
  }
}


    
//getting profile Adddress
    const getProfileData = async () => {
      try {
        const response = await axios.get(`http://${ip}:5454/api/users/profile`, {
          headers: {
            'Authorization': `Bearer ${token}`,         
           },
        });
        // console.log(response.data);
        
        setProfileAddress((prevProducts) => {
          const newProducts = response.data;
          // console.log("ProfiledataArray:" + JSON.stringify(newProducts));
          return newProducts;
        }); 
        
        setAllSavedAddress((prevProducts) => {
          const newProducts = response.data.addresses;
          console.log("ProfiledataArray:" + JSON.stringify(newProducts));
          return newProducts;
        });
        console.log("\n\n\nAddress"+JSON.stringify(response.data.addresses));
        
        console.log("\n\n\nTOKEN:"+token);
      } catch (error) {
        console.error('Error fetching Profiledata:', error);
      }
    }
  
   

    const getData = async () => {
      try {
        const response = await axios.get(`http://${ip}:5454/api/admin/products/all`, {
          headers: {
            'Authorization': `Bearer ${token}`,         
           },
        });
        // console.log(response.data);
        setProducts((prevProducts) => {
          const newProducts = response.data;
          
          // console.log("dataArray:" + JSON.stringify(newProducts));
          return newProducts;
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    const getCartData = async () => {
      try {
        const response = await axios.get(`http://${ip}:5454/api/cart/`, {
          headers: {
            'Authorization': `Bearer ${token}`,         
           },
         });
        // console.log(response.data);
        setCartItem((prevProducts) => {
          const newProducts = response.data;
          
          // console.log("dataArray:" + JSON.stringify(newProducts));
          return newProducts;
        });
        // console.log("\n\n\nTOKEN:"+token);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    //get Order Data
    const getOrder=async()=>{
      try {
        const response = await axios.get(`http://${ip}:5454/api/orders/user`, {
          headers: {
            'Authorization': `Bearer ${token}`,         
          },
        });
  
        // Handle the response data
      
       
      } catch (error) {
        // Handle errors
        console.error('Error fetching Placed1Orderdata:', error);
      }
    }

    getData();
    getCartData();
    getProfileData();
    getWishListData();
    getOrder();
  }, [token]);



  // Auto Scroll
  useEffect(() => {
    let interval = setInterval(() => {
      // Scroll logic for auto-scrolling
      if (activeIndex === carouselData.length - 1) {
        flatlistRef.current.scrollToIndex({
          index: 0,
          animated: true,
        });
      } else {
        flatlistRef.current.scrollToIndex({
          index: (activeIndex + 1) % carouselData.length,
          animated: true,
        });
      }
    }, 2000);
    
    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, [activeIndex]);

  // Function to calculate layout for flatlist items
  const getItemLayout = (_, index) => ({
    length: screenWidth,
    offset: screenWidth * index,
    index,
  });

  // Data for the carousel
  const carouselData = [
    { id: 1, image: add1 },
    { id: 2, image: add2 },
    { id: 3, image: add3 },
    { id: 4, image: add4 },
    { id: 5, image: add5 },
  ];

  // Display Images
  const renderItem = ({ item, index }) => (
    <View style={{}}>
      <View style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 6, padding: 8 }}>
        <TouchableOpacity>
          <Image source={item.image} style={{ width: 395, height: 220 }} />
        </TouchableOpacity>
      </View>
    </View>
  );
 
  

  // Handle Scroll
  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    // Use Math.round to get the correct active index
    const index = Math.round(scrollPosition / screenWidth);
    setActiveIndex(index);
  };

  // Render Dot Indicators
  const renderDotIndicators = () => (
    carouselData.map((dot, index) => (
      <View
        key={index}
        style={{
          backgroundColor: activeIndex === index ? '#00338D' : '#D5D5D5',
          height: 10,
          width: 10,
          borderRadius: 5,
          marginHorizontal: 6,
        }}
      />
    ))
  );

    const data1 = [
        { id: '1', source: brand1 },
        { id: '2', source: brand2 },
        { id: '3', source: brand3 },
        { id: '4', source: brand4 },
        { id: '5', source: brand5},
        { id: '6', source: brand6 },
        // Add more images as needed
      ];
      const data2 = [
        { id: '1', source: bestSell1 },
        { id: '2', source: bestSell2 },
        { id: '3', source: bestSell3  },
        { id: '4', source: bestSell4  },
        { id: '5', source: bestSell5  },
        { id: '6', source: bestSell6  },
        // Add more images as needed
      ];

      const data3 = [
        { id: '1', source: 'http://surl.li/nrpwq' },
        { id: '2', source: 'http://surl.li/nrpee' },
        { id: '3', source: 'http://surl.li/nrpee'},
        { id: '4', source: 'http://surl.li/nrpwq' },
        { id: '5', source: 'http://surl.li/nrpwq' },
        { id: '6', source: 'http://surl.li/nrpwq' },
        { id: '7', source: 'http://surl.li/nrpwq' },
        { id: '8', source: 'http://surl.li/nrpee' },
        // Add more images as needed
      ];
      const data4 = [
        { id: '1', source: 'http://surl.li/nspkc' },
        { id: '2', source: 'http://surl.li/nrqaa' },
        { id: '3', source: 'http://surl.li/nspjm' },
        { id: '4', source: 'http://surl.li/nsppt' },
        { id: '5', source: 'http://surl.li/nspmp'},
        { id: '6', source: 'http://surl.li/nspkc' },
        { id: '7', source: 'http://surl.li/nrpwq' },
        { id: '8', source: 'http://surl.li/nrqaa' },
        { id: '9', source: 'http://surl.li/nspjm' },
        { id: '10', source: 'http://surl.li/nsppt' },
        { id: '11', source: 'http://surl.li/nspmp'},
        { id: '12', source: 'http://surl.li/nrpwq' },
        // Add more images as needed
      ];
      const data5 = [
          { id:'1',image:[quickshop,quickshop,quickshop]},
          { id:'2',image:[quickshop,quickshop]},    
          { id:'3',image:[quickshop,quickshop]},
          { id:'4',image:[quickshop,quickshop]},
          { id:'5',image:[quickshop,quickshop]},
          { id:'6',image:[quickshop,quickshop]},
      ];
      const [isModalVisible, setModalVisible] = useState(false);

      const toggleModal = () => {
        setModalVisible(!isModalVisible);
      };
      // function Fashion(){
      //   pushToStack('Fashion');
      //   navigation.navigate('Fashion');
      // }
      const Fashion=(page)=>{
        console.log(page+" "+currentPage[currentPage.length-1]);
        if(currentPage && currentPage[currentPage.length-1]!==page){
          pushToStack(page);
          navigation.navigate(page)
        }else{
          popFromStack(navigation);
        }
      }
      setLoginUserId(profileAddress.id);


  return (
        <>
 <ScrollView>       
    
    
    <View style={{ flexDirection: 'column',backgroundColor:'white' }}>
    {/* <Text>{currentPage}</Text> */}

        <TopBar navigation={navigation}/>
        {/* <Text>{JSON.stringify(loginUserId)}</Text> */}
        <View style={styles.horizontalLine1}/>
         <View style={{flexDirection:'row',padding:10,justifyContent:'space-evenly',marginLeft:'6%'}}>
           <TouchableOpacity
              onPress={()=>{Fashion('Fashion')}}
             >
              <Image source={fashion} style={{width:72,height:80,borderRadius:12,borderColor:'#00338D',borderWidth:0.4,}}/>
              <Text style={{textAlign:'center',fontWeight:'bold',color:'#00338D',fontSize:13,padding:12}}>FASHION</Text>
           </TouchableOpacity>
           <TouchableOpacity 
              onPress={()=>{navigation.navigate('GroceryHome')}}>
              <Image source={grocery} style={{width:72,height:80,borderRadius:12,borderColor:'#00338D',borderWidth:0.4,marginLeft:'24%',}}/>
              <Text style={{textAlign:'center',fontWeight:'bold',color:'#00338D',fontSize:13,padding:12}}>GROCERIES</Text>
           </TouchableOpacity>
           <TouchableOpacity>
              <Image source={beauty} style={{width:72,height:80,borderRadius:12,borderColor:'#00338D',borderWidth:0.4,marginLeft:'7%',}}/>
              <Text style={{textAlign:'center',fontWeight:'bold',color:'#00338D',fontSize:13,padding:12}}>BEAUTY</Text>
           </TouchableOpacity>
           <TouchableOpacity
             style={{marginLeft:'3%'}}
             >
              <Image source={electronics} style={{width:82,height:80,borderRadius:12,marginLeft:'10%',borderColor:'#00338D',borderWidth:0.4}}/>
              <Text style={{textAlign:'center',fontWeight:'bold',color:'#00338D',padding:11,fontSize:13,marginRight:'4%'}}>ELECTRONICS</Text>
           </TouchableOpacity>
        </View>


    <SafeAreaView>
    <FlatList
     nestedScrollEnabled={true}
     data={carouselData}
     ref={flatlistRef}
     horizontal={true}
     pagingEnabled={true}
     onScroll={handleScroll}
     getItemLayout={getItemLayout}
     keyExtractor={(item) => item.id.toString()} // Use toString() to ensure it's a string
     showsHorizontalScrollIndicator={false}
     renderItem={renderItem}
/>
  
  </SafeAreaView>
      <View
        style={{flexDirection:'row',justifyContent:'center',marginTop:30}}
        >
       {renderDotIndicators()}
      </View>  
 

      <View style={{flexDirection:'row',paddingTop:10,padding:4,justifyContent:'space-evenly'}}>
         <View style={{flexDirection:'row'}}>
            <Image source={discount} style={{width:30,height:30,alignItems:'center',}}/>
            <Text style={{color:'#005EBB',alignItems:'center',fontSize:13,paddingLeft:3}}>Amazing Deals {'\n'} & Offers</Text>
         </View>
         <View style={{flexDirection:'row'}}>
            <Image source={selfcheckout} style={{width:35,height:35}}/>
            <Text style={{color:'#005EBB',flexWrap:'wrap',fontSize:13,paddingLeft:3}}>Store Self{'\n'} Checkout</Text>
         </View>
         <View style={{flexDirection:'row'}}>
            <Image source={pickup} style={{width:35,height:35,alignItems:'center',}}/>
            <Text style={{color:'#005EBB',alignItems:'center',fontSize:13,paddingLeft:3}}>Express Store {'\n'}Pickup</Text>
         </View>
      </View>
      <View style={styles.horizontalLine1}/>



      <View style={{}}>
 <View style={{padding:'2%',}}>

        {/* <View style={{flexDirection:'row'}}> 
      <SafeAreaView>
        <FlatList
        nestedScrollEnabled={true}
        data={data4}
        horizontal={true}
        showsHorizontalScrollIndicator={false} // Optional: hide horizontal scrollbar
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={{marginStart:10}}>  
            <Image source={{uri:item.source}} style={{width:80,height:80,borderRadius:50}} />
          </TouchableOpacity>
        )}
    />   
</SafeAreaView>
       </View>    */}
     </View>

 </View>





    
 <View style={{backgroundColor:'#f7f8fc',marginLeft:'4%',marginBottom:'3%'}}>
    <Text style={{color:'#00338D',fontSize:14,fontWeight:'500',marginBottom:'3%'}}>DEALS ON TOP BRANDS</Text>
    <View style={{flexDirection:'row',paddingRight:'3%'}}> 
      <SafeAreaView>
        <FlatList
        nestedScrollEnabled={true}
        data={data1}
        horizontal={true}
        showsHorizontalScrollIndicator={false} // Optional: hide horizontal scrollbar
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
        <TouchableOpacity style={{marginStart:10}}>  
          <Image source={item.source} style={{width:100,height:130,borderRadius:12,paddingRight:'2%'}} />
        </TouchableOpacity>
      )}
    />   
</SafeAreaView>
     </View>

 </View>



       <TouchableOpacity style={{justifyContent:'center',alignItems:'center',paddingTop:25}}>
         <Image source={banner1} style={{width:395,height:300}}/>
       </TouchableOpacity>
       <View style={{backgroundColor:'#f7f8fc',marginTop:'4%'}}>

       <View style={{paddingTop:30,padding:10,}}>
        <Text style={{color:'#00338D',fontSize:14,fontWeight:'500'}}>BEST SELLERS</Text>
        <View style={{flexDirection:'row'}}> 
      <View style={{justifyContent:'center'}}>
         <Image source={scrollarrow}/>
      </View>
      <SafeAreaView>
        <FlatList
        nestedScrollEnabled={true}
        data={data2}
        horizontal={true}
        showsHorizontalScrollIndicator={false} // Optional: hide horizontal scrollbar
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
        <TouchableOpacity
        onPress={()=>navigation.navigate('mainPDP',{ category: 'Men Formal', id: item.id })}  
         style={{marginStart:10,padding:8}}>  
          <Image source={item.source} style={{width:120,height:150,borderRadius:12}} />
        </TouchableOpacity>
      )}
    />   
</SafeAreaView>

       </View>    
     </View>
    </View> 

     <View style={{paddingTop:30,padding:10,}}>
        <Text style={{color:'#00338D',fontSize:14,fontWeight:'500'}}>SLASH & SAVE ON TOP BEAUTY PRODUCTS</Text>
        <TouchableOpacity style={{justifyContent:'center',alignItems:'center',paddingTop:10}}>
         <Image source={banner2} style={{width:395,height:200}}/>
       </TouchableOpacity>
     </View>

     {/* <View style={{backgroundColor:'#f7f8fc',marginTop:'4%'}}>
     <View style={{padding:'3%',}}>
        <Text style={{color:'#00338D',fontSize:14,fontWeight:'500'}}>BUDGET BUYS</Text>
      <View style={{flexDirection:'row',marginTop:'1%'}}> 
      <SafeAreaView>
        <FlatList
        nestedScrollEnabled={true}
        data={data3}
        numColumns={4}
        showsHorizontalScrollIndicator={false} // Optional: hide horizontal scrollbar
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
        <TouchableOpacity style={{marginStart:2,padding:4}}>  
          <Image source={{uri:item.source}} style={{width:85,height:107,borderRadius:12,marginBottom:'5%'}} />
        </TouchableOpacity>
      )}
    />   
</SafeAreaView>

       </View>  
     </View>
     </View>
 */}

     
     <View style={{marginTop:'4%'}}>
        <Image source={cashback} style={{width:395,}}/>
     </View>

     <View style={{paddingTop:30,padding:10,}}>
        <Text style={{color:'#00338D',fontSize:17,fontWeight:'500'}}>PLAY & EARN</Text>
        <View style={{flexDirection:'row',justifyContent:'space-evenly'}}>
             <View>
                <Image source={playearn1} style={{width:150,height:100}}/>
             </View>
             <View>
                <Image source={playearn2} style={{width:180,height:100}}/>
             </View>
        </View>
    </View>
    

    <View style={{paddingTop:10,padding:10,justifyContent:'center',flexDirection:'row'}}>
        <Image source={fortune} style={{}}/>
    </View>
  </View>

</ScrollView>
</>
  )
}
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
           navigation.navigate('Home');
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
  function forNavigate(page) {
    pushToStack(page);
    navigation.navigate(page);
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
              <TouchableOpacity onPress={() => forNavigate('Fashion')}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={back} style={{ marginLeft: 12 }} />
                 <Text style={{ marginLeft: 8,color:'black',fontSize:15}}>Notification</Text>
               </View>
             </TouchableOpacity>
             </View>

            </View>

  </>);

}


function ProfileBar({navigation})
{
  const {ip,mobileNumber, 
    emailId,gender,userName,
    loginUserId} = useLoginContext();
    const {token,popFromStack,pushToStack,
      currentPage, setCurrentPage,
      currentPageIndex,setCurrentPageIndex,
      currentPageIndexCategory,setCurrentPageIndexCategory,
      updateUserName,setUpdateUserName,
updateMobileName,setUpdateMobileName,
updateEmail,setUpdateEmail,updateGender,setUpdateGender,
updatePassword,setUpdatePassword}=useLoginContext();     
    const forNavigate=(page)=>{
     {
        console.log(page+" "+currentPage[currentPage.length-1]);
        if(currentPage && currentPage[currentPage.length-1]!==page){
          pushToStack(page);
          navigation.navigate(page)
        }else{
          popFromStack(navigation);
        }  
      }
    }
  const [logOut, setLogOut] = useState(false);
  const {userprofile,setUserProfile,setUserName,mobile,setMobile,setIsItForPlaceOrder}=useCartContext();
  const [sortModalVisible, setSortModalVisible] = useState(false);


  
  useEffect(()=>{

    getData();
    
  },[token,mobile,userName]);
  // console.log("userProfike"+JSON.stringify(userprofile.mobile));
  const getData = async () => {
    let profileData;
    try {
      const response = await axios.get(`http://${ip}:5454/api/users/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`,         
        },
      });
      profileData=response.data;
      // Handle the response data
      setUserProfile(response.data);
      // setMobile(profileData.mobile);
      // setUserName(profileData.firstName +" "+profileData.lastName);
      // console.log(JSON.stringify("Profile:"+JSON.stringify(response.data.mobile))+"\n"+JSON.stringify(userprofile.mobile));
      setUpdateMobileName(profileData.mobile);
      setUpdateEmail(profileData.email);     
      setUpdateUserName(profileData.firstName + (profileData.lastName ? ` ${profileData.lastName}` : ''));
    } catch (error) {
      // Handle errors
      console.error('Error fetching data:', error);
    }
  }

  const handleSortModalClose = () => {
    // Additional logic to handle sorting or other actions
    
      setSortModalVisible(false);
    
  };

  const {  homeIcon, setHomeIcon,setCategoryIcon,
         setBellIcon,setUserIcon} = useLoginContext();
 
        const [password,setPassword]=useState("");
        const [confirmPassword,setConfirmPassword]=useState("");  
        const [seePassword,setSeePassword]=useState(true);
        const [seePassword1,setSeePassword1]=useState(true);
      
        function homeFooter(){
          if(!homeIcon){
            setBellIcon(false);
            setCategoryIcon(false);
            setUserIcon(false);
            setHomeIcon(true);
           
          }
       }

       const handleLogOutPress = () => {
        setSortModalVisible(true);
      };

      function logOutExit(){
        navigation.reset({
          index: 0,
          routes: [{ name: 'SignIn' }],
        });  
      }
    return (
        <>
<View style={{ flex: 1, backgroundColor: 'white' }}>   
  <ScrollView >    
   {/* <Text>{JSON.stringify(userprofile)}</Text> */}
    <View style={styles.profileContainer}>
    <Image source={kpmg} style={{width:100,height:60,alignSelf:'center'}}/>

      <View style={{flexDirection:'row',marginTop:'8%',}}>
      <Image source={
          userprofile.gender==="male"?profile1:
          userprofile.gender==="emale"?profile1:profile1
        } style={{width:40,height:40,marginTop:'8%',marginRight:'5%'}}/>

        <View style={{marginTop:'8%'}}>
            <Text style={styles.txt2}>
                Name: {updateUserName} 
            </Text>
            <Text style={styles.txt2}>Email: {updateEmail}</Text>
            <Text style={styles.txt2}>Mobile: {updateMobileName}</Text>
            <Text style={styles.txt2}>Referral Code: sharekpmgindia/ref-11</Text>

        </View>
        <View>
        <TouchableOpacity style={{marginTop:'8%'}} 
         onPress={()=>{forNavigate('userProfile')}}>

          <Image source={edit} style={{width:18,height:18,marginLeft:'38%',marginTop:'11%'}}/>
          </TouchableOpacity>

          <Image source={referral} style={{width:18,height:18,marginLeft:'38%',marginTop:'29%'}}/>
        </View>

      </View>  

    </View>

    <TouchableOpacity
       style={{
            flex: 1, // Adjust as needed based on your layout
            justifyContent: 'flex-end', // Align the content at the bottom of the parent container
          }}
       >
  <TouchableOpacity
      style={{
         backgroundColor: '#e8e8e8',
         marginTop: '-5%',
         marginBottom: 10,
         width: '70%',
         alignSelf: 'center',
         height: 40,
         borderRadius: 5,
         shadowColor: '#000',
         shadowOffset: {
         width: 0,
         height: 4,
       },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5, // This is for Android
      }}
    >
    <Text
      style={{
          textAlign: 'center',
          padding: '3%',
          color: 'black',
          fontWeight: '500',
       }}
    >
      Change Password
    </Text>
  </TouchableOpacity>
</TouchableOpacity>

<TouchableOpacity
  style={{
    flex: 1,
    justifyContent: 'flex-end',
  }}
>
  <TouchableOpacity
    style={{
      backgroundColor: '#e8e8e8',
      marginTop: '5%',
      marginBottom: 10,
      width: '90%',
      alignSelf: 'center',
      height: 40,
      borderRadius: 5,
      flexDirection: 'row', // Set flexDirection to 'row'
      justifyContent: 'space-between',
      alignItems: 'center', // Align items in the center vertically
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 5, // This is for Android
    }}
  >
    <Text
      style={{
        textAlign: 'center',
        padding: '3%',
        color: 'black',
        fontWeight: '400',
      }}
    >
      My Offers
    </Text>
    <Image source={plus1} style={{ marginRight: 10,width:15,height:15 }} />
  </TouchableOpacity>
</TouchableOpacity><TouchableOpacity
  style={{
    flex: 1,
    justifyContent: 'flex-end',
  }}
>
  <TouchableOpacity
    style={{
      backgroundColor: '#e8e8e8',
      marginTop: '2%',
      marginBottom: 10,
      width: '90%',
      alignSelf: 'center',
      height: 40,
      borderRadius: 5,
      flexDirection: 'row', // Set flexDirection to 'row'
      justifyContent: 'space-between',
      alignItems: 'center', // Align items in the center vertically
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 5, // This is for Android
    }}
  >
    <Text
      style={{
        textAlign: 'center',
        padding: '3%',
        color: 'black',
        fontWeight: '400',
      }}
    >
     My Rewards
    </Text>
    <Image source={plus1} style={{ marginRight: 10,width:15,height:15 }} />
  </TouchableOpacity>
</TouchableOpacity><TouchableOpacity
  style={{
    flex: 1,
    justifyContent: 'flex-end',
  }}
>
  <TouchableOpacity
    style={{
      backgroundColor: '#e8e8e8',
      marginTop: '2%',
      marginBottom: 10,
      width: '90%',
      alignSelf: 'center',
      height: 40,
      borderRadius: 5,
      flexDirection: 'row', // Set flexDirection to 'row'
      justifyContent: 'space-between',
      alignItems: 'center', // Align items in the center vertically
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 5, // This is for Android
    }}
  >
    <Text
      style={{
        textAlign: 'center',
        padding: '3%',
        color: 'black',
        fontWeight: '400',
      }}
    >
      My Subscriptions
    </Text>
    <Image source={plus1} style={{ marginRight: 10,width:15,height:15 }} />
  </TouchableOpacity>
</TouchableOpacity>
<TouchableOpacity
  onPress={() => forNavigate('Payment1')}
  style={{
    flex: 1,
    justifyContent: 'flex-end',
  }}
>
  <TouchableOpacity
    onPress={() => forNavigate('Payment1')}
    style={{
      backgroundColor: '#e8e8e8',
      marginTop: '2%',
      marginBottom: 10,
      width: '90%',
      alignSelf: 'center',
      height: 40,
      borderRadius: 5,
      flexDirection: 'row', // Set flexDirection to 'row'
      justifyContent: 'space-between',
      alignItems: 'center', // Align items in the center vertically
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 5, // This is for Android
    }}
  >
    <Text
      style={{
        textAlign: 'center',
        padding: '3%',
        color: 'black',
        fontWeight: '400',
      }}
    >
      My Payments
    </Text>
    <Image source={plus1} style={{ marginRight: 10,width:15,height:15 }} />
  </TouchableOpacity>
</TouchableOpacity><TouchableOpacity
  style={{
    flex: 1,
    justifyContent: 'flex-end',
  }}
>
  <TouchableOpacity
    style={{
      backgroundColor: '#e8e8e8',
      marginTop: '2%',
      marginBottom: 10,
      width: '90%',
      alignSelf: 'center',
      height: 40,
      borderRadius: 5,
      flexDirection: 'row', // Set flexDirection to 'row'
      justifyContent: 'space-between',
      alignItems: 'center', // Align items in the center vertically
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 5, // This is for Android
    }}
  >
    <Text
      style={{
        textAlign: 'center',
        padding: '3%',
        color: 'black',
        fontWeight: '400',
      }}
    >
      My Wallet
    </Text>
    <Image source={plus1} style={{ marginRight: 10,width:15,height:15 }} />
  </TouchableOpacity>
</TouchableOpacity>
<TouchableOpacity
 onPress={()=>{forNavigate('order')}}
  style={{
    flex: 1,
    justifyContent: 'flex-end',
  }}
>
  <TouchableOpacity
   onPress={()=>{forNavigate('order')}}
    style={{
      backgroundColor: '#e8e8e8',
      marginTop: '2%',
      marginBottom: 10,
      width: '90%',
      alignSelf: 'center',
      height: 40,
      borderRadius: 5,
      flexDirection: 'row', // Set flexDirection to 'row'
      justifyContent: 'space-between',
      alignItems: 'center', // Align items in the center vertically
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 5, // This is for Android
    }}
  >
    <Text
      style={{
        textAlign: 'center',
        padding: '3%',
        color: 'black',
        fontWeight: '400',
      }}
    >
      My Orders
    </Text>
    <Image source={plus1} style={{ marginRight: 10,width:15,height:15 }} />
  </TouchableOpacity>
</TouchableOpacity><TouchableOpacity
  style={{
    flex: 1,
    justifyContent: 'flex-end',
  }}
>
  <TouchableOpacity
    style={{
      backgroundColor: '#e8e8e8',
      marginTop: '2%',
      marginBottom: 10,
      width: '90%',
      alignSelf: 'center',
      height: 40,
      borderRadius: 5,
      flexDirection: 'row', // Set flexDirection to 'row'
      justifyContent: 'space-between',
      alignItems: 'center', // Align items in the center vertically
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 5, // This is for Android
    }}
  >
    <Text
      style={{
        textAlign: 'center',
        padding: '3%',
        color: 'black',
        fontWeight: '400',
      }}
    >
      Play & Earn
    </Text>
    <Image source={plus1} style={{ marginRight: 10,width:15,height:15 }} />
  </TouchableOpacity>
</TouchableOpacity><TouchableOpacity
  style={{
    flex: 1,
    justifyContent: 'flex-end',
  }}
>
  <TouchableOpacity
    style={{
      backgroundColor: '#e8e8e8',
      marginTop: '2%',
      marginBottom: 10,
      width: '90%',
      alignSelf: 'center',
      height: 40,
      borderRadius: 5,
      flexDirection: 'row', // Set flexDirection to 'row'
      justifyContent: 'space-between',
      alignItems: 'center', // Align items in the center vertically
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 5, // This is for Android
    }}
  >
    <Text
      style={{
        textAlign: 'center',
        padding: '3%',
        color: 'black',
        fontWeight: '400',
      }}
    >
      Notifications
    </Text>
    <Image source={plus1} style={{ marginRight: 10,width:15,height:15 }} />
  </TouchableOpacity>
</TouchableOpacity>

<TouchableOpacity
        onPress={() => {
          setIsItForPlaceOrder(false);
          forNavigate('orderSummary');
        }}
  style={{
    flex: 1,
    justifyContent: 'flex-end',
  }}
>
  <TouchableOpacity
         onPress={() => {
          setIsItForPlaceOrder(false);
          forNavigate('orderSummary');
        }}
    style={{
      backgroundColor: '#e8e8e8',
      marginTop: '2%',
      marginBottom: 10,
      width: '90%',
      alignSelf: 'center',
      height: 40,
      borderRadius: 5,
      flexDirection: 'row', // Set flexDirection to 'row'
      justifyContent: 'space-between',
      alignItems: 'center', // Align items in the center vertically
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 5, // This is for Android
    }}
  >
    <Text
      style={{
        textAlign: 'center',
        padding: '3%',
        color: 'black',
        fontWeight: '400',
      }}
    >
      My Addresses
    </Text>
    <Image source={plus1} style={{ marginRight: 10,width:15,height:15 }} />
  </TouchableOpacity>
</TouchableOpacity><TouchableOpacity
  style={{
    flex: 1,
    justifyContent: 'flex-end',
  }}
>
  <TouchableOpacity
    style={{
      backgroundColor: '#e8e8e8',
      marginTop: '2%',
      marginBottom: 10,
      width: '90%',
      alignSelf: 'center',
      height: 40,
      borderRadius: 5,
      flexDirection: 'row', // Set flexDirection to 'row'
      justifyContent: 'space-between',
      alignItems: 'center', // Align items in the center vertically
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 5, // This is for Android
    }}
  >
    <Text
      style={{
        textAlign: 'center',
        padding: '3%',
        color: 'black',
        fontWeight: '400',
      }}
    >
      Store Locator
    </Text>
    <Image source={plus1} style={{ marginRight: 10,width:15,height:15 }} />
  </TouchableOpacity>
</TouchableOpacity><TouchableOpacity
  style={{
    flex: 1,
    justifyContent: 'flex-end',
  }}
>
  <TouchableOpacity
    style={{
      backgroundColor: '#e8e8e8',
      marginTop: '2%',
      marginBottom: 10,
      width: '90%',
      alignSelf: 'center',
      height: 40,
      borderRadius: 5,
      flexDirection: 'row', // Set flexDirection to 'row'
      justifyContent: 'space-between',
      alignItems: 'center', // Align items in the center vertically
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 5, // This is for Android
    }}
  >
    <Text
      style={{
        textAlign: 'center',
        padding: '3%',
        color: 'black',
        fontWeight: '400',
      }}
    >
      Need Help
    </Text>
    <Image source={plus1} style={{ marginRight: 10,width:15,height:15 }} />
  </TouchableOpacity>
</TouchableOpacity>
<TouchableOpacity
  onPress={handleLogOutPress}
  style={{
    flex: 1,
    justifyContent: 'flex-end',
  }}
>
  <TouchableOpacity
   onPress={handleLogOutPress}
    style={{
      backgroundColor: '#e8e8e8',
      marginTop: '3%',
      marginBottom: 10,
      width: '90%',
      alignSelf: 'center',
      height: 40,
      borderRadius: 5,
      flexDirection: 'row', // Set flexDirection to 'row'
      justifyContent: 'space-between',
      alignItems: 'center', // Align items in the center vertically
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 5, // This is for Android
    }}
  >
    <Text
      style={{
        textAlign: 'center',
        padding: '3%',
        fontWeight: '400',
        color:'#A4343A'
      }}
    >
      Log Out
    </Text>
  </TouchableOpacity>
</TouchableOpacity>
<Modal animationType="slide" transparent={true} visible={sortModalVisible} onRequestClose={handleSortModalClose}>
          <TouchableWithoutFeedback onPress={handleSortModalClose}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <View>
                  <Text style={{alignItems:'center',color:'black',fontWeight:'700',textAlign:'center',fontSize:16.5}}>Log out of {"\n"} your account?</Text>
                  <View style={{ width: '100%', borderBottomWidth: 0.8, borderColor: '#dbd9d9',marginTop:'17%' }}></View>
                  <TouchableOpacity
                   style={{flexDirection:'row',justifyContent:'center'}}
                   onPress={()=>{logOutExit()}}>
                    <Text style={{color:'red',padding:'4%'}}>Log Out</Text>
                  </TouchableOpacity>
                  <View style={{ width: '100%', borderBottomWidth: 0.8, borderColor: '#dbd9d9',marginTop:'1%' }}></View>
                  <TouchableOpacity
                   style={{flexDirection:'row',justifyContent:'center'}}
                   onPress={()=>{setSortModalVisible(false)}}>
                    <Text style={{color:'black',padding:'4%'}}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>  

<Text style={{marginLeft:'8%',color:'#00338D',fontSize:14,marginTop:'1%',fontWeight:'300'}}>FAQ</Text>
<Text style={{marginLeft:'8%',color:'#00338D',fontSize:14,marginTop:'4%',fontWeight:'300'}}>About Us</Text>
<Text style={{marginLeft:'8%',color:'#00338D',fontSize:14,marginTop:'4%',fontWeight:'300'}}>Term of Use</Text>
<Text style={{marginLeft:'8%',color:'#00338D',fontSize:14,marginTop:'4%',fontWeight:'300',marginBottom:'8%'}}>Privacy Policy</Text>

    </ScrollView>
  </View>     
      </>
  
  )
}



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
              e.preventDefault();
    
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
          tabBarLabel: userprofile?.firstName,
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