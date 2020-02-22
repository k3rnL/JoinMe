import React, {Component} from 'react';
import {View, StyleSheet, Text } from 'react-native';
import MapScreen from './../components/Map';
import ContactsScreen from '../components/ContactsList';
import Button from '../components/Button';
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import * as firebase from "firebase";
import InputBar from "../components/InputBar";

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            inputValue: ''
        };
    }


    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Button title={'Contacts'} onPress={() => this.props.navigation.navigate('ContactSelection')}/>
                    <Button title={'Auth'} onPress={() => this.props.navigation.navigate('Auth')}/>
                    <Button title={'logout'} onPress={async () => await firebase.auth().signOut()}/>
                    {/*<InputBar/>*/}
                    <InputBar value={this.state.inputValue} onChange={evt => this.updateInputValue(evt)}/>
                    <Text>{this.props.uid}</Text>
                </View>
                <View style={styles.content}>
                    <MapScreen/>
                </View>
            </View>
        );
    }

    updateInputValue(evt) {
        this.setState({
            inputValue: evt.target.value
        });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'stretch',
        justifyContent: 'center',
    },
    header: {
        flex: 1,
        backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        flex: 3,
        backgroundColor: 'yellow',
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

export default connect(state => {
    console.log(state);
    return {uid: state.profile.uid};
})(Home);
// export default connect(state => ({ uid: state.uid }))(Home);
