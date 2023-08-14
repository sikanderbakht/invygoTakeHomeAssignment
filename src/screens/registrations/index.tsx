import React from 'react';
import {
  Modal,
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  TextInput,
  Button,
  List,
  ActivityIndicator,
  Snackbar,
} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from './styles';
import useRegistration from './useRegistration';

const RegistrationScreen = () => {
  const {
    registrationData,
    showDatePicker,
    showProfession,
    professions,
    registrationErrors,
    isLoading,
    snackbarVisible,
    snackbarMessage,
    setSnackbarVisible,
    isDateToday,
    setShowProfession,
    setShowDatePicker,
    handleNameChange,
    handleAgeChange,
    handleDateChange,
    handleLocalityChange,
    handleGuestChange,
    handleAddressChange,
    handleProfessionChange,
    submitDataForRegistration,
  } = useRegistration();
  const classes = styles();
  return (
    <View style={classes.container}>
      <ScrollView
        contentContainerStyle={classes.scrollViewContainer}
        showsVerticalScrollIndicator={false}>
        <TextInput
          style={classes.input}
          onChangeText={handleNameChange}
          value={registrationData.name}
          label={registrationErrors.errorName ? 'Enter Name' : 'Name'}
          error={registrationErrors.errorName}
        />
        <TextInput
          style={classes.input}
          onChangeText={handleAgeChange}
          value={registrationData.age}
          error={registrationErrors.errorAge}
          label={registrationErrors.errorAge ? 'Enter Age' : 'Age'}
          keyboardType="numeric"
        />
        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <TextInput
            label={
              registrationErrors.errorDob ? 'Select Date of Birth' : 'D.O.B'
            }
            error={registrationErrors.errorDob}
            value={
              isDateToday(registrationData.dob)
                ? ''
                : registrationData.dob.toLocaleDateString()
            }
            style={classes.input}
            editable={false}
            pointerEvents="none"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setShowProfession(true)}>
          <TextInput
            label={
              registrationErrors.errorProfession
                ? 'Select Profession'
                : 'Profession'
            }
            value={registrationData.profession}
            style={classes.input}
            pointerEvents="none"
            editable={false}
            error={registrationErrors.errorProfession}
          />
        </TouchableOpacity>
        {Platform.OS === 'android' ? (
          showDatePicker && (
            <DateTimePicker
              value={registrationData.dob}
              mode="date"
              display="default"
              onChange={handleDateChange}
              maximumDate={new Date()}
            />
          )
        ) : (
          <Modal visible={showDatePicker} transparent animationType="slide">
            <View style={classes.modalContainer}>
              <View style={classes.modalContent}>
                <DateTimePicker
                  value={registrationData.dob}
                  mode="date"
                  display="spinner"
                  onChange={handleDateChange}
                  maximumDate={new Date()}
                />
                <Button
                  mode="contained"
                  onPress={() => setShowDatePicker(false)}
                  style={classes.modalButton}>
                  Done
                </Button>
              </View>
            </View>
          </Modal>
        )}
        <Modal visible={showProfession} transparent animationType="slide">
          <View style={classes.modalContainer}>
            <View style={classes.modalContent}>
              <List.Section>
                {professions.map((item, index) => (
                  <List.Item
                    key={index}
                    title={item}
                    onPress={() => handleProfessionChange(item)}
                  />
                ))}
              </List.Section>
            </View>
          </View>
        </Modal>
        <TextInput
          style={classes.input}
          label={
            registrationErrors.errorLocality ? 'Enter locality' : 'Locality'
          }
          value={registrationData.locality}
          onChangeText={handleLocalityChange}
          error={registrationErrors.errorLocality}
        />
        <TextInput
          style={classes.input}
          label={
            registrationErrors.errorNumberOfGuests
              ? 'Enter number of guests'
              : 'Number of Guests'
          }
          value={registrationData.numberOfGuests.toString()}
          onChangeText={handleGuestChange}
          error={registrationErrors.errorNumberOfGuests}
          keyboardType="numeric"
        />
        <TextInput
          style={classes.input}
          label={registrationErrors.errorAddress ? 'Enter Address' : 'Address'}
          value={registrationData.address}
          error={registrationErrors.errorAddress}
          onChangeText={handleAddressChange}
          multiline
          numberOfLines={3}
          maxLength={50}
        />
      </ScrollView>
      <Button
        mode="contained"
        style={classes.registerButton}
        onPress={() => submitDataForRegistration()}>
        Register
      </Button>
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        action={{
          label: 'Dismiss',
          onPress: () => setSnackbarVisible(false),
        }}>
        {snackbarMessage}
      </Snackbar>
      {isLoading && (
        <View style={classes.loaderContainer}>
          <ActivityIndicator />
        </View>
      )}
    </View>
  );
};

export default RegistrationScreen;
