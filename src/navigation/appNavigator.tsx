import 'react-native-gesture-handler';
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {
  ROUTE_REGISTRATION,
  ROUTE_REPORTS,
  ROUTE_RSVP_USERS,
  ROUTE_RSVP_USERS_STACK,
  ROUTE_RSVP_USER_DETAILS,
} from './routes';
import RegistrationScreen from '../screens/registrations';
import RSVPUserScreen from '../screens/meetupusers';
import ReportsScreen from '../screens/reports';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import UserDetails from '../screens/userdetails';

export type RootParamList = {
  Registration: undefined;
  RSVPUsers: undefined;
  RSVPUsersDetails: {userDetails?: any};
  Reports: undefined;
  RSVPUsersStack: undefined;
};
const Drawer = createDrawerNavigator<RootParamList>();
const Stack = createNativeStackNavigator();

const UserListStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={ROUTE_RSVP_USERS}>
      <Stack.Screen name={ROUTE_RSVP_USERS} component={RSVPUserScreen} />
      <Stack.Screen name={ROUTE_RSVP_USER_DETAILS} component={UserDetails} />
    </Stack.Navigator>
  );
};
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName={ROUTE_REGISTRATION}>
        <Drawer.Screen
          name={ROUTE_REGISTRATION}
          component={RegistrationScreen}
        />
        <Drawer.Screen
          name={ROUTE_RSVP_USERS_STACK}
          component={UserListStack}
        />
        <Drawer.Screen name={ROUTE_REPORTS} component={ReportsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
