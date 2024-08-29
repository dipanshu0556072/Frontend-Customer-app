import React, { useState } from 'react';
import { View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

function MyDropDown() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Orange', value: 'orange' },
    // Add more items as needed
  ]);


  return (
    <View>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        placeholder="Select an item"
        containerStyle={{ width: 300 }} // Adjust the width if needed
        style={{ backgroundColor: '#fafafa',minHeight: 30}}
        textStyle={{ color: '#00338D' }}
        dropDownContainerStyle={{ maxHeight: 200 }} // Adjust the maxHeight as needed
        onChangeItem={(item) => setValue(item.value)}
      />
    </View>
  );
}

export default MyDropDown;
