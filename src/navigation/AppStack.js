import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import HomeScreen from '../screens/Homescreen';
import ProductList from '../screens/ProductScreen';
import EventListScreen from '../screens/EventListScreen';
import EventDetailsScreen from '../screens/EventDetailsScreen';
import UserProfileScreen from '../screens/UserProfileScreen';
import EditProfileScreen from '../screens/EditProfileScreen';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator>
      {/* <Stack.Screen
        name="ProductList"
        component={ProductList}
        options={{headerShown: false}}
      /> */}
      <Stack.Screen name="EventList" component={EventListScreen} />
      <Stack.Screen name="EventDetails" component={EventDetailsScreen} />
      <Stack.Screen name="UserProfile" component={UserProfileScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />


      {/* <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
      /> */}
    </Stack.Navigator>
  );
};

export default AppStack;
