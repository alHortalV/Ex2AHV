import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ContinentsScreen from './src/screens/ContinentScreen';
import CountriesScreen from './src/screens/CountriesScreen';
import CountryDetailsScreen from './src/screens/CountryDetailsScreen';
import {CountryDetails} from './src/types/CountryDetails';
type RootStackParamList = {
  Continents: undefined;
  Countries: {continent: string};
  CountryDetails: {country: CountryDetails};
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
          component={CountriesScreen}
          options={{title: 'Countries Screen'}}
        />
        <Stack.Screen
          name="CountryDetails"
          component={CountryDetailsScreen}
          options={{title: 'Country Details Screen'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
