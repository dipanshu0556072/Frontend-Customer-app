import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Modal,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Dimensions,
  Alert,
} from 'react-native';
import React, {useState, useEffect, useMemo} from 'react';
import {useCartContext} from './Context/WomenContext.jsx';
import TopBar from './PlpScreen/TopBar.jsx';
import back from './PlpScreen/images/back.png';
import {RadioButton} from 'react-native-paper';
import filter from './PlpScreen/images/filter.png';
import cross from './PlpScreen/images/close.png';
import FilterProductsModal from './Components/FilterProductsModal.jsx';
import {useLoginContext} from './Login/LoginCartProvider.jsx';
import PLPComponent from './Components/PLPComponent.jsx';
import axios from 'axios';
import RotationView from './Components/RotatingViews.jsx';

const MainPlp = ({navigation}) => {
  //
  const {
    showActivityIndicator,
    setShowActivityIndicator,
    PLPData,
    setPLPData,
    filteredDataOnPLP,
    setFilteredDataOnPLP,
    setSelectedFilterData,
    setRecommendedSeeMoreBtn,
    recommenedSeeMoreBtn,
    showGroceryProductOnPLP,
    setShowGroceryProductOnPLP,
  } = useCartContext();
  const {ip, token, popFromStack} = useLoginContext();
  //show the Modal of sort and filter
  const [sortModalVisible, setSortModalVisible] = useState(false);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [sortBy, setSortBy] = useState('sortByLowPrice');

  // Get the screen height
  const screenHeight = Dimensions.get('window').height;

  //get product Category
  const productCategory = PLPData && PLPData[0]?.category?.name;

  //apply the sorting from backend api based on selected option
  const sortProduct = async sortBy => {
    const data = filteredDataOnPLP.length > 0 ? filteredDataOnPLP : PLPData;
    try {
      const response = await axios.post(
        `http://${ip}:5454/api/admin/products/${sortBy}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      // Determine which dataset to update based on filteredDataOnPLP's length
      if (filteredDataOnPLP.length > 0) {
        // If filtered data exists, update the filtered data
        setFilteredDataOnPLP(response.data);
      } else {
        // If no filtered data, update the main PLP data
        setPLPData(response.data);
      }
    } catch (error) {
      console.log('error in sortProduct in PLPPage' + error);
    }
  };

  //call filter API for filter data from backend
  const filterProduct = async category => {
    try {
      const response = await axios.post(
        `http://${ip}:5454/api/products/filter?category=${category}`,
        PLPData, // Send PLPData in the body of the POST request
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setSelectedFilterData(response.data);
    } catch (error) {
      console.log('Error in filterProduct in PLPPage:', error);
    }
  };

  //onPLP Page show data with filter or without any filter
  const showDataWithFilterOrWithoutFilterOnPLP = () => {
    if (filteredDataOnPLP && filteredDataOnPLP.length > 0) {
      return filteredDataOnPLP;
    } else {
      return PLPData;
    }
  };

  //SortAndFilter
  const SortAndFilter = ({img, title, fun}) => {
    return (
      <TouchableOpacity
        onPress={fun}
        style={[
          styles.sortContainer,
          {
            borderRightWidth: !(
              recommenedSeeMoreBtn === false && showGroceryProductOnPLP === true
            )
              ? 1
              : 0,
          },
        ]}>
        <Image source={img} style={styles.sortImage} />
        <Text style={styles.sortImageText}>{title}</Text>
      </TouchableOpacity>
    );
  };

  // modal handling functions
  const handleSortPress = () => {
    setSortModalVisible(true);
  };

  const handleFilterPress = () => {
    filterProduct('brand');
    setTimeout(() => {
      setFilterModalVisible(true);
    }, 500);
  };

  const handleSortModalClose = () => {
    setSortModalVisible(false);
  };
  const handleFilterModalClose = () => {
    setFilterModalVisible(false);
  };

  //sorting feature
  const SortData = ({val, title}) => {
    return (
      <RadioButton.Group
        onValueChange={newValue => {
          setSortBy(newValue);
          sortProduct(val, productCategory);
        }}
        value={sortBy}>
        <View style={styles.radioGroup}>
          <View style={styles.radioOption}>
            <TouchableOpacity style={styles.radioButton}>
              <RadioButton value={val} />
            </TouchableOpacity>
            <Text
              style={[styles.radioText, sortBy === val && styles.selectedText]}>
              {title}
            </Text>
          </View>
        </View>
      </RadioButton.Group>
    );
  };

  //if back button pressed
  const backButtonPressed = () => {
    //  fetchData();
    setRecommendedSeeMoreBtn(false);
    setShowGroceryProductOnPLP(false);
    popFromStack(navigation);
    setFilteredDataOnPLP([]);
  };

  useEffect(() => {
    // Show the ActivityIndicator for 2.5 seconds when component mounts
    const timer = setTimeout(() => {
      setShowActivityIndicator(false);
    }, 2500);

    // Clean up the timer when t  <BottomNavigator navigation={navigation}/>he component unmounts
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.mainContainer}>
      {/*-------------------------------------------show activity indicator-------------------------------------------------------------*/}
      {showActivityIndicator ? (
        <View style={styles.wrapper}>
          {/* <ActivityIndicator size="large" color="#00338D" /> */}
          <RotationView />
          <Text style={styles.updateProdileText}>
            Shop till you drop...or until the wifi goes out!
          </Text>
        </View>
      ) : (
        <>
          {/*header*/}
          <TopBar navigation={navigation} />
          {/*back button*/}
          <View style={styles.paddingWrapper}>
            <TouchableOpacity
              onPress={() => {
                backButtonPressed();
              }}
              style={styles.buttonWrapper}>
              <View style={styles.rowLayout}>
                <Image source={back} />
                <Text style={styles.categoryLabel}>
                  {recommenedSeeMoreBtn
                    ? 'Recommended For You'
                    : productCategory}
                </Text>
              </View>
              <Text style={styles.itemsCountLabel}>
                {filteredDataOnPLP && filteredDataOnPLP?.length
                  ? filteredDataOnPLP?.length
                  : PLPData?.length}{' '}
                Items
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.listMainContainer}>
            {/*show the list to the user */}
            <View style={styles.listContainer}>
              <FlatList
                scrollEnabled={true}
                data={showDataWithFilterOrWithoutFilterOnPLP()}
                numColumns={2} // Grid layout with 2 columns
                keyExtractor={item => item.id.toString()} // Ensure key is unique and in string format
                showsVerticalScrollIndicator={false} // Hide vertical scroll indicator
                renderItem={({item}) => (
                  <PLPComponent item={item} navigation={navigation} />
                )} // Use PLP_Page to render each item
              />
            </View>

            {/*Sort and filter functionality*/}
            <View
              style={[
                styles.sortAndFilterContainer,
                {top: screenHeight - 240},
              ]}>
              <SortAndFilter img={filter} title="SORT" fun={handleSortPress} />
              {/*added a condition, if showing recommended product, then do not show filter option*/}
              {!(
                recommenedSeeMoreBtn === false &&
                showGroceryProductOnPLP === true
              ) && (
                <SortAndFilter
                  img={filter}
                  title="FILTER"
                  fun={handleFilterPress}
                />
              )}
            </View>
          </View>
          {/* Sort Modal */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={sortModalVisible}
            onRequestClose={handleSortModalClose}>
            <TouchableWithoutFeedback onPress={handleSortModalClose}>
              <View style={styles.modalContainer}>
                <View style={styles.modalContent1}>
                  <View style={styles.headerContainer}>
                    <Text style={styles.headerText}>SORT BY:</Text>
                    <TouchableOpacity onPress={handleSortModalClose}>
                      <Image source={cross} style={styles.closeIcon} />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.separator} />
                  <SortData val="sortByLowPrice" title="Price -- Low to High" />
                  <SortData val="sortByHighDiscount" title="Discount" />
                  <SortData
                    val="sortByHighPrice"
                    title="Price -- High to Low"
                  />
                  <SortData val="sortByNewArrival" title="New Arrivals" />
                  <SortData val="sortByRating" title="Sort by rating" />
                </View>
              </View>
            </TouchableWithoutFeedback>
          </Modal>

          {/*filter modal*/}

          <FilterProductsModal
            visible={filterModalVisible}
            closeModal={handleFilterModalClose}
          />
        </>
      )}
    </View>
  );
};

export default MainPlp;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  paddingWrapper: {
    padding: '4%',
  },
  buttonWrapper: {
    // Empty if no styles are needed
  },
  rowLayout: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryLabel: {
    paddingLeft: 10,
    color: 'black',
    textAlign: 'center',
    fontFamily: 'sans-serif',
  },
  itemsCountLabel: {
    marginLeft: '7%',
    fontSize: 10,
    color: '#949292',
  },

  //flatList container
  listMainContainer: {
    position: 'relative',
  },
  listContainer: {
    margin: '4%',
    marginBottom: '60%',
  },
  sortAndFilterContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    width: '100%',
    height: 45,
    borderColor: '#888888',
    position: 'absolute',
    backgroundColor: 'white',
  },

  sortContainer: {
    width: '50%',

    borderColor: '#888888',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  sortImage: {
    width: 25,
    height: 24,
  },
  sortImageText: {
    textAlign: 'center',
    fontSize: 18,
    padding: '1%',
  },
  filterContainer: {},
  wrapper: {
    height: 100,
    marginTop: '90%',
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  updateProdileText: {
    color: 'black',
    fontWeight: '300',
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

  ratingText: {
    fontSize: 14,
    marginRight: '7%',
    color: 'black',
    flexShrink: 1,
  },
  productTitle: {
    fontSize: 13,
    color: '#2E2E2E',
    flexShrink: 1,
  },
  productPriceContainer: {
    flexDirection: 'row',
  },
  productDiscountPrice: {
    color: '#00A3A1',
    fontWeight: '700',
  },
  productPrice: {
    color: '#00A3A1',
    textDecorationLine: 'line-through',
  },
  productDiscount: {
    color: '#A4343A',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent1: {
    width: '100%',
    height: '50%',
    marginTop: '155%',
    backgroundColor: 'white',
    padding: 20,
    bottom: 0,
    position: 'fixed',
    borderRadius: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1%',
  },
  headerText: {
    color: '#00338D',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'montserrat',
    marginTop: '3%',
  },
  closeIcon: {
    width: 13,
    height: 14,
  },
  separator: {
    width: '100%',
    borderBottomWidth: 1,
    borderColor: '#dbd9d9',
    marginBottom: '3%',
  },
  radioGroup: {
    marginTop: '4%',
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioButton: {
    marginLeft: '2%',
  },
  radioText: {
    color: '#00338D',
    marginLeft: 8,
  },
  selectedText: {
    fontWeight: '700',
  },
});
