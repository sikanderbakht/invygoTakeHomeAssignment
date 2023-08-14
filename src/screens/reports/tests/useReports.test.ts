import {renderHook} from '@testing-library/react-native';
import useReports from '../useReports';

jest.mock('../../../mock/userData.json', () => ({
  users: [
    {age: 16, locality: 'City A', guests: 2, profession: 'Student'},
    {age: 22, locality: 'City B', guests: 0, profession: 'Employed'},
  ],
}));
describe('useReports', () => {
  test('calculateAgeRangeCounts calculates age range counts correctly', () => {
    const {result} = renderHook(() => useReports());

    const ageRangeCounts = result.current.calculateAgeRangeCounts();

    expect(ageRangeCounts).toEqual({
      '13-18': 1,
      '18-25': 1,
      '25+': 0,
    });
  });

  test('calculatePeopleByLocality calculates people by locality correctly', () => {
    const {result} = renderHook(() => useReports());

    const peopleByLocality = result.current.calculatePeopleByLocality();

    expect(peopleByLocality).toEqual({
      'City A': 1,
      'City B': 1,
    });
  });

  test('calculateAverageGroupSize calculates average group size correctly', () => {
    const {result} = renderHook(() => useReports());

    const averageGroupSize = result.current.calculateAverageGroupSize();

    expect(averageGroupSize).toBeCloseTo(1.5, 2); // Assuming 2 users with guests 2 and 0
  });

  test('calculateProfessionCounts calculates profession counts correctly', () => {
    const {result} = renderHook(() => useReports());

    const professionCounts = result.current.calculateProfessionCounts();

    expect(professionCounts).toEqual({
      Student: 1,
      Employed: 1,
    });
  });
});
