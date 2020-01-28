import React, { Component } from 'react';
import { Text, View, StyleSheet, Alert, FlatList } from 'react-native';
import * as Constants from "expo-constants";
import * as Contacts from 'expo-contacts';
import {ApiService} from "../services/ApiService";

export default class ContactsScreen extends Component {

    state = {
        contacts: []
    };

    async componentDidMount() {
        const time = Date.now();
        const permission = await Contacts.requestPermissionsAsync();
        if (permission.status !== 'granted') { return; }

        const contacts = await Contacts.getContactsAsync({
            fields: [
                Contacts.PHONE_NUMBERS,
                Contacts.EMAILS,
            ],
            pageSize: 10000,
            pageOffset: 0,
        });

        const elapsed = (Date.now() - time) / 1000;
        // Alert.alert('Contacts Read', `Read ${contacts.data.length} contacts in ${elapsed} seconds`);
        this.setState({contacts: contacts.data});
        // console.log(this.state);

        console.log('end');
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.contacts}
                    renderItem={({item}) => <Text style={styles.item}>{item.name}</Text>}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: Constants.default.statusBarHeight,
        backgroundColor: '#ecf0f1',
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#34495e',
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
});
