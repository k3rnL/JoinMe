import React, {Component} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Button from '../components/Button';
import {connect} from "react-redux";
import InputBar from "../components/InputBar";
import StaticMap from "../components/StaticMap";
import ContactsList from "../components/ContactsList";
import {setPartyName} from "../stores/action/partyCreation";
import {ApiService} from "../services/ApiService";

export const navigationOptions = ({ navigation, screenProps }) => ({
    // headerRight: () => <Button title={"Create !"} onPress={(navigation) => console.log(JSON.stringify(navigation))}/>
});

class PartyCreation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            contactFilter: '',
            selectedContacts: []
        };

        // this.props.navigation.setOptions({
        //     headerRight: () => (
        //         <Button onPress={() => console.log("oui")} title="Update count" />
        //     ),
        // });
    }

    componentDidMount() {
        // this.props.navigation.setParams('headerRight', (<Text>oui</Text>));
    }


    render() {
        return (
            <View style={styles.container}>
                <StaticMap style={styles.header} location={this.props.partyLocation}/>
                <View style={styles.content}>
                    <Button title={'confirm'} onPress={() => this.createParty()}/>
                    <Text>{'Create your event !'}</Text>
                    <InputBar placeholder={'Name your party !'} value={this.props.partyName} onChangeText={evt => this.props.dispatch(setPartyName(evt))}/>
                    <InputBar placeholder={'Search for contacts'} value={this.state.contactFilter} onChangeText={evt => this.contactFilterChanged(evt)}/>
                    <ContactsList selectedContactChanged={(list) => this.selectedContactsChanged(list)} filter={this.state.contactFilter}/>
                </View>
            </View>
        );
    }

    async createParty() {
        let id = await ApiService.createParty(this.props.partyName, this.props.partyLocation);
        await ApiService.addUsersByUid(this.props.uid, id);
    }

    contactFilterChanged(value) {
        this.setState({
            contactFilter: value,
            selectedContacts: this.state.selectedContacts
        });
    }

    selectedContactsChanged(contacts) {
        this.setState({
            ...this.state,
            selectedContacts: contacts,
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
        position: 'absolute',
        height: 200,
        backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        position: 'absolute',
        top: 200,
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

export default connect(state => {
    console.log(state);
    return {
        partyName: state.partyCreation.name,
        partyLocation: state.partyCreation.location,
        uid: state.profile.uid
    };
})(PartyCreation);
// export default connect(state => ({ uid: state.uid }))(Home);
