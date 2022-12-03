import * as React from 'react';
import Navigation from './src/navigation';
import {LogBox} from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import store from './src/store/configureStore';

const App = () => {
  return (
    <Provider store={store}>
        <NavigationContainer>
          <Navigation />
        </NavigationContainer>
    </Provider>
  );
};

export default App;
