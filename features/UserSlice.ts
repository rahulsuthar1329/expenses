import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface UserType {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  gender: string;
  mobile: string;
  dateOfBirth: Date | null;
  createdAt: Date | null;
  updatedAt: Date | null;
  profilePicture?: string;
  country?: string;
  wishlist?: string[];
  likedProducts?: string[];
  savedAddress?: string;
}

export type TempUserType = Omit<
  UserType,
  | '_id'
  | 'profilePicture'
  | 'country'
  | 'wishlist'
  | 'likedProducts'
  | 'savedAddress'
  | 'createdAt'
  | 'updatedAt'
>;

interface UserState {
  user: UserType | null;
  tempUser: TempUserType | null;
}

const initialState: UserState = {
  user: null,
  tempUser: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserType>) => {
      state.user = action.payload;
    },
    setTempUser: (state, action: PayloadAction<TempUserType>) => {
      state.tempUser = action.payload;
    },
    clearTempUser: state => {
      state.tempUser = null;
    },
  },
});

export const {setUser, setTempUser, clearTempUser} = userSlice.actions;

export default userSlice.reducer;
