import {AppActionConst} from '../../constants/actionConstants';
import {ApiUrls} from '../../constants/apiConstants';
import {apiManager} from '../../utils/httpclient/api';

export function getMeetupUsersList() {
  return async function (dispatch: any) {
    try {
      dispatch({
        type: AppActionConst.ACTION_GET_USER_MEETUP_LIST_LOADING,
        payload: true,
      });
      const response: any = await apiManager.get(ApiUrls.GET_MEETUP_USER_LIST);
      console.log('response' + JSON.stringify(response));
      dispatch({
        type: AppActionConst.ACTION_GET_USER_MEETUP_LIST_SUCCESS,
        payload: response,
      });
    } catch (error: any) {
      console.log('error' + error);
      dispatch({
        type: AppActionConst.ACTION_GET_USER_MEETUP_LIST_ERROR,
        payload: error,
      });
    }
  };
}
