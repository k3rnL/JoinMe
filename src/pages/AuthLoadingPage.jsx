import React, { Component } from 'react';
import { View } from 'react-native';
import * as firebase from 'firebase';
import { connect } from 'react-redux';
import { updatePhoneNumber, updatePicture, updateUid } from '../stores/action/profile';
import ApiService from '../services/ApiService';

function authFailed(props, uid) {
  props.dispatch(updateUid(uid));
  props.navigation.navigate('Auth');
}

function auth(props, uid, user) {
  props.dispatch(updateUid(uid));
  props.dispatch(updatePhoneNumber(user.phone));
  props.dispatch(updatePicture(user.picture));
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
