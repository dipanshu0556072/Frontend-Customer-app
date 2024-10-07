import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const ProductDetails = ({product,productCategory}) => {
  const productDetails = {
    clothes: [
      {key: 'country', heading: 'Country of Origin'},
      {key: 'wearType', heading: 'Wear Type'},
      {key: 'fabric', heading: 'Fabric'},
      {key: 'sleeves', heading: 'Sleeves'},
      {key: 'fit', heading: 'Fit'},
      {key: 'materialCare', heading: 'Material & Care'},
    ],
    grocery: [
      {key: 'ingredient', heading: 'Ingredient'},
      {key: 'packaging', heading: 'Packaging'},
      {key: 'preservatives', heading: 'Preservatives'},
      {key: 'consume_within', heading: 'Consume Within'},
    ],
    electronics: [
      {key: 'chipType', heading: 'Chip Type'},
      {key: 'batteryLife', heading: 'Battery Life'},
      // other electronics-specific fields
    ],
  };
  const ProductWithDetails = ({heading, title}) => {
    return (
      <>
        <View style={styles.wrapper}>
          <View style={styles.headingContainer}>
            <Text style={styles.headingText}>{heading}</Text>
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>{title}</Text>
          </View>
        </View>
      </>
    );
  };
  //target category details to show
  const targetCategoryProduct=productDetails[productCategory];
  return (
    <View>
       {
        targetCategoryProduct.map(detail=>
            product[detail.key]!=null && (
                <ProductWithDetails  key={detail.key} heading={detail.heading} title={product[detail.key]}/>
            )
        )
       }
    </View>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
     //productDetailValues
  wrapper: {
    flexDirection: 'row',
  },
  headingContainer: {
    width: '50%',
    height: 30,
  },
  titleContainer: {
    width: '50%',
    height: 30,
  },
  headingText: {
    color: 'black',
    fontSize: 12.4,
  },
  titleText: {
    fontSize: 12.4,
  },
});
