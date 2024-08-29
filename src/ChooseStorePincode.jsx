import { StyleSheet, Text, View,TouchableOpacity,Image, ScrollView,TextInput,Modal,TouchableWithoutFeedback,ActivityIndicator,} from 'react-native'
import React,{useEffect, useState} from 'react'
import { useCartContext } from './Context/WomenContext'
import { useLoginContext } from './Login/LoginCartProvider'
import back from './PlpScreen/images/back.png';
import axios from 'axios';

const ChooseStorePincode = ({navigation}) => {

    const {ip,token,popFromStack,pushToStack,
        currentPage, setCurrentPage,
        currentPageIndex,setCurrentPageIndex,
        currentPageIndexCategory,setCurrentPageIndexCategory,
        currentPageIndexCategory1,setCurrentPageIndexCategory1}=useLoginContext();  

    const [showActivityIndicator, setShowActivityIndicator] = useState(false);

    const [sortModalVisible, setSortModalVisible] = useState(false);
    const {pinCode,setPinCode,setSelectedStoreId,setDataStore,setSearch}=useCartContext();    
    const [fetechedStoreBasedOnPinCode,setFetechedStoreBasedOnPinCode]=useState([]);
    const forNavigate=(page)=>{
        console.log(page+" "+currentPage[currentPage.length-1]);
        if(currentPage && currentPage[currentPage.length-1]!==page){
          pushToStack(page);
          navigation.navigate(page)
        }else{
          popFromStack(navigation);
        }
      }


      const handleSortModalClose = () => {
        // Additional logic to handle sorting or other actions
          setSortModalVisible(false);
      };
      const giveErrorPress = () => {
        setSortModalVisible(true);
      };   
      
     const [pincodeError,setPinCodeError]=useState(); 
     const [pincodeError1,setPinCodeError1]=useState(); 
    //  async function saveStore() {
    //   Alert.alert(JSON.stringify(search));
    //   try {
    //     const response = await axios.get(`http://${ip}:5454/stores/city/${search}`, {
    //       headers: {
    //         'Authorization': `Bearer ${token}`,         
    //       },
    //     });

    //     setDataStore(response.data);
    //     console.log("Response data:", response.data);
    //   } catch (error) {
    //     // Handle errors
    //     console.error('Error fetching data:', error);
    //   }
    // }

     async function searchStoreBasedOnPincode(){
      if(pinCode.length>1 && pinCode.length<6){
       setPinCodeError1(true);
      }
      else if(!pinCode){
          setPinCodeError(true);
       }else{
        try {
          const response = await axios.get(`http://${ip}:5454/stores/pincode/${pinCode}`, {
            headers: {
              'Authorization': `Bearer ${token}`,         
            },
          });
          console.log(JSON.stringify(response.data));
          setDataStore(response.data);
          setFetechedStoreBasedOnPinCode(response.data);
          if(!response.data.length){
            giveErrorPress();
          }
        
        } catch (error) {
          // Handle errors
          console.error('Error fetching data:', error);
        }        
       
      }
    }
      useEffect(()=>{
         if(pincodeError){
          setTimeout(()=>{
            setPinCodeError(false);
          },4000);
         }
         if(pincodeError1){
          setTimeout(()=>{
            setPinCodeError1(false);
          },4000);
         }
  
      },[pincodeError,fetechedStoreBasedOnPinCode,pincodeError1]);
    
    useEffect(()=>{
     if(!pinCode){
      setFetechedStoreBasedOnPinCode([]);
     }
    },[pinCode]);

    function getStoreId(storeId){
    //  Alert.alert(JSON.stringify(storeId));
     setSelectedStoreId(storeId); 
     setShowActivityIndicator(true);
     setTimeout(()=>{
      forNavigate('scheduleStore');
      setShowActivityIndicator(false);
     },2000);
    }
    async function cityBasedOnPincode(){
      try {
        const response = await fetch(`http://www.postalpincode.in/api/pincode/${pinCode}`);
        const data = await response.json(); // Parse JSON response
        console.log(JSON.stringify(data)); // Log the parsed JSON data
        const district = data.PostOffice[0]?.District;
        let updatedSearch = district;
        
        if (district && district.endsWith('Delhi')) {
          const words = district.split(' ');
          if (words.length >= 2) {
            words[words.length - 2] = 'New';
            updatedSearch = words.join(' ');
          }
        }       
        setSearch(updatedSearch); 
      } catch (error) {
        console.log("Got error in AddressDetail.jsx in getState()" + error);
      }
    }
    useEffect(()=>{
      cityBasedOnPincode();
    },[pinCode]);
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
                <Text style={{color:'black'}}>Cart</Text>
              </View>
        </View>
     </TouchableOpacity> 
  </View>   
     <ScrollView>
         <View style={{flexDirection:'row',justifyContent:'space-between',alignContent:'center',alignItems:'center',marginTop:'4%'}}>
             <Text style={{marginLeft:'7%',fontSize:17,color:'black',fontWeight:'500'}}>Choose Your Location </Text>
         </View>
         <Text style={{marginLeft:'6%',margin:'3%',color:'#ba4141',backgroundColor:'rgba(255, 237, 237, 0.5)',fontWeight:'400'}}>Please enter pincode to find nearby stores for standard/{'\n'}express delivery /store pickup</Text>
         <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', alignContent: 'center', position: 'relative' }}>
         <TextInput
          placeholder="Enter a PIN Code"
          value={pinCode}
          keyboardType='numeric'
          maxLength={6}
          onChangeText={(text) => setPinCode(text)}
          style={{ marginLeft: '7%', borderBottomWidth: 0.6, borderColor:pincodeError||pincodeError1?'red':'#00338D', marginTop: '10%', width: '85%', }}
         />
        <TouchableOpacity style={{  position: 'absolute', right: 0, top: '50%', marginTop: '2%', marginRight: '7%' }} onPress={()=>{searchStoreBasedOnPincode()}}>
            <Text style={{color: 'black', fontWeight: '500', fontSize: 16,}}>Apply</Text>
        </TouchableOpacity>

        <Modal animationType="slide" transparent={true} visible={sortModalVisible} onRequestClose={handleSortModalClose}>
          <TouchableWithoutFeedback onPress={handleSortModalClose}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={{ flex: 1, textAlign: 'center', color: 'red', fontWeight: '500', fontSize: 16.5 }}>Error!</Text>
                <Text style={{fontSize:23}}>╳</Text>
               </View>
                  <View style={{ width: '100%', borderBottomWidth: 0.8, borderColor: '#dbd9d9',marginTop:'1%' }}></View>
                  <Text style={{textAlign:'center',fontSize:16,color:'#363434',margin:'10%',fontWeight:'500'}}>No store mapped to the entered {'\n'}           Pincode.     {'\n'}Please enter another Pincode.</Text>

                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>  
       </View>
       {
         fetechedStoreBasedOnPinCode && fetechedStoreBasedOnPinCode.length > 0 && (
        <>
         {fetechedStoreBasedOnPinCode.map((item, index) => (
          <TouchableOpacity key={index} style={{marginTop:'4%',padding:'4%',borderColor:'#00338D',
                          borderWidth:1,width:'90%',alignSelf:'center'}}
                          onPress={()=>{getStoreId(item.id)}}>
            <Text style={{ marginLeft: '2%' }}>{item.name}</Text>
            <Text style={{ marginLeft: '2%' }}>{item.city}</Text>
            <Text style={{ marginLeft: '2%' }}>{item.address}</Text>
         </TouchableOpacity>
          ))}
        </>
        )
       }

       {
          pincodeError && (<>
            <Text style={{textAlign:'center',color:'red',padding:'4%',fontSize:12}}>Please Enter Pincode</Text>
          </>)
        }
       {
          pincodeError1 && (<>
            <Text style={{textAlign:'center',color:'red',padding:'4%',fontSize:12}}>Please Enter Correct Pincode</Text>
          </>)
        }

     </ScrollView>
     {showActivityIndicator && (
          <View style={styles.activityIndicatorContainer}>
            <ActivityIndicator size="large" color="#00338D" />
          </View>
        )}
    </View>
  )
}

export default ChooseStorePincode

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      modalContent: {
        width: '90%',
        height: '23%',
        marginTop:'-52%',
        backgroundColor: 'white',
        padding: 20,
        bottom:0,
        position:'fixed',
        borderRadius: 10,
        backgroundColor:'white',
      },
      horizontalLine1: {
       borderBottomWidth: 0.3,
       borderBottomColor: '#d1d1d1',
       marginVertical: 8,
     },
     activityIndicatorContainer: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(255,255,255,0.7)',
    },
})