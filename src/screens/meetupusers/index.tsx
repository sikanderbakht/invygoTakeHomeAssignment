import React from 'react';
import {View, FlatList, TextInput} from 'react-native';
import {ActivityIndicator, Snackbar} from 'react-native-paper';
import UserItem from './meetupUserItem';
import styles from './styles';
import useMeetupUsers from './useMeetupUsers';

const RSVPUserScreen = () => {
  const {
    searchQuery,
    filteredUsers,
    isLoading,
    snackbarVisible,
    setSnackbarVisible,
    setSearchQuery,
  } = useMeetupUsers();
  const classes = styles();

  const renderItem = (item: any) => {
    return <UserItem itemData={item} />;
  };

  return (
    <View style={classes.container}>
      <TextInput
        style={classes.searchInput}
        placeholder="Search by name or locality"
        onChangeText={text => setSearchQuery(text)}
        value={searchQuery}
      />
      <FlatList
        data={filteredUsers}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
      />
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        action={{
          label: 'Dismiss',
          onPress: () => setSnackbarVisible(false),
        }}>
        Getting users from API failed. Please try again.
      </Snackbar>
      {isLoading && (
        <View style={classes.loaderContainer}>
          <ActivityIndicator />
        </View>
      )}
    </View>
  );
};

export default RSVPUserScreen;
