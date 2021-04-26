import 'react-native-gesture-handler';
console.disableYellowBox = true;
import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './src/pages/Home';
import Fases from './src/pages/Fases';
import Partidas from './src/pages/Partidas';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{ title: 'Campeonatos', headerTitleAlign: 'center', headerTitleStyle: { fontSize: 23 }}} />
        <Stack.Screen name="Fases" component={Fases} options={{ title: 'Fases', headerTitleAlign: 'center', headerTitleStyle: { fontSize: 23 }}} />
        <Stack.Screen name="Partidas" component={Partidas} options={{ title: 'Partidas', headerTitleAlign: 'center', headerTitleStyle: { fontSize: 23 }}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


