import {combineReducers, createStore} from 'redux'
import profileStore from './profile'

export default createStore(combineReducers({ profile: profileStore }));
