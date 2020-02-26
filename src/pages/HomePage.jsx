import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { connect } from 'react-redux';
import * as Permissions from 'expo-permissions';
import { Notifications } from 'expo';
import * as Location from 'expo-location';
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
    backgroundColor: 'white',
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

function createParty(props, location) {
  console.log(JSON.stringify(location));
  props.dispatch(setPartyLocation(location));
  props.navigation.navigate('PartyCreation');
}

function goToProfile(props) {
  props.navigation.navigate('Profile');
}

function goToPartyList(props) {
  props.navigation.navigate('PartyList');
}

async function getLocationAsync(setLocation) {
  const { status } = await Permissions.askAsync(Permissions.LOCATION);
  if (status !== 'granted') {
    alert('Permission to access location was denied');
    return;
  }
  const location = await Location.getCurrentPositionAsync({});
  setLocation({
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
}

function Home(props) {
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  useEffect(() => {
    handleNotification();
    getLocationAsync(setLocation);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.floating}>
        <Image source={pin} style={styles.pin} />

        <Button
          onPress={() => { createParty(props, location); }}
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
        {location.latitude === 0 ? <View /> : (
          <Map
            location={location}
            onRegionChange={(region) => setLocation(region)}
          />
        )}
      </View>
    </View>
  );
}

export default connect((state) => ({ uid: state.profile.uid }))(Home);
