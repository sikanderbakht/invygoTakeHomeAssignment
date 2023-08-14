import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useEffect, useState} from 'react';
import {Alert, BackHandler, Platform} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootParamList} from '../../navigation/appNavigator';
import {ROUTE_RSVP_USERS_STACK} from '../../navigation/routes';
import {registerUserForMeetup} from '../../store/registrationStore/registrationAction';

interface RegistrationData {
  name: string;
  age: string;
  dob: Date;
  profession: '' | 'Employed' | 'Student';
  locality: string;
  numberOfGuests: string;
  address: string;
}

interface RegistrationErrors {
  errorName: boolean;
  errorAge: boolean;
  errorDob: boolean;
  errorProfession: boolean;
  errorLocality: boolean;
  errorNumberOfGuests: boolean;
  errorAddress: boolean;
}
type props = NativeStackNavigationProp<RootParamList, 'Registration'>;
const useRegistration = () => {
  const professions = ['Employed', 'Student'];
  const navigation = useNavigation<props>();
  const [registrationData, setRegistrationData] = useState<RegistrationData>({
    name: '',
    age: '',
    dob: new Date(),
    profession: '',
    locality: '',
    numberOfGuests: '',
    address: '',
  });
  const [registrationErrors, setRegistrationErrors] =
    useState<RegistrationErrors>({
      errorName: false,
      errorAge: false,
      errorDob: false,
      errorProfession: false,
      errorLocality: false,
      errorNumberOfGuests: false,
      errorAddress: false,
    });
  const dispatch = useDispatch<any>();
  const {registerUserSuccess, isLoading, registerUserError} = useSelector(
    (state: any) => state.registration,
  );
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showProfession, setShowProfession] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [showBackAlert, setShowBackAlert] = useState(false);

  useEffect(() => {
    if (registerUserSuccess) {
      setSnackbarMessage('Registration successful!');
      setSnackbarVisible(true);
      navigation.navigate(ROUTE_RSVP_USERS_STACK);
      setRegistrationData({
        name: '',
        age: '',
        dob: new Date(),
        numberOfGuests: '',
        profession: '',
        locality: '',
        address: '',
      });
    } else if (registerUserError) {
      setSnackbarMessage('Registration failed. Please try again.');
      setSnackbarVisible(true);
    }
  }, [navigation, registerUserError, registerUserSuccess]);

  useEffect(() => {
    if (isFormEmpty()) {
      setShowBackAlert(false);
    } else if (!isFormSubmitted) {
      setShowBackAlert(true);
    } else {
      setShowBackAlert(false);
    }
  }, [isFormSubmitted, registrationData]);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleAndroidBackButton);

    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleAndroidBackButton,
      );
    };
  }, [showBackAlert]);

  const handleAndroidBackButton = () => {
    if (showBackAlert) {
      Alert.alert(
        'Incomplete Form',
        'Please complete all fields before going back.',
        [{text: 'OK', onPress: () => {}}],
      );
      return true;
    }
    return false;
  };
  const handleNameChange = (value: string) => {
    setRegistrationErrors(prevData => ({
      ...prevData,
      errorName: value.length > 0 ? false : true,
    }));
    setRegistrationData(prevData => ({
      ...prevData,
      name: value,
    }));
  };

  const handleAgeChange = (value: any) => {
    setRegistrationErrors(prevData => ({
      ...prevData,
      errorAge: value.length > 0 ? false : true,
    }));
    setRegistrationData(prevData => ({
      ...prevData,
      age: value,
    }));
  };

  const handleDateChange = (event: any, selectedDate: any) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }
    if (event.type === 'set') {
      setRegistrationData(prevData => ({
        ...prevData,
        dob: selectedDate,
      }));
      setRegistrationErrors(prevData => ({
        ...prevData,
        errorDob: false,
      }));
    }
  };

  const handleProfessionChange = (value: any) => {
    setRegistrationData(prevData => ({
      ...prevData,
      profession: value,
    }));
    setRegistrationErrors(prevData => ({
      ...prevData,
      errorProfession: false,
    }));
    setShowProfession(false);
  };

  const handleLocalityChange = (value: string) => {
    setRegistrationErrors(prevData => ({
      ...prevData,
      errorLocality: value.length > 0 ? false : true,
    }));
    setRegistrationData(prevData => ({
      ...prevData,
      locality: value,
    }));
  };

  const handleGuestChange = (value: any) => {
    setRegistrationErrors(prevData => ({
      ...prevData,
      errorNumberOfGuests: value.length > 0 ? false : true,
    }));
    setRegistrationData(prevData => ({
      ...prevData,
      numberOfGuests: value,
    }));
  };

  const handleAddressChange = (value: string) => {
    setRegistrationErrors(prevData => ({
      ...prevData,
      errorAddress: value.length > 0 ? false : true,
    }));
    setRegistrationData(prevData => ({
      ...prevData,
      address: value,
    }));
  };

  const isFormEmpty = () => {
    console.log('registrationData.name' + registrationData.name);
    return (
      registrationData.name === '' &&
      registrationData.age === '' &&
      isDateToday(registrationData.dob) &&
      registrationData.numberOfGuests === '' &&
      registrationData.profession === '' &&
      registrationData.locality === '' &&
      registrationData.address === ''
    );
  };

  const isFormReady = () => {
    return (
      registrationData.name !== '' &&
      registrationData.age !== '' &&
      !isDateToday(registrationData.dob) &&
      registrationData.numberOfGuests !== '' &&
      registrationData.profession !== '' &&
      registrationData.locality !== '' &&
      registrationData.address !== ''
    );
  };

  const submitDataForRegistration = () => {
    setIsFormSubmitted(true);
    setRegistrationErrors(prevData => ({
      ...prevData,
      errorName: registrationData.name.length > 0 ? false : true,
      errorAge: registrationData.age.length > 0 ? false : true,
      errorDob: isDateToday(registrationData.dob) ? true : false,
      errorNumberOfGuests:
        registrationData.numberOfGuests.length > 0 ? false : true,
      errorProfession: registrationData.profession.length > 0 ? false : true,
      errorLocality: registrationData.locality.length > 0 ? false : true,
      errorAddress: registrationData.address.length > 0 ? false : true,
    }));
    if (isFormReady()) {
      dispatch(registerUserForMeetup());
      setIsFormSubmitted(true);
    }
  };

  const isDateToday = (date: {
    getDate: () => number;
    getMonth: () => number;
    getFullYear: () => number;
  }) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  return {
    registrationData,
    dispatch,
    showDatePicker,
    showProfession,
    professions,
    registrationErrors,
    isFormSubmitted,
    isLoading,
    registerUserError,
    snackbarVisible,
    snackbarMessage,
    registerUserSuccess,
    isFormEmpty,
    setRegistrationData,
    isFormReady,
    handleAndroidBackButton,
    setShowBackAlert,
    setSnackbarVisible,
    setIsFormSubmitted,
    isDateToday,
    setShowProfession,
    setShowDatePicker,
    handleDateChange,
    handleNameChange,
    handleAgeChange,
    handleProfessionChange,
    handleLocalityChange,
    handleGuestChange,
    handleAddressChange,
    submitDataForRegistration,
  };
};

export default useRegistration;
