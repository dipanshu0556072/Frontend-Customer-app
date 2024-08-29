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
import correctImage from '../PlpScreen/images/correct.gif'

const OrderCancel = ({navigation}) => {
    const {trackCurrentOrderId,deliveryOption,setReceiptData,setProducts,
        orderCancelReason,setOrderCancelReason,cancelLeaveMessage,setCancelLeaveMessage,
        orderStatus, setOrderStatus,isChecked, setChecked,selectAllCheckBox
      }=useCartContext();
    const {ip,token,popFromStack,pushToStack,
        currentPage, setCurrentPage,
        setChangeOrderStatus,OrderDate,setOrderDate}=useLoginContext(); 

        const forNavigate=(page)=>{
          console.log(page+" "+currentPage[currentPage.length-1]);
          if(currentPage && currentPage[currentPage.length-1]!==page){
            if(page==='mainBag'){
            }
            pushToStack(page);
          
              navigation.navigate(page);
            
          }else{
            popFromStack(navigation);
          }
        }   
    const [getOrderStatus,setGetOrderStatus]=useState([]);
    const [policyModalVisible, setPolicytModalVisible] = useState(false);
    const handleWeekPress = () => {
         setPolicytModalVisible(true);
      };
      const handlePolicyModalClose = () => {
        // Additional logic to handle sorting or other actions
        setTimeout(() => {
          setPolicytModalVisible(false);
        }, 100);
      };
    //get all cancellation reasons 
    const [orderCancellationReason,setOrderCancellationReason]=useState([]);
      
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
        
        const getOrderCancellationReason=async()=>{
          try {
            const response = await axios.get(`http://${ip}:5454/api/cancellation-reasons/`, {
              headers: {
                'Authorization': `Bearer ${token}`,         
              },
            });
      
            // Handle the response data
            setOrderCancellationReason(response.data);         
          } catch (error) {
            // Handle errors
            console.error('Error fetching orderCanellationReason', error);
          }
        }
        getOrderStatus1();
        getOrderCancellationReason();
      },[token,orderCancellationReason])

      const handleCancelPress = () => {
        if (!orderCancelReason && !cancelLeaveMessage) {
          Alert.alert('Please provide a reason for cancellation.');
        } else {
          forNavigate('orderCancelConfirm');
        }
      };


