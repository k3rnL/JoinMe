import React, {Component} from "react";
import { Text, View, TextInput, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview'
import * as firebase from "firebase";
import url from 'url';

const captchaUrl = 'https://joinme-2aa7a.firebaseapp.com/captcha.html'; // link to your captcha.html

export default class PartyListScreen extends Component {

    constructor (props) {
        super(props);
        this.state = {
            showModal: false,
            codeIsSent: false,
            confirmation: {},
            errorMessage: ""
        }
    }

    _handleResponse = data => {
        let query = url.parse(data.url, true).query;

        if (query.hasOwnProperty('token')) {
            this._sendConfirmationCode(query.token);
        } else if (query.hasOwnProperty('cancel')) {
            this.setState({ showModal: false});
        }
    };

    _signUp = () => {
        if (this.state.codeIsSent) {
            this._confirmCode();
        }else {
            this.setState({
                showModal: true
            })
        }
    };

    _sendConfirmationCode = (captchaToken) => {
        this.setState({ showModal: false });
        let number = `+${this.state.input_value}`;
        const captchaVerifier = {
            type: 'recaptcha',
            verify: () => Promise.resolve(captchaToken)
        };
        firebase.auth().signInWithPhoneNumber(number, captchaVerifier)
            .then((confirmation) => {
                this.setState({confirmation, codeIsSent: true, input_value: "", errorMessage: ""})
            })
            .catch((err) => {
                this.setState({errorMessage: "Oops! something is wrong"});
            });
    };

    _confirmCode = () => {
        this.state.confirmation.confirm(this.state.input_value)
            .then((result) => {
                this.setState({isAuthenticated: true});
            })
            .catch((err) => {
                this.setState({errorMessage: "Oops! something is wrong"});
            });
    };

    renderCaptchScreen = () => {
        return (
            <View style={{ marginTop: 100 }}>
                <Modal
                    visible={this.state.showModal}
                    onRequestClose={() => this.setState({ showModal: false })}
                >
                    <WebView
                        source={{ uri: captchaUrl }}
                        onNavigationStateChange={data =>
                            this._handleResponse(data)
                        }
                        injectedJavaScript={`document.f1.submit()`}
                    />
                </Modal>
            </View>
        )
    };

    renderLoginScreen = () => {
        const {
            container,
            headerText,
            descriptionText,
            phoneNumberContainer,
            phoneNumberText,
            errorMessage,
            errorMessageText,
            continueButtonContainer,
            continueButton
        } = styles;

        return (
            <View style={container}>
                <Text style={headerText}>Welcome to Firebase phone auth</Text>
                {
                    this.state.codeIsSent ?
                        <Text style={descriptionText}>Please Enter your confirmation code</Text>
                        :
                        <Text style={descriptionText}>Please Enter your phone number to continue</Text>
                }
                <View stlye={phoneNumberContainer}>
                    <TextInput
                        style={phoneNumberText}
                        placeholder={this.state.codeIsSent ? 'Confirmation Code' : 'Phone Number'}
                        placeholderTextColor={'#a9a9a9'}
                        keyboardType={'numeric'}
                        value={this.state.input_value}
                        onChangeText={input_value => this.setState({input_value})}
                    >
                    </TextInput>
                </View>
                {
                    this.state.errorMessage ?
                        <View>
                            <Text style={errorMessageText}>{this.state.errorMessage}</Text>
                        </View>
                        : null
                }

                <View
                    style={continueButtonContainer}
                >
                    <TouchableOpacity
                        onPress={this._signUp}
                    >
                        <Text style={continueButton}>Continue</Text>
                    </TouchableOpacity>
                </View>



                {this.renderCaptchScreen()}

            </View>
        )
    };

    renderMainScreen = () => {
        const {
            container,
            headerText
        } = styles;

        return (
            <View style={container}>
                <Text style={headerText}>You are successfully signed In</Text>
            </View>
        )
    };


    render() {


        return (
            this.state.isAuthenticated ? this.renderMainScreen() : this.renderLoginScreen()

        );
    }
}


const styles = StyleSheet.create({
    container: {
        height: "100%",
        padding: 10,
        backgroundColor: 'white',
        alignItems: 'center',
    },
    headerText: {
        color: '#135cb3',
        fontSize: 25,
        textAlign: "center",
        fontWeight: '500',
        marginBottom: 5
    },
    descriptionText: {
        fontSize: 16,
        marginBottom: 20
    },
    phoneNumberContainer: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        marginBottom: 20,
    },
    phoneNumberText: {
        borderColor: '#8c8c8c',
        borderBottomWidth: 1,
        fontSize: 16,
        minWidth: 180
    },
    continueButtonContainer: {
        marginTop: 20,
        paddingHorizontal: 22,
        paddingVertical: 10,
        width: 100,
        alignItems: "center",
    },
    continueButton:{
        backgroundColor: '#2b7cd9',
        borderRadius: 24,
        fontSize: 16,
        paddingTop: 12,
        minWidth: 100,
        color: "#fff",
        textAlign: "center",
        justifyContent: "center"
    },
    errorMessageText: {
        marginTop: 10,
        color: "red",
        fontSize: 18
    }

});

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//         paddingTop: Constants.default.statusBarHeight,
//         backgroundColor: '#ecf0f1',
//     },
//     paragraph: {
//         margin: 24,
//         fontSize: 18,
//         fontWeight: 'bold',
//         textAlign: 'center',
//         color: '#34495e',
//     },
//     item: {
//         padding: 10,
//         fontSize: 18,
//         height: 44,
//     },
// });

