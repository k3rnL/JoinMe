import React, { useEffect, useState } from 'react';
import {
  View, StyleSheet, FlatList, Text,
} from 'react-native';
import { connect } from 'react-redux';
import { Linking } from 'expo';
import PropTypes from 'prop-types';
import StaticMap from '../components/StaticMap';
import Button from '../components/Button';
import { ApiService } from '../services/ApiService';
import {ListItem} from "react-native-elements";

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
      <Button title="Go to this party !" onPress={() => Linking.openURL(googleMapUrl)} />
      <FlatList
        keyExtractor={((item) => (item.phone))}
        data={members}
        renderItem={({ item }) => (<ListItem title={item.phone} />)}
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
