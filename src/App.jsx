import React, { Component } from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import { registerRootComponent } from 'expo';
import * as firebase from 'firebase';
import Home from './pages/HomePage';

import firebaseConfig from '../config/firebase.js';
import InputBar from "./components/InputBar";
import MapScreen from "./components/Map";
import ContactsScreen from "./components/Contacts";
import {Button} from "react-native";

// const AppNavigator = createStackNavigator({
//   Home: {
//     screen: Home,
//   },
// });

// export default createAppContainer(AppNavigator);

class Main extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <Button title={'ViewA'} onPress={() => this.props.navigation.navigate('ViewA')}/>
                    <Button title={'ViewB'} onPress={() => this.props.navigation.navigate('ViewB')}/>
                </View>
            </View>
        );
    }
}

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

const EntryStack = createStackNavigator({
    Main : {
        screen: Main
    },
    ViewA : {
        screen: ViewA
    },
    ViewB : {
        screen: ViewA
    }
});

const TestStack = createStackNavigator({
    ViewA : {
        screen: ViewA
    },
    ViewB : {
        screen: ViewA
    }
});

class App extends React.Component{
    constructor(props) {
        super(props);
        firebase.initializeApp(firebaseConfig);
    }

    render(){
        return <EntryStack />;
    }
}

registerRootComponent(createAppContainer(EntryStack));
// const AppContainer = createAppContainer(EntryStack)
// export default AppContainer;

// AppRegistry.registerComponent('main', () => App);

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

