import React from 'react';
import Swipeable from 'react-native-swipeable';
import {
  TouchableOpacity, StyleSheet, Image,
} from 'react-native';
import { ListItem } from 'react-native-elements';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  listItem: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftSwipeItem: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 20,
    backgroundColor: '#ff7472',
  },
  rightSwipeItem: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 20,
  },
  bin: {
    width: 40,
    height: 40,
  },
});

function generatePreview(location) {
  return `https://maps.googleapis.com/maps/api/staticmap?center=${encodeURI(location)
  }&zoom=19&size=180x180&maptype=roadmap`
    + `&markers=color:blue%7C${encodeURI(location)
    }&key=AIzaSyAfv8IPCxhiURtrI8tDyQptGEVQoOl0G3c`;
}

const binIcon = require('../assets/bin.png');

export default function SwipeablePartyItemList({ party, onPress, onAction }) {
  return (
    <Swipeable
      leftActionActivationDistance={200}
      leftButtons={[
        <TouchableOpacity onPress={() => onAction(party)} style={styles.leftSwipeItem}>
          <Image style={styles.bin} source={binIcon} />
        </TouchableOpacity>]}
    >
      <TouchableOpacity onPress={() => onPress(party)}>
        <ListItem
          title={party.name}
          subtitle={`${party.members.length} members`}
          leftAvatar={{ source: { uri: generatePreview(party.address) } }}
          bottomDivider
        />
      </TouchableOpacity>
    </Swipeable>
  );
}

SwipeablePartyItemList.propTypes = {
  party: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    address: PropTypes.string,
    members: PropTypes.array,
  }).isRequired,
  onPress: PropTypes.func,
  onAction: PropTypes.func,
};

SwipeablePartyItemList.defaultProps = {
  onPress: () => {},
  onAction: () => {},
};
