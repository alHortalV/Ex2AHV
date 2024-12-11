import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Region} from '../request/CountryRequest';

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

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Select a Continent</Text>
      <View style={styles.buttonContainer}>
        {continents.map(continent => (
          <TouchableOpacity
            key={continent}
            style={styles.button}
            onPress={() => navigation.navigate('Countries', {continent})}>
            <Text style={styles.buttonText}>{continent}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
