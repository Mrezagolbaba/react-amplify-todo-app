import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';

import {Label} from '../Label';

const RADIUS = 8;

export const Button = ({
  text = '',
  textColor = '#ffffff',
  style = {},
  onPress = () => {},
  ...rest
}) => (
  <TouchableOpacity
    activeOpacity={0.9}
    onPress={onPress}
    disabled={rest.disabledLegal}
    style={[
      styles.wrapper,
      rest.disabledLegal && styles.disabledLegal,
      style,
      rest.disabled && styles.disabledButton,
    ]}
    {...rest}>
    <Label style={styles.textbtn} color={textColor}>
      {text}
    </Label>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 56,
    borderRadius: RADIUS,
    backgroundColor: '#2c56b6',
  },
  disabledButton: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 56,
    // height: '100%',
    borderRadius: RADIUS,
    borderWidth: 1.5,
    borderColor: '#b6c1c8',
    backgroundColor: '#ffffff',
  },
  disabledLegal: {
    borderWidth: 1.5,
    borderColor: '#91a2ab',
    backgroundColor: '#ffffff',
  },
  textbtn: {
    textAlign: 'center',
  },
});
