import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import {LineChart, PieChart} from 'react-native-chart-kit';
import {ScrollView} from 'react-native-gesture-handler';
import styles from './styles';
import useReports from './useReports';

const ReportsScreen = () => {
  const {
    appThemeColors,
    calculateAgeRangeCounts,
    calculatePeopleByLocality,
    calculateAverageGroupSize,
    calculateProfessionCounts,
  } = useReports();
  const classes = styles();
  const ageRangeCounts: {[key: string]: number} = calculateAgeRangeCounts();
  const peopleByLocality: {[key: string]: number} = calculatePeopleByLocality();
  const averageGroupSize: number = calculateAverageGroupSize();
  const professionCounts = calculateProfessionCounts();

  return (
    <ScrollView style={classes.container}>
      <View style={classes.card}>
        <Text style={classes.header}>Age Range Counts</Text>
        {Object.keys(ageRangeCounts).map(range => (
          <View key={range} style={classes.rangeContainer}>
            <Text style={classes.rangeText}>{range}:</Text>
            <Text style={classes.countText}>{ageRangeCounts[range]}</Text>
          </View>
        ))}
        <LineChart
          data={{
            labels: Object.keys(ageRangeCounts),
            datasets: [{data: Object.values(ageRangeCounts)}],
          }}
          width={300}
          height={220}
          yAxisLabel=""
          yAxisSuffix=""
          yAxisInterval={1}
          chartConfig={{
            backgroundGradientFrom: '#fff', // Set white background
            backgroundGradientTo: '#fff', // Set white background
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(67, 139, 186, ${opacity})`, // Set "#438BBA" as foreground color
            style: {borderRadius: 16},
          }}
          bezier
        />
      </View>

      <View style={classes.card}>
        <Text style={classes.header}>People By Localities</Text>
        {Object.keys(peopleByLocality).map(locality => (
          <View key={locality} style={classes.rangeContainer}>
            <Text style={classes.rangeText}>{locality}:</Text>
            <Text style={classes.countText}>{peopleByLocality[locality]}</Text>
          </View>
        ))}
        <PieChart
          data={Object.keys(peopleByLocality).map((locality, index) => ({
            name: locality,
            population: peopleByLocality[locality],
            color: appThemeColors[index % appThemeColors.length],
          }))}
          width={300}
          height={220}
          chartConfig={{
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
        />
      </View>

      <View style={classes.card}>
        <Text style={classes.header}>Average Group Size</Text>
        <Text style={classes.countText}>{averageGroupSize}</Text>
      </View>

      <View style={classes.card}>
        <View style={classes.rangeContainer}>
          <Text style={classes.rangeText}>Students:</Text>
          <Text style={classes.countText}>{professionCounts.Student}</Text>
        </View>
        <View style={classes.rangeContainer}>
          <Text style={classes.rangeText}>Professionals:</Text>
          <Text style={classes.countText}>{professionCounts.Employed}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default ReportsScreen;
