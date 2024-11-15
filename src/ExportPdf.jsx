import react, {useEffect} from 'react';
import {Alert} from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import {
  useColorScheme,
  ScrollView,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Platform,
  Linking,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import kpmg from './PlpScreen/images/kpmg.png';
import {useCartContext} from './Context/WomenContext';
import {useLoginContext} from './Login/LoginCartProvider';

const imagePath = kpmg;

const ExportPdf = ({route, navigation}) => {
  const {pageName} = route.params; // Access the pageName parameter
  const {OrderDate} = useLoginContext();
  const isDarkMode = useColorScheme() === 'dark';
  const {receiptData} = useCartContext();

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const createPDF = async () => {
    try {
      const orderItems = receiptData.orderItems;
      const appliedPromotions = receiptData.appliedPromotion || {}; // Get applied promotions from the receiptData

      // Calculate the total discount and total amount
      let totalDiscount = 0;
      let totalAmount = 0;

      orderItems.forEach(item => {
        const discount = item.product.discount || 0; // If discount is null, use 0
        const itemAmount = item.product.discountedPrice * item.quantity;

        totalDiscount += discount * item.quantity;
        totalAmount += itemAmount;
      });

      const tableRows = orderItems
        .map((item, index) => {
          // Get promotion details for the current item
          const promotions = Object.entries(appliedPromotions)
            .map(([code, value]) => `${code}: ₹${value.toFixed(2)}`)
            .join(', '); // Format promotions as "CODE: ₹VALUE"

          return `
                        <tr>
                            <td>${index + 1}</td>
                            <td>${item.product.title}</td>
                            <td>${item.size || 'N/A'}</td>
                            <td>₹${item.product.discountedPrice.toFixed(2)}</td>
                            <td>${item.quantity}</td>
                            <td>${item.product.taxRate || '18%'}</td>
                            <td>${item.product.taxType || 'N/A'}</td>
                            <td>₹${(item.product.taxAmount || 0).toFixed(
                              2,
                            )}</td>
                            <td>₹${item?.discountedPrice}</td>
                            <td>${
                              item.exchangeStatus
                                ? 'Exchanged'
                                : item.returnStatus
                                ? 'Returned'
                                : item.cancelStatus
                                ? 'Cancelled'
                                : receiptData?.orderStatus ==
                                  'PARTIAL_CANCELLED'
                                ? 'Confirmed'
                                : receiptData?.orderStatus
                            }</td>
<td>
  ${
    item?.product?.appliedPromotion && Object.keys(item?.product?.appliedPromotion).length > 0
      ? Object.entries(item?.product?.appliedPromotion)
          .map(([code, amount], index, arr) => `
          <div style="display: inline-block; margin-right: 10px; vertical-align: top;">
            <span style="font-weight: 600; font-size: 11px;">${code}:</span> ₹${amount.toFixed(2)}
            ${index < arr.length - 1 ? '<hr style="margin: 5px 0; border: 0; border-top: 1px solid #ccc;">' : ''}
          </div>
        `)
          .join('')
      : 'No promotions applied'
  }
</td>






                        </tr>
                    `;
        })
        .join(''); // To concatenate all rows into a single string

      const shippingAddressRow = `
            <tr>
                <td colspan="11"> <!-- Update colspan to match the new table structure -->
                    <strong>Shipping Address:</strong> ${
                      receiptData.shippingAddress.firstName
                    } ${receiptData.shippingAddress.lastName}, ${
        receiptData.shippingAddress.streetAddress
      }, ${receiptData.shippingAddress.city}, ${
        receiptData.shippingAddress.state
      }, ${receiptData.shippingAddress.zipCode || 'N/A'}, ${
        receiptData.shippingAddress.mobile
      }
                </td>
            </tr>
        `;

      // Add new rows for Total Discount and Total Amount
      const totalRows = `
            <tr>
                <td colspan="9" style="text-align: right;"><strong>Total Price:</strong></td>
                <td colspan="2">₹${
                  receiptData.totalPrice
                    ? receiptData.totalPrice.toFixed(2)
                    : '0.0'
                }</td>
            </tr>
                        <tr>
                <td colspan="9" style="text-align: right;"><strong>Total Items:</strong></td>
                <td colspan="2">${
                  receiptData.totalItem ? receiptData.totalItem : '0'
                }</td>
            </tr>
            <tr>
                <td colspan="9" style="text-align: right;color:'green"><strong>Total Saving:</strong></td>
                <td colspan="2" style=" color: green; font-weight: 400;">- ₹${receiptData.discounte.toFixed(
                  2,
                )}</td>
            </tr>
<tr>
  <td colspan="9" style="text-align: right;">
    <strong>Promotion Discount:</strong>
  </td>
<td colspan="2" style="color: green; font-weight: 400;">
  - ₹${receiptData.promotionDiscount ? receiptData.promotionDiscount : 0.0}
</td>

</tr>

            <tr>
                <td colspan="9" style="text-align: right;"><strong>Paid Amount:</strong></td>
                <td colspan="2">₹${receiptData.totalDiscountedPrice.toFixed(
                  2,
                )}</td>
            </tr>
        `;

      const timestamp = new Date().getTime(); // Get current timestamp
      let PDFOptions = {
        html: `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        font-size: 14px;
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
                            <p><strong>Invoice Date:</strong> ${OrderDate}</p>
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
                                <th>Tax Rate</th>
                                <th>Tax Type</th>
                                <th>Tax Amount</th>
                                <th>Total Amount</th>
                                <th>Status</th>
                                <th>Promotion</th> <!-- New Promotion header -->
                            </tr>
                        </thead>
                        <tbody>
                            ${tableRows}
                            ${shippingAddressRow}
                            ${totalRows} <!-- Add the total discount and amount rows -->
                        </tbody>
                    </table>

                    <div class="footer">
                        * ASSPL-KPMG  Services Pvt. Ltd., KPMG Retail India Pvt. Ltd. Customers desirous of availing input GST credit are requested to create a Business account and purchase on KPMG.in/business from Business eligible offers. Please note that this invoice is not a demand for payment. Page 1 of 2
                    </div>
                </div>
            </body>
            </html>`,
        fileName: `file_${timestamp}`,
        directory: Platform.OS === 'android' ? 'Downloads' : 'Documents',
      };
      let file = await RNHTMLtoPDF.convert(PDFOptions);
      console.log('File Object:', file);
      if (!file.filePath) return;
      // logic to view/download PDF
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  useEffect(() => {
    createPDF();
    setTimeout(() => {
      if (pageName == 'orderHome') {
        navigation.navigate('order');
      } else {
        navigation.navigate('orderStatus');
      }
    }, 100);
  }, []);

  return <></>;
};
export default ExportPdf;

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
