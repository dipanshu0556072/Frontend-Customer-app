import { FlatList,TouchableWithoutFeedback,Modal,StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import React, { useEffect,useState } from 'react';
import back from '../PlpScreen/images/back.png';
import kpmg from '../PlpScreen/images/kpmg.png';
import { RadioButton } from 'react-native-paper';
import { useLoginContext } from '../Login/LoginCartProvider';
import { useCartContext } from '../Context/WomenContext';
import axios from 'axios';

const RequestStatment = ({navigation}) => {

    const {ip,token,popFromStack,pushToStack,
        currentPage, setCurrentPage,
        currentPageIndex,setCurrentPageIndex,
        currentPageIndexCategory,setCurrentPageIndexCategory,
        currentPageIndexCategory1,setCurrentPageIndexCategory1,loginUserId,setLoginUserId}=useLoginContext();    

  const{selectedOption1,setSelectedOption1}=useCartContext();      
  
  const [userEmailId,setUserEmailId]=useState("");
  const [userMobile,setUserMobile]=useState("");  

  const fetchData = async () => {
    const header = {
      'Authorization': `Bearer ${token}`,
    };

    try {
      const response = await axios.get(`http://${ip}:5454/api/users/profile`, { headers: header });
      setUserEmailId(response.data.email);
      setUserMobile(response.data.mobile);
    } catch (error) {
      console.log('Error fetching profile:', error);
    }
  };

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
  useEffect(()=>{
    fetchData();
  },[token]);
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
            <Text style={{ color: 'black' }}>Request Statement</Text>
          </View>
        </View>
      </TouchableOpacity>
      <Text style={{marginLeft:'6%',marginTop:'7%',fontSize:18,fontWeight:'500',color:'#00338D'}}>Select time period</Text>
      <View style={{margin:'4%'}}>

        <View style={{flexDirection:'row',alignItems:'center'}}>
        <RadioButton
            value="0"
            status={selectedOption1 === '31' ? 'checked' : 'unchecked'}
            onPress={() => {
                        setSelectedOption1('31');
                      }}
            color="#00338D" 
            />        
            <Text style={{fontSize:18,fontWeight:'400',}}>Last 1 Month</Text>
        </View>
        <View style={{height:0.7,backgroundColor:'grey',width:'96%',marginLeft:'3%',marginTop:'1%'}}/>
        <View style={{flexDirection:'row',alignItems:'center',marginTop:'4%'}}>
        <RadioButton
            value="0"
            status={selectedOption1 === '93' ? 'checked' : 'unchecked'}
            onPress={() => {
                        setSelectedOption1('93');
                      }}
            color="#00338D" 
            />        
            <Text style={{fontSize:18,fontWeight:'400',}}>Last 3 Month</Text>
        </View>
        <View style={{height:0.7,backgroundColor:'grey',width:'96%',marginLeft:'3%',marginTop:'1%'}}/>

        <View style={{flexDirection:'row',alignItems:'center',marginTop:'4%'}}>
        <RadioButton
            value="0"
            status={selectedOption1 === '186' ? 'checked' : 'unchecked'}
            onPress={() => {
                        setSelectedOption1('186');
                      }}
            color="#00338D" 
            />        
            <Text style={{fontSize:18,fontWeight:'400',}}>Last 6 Month</Text>
        </View>
        <View style={{height:0.7,backgroundColor:'grey',width:'96%',marginLeft:'3%',marginTop:'1%'}}/>
        <View style={{flexDirection:'row',alignItems:'center',marginTop:'4%'}}>
        <RadioButton
            value="0"
            status={selectedOption1 === '366' ? 'checked' : 'unchecked'}
            onPress={() => {
                        setSelectedOption1('366');
                      }}
            color="#00338D" 
            />        
            <Text style={{fontSize:18,fontWeight:'400',}}>Last 1 Year</Text>
        </View>
        <View style={{height:0.7,backgroundColor:'grey',width:'96%',marginLeft:'3%',marginTop:'1%'}}/>

      </View>
      <View style={{margin:'8%',}}>
      <Text style={{fontSize:17,color:'#00A3A1',fontWeight:'400'}}>Receive Statement through:</Text>
       <View style={{flexDirection:'row',justifyContent:'space-evenly',marginTop:'7%',alignItems:'center'}}>
          <Text style={{color:'#00338D',fontSize:16}}>Email ID:</Text>
          <Text style={{color:'black',marginLeft:'4%'}}>{userEmailId}</Text>
          <View style={{marginLeft:'15%'}}>
          <Text style={{color:'#00338D',fontSize:15}}></Text>
          </View>
       </View>
       <View style={{flexDirection:'row',marginTop:'5%',alignItems:'center',justifyContent:'space-between'}}>
        <View style={{flexDirection:'row'}}>
          <Text style={{color:'#00338D',fontSize:16}}>SMS:</Text>
          <Text style={{color:'black',marginLeft:'4%'}}>          {userMobile}</Text>
        </View>
        {/* <View style={{marginLeft:'7%'}}>
          <Text style={{color:'#00338D',fontSize:15}}>Edit</Text>
        </View>         */}
    
       </View>
      </View>
      <TouchableOpacity style={{backgroundColor:'#00338D',width:'75%',padding:'2.4%',alignSelf:'center',marginTop:'4%',borderRadius:10}}
       onPress={()=>{forNavigate('walletHistory')}} >
        <Text style={{textAlign:'center',color:'white',fontWeight:'500',fontSize:16}}>Confirm</Text>
      </TouchableOpacity>
    </View>
  )
}

export default RequestStatment