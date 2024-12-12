import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {CountryDetails} from '../config/types/CountryDetails';

/**
 * Props para el componente CountryComponent.
 * @interface CountryItemProps
 * @property {CountryDetails} country - Detalles del país.
 * @property {(country: CountryDetails) => void} onPress - Función que se ejecuta al presionar el componente.
 * @property {'light' | 'dark'} theme - Tema del componente (claro u oscuro).
 */
interface CountryItemProps {
  country: CountryDetails;
  onPress: (country: CountryDetails) => void;
  theme: 'light' | 'dark';
}

/**
 * Componente que representa un elemento de país.
 * Muestra el nombre, capital, lenguas y bandera del país.
 * Permite la interacción mediante un evento de pulsación.
 *
 * @param {CountryItemProps} props - Props del componente.
 * @returns {JSX.Element} - Elemento JSX que representa el país.
 */
const CountryComponent: React.FC<CountryItemProps> = ({
  country,
  onPress,
  theme,
}) => {
  // Obtiene las lenguas del país y las convierte en una cadena separada por comas.
  // Si no hay lenguas, se establece como 'N/A'.
  const languages = country.languages
    ? Object.values(country.languages).join(', ')
    : 'N/A';

  // Obtiene la capital del país. Si no hay capital, se establece como 'N/A'.
  const capital = country.capital ? country.capital : 'N/A';

  return (
    <TouchableOpacity
      style={[
        styles.countryItem,
        // Aplica el estilo correspondiente según el tema (claro u oscuro).
        theme === 'light' ? styles.light : styles.dark,
      ]}
      // Llama a la función onPress con el país seleccionado al presionar el componente.
      onPress={() => onPress(country)}>
      <Image
        source={{uri: country.flags.png}} // Carga la imagen de la bandera del país.
        style={[
          styles.flag,
          // Aplica el estilo de la bandera según el tema (claro u oscuro).
          theme === 'light' ? styles.lightFlag : styles.darkFlag,
        ]}
      />
      <View style={styles.countryInfo}>
        <Text
          style={[
            styles.countryName,
            // Aplica el estilo del texto según el tema (claro u oscuro).
            theme === 'light' ? styles.lightText : styles.darkText,
          ]}>
          {country.name.common} {/* Muestra el nombre común del país */}
        </Text>
        <Text
          style={[
            styles.countryCapital,
            theme === 'light' ? styles.lightText : styles.darkText,
          ]}>
          Capital: {capital} {/* Muestra la capital del país */}
        </Text>
        <Text
          style={[
            styles.countryLanguage,
            theme === 'light' ? styles.lightText : styles.darkText,
          ]}>
          Language(s): {languages}{' '}
          {/* Muestra las lenguas habladas en el país */}
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
    borderWidth: 1,
  },
  light: {
    backgroundColor: '#4CAF50',
    borderColor: '#000000',
  },
  dark: {
    backgroundColor: '#00796B',
    borderColor: '#FFFFFF',
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
    borderColor: '#FFFFFF',
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
    color: '#E8F5E9',
  },
  darkText: {
    color: '#E8F5E9',
  },
});

export default CountryComponent;
