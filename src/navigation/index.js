import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {TodoList} from '../modules/TodoList';

export const RootNavigator = () => {
  const {Screen, Navigator} = createStackNavigator();

  return (
    <NavigationContainer>
      <Navigator screenOptions={{headerShown: false}}>
        <Screen component={TodoList} name="TodoList" />
      </Navigator>
    </NavigationContainer>
  );
};
