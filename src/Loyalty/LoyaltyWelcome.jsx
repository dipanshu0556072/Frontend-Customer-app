import { StyleSheet, Text, View,Image, TouchableOpacity} from 'react-native'
import React from 'react'
import back from '../PlpScreen/images/back.png';
import kpmg from '../PlpScreen/kpmglogo.png';
import { useLoginContext } from '../Login/LoginCartProvider';
import loyaltyLogo from '../PlpScreen/images/loyalty.png'


const LoyaltyWelcome = ({navigation}) => {

    const {token,popFromStack,pushToStack,
        currentPage, setCurrentPage,
        currentPageIndex,setCurrentPageIndex,
        currentPageIndexCategory,setCurrentPageIndexCategory,
        updateUserName,setUpdateUserName,
  updateMobileName,setUpdateMobileName,
  updateEmail,setUpdateEmail,updateGender,setUpdateGender,
  updatePassword,setUpdatePassword}=useLoginContext();    
  
  const forNavigate=(page)=>{
    {
       console.log(page+" "+currentPage[currentPage.length-1]);
       if(currentPage && currentPage[currentPage.length-1]!==page){
         pushToStack(page);
         navigation.navigate(page)
       }else{
         popFromStack(navigation);
       }  
     }
   }
  return (
    <View style={{flex:1,backgroundColor:"white"}}>
           {/* <TouchableOpacity style={{flexDirection:'row',alignItems:'center',marginTop:'5%'}}
            onPress={()=>{popFromStack(navigation)}}>
              <View>
                   <Image source={back}  
                     style={{marginLeft:12}}/>
              </View>
              <View style={{marginLeft:'4%'}}>
              <Text style={{color:'black'}}>My Rewards</Text>
              </View>
           </TouchableOpacity> */}
                 
           <Image source={kpmg} style={{width:290,height:120,alignSelf:'center',marginTop:'10%'}}/>  
           <Text style={{
  fontSize: 32,
  textAlign: 'center',
  marginTop: '14%',
  fontWeight: '500',
  color: '#00338D',
  backgroundColor: 'white', // Background color
  textShadowColor: '#D3D3D3',
  textShadowOffset: { width: 0, height: 7}, // Negative value for height creates shadow at the bottom
  textShadowRadius: 10, // Adjust as needed
}}>
  Welcome to {'\n'}<Text >KPMG - Retail</Text>
</Text>



           <Image source={loyaltyLogo} style={{width:390,height:270,alignSelf:'center',marginTop:'10%'}}/>  
           <Text style={{fontSize:16,textAlign:'center',marginTop:'14%',fontWeight:'500',color:'#00338D',
                textShadowColor: '#D3D3D3',
                textShadowOffset: { width: 1, height: 4}, // Negative value for height creates shadow at the bottom
                textShadowRadius: 10, // Adjust as needed
             }}>Experience the best part of Life {'\n'}<Text>We choose the loyal way of serving you</Text></Text>
          <TouchableOpacity style={{marginTop:'10%',backgroundColor:'#f7f7f7',borderWidth:0.5,borderColor:'black'}}
            onPress={()=>{forNavigate('loyaltyHome')}}>
            <Text style={{textAlign:'center',padding:'3%',fontWeight:'500',color:'#00A3A1',fontSize:20}}>MY REWARDS</Text>
          </TouchableOpacity>
    </View>
  )
}

export default LoyaltyWelcome

const styles = StyleSheet.create({})