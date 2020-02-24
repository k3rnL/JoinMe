import React, { useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { connect } from 'react-redux';
import * as Permissions from 'expo-permissions';
import { Notifications } from 'expo';
import Map from '../components/Map';
import Button from '../components/Button';
import { setPartyLocation } from '../stores/action/partyCreation';
import store from '../stores';
import { ApiService } from '../services/ApiService';
import ProfileButton from '../components/ProfileButton';
import ListButton from '../components/ListButton';

export const navigationOptions = {
  headerShown: false,
};

async function handleNotification() {
  const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
  // only asks if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  // On Android, permissions are granted on app installation, so
  // `askAsync` will never prompt the user

  // Stop here if the user did not grant permissions
  if (status !== 'granted') {
    alert('No notification permissions!');
    return;
  }
  const token = await Notifications.getExpoPushTokenAsync();
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
    alignItems: 'center',
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
    left: '7%',
  },
  partyList: {
    zIndex: 3,
    position: 'absolute',
    top: '7%',
    right: '7%',
  },
  buttonCreate: {
    zIndex: 3,
    position: 'absolute',
    bottom: '5%',
  },
  pin: {
    zIndex: 3,
    width: 50,
    height: 50,
  },
});

const pin = require('../assets/pin.png');

function createParty(props) {
  props.dispatch(setPartyLocation('35 avenue garonette toulouse'));
  props.navigation.navigate('PartyCreation');
}

function goToProfile(props) {
  props.navigation.navigate('Profile');
}

function goToPartyList(props) {
  props.navigation.navigate('PartyList');
}

function Home(props) {
  useEffect(() => {
    handleNotification();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.floating}>
        <Image source={pin} style={styles.pin} />

        <Button
          onPress={() => { createParty(props); }}
          title="Create a party !  🎉"
          style={styles.buttonCreate}
        />

        <ProfileButton
          style={styles.profile}
          onPress={() => { goToProfile(props); }}
        />
        <ListButton
          style={styles.partyList}
          onPress={() => { goToPartyList(props); }}
        />
      </View>

      <View style={styles.content}>
        <Map />
      </View>
    </View>
  );
}


export default connect((state) => ({ uid: state.profile.uid }))(Home);
