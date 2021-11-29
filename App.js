/**
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';

import React from 'react';
import {withAuthenticator} from 'aws-amplify-react-native';
import config from './src/aws-exports';
import Amplify, {Auth} from 'aws-amplify';
import {RootNavigator} from './src/navigation';
import {MainProvider} from './src/context';

Amplify.configure({
  ...config,
  Analytics: {
    disabled: true,
  },
});
Auth.configure(config);

const App = () => {
  return (
    <MainProvider>
      <RootNavigator />
    </MainProvider>
  );
};

export default withAuthenticator(App);
