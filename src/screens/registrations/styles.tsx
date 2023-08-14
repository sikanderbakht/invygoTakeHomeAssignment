import {StyleSheet} from 'react-native';

const styles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: '#ffffff',
    },
    scrollViewContainer: {
      flexGrow: 1,
    },
    input: {
      marginBottom: 16,
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'flex-end',
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    modalContent: {
      backgroundColor: 'white',
      padding: 16,
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
    },
    modalButton: {
      marginTop: 16,
    },
    registerButton: {
      marginTop: 16,
    },
    loaderContainer: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
  });

export default styles;
