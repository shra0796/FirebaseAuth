import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  FlatList,
  Alert,
  Image,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
// import {initializeFirestore} from 'firebase/firestore'
import {firebase} from '../firebase/config';
import {useAuth} from '../contexts/AuthContext';
import {authentication} from '../firebase/config';
import {signOut} from 'firebase/auth';
export default function App() {
  const [inputTextValue, setInputTextValue] = useState(null);
  const [list, setList] = useState([]);
  const [isUpdateData, setIsUpdateData] = useState(false);
  const [cardId, setCardid] = useState(null);

  useEffect(() => {
    getDatabase();
  }, []);

  const getDatabase = async () => {
    try {
      firebase
        .firestore()
        .collection('todo')
        .onSnapshot(snap => {
          const tempArray = [];
          snap.forEach(item => {
            tempArray.push({
              ...item.data(),
              id: item.id,
            });
          });

          setList(tempArray);
        });

      // // const data = await database().ref('todo').once('value');
      // const data = await database()
      //   .ref('todo')
      //   .on('value', tempData => {
      //     console.log(data);
      //     setList(tempData.val());
      //   });
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddData = async () => {
    try {
      if (inputTextValue.length > 0) {
        await firebase.firestore().collection('todo').add({
          text: inputTextValue,
        });

        setInputTextValue('');

        // const index = list.length;
        // const response = await database().ref(`todo/${index}`).set({
        //   value: inputTextValue,
        // });

        // console.log(response);

        // setInputTextValue('');
      } else {
        alert('Please Enter Value & Then Try Again');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdateData = async () => {
    try {
      if (inputTextValue.length > 0) {
        await firebase.firestore().collection('todo').doc(cardId).update({
          text: inputTextValue,
        });

        setInputTextValue('');
        setIsUpdateData(false);

        // const response = await database()
        //   .ref(`todo/${selectedCardIndex}`)
        //   .update({
        //     value: inputTextValue,
        //   });

        // console.log(response);
        // setInputTextValue('');
        // setIsUpdateData(false);
      } else {
        alert('Please Enter Value & Then Try Again');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleCardPress = (cardId, cardValue) => {
    try {
      setIsUpdateData(true);
      setCardid(cardId);
      setInputTextValue(cardValue);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCardLongPress = (cardId, cardValue) => {
    try {
      Alert.alert('Alert', `Are You Sure To Delete ${cardValue} ?`, [
        {
          text: 'Cancel',
          onPress: () => {
            console.log('Cancel Is Press');
          },
        },
        {
          text: 'Ok',
          onPress: async () => {
            try {
              await firebase
                .firestore()
                .collection('todo')
                .doc(cardId)
                .delete();
              setInputTextValue('');
              setIsUpdateData(false);

              // const response = await database()
              //   .ref(`todo/${cardIndex}`)
              //   .remove();
            } catch (err) {
              console.log(err);
            }
          },
        },
      ]);

      // setIsUpdateData(true);
      // setCardid(cardIndex);
      // setInputTextValue(cardValue);
    } catch (err) {
      console.log(err);
    }
  };
  const {loggedInUser, setLoggedInUser} = useAuth();

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
      <StatusBar hidden={true} />
      <TouchableOpacity onPress={signOutUser} style={styles.button}>
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>
      <View style={{flexDirection: 'row'}}>
        <View>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 20,
              fontWeight: 'bold',
              marginTop: 15,
              color: '#000',
            }}>
            Product Management
          </Text>
          <TextInput
            style={styles.inputBox}
            placeholderTextColor={'#000'}
            placeholder="Enter Product Name"
            value={inputTextValue}
            onChangeText={value => setInputTextValue(value)}
          />
          {!isUpdateData ? (
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => handleAddData()}>
              <Text style={{color: '#fff'}}>Add Product</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => handleUpdateData()}>
              <Text style={{color: '#fff'}}>Update Product</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View style={styles.cardContainer}>
        <Text
          style={{
            marginVertical: 20,
            fontSize: 20,
            fontWeight: 'bold',
            color: '#000',
          }}>
          Product List
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}>
          <FlatList
            data={list}
            renderItem={item => {
              const cardIndex = item.index;
              if (item.item !== null) {
                return (
                  <TouchableOpacity
                    style={styles.card}
                    onPress={() =>
                      handleCardPress(item.item.id, item.item.text)
                    }
                    onLongPress={() =>
                      handleCardLongPress(item.item.id, item.item.text)
                    }>
                    <Text style={{fontWeight: '500', color: '#000'}}>
                      Product Name:
                    </Text>
                    <Text style={{color: '#aaa', fontSize: 16}}>
                      {item.item.text}
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingTop: 35,
                      }}>
                      <TouchableOpacity
                        style={{
                          height: 30,
                          width: 30,
                          borderRadius: 30,
                          alignItems: 'center',
                          justifyContent: 'center',
                          alignSelf: 'flex-end',
                        }}
                        onPress={() =>
                          handleCardPress(item.item.id, item.item.text)
                        }>
                        <Image
                          source={{
                            uri: 'https://cdn-icons-png.flaticon.com/512/5996/5996831.png',
                          }}
                          style={{height: 30, width: 30, resizeMode: 'contain'}}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{
                          height: 30,
                          width: 30,
                          borderRadius: 30,
                          alignItems: 'center',
                          justifyContent: 'center',
                          alignSelf: 'flex-end',
                        }}
                        onPress={() =>
                          handleCardLongPress(item.item.id, item.item.text)
                        }>
                        <Image
                          source={{
                            uri: 'https://cdn-icons-png.flaticon.com/512/6861/6861362.png',
                          }}
                          style={{height: 25, width: 25, resizeMode: 'contain'}}
                        />
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                );
              }
            }}
          />
        </View>
      </View>
    </View>
  );
}

const {height, width} = Dimensions.get('screen');

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#302298',
    borderRadius: 20,
    // padding: 10,
    margin: 18,
    marginLeft: '65%',
    width: '20%',
    height: 25,
    alignItems: 'flex-end',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  signOutText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
    alignSelf: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  inputBox: {
    width: width - 40,
    borderRadius: 10,
    borderWidth: 2,
    marginVertical: 10,
    padding: 10,
    borderWidth: 0.5,
    elevation: 5,
    backgroundColor: '#fff',
    marginTop: 15,
    borderColor: '#ddd',
    color: '#000',
  },
  addButton: {
    backgroundColor: 'blue',
    alignItems: 'center',
    padding: 10,
    borderRadius: 50,
    marginTop: 10,
  },
  cardContainer: {
    marginVertical: 20,
  },
  card: {
    backgroundColor: '#fff',
    width: width * 0.4,
    padding: 20,
    borderRadius: 10,
    marginVertical: 10,
    minHeight: 150,
  },
});
