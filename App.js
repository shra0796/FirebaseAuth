import React ,{useEffect} from 'react';
import {LogBox, SafeAreaView, ScrollView} from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

import {NavigationContainer} from '@react-navigation/native';

import {AuthProvider, useAuth} from './src/contexts/AuthContext';
import GuestStack from './src/navigation/GuestStack';
import AppStack from './src/navigation/AppStack';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import messaging from '@react-native-firebase/messaging';


const AppContent = () => {
  const {loggedInUser} = useAuth();
  useEffect(() => {
    const getFcmToken = async () => {
      const fcmToken = await messaging().getToken();
      if (fcmToken) {
        console.log('Your Firebase Cloud Messaging Token is:', fcmToken);
      } else {
        console.log('Failed', 'No token received');
      }
    };

    getFcmToken();

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);
  return (
    <NavigationContainer>
      {loggedInUser ? <AppStack /> : <GuestStack />}
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Provider>
  );
}


