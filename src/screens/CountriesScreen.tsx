import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCountries } from '../hooks/useCountries';
import { CountryDetails } from '../config/types/CountryDetails';
import CountryComponent from '../components/CountryComponent';
import NavigationButton from '../components/NavigationButton';
import { DarkRWhiteModeContext } from '../theme/DarkRWhiteMode';

type RootStackParamList = {
  Continents: undefined;
  Countries: { continent: string };
  CountryDetails: { country: CountryDetails };
};

type CountriesScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Countries'
>;

const CountriesScreen: React.FC<CountriesScreenProps> = ({
  route,
  navigation,
}) => {
  const { continent } = route.params;
  const { countries, loading, error } = useCountries(continent);
  const { theme } = useContext(DarkRWhiteModeContext);

  const handlePress = (country: CountryDetails) => {
    navigation.navigate('CountryDetails', { country });
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme === 'light' ? '#f5f5f5' : '#333333',
        },
      ]}
    >
      <Text
        style={[
          styles.title,
          { color: theme === 'light' ? '#000000' : '#FFFFFF' },
        ]}
      >
        Countries in {continent}
      </Text>
      {loading && <ActivityIndicator size="large" color="#007AFF" />}
      {error && (
        <Text style={[styles.error, { color: theme === 'light' ? 'red' : '#FF0000' }]}>
          Error: {error}
        </Text>
      )}
      <FlatList
        data={countries}
        keyExtractor={item => item.cca3}
        renderItem={({ item }) => (
          <CountryComponent
            country={item}
            onPress={handlePress}
            theme={theme}
          />
        )}
        contentContainerStyle={[
          styles.listContainer,
          { backgroundColor: theme === 'light' ? '#FFFFFF' : '#555555' },
        ]}
      />
      <NavigationButton
        onPress={() => navigation.navigate('Continents')}
        theme={theme} // También puedes pasar el tema aquí
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 16,
    textAlign: 'center',
  },
  error: {
    textAlign: 'center',
    marginVertical: 16,
  },
});

export default CountriesScreen;
