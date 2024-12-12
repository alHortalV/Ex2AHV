import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {CountryDetails} from '../config/types/CountryDetails';

interface CountryDetailsInfoProps {
  country: CountryDetails; // Detalles del país.
  theme: 'light' | 'dark'; // Tema del componente (claro u oscuro).
}

const CountryDetailsComponent: React.FC<CountryDetailsInfoProps> = ({
  country,
  theme,
}) => {
  const currencies = country.currencies
    ? Object.values(country.currencies)
        .map(curr => `${curr.name} (${curr.symbol})`) // Devuelve las monedas y sus símbolos.
        .join(', ')
    : 'N/A';

  const languages = country.languages
    ? Object.values(country.languages).join(', ') // Devuelve las lenguas del país.
    : 'N/A';

  return (
    <View
      style={[
        styles.detailContainer,
        theme === 'light' ? styles.lightBackground : styles.darkBackground, // Aplica el fondo según el tema.
      ]}>
      {/* Muestra la región */}
      <Text
        style={[
          styles.detailText,
          theme === 'light' ? styles.lightText : styles.darkText, // Aplica estilo según el tema.
        ]}>
        Region: {country.region}
      </Text>
      {/* Muestra la subregión */}
      <Text
        style={[
          styles.detailText,
          theme === 'light' ? styles.lightText : styles.darkText,
        ]}>
        Subregion: {country.subregion}
      </Text>
      {/* Muestra la capital */}
      <Text
        style={[
          styles.detailText,
          theme === 'light' ? styles.lightText : styles.darkText,
        ]}>
        Capital: {country.capital?.[0] || 'N/A'}
      </Text>
      {/* Muestra la población */}
      <Text
        style={[
          styles.detailText,
          theme === 'light' ? styles.lightText : styles.darkText,
        ]}>
        Population: {country.population.toLocaleString()}
      </Text>
      {/* Muestra el área */}
      <Text
        style={[
          styles.detailText,
          theme === 'light' ? styles.lightText : styles.darkText,
        ]}>
        Area: {country.area.toLocaleString()} km²
      </Text>
      {/* Muestra las lenguas */}
      <Text
        style={[
          styles.detailText,
          theme === 'light' ? styles.lightText : styles.darkText,
        ]}>
        Languages: {languages}
      </Text>
      {/* Muestra las monedas */}
      <Text
        style={[
          styles.detailText,
          theme === 'light' ? styles.lightText : styles.darkText,
        ]}>
        Currencies: {currencies}
      </Text>
      {/* Muestra las coordenadas */}
      <Text
        style={[
          styles.detailText,
          theme === 'light' ? styles.lightText : styles.darkText,
        ]}>
        Coordinates: {country.latlng?.[0].toFixed(2)},{' '}
        {country.latlng?.[1].toFixed(2)}
      </Text>
    </View>
  );
};

// Estilos para el componente
const styles = StyleSheet.create({
  detailContainer: {
    padding: 16,
    borderRadius: 8,
    elevation: 3,
  },
  lightBackground: {
    backgroundColor: '#4CAF50',
    borderColor: '#000000',
  },
  darkBackground: {
    backgroundColor: '#00796B',
    borderColor: '#FFFFFF',
  },
  detailText: {
    fontSize: 16,
    marginBottom: 8,
  },
  lightText: {
    color: '#E8F5E9',
  },
  darkText: {
    color: '#E8F5E9',
  },
});

export default CountryDetailsComponent;
