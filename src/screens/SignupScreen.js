import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Image,
} from 'react-native';

import {authentication} from '../firebase/config';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {useAuth} from '../contexts/AuthContext';
import { calcH, calcW } from '../utils.js/common';

const SignUpScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const {setLoggedInUser} = useAuth();

  const validateEmail = email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSignUp = () => {
    if (!email) {
      Alert.alert('Error', 'Email is required');
      return;
    } else if (!validateEmail(email)) {
      Alert.alert('Error', 'Please enter a valid email');
      return;
    } else if (!password) {
      Alert.alert('Error', 'Password is required');
      return;
    } else if (!confirmPassword) {
      Alert.alert('Error', 'Confirm Password is required');
      return;
    } else if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    } else {
      setIsLoading(true);
      createUserWithEmailAndPassword(authentication, email, password)
        .then(res => {
          console.log(res.user);
          setLoggedInUser(res.user);
          navigation.navigate("ProductList")

        })
        .catch(err => {
          console.log(err);
          Alert.alert('Error', 'Failed to create an account');
        })
        .finally(() => setIsLoading(false));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholderTextColor={'#000'}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholderTextColor={'#000'}
          placeholder="Password"
          secureTextEntry={!passwordVisible}
          value={password}
          onChangeText={text => setPassword(text)}
        />
        <TouchableOpacity
          onPress={() => setPasswordVisible(!passwordVisible)}
          style={styles.eyeIcon}>
          <Image
            source={{
              uri: passwordVisible
                ? 'https://cdn-icons-png.flaticon.com/512/25/25186.png'
                : 'https://cdn-icons-png.flaticon.com/512/5062/5062877.png',
            }}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Confirm Password"
          secureTextEntry={!confirmPasswordVisible}
          value={confirmPassword}
          onChangeText={text => setConfirmPassword(text)}
        />
        <TouchableOpacity
          onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
          style={styles.eyeIcon}>
          <Image
            source={{
              uri: confirmPasswordVisible
                ? 'https://cdn-icons-png.flaticon.com/512/25/25186.png'
                : 'https://cdn-icons-png.flaticon.com/512/5062/5062877.png',
            }}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={handleSignUp} style={styles.button}>
        <Text style={styles.buttonText}>Sign Up</Text>
        {isLoading && (
          <ActivityIndicator
            size="small"
            color="white"
            style={{
              alignSelf: 'center',
              justifyContent: 'center',
              paddingLeft: 10,
            }}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: calcW(0.06),
  },
  title: {
    fontSize: calcW(0.05),
    fontWeight: 'bold',
    marginBottom: calcH(0.04),
  },
  input: {
    width: calcW(0.9),
    height: calcH(0.06),
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: calcH(0.03),
    paddingLeft: calcW(0.02),
    paddingRight: calcW(0.02),
    color: '#000',
  },
  button: {
    backgroundColor: '#302298',
    borderRadius: 20,
    padding: calcH(0.02),
    margin: calcH(0.015),
    width: calcW(0.9),
    height: calcH(0.07),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: calcW(0.04),
    alignSelf: 'center',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: calcW(0.9),
    height: calcH(0.07),
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: calcH(0.02),
    paddingLeft: calcW(0.02),
    paddingRight: calcW(0.02),
  },
  passwordInput: {
    flex: 1,
    color: '#000',
  },
  eyeIcon: {
    padding: 5,
  },
  icon: {
    width: calcW(0.05),
    height: calcH(0.05),
    resizeMode: 'contain'
  },
});

export default SignUpScreen;
