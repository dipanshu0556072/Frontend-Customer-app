import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Image ,SafeAreaView,FlatList} from 'react-native';
import back from './PlpScreen/images/back.png';
import fashion from './PlpScreen/images/fashion.jpeg';
import grocery from './PlpScreen/images/grocery.jpeg';
import womens from './PlpScreen/images/womens.png';
import kid from './PlpScreen/images/kid.png';
import beauty from './PlpScreen/images/beauty.jpeg';
import gift from './PlpScreen/images/giftcard.png';
import banner1 from './PlpScreen/images/banner1.png';
import banner5 from './PlpScreen/images/banner2.png';
import Footer from './Footer';
import { useCartContext } from './Context/WomenContext';
import axios from 'axios';
import star2 from './PlpScreen/images/star2.png';

const Category = ({ navigation }) => {
 
   const {token,products,categorySelect, setCategorySelect, setProducts}=useCartContext();
   const ChooseCategory=(catg)=>{
      setCategorySelect(catg);
   }
  // useEffect(() => {
  //   const getData = async () => {
  //     try {
  //       const response = await axios.get("http://192.168.1.101:5454/api/admin/products/all", {
  //         headers: {
  //           'Authorization': `Bearer ${token}`,
  //         },
  //       });
  //       console.log(response.data);
  //       setProducts((prevProducts) => {
  //         const newProducts = response.data;
          
  //         console.log("dataArray:" + newProducts.length);
  //         return newProducts;
  //       });
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   }
  
  //   getData();
  // }, [token]);


   const targetCategory =
   categorySelect === 1 ? 'Jeans' :
   categorySelect === 2 ? 'Grocery' :
   categorySelect === 3 ? 'Women Formal' :
   categorySelect === 4 ? 'Kids' :
   categorySelect === 5 ? 'Beauty' :
   categorySelect === 6 ? 'Gift Card' :
   'Jeans';
 
   const filteredDataArray = products.filter(
    (product) => product.category.name === targetCategory
  );

  products.forEach(product => {
    const categoryName = product.category.name;
    console.log('Category Name:', categoryName);
  });
  
  console.log("CategoryData"+products);

  

  return (
    <>
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: '1%', paddingTop: '7%' }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Home');
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View>
              <Image source={back} style={{ marginLeft: 12 }} />
            </View>
            <View>
              <Text style={{ paddingLeft: 10, color: 'black' }}>All Categories</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        
        showsVerticalScrollIndicator={false}
       
      >

        <View style={styles.container}>
          <View style={styles.columnContainer}>
            <TouchableOpacity style={styles.categoryItem}
             onPress={()=>{
              ChooseCategory(1)
             }}
             >
              <Image source={fashion} style={styles.categoryImage} />
                <Text style={styles.categoryText}>Mens</Text>
              
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryItem}
             onPress={()=>{
              ChooseCategory(2)
             }}
             >
              <Image source={womens} style={styles.categoryImage} />
              <Text style={styles.categoryText}>Womens</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryItem}
             onPress={()=>{
              ChooseCategory(3)
             }}
             >
              <Image source={grocery} style={styles.categoryImage} />
              <Text style={styles.categoryText}>Grocery</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryItem}
             onPress={()=>{
              ChooseCategory(4)
             }}
             >
              <Image source={kid} style={styles.categoryImage} />
              <Text style={styles.categoryText}>Kids</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryItem}
             onPress={()=>{
              ChooseCategory(5)
             }}
             >
              <Image source={beauty} style={styles.categoryImage} />
              <Text style={styles.categoryText}>Beauty</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryItem}
             onPress={()=>{
              ChooseCategory(6)
             }}
             >
              <Image source={gift} style={styles.categoryImage} />
              <Text style={styles.categoryText}>Gift Cards</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryItem}
             onPress={()=>{
              ChooseCategory(7)
             }}
             >
              <Image source={banner5} style={styles.categoryImage} />
              <Text style={styles.categoryText}>Gift Cards</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryItem}
             onPress={()=>{
              ChooseCategory(8)
             }}
             >
              <Image source={gift} style={styles.categoryImage} />
              <Text style={styles.categoryText}>Gift Cards</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryItem}
             onPress={()=>{
              ChooseCategory(9)
             }}
             >
              <Image source={gift} style={styles.categoryImage} />
              <Text style={styles.categoryText}>Gift Cards</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryItem}
             onPress={()=>{
              ChooseCategory(10)
             }}
             >
              <Image source={banner1} style={styles.categoryImage} />
              <Text style={styles.categoryText}>Gift Cards</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.verticalLine}></View>
          <View style={styles.column2}>
          <Text style={{marginLeft:'3%',fontWeight:'800'}}>{targetCategory}</Text>

           <ScrollView>
               <SafeAreaView>
                 <FlatList 
                   nestedScrollEnabled={true}
                   data={filteredDataArray}
                   renderItem={({ item }) => product({ item, navigation })}
                   keyExtractor={(item) => item.id}
                   vertical={true}
                   numColumns={2}
                 />  
               </SafeAreaView> 
          </ScrollView>

          </View>
        </View>
      </ScrollView>
    </>
  );
};

