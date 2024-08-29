import { StyleSheet, Text, View,Image,TouchableOpacity,FlatList,SafeAreaView,ScrollView} from 'react-native'
import React from 'react'
import back from '../PlpScreen/images/back.png';
import kpmg from '../PlpScreen/images/kpmg.png';
import { useLoginContext } from '../Login/LoginCartProvider';
import LinearGradient from 'react-native-linear-gradient';
import  coin1 from '../PlpScreen/images/coin1.png'
import profileUpdate from '../PlpScreen/images/profileUpdate.png'
import referFriend from '../PlpScreen/images/referfriend.png'
import mobileWallet from '../PlpScreen/images/Mobilewallet.jpeg'
import shareProduct from '../PlpScreen/images/shareProduct.jpeg'
import giftVoucher from '../PlpScreen/images/giftVoucher.png';
import coffee from '../PlpScreen/images/coffee.png';
import pizzaCoupons from '../PlpScreen/images/pizzaCoupons.png';
import cashback1 from '../PlpScreen/images/cashback1.png'
import flightsimage from '../PlpScreen/images/flightsimage.png'
import thirtyOFF from '../PlpScreen/images/thirtyOFF.png'
import cardScratch from '../PlpScreen/images/cardScratch.png'
import { useCartContext } from '../Context/WomenContext';

const RedeemPoints = ({navigation}) => {

    const {userLoyaltyTier,availablePoints}=useCartContext();
    const {ip,token,popFromStack,pushToStack,
    emailId,gender,userName,
    currentPage, setCurrentPage,
        currentPageIndex,setCurrentPageIndex,
        currentPageIndexCategory,setCurrentPageIndexCategory,
        currentPageIndexCategory1,setCurrentPageIndexCategory1}=useLoginContext();  
        
    const forNavigate=(page)=>{
        console.log(page+" "+currentPage[currentPage.length-1]);
        if(currentPage && currentPage[currentPage.length-1]!==page){
          pushToStack(page);
          navigation.navigate(page)
        }else{
          popFromStack(navigation);
        }
      } 

      const data1 = [
        { id: '1', source: referFriend,title:'REFER YOUR\nFRIENDS',subTitle:'and earn 50 Reward\npoints for every referral',background:'#00A3A1'},
        { id: '2', source: profileUpdate,title:'COMPLETE YOUR PROFILE',subTitle:'and earn 20 Reward \npoints',background:'#0391da'},
        { id: '3', source: mobileWallet,title:'PAY USING \nWALLET',subTitle:'and earn 50 Reward points for every payment',background:'#ca2127'},
        { id: '4', source: shareProduct,title:'SHARE PRODUCTS \n& EARN',subTitle:'and earn 50 Reward points for every referral',background:'#00338c'},
      ];  

    const formattedTier = userLoyaltyTier ? userLoyaltyTier.charAt(0).toUpperCase() + userLoyaltyTier.slice(1).toLowerCase() : '';


    return (
    <View style={{flex:1,backgroundColor:'white'}}>
        <ScrollView>
        <View style={{marginLeft:'3%'}}>
        <Image source={kpmg} style={{width:100,height:100}}/>
        <TouchableOpacity style={{flexDirection:'row',alignItems:'center',}}
            onPress={()=>{popFromStack(navigation)}}>
            <View>
                <Image source={back}  
                     style={{marginLeft:3}}/>
            </View>
            <View style={{marginLeft:'3%'}}>
              <Text style={{color:'black'}}>Redeem Points</Text>
            </View>
        </TouchableOpacity>
        </View>
      <LinearGradient colors={['#00338D', '#00A3A1']} style={{width:'100%',height:80,borderRadius:12,marginTop:'6%'}}>
         <View style={{flexDirection:'row',justifyContent:'space-between',margin:'3%'}}>
           <Text style={{color:'white',marginLeft:'5%',fontSize:17}}>{userName}</Text>
           <Text style={{color:'white',fontSize:17}}>{formattedTier} Tier</Text>
         </View>
         <View style={{flexDirection:'row',justifyContent:'space-around',alignItems:'center',alignContent:'center'}}>
           <View style={{flexDirection:'row',alignItems:'center',alignContent:'center',marginRight:'34%'}}>
            <Text style={{color:'white',fontSize:12}}>Points earned till date: {availablePoints}</Text>
           </View>
           <View style={{flexDirection:'row',alignItems:'center',alignContent:'center',width:80}}>
            <Image source={coin1} style={{width:20,height:20}}/>
            <Text style={{color:'white',fontSize:17,fontWeight:'800'}}>  {availablePoints}</Text>
           </View>
         </View>
      </LinearGradient>   
      <SafeAreaView>
          <FlatList
          nestedScrollEnabled={true}
          data={data1}
          horizontal={true}
          showsHorizontalScrollIndicator={false} // Optional: hide horizontal scrollbar
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
          <TouchableOpacity style={{marginTop:'10%',marginRight:13}}>
           <View style={{marginTop:12,height:100,width:160,backgroundColor:item.background,marginLeft:'0.5%',borderTopLeftRadius:12,borderTopRightRadius:12}}>
             <View style={{marginStart:10}}>             
              <Text style={{color:'white',fontSize:14,marginTop:7,textAlign:'center'}}>{item.title}</Text>
              <Text style={{color:'white',fontSize:12,marginTop:14,textAlign:'center'}}>{item.subTitle}</Text>
             </View>
           </View> 
            <Image source={item.source} style={{width:160,height:100,borderBottomLeftRadius:12,borderBottomRightRadius:12,paddingRight:'2%'}} />
            <View style={{marginRight:12}}>
            </View>
          </TouchableOpacity>    
        )}
      />   
  </SafeAreaView>
    <Text style={{color:'#00338D',marginTop:'7%',fontWeight:'500',fontSize:16,marginLeft:'4%'}}>Redeem Points</Text>
    <Text style={{marginLeft:'4%',color:'#696666',fontWeight:'300',fontSize:13}}>
        Redeem your points below and get amazing{'\n'}benefits. 
        <Text style={{textDecorationLine:'underline',color:'#0391da',fontWeight:'400'}}>T&C applied</Text>
    </Text>
     <View style={{flexDirection:'row',borderWidth:0.4,borderColor:'grey',padding:'1%',width:'90%',alignSelf:'center',marginTop:'4%'}}>
        <View style={{borderWidth:0.4,borderColor:'grey',padding:'1%'}}>
           <Image source={coffee} style={{width:130,height:130}}/>
        </View>
        <View style={{marginLeft:'14%'}}>
         <Text style={{color:'#00338D',fontWeight:'400',marginTop:'6%'}}>Exchange your <Text style={{color:'#00A3A1'}}>200</Text>
             {'\n'}
             reward points and{'\n'}redeem a gift{'\n'}voucher worth<Text style={{color:'#00A3A1'}}> ₹999</Text>
         </Text>
          <Text style={{marginLeft:'14%',marginTop:'18%',fontSize:12}}>valid till 31 May, 2023</Text>
        </View>
     </View>
     <View style={{flexDirection:'row',borderWidth:0.4,borderColor:'grey',padding:'1%',width:'90%',alignSelf:'center',marginTop:'4%'}}>
        <View style={{borderWidth:0.4,borderColor:'grey',padding:'1%'}}>
           <Image source={giftVoucher} style={{width:130,height:130}}/>
        </View>
        <View style={{marginLeft:'14%'}}>
         <Text style={{color:'#00338D',fontWeight:'400',marginTop:'6%'}}>Exchange your <Text style={{color:'#00A3A1'}}>50</Text>
             {'\n'}
             reward points and{'\n'}redeem a coffee{'\n'}voucher worth<Text style={{color:'#00A3A1'}}> ₹399</Text>
         </Text>
          <Text style={{marginLeft:'14%',marginTop:'18%',fontSize:12}}>valid till 31 May, 2023</Text>
        </View>
     </View>
     <View style={{flexDirection:'row',borderWidth:0.4,borderColor:'grey',padding:'1%',width:'90%',alignSelf:'center',marginTop:'4%'}}>
        <View style={{borderWidth:0.4,borderColor:'grey',padding:'1%'}}>
           <Image source={pizzaCoupons} style={{width:130,height:130}}/>
        </View>
        <View style={{marginLeft:'14%'}}>
         <Text style={{color:'#00338D',fontWeight:'400',marginTop:'6%'}}>Exchange your <Text style={{color:'#00A3A1'}}>100</Text>
             {'\n'}
             reward points and{'\n'}redeem a food{'\n'}voucher worth<Text style={{color:'#00A3A1'}}> ₹499</Text>
         </Text>
          <Text style={{marginLeft:'14%',marginTop:'18%',fontSize:12}}>valid till 31 May, 2023</Text>
        </View>
     </View>
     <Text style={{color:'#00338D',marginTop:'4%',fontWeight:'500',fontSize:16,marginLeft:'4%'}}>Upcoming Rewards</Text>
    
      <View style={{flexDirection:'row',justifyContent:'space-around',}}>
         <View style={{marginTop:'4%'}}>
            <Image source={cardScratch} style={{height:70,width:130,borderRadius:12}}/>
            <Text style={{textAlign:'center',fontWeight:'300',fontSize:13,marginTop:'4%'}}>Scratch cards up to {'\n'}₹500</Text>
         </View>
         <View style={{marginLeft:'5%',marginTop:'4%'}}>
            <Image source={cashback1} style={{height:70,width:130,borderRadius:12}}/>
            <Text style={{textAlign:'center',fontWeight:'300',fontSize:13,marginTop:'4%',fontSize:13}}>Cashback worth{'\n'}₹5-₹1000 in your {'\n'}wallet</Text>
         </View>
      </View>
      <View style={{flexDirection:'row',justifyContent:'space-around',}}>
         <View style={{marginTop:'3%'}}>
            <Image source={flightsimage} style={{height:70,width:130,borderRadius:12}}/>
            <Text style={{textAlign:'center',fontWeight:'300',fontSize:13,marginTop:'4%'}}>Up to 40% off(Max {'\n'}₹3999) on domestic {'\n'}flights on...</Text>
         </View>
         <View style={{marginLeft:'5%',marginTop:'3%'}}>
            <Image source={thirtyOFF} style={{height:70,width:130,borderRadius:12}}/>
            <Text style={{textAlign:'center',fontWeight:'300',fontSize:13,marginTop:'4%'}}>Up to 30% off(Max {'\n'}₹1999) on hotel {'\n'}booking.</Text>
         </View>
      </View>
      <Text style={{fontSize:13,marginTop:'5%',textAlign:'center',marginBottom:'5%',color:'#00A3A1'}}>To know more, refer to 
       <Text style={{fontSize:13,textAlign:'center',textDecorationLine:'underline',fontWeight:'500'}}> Terms & Conditions </Text>
       here.
      </Text>

     </ScrollView>
    </View>
  )
}

export default RedeemPoints

const styles = StyleSheet.create({})