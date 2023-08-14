import {renderHook, act} from '@testing-library/react-native';
import useRegistration from '../useRegistration';
import * as redux from 'react-redux';
import {initialState} from '../../../store/registrationStore/registrationReducer';
import {Alert} from 'react-native';
import AppStore from '../../../store/index';
import axios, {AxiosResponse} from 'axios';
import {AppActionConst} from '../../../constants/actionConstants';
import {registerUserForMeetup} from '../../../store/registrationStore/registrationAction';

afterEach(() => {
  jest.clearAllMocks();
});

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));
const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({navigate: mockedNavigate, goBack: mockedNavigate}),
}));

const spySelector = jest.spyOn(redux, 'useSelector');
spySelector.mockReturnValue({...initialState});
const spyDispatcher = jest.spyOn(redux, 'useDispatch');
const dispatchFunction = jest.fn();
spyDispatcher.mockReturnValue(dispatchFunction);
jest.mock('axios');
describe('useRegistration', () => {
  test('handleNameChange updates name and errorName', () => {
    const {result} = renderHook(() => useRegistration());

    const newName = 'John Doe';
    act(() => {
      result.current.handleNameChange(newName);
    });

    expect(result.current.registrationData.name).toBe(newName);
    expect(result.current.registrationErrors.errorName).toBe(false);
  });

  test('handleNameChange updates errorName when value is empty', () => {
    const {result} = renderHook(() => useRegistration());

    const emptyName = '';
    act(() => {
      result.current.handleNameChange(emptyName);
    });

    expect(result.current.registrationErrors.errorName).toBe(true);
  });

  test('handleAgeChange updates age and errorAge', () => {
    const {result} = renderHook(() => useRegistration());

    const newAge = '25';
    act(() => {
      result.current.handleAgeChange(newAge);
    });

    expect(result.current.registrationData.age).toBe(newAge);
    expect(result.current.registrationErrors.errorAge).toBe(false);
  });

  test('handleAgeChange updates errorAge when value is empty', () => {
    const {result} = renderHook(() => useRegistration());

    const emptyAge = '';
    act(() => {
      result.current.handleAgeChange(emptyAge);
    });

    expect(result.current.registrationErrors.errorAge).toBe(true);
  });

  test('handleDateChange updates dob in registrationData and setShowDatePicker', () => {
    const {result} = renderHook(() => useRegistration());

    const newDate = new Date('1995-12-17');
    act(() => {
      result.current.handleDateChange({type: 'set'}, newDate);
    });

    expect(result.current.registrationData.dob).toEqual(newDate);
    expect(result.current.registrationErrors.errorDob).toBe(false);
    expect(result.current.showDatePicker).toBe(false);
  });

  test('handleProfessionChange updates profession in registrationData', () => {
    const {result} = renderHook(() => useRegistration());

    const newProfession = 'Employed';
    act(() => {
      result.current.handleProfessionChange(newProfession);
    });

    expect(result.current.registrationData.profession).toBe(newProfession);
  });

  test('handleLocalityChange updates locality and errorLocality', () => {
    const {result} = renderHook(() => useRegistration());

    const newLocality = 'Example Locality';
    act(() => {
      result.current.handleLocalityChange(newLocality);
    });

    expect(result.current.registrationData.locality).toBe(newLocality);
    expect(result.current.registrationErrors.errorLocality).toBe(false);
  });

  test('handleLocalityChange updates errorLocality when value is empty', () => {
    const {result} = renderHook(() => useRegistration());

    const emptyLocality = '';
    act(() => {
      result.current.handleLocalityChange(emptyLocality);
    });

    expect(result.current.registrationErrors.errorLocality).toBe(true);
  });

  test('handleGuestChange updates numberOfGuests and errorNumberOfGuests', () => {
    const {result} = renderHook(() => useRegistration());

    const newGuestCount = '3';
    act(() => {
      result.current.handleGuestChange(newGuestCount);
    });

    expect(result.current.registrationData.numberOfGuests).toBe(newGuestCount);
    expect(result.current.registrationErrors.errorNumberOfGuests).toBe(false);
  });

  it('registerUserForMeetup success', async () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>;
    const mockedResponse: AxiosResponse = {
      data: {},
      status: 200,
      headers: {},
      config: {},
      statusText: 'OK',
    };
    (mockedAxios as any).mockResolvedValue(mockedResponse);
    await AppStore.dispatch(registerUserForMeetup());
    expect(AppStore.getState().registration.registerUserSuccess).toBeTruthy();
  });

  test('handleGuestChange updates errorNumberOfGuests when value is empty', () => {
    const {result} = renderHook(() => useRegistration());

    const emptyGuestCount = '';
    act(() => {
      result.current.handleGuestChange(emptyGuestCount);
    });

    expect(result.current.registrationErrors.errorNumberOfGuests).toBe(true);
  });

  test('handleAddressChange updates address and errorAddress', () => {
    const {result} = renderHook(() => useRegistration());

    const newAddress = '123 Example Street';
    act(() => {
      result.current.handleAddressChange(newAddress);
    });

    expect(result.current.registrationData.address).toBe(newAddress);
    expect(result.current.registrationErrors.errorAddress).toBe(false);
  });

  test('handleAddressChange updates errorAddress when value is empty', () => {
    const {result} = renderHook(() => useRegistration());

    const emptyAddress = '';
    act(() => {
      result.current.handleAddressChange(emptyAddress);
    });

    expect(result.current.registrationErrors.errorAddress).toBe(true);
  });

  test('sets error flags correctly when there are empty fields', () => {
    const {result} = renderHook(() => useRegistration());

    act(() => {
      result.current.handleNameChange('');
      result.current.handleAgeChange('');
      result.current.handleDateChange({}, new Date());
      result.current.handleGuestChange('');
      result.current.handleProfessionChange('');
      result.current.handleLocalityChange('');
      result.current.handleAddressChange('');
      result.current.submitDataForRegistration();
    });

    expect(result.current.registrationErrors.errorName).toBe(true);
    expect(result.current.registrationErrors.errorAge).toBe(true);
    expect(result.current.registrationErrors.errorDob).toBe(true);
    expect(result.current.registrationErrors.errorNumberOfGuests).toBe(true);
    expect(result.current.registrationErrors.errorProfession).toBe(true);
    expect(result.current.registrationErrors.errorLocality).toBe(true);
    expect(result.current.registrationErrors.errorAddress).toBe(true);
  });

  test("returns true for today's date", () => {
    const {result} = renderHook(() => useRegistration());
    const today = new Date();

    expect(result.current.isDateToday(today)).toBe(true);
  });

  test('returns false for a past date', () => {
    const {result} = renderHook(() => useRegistration());
    const pastDate = new Date('2021-01-01');

    expect(result.current.isDateToday(pastDate)).toBe(false);
  });

  test('returns false for a future date', () => {
    const {result} = renderHook(() => useRegistration());
    const futureDate = new Date('2050-12-31');

    expect(result.current.isDateToday(futureDate)).toBe(false);
  });

  test('handleAndroidBackButton returns false when showBackAlert is false', () => {
    const {result} = renderHook(() => useRegistration());

    act(() => {
      result.current.setShowBackAlert(false);
    });
    const returnValue = result.current.handleAndroidBackButton();
    expect(returnValue).toBe(false);
  });

  test('setShowDatePicker updates showDatePicker state', () => {
    const {result} = renderHook(() => useRegistration());

    act(() => {
      result.current.setShowDatePicker(true);
    });

    expect(result.current.showDatePicker).toBe(true);

    act(() => {
      result.current.setShowDatePicker(false);
    });

    expect(result.current.showDatePicker).toBe(false);
  });

  test('isFormEmpty returns true when all fields are empty', () => {
    const {result} = renderHook(() => useRegistration());

    act(() => {
      result.current.setRegistrationData({
        name: '',
        age: '',
        dob: new Date(),
        profession: '',
        locality: '',
        numberOfGuests: '',
        address: '',
      });
    });

    expect(result.current.isFormEmpty()).toBe(true);
  });

  test('isFormEmpty returns false when at least one field is not empty', () => {
    const {result} = renderHook(() => useRegistration());

    act(() => {
      result.current.setRegistrationData({
        name: 'John Doe',
        age: '25',
        dob: new Date('1995-12-17'),
        profession: 'Employed',
        locality: 'Example Locality',
        numberOfGuests: '2',
        address: '123 Example Street',
      });
    });

    expect(result.current.isFormEmpty()).toBe(false);
  });

  test('isFormReady returns true when all fields are not empty and dob is not today', () => {
    const {result} = renderHook(() => useRegistration());

    act(() => {
      result.current.setRegistrationData({
        name: 'John Doe',
        age: '25',
        dob: new Date('1995-12-17'),
        profession: 'Employed',
        locality: 'Example Locality',
        numberOfGuests: '2',
        address: '123 Example Street',
      });
    });

    expect(result.current.isFormReady()).toBe(true);
  });

  test('isFormReady returns false when at least one field is empty', () => {
    const {result} = renderHook(() => useRegistration());

    act(() => {
      result.current.setRegistrationData({
        name: 'John Doe',
        age: '',
        dob: new Date('1995-12-17'),
        profession: '',
        locality: 'Example Locality',
        numberOfGuests: '2',
        address: '',
      });
    });

    expect(result.current.isFormReady()).toBe(false);
  });
});
