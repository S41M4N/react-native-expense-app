import React from 'react';
import type {Node} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './app/src/screens/Home/index';
import AddForm from './app/src/screens/AddForm/index';
import Config from './app/src/Config';

const Stack = createNativeStackNavigator();

const commonHeaders = {
  headerStyle: {
    backgroundColor: Config.topbarColor,
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
};

const App: () => Node = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          animation: 'fade_from_bottom',
        }}>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="addForm"
          component={AddForm}
          options={{
            ...commonHeaders,
            headerTitle: 'Add Expense',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
