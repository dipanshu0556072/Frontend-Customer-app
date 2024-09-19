import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Image,
  View,
  Dimensions,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import discount from '../PlpScreen/images/discount.png';
import selfcheckout from '../PlpScreen/images/selfcheckout.png';
import pickup from '../PlpScreen/images/pickup.png';
import add1 from '../PlpScreen/images/add1.png';
import add3 from '../PlpScreen/images/add3.png';
import add4 from '../PlpScreen/images/add4.png';
import add5 from '../PlpScreen/images/add5.png';
import brand1 from '../PlpScreen/images/brand1.png';
import brand2 from '../PlpScreen/images/brand2.png';
import brand3 from '../PlpScreen/images/brand3.png';
import brand4 from '../PlpScreen/images/brand4.png';
import brand5 from '../PlpScreen/images/brand5.png';
import brand6 from '../PlpScreen/images/brand6.png';
import fashionBanner from '../PlpScreen/images/fashionBanner.png';
import menFashion from '../PlpScreen/images/menFashion.png';
import menFashion1 from '../PlpScreen/images/menFashion1.png';
import { useCartContext } from '../Context/WomenContext';

const BannerCarousel = () => {

  const{bannerComponentName}=useCartContext();

  const flatlistRef = useRef();

  // Screen width for layout
  const screenWidth = Dimensions.get('window').width - 1;

  // State for th`e active index of the carousel
  const [activeIndex, setActiveIndex] = useState(0);

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
    }, 2100);

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  // Function to calculate layout for flatlist items
  const getItemLayout = (_, index) => ({
    length: screenWidth,
    offset: screenWidth * index,
    index,
  });

  // Handle Scroll
  const handleScroll = event => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    // Use Math.round to get the correct active index
    const index = Math.round(scrollPosition / screenWidth);
    setActiveIndex(index);
  };

  // Render Dot Indicators
  const renderDotIndicators = () =>
    carouselData.map((dot, index) => (
      <View
        key={index}
        style={[
          styles.dotIndicator,
          {backgroundColor: activeIndex === index ? '#00338D' : '#D5D5D5'},
        ]}
      />
    ));

  const data1 = [
    {id: 1, image: add1},
    {id: 2, image: add3},
    {id: 3, image: add4},
    {id: 4, image: add5},
    // Add more images as needed
  ];

  const data2=[
    {id: 1, image: fashionBanner},
    {id: 2, image: menFashion},
    {id: 3, image: menFashion1},
    {id: 4, image: add4},
    // {id: 5, image: add1},
  ]



    
  // Data for the carousel
  const carouselData = bannerComponentName=='fashion'?data2:data1;

  // Display Images
  const renderItem = ({item}) => (
    <View style={styles.imageContainer}>
      <TouchableOpacity>
        <Image source={item.image} style={styles.carouselImage} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View>
      <SafeAreaView>
        <FlatList
          nestedScrollEnabled={true}
          data={carouselData}
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
      <View style={styles.dotContainer}>{renderDotIndicators()}</View>
      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <Image source={discount} style={styles.icon} />
          <Text style={styles.infoText}>Amazing Deals {'\n'} & Offers</Text>
        </View>
        <View style={styles.infoRow}>
          <Image source={selfcheckout} style={styles.iconLarge} />
          <Text style={styles.infoText}>Store Self{'\n'} Checkout</Text>
        </View>
        <View style={styles.infoRow}>
          <Image source={pickup} style={styles.iconLarge} />
          <Text style={styles.infoText}>Express Store {'\n'}Pickup</Text>
        </View>
      </View>
      
      <View style={styles.horizontalLine}></View>

    </View>
  );
};

export default BannerCarousel;

const styles = StyleSheet.create({
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '4%',
    padding: 8,
  },
  carouselImage: {
    width: 395,
    height: 220,
  },
  dotIndicator: {
    height: 10,
    width: 10,
    borderRadius: 5,
    marginHorizontal: 6,
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
  },
  infoContainer: {
    flexDirection: 'row',
    paddingTop: 20,
    padding: 4,
    justifyContent: 'space-evenly',
  },
  infoRow: {
    flexDirection: 'row',
  },
  icon: {
    width: 30,
    height: 30,
    alignItems: 'center',
  },
  iconLarge: {
    width: 35,
    height: 35,
  },
  infoText: {
    color: '#005EBB',
    alignItems: 'center',
    fontSize: 13,
    paddingLeft: 3,
  },

  horizontalLine: {
    marginTop: '3%',
    borderBottomWidth: 0.3,
    borderBottomColor: '#d1d1d1',
  },
});
