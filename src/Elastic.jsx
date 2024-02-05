import React, { useEffect, useState } from 'react';
import { View, TextInput, FlatList, TouchableOpacity, Text, StyleSheet,Image,SafeAreaView} from 'react-native';
import axios from 'axios';
import { useCartContext } from './Context/WomenContext';
import { useLoginContext } from './Login/LoginCartProvider';
import arrow from './arrow.png';
import dog from './dog.png';
import star2 from './PlpScreen/images/star2.png';


const Elastic = ({navigation}) => {
  const [check, setCheck] = useState([]);
  const [dropdownData, setDropdownData] = useState([]);
  const {ip,token,popFromStack,}=useLoginContext();
  const {productIds}=useCartContext();

  const [foundProductDetails, setFoundProductDetails] = useState('');

  //check the search is by product name or category
  const [searchProduct,setSearchProduct]=useState(false);
  const [searchCategory,setSearchCategory]=useState(false);
  const [productRatings, setProductRatings] = useState({});

  useEffect(()=>{
   
  },[foundProductDetails,searchProduct,searchCategory]);
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
    if((!check.find((product) => product.title === item)) && (!check.filter((product) => product.category.name === value))){
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

  };
  const handleEnterPress = () => {
    // Add the functionality you want to perform when Enter key is pressed
    console.log('Enter key pressed! Value:', value);
    searchData(value);
    if (!foundProductDetails || (foundProductDetails.length === 0)) {
      setSearchProduct(false);
      setSearchCategory(false);
      setIsDropdownOpen(false);
      setFoundProductDetails('product not found');
      
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
  
  const categoryProducts = check.filter((product) => product.category && product.category.name === value);



  const categoryProducts1 = check.filter(
    (product) =>
      product.category &&
      product.category.parentCategory &&
      product.category.parentCategory.parentCategory &&
      product.category.parentCategory.parentCategory.name === value
  );
  
  // Now `categoryProducts1` contains an array of products with the specified level 3 category name.
  
 
  
  // Now `categoryProducts1` contains an array of products with the specified level 3 category name.
  
  return (
    <View style={{flex:1,backgroundColor:'white'}}>
    <View style={styles.container}>
    <TouchableOpacity   onPress={() => popFromStack(navigation)}>
      <Image source={arrow} style={styles.arrowIcon} />
    </TouchableOpacity>
      <TextInput
        value={value}
        onChangeText={handleChange}
        placeholder="Search for brands & products"
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
    {/* <Text>{JSON.stringify(check)}</Text> */}
    {/* {
  check.map((item, index) => {
    if (item && item.category) {
      const level1CategoryName = item.category.name;
      return (
        <Text key={index}>
          Level 1 Category Name: {level1CategoryName}
        </Text>
      );
    }
    return null; // Return null for items that don't have a category
  })
}
{
  check.map((item, index) => {
    if (item && item.category && item.category.parentCategory) {
      const level2CategoryName = item.category.parentCategory.name;
      return (
        <Text key={index}>
          Level 2 Category Name: {level2CategoryName}
        </Text>
      );
    }
    return null; // Return null for items that don't have a category or a parent category
  })
}
{
  check.map((item, index) => {
    if (item && item.category && item.category.parentCategory && item.category.parentCategory.parentCategory) {
      const level3CategoryName = item.category.parentCategory.parentCategory.name;
      return (
        <Text key={index}>
          Level 3 Category Name: {level3CategoryName}
        </Text>
      );
    }
    return null; // Return null for items that don't have the required category levels
  })
} */}



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
                  {/* <Text>{item.imageUrl}</Text> */}
                  <View style={{ position: 'relative',marginTop:'10%',padding:'1%',}}>
              <TouchableOpacity
                onPress={()=>navigation.navigate('mainPDP',{ category: item.category, id: item.id })}     
                >
               <Image source={{ uri: item.imageUrl }} onPress={() => navigation.navigate('AboutScreen')} style={{ width: 200, height: 250, borderRadius: 10,}} />
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
    {/* <Text>{JSON.stringify(check)}</Text> */}
    {
      searchCategory && 
      (
        <>
        {
        foundProductDetails && foundProductDetails.length>0 && 
        (
          <>
       
          </>
        )
        }
        </>
      )
    }
    {/* <Text>{JSON.stringify(foundProductDetails)}</Text> */}
    {/* <Text>{JSON.stringify(categoryProducts1)}</Text> */}
    {
      categoryProducts1 && categoryProducts1.length>0 && (
        <>
        <FlatList
          nestedScrollEnabled={true}
          data={categoryProducts1}
          renderItem={({ item }) => product({ item, navigation})}
          keyExtractor={(item) => item.id}
          vertical={true}
          numColumns={2}
        />

        </>
      )

    }
    {
      categoryProducts && categoryProducts.length>0 && (
        <>
         {
          // categoryProducts.map((item,index)=>(
          //   <>
          //   <Text>{JSON.stringify(item.imageUrl)}</Text>
          //   </>
          // ))
          <FlatList
          nestedScrollEnabled={true}
          data={categoryProducts}
          renderItem={({ item }) => product({ item, navigation})}
          keyExtractor={(item) => item.id}
          vertical={true}
          numColumns={2}
        />
         }
        </>
      ) 
    }
    {
      foundProductDetails==='product not found'?
      <>
      {/* <Image source={dog} style={{width:390,height:300,marginTop:'44%'}}/> */}
      <Text style={{textAlign:'center',color:'#c2c2c2',marginTop:'14%'}}>Sorry but this product not in our dataBase🥲</Text>
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
    </View>
  );
  function product({item,navigation}){
    return (<>
      <View style={{flexDirection:'row'}}>
        <View style={{ position: 'relative',marginTop:'10%',padding:3,marginLeft:'1.7%'}}>
            <TouchableOpacity
                onPress={()=>navigation.navigate('mainPDP',{ category: item.category, id: item.id })}     
               >
              <Image source={{ uri: item.imageUrl }} style={{ width: 180, height: 250, borderRadius: 10,}} />
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
    backgroundColor: '#E9EAEC',
    padding: 5,
    borderRadius: 5,
    borderColor: '#e1e2e6',
    borderWidth: 1,
  },
  clearButton: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: [{ translateY: -8 }], // Adjust as needed to vertically center the icon
  },
  container1:{
    flexDirection:'column',
},
});

export default Elastic;
