import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import ContactsScreen from './ContactsScreen';
import MapScreen from "./MapScreen";
import * as firebase from "firebase";
import PartyListScreen from "./PartyListScreen";


const TabNavigator = createBottomTabNavigator({
    Map: MapScreen,
    Contacts: ContactsScreen,
    Firebase: PartyListScreen
});

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA4BxTCKwPHZ5bCw0pTKsfX0L1Z3wKdrbA",
    authDomain: "joinme-2aa7a.firebaseapp.com",
    databaseURL: "https://joinme-2aa7a.firebaseio.com",
    projectId: "joinme-2aa7a",
    storageBucket: "joinme-2aa7a.appspot.com",
    messagingSenderId: "1009470360932",
    appId: "1:1009470360932:web:af90568c3b3c13d05cbe71"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default createAppContainer(TabNavigator);
