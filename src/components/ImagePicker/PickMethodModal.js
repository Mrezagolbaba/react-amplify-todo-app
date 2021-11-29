import React from 'react';
import {Modal, StyleSheet, View} from 'react-native';

import {Label} from '../Label';
import {Button} from '../Button';

const PickMethodModal = ({
  visible,
  setModalVisible,
  onCameraLaunch,
  onGalleryOpen,
}) => {
  const onPress = method => {
    if (method === 'gallery') {
      onGalleryOpen();
    } else {
      onCameraLaunch();
    }
    setModalVisible(!visible);
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent
        visible={visible}
        onRequestClose={() => {
          setModalVisible(!visible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Label style={styles.modalText}>
              How would you like to upload the picture?
            </Label>
            <Button
              style={styles.button}
              onPress={() => onPress('gallery')}
              text="Choose from gallery"
            />
            <Button
              style={styles.button}
              onPress={() => onPress('camera')}
              text="Launch camera"
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.96,
  },
  modalView: {
    margin: 20,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    width: 250,
    padding: 10,
    elevation: 2,
    marginVertical: 5,
    backgroundColor: '#2c56b6',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default PickMethodModal;
