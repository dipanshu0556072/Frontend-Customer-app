import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  Button,
  StyleSheet,
  Image,
  View,
  Dimensions,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import MenJeans from './PlpScreen/images/MenJeans.png';
import MenShirt from './PlpScreen/images/MenShirt.png';
import MenKurta from './PlpScreen/images/MenKurta.png';

import WomenEthnic from './PlpScreen/images/WomenEthnic.png';
import WomenJeans from './PlpScreen/images/WomenJeans.png';
import WomenTop from './PlpScreen/images/WomenTop.png';

import {useLoginContext} from './Login/LoginCartProvider';
import back from './PlpScreen/images/back.png';
import {useCartContext} from './Context/WomenContext';
import TopBar from './PlpScreen/TopBar';
import discount from './PlpScreen/images/discount.png';
import selfcheckout from './PlpScreen/images/selfcheckout.png';
import pickup from './PlpScreen/images/pickup.png';

import brand1 from './PlpScreen/images/brand1.png';

import bestSell1 from './PlpScreen/images/bestSell1.png';
import bestSell2 from './PlpScreen/images/bestSell2.png';

import bestSell4 from './PlpScreen/images/bestSell4.png';

import bestSell6 from './PlpScreen/images/bestSell6.png';

import manban1 from './PlpScreen/images/menban1.png';
import manban2 from './PlpScreen/images/menban2.png';
import manban3 from './PlpScreen/images/manban3.png';
import manban4 from './PlpScreen/images/manban4.png';
import manban5 from './PlpScreen/images/manban5.png';
import womenban1 from './PlpScreen/images/womenban1.png';
import womenban2 from './PlpScreen/images/womenban2.png';
import womenban3 from './PlpScreen/images/womenban3.png';

import womenban5 from './PlpScreen/images/womenban5.png';
import mandata1 from './PlpScreen/images/mandata2.png';
import mandata2 from './PlpScreen/images/mandata3.png';
import mandata3 from './PlpScreen/images/mandata4.png';
import mandata4 from './PlpScreen/images/mandata5.png';
import mandata5 from './PlpScreen/images/mandata6.png';
import womendata1 from './PlpScreen/images/womendata1.png';
import womendata2 from './PlpScreen/images/womendata2.png';
import womenKurta from './PlpScreen/images/womenKurta.png';
import menJacket from './PlpScreen/images/manJacket.png';
import axios from 'axios';
import BottomNavigator from './Components/BottomNavigator';


