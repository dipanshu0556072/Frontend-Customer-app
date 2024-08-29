import { StyleSheet, Text, View,Image,FlatList,TouchableOpacity, ScrollView} from 'react-native'
import React from 'react'
import kpmg from '../PlpScreen/kpmglogo.png';
import gold from '../PlpScreen/images/gold.png';
import platinum from '../PlpScreen/images/platinum.png';
import silver from '../PlpScreen/images/silver.png';
import gold1 from '../PlpScreen/images/gold1.png';
import gold2 from '../PlpScreen/images/gold2.png';
import gold3 from '../PlpScreen/images/gold3.png';
import gold4 from '../PlpScreen/images/gold4.png';
import gold5 from '../PlpScreen/images/gold5.png';
import { useLoginContext } from '../Login/LoginCartProvider';
import back from '../PlpScreen/images/back1.png'

const AllLoyaltyInfo = ({navigation}) => {

  const data = [
    { id: '1', source: silver,title1:'',title2:'',title3:'',title4:'',title5:'',title6:''},
    { id: '2', source: gold },
    { id: '3', source: platinum  },
    // Add more images as needed
  ];
  const {ip,token,popFromStack,pushToStack,
    currentPage, setCurrentPage,
    currentPageIndex,setCurrentPageIndex,
    currentPageIndexCategory,setCurrentPageIndexCategory,
    currentPageIndexCategory1,setCurrentPageIndexCategory1,loginUserId,userName,setUserName}=useLoginContext();  

  return (
    <View style={{flex:1,backgroundColor:'white'}}>
      <ScrollView>
        <TouchableOpacity onPress={()=>{popFromStack(navigation)}}>
         <Image source={kpmg} style={{width:115,height:46,margin:'4%'}}/>
        </TouchableOpacity> 
       <View style={{height:360}}>
       <FlatList
          nestedScrollEnabled={true}
          data={data}
          horizontal={true}
          showsHorizontalScrollIndicator={false} // Optional: hide horizontal scrollbar
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
          <View 
           style={{}}>  
            <Image source={item.source} style={{width:410,height:360,}} />
            <TouchableOpacity style={{ position: 'absolute', top: '5%', left: '4%' }}
            onPress={()=>{popFromStack(navigation)}}>
               <Image source={back} style={{ width: 25, height: 16,}} />
              </TouchableOpacity>
          </View>
        )}
      />   
       </View>
       <View style={{width:'100%',height:140,backgroundColor:'#00338c',marginTop:'4%'}}>
         <Text style={{color:'white',fontWeight:'500',textAlign:'center',marginTop:'7%',fontSize:16}}>Earn KPMG Loyalty Points worth INR 5{'\n'}on every INR 100 Spent.</Text>
         <Text style={{color:'white',textAlign:'center',fontSize:16,margin:'4%'}}><Text style={{textDecorationLine:'underline',fontWeight:'300',color:'white'}}>Purchases above</Text> ₹ 5,000</Text>
       </View>
       <View style={{width:'100%',height:140,marginTop:'1%'}}>
         <Image source={gold1} style={{width:'100%',height:140,}}/>
         <View style={{marginTop:'-30%'}}>
           <Text style={{color:'white',alignSelf:'center',fontWeight:'800',fontSize:20}}>Personal shopping sale{'\n'}   of 15% off across all{'\n'}   brands 1 day a year</Text>
         </View>
       </View>
       <View style={{width:'100%',height:140,marginTop:'1%'}}>
         <Image source={gold2} style={{width:'100%',height:140,}}/>
         <View style={{marginTop:'-25%'}}>
           <Text style={{color:'white',alignSelf:'center',fontWeight:'800',fontSize:20,textAlign:'center'}}>Early access to{'\n'} exclusive sale previews</Text>
         </View>
       </View>
       <View style={{width:'100%',height:140,marginTop:'1%'}}>
         <Image source={gold3} style={{width:'100%',height:140,}}/>
         <View style={{marginTop:'-23%'}}>
           <Text style={{color:'white',alignSelf:'center',fontWeight:'800',fontSize:20,textAlign:'center'}}>Upto 3x Reward Point on{'\n'}   every purchase made</Text>
         </View>
       </View>
       <View style={{width:'100%',height:140,marginTop:'1%'}}>
         <Image source={gold5} style={{width:'100%',height:140,}}/>
         <View style={{marginTop:'-20%'}}>
           <Text style={{color:'white',alignSelf:'center',fontWeight:'800',fontSize:20}}>Get a gift for shopping in{'\n'}   your birthday month</Text>
         </View>
       </View>     
       <View style={{width:'100%',height:140,backgroundColor:'#00338c',marginTop:'1%',marginBottom:'5%'}}>
         <Text style={{color:'white',fontWeight:'500',marginTop:'2%',fontSize:16,marginLeft:'4%'}}>How to be a Gold Tier Member</Text>
         <Text style={{color:'white',fontSize:16,margin:'4%',fontWeight:'300',fontSize:15}}>Start Shopping with KPMG Retail App now and {'\n'}spend between 
            <Text style={{fontWeight:'600',color:'white'}}> ₹ 5,000 to ₹ 9999 </Text> in the last 12 {'\n'}
            <Text style={{textDecorationLine:'underline',color:'white'}}>months to enjoy the Gold Tier Member Benefits</Text> </Text>
       </View>         
      </ScrollView>
    </View>
  )
}

export default AllLoyaltyInfo

const styles = StyleSheet.create({})