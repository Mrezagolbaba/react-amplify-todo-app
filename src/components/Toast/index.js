import Toast from 'react-native-root-toast';

const calcDuration = text => {
  const {length} = text.toString();
  // Assuming it will take 1 sec to read 16 character
  const duration = (length / 16) * 1000;
  return duration > 3000 ? duration : 3000;
};

const CustomeToast = (text, type) =>
  Toast.show(text, {
    type,
    duration: calcDuration(text),
    position: Toast.positions.BOTTOM,
    backgroundColor: type === 'danger' ? '#dd5454' : '#46bc14',
    textStyle: {
      fontFamily: 'Poppins-Medium',
      fontSize: 14,
    },
  });

export {CustomeToast as Toast};
