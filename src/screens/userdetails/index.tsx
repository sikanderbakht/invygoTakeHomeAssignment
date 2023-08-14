import React from 'react';
import {View, Text} from 'react-native';
import styles from './styles';

const UserDetails = (props: any) => {
  const user = props?.route?.params?.userDetails;
  const classes = styles();
  return (
    <View style={classes.container}>
      <View style={classes.attributeContainer}>
        <Text style={classes.label}>Name:</Text>
        <Text style={classes.value}>{user.name}</Text>
      </View>
      <View style={classes.attributeContainer}>
        <Text style={classes.label}>Age:</Text>
        <Text style={classes.value}>{user.age}</Text>
      </View>
      <View style={classes.attributeContainer}>
        <Text style={classes.label}>Date of Birth:</Text>
        <Text style={classes.value}>{user.dob}</Text>
      </View>
      <View style={classes.attributeContainer}>
        <Text style={classes.label}>Profession:</Text>
        <Text style={classes.value}>{user.profession}</Text>
      </View>
      <View style={classes.attributeContainer}>
        <Text style={classes.label}>Locality:</Text>
        <Text style={classes.value}>{user.locality}</Text>
      </View>
      <View style={classes.attributeContainer}>
        <Text style={classes.label}>Guests:</Text>
        <Text style={classes.value}>{user.guests}</Text>
      </View>
      <View style={classes.attributeContainer}>
        <Text style={classes.label}>Address:</Text>
        <Text style={classes.value}>{user.address}</Text>
      </View>
    </View>
  );
};

export default UserDetails;
