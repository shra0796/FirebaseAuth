import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { firebase } from '../firebase/config';
import { calcH, calcW } from '../utils.js/common';

const EventListScreen = ({ navigation }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const eventList = [];
      const snapshot = await firebase.firestore().collection('events').get();
      snapshot.forEach(doc => eventList.push({ id: doc.id, ...doc.data() }));
      setEvents(eventList);
    };
    fetchEvents();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('EventDetails', { eventId: item.id })}>
      <View style={styles.eventItem}>
        <Text style={styles.title}>{item.title}</Text>
        <Text>{item.date}</Text>
        <Text>{item.location}</Text>
        <Text>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        style={styles.profileIconContainer}
        onPress={() => navigation.navigate('UserProfile')}
      >
        <Image
          resizeMode='contain'
          source={{ uri: "https://st5.depositphotos.com/81594590/67109/v/380/depositphotos_671094308-stock-illustration-user-avatar-icon-vector-illustration.jpg" }}
          style={styles.profileIcon}
        />
      </TouchableOpacity>
      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.container}
        style={styles.eventList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: calcH(0.02),
  },
  eventItem: {
    padding: calcH(0.02),
    marginBottom: calcH(0.02),
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  title: {
    fontSize: calcW(0.05),
    fontWeight: 'bold',
  },
  profileIconContainer: {
    position: 'absolute',
    top: calcH(0.02),
    right: calcW(0.02),
    zIndex: 1,
  },
  profileIcon: {
    width: calcW(0.1),
    height: calcH(0.06),
    borderRadius: 25,
    resizeMode:'contain'
  },
  eventList: {
    marginTop: calcH(0.1), // Add some margin to the top to make room for the profile icon
  },
});

export default EventListScreen;
