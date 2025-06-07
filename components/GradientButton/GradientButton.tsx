import React from 'react';
import {Text, TouchableOpacity, TouchableOpacityProps} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from './GradientButton.styled';
import Icon from 'react-native-vector-icons/FontAwesome';

interface GradientButtonProps extends TouchableOpacityProps {
  title: string;
  colors?: string[];
}

const GradientButton: React.FC<GradientButtonProps> = ({
  title,
  colors,
  ...props
}) => {
  return (
    <TouchableOpacity testID="button" activeOpacity={0.8} {...props}>
      <LinearGradient
        colors={colors ?? ['#08F', '#0AF']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={styles.button}>
        <Text style={styles.buttonTitle}>{title}</Text>
        <Icon name="angle-double-right" size={20} color="#fff" />
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default GradientButton;
