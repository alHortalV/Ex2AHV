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
  Countries: {continent: string}; // Parámetro que recibe el continente para la pantalla de países.
  CountryDetails: {country: CountryDetails}; // Parámetro que recibe los detalles del país para la pantalla de detalles.
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

  // Función para manejar la navegación a la pantalla de detalles de un país.
  const handlePress = (country: CountryDetails) => {
    navigation.navigate('CountryDetails', {country}); // Navega a la pantalla de detalles del país.
  };

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: theme === 'light' ? '#E8F5E9' : '#263238'},
      ]}>
      <View style={styles.header}>
        <Text
          style={[
            styles.title,
            {color: theme === 'light' ? '#263238' : '#E8F5E9'},
          ]}>
          Countries in {continent}
        </Text>
        <DarkRWhiteComponent toggleTheme={toggleTheme} theme={theme} />
        {/* Componente para cambiar el tema */}
      </View>

      {loading && <ActivityIndicator size="large" color="#007AFF" />}
      {/* Muestra un cargando mientras se obtienen los datos */}

      {error && (
        <Text
          style={[
            styles.error,
            {color: theme === 'light' ? 'red' : '#FF0000'},
          ]}>
          Error: {error}
        </Text>
      )}
      {/* Muestra un mensaje de error si no se pueden obtener los países */}

      <FlatList
        data={countries}
        keyExtractor={item => item.cca3}
        renderItem={({item}) => (
          <CountryComponent
            country={item}
            onPress={handlePress}
            theme={theme}
          />
        )}
        contentContainerStyle={[
          styles.listContainer,
          {backgroundColor: theme === 'light' ? '#E8F5E9' : '#263238'},
        ]}
      />
      {/* Muestra la lista de países usando FlatList */}

      <NavigationButton
        onPress={() => navigation.navigate('Continents')}
        theme={theme}
      />
      {/* Botón de navegación a la pantalla de continentes */}
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
