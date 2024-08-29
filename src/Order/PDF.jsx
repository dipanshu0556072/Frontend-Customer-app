import React from 'react';
import { useColorScheme, SafeAreaView, StatusBar, ScrollView } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import { Alert } from 'react-native';
import { useLoginContext } from '../Login/LoginCartProvider';
import { useCartContext } from '../Context/WomenContext';

const PDF = () => {
  const { OrderDate } = useLoginContext();
  const { receiptData } = useCartContext();
  const isDarkMode = useColorScheme() === 'dark';

  const createPDF = async () => {
    try {
      const orderItems = receiptData.orderItems;
      // Generating table rows dynamically based on orderItems
      const tableRows = orderItems.map((item, index) => `
        <tr>
          <td>${index + 1}</td>
          <td>${item.product.title}</td>
          <td>${item.size || "N/A"}</td>
          <td>₹${item.product.discountedPrice.toFixed(2)}</td>
          <td>${item.quantity}</td>
          <td>₹${(item.discountedPrice).toFixed(2)}</td>
          <td>${item.product.taxRate || "18%"}</td>
          <td>${item.product.taxType || "N/A"}</td>
          <td>₹${(item.product.taxAmount || 0).toFixed(2)}</td>
          <td>₹${(item.discountedPrice  + (item.product.taxAmount || 0)).toFixed(2)}</td>
        </tr>
      `).join('');

      const shippingAddressRow = `
        <tr>
          <td colspan="10">
            <strong>Shipping Address:</strong> ${receiptData.shippingAddress.firstName} ${receiptData.shippingAddress.lastName}, ${receiptData.shippingAddress.streetAddress}, ${receiptData.shippingAddress.city}, ${receiptData.shippingAddress.state}, ${receiptData.shippingAddress.zipCode || "N/A"}, ${receiptData.shippingAddress.mobile}
          </td>
        </tr>
      `;

      const htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            /* CSS styles for PDF layout */
          </style>
        </head>
        <body>
          <!-- PDF content -->
          <table>
            <thead>
              <!-- Table headers -->
            </thead>
            <tbody>
              ${tableRows}
              ${shippingAddressRow}
            </tbody>
          </table>
        </body>
        </html>
      `;

      const options = {
        html: htmlContent,
        fileName: 'file',
        directory: Platform.OS === 'android' ? 'Downloads' : 'Documents',
      };

      const file = await RNHTMLtoPDF.convert(options);
      console.log('File Object:', file);
      if (!file.filePath) return;
      Alert.alert('PDF created successfully!', file.filePath);
    } catch (error) {
      console.log('Failed to generate PDF', error.message);
      Alert.alert('Error', 'Failed to generate PDF');
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: isDarkMode ? Colors.darker : Colors.lighter }}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={isDarkMode ? Colors.darker : Colors.lighter}
      />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        {/* Your PDF generation button or trigger */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default PDF;
