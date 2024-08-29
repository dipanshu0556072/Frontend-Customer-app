import { StyleSheet, Text, View,Image, TouchableOpacity} from 'react-native'
import React from 'react'
import back from '../PlpScreen/images/back.png';
import kpmg from '../PlpScreen/kpmglogo.png';
import { useLoginContext } from '../Login/LoginCartProvider';
import ReferLogo from '../PlpScreen/images/ReferLogo.png'


const ReferWelcome = ({navigation}) => {

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
              <Text style={{color:'black'}}>Refer & Earn</Text>
              </View>
           </TouchableOpacity> */}
                 
           <Image source={kpmg} style={{width:290,height:120,alignSelf:'center',marginTop:'10%'}}/>  
           <Text style={{
  fontSize: 32,
  textAlign: 'center',
  marginTop: '12%',
  fontWeight: '500',
  color: '#00338D',
  backgroundColor: 'white', // Background color
  textShadowColor: '#D3D3D3',
  textShadowOffset: { width: 0, height: 7}, // Negative value for height creates shadow at the bottom
  textShadowRadius: 10, // Adjust as needed
}}>
  Welcome to {'\n'}<Text >Refferal Program</Text>
</Text>



           <Image source={ReferLogo} style={{width:'100%',height:370,alignSelf:'center',marginTop:'5%'}}/>  
           <Text style={{fontSize:20,textAlign:'center',marginTop:'1%',fontWeight:'500',color:'#00338D',
                textShadowColor: '#D3D3D3',
                textShadowOffset: { width: 1, height: 4}, // Negative value for height creates shadow at the bottom
                textShadowRadius: 10, // Adjust as needed
             }}>Invite and Earn more</Text>
          <TouchableOpacity style={{marginTop:'5%',backgroundColor:'#f7f7f7',borderWidth:0.5,borderColor:'black'}}
            onPress={()=>{forNavigate('referralHome')}}>
            <Text style={{textAlign:'center',padding:'3%',fontWeight:'500',color:'white',fontSize:20,backgroundColor:'#00338D'}}>REFER NOW</Text>
          </TouchableOpacity>
    </View>
  )
}

export default ReferWelcome

const styles = StyleSheet.create({})