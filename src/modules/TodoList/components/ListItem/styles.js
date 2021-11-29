import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  box: {
    backgroundColor: '#d9d9d9',
    width: '100%',
    maxWidth: 350,
    borderRadius: 10,
    height: 150,
    flexDirection: 'row',
    padding: 10,
    margin: 5,
  },
  leftSection: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  // taskImgView: {
  //   backgroundColor: 'white',
  //   height: 70,
  //   width: 70,
  //   borderRadius: 8,
  // },
  taskImg: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  des: {
    marginHorizontal: 10,
    flex: 1,
  },
  btn: {
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    width: 'auto',
  },
  ShareBtn: {
    backgroundColor: '#0077b5',
    marginTop: 'auto',
    borderRadius: 8,
  },
  deleteBtn: {
    backgroundColor: '#d11a2a',
    borderRadius: 8,
    marginTop: 'auto',
  },
});
