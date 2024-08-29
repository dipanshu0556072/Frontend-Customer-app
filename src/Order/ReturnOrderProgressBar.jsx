import { View, Text, TouchableOpacity, Animated } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { useLoginContext } from '../Login/LoginCartProvider';
const ReturnOrderProgressBar = () => {

  const {changeOrderStatus,OrderDate}=useLoginContext();

  const [selectedStep, setSelectedStep] = useState(0);
  const progress1 = useRef(new Animated.Value(0)).current;
  const progress2 = useRef(new Animated.Value(0)).current;
  const progress3 = useRef(new Animated.Value(0)).current;
  const heightInterpolate = (progress) => {
    return progress.interpolate({
      inputRange: [0, 100],
      outputRange: [0, 50], // Adjust the height value as needed
    });
  };


  useEffect(()=>{
    if(changeOrderStatus==='SHIPPED'){
      start1();
      setTimeout(()=>{
        setSelectedStep(selectedStep+2);
      },2000);
      // setTimeout(()=>{
      //   start2();
      // },3000);
      // setTimeout(()=>{
      //   setSelectedStep(3);
      // },6000);
    }
    if(changeOrderStatus==='DELIVERED'){
      start1();
      setTimeout(()=>{
        setSelectedStep(selectedStep+2);
      },2000);
      setTimeout(()=>{
        start2();
      },2000);
      setTimeout(()=>{
        setSelectedStep(3);
      },5000);
    }
    // if(changeOrderStatus==='CANCELLED'){
    //   start1();
    //   setTimeout(()=>{
    //     setSelectedStep(selectedStep+2);
    //   },2000);
    //   setTimeout(()=>{
    //     start2();
    //   },2000);
    //   setTimeout(()=>{
    //     setSelectedStep(3);
    //   },4000);
    //   setTimeout(()=>{
    //     start3();
    //   },4000);

    //   setTimeout(()=>{
    //     setSelectedStep(6);
    //   },6000);
    // }

  },[changeOrderStatus,]);
  const start1 = () => {
    Animated.timing(progress1, {
      toValue: 100,
      duration: 2000,
      useNativeDriver: false,
    }).start(() => {
      // This callback is executed when the animation completes
      // setSelectedStep(selectedStep + 1);
    });
  };

  const start2 = () => {
    Animated.timing(progress2, {
      toValue: 100,
      duration: 2000,
      useNativeDriver: false,
    }).start();
  };

  const start3 = () => {
    Animated.timing(progress3, {
      toValue: 100,
      duration: 2000,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ width: '100%', alignItems: 'center', padding: 50 }}>
      <View style={{flexDirection:'row',width:'100%',alignItems:'center',marginRight:'24%'}}>
        <View
          style={{
            width: 30,
            height: 30,
            borderRadius: 15,
            backgroundColor: 'green',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ color: '#fff' }}>1</Text>
        </View>
         <Text style={{marginLeft:'34%',fontWeight:'600',color:'#00338D'}}>Items to return</Text>
         <Text style={{marginLeft:'25%'}}>{OrderDate}</Text>
        </View>

        <View style={{ width: 6, height: 50, backgroundColor: '#f2f2f2',marginRight:'114%'   }}></View>
        
        <View style={{flexDirection:'row',width:'100%',alignItems:'center',marginRight:'24%'}}>

        <View
          style={{
            width: 30,
            height: 30,
            borderRadius: 15,
            backgroundColor: selectedStep > 1 ? 'green' : 'grey',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ color: '#fff' }}>2</Text>
        </View>
        <Text style={{marginLeft:'34%',fontWeight:'600',color:selectedStep > 1 ? '#00338D' : 'grey'}}>Picked up    </Text>
        {
          selectedStep>1?
          <Text style={{marginLeft:'30%'}}>{OrderDate}</Text>:
          <Text style={{marginLeft:'27%'}}></Text>
         }
        </View>

        <View style={{ width: 6,height: 50, backgroundColor: '#f2f2f2',marginRight:'114%'  }}></View>
        <View style={{flexDirection:'row',width:'100%',flexDirection:'row',alignItems:'center',marginRight:'24%'}}>
        <View
          style={{
            width: 30,
            height: 30,
            borderRadius: 15,
            backgroundColor: selectedStep > 2 ? 'green' : 'grey',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ color: '#fff' }}>3</Text>
        </View>
         <Text style={{marginLeft:'34%',fontWeight:'600',color:selectedStep > 2 ? '#00338D' : 'grey'}}>Return created</Text>
         {
          selectedStep>2?
          <Text style={{marginLeft:'27%'}}>{OrderDate}</Text>:
          <Text style={{marginLeft:'27%'}}></Text>
         }
        </View>
        {/* <View style={{ width: 6, height: 50,  backgroundColor: '#f2f2f2',marginRight:'114%'}}></View> */}
        <View style={{flexDirection:'row',width:'100%',alignItems:'center',marginRight:'24%'}}>

        {/* <View
          style={{
            width: 30,
            height: 30,
            borderRadius: 15,
            backgroundColor: selectedStep > 3 ? 'red' : 'grey',
            justifyContent: 'center',
            alignItems: 'center',

           
          }}
        >
          <Text style={{ color: '#fff', }}>4</Text>
        </View>
          <Text style={{marginLeft:'34%',fontWeight:'600',color:selectedStep > 3 ? 'red' : 'grey'}}>Order Cancelled</Text>
          {
          selectedStep>3?
          <Text style={{marginLeft:'27%'}}>{OrderDate}</Text>:
          <Text style={{marginLeft:'27%'}}></Text>
         } */}

        </View>
      </View>

      <View
        style={{
          width: '100%',
          alignItems: 'center',
          padding: 50,
          position: 'absolute',
          top: 0,
        }}
      >
    <Animated.View
  style={{
    width: 6,
    height: heightInterpolate(progress1),
    marginTop: 30,
    marginRight: '114%',
    backgroundColor: 'green',
  }}
></Animated.View>

<Animated.View
  style={{
    width: 6,
    height: heightInterpolate(progress2),
    marginTop: 30,
    marginRight: '114%',
    backgroundColor: 'green',
  }}
></Animated.View>

<Animated.View
  style={{
    width: 6,
    height: heightInterpolate(progress3),
    marginTop: 30,
    marginRight: '114%',
    backgroundColor: 'red',
  }}
></Animated.View>
      </View>

    </View>
  );
};

export default ReturnOrderProgressBar;
