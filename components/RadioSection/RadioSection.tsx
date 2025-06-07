import React from 'react';
import {View, Text, TouchableOpacity, ViewStyle, TextStyle} from 'react-native';
import styles from './RadioSection.styled';

interface RadioSectionProps<T extends string> {
  label: string;
  options: T[];
  selected: T;
  onChange: (value: T) => void;
}

function RadioSection<T extends string>({
  label,
  options,
  selected,
  onChange,
}: Readonly<RadioSectionProps<T>>) {
  return (
    <View style={styles.radioSectionContainer}>
      <Text style={styles.radioSectionLabel}>{label}</Text>
      <View style={styles.radioOptions}>
        {options.map(option => (
          <TouchableOpacity
            key={option}
            style={styles.radioOption}
            onPress={() => onChange(option)}>
            <View style={styles.radioCircle}>
              {selected === option && <View style={styles.radioSelected} />}
            </View>
            <Text style={styles.radioLabel}>
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

export default RadioSection;
