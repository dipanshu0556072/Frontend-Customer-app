import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useCartContext} from './Context/WomenContext';
import {useLoginContext} from './Login/LoginCartProvider';
import axios from 'axios';
import TopBar from './PlpScreen/TopBar';
import back from './PlpScreen/images/back.png';
import {Image} from 'react-native-elements';
import {FlatList} from 'react-native'; // Import FlatList
import WishListAndBagButton from './Components/WishListAndBagButton';
import heart from './PlpScreen/images/heart3.png';
import bag from './PlpScreen/images/bag2.png';
import star1 from './PlpScreen/images/star2.png';
import star2 from './PlpScreen/images/star.png';
import next from './PlpScreen/images/next.png';
import SizeSelection from './Components/SizeSelection';
import ProductDetails from './Components/ProductDetails';
import SupplierModal from './Components/SupplierModal';
import {ProgressBar, MD3Colors} from 'react-native-paper';
import {useIsFocused} from '@react-navigation/native';
import PromotionAndOfferCard from './Components/PromotionAndOfferCard';
import RotationView from './Components/RotatingViews.jsx';

const MainPdp = ({navigation}) => {
  const {
    showActivityIndicator,
    setShowActivityIndicator,
    setFilteredDataOnPLP,
    currentProductIdOnPDP
  } = useCartContext();
  const {ip, token, loginUserId, popFromStack} = useLoginContext();
  const [product, setProduct] = useState(null);
  const [isSupplierModalVisible, setSupplierModalVisible] = useState(false);
  const [pinCode, setPincode] = useState('');
  const [pinCodeError, setPincodeError] = useState('');
  const [showProductReview, setShowProductReview] = useState(false);
  const [showProductComment, setShowProductComment] = useState([]);
  const [productRating, setProductRating] = useState('0.0');
  const [progressValues, setProgressValues] = useState([
    0.0, 0.0, 0.0, 0.0, 0.0,
  ]);
  const [loginUserName, setLoginUserName] = useState('');

  //filter product based on brand
  const filterProductBasedOnBrand = async (brandName, productCategory) => {
    const header = {
      Authorization: `Bearer ${token}`,
    };
    try {
      const response = await axios.get(
        `http://${ip}:5454/api/products/filterByBrand/brandName=${brandName}/categoryName=${productCategory}`,
        {headers: header},
      );
      setFilteredDataOnPLP(response.data);
      navigation.navigate('mainPlp');
    } catch (error) {
      console.log('Error fetching product:', error);
      setShowActivityIndicator(false); // Hide activity indicator in case of error
    }
  };

  //get userName by userId
  const getUserNameByUserId = async () => {
    const header = {
      Authorization: `Bearer ${token}`,
    };
    try {
      const response = await axios.get(
        `http://${ip}:5454/auth/userId=${loginUserId}`,
        {headers: header},
      );

      setLoginUserName(response.data);
    } catch (error) {
      console.log('Error fetching product:', error);
      setShowActivityIndicator(false); // Hide activity indicator in case of error
    }
  };
  //check product availability at pincode
  const productAvailability = async () => {
    const header = {
      Authorization: `Bearer ${token}`,
    };
    try {
      const response = await axios.get(
        `http://${ip}:5454/api/admin/products/searchProductAvailable/productId=${currentProductIdOnPDP}/pincode=${pinCode}`,
        {headers: header},
      );
      setShowActivityIndicator(false);
      return response.data;
    } catch (error) {
      console.log('Error fetching product:', error);
      setShowActivityIndicator(false); // Hide activity indicator in case of error
    }
  };

  // Fetch product data based on productId
  async function fetchProduct(currentProductIdOnPDP) {
    const header = {
      Authorization: `Bearer ${token}`,
    };
    try {
      const response = await axios.get(
        `http://${ip}:5454/api/products/id/${currentProductIdOnPDP}`,
        {headers: header},
      );
      setProduct(response.data);
      getUserNameByUserId();
      setShowProductComment(response.data.ratingList);
      setShowActivityIndicator(false); // Hide activity indicator after fetching
    } catch (error) {
      console.log('Error fetching product:', error);
      setShowActivityIndicator(false); // Hide activity indicator in case of error
    }
  }

  // Function to render each item in the FlatList
  const renderItem = ({item}) => {
    return (
      <Image
        source={{uri: item}} // Use the URL from the FlatList item
        style={styles.image}
      />
    );
  };
  //horizontal line1
  const HorizontalLine = () => {
    return <View style={styles.line} />;
  };
  //horizontal line1
  const HorizontalLine2 = () => {
    return <View style={styles.line1} />;
  };
  //show supplier info modal
  const toggleSupplierModal = () => {
    setSupplierModalVisible(!isSupplierModalVisible);
  };
  //onPress of Pincode button
  const onPressofPincodeBtn = async () => {
    if (pinCode.length == 0) {
      setPincodeError('emptyPincode');
    } else {
      setShowActivityIndicator(true);

      const isProductAvailable = await productAvailability();
      if (isProductAvailable) {
        setPincodeError('productAvailable'); // Set state for product available
      } else {
        setPincodeError('notAvailable'); // Set state for product not available
      }
    }
  };
  //onPress of back button
  const onPressOfBackButton = () => {
    popFromStack(navigation);
  };

  // Function to render the rating people count text based on index
  const renderRatingText = (index, product) => {
    const ratingCountMap = [
      product?.countUsersRatedProductFiveStars,
      product?.countUsersRatedProductFourStars,
      product?.countUsersRatedProductThreeStars,
      product?.countUsersRatedProductTwoStars,
      product?.countUsersRatedProductOneStar,
    ];

    const count = ratingCountMap[index];

    return count > 0 ? (
      <Text style={styles.showCountOfWhoRated}>{formatNumber(count)}</Text>
    ) : null;
  };
  // Helper function to format numbers of people who rate the product
  const formatNumber = value => {
    if (value === undefined) {
      return '0'; // Handle undefined by returning '0' or any default value
    }

    if (value >= 10000000) {
      return (value / 10000000).toFixed(1) + 'Cr'; // Crore
    } else if (value >= 100000) {
      return (value / 100000).toFixed(1) + 'L'; // Lakh
    } else if (value >= 1000) {
      return (value / 1000).toFixed(1) + 'K'; // Thousand
    }

    return value.toString(); // For numbers less than 1000
  };
  // Utility function to format the created time
  const formatCreatedTime = createdAt => {
    const now = new Date();
    const createdTime = new Date(createdAt);
    const diffInSeconds = Math.floor((now - createdTime) / 1000);

    if (diffInSeconds < 60)
      return `${diffInSeconds} sec${diffInSeconds > 1 ? 's' : ''} ago`;
    if (diffInSeconds < 3600)
      return `${Math.floor(diffInSeconds / 60)} min${
        Math.floor(diffInSeconds / 60) > 1 ? 's' : ''
      } ago`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)} hr${
        Math.floor(diffInSeconds / 3600) > 1 ? 's' : ''
      } ago`;
    if (diffInSeconds < 2592000)
      return `${Math.floor(diffInSeconds / 86400)} day${
        Math.floor(diffInSeconds / 86400) > 1 ? 's' : ''
      } ago`;
    if (diffInSeconds < 31536000)
      return `${Math.floor(diffInSeconds / 2592000)} month${
        Math.floor(diffInSeconds / 2592000) > 1 ? 's' : ''
      } ago`;
    return `${Math.floor(diffInSeconds / 31536000)} year${
      Math.floor(diffInSeconds / 31536000) > 1 ? 's' : ''
    } ago`;
  };

  const colors = [
    'rgba(0, 128, 0, 1)', // Green
    'rgba(0, 128, 0, 0.75)', // Green with some fade
    'rgba(0, 128, 0, 0.5)', // Green with more fade
    'rgba(255, 165, 0, 1)', // Orange
    'rgba(255, 0, 0, 1)', // Red
  ];

  //count total number of buyers of the product
  const usersWhoBoughtThisProduct =
    product?.countUsersRatedProductOneStar +
    product?.countUsersRatedProductTwoStars +
    product?.countUsersRatedProductThreeStars +
    product?.countUsersRatedProductFourStars +
    product?.countUsersRatedProductFiveStars;

  const isFocused = useIsFocused(); // Checks if you're on the current page

  useEffect(() => {
    if (isFocused && currentProductIdOnPDP) {
      // Call fetchProduct with productId after 1 second
      const timer = setTimeout(() => {
        fetchProduct(currentProductIdOnPDP);
      },10);

      // Clean up timer to avoid memory leaks
      return () => clearTimeout(timer);
    }
  }, [isFocused, currentProductIdOnPDP]); // Only run when productId or focus changes

  // Separate useEffect to update progressValues and productRating when product changes
  useEffect(() => {
    if (product) {
      // Calculate average ratings and convert to float
      const averageFiveStarRating1 =
        parseFloat(product?.averageRatingForOneStar) || 0;
      const averageFiveStarRating2 =
        parseFloat(product?.averageRatingForTwoStars) || 0;
      const averageFiveStarRating3 =
        parseFloat(product?.averageRatingForThreeStars) || 0;
      const averageFiveStarRating4 =
        parseFloat(product?.averageRatingForFourStars) || 0;
      const averageFiveStarRating5 =
        parseFloat(product?.averageRatingForFiveStars) || 0;

      // Update progressValues state with the calculated ratings
      setProgressValues([
        averageFiveStarRating5,
        averageFiveStarRating4,
        averageFiveStarRating3,
        averageFiveStarRating2,
        averageFiveStarRating1,
      ]);

      // Set the product rating
      setProductRating(product?.productRating?.toFixed(1));
    }
  }, [product]); // Only run when product changes

  return (
    <View style={styles.container}>
      {product ? (
        <>
          {/* Header */}
          <TopBar showSearchLogo={false} navigation={navigation} />
          <ScrollView style={styles.imageContainer}>
            {/* Back arrow in the top-left corner */}
            <TouchableOpacity
              style={styles.backButton}
              onPress={onPressOfBackButton}>
              <Image source={back} style={styles.backArrow} />
            </TouchableOpacity>

            {/* Product image carousel using FlatList */}
            <FlatList
              data={product.imageUrl}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              vertical // Enable horizontal scrolling
              showsHorizontalScrollIndicator={false}
              snapToInterval={Dimensions.get('window').width}
              decelerationRate="fast"
              snapToAlignment="start"
            />
            {/* Product description */}
            <View style={styles.productDescription}>
              <Text style={styles.productBrand}>{product.brand}</Text>
              <Text style={styles.productTitle}>{product.title}</Text>
              <View style={styles.productPriceRow1}>
                <Text style={styles.productDiscountedPrice}>
                  ₹{product.discountedPrice}/{' '}
                </Text>
                <Text style={styles.productPrice}>₹ {product.price}</Text>
                {product.discountPercent > 0 && (
                  <Text style={styles.discountPercent}>
                    ({product.discountPercent}% OFF)
                  </Text>
                )}
              </View>
              <Text style={styles.inclusiveInfo1}>Inclusive of all taxes</Text>

              <Text style={styles.inclusiveInfo2}>
                14 days easy return / excahnge applicable for this product
              </Text>
            </View>

            {/*horizontal Line*/}
            <HorizontalLine />

            {/*size bar */}
            <SizeSelection product={product} />
            {/*check bogo eligibility*/}
            {product?.eligibleForBogo && (
              <>
                <HorizontalLine />
                <Text style={styles.eligibleBOGOContainer}>
                  Eligble for BOGO
                </Text>
                <HorizontalLine />
              </>
            )}

            {/*Promotion and Offer Card*/}
            <View style={styles.promotionOfferContainer}>
             <PromotionAndOfferCard title={'Promotion'} productId={currentProductIdOnPDP}/>
            </View>
            <Text
              style={[
                styles.productDetailMainHead,
                {marginTop: '3%', marginLeft: '5%'},
              ]}>
              Available Colors
            </Text>
            <View
              style={[
                styles.colorCircle,
                {backgroundColor: product.color},
              ]}></View>

            {/*horizontal Line*/}
            <HorizontalLine />

            <View style={styles.productDetailsContainer}>
              {/*product details*/}
              <Text style={styles.productDetailMainHead}>Product Details</Text>

              <ProductDetails
                product={product}
                productCategory={product.category.parentCategory.name.toLowerCase()}
              />

              {/*product description */}
              <Text style={styles.productDetailMainHead}>
                Product Description
              </Text>
              <Text style={styles.titleText}>{product.description}</Text>

              {product.productCode && (
                <Text style={styles.productCode}>
                  Product Code:
                  <Text style={styles.productCodeValue}>
                    {' '}
                    {product.productCode}{' '}
                  </Text>
                </Text>
              )}
              {product.seller && (
                <Text style={styles.seller}>
                  Seller:
                  <Text style={styles.sellerValue}> {product.seller}</Text>
                </Text>
              )}

              {/*supplier info*/}
              <TouchableOpacity
                style={styles.supplierButton}
                onPress={() => {
                  toggleSupplierModal();
                }}>
                <Text style={styles.supplierText}>
                  View supplier information
                </Text>
              </TouchableOpacity>
              {/*show supplier Modal*/}
              <SupplierModal
                isSupplierModalVisible={isSupplierModalVisible}
                toggleSupplierModal={toggleSupplierModal}
                product={product}
              />

              {/*check product availability at pincode*/}
              <Text style={[styles.productDetailMainHead, {marginTop: '4%'}]}>
                Availability
              </Text>
              <Text style={styles.pinCodeSecondaryHead}>
                Check availability at your nearest store
              </Text>

              {/*pincode based search, product Availability */}
              <View
                style={[
                  styles.pinCodeSearchContainer,
                  {
                    borderColor:
                      pinCodeError == 'emptyPincode' ? 'red' : 'grey',
                  },
                ]}>
                <TextInput
                  value={pinCode}
                  style={styles.textInput}
                  placeholder="Enter Pincode" // Optional: add a placeholder
                  keyboardType="numeric" // Optional: restrict input to numbers
                  onChangeText={text => {
                    setPincode(text);
                  }}
                  keyboardType="numeric"
                  maxLength={6}
                />
                <TouchableOpacity
                  style={styles.checkPincodeBtn}
                  onPress={() => {
                    onPressofPincodeBtn();
                  }}>
                  <Text style={styles.checkPincodeBtnText}>Check</Text>
                </TouchableOpacity>
              </View>

              {/*Rendering the messages based on the pinCodeError state*/}
              {(pinCodeError === 'emptyPincode' ||
                pinCodeError === 'productAvailable' ||
                pinCodeError === 'notAvailable') && (
                <Text
                  style={[
                    styles.pinCodeError,
                    {
                      color:
                        pinCodeError === 'productAvailable' ? 'green' : 'red',
                    },
                  ]}>
                  {pinCodeError === 'productAvailable'
                    ? 'Product is available at this pincode'
                    : pinCodeError === 'notAvailable'
                    ? 'Sorry, product is not available at this pincode'
                    : 'Please provide your postal code.'}
                </Text>
              )}
            </View>

            {/* rating section*/}
            <Text style={[styles.productDetailMainHead, {marginLeft: '3%'}]}>
              Rating & Reviews:
            </Text>
            <View style={styles.ratingSectionContainer}>
              <View style={styles.RatingSection}>
                <View style={styles.ratingAvgRating}>
                  <Text style={styles.ratingText1}>{productRating}</Text>
                  <Image source={star1} style={styles.ratingStarImage1} />
                </View>
                <Text style={styles.ratingText2}>
                  {formatNumber(usersWhoBoughtThisProduct)} verified buyers
                </Text>
              </View>
              <View style={styles.ratingSectionProgress}>
                {progressValues.map((progress, index) => (
                  <View key={index} style={styles.ratingStarContainer}>
                    {/* Star Rating (5 - index) to show rating from 5 to 1 */}
                    <Text style={styles.ratingStarHeading}>{5 - index}</Text>

                    {/* Star Image */}
                    <Image
                      source={star2} // Use the correct path for your star image
                      style={styles.ratingStarImage2}
                    />

                    {/* ProgressBar filled according to progressValues */}
                    <ProgressBar
                      progress={progress}
                      color={colors[index]} // Dynamic color based on index
                      style={styles.progressBarStyle}
                    />
                    {renderRatingText(index, product)}
                  </View>
                ))}
              </View>
            </View>
            {/*view review*/}
            {!showProductReview && (
              <TouchableOpacity
                style={styles.productReviewContainer}
                onPress={() => {
                  setShowProductReview(!showProductReview);
                }}>
                <Text style={styles.productReviewText}>View all</Text>
              </TouchableOpacity>
            )}

            {/*show product comments*/}

            <View style={{marginTop: '10%'}}>
              {showProductReview && (
                <Text
                  style={[
                    styles.productDetailMainHead,
                    {marginLeft: '4%', marginBottom: '7%'},
                  ]}>
                  Customer Reviews ({showProductComment.length})
                </Text>
              )}
              {showProductReview &&
                showProductComment &&
                showProductComment.map((item, index) => (
                  <>
                    <View key={index}>
                      <View
                        style={[
                          styles.commentItem,
                          {width: 120, marginLeft: '5%', margin: '2%'},
                        ]}>
                        <View style={[styles.commentItem]}>
                          <Text style={{fontSize: 14, color: 'black'}}>
                            {item.givenRating}{' '}
                          </Text>
                          <Image
                            source={star1}
                            style={{width: 12, height: 12}}
                          />
                        </View>
                        <Text style={styles.commentTime}>
                          {formatCreatedTime(item.createdAt)}
                        </Text>
                      </View>
                      <View
                        style={{width: Dimensions.get('window').width - 50}}>
                        <Text style={styles.commentText}>
                          <Text style={{fontWeight: '500'}}>
                            {loginUserName}:{' '}
                          </Text>

                          {item.comment}
                        </Text>
                      </View>
                    </View>
                    {/*horizontal Line*/}
                    <HorizontalLine />
                  </>
                ))}
            </View>

            {/*show filterd data */}
            <View style={styles.filterContainer}>
              <TouchableOpacity
                style={styles.rowContainer}
                onPress={() => {
                  filterProductBasedOnBrand(
                    product.brand,
                    product?.category?.name,
                  );
                }}>
                <Text style={styles.filterOneOnBrand}>
                  More {product?.category?.name} from this Brand
                </Text>
                <Image source={next} style={styles.nextImage} />
              </TouchableOpacity>

              <HorizontalLine2 />
              <TouchableOpacity
                style={styles.rowContainer}
                onPress={() => {
                  filterProductBasedOnBrand(
                    product.brand,
                    product?.category?.name,
                  );
                }}>
                <Text style={styles.filterOneOnBrand}>
                  More Products from this Brand
                </Text>
                <Image source={next} style={styles.nextImage} />
              </TouchableOpacity>
              <HorizontalLine2 />
            </View>
          </ScrollView>
          {/*wishList and bag button*/}
          <View style={styles.wishListAndButtonContainer}>
            <WishListAndBagButton
              product={product}
              img={heart}
              title={'WISHLIST'}
            />

            <WishListAndBagButton
              product={product}
              img={bag}
              title={'ADD TO BAG'}
            />
          </View>
        </>
      ) : showActivityIndicator ? (
        <View style={styles.activityIndicatorContainer}>
        {/* <ActivityIndicator size="large" color="#00338D" /> */}
        <RotationView/>
        
        </View>
      ) : (
        <Text>No product available.</Text>
      )}
    </View>
  );
};

export default MainPdp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: '2%',
    backgroundColor: 'white',
  },
  imageContainer: {
    position: 'relative',
  },
  //back button container
  backButton: {
    marginBottom: '2%',
    marginLeft: '1%',
    height: 30,
    width: 40,
    alignItems: 'center',
    padding: '2%',
    justifyContent: 'center', // Optional: Centers the content vertically
  },
  backArrow: {
    // Add any specific styles for your back arrow image here
    width: 20, // Ensure it fits within the button
    height: 12, // Maintain aspect ratio
    resizeMode: 'contain', // Ensures the image scales appropriately
  },
  backArrow: {
    width: 20,
    height: 12,
  },
  image: {
    width: Dimensions.get('window').width - 17, // Use full width for each image
    height: Dimensions.get('window').height - 340, // Adjust height as necessary
    borderRadius: 6,
  },
  productDescription: {
    marginTop: '4%',
  },
  productBrand: {
    marginLeft: '3%',
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
  },
  productTitle: {
    marginLeft: '3%',
    color: 'black',
    fontFamily: 'montserrat',
    fontSize: 15,
    fontWeight: '100',
  },
  wishListAndButtonContainer: {
    marginTop: '3%',
    flexDirection: 'row', // Ensures buttons are in a row
    justifyContent: 'space-between', // Adds space between the buttons
    padding: 10,
    width: Dimensions.get('window').width - 18, // Adjust to fit within the screen width
  },
  line: {
    height: 2,
    width: '100%',
    backgroundColor: '#e8e6e6',
    marginTop: '4%',
  },
  line1: {
    height: 2,
    width: '100%',
    backgroundColor: '#e8e6e6',
  },
  productPriceRow1: {
    flexDirection: 'row',
  },
  productDiscountedPrice: {
    color: '#000000',
    fontWeight: '700',
    marginLeft: '3%',
  },
  productPrice: {
    color: '#a19d9d',
    textDecorationLine: 'line-through',
    marginLeft: '1%',
  },
  discountPercent: {
    color: '#A4343A',
    marginLeft: '3%',
  },
  inclusiveInfo1: {
    color: '#00A3A1',
    marginLeft: '3%',
    fontSize: 12,
    paddingTop: '1%',
  },
  inclusiveInfo2: {
    fontSize: 12,
    backgroundColor: '#e8e6e6',
    marginLeft: '3%',
  },
  //productDetails Container
  productDetailsContainer: {
    margin: '3%',
    width: Dimensions.get('window').width - 40,
  },
  productDetailMainHead: {
    color: 'black',
    fontSize: 14,
    fontWeight: '500',
  },
  colorCircle: {
    height: 30,
    width: 30,
    marginTop: '1%',
    marginLeft: '5%',
    borderRadius: 20,
    borderWidth: 1.5,
  },
  pinCodeSecondaryHead: {fontSize: 12, marginBottom: '2%', padding: '0.81%'},
  titleText: {
    fontSize: 12.4,
  },
  productCode: {
    fontSize: 12.5,
    fontWeight: '500',
    marginTop: '4%',
    color: 'black',
  },
  productCodeValue: {
    color: 'grey',
    fontWeight: '300',
  },
  //seller Info
  seller: {
    fontSize: 12.5,
    fontWeight: '500',
    color: 'black',
  },
  sellerValue: {
    color: 'grey',
    fontWeight: '300',
  },
  supplierButton: {
    marginTop: '3%',
  },
  supplierText: {
    color: '#A4343A',
    fontSize: 14,
    fontWeight: '300',
    textDecorationLine: 'underline',
  },
  //searchByPincode
  pinCodeSearchContainer: {
    width: '100%',
    height: 30,
    borderWidth: 0.6,
    borderColor: 'grey',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textInput: {
    flex: 1,
    padding: 5,
    width: 130,
    marginLeft: '2%',
  },
  checkPincodeBtn: {margin: 5},
  checkPincodeBtnText: {color: 'black', textDecorationLine: 'underline'},
  pinCodeError: {fontSize: 10, color: 'red', marginTop: '2%'},
  activityIndicatorContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.7)',
  },
  ratingSectionContainer: {
    width: Dimensions.get('window').width - 10,
    height: Dimensions.get('window').height - 700,
    flexDirection: 'row',
  },
  RatingSection: {
    width: '35%',
    justifyContent: 'center',
    marginLeft: '10%',
  },
  ratingAvgRating: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  ratingSectionProgress: {
    width: '50%',
    alignItems: 'center',
    borderLeftWidth: 0.2,
    borderColor: 'grey',
    justifyContent: 'center',
  },
  ratingText1: {fontSize: 20, color: 'black'},
  ratingText2: {color: 'black', marginTop: '5%'},
  ratingStarHeading: {color: 'black', fontSize: 12},
  productReviewContainer: {
    alignItems: 'center',
    marginTop: '4%',
    marginTop: '4%',
  },
  productReviewText: {color: '#4d79ff'},
  filterContainer: {marginTop: '10%'},
  filterOneOnBrand: {
    marginTop: '4%',
    color: 'black',
    fontWeight: '500',
    marginLeft: '4%',
    marginBottom: '1%',
  },
  ratingStarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 2,
    width: 150,
    margin: '1%',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  nextImage: {
    width: 20,
    height: 14,
    marginTop: '34%',
  },
  showCountOfWhoRated: {
    color: 'black',
    fontWeight: '500',
    fontSize: 11,
    marginLeft: '2%',
  },
  ratingStarImage1: {width: 25, height: 25, marginLeft: '14%'},
  ratingStarImage2: {width: 10, height: 10, marginRight: 8},
  progressBarStyle: {
    height: 5,
    borderRadius: 12,
    width: 120,
  },
  //comment section

  commentText: {
    color: 'black',
    fontSize: 13,
    marginLeft: '5%',
    fontWeight: '300',
  },
  commentItem: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentTime: {
    fontSize: 12,
  },
  //promotionAndOfferContainer
  promotionOfferContainer: {flexDirection: 'row', marginTop: '4%'},
  //eligible of BOGO
  eligibleBOGOContainer: {
    marginLeft: '4%',
    marginTop: '3.3%',
    fontWeight: '600',
    color: '#A4343A',
  },
});
