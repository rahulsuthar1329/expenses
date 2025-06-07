import React, {
  createContext,
  useCallback,
  useState,
  useEffect,
  useContext,
} from 'react';
import {io} from 'socket.io-client';
import {SocketUrl} from '../path';

const SocketContext = createContext(null);

export const useSocket = () => {
  const state = useContext(SocketContext);
  if (!state) throw new Error(`state is undefined`);

  return state;
};

export const SocketProvider = ({children}) => {
  const [socket, setSocket] = useState();
  const [messages, setMessages] = useState([]);

  const sendMessage = useCallback(
    msg => {
      if (socket) {
        socket.emit('newMessage', {message: msg});
      } else console.log("Socket doesn't exist");
    },
    [socket],
  );

  const onMessageRec = useCallback(
    msg => {
      console.log('From Server Msg Rec', msg);
      const {message} = JSON.parse(msg);
      setMessages(prev => [...prev, message]);
    },
    [socket],
  );

  useEffect(() => {
    const _socket = io(SocketUrl);
    _socket.on('message', onMessageRec);
    setSocket(_socket);

    return () => {
      _socket.off('message', onMessageRec);
      _socket.disconnect();
      setSocket(undefined);
    };
  }, []);

  return (
    <SocketContext.Provider value={{sendMessage, messages}}>
      {children}
    </SocketContext.Provider>
  );
};
