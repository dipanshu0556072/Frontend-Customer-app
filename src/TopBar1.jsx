import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import search from './PlpScreen/images/search.png';
import bag from './PlpScreen/images/bag.png';
import heart from './PlpScreen/images/heart.png';
//#2
export default function TopBar2({navigation})
{
    return (
        <>
            {/* Top-Bar Start */}
            <View style={{flex:1,backgroundColor:'white'}}>
            <View style={{padding:12,flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
             <TouchableOpacity
               onPress={()=>navigation.navigate('Home')}>
                <Image
                  source={{ uri: 'https://shorturl.at/ckGU2' }}
                  style={{ width: 100, height: 100 }}                />
             </TouchableOpacity>
             </View>
            </View>
        </>
    );
}