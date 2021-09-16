import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Home from './src/pages/home/Home';

import Places from './src/pages/places/Places';
import PlacesComments from './src/pages/places/PlacesComments';


import AppContextProvider from './src/utils/Context';

import Bienvenida from './src/pages/bienvenida';
import Homelugares from './src/pages/homeLugares';
import AddComment from './src/pages/places/AddComment';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <AppContextProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Bienvenida}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="Homelugares"
            component={Homelugares}
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
            name="AddComment"
            component={AddComment}
            options={{headerShown: false}}
          />



        </Stack.Navigator>
      </NavigationContainer>
    </AppContextProvider>
  );
}

export default App;
