import {act, renderHook} from '@testing-library/react-native';
import axios, {AxiosResponse} from 'axios';
import AppStore from '../../../store/index';
import * as redux from 'react-redux';
import {AppActionConst} from '../../../constants/actionConstants';
import {getMeetupUsersList} from '../../../store/usersStore/userAction';
import {initialState} from '../../../store/usersStore/userReducer';
import {apiManager} from '../../../utils/httpclient/api';

import useMeetupUsers from '../useMeetupUsers';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock('../../../utils/httpclient/api');

const spySelector = jest.spyOn(redux, 'useSelector');
spySelector.mockReturnValue({...initialState});
const spyDispatcher = jest.spyOn(redux, 'useDispatch');
const dispatchFunction = jest.fn();
spyDispatcher.mockReturnValue(dispatchFunction);
jest.mock('axios');
describe('useMeetupUsers', () => {
  test('searchQuery and setSearchQuery work correctly', () => {
    const {result} = renderHook(() => useMeetupUsers());

    act(() => {
      result.current.setSearchQuery('Jane');
    });

    expect(result.current.searchQuery).toBe('Jane');
  });

  it('should set snackbarVisible based on meetupUserListError', () => {
    spySelector.mockReturnValue({
      invitedUserResponse: {users: []},
      meetupUserListError: true,
      isLoading: false,
    });

    const {result} = renderHook(() => useMeetupUsers());

    expect(result.current.snackbarVisible).toBe(true);
  });

  it('getMeetupUsersList success', async () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>;
    const mockedResponse: AxiosResponse = {
      data: {},
      status: 200,
      headers: {},
      config: {},
      statusText: 'OK',
    };
    (mockedAxios as any).mockResolvedValue(mockedResponse);
    await AppStore.dispatch(getMeetupUsersList());
    expect(AppStore.getState().meetupUsers.meetupUserListError).toBe(false);
  });

  it('should filter users based on the search query', () => {
    spySelector.mockReturnValue({
      invitedUserResponse: {users: [{name: 'Alice', locality: 'City A'}]},
      meetupUserListError: false,
      isLoading: false,
    });

    const {result} = renderHook(() => useMeetupUsers());

    expect(result.current.filteredUsers).toEqual([
      {name: 'Alice', locality: 'City A'},
    ]);

    act(() => {
      result.current.setSearchQuery('City A');
    });

    expect(result.current.filteredUsers).toEqual([
      {name: 'Alice', locality: 'City A'},
    ]);
  });
});
