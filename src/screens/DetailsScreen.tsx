import React, {useContext} from 'react';
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
import {CountryDetails} from '../config/types/CountryDetails';
import NavigationButton from '../components/NavigationButton';
import CountryDetailsInfo from '../components/CountryDetailsComponent';
import {DarkRWhiteModeContext} from '../theme/DarkRWhiteMode';

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
  const {theme} = useContext(DarkRWhiteModeContext); // Obtenemos el tema del contexto

  if (loading) {
    return (
      <View
        style={[
          styles.container,
          {backgroundColor: theme === 'light' ? '#f5f5f5' : '#333333'},
        ]}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (error || !country) {
    return (
      <View
        style={[
          styles.container,
          {backgroundColor: theme === 'light' ? '#f5f5f5' : '#333333'},
        ]}>
        <Text
          style={[
            styles.title,
            {color: theme === 'light' ? '#000000' : '#FFFFFF'},
          ]}>
          Error Loading Country
        </Text>
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
          country.latlng[1]
        },${country.latlng[0]},${country.latlng[1]},${
          country.latlng[0] 
        }&map=5`
      : null;

  return (
    <ScrollView
      style={[
        styles.container,
        {backgroundColor: theme === 'light' ? '#f5f5f5' : '#333333'},
      ]}>
      <Text
        style={[
          styles.title,
          {color: theme === 'light' ? '#000000' : '#FFFFFF'},
        ]}>
        Details
      </Text>

      <View
        style={[
          styles.detailContainer,
          theme === 'light' ? styles.light : styles.dark,
        ]}>
        <CountryDetailsInfo country={country} theme={theme} />
      </View>

      <View
        style={[
          styles.mapContainer,
          theme === 'light' ? styles.light : styles.dark,
        ]}>
        <Text
          style={[
            styles.mapTitle,
            {color: theme === 'light' ? '#000000' : '#FFFFFF'},
          ]}>
          Location
        </Text>
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

      <NavigationButton
        onPress={() => navigation.navigate('Continents')}
        theme={theme}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    borderRadius: 8,
    elevation: 3,
  },
  light: {
    backgroundColor: '#ffffff',
  },
  dark: {
    backgroundColor: '#555555',
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
  noMapText: {
    textAlign: 'center',
    fontSize: 16,
    color: 'gray',
  },
});

export default CountryDetailsScreen;
