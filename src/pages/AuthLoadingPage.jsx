import React, { Component } from 'react';
import { View } from 'react-native';
import * as firebase from "firebase";
import {updateUid} from "../stores/action/profile";
import {connect, Provider} from "react-redux";


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
                    uid = authUser.uid;
                    this.props.dispatch(updateUid(uid));
                    this.props.navigation.navigate('App');
                }
            },
            () => {
                // this.props.dispatch({type: 'TEST', null});
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
