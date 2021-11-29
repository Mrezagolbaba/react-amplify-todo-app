import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  box: {
    backgroundColor: '#d9d9d9',
    width: '100%',
    maxWidth: 350,
    borderRadius: 10,
    flexDirection: 'row',
    padding: 10,
    margin: 5,
  },
  des: {
    marginHorizontal: 10,
  },
  ShareBtn: {
    backgroundColor: '#b3d9ff',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    marginTop: 'auto',
  },
  shareText: {
    fontSize: 22,
  },
  scroll: {
    alignItems: 'center',
    paddingVertical: 40,
    flexGrow: 1,
  },
  titleInput: {
    height: 36,
    fontSize: 14,
    borderBottomWidth: 1,
    borderColor: '#cccccc',
  },
  descriptionInput: {
    fontSize: 16,
  },
  newTodoInput: {
    height: 48,
    padding: 10,
    // width: '90%',
  },
  input: {
    height: 59,
    margin: 12,
    borderWidth: 1,
    borderColor: '#cccccc',
    padding: 10,
    width: '90%',
    borderRadius: 8,
  },
  modalBtns: {
    flexDirection: 'row',
  },
  btn: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 5,
    margin: 10,
    minWidth: 100,
    alignItems: 'center',
  },
  cancel: {borderColor: '#990000'},
  sendText: {color: 'white'},
  cancelText: {color: '#990000'},
  send: {backgroundColor: '#3366ff', borderColor: '#3366ff'},
});
