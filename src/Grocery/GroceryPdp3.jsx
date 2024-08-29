// import React, { constructor, useState } from 'react';
// import TopBar from '../PlpScreen/TopBar';
// import { Image, Text, View ,ScrollView,StyleSheet, TextInput,SafeAreaView} from 'react-native';
// import back from '../PlpScreen/images/back.png';
// import { RadioButton } from 'react-native-paper';
// import { SelectList } from 'react-native-dropdown-select-list';
// import CheckBox from '@react-native-community/checkbox';

// export default function GroceryPdp3()
// {
//     const [checked, setChecked] = useState('first'); // Initialize the checked state
//     const [selected, setSelected] = React.useState("");
  
//       const Subscriptiondata = [
//         {key:'1', value:'KPMG Plus Plan',},
//         {key:'2', value:'KPMG Super Plan'},
//         {key:'3', value:'KPMG Premium Plan'},
//         ]
//      return (
//         <>
//            <TopBar/>
//            <View style={{flexDirection:'row',alignItems:'center'}}>
//              <View>
//                 <Image source={back} style={{marginLeft:12}}/>
//              </View>
//              <View>
//                <Text style={{paddingLeft:10}}>Schedule Delivery</Text>              
//              </View>
//            </View>
//           <ScrollView>
//             <Text style={styles.head}>Subscription Type</Text>
//              <View style={{flexDirection:'row',marginLeft:0,justifyContent:'space-evenly'}}>
//                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//                   <RadioButton
//                     value="first"
//                     status={checked === 'first' ? 'checked' : 'unchecked'}
//                     onPress={() => setChecked('first')}
//                   />
//                   <Text>Daily</Text>
//                </View>
//                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//                   <RadioButton
//                     value="second"
//                     status={checked === 'second' ? 'checked' : 'unchecked'}
//                     onPress={() => setChecked('second')}
//                   />
//                  <Text>Weekly</Text>
//                </View>
//                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//                   <RadioButton
//                     value="third"
//                     status={checked === 'third' ? 'checked' : 'unchecked'}
//                     onPress={() => setChecked('third')}
//                   />
//                   <Text>Monthly</Text>
//               </View>
//               <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//                   <RadioButton
//                     value="fourth"
//                     status={checked === 'fourth' ? 'checked' : 'unchecked'}
//                     onPress={() => setChecked('fourth')}
//                   />
//                 <Text>Custom</Text>
//               </View>
//              </View>         
//               <View style={styles.dropList}>
//                 <Text style={{color:'#00338D',fontSize:15,paddingBottom:'2%'}}>Select a Subscription Plan</Text>
//                   <SelectList 
//                     setSelected={(val) => setSelected(val)} 
//                     data={Subscriptiondata} 
//                     save="value"
//                 />            

//           </View>
//            <View style={styles.dropList}>
//            <Text style={{color:'#00338D',fontSize:20,paddingBottom:'2%',fontWeight:'500'}}>Schedule Delivery</Text>            
//             <Text style={{color:'#00338D',fontSize:15,paddingBottom:'2%'}}>Select a Date</Text>
//             <SelectList 
//              setSelected={(val) => setSelected(val)} 
//              data={Subscriptiondata} 
//              save="value"
//              />            
//             <Text style={{color:'#00338D',fontSize:15,paddingTop:'5%',paddingBottom:'2%'}}>Choose a Time Slot</Text>
//             <SelectList 
//              setSelected={(val) => setSelected(val)} 
//              data={Subscriptiondata} 
//              save="value"
//              />            
//           </View>
//           <View style={{padding:'5%'}}>
//              <Text style={{color:'#00338D',fontSize:15,paddingBottom:'2%'}}>Leave a message about your order</Text>
//                 <View style={styles.textAreaContainer} >
//                    <TextInput
//                      style={styles.textArea}
//                      placeholder="Type your message here..."
//                      placeholderTextColor="grey"
//                      numberOfLines={100}
//                      multiline={true}
//                    />
//                 </View>
//           </View>
           
//         </ScrollView>
//         </>
//     );
// }
// const styles={
//     container: {
//       },    
//     head:{
//       color:'#00338D',
//       fontWeight:'500',
//       padding:'4%',
//       fontSize:20,
//     },
//     dropList:{
//         width:'100%',
//         padding:20,
//     },
//     textAreaContainer: {
//         borderColor: 'grey',
//         borderWidth: 1,
//         padding: 5
//       },
//       textArea: {
//         height: 130,
//         textAlignVertical: 'top'
//       }
// }