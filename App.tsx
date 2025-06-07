import React from 'react';
import * as Screen from './screens';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SocketProvider} from './context/SocketContext';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import LoginScreen from './screens/LoginScreen/LoginScreen';
import ChatScreen from './screens/ChatScreen/ChatScreen';
import Conversation from './screens/Conversation/Conversation';
import ImageGallery from './screens/ImageGallery/ImageGallery';
import RegisterScreen from './screens/RegisterScreen/RegisterScreen';
import ForgotPassword from './screens/ForgotPassword/ForgotPassword';
import {store} from './store';
import {Provider} from 'react-redux';
import VerifyOTP from './screens/VerifyOTP/VerifyOTP';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <SocketProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName={Screen.chat}>
            <Stack.Screen
              name={Screen.home}
              component={HomeScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name={Screen.register}
              component={RegisterScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name={Screen.login}
              component={LoginScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name={Screen.forgot_password}
              component={ForgotPassword}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name={Screen.verify_otp}
              component={VerifyOTP}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name={Screen.chat}
              component={ChatScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name={Screen.gallery}
              component={ImageGallery}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name={Screen.conversation}
              component={Conversation}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SocketProvider>
    </Provider>
  );
}

export default App;
