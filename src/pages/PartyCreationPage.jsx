import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '../components/Button';
import InputBar from '../components/InputBar';
import StaticMap from '../components/StaticMap';
import ContactsList from '../components/ContactsList';
import { setPartyName } from '../stores/action/partyCreation';
import ApiService from '../services/ApiService';
import ErrorMessage from '../components/Error';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  header: {
    position: 'absolute',
    height: 200,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    height: '100%',
    position: 'absolute',
    top: 200,
    paddingBottom: 200,
    width: '100%',
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

function generateStringLocation(partyLocation) {
  return `${partyLocation.latitude},${partyLocation.longitude}`;
}

async function createParty(uid, partyName, partyLocation, selectedContacts) {
  const location = generateStringLocation(partyLocation);
  const phoneNumbers = selectedContacts.map((contact) => (contact.phoneNumbers[0].number));
  const id = await ApiService.createParty(partyName, location);
  await ApiService.addUsersByUid([uid], id.id);
  await ApiService.addUsersByPhoneNumber(phoneNumbers, id.id);
}

function setName(props, name, setEventName) {
  setEventName(name);
  props.dispatch(setPartyName(name));
}

function PartyCreation(props) {
  const { uid, partyName, partyLocation } = props;

  const [contactFilter, setContactFilter] = useState('');
  const [error, setError] = useState('');
  const [eventName, setEventName] = useState('');
  const [selectedContacts, setSelectedContacts] = useState([]);

  return (
    <View style={[styles.container]}>
      <StaticMap style={styles.header} location={generateStringLocation(partyLocation)} />
      <View style={styles.content}>
        <ErrorMessage message={error} />
        <Button
          title="confirm"
          onPress={() => {
            if (eventName === '') {
              setError('Do not forget to fill the name field');
            } else {
              createParty(uid, partyName, partyLocation, selectedContacts);
            }
          }}
        />
        <Text>Create your event !</Text>
        <InputBar
          style={error ? { borderColor: 'red' } : {}}
          placeholder="Name your party !"
          value={partyName}
          onChangeText={(name) => setName(props, name, setEventName)}
        />
        <InputBar
          placeholder="Search for contacts"
          value={contactFilter}
          onChangeText={(filter) => setContactFilter(filter)}
        />
        <Text>{`${selectedContacts.length} contacts selected.`}</Text>
        <ContactsList
          selectedContactChanged={(list) => setSelectedContacts(list)}
          filter={contactFilter}
        />
      </View>
    </View>
  );
}

PartyCreation.propTypes = {
  uid: PropTypes.string,
  partyName: PropTypes.string,
  partyLocation: PropTypes.shape({
    latitude: PropTypes.number,
    longitude: PropTypes.number,
    latitudeDelta: PropTypes.number,
    longitudeDelta: PropTypes.number,
  }),
};

PartyCreation.defaultProps = {
  uid: '',
  partyName: '',
  partyLocation: {
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  },
};

export default connect((state) => ({
  partyName: state.partyCreation.name,
  partyLocation: state.partyCreation.location,
  uid: state.profile.uid,
}))(PartyCreation);
