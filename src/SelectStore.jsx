import { Alert,FlatList,SafeAreaView,StyleSheet, Text, View,TouchableOpacity,Image, ScrollView,TextInput,ActivityIndicator} from 'react-native'
import React,{useState,useEffect} from 'react'
import { useCartContext } from './Context/WomenContext'
import { useLoginContext } from './Login/LoginCartProvider'
import back from './PlpScreen/images/back.png';
import searchImage from './PlpScreen/images/search.png';
import axios from 'axios';

const SelectStore = ({navigation}) => {

    const {ip,token,popFromStack,pushToStack,
        currentPage, setCurrentPage,
        currentPageIndex,setCurrentPageIndex,
        currentPageIndexCategory,setCurrentPageIndexCategory,
        currentPageIndexCategory1,setCurrentPageIndexCategory1}=useLoginContext();  
    
    const {searchedCiy,setSearchedCity,search, setSearch,dataStore,setDataStore,
      disableAction,setDisableAction,deliveryOption
    }=useCartContext();
    const [showActivityIndicator, setShowActivityIndicator] = useState(false);    
    const [filteredDataSource, setFilteredDataSource] = useState([]);

  //   useEffect(() => {
  //     getAllCities();
  // }, [search]);
  // let dataSource;
  // async function getAllCities() {
  //     try {
  //         const countryName = {
  //             "country": "india"
  //         };
  //         const response = await axios.post('https://countriesnow.space/api/v0.1/countries/cities', countryName);
  //         console.log("Response:", response.data);
  //         setMasterDataSource(response.data);
  //         setFilteredDataSource(response.data);
  //         dataSource=response.data;
  //     } catch (error) {
  //         console.error("Error:", error);
  //     }
  // }
//   const searchFilterFunction = (text) => {
//     const newData = masterDataSource.data.filter((city) => {
//         const cityData = city.toUpperCase();
//         const searchText = text.toUpperCase();
//         return cityData.indexOf(searchText) > -1;
//     });
//     setFilteredDataSource(newData.map((city) => ({ title: city })));
//     setSearch(text);
// };

useEffect(() => {
  if(deliveryOption=='2'){
    setDisableAction(false);
  }
}, []);

// async function getAllCities() {
//     try {
//         const countryName = {
//             "country": "india"
//         };
//         const response = await axios.post('https://countriesnow.space/api/v0.1/countries/cities', countryName);
//         console.log("Response:", response.data);
//         setMasterDataSource(response.data);
//         setFilteredDataSource(response.data);
      
//     } catch (error) {
//         console.error("Error:", error);
//     }
// }

  
    const [masterDataSource, setMasterDataSource] = useState([]);
        const forNavigate=(page)=>{
            console.log(page+" "+currentPage[currentPage.length-1]);
            if(currentPage && currentPage[currentPage.length-1]!==page){
              pushToStack(page);
              navigation.navigate(page)
            }else{
              popFromStack(navigation);
            }
          } 
          useEffect(() => {
            // fetch('https://jsonplaceholder.typicode.com/posts')
            //   .then((response) => response.json())
            //   .then((responseJson) => {
            //     setFilteredDataSource(responseJson);
            //     setMasterDataSource(responseJson);
            //   })
            //   .catch((error) => {
            //     console.error(error);
            //   });
            setFilteredDataSource(
              [
                {
                    "userId": 1,
                    "id": 1,
                    "title": "Gurgaon",
                    "body": "Gurgaon"
                },
                {
                    "userId": 1,
                    "id": 2,
                    "title": "New Delhi",
                    "body": "New Delhi"
                },
                {
                    "userId": 1,
                    "id": 3,
                    "title": "Mumbai",
                    "body": "Mumbai"
                },
                {
                    "userId": 1,
                    "id": 4,
                    "title": "Bangalore",
                    "body": "Bangalore"
                },
                {
                    "userId": 1,
                    "id": 5,
                    "title": "Hyderabad",
                    "body": "Hyderabad"
                },
                {
                    "userId": 1,
                    "id": 6,
                    "title": "Ahmedabad",
                    "body": "Ahmedabad"
                },
                {
                    "userId": 1,
                    "id": 7,
                    "title": "Chennai",
                    "body": "Chennai"
                },
                {
                    "userId": 1,
                    "id": 8,
                    "title": "Kolkata",
                    "body": "Kolkata"
                },
                {
                    "userId": 1,
                    "id": 9,
                    "title": "Surat",
                    "body": "Surat"
                },
                {
                    "userId": 1,
                    "id": 10,
                    "title": "Pune",
                    "body": "Pune"
                },]
            );
            setMasterDataSource([
              {
                  "userId": 1,
                  "id": 1,
                  "title": "Gurgaon",
                  "body": "Gurgaon"
              },
              {
                  "userId": 1,
                  "id": 2,
                  "title": "New Delhi",
                  "body": "New Delhi"
              },
              {
                  "userId": 1,
                  "id": 3,
                  "title": "Mumbai",
                  "body": "Mumbai"
              },
              {
                  "userId": 1,
                  "id": 4,
                  "title": "Bangalore",
                  "body": "Bangalore"
              },
              {
                  "userId": 1,
                  "id": 5,
                  "title": "Hyderabad",
                  "body": "Hyderabad"
              },
              {
                  "userId": 1,
                  "id": 6,
                  "title": "Ahmedabad",
                  "body": "Ahmedabad"
              },
              {
                  "userId": 1,
                  "id": 7,
                  "title": "Chennai",
                  "body": "Chennai"
              },
              {
                  "userId": 1,
                  "id": 8,
                  "title": "Kolkata",
                  "body": "Kolkata"
              },
              {
                  "userId": 1,
                  "id": 9,
                  "title": "Surat",
                  "body": "Surat"
              },
              {
                  "userId": 1,
                  "id": 10,
                  "title": "Pune",
                  "body": "Pune"
              },]
            );
          }, []);

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
const data=[
    {
      "userId": 1,
      "id": 1,
      "title": "Gurgaon",
      "body": "Gurgaon"
  },
  {
      "userId": 1,
      "id": 2,
      "title": "New Delhi",
      "body": "New Delhi"
  },
  {
      "userId": 1,
      "id": 3,
      "title": "Mumbai",
      "body": "Mumbai"
  },
  {
      "userId": 1,
      "id": 4,
      "title": "Bangalore",
      "body": "Bangalore"
  },
  {
      "userId": 1,
      "id": 5,
      "title": "Hyderabad",
      "body": "Hyderabad"
  },
  {
      "userId": 1,
      "id": 6,
      "title": "Ahmedabad",
      "body": "Ahmedabad"
  },
  {
      "userId": 1,
      "id": 7,
      "title": "Chennai",
      "body": "Chennai"
  },
  {
      "userId": 1,
      "id": 8,
      "title": "Kolkata",
      "body": "Kolkata"
  },
  {
      "userId": 1,
      "id": 9,
      "title": "Surat",
      "body": "Surat"
  },
  {
      "userId": 1,
      "id": 10,
      "title": "Pune",
      "body": "Pune"
  },
]
          const searchFilterFunction = (text) => {
            // Check if searched text is not blank
            if (text) {
              // Inserted text is not blank
              // Filter the masterDataSource
              // Update FilteredDataSource
              const newData =data.filter(
                function (item) {
                  const itemData = item.title
                    ? item.title.toUpperCase()
                    : ''.toUpperCase();
                  const textData = text.toUpperCase();
                  return itemData.indexOf(textData) > -1;
              });
              setFilteredDataSource(newData);
              setSearch(text);
            } else {
              // Inserted text is blank
              // Update FilteredDataSource with masterDataSource
              setFilteredDataSource(masterDataSource);
              setSearch(text);
            }
          };
        //   const searchFilterFunction = (text) => {
        //     if (text) {
        //         const newData = data.data.filter((city) => {
        //             const cityData = city.toUpperCase();
        //             const searchText = text.toUpperCase();
        //             return cityData.indexOf(searchText) > -1;
        //         });

        //         setFilteredDataSource(newData.map((city) => ({ title: city })));
        //         setSearch(text);
        //     } else {
        //         setFilteredDataSource(masterDataSource);
        //         setSearch(text);
        //     }
        // };
      //   const searchFilterFunction = (text) => {
      //     if (text) {
      //         const newData = masterDataSource.data.filter((city) => {
      //             const cityData = city.toUpperCase();
      //             const searchText = text.toUpperCase();
      //             return cityData.indexOf(searchText) > -1;
      //         });
      //         setFilteredDataSource(newData.map((city) => ({ title: city })));
      //         setSearch(text);
      //     } else {
      //         // If text is empty, show all cities
      //         setFilteredDataSource(masterDataSource.data.map((city) => ({ title: city })));
      //         setSearch(text);
      //     }
      // };

    
      
        
          const ItemView = ({item}) => {
            return (
              // Flat List Item
              <Text
                style={styles.itemStyle}
                onPress={() => getItem(item)}>
                {item.title}
              </Text>
            );
          };
        
          const ItemSeparatorView = () => {
            return (
              // Flat List Item Separator
              <View
                style={{
                  height: 0.5,
                  width: '100%',
                  backgroundColor: '#C8C8C8',
                }}
              />
            );
          };
        
          //store Search City Store 


          const getItem = async (item) => {
            // Function for click on an item
            setSearchedCity(item.title);
            setSearch(item.title); // Update TextInput value with selected city
            setShowActivityIndicator(true);
            //await saveStore();

            {
            setTimeout(()=>{
              forNavigate('locateStoreOnMap');
              setShowActivityIndicator(false);
            },2000);
            }
            // alert('Id : ' + item.id + ' ' + JSON.stringify(searchedCiy)); // Consider removing this alert or updating it for debugging purposes
        };
        
console.log(JSON.stringify(searchedCiy));

   return (
    <View style={{flex:1,backgroundColor:'white'}}>
       <View style={{ padding: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
         <TouchableOpacity onPress={() => forNavigate('mainHome')}>
           <Image source={{ uri: 'https://shorturl.at/ckGU2' }} style={{ width: 100, height: 100 }} />
         </TouchableOpacity>
       </View>   
       <View style={{flexDirection:'row',alignItems:'center',}}> 
         <TouchableOpacity     
            onPress={() => popFromStack(navigation)}
           >              
           <View style={{flexDirection:'row',alignItems:'center'}}>
              <View>
                  <Image source={back}  
                    style={{marginLeft:12}}/>
              </View>
              <View style={{marginLeft:'10%'}}>
                <Text style={{color:'black'}}>Store Locator</Text>
              </View>
        </View>
     </TouchableOpacity> 
    </View>   
     <ScrollView>
         <View style={{flexDirection:'row',justifyContent:'space-between',alignContent:'center',alignItems:'center',marginTop:'4%'}}>
             <Text style={{marginLeft:'7%',fontSize:17,color:'black',fontWeight:'500'}}>Choose Your Location </Text>
         </View>
         <Text style={{marginLeft:'6%',margin:'3%',color:'#ba4141',backgroundColor:'rgba(255, 237, 237, 0.5)',fontWeight:'400'}}>Please enter city to find nearby stores for standard/{'\n'}for express delivery /store pickup</Text>
         <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    <Image source={searchImage} style={{ width: 20, height: 20,  marginRight: '-1%',marginLeft:'4%' }} />
    <View style={{ position: 'relative', width: '85%' }}>
        <TextInput
            placeholder="Search your city"
            value={search}
            onChangeText={(text) => searchFilterFunction(text)}
            style={{ borderBottomWidth: 0.6, borderColor: '#00338D', width: '100%' }}
        />
    </View>
</View>


         
         <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <FlatList
          data={filteredDataSource}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView}
        />
      </View>
    </SafeAreaView>
    {showActivityIndicator && (
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator size="large" color="#00338D" />
        </View>
      )}
     </ScrollView>
   </View>      
  )
}

export default SelectStore

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
      },
      itemStyle: {
        padding: '2%',
        marginLeft:'5%',
        color:'#00338D'
      },
      textInputStyle: {
        height: 40,
        borderWidth: 1,
        paddingLeft: 20,
        margin: 5,
        borderColor: 'black',
        backgroundColor: '#FFFFFF',
      },
      activityIndicatorContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.7)', // Semi-transparent background
      },
})