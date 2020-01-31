// import React, {Component} from "react";
// import { Text, View, TextInput, TouchableOpacity, Modal, StyleSheet, FlatList, Button } from 'react-native';
// import { createStackNavigator } from 'react-navigation-stack';
// import { createAppContainer } from 'react-navigation';
// import { WebView } from 'react-native-webview'
// import * as firebase from "firebase";
// import url from 'url';
// import {ApiService} from "../services/ApiService";
// import PartyScreen from './Party';

// // Put in config File
// const captchaUrl = 'https://joinme-2aa7a.firebaseapp.com/captcha.html'; // link to your captcha.html

// export class PartyListScreen extends Component {

//     constructor (props) {
//         super(props);
//         this.state = {
//             loading: true,
//             showModal: false,
//             codeIsSent: false,
//             confirmation: {},
//             errorMessage: ""
//         }
//     }

//     componentDidMount() {
//         this.listener = firebase.auth().onAuthStateChanged(
//             async authUser => {
//                 if (authUser === null) {
//                     this.setState({loading: false, isAuthenticated: false});
//                 }
//                 else {
//                     // let token = await firebase.messaging().getToken();
//                     let parties = await ApiService.getUserParties(authUser.uid);
//                     // await ApiService.registerUser(authUser.uid, '');
//                     this.setState({loading: false, isAuthenticated: true, user: authUser, parties: parties.parties});
//                 }
//                 console.log('authUser:' + authUser);
//             },
//             () => {
//                 this.setState({ loading: false, isAuthenticated: false });
//                 console.log('ERROR ON LOGIN')
//                 },
//         );
//     }

//     _handleResponse = data => {
//         let query = url.parse(data.url, true).query;

//         if (query.hasOwnProperty('token')) {
//             this._sendConfirmationCode(query.token);
//         } else if (query.hasOwnProperty('cancel')) {
//             this.setState({ showModal: false});
//         }
//     };

//     _signUp = () => {
//         if (this.state.codeIsSent) {
//             this._confirmCode();
//         }else {
//             this.setState({
//                 showModal: true
//             })
//         }
//     };

//     _sendConfirmationCode = (captchaToken) => {
//         this.setState({ showModal: false });
//         let number = `+${this.state.input_value}`;
//         const captchaVerifier = {
//             type: 'recaptcha',
//             verify: () => Promise.resolve(captchaToken)
//         };
//         firebase.auth().signInWithPhoneNumber(number, captchaVerifier)
//             .then((confirmation) => {
//                 this.setState({confirmation, codeIsSent: true, input_value: "", errorMessage: ""})
//             })
//             .catch((err) => {
//                 this.setState({errorMessage: "Oops! something is wrong " + err});
//             });
//     };

//     _confirmCode = () => {
//         this.state.confirmation.confirm(this.state.input_value)
//             .then((result) => {
//                 // handled in componentDidMount
//             })
//             .catch((err) => {
//                 this.setState({errorMessage: "Oops! something is wrong " + err});
//             });
//     };

//     renderCaptchScreen = () => {
//         return (
//             <View style={{ marginTop: 100 }}>
//                 <Modal
//                     visible={this.state.showModal}
//                     onRequestClose={() => this.setState({ showModal: false })}
//                 >
//                     <WebView
//                         source={{ uri: captchaUrl }}
//                         onNavigationStateChange={data =>
//                             this._handleResponse(data)
//                         }
//                         injectedJavaScript={`document.f1.submit()`}
//                     />
//                 </Modal>
//             </View>
//         )
//     };

//     renderLoginScreen = () => {
//         const {
//             container,
//             headerText,
//             descriptionText,
//             phoneNumberContainer,
//             phoneNumberText,
//             errorMessage,
//             errorMessageText,
//             continueButtonContainer,
//             continueButton
//         } = styles;

