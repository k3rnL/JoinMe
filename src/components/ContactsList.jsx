import React, {Component} from 'react';
import {Text, View, StyleSheet, FlatList, CheckBox, TouchableOpacity} from 'react-native';
import * as Constants from "expo-constants";
import * as Contacts from 'expo-contacts';

export default class ContactsList extends Component {

    state = {
        contacts: [],
        selected: {}
    };

    async componentDidMount() {
        const permission = await Contacts.requestPermissionsAsync();

        if (permission.status !== 'granted') {
            return;
        }

        const contacts = await Contacts.getContactsAsync({
            fields: [
                Contacts.PHONE_NUMBERS,
                Contacts.EMAILS,
            ],
            pageSize: 10000,
            pageOffset: 0,
        });

        this.setState({contacts: contacts.data});
    }

    render() {
        const {filter = ''} = this.props;

        let filtered = [];
        for (let i = 0; i < this.state.contacts.length; i++) {
            const contact = this.state.contacts[i];
            if (contact.name.match('(' + filter + ')\\w+'))
                filtered.push(contact);
        }

        return (
            <View style={styles.container}>
                <FlatList
                    data={filtered}
                    renderItem={({item}) => this.renderItem(item)}
                />
            </View>
        );
    }

    renderItem(item) {
        return (
            <TouchableOpacity style={{width: '100%', flexDirection: 'row', alignItems: 'space-between'}}
                              onPress={() => this.itemSelected(item)}>
                <Text style={styles.item}>{item.name}</Text>
                <CheckBox style={{}} onPress={() => this.itemSelected(item)} value={this.isItemSelected(item)}/>
            </TouchableOpacity>
        );
    }

    isItemSelected(item) {
        return item.phoneNumbers ? this.state.selected[item.phoneNumbers[0].number]: false;
    }

    itemSelected(item) {
        const selected = {...this.state.selected};

        const phone = item.phoneNumbers[0].number;

        if (selected[phone]) {
            selected[phone] = !selected[phone];
        }
        else
            selected[phone] = true;

        this.setState({
            ...this.state,
            selected: selected
        });

        if (this.props.selectedContactChanged)
            this.props.selectedContactChanged(selected);
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
        // flex: 1,
        // left: 0,
        // padding: 10,
        fontSize: 18,
        // height: 44,
    },
});
