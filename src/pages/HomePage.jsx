import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import MapScreen from './../components/Map';
import ContactsScreen from '../components/ContactsList';
import {Button} from "react-native";
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import * as firebase from "firebase";
import * as Permissions from "expo-permissions";
import {Notifications} from "expo";
import store from "../stores";

class Home extends Component {

    async componentDidMount() {
        const {status} = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        // only asks if permissions have not already been determined, because
        // iOS won't necessarily prompt the user a second time.
        // On Android, permissions are granted on app installation, so
        // `askAsync` will never prompt the user

        // Stop here if the user did not grant permissions
        if (status !== 'granted') {
            alert('No notification permissions!');
            return;
        }
        let token = await Notifications.getExpoPushTokenAsync();
        console.log('Expo FCM ' + token);
        console.log(JSON.stringify(store.getState().profile.uid));
        console.log('UID: ' + this.props);
        console.dir(this.props);
        // ApiService.registerUser(this.state.uid)
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Button title={'Contacts'} onPress={() => this.props.navigation.navigate('ContactSelection')}/>
                    <Button title={'Auth'} onPress={() => this.props.navigation.navigate('Auth')}/>
                    <Button title={'logout'} onPress={async () => await firebase.auth().signOut()}/>
                    <Text>{this.props.uid}</Text>
                </View>
                <View style={styles.content}>
                    <MapScreen />
                </View>
            </View>
        );
    }
}

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

export default connect(state => {
    console.log(state);
    return {uid: state.profile.uid };
})(Home);
// export default connect(state => ({ uid: state.uid }))(Home);
