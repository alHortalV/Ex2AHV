import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  useWindowDimensions,
} from 'react-native';
import {WebView} from 'react-native-webview';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useCountryByName} from '../hooks/useDataCountry';
import {CountryDetails} from '../types/CountryDetails';
import NavigationButton from '../components/NavigationButton';

type RootStackParamList = {
  Continents: undefined;
  Countries: {continent: string};
  CountryDetails: {country: CountryDetails};
};

type CountryDetailsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'CountryDetails'
>;

const CountryDetailsScreen: React.FC<CountryDetailsScreenProps> = ({
  route,
  navigation,
}) => {
  const {country: initialCountry} = route.params;
  const {country, loading, error} = useCountryByName(
    initialCountry.name.common,
  );
  const {height} = useWindowDimensions();

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (error || !country) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Error Loading Country</Text>
      </View>
    );
  }

  const currencies = country.currencies
    ? Object.values(country.currencies)
        .map(curr => `${curr.name} (${curr.symbol})`)
        .join(', ')
    : 'N/A';

  const languages = country.languages
    ? Object.values(country.languages).join(', ')
    : 'N/A';

  const mapUrl =
    country.latlng && country.latlng.length === 2
      ? `https://www.openstreetmap.org/export/embed.html?bbox=${
          country.latlng[1] - 2
        },${country.latlng[0] - 2},${country.latlng[1] + 2},${
          country.latlng[0] + 2
        }`
      : null;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Details</Text>

      <View style={styles.detailContainer}>
        <Text style={styles.detailText}>Region: {country.region}</Text>
        <Text style={styles.detailText}>Subregion: {country.subregion}</Text>
        <Text style={styles.detailText}>
          Capital: {country.capital?.[0] || 'N/A'}
        </Text>
        <Text style={styles.detailText}>
          Population: {country.population.toLocaleString()}
        </Text>
        <Text style={styles.detailText}>
          Area: {country.area.toLocaleString()} km²
        </Text>
        <Text style={styles.detailText}>Languages: {languages}</Text>
        <Text style={styles.detailText}>Currencies: {currencies}</Text>
        <Text style={styles.detailText}>
          Coordinates: {country.latlng?.[0].toFixed(2)}°N,{' '}
          {country.latlng?.[1].toFixed(2)}°E
        </Text>
      </View>

      <View style={styles.mapContainer}>
        <Text style={styles.mapTitle}>Location</Text>
        {mapUrl ? (
          <WebView
            source={{uri: mapUrl}}
            style={[styles.map, {height: height * 0.3}]}
            scalesPageToFit={true}
          />
        ) : (
          <Text style={styles.noMapText}>No map coordinates available</Text>
        )}
      </View>

      <NavigationButton onPress={() => navigation.navigate('Continents')} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  detailContainer: {
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 3,
  },
  detailText: {
    fontSize: 16,
    marginBottom: 8,
  },
  mapContainer: {
    marginTop: 16,
    borderRadius: 8,
    overflow: 'hidden',
  },
  mapTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  map: {
    width: '100%',
  },
  flagContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  flagText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  flagImage: {
    width: 100,
    height: 60,
    marginTop: 8,
  },
  noMapText: {
    textAlign: 'center',
    fontSize: 16,
    color: 'gray',
  },
  buttonContainer: {
    marginTop: 16,
    paddingHorizontal: 16,
  },
});

export default CountryDetailsScreen;
