import React from 'react';
import {
  StyleSheet,
  Image,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import brand1 from '../PlpScreen/images/brand1.png';
import brand2 from '../PlpScreen/images/brand2.png';
import brand3 from '../PlpScreen/images/brand3.png';
import brand4 from '../PlpScreen/images/brand4.png';
import brand5 from '../PlpScreen/images/brand5.png';
import brand6 from '../PlpScreen/images/brand6.png';

const DealsOnBrands = () => {
  const data1 = [
    {id: '1', source: brand1},
    {id: '2', source: brand2},
    {id: '3', source: brand3},
    {id: '4', source: brand4},
    {id: '5', source: brand5},
    {id: '6', source: brand6},
    // Add more images as needed
  ];

  return (
    <View>
      <View style={styles.dealsContainer}>
        <Text style={styles.dealsTitle}>DEALS ON TOP BRANDS</Text>
        <View style={styles.flatListContainer}>
          <SafeAreaView>
            <FlatList
              nestedScrollEnabled={true}
              data={data1}
              horizontal={true}
              showsHorizontalScrollIndicator={false} // Optional: hide horizontal scrollbar
              keyExtractor={item => item.id}
              renderItem={({item}) => (
                <TouchableOpacity style={styles.touchableItem}>
                  <Image source={item.source} style={styles.brandImage} />
                </TouchableOpacity>
              )}
            />
          </SafeAreaView>
        </View>
      </View>
    </View>
  );
};

export default DealsOnBrands;

const styles = StyleSheet.create({
  dealsContainer: {
    backgroundColor: '#f7f8fc',
    marginTop: '4%',
    marginLeft: '4%',
    marginBottom: '3%',
  },
  dealsTitle: {
    color: '#00338D',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: '3%',
  },
  flatListContainer: {
    flexDirection: 'row',
    paddingRight: '3%',
  },
  touchableItem: {
    marginStart: 10,
  },
  brandImage: {
    width: 100,
    height: 130,
    borderRadius: 12,
    paddingRight: '2%',
  },
});
