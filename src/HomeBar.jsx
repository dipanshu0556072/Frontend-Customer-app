import React, { useEffect, useState,useRef } from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList, TouchableOpacity, Image, SafeAreaView, Modal, 
  Dimensions,TouchableWithoutFeedback } from 'react-native';
import axios from 'axios';
import edit from './PlpScreen/images/edit.png';
import kpmg from './PlpScreen/images/kpmglogo.png';
import profile1 from './Login/images/profile1.png';
import { useLoginContext } from './Login/LoginCartProvider';
import back from './PlpScreen/images/back.png';
import grocery from './PlpScreen/images/grocery.jpeg';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import home1 from './PlpScreen/images/home1.png';
import categories1 from './PlpScreen/images/category1.png';
import bell1 from './PlpScreen/images/bell1.png';
import user1 from './PlpScreen/images/user1.png';
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
import quickshop from './PlpScreen/images/quickshop.jpeg';
import beauty from './PlpScreen/images/beauty.webp';
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
import referral from './copy.png'
import Home1 from './Fashion';

const HomeBar = ({navigation}) => {
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
      // { id: 2, image: add2 },
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
                    <TopBar navigation={navigation}/>

   <ScrollView>       
      
      
      <View style={{ flexDirection: 'column',backgroundColor:'white' }}>
      {/* <Text>{currentPage}</Text> */}
  
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
                onPress={()=>{Fashion('groceryHome')}}>
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
    )}

export default HomeBar

const styles = StyleSheet.create({})