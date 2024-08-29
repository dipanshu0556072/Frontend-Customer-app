import { FlatList,TouchableWithoutFeedback,Modal,StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import React, { useEffect,useState } from 'react';
import { useCartContext } from '../Context/WomenContext';
import { useLoginContext } from '../Login/LoginCartProvider';
import back from '../PlpScreen/images/back.png';
import addMoney from '../PlpScreen/images/wallet1.png';
import sendMoney from '../PlpScreen/images/send1.png';
import requestMoney from '../PlpScreen/images/money1.png';
import LinearGradient from 'react-native-linear-gradient';
import passbook from '../PlpScreen/images/book1.png';
import calendar from '../PlpScreen/images/calendar1.png';
import walletImage1 from '../PlpScreen/images/walletImage1.jpeg';
import cashback1 from '../PlpScreen/images/cashback1.png'
import flightsimage from '../PlpScreen/images/flightsimage.png'
import thirtyOFF from '../PlpScreen/images/thirtyOFF.png'
import cardScratch from '../PlpScreen/images/cardScratch.png'
import upperArrow from '../Payment/images/upperArrow.png';
import requestStatement from '../PlpScreen/images/priceList.png';
import automaticMoney from '../PlpScreen/images/wallet2.png';
import spendAnalytics from '../PlpScreen/images/trend.png';
import filter from '../PlpScreen/images/filter2.png';
import axios from 'axios';

import { Alert } from 'react-native';

const WalletHome = ({navigation}) => {

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
      const { setTrackCurrentOrderId,walletBalance,setWalletBalance,transactionDetail,setTransactionDetail} = useCartContext();
      const {token,popFromStack,pushToStack,
        currentPage, setCurrentPage,
        currentPageIndex,setCurrentPageIndex,
        currentPageIndexCategory,setCurrentPageIndexCategory,ip,loginUserId}=useLoginContext(); 
      
      const[flag,setFlag]=useState(false);  

      const[walletUser,setWalletUser]=useState("");
   

      const getData = async () => {
        try {
          const response = await axios.get(`http://${ip}:5454/api/wallet/history/${loginUserId}`, {
            headers: {
              'Authorization': `Bearer ${token}`,         
             },
          });
          // console.log(response.data);
          setTransactionDetail(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }    
      const [freezeAmount,setFreezeAmount]=useState("");
      const getFreezeData = async () => {
        try {
          const response = await axios.get(`http://${ip}:5454/api/wallet/total-freeze-amount?userId=${loginUserId}`, {
            headers: {
              'Authorization': `Bearer ${token}`,         
             },
          });
          // console.log(response.data);
          setFreezeAmount(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }   
  
  useEffect(()=>{
   getData();
   getFreezeData();
  },[token]); 


      const fetchData = async () => {
        const header = {
          'Authorization': `Bearer ${token}`,
        };
  
        try {
          const response = await axios.get(`http://${ip}:5454/api/users/profile`, { headers: header });
          setWalletUser(response.data.firstName);
          setWalletBalance(response.data.wallet.balance);
        } catch (error) {
          console.log('Error fetching profile:', error);
          // Handle the error as needed
        }
      };



      const data1=[
        {
          id:1,
          image:cardScratch,
          title:'Scratch card up to ₹500.'
        },
        {
          id:2,
          image:cashback1,
          title:'Cashback worth ₹5 - ₹1000 in your\nwallet.'
        },
        {
          id:3,
          image:thirtyOFF,
          title:'Up to 30% off (Max 1999) on hotel booking\n using wallet.'
        },
        {
          id:4,
          image:flightsimage,
          title:'Up to 40% off (Max 3999) on domestic booking using wallet.'
        }
      ]

  useEffect(()=>{
    fetchData();
  },[token]);
      
  return (
    <View style={{flex:1,backgroundColor:'white'}}>


      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Image source={{ uri: 'https://shorturl.at/ckGU2' }} style={{ width: 100, height: 100, marginLeft: '4%' }} />
      </TouchableOpacity>
      {/* <TouchableOpacity   onPress={() => popFromStack(navigation)}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View>
            <Image source={back} style={{ marginLeft: 12 }} />
          </View>
          <View style={{ marginLeft: '5%' }}>
            <Text style={{ color: 'black' }}>My Wallet</Text>
          </View>
        </View>
      </TouchableOpacity> */}
      <ScrollView>
      <View style={{height:200,width:'100%',backgroundColor:'#00338D',marginTop:'4%'}}>
            <View style={{width:'68%',height:200}}>
              {/* <Text style={{marginLeft:'4%',marginTop:'3%',fontSize:18,color:'white',fontWeight:'500'}}>Hi {walletUser},</Text>
              <Text style={{marginLeft:'4%',color:'white',fontWeight:'400',marginTop:'3%',fontSize:16}}>Available Balance :
                   <Text style={{fontWeight:'600',fontSize:20}}> ₹{walletBalance}.00</Text>
              </Text>
              <Text style={{marginLeft:'4%',color:'white',fontWeight:'400',fontSize:16}}>Freeze Balance :
                   <Text style={{fontWeight:'600',fontSize:20}}> ₹{freezeAmount}.00</Text>
                   
              </Text> */}
              <View style={styles.walletContainer}>
                <View style={styles.walletSubContainer}>
                   <Text style={{textAlign:'center',color:'#d3d3d3',fontSize:15,fontWeight:'400'}}>Wallet Balance</Text>
                   <Text style={styles.walletBalance}>₹{walletBalance}.00</Text>
                </View>
                <View style={styles.reservedBalance}>
                <Text style={styles.reservedBalanceText}>Reserved Balance</Text>
                   <Text style={styles.reservedAmount}>₹{freezeAmount?freezeAmount:'0.00'}.00</Text> 
                </View>
              </View>
              <Text style={styles.walletInstruction}>You can add upto
               <Text style={{fontWeight:'500'}}> ₹1,00,000. 
                  <Text style={{fontWeight:'800',color:'#0391da'}}> T&C applied.</Text>
               </Text></Text>
            </View>
      </View>
      <View style={{width:'80%',height:170,alignSelf:'center',borderWidth:0.3,backgroundColor:'white',marginTop:'-18%',borderRadius:12,borderColor:'grey',

       }}>
  <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:'7%',padding:'3%'}}>
    <View style={{alignItems: 'center',marginLeft:'4%'}}>
      <TouchableOpacity style={{width:65,height:65,borderRadius:50,backgroundColor:'#bde6e7',marginBottom: 5}}
       onPress={()=>{
                      setFlag(!flag)
                      forNavigate('addMoney')
                    }}>
        <Image source={addMoney} style={{width:45,height:45,margin:'14%'}}/>
      </TouchableOpacity>
      <Text style={{color:'#00338D',fontSize:16,textAlign:'center'}}>Add {'\n'}Money</Text>
    </View>
    <View style={{alignItems: 'center'}}>
      <View style={{width:65,height:65,borderRadius:50,backgroundColor:'#bde6e7',marginBottom: 5}}>
       <Image source={sendMoney} style={{width:40,height:40,margin:'20%',marginTop:'24%'}}/>
      </View>
      <Text style={{color:'#00338D',fontSize:16,textAlign:'center'}}>Send {'\n'}Money</Text>
    </View>
    <View style={{alignItems: 'center',marginRight:'3%'}}>
      <View style={{width:65,height:65,borderRadius:50,backgroundColor:'#bde6e7',marginBottom: 5}}>
       <Image source={requestMoney} style={{width:40,height:40,margin:'22%'}}/>
      </View>
      <Text style={{color:'#00338D',fontSize:16,textAlign:'center'}}>Request {'\n'}Money</Text>
    </View>
  </View>

</View>
  <View style={{flexDirection:'row',width:420,height:100,justifyContent:'space-around',marginTop:'4%'}}>
    <TouchableOpacity onPress={()=>{forNavigate('walletHistory')}}>
      <LinearGradient colors={['#00338D', '#00A3A1']} style={{width:195,height:70,borderRadius:12,marginTop:'4%'}}>
       <View style={{flexDirection:'row',margin:'7%',alignItems:'center'}}>
        <Image source={passbook} style={{height:28,width:28,}}/>
        <Text style={{color:'white',marginLeft:'15%',textAlign:'center',fontSize:14.9}}>View{'\n'}Passbook</Text>
       </View>
      </LinearGradient>
    </TouchableOpacity>
    <TouchableOpacity style={{marginRight:'2%'}}>
      <LinearGradient colors={['#00338D', '#00A3A1']} style={{width:195,height:70,borderRadius:12,marginTop:'4%'}}>
      <View style={{flexDirection:'row',margin:'7%',alignItems:'center'}}>
        <Image source={passbook} style={{height:28,width:28,}}/>
        <Text style={{color:'white',marginLeft:'15%',textAlign:'center',fontSize:14.9}}>Add Payment{'\n'}Reminders</Text>
       </View>
      </LinearGradient>
    </TouchableOpacity>
  </View>

  <Image source={walletImage1} style={{width:410,height:240,alignSelf:'center'}}/>
    <Text style={{color:'#00338D',fontSize:18,margin:'3%',fontWeight:'500'}}>Offers</Text>
    <FlatList
          nestedScrollEnabled={true}
          data={data1}
          horizontal={true}
          showsHorizontalScrollIndicator={false} // Optional: hide horizontal scrollbar
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={{marginLeft:12,height:200,width:300,marginBottom:10,marginRight:10}}>
               <TouchableOpacity>
                <Image source={item.image} style={{width:300,height:150,borderRadius:12}}/>
                <Text style={{textAlign:'center',fontSize:14,margin:'2%',fontWeight:'500'}}>{item.title}</Text>
               </TouchableOpacity>
            </View>
        )}
      />   
      <View style={{ height: 1.6, backgroundColor: '#00338D',marginBottom:2}} />
      <View style={{ height: 8, backgroundColor: '#f5f5f5',marginBottom:10 }} />
      
      <View style={{flexDirection:'row',alignItems:'center',alignContent:'center',justifyContent:'space-between',margin:'2%'}}>
         <View style={{flexDirection:'row',marginLeft:'4%'}}>
          <Image source={requestStatement} style={{width:22,height:22,marginRight:'6%'}}/>
          <TouchableOpacity onPress={()=>{forNavigate('requestStatement')}}>
            <Text style={{color:'#00338D',fontSize:16,marginLeft:'5%'}}>Request Statement</Text>
          </TouchableOpacity>
         </View>
         <Image source={upperArrow} style={{width:22,height:12,transform: [{rotate:'-90deg'}],}}/>
      </View>
      <View style={{height:0.4, backgroundColor: '#00338D'}}/>
      <View style={{flexDirection:'row',alignItems:'center',alignContent:'center',justifyContent:'space-between',margin:'2%'}}>
         <View style={{flexDirection:'row',marginLeft:'4%'}}>
         <Image source={automaticMoney} style={{width:24,height:24,marginRight:'6%'}}/>
          <Text style={{color:'#00338D',fontSize:16}}>Automatic Add Money to Wallet</Text>
         </View>
         <Image source={upperArrow} style={{width:22,height:12,transform: [{rotate:'-90deg'}],}}/>
      </View>
      <View style={{height:0.2, backgroundColor: '#00338D'}}/>
      <View style={{flexDirection:'row',alignItems:'center',alignContent:'center',justifyContent:'space-between',margin:'2%'}}>
         <View style={{flexDirection:'row',marginLeft:'4%'}}>
         <Image source={spendAnalytics} style={{width:24,height:20,marginRight:'6%'}}/>
          <Text style={{color:'#00338D',fontSize:16,marginLeft:'3%'}}>View Spend Analytics</Text>
         </View>
         <Image source={upperArrow} style={{width:22,height:12,transform: [{rotate:'-90deg'}],}}/>
      </View>
      <View style={{height:8,backgroundColor:'#00338D'}}/>
      <View style={{height:8,backgroundColor:'#00A3A1'}}/>
      <View style={{flexDirection:'row',justifyContent:'space-between'}}>
       <Text style={{margin:'4%',fontSize:16,fontWeight:'500'}}>Recents Transactions</Text>
       <View style={{flexDirection:'row',alignContent:'center',alignItems:'center'}}>
       {/* <Text style={{margin:'4%',fontSize:16,fontWeight:'500'}}>Filter</Text>
       <Image source={filter} style={{width:20,height:20,marginLeft:'2%'}}/> */}
       </View>
      </View>
      <View style={{ backgroundColor: '#ededed', height: 2 }} />
          <ScrollView style={{ width: '100%',}}>
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
          <Text style={{ color: 'black' }}>
  {item.transactionType === 'ADD_MONEY' ? 'Add to wallet' :
   item.transactionType === 'FREEZE_AMOUNT' ? 'Freeze Amount' :
   item.transactionType === 'CANCELLATION_FEE' ? 'Cancellation Fee' :
   item.transactionType === 'ORDER_PAYMENT' ? 'Order Payment' :
   item.transactionType === 'REFUND_AGAINST_ORDER_CANCELLATION' ? 'Cancellation Refund' :
   item.transactionType === 'REFUND_AGAINST_ORDER_RETURNED' ? 'Returned Order Refund' : ''}
</Text>


            <Text style={{ fontSize: 13 }}>Payment Method: Wallet</Text>
            <Text style={{ fontSize: 13 }}>{formattedDate}</Text>
          </View>
          <View>
            <Text style={{ marginLeft: '4%', color: '#00A3A1', fontWeight: '700', marginTop: '54%' }}>{item.amount < 0 ? ("- ₹" + Math.abs(item.amount)) : (" + ₹" + item.amount)}</Text>
            <View style={{ height: 2, backgroundColor: 'grey', marginRight: '4%', marginTop: '54%', width: '54%' }} />
            <View style={{ height: 2, backgroundColor: 'grey', marginRight: '4%', marginTop: '4%', width: '54%'}} />
            <View style={{ height: 2, backgroundColor: 'grey', marginRight: '4%', marginTop: '4%', width: '44%' }} />
          </View>
        </View>
        <View style={{ height: 0.4, backgroundColor: 'grey', marginTop: '4%' }} />
        <View style={{ height: 6, backgroundColor: 'rgba(0, 160, 161, 0.2)', marginTop: '0.3%' }} />
      </React.Fragment>
    );
  })
}
          </ScrollView>
          <View style={{ backgroundColor: '#ededed', height: 2 }} />

      <View style={{height:0.4, backgroundColor: '#00338D',marginBottom:'5%'}}/>
      </ScrollView>
    </View>
  )
}

export default WalletHome

const styles = StyleSheet.create({
  walletContainer:{
    flexDirection:'row',width:396,height:80,borderWidth:1,borderColor:'#d3d3d3',marginTop:'3%',margin:'3%'
  },
  walletSubContainer:{
    width:'50%',padding:'3%',justifyContent:'center'
  },
  walletBalance:{
    textAlign:'center',fontWeight:'800',color:'#d3d3d3',
  },
  reservedBalance:{
    width:'50%',padding:'3%',borderLeftWidth:1,borderLeftColor:'#d3d3d3',justifyContent:'center'
  },
  reservedBalanceText:{
    textAlign:'center',color:'#d3d3d3',fontSize:15,fontWeight:'400',
  },
  reservedAmount:{
    textAlign:'center',fontWeight:'800',color:'#d3d3d3',
  },
  walletInstruction:{
    marginLeft:'4%',marginTop:'1%',color:'white',fontSize:14
  }
})