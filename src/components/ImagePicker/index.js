import React, {useState} from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {check, PERMISSIONS, request} from 'react-native-permissions';

const placeholderImg = require('../../../assets/uploader-placeholder.png');

import PickMethodModal from './PickMethodModal';
import {Toast} from '../Toast';

export const ImagePicker = ({img, setImg}) => {
  const [modalVisible, setModalVisible] = useState(false);

  async function checkCameraPermission() {
    check(
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.CAMERA
        : PERMISSIONS.ANDROID.CAMERA,
    ).then(result => {
      if (result === 'denied') {
        request(
          Platform.OS === 'ios'
            ? PERMISSIONS.IOS.CAMERA
            : PERMISSIONS.ANDROID.CAMERA,
        ).then(res => {
          if (res === 'denied') {
            Toast('The permissions is denied', 'danger');
          } else {
            launchCamera({}, response => {
              if (response.assets) {
                setImg(response.assets[0]);
              } else {
                console.warn('no uri');
              }
            });
          }
        });
      }
    });
  }

  const galleryLaunch = () => {
    launchImageLibrary({}, response => {
      if (response.assets) {
        setImg(response.assets[0]);
      } else {
        console.warn('no uri');
      }
    });
  };

  const cameraLaunch = () => {
    checkCameraPermission().then(() => {
      launchCamera({}, response => {
        if (response.assets) {
          setImg(response.assets[0]);
        } else {
          console.warn('no uri');
        }
      });
    });
  };

  return (
    <>
      <View style={styles.UploadFile}>
        <TouchableOpacity
          activeOpacity={0.4}
          onPress={() => {
            setModalVisible(true);
          }}
          style={styles.imgWrapper}>
          <Image
            style={styles.img}
            source={
              img && typeof img === 'string' ? {uri: img} : placeholderImg
            }
          />
        </TouchableOpacity>
      </View>
      <PickMethodModal
        visible={modalVisible}
        setModalVisible={setModalVisible}
        onCameraLaunch={cameraLaunch}
        onGalleryOpen={galleryLaunch}
      />
    </>
  );
};

const styles = StyleSheet.create({
  UploadFile: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    opacity: 0.5,
    alignSelf: 'center',
  },
  imgWrapper: {
    borderRadius: 8,
    overflow: 'hidden',
    width: 82,
    height: 82,
  },
  img: {
    width: '100%',
    height: '100%',
  },
});
