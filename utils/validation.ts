import {UserType} from '../features/UserSlice';

const validateUserCredential = ({
  email,
  firstName,
  lastName,
  username,
  password,
  dateOfBirth,
  gender,
  mobile,
}: UserType) => {
  const requiredFields = [
    email,
    firstName,
    lastName,
    username,
    password,
    dateOfBirth,
    gender,
    mobile,
  ];

  const isValid = requiredFields.every(data => Boolean(data));
  if (!isValid) return false;
};

export {validateUserCredential};