//fetched totalAmount to refund       
const [amountToRefund,setAmountToRefund]=useState(0);      
useEffect(() => {
  if (orderStatus && orderStatus.orderItems) {
    // const totalAmount = getOrderStatus.orderItems.reduce((sum, item) => {
    //   return sum + parseInt(item.discountedPrice, 10);
    // }, 0);
    const totalAmount=orderStatus.orderItems.reduce((sm,item)=>{
      return sm + (parseFloat(item.discountedPrice));
    },0)
    setAmountToRefund(totalAmount);
  }
}, [orderStatus]);

  return (
    <View style={{flex:1,backgroundColor:'white'}}>

      {/* <TouchableOpacity
           onPress={()=>{popFromStack(navigation)}}
          >              
           <View style={{flexDirection:'row',alignItems:'center'}}>
              <View>
                   <Image source={back}  
                     style={{marginLeft:12}}/>
              </View>
              <View style={{marginLeft:'4%'}}>
              <Text style={{color:'black'}}>Order</Text>
              </View>
           </View>
      </TouchableOpacity>   */}
      <View style={styles.topContainer}> 
      <TouchableOpacity onPress={() => {forNavigate('mainHome')}}>
        <Image
          source={{ uri: 'https://shorturl.at/ckGU2' }}
          style={{ width: 100, height: 100, marginLeft: '4%' }}
        />
      </TouchableOpacity>

        <TouchableOpacity
              onPress={()=>{popFromStack(navigation)}}
             >              
            <View style={styles.backBtn}>
              <Image source={back} style={styles.backBtnImg} />
              <View style={styles.backBtnTextContainer}>
                <Text style={styles.backBtnText}>CREATE A CANCEL</Text>
              </View>
            </View>
        </TouchableOpacity>  
      </View>   
      <ScrollView>
      <Text style={styles.mainHeading}>ITEMS FROM THIS ORDER</Text>   
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
   <View style={styles.productCancelEligibility}>
     <View style={styles.productCancelText}>
        <Image source={returnlogo} style={styles.returnImage}/>
        <Text style={{fontSize:13}}>Eligible for cancellation</Text>
     </View>
       <TouchableOpacity onPress={()=>{handleWeekPress()}}>
            <Text style={{color:'#00338D',fontWeight:'800'}}>VIEW POLICY</Text>
        </TouchableOpacity>
   </View>
   <View style={styles.horizontalLine}/>
   <View style={styles.cancelReasonContainer}>
      <Text style={styles.cancelReasonText1}>Reason for cancellation</Text>
      <Text style={styles.cancelReasonText2}>Please provide the accurate reason for the cancellation. This information is crucial for enhancing our services.</Text>
   </View>
   <View style={styles.horizontalLine2}/>
   <Text style={styles.radioBoxText}>
    Select Reason
    <Text style={{color:'#d93a2e'}}>*</Text>
   </Text>
     <View style={{margin:'2%'}}>
      {
          orderCancellationReason.map((item,index)=>(
          <View>
           <View style={styles .radioContainer}>
           <RadioButton
               value={item.id}
               status={orderCancelReason === item.id? 'checked' : 'unchecked'}
               onPress={() => {setOrderCancelReason(item.id)}}
               color="black" 
             />  
            <Text style={styles.radioOption}>{item.description}</Text> 
        </View>
           
          </View>))
      }
        
      </View>
      <View style={styles.horizontalLine2}/>
      <View style={styles.additionalComments}>
        <TextInput
           value={cancelLeaveMessage}
           onChangeText={(text)=>{
                                 setCancelLeaveMessage(text)
                                }}
           placeholder=' Additional Comments '
           placeholderTextColor='#c9c7c7'
           multiline
        />
      </View>
     </ScrollView>
     <View style={styles.refundContainer}>
        <View>
            <Text style={styles.refundDetails}>REFUND DETAILS</Text>
            <Text style={styles.refundAmount}>
            ₹{amountToRefund}
</Text>

        </View>
        <TouchableOpacity style={{
          backgroundColor:orderCancelReason||cancelLeaveMessage?'#00338D':'#d3d3d3',height:50,width:200,borderRadius:10
        }} onPress={()=>{handleCancelPress()}}>
               <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                 <Text style={styles.cancelText}>CANCEL</Text>
                 <Image source={nextArrow} style={styles.cancelImage}/>
               </View>
        </TouchableOpacity>
     </View>
<Modal animationType="slide" transparent={true} visible={policyModalVisible} onRequestClose={handlePolicyModalClose}>

    <View style={styles.modalContainer}>
      <View style={styles.weeklyModal1}>
          <View style={styles.cancelPolicy}>
            <Text style={styles.cancelHeading}>Cancellation Policy</Text>
           <TouchableOpacity onPress={()=>{handlePolicyModalClose()}}>
              <Image source={cross} style={styles.crossImage}/>
           </TouchableOpacity>
          </View>
          <View style={styles.horizontalLine2}/>
          <ScrollView>
          <View style={styles.Policycontainer}>
      <Text>1. <Text style={styles.bold}>Cancellation Window</Text>: Customers may cancel their order within 24 hours of purchase for a full refund. After this period, cancellations may be subject to fees or restrictions.</Text>
      <Text>2. <Text style={styles.bold}>Cancellation Procedure</Text>: To cancel an order, customers must contact our customer service team via email or phone with their order details and reason for cancellation.</Text>
      <Text>3. <Text style={styles.bold}>Refund Process</Text>: Refunds for cancelled orders will be processed within 5-7 business days to the original payment method used at the time of purchase.</Text>
      <Text>4. <Text style={styles.bold}>Partial Cancellations</Text>: Partial cancellations of orders (e.g., cancelling only certain items from an order) may be permitted depending on the nature of the products and the stage of fulfillment.</Text>
      <Text>5. <Text style={styles.bold}>Cancellation Fees</Text>: Depending on the circumstances, cancellation fees may apply. These fees will be communicated to the customer prior to cancelling the order.</Text>
      <Text>6. <Text style={styles.bold}>Exceptions</Text>: Certain products or services may have specific cancellation policies outlined at the time of purchase. Customers are advised to review these policies before placing their order.</Text>
      <Text>7. <Text style={styles.bold}>Force Majeure</Text>: In the event of unforeseen circumstances such as natural disasters, strikes, or other force majeure events, cancellation policies may be temporarily adjusted.</Text>
      <Text>8. <Text style={styles.bold}>Policy Updates</Text>: This cancellation policy is subject to change without prior notice. Any updates or modifications will be communicated to customers through our website or other official channels.</Text>
      <Text>9. <Text style={styles.bold}>Customer Responsibilities</Text>: Customers are responsible for providing accurate information at the time of purchase and promptly notifying us of any changes or cancellations.</Text>
      <Text>10. <Text style={styles.bold}>Dispute Resolution</Text>: In the event of disputes regarding cancellations, both parties agree to resolve the matter through negotiation and mediation in good faith.</Text>
      <Text style={styles.note}>By making a purchase with us, customers agree to abide by the terms and conditions outlined in this cancellation policy.</Text>
    </View>

          </ScrollView>
       </View>

       </View>

</Modal>
     
    </View>
  )
}

