import React, { Component } from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { registerRootComponent } from 'expo';
import Home from './pages/HomePage';
import Auth from './pages/AuthPage'
import InputBar from "./components/InputBar";
import ContactsScreen from "./components/ContactsList";
import ContactSelection from "./pages/ContactSelectionPage";
import firebaseConfig from "../config/firebase";
import * as firebase from "firebase";

firebase.initializeApp(firebaseConfig);

class ViewA extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <InputBar />
                </View>
                <View style={styles.content}>
                    <Text>ViewA</Text>
                </View>
                <View style={styles.footer}>
                    <ContactsScreen />
                </View>
            </View>
        );
    }
}

const HomeStack = createStackNavigator({
    Home : {
        screen: Home
    },
    ContactSelection : {
        screen: ContactSelection
    },
    Auth : {
        screen: Auth
    }
}, {
    initialRouteName: 'Home'
});

registerRootComponent(createAppContainer(HomeStack));

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'stretch',
        justifyContent: 'center',
    },
    header: {
        flex: 1,
        backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        flex: 3,
        backgroundColor: 'yellow',
        alignItems: 'center',
        justifyContent: 'center',
    },
    footer: {
        flex: 1,
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

