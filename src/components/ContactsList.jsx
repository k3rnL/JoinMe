import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, FlatList, CheckBox, TouchableOpacity} from 'react-native';
import * as Constants from "expo-constants";
import * as Contacts from 'expo-contacts';


async function loadContacts(setContact) {
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

    const contactsCleaned = contacts.data.filter((contact, index) => {
        return contacts.data.findIndex((obj) => {
            return obj.id === contact.id;
        })
    });

    setContact(contactsCleaned);
}

export default function ContactsList(props) {

    const [contacts, setContacts] = useState([]);
    const [selected, setSelected] = useState({});

    useEffect(() => loadContacts(setContacts), []);

    const {filter = '', selectedContactChanged = null} = props;

    // let filtered = [];
    // for (let i = 0; i < contacts.length; i++) {
    //     const contact = contacts[i];
    //     if (contact.name.match('(' + filter + ')\\w+'))
    //         filtered.push(contact);
    // }

    return (
        <View style={styles.container}>
            <FlatList
                data={contacts}
                renderItem={({item}) => renderItem(item, selected, setSelected, selectedContactChanged)}
            />
        </View>
    );
}


function renderItem(item, selected, setSelected, selectedContactChanged)
{
    return (
        <TouchableOpacity style={{width: '100%', flexDirection: 'row', alignItems: 'space-between'}}
                          onPress={() => itemSelected(item, setSelected, selectedContactChanged)}>
            <Text style={styles.item}>{item.name}</Text>
            <CheckBox style={{}} onPress={() => itemSelected(item)} value={isItemSelected(item, selected)}/>
        </TouchableOpacity>
    );
}

function isItemSelected(item, selected)
{
    console.log(JSON.stringify(selected));
    return item.phoneNumbers ? selected[item.phoneNumbers[0].number] : false;
}

function itemSelected(item, setSelected, selectedContactChanged)
{
    const selected = {...selected};

    const phone = item.phoneNumbers[0].number;

    if (selected[phone]) {
        selected[phone] = !selected[phone];
    } else
        selected[phone] = true;

    setSelected(selected);

    if (selectedContactChanged)
        selectedContactChanged(selected);
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
