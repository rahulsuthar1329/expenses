import {io, Socket} from 'socket.io-client';
import {baseUrl} from '../path';

let socket: Socket;

export const initiateSocket = (token: string) => {
  socket = io(baseUrl, {
    auth: {token},
  });

  socket.on('connect', () => {
    console.log('Connected to socket:', socket.id);
  });

  socket.on('disconnect', () => {
    console.log('Disconnected');
  });
};

export const joinChatRoom = (chatId: string) => {
  socket.emit('join-chat', {chatId});
};

export const sendMessage = (chatId: string, message: string) => {
  socket.emit('send-message', {chatId, message});
};

export const onMessageReceived = (callback: (message: any) => void) => {
  socket.on('receive-message', callback);
};

export const leaveChatRoom = (chatId: string) => {
  socket.emit('leave-chat', {chatId});
};

export const disconnectSocket = () => {
  socket.disconnect();
};
