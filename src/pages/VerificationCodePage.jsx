import React, {Component} from 'react';
import {
    View,
    Text,
    Modal,
    FlatList,
    StyleSheet,
    SafeAreaView,
    Keyboard,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Image,
} from 'react-native'
// native base imports
import {
    Container,
    Item,
    Input,
    Icon
} from 'native-base'

import data from '../assets/Countries'
import Button from "../components/Button";
import InputBarPhone from "../components/InputBarPhone";
import InputBar from "../components/InputBar";

// Default render of country flag
const defaultFlag = data.filter(
    obj => obj.name === 'United Kingdom'
)[0].flag


class Test extends Component {
    state = {
        flag: defaultFlag,
        modalVisible: false,
        phoneNumber: '',
    }

    onChangeText(key, value) {
        this.setState({
            [key]: value
        })
    }

    showModal() {
        this.setState({modalVisible: true})
    }

    hideModal() {
        this.setState({modalVisible: false})
        // Refocus on the Input field after selecting the country code
        this.refs.PhoneInput._root.focus()
    }

    render() {
        let {flag} = this.state
        const countryData = data
        return (
            <View style={styles.container}>
                <Image source={require('../assets/logo.png')}
                       style={{width: 160, height: 130, resizeMode: 'stretch'}}/>
                <InputBar placeholder={'Code'}/>
                <Button title={'OK'}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    logo: {
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'column',
        paddingVertical: 80
    },
    input: {
        flex: 1,
        fontSize: 17,
        fontWeight: 'bold',
        color: 'black',
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30,
        backgroundColor: '#ffffff',
    },
    itemStyle: {
        marginBottom: 10,
    },
    iconStyle: {
        color: '#000000',
        fontSize: 28,
        marginLeft: 15
    },
    buttonStyle: {
        alignItems: 'center',
        backgroundColor: '#b44666',
        padding: 14,
        marginBottom: 10,
        borderRadius: 3,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: "#fff",
    },
    textStyle: {
        padding: 5,
        fontSize: 20,
        color: 'black',
        fontWeight: 'bold'
    },
    countryStyle: {
        flex: 1,
        backgroundColor: 'white',
        borderTopColor: 'black',
        borderTopWidth: 1,
        padding: 12,
    },
    closeButtonStyle: {
        alignItems: 'center',
        bottom: '1%',
        position: 'absolute',
    }
})
export default Test;
