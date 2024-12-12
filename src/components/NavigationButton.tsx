import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

type NavigationButtonProps = {
  onPress: () => void; // Función que se ejecuta al presionar el botón.
  theme: 'light' | 'dark'; // Tema actual de la aplicación (claro u oscuro).
};

const NavigationButton: React.FC<NavigationButtonProps> = ({
  onPress,
  theme,
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, theme === 'light' ? styles.light : styles.dark]} // Establece el color de fondo según el tema.
      onPress={onPress} // Llama a la función onPress al presionar el botón.
    >
      <Text
        style={[
          styles.buttonText,
          theme === 'light' ? styles.lightText : styles.darkText, // Establece el color del texto según el tema.
        ]}>
        Go to Continent selection
        {/* Muestra el texto del botón */}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  light: {
    backgroundColor: '#4CAF50', // Color de fondo para el tema claro.
  },
  dark: {
    backgroundColor: '#00796B', // Color de fondo para el tema oscuro.
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600', // Estilo del texto del botón.
  },
  lightText: {
    color: '#E8F5E9', // Color del texto para el tema claro.
  },
  darkText: {
    color: '#E8F5E9', // Color del texto para el tema oscuro.
  },
});

export default NavigationButton;
