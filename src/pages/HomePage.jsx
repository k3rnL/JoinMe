import React, {useEffect} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import Map from './../components/Map';
import Button from '../components/Button';
import {connect} from 'react-redux'
import {setPartyLocation} from "../stores/action/partyCreation"
import * as Permissions from "expo-permissions";
import {Notifications} from "expo";
import store from "../stores";
import {ApiService} from "../services/ApiService";
import ProfileButton from "../components/ProfileButton";
import ListButton from "../components/ListButton";

export const navigationOptions = {
    headerShown: false
};

function Home(props) {

    useEffect(() => {
        handleNotification();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.floating}>
                <Image source={require('../assets/pin.png')} style={styles.pin}/>

                <Button onPress={() => {
                    props.dispatch(setPartyLocation('35 avenue garonette toulouse'));
                    props.navigation.navigate('PartyCreation');
                }} title={'Create a party !  🎉'} style={styles.buttonCreate}/>

                <ProfileButton style={styles.profile} onPress={() => {
                    props.dispatch(setPartyLocation('35 avenue garonette toulouse'));
                    props.navigation.navigate('PartyCreation');
                }}/>
                <ListButton style={styles.partyList} onPress={() => {
                    props.navigation.navigate('PartyCreation');
                }}/>
            </View>

            <View style={styles.content}>
                <Map/>
            </View>
        </View>
    );
}

async function handleNotification() {
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
    await ApiService.registerUser(store.getState().profile.uid, token);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'stretch',
        justifyContent: 'center',
    },
    floating: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    content: {
        flex: 3,
        backgroundColor: 'yellow',
        alignItems: 'center',
        justifyContent: 'center',
    },
    profile: {
        zIndex: 3,
        position: 'absolute',
        top: '7%',
        left: '7%'
    },
    partyList: {
        zIndex: 3,
        position: 'absolute',
        top: '7%',
        right: '7%'
    },
    buttonCreate: {
        zIndex: 3,
        position: 'absolute',
        bottom: '5%',
    },
    pin: {
        zIndex: 3,
        width: 50,
        height: 50
    }
});

export default connect(state => {
    console.log(state);
    return {uid: state.profile.uid};
})(Home);
// export default connect(state => ({ uid: state.uid }))(Home);
