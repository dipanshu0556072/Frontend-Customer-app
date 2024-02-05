import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useLoginContext } from './Login/LoginCartProvider'

const Test = () => {

  const {token}=useLoginContext(); 
  const base64Url = token.split('.')[1];
const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));

// Parse the JSON payload
const payload = JSON.parse(jsonPayload);

// Extract user ID
const userId = payload.sub; // 'sub' is a common claim used for user ID in JWTs

console.log(userId); 
  return (
    <View>
      <Text>Test</Text>
    </View>
  )
}

export default Test

const styles = StyleSheet.create({})