import {combineReducers} from 'redux';
import {
  IRegistrationState,
  RegistrationReducer,
} from './registrationStore/registrationReducer';
import {MeetupUserReducer} from './usersStore/userReducer';

export interface IAppState {
  app: IRegistrationState;
}

export const initialAppState = {
  registration: RegistrationReducer,
  meetupUsers: MeetupUserReducer,
};

const RootReducer = combineReducers(initialAppState);

export default RootReducer;
