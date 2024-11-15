import React, { useState } from 'react';
import { View } from 'react-native';
import { SearchBar } from 'react-native-elements';

const Elastic = () => {
  const [search, setSearch] = useState('');

  const updateSearch = (search) => {
    setSearch(search);
  };

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: 'white' }}>
    <SearchBar
      placeholder="Search brand or product name..."
      onChangeText={updateSearch}
      value={search}
      lightTheme
      containerStyle={{ backgroundColor: 'white' }}
      inputContainerStyle={{ backgroundColor: '#f0f0f0' }} // Optional: light gray for input area
      searchIcon={{ size: 24 }} // Adjust icon size if needed
      clearIcon={{ size: 24 }} // Ensure the clear icon is visible
    />
  </View>
  );
};

export default Elastic;
