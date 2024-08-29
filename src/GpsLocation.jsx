import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, PermissionsAndroid, ToastAndroid } from 'react-native';
import Geolocation from '@react-native-community/geolocation';

const GpsLocation = () => {
  const [location, setLocation] = useState(null);
  const [postalCode, setPostalCode] = useState(null);

  useEffect(() => {
    const requestLocationPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'This app requires access to your location.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          Geolocation.getCurrentPosition(
            position => {
              const { latitude, longitude } = position.coords;
              setLocation({ latitude, longitude });
              getPostalCode(latitude, longitude);
            },
            error => {
              console.error(error);
              ToastAndroid.show('Error getting location.', ToastAndroid.SHORT);
            },
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
          );
        } else {
          console.log('Location permission denied');
          ToastAndroid.show('Location permission denied.', ToastAndroid.SHORT);
        }
      } catch (err) {
        console.warn(err);
        ToastAndroid.show('Error requesting location permission.', ToastAndroid.SHORT);
      }
    };

    requestLocationPermission();
  }, []);

  console.log("Latitude"+location.latitude+"\n"+"Longitude"+location.longitude);
  const getPostalCode = async (latitude, longitude) => {
    try {
      const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`;
      const response = await fetch(url);
      const data = await response.json();
      if (data.address && data.address.postcode) {
        setPostalCode(data.address.postcode);
      } else {
        setPostalCode('Postal code not found');
      }
    } catch (error) {
      console.error(error);
      setPostalCode('Error fetching postal code');
    }
  };

  return (
    <View style={styles.container}>
      {location && (
        <Text>
          Latitude: {location.latitude}, Longitude: {location.longitude}
        </Text>
      )}
      {postalCode && <Text>Postal Code: {postalCode}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default GpsLocation;
