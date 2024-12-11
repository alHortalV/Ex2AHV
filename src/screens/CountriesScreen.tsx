import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useCountries} from '../hooks/useContinent';
import {CountryDetails} from '../types/CountryDetails';

type RootStackParamList = {
  Continents: undefined;
  Countries: {continent: string};
  CountryDetails: {country: CountryDetails};
};

type CountriesScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Countries'
>;

const CountriesScreen: React.FC<CountriesScreenProps> = ({
  route,
  navigation,
}) => {
  const {continent} = route.params;
  const {countries, loading, error} = useCountries(continent);

  const renderCountryItem = ({item}: {item: CountryDetails}) => (
    <TouchableOpacity
      style={styles.countryItem}
      onPress={() => navigation.navigate('CountryDetails', {country: item})}>
      <Image source={{uri: item.flag}} style={styles.flag} />
      <View style={styles.countryInfo}>
        <Text style={styles.countryName}>{item.name.common}</Text>
        <Text style={styles.countryCapital}>
          Capital: {item.capital ?? 'N/A'}
        </Text>
        <Text style={styles.countryCode}>{item.cca3}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Countries in {continent}</Text>

      {loading && <ActivityIndicator size="large" color="#007AFF" />}

      {error && <Text style={styles.error}>Error: {error}</Text>}

      <FlatList
        data={countries}
        keyExtractor={item => item.cca3}
        renderItem={renderCountryItem}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
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
    color: 'red',
    textAlign: 'center',
    marginVertical: 16,
  },
  countryItem: {
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  flag: {
    width: 50,
    height: 30,
    marginRight: 16,
    borderRadius: 4,
  },
  countryInfo: {
    flex: 1,
  },
  countryName: {
    fontSize: 16,
    fontWeight: '600',
  },
  countryCapital: {
    fontSize: 14,
    color: 'gray',
  },
  countryCode: {
    fontSize: 14,
    color: 'gray',
  },
});

export default CountriesScreen;
