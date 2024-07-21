import React, { useState, useEffect } from 'react';
import { View, Text, Image, Button, StyleSheet, TouchableOpacity } from 'react-native';
// import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { authentication, firebase } from '../firebase/config';
import { signOut } from 'firebase/auth';
import { useAuth } from '../contexts/AuthContext';
import { calcH, calcW } from '../utils.js/common';

const UserProfileScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState({});

  useEffect(() => {
    const currentUser = firebase.auth().currentUser;
    setUser(currentUser);

    const fetchProfile = async () => {
      const profileDoc = await firebase.firestore().collection('profiles').doc(currentUser.uid).get();
      if (profileDoc.exists) {
        setProfile(profileDoc.data());
      }
    };
    const unsubscribe = navigation.addListener('focus', () => {
       fetchProfile()
      });
      return unsubscribe;
    
    if (currentUser) {
      fetchProfile();
    }
  }, []);

  if (!user) {
    return <Text>Loading...</Text>;
  }
  const { loggedInUser, setLoggedInUser } = useAuth();

  const signOutUser = () => {
    signOut(authentication)
      .then(res => {
        console.log(res);
        setLoggedInUser(null);
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <View style={styles.container}>
         <TouchableOpacity onPress={signOutUser} style={styles.button}>
            <Text style={styles.signOutText}>Sign Out</Text>
          </TouchableOpacity>
      {profile.profilePicture ? (
        <Image resizeMode='contain' source={{ uri: profile.profilePicture }} style={styles.profilePicture} />
      ) : (
        <View style={styles.profilePicturePlaceholder} />
      )}
      <Text style={styles.name}>{profile.name || 'Name not set'}</Text>
      <Text style={styles.email}>{user.email}</Text>
      <Button title="Edit Profile" onPress={() => navigation.navigate('EditProfile')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: calcH(0.035),
    alignItems: 'center',
  },
  profilePicture: {
    width: calcW(0.25),
    height: calcH(0.2),
    borderRadius: 20,
    marginBottom: calcH(0.05),
   
  },
  profilePicturePlaceholder: {
    width: calcW(0.3),
    height: calcH(0.2),
    borderRadius: 30,
    marginBottom: calcH(0.05),
    backgroundColor: '#ccc',
  },
  name: {
    fontSize: calcW(0.07),
    fontWeight: 'bold',
  },
  email: {
    fontSize: calcW(0.05),
    color: '#666',
  },
  button: {
    backgroundColor: '#302298',
    borderRadius: 20,
    margin: calcH(0.03),
    marginLeft: calcW(0.0),
    width: calcW(0.2),
    height: calcH(0.05),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf:'flex-end'
  },
  signOutText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: calcW(0.04),
  },
});

export default UserProfileScreen;
