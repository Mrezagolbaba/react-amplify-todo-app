import React from 'react';
import {Text} from 'react-native';

export const Label = ({style = {}, color = '#1a3d56', flex, children, ...rest}) => (
  <Text
    style={[
      {
        fontSize: 16,
        color,
        textAlign: 'left',
        flex,
      },
      style,
    ]}
    {...rest}>
    {children}
  </Text>
);
