import {combineReducers, createStore} from 'redux'
import profileStore from './profile'
import partyCreationStore from './partyCreation'

export default createStore(combineReducers({ profile: profileStore, partyCreation: partyCreationStore }));
