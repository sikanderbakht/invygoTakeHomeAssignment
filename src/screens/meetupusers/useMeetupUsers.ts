import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getMeetupUsersList} from '../../store/usersStore/userAction';
import userData from '../../mock/userData.json';

const useMeetupUsers = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const dispatch = useDispatch<any>();
  const {invitedUserResponse, meetupUserListError, isLoading} = useSelector(
    (state: any) => state.meetupUsers,
  );
  const meetupUsersList = invitedUserResponse?.users || [];

  useEffect(() => {
    setSnackbarVisible(meetupUserListError);
  }, [meetupUserListError]);

  const filteredUsers = meetupUsersList.filter(
    (user: {name: string; locality: string}) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.locality.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  useEffect(() => {
    dispatch(getMeetupUsersList());
  }, [dispatch]);
  return {
    searchQuery,
    meetupUsersList,
    userData,
    filteredUsers,
    isLoading,
    meetupUserListError,
    snackbarVisible,
    setSnackbarVisible,
    setSearchQuery,
  };
};
export default useMeetupUsers;
