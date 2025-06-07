import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  radioSectionContainer: {
    backgroundColor: '#f2f4f5',
    borderRadius: 6,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },

  radioSectionLabel: {
    fontSize: 14,
    color: '#999',
  },

  radioOptions: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },

  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  radioCircle: {
    height: 16,
    width: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#999',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },

  radioSelected: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#1DB1A3',
  },

  radioLabel: {
    fontSize: 14,
    color: '#333',
  },
});
