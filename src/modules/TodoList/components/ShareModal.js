import React, {useState} from 'react';
import {
  Modal,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';

import {sendMMS} from '../../../utils';
import {Toast} from '../../../components';
import {styles as sharedStyles} from './styles';

export const ShareModal = ({isVisible, close, item}) => {
  const [phoneNumber, setPhoneNumber] = useState();

  const [isSending, setSending] = useState(false);
  const handleSendMMS = () => {
    setSending(true);
    sendMMS({
      phoneNumber,
      img: item?.img,
      text: `${item?.name}: ${item?.description}`,
    })
      .then(() => {
        Toast('item successfully shared with MMS');
        close();
      })
      .catch(err => {
        Toast('Failed to share item with MMS');
        console.error({err});
      })
      .finally(() => {
        setSending(false);
      });
  };

  return (
    <Modal
      animationType="slide"
      visible={isVisible}
      style={{backgroundColor: 'red', height: '100%', alignSelf: 'center'}}
      onRequestClose={close}>
      <View style={{marginTop: 300, alignItems: 'center'}}>
        {item?.img && (
          <View style={styles.imgWrapper}>
            <Image style={styles.img} source={{uri: item.img}} />
          </View>
        )}
        <View style={{marginRight: 'auto', marginLeft: 36}}>
          <Text style={sharedStyles.shareText}>title: {item?.name}</Text>
          <Text style={sharedStyles.shareText}>
            description: {item?.description}
          </Text>
        </View>
        <TextInput
          style={sharedStyles.input}
          onChangeText={setPhoneNumber}
          value={phoneNumber}
          placeholder="Phone number"
          keyboardType="numeric"
        />
        <View style={sharedStyles.modalBtns}>
          <TouchableOpacity
            style={[sharedStyles.btn, sharedStyles.cancel]}
            onPress={close}>
            <Text style={sharedStyles.cancelText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[sharedStyles.btn, sharedStyles.send]}
            onPress={handleSendMMS}
            disabled={isSending}>
            <Text style={sharedStyles.sendText}>
              {isSending ? 'Sending' : 'Send'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  imgWrapper: {
    borderRadius: 8,
    overflow: 'hidden',
    width: 112,
    height: 112,
    marginRight: 'auto',
    marginLeft: 36,
    marginBottom: 16,
  },
  img: {
    width: '100%',
    height: '100%',
  },
});
