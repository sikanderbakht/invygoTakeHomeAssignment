import {act, renderHook} from '@testing-library/react-native';
import * as redux from 'react-redux';
import {initialState} from '../../../store/usersStore/userReducer';

import useMeetupUsers from '../useMeetupUsers';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

const spySelector = jest.spyOn(redux, 'useSelector');
spySelector.mockReturnValue({...initialState});
const spyDispatcher = jest.spyOn(redux, 'useDispatch');
const dispatchFunction = jest.fn();
spyDispatcher.mockReturnValue(dispatchFunction);
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