//         return (
//             <View style={container}>
//                 <Text style={headerText}>Welcome to Firebase phone auth</Text>
//                 {
//                     this.state.codeIsSent ?
//                         <Text style={descriptionText}>Please Enter your confirmation code</Text>
//                         :
//                         <Text style={descriptionText}>Please Enter your phone number to continue</Text>
//                 }
//                 <View stlye={phoneNumberContainer}>
//                     <TextInput
//                         style={phoneNumberText}
//                         placeholder={this.state.codeIsSent ? 'Confirmation Code' : 'Phone Number'}
//                         placeholderTextColor={'#a9a9a9'}
//                         keyboardType={'numeric'}
//                         value={this.state.input_value}
//                         onChangeText={input_value => this.setState({input_value})}
//                     >
//                     </TextInput>
//                 </View>
//                 {
//                     this.state.errorMessage ?
//                         <View>
//                             <Text style={errorMessageText}>{this.state.errorMessage}</Text>
//                         </View>
//                         : null
//                 }

//                 <View
//                     style={continueButtonContainer}
//                 >
//                     <TouchableOpacity
//                         onPress={this._signUp}
//                     >
//                         <Text style={continueButton}>Continue</Text>
//                     </TouchableOpacity>
//                 </View>



//                 {this.renderCaptchScreen()}

//             </View>
//         )
//     };

//     renderMainScreen = () => {
//         const {
//             container,
//             headerText
//         } = styles;

//         console.log(this.state);

//         return (
//             <View style={container}>
//                 <Button onPress={() => this.setState({loading: false, isAuthenticated: false})} title={'Log out'} />
//                 <FlatList
//                     data={this.state.parties}
//                     renderItem={({item}) =>
//                         <TouchableOpacity onPress={() => {
//                             this.props.navigation.navigate('PartyScreen', {party: item});
//                             }
//                         }>
//                             <Text style={styles.item}>{item.name}</Text>
//                         </TouchableOpacity>}
//                 />
//                 <Text style={headerText}>You are successfully signed In</Text>
//             </View>
//         )
//     };


//     render() {
//         const {
//             container,
//             headerText
//         } = styles;

//         if (this.state.loading)
//             return (<View style={container}>
//                         {/*<Button onPress={this.setState({loading: false, isAuthenticated: false})} title={'Log out'} />*/}
//                         <Text>Loading...</Text>
//             </View>);

//         return (
//             this.state.isAuthenticated ? this.renderMainScreen() : this.renderLoginScreen()
//         );
//     }
// }

// const stackNavigator = createStackNavigator({
//     PartyListScreen,
//     PartyScreen
// });

// export default createAppContainer(stackNavigator);

// const styles = StyleSheet.create({
//     container: {
//         height: "100%",
//         padding: 10,
//         backgroundColor: 'white',
//         alignItems: 'center',
//     },
//     item: {
//         padding: 10,
//         fontSize: 18,
//         height: 44,
//     },
//     headerText: {
//         color: '#135cb3',
//         fontSize: 25,
//         textAlign: "center",
//         fontWeight: '500',
//         marginBottom: 5
//     },
//     descriptionText: {
//         fontSize: 16,
//         marginBottom: 20
//     },
//     phoneNumberContainer: {
//         flexDirection: 'row',
//         paddingHorizontal: 16,
//         marginBottom: 20,
//     },
//     phoneNumberText: {
//         borderColor: '#8c8c8c',
//         borderBottomWidth: 1,
//         fontSize: 16,
//         minWidth: 180
//     },
//     continueButtonContainer: {
//         marginTop: 20,
//         paddingHorizontal: 22,
//         paddingVertical: 10,
//         width: 100,
//         alignItems: "center",
//     },
//     continueButton:{
//         backgroundColor: '#2b7cd9',
//         borderRadius: 24,
//         fontSize: 16,
//         paddingTop: 12,
//         minWidth: 100,
//         color: "#fff",
//         textAlign: "center",
//         justifyContent: "center"
//     },
//     errorMessageText: {
//         marginTop: 10,
//         color: "red",
//         fontSize: 18
//     }

// });

// // const styles = StyleSheet.create({
// //     container: {
// //         flex: 1,
// //         alignItems: 'center',
// //         justifyContent: 'center',
// //         paddingTop: Constants.default.statusBarHeight,
// //         backgroundColor: '#ecf0f1',
// //     },
// //     paragraph: {
// //         margin: 24,
// //         fontSize: 18,
// //         fontWeight: 'bold',
// //         textAlign: 'center',
// //         color: '#34495e',
// //     },
// //     item: {
// //         padding: 10,
// //         fontSize: 18,
// //         height: 44,
// //     },
// // });
