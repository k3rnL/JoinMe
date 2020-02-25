import { combineReducers, createStore } from 'redux';
import profileStore from './profile';
import partyCreationStore from './partyCreation';
import party from './party';

export default createStore(combineReducers({
  profile: profileStore,
  partyCreation: partyCreationStore,
  party,
}));
