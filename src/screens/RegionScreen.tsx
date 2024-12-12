import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Region } from '../config/res/CountryRequest';
import { DarkRWhiteModeContext } from '../theme/DarkRWhiteMode';

type RootStackParamList = {
  Continents: undefined;
  Countries: { continent: string };
};

type ContinentsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Continents'
>;

const ContinentsScreen: React.FC<ContinentsScreenProps> = ({ navigation }) => {
  const { theme } = useContext(DarkRWhiteModeContext); // Accedemos al estado del tema

  const continents = Object.values(Region);

  // Renderiza cada elemento de la lista de continentes
  const renderContinentItem = ({ item }: { item: string }) => (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: theme === 'light' ? '#007bff' : '#555555' }]} // Estilo dinámico
      onPress={() => navigation.navigate('Countries', { continent: item })}>
      <Text style={[styles.buttonText, { color: theme === 'light' ? 'white' : '#e0e0e0' }]}>
        {item}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme === 'light' ? '#f0f0f0' : '#333333',
        },
      ]}
    >
      <Text style={[styles.title, { color: theme === 'light' ? '#000000' : '#FFFFFF' }]}>
        Select a Continent
      </Text>
      <FlatList
        data={continents}
        keyExtractor={item => item}
        renderItem={renderContinentItem}
        contentContainerStyle={styles.buttonContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  buttonContainer: {
    width: '100%',
    gap: 15,
  },
  button: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
  },
});

export default ContinentsScreen;
