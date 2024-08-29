import React from 'react';
import { WebView } from 'react-native-webview';

const HomeScreen = () => {
    const storeName = "SELECT CITY WALK KPMG RETAIL - SHOP NO-56, FLOOR-3";
    const address = "A-3 Saket District Centre, District Centre, Sector 6, Pushp Vihar";
    const city = "NEW DELHI";
    const pincode = "110017";

    // Combine address details for Google Maps search
    const searchQuery = `${storeName}, ${address}, ${city}, ${pincode}`;

    // Create Google Maps URL with the search query
    const googleMapsURL = `https://maps.google.com/maps?q=${encodeURIComponent(searchQuery)}`;

    return (
        <WebView
            scalesPageToFit={true}
            bounces={false}
            javaScriptEnabled={true}
            automaticallyAdjustContentInsets={false}
            source={{ html: `<iframe width="100%" height="800" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="${googleMapsURL}&output=embed"></iframe>` }}
        />
    );
}

export default HomeScreen;
