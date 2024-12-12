import React, {useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useCountries} from '../hooks/useCountries';
import {CountryDetails} from '../config/types/CountryDetails';
import CountryComponent from '../components/CountryComponent';
import NavigationButton from '../components/NavigationButton';
import {DarkRWhiteModeContext} from '../theme/DarkRWhiteMode';
import DarkRWhiteComponent from '../components/DarkRWhiteComponent';

type RootStackParamList = {
  Continents: undefined;
  Countries: {continent: string}; // Parámetro para la pantalla de países, que recibe un continente.
  CountryDetails: {country: CountryDetails}; // Parámetro para la pantalla de detalles del país.
};

type CountriesScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Countries'
>; // Definición de las props para la pantalla de países.

const CountriesScreen: React.FC<CountriesScreenProps> = ({
  route,
  navigation,
}) => {
  const {continent} = route.params; // Obtiene el continente desde los parámetros de navegación.
  const {countries, loading, error} = useCountries(continent); // Llama al hook para obtener los países del continente.
  const {theme, toggleTheme} = useContext(DarkRWhiteModeContext); // Accede al contexto del tema.

  const handlePress = (country: CountryDetails) => {
    navigation.navigate('CountryDetails', {country}); // Navega a la pantalla de detalles del país.
  };

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: theme === 'light' ? '#E8F5E9' : '#263238'}, // Cambia el color de fondo según el tema.
      ]}>
      <View style={styles.header}>
        <Text
          style={[
            styles.title,
            {color: theme === 'light' ? '#263238' : '#E8F5E9'}, // Cambia el color del texto según el tema.
          ]}>
          Countries in {continent}
        </Text>
        <DarkRWhiteComponent toggleTheme={toggleTheme} theme={theme} />{' '}
        {/* Componente para cambiar el tema. */}
      </View>
      {loading && <ActivityIndicator size="large" color="#007AFF" />}{' '}
      {/* Muestra un cargando mientras se obtienen los datos. */}
      {error && (
        <Text
          style={[
            styles.error,
            {color: theme === 'light' ? 'red' : '#FF0000'}, // Muestra el error con un color apropiado.
          ]}>
          Error: {error}
        </Text>
      )}
      <FlatList
        data={countries}
        keyExtractor={item => item.cca3} // Utiliza el código de país como clave única.
        renderItem={({item}) => (
          <CountryComponent
            country={item}
            onPress={handlePress} // Al presionar un país, navega a la pantalla de detalles.
            theme={theme}
          />
        )}
        contentContainerStyle={[
          styles.listContainer,
          {backgroundColor: theme === 'light' ? '#E8F5E9' : '#263238'}, // Cambia el fondo de la lista según el tema.
        ]}
      />
      <NavigationButton
        onPress={() => navigation.navigate('Continents')} // Navega a la pantalla de continentes.
        theme={theme}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 16,
    textAlign: 'center',
  },
  listContainer: {
    padding: 16,
  },
  error: {
    textAlign: 'center',
    marginVertical: 16,
  },
});

export default CountriesScreen;