const CategoryPage = ({navigation}) => {
  // Use the context to get the currentIndex
  const {
    selectedItemIndex,
    setSelectedItemIndex,
    currentPageIndex,
    currentPageIndexCategory,
    setCurrentPageIndexCategory,
    pushToStack,
    popFromStack,
    currentPage,
    setCurrentPageIndex,
  } = useLoginContext();
  const {
    filteredDataArray,
    setFilteredDataArray,
    showActivityIndicator,
    setShowActivityIndicator,
    setProductIds,
    setPLPData,
  } = useCartContext();
  useEffect(() => {
    //  setProductIds(products.map(product=>product.id));
  }, [filteredDataArray]);

  // Create a Map with integer keys and Map values
  const outerMap = new Map();
  outerMap.set(
    1,
    new Map([
      [1, {name: 'Men Jeans', image: MenJeans}],
      [2, {name: 'Men Kurtas', image: MenKurta}],
      [3, {name: 'Men Jacket', image: menJacket}],
      [4, {name: 'Men Shirts', image: MenShirt}],
    ]),
  );
  outerMap.set(
    2,
    new Map([
      [1, {name: 'Ethnic Dresses', image: WomenEthnic}],
      [2, {name: 'Women Jeans', image: WomenJeans}],
      [3, {name: 'Women Top', image: WomenTop}],
      [4, {name: 'Women Kurta', image: womenKurta}],
    ]),
  );

  // Displaying the values for the specified currentIndex
  const renderMapContent = () => {
    const innerMap = outerMap.get(currentPageIndex);

    if (!innerMap) {
      return <Text>No data found for currentIndex: {currentPageIndex}</Text>;
    }

    const navigateToMainPlp = (page, itemId, name) => {
      filterProductData(name);
      if (
        currentPage &&
        currentPage.length > 0 &&
        currentPage[currentPage.length - 1] !== page
      ) {
        pushToStack(page);
        navigation.navigate(page);
      }
    };

    const mapContent = Array.from(innerMap).map(([innerKey, {name, image}]) => (
      <View key={innerKey} style={{flexDirection: 'column'}}>
        <TouchableOpacity
          onPress={() => {
            setShowActivityIndicator(true);
            setCurrentPageIndexCategory(name);
            setSelectedItemIndex(innerKey); // Store the selected index
            navigateToMainPlp('mainPlp', selectedItemIndex, name);
          }}>
          {image && (
            <Image
              source={image}
              style={{width: 80, height: 90, borderRadius: 12}}
            />
          )}
        </TouchableOpacity>
        <Text
          style={{
            textAlign: 'center',
            fontWeight: '500',
            fontSize: 12,
            color: 'black',
            marginTop: '3%',
          }}>{`${name}`}</Text>
      </View>
    ));

    return mapContent;
  };

  const {setProducts, setSelectedPLPCatgeory} = useCartContext();
  const {ip, token, setLoginUserId, setCurrentPage} = useLoginContext();

  // Ref for flatlist
  const flatlistRef = useRef();

  // Screen width for layout
  const screenWidth = Dimensions.get('window').width - 1;

  // State for the active index of the carousel
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto Scroll
  useEffect(() => {
    let interval = setInterval(() => {
      // Scroll logic for auto-scrolling
      if (activeIndex === selectedCarousel.length - 1) {
        flatlistRef.current.scrollToIndex({
          index: 0,
          animated: true,
        });
      } else {
        flatlistRef.current.scrollToIndex({
          index: (activeIndex + 1) % selectedCarousel.length,
          animated: true,
        });
      }
    }, 2100);

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
  const carouselData1 = [
    {id: 1, image: manban1},
    {id: 2, image: manban2},
    {id: 3, image: manban3},
    {id: 4, image: manban4},
    {id: 5, image: manban5},
  ];
  const carouselData2 = [
    {id: 1, image: womenban1},
    {id: 2, image: womenban2},
    {id: 3, image: womenban3},
    {id: 5, image: womenban5},
  ];
  let selectedCarousel;

  if (currentPageIndex === 1) {
    selectedCarousel = carouselData1;
  } else {
    selectedCarousel = carouselData2;
  }

  // Display Images
  const renderItem = ({item, index}) => (
    <View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: '4%',
          padding: 8,
        }}>
        <TouchableOpacity>
          <Image source={item.image} style={{width: 395, height: 220}} />
        </TouchableOpacity>
      </View>
    </View>
  );

  // Handle Scroll
  const handleScroll = event => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    // Use Math.round to get the correct active index
    const index = Math.round(scrollPosition / screenWidth);
    setActiveIndex(index);
  };

  // Render Dot Indicators
  const renderDotIndicators = () =>
    selectedCarousel.map((dot, index) => (
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
    ));

  let dataOne;

  const data1 = [
    {id: '1', source: mandata3, brandName: 'H&P'},
    {id: '2', source: mandata2, brandName: 'LARA'},
    {id: '3', source: mandata4, brandName: 'Rockey'},
    {id: '4', source: mandata5, brandName: 'Amaze'},
    {id: '5', source: mandata1, brandName: 'Phillipeion'},
    {id: '6', source: brand1, brandName: 'Abilas'},
    // Add more images as needed
  ];
  const data2 = [
    {id: '1', source: womendata1, brandName: 'Madme'},
    {id: '2', source: womendata2, brandName: "MEVI's"},
    {id: '3', source: bestSell1, brandName: 'Miba'},
    {id: '4', source: bestSell4, brandName: 'LARA'},
    {id: '5', source: bestSell2, brandName: 'Pee'},
    {id: '6', source: bestSell6},
    // Add more images as needed
  ];

  if (currentPageIndex === 1) {
    dataOne = data1;
  } else {
    dataOne = data2;
  }

  const [prp, setPrp] = useState([]);
  //filter the product data based on the Fashion tile
  const filterProductData = async category => {
    let response;
    try {
      if (category) {
        response = await axios.get(
          `http://${ip}:5454/api/admin/products/getProductByThirdCategory?category=${category}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        // Alert.alert(JSON.stringify(response.data));
      } 
      setPLPData(response.data);
    } catch (error) {
      console.log(
        'getting error in the homeBar.jsx in filterProductData' + error,
      );
    }
  };


  const backButtonPressed = bannerName => {
    setTimeout(() => {
      popFromStack(navigation);
 
    }, 100);  // Delay of 1 second (1000 milliseconds)
  };
  return (
    <>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <TopBar navigation={navigation} />

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            alignItems: 'center',
            marginBottom: '3%',
          }}>
          <View>
            <TouchableOpacity
              onPress={() => {
                backButtonPressed();
              }}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: '4%',
              }}>
              <Image source={back} style={{marginLeft: 12}} />
              <Text
                style={{paddingLeft: 10, color: 'black', textAlign: 'center'}}>
                {currentPageIndex === 1 ? 'MEN' : 'Women'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
          {renderMapContent()}
        </View>
        <SafeAreaView>
          <FlatList
            nestedScrollEnabled={true}
            data={selectedCarousel}
            ref={flatlistRef}
            horizontal={true}
            pagingEnabled={true}
            onScroll={handleScroll}
            getItemLayout={getItemLayout}
            keyExtractor={item => item.id.toString()} // Use toString() to ensure it's a string
            showsHorizontalScrollIndicator={false}
            renderItem={renderItem}
          />
        </SafeAreaView>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 30,
          }}>
          {renderDotIndicators()}
        </View>
        <View
          style={{
            flexDirection: 'row',
            padding: 4,
            justifyContent: 'space-evenly',
          }}>
          <View style={{flexDirection: 'row'}}>
            <Image
              source={discount}
              style={{width: 30, height: 30, alignItems: 'center'}}
            />
            <Text
              style={{
                color: '#005EBB',
                alignItems: 'center',
                fontSize: 13,
                paddingLeft: 3,
              }}>
              Amazing Deals {'\n'} & Offers
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Image source={selfcheckout} style={{width: 35, height: 35}} />
            <Text
              style={{
                color: '#005EBB',
                flexWrap: 'wrap',
                fontSize: 13,
                paddingLeft: 3,
              }}>
              Store Self{'\n'} Checkout
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Image
              source={pickup}
              style={{width: 35, height: 35, alignItems: 'center'}}
            />
            <Text
              style={{
                color: '#005EBB',
                alignItems: 'center',
                fontSize: 13,
                paddingLeft: 3,
              }}>
              Express Store {'\n'}Pickup
            </Text>
          </View>
        </View>
        <View style={styles.horizontalLine2}></View>

        <View
          style={{
            backgroundColor: '#f7f8fc',
            marginLeft: '4%',
            marginBottom: '3%',
          }}>
          <Text
            style={{
              color: '#00338D',
              fontSize: 14,
              fontWeight: '500',
              marginBottom: '8.6%',
            }}>
            DEALS ON TOP BRANDS
          </Text>
          <View
            style={{
              flexDirection: 'row',
              paddingRight: '3%',
              marginRight: '1%',
            }}>
            <SafeAreaView>
              <FlatList
                nestedScrollEnabled={true}
                data={dataOne}
                horizontal={true}
                showsHorizontalScrollIndicator={false} // Optional: hide horizontal scrollbar
                keyExtractor={item => item.id}
                renderItem={({item}) => (
                  <TouchableOpacity style={{marginStart: 10}}>
                    <Image
                      source={item.source}
                      style={{
                        width: 100,
                        height: 130,
                        borderRadius: 12,
                        padding: '10.02%',
                      }}
                    />
                    <Text
                      style={{
                        textAlign: 'center',
                        padding: '3%',
                        color: 'black',
                        fontWeight: '500',
                      }}>
                      {item.brandName}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </SafeAreaView>
          </View>
        </View>
        {/*show bottom navigator*/}
        <BottomNavigator
          style={styles.bottomNavigator}
          navigation={navigation}
        />
      </View>
    </>
  );
};

export default CategoryPage;

const styles = StyleSheet.create({
  horizontalLine1: {
    borderBottomWidth: 0.3,
    borderBottomColor: '#d1d1d1',
  },
  horizontalLine2: {
    marginTop: '3%',
    borderBottomWidth: 0.3,
    borderBottomColor: '#d1d1d1',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingRight: 16,
  },
  container: {
    marginTop: 30,
    paddingLeft: '4%',
    width: '20%',
    flexDirection: 'row',
    backgroundColor: 'red',
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
    fontWeight: 'bold',
  },
  verticalLine: {
    width: 1,
    backgroundColor: '#d1cfcf',
    height: '100%',
    marginLeft: '28%', // Adjust as needed
  },
  column2: {
    width: '485%',
    marginLeft: '2%',
  },
  mainRow: {},
  profileContainer: {
    padding: '9%',
    backgroundColor: '#00338D',
    marginBottom: '1%',
  },
  txt1: {
    fontSize: 18,
    color: 'white',
    padding: '0.5%',
  },
  txt2: {
    fontSize: 14,
    color: 'white',
    padding: '0.5%',
    fontWeight: '200',
  },
  txt3: {
    fontSize: 15,
    color: '#52514e',
    marginLeft: '5%',
  },
  txt4: {
    fontSize: 15,
    color: '#52514e',
    marginLeft: '5%',
    color: '#A4343A',
  },

  row2: {
    marginTop: '0.8%',
    justifyContent: 'space-between',
  },
  column: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderColor: '#e6e3e3',
    borderTopWidth: 1,
  },

  horizontalLine1: {
    borderBottomWidth: 0.3,
    borderBottomColor: '#d1d1d1',
    marginVertical: 8,
  },
});
