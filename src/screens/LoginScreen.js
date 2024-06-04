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
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
    paddingRight: 8,
    color: '#000',
  },
  button: {
    backgroundColor: '#302298',
    borderRadius: 20,
    padding: 10,
    margin: 14,
    width: '78%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  loginText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
    alignSelf: 'center',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  downText: {
    color: '#331ece',
    fontSize: 16,
    fontWeight: '400',
    marginTop: 10,
  },
  signup: {
    alignSelf: 'flex-start',
    textDecorationLine: 'underline',
    color: '#331ece',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 5,
    marginTop: 10,
  },
  eyeIcon: {
    padding: 5,
  },
  icon: {
    width: 24,
    height: 24,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
    paddingRight: 8,
  },
  passwordInput: {
    flex: 1,
    color: '#000',
  },
});

export default LoginScreen;
