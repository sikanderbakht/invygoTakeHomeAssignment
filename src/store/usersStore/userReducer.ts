import {AppActionConst} from '../../constants/actionConstants';
import {updateObject} from '../../utils/functions';

export interface IUserListState {
  isLoading: boolean;
  meetupUserListError: boolean;
  invitedUserResponse: any;
}

export const initialState = {
  isLoading: false,
  meetupUserListError: false,
  invitedUserResponse: {},
};

export function MeetupUserReducer(
  state: IUserListState = initialState,
  action: any = {},
) {
  const {type, payload} = action;
  switch (type) {
    case AppActionConst.ACTION_GET_USER_MEETUP_LIST_LOADING:
      return updateObject(state, {isLoading: true, meetupUserListError: false});
    case AppActionConst.ACTION_GET_USER_MEETUP_LIST_SUCCESS:
      return updateObject(state, {
        invitedUserResponse: payload,
        isLoading: false,
        meetupUserListError: false,
      });
    case AppActionConst.ACTION_GET_USER_MEETUP_LIST_ERROR:
      return updateObject(state, {
        isLoading: false,
        meetupUserListError: true,
      });
    default:
      return state;
  }
}
