import React, {useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
  useWindowDimensions,
} from 'react-native';
import {WebView} from 'react-native-webview';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useCountryByName} from '../hooks/useDataCountry';
import {CountryDetails} from '../config/types/CountryDetails';
import NavigationButton from '../components/NavigationButton';
import CountryDetailsInfo from '../components/CountryDetailsComponent';
import {DarkRWhiteModeContext} from '../theme/DarkRWhiteMode';
import DarkRWhiteComponent from '../components/DarkRWhiteComponent';

type RootStackParamList = {
  Continents: undefined;
  Countries: {continent: string};
  CountryDetails: {country: CountryDetails};
};

type CountryDetailsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'CountryDetails'
>; // Definición de las props para la pantalla de detalles del país.

const DetailsScreen: React.FC<CountryDetailsScreenProps> = ({
  route,
  navigation,
}) => {
  const {country: initialCountry} = route.params; // Obtiene el país desde los parámetros de navegación.
  const {country, loading, error} = useCountryByName(
    initialCountry.name.common,
  ); // Llama al hook para obtener los detalles del país.
  const {theme, toggleTheme} = useContext(DarkRWhiteModeContext); // Accede al contexto del tema.
  const {height} = useWindowDimensions(); // Obtiene las dimensiones de la ventana para ajustar el tamaño del mapa.

  if (loading) {
    // Muestra el cargando mientras se obtienen los detalles del país.
    return (
      <SafeAreaView
        style={[
          styles.container,
          {backgroundColor: theme === 'light' ? '#f5f5f5' : '#333333'},
        ]}>
        <ActivityIndicator size="large" color="#007AFF" />
      </SafeAreaView>
    );
  }

  if (error || !country) {
    // Muestra un mensaje de error si no se pueden obtener los detalles del país.
    return (
      <SafeAreaView
        style={[
          styles.container,
          {backgroundColor: theme === 'light' ? '#f5f5f5' : '#333333'},
        ]}>
        <Text
          style={[
            styles.header,
            {color: theme === 'light' ? '#000000' : '#FFFFFF'},
          ]}>
          Error Loading Country
        </Text>
      </SafeAreaView>
    );
  }

  // Genera la URL del mapa si las coordenadas están disponibles.
  const mapUrl =
    country.latlng && country.latlng.length === 2
      ? `https://www.openstreetmap.org/#map=5/${country.latlng[0]}/${country.latlng[1]}`
      : null;

  return (
    <SafeAreaView
      style={[
        styles.container,
        {backgroundColor: theme === 'light' ? '#E8F5E9' : '#263238'},
      ]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text
            style={[
              styles.header,
              {color: theme === 'light' ? '#263238' : '#E8F5E9'},
            ]}>
            Details
          </Text>
          <DarkRWhiteComponent toggleTheme={toggleTheme} theme={theme} />{' '}
        </View>
        <View>
          <CountryDetailsInfo country={country} theme={theme} />

          <Text
            style={[
              styles.header,
              {color: theme === 'light' ? '#263238' : '#E8F5E9'},
            ]}>
            Location
          </Text>

          {mapUrl ? (
            <WebView
              source={{uri: mapUrl}}
              style={[styles.map, {height: height * 0.4}]} // Ajusta la altura del mapa dependiendo de la pantalla.
              scalesPageToFit={true} // Permite hacer zoom en el mapa.
            />
          ) : (
            <Text style={styles.noMapText}>No map coordinates available</Text> // Mensaje si no hay coordenadas.
          )}
        </View>

        <NavigationButton
          onPress={() => navigation.navigate('Continents')}
          theme={theme}
        />
      </ScrollView>
    </SafeAreaView>
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
    fontSize: 24,
    fontWeight: 'bold',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 50,
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

export default DetailsScreen;
