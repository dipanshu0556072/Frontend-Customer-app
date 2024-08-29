import react,{useEffect} from 'react';
import { Alert } from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import { useColorScheme, ScrollView, SafeAreaView, StatusBar, StyleSheet, Text, View, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import kpmg from './PlpScreen/images/kpmg.png'
import { useCartContext } from './Context/WomenContext';
import { useLoginContext } from './Login/LoginCartProvider';

const imagePath = kpmg;



export default function ExportPdf({navigation}) {

  const {OrderDate}=useLoginContext();
  const isDarkMode = useColorScheme() === 'dark';
  const {receiptData,setReceiptData}=useCartContext();

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
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
            <strong>Tax Invoice/Bill of Supply/Cash Memo</strong>
            <br>
            (Original for Recipient)
          </div>
      
          <div class="details-container">
            <div class="left-details">
              <p><strong>Sold By:</strong> KPMG Private LLP</p>
              <p>8th Floor, Building, 10 B, DLF Tower 10th Rd, DLF Cyber City, DLF Phase 2, Sector 25, Gurugram, Haryana 122002, IN</p>
          
              <p><strong>GST Registration No:</strong> 29AACFV3325K1ZY</p>
              <p><strong>Order Number:</strong> 403-3225714-7676307</p>
              <p><strong>Invoice Number:</strong> IN-761</p>
              <p><strong>Order Date:</strong> ${OrderDate}</p>
              <p><strong>Invoice Details:</strong> KA-310565025-1920</p>
              <p><strong>Invoice Date:</strong>  ${OrderDate}</p>
            </div>
      
            <div class="right-details">
              <p><strong>Billing Address:</strong> ${receiptData.shippingAddress.firstName} ${receiptData.shippingAddress.lastName} ${receiptData.shippingAddress.streetAddress} ${receiptData.shippingAddress.city}  ${receiptData.shippingAddress.state},${receiptData.shippingAddress.zipCode},${receiptData.shippingAddress.mobile}, IN</p>
              <p><strong>State/UT Code:</strong> 29</p>
              <p><strong>Shipping Address:</strong> 8th Floor, Building, 10 B, DLF Tower 10th Rd, DLF Cyber City, DLF Phase 2, Sector 25, Gurugram, Haryana 122002, IN</p>
              <p><strong>State/UT Code:</strong> 29</p>
              <p><strong>Place of supply:</strong> GURUGRAM</p>
              <p><strong>Place of delivery:</strong> GURUGRAM</p>
            </div>
          </div>
      
          <table class="table-container">
            <thead>
              <tr>
                <th>Sl. No</th>
                <th>Description</th>
                <th>Unit</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Net Amount</th>
                <th>Tax Rate</th>
                <th>Tax Type</th>
                <th>Tax Amount</th>
                <th>Total Amount</th>
              </tr>
            </thead>
            <tbody>
            ${tableRows}
            ${shippingAddressRow}
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
    navigation.navigate('orderStatus');
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