import React from 'react';
import {LogBox, SafeAreaView, ScrollView} from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

import {NavigationContainer} from '@react-navigation/native';

import {AuthProvider, useAuth} from './src/contexts/AuthContext';
import GuestStack from './src/navigation/GuestStack';
import AppStack from './src/navigation/AppStack';
import {Provider} from 'react-redux';
import store from './src/redux/store';

const AppContent = () => {
  const {loggedInUser} = useAuth();
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


