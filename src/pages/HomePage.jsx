import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import InputBar from './../components/InputBar';
import MapScreen from './../components/Map';
import ContactsScreen from './../components/Contacts';

class Home extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <InputBar />
                </View>
                <View style={styles.content}>
                    <MapScreen />
                </View>
                <View style={styles.footer}>
                    <ContactsScreen />
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

export default Home;