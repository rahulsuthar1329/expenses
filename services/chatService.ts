import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {baseUrl} from '../path';
import {ChatStateType, MessageType} from '../types/chatTypes';

export const chatService = createApi({
  reducerPath: 'chatService',
  baseQuery: fetchBaseQuery({baseUrl}),
  endpoints: builder => ({
    getChats: builder.query<ChatStateType, void>({
      query: () => 'chat/getChats',
    }),
    getMessages: builder.query<MessageType[], void>({
      query: chatId => `chat/${chatId}/getMessages`,
    }),
  }),
});
export const {useGetChatsQuery, useGetMessagesQuery} = chatService;
