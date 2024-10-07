import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import cross from '../PlpScreen/images/close.png';

const SupplierModal = ({
  isSupplierModalVisible,
  toggleSupplierModal,
  product,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isSupplierModalVisible}
      onRequestClose={toggleSupplierModal}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Supplier Information</Text>
            <TouchableOpacity onPress={toggleSupplierModal}>
              <Image source={cross} style={styles.closeIcon} />
            </TouchableOpacity>
          </View>
          <View>
            <Text style={styles.modalText}>
              {product.seller} is Modern jeans began to appear in the 1920s, but
              sales were largely confined to the working people of the western
              United States, such as cowboys, lumberjacks, and railroad workers.
              {product.seller} jeans apparently were first introduced to the
              East during the dude ranch craze of the 1930s, when vacationing
              Easterners returned home with tales (and usually examples) of the
              hard-wearing pants with rivets. Another boost came in World War
              II, when blue jeans were declared an essential commodity and were
              sold only to people engaged in defense work.
            </Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    height: '60%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {color: 'black', fontSize: 18, fontWeight: '400'},
  closeIcon: {width: 13, height: 14},
  modalText: {padding: '5%', marginTop: '14%'},
});

export default SupplierModal;
