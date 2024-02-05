import { StyleSheet, Text, View,TouchableOpacity,Image,RadioButton } from 'react-native'
import React from 'react';
import { useCartContext } from '../Context/WomenContext';
import back from '../PlpScreen/images/back.png';
import savedAddress from '../PlpScreen/images/savedAddress.png';
import TopBar2 from '../TopBar1';


const SavedAddress = ({navigation}) => {
  const {allSavedAddress,SubtotalAmount,totalAmount,}=useCartContext();  
  return (
    <View style={{flex:1,backgroundColor:'white'}}>
             <TouchableOpacity
               onPress={()=>navigation.navigate('Home')}>
                <Image
                  source={{ uri: 'https://shorturl.at/ckGU2' }}
                  style={{ width: 100, height: 100,marginLeft:'4%' }}                />
             </TouchableOpacity>

      <View >
         <View style={{ flexDirection: 'row', alignItems: 'center', alignItems: 'center',marginTop:'2%',marginBottom:'3%' }}>
         <View>
          <TouchableOpacity onPress={() => { navigation.navigate('mainHome') }}>
            <Image source={back} style={{ marginLeft: 12 }} />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={{ paddingLeft: 10, color: 'black', textAlign: 'center' }}>
            Saved Places
          </Text>
        </View>
      </View>
      <View>
        {
            allSavedAddress && allSavedAddress.length<=0?
            <View style={{marginTop:'24%',padding:'31%',marginLeft:'3%'}}>
                <Image source={savedAddress} style={{width:'90%',height:'75%'}}/>
            </View>
            :
            <View style={{padding:'1%',marginLeft:'4%',marginTop:'7%'}}>
        {
        allSavedAddress.map((address, addressIndex) => (
          <View key={addressIndex} style={styles.addressContainer}>
            <View style={{ flexDirection: 'row', alignItems: 'center',borderColor:"#e6e3e3" }}>
              {/* <Text>{selectedAddress}</Text> */}

              <View style={{marginLeft:'1%'}}>
                <Text style={{ color: 'black', fontWeight: '500' }}>
                  {address.firstName} {address.lastName.toUpperCase()}
                </Text>
                <Text style={{ color: 'black', fontWeight: '300', fontSize: 13.6 }}>{address.streetAddress}</Text>
                <Text style={{ color: 'black', fontWeight: '300', fontSize: 13.6 }}>
                  {address.city}, {address.state}, {address.zipCode}
                </Text>
                <Text style={{ color: 'black', fontWeight: '300', fontSize: 13.6, paddingTop: '0.3%', marginBottom: '6%' }}>
                  {address.mobile}
                </Text>
              </View>  
            </View>
          </View>
        ))}
            </View>    
        }
      </View>
     </View>
    </View>
  )
}

export default SavedAddress

const styles = StyleSheet.create({})