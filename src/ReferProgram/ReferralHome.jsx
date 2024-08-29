import { StyleSheet, Text, View ,Image,TouchableOpacity,FlatList,TextInput,Modal, TouchableWithoutFeedback, ScrollView } from 'react-native'
import React,{useState,useEffect} from 'react'
import kpmg from '../PlpScreen/images/kpmglogo.png';
import back from '../PlpScreen/images/back1.png';
import referGift from '../PlpScreen/images/Group.png';
import { useLoginContext } from '../Login/LoginCartProvider';
import referral from '../PlpScreen/images/copy1.png'
import user from '../PlpScreen/images/user4.png'
import search from '../PlpScreen/images/search2.png'
import coin from '../PlpScreen/images/coins.png'
import cross from '../PlpScreen/images/close.png';
import Contacts from 'react-native-contacts';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();
import HomeBar from '../HomeBar';
import ProfileBar from '../ProfileBar';
import Home1 from '../Fashion';
import bell1 from '../PlpScreen/images/bell1.png';
import categories1 from '../PlpScreen/images/category1.png';
import home1 from '../PlpScreen/images/home1.png';
import user1 from '../PlpScreen/images/user1.png';
import Notification from '../Notification';
import axios from 'axios';
import Clipboard from '@react-native-clipboard/clipboard';


const ReferralHome = ({navigation}) => {
    const {ip,token,loginUserId,popFromStack,pushToStack,
        currentPage, setCurrentPage,
        currentPageIndex,setCurrentPageIndex,
        currentPageIndexCategory,setCurrentPageIndexCategory,
        updateUserName,setUpdateUserName,
  updateMobileName,setUpdateMobileName,
  updateEmail,setUpdateEmail,updateGender,setUpdateGender,
  updatePassword,setUpdatePassword}=useLoginContext();   
  
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const flatListData = [
    { id: 1, name: 'Arunesh',mobileNumber:'7417142574',invitation:'Invite' },
    { id: 2, name: 'Amit',mobileNumber:'8376984169',invitation:'Invite' },
    { id: 3, name: 'Deepanshu',mobileNumber:'8272837179',invitation:'Invite' },
    { id: 4, name: 'Bony',mobileNumber:'9411815610',invitation:'Accepted' },
    { id: 5, name: 'Krishan Mohan',mobileNumber:'8445262788',invitation:'Invite' },
    { id: 6, name: 'Vinay',mobileNumber:'8384873490',invitation:'Accepted' },
    { id: 7, name: 'Ashish',mobileNumber:'9634495610',invitation:'Invite' },
    { id: 8, name: 'Amit',mobileNumber:'9634495610',invitation:'Invite' },
    { id: 9, name: 'Deepanshu',mobileNumber:'9634495610',invitation:'Invite' },
    { id: 10, name: 'Bony',mobileNumber:'9634495610',invitation:'Accepted' },
    { id: 11, name: 'Krishan Mohan',mobileNumber:'9634495610',invitation:'Invite' },
    { id: 12, name: 'Vinay',mobileNumber:'9634495610',invitation:'Accepted' },
    // Add more items as needed
  ];
  const [sortModalVisible, setSortModalVisible] = useState(false);
  const handleSearch = (text) => {
    console.log('Search text:', text);
    const filtered = flatListData.filter(item =>
      item.name.toLowerCase().includes(text.toLowerCase())
    );
    console.log('Filtered data:', filtered);
    setFilteredData(filtered);
    setSearchText(text);
  };
  


  const handleSortModalClose = () => {
    // Additional logic to handle sorting or other actions
    setTimeout(() => {
      setSortModalVisible(false);
    }, 100);
  };
  const handleSortPress = () => {
    setSortModalVisible(true);
  };

  // const [contacts, setContacts] = useState([]);

  // useEffect(() => {
  //   fetchContacts();
  // }, []);

  // const fetchContacts = () => {
  //   Contacts.getAll((err, retrievedContacts) => {
  //     if (err) {
  //       console.log(err);
  //       return;
  //     }
  //     else{
  //       console.log("\n\nContact"+JSON.stringify(retrievedContacts));
  //     }
  //   });
  // };

  const [userReferralCode,setUserReferralCode]=useState("");  
  async function getReferralCode(){
    try{
      const response=await axios.get(`http://${ip}:5454/auth/referral-link/${loginUserId}`,{  
        headers: {
        'Authorization': `Bearer ${token}`,
      },})
    
    // Set the referral code state
    setUserReferralCode(response.data.substring(response.data.indexOf("referralCode=") + 13));

  }
    catch(error){
      console.error('Error fetching data in getReferralCode() ProfileBar.jsx :', error);
    }
  }
  useEffect(()=>{
    getReferralCode();
  },[token]);

  const copyToClipboard = () => {
    Clipboard.setString(userReferralCode);
  };

    return (
    <View style={{flex:1,backgroundColor:'#00338D'}}>
       
       <Image source={kpmg} style={{width:140,height:80,alignSelf:'center',margin:'1%'}}/>
       <View style={{width:420,height:300,flexDirection:"row"}}>
         <View style={{width:'74%',}}>
         <TouchableOpacity style={{flexDirection:'row',alignItems:'center',marginTop:'5%'}}
            onPress={()=>{popFromStack(navigation)}}>
              <View>
                   <Image source={back}  
                     style={{marginLeft:14,width:20,height:20}}/>
              </View>
           </TouchableOpacity>
             <Text style={{color:'white',fontSize:17,marginLeft:'7%',marginTop:'14%'}}> 
             <Text style={{fontWeight:'600',fontSize:23}}>Hi,{updateUserName.split(' ')[0]}</Text>{'\n'}Invite and Earn 100 rewards points.</Text>
            <View style={{width:420,}}> 
             <View style={{marginTop:'2%',width:420,height:'29%',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                 <View style={{}}>
                  <View style={{flexDirection:'row',alignItems:'center',backgroundColor:'white',marginLeft:'4%',borderRadius:4,width:300,justifyContent:'space-between'}}>
                  <Text style={{marginLeft:'4%',color:'#00338D',fontSize:16}}>{userReferralCode}</Text>
                    <TouchableOpacity style={{margin:'3%',}} onPress={copyToClipboard}>
                      <Image source={referral} style={{width:20,height:20,}}/>
                    </TouchableOpacity>
                  </View>
                 </View>
                 <TouchableOpacity style={{backgroundColor:'#00A3A1',marginRight:'4%',height:40,borderRadius:4}}>
                    <Text style={{color:'white',fontSize:18,padding:'2.4%',textAlign:'center',}}>Share</Text>
                  </TouchableOpacity>

             </View>
               <View style={{height:1,backgroundColor:'white',marginTop:'3%',}}/>

             </View>
         </View>
         <Image source={referGift} style={{width:100,height:110}}/>
       </View>
       {/* <TextInput
        style={{ borderWidth: 1, borderColor: 'gray', padding: 10, marginBottom: 10 }}
        placeholder="Search..."
        onChangeText={handleSearch}
        value={searchText}
      /> */}
     <View style={{marginTop:'-24%',margin:'2%'}}>
      <View style={{flexDirection:'row',alignItems:'center',width:'100%',height:50,borderWidth:1,borderRadius:6,backgroundColor:'white'}}>
        <Image source={search} style={{width:30,height:30,margin:'2%'}}/>
        <Text>Search by Number or Name</Text>
      </View>
      

     <Text style={{color:'white',fontSize:18,marginLeft:'3%',margin:'3%'}}>All Contacts</Text>
      <View style={{borderTopLeftRadius:20,borderTopRightRadius:20,width:'98%',backgroundColor:'white'}}>
      <FlatList
        vertical={true}
        nestedScrollEnabled={true}
        data={filteredData.length > 0 ? filteredData : flatListData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
         <>
          <View style={{backgroundColor:'white'}}>
            <View style={{flexDirection:'row',justifyContent:'space-between',margin:'4%'}}>
                <View style={{flexDirection:'row',alignContent:'center',alignItems:'center'}}>
                    <Image source={user} style={{width:40,height:40,}}/>
                  <View style={{ padding: 10,marginLeft:'3%' }}>
                   <Text style={{color:'black',fontSize:18}}>{item.name}</Text>
                   <Text style={{}}>{item.mobileNumber}</Text>
                  </View>
                </View>
             <TouchableOpacity style={{backgroundColor:'#dfe7f7',borderRadius:6,width:100}} onPress={handleSortPress}>
               <Text style={{color:'#00338D',fontWeight:'600',textAlign:'center',margin:'20%'}}>{item.invitation}</Text>
              </TouchableOpacity>
            </View>
          </View>
         </> 
        )}
      />
      
      </View>
      
     </View>

     <Modal animationType="slide" transparent={true} visible={sortModalVisible} onRequestClose={handleSortModalClose}>
          <TouchableWithoutFeedback onPress={handleSortModalClose}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent1}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1%',
                  }}>
                  <Text style={{ color: '#00338D', fontSize: 18,fontWeight:'bold',fontFamily:'montserrat',marginTop:'3%'}}></Text>
                  <TouchableOpacity onPress={handleSortModalClose}>
                    {/* <Text style={{ marginBottom: '4%' }}>╳</Text> */}
                    <Image source={cross} style={{ width: 13, height: 14 }} />
                  </TouchableOpacity>
                 
                </View>
                 <Image source={coin} style={{width:240,height:240,alignSelf:'center'}}/>
                 <Text style={{textAlign:'center',fontSize:18,marginTop:'1%',color:'#00338D',marginTop:'6%'}}>
                    <Text style={{fontWeight:'500',fontSize:24}}>Congratulations!{'\n'} </Text>
                     
                    You have just earned 100 reward points</Text>
                 <Text style={{textAlign:'center',marginTop:'20%',fontSize:16}}>One of your friends has joined by your referral{'\n'} code. Share more invitations to earn more.</Text>  
                 <TouchableOpacity style={{marginTop:'15%',width:'95%',backgroundColor:'#00338D',borderRadius:18}} onPress={handleSortModalClose}>
                   <Text style={{padding:'5%',fontSize:16,textAlign:'center',color:'white',fontWeight:'600'}}>INVITE ANOTHER</Text>
                 </TouchableOpacity> 
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

    </View>
  )
  function EmptyScreen() {
    return null; // Render nothing
  }
  function BottomNavigator(){
    return (
      <Tab.Navigator 
        initialRouteName="null"
        tabBarOptions={{
          activeTintColor: '#00338D',
          showIcon: true,
          labelStyle: {
            margin: 1,  
            fontSize: 10,
            marginBottom: 4
          },
          tabStyle: {
            height: 50,
          },
        }}
      >
        <Tab.Screen 
          name="HomeBar" 
          component={EmptyScreen}
          options={{
            headerShown: false,
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
              <Image 
                source={home1}
                style={{ width: 20, height: 20, tintColor: navigation.isFocused() ? 'grey' : color }}
              />
            ),
            tabBarLabelStyle: { // Add this property to change the label color
              color: 'grey', // Change the color to whatever color you prefer
              marginBottom:'3%'
            }
          }}
          listeners={{
            tabPress: () => {
              setCurrentPage('mainHome');
              navigation.navigate('mainHome');
            },
          }}
          
        />
        <Tab.Screen 
          name="Home1" 
          component={EmptyScreen} 
          options={{
            headerShown: false,
            tabBarLabel: 'Category',
            tabBarIcon: ({ color, size }) => (
              <Image 
                source={categories1}
                style={{ width: 20, height: 20, tintColor: navigation.isFocused() ? 'grey' : color }}
              />
            ),
            tabBarLabelStyle: { // Add this property to change the label color
              color: 'grey', // Change the color to whatever color you prefer
              marginBottom:'3%'
            }

          }}
          listeners={{
            tabPress: () => {
              navigation.navigate('Home1');
              setCurrentPage(['mainHome','Home1']);
            },
          }}
        />
        <Tab.Screen 
          name="Notification" 
          component={EmptyScreen} 
          options={{  
            headerShown: false,
            tabBarLabel: 'Notification',
            tabBarIcon: ({ color, size }) => (
              <Image 
                source={bell1}
                style={{ width: 20, height: 20, tintColor: navigation.isFocused() ? 'grey' : color }}
              />
            ),
            tabBarLabelStyle: { // Add this property to change the label color
              color: 'grey', // Change the color to whatever color you prefer
              marginBottom:'3%'
            }

          }}
          listeners={{
            tabPress: () => {
              // navigation.navigate('Notification');
            },
          }}
        />
        <Tab.Screen 
          name="Profile" 
          component={EmptyScreen} 
          options={{
            headerShown: false,
            // tabBarLabel: userprofile?.firstName,
            tabBarIcon: ({ color, size }) => (
              <Image 
                source={user1}
                style={{ width: 20, height: 20, tintColor: navigation.isFocused() ? 'grey' : color }}
              />
            ),
            tabBarLabelStyle: { // Add this property to change the label color
              color: 'grey', // Change the color to whatever color you prefer
              marginBottom:'3%'
            }

          }}
          listeners={{
            tabPress: () => {
              navigation.navigate('mainHome');
              setCurrentPage(['mainHome']);
            },
          }}
        />
      </Tab.Navigator>
    );
  }

}

export default ReferralHome

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent1: {
    width: '100%',
    height: '127%',
    marginTop:'155%',
    backgroundColor: 'white',
    padding: 20,
    bottom:0,
    position:'fixed',
    borderRadius: 10,
    backgroundColor:'white',
  },
})