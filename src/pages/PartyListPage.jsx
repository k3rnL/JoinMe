import { connect } from 'react-redux';
import {
  View, FlatList, StyleSheet,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ApiService from '../services/ApiService';
import { setParty } from '../stores/action/party';
import SwipeablePartyItemList from '../components/SwipeablePartyItemList';

const styles = StyleSheet.create({
  container: {
    height: '100%',
    padding: 10,
    backgroundColor: 'white',
    alignItems: 'stretch',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

function goToParty(props, party) {
  props.dispatch(setParty(party));
  props.navigation.navigate('Party');
}

async function getParties(uid, setParties) {
  const { parties } = await ApiService.getUserParties(uid);
  setParties(parties);
}

function deleteParty(uid, party, parties, setParties) {
  setParties(parties.filter((p) => p.id !== party.id));
  ApiService.unsubscribeToParty(uid, party.id);
}

function PartyList(props) {
  const [parties, setParties] = useState([]);

  const { uid } = props;

  useEffect(() => {
    getParties(uid, setParties);
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={((item) => `${item.id}`)}
        data={parties}
        renderItem={({ item }) => (
          <SwipeablePartyItemList
            party={item}
            onPress={() => goToParty(props, item)}
            onAction={() => deleteParty(uid, item, parties, setParties)}
          />
        )}
      />
    </View>
  );
}

PartyList.propTypes = {
  uid: PropTypes.string,
};

PartyList.defaultProps = {
  uid: '',
};

PartyList.navigationOptions = () => ({
  title: 'Your parties',
});

export default connect((state) => ({ uid: state.profile.uid }))(PartyList);
