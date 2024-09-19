import React, {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
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
  } = useCartContext();

  const {ip, token, setLoginUserId, pushToStack, currentPage, popFromStack} =
    useLoginContext();

  useEffect(async () => {
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

      const orderDataRequest = axios.get(`http://${ip}:5454/api/orders/user`, {
        headers: {Authorization: `Bearer ${token}`},
      });

      // Wait for all fetch requests to complete
      const [
        wishListResponse,
        profileDataResponse,
        productsResponse,
        cartDataResponse,
        orderDataResponse,
      ] = await Promise.all([
        wishListRequest,
        profileDataRequest,
        productsDataRequest,
        cartDataRequest,
        orderDataRequest,
      ]);

      // Process the responses
      setWishListData(wishListResponse.data);
      setProfileAddress(profileDataResponse.data);
      setAllSavedAddress(profileDataResponse.data.addresses);
      setProducts(productsResponse.data);
      setCartItem(cartDataResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
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
  const Tab = ({page, title,image}) => {
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
    fontWeight: '500',
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
});
