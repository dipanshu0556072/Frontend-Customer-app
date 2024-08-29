import { StyleSheet, Text, View,TouchableOpacity,Image, ScrollView,TextInput,Modal,TouchableWithoutFeedback,ActivityIndicator,} from 'react-native'
import React,{useEffect, useState} from 'react'
import { useCartContext } from '../Context/WomenContext'
import { useLoginContext } from '../Login/LoginCartProvider'
import back from '../PlpScreen/images/back.png';
import axios from 'axios';
import { useGroceryContext } from './GroceryContext';
import kpmg from '../PlpScreen/images/kpmg3.png'

const SubscribedItem = ({navigation}) => {
    const {ip,token,popFromStack,pushToStack,
        currentPage, setCurrentPage,
        currentPageIndex,setCurrentPageIndex,
        currentPageIndexCategory,setCurrentPageIndexCategory,
        currentPageIndexCategory1,setCurrentPageIndexCategory1,loginUserId}=useLoginContext();  
    
        
    const { search, setSearch,dataStore,selectedStoreId,setSelectedStoreId,
            selectedStoreAvailableSlots,setSelectedStoreAvailableSlots,
            selectedStorePickupDay,setSelectedStorePickupDay,
            selectedStorePickupTime,setSelectedStorePickupTime,filteredData, 
            setFilteredData,scheduleSubscriptionOption,setScheduleSubscriptionOption} = useCartContext();
    const [isLoading, setIsLoading] = useState(false); 

    const{currentSelectedSubscribedProduct,setCurrentSelectedSubscribedProduct}=useGroceryContext();

      const forNavigate=(page)=>{
        console.log(page+" "+currentPage[currentPage.length-1]);
        if(currentPage && currentPage[currentPage.length-1]!==page){
  
          pushToStack(page);
          setIsLoading(true);

            navigation.navigate(page);
   
        }else{
          popFromStack(navigation);
        }
      } 
    

    const formatDate = (dateString) => {
      const date = new Date(dateString);
      const options = { month: "long", day: "numeric", year: "numeric" };
      return date.toLocaleDateString("en-US", options);
    };

    const[allSubscribedProducts,setAllSubscribedProducts]=useState([]);
    const getAllSubscribedProducts = async () => {
     const header = {
       'Authorization': `Bearer ${token}`,
     };
     try {
       const response = await axios.get(`http://${ip}:5454/api/subscriptions/${loginUserId}`, { headers: header });
       setAllSubscribedProducts(response.data);
     } catch (error) {
       console.log('Error fetching profile:', error);
       // Handle the error as needed
     }
   };
 useEffect(()=>{
   getAllSubscribedProducts();
 },[allSubscribedProducts]);

    return (
    <View style={{flex:1,backgroundColor:'white'}}>
       <TouchableOpacity style={{margin:'3%'}} onPress={()=>{forNavigate('mainHome')}}>
       <Image source={kpmg} style={{ width: 100, height: 100 }} />
       </TouchableOpacity>
       {/* <View style={styles.backBtn}>
        <TouchableOpacity onPress={() => popFromStack(navigation)}>
          <View style={styles.backBtn}>
               <Image source={back} style={{ marginLeft: 12 }} />
              <Text style={{ color: 'black',marginLeft:'3%'}}>Subscribed Item</Text>
          </View>          
        </TouchableOpacity>
       </View> */}
       <ScrollView>
  
         <Text style={styles.mainHeading}>Subscribed Item List</Text>
         <View style={styles.container}>
            <Text style={styles.containerMainHead}>Product {'\n'}Details</Text>
            <Text style={styles.containerMainHead}>Start {'\n'}Date</Text>
            <Text style={styles.containerMainHead}>Subscription {'\n'}Type</Text>
         </View>
         <View style={styles.horizontalLine1}/>
         <View style={styles.backBtn}>
         <View>
      {allSubscribedProducts.map((item, index) => (
        <>
        <TouchableOpacity key={index} style={styles.backBtn} onPress={()=>{
                                                                setCurrentSelectedSubscribedProduct(item.id)
                                                                forNavigate('subscribedProductDetail');
                                                                }}>

          <View style={{width:120,height:40,marginTop:'4%',}}>
          <Text style={{        
              color:'black',
        fontSize:13,
        textAlign:'center' ,
        margin:'3%' }}>{item.product && item.product.title?item.product.title:'NA'}</Text>            
          </View>
          <View style={{width:130,}}>
          <Text style={styles.containerSubHead2}>{formatDate(item.startDate)}</Text>            
          </View>
          <View style={{marginLeft:'3%',width:170,}}>
          <Text style={styles.containerSubHead3}>{item.type}</Text>
          </View>
          
        </TouchableOpacity>
        <View style={styles.horizontalLine3}/>
        </>
        
      ))}
    </View>
         </View>
         <View style={styles.horizontalLine2}/>
         <TouchableOpacity onPress={()=>{forNavigate('groceryHome')}}>
           <Text style={styles.lowerHead}>Shop & Subscribe more products</Text>
         </TouchableOpacity>
      </ScrollView>
    </View>
  )
}

export default SubscribedItem

const styles = StyleSheet.create({
    backBtn:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
      },
      mainHeading:{
        alignSelf:'center',
        color:'#00338D',
        marginTop:'10%',
        fontSize:19,
        fontWeight:'500'
      },
      container:{
        marginTop:'4%',
        flexDirection:'row',
        justifyContent:'space-between',
        borderTopWidth:0.6,
        padding:'1%',
        borderTopColor:'grey'
      },
      containerMainHead:{
        fontSize:15,
        marginLeft:'3%',
        marginRight:'4%',
        textAlign:'center'
      },
      containerMainHead:{
        fontSize:15,
        marginLeft:'3%',
        marginRight:'4%',
        textAlign:'center'
      },
      containerSubHead1:{
        color:'black',
        fontSize:13,
        textAlign:'center' ,
        margin:'3%'      
      },
      containerSubHead2:{
        fontSize:13,
        textAlign:'center' ,
        marginLeft:'18%'
      },
      containerSubHead3:{
        fontSize:13,
        textAlign:'center' ,
        marginRight:'12%',
        color:'#00A3A1',
        fontWeight:'600'      
      },
      horizontalLine1:{
        height:5,
        backgroundColor:'#f5f2f2'
      },
      horizontalLine2:{
        height:1,
        backgroundColor:'grey'
      },
      horizontalLine3:{
        height:0.2,
        backgroundColor:'grey'
      },
      lowerHead:{
        alignSelf:'center',
        fontSize:15,
        color:'#00338D',
        textDecorationLine:'underline',
        fontWeight:'500',
        margin:'5%'
      }
})