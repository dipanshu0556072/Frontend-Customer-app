import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Alert,
  TouchableOpacity,
  Text,
  FlatList,
  Dimensions,
  Modal,
  TouchableWithoutFeedback
} from 'react-native';
import {TextInput} from 'react-native-paper';
import searchLogo from './PlpScreen/images/search2.png';
import axios from 'axios';
import {useLoginContext} from './Login/LoginCartProvider';
import {useCartContext} from './Context/WomenContext';
import filter from './PlpScreen/images/filter.png';
import sort from './PlpScreen/images/sorting.png';
import wishlistImage1 from './PlpScreen/images/heartP.png';
import wishlistImage2 from './PlpScreen/images/love1.png';
import {RadioButton} from 'react-native-paper';
import cross from './PlpScreen/images/close.png';
import FilterProductsModal from './Components/FilterProductsModal.jsx';

const Elastic = ({navigation}) => {
  const {ip, token} = useLoginContext();
  const {setCurrentProductIdOnPDP, wishListProductId, setWishListProductId,setSelectedFilterData,searchData, setSearchData,isAppliedFilterFromSearch,setIsAppliedFilterFromSearch,filteredDataOnPLP,setFilteredDataOnPLP} =
    useCartContext();
  const [isFocused, setIsFocused] = useState(false);
  const [searchText, setSearchText] = useState('');

  //show the Modal of sort and filter
  const [sortModalVisible, setSortModalVisible] = useState(false);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [sortBy, setSortBy] = useState('sortByLowPrice');

   //get product Category
   const productCategory = searchData && searchData[0]?.category?.parentCategory?.parentCategory?.name;

    // Function to handle button click based on title (WISHLIST or CART)
    const handleButtonPress = async (item,productId) => {
      if (wishListProductId.includes(productId)) {
        // If product is already in the wishlist, navigate to the Wishlist component
        navigation.navigate('WishList');
      } else {
        // Add the product to the wishlist
        await addProductToWishlist(item,productId);
      }
    };
    const addProductToWishlist = async (item, productId) => {
      const wishProduct = {
        productId: productId,
        size: 'M',
        quantity: 1,
        category: item?.category?.parentCategory?.parentCategory?.name,
        color: item?.color,
      };
  
      const header = {Authorization: `Bearer ${token}`};
      try {
        const response = await axios.put(
          `http://${ip}:5454/api/wishlist/add`,
          wishProduct,
          {headers: header},
        );
        setWishListProductId([...wishListProductId, productId]); // Add product to wishlist
        console.log('Product added to wishlist successfully!');
      } catch (error) {
        console.log('Error adding product to wishlist:', error);
      }
    };


  //call filter API for filter data from backend
  const filterProduct = async category => {
    setIsAppliedFilterFromSearch(true);
    try {
      const response = await axios.post(
        `http://${ip}:5454/api/products/filter?category=${category}`,
        searchData, // Send PLPData in the body of the POST request
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

     //apply the sorting from backend api based on selected option
  const sortProduct = async sortBy => {
    const data = filteredDataOnPLP.length > 0 ? filteredDataOnPLP : searchData;
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
        setSearchData(response.data);
      }
    } catch (error) {
      console.log('error in sortProduct in PLPPage' + error);
    }
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

  //SortAndFilter
  const SortAndFilter = ({img, title, fun}) => {
    return (
      <TouchableOpacity onPress={fun} style={styles.sortContainer}>
        <Image source={img} style={styles.sortImage} />
        <Text style={styles.sortImageText}>{title}</Text>
      </TouchableOpacity>
    );
  };

  //onPress of Image
  const onPressOfImag = async itemId => {
    setCurrentProductIdOnPDP(itemId);
    navigation.navigate('mainPDP');
  };

  // Define the searchApi function
  const searchApi = async () => {
    if (searchText.length > 0) {
      const response = await axios.get(
        `http://${ip}:5454/api/products/search?q=${searchText}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setSearchData(response.data);
    }
  };

  const handleSubmitEditing = () => {
    if (searchText.trim() !== '') {
      searchApi();
    }
  };

  const renderItem = ({item}) => {
    if (item.imageUrl && item.imageUrl.length > 0) {
      return (
        <View style={styles.imageContainer}>
          <TouchableOpacity
            onPress={() => {
              onPressOfImag(item.id);
            }}>
            <Image
              source={{uri: item.imageUrl[0]}}
              style={styles.searchImage}
            />
          </TouchableOpacity>
          <View style={styles.productDetailsContainer}>
            <Text style={[styles.titleText, {fontWeight: '500'}]}>
              {item.title}
            </Text>

            <Text style={[styles.titleText, {color: 'rgba(0,0,0,0.8)'}]}>
              {item.brand}
            </Text>
            <View style={styles.priceContainer}>
              <View>
                <Text style={styles.productPrice}>
                  ₹{item.discountedPrice} /{' '}
                  <Text style={styles.priceStrikethrough}>₹{item.price}</Text>
                </Text>

                {item?.discountPercent > 0 && (
                  <Text style={styles.discountPercent}>
                    {item.discountPercent}% OFF
                  </Text>
                )}
              </View>
              <TouchableOpacity onPress={() => {
              handleButtonPress(item,item.id);
            }}>
                <Image
                  source={
                    wishListProductId.includes(item.id)
                      ? wishlistImage2
                      : wishlistImage1
                  }
                  style={styles.wishListImage}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.imageContainer}>
          <Text>No Product Available</Text>
        </View>
      );
    }
  };

  // Get the screen height
  const screenHeight = Dimensions.get('window').height;
  return (
    <View style={styles.container}>
      {/* Search filter box */}
      <View style={styles.searchContainer}>
        <TextInput
          style={[
            styles.textInput,
            isFocused && styles.textInputFocused, // Apply styles conditionally
          ]}
          placeholder="Search by brand name or product"
          onFocus={() => setIsFocused(true)} // Set focus state to true
          onBlur={() => setIsFocused(false)} // Set focus state to false
          mode="outlined"
          theme={{
            colors: {
              primary: 'grey',
              placeholder: 'rgba(200, 200, 200, 0.1)',
            },
          }}
          outlineStyle={{borderWidth: 0}}
          onChangeText={text => {
            setSearchText(text);
            if (text.trim().length === 0) {
              setSearchData([]); // Clear search results immediately
            }
          }}
          onSubmitEditing={handleSubmitEditing}
        />
        <TouchableOpacity onPress={searchApi}>
          <Image source={searchLogo} style={styles.searchLogo} />
        </TouchableOpacity>
      </View>

      {/* Show the searchData */}
      <View style={styles.flatListContainer}>
        <FlatList
          data={filteredDataOnPLP?.length>0?filteredDataOnPLP:searchData}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
          numColumns={2} // Display two items per row
          columnWrapperStyle={styles.row} // Style for the row
          contentContainerStyle={styles.flatListContent} // Style for FlatList content
        />
        {/*Sort and filter functionality*/}
        {searchData && searchData.length > 0 && (
          <View
            style={[styles.sortAndFilterContainer, {top: screenHeight - 173}]}>
            <SortAndFilter img={sort} title="SORT" fun={handleSortPress} />
            <SortAndFilter
              img={filter}
              title="FILTER"
              fun={handleFilterPress}
            />
          </View>
        )}
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
    </View>
  );
};

export default Elastic;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  searchContainer: {
    borderWidth: 0.4,
    borderRadius: 8,
    height: 48,
    justifyContent: 'center',
    marginTop: '7%',
    marginHorizontal: '2.7%',
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    backgroundColor: 'transparent',
    borderRadius: 8,
  },
  searchLogo: {
    width: 30,
    height: 30,
  },
  flatListContent: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  row: {

    marginBottom: 10,
    justifyContent: 'flex-start',
  },
  imageContainer: {
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    overflow: 'hidden',
    padding: 10,
    maxWidth: '48%',
  },
  searchImage: {
    width: 160,
    height: 230,
    resizeMode: 'cover',
    borderRadius: 12,
  },
  flatListContainer: {
    marginTop: '6%',
    marginBottom: '28%',
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
    borderRightWidth: 1,
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

  titleText: {
    color: 'black',
    fontSize: 12,
  },
  productDetailsContainer: {
    marginTop: '4%',
    width: '100%',
  },

  productPrice: {
    color: 'black',
    fontWeight: '500',
    fontSize: 13,
    marginTop: '1%',
  },
  priceStrikethrough: {
    textDecorationLine: 'line-through',
    color: 'rgba(0, 0, 0, 0.8)',
    fontSize: 13,
    color: 'rgba(0,0,0,0.7)',
    fontWeight: '400',
  },
  discountPercent: {
    color: '#A4343A',
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  wishListImage: {
    width: 23,
    height: 23,
  },

  //modal 
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
