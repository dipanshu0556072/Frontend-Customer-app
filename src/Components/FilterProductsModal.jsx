import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  TouchableHighlight,
  ScrollView,
  SafeAreaView,
  Modal,
  Alert,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {RadioButton} from 'react-native-paper';
import CheckBox from '@react-native-community/checkbox';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import {useCartContext} from '../Context/WomenContext';
import {useLoginContext} from '../Login/LoginCartProvider';
import axios from 'axios';
import {color} from 'react-native-elements/dist/helpers';

const FilterProductsModal = ({visible, closeModal}) => {
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSellers, setSelectedSellers] = useState([]);

  const [sliderValues, setSliderValues] = useState([200, 1000]);
  const {
    PLPData,
    searchData,
    setSearchData,
    setPLPData,
    filteredDataOnPLP,
    setFilteredDataOnPLP,
    selectedFilterData,
    setSelectedFilterData,
    selectedFilter,
    setSelectedFilter,
    setShowActivityIndicator,
  } = useCartContext();
  const {ip, token} = useLoginContext();

  //get product Category
  const productCategory = searchData && searchData.length>0? searchData && searchData[0]?.category?.name:PLPData && PLPData[0]?.category?.name;

  //call filter API for filter data from backend
  const filterProductFromAPI = async (category, data) => {
    //data to pass
    // let filterData;
    // if(selectedBrands.length>0||selectedColors.length>0||selectedSellers.length>0){
    //     filterData=filteredDataOnPLP;
    // }else{
    //   filterData=PLPData;
    // }

    try {
      const response = await axios.post(
        `http://${ip}:5454/api/products/filter?category=${category}`,
        data, // Send PLPData in the body of the POST request
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setSelectedFilterData(response.data);
      //if category is price then set range accordingly

      if (category == 'price') {
        const minPrice = parseInt(response.data[0], 10);
        const maxPrice = parseInt(response.data[1], 10);

        // Set slider values to dynamic range
        setSliderValues([minPrice, maxPrice]);
      }
    } catch (error) {
      console.log('Error in filterProduct in PLPPage:', error);
    }
  };

  //apply multiFilter on PDP based on selected filters
  const MultiFilterOnPdpAPI = async val => {
    Alert.alert(JSON.stringify(productCategory));
    const filterData = {
      brand: selectedBrands,
      color: selectedColors,
      seller: selectedSellers,
    };
    try {
      const response = await axios.post(
        `http://${ip}:5454/api/products/multiFilter?category=${productCategory}`,
        filterData, // Send PLPData in the body of the POST request
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (val == 'apply') {
        setFilteredDataOnPLP(response.data);
      } else if (
        selectedBrands.length > 0 ||
        selectedColors.length > 0 ||
        selectedSellers.length > 0
      ) {
        filterProductFromAPI(val, response.data);
      }
    } catch (error) {
      console.log('Error in MultiFilterOnPdpAPI in PLPPage:', error);
    }
  };

  //show price range in filter
  const onValuesChange = values => {
    setSliderValues(values);
  };

  // Function to return the correct checkbox data array based on selectedFilterName
  const getSelectedBoxArray = val => {
    switch (val) {
      case 'brand':
        return selectedBrands;
      case 'color':
        return selectedColors;
      case 'seller':
        return selectedSellers;
      default:
        return [];
    }
  };

  //add value in checkBox Array
  const handleCheckboxChange = (val, item) => {
    // Check if the item is already selected
    const isSelected = getSelectedBoxArray(val).includes(item);

    // Update the corresponding state
    if (val === 'brand') {
      setSelectedBrands(
        isSelected
          ? selectedBrands.filter(product => product !== item)
          : [...selectedBrands, item],
      );
    } else if (val === 'color') {
      setSelectedColors(
        isSelected
          ? selectedColors.filter(c => c !== item)
          : [...selectedColors, item],
      );
    } else if (val === 'seller') {
      setSelectedSellers(
        isSelected
          ? selectedSellers.filter(s => s !== item)
          : [...selectedSellers, item],
      );
    }
  };

  //get the data or filter using filter category
  const filterDataFromAPI = value => {
    setSelectedFilter(value);
  };
  //if filter select from filter section then action which will perform
  const actionOnFilterPress = val => {
    filterDataFromAPI(val);
    //call api for making dependency between filters
    if (
      selectedBrands.length > 0 ||
      selectedColors.length > 0 ||
      selectedSellers.length > 0
    ) {
      MultiFilterOnPdpAPI(val);
    } else {
      filterProductFromAPI(val, PLPData);
    }
  };
  //filterType
  const FilterType = ({val, title}) => {
    return (
      <>
        <TouchableOpacity
          onPress={() => {
            actionOnFilterPress(val);
          }}>
          <View style={styles.filterRowContainer}>
            <Text
              style={[
                styles.filterRowC1Text,
                {fontWeight: selectedFilter === val ? '600' : '400'},
              ]}>
              {title}
            </Text>

            <Text style={styles.filterCountText}>
              {getSelectedBoxArray(val).length > 0 &&
                getSelectedBoxArray(val).length}
            </Text>
          </View>
        </TouchableOpacity>

        <View style={styles.horizontalLine1} />
      </>
    );
  };

  useEffect(() => {}, [sliderValues]);
  //filterValue
  const FilterValue = ({category, boxArray}) => {
    return (
      <>
        <View style={styles.filterData}>
          {category !== 'price' ? (
            <View style={styles.filterDataSection}>
              <FlatList
                data={selectedFilterData}
                keyExtractor={(item, index) => index.toString()} // Use a unique key if possible
                renderItem={({item}) => (
                  <View style={styles.checkboxContainer}>
                    <CheckBox
                      disabled={false}
                      value={boxArray.includes(item)}
                      onValueChange={() => handleCheckboxChange(category, item)}
                    />
                    {category === 'color' ? (
                      <View
                        style={[
                          styles.colorBox,
                          {
                            backgroundColor: item,
                            borderWidth: item === '#FFFFFF' ? 1 : 0,
                          },
                        ]}
                      />
                    ) : (
                      <Text style={styles.text}>{item}</Text>
                    )}
                  </View>
                )}
              />
            </View>
          ) : (
            <View style={{marginLeft: '5%'}}>
              <View style={{marginTop: '6%', marginBottom: '8%'}}>
                <Text
                  style={{
                    color: 'rgba(0, 0, 0, 0.9)',
                    fontWeight: '400',
                    fontSize: 12,
                  }}>
                  Selected Price Range
                </Text>
                <Text
                  style={{
                    fontWeight: '500',
                    fontSize: 14,
                    marginTop: '1%',
                    color: 'black',
                  }}>
                  ₹{sliderValues[0]} - ₹{sliderValues[1]}
                </Text>
              </View>

              <MultiSlider
                min={200}
                max={1000}
                step={1}
                values={sliderValues}
                onValuesChange={onValuesChange}
                selectedStyle={styles.selectedSlider}
                unselectedStyle={styles.unselectedSlider}
                markerStyle={styles.marker}
                sliderLength={170}
              />
            </View>
          )}
        </View>
      </>
    );
  };

  // Function to reset the selected filter
  const resetSelectedFilter = () => {
    setSelectedFilter('brand');
  };

  // Clear all filters
  const clearAllFilters = () => {
    setSelectedBrands([]);
    setSelectedColors([]);
    setSelectedSellers([]);
    setFilteredDataOnPLP([]);
  };

  // Close filter modal and set selected filter to 'brand'
  const closeFilter = () => {
    resetSelectedFilter();
    closeModal();
  };

  // Clear filter modal (reset selected filter and clear all filters)
  const clearFilter = () => {
    resetSelectedFilter();
    clearAllFilters();
    setTimeout(() => {
      closeModal();
    }, 100);
  };

  //apply filters
  const applyFilters = () => {
    resetSelectedFilter();
    MultiFilterOnPdpAPI('apply');
    // setShowActivityIndicator(true);
    // setTimeout(() => {
    //   setShowActivityIndicator(false);
    // }, 2000);
    closeModal();
  };

  //bottom button
  const BottomButton = ({title1, fun1, title2, fun2}) => {
    return (
      <View style={styles.bottomButton}>
        <TouchableOpacity onPress={fun1}>
          <Text style={styles.bottomBtnText}>{title1}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={fun2}>
          <Text style={styles.bottomApplyBtnText}>{title2}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={closeModal}>
        <TouchableWithoutFeedback>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <View style={styles.filterContainer}>
                <Text style={styles.filterMainHeading}>FILTERS</Text>
                <TouchableOpacity onPress={clearFilter}>
                  <Text style={styles.clearFilterText}>CLEAR ALL</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.horizontalLine1} />

              <View style={styles.filterRow}>
                <View style={styles.filterRowC1}>
                  <FilterType val="brand" title="Brand" />
                  <FilterType val="color" title="Colors" />
                  <FilterType val="price" title="Price" />
                  <FilterType val="seller" title="Seller" />
                </View>
                <FilterValue
                  category={selectedFilter}
                  boxArray={getSelectedBoxArray(selectedFilter)}
                />
              </View>
              {/*bottom buttons*/}
              <BottomButton
                title1="CLOSE"
                fun1={closeFilter}
                title2="APPLY"
                fun2={applyFilters}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default FilterProductsModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '100%',
    height: '180%',
    backgroundColor: 'white',
    padding: 5,
    bottom: 0,
    position: 'fixed',
    borderRadius: 10,
    marginTop: '210%',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
  },
  filterMainHeading: {
    fontSize: 22,
    marginTop: '3%',
    color: '#00338D',
    fontWeight: '500',
    marginLeft: '4%',
  },
  clearFilterText: {
    fontSize: 15,
    marginTop: '3%',
    color: '#910404',
    fontWeight: '400',
    marginRight: '4%',
  },
  filterRow: {
    flexDirection: 'row',
    width: '100%',
    height: '40%',
  },
  filterRowC1: {
    width: '30%',
    padding: '1%',
    marginTop: '4%',
  },
  filterRowC1Text: {
    fontSize: 17,
    padding: '10%',
    fontWeight: '400',
    color: '#00338D',
    color: '#00338D',
  },
  horizontalLine1: {
    borderBottomWidth: 0.8,
    borderBottomColor: '#d1d1d1',
    marginVertical: 8,
  },
  filterData: {
    width: '70%',
    borderLeftWidth: 0.2,
    borderColor: '#00338D',
  },
  filterDataSection: {
    marginTop: '14%',
    width: 285,
    marginLeft: '10%',
  },
  bottomButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: '7%',
    borderTopWidth: 1,
    borderColor: '#d1d1d1',
    marginTop: '4%',
  },
  bottomBtnText: {
    fontSize: 19,
    color: 'grey',
  },
  bottomApplyBtnText: {
    fontSize: 19,
    color: '#ad0505',
  },
  selectedSlider: {
    backgroundColor: '#00338D',
  },
  unselectedSlider: {
    backgroundColor: '#ddd',
  },
  marker: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#454d55',
    backgroundColor: '#fff',
  },

  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    marginBottom: 8,
    padding: '3%',
  },
  //filter box
  colorBox: {
    width: 30,
    height: 30,
    marginLeft: '10%',
    borderRadius: 50,
  },
  text: {
    marginLeft: 8,
    color: '#00338D',
    fontWeight: '300',
  },
  //filter Name
  filterRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  filterCountText: {
    fontSize: 12,
    color: 'black',
    marginLeft: 10, // Adjust the spacing between the text components
  },

});
