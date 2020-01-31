import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import { registerRootComponent } from 'expo';
import * as firebase from 'firebase';
import Home from './pages/HomePage';

import firebaseConfig from '../config/firebase.js';

firebase.initializeApp(firebaseConfig);

// const AppNavigator = createStackNavigator({
//   Home: {
//     screen: Home,
//   },
// });

// export default createAppContainer(AppNavigator);

export default registerRootComponent(Home);