import React, { Component } from 'react';
import { View, Alert } from 'react-native';
import * as firebase from 'firebase';
import { connect } from 'react-redux';
import * as Permissions from 'expo-permissions';
import { Notifications } from 'expo';
import { updatePhoneNumber, updatePicture, updateUid } from '../stores/action/profile';
import ApiService from '../services/ApiService';

async function handleNotification(uid) {
  const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
  // only asks if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  // On Android, permissions are granted on app installation, so
  // `askAsync` will never prompt the user

  // Stop here if the user did not grant permissions
  if (status !== 'granted') {
    Alert.alert('No notification permissions!');
    return;
  }
  const token = await Notifications.getExpoPushTokenAsync();
  await ApiService.registerUser(uid, token);
}

function authFailed(props, uid) {
  props.dispatch(updateUid(uid));
  props.navigation.navigate('Auth');
}

async function auth(props, uid, user) {
  props.dispatch(updateUid(uid));
  props.dispatch(updatePhoneNumber(user.phone));
  props.dispatch(updatePicture(user.picture));
  await handleNotification(uid);
  props.navigation.navigate('App');
}

class AuthLoadingPage extends Component {
  componentDidMount() {
    this.listener = firebase.auth().onAuthStateChanged(
      async (authUser) => {
        let uid;
        if (authUser === null) {
          uid = null;
          authFailed(this.props, uid);
        } else {
          await ApiService.registerUser(authUser.uid, '');
          const user = await ApiService.getUser(authUser.uid);
          uid = authUser.uid;
          auth(this.props, uid, user);
        }
      },
      () => {
      },
    );
  }

  render() {
    return (
      <View />
    );
  }
}

export default connect((state) => ({ uid: state.uid }))(AuthLoadingPage);
