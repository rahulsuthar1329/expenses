import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    rowGap: 20,
  },
  heading: {
    fontWeight: '600',
    fontSize: 20,
  },
  headText: {},
  boxes: {
    flexDirection: 'row',
    columnGap: 10,
  },
  box: {
    backgroundColor: '#05a19236',
    borderRadius: 8,
    height: 45,
    width: 45,
    textAlign: 'center',
    fontWeight: '600',
  },
  resendOTP: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
