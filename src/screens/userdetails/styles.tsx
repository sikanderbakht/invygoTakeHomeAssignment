import {StyleSheet} from 'react-native';

const styles = () =>
  StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      padding: 16,
      borderRadius: 8,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      margin: 20,
    },
    attributeContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
    },
    label: {
      fontWeight: 'bold',
      fontSize: 16,
      color: '#333',
    },
    value: {
      fontSize: 16,
      color: '#666',
    },
  });

export default styles;
