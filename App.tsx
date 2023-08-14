/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {Provider} from 'react-redux';
import store from './src/store';
import AppNavigator from './src/navigation/appNavigator';
import {DefaultTheme, PaperProvider} from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#438BBA',
    secondary: '#FFFFFF',
  },
};

const App = () => {
  return (
    <PaperProvider theme={theme}>
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    </PaperProvider>
  );
};

export default App;
