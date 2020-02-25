import { connect } from 'react-redux';
import {
  Text, View, TouchableOpacity, FlatList, StyleSheet,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ApiService } from '../services/ApiService';
import { setParty } from '../stores/action/party';

const styles = StyleSheet.create({
  container: {
    height: '100%',
    padding: 10,
    backgroundColor: 'white',
    alignItems: 'center',
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
          <TouchableOpacity onPress={() => goToParty(props, item)}>
            <Text style={styles.item}>{`${item.name}`}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

export default connect((state) => ({ uid: state.profile.uid }))(PartyList);

PartyList.propTypes = {
  uid: PropTypes.string,
};

PartyList.defaultProps = {
  uid: '',
};
