import React, {useState} from 'react';
import {View, Text, TouchableOpacity, ViewStyle, TextStyle} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from './DatePickerInput.styled';

interface DatePickerInputProps {
  label?: string;
  value: Date | null;
  onChange: (date: Date) => void;
  containerStyle?: ViewStyle;
  inputStyle?: ViewStyle;
  textStyle?: TextStyle;
}

const DatePickerInput: React.FC<DatePickerInputProps> = ({
  label = 'Select Date',
  value,
  onChange,
  containerStyle,
  inputStyle,
  textStyle,
}) => {
  const [showPicker, setShowPicker] = useState(false);

  return (
    <View style={[containerStyle]}>
      <TouchableOpacity
        onPress={() => setShowPicker(true)}
        style={[styles.input, inputStyle]}>
        <Text style={[styles.dateText, textStyle, value && styles.textBlack]}>
          {value ? value.toDateString() : label}
        </Text>
      </TouchableOpacity>
      {showPicker && (
        <DateTimePicker
          value={value || new Date()}
          mode="date"
          display="default"
          maximumDate={new Date()}
          onChange={(event, selectedDate) => {
            setShowPicker(false);
            if (selectedDate) onChange(selectedDate);
          }}
        />
      )}
    </View>
  );
};

export default DatePickerInput;