function product({item,navigation})
{
   return (
    <>
        <View style={{ flex: 1, backgroundColor: 'white' }}>

      <View style={styles.mainRow}>
        <TouchableOpacity
             onPress={()=>navigation.navigate('mainPDP',{ category: item.category, id: item.id })}     
          >
            <View style={{marginTop:'10%',padding:'1%',marginLeft:'10%'}}>
                 <Image source={{ uri: item.imageUrl }}  style={{ width: 120, height: 150, borderRadius: 10,}} />
            </View>
           </TouchableOpacity> 
           <View style={{marginLeft:'6%',padding:'2%'}}>
                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                  <Text style={{fontWeight:'500',fontSize:13,color:'black',marginTop:'3%'}}>{item.brand}</Text>
                  <View style={{flexDirection:'row',alignItems:'center'}}>
                  </View>
                </View>
                 <Text style={{fontSize:11,color:'#2E2E2E',marginTop:'1%'}}>{item.title}</Text>
                 <View style={{marginTop:'2%'}}>
                       <Text style={{color:'grey',textDecorationLine: 'line-through',fontSize:12}}> ₹ {item.price}</Text>                        
                       <Text style={{color:'black',fontWeight:'bold',fontSize:13}}>₹{item.discountedPrice}</Text>
                 </View>
                 {item.discountPersent===0?
                   <Text style={{color:'#A4343A'}}></Text>:
                   <Text style={{color:'#A4343A'}}>{item.discountPersent}% OFF</Text>
                 }
            </View>
          
      </View>
      </View>
    </>
   );
}

export default Category;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingRight: 16,
  },
  container: {
    marginTop: 30,
    paddingLeft: '4%',
    width: '20%',
    flexDirection: 'row',
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
    fontWeight:'bold'
  },
  verticalLine: {
    width: 1,
    backgroundColor: '#d1cfcf',
    height: '100%',
    marginLeft: '28%', // Adjust as needed
  },
  column2:{
   width:'485%',
   marginLeft:'2%',
  },
  mainRow:{
  },
  profileContainer:{
    padding:'3%',
 },
 txt1:{
     fontSize:18,
     color:'black',
     padding:'0.5%'
 },
 txt2:{
     fontSize:15,
     color:'#4a4948',
     padding:'0.5%'
 },
 txt3:{
     fontSize:15,
     color:'#52514e',
     marginLeft:'5%'
 },    
 txt4:{
     fontSize:15,
     color:'#52514e',
     marginLeft:'5%',
     color:'#A4343A'
 },

 row2:{
     marginTop:'0.8%',
     justifyContent:'space-between'
 },
 column:{
     flexDirection:'row',
     justifyContent:'space-between',
     alignItems:'center',
     padding:15,
     borderColor:'#e6e3e3',
     borderTopWidth:1
 },
 modalContainer: {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center',
   backgroundColor: 'rgba(0, 0, 0, 0.5)',
 },
 modalContent: {
   width: '70%',
   height: '23%',
   marginTop:'10%',
   backgroundColor: 'white',
   padding: 20,
   bottom:0,
   position:'fixed',
   borderRadius: 10,
   backgroundColor:'white',
 },

});
