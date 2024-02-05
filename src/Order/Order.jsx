import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import React, { useEffect,useState } from 'react';
import { useCartContext } from '../Context/WomenContext';
import { useLoginContext } from '../Login/LoginCartProvider';
import back from '../PlpScreen/images/back.png';
import axios from 'axios';
import emptyBag from './emptyBag.png';

const Order = ({ navigation }) => {
  const { setTrackCurrentOrderId} = useCartContext();
  const {token,popFromStack,pushToStack,
    currentPage, setCurrentPage,
    currentPageIndex,setCurrentPageIndex,
    currentPageIndexCategory,setCurrentPageIndexCategory,ip}=useLoginContext(); 

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

  const [getUserOrderHistory,setGetUserOrderHistory]=useState([]);

  useEffect(()=>{
    //get Order Data
    const getOrderStatus1=async()=>{
      try {
        const response = await axios.get(`http://${ip}:5454/api/orders/user`, {
          headers: {
            'Authorization': `Bearer ${token}`,         
          },
        });
  
        // Handle the response data
        setGetUserOrderHistory(response.data);
       
      } catch (error) {
        // Handle errors
        console.error('Error fetching Placed1Orderdata:', error);
      }
    }

    getOrderStatus1();
  },[token])
  const formattedDate = (dateString) => {
    const createdAtDate = new Date(dateString);
    return `${createdAtDate.getDate()}/${createdAtDate.getMonth() + 1}/${createdAtDate.getFullYear()}`;
  };

  const formattedDate1 = (dateString) => {
    const createdAtDate = new Date(dateString);
    const updatedDate = new Date(createdAtDate.setDate(createdAtDate.getDate() + 3));

    return `${updatedDate.getDate()}/${updatedDate.getMonth() + 1}/${updatedDate.getFullYear()}`;
  };

  const handlePress = (itemId) => {
    setTrackCurrentOrderId(itemId);
    pushToStack('orderStatus');
    navigation.navigate('orderStatus');
  };


  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
       {/* <Text>{JSON.stringify(getUserOrderHistory)}</Text> */}
       {/* <Text>{currentPage}</Text> */}
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Image source={{ uri: 'https://shorturl.at/ckGU2' }} style={{ width: 100, height: 100, marginLeft: '4%' }} />
      </TouchableOpacity>
      <TouchableOpacity   onPress={() => popFromStack(navigation)}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View>
            <Image source={back} style={{ marginLeft: 12 }} />
          </View>
          <View style={{ marginLeft: '5%' }}>
            <Text style={{ color: 'black' }}>My Orders</Text>
          </View>
        </View>
      </TouchableOpacity>
      {
        getUserOrderHistory && getUserOrderHistory.length<=0 ? (<>
          <Image source={emptyBag} style={{width:330,height:330,marginTop:'24%',marginLeft:'10%'}}/>
        </>):
        <>
      <ScrollView style={{marginBottom:'4%'}}>
        {/* <Text>{JSON.stringify(placedOrder)}</Text> */}
        <View
          style={{
            marginLeft: '4%',
            marginRight: '4%',
            borderColor: '#000000',
            borderWidth: 0.8,
            marginTop: '3%',
            borderRadius: 12,
            borderColor: 'grey',
            padding: '2%',
          }}>


          {getUserOrderHistory && getUserOrderHistory.length > 0 && (
  <>
{getUserOrderHistory && getUserOrderHistory.length > 0 && (
  <>
    {getUserOrderHistory.map((item, index) => (
      <React.Fragment key={index}>
        <View style={{ margin: '2%', flexDirection: 'row', justifyContent: 'space-between' }}>
          <View>
            <Text style={{ color: 'black', fontWeight: '300' }}>ORDER ID</Text>
            <Text style={{ color: 'grey', fontSize: 12, padding: 1 }}>
              KPMG-RT-4498
              <Text>{item.id}</Text>
            </Text>
          </View>
          <TouchableOpacity
            key={index}
            style={{
              backgroundColor: 'white',
              borderColor: '#D3D3D3',
              borderWidth: 1,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 13,
              padding: '1%',
              width: '33%',
            }}
            onPress={() => handlePress(item.id)}  // Pass item.id to handlePress
          >
            <Text style={{ textAlign: 'center', textAlignVertical: 'center', color: '#b31717' }}>
              Order Details
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{}}>
          {item.orderItems && item.orderItems.length > 0 && (
            <>
              <Text style={{ color: 'black', fontSize: 18, marginTop: '3%' }}>
                {item.orderItems.length} Item(s) {item.orderStatus}
              </Text>
              <Text style={{ fontSize: 14, marginTop: '2%', color: 'grey', padding: '0.4%' }}>
                Order on: {formattedDate(item.createdAt)}
              </Text>
              <Text style={{ fontSize: 14, padding: '0.4%', color: 'grey', marginBottom: '1%' }}>
                Expected Delivery Date: {formattedDate1(item.createdAt)}
              </Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {item.orderItems.map((prod, prodIndex) => (
                  <View key={prodIndex} style={{ marginRight: 10 }}>
                    {prod.product && (
                      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <Image source={{ uri: prod.product.imageUrl }} style={{ width: 70, height: 70 }} />
                      </ScrollView>
                    )}
                  </View>
                ))}
              </ScrollView>
            </>
          )}
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: '5%' }}>
          <View style={{ padding: '3%', borderColor: '#D3D3D3', borderWidth: 1, borderRadius: 12, width: '48%' }}>
            <Text style={{ textAlign: 'center', fontWeight: "600", color: '#00A3A1' }}>Rate your Experience</Text>
          </View>
          <View style={{ padding: '3%', borderColor: '#D3D3D3', borderWidth: 1, borderRadius: 12, width: '48%' }}>
            <Text style={{ textAlign: 'center', fontWeight: "600", color: '#00338D' }}>Download Invoice</Text>
          </View>
        </View>

        {/* Add a line after each object, except for the last one */}
        {index !== getUserOrderHistory.length - 1 && <View style={{ borderBottomWidth: 0.5, borderBottomColor: 'black',marginTop:'6%',marginBottom:'6%' }} />}
      </React.Fragment>
    ))}
  </>
)}

  </>
)}

        </View>
      </ScrollView>        
        </>
      }

    </View>
  );
};

export default Order;

const styles = StyleSheet.create({});
