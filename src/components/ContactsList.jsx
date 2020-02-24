import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, FlatList, CheckBox, TouchableOpacity} from 'react-native';
import * as Contacts from 'expo-contacts';


async function loadContacts(setContact) {
    const permission = await Contacts.requestPermissionsAsync();

    if (permission.status !== 'granted') {
        return;
    }

    const contacts = await Contacts.getContactsAsync({
        fields: [
            Contacts.PHONE_NUMBERS,
        ],
        pageSize: 10000,
        pageOffset: 0,
    });

    const contactsCleaned = contacts.data.filter((contact, index) => {
        return index === contacts.data.findIndex((obj) => {
            return obj.id === contact.id;
        }) && contact.phoneNumbers;
    });

    setContact(contactsCleaned);
}

export default function ContactsList(props) {

    const [contacts, setContacts] = useState([]);
    const [selected, setSelected] = useState({});

    useEffect(() => {
        async function load() {
            await loadContacts(setContacts);
        }
        load();
    }, []);

    const {filter = '', selectedContactChanged = null} = props;

    // let filtered = [];
    // for (let i = 0; i < contacts.length; i++) {
    //     const contact = contacts[i];
    //     if (contact.name.match('(' + filter + ')\\w+'))
    //         filtered.push(contact);
    // }

    return (
        <View style={styles.container}>
            <Text>{0} contacts selected.</Text>
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
        <TouchableOpacity style={styles.item}
                          onPress={() => itemSelected(item, selected, setSelected, selectedContactChanged)}>
            <Text style={[styles.item, styles.selection, selected[item.id] ? styles.itemSelected : styles.itemUnselected]}> </Text>
            <Text style={styles.item}>{item.name}</Text>
        </TouchableOpacity>
    );
}

function itemSelected(item, selected, setSelected, selectedContactChanged)
{
    const currentlySelected = {...selected};

    const id = item.id;

    if (currentlySelected[id]) {
        currentlySelected[id] = !currentlySelected[id];
    } else {
        currentlySelected[id] = true;
    }

    setSelected(currentlySelected);

    if (selectedContactChanged)
        selectedContactChanged(currentlySelected);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 10,
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#34495e',
    },
    item: {
        fontSize: 18,
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 5,
        paddingBottom: 5,
    },
    itemSelected: {
        backgroundColor: '#2F74C5'
    },
    itemUnselected: {
        backgroundColor: 'white'
    },
    selection: {
        height: 18,
        width: 18,
        margin: 5,
        borderRadius: 18/2,
        backgroundColor: '#2F74C5',
        borderWidth: 1
    }
});
