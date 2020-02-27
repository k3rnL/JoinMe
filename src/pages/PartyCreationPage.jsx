import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from 'react-native-loading-spinner-overlay';
import Button from '../components/Button';
import InputBar from '../components/InputBar';
import StaticMap from '../components/StaticMap';
import ContactsList from '../components/ContactsList';
import ApiService from '../services/ApiService';
import ErrorMessage from '../components/Error';
import { setParty } from '../stores/action/party';

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

async function createParty(props, uid, partyName, partyLocation, selectedContacts, setShowLoader) {
  setShowLoader(true);
  const location = generateStringLocation(partyLocation);
  const phoneNumbers = selectedContacts.map((contact) => (contact.phoneNumbers[0].number));
  const id = await ApiService.createParty(partyName, location);
  await ApiService.addUsersByUid([uid], id.id);
  await ApiService.addUsersByPhoneNumber(phoneNumbers, id.id);
  const party = await ApiService.getParty(id.id);
  props.dispatch(setParty(party));
  props.navigation.goBack();
  props.navigation.navigate('Party');
}

function PartyCreation(props) {
  const { uid, partyLocation } = props;

  const [contactFilter, setContactFilter] = useState('');
  const [error, setError] = useState('');
  const [eventName, setEventName] = useState('');
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [showLoader, setShowloader] = useState(false);

  return (
    <View style={[styles.container]}>
      <Spinner visible={showLoader} />
      <StaticMap style={styles.header} location={generateStringLocation(partyLocation)} />
      <View style={styles.content}>
        <ErrorMessage message={error} />
        <Button
          title="confirm"
          onPress={() => {
            if (eventName === '') {
              setError('Do not forget to fill the name field');
            } else {
              createParty(props, uid, eventName, partyLocation, selectedContacts, setShowloader);
            }
          }}
        />
        <Text>Create your event !</Text>
        <InputBar
          style={error ? { borderColor: 'red' } : {}}
          placeholder="Name your party !"
          value={eventName}
          onChangeText={(name) => setEventName(name)}
        />
        <InputBar
          placeholder="Search for contacts"
          value={contactFilter}
          onChangeText={(filter) => {
            if (filter !== '') {
              const inputCleaned = filter.match(/[A-Za-z\s]+/i);
              setContactFilter(inputCleaned ? inputCleaned[0] : '');
            } else {
              setContactFilter('');
            }
          }}
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
  partyLocation: PropTypes.shape({
    latitude: PropTypes.number,
    longitude: PropTypes.number,
    latitudeDelta: PropTypes.number,
    longitudeDelta: PropTypes.number,
  }),
};

PartyCreation.defaultProps = {
  uid: '',
  partyLocation: {
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  },
};

export default connect((state) => ({
  partyLocation: state.partyCreation.location,
  uid: state.profile.uid,
}))(PartyCreation);
