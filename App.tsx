import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ContinentsScreen from './src/screens/ContinentScreen';
import CountriesScreen from './src/screens/CountriesScreen'; // Asegúrate de que la ruta de importación sea correcta

type RootStackParamList = {
  Continents: undefined;
  Countries: {continent: string}; // Añade la pantalla Countries y sus parámetros
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Continents">
        <Stack.Screen
          name="Continents"
          component={ContinentsScreen}
          options={{title: 'Continent Screen AHV'}}
        />
        <Stack.Screen
          name="Countries"
          component={CountriesScreen} // Agrega CountriesScreen aquí
          options={{title: 'Countries Screen'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
