import { StyleSheet, Text, View,TouchableOpacity,Image,FlatList,SafeAreaView,ScrollView} from 'react-native'
import React from 'react';
import TopBar from '../PlpScreen/TopBar';
import back from '../PlpScreen/images/back.png';
import frame1 from '../PlpScreen/images/frame1.png';
import frame2 from './Images/frame2.png';

import frame5 from '../Grocery/Images/frame5.png';
import frame6 from '../Grocery/Images/frame6.png';
import frame7 from '../Grocery/Images/frame7.png';
import frame8 from '../Grocery/Images/frame8.png';
import frame9 from '../Grocery/Images/frame9.png';
import frame10 from '../Grocery/Images/frame10.png';
import frame11 from '../Grocery/Images/frame11.png';
import frame12 from '../Grocery/Images/frame12.png';
import frame13 from '../Grocery/Images/frame13.png';
import frame14 from '../Grocery/Images/frame14.png';
import frame15 from '../Grocery/Images/frame15.png';
import frame16 from '../Grocery/Images/frame16.png';
import frame17 from '../Grocery/Images/frame17.png';
import frame18 from '../Grocery/Images/frame18.png';

import { useLoginContext } from '../Login/LoginCartProvider';


const GroceryHome = ({navigation}) => {

  const {ip,token,popFromStack,pushToStack,
    currentPage, setCurrentPage,
    currentPageIndex,setCurrentPageIndex,
    currentPageIndexCategory,setCurrentPageIndexCategory,
    currentPageIndexCategory1,setCurrentPageIndexCategory1}=useLoginContext();  


    const forNavigate=(page)=>{
      if(page==='mainHome'){
       setCurrentPage('mainHome');
       navigation.navigate('mainHome');
      }else{
        console.log(page+" "+currentPage[currentPage.length-1]);
        if(currentPage && currentPage[currentPage.length-1]!==page){
          pushToStack(page);
          navigation.navigate(page)
        }else{
          popFromStack(navigation);
        }  
      }
    }
    
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
  <View style={{flex:1,backgroundColor:'white'}}>
    <TopBar navigation={navigation}/> 
    <View style={styles.backBtn}>
        <TouchableOpacity onPress={() => popFromStack(navigation)}>
          <View style={styles.backBtn}>
               <Image source={back}/>
              <Text style={{ color: 'black',fontSize:13}}>Grocery</Text>
          </View>          
        </TouchableOpacity>
       </View>
    

   <ScrollView>
    <View style={{padding:10,}}>
         <Image source={frame1} style={{width:385,}}/>
         <Text style={{color:'#00338D',fontSize:14,marginTop:'3%'}}>DEALS ON TOP BRANDS</Text>
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
               onPress={()=>forNavigate('dairyProduct')}
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
      </View>

   </>
  )
}

export default GroceryHome

const styles = StyleSheet.create({
  backBtn:{
    marginLeft:'3%',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
  },
})