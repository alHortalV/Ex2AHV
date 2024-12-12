import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CountryDetails } from '../config/types/CountryDetails';

interface CountryDetailsInfoProps {
  country: CountryDetails;
  theme: 'light' | 'dark';
}

const CountryDetailsComponent: React.FC<CountryDetailsInfoProps> = ({ country, theme }) => {
  const currencies = country.currencies
    ? Object.values(country.currencies)
        .map(curr => `${curr.name} (${curr.symbol})`)
        .join(', ')
    : 'N/A';

  const languages = country.languages
    ? Object.values(country.languages).join(', ')
    : 'N/A';

  return (
    <View style={[styles.detailContainer, theme === 'light' ? styles.lightBackground : styles.darkBackground]}>
      <Text style={[styles.detailText, theme === 'light' ? styles.lightText : styles.darkText]}>
        Region: {country.region}
      </Text>
      <Text style={[styles.detailText, theme === 'light' ? styles.lightText : styles.darkText]}>
        Subregion: {country.subregion}
      </Text>
      <Text style={[styles.detailText, theme === 'light' ? styles.lightText : styles.darkText]}>
        Capital: {country.capital?.[0] || 'N/A'}
      </Text>
      <Text style={[styles.detailText, theme === 'light' ? styles.lightText : styles.darkText]}>
        Population: {country.population.toLocaleString()}
      </Text>
      <Text style={[styles.detailText, theme === 'light' ? styles.lightText : styles.darkText]}>
        Area: {country.area.toLocaleString()} km²
      </Text>
      <Text style={[styles.detailText, theme === 'light' ? styles.lightText : styles.darkText]}>
        Languages: {languages}
      </Text>
      <Text style={[styles.detailText, theme === 'light' ? styles.lightText : styles.darkText]}>
        Currencies: {currencies}
      </Text>
      <Text style={[styles.detailText, theme === 'light' ? styles.lightText : styles.darkText]}>
        Coordinates: {country.latlng?.[0].toFixed(2)}°N, {country.latlng?.[1].toFixed(2)}°E
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  detailContainer: {
    padding: 16,
    borderRadius: 8,
    elevation: 3,
  },
  lightBackground: {
    backgroundColor: '#ffffff',
  },
  darkBackground: {
    backgroundColor: '#333333',
  },
  detailText: {
    fontSize: 16,
    marginBottom: 8,
  },
  lightText: {
    color: '#333333',
  },
  darkText: {
    color: '#f0f0f0',
  },
});

export default CountryDetailsComponent;
