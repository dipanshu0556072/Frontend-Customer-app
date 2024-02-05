import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import MenJeans from './PlpScreen/images/MenJeans.png';
import MenShirt from './PlpScreen/images/MenShirt.png';
import MenKurta from './PlpScreen/images/MenKurta.png';
import MenPant from './PlpScreen/images/MenPant.png';
import WomenEthnic from './PlpScreen/images/WomenEthnic.png';
import WomenJeans from './PlpScreen/images/WomenJeans.png';
import WomenTop from './PlpScreen/images/WomenTop.png';
import Saree from './PlpScreen/images/Saree.png';
import { useLoginContext } from './Login/LoginCartProvider';
import back from './PlpScreen/images/back.png';
import { useCartContext } from './Context/WomenContext';

const CategoryPage = ({navigation}) => {

  // Use the context to get the currentIndex
  const {selectedItemIndex, setSelectedItemIndex, 
         currentPageIndex,currentPageIndexCategory, 
         setCurrentPageIndexCategory,pushToStack,popFromStack,
         currentPage,
         setCurrentPageIndex} = useLoginContext();
  const {FilteredDataArray,setFilteredDataArray}=useCartContext();
  useEffect(()=>{
   setFilteredDataArray([]);
  },[FilteredDataArray]);

     
  // Create a Map with integer keys and Map values
  const outerMap = new Map();
  outerMap.set(1, new Map([[1, { name: 'Jeans', image: MenJeans }], [2, { name: 'Kurtas', image: MenKurta }], [3, { name: 'Pants', image: MenPant }], [4, { name: 'Shirt', image: MenShirt }]]));
  outerMap.set(2, new Map([[1, { name: 'Ethnic Dress', image: WomenEthnic }], [2, { name: 'Jeans', image: WomenJeans }], [3, { name: 'Top', image: WomenTop }], [4, { name: 'Sarees', image: Saree }]]));

  // Displaying the values for the specified currentIndex
  const renderMapContent = () => {
    const innerMap = outerMap.get(currentPageIndex);

    if (!innerMap) {
      return <Text>No data found for currentIndex: {currentPageIndex}</Text>;
    }

    const navigateToMainPlp = (page,itemId) => {
        if(currentPage && currentPage.length>0 && currentPage[currentPage.length-1]!==page){
          pushToStack(page);
          navigation.navigate(page);
          }        
      };

    const mapContent = Array.from(innerMap).map(([innerKey, { name, image }]) => (
      <View key={innerKey} style={{ flexDirection: 'column' }}>
        <TouchableOpacity
          onPress={() => {
            setCurrentPageIndexCategory(name);
            setSelectedItemIndex(innerKey); // Store the selected index
            navigateToMainPlp('mainPlp',selectedItemIndex);
          }}
        >
                      {image && <Image source={image} style={{ width: 80, height: 90, borderRadius: 12 }} />}
        </TouchableOpacity>
        <Text style={{ textAlign: 'center', fontWeight: '500', fontSize: 12, color: 'black' }}>{`${name}`}</Text>
      </View>
    ));

    return mapContent;
  };


  return (
    <>
    <View style={{flex:1,backgroundColor:'white'}}>
      <View style={{flexDirection:'row',alignItems:'center',alignItems:'center',marginBottom:'3%',marginTop:'10%'}}>
          <View>
            <TouchableOpacity
                onPress={() => popFromStack(navigation)}>
                  <Image source={back}  
                      style={{marginLeft:12}}/>
            </TouchableOpacity>
          </View>
          <View style={{}}>
              <Text style={{paddingLeft:10,color:'black',textAlign:'center'}}>MEN</Text>              
          </View>
       </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', }}>
        {renderMapContent()}
      </View>
      <Text>{currentPageIndex} {currentPageIndexCategory} {selectedItemIndex}</Text>
    </View>  
    </>
  );
};

export default CategoryPage;

const styles = StyleSheet.create({});
