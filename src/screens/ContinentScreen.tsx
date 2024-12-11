import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, FlatList} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Region} from '../types/CountryRequest';

type RootStackParamList = {
  Continents: undefined;
  Countries: {continent: string};
};

type ContinentsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Continents'
>;

const ContinentsScreen: React.FC<ContinentsScreenProps> = ({navigation}) => {
  const continents = Object.values(Region);

  // Renderiza cada elemento de la lista de continentes
  const renderContinentItem = ({item}: {item: string}) => (
    <TouchableOpacity
      style={styles.button}
      onPress={() => navigation.navigate('Countries', {continent: item})}>
      <Text style={styles.buttonText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select a Continent</Text>
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
    backgroundColor: '#f0f0f0',
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
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default ContinentsScreen;
