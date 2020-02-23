import {
    FlatList,
    Keyboard,
    KeyboardAvoidingView,
    Modal, StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from "react-native";
import {useState} from "react";
import {Container, Icon, Input, Item} from "native-base";
import Button from "./Button";
import React from "react";

import data from '../assets/Countries'

const defaultFlag = data.filter(
    obj => obj.name === 'United Kingdom'
)[0].flag;

export default function InputBarPhone(props) {

    const [ flag, setFlag ] = useState(defaultFlag);
    const [ modalVisible, setModalVisible ] = useState(false);
    const [ phoneNumber, setPhoneNumber ] = useState('');
    const defaultCode = '+44';

    return (
                <View style={styles.container}>
                    <Container style={styles.infoContainer}>
                        {/* Phone input with native-base */}
                        {/* phone section  */}
                        <Item rounded style={styles.itemStyle}>
                            <Icon
                                active
                                name='call'
                                style={styles.iconStyle}
                            />
                            {/* country flag */}
                            <TouchableOpacity onPress={() => setModalVisible(true)}>
                                <View><Text style={{fontSize: 40}}>{flag}</Text></View>
                                {/* open modal */}
                            </TouchableOpacity>
                            <Input
                                style={styles.input}
                                placeholder='+44'
                                placeholderTextColor='black'
                                keyboardType={'phone-pad'}
                                returnKeyType='done'
                                autoCapitalize='none'
                                autoCorrect={false}
                                secureTextEntry={false}
                                // ref='PhoneInput'
                                value={phoneNumber}
                                onChangeText={(val) => {
                                    if (phoneNumber === '') {
                                        // render UK phone code by default when Modal is not open
                                        setPhoneNumber(defaultCode + val);
                                    } else {
                                        // render country code based on users choice with Modal
                                        setPhoneNumber(val);
                                    }
                                }}
                            />
                            {/* Modal for country code and flag */}
                            <Modal
                                animationType="slide" // fade
                                transparent={false}
                                visible={modalVisible}>
                                <View style={{flex: 1}}>
                                    <View style={{flex: 10, paddingTop: 0, backgroundColor: 'black', zIndex: 0}}>
                                        <FlatList
                                            data={data}
                                            keyExtractor={(item, index) => index.toString()}
                                            renderItem={
                                                ({item}) =>
                                                    <TouchableWithoutFeedback
                                                        onPress={() => getCountry(item.name, setModalVisible, setPhoneNumber, setFlag)}>
                                                        <View
                                                            style={
                                                                [
                                                                    styles.countryStyle,
                                                                    {
                                                                        flexDirection: 'row',
                                                                        alignItems: 'center',
                                                                        justifyContent: 'space-between'
                                                                    }
                                                                ]
                                                            }>
                                                            <Text style={{fontSize: 45}}>
                                                                {item.flag}
                                                            </Text>
                                                            <Text style={{fontSize: 20, color: 'black'}}>
                                                                {item.name} ({item.dial_code})
                                                            </Text>
                                                        </View>
                                                    </TouchableWithoutFeedback>
                                            }
                                        />
                                    </View>
                                    <View pointerEvents={'box-none'} style={{alignItems: 'center', position: 'absolute', width: '100%', height: '100%',  backgroundColor: '#00000000'}}>
                                        <Button
                                            onPress={() => setModalVisible(false)}
                                            style={styles.closeButtonStyle}
                                            title={"close"}
                                        />
                                    </View>
                                </View>
                            </Modal>
                        </Item>
                    </Container>
                </View>
    );
}

async function getCountry(country, setModalVisible, setPhoneNumber, setFlag) {
    const countryData = data;
    try {
        const countryCode = await countryData.filter(
            obj => obj.name === country
        )[0].dial_code;
        const countryFlag = await countryData.filter(
            obj => obj.name === country
        )[0].flag;
        // Set data from user choice of country
        setFlag(countryFlag);
        setPhoneNumber(countryCode);
        setModalVisible(false);
    } catch (err) {
        console.log(err)
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff', //'#5059ae',
        justifyContent: 'center',
        flexDirection: 'column'
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
});