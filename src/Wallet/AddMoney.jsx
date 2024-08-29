import { FlatList,TouchableWithoutFeedback,Modal,StyleSheet, Text, View, TouchableOpacity, Image, ScrollView,TextInput, Alert } from 'react-native';
import React, { useEffect,useState } from 'react';
import back from '../PlpScreen/images/back.png';
import kpmg from '../PlpScreen/images/kpmg.png';
import { RadioButton } from 'react-native-paper';
import { useLoginContext } from '../Login/LoginCartProvider';
import moneyBag from '../PlpScreen/images/moneyBag.png';
import axios from 'axios';
import { useCartContext } from '../Context/WomenContext';
import { useGroceryContext } from '../Grocery/GroceryContext';

const AddMoney = ({navigation}) => {

    const {ip,token,popFromStack,pushToStack,
        currentPage, setCurrentPage,
        currentPageIndex,setCurrentPageIndex,
        currentPageIndexCategory,setCurrentPageIndexCategory,
        currentPageIndexCategory1,setCurrentPageIndexCategory1,loginUserId,setLoginUserId}=useLoginContext();      

   
    const{walletBalance,addedMoney,setAddedMoney}=useCartContext();
  



  
    const forNavigate=(page)=>{
      console.log(page+" "+currentPage[currentPage.length-1]);
      if(currentPage && currentPage[currentPage.length-1]!==page){
        pushToStack(page);
        navigation.navigate(page)
      }else{
        popFromStack(navigation);
      }
    } 

   const[flag,setFlag]=useState(false);
   function ProceedFn(){
    if(!addedMoney){
      setFlag(true);
    }else{
      forNavigate('paymentOption')
    }
   }
   useEffect(()=>{
    if(flag){
      setTimeout(()=>{
        setFlag(false);
      },4000);
    }
   },[flag]);
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
      <View style={{width:'100%',height:46,backgroundColor:'#00338D',marginTop:'2%',flexDirection:'row',justifyContent:'space-between'}}>
        <Text style={{margin:'3%',color:'white',fontSize:14.6}}>Available Balance:</Text>
        <Text style={{margin:'2%',color:'white',fontSize:20,fontWeight:'700'}}>₹{walletBalance}.00</Text>
      </View>
      <View style={{height:0.4,backgroundColor:'grey',marginTop:'4%'}}/>
      <View style={{height:3,backgroundColor:'#ebe8e8',marginTop:'0.7%',}}/>
       <View style={{alignSelf:'center',height:30,width:'80%',backgroundColor:'rgba(0, 163, 161, 0.5)',marginTop:'3%'}}>
        <View style={{flexDirection:'row',alignItems:'center'}}>
           <Image source={moneyBag} style={{width:18,height:18,marginLeft:'3%'}}/>
           <Text style={{textAlign:'center',margin:'1.5%',color:'black',fontWeight:'300'}}>Use code ADD25 to win ₹25 cashback.
             <Text style={{fontWeight:'400',textDecorationLine:'underline'}}>T&C</Text>   
           </Text>
        </View>
       </View>
       <Text style={{marginLeft:'10%',marginTop:'8%',fontSize:16,fontWeight:'500'}}>Add to Wallet</Text>
       <View style={{marginTop:'4%'}}>
          <View style={{alignSelf:'center',height:60,borderWidth:0.7,width:'80%',borderColor:flag?'red':'grey',borderRadius:6}}>
             <View style={{flexDirection:'row',alignItems:'center'}}>

             <Text style={{fontSize:18,marginLeft:'3%',fontSize:28,color:addedMoney?'#00338D':'grey'}}>₹</Text>
             <TextInput 
               placeholder='Add Amount'
               style={{      
                 width:'92%',
                 marginTop:'2%',
                 marginLeft:'0.1%',
                 fontWeight:'600',
                 color:'#00338D',
                 fontSize:20
               }}
               keyboardType='numeric'
               placeholderTextColor='grey'
               maxLength={6}
               value={addedMoney}
               onChangeText={(text) => { setAddedMoney(text) }} // Corrected event name
           />
         </View>
          </View>
          <View style={{flexDirection:'row',justifyContent:'space-evenly',marginTop:'7%'}}
             >
            <TouchableOpacity style={{borderWidth:1,width:50,borderRadius:7,borderColor:'#d3d3d3',padding:'1%'}}
              onPress={() => { setAddedMoney('200') }}>
                <Text style={{textAlign:'center',color:'black',fontWeight:'500'}}>₹200</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{borderWidth:1,width:50,borderRadius:7,borderColor:'#d3d3d3',}}
              onPress={() => { setAddedMoney('500') }}>
                <Text style={{textAlign:'center',color:'black',margin:'7%',fontWeight:'500'}}>₹500</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{borderWidth:1,width:50,borderRadius:7,borderColor:'#d3d3d3',}}
              onPress={() => { setAddedMoney('1000') }}>
                <Text style={{textAlign:'center',color:'black',margin:'6%',fontWeight:'500'}}>₹1,000</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{borderWidth:1,width:53,borderRadius:7,borderColor:'#d3d3d3',}}
             onPress={() => { setAddedMoney('2000') }}>
                <Text style={{textAlign:'center',color:'black',margin:'7%',fontWeight:'500'}}>₹2,000</Text>
            </TouchableOpacity>
          </View>
       </View>
       <TouchableOpacity style={{backgroundColor:addedMoney?"#00338D":'#9c9898',width:'45%',padding:'3%',marginTop:'15%',alignSelf:'center',borderRadius:14}}
         onPress={()=>{ProceedFn()}}>
        <Text style={{textAlign:'center',color:'white',fontSize:17,fontWeight:'800'}}>PROCEED</Text>
       </TouchableOpacity>
       {
        flag && (<>
          <Text style={{fontSize:12,color:'red',alignSelf:'center',marginTop:'4%'}}>Please enter amount</Text>
        </>)
       }
    </View>
  )
}

export default AddMoney

const styles = StyleSheet.create({})