import {Text, TouchableOpacity, GestureResponderEvent} from 'react-native';
import React from 'react';
import styles from './LinkText.styled';

interface LinkTextProps {
  title: string;
  color?: string;
  underline?: boolean;
  onPress: (event: GestureResponderEvent) => void;
}

const LinkText: React.FC<LinkTextProps> = ({
  title,
  color = '#0a9c8d',
  underline,
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <Text style={[styles.text, underline && styles.underline, {color}]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default LinkText;
