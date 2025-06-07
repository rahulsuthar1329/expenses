import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  headerText: {
    fontSize: 25,
    padding: 30,
    color: 'white',
    fontWeight: '600',
  },
  inputSection: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingTop: 30,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  scrollContent: {
    paddingBottom: 30,
    rowGap: 10,
  },
  header: {
    rowGap: 5,
    paddingBottom: 15,
  },
  sectionHeaderText: {
    fontSize: 20,
    color: 'black',
    fontWeight: '600',
  },
  text: {
    color: 'black',
  },
  inputs: {
    rowGap: 10,
  },
  submit: {
    marginTop: 20,
  },
  signupContainer: {
    alignItems: 'center',
  },
  signupText: {
    fontSize: 14,
    color: '#444',
  },

  signupLink: {
    color: '#1DB1A3',
    fontWeight: '600',
  },

  links: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 2,
  },
  orSection: {
    marginTop: 30,
    rowGap: 20,
  },

  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    columnGap: 10,
  },

  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
  },

  orText: {
    fontSize: 12,
    color: '#777',
    fontWeight: '500',
  },

  socialButtons: {
    rowGap: 15,
  },

  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 15,
  },

  socialButtonText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#000',
    fontWeight: '500',
  },

  icon: {
    width: 20,
  },
});
