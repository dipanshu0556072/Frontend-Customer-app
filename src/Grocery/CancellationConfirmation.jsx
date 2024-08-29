import { Alert,StyleSheet, Text, View,TouchableOpacity,Image ,ScrollView, TextInput,Modal,TouchableWithoutFeedback} from 'react-native'
import React, { useEffect, useState } from 'react';
import { useCartContext } from '../Context/WomenContext';
import back from '../PlpScreen/images/back.png';
import nextArrow from '../PlpScreen/images/next2.png';
import { useLoginContext } from '../Login/LoginCartProvider';
import axios from 'axios';
import returnlogo from '../PlpScreen/images/return.png';
import cross from '../PlpScreen/images/close.png';
import { RadioButton } from 'react-native-paper';
import GIF from 'react-native-gif';
import correctImage from '../PlpScreen/images/correct.gif'
import confirmImage from '../PlpScreen/images/checkmark.png'


const CancellationConfirmation = ({navigation}) => {
  const {trackCurrentOrderId,deliveryOption,setReceiptData,setProducts,
    orderCancelReason,setOrderCancelReason,cancelLeaveMessage,setCancelLeaveMessage,
    orderStatus, setOrderStatus,isChecked, setChecked,
    selectAllCheckBox, setSelectAllCheckBox,
  }=useCartContext();
const {ip,token,popFromStack,pushToStack,
    currentPage, setCurrentPage,
    setChangeOrderStatus,OrderDate,setOrderDate}=useLoginContext(); 
    const [getOrderStatus,setGetOrderStatus]=useState([]);

    const forNavigate=(page)=>{
      console.log(page+" "+currentPage[currentPage.length-1]);
      if(currentPage && currentPage[currentPage.length-1]!==page){
        if(page==='mainBag'){
          navigation.navigate(page);
        }
        setCurrentPage(currentPage.slice(0, -3));
          navigation.navigate(page);
        
      }else{
        popFromStack(navigation);
      }
    }   
    

   //product to cancel 
   const productToCancel=async()=>{
    // if(selectAllCheckBox.length==isChecked.length){
    //   try {
    //     const response = await axios.put(`http://${ip}:5454/api/admin/orders/${trackCurrentOrderId}/${orderCancelReason}/cancel`, null,{
    //       headers: {
    //         'Authorization': `Bearer ${token}`,         
    //       },
    //     });
  
    //     Alert.alert("Success1");
       
    //   } catch (error) {
    //     // Handle errors
    //     Alert.alert("Getting some error");
    //     console.error('Error fetching Placed1Orderdata:', error);
    //   }
    // }else 
    {
      const dataToCancel = orderStatus.orderItems.map(item => ({
        orderItemId:item.id,
      }));
      try {
        if(cancelLeaveMessage.length>0){
          const response = await axios.put(`http://${ip}:5454/api/admin/orders/${trackCurrentOrderId}/${orderCancelReason}/cancel?comments=${cancelLeaveMessage}`,dataToCancel, {
            headers: {
              'Authorization': `Bearer ${token}`,         
            },
          });  
        //  Alert.alert("Success1");
        }else{
          const response = await axios.put(`http://${ip}:5454/api/admin/orders/${trackCurrentOrderId}/${orderCancelReason}/cancel`,dataToCancel, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
       //   Alert.alert("Success2");

        }
       
      } catch (error) {
        // Handle errors
        Alert.alert("Getting some error");
        console.error('Error fetching Placed1Orderdata:', error);
      }
    }
   }
// get the orderItemId to cancel 
   const orderItemIdToDelete=orderStatus.orderItems.map((item)=>{
    return item.id;
   });
  useEffect(()=>{

  },[orderItemIdToDelete]);
    useEffect(()=>{
      //get Order Data
      const getOrderStatus1=async()=>{
        try {
          const response = await axios.get(`http://${ip}:5454/api/orders/${trackCurrentOrderId}`, {
            headers: {
              'Authorization': `Bearer ${token}`,         
            },
          });
    
          // Handle the response data
          setGetOrderStatus(response.data);
          setReceiptData(response.data);
         
        } catch (error) {
          // Handle errors
          console.error('Error fetching Placed1Orderdata:', error);
        }
      }
      // if(orderStatus && orderStatus.orderItems){
      //   setOrderItemIdToDelete(orderStatus.orderItems.map((item)=>{
      //     return item.id
      //   }))
      // }
      productToCancel();
      //getOrderStatus1();
    },[token])
    return (
    <View style={{flex:1,backgroundColor:'white'}}>
     <View style={styles.topContainer}> 
      <TouchableOpacity onPress={() => {forNavigate('mainHome')}}>
        <Image
          source={{ uri: 'https://shorturl.at/ckGU2' }}
          style={{ width: 100, height: 100, marginLeft: '4%' }}
        />
      </TouchableOpacity>
      <TouchableOpacity
              onPress={()=>{
                setCurrentPage(['mainHome'],
                navigation.navigate('mainHome')         
              )}}
             >              
            <View style={styles.backBtn}>
              <Image source={back} style={styles.backBtnImg} />
              <View style={styles.backBtnTextContainer}>
                <Text style={styles.backBtnText}>ORDER CANCEL</Text>
              </View>
            </View>
        </TouchableOpacity> 
     </View>  
      <ScrollView>

   
   
        <Text style={styles.orderCancelText}>Order Cancelled</Text>
        <View style={styles.horizontalLine2}/> 
        <Text style={styles.mainHead}>{orderStatus && orderStatus.orderItems && orderStatus.orderItems.length} item is cancelled</Text>
        { 
   orderStatus && orderStatus.orderItems && (
    <>
     {orderStatus.orderItems.map((item, index) =>  (
        <View  key={index} style={styles.productContainer}>
            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                <Image source={{ uri: item.product.imageUrl[0] }} style={styles.image} />
                <View style={{ marginLeft: '14%' }}>
                  <Text style={styles.productBrand}>{item.product.brand}</Text>
                  <Text style={styles.productTitle}>{item.product.title}</Text>
                  <Text style={styles.productFit}>Fit: {item.product.fit}</Text>
                  <View>
                    <Text style={styles.productText}>Size: {item.size}</Text>
                    <Text style={styles.productText}>Qty: {item.quantity}</Text>
                  </View>
                  <Text>₹ {item.product.discountedPrice.toLocaleString('en-IN')}</Text>
                </View>
              </View>
        </View>
       ))}
    </>
   )}
   <View style={{margin:'4%'}}>
    <View style={styles.refundDetails}>
    <Image source={confirmImage} style={styles.refundImage}/>
      <Text style={styles.refundText1}>    Refund Details</Text>
    </View>
     <Text style={styles.refundText2}>A refund is not applicable on this order as it is a Pay on {'\n'}delivery order</Text>

     <View style={styles.refundDetails}>
    <Image source={confirmImage} style={styles.refundImage}/>
      <Text style={styles.refundText1}>    PLEASE NOTE</Text>
    </View>
     <Text style={styles.refundText2}>You will receive an email/sms confirming the {'\n'}cancellation of order shortly.</Text>
   </View>
   </ScrollView>
   <TouchableOpacity style={styles.doneBtn} onPress={()=>{forNavigate('order')}}>
    <Text style={styles.dontBtnText}>DONE</Text>
   </TouchableOpacity>
    </View>
  )
}

export default CancellationConfirmation

const styles = StyleSheet.create({
  horizontalLine2:{
    height:2,backgroundColor:'#F5F5F5',
    marginTop:'7%'
},
correctImage:{
  width:180,height:180,
  alignSelf:'center'
},
orderCancelText:{
  color:'black',fontWeight:'500',textAlign:'center',marginTop:'-9%',fontWeight:'700',fontSize:16
},
mainHead:{
  color:'black',
  margin:'1%',
  fontWeight:'600',
  margin:'4%',
  fontSize:14
},
productContainer:{
  padding: '3%',backgroundColor:'#F5F5F5',margin:'2%',
  borderRadius:12
},
image:{
  width: 80, height: 110
},
productBrand:{
  color: '#00338D', fontWeight: '500' 
},
productTitle:{
  color: '#00338D', fontWeight: '300', fontSize: 12 
},
productFit:{
   fontWeight: '300',
},
productText:{
  fontSize: 13 
},
refundDetails:{
  flexDirection:'row',
  marginTop:'4%'
},
refundImage:{
  width:20,height:20
},
refundText1:{
  fontWeight:'700',
  fontSize:12
},
refundText2:{
  marginLeft:'8%',
  fontSize:13
},
doneBtn:{
  backgroundColor:'#00338D',
  width:'90%',
  padding:'3%',
  alignSelf:'center',
  marginBottom:'2.5%'
},
dontBtnText:{
  color:'white',
  fontWeight:'600',
  alignSelf:'center',
  fontSize:15
},
topContainer:{
  backgroundColor:'#F5F5F5',height:160
},
backBtn: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor:'white',
  height:45,
},
backBtnImg: {
  marginLeft: 12,
},
backBtnTextContainer: {
  flex: 1,
  alignItems: 'center',
},
backBtnText: {
  color: 'black',
  fontWeight: '800',
  fontSize:17
},
})