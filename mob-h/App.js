import 'react-native-gesture-handler';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ThemeProvider } from './ThemeContext';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import TaskScreen from './screens/TaskScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <GestureHandlerRootView>
      <ThemeProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name='Inicio' component={HomeScreen} />
            <Stack.Screen name='Filtrado y busqueda' component={ProductScreen} />
            <Stack.Screen name='Tareas' component={TaskScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}