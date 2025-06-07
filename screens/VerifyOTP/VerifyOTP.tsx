import {View, Image} from 'react-native';
import React, {useState} from 'react';
import OtpSection from './../../components/OtpSection/OtpSection';
import styles from './VerifyOTP.styled';
import Otp from '../../assets/otp.jpg';
import {useAppSelector} from '../../hooks';
import {useRegisterMutation} from '../../services/authService';
import {showToast} from '../../components/Toast/Toast';
import * as Screen from '../index';

const VerifyOTP = ({navigation}: any) => {
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(''));
  const tempUser = useAppSelector(state => state.user.tempUser);
  const [register, {isLoading}] = useRegisterMutation();

  const submitOTP = async () => {
    try {
      if (!tempUser) {
        return showToast('Something went wrong!');
      }
      const response = await register({
        ...tempUser,
        combinedOTP: otp.join(''),
      }).unwrap();
      console.log({response});
      navigation.navigate(Screen.login);
    } catch (error) {
      console.log(error);
      showToast('Something went wrong!');
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={Otp}
        resizeMode="contain"
        style={{aspectRatio: 1, height: 250}}
      />
      <OtpSection
        otp={otp}
        setOtp={setOtp}
        onPress={submitOTP}
        isLoading={isLoading}
      />
    </View>
  );
};

export default VerifyOTP;
