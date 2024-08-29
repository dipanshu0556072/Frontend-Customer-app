import React, { useEffect, useState } from "react";
import { Image, TouchableOpacity, View, TextInput, Text, TouchableWithoutFeedback, Keyboard, ScrollView } from "react-native";
import searchIcon from '../PlpScreen/images/search.png';
import bag from '../PlpScreen/images/bag.png';
import heart from '../PlpScreen/images/heart.png';
import kpmg from '../PlpScreen/images/kpmg.png';
import axios from "axios";
import { useLoginContext } from "../Login/LoginCartProvider";
import { useCartContext } from "../Context/WomenContext";

export default function TopBar1({ navigation }) {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const {token,setLoginUserId,pushToStack, setCurrentPage,currentPage,
    popFromStack,} = useLoginContext();

  const [searchData, setSearchData] = useState([]);

  // useEffect(() => {
  //   // Use searchData in your effect if needed
  //   console.log("Search Data:", searchData);
  // }, [searchData]);

  // const handleSearchSubmit = async () => {
  //   try {
  //     const currentSearchText = searchText.trim();

  //     if (currentSearchText) {
  //       const response = await axios.get(`http://192.168.0.107:5454/api/products/search?q=${currentSearchText}`, {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });

  //       const searchData = response.data;
  //       setSearchData(response.data);
  //       getSearchdata(searchData);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching search data:", error);
  //   }
  // };

  // const getSearchdata = (searchData) => {
  //   console.log("Search Data:", searchData);
  //   // Perform actions with searchData
  // };

  // const handleSearchPress = async () => {
  //   setIsSearchVisible(true);

  //   try {
  //     const currentSearchText = searchText.trim();

  //     if (currentSearchText) {
  //       const response = await axios.get(`https://192.168.0.107:5454/api/products/search?q=${currentSearchText}`, {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });

  //       const searchData = response.data;
  //       getSearchdata(searchData);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching search data:", error);
  //   }
  // };

  // const handleCancelSearch = () => {
  //   setIsSearchVisible(false);
  //   setSearchText('');
  //   setSearchData([]); // Reset searchData to an empty array
  // };

  // const handleSearchBlur = () => {
  //   setIsSearchVisible(false);
  // };

  const handleTouchablePress = () => {
    Keyboard.dismiss();
    setIsSearchVisible(false);
  };

  function forNavigate(page){
    console.log(page+" "+currentPage[currentPage.length-1]);
    if(currentPage && currentPage[currentPage.length-1]!==page){
      pushToStack(page);
      navigation.navigate(page)
    }else{
      popFromStack(navigation);
    }
  }
  return (

    <TouchableWithoutFeedback >
      <View style={{backgroundColor:'white'}}>
        <View style={{ padding: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginRight: '3%' }}>
        <TouchableOpacity onPress={() => forNavigate('mainHome')}>
            <Image source={kpmg} style={{ width: 160, height: 90, }} />
          </TouchableOpacity>
          <View style={{ flexDirection: 'row' }}>
            <View>
              <TouchableOpacity  onPress={() => forNavigate('Elastic')}>
                <Image source={searchIcon} style={{ marginRight: 10, width: 25, height: 33, }} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity  onPress={() => forNavigate('mainBag')}>
              <Image source={bag} style={{ marginRight: 10, }} />
            </TouchableOpacity>
            <TouchableOpacity  onPress={() => forNavigate('WishList')}>
              <Image source={heart} style={{}} />
            </TouchableOpacity>
          </View>
        </View>


        
      </View>
    </TouchableWithoutFeedback>

  );
}
