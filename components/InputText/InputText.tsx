import {View, TextInput, TextInputProps} from 'react-native';
import React, {useState} from 'react';
import styles from './InputText.styled';

interface InputProps extends TextInputProps {
  type?: string;
  placeholder: string;
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
}

const InputText: React.FC<InputProps> = ({
  type = '',
  placeholder,
  state,
  setState,
}) => {
  const onChangeText = (inputValue: React.SetStateAction<string>) => {
    setState(inputValue);
  };

  return (
    <TextInput
      secureTextEntry={type === 'password'}
      value={state}
      style={styles.container}
      placeholder={placeholder}
      placeholderTextColor={'#999'}
      onChangeText={onChangeText}
    />
  );
};

export default InputText;
