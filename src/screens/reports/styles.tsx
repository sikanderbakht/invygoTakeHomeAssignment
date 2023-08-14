import {StyleSheet} from 'react-native';

const styles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: '#f0f0f0',
    },
    card: {
      backgroundColor: '#fff',
      borderRadius: 8,
      padding: 16,
      marginBottom: 16,
      elevation: 2,
    },
    header: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 8,
    },
    rangeContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 8,
    },
    rangeText: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    countText: {
      fontSize: 16,
      color: '#333',
    },
  });

export default styles;
