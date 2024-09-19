import React from 'react';
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import scrollarrow from '../PlpScreen/images/scrollarrow.png';
import bestSell1 from '../PlpScreen/images/bestSell1.png';
import bestSell2 from '../PlpScreen/images/bestSell2.png';
import bestSell3 from '../PlpScreen/images/bestSell3.png';
import bestSell4 from '../PlpScreen/images/bestSell4.png';
import bestSell5 from '../PlpScreen/images/bestSell5.png';
import bestSell6 from '../PlpScreen/images/bestSell6.png';

const BestSeller = () => {
  const data = [
    { id: '1', source: bestSell1 },
    { id: '2', source: bestSell2 },
    { id: '3', source: bestSell3 },
    { id: '4', source: bestSell4 },
    { id: '5', source: bestSell5 },
    { id: '6', source: bestSell6 },
    // Add more images as needed
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>BEST SELLERS</Text>
        <View style={styles.scrollContainer}>
          <View style={styles.scrollArrowContainer}>
            <Image source={scrollarrow} style={styles.scrollArrow} />
          </View>
          <SafeAreaView style={styles.flatListContainer}>
            <FlatList
              nestedScrollEnabled={true}
              data={data}
              horizontal={true}
              showsHorizontalScrollIndicator={false} // Optional: hide horizontal scrollbar
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('mainPDP', {
                      category: 'Men Formal',
                      id: item.id,
                    })
                  }
                  style={styles.itemContainer}
                >
                  <Image
                    source={item.source}
                    style={styles.itemImage}
                  />
                </TouchableOpacity>
              )}
            />
          </SafeAreaView>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f7f8fc',
    marginTop: '4%',
  },
  header: {
    paddingTop: 30,
    padding: 10,
  },
  headerText: {
    color: '#00338D',
    fontSize: 14,
    fontWeight: '500',
  },
  scrollContainer: {
    flexDirection: 'row',
  },
  scrollArrowContainer: {
    justifyContent: 'center',
  },
  scrollArrow: {
    // Add specific styles for the scroll arrow if needed
  },
  flatListContainer: {
    flex: 1,
  },
  itemContainer: {
    marginStart: 10,
    padding: 8,
  },
  itemImage: {
    width: 120,
    height: 150,
    borderRadius: 12,
  },
});

export default BestSeller;
