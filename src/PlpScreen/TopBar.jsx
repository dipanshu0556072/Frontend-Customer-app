import React, {useState} from 'react';
import {
  Image,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
} from 'react-native';
import searchIcon from '../PlpScreen/images/search.png';
import bag from '../PlpScreen/images/bag.png';
import heart from '../PlpScreen/images/heart.png';
import kpmg from '../PlpScreen/images/kpmg.png';
import {useLoginContext} from '../Login/LoginCartProvider';
import {useCartContext} from '../Context/WomenContext';
import {useGroceryContext} from '../Grocery/GroceryContext';

export default function TopBar1({
  navigation,
  showKPMGLogo = true,
  showCartLogo = true,
  showWishListLogo = true,
  showSearchLogo = true,
}) {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const {pushToStack, popFromStack, currentPage, setCurrentPage} =
    useLoginContext();
  const {
    setBannerComponentName,
    setProducts,
    setRecommendedSeeMoreBtn,
    setShowGroceryProductOnPLP,
    setScheduleSubscriptionOption,
    setDate,
    setEndDate,
  } = useCartContext();

  const {
    setSelectedAddress,
    setIsSubcriptionModifyRequest,
    setSelectQuantity,
  } = useGroceryContext();

  const handleTouchablePress = () => {
    Keyboard.dismiss();
    setIsSearchVisible(false);

  };

  //reset subscription data
  const resetSubsData=()=>{
    setScheduleSubscriptionOption('0');
    setDate(null);
    setEndDate(null);
    setSelectedAddress(null);
    setIsSubcriptionModifyRequest(false);
    setSelectQuantity(1);
  }

  function forNavigate(page) {
    if (currentPage && currentPage[currentPage.length - 1] !== page) {
      pushToStack(page);
      navigation.navigate(page);
    } else {
      popFromStack(navigation);
    }
    setRecommendedSeeMoreBtn(false);
    setShowGroceryProductOnPLP(false);
  }

  //if home button pressed
  const onPressHome = () => {
    forNavigate('mainHome');
    setRecommendedSeeMoreBtn(false);
    setShowGroceryProductOnPLP(false);
    setBannerComponentName('homeBar');
    setProducts([]);
    setCurrentPage(['mainHome']);
    resetSubsData();
  };
  //if bag button pressed
  const onPressBag = page => {
    forNavigate(page);
    setRecommendedSeeMoreBtn(false);
    setShowGroceryProductOnPLP(false);
    setBannerComponentName(page);
    setProducts([]);
    resetSubsData();
  };
  return (
    <TouchableWithoutFeedback onPress={handleTouchablePress}>
      <View style={styles.container}>
        <View style={styles.topBar}>
          {showKPMGLogo && (
            <TouchableOpacity
              onPress={() => {
                onPressHome();
              }}>
              <Image source={kpmg} style={styles.kpmgImage} />
            </TouchableOpacity>
          )}
          <View style={styles.iconsContainer}>
            {showSearchLogo && (
              <TouchableOpacity onPress={() => forNavigate('Elastic')}>
                <Image source={searchIcon} style={styles.searchIcon} />
              </TouchableOpacity>
            )}
            {showCartLogo && (
              <TouchableOpacity onPress={() => onPressBag('mainBag')}>
                <Image source={bag} style={styles.bagIcon} />
              </TouchableOpacity>
            )}
            {showWishListLogo && (
              <TouchableOpacity onPress={() => onPressBag('WishList')}>
                <Image source={heart} style={styles.heartIcon} />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  topBar: {
    padding: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginRight: '3%',
  },
  kpmgImage: {
    width: 100,
    height: 100,
    marginLeft: '10%',
  },
  iconsContainer: {
    flexDirection: 'row',
  },
  searchIcon: {
    marginRight: 10,
    width: 25,
    height: 33,
  },
  bagIcon: {
    marginRight: 10,
  },
  heartIcon: {},
});
