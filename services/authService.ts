import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {baseUrl} from '../path';
import {UserType} from '../features/UserSlice';

interface SendOtpRequestBody {
  email: string;
  username: string;
}

interface LoginRequestBody {
  uniqueId: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  token: string;
  user: UserType;
}

interface RegisterRequestBody {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  gender: string;
  mobile: string;
  dateOfBirth: Date | null;
  combinedOTP: string;
}

export const authService = createApi({
  reducerPath: 'authService',
  baseQuery: fetchBaseQuery({baseUrl}),
  endpoints: builder => ({
    login: builder.mutation<LoginResponse, LoginRequestBody>({
      query: ({uniqueId, password}) => ({
        url: 'auth/login',
        method: 'POST',
        body: {uniqueId, password},
      }),
    }),
    register: builder.mutation<void, RegisterRequestBody>({
      query: user => ({
        url: 'auth/register',
        method: 'POST',
        body: user,
      }),
    }),
    sendOTP: builder.mutation<void, SendOtpRequestBody>({
      query: ({email, username}) => ({
        url: 'auth/send_auth_otp',
        method: 'POST',
        body: {email, username},
      }),
    }),
  }),
});
export const {useSendOTPMutation, useRegisterMutation, useLoginMutation} =
  authService;
