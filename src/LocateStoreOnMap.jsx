import React, { useEffect } from 'react';
import { Alert,StyleSheet, Text, View, TouchableOpacity, Image, Dimensions,FlatList,SafeAreaView } from 'react-native';
import { useCartContext } from './Context/WomenContext';
import { useLoginContext } from './Login/LoginCartProvider';
import back from './PlpScreen/images/back.png';
import WebView from 'react-native-webview';
import axios from 'axios';

const LocateStoreOnMap = ({ navigation }) => {
  const { search,dataStore,setDataStore,selectedStoreId,setSelectedStoreId,disableAction,setDisableAction} = useCartContext();


  const screen_height = Dimensions.get('window').height;
  const screen_width = Dimensions.get('window').width;
  const {ip,token,popFromStack,pushToStack,
    currentPage,}=useLoginContext();  


  const forNavigate=(page)=>{
    console.log(page+" "+currentPage[currentPage.length-1]);
    if(currentPage && currentPage[currentPage.length-1]!==page){
      pushToStack(page);
      navigation.navigate(page)
    }else{
      popFromStack(navigation);
    }
  } 
  async function saveStore() {
    // Alert.alert(JSON.stringify(search));
    try {
      const response = await axios.get(`http://${ip}:5454/stores/city/${search}`, {
        headers: {
          'Authorization': `Bearer ${token}`,         
        },
      });

      setDataStore(response.data);
      console.log("Response data:", response.data);
    } catch (error) {
      // Handle errors
      console.error('Error fetching data:', error);
    }
  }  
useEffect(()=>{
 saveStore();
},[]);
 
  async function getStoreScheduleData(storeId){
    try {
        const response = await axios.get(`http://${ip}:5454/store-pickups/store/${storeId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,         
          },
        });
      } catch (error) {
        // Handle errors
        console.error('Error fetching data:', error);
      }
  }

  function scheduleScreen(storeId) {
    // Alert.alert(JSON.stringify(storeId));
    setSelectedStoreId(storeId); 
    if(!disableAction){
      forNavigate('scheduleStore');
    }
  }
  
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ padding: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <TouchableOpacity onPress={() => forNavigate('mainHome')}>
          <Image source={{ uri: 'https://shorturl.at/ckGU2' }} style={{ width: 100, height: 100 }} />
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => popFromStack(navigation)}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View>
              <Image source={back} style={{ marginLeft: 12 }} />
            </View>
            <View style={{ marginLeft: '10%' }}>
              <Text style={{ color: 'black' }}>Store Locator</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center', marginTop: '4%' }}>
        <Text style={{ marginLeft: '7%', fontSize: 17, color: 'black', fontWeight: '500', fontSize: 16 }}>Choose Your Location </Text>
        <TouchableOpacity style={{ width: 120, height: 30, marginRight: '1%' }} onPress={() => { forNavigate('chooseStoreUsingPincode') }}>
          <Text style={{ fontWeight: '600', marginLeft: '17%', marginTop: '5%' }}>{search.toUpperCase()}</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1 }}>
        <View style={{ height:'50%', width: 400 ,margin:'2%'}}>
          <WebView
            scalesPageToFit={true}
            bounces={false}
            javaScriptEnabled={true}
            automaticallyAdjustContentInsets={false}
            source={{ html: `<iframe width="100%" height="800" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=${search}+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"><a href="https://www.gps.ie/">gps systems</a></iframe>` }}
          />
        </View>
        
        <Text style={{marginLeft:'4%',color:'grey',fontWeight:'500',fontSize:15}}> {dataStore.length} stores in {search}</Text>
        <View style={{ height: 0.6, backgroundColor: '#00338D', marginTop: 10, marginBottom: 10 }} />
        <SafeAreaView>
         <FlatList
           nestedScrollEnabled={true}
           data={dataStore}
           horizontal={true}
           showsHorizontalScrollIndicator={false}
           keyExtractor={(item) => item.id.toString()} // Ensure id is converted to string
           renderItem={({ item }) => (
           
           <TouchableOpacity style={{ width: 380, height: 240, margin: 5, borderRadius: 12, borderWidth: 0.6, borderColor: 'grey' }}
      
           onPress={() => scheduleScreen(item.id)}>
            {/* <Text style={{ alignSelf: 'center', padding: '4%', color: '#00338D', textDecorationLine: 'underline', fontWeight: '500' }}>
               {item.store.name.includes("KPMG") ? 
            <Text>
               {item.store.name.split(" KPMG ")[0]} - {item.store.city}
               {"\n"}
            <Text style={{ color: 'grey' ,padding:12}}>KPMG {item.store.name.split(" KPMG ")[1]}</Text>
          </Text>
          :
          `${item.store.name} - ${item.store.city}`
          }
           </Text> */}
            <Text style={{color:'#00338D',textAlign:'center',padding:'3%',fontWeight:'500',textDecorationLine:'underline'}}>{item.name}-{item.city}</Text>
            <Text style={{padding:'6%',fontWeight:'500'}}>{item.address}</Text>
            <Text style={{color:'#00338D',textAlign:'center',fontWeight:'300'}}>Mon-fri :9:00-23:00 | Sat-Sun : 9:00-23:00</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '40%', alignSelf: 'center' }}>
             <TouchableOpacity style={{ borderColor: '#ba4141', borderWidth: 1, width: '40%', marginTop: '14%', borderRadius: 12, marginRight: '5%' }}>
              <Text style={{ color: '#ba4141', padding: 4, textAlign: 'center' }}>Call</Text>
             </TouchableOpacity>
            <TouchableOpacity style={{ borderColor: '#ba4141', borderWidth: 1, marginTop: '14%', padding: '4%', borderRadius: 12,marginLeft:'14%'}}>
              <Text style={{ color: '#ba4141', textAlign: 'center' }}>Get Directions</Text>
            </TouchableOpacity>
           </View>
         </TouchableOpacity>

          
          )}
  />
</SafeAreaView>

      </View>
    </View>
  );
}

export default LocateStoreOnMap;

const styles = StyleSheet.create({});
