import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { CountryDetails } from '../config/types/CountryDetails';

interface CountryItemProps {
  country: CountryDetails;
  onPress: (country: CountryDetails) => void;
  theme: 'light' | 'dark';
}

const CountryComponent: React.FC<CountryItemProps> = ({ country, onPress, theme }) => {
  const languages = country.languages
    ? Object.values(country.languages).join(', ')
    : 'N/A';
  const capital = country.capital ? country.capital : 'N/A';

  return (
    <TouchableOpacity
      style={[styles.countryItem, theme === 'light' ? styles.light : styles.dark]}
      onPress={() => onPress(country)}
    >
      <Image
        source={{ uri: country.flags.png }}
        style={[styles.flag, theme === 'light' ? styles.lightFlag : styles.darkFlag]}
      />
      <View style={styles.countryInfo}>
        <Text style={[styles.countryName, theme === 'light' ? styles.lightText : styles.darkText]}>
          {country.name.common}
        </Text>
        <Text style={[styles.countryCapital, theme === 'light' ? styles.lightText : styles.darkText]}>
          Capital: {capital}
        </Text>
        <Text style={[styles.countryLanguage, theme === 'light' ? styles.lightText : styles.darkText]}>
          Language(s): {languages}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  countryItem: {
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  light: {
    backgroundColor: '#ffffff',
  },
  dark: {
    backgroundColor: '#555555',
  },
  flag: {
    width: 50,
    height: 30,
    marginRight: 16,
    borderRadius: 4,
  },
  lightFlag: {
    borderColor: '#000000',
    borderWidth: 1,
  },
  darkFlag: {
    borderColor: '#ffffff',
    borderWidth: 1,
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
  countryLanguage: {
    fontSize: 14,
    color: 'gray',
  },
  lightText: {
    color: '#333333',
  },
  darkText: {
    color: '#f0f0f0',
  },
});

export default CountryComponent;
