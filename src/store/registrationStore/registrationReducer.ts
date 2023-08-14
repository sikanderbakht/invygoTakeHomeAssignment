import {AppActionConst} from '../../constants/actionConstants';
import {updateObject} from '../../utils/functions';

export interface IRegistrationState {
  isLoading: boolean;
  registerUserError: boolean;
  registerUserSuccess: boolean;
}

export const initialState = {
  isLoading: false,
  registerUserError: false,
  registerUserSuccess: false,
};

export function RegistrationReducer(
  state: IRegistrationState = initialState,
  action: any = {},
) {
  const {type, payload} = action;
  switch (type) {
    case AppActionConst.ACTION_REGISTER_USER_LOADING:
      return updateObject(state, {
        isLoading: true,
        registerUserError: false,
        registerUserSuccess: false,
      });
    case AppActionConst.ACTION_REGISTER_USER_SUCCESS:
      return updateObject(state, {
        isLoading: false,
        registerUserError: false,
        registerUserSuccess: true,
      });
    case AppActionConst.ACTION_REGISTER_USER_ERROR:
      console.log('yolo' + JSON.stringify(payload));
      return updateObject(state, {
        isLoading: false,
        registerUserError: true,
        registerUserSuccess: false,
      });
    default:
      return state;
  }
}
