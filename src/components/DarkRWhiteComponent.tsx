import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

interface ThemeToggleButtonProps {
  toggleTheme: () => void; // Función que cambia el tema de la aplicación.
  theme: 'light' | 'dark'; // Tema actual de la aplicación (claro u oscuro).
}

const DarkRWhiteComponent: React.FC<ThemeToggleButtonProps> = ({
  toggleTheme,
  theme,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        {backgroundColor: theme === 'light' ? '#263238' : '#E8F5E9'}, // Establece el color de fondo según el tema.
      ]}
      onPress={toggleTheme} // Llama a la función toggleTheme al presionar el botón.
    >
      <Text
        style={[
          styles.buttonText,
          {color: theme === 'light' ? '#E8F5E9' : '#263238'}, // Establece el color del texto según el tema.
        ]}>
        {theme === 'light' ? 'DarkMode' : 'LightMode'}{' '}
        {/* Muestra el nombre del modo dependiendo del tema actual. */}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  buttonText: {
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default DarkRWhiteComponent;
