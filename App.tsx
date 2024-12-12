import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DarkRWhiteModeProvider } from './src/theme/DarkRWhiteMode';
import RegionScreen from './src/screens/RegionScreen';
import CountriesScreen from './src/screens/CountriesScreen';
import CountryDetailsScreen from './src/screens/DetailsScreen';
import { CountryDetails } from './src/config/types/CountryDetails';

type RootStackParamList = {
  Continents: undefined;
  Countries: { continent: string };
  CountryDetails: { country: CountryDetails };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <DarkRWhiteModeProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Continents">
          <Stack.Screen
            name="Continents"
            component={RegionScreen}
            options={{ title: 'Continent Screen AHV' }}
          />
          <Stack.Screen
            name="Countries"
            component={CountriesScreen}
            options={{ title: 'Countries Screen' }}
          />
          <Stack.Screen
            name="CountryDetails"
            component={CountryDetailsScreen}
            options={{ title: 'Country Details Screen' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </DarkRWhiteModeProvider>
  );
};

export default App;
