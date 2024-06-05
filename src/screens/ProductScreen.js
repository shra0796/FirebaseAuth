import React, { useEffect, useState } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { View, Text, TextInput, StyleSheet, Dimensions, TouchableOpacity, StatusBar, FlatList, Alert, Image, SafeAreaView, ScrollView, ActivityIndicator } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { setProducts, addProduct, updateProduct, deleteProduct } from '../redux/slices/productSlice';
import { useAuth } from '../contexts/AuthContext';
import { signOut } from 'firebase/auth';
import { firebase, authentication } from '../firebase/config';

function ProductList() {
  const [inputTextValue, setInputTextValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [isUpdateData, setIsUpdateData] = useState(false);
  const [cardId, setCardId] = useState(null);
  const dispatch = useDispatch();
  const products = useSelector(state => state.products.list);

  useEffect(() => {
    const unsubscribe = firebase.firestore()
      .collection('todo')
      .onSnapshot(snap => {
        const tempArray = [];
        snap.forEach(item => {
          tempArray.push({ ...item.data(), id: item.id });
        });
        dispatch(setProducts(tempArray));
      });

    return () => unsubscribe(); // Clean up subscription on unmount
  }, [dispatch]);

  const handleAddData = async () => {
    if (inputTextValue.length > 0) {
      setLoading(true);
      try {
        const docRef = await firebase.firestore().collection('todo').add({ text: inputTextValue });
        setInputTextValue('');
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    } else {
      Alert.alert('Please Enter Value & Then Try Again');
    }
  };

  const handleUpdateData = async () => {
    if (inputTextValue.length > 0) {
      setLoading(true);
      try {
        await firebase.firestore().collection('todo').doc(cardId).update({ text: inputTextValue });
        setInputTextValue('');
        setIsUpdateData(false);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    } else {
      Alert.alert('Please Enter Value & Then Try Again');
    }
  };

  const handleCardPress = (cardId, cardValue) => {
    setIsUpdateData(true);
    setCardId(cardId);
    setInputTextValue(cardValue);
  };

  const handleCardLongPress = (cardId, cardValue) => {
    Alert.alert('Alert', `Are You Sure To Delete ${cardValue} ?`, [
      { text: 'Cancel' },
      {
        text: 'Ok',
        onPress: async () => {
          try {
            await firebase.firestore().collection('todo').doc(cardId).delete();
            dispatch(deleteProduct(cardId));
            setInputTextValue('');
            setIsUpdateData(false);
          } catch (err) {
            console.log(err);
          }
        },
      },
    ]);
  };

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
    <SafeAreaView style={{flex: 1}}>
      <ScrollView>
        <View style={styles.container}>
          <StatusBar hidden={true} />
          <TouchableOpacity onPress={signOutUser} style={styles.button}>
            <Text style={styles.signOutText}>Sign Out</Text>
          </TouchableOpacity>
          <View style={{flexDirection: 'row'}}>
            <View>
              <Text style={styles.title}>Product Management</Text>
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
                  onPress={handleAddData}>
                                  {loading ? <ActivityIndicator size={'small'} color={"#fff"} />:   <Text style={{color: '#fff'}}>Add Product</Text>}

                
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={handleUpdateData}>
                                  {loading ? <ActivityIndicator size={'small'} color={"#fff"} />:  <Text style={{color: '#fff'}}>Update Product</Text>}

                 
                </TouchableOpacity>
              )}
            </View>
          </View>
          <View style={styles.cardContainer}>
            <Text style={styles.productListTitle}>Product List</Text>
            <FlatList
              data={products}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.card}
                  onPress={() => handleCardPress(item.id, item.text)}
                  onLongPress={() => handleCardLongPress(item.id, item.text)}>
                  <Text style={styles.cardTitle}>Product Name:</Text>
                  <Text style={styles.cardText}>{item.text}</Text>
                  <View style={styles.cardActions}>
                    <TouchableOpacity onPress={() => handleCardPress(item.id, item.text)}>
                      <Image
                        source={{ uri: 'https://cdn-icons-png.flaticon.com/512/5996/5996831.png' }}
                        style={styles.cardIcon}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleCardLongPress(item.id, item.text)}>
                      <Image
                        source={{ uri: 'https://cdn-icons-png.flaticon.com/512/6861/6861362.png' }}
                        style={styles.cardIcon}
                      />
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const { height, width } = Dimensions.get('screen');

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#302298',
    borderRadius: 20,
    margin: 18,
    marginLeft: '65%',
    width: '20%',
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signOutText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 15,
    color: '#000',
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
  productListTitle: {
    marginVertical: 20,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  card: {
    backgroundColor: '#fff',
    width: width * 0.4,
    padding: 20,
    borderRadius: 10,
    marginVertical: 10,
    minHeight: 150,
  },
  cardTitle: {
    fontWeight: '500',
    color: '#000',
  },
  cardText: {
    color: '#aaa',
    fontSize: 16,
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 35,
  },
  cardIcon: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
  },
});

export default ProductList;
