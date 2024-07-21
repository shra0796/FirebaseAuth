import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Image } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { firebase } from '../firebase/config';
import { calcH, calcW } from '../utils.js/common';

const EditProfileScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const currentUser = firebase.auth().currentUser;

    const fetchProfile = async () => {
      const profileDoc = await firebase.firestore().collection('profiles').doc(currentUser.uid).get();
      if (profileDoc.exists) {
        const profileData = profileDoc.data();
        setName(profileData.name || '');
        setProfilePicture(profileData.profilePicture || '');
      }
    };
    
    if (currentUser) {
      fetchProfile();
    }
  }, []);

  const saveProfile = async () => {
    setLoading(true);
    const currentUser = firebase.auth().currentUser;
    await firebase.firestore().collection('profiles').doc(currentUser.uid).set({
      name,
      profilePicture,
    });
    setLoading(false);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Profile Picture URL"
        value={profilePicture}
        onChangeText={setProfilePicture}
      />
      {profilePicture ? (
        <Image  resizeMode='contain' source={{ uri: profilePicture }} style={styles.profilePicturePreview} />
      ) : null}
      <Button title="Save" onPress={saveProfile} disabled={loading} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: calcH(0.05),
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: calcH(0.015),
    marginBottom: calcH(0.02),
  },
  profilePicturePreview: {
    width: calcW(0.25),
    height: calcH(0.15),
    borderRadius: 70,
    marginBottom: calcH(0.02),
   
  },
});

export default EditProfileScreen;
