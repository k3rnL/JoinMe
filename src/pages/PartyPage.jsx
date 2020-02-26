import React, { useEffect, useState } from 'react';
import {
  View, StyleSheet, FlatList, TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import { Linking } from 'expo';
import PropTypes from 'prop-types';
import { ListItem } from 'react-native-elements';
import StaticMap from '../components/StaticMap';
import Button from '../components/Button';
import ApiService from '../services/ApiService';

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    height: 200,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    paddingTop: 200,
    flex: 1,
    backgroundColor: '#fff',
  },
  buttonStyle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

function generateGoogleMapsUrl(party) {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURI(party.address)}`;
}

async function loadMembers(party, setMembers) {
  const members = await Promise.all(party.members.map((member) => ApiService.getUser(member.uid)));
  setMembers(members);
}

function itemView(item) {
  return (
    <TouchableOpacity onPress={() => Linking.openURL(`tel://${item.phone}`)}>
      <ListItem
        title={`${item.firstname || ''} ${item.lastname || ''}`}
        subtitle={item.phone}
        leftAvatar={{ source: { uri: item.picture } }}
        bottomDivider
      />
    </TouchableOpacity>
  );
}

function PartyPage(props) {
  const { party } = props;

  const [googleMapUrl] = useState(generateGoogleMapsUrl(party));
  const [members, setMembers] = useState([]);

  useEffect(() => {
    loadMembers(party, setMembers);
  }, []);

  return (
    <View style={styles.container}>
      <StaticMap style={styles.header} location={party.address} />
      <View style={styles.buttonStyle}>
        <Button title="Go to this party !" onPress={() => Linking.openURL(googleMapUrl)} />
      </View>
      <FlatList
        keyExtractor={((item) => (item.phone))}
        data={members}
        renderItem={({ item }) => itemView(item)}
      />
    </View>
  );
}

PartyPage.propTypes = {
  party: PropTypes.shape({
    address: PropTypes.string,
    members: PropTypes.array,
  }),
};

PartyPage.defaultProps = {
  party: {},
};

export default connect((state) => ({ party: state.party.party }))(PartyPage);
