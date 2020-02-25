import PropTypes from 'prop-types';
import React, {Component, useState} from "react";
import {View, Text, Image, StyleSheet, ImageBackground} from "react-native";
import Constants from 'expo-constants';
import {HeaderBackButton} from "react-navigation-stack";
import {LinearGradient} from 'expo-linear-gradient'
import {rgba} from 'polished'
import {connect} from "react-redux";

export class ImageHeader extends Component {

  static propTypes = {
    party: PropTypes.object,
  };

  render() {
    let party = this.props.party;
    let preview = 'https://maps.googleapis.com/maps/api/staticmap?center=' + encodeURI(party.address) +
      '&zoom=13&size=1800x1800&maptype=roadmap' +
      '&markers=color:blue%7C' + encodeURI(party.address) +
      '&key=AIzaSyAfv8IPCxhiURtrI8tDyQptGEVQoOl0G3c';
    return (
      <View style={{backgroundColor: '#eee'}}>
        <ImageBackground style={{left: 0, right: 0, top: 0, bottom: 0, height: 400}} source={{uri: preview}}
                         onLoad={console.log('LOL' + preview)}>
          <LinearGradient
            start={rgba(1, 1, 1, 0)}
            end={rgba(1, 1, 1, 1)}
            colors={['#FFFFFF00', '#FFFFFF00', '#FFFFFF11', '#FFFFFF77', '#FFFFFFAA']}
            style={{
              width: '100%',
              height: 400
            }}
          />
        </ImageBackground>
        {/*<Text style={styles.headerTitle}>{party.name + 'cou cou'}</Text>*/}
        {/*<HeaderBackButton style={{*/}
        {/*    position: 'absolute',*/}
        {/*    top: Constants.statusBarHeight,*/}
        {/*    left: 5*/}
        {/*}}/>*/}
        {/*<Header  style={{ backgroundColor: 'transparent' }}/>*/}
      </View>
    );
  }

}

const navigationOptions = ({navigation, navigationOptions}) => {
  const {params} = navigation.state;

  let party = navigation.getParam('party');
  console.log('OUIIIIIII' + party);
  return {
    title: party.name,
    // headerTitleStyle: { color: '#000' },
    headerBackground: (props) => <ImageHeader {...props} party={party}/>,
    // headerRight: <HeaderBackButton/>
  };
};

function PartyPage(props) {

    const [ party, setParty ] = useState();
    const [ imageUrl, setImageUrl ] = useState();
    const [ googleMapUrl, setGoogleMapUrl ] = useState();

  // this.state = {
  //   party,
  //   url: 'https://www.google.com/maps/dir/?api=1&destination=' + encodeURI(party.address),
  //   preview: 'https://maps.googleapis.com/maps/api/staticmap?center=' + encodeURI(party.address) +
  //     '&zoom=13&size=1800x1800&maptype=roadmap' +
  //     '&markers=color:blue%7C' + encodeURI(party.address) +
  //     '&key=AIzaSyAfv8IPCxhiURtrI8tDyQptGEVQoOl0G3c'
  // }

  return (
    <View>
      {/*<Image style={{left: 0, right: 0, height: 100}} source={{uri: this.state.preview}} onLoad={console.log(this.state.preview)}/>*/}
    </View>
  );

}

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 30,
    position: 'absolute',
    left: 5,
    top: Constants.statusBarHeight
  },
});

export default connect((state) => ({uid: state.profile.uid}))(PartyPage);
