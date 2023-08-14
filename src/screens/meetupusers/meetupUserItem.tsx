import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {RootParamList} from '../../navigation/appNavigator';
import {ROUTE_RSVP_USER_DETAILS} from '../../navigation/routes';
import styles from './itemstyles';

type props = NativeStackNavigationProp<RootParamList, 'Registration'>;
const UserItem = (props: {itemData: any}) => {
  const navigation = useNavigation<props>();
  const {name, locality} = props.itemData.item;
  const classes = styles();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate(ROUTE_RSVP_USER_DETAILS, {
          userDetails: props.itemData.item,
        });
      }}
      style={classes.itemContainer}>
      <View>
        <Text style={classes.name}>{name}</Text>
        <Text style={classes.locality}>{locality}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default UserItem;
