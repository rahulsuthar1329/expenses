import {configureStore} from '@reduxjs/toolkit';
import chatReducer from './features/ChatSlice';
import userReducer from './features/UserSlice';
import {setupListeners} from '@reduxjs/toolkit/query';
import {chatService} from './services/chatService';
import {authService} from './services/authService';

export const store = configureStore({
  reducer: {
    [chatService.reducerPath]: chatService.reducer,
    [authService.reducerPath]: authService.reducer,
    chat: chatReducer,
    user: userReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(chatService.middleware, authService.middleware),
});

setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
