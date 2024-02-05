import React,{useEffect} from 'react';
import TopBar from '../TopBar1';
import { Image, ScrollView,View,Text, Button,TouchableOpacity } from 'react-native';
import back from '../PlpScreen/images/back.png';
import search from '../PlpScreen/images/search.png';
import { useCartContext } from '../Context/WomenContext';
import axios from 'axios';
import { useLoginContext } from '../Login/LoginCartProvider';
const AddressData=[
    { 
       id:1,
       firstName:"Krishan",
       lastName:"Mohan",
       streetAddress:"Block-C,894 Greater Kailash 1",
       city:"New Delhi",
       state:"Delhi",
       zipCode:"110017",
       mobile:"91123459857",
    }
]
export default function Address({navigation})
{
  const {address, setAddress,token,deliveryAddress,selectedAddress}=useCartContext();
  const {ip}=useLoginContext();
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`http://${ip}:5454/api/orders/1`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
       
        setAddress((prevProducts) => {
          const newProducts = response.data;
          
          console.log("dataArray:" + newProducts.length);
          return newProducts;
        });
      } catch (error) {
        console.error('Error fetching dataioo:', error);
      }
    }
  
    getData();
  }, [token]);
 
   console.log("\nAddressData:"+address);

    return(
        <>
          <TopBar/>
          <View style={{flexDirection:'row',alignItems:'center'}}>
             <TouchableOpacity
              onPress={()=>{
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'Home' }],
                });  
              }}>
              <View style={{flexDirection:'row',alignItems:'center'}}>
                <View>
                  <Image source={back} style={{marginLeft:12}}/>
                </View>
                <Text style={{paddingLeft:10,color:'black'}}>Delivery Address</Text>              
              </View> 
             </TouchableOpacity>
          </View>
          <ScrollView>

  <View style={{width:370,marginLeft:'6%',justifyContent:'space-between',padding:12,borderColor:'#E6E6E6',borderWidth:3,borderRadius:8,marginTop:32}}>
         
     <View style={{paddingLeft:3,paddingTop:10}}>
       {
        AddressData.map((item) => (
        <>
          <Text key={item.id} style={{color:'black',fontSize:25}}>
          {deliveryAddress.shippingAddress.firstName}  {deliveryAddress.shippingAddress.lastName}
          </Text>
          <Text style={{paddingLeft:3,paddingTop:10,fontSize:15}}>{deliveryAddress.shippingAddress.city}</Text>
          <Text style={{paddingLeft:3,paddingTop:10,fontSize:15}}>{deliveryAddress.shippingAddress.state}- 110096</Text>
          <Text style={{paddingLeft:3,paddingTop:10,fontSize:15}}>Mobile Number : {deliveryAddress.shippingAddress.mobile}</Text>
        </>
      ))
     }
    </View>
 </View>

     <View style={{width:360,marginLeft:'8%',paddingTop:20}}>
      <TouchableOpacity
        onPress={()=>{navigation.navigate('AddressDetail')}}
        >
         <Text style={{backgroundColor:"#00338D",color:'white',padding:11,borderRadius:12,fontWeight:'bold'}} >Edit Delivery Address</Text>
      </TouchableOpacity>        
    </View>    

          </ScrollView>
        </>
    );
}