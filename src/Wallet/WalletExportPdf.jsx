import react,{useEffect} from 'react';
import { Alert } from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import { useColorScheme, ScrollView, SafeAreaView, StatusBar, StyleSheet, Text, View, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useCartContext } from '../Context/WomenContext';
import { useLoginContext } from '../Login/LoginCartProvider';





export default function WalletExportPdf({navigation}) {

  const {OrderDate}=useLoginContext();
  const isDarkMode = useColorScheme() === 'dark';
  const {receiptData,transactionDetail}=useCartContext();

 const createPDF = async () => {
  try {

    const orderItems = transactionDetail;
    // Generating table rows dynamically based on orderItems
    const tableRows = orderItems.map((item, index) => {
      // Convert ISO 8601 date format to desired format
      const transactionDate = new Date(item.transactionDate);
      const formattedDate = transactionDate.toLocaleString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      });
    
      // Generate table row HTML
      return `
        <tr>
          <td>${index + 1}</td>
          <td style="width: 200px;">${item.transactionType === 'ADD_MONEY' ? 'Added to Wallet<br>Payment Method: <span style="font-size: smaller;">Debit Card</span>' : ''}<br>
          <small>${formattedDate}</small></td>
          <td>₹ ${item.amount}</td>
        </tr>`;
    }).join('');
    
//     const shippingAddressRow = `
//     <tr>
//       <td colspan="10">
//         <strong>Shipping Address:</strong> ${receiptData.shippingAddress.firstName} ${receiptData.shippingAddress.lastName}, ${receiptData.shippingAddress.streetAddress}, ${receiptData.shippingAddress.city}, ${receiptData.shippingAddress.state}, ${receiptData.shippingAddress.zipCode || "N/A"}, ${receiptData.shippingAddress.mobile}
//       </td>
//     </tr>
//   `;
  const timestamp = new Date().getTime(); // Get current timestamp
    let PDFOptions = {


      html: ` <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            font-family: Arial, sans-serif;
            font-size: 14px; /* Adjust the base font size */
          }
      
          .invoice-container {
            max-width: 800px;
            margin: 20px auto;
            padding: 20px;
            border: 1px solid #ccc;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
      
          .header {
            text-align: center;
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 20px;
          }
      
          .details-container {
            display: flex;
            justify-content: space-between;
            margin-bottom: 20px;
          }
      
          .left-details, .right-details {
            flex: 1;
          }
      
          .table-container {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
          }
      
          .table-container th, .table-container td {
            border: 1px solid #ccc;
            padding: 10px;
            text-align: left;
          }
      
          .total-section {
            margin-top: 20px;
            text-align: right;
          }
      
          .address-section {
            margin-top: 20px;
          }
      
          .footer {
            margin-top: 20px;
            text-align: center;
            font-size: 12px;
          }
        </style>
      </head>
      <body>
      
        <div class="invoice-container">
      
          <div class="header">
            <strong>Wallet Statement</strong>
            <br>
          </div>
      
          <table class="table-container">
            <thead>
              <tr>
                <th style="width: 80px;">Sl. No</th>
                <th style="width:200px;">Description</th>
                <th style="width:100px;">Amount</th>
              </tr>
            </thead>
            <tbody>
            ${tableRows}
            
            </tbody>
          </table>
      
          <div class="total-section">

          </div>
      
          <div class="footer">
            * ASSPL-KPMG  Services Pvt. Ltd., KPMG Retail India Pvt. Ltd. (only where KPMG Retail India Pvt. Ltd. fulfillment center is co-located) Customers desirous of availing input GST credit are requested to create a Business account and purchase on KPMG.in/business from Business eligible offers. Please note that this invoice is not a demand for payment. Page 1 of 2
          </div>
        </div>
      
      </body>
      </html>
      
      `,     
      fileName: `file_${timestamp}`,
      directory: Platform.OS === 'android' ? 'Downloads' : 'Documents',
    };
    let file = await RNHTMLtoPDF.convert(PDFOptions);
    console.log('File Object:', file);
    if (!file.filePath) return;
    Alert.alert('PDF created successfully!', file.filePath);
  } catch (error) {
    console.log('Failed to generate pdf', error.message);
    Alert.alert('Error', 'Failed to generate PDF');
  }
};

useEffect(()=>{
  createPDF();
  setTimeout(()=>{
    navigation.navigate('walletHistory');
  },100)
},[]);

  return (
  <>
  </>
  );
  // return (
  //   <SafeAreaView style={backgroundStyle}>
  //     <StatusBar
  //       barStyle={isDarkMode ? 'light-content' : 'dark-content'}
  //       backgroundColor={backgroundStyle.backgroundColor}
  //     />
  //     <ScrollView
  //       contentInsetAdjustmentBehavior="automatic"
  //       style={backgroundStyle}>
  //       <View
  //         style={[
  //           {
  //             backgroundColor: isDarkMode ? Colors.black : Colors.white,
  //           },
  //           styles.container1,
  //         ]}>
  //         <TouchableOpacity style={styles.button} onPress={createPDF}>
  //           <Text>Create PDF</Text>
  //         </TouchableOpacity>
  //       </View>
  //     </ScrollView>
  //   </SafeAreaView>
  // );
}

const styles = StyleSheet.create({
  container1: {
    alignItems: 'center',
    width: '100%',
    height: Dimensions.get('screen').height,
    justifyContent: 'center',
  },
  button: {
    padding: 16,
    backgroundColor: '#E9EBED',
    borderColor: '#f4f5f6',
    borderWidth: 1,
  },
});