import React from 'react';
import {Button} from 'react-native';

type NavigationButtonProps = {
  onPress: () => void;
};

const NavigationButton: React.FC<NavigationButtonProps> = ({onPress}) => {
  return <Button title={'Go to Continent selection'} onPress={onPress} />;
};

export default NavigationButton;
