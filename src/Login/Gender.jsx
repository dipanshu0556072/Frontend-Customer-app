import { StyleSheet, Text, View ,Image, TouchableOpacity} from 'react-native'
import React,{useState,useEffect} from 'react'
import { useLoginContext } from './LoginCartProvider';
import check from './images/check.png';
import close from './images/close.png';
import { RadioButton } from 'react-native-paper';


const Gender = ({navigation}) => {
  const [checked, setChecked] = useState(''); // Initialize the checked state
  const{gender,setGender}=useLoginContext();  
  
 
  function changeGender(){
    if(checked!=='' && checked.length>0){
      setGender(checked);
      console.log(gender);
     }  
     navigation.navigate('Login3')
  }
  return (
    <>
    <View style={styles.container}>
       <View style={{flexDirection:'row',alignItems:'center'}}>
        <TouchableOpacity
         onPress={()=>{navigation.navigate('Login3')}}>
          <Image source={close} style={{width:20,height:20}}/>
        </TouchableOpacity>
         <Text style={{color:'black',fontSize:22,marginLeft:'20%'}}>Gender</Text>
       </View>
       <TouchableOpacity style={{justifyContent:'flex-end',flexDirection:'row'}}
        onPress={()=>{changeGender()}}>
         <Image source={check} style={{width:20,height:20}}/>
       </TouchableOpacity>
    </View>
    <Text style={{fontSize:12,marginLeft:'5%'}}>This won't be part of your public profile.</Text>
    <View style={{marginTop:'7%',padding:'5%'}}>
      <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
      <Text style={{fontSize:16,color:'black',marginTop:'5%'}}>Female</Text>
      <RadioButton
                    value="female"
                    status={checked === 'Female' ? 'checked' : 'unchecked'}
                    onPress={() => setChecked('Female')}
        />        
      </View>  
      <View style={{marginTop:'8%',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
      <Text style={{fontSize:16,color:'black',}}>Male</Text>
      <RadioButton
                    value="Male"
                    status={checked === 'Male' ? 'checked' : 'unchecked'}
                    onPress={() => setChecked('Male')}
        />        
      </View>  
      <View style={{marginTop:'8%',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
      <Text style={{fontSize:16,color:'black',}}>Prefer not to say</Text>
      <RadioButton
                    value="prefer not to Say"
                    status={checked === 'Prefer not to Say' ? 'checked' : 'unchecked'}
                    onPress={() => setChecked('Prefer not to Say')}
        />        
      </View>  

    </View>
    </>
  )
}

export default Gender

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        padding:'6%'
    }
})