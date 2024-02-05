import { StyleSheet, Text, View,TouchableOpacity,Image,FlatList,SafeAreaView,ScrollView} from 'react-native'
import React from 'react';
import TopBar from '../PlpScreen/TopBar';
import back from '../PlpScreen/images/back.png';
import frame1 from '../PlpScreen/images/frame1.png';
import frame2 from '../PlpScreen/images/frame2.png';

import frame5 from '../Groceries/Images/frame5.png';
import frame6 from '../Groceries/Images/frame6.png';
import frame7 from '../Groceries/Images/frame7.png';
import frame8 from '../Groceries/Images/frame8.png';
import frame9 from '../Groceries/Images/frame9.png';
import frame10 from '../Groceries/Images/frame10.png';
import frame11 from '../Groceries/Images/frame11.png';
import frame12 from '../Groceries/Images/frame12.png';
import frame13 from '../Groceries/Images/frame13.png';
import frame14 from '../Groceries/Images/frame14.png';
import frame15 from '../Groceries/Images/frame15.png';
import frame16 from '../Groceries/Images/frame16.png';
import frame17 from '../Groceries/Images/frame17.png';
import frame18 from '../Groceries/Images/frame18.png';




const GroceryHome = ({navigation}) => {

const data1 = [
    { id: '1', source: frame6,heading:'Veggies'},
    { id: '2', source: frame7,heading:'Fresh Fruits'},
    { id: '3', source: frame8,heading:'Food-Grains'},
    // Add more images as needed
  ];
  const data2 = [
    { id: '1', source: frame9,heading:'Beverages'},
    { id: '2', source: frame10,heading:'Daily Snacks'},
    { id: '3', source: frame11,heading:'Bakery'},
    // Add more images as needed
  ];
  const data3 = [
    { id: '1', source: frame12,heading:'Cleaning'},
    { id: '2', source: frame13,heading:'Dairy'},
   
    // Add more images as needed
  ];
  const data4 = [
    { id: '1', source: frame16,},
    { id: '2', source: frame17,},
    { id: '3', source: frame18,},
    // Add more images as needed
  ];


  return (
   <>
    <TopBar navigation={navigation}/> 
     <View style={{flexDirection:'row',alignItems:'center',alignItems:'center'}}>
            <View>
               <TouchableOpacity
                onPress={()=>{navigation.navigate('Home')}}>
                 <Image source={back}  
                   style={{marginLeft:12}}/>
               </TouchableOpacity>
            </View>
            <View>
              <Text style={{paddingLeft:10,color:'black',textAlign:'center'}}>Grocery</Text>              
            </View>
    </View>
    

   <ScrollView>
    <View style={{paddingTop:30,padding:10,}}>
         <Text style={{color:'#00338D',fontSize:14}}>DEALS ON TOP BRANDS</Text>
       <View style={{flexDirection:'row'}}> 
         <View>
           <FlatList
            nestedScrollEnabled={true}
            data={data1}
            horizontal={true}
            showsHorizontalScrollIndicator={false} // Optional: hide horizontal scrollbar
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
            <View style={{padding:8}}>  
             <Image source={item.source} style={{}} />
             <Text style={{marginLeft:'10%',color:'#00338D'}}>{item.heading}</Text>
            </View>
           )}
          />   
          </View>
        </View>   
      </View>

     <View style={{paddingTop:10,padding:10,}}>
       <View style={{flexDirection:'row'}}> 
         <SafeAreaView>
           <FlatList
            data={data2}
            horizontal={true}
            nestedScrollEnabled={true}
            showsHorizontalScrollIndicator={false} // Optional: hide horizontal scrollbar
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
            <View style={{padding:8}}>  
             <Image source={item.source} style={{}} />
             <Text style={{marginLeft:'10%',color:'#00338D'}}>{item.heading}</Text>
            </View>
           )}
          />   
          </SafeAreaView>
        </View>   
      </View> 

      <View style={{paddingTop:10,padding:10,}}>
       <View style={{flexDirection:'row'}}> 
         <SafeAreaView>
           <FlatList
            data={data3}
            horizontal={true}
            nestedScrollEnabled={true}
            showsHorizontalScrollIndicator={false} // Optional: hide horizontal scrollbar
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
            <View style={{padding:8}}>  
             <TouchableOpacity
               onPress={()=>navigation.navigate('DairyProduct')}
               >
               <Image source={item.source} style={{}} />
             </TouchableOpacity> 
            <Text style={{marginLeft:'10%',color:'#00338D'}}>{item.heading}</Text>
            </View>
           )}
          />   
          </SafeAreaView>
        </View>   
      </View> 

       <View>
         <Image source={frame15} style={{width:'100%'}}/>
       </View>

       <View style={{paddingTop:30,padding:10,}}>
        <Text style={{color:'#00338D',fontSize:14}}>TOP OFFERS</Text>      
         <View style={{flexDirection:'row'}}> 
         <SafeAreaView>
           <FlatList
            data={data4}
            horizontal={true}
            nestedScrollEnabled={true}
            showsHorizontalScrollIndicator={false} // Optional: hide horizontal scrollbar
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
            <View style={{padding:8}}>  
             <Image source={item.source} style={{}} />
             <Text style={{marginLeft:'10%',color:'#00338D'}}>{item.heading}</Text>
            </View>
           )}
          />   
          </SafeAreaView>

        </View>   
      </View>
      </ScrollView>

   </>
  )
}

export default GroceryHome

const styles = StyleSheet.create({})