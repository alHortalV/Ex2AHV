import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

type NavigationButtonProps = {
  onPress: () => void;
  theme: 'light' | 'dark';
};

const NavigationButton: React.FC<NavigationButtonProps> = ({ onPress, theme }) => {
  return (
    <TouchableOpacity
      style={[styles.button, theme === 'light' ? styles.light : styles.dark]}
      onPress={onPress}
    >
      <Text style={[styles.buttonText, theme === 'light' ? styles.lightText : styles.darkText]}>
        Go to Continent selection
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
    backgroundColor: '#007bff',
  },
  dark: {
    backgroundColor: '#555555',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  lightText: {
    color: '#ffffff',
  },
  darkText: {
    color: '#e0e0e0',
  },
});

export default NavigationButton;
