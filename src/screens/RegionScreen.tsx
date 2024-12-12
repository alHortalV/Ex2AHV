import React, {useContext} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  useWindowDimensions,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Region} from '../config/res/CountryRequest';
import {DarkRWhiteModeContext} from '../theme/DarkRWhiteMode';
import DarkRWhiteComponent from '../components/DarkRWhiteComponent';

type RootStackParamList = {
  Continents: undefined;
  Countries: {continent: string};
};

type ContinentsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Continents'
>; // Definición de las props para la pantalla de continentes.

const RegionScreen: React.FC<ContinentsScreenProps> = ({navigation}) => {
  const {theme, toggleTheme} = useContext(DarkRWhiteModeContext); // Accede al tema actual y la función toggle.
  const {height} = useWindowDimensions(); // Obtiene las dimensiones de la ventana para ajustar el layout.
  const continents = Object.values(Region); // Convierte las regiones del objeto `Region` en un array.

  // Función para renderizar cada elemento (continente) de la lista.
  const renderContinentItem = ({item}: {item: string}) => (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: theme === 'light' ? '#4CAF50' : '#00796B', // Ajusta el color de fondo según el tema.
        },
      ]}
      onPress={() => navigation.navigate('Countries', {continent: item})}>
      <Text
        style={[
          styles.buttonText,
          {color: theme === 'light' ? '#FFFFFF' : '#FAFAFA'}, // Ajusta el color del texto según el tema.
        ]}>
        {item} {/* Muestra el nombre del continente. */}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View>
      {/* Encabezado */}
      <View
        style={[
          styles.header,
          {
            backgroundColor: theme === 'light' ? '#E8F5E9' : '#263238', // Establece el color de fondo del encabezado.
          },
        ]}>
        <Text
          style={[
            styles.header,
            {color: theme === 'light' ? '#212121' : '#FFFFFF'}, // Color del texto del encabezado según el tema.
          ]}>
          Select a Continent
        </Text>
        {/* Componente para alternar entre temas */}
        <DarkRWhiteComponent toggleTheme={toggleTheme} theme={theme} />
      </View>

      {/* Contenedor principal con la lista de continentes */}
      <View
        style={[
          styles.container,
          {
            backgroundColor: theme === 'light' ? '#E8F5E9' : '#263238', // Ajuste del fondo según el tema.
            height, // Ajuste de la altura de la vista.
          },
        ]}>
        <FlatList
          data={continents} // Lista de continentes.
          keyExtractor={item => item} // Clave única para cada continente.
          renderItem={renderContinentItem} // Función para renderizar cada continente.
          contentContainerStyle={styles.buttonContainer} // Estilo para el contenedor de los botones.
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    fontSize: 24,
    fontWeight: 'bold',
  },
  buttonContainer: {
    width: '100%',
    gap: 10,
  },
  button: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    width: '100%',
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '600',
  },
});

export default RegionScreen;
