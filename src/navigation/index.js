import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NativeBaseProvider} from 'native-base';
import Simpsons from '../screens/simpsons';
import Detail from '../screens/detail';
import AddNewCharacter from '../screens/addNewCharacter';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NativeBaseProvider>
      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: 'center',
        }}>
        <Stack.Screen name="Simpsons" component={Simpsons} />
        <Stack.Screen name="Details" component={Detail} />
        <Stack.Screen
          options={{
            headerTitle: 'Add New Character',
          }}
          name="AddNewCharacter"
          component={AddNewCharacter}
        />
      </Stack.Navigator>
    </NativeBaseProvider>
  );
}

export default App;
