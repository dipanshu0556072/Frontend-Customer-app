import React, { useEffect, useState } from 'react';
import { Modal,TouchableWithoutFeedback,View, TextInput, FlatList, TouchableOpacity, Text, StyleSheet,Image,SafeAreaView, Alert, ScrollView} from 'react-native';
import axios from 'axios';
import { useCartContext } from './Context/WomenContext';
import { useLoginContext } from './Login/LoginCartProvider';
import arrow from './arrow.png';
import dog from './dog.png';
import star2 from './PlpScreen/images/star2.png';
import filter from './PlpScreen/images/filter.png'
import { RadioButton } from 'react-native-paper';
import cross from './PlpScreen/images/close.png';
import CheckBox from '@react-native-community/checkbox';
import check1 from './PlpScreen/images/check11.png';
import check2 from './PlpScreen/images/check22.png';



const Elastic = ({navigation}) => {
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
    cream: '#FFFDD0'
  };
  const [products,setProducts]=useState([]);
  const [check, setCheck] = useState([]);
  const [dropdownData, setDropdownData] = useState(["Jeans","Jacket","shirts","kurtas","men","women","Men Shirts"]);
  const {ip,token,popFromStack,pushToStack,currentPage,setCurrentPage,currentPageIndex, 
    setCurrentPageIndex,currentPageIndexCategory,setCurrentPageIndexCategory,
    targetParentCategory,setTargetParentCategory}=useLoginContext();
  const {productIds,sortBy,
    setSortBy,}=useCartContext();

  const [foundProductDetails, setFoundProductDetails] = useState('');

  //show sort and filter Button
  const [showSortAndFilterBtn,setShowSortAndFilterBtn]=useState(false);

  useEffect(()=>{

  //  setTimeout(()=>{
  //   setFoundProductDetails('');
  //  },5000);
  },[foundProductDetails]);

  //check the search is by product name or category
  const [searchProduct,setSearchProduct]=useState(false);
  const [searchCategory,setSearchCategory]=useState(false);
  const [productRatings, setProductRatings] = useState({});
  const [filterName,setFilterName]=useState("brand");
  const uniqueBrands = new Set();
  const uniqueColors = new Set();
  const uniquePrice = new Set();
  const uniqueDiscount = new Set();
  const uniqueSeller = new Set();
  const uniqueSizes = new Set();
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedPrices, setSelectedPrices] = useState([]);
  const [selectedDiscounts, setSelectedDiscounts] = useState([]);
  const [selectedSize, setSelectedSize] = useState([]);
  const [selectedSellers, setSelectedSellers] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [isChecked, setIsChecked] = useState([]);
  const [seeMoreFilterCatefory,setSeeMoreFilterCategory]=useState("");
      // Additional ranges for price filter
      const priceRanges = [
        { min: 0, max: 499 },
        { min: 500, max: 2599 },
        { min: 2600, max: 3999 },
        { min: 4000, max: 12999 },
      ];
    const percentageRanges = [
      { min: 0, max: 28 },
      { min: 29, max: 60 },
      // Add more ranges as needed
    ];
  
  

  useEffect(()=>{
   if(foundProductDetails && value){
    // Alert.alert("1");
    setShowSortAndFilterBtn(true);
   }
   else if(categoryProducts1 && value){
    // Alert.alert("2");
    setShowSortAndFilterBtn(true);
   }
   else if(JeanProduct && value){
    // Alert.alert("3");   
    setShowSortAndFilterBtn(true);
   }
   else if(JacketProduct && value){
    // Alert.alert("4");
    setShowSortAndFilterBtn(true);
   }
   else if(ShirtProduct && value){
    // Alert.alert("5");
    setShowSortAndFilterBtn(true);
   }
   else if(KurtaProduct && value){
    // Alert.alert("6");
    setShowSortAndFilterBtn(true);
   }
   else if(categoryProducts && value){
    // Alert.alert("7");
    setShowSortAndFilterBtn(true);
   }
   else{
    // Alert.alert("8");
    setShowSortAndFilterBtn(false);
   }

  },[value,foundProductDetails,categoryProducts1,JeanProduct,JacketProduct,
    ShirtProduct,KurtaProduct,categoryProducts,showSortAndFilterBtn]);
  useEffect(() => {
    if (value) {
      // Search only if there's a value
      searchData(value);
    }
  }, [check]);

  useEffect(() => {
    const getProductRatings = async (productId) => {
      try {
        const response = await axios.get(`http://${ip}:5454/api/ratings/product/${productId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        // console.log(`Ratings for product ${productId}:`, response.data);
  
        // Calculate the average rating
        const ratingsArray = response.data.map((ratingObj) => ratingObj.rating);
        const averageRating = ratingsArray.length > 0 ? ratingsArray.reduce((a, b) => a + b) / ratingsArray.length : 0;
  
        setProductRatings((prevRatings) => ({
          ...prevRatings,
          [productId]: averageRating,
        }));
        // console.log(JSON.stringify(response.data));
      } catch (error) {
        console.error(`Error fetching ratings for product ${productId}:`, error.message);
      }
    };
  
    // Assuming you have an array of product IDs
    
  
    // Fetch and process ratings for all products concurrently
    const fetchRatings = async () => {
      productIds.forEach((productId) => {
        getProductRatings(productId);
      });
    };
  
    fetchRatings();
  }, [/* Add dependencies if needed */]);
  
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`http://${ip}:5454/api/admin/products/all`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setCheck(response.data);
      } catch (error) {
        console.error('Error fetching Elasticdata:', error);
      }
    };
    getData();
  }, [token]);

  useEffect(() => {
    if (check.length > 0) {
      setDropdownData((prevDropdownData) => {
        const newDropdownData = check.map((product) => product.category.name);
        // Use a Set to ensure unique category names
        const uniqueDropdownData = new Set([...prevDropdownData, ...newDropdownData]);
        return Array.from(uniqueDropdownData);
      });
    }
    if (check.length > 0) {
      setDropdownData((prevDropdownData) => {
        const newDropdownData = check.map((product) => product.category.parentCategory.parentCategory.name);
        // Use a Set to ensure unique category names
        const uniqueDropdownData = new Set([...prevDropdownData, ...newDropdownData]);
        return Array.from(uniqueDropdownData);
      });
    }
  }, [check]);

  
  


  useEffect(() => {
    if (check.length > 0) {
      setDropdownData((prevDropdownData) => {
        const uniqueTitles = new Set(check.map((product) => product.title));
        const uniqueDropdownData = new Set([...prevDropdownData, ...Array.from(uniqueTitles)]);
        return Array.from(uniqueDropdownData);
      });
    }
  }, [check]);

  const [value, setValue] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [filteredDataArray, setFilteredDataArray]=useState([]);
  const [filterApply,setFilterApply]=useState(false);
  const [filteredCategory, setFilteredCategory] = useState(new Set());

  const [selectedTab, setSelectedTab] = useState(null);


  const handleChange = (text) => {
    setValue(text);
    searchData(text);
    if (text) {
      const filteredOptions = dropdownData.filter((option) =>
        option.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredData(filteredOptions);
      setIsDropdownOpen(true);
    } else {
      setFilteredData([]);
      setIsDropdownOpen(false);
    }
  };

  const searchData = (val) => {
    if (val) {
      const foundProduct1 = check.find((product) => product.title === val);
     
      if (foundProduct1) {
        setSearchProduct(true);
        // setFoundProductDetails(JSON.stringify(foundProduct1, null, 2));
        setFoundProductDetails([foundProduct1]);
        setProducts([foundProduct1]);
      }else if(check.filter((product) => product.category.name === value)||
      check.filter((product) => product.category.parentCategory.name === value)) {
        setSearchCategory(true);
        // const categoryProducts = check.filter((product) => product.category.name === val);

        // if (categoryProducts.length > 0) {
        //   setSearchCategory(true);
        //   setFoundProductDetails(categoryProducts);
        // } else {
        //   // Handle the case when no products are found for the given category
        //   setSearchCategory(false);
        //   setFoundProductDetails([]);
        // }      
      }
    }
  };
  const handleOptionSelect = (item) => {
    setValue(item);
    searchData(item);
    if((!check.find((product) => product.title === item)) && (!check.filter((product) => product.category.name.toLowerCase() === value.toLowerCase()))){
      setFoundProductDetails('product not found');
    }
    setIsDropdownOpen(false);
  };

  const renderHighlightedText = (item) => {
    const index = item.toLowerCase().indexOf(value.toLowerCase());
    const prefix = item.substring(0, index);
    const match = item.substring(index, index + value.length);
    const suffix = item.substring(index + value.length);

    return (
      <Text>
        {prefix}
        <Text style={styles.boldText}>{match}</Text>
        {suffix}
      </Text>
    );
  };

  const handleClearText = () => {
    setValue('');
    searchData('');
    setFoundProductDetails('');
    setIsDropdownOpen(false);
    setSearchCategory(false);
    setSearchProduct(false);
    setFoundProductDetails('');
    setShowSortAndFilterBtn(false);
    setProducts([]);
    setFilteredDataArray([]);
    setProducts([]);
  };
  const handleEnterPress = () => {
    // Add the functionality you want to perform when Enter key is pressed
    console.log('Enter key pressed! Value:', value);
    if(value){
    searchData(value);
    if (!foundProductDetails || (foundProductDetails.length === 0)) {
      setSearchProduct(false);
      setSearchCategory(false);
      setIsDropdownOpen(false);
      setFoundProductDetails('product not found');
    }
   }
  };
 
  
  console.log("\n\n\ncheck"+JSON.stringify(check));

  // const parentCategoryTextArray = check.map(item => {
  //   if (item.category && item.category.parentCategory) {
  //     const parentCategoryId = item.category.parentCategory.id;
  //     const parentCategoryName = item.category.parentCategory.name;
  //     return (
  //       <Text key={item.id}>
  //         Item {item.id}: Parent Category ID - {parentCategoryId}, Name - {parentCategoryName}
  //       </Text>
  //     );
  //   }
  //   return null;
  // });
  
  let categoryProducts = categoryProducts = check.filter((product) => product.category && product.category.name.toLowerCase() === 'men jeans'||value.toLowerCase()==='menjeans')
  categoryProducts = check.filter((product) => product.category && product.category.name === 'Men Jeans' && value.toLowerCase()==='men jeans')
 
  const categoryProd=check.filter((product) => product.category && product.category.name === value);

  let categoryProducts1 = check.filter(
    (product) =>
      product.category &&
      product.category.parentCategory &&
      product.category.parentCategory.parentCategory &&
      product.category.parentCategory.parentCategory.name === value
  );
  categoryProducts1 = check.filter(
    (product) =>
      product.category &&
      product.category.parentCategory &&
      product.category.parentCategory.parentCategory &&
      product.category.parentCategory.parentCategory.name.toLowerCase() === 'men' && (value.toLowerCase()==='men'||value.toLowerCase()==='mens')
  );
  {
   (value.toLowerCase()==='women'||value.toLowerCase()==='womens') && 
   (
    <>
    {
  categoryProducts1 = check.filter(
    (product) =>
      product.category &&
      product.category.parentCategory &&
      product.category.parentCategory.parentCategory &&
      product.category.parentCategory.parentCategory.name.toLowerCase() === 'women' && (value.toLowerCase()==='women'||value.toLowerCase()==='womens')
  )

    }
    </>
   )

  }


const [bolean,setBolean]=useState(false);

const JeansProduct1 = check.filter((product) => product.category && product.category.name.toLowerCase() === 'men jeans' && (value.toLowerCase() === 'jeans' ||value.toLowerCase()==='men jeans'));
const JeansProduct2 = check.filter((product) => product.category && product.category.name.toLowerCase() === 'women jeans' && (value.toLowerCase() === 'jeans' || value.toLowerCase()==='women jeans'));
const JeanProduct = [...JeansProduct1, ...JeansProduct2];


const Jacket1 = check.filter((product) => product.category && product.category.name.toLowerCase() === "men jacket" && (value.toLowerCase() === 'jacket' ||value.toLowerCase() === 'jackets'));
const JacketProduct = Jacket1;

const shirt1 = check.filter((product) => product.category && product.category.name.toLowerCase() === "men shirts" && (value.toLowerCase() === 'shirt' || value.toLowerCase() === 'shirts'||value.toLowerCase()==="menshirts"||value.toLowerCase()==='men shirt'||value.toLowerCase()==="menshirt"||value.toLowerCase()==='mens shirt'||value.toLowerCase()==='mens shirts'));
const ShirtProduct = shirt1;

const Kurta1 = check.filter((product) => product.category && product.category.name.toLowerCase() === 'men kurtas' && (value.toLowerCase() === 'menkurta' || value.toLowerCase() === 'menkurtas'||value.toLowerCase()==="men kurte"||value.toLowerCase()==="mens kurta"||value.toLowerCase()==='kurta'||value.toLowerCase()==='men kurte'||value.toLowerCase()==='menkurte'));
const Kurta2 = check.filter((product) => product.category && product.category.name.toLowerCase() === 'women kurta' && ((value.toLowerCase() === 'womenkurta' || value.toLowerCase() === 'womenkurtas'||value.toLowerCase()==="women kurte"||value.toLowerCase()==="womens kurta"||value.toLowerCase()==='kurta'||value.toLowerCase()==='womenkurte'||value.toLowerCase()==='women kurta')))

const [KurtaProduct,setKurtaProduct] = useState([...Kurta1, ...Kurta2]);



  const navigateToMainPDP = (itemCategory,itemId) => {
    // Push 'mainPDP' onto the stack before navigating
    pushToStack('mainPDP');
   
    // console.log("\n\n\nidouojd"+itemCategory);
    setCurrentPageIndex(itemId);
    setCurrentPageIndexCategory(itemCategory.name);
    // Navigate to 'mainPDP' with additional parameters
    // navigation.navigate('mainPDP', { category: itemCategory, id: itemId });
    navigation.navigate('mainPDP');
  };
  const [sortModalVisible, setSortModalVisible] = useState(false);
  const [filterModalVisible, setFilterModalVisible] = useState(false);


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

  const handleFilterModalClose = () => {
    setTimeout(() => {
      setFilterModalVisible(false);
    }, 10);
  };

  const handlePriceCheckboxChange = (range) => {
    setSelectedPrices((prevSelectedPrices) => {
      const isRangeSelected = prevSelectedPrices.some((price) => price.min === range.min && price.max === range.max);
  
      if (isRangeSelected) {
        return prevSelectedPrices.filter((selectedRange) => selectedRange.min !== range.min || selectedRange.max !== range.max);
      } else {
        return [...prevSelectedPrices, range];
      }
    });
  };
    const handleDiscountCheckboxChange = (range) => {
    setSelectedDiscounts((prevSelectedDiscounts) => {
      if (prevSelectedDiscounts.some((selectedRange) => selectedRange.min === range.min && selectedRange.max === range.max)) {
        return prevSelectedDiscounts.filter((selectedRange) => selectedRange.min !== range.min || selectedRange.max !== range.max);
      } else {
        return [...prevSelectedDiscounts, range];
      }
    });
  };

useEffect(()=>{
  
 setValue(value.trim());
 if(value.toLowerCase()==='jeans'){
  setFilteredDataArray(JeanProduct);
  setProducts(JeanProduct);
 }else if(value.toLowerCase()=='men'||value.toLowerCase()==='mens'){
  setFilteredDataArray(categoryProducts1);
  setProducts(categoryProducts1);
 }else if(value.toLowerCase()=='women'||value.toLowerCase()==='womens'){
  setFilteredDataArray(categoryProducts1);
  setProducts(categoryProducts1);
 }else if(value.toLowerCase()==='kurta'||value.toLowerCase()==='kurtas'||value.toLowerCase()==='kurte'){
  setFilteredDataArray(KurtaProduct);
  setProducts(KurtaProduct);
 }else if(value.toLowerCase()==='women kurta'||value.toLowerCase()==='men kurtas'){
  // setFilteredDataArray(categoryProd);
  setProducts(categoryProd);
 }
 else if(value === 'womenkurta' || value === 'womenkurtas'||value==="women kurte"||value==="womens kurta")
  {
   setFilteredDataArray(Kurta2);
   setProducts(Kurta2);
  }else if(value.toLowerCase()=== 'menkurta' || value.toLowerCase() === 'menkurtas'||value.toLowerCase()==="men kurte"||value.toLowerCase()==="mens kurta"){
   setFilteredDataArray(Kurta1);
   setProducts(Kurta1);
 }else if(value.toLowerCase()==='shirts'||value.toLowerCase()==='shirt'){
  setFilteredDataArray(ShirtProduct);
  setProducts(ShirtProduct);
 }else if(value.toLowerCase()==='men jeans'||value.toLowerCase()==='menjeans'){
  setFilteredDataArray(categoryProducts);
  setProducts(categoryProducts);
 }else if(value.toLowerCase()==='jacket'||value.toLowerCase()==='jackets'||value.toLowerCase()==='men jacket'||value.toLowerCase()==='menjacket'){
  setFilteredDataArray(JacketProduct);
  setProducts(JacketProduct);
 }else if(value.toLowerCase()==='women jeans'||value.toLowerCase()==='women jeans'){
  setFilteredDataArray(JeansProduct2);
  setProducts(JeansProduct2);
 }else if(value.toLowerCase()==="menshirt"||value.toLowerCase()==="menshirts"||value.toLowerCase()==='men shirt'||value.toLowerCase()==="men shirts"||value.toLowerCase()==="mens shirts"){
  setFilteredDataArray(shirt1);
  setProducts(shirt1);
 }
},[value,KurtaProduct]);

useEffect(() => {
  let sortedProducts;
 
  if (filteredDataArray && filteredDataArray.length > 0) {
    sortedProducts = [...filteredDataArray];
    console.log("\n\n\n\n\nSorted Products"+JSON.stringify(sortedProducts));
  } else {
    sortedProducts = [...products];
  }

  switch (sortBy) {
    case 'low':
      sortedProducts = sortedProducts.sort((a, b) => a.discountedPrice - b.discountedPrice);
      break;
    case 'high':
      sortedProducts = sortedProducts.sort((a, b) => b.discountedPrice - a.discountedPrice);
      break;
    case 'asc':
      sortedProducts = sortedProducts.sort((a, b) => a.brand.localeCompare(b.brand));
      break;
      case 'dsc':
        sortedProducts = sortedProducts.sort((a, b) => {
          const dateA = new Date(a.createdAt);
          const dateB = new Date(b.createdAt);
      
          // Sort in descending order based on createdAt date
          return dateB - dateA;
        });
        break;
      
        case 'rating':
          sortedProducts = sortedProducts.sort((a, b) => {
            // Get the highest rating for each product
            const highestRatingA = Math.max(...a.ratings.map(rating => parseFloat(rating.rating) || 0), 0);
            const highestRatingB = Math.max(...b.ratings.map(rating => parseFloat(rating.rating) || 0), 0);
        
            // Sort in descending order based on the highest rating
            return highestRatingB - highestRatingA;
          });
          break;
        
    default:
      break;
  }
   setFilteredDataArray(sortedProducts);

}, [sortBy]);

//filter logic

if (filteredDataArray) {
  products.forEach((item) => {
    if (
      item.category &&
      item.category.name &&
      item.category.parentCategory &&
      item.category.parentCategory.parentCategory
    ) {
      uniqueBrands.add(item.brand);
      uniqueColors.add(item.color);
      uniquePrice.add(item.discountedPrice);
      uniqueDiscount.add(item.discountPercent);
      uniqueSeller.add(item.seller);
    }
  });
}
const filterSet = (brand) => {
  setFilteredCategory((prevFilteredCategory) => {
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
const handleSizeCheckboxChange = (size) => {
  setSelectedSizes((prevSelectedSizes) => {
    if (prevSelectedSizes.includes(size)) {
      return prevSelectedSizes.filter((selectedSize) => selectedSize !== size);
    } else {
      return [...prevSelectedSizes, size];
    }
  });
};
const handleSizePress = (size) => {
  handleSizeCheckboxChange(size);
  // Add any additional logic you want to perform on size press
};

const filterSelectionApply = () => {
  setDropdownData([])
  const filteredArray = filteredDataArray.filter((product) => {
    // if (product.category.name !== targetCategory) return false;

    if (filteredCategory.size && !filteredCategory.has(product.brand)) return false;

    if (selectedBrands.length && !selectedBrands.includes(product.brand)) return false;

    if (selectedColors.length && !selectedColors.includes(product.color)) return false;

    if (selectedPrices.length && !selectedPrices.some((range) => range.min <= product.discountedPrice && product.discountedPrice <= range.max)) return false;

    // Update to check if the product's discountPercent is within the selected discount ranges
    if (selectedDiscounts.length && !selectedDiscounts.some((range) => range.min <= product.discountPercent && product.discountPercent <= range.max)) return false;

    if (selectedSellers.length && !selectedSellers.includes(product.seller)) return false;

    // Check if the product size is in the selected sizes
    if (selectedSizes.length && !selectedSizes.includes(product.size)) return false;

    return true;
  });
  setFilteredDataArray(filteredArray);
  setFilterModalVisible(false); // Close the filter modal after applying filters

};
const handleSellerCheckboxChange = (brand) => {
  setSelectedSellers((prevSelectedBrands) => {
    if (prevSelectedBrands.includes(brand)) {
      return prevSelectedBrands.filter((selectedBrand) => selectedBrand !== brand);
    } else {
      return [...prevSelectedBrands, brand];
    }
  });
};
const handleBrandCheckboxChange = (brand) => {
  setSelectedBrands((prevSelectedBrands) => {
    if (prevSelectedBrands.includes(brand)) {
      return prevSelectedBrands.filter((selectedBrand) => selectedBrand !== brand);
    } else {
      return [...prevSelectedBrands, brand];
    }
  });
};
useEffect(()=>{

},[isChecked]);
  const handleColorCheckboxChange = (brand) => {

    if(isChecked.includes(brand)){
      setIsChecked(isChecked.filter((id) => id !== brand));
     }else{
       setIsChecked([...isChecked,brand]);
     }
    setSelectedColors((prevSelectedBrands) => {
      if (prevSelectedBrands.includes(brand)) {
        return prevSelectedBrands.filter((selectedBrand) => selectedBrand !== brand);
      } else {
       
        return [...prevSelectedBrands, brand];
      }
    }); 
  };
  const clearAllFilters = () => {
    setFilterModalVisible(false);
    setSelectedBrands([]);
    setSelectedColors([]);
    setSelectedDiscounts([]);
    setSelectedPrices([]);
    setSelectedSellers([]);
    setIsChecked([]);
    setFilteredDataArray(products);
  };
 
  return (
    <View style={{flex:1,backgroundColor:'white',padding:'1%'}}>
    
    <View style={styles.container}>

    <TouchableOpacity   onPress={() => popFromStack(navigation)}>
      <Image source={arrow} style={styles.arrowIcon} />
    </TouchableOpacity>
      <TextInput
        value={value}
        onChangeText={handleChange}
        placeholder="Search for categories & products"
        placeholderTextColor="#bab6b6"
        style={styles.textInput}
        onSubmitEditing={handleEnterPress}
        returnKeyType="done" // Set returnKeyType to "done" for Enter key
      />
     {value.length > 0 && (
  <TouchableOpacity onPress={handleClearText} style={styles.clearButton}>
    <Text style={styles.clearText}>╳</Text>
  </TouchableOpacity>
)}
    </View>
<View style={{padding:'2%'}}>

</View>
  {
 ((ShirtProduct && ShirtProduct.length > 0)||
  (categoryProducts1 && categoryProducts1.length>0)||
  (categoryProducts && categoryProducts.length>0) ||
  (JeanProduct && JeanProduct.length>0)
 
 ) && (
    <View style={{marginBottom: '35%'}}>
      <FlatList
        nestedScrollEnabled={true}
        data={filteredDataArray}
        renderItem={({ item }) => product({ item, navigation })}
        keyExtractor={(item) => item.id}
        vertical={true}
        numColumns={2}
      />
    </View>
  )
}
{
    KurtaProduct &&  KurtaProduct.length>0 
     && (
       <View style={{marginBottom: '35%'}}>
         <FlatList
           nestedScrollEnabled={true}
           data={filteredDataArray}
           renderItem={({ item }) => product({ item, navigation })}
           keyExtractor={(item) => item.id}
           vertical={true}
           numColumns={2}
         />
       </View>
     )
}

{
      categoryProducts && categoryProducts.length>0 && (
        <View style={{marginBottom:'35%'}}>
        <FlatList
          nestedScrollEnabled={true}
          data={categoryProducts}
          renderItem={({ item }) => product({ item, navigation})}
          keyExtractor={(item) => item.id}
          vertical={true}
          numColumns={2}
        />

        </View>
      )

    }
{
      categoryProd && categoryProd.length>0 && (
        <View style={{marginBottom:'35%'}}>
        <FlatList
          nestedScrollEnabled={true}
          data={filteredDataArray}
          renderItem={({ item }) => product({ item, navigation})}
          keyExtractor={(item) => item.id}
          vertical={true}
          numColumns={2}
        />

        </View>
      )
    }

{
      searchProduct && (
        <>
         {
          foundProductDetails && foundProductDetails.length>0 && 
          (
            <>
            {
              foundProductDetails.map((item,index)=>(
                <>
                  
                  <View style={styles.container1}> 
                  <View style={{ position: 'relative',marginTop:'3%',padding:'1%',margin:'4%'}}>
              <TouchableOpacity
                  onPress={() => navigateToMainPDP(item.category, item.id)}  
                >
               <Image source={{ uri: item.imageUrl[0] }} onPress={() => navigation.navigate('AboutScreen')} style={{ width: 200, height: 250, borderRadius: 10,}} />
               </TouchableOpacity> 
              </View>

            <View style={{padding:'4%',}}>
              <View style={{flexDirection:'row',width:'50%',justifyContent:'space-between'}}>
              <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
<Text style={{ fontWeight: '500', fontSize: item.brand.length > 10 ? 14 : 16, color: 'black' }}>
  {item.brand}
</Text>

              </View>
                  <View style={{marginLeft:'19%',flexDirection:'row',alignItems:'center'}}>
                   <Image source={star2} style={{width:14,height:14,}}/> 
                    <Text style={{}}>{productRatings[item.id] !== undefined ? productRatings[item.id].toFixed(1) : "N/A"}</Text>
                  </View>
                </View>
                 <Text style={{fontSize:13,color:'#2E2E2E'}}>{item.title}</Text>
                 <View style={{flexDirection:'row',}}>
                       <Text style={{color:'#00A3A1',fontWeight:'700'}}>₹{item.discountedPrice} / ₹ </Text>
                       <Text style={{color:'#00A3A1',textDecorationLine: 'line-through',}}>{item.price}</Text>                        
                 </View>
                 {item.discountPercent===0?
                   <Text style={{color:'#A4343A'}}></Text>:
                   <Text style={{color:'#A4343A'}}>({item.discountPercent}% OFF)</Text>
                 }
            </View>



                  </View>
                </>
              ))
            }
            </>
          )
         }
        </>
      )
    }


{/* {
      JeanProduct && JeanProduct.length>0 && (
        <View style={{marginBottom:'35%'}}>
        <FlatList
          nestedScrollEnabled={true}
          data={filteredDataArray}
          renderItem={({ item }) => product({ item, navigation})}
          keyExtractor={(item) => item.id}
          vertical={true}
          numColumns={2}
        />

        </View>
      )

    } */}

    {
      foundProductDetails==='product not found'?
      <>
      {/* <Image source={dog} style={{width:390,height:300,marginTop:'44%'}}/> */}
      <Text style={{textAlign:'center',color:'#c2c2c2',marginTop:'14%'}}></Text>
      </>:
      <></>
    }
      {/* {check.map((product) => (
        <Text key={product.id}>{product.category.name}  {product.title}</Text>
      ))} */}
      {isDropdownOpen && (
        <FlatList
          data={filteredData}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.dropdownOption}
              onPress={() => handleOptionSelect(item)}>
              {renderHighlightedText(item)}
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.toString()}
        />
      )}
      
{
  ((JeanProduct && JeanProduct.length > 0) ||(categoryProducts && categoryProducts.length>0) || (foundProductDetails && foundProductDetails.length>0)
    || KurtaProduct &&  KurtaProduct.length>0 || ShirtProduct &&  ShirtProduct.length>0
    || JacketProduct && JacketProduct.length>0 || categoryProducts1 && categoryProducts1.length>0
    || categoryProd && categoryProd.length>0) && (
    <>
      <View style={{ marginTop: '5%', backgroundColor: 'white', position: 'absolute', bottom: 0, flexDirection: 'row', borderWidth: 1, width: '100%', height: 60, marginBottom: '0.5%', borderColor: '#888888'}}>
        <TouchableOpacity
          onPress={handleSortPress}
          style={{ width: '50%', borderRightWidth: 1, borderColor: '#888888', justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
          <Image source={{ uri: 'http://surl.li/mynwl' }} style={{ width: 25, height: 31 }} />
          <Text style={{ textAlign: 'center', fontSize: 18, padding: '1%' }}>SORT</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleFilterPress}
          style={{ width: '50%', borderColor: '#888888', justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}>
          <Image source={filter} style={{ width: 25, height: 24 }} />
          <Text style={{ textAlign: 'center', fontSize: 18 }}>FILTER</Text>
        </TouchableOpacity>
      </View>
    </>
  )
}

<Modal animationType="slide" transparent={true} visible={sortModalVisible} onRequestClose={handleSortModalClose}>
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
                  <Text style={{ color: '#00338D', fontSize: 18,fontWeight:'bold',fontFamily:'montserrat',marginTop:'3%'}}>SORT BY:</Text>
                  <TouchableOpacity onPress={handleSortModalClose}>
                    {/* <Text style={{ marginBottom: '4%' }}>╳</Text> */}
                    <Image source={cross} style={{ width: 13, height: 14 }} />
                  </TouchableOpacity>
                 
                </View>
                <View style={{ width: '100%', borderBottomWidth: 1, borderColor: '#dbd9d9' }}></View>
                <RadioButton.Group onValueChange={(newValue) => { setSortBy(newValue) }} value={sortBy}>
                 <View style={{ marginTop: '6%' }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                   <TouchableOpacity style={{ marginLeft: '2%' }}>
                    <RadioButton value="low" />
                   </TouchableOpacity>
                    <Text style={{ color: '#00338D', fontWeight:sortBy==='low'? '700':'400', marginLeft: 8 }}>Price -- Low to High</Text>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                  <TouchableOpacity  style={{ marginLeft: '2%' }}>
                    <RadioButton value="high" />
                  </TouchableOpacity>
                  <Text style={{ color: '#00338D', fontWeight:sortBy==='high'? '700':'400', marginLeft: 8 }}>Price -- High to Low</Text>
                 </View>
               <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
               <TouchableOpacity style={{ marginLeft: '2%' }}>
               <RadioButton value="dsc" />
               </TouchableOpacity>
               <Text style={{ color: '#00338D', fontWeight:sortBy==='dsc'? '700':'400', marginLeft: 8 }}>New Arrivals</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
               <TouchableOpacity style={{ marginLeft: '2%' }}>
               <RadioButton value="rating" />
               </TouchableOpacity>
               <Text style={{ color: '#00338D', fontWeight:sortBy==='rating'? '700':'400', marginLeft: 8 }}>Sort by rating</Text>
              </View>
              
              {/* <TouchableOpacity onPress={handleSortModalClose }
                style={{ flexDirection: 'row', justifyContent: 'center', backgroundColor: '#00338D', width: '26%',padding:'2.5%', alignSelf: 'flex-end',borderRadius:12}}>
                 <Text style={{ color: 'white', textAlign: 'center',fontWeight:'600'}}>APPLY</Text>
              </TouchableOpacity> */}
             </View>
            </RadioButton.Group>

              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
        {/* Filter Modal */}
        <Modal animationType="slide" transparent={true} visible={filterModalVisible} onRequestClose={handleFilterModalClose} propagateSwipe={true}>
          <TouchableWithoutFeedback onPress={handleFilterModalClose}>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent2}>
                  <View style={{flexDirection:'row',justifyContent:'space-between',alignContent:'center',alignItems:'center',}}>
            
                        <Text style={{fontSize:22,marginTop:'3%',color:'#00338D',fontWeight:'500',marginLeft:'4%'}}>FILTERS</Text>
                      <TouchableOpacity onPress={() => clearAllFilters()}>
                        <Text style={{fontSize:15,marginTop:'3%',color:'#910404',fontWeight:'400',marginRight:'4%'}}>CLEAR ALL</Text>  
                      </TouchableOpacity>
                  </View>
                  <View style={styles.horizontalLine1}/>
 
                  <View style={{flexDirection:'row',width:'100%',height:'40%'}}>
                    <View style={{width:'30%',padding:'1%'}}>
                      <TouchableOpacity onPress={() => setFilterName("brand")}>
                        <Text style={{fontSize:17,padding:'10%',fontWeight:'400',color:'#00338D', fontWeight: filterName === 'brand' ? '600' : '400' ,color:'#00338D'}}>Brand</Text>
                        </TouchableOpacity>
                        <View style={styles.horizontalLine1}/>
                        <TouchableOpacity style={{}}  onPress={() => setFilterName("color")}>
                        <Text style={{fontSize:17,padding:'10%',fontWeight:'400',color:'#00338D', fontWeight: filterName === 'color' ? '600' : '400' ,}}>Colors</Text>
                        </TouchableOpacity>
                        <View style={styles.horizontalLine1}/>
                        <TouchableOpacity style={{}}  onPress={() => setFilterName("discountedPrice")}>
                        <Text style={{fontSize:17,padding:'10%', fontWeight: filterName === 'discountedPrice' ? '600' : '400' ,color:'#00338D'}}>Price</Text>
                        </TouchableOpacity>
                        <View style={styles.horizontalLine1}/>
                        <TouchableOpacity style={{}} onPress={() => setFilterName("discountPercent")}>
                          <Text style={{ fontSize: 17, padding: '10%', color: '#00338D', fontWeight: filterName === 'discountPercent' ? '600' : '400' }}>
                             Discount
                          </Text>
                        </TouchableOpacity>
                        <View style={styles.horizontalLine1}/>
                        {/* <TouchableOpacity style={{}} onPress={() => setFilterName("size")}>
                  <Text style={{ fontSize: 17, padding: '10%', fontWeight: filterName === 'size' ? '600' : '400', color: '#00338D' }}>Size</Text>
                </TouchableOpacity>
                        <View style={styles.horizontalLine1}/> */}
                        <TouchableOpacity style={{}} onPress={() => setFilterName("seller")}>
                        <Text style={{fontSize:17,padding:'10%',fontWeight: filterName === 'seller' ? '600' : '400',color:'#00338D'}}>Seller</Text>
                        </TouchableOpacity>
                    </View>

                    
                    {
                      filterName==='brand' && (<>
                        
                        <ScrollView  style={{ width: '60%', borderLeftWidth: 0.8, borderColor: '#d1d1d1',padding:'6%'}}>
                       
                          {Array.from(uniqueBrands).map((brand, index) => (
                           <View key={index} style={{ flexDirection: 'row', alignItems: 'center', alignContent: 'center', marginBottom: 8,padding:'3%' }}>
                            <CheckBox
                              disabled={false}
                              value={selectedBrands.includes(brand)}
                              onValueChange={() => handleBrandCheckboxChange(brand)}
                            />
                            <Text style={{ marginLeft: 8, color: '#00338D', fontWeight: '300' }}>{brand}</Text>
                           </View>
                         ))}
               
                        </ScrollView >
                       
                      </>)
                     }
                    {
                      filterName==='color' && (<>
                        <View style={{ width: '60%', borderLeftWidth: 0.8, borderColor: '#d1d1d1',padding:'6%'}}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                          {Array.from(uniqueColors).map((color, index) => (
                           <View key={index} style={{ flexDirection: 'row', alignItems: 'center', alignContent: 'center', marginBottom: 8,padding:'3%',marginLeft:'12%' }}>
                            {/* <CheckBox
                              disabled={false}
                              value={selectedColors.includes(color)}
                              onValueChange={() => handleColorCheckboxChange(color)}
                            /> */}
                            <TouchableOpacity onPress={() => handleColorCheckboxChange(color)}>
                                <Image source={isChecked.includes(color)?check2:check1} style={{width:20,height:18,padding:12,margin:'4%',
                                   marginBottom: isChecked.includes(color) ? '10%' : '10%',padding:'12%'}}/>
                            </TouchableOpacity>

                            <View style={{width:25,height:25,backgroundColor:colorMap[color],borderRadius:12,marginBottom:'4%',marginLeft:'5%',borderColor:colorMap[color]==='white'?'red':''}}/>
                            {/* <Text style={{ marginLeft: 8, color: '#00338D', fontWeight: '300' }}>{color}</Text> */}
                           </View>
                         ))}
                         </ScrollView>
                        </View>
                      </>)
                     }
            {filterName === 'size' && (
  <View style={{ width: '60%', borderLeftWidth: 0.8, borderColor: '#d1d1d1', padding: '6%' }}>
    {Array.from(uniqueSizes).map((size, index) => (
      <TouchableOpacity
        key={index}
        style={{ flexDirection: 'row', alignItems: 'center', alignContent: 'center', marginBottom: 8, padding: '3%' }}
        onPress={() => handleSizePress(size)}
      >
        <CheckBox
          disabled={false}
          value={selectedSizes.includes(size)}
          onValueChange={() => handleSizeCheckboxChange(size)}
        />
        <Text style={{ marginLeft: 8, color: '#00338D', fontWeight: '300' }}>{size}</Text>
      </TouchableOpacity>
    ))}
  </View>
)}

                     

              {
              filterName === 'discountedPrice' && (
              <View style={{ width: '60%', borderLeftWidth: 0.8, borderColor: '#d1d1d1', padding: '6%' }}>
              {priceRanges.map((range, index) => (
               <View key={index} style={{ flexDirection: 'row', alignItems: 'center', alignContent: 'center', marginBottom: 8, padding: '3%' }}>
               <CheckBox
                 disabled={false}
                 value={selectedPrices.some((price) => price.min === range.min && price.max === range.max)}
                 onValueChange={() => handlePriceCheckboxChange(range)}
               />
                <Text style={{ marginLeft: 8, color: '#00338D', fontWeight: '300' }}>{`${range.min}-${range.max}`}</Text>
               </View>
              ))}
           </View>
            )
           }


{
  filterName === 'discountPercent' && (
    <View style={{ width: '60%', borderLeftWidth: 0.8, borderColor: '#d1d1d1', padding: '6%' }}>
      {percentageRanges.map((range, index) => (
        <View key={index} style={{ flexDirection: 'row', alignItems: 'center', alignContent: 'center', marginBottom: 8, padding: '3%' }}>
          <CheckBox
            disabled={false}
            value={selectedDiscounts.some((selectedRange) => selectedRange.min === range.min && selectedRange.max === range.max)}
            onValueChange={() => handleDiscountCheckboxChange(range)}
          />
          <Text style={{ marginLeft: 8, color: '#00338D', fontWeight: '300' }}>{`${range.min}-${range.max}%`}</Text>
        </View>
      ))}
    </View>
  )
}
                  
                
                    {
                      filterName==='seller' && (<>
                        <View style={{ width: '60%', borderLeftWidth: 0.8, borderColor: '#d1d1d1',padding:'6%'}}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                          {Array.from(uniqueSeller).map((brand, index) => (
                           <View key={index} style={{ flexDirection: 'row', alignItems: 'center', alignContent: 'center', marginBottom: 8,padding:'3%' }}>
                            <CheckBox
                              disabled={false}
                              value={selectedSellers.includes(brand)}
                              onValueChange={() => handleSellerCheckboxChange(brand)}
                            />
                            <Text style={{ marginLeft: 8, color: '#00338D', fontWeight: '300' }}>{brand}</Text>
                           </View>
                         ))}
                         </ScrollView>
                        </View>
                      </>)
                     }



                  </View>

                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', padding: '7%', borderTopWidth: 1, borderColor: '#d1d1d1',
                              marginTop:'4%' }}>
                  <TouchableOpacity onPress={handleFilterModalClose }>
                     <Text style={{ fontSize: 19, color: 'grey' }}>CLOSE</Text>
                  </TouchableOpacity>
                  <View style={{ borderRightWidth: 1, borderColor: '#d1d1d1', height: '100%', marginHorizontal: 15, marginTop: -10 }} />
                 <TouchableOpacity style={{}} onPress={()=>{filterSelectionApply()}}>
                   <Text style={{ fontSize: 19, color: '#ad0505' }}>APPLY</Text>
                 </TouchableOpacity>
                </View>

                </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>        

    </View>
  );

  function product({item,navigation}){
    return (<>
      <View style={{flexDirection:'row'}}>
        
        <View style={{ position: 'relative',marginTop:'10%',padding:3,marginLeft:'1.7%'}}>
            <TouchableOpacity
                // onPress={()=>navigation.navigate('mainPDP',{ category: item.category, id: item.id })}  
                   onPress={() => navigateToMainPDP(item.category, item.id)}     
               >
              <Image source={{ uri: item.imageUrl[0] }} style={{ width: 180, height: 250, borderRadius: 10,}} />
           </TouchableOpacity> 
           <View style={{padding:'4%'}}>
              <View style={{flexDirection:'row',width:'45%',justifyContent:'space-between'}}>
              <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
<Text style={{ fontWeight: '500', fontSize: item.brand.length > 10 ? 14 : 16, color: 'black' }}>
  {item.brand}
</Text>

              </View>
 
                  <View style={{marginLeft:'19%',flexDirection:'row',alignItems:'center'}}>
                   <Image source={star2} style={{width:14,height:14,}}/> 
                    <Text style={{color:'black',}}>
                    {productRatings[item.id] !== undefined ? productRatings[item.id].toFixed(1) : "N/A"}
                    </Text>
                  </View>
                </View>
                 <Text style={{fontSize:13,color:'#2E2E2E'}}>{item.title}</Text>
                 <View style={{flexDirection:'row',}}>
                       <Text style={{color:'#00A3A1',fontWeight:'700'}}>₹{item.discountedPrice} / ₹ </Text>
                       <Text style={{color:'#00A3A1',textDecorationLine: 'line-through',}}>{item.price}</Text>                        
                 </View>
                 {item.discountPercent===0?
                   <Text style={{color:'#A4343A'}}></Text>:
                   <Text style={{color:'#A4343A'}}>({item.discountPercent}% OFF)</Text>
                 }
            </View>

        </View>

      </View>
 
    </>);
  }

};



const styles = StyleSheet.create({
  dropdownOption: {
    padding: 10,
  },
  boldText: {
    fontWeight: 'bold',
  },
  arrowIcon: {
    width: 15,
    height: 10,
    marginRight: 5, // Adjust as needed
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: '4%',
    marginLeft: '4%',
    marginTop: '5%',
   
  },
  textInput: {
    flex: 1,
    padding: 5,
    borderRadius: 5,
    borderColor: '#e1e2e6',
    borderWidth: 1,
  },
  clearText:{
    alignSelf:'center',
    fontSize:15
  },
  clearButton: {
    position: 'absolute',
    right: 10,
    top: '40%',
    width:40,
    height:25,
    alignSelf:'center',
    transform: [{ translateY: -8 }], // Adjust as needed to vertically center the icon
  },
  container1:{
    flexDirection:'column',
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
  marginTop:'155%',
  backgroundColor: 'white',
  padding: 20,
  bottom:0,
  position:'fixed',
  borderRadius: 10,
  backgroundColor:'white',
},
modalContent2: {
  width: '100%',
  height: '180%',
  backgroundColor: 'white',
  padding: 5,
  bottom:0,
  position:'fixed',
  borderRadius: 10,
  marginTop:'210%'
},
horizontalLine1: {
  borderBottomWidth: 0.8,
  borderBottomColor: '#d1d1d1',
  marginVertical: 8,
},

});

export default Elastic;

