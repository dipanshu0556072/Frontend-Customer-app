import React from 'react';
import {
  StyleSheet,
  Image,
  View,
  Dimensions,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import cashback from './PlpScreen/images/cashback.png';

import TopBar from './PlpScreen/TopBar';
import beauty from './PlpScreen/images/beauty.webp';
import gift from './PlpScreen/images/gift.png';
import banner1 from './PlpScreen/images/banner1.png';
import {useCartContext} from './Context/WomenContext';
import back from './PlpScreen/images/back.png';
import men from './PlpScreen/images/Men2.png';
import kid from './PlpScreen/images/kid2.png';
import {useLoginContext} from './Login/LoginCartProvider';
import axios from 'axios';
import Women from './PlpScreen/images/Womne.png';
import BannerCarousel from './Components/BannerCarousel';
import DealsOnBrands from './Components/DealsOnBrands';
import BestSeller from './Components/BestSeller';
import PlayAndEarn from './Components/PlayAndEarn';

export default function Home({navigation}) {
  const {products,setProducts, setBannerComponentName} = useCartContext();
  const {ip, token} = useLoginContext();
  const {pushToStack, popFromStack, currentPage, setCurrentPageIndex} =
    useLoginContext();

  //filter the product data based on the Fashion tile
  const filterProductData = async category => {
    let response;
    try {
      if (category) {
        response = await axios.get(
          `http://${ip}:5454/api/admin/products/getProductBySecondCategory?category=men`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
          //      Alert.alert('Filtered by category'+category);
      } else {
        response = await axios.get(
          `http://${ip}:5454/api/admin/products/getProductByTopCategory?category=clothes`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        //   Alert.alert('Filtered by top category');
      }
      setProducts([]);
      setProducts(response.data);
    } catch (error) {
      console.log(
        'getting error in the homeBar.jsx in filterProductData' + error,
      );
    }
  };

  const navigateToMainPlp = (page, itemId, category) => {
    filterProductData(category);

    if (
      currentPage &&
      currentPage.length > 0 &&
      currentPage[currentPage.length - 1] !== page
    ) {
      setCurrentPageIndex(itemId);
      pushToStack(page);
      navigation.navigate(page);
    }
  };

  //tabs to navigate
  const Tab = ({image, page, title, value}) => {
    return (
      <View style={styles.categoryItem}>
        <TouchableOpacity
          onPress={() => navigateToMainPlp(page, value, title)}
          disabled={!page}
          style={styles.categoryButton}>
          <Image source={image} style={styles.categoryImage} />
          <Text style={styles.categoryLabel}>{title}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  //if back button pressed
  const backButtonPressed = bannerName => {
    filterProductData();
    popFromStack(navigation), setBannerComponentName(bannerName);
  };

  return (
    <>
      <View style={styles.mainContainer}>
        {/*header*/}
        <TopBar navigation={navigation} />
        <ScrollView>
          <View style={styles.mainBox}>
         
            {/*backArrow Box*/}
            <View style={styles.backContainer}>
              <TouchableOpacity
                onPress={() => {
                  backButtonPressed('homeBar');
                }}
                style={styles.backButton}>
                <Image source={back} style={styles.backImage} />
                <Text style={styles.backArrowText}>Fashion</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.horizontalLine} />

            <View style={styles.categoryRow1}>
              <Tab image={men} page="categoryPage" title="MEN" value={1} />
              <Tab image={Women} page="categoryPage" title="WOMEN" value={2} />
              <Tab image={kid} title="KIDS" />
            </View>

            <View style={[styles.categoryRow2, styles.spacingTop]}>
              <Tab image={beauty} title="BEAUTY" />
              <Tab image={gift} title="& MORE" />
            </View>

            <View style={styles.horizontalLine}></View>

            {/*show Banners  */}
            <BannerCarousel />

            {/*Deals on the brands */}
            <DealsOnBrands />

            <TouchableOpacity style={styles.bannerTouchableOpacity}>
              <Image source={banner1} style={styles.bannerImage} />
            </TouchableOpacity>

            {/*Best Seller*/}
            <BestSeller />

            <View>
              <Image source={cashback} style={styles.cashBackBannerImage} />
            </View>

            {/*Play and Earn */}
            <PlayAndEarn />
          </View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  mainBox: {
    flexDirection: 'column',
  },
  backContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '3%',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: '2%',
  },
  backImage: {
    marginLeft: 12,
  },
  backArrowText: {
    paddingLeft: 10,
    color: 'black',
    textAlign: 'center',
  },
  categoryRow1: {
    flexDirection: 'row',
    marginLeft: '5%',
    marginTop: '4%',
    marginBottom: '2%',
  },

  categoryRow2: {
    flexDirection: 'row',
    margin: '3%',
  },

  categoryItem: {
    width: 120,
    height: 110,
    shadowColor: 'grey',
    shadowOffset: {width: 60, height: 25},
    shadowOpacity: 0.25,
    shadowRadius: 35.84,
    elevation: 10,
  },
  categoryButton: {},
  categoryImage: {
    width: 105,
    height: 105,
    borderRadius: 12,
    borderColor: '#00338D',
    borderWidth: 0.4,
  },
  categoryLabel: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 12,
    marginRight: '8%',
    padding: '2%',
    color: '#00338D',
  },
  spacingLeft: {
    marginLeft: '4%',
  },
  spacingLeftSmall: {
    marginLeft: '2.5%',
  },
  spacingTop: {
    padding: '2%',
    marginTop: '3%',
  },
  spacingLeftLarge: {
    marginLeft: '2%',
  },
  horizontalLine: {
    borderBottomWidth: 0.3,
    borderBottomColor: '#d1d1d1',
  },
  bannerTouchableOpacity: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 25,
  },
  bannerImage: {
    width: 395,
    height: 300,
  },
  cashBackBannerImage: {
    marginTop: '4%',
  },
  cashBackBannerImage: {
    width: 395,
  },
});
