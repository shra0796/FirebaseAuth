import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import { calcH, calcW } from '../utils.js/common';

const WelcomeScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Welcome to Firebase : )</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate('Login');
        }}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate('SignUp');
        }}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: calcH(0.1),
  },
  logo: {
    width: calcW(0.15),
    height: calcH(0.15),
    marginBottom: calcH(0.02),
  },
  title: {
    fontSize: calcW(0.05),
    fontWeight: 'bold',
    marginBottom: calcH(0.02),
  },
  subtitle: {
    fontSize: calcW(0.04),
    marginBottom: calcH(0.03),
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007BFF',
    width: '90%',
    paddingVertical: calcW(0.03),
    marginHorizontal: calcH(0.03),
    borderRadius: 8,
    marginBottom: calcH(0.02),
  },
  buttonText: {
    color: '#ffffff',
    fontSize: calcW(0.05),
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default WelcomeScreen;