export default OrderCancel

const styles = StyleSheet.create({
  mainHeading:{
    margin:'2%',fontSize:15,color:'black',fontWeight:'500',marginTop:'4%'
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
    productCancelEligibility:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        width:380,
        margin:'4%'
        
    },
    productCancelText:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    returnImage:{
        width:17,height:17,margin:'1%'
    },
    horizontalLine:{
        height:12,backgroundColor:'#F5F5F5'
    },
    horizontalLine2:{
        height:3,backgroundColor:'#F5F5F5'
    },
    cancelReasonContainer:{
     margin:'4%'
    },
    cancelReasonText1:{
        color:'black',
        fontWeight:'700',
        fontSize:17
    },
    cancelReasonText2:{
        fontSize:13.5
    },
    radioBoxText:{
        margin:'4%',fontSize:15,fontWeight:'600',color:'#403e3e'
    },
    radioContainer:{
        flexDirection:'row',alignItems:'center'
    },
    radioOption:{
        color:'#525151'
    },
    additionalComments:{
        height:120,margin:'2%',marginTop:'4%',
        borderWidth:1,borderRadius:12,borderColor:'#d3d3d3'
    },
    refundDetails:{
        fontWeight:'600',fontSize:13
    },
    refundAmount:{
        color:'black',fontSize:18,fontWeight:'600'
    },
    refundContainer:{
        margin:'5%',flexDirection:'row',justifyContent:'space-between'
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      weeklyModal1:{
        height: 400,
        width: '100%', 
        backgroundColor: 'white', 
        marginTop: '117%',
        borderTopLeftRadius:16,
        borderTopRightRadius:16,       
      },
      cancelPolicy:{
        flexDirection:'row',
        justifyContent:'space-between'
      },
      cancelBtn:{
        backgroundColor:'#00338D',height:50,width:200,borderRadius:10
      },
      cancelText:{
        color:'white',textAlign:'center',margin:'6.6%',fontWeight:'600',fontSize:15
      },
      cancelImage:{
        width:28,height:20,margin:'6.6%'
      },
      crossImage:{
        width: 17, height: 17,margin:'2%',marginTop:'58%'
      },
      cancelHeading:{
        fontSize:13,color:'black',fontSize:18,fontWeight:'500',margin:'4%'
      },
      bold: {
        fontWeight: 'bold',
        color:'#666464'
   
      },
      note: {
        marginTop: 20,
        fontStyle: 'italic',
        marginBottom:'1%'
      },
      Policycontainer:{
        padding: 10,
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