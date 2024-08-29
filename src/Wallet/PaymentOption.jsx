import { FlatList,TouchableWithoutFeedback,Modal,StyleSheet, Text, View, TouchableOpacity, Image, ScrollView,TextInput, Alert } from 'react-native';
import React, { useEffect,useState } from 'react';
import back from '../PlpScreen/images/back.png';
import kpmg from '../PlpScreen/images/kpmg.png';
import { RadioButton } from 'react-native-paper';
import { useLoginContext } from '../Login/LoginCartProvider';
import moneyBag from '../PlpScreen/images/moneyBag.png';
import axios from 'axios';
import { useCartContext } from '../Context/WomenContext';
import sbi from '../PlpScreen/images/sbiLogo.png';
import axis from '../PlpScreen/images/axisLogo.png';
import hdfc from '../PlpScreen/images/hdfcLogo.png';
import icici from '../PlpScreen/images/iciciLogo.png';

const PaymentOption = ({navigation}) => {


    const {ip,token,popFromStack,pushToStack,
        currentPage, setCurrentPage,
        currentPageIndex,setCurrentPageIndex,
        currentPageIndexCategory,setCurrentPageIndexCategory,
        currentPageIndexCategory1,setCurrentPageIndexCategory1,loginUserId,setLoginUserId}=useLoginContext();      
    const {walletBalance,} = useCartContext();
    const [checked, setChecked] = React.useState('');

    const forNavigate=(page)=>{
        console.log(page+" "+currentPage[currentPage.length-1]);
        if(currentPage && currentPage[currentPage.length-1]!==page){
          pushToStack(page);
          setTimeout(()=>{
            navigation.navigate(page)
          },300);
        }else{
          popFromStack(navigation);
        }
      } 

    //show user the currently unavailable options
    const showAlert = () => {
      Alert.alert(
        "Alert",
        "We regret to inform you that these tender options are currently unavailable."
      );
    };
    
    
    return (
    <View style={{flex:1,backgroundColor:'white'}}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Image source={{ uri: 'https://shorturl.at/ckGU2' }} style={{ width: 100, height: 100, marginLeft: '4%' }} />
      </TouchableOpacity>
      <TouchableOpacity   onPress={() => popFromStack(navigation)}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View>
            <Image source={back} style={{ marginLeft: 12 }} />
          </View>
          <View style={{ marginLeft: '5%' }}>
            <Text style={{ color: 'black' }}>Add Money</Text>
          </View>
        </View>
      </TouchableOpacity>
      <Text style={{marginLeft:'10%',marginTop:'2%',fontSize:15}}>Available Balance : 
       <Text style={{fontWeight:'800'}}> ₹ {walletBalance}.00</Text></Text>
       <View style={{height:0.7,backgroundColor:'grey',marginTop:'4%'}}/>
       <View style={{height:4,backgroundColor:'#d3d3d3',marginTop:'0.4%'}}/>
       <Text style={{marginLeft:'6%',color:'#00338D',marginTop:'4%',fontSize:17,fontWeight:'500'}}>Select Payment Option</Text>
       <TouchableOpacity style={{borderWidth:0.7,borderColor:'grey',height:170,margin:'5%',borderRadius:10,}} onPress={()=>{showAlert()}}>
       <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: '3%' }}>
        <RadioButton
           value="first"
           disabled={true}
           status={checked === 'first' ? 'checked' : 'unchecked'}
    onPress={() => {setChecked('first')}

    }
    color='#00338D'
  />
  <Text style={{ color: 'grey', fontSize: 17 }}>Pay Using Bank Account</Text>
</View>
<View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: '10%' }}>
  <View style={{ alignItems: 'center' }}>
    <Image source={sbi} style={{ width: 40, height: 40 }} />
    <Text style={{ marginTop: 5 }}>SBI</Text>
  </View>
  <View style={{ alignItems: 'center' }}>
    <Image source={axis} style={{ width: 40, height: 40 }} />
    <Text style={{ marginTop: 5 }}>Axis</Text>
  </View>
  <View style={{ alignItems: 'center' }}>
    <Image source={hdfc} style={{ width: 40, height: 40 }} />
    <Text style={{  marginTop: 5 }}>HDFC</Text>
  </View>
  <View style={{ alignItems: 'center' }}>
    <Image source={icici} style={{ width: 40, height: 40 }} />
    <Text style={{  marginTop: 5 }}>ICICI</Text>
  </View>
</View>



       </TouchableOpacity>
       <TouchableOpacity style={{height:60,borderWidth:0.4,margin:'5%',borderRadius:10,borderColor:'grey',flexDirection:'row',alignItems:'center'}}
        onPress={()=>{
                     forNavigate('walletCardPayment')
                     setChecked('second')
                     }}>
        <RadioButton
                          value="second"
                          status={ checked === 'second' ? 'checked' : 'unchecked' }
                          onPress={() => {
                                           forNavigate('walletCardPayment')
                                           setChecked('second')
                                          }}
                          color='#00338D'
        />
        <Text style={{color:'#00338D',fontSize:18}}>Debit Card</Text>                            
       </TouchableOpacity>
       {/* <TouchableOpacity style={{height:60,borderWidth:0.4,marginLeft:'5%',marginRight:'5%',borderRadius:10,borderColor:'grey',flexDirection:'row',alignItems:'center'}}
         onPress={()=>{setChecked('second')
                      forNavigate('walletCardPayment')}}>
        <RadioButton
                          value="third"
                          status={ checked === 'third' ? 'checked' : 'unchecked' }
                          onPress={() => {
                                       forNavigate('walletCardPayment')
                                       setChecked('third')}}
                          color='#00338D'
        />
        <Text style={{color:'#00338D',fontSize:18}}>Credit Card</Text>                            
       </TouchableOpacity> */}

    </View>
  )
}

export default PaymentOption

const styles = StyleSheet.create({})