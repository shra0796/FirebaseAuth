import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';

import {authentication} from '../firebase/config';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {useAuth} from '../contexts/AuthContext';
import { calcH, calcW } from '../utils.js/common';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState(null);
  const [passwordVisible, setPasswordVisible] = React.useState(false);

  const inputRef = React.useRef();
  const passwordRef = React.useRef();

  const [isLoading, setIsLoading] = useState(false);

  const {setLoggedInUser} = useAuth();

  const validateEmail = email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSignIn = async () => {
    if (!email) {
      Alert.alert('Error', 'Email  cannot be empty');
      return;
    } else if (!validateEmail(email)) {
      Alert.alert('Error', 'Please enter a valid email');
      return;
    } else if (!password) {
      Alert.alert('Error', 'Password cannot be empty');
      return;
    } else {
      setIsLoading(true);

      signInWithEmailAndPassword(authentication, email, password)
        .then(res => {
          console.log('successful');
          setLoggedInUser(res.user);
          navigation.navigate("EventList")
        })
        .catch(err => {
          console.log(err);
          Alert.alert('Error', 'Incorrect Email/Password');
        })
        .finally(() => setIsLoading(false));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome!</Text>
      <Image
        source={{
          uri: 'https://ouch-cdn2.icons8.com/teMbWzQG6l5J7CQqv4TiWL2pvjv9-A1IUmfuhymu3zw/rs:fit:608:456/extend:false/wm:1:re:0:0:0.8/wmid:ouch/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9zdmcvMzIy/LzEzODJjMmMwLThj/M2YtNGQ4Yy1iODk0/LWRkYTRhMDI3ZGFl/OS5zdmc.png',
        }}
        style={styles.logo}
      />

      <TextInput
        ref={inputRef}
        style={styles.input}
        placeholder="Enter your email"
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor="#000"
        value={email}
        onChangeText={email => setEmail(email)}
      />
      <View style={styles.passwordContainer}>
        <TextInput
          ref={passwordRef}
          style={styles.passwordInput}
          placeholder="Enter your password"
          placeholderTextColor="#000"
          value={password}
          secureTextEntry={!passwordVisible}
          onChangeText={text => setPassword(text)}
        />
        <TouchableOpacity
          onPress={() => setPasswordVisible(!passwordVisible)}
          style={styles.eyeIcon}>
          <Image
          resizeMode='contain'
            source={{
              uri: passwordVisible
                ? 'https://cdn-icons-png.flaticon.com/512/25/25186.png'
                : 'https://cdn-icons-png.flaticon.com/512/5062/5062877.png',
            }}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}

      <TouchableOpacity onPress={handleSignIn} style={styles.button}>
        <Text style={styles.loginText}>Login</Text>
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
      <View
        style={{
          flexDirection: 'row',
        }}>
        <Text style={styles.downText}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.signup}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: calcH(0.03),
  },
  label: {
    fontSize: calcW(0.02),
    marginBottom: calcH(0.02),
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
  loginText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: calcW(0.04),
    alignSelf: 'center',
  },
  welcomeText: {
    fontSize: calcW(0.06),
    fontWeight: 'bold',
    marginBottom: calcH(0.02),
    textAlign: 'center',
  },
  logo: {
    width: calcW(0.45),
    height: calcH(0.2),
    marginBottom: 20,
    // resizeMode: 'contain'
  },
  downText: {
    color: '#331ece',
    fontSize: calcW(0.04),
    fontWeight: '400',
    marginTop: calcH(0.02),
  },
  signup: {
    alignSelf: 'flex-start',
    textDecorationLine: 'underline',
    color: '#331ece',
    fontSize: calcW(0.04),
    fontWeight: '500',
    marginLeft: calcW(0.02),
    marginTop: calcH(0.02),
  },
  eyeIcon: {
    padding: calcH(0.015),
  },
  icon: {
    width: calcW(0.05),
    height: calcH(0.05),
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
});

export default LoginScreen;
