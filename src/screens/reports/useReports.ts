import userData from '../../mock/userData.json';

const useReports = () => {
  const users = userData.users;
  const appThemeColors = ['#438BBA', '#FF5733', '#75A538', '#A74CB4'];

  const calculateAgeRangeCounts = () => {
    const ageRanges = {
      '13-18': 0,
      '18-25': 0,
      '25+': 0,
    };
    users.forEach(user => {
      if (user.age >= 13 && user.age <= 18) {
        ageRanges['13-18']++;
      } else if (user.age > 18 && user.age <= 25) {
        ageRanges['18-25']++;
      } else if (user.age > 25) {
        ageRanges['25+']++;
      }
    });
    return ageRanges;
  };

  const calculatePeopleByLocality = () => {
    const peopleByLocality: {[key: string]: number} = {};

    users.forEach(user => {
      const locality = user.locality;
      if (peopleByLocality[locality]) {
        peopleByLocality[locality]++;
      } else {
        peopleByLocality[locality] = 1;
      }
    });

    return peopleByLocality;
  };

  const calculateAverageGroupSize = () => {
    let totalGuests = 0;

    users.forEach(user => {
      totalGuests += user.guests > 0 ? user.guests : 1;
    });

    const averageGroupSize = totalGuests / users.length;
    return averageGroupSize;
  };

  const calculateProfessionCounts = () => {
    const professionCounts = {
      Student: 0,
      Employed: 0,
    };

    users.forEach(user => {
      if (user.profession === 'Student') {
        professionCounts.Student++;
      } else if (user.profession === 'Employed') {
        professionCounts.Employed++;
      }
    });

    return professionCounts;
  };

  return {
    appThemeColors,
    users,
    calculateAgeRangeCounts,
    calculatePeopleByLocality,
    calculateAverageGroupSize,
    calculateProfessionCounts,
  };
};

export default useReports;
