import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { firebase } from '../firebase/config';
import { calcH, calcW } from '../utils.js/common';

const EventDetailsScreen = ({ route }) => {
  const { eventId } = route.params;
  const [event, setEvent] = useState(null);
  const [rsvpStatus, setRsvpStatus] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      const eventDoc = await firebase.firestore().collection('events').doc(eventId).get();
      if (eventDoc.exists) {
        setEvent(eventDoc.data());
      }
    };

    const fetchRsvpStatus = async () => {
      const userId = firebase.auth().currentUser.uid;
      const rsvpDoc = await firebase.firestore().collection('events').doc(eventId).collection('rsvps').doc(userId).get();
      if (rsvpDoc.exists) {
        setRsvpStatus(rsvpDoc.data().status);
      }
    };

    fetchEvent();
    fetchRsvpStatus();
  }, [eventId]);

  const handleRsvp = async () => {
    setLoading(true);
    const userId = firebase.auth().currentUser.uid;
    const rsvpRef = firebase.firestore().collection('events').doc(eventId).collection('rsvps').doc(userId);
    
    await rsvpRef.set({
      status: !rsvpStatus,
    });

    setRsvpStatus(!rsvpStatus);
    setLoading(false);
  };

  if (!event) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{event.title}</Text>
      <Text>{event.date}</Text>
      <Text>{event.location}</Text>
      <Text>{event.description}</Text>
      <Text>{`Organized by: ${event.organizer}`}</Text>
      {event.images && event.images.length > 0 && (
        <View style={styles.imagesContainer}>
          {event.images.map((image, index) => (
            <Image key={index} source={{ uri: image }} style={styles.image} />
          ))}
        </View>
      )}
      <Button
        title={rsvpStatus ? "Cancel RSVP" : "RSVP"}
        onPress={handleRsvp}
        disabled={loading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: calcH(0.02),
  },
  title: {
    fontSize: calcW(0.06),
    fontWeight: 'bold',
  },
  imagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  image: {
    width: calcW(0.1),
    height: calcH(0.1),
    margin: calcH(0.02),
  },
});

export default EventDetailsScreen;
