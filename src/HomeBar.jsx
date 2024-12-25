import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  FlatList,
  Alert,
} from 'react-native';
import axios from 'axios';
import {useLoginContext} from './Login/LoginCartProvider';
import grocery from './PlpScreen/images/grocery.jpeg';
import cashback from './PlpScreen/images/cashback.png';
import TopBar from './PlpScreen/TopBar';
import beauty from './PlpScreen/images/beauty.webp';
import banner1 from './PlpScreen/images/banner1.png';
import banner2 from './PlpScreen/images/banner2.png';
import fashion from './PlpScreen/images/fashion.jpeg';
import {useCartContext} from './Context/WomenContext';
import electronics from './PlpScreen/images/electronics.png';
import BannerCarousel from './Components/BannerCarousel';
import DealsOnBrands from './Components/DealsOnBrands';
import BestSeller from './Components/BestSeller';
import PlayAndEarn from './Components/PlayAndEarn';

const HomeBar = ({navigation}) => {
  const {
    setProducts,
    setCartItem,
    profileAddress,
    setProfileAddress,
    setWishListData,
    setAllSavedAddress,
    setBannerComponentName,
    setProductRatings,
    setWishListProductId,
    setCartProductId,
    setCurrentProductIdOnPDP,
    setRecommendedSeeMoreBtn,
    setPLPData
  } = useCartContext();

  const {ip, token,loginUserId, setLoginUserId, pushToStack, currentPage, popFromStack} =
    useLoginContext();

  const [searchData, setSearchData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Define all fetch requests
        const wishListRequest = axios.get(`http://${ip}:5454/api/wishlist/`, {
          headers: {Authorization: `Bearer ${token}`},
        });

        const profileDataRequest = axios.get(
          `http://${ip}:5454/api/users/profile`,
          {
            headers: {Authorization: `Bearer ${token}`},
          },
        );

        const productsDataRequest = axios.get(
          `http://${ip}:5454/api/admin/products/all`,
          {
            headers: {Authorization: `Bearer ${token}`},
          },
        );

        const cartDataRequest = axios.get(`http://${ip}:5454/api/cart/`, {
          headers: {Authorization: `Bearer ${token}`},
        });

        const orderDataRequest = axios.get(
          `http://${ip}:5454/api/orders/user`,
          {
            headers: {Authorization: `Bearer ${token}`},
          },
        );
        const searchDataRequest = axios.get(
          `http://${ip}:5454/api/getSuggestedItems`,
          {
            headers: {Authorization: `Bearer ${token}`},
          },
        );

        // Wait for all fetch requests to complete
        const [
          wishListResponse,
          profileDataResponse,
          productsResponse,
          cartDataResponse,
          orderDataResponse,
          searchDataResponse,
        ] = await Promise.all([
          wishListRequest,
          profileDataRequest,
          productsDataRequest,
          cartDataRequest,
          orderDataRequest,
          searchDataRequest,
        ]);

        // Process the responses
        setWishListData(wishListResponse.data);
        setProfileAddress(profileDataResponse.data);
        setAllSavedAddress(profileDataResponse.data.addresses);
        setProducts(productsResponse.data);
        setCartItem(cartDataResponse.data);
        setSearchData(searchDataResponse.data);

        // Store productId for fetch productRating
        setProductRatings(productsResponse.data.map(product => product.id));

        // Store productId of wishList
        setWishListProductId(
          wishListResponse.data.wishlistItems.map(
            product => product.product.id,
          ),
        );

        // Store productId of cart products
        setCartProductId(
          cartDataResponse.data.cartItems.map(item => item.product.id),
        );
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  //filter the product data based on the Fashion tile
  const filterProductData = async () => {
    try {
      const response = axios.get(
        `http://${ip}:5454/api/admin/products/getProductByTopCategory?category=clothes`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setProducts(response.data);
    } catch (error) {
      console.log(
        'getting error in the homeBar.jsx in filterProductData' + error,
      );
    }
  };

  const Fashion = page => {
    filterProductData();
    setBannerComponentName('fashion');
    if (currentPage && currentPage[currentPage.length - 1] !== page) {
      pushToStack(page);
      navigation.navigate(page);
    } else {
      popFromStack(navigation);
    }
  };

  setLoginUserId(profileAddress.id);

  //tabs on the home page
  const Tab = ({page, title, image}) => {
    return (
      <View style={styles.imageContainer}>
        <TouchableOpacity
          onPress={() => {
            if (page) {
              Fashion(page);
            }
          }}>
          <Image source={image} style={styles.mainTabImage} />
          <Text style={styles.mainTabImageText}>{title}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  //show buffering on the page
  const [showActivityIndicator, setShowActivityIndicator] = useState(false);
  if (showActivityIndicator) {
    return (
      <>
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator size="large" color="#00338D" />
        </View>
      </>
    );
  }

    // If the image is touched
    const onPressOfImage = productId => {
     
      // Alert.alert(JSON.stringify(productId));
       setCurrentProductIdOnPDP(productId);
      navigation.navigate('mainPDP'); // Pass productId only
    };

      //filter the product data based on the Fashion tile
  const filterProductDataOnPLP = async () => {
    let response;
    try {
          response = await axios.get(
            `http://${ip}:5454/api/getSuggestedItems`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );
  
          // Alert.alert(JSON.stringify(response.data));
  
        setPLPData(response.data);
      
    } catch (error) {
      console.log(
        'getting error in the homeBar.jsx in filterProductData' + error,
      );
    }
    setRecommendedSeeMoreBtn(true);
    navigation.navigate('mainPlp');
  };
  //if the see more (Recoommended for you) is pressed then 
  const onPressOfSeeMore=()=>{
    filterProductDataOnPLP();

  }

  useEffect(() => {
    // Show the ActivityIndicator for 2 seconds
    const timer = setTimeout(() => {
      setShowActivityIndicator(false);
    }, 4000); // 2000ms = 2 seconds

    return () => clearTimeout(timer); // Clear the timeout if the component unmounts
  }, []);
  

  return (
    <>
      <TopBar navigation={navigation} />
      <ScrollView>
        <View style={styles.mainContainer}>
          {/* Horizontal line */}
          <View style={styles.dividerLine1} />

          {/* Tabs to navigate*/}
          <View style={styles.mainTabs}>
            <Tab page="Fashion" title="FASHION" image={fashion} />
            <Tab page="groceryHome" title="GROCERY" image={grocery} />
            <Tab title="BEAUTY" image={beauty} />
            <Tab title="ELECTRONICS" image={electronics} />
          </View>

          {/* Horizontal line */}
          <View style={styles.dividerLine} />

          {/*show Banners  */}
          <BannerCarousel />

          <View style={styles.mainContainer}>
            {/* Horizontal line */}
            <View style={styles.dividerLine} />

            {/* Deals on Top Brands section */}
            <DealsOnBrands />

            {/* Banner section */}
            <TouchableOpacity style={styles.bannerWrapper}>
              <Image source={banner1} style={styles.bannerImage} />
            </TouchableOpacity>

            {/* Best Sellers section */}
            <BestSeller />

            {/* Beauty Products section */}
            <View style={styles.beautyProductsContainer}>
              <Text style={styles.sectionHeader}>
                SLASH & SAVE ON TOP BEAUTY PRODUCTS
              </Text>
              <TouchableOpacity style={styles.beautyBannerWrapper}>
                <Image source={banner2} style={styles.beautyBannerImage} />
              </TouchableOpacity>
            </View>

            {/* Cashback section */}
            <View style={styles.cashbackContainer}>
              <Image source={cashback} style={styles.cashbackImage} />
            </View>

            {/*Recent search history*/}
            <View>
              <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',margin:'3%'}}>
              <Text style={[styles.sectionHeader, {margin: '3%'}]}>
                RECOMMENDED FOR YOU
              </Text>
              <TouchableOpacity onPress={()=>{onPressOfSeeMore()}}>
              <Text style={{textDecorationLine:'underline',color:'#00338D',fontSize:12,fontWeight:'500'}}>See More</Text>
              </TouchableOpacity>
              </View>
               <FlatList
                data={searchData}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => (
                  <View style={styles.flatListSearchData}>
                    <TouchableOpacity onPress={() => onPressOfImage(item.id)}>
                      <Image
                        source={{uri: item.imageUrl[0]}}
                        style={styles.flatListImg}
                      />
                    </TouchableOpacity>
                    <Text style={{fontSize:10,color:'black',fontWeight:'600',width:60,textAlign:'center',marginTop:'3%'}}>{item.title}</Text>
                  </View>
                )}
                contentContainerStyle={{
                  paddingHorizontal: 10, // Ensure spacing on left and right
                }}
                style={{
                  maxHeight: 100, // Restrict FlatList height to avoid overflowing
                }}
              />
            </View>

            {/* Play & Earn section */}
            <PlayAndEarn />
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default HomeBar;
const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  mainTabs: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-evenly',
    alignContent: 'center',
    width: '100%',
    height: 120,
  },
  imageContainer: {
    width: 100,
    height: 110,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '4%',
  },
  mainTabImage: {
    width: 83,
    padding: 12,
    height: 90,
    borderRadius: 12,
    borderColor: '#00338D',
    borderWidth: 0.4,
  },
  mainTabImageText: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#00338D',
    fontSize: 12,
    marginTop: '2%',
  },

  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },

  dividerLine: {
    backgroundColor: '#ddd',
    height: 1,
    marginVertical: 10,
  },
  dividerLine1: {
    backgroundColor: '#ddd',
    height: 1,
  },

  sectionHeader: {
    color: '#00338D',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: '3%',
  },

  bannerWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 25,
  },
  bannerImage: {
    width: 395,
    height: 300,
  },

  beautyProductsContainer: {
    paddingTop: 30,
    padding: 10,
  },
  beautyBannerWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
  },
  beautyBannerImage: {
    width: 395,
    height: 200,
  },
  cashbackContainer: {
    marginTop: '4%',
  },
  cashbackImage: {
    width: 395,
  },
  activityIndicatorContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.7)', // Semi-transparent background
  },

  //recentSearchContainer
  recentSearchContainer: {
    margin: '1%',
    backgroundColor: 'red',
    width: '100%',
    minHeight: 100,
  },
  flatListSearchData: {
    flexDirection: 'column', // Stack image and text vertically
    width: 100,
    justifyContent: 'center',
    alignItems: 'center', // Center both image and text horizontally
    marginTop: '4%',
    marginBottom: 10, // Add space between items if needed
  },

  flatListImg: {
    width: 63,
    height: 63,
    borderRadius: 50,
  },
});
