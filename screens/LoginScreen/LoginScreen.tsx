import {
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import InputText from './../../components/InputText/InputText';
import styles from './LoginScreen.styled';
import GradientButton from '../../components/GradientButton/GradientButton';
import BackgroundImage from '../../assets/login-bg.jpg';
import * as Screen from '../index';
import Animated, {FadeInUp} from 'react-native-reanimated';
import LinkText from '../../components/LinkText/LinkText';
import Checkbox from '../../components/Checkbox/Checkbox';
import {useAppDispatch} from '../../hooks';
import {setUser} from '../../features/UserSlice';
import {showToast} from '../../components/Toast/Toast';
import SocialLoginSection from '../../components/SocioLoginSection/SocioLoginSection';
import {LoginResponse, useLoginMutation} from '../../services/authService';

const LoginScreen = ({navigation}: any) => {
  const [uniqueId, setUniqueId] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const dispatch = useAppDispatch();
  const [login, {isLoading}] = useLoginMutation();

  const handleLogin = async () => {
    if (!uniqueId.trim() || !password.trim())
      return showToast('Please fill all the fields.');
    try {
      const response: LoginResponse = await login({
        uniqueId,
        password,
      }).unwrap();
      dispatch(setUser(response.user));
      navigation.navigate(Screen.chat);
    } catch (error) {
      console.log(error);
      showToast('Something went wrong!');
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
          Sign In
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
                testID="uniqueId"
                placeholder="Email Address"
                state={uniqueId}
                setState={setUniqueId}
              />
              <InputText
                testID="password"
                type="password"
                placeholder="Password"
                state={password}
                setState={setPassword}
              />
              <View style={styles.links}>
                <Checkbox
                  title="Remember me?"
                  isSelected={rememberMe}
                  onPress={toggleRememberMe}
                />
                <LinkText
                  title="Forgot Password ?"
                  onPress={goToForgetPassword}
                />
              </View>

              <Animated.View
                entering={FadeInUp.delay(400).duration(200).springify()}>
                <GradientButton
                  title="Sign In"
                  colors={['#198789', '#0a9c8d']}
                  onPress={handleLogin}
                  style={styles.submit}
                  disabled={isLoading}
                />
              </Animated.View>
              <View style={styles.signupContainer}>
                <Text style={styles.signupText}>
                  Don't have an account?{' '}
                  <Text
                    style={styles.signupLink}
                    onPress={() => navigation.navigate(Screen.register)}>
                    Sign up.
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

export default LoginScreen;
