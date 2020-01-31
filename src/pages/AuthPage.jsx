import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import ContactsList from '../components/ContactsList'
import AuthTmpScreen, {PartyListScreen} from "../Parties/PartyListScreen";

class Auth extends Component {
    render() {
        return (
            <View style={styles.container}>
                <AuthTmpScreen/>
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

export default Auth;
