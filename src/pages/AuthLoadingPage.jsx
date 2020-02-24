import React, { Component } from 'react';
import { View } from 'react-native';
import * as firebase from "firebase";
import {updatePhoneNumber, updateUid} from "../stores/action/profile";
import {connect} from "react-redux";
import {ApiService} from "../services/ApiService";


class AuthLoadingPage extends Component {

    componentDidMount() {
        this.listener = firebase.auth().onAuthStateChanged(
            async authUser => {
                let uid;
                if (authUser === null) {
                    uid = null;
                    this.props.dispatch(updateUid(uid));
                    this.props.navigation.navigate('Auth');
                }
                else {
                    await ApiService.registerUser(authUser.uid, '');
                    const user = await ApiService.getUser(authUser.uid);
                    uid = authUser.uid;
                    this.props.dispatch(updateUid(uid));
                    this.props.dispatch(updatePhoneNumber(user.phone));
                    this.props.navigation.navigate('App');
                }
            },
            () => {
            },
        );
    }

    render() {
        return (
            <View/>
        );
    }

}

export default connect(state => ({ uid: state.uid }))(AuthLoadingPage);
