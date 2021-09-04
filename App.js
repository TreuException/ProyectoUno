import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Home from './src/pages/home/Home';

import Places from './src/pages/places/Places';
import PlacesComments from './src/pages/places/PlacesComments';

import Beaches from './src/pages/beaches/Beaches';

import AppContextProvider from './src/utils/Context';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <AppContextProvider>
      <NavigationContainer>
        <Stack.Navigator>

          <Stack.Screen
            name="Home"
            component={Home}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="PlacesComments"
            component={PlacesComments}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="Places"
            component={Places}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="Beaches"
            component={Beaches}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AppContextProvider>
  );
}

export default App;
