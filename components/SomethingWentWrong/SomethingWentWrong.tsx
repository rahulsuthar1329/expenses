import {View, Text} from 'react-native';
import React from 'react';
import styles from './SomethingWentWrong.styled';

const SomethingWentWrong = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Oops! Something went wrong.</Text>
    </View>
  );
};

export default SomethingWentWrong;
