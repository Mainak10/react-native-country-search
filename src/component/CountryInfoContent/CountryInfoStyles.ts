import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  card: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 15,
    margin: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    alignItems: 'center', // Center flag and text in the middle
  },
  flag: {
    width: 80,
    height: 50,
    marginBottom: 10,
  },
  details: {
    alignItems: 'center', // Center the text inside each card
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  info: {
    fontSize: 14,
    color: '#555',
  },
});

export default styles;
