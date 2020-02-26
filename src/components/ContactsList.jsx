import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Text, View, StyleSheet, FlatList, TouchableOpacity,
} from 'react-native';
import * as Contacts from 'expo-contacts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
  },
  item: {
    fontSize: 18,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom: 5,
  },
  itemSelected: {
    backgroundColor: '#2F74C5',
  },
  itemUnselected: {
    backgroundColor: 'white',
  },
  selection: {
    height: 18,
    width: 18,
    margin: 5,
    borderRadius: 18 / 2,
    backgroundColor: '#2F74C5',
    borderWidth: 1,
  },
});

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
    const indexFound = contacts.data.findIndex((obj) => obj.id === contact.id);
    return index === indexFound && contact.phoneNumbers;
  });

  setContact(contactsCleaned);
}

async function itemSelected(item, selected, setSelected, selectedContactChanged) {
  const currentlySelected = [...selected];
  const { id } = item;

  const indexId = currentlySelected.indexOf(id);

  if (indexId === -1) {
    currentlySelected.push(id);
    setSelected(currentlySelected);
  } else {
    currentlySelected.splice(indexId, 1);
    setSelected(currentlySelected);
  }

  if (selectedContactChanged) {
    const contactIds = currentlySelected.map((idKey) => Contacts.getContactByIdAsync(idKey));
    const list = await Promise.all(contactIds);
    selectedContactChanged(list);
  }
}

function renderItem(item, selected, setSelected, selectedContactChanged) {
  const selectionStyle = [
    styles.item,
    styles.selection,
    selected.includes(item.id) ? styles.itemSelected : styles.itemUnselected,
  ];

  const onPressHandler = () => itemSelected(item, selected, setSelected, selectedContactChanged);

  return (
    <TouchableOpacity style={styles.item} onPress={onPressHandler}>
      <Text style={selectionStyle} />
      <Text style={styles.item}>{item.name}</Text>
    </TouchableOpacity>
  );
}

export default function ContactsList(props) {
  const [contacts, setContacts] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    async function load() {
      await loadContacts(setContacts);
    }
    load();
  }, []);

  const { filter = '', selectedContactChanged = null } = props;

  const regExp = new RegExp(`(${filter})+`, 'ig');
  const filtered = contacts.filter((contact) => contact.name.match(regExp));
  const data = filtered.length ? filtered : contacts;

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => `${item.name}-${item.id}`}
        renderItem={({ item }) => renderItem(item, selected, setSelected, selectedContactChanged)}
      />
    </View>
  );
}

ContactsList.propTypes = {
  filter: PropTypes.string,
  selectedContactChanged: PropTypes.func,
};

ContactsList.defaultProps = {
  filter: '',
  selectedContactChanged: null,
};
