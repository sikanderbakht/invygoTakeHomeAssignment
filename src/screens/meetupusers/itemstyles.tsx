import {StyleSheet} from 'react-native';

const styles = () =>
  StyleSheet.create({
    itemContainer: {
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderColor: '#ccc',
    },
    name: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 4,
    },
    locality: {
      fontSize: 16,
      color: '#666',
    },
  });

export default styles;