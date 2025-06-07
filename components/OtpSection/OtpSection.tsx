import React, {
  useRef,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from 'react';
import {GestureResponderEvent, Text, TextInput, View} from 'react-native';
import styles from './OtpSection.styled';
import LinkText from './../LinkText/LinkText';
import GradientButton from './../GradientButton/GradientButton';

const OTP_LENGTH = 6;
const RESEND_DURATION = 60;

interface OtpSectionProps {
  otp: string[];
  setOtp: Dispatch<SetStateAction<string[]>>;
  onPress: (event: GestureResponderEvent) => void;
  isLoading: boolean;
}

const OtpSection: React.FC<OtpSectionProps> = ({
  otp,
  setOtp,
  onPress,
  isLoading,
}) => {
  const [timer, setTimer] = useState(RESEND_DURATION);
  const inputRefs = useRef<Array<TextInput | null>>([]);

  useEffect(() => {
    if (timer === 0) return;

    const interval = setInterval(() => {
      setTimer(prev => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (text: string, index: number) => {
    if (/^\d$/.test(text)) {
      const newOtp = [...otp];
      newOtp[index] = text;
      setOtp(newOtp);
      if (index < OTP_LENGTH - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    } else if (text === '') {
      const newOtp = [...otp];
      newOtp[index] = '';
      setOtp(newOtp);
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && otp[index] === '') {
      if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handleResend = () => {
    setOtp(new Array(OTP_LENGTH).fill(''));
    setTimer(RESEND_DURATION);
    inputRefs.current[0]?.focus();

    console.log('OTP resent!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Verify your email</Text>
      <Text style={styles.headText}>
        Please enter your one-time password sent to your email.
      </Text>

      <View style={styles.boxes}>
        {otp.map((value, index) => (
          <TextInput
            key={value + index}
            ref={ref => (inputRefs.current[index] = ref)}
            style={styles.box}
            keyboardType="number-pad"
            maxLength={1}
            value={value}
            onChangeText={text => handleChange(text, index)}
            onKeyPress={e => handleKeyPress(e, index)}
          />
        ))}
      </View>

      <View style={styles.resendOTP}>
        {timer > 0 ? (
          <Text>Resend OTP in 00:{timer < 10 ? `0${timer}` : timer} mins.</Text>
        ) : (
          <LinkText title="Resend OTP" underline onPress={handleResend} />
        )}
      </View>

      <View style={{minWidth: '100%', paddingHorizontal: 30}}>
        <GradientButton
          title="Verify OTP"
          colors={['#198789', '#0a9c8d']}
          onPress={onPress}
          disabled={isLoading}
        />
      </View>
    </View>
  );
};

export default OtpSection;
