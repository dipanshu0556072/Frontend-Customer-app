import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  ScrollView,
  SafeAreaView,
  Modal,
  Alert,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect, useMemo} from 'react';
import {useCartContext} from './Context/WomenContext';
import TopBar from './PlpScreen/TopBar';
import back from './PlpScreen/images/back.png';
import star2 from './PlpScreen/images/star2.png';
import close from './close3.png';
import {RadioButton} from 'react-native-paper';
import checkSymbol from './PlpScreen/images/checkSymbol.png';
import love1 from './PlpScreen/images/love1.png';
import love2 from './PlpScreen/images/love2.png';
import TopBar1 from './TopBar1.jsx';

import axios from 'axios';
import {useLoginContext} from './Login/LoginCartProvider';
import filter from './PlpScreen/images/filter.png';
import CheckBox from '@react-native-community/checkbox';
import cross from './PlpScreen/images/close.png';
import check1 from './PlpScreen/images/check11.png';
import check2 from './PlpScreen/images/check22.png';

const MainPlp = ({navigation}) => {
  const {
    ip,
    token,
    popFromStack,
    pushToStack,
    currentPage,
    setCurrentPage,
    currentPageIndex,
    setCurrentPageIndex,
    currentPageIndexCategory,
    setCurrentPageIndexCategory,
    targetParentCategory,
    setTargetParentCategory,
  } = useLoginContext();
  const [productRatings, setProductRatings] = useState({});

  let pd = currentPageIndexCategory;
  const targetCategory = pd;

  const colorMap = {
    navyblue: '#000080',
    black: '#000000',
    maroon: '#800000',
    green: '#008000',
    yellow: '#FFFF00',
    brown: '#A52A2A',
    grey: '#808080',
    white: '#FFFFFF',
    olivegreen: '#4b5320',
    skyblue: '#87CEEB',
    blue: '#0000FF',
    red: '#FF0000',
    midnightblue: '#191970',
    pink: '#FFC0CB',
    mustard: '#FFDB58',
    cream: '#FFFDD0',
  };

  const {
    products,
    setProducts,
    sortBy,
    setSortBy,
    wishListData,
    setWishListData,
    seeMoreFilterCatefory,
    setSeeMoreFilterCategory,
    productIds,
    filteredDataArray,
    setFilteredDataArray,
    lovedItems,
    setLovedItems,
    showActivityIndicator,
    setShowActivityIndicator,
    setProductIdOnPdp,
  } = useCartContext();

  const forNavigate = page => {
    console.log(page + ' ' + currentPage[currentPage.length - 1]);
    if (currentPage && currentPage[currentPage.length - 1] !== page) {
      pushToStack(page);
      navigation.navigate(page);
    } else {
      popFromStack(navigation);
    }
  };

  useEffect(() => {
    if (currentPageIndex === 1) {
      setTargetParentCategory('Men');
    } else if (currentPageIndex === 2) {
      setTargetParentCategory('Women');
    } else if (currentPageIndex === 3) {
      setTargetParentCategory('Kids');
    }
    setSeeMoreFilterCategory(currentPageIndexCategory);
    return () => {
      setShowActivityIndicator(false); // Set loading to false when the component unmounts or the dependency changes
    };
  }, []);

  useEffect(
    () => {
      const getProductRatings = async productId => {
        try {
          const response = await axios.get(
            `http://${ip}:5454/api/ratings/product/${productId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );

          // console.log(`Ratings for product ${productId}:`, response.data);

          // Calculate the average rating
          const ratingsArray = response.data.map(ratingObj => ratingObj.rating);
          const averageRating =
            ratingsArray.length > 0
              ? ratingsArray.reduce((a, b) => a + b) / ratingsArray.length
              : 0;
          setTimeout(() => {
            setShowActivityIndicator(false);
          }, 500);

          setProductRatings(prevRatings => ({
            ...prevRatings,
            [productId]: averageRating,
          }));
          // console.log(JSON.stringify(response.data));
        } catch (error) {
          console.error(
            `Error fetching ratings for product ${productId}:`,
            error.message,
          );
        }
      };

      // Assuming you have an array of product IDs

      // Fetch and process ratings for all products concurrently
      const fetchRatings = async () => {
        productIds.forEach(productId => {
          getProductRatings(productId);
        });
      };

      fetchRatings();

      return () => {
        setShowActivityIndicator(false); // Set loading to false when the component unmounts or the dependency changes
      };
    },
    [
      /* Add dependencies if needed */
    ],
  );

  // Additional ranges for price filter
  const priceRanges = [
    {min: 0, max: 499},
    {min: 500, max: 2599},
    {min: 2600, max: 3999},
    {min: 4000, max: 99999},
  ];
  const percentageRanges = [
    {min: 0, max: 28},
    {min: 29, max: 60},
    // Add more ranges as needed
  ];

  const [selectedPercentageRanges, setSelectedPercentageRanges] = useState([]);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  const [sortModalVisible, setSortModalVisible] = useState(false);
  const [filterModalVisible, setFilterModalVisible] = useState(false);

  const [filterApply, setFilterApply] = useState(false);
  const [filteredCategory, setFilteredCategory] = useState(new Set());

  const [selectedTab, setSelectedTab] = useState(null);

  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedPrices, setSelectedPrices] = useState([]);
  const [selectedDiscounts, setSelectedDiscounts] = useState([]);
  const [selectedSize, setSelectedSize] = useState([]);
  const [selectedSellers, setSelectedSellers] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [isChecked, setIsChecked] = useState([]);

  const handleTabPress = tab => {
    setSelectedTab(tab);
  };

  const filterSet = brand => {
    setFilteredCategory(prevFilteredCategory => {
      const updatedCategory = new Set(prevFilteredCategory);

      // Toggle the brand in the set (add if not present, remove if present)
      if (updatedCategory.has(brand)) {
        updatedCategory.delete(brand);
      } else {
        updatedCategory.add(brand);
      }

      return updatedCategory;
    });
  };
  useEffect(() => {
    getWishListData();
    checkTheProductsWhichInWishListData();

    return () => {
      setShowActivityIndicator(false); // Set loading to false when the component unmounts or the dependency changes
    };
  }, []);

  const [loveImageSource, setLoveImageSource] = useState(love2);
  const [filterName, setFilterName] = useState('brand');
  const uniqueBrands = new Set();
  const uniqueColors = new Set();
  const uniquePrice = new Set();
  const uniqueDiscount = new Set();
  const uniqueSeller = new Set();
  const uniqueSizes = new Set();

  if (products) {
    products.forEach(item => {
      if (
        item.category &&
        item.category.name === targetCategory &&
        item.category.parentCategory &&
        item.category.parentCategory.parentCategory &&
        item.category.parentCategory.parentCategory.name ===
          targetParentCategory
      ) {
        uniqueBrands.add(item.brand);
        uniqueColors.add(item.color);
        uniquePrice.add(item.discountedPrice);
        uniqueDiscount.add(item.discountPercent);
        uniqueSeller.add(item.seller);
      }
    });
  }

  if (products) {
    products.forEach(item => {
      if (
        item.category &&
        item.category.name === targetCategory &&
        item.category.parentCategory.parentCategory.name ===
          targetParentCategory &&
        item.sizes
      ) {
        const itemSizes = item.sizes.map(sizeObj => sizeObj.name);

        itemSizes.forEach(size => {
          uniqueSizes.add(size);
        });
      }
    });
  }

  const getWishListData = async () => {
    try {
      const response = await axios.get(`http://${ip}:5454/api/wishlist/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTimeout(() => {
        setShowActivityIndicator(false);
      }, 500);
      setLovedItems(
        response.data.wishlistItems.map(
          wishlistItem => wishlistItem.product.id,
        ),
      );
      // setWishListData((prevProducts) => {
      //   const newProducts = response.data;
      //   const mergedProducts = [...prevProducts, ...newProducts];
      //   console.log("WishlistdataArray:" + JSON.stringify(mergedProducts));
      //   return mergedProducts;
      // });
      setWishListData(prevProducts => {
        const newProducts = response.data;
        // console.log("\n\n\nWishList:" + JSON.stringify(newProducts));
        return newProducts;
      });

      // console.log("\n\n\nTOKEN:" + token);
    } catch (error) {
      console.error('Error fetching WishListdata:', error);
    }
  };
  console.log(JSON.stringify(filteredDataArray));

  const addToWish = async itemId => {
    // console.log("\n\n\n"+targetCategory);
    const data = {
      productId: itemId,
      size: 'M',
      quantity: 1,
      category: 'Men formal',
      color: targetCategory,
    };

    try {
      const response = await axios.put(
        `http://${ip}:5454/api/wishlist/add`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      // console.log(response.data);
      // ((prevProducts) => {
      //   const newProducts = response.data;
      //   console.log("\n\n\nWishList:" + JSON.stringify(newProducts));
      //   return newProducts;
      // });
      setTimeout(() => {
        setShowActivityIndicator(false);
      }, 500);
      getWishListData();
    } catch (error) {
      console.error('Error fetching WishListdata:', error);
    }
  };

  const handleLovePress = async itemId => {
    // console.log("Current loved items:", lovedItems);

    const isLoved = lovedItems.includes(itemId);
    // console.log("Is loved?", isLoved);

    const newLovedItems = isLoved
      ? lovedItems.filter(id => id !== itemId)
      : [...lovedItems, itemId];
    // console.log("New loved items:", newLovedItems);

    setLovedItems(newLovedItems);

    if (isLoved) {
      // console.log("\n\n\n\nRemoving from wishlist:", itemId);
      removeBagItem(itemId);
    } else {
      // console.log("Adding to wishlist:", itemId);
      addToWish(itemId);
    }
  };

  const removeBagItem = async itemId => {
    await axios
      .delete(`http://${ip}:5454/api/wishlist_items/` + itemId, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        // console.log("\n\n\nID To Be Deleted\n\n\n");
        // Remove the item from wishListData state
        setTimeout(() => {
          setShowActivityIndicator(false);
        }, 500);
      })
      .catch(error => {
        console.log('Error' + error);
      });
  };

  const handleSortPress = () => {
    setSortModalVisible(true);
  };

  const handleFilterPress = () => {
    setFilterModalVisible(true);
  };

  const handleSortModalClose = () => {
    // Additional logic to handle sorting or other actions
    setTimeout(() => {
      setSortModalVisible(false);
    }, 100);
  };
  if (products) {
    products.forEach(item => {
      if (
        item.category.name === targetCategory &&
        item.category.parentCategory.parentCategory.name ===
          targetParentCategory
      ) {
        uniquePrice.add(item.discountedPrice); // Update to use discountedPrice instead of brand
      }
    });
  }
  const handleFilterModalClose = () => {
    setTimeout(() => {
      setFilterModalVisible(false);
    }, 10);
  };

  // console.log("\n\n\nProductFIlter"+JSON.stringify(products));

  const handleBrandCheckboxChange = brand => {
    setSelectedBrands(prevSelectedBrands => {
      if (prevSelectedBrands.includes(brand)) {
        return prevSelectedBrands.filter(
          selectedBrand => selectedBrand !== brand,
        );
      } else {
        return [...prevSelectedBrands, brand];
      }
    });
  };

  const handleColorCheckboxChange = brand => {
    if (isChecked.includes(brand)) {
      setIsChecked(isChecked.filter(id => id !== brand));
    } else {
      setIsChecked([...isChecked, brand]);
    }
    setSelectedColors(prevSelectedBrands => {
      if (prevSelectedBrands.includes(brand)) {
        return prevSelectedBrands.filter(
          selectedBrand => selectedBrand !== brand,
        );
      } else {
        return [...prevSelectedBrands, brand];
      }
    });
  };

  const handlePriceCheckboxChange = range => {
    setSelectedPrices(prevSelectedPrices => {
      const isRangeSelected = prevSelectedPrices.some(
        price => price.min === range.min && price.max === range.max,
      );

      if (isRangeSelected) {
        return prevSelectedPrices.filter(
          selectedRange =>
            selectedRange.min !== range.min || selectedRange.max !== range.max,
        );
      } else {
        return [...prevSelectedPrices, range];
      }
    });
  };

  const handleDiscountCheckboxChange = range => {
    setSelectedDiscounts(prevSelectedDiscounts => {
      if (
        prevSelectedDiscounts.some(
          selectedRange =>
            selectedRange.min === range.min && selectedRange.max === range.max,
        )
      ) {
        return prevSelectedDiscounts.filter(
          selectedRange =>
            selectedRange.min !== range.min || selectedRange.max !== range.max,
        );
      } else {
        return [...prevSelectedDiscounts, range];
      }
    });
  };

  const handleSellerCheckboxChange = brand => {
    setSelectedSellers(prevSelectedBrands => {
      if (prevSelectedBrands.includes(brand)) {
        return prevSelectedBrands.filter(
          selectedBrand => selectedBrand !== brand,
        );
      } else {
        return [...prevSelectedBrands, brand];
      }
    });
  };

  const filterSelectionApply = () => {
    const filteredArray = products.filter(product => {
      if (product.category.name !== targetCategory) return false;

      if (filteredCategory.size && !filteredCategory.has(product.brand))
        return false;

      if (selectedBrands.length && !selectedBrands.includes(product.brand))
        return false;

      if (selectedColors.length && !selectedColors.includes(product.color))
        return false;

      if (
        selectedPrices.length &&
        !selectedPrices.some(
          range =>
            range.min <= product.discountedPrice &&
            product.discountedPrice <= range.max,
        )
      )
        return false;

      // Update to check if the product's discountPercent is within the selected discount ranges
      if (
        selectedDiscounts.length &&
        !selectedDiscounts.some(
          range =>
            range.min <= product.discountPercent &&
            product.discountPercent <= range.max,
        )
      )
        return false;

      if (selectedSellers.length && !selectedSellers.includes(product.seller))
        return false;

      // Check if the product size is in the selected sizes
      if (selectedSizes.length && !selectedSizes.includes(product.size))
        return false;

      return true;
    });

    setFilteredDataArray(filteredArray);
    setFilterModalVisible(false); // Close the filter modal after applying filters
  };

  const handleSizeCheckboxChange = size => {
    setSelectedSizes(prevSelectedSizes => {
      if (prevSelectedSizes.includes(size)) {
        return prevSelectedSizes.filter(selectedSize => selectedSize !== size);
      } else {
        return [...prevSelectedSizes, size];
      }
    });
  };

  const handleSizePress = size => {
    handleSizeCheckboxChange(size);
    // Add any additional logic you want to perform on size press
  };

  const clearAllFilters = () => {
    setFilterModalVisible(false);
    setSelectedBrands([]);
    setSelectedColors([]);
    setSelectedDiscounts([]);
    setSelectedPrices([]);
    setSelectedSellers([]);
    setIsChecked([]);
    setFilteredDataArray(
      products.filter(
        product =>
          product.category.name === targetCategory &&
          product.category.parentCategory.parentCategory.name ===
            targetParentCategory,
      ),
    );
  };

  const navigateToMainPDP = (itemCategory, itemId) => {
    // Push 'mainPDP' onto the stack before navigating
    pushToStack('mainPDP');

    // console.log("\n\n\nidouojd"+itemCategory);

    setProductIdOnPdp(itemId);
    setCurrentPageIndex(itemId);
    setCurrentPageIndexCategory(itemCategory.name);
    // Navigate to 'mainPDP' with additional parameters
    // navigation.navigate('mainPDP', { category: itemCategory, id: itemId });
    if (
      currentPage &&
      currentPage.length > 0 &&
      currentPage[currentPage.length - 1] === 'mainPDP'
    ) {
      popFromStack(navigation);
    }
    if (
      currentPage &&
      currentPage.length > 0 &&
      currentPage[currentPage.length - 1] !== 'mainPDP'
    ) {
      pushToStack('mainPDP');
      navigation.navigate('mainPDP');
    }
  };

  function checkTheProductsWhichInWishListData() {
    if (
      wishListData &&
      wishListData.wishListItems &&
      wishListData.wishListItems.length > 0
    ) {
      wishListData.wishListItems.forEach((item, index) => {
        setLovedItems(prevLovedItems => {
          // Check if the item.id is not already in the array before adding it
          if (!prevLovedItems.some(lovedItem => lovedItem.id === item.id)) {
            const updatedLovedItems = [...prevLovedItems, item];
            return updatedLovedItems;
          } else {
            return prevLovedItems; // If item.id is already in the array, return the existing array
          }
        });
      });
    }
  }

  if (showActivityIndicator) {
    return (
      <>
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator size="large" color="#00338D" />
        </View>
      </>
    );
  }

  //sort the product based on sorting from backend
  const sortProductFromBackend = async (sortBy, category) => {
    try {
      const response = await axios.get(
        `http://${ip}:5454/api/admin/products/${sortBy}?category=${category}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setFilteredDataArray(response.data);
    } catch (error) {
      console.log(
        'got error in the sortProductFromBackend in mainPlp.jsx',
        error,
      );
    }
  };

  //sort the products
  const sortProduct = sortBy => {
    const category = [
      ...new Set(filteredDataArray.map(product => product.category.name)),
    ];
    sortProductFromBackend(sortBy, category);
  };
  // Define the mapping of radio button values to sort strings
  const sortOptions = {
    low: 'sortByLowPrice',
    high: 'sortByHighPrice',
    dsc: 'sortByNewArrival',
    rating: 'sortByRating',
  };

  //if back button pressed then again put all clothes data in products useState
  const fetchData = async(category) => {
    try {
      const response = axios.get(
        `http://${ip}:5454/api/admin/products/getProductBySecondCategory?category=Women`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setProducts(response.data);
    } catch (error) {
      console.log('getting error in the homeBar.jsx in fetchData' + error);
    }
  };

  //if back button pressed
  const backButtonPressed = () => {
    fetchData();
    popFromStack(navigation);
  };

  return (
    <>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <TopBar navigation={navigation} />
        <View style={{padding: '4%'}}>
          <TouchableOpacity
            onPress={() => {
              backButtonPressed();
            }}
            style={{}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image source={back} />
              <Text
                style={{
                  paddingLeft: 10,
                  color: 'black',
                  textAlign: 'center',
                  fontFamily: 'sans-serif',
                }}>
                {targetCategory.toUpperCase()}
              </Text>
            </View>
            <Text style={{marginLeft: '7%', fontSize: 10, color: '#949292'}}>
              {filteredDataArray.length} Items {seeMoreFilterCatefory}{' '}
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView>
          <SafeAreaView>
            <View
              style={{
                margin: '3%',
              }}>
              <FlatList
                nestedScrollEnabled={true}
                data={filteredDataArray}
                renderItem={({item}) => product({item, navigation, lovedItems})}
                keyExtractor={item => item.id}
                vertical={true}
                numColumns={2}
              />
            </View>
          </SafeAreaView>
        </ScrollView>

        <View>
          <View
            style={{
              flexDirection: 'row',
              borderWidth: 1,
              width: '100%',
              height: 60,
              marginBottom: '3%',
              borderColor: '#888888',
            }}>
            <TouchableOpacity
              onPress={handleSortPress}
              style={{
                width: '50%',
                borderRightWidth: 1,
                borderColor: '#888888',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <Image
                source={{uri: 'http://surl.li/mynwl'}}
                style={{width: 25, height: 31}}
              />
              <Text style={{textAlign: 'center', fontSize: 18, padding: '1%'}}>
                SORT
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleFilterPress}
              style={{
                width: '50%',
                borderColor: '#888888',
                justifyContent: 'center',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Image source={filter} style={{width: 25, height: 24}} />
              <Text style={{textAlign: 'center', fontSize: 18}}>FILTER</Text>
            </TouchableOpacity>
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
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '1%',
                    }}>
                    <Text
                      style={{
                        color: '#00338D',
                        fontSize: 18,
                        fontWeight: 'bold',
                        fontFamily: 'montserrat',
                        marginTop: '3%',
                      }}>
                      SORT BY:
                    </Text>
                    <TouchableOpacity onPress={handleSortModalClose}>
                      {/* <Text style={{ marginBottom: '4%' }}>╳</Text> */}
                      <Image source={cross} style={{width: 13, height: 14}} />
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      width: '100%',
                      borderBottomWidth: 1,
                      borderColor: '#dbd9d9',
                    }}
                  />

                  <RadioButton.Group
                    onValueChange={newValue => {
                      setSortBy(newValue);
                      const sortString = sortOptions[newValue]; // Get the corresponding string
                      sortProduct(sortString); // Call sortProduct with the mapped string
                    }}
                    value={sortBy}>
                    <View style={{marginTop: '6%'}}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginBottom: 10,
                        }}>
                        <RadioButton value="low" />
                        <Text
                          style={{
                            color: '#00338D',
                            fontWeight: sortBy === 'low' ? '700' : '400',
                            marginLeft: 8,
                          }}>
                          Price -- Low to High
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginBottom: 10,
                        }}>
                        <RadioButton value="high" />
                        <Text
                          style={{
                            color: '#00338D',
                            fontWeight: sortBy === 'high' ? '700' : '400',
                            marginLeft: 8,
                          }}>
                          Price -- High to Low
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginBottom: 10,
                        }}>
                        <RadioButton value="dsc" />
                        <Text
                          style={{
                            color: '#00338D',
                            fontWeight: sortBy === 'dsc' ? '700' : '400',
                            marginLeft: 8,
                          }}>
                          New Arrivals
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginBottom: 10,
                        }}>
                        <RadioButton value="rating" />
                        <Text
                          style={{
                            color: '#00338D',
                            fontWeight: sortBy === 'rating' ? '700' : '400',
                            marginLeft: 8,
                          }}>
                          Sort by rating
                        </Text>
                      </View>
                    </View>
                  </RadioButton.Group>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </Modal>

          {/* Filter Modal */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={filterModalVisible}
            onRequestClose={handleFilterModalClose}>
            <TouchableWithoutFeedback onPress={handleFilterModalClose}>
              <View style={styles.modalContainer}>
                <View style={styles.modalContent2}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: 22,
                        marginTop: '3%',
                        color: '#00338D',
                        fontWeight: '500',
                        marginLeft: '4%',
                      }}>
                      FILTERS
                    </Text>
                    <TouchableOpacity onPress={() => clearAllFilters()}>
                      <Text
                        style={{
                          fontSize: 15,
                          marginTop: '3%',
                          color: '#910404',
                          fontWeight: '400',
                          marginRight: '4%',
                        }}>
                        CLEAR ALL
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.horizontalLine1} />

                  <View
                    style={{
                      flexDirection: 'row',
                      width: '100%',
                      height: '40%',
                    }}>
                    <View style={{width: '30%', padding: '1%'}}>
                      <TouchableOpacity onPress={() => setFilterName('brand')}>
                        <Text
                          style={{
                            fontSize: 17,
                            padding: '10%',
                            fontWeight: '400',
                            color: '#00338D',
                            fontWeight: filterName === 'brand' ? '600' : '400',
                            color: '#00338D',
                          }}>
                          Brand
                        </Text>
                      </TouchableOpacity>
                      <View style={styles.horizontalLine1} />
                      <TouchableOpacity
                        style={{}}
                        onPress={() => setFilterName('color')}>
                        <Text
                          style={{
                            fontSize: 17,
                            padding: '10%',
                            fontWeight: '400',
                            color: '#00338D',
                            fontWeight: filterName === 'color' ? '600' : '400',
                          }}>
                          Colors
                        </Text>
                      </TouchableOpacity>
                      <View style={styles.horizontalLine1} />
                      <TouchableOpacity
                        style={{}}
                        onPress={() => setFilterName('discountedPrice')}>
                        <Text
                          style={{
                            fontSize: 17,
                            padding: '10%',
                            fontWeight:
                              filterName === 'discountedPrice' ? '600' : '400',
                            color: '#00338D',
                          }}>
                          Price
                        </Text>
                      </TouchableOpacity>
                      <View style={styles.horizontalLine1} />
                      <TouchableOpacity
                        style={{}}
                        onPress={() => setFilterName('discountPercent')}>
                        <Text
                          style={{
                            fontSize: 17,
                            padding: '10%',
                            color: '#00338D',
                            fontWeight:
                              filterName === 'discountPercent' ? '600' : '400',
                          }}>
                          Discount
                        </Text>
                      </TouchableOpacity>
                      <View style={styles.horizontalLine1} />
                      {/* <TouchableOpacity style={{}} onPress={() => setFilterName("size")}>
                  <Text style={{ fontSize: 17, padding: '10%', fontWeight: filterName === 'size' ? '600' : '400', color: '#00338D' }}>Size</Text>
                </TouchableOpacity>
                        <View style={styles.horizontalLine1}/> */}
                      <TouchableOpacity
                        style={{}}
                        onPress={() => setFilterName('seller')}>
                        <Text
                          style={{
                            fontSize: 17,
                            padding: '10%',
                            fontWeight: filterName === 'seller' ? '600' : '400',
                            color: '#00338D',
                          }}>
                          Seller
                        </Text>
                      </TouchableOpacity>
                    </View>

                    {filterName === 'brand' && (
                      <>
                        <View
                          style={{
                            width: '60%',
                            borderLeftWidth: 0.2,
                            borderColor: '#00338D',
                            padding: '6%',
                            height: '102.5%',
                          }}>
                          {Array.from(uniqueBrands).map((brand, index) => (
                            <View
                              key={index}
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                alignContent: 'center',
                                marginBottom: 8,
                                padding: '3%',
                              }}>
                              <CheckBox
                                disabled={false}
                                value={selectedBrands.includes(brand)}
                                onValueChange={() =>
                                  handleBrandCheckboxChange(brand)
                                }
                              />
                              <Text
                                style={{
                                  marginLeft: 8,
                                  color: '#00338D',
                                  fontWeight: '300',
                                }}>
                                {brand}
                              </Text>
                            </View>
                          ))}
                        </View>
                      </>
                    )}
                    {filterName === 'color' && (
                      <>
                        <View
                          style={{
                            width: '60%',
                            borderLeftWidth: 0.8,
                            borderColor: '#d1d1d1',
                            padding: '6%',
                          }}>
                          {Array.from(uniqueColors).map((color, index) => (
                            <View
                              key={index}
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                alignContent: 'center',
                                marginBottom: 8,
                                padding: '3%',
                                marginLeft: '12%',
                              }}>
                              <CheckBox
                                disabled={false}
                                value={selectedColors.includes(color)}
                                onValueChange={() =>
                                  handleColorCheckboxChange(color)
                                }
                              />
                              {/* <TouchableOpacity onPress={() => handleColorCheckboxChange(color)}>
                                <Image source={isChecked.includes(color)?check2:check1} style={{width:20,height:18,padding:12,margin:'4%',
                                   marginBottom: isChecked.includes(color) ? '10%' : '10%',padding:'12%'}}/></TouchableOpacity> */}
                              <View
                                style={{
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                }}>
                                <View
                                  style={{
                                    width: 25,
                                    height: 25,
                                    backgroundColor:
                                      color === 'white'
                                        ? '#FFFFFF'
                                        : colorMap[color] || '#FFFFFF',
                                    borderRadius: color === 'white' ? 12 : 12,
                                    borderWidth: color === 'white' ? 1 : 0, // Add border only if color is white
                                    borderColor:
                                      color === 'white'
                                        ? 'black'
                                        : 'transparent', // Border color red if color is white
                                    marginBottom: '4%',
                                    marginLeft: '5%',
                                  }}
                                />
                                <Text
                                  style={{
                                    marginLeft: 8,
                                    color: '#00338D',
                                    fontWeight: '300',
                                  }}>
                                  {color}
                                </Text>
                              </View>
                            </View>
                          ))}
                        </View>
                      </>
                    )}
                    {filterName === 'size' && (
                      <View
                        style={{
                          width: '60%',
                          borderLeftWidth: 0.8,
                          borderColor: '#d1d1d1',
                          padding: '6%',
                        }}>
                        {Array.from(uniqueSizes).map((size, index) => (
                          <TouchableOpacity
                            key={index}
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              alignContent: 'center',
                              marginBottom: 8,
                              padding: '3%',
                            }}
                            onPress={() => handleSizePress(size)}>
                            <CheckBox
                              disabled={false}
                              value={selectedSizes.includes(size)}
                              onValueChange={() =>
                                handleSizeCheckboxChange(size)
                              }
                            />
                            <Text
                              style={{
                                marginLeft: 8,
                                color: '#00338D',
                                fontWeight: '300',
                              }}>
                              {size}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    )}

                    {filterName === 'discountedPrice' && (
                      <View
                        style={{
                          width: '60%',
                          borderLeftWidth: 0.8,
                          borderColor: '#d1d1d1',
                          padding: '6%',
                        }}>
                        {priceRanges.map((range, index) => (
                          <View
                            key={index}
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              alignContent: 'center',
                              marginBottom: 8,
                              padding: '3%',
                            }}>
                            <CheckBox
                              disabled={false}
                              value={selectedPrices.some(
                                price =>
                                  price.min === range.min &&
                                  price.max === range.max,
                              )}
                              onValueChange={() =>
                                handlePriceCheckboxChange(range)
                              }
                            />
                            <Text
                              style={{
                                marginLeft: 8,
                                color: '#00338D',
                                fontWeight: '300',
                              }}>
                              {range.max === 99999
                                ? `Rs. ${range.min} - Above`
                                : range.max === 499
                                ? `Rs. ${range.max} and Below`
                                : `Rs. ${range.min}-${range.max}`}
                            </Text>
                          </View>
                        ))}
                      </View>
                    )}

                    {filterName === 'discountPercent' && (
                      <View
                        style={{
                          width: '60%',
                          borderLeftWidth: 0.8,
                          borderColor: '#d1d1d1',
                          padding: '6%',
                        }}>
                        {percentageRanges.map((range, index) => (
                          <View
                            key={index}
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              alignContent: 'center',
                              marginBottom: 8,
                              padding: '3%',
                            }}>
                            <CheckBox
                              disabled={false}
                              value={selectedDiscounts.some(
                                selectedRange =>
                                  selectedRange.min === range.min &&
                                  selectedRange.max === range.max,
                              )}
                              onValueChange={() =>
                                handleDiscountCheckboxChange(range)
                              }
                            />
                            <Text
                              style={{
                                marginLeft: 8,
                                color: '#00338D',
                                fontWeight: '300',
                              }}>{`${range.min}-${range.max}%`}</Text>
                          </View>
                        ))}
                      </View>
                    )}

                    {filterName === 'seller' && (
                      <>
                        <View
                          style={{
                            width: '60%',
                            borderLeftWidth: 0.8,
                            borderColor: '#d1d1d1',
                            padding: '6%',
                          }}>
                          {Array.from(uniqueSeller).map((brand, index) => (
                            <View
                              key={index}
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                alignContent: 'center',
                                marginBottom: 8,
                                padding: '3%',
                              }}>
                              <CheckBox
                                disabled={false}
                                value={selectedSellers.includes(brand)}
                                onValueChange={() =>
                                  handleSellerCheckboxChange(brand)
                                }
                              />
                              <Text
                                style={{
                                  marginLeft: 8,
                                  color: '#00338D',
                                  fontWeight: '300',
                                }}>
                                {brand}
                              </Text>
                            </View>
                          ))}
                        </View>
                      </>
                    )}
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      width: '100%',
                      padding: '7%',
                      borderTopWidth: 1,
                      borderColor: '#d1d1d1',
                      marginTop: '4%',
                    }}>
                    <TouchableOpacity onPress={handleFilterModalClose}>
                      <Text style={{fontSize: 19, color: 'grey'}}>CLOSE</Text>
                    </TouchableOpacity>
                    <View
                      style={{
                        borderRightWidth: 1,
                        borderColor: '#d1d1d1',
                        height: '100%',
                        marginHorizontal: 15,
                        marginTop: -10,
                      }}
                    />
                    <TouchableOpacity
                      style={{}}
                      onPress={() => {
                        filterSelectionApply();
                      }}>
                      <Text style={{fontSize: 19, color: '#ad0505'}}>
                        APPLY
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        </View>
      </View>
    </>
  );

  function product({item, navigation, lovedItems}) {
    const isLoved = lovedItems.includes(item.id);

    return (
      <>
        <View style={styles.container}>
          <View style={{position: 'relative', padding: '1%'}}>
            <TouchableOpacity
              onPress={() => {
                navigateToMainPDP(item.category, item.id);
                setShowActivityIndicator(true);
              }}>
              <Image
                source={{uri: item.imageUrl[0]}}
                onPress={() => navigation.navigate('AboutScreen')}
                style={{width: 180, height: 250, borderRadius: 10}}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                handleLovePress(item.id);
                lovedItems.includes(item.id) ? forNavigate('WishList') : '';
              }}
              style={{position: 'absolute', top: 10, right: 10}}>
              <Image
                source={lovedItems.includes(item.id) ? love1 : love2}
                style={{height: 25, width: 25}}
              />
            </TouchableOpacity>
          </View>

          <View style={{padding: '4%'}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  fontWeight: '500',
                  fontSize: item.brand.length > 10 ? 14 : 16,
                  color: 'black',
                }}>
                {item.brand}
              </Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image source={star2} style={{width: 14, height: 14}} />
                <Text style={{}}>
                  {productRatings[item.id] !== undefined
                    ? productRatings[item.id].toFixed(1)
                    : 'N/A'}
                </Text>
              </View>
            </View>
            <Text style={{fontSize: 13, color: '#2E2E2E'}}>{item.title}</Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={{color: '#00A3A1', fontWeight: '700'}}>
                ₹{item.discountedPrice} / ₹{' '}
              </Text>
              <Text
                style={{color: '#00A3A1', textDecorationLine: 'line-through'}}>
                {item.price}
              </Text>
            </View>
            {item.discountPercent === 0 ? (
              <Text style={{color: '#A4343A'}}></Text>
            ) : (
              <Text style={{color: '#A4343A'}}>
                ({item.discountPercent}% OFF)
              </Text>
            )}
          </View>
        </View>
      </>
    );
  }
};

export default MainPlp;

const LoveWishList = ({category, id}) => {};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  bottomSheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingVertical: 23,
    paddingHorizontal: 25,
    bottom: 0,
    borderWidth: 1,
    borderColor: 'red',
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
    backgroundColor: 'white',
  },
  modalContent2: {
    width: '100%',
    height: '180%',
    backgroundColor: 'white',
    padding: 5,
    bottom: 0,
    position: 'fixed',
    borderRadius: 10,
    marginTop: '210%',
  },
  horizontalLine1: {
    borderBottomWidth: 0.8,
    borderBottomColor: '#d1d1d1',
    marginVertical: 8,
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
});
