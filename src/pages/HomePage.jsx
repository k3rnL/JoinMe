import React, {Component} from 'react';
import {View, StyleSheet, Text } from 'react-native';
import MapScreen from './../components/Map';
import ContactsScreen from '../components/ContactsList';
import Button from '../components/Button';
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import * as firebase from "firebase";
import InputBar from "../components/InputBar";
import {setPartyLocation} from "../stores/action/partyCreation"
import * as Permissions from "expo-permissions";
import {Notifications} from "expo";
import store from "../stores";
import {ApiService} from "../services/ApiService";

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            inputValue: ''
        };
    }

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
        await ApiService.registerUser(store.getState().profile.uid, token);
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Button title={'Creation'} onPress={() => {
                        this.props.dispatch(setPartyLocation('35 avenue garonette toulouse'));
                        this.props.navigation.navigate('PartyCreation');
                    }}/>
                    <Button title={'Auth'} onPress={() => this.props.navigation.navigate('Auth')}/>
                    <Button title={'logout'} onPress={async () => await firebase.auth().signOut()}/>
                    <InputBar value={this.state.inputValue} onChange={evt => this.updateInputValue(evt)}/>
                    <Text>{this.props.uid}</Text>
                </View>
                <View style={styles.content}>
                    <MapScreen/>
                </View>
            </View>
        );
    }

    updateInputValue(evt) {
        this.setState({
            inputValue: evt.target.value
        });
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
    return {uid: state.profile.uid};
})(Home);
// export default connect(state => ({ uid: state.uid }))(Home);
