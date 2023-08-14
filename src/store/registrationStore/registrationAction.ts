import {AppActionConst} from '../../constants/actionConstants';
import {ApiUrls} from '../../constants/apiConstants';
import {apiManager} from '../../utils/httpclient/api';

export function registerUserForMeetup() {
  return async function (dispatch: any) {
    try {
      dispatch({
        type: AppActionConst.ACTION_REGISTER_USER_LOADING,
        payload: true,
      });
      const response: any = await apiManager.post(ApiUrls.REGISTER_USER, {});
      console.log('haza response: ' + JSON.stringify(response));
      dispatch({
        type: AppActionConst.ACTION_REGISTER_USER_SUCCESS,
        payload: response,
      });
    } catch (error: any) {
      console.log('error haza' + error);
      dispatch({
        type: AppActionConst.ACTION_REGISTER_USER_ERROR,
        payload: error,
      });
    }
  };
}
