import {
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import InputText from '../../components/InputText/InputText';
import styles from './RegisterScreen.styled';
import GradientButton from '../../components/GradientButton/GradientButton';
import BackgroundImage from '../../assets/login-bg.jpg';
import * as Screen from '../index';
import Animated, {FadeInUp} from 'react-native-reanimated';
import LinkText from '../../components/LinkText/LinkText';
import Checkbox from '../../components/Checkbox/Checkbox';
import {useAppDispatch} from '../../hooks';
import {setTempUser} from '../../features/UserSlice';
import {showToast} from '../../components/Toast/Toast';
import DatePickerInput from '../../components/DatePickerInput/DatePickerInput';
import RadioSection from '../../components/RadioSection/RadioSection';
import SocialLoginSection from './../../components/SocioLoginSection/SocioLoginSection';
import {validateUserCredential} from '../../utils/validation';
import {useSendOTPMutation} from '../../services/authService';

const RegisterScreen = ({navigation}: any) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');
  const [cnfpassword, setCnfpassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [mobile, setMobile] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null);
  const dispatch = useAppDispatch();
  const [sendOTP, {isLoading}] = useSendOTPMutation();

  const handleRegister = async () => {
    const user = {
      firstName,
      lastName,
      username,
      email,
      gender,
      password,
      mobile,
      dateOfBirth,
    };
    if (validateUserCredential(user))
      return showToast('Please fill all the fields.');

    try {
      await sendOTP({email, username}).unwrap();
      dispatch(setTempUser(user));
      showToast('OTP sent successfully!');
      navigation.navigate(Screen.verify_otp);
    } catch (error) {
      showToast('Something went wrong!');
      console.log(error);
    }
  };

  const toggleRememberMe = () => setRememberMe(!rememberMe);
  const goToForgetPassword = () => navigation.navigate(Screen.forgot_password);

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}>
      <ImageBackground
        source={BackgroundImage}
        resizeMode="cover"
        style={styles.container}>
        <Animated.Text
          entering={FadeInUp.duration(200).springify()}
          style={styles.headerText}>
          Sign Up
        </Animated.Text>

        <View style={styles.inputSection}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}>
            <View style={styles.header}>
              <Text style={styles.sectionHeaderText}>Welcome Back!</Text>
              <Text style={styles.text}>
                To keep connected with us please login with your personal info
              </Text>
            </View>

            <View style={styles.inputs}>
              <InputText
                testID="firstName"
                placeholder="First name"
                state={firstName}
                setState={setFirstName}
              />
              <InputText
                testID="lastName"
                placeholder="Last name"
                state={lastName}
                setState={setLastName}
              />
              <InputText
                testID="username"
                placeholder="Username"
                state={username}
                setState={setUsername}
              />
              <InputText
                testID="email"
                placeholder="Email address"
                state={email}
                setState={setEmail}
              />
              <InputText
                testID="mobile"
                placeholder="Contact number"
                state={mobile}
                setState={setMobile}
              />
              <InputText
                testID="password"
                type="password"
                placeholder="Password"
                state={password}
                setState={setPassword}
              />
              <InputText
                testID="cnfpassword"
                type="password"
                placeholder="Confirm Password"
                state={cnfpassword}
                setState={setCnfpassword}
              />
              <RadioSection
                label="Gender"
                options={['male', 'female', 'other']}
                selected={gender}
                onChange={setGender}
              />
              <DatePickerInput
                label="Date of Birth"
                value={dateOfBirth}
                onChange={setDateOfBirth}
              />
              <View style={styles.links}>
                <Checkbox
                  title="Remember me?"
                  isSelected={rememberMe}
                  onPress={toggleRememberMe}
                />
                <LinkText
                  title="Forgot Password?"
                  onPress={goToForgetPassword}
                />
              </View>
              <Animated.View
                entering={FadeInUp.delay(400).duration(200).springify()}>
                <GradientButton
                  title="Sign Up"
                  colors={['#198789', '#0a9c8d']}
                  onPress={handleRegister}
                  style={styles.submit}
                  disabled={isLoading}
                />
              </Animated.View>
              <View style={styles.signupContainer}>
                <Text style={styles.signupText}>
                  Already have an account?{' '}
                  <Text
                    style={styles.signupLink}
                    onPress={() => navigation.navigate(Screen.login)}>
                    Sign in.
                  </Text>
                </Text>
              </View>
            </View>

            <SocialLoginSection
              onFacebookPress={() => console.log('Facebook pressed')}
              onGooglePress={() => console.log('Google pressed')}
            />
          </ScrollView>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;
