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
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 16,
    paddingLeft: 8,
    color: '#000',
  },
  button: {
    backgroundColor: '#007BFF',
    width: '100%',
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
    paddingRight: 8,
  },
  passwordInput: {
    flex: 1,
    color: '#000',
  },
  eyeIcon: {
    padding: 5,
  },
  icon: {
    width: 24,
    height: 24,
  },
});

export default SignUpScreen;
