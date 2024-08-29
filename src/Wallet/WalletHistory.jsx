import { FlatList,TouchableWithoutFeedback,Modal,StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import React, { useEffect,useState } from 'react';
import back from '../PlpScreen/images/back.png';
import kpmg from '../PlpScreen/images/kpmg.png';
import { RadioButton } from 'react-native-paper';
import { useLoginContext } from '../Login/LoginCartProvider';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
const Tab = createMaterialTopTabNavigator();
import notFound from '../PlpScreen/images/NotFound.png';
import axios from 'axios';
import { useCartContext } from '../Context/WomenContext';
import download from '../PlpScreen/images/file.png';

const WalletHistory = ({navigation}) => {
    const {ip,token,popFromStack,pushToStack,
        currentPage, setCurrentPage,
        currentPageIndex,setCurrentPageIndex,
        currentPageIndexCategory,setCurrentPageIndexCategory,
        currentPageIndexCategory1,setCurrentPageIndexCategory1,loginUserId,setLoginUserId}=useLoginContext();      

    const{transactionDetail,setTransactionDetail,selectedOption1}=useCartContext(); 
    const [isModalVisible2, setModalVisible2] = useState(false);


  const handlePress2 = () => {
      setModalVisible2(true);
  };
  const closeModal2 = () => {
   setModalVisible2(false);
  };
  
  
    function DownloadingInvoice()
    {
       handlePress2();
       setTimeout(()=>{
         closeModal2();
       },2000);
       setTimeout(()=>{
         navigation.navigate('walletexportPdf');
       },3000);
      
    }
    
        const getData = async () => {
          try {
            const response = await axios.get(`http://${ip}:5454/api/wallet/history/${loginUserId}`, {
              headers: {
                'Authorization': `Bearer ${token}`,         
               },
            });
            const filteredData = response.data.filter(transaction => {
              const transactionDate = new Date(transaction.transactionDate);
              const currentDate = new Date();
              const thirtyDaysAgo = new Date(currentDate.setDate(currentDate.getDate() - selectedOption1));
              return transactionDate >= thirtyDaysAgo;
          });
          
          setTransactionDetail(filteredData);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        }    
    
    useEffect(()=>{
     getData();
    },[token]);    

    return (
    <View style={{flex:1,backgroundColor:'white'}}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Image source={{ uri: 'https://shorturl.at/ckGU2' }} style={{ width: 100, height: 100, marginLeft: '4%' }} />
      </TouchableOpacity>
      <View style={{flexDirection:'row',justifyContent:'space-bewteen'}}>

      <TouchableOpacity   onPress={() => popFromStack(navigation)}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View>
            <Image source={back} style={{ marginLeft: 12 }} />
          </View>
          <View style={{ marginLeft: '5%', flexDirection:'row',justifyContent:'space-around'}}>
            <Text style={{ color: 'black',marginLeft:'3%'}}>Transaction History</Text>
            {/*  */}
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={{marginLeft:'38%'}} onPress={()=>{DownloadingInvoice()}}>
        <Image source={download} style={{width:21,height:21,marginLeft:'30%'}}/>
      </TouchableOpacity>
      </View>
      <Modal
  visible={isModalVisible2}
  animationType="slide"
  transparent={true}
  onRequestClose={closeModal2}
>
  <View>
    <View style={styles.modalContent1}>
      <Text style={{ padding: '1%', fontWeight: '600', color: 'white' }}>Downloading...</Text>
    </View>
  </View>
</Modal>
      <ScrollView>
      {
    transactionDetail && transactionDetail.length>0 && transactionDetail.map((item, index) => {
    // Convert ISO 8601 date format to desired format
    const transactionDate = new Date(item.transactionDate);
    const formattedDate = transactionDate.toLocaleString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    });

    return (
      <React.Fragment key={index}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View style={{ marginLeft: '8%', marginTop: '7%' }}>
            <Text style={{ color: 'black' }}>{item.transactionType==='ADD_MONEY'?'Add to wallet':item.transactionType==='FREEZE_AMOUNT'?'Freeze Amount':item.transactionType==='CANCELLATION_FEE'?'Subscription Cancellation Fee':''}</Text>
            <Text style={{ fontSize: 13 }}>Payment Method: Debit Card</Text>
            <Text style={{ fontSize: 13 }}>{formattedDate}</Text>
          </View>
          <View>
            <Text style={{ marginLeft: '4%', color: '#00A3A1', fontWeight: '700', marginTop: '54%' }}>{item.amount < 0 ? ("- ₹" + Math.abs(item.amount)) : (" + ₹" + item.amount)}</Text>
            <View style={{ height: 2, backgroundColor: 'grey', marginRight: '4%', marginTop: '54%', width: '54%' }} />
            <View style={{ height: 2, backgroundColor: 'grey', marginRight: '4%', marginTop: '4%', width: '54%' }} />
            <View style={{ height: 2, backgroundColor: 'grey', marginRight: '4%', marginTop: '4%', width: '44%' }} />
          </View>
        </View>
        <View style={{ height: 0.4, backgroundColor: 'grey', marginTop: '4%' }} />
        <View style={{ height: 6, backgroundColor: 'rgba(0, 160, 161, 0.2)', marginTop: '0.3%' }} />
      </React.Fragment>
    );
  })
}
{
  transactionDetail && transactionDetail.length<=0 && (
    <>
     <Image source={notFound} style={{width:300,height:300,marginTop:'14%',alignSelf:'center'}}/>
    </>
  )
}

         {/* <Text>{JSON.stringify(transactionDetail)}</Text> */}

         </ScrollView>
         <Modal
  visible={isModalVisible2}
  animationType="slide"
  transparent={true}
  onRequestClose={closeModal2}
>
  <View>
    <View style={styles.modalContent1}>
      <Text style={{ padding: '1%', fontWeight: '600', color: 'white' }}>Downloading...</Text>
    </View>
  </View>
</Modal>
    </View>
  )
}

export default WalletHistory

const styles = StyleSheet.create({})