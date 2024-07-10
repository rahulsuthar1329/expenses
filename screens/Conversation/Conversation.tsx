import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  TouchableWithoutFeedback,
  FlatList,
} from 'react-native';
import styles from './Conversation.styled';
import BackBtn from '../../assets/back.png';
import Camera from '../../assets/camera.png';
import More from '../../assets/more.png';
import Send from '../../assets/send.png';
import EmojiModal from 'react-native-emoji-modal';
import Octicons from 'react-native-vector-icons/Octicons';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {chatApi, useGetMessagesQuery} from '../../services/chatApi';
import Loader from '../../components/Loader/Loader';
import {MessageType} from '../../types/chatTypes';
import SomethingWentWrong from '../../components/SomethingWentWrong/SomethingWentWrong';
import {io} from 'socket.io-client';
import {updateChat} from '../../features/ChatSlice';

const socket = io('http://192.168.209.73:5001');

const Conversation: React.FC = ({navigation, route}: any) => {
  const {chatDetails} = route.params;
  const [message, setMessage] = useState('');
  const [emojiModal, setEmojiModal] = useState(false);
  const user = {_id: '5353'};

  const dispatch = useAppDispatch();

  const {
    data: initialMessages,
    error,
    isLoading,
  } = useGetMessagesQuery(chatDetails._id);

  const [messages, setMessages] = useState<MessageType[]>([]);

  useEffect(() => {
    if (initialMessages) {
      if (messages.length) setMessages([...initialMessages, ...messages]);
      else setMessages(initialMessages);
    }
  }, [initialMessages]);

  useEffect(() => {
    socket.emit('joinChat', chatDetails._id);

    socket.on('newMessage', newMessage => {
      setMessages(prevMessages => [...prevMessages, newMessage]);
    });

    return () => {
      socket.off('newMessage');
      socket.emit('leaveChat', chatDetails._id);
    };
  }, []);

  if (isLoading) return <Loader />;
  if (error) return <SomethingWentWrong />;

  const getMessageStyle = (sent: boolean, status: string | null) => {
    if (sent) {
      if (status === 'seen') return [styles.msgSent, styles.seen];
      if (status === 'pending') return [styles.msgSent, styles.pending];
      if (status === 'received') return [styles.msgSent, styles.received];
    }
    return styles.msgReceive;
  };

  const showProfile = async () => {};
  const goBack = () => navigation.goBack();
  const toggleEmojiModal = () => setEmojiModal(!emojiModal);
  const sendMessage = () => {};
  const openProfile = () => {};

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.leftPortion}>
          <TouchableOpacity onPress={goBack} activeOpacity={0.8}>
            <Image source={BackBtn} style={styles.back} />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.headerContainer}
            onPress={showProfile}>
            <View>
              <Image
                source={{uri: chatDetails?.profileImage}}
                style={styles.image}
              />
            </View>
            <TouchableOpacity activeOpacity={0.8} onPress={openProfile}>
              <Text style={styles.name}>{chatDetails?.chatName}</Text>
              <Text style={styles.message}>
                {chatDetails?.lastSeen || 'Click to see the group information'}
              </Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
        <View style={styles.rightPortion}>
          <TouchableOpacity activeOpacity={0.8}>
            <Image source={Camera} style={styles.camera} />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8}>
            <Image source={More} style={styles.more} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.chatArea}>
        <FlatList
          data={messages}
          keyExtractor={(_, index: number) => index.toString()}
          ListHeaderComponent={
            <Text style={styles.tooltip}>13 April 2023</Text>
          }
          contentContainerStyle={styles.contentContainerStyle}
          renderItem={({item}: {item: MessageType}) => {
            return (
              <View
                style={
                  item.sender.includes(user._id)
                    ? styles.sentMessage
                    : styles.receiveMessage
                }>
                <Text style={getMessageStyle(false, 'seen')}>
                  {item.content}
                </Text>
              </View>
            );
          }}
        />
      </View>

      <View style={styles.inputArea}>
        <View style={styles.inputMessage}>
          <TouchableWithoutFeedback onPress={toggleEmojiModal}>
            <Octicons name="smiley" size={23} color="#666" />
          </TouchableWithoutFeedback>
          <TextInput
            placeholder="Write a message..."
            value={message}
            onChangeText={e => setMessage(e)}
            style={styles.msgBar}
          />
        </View>
        <TouchableOpacity activeOpacity={0.8} onPress={sendMessage}>
          <Image source={Send} style={styles.send} />
        </TouchableOpacity>
      </View>
      {emojiModal && (
        <EmojiModal
          onEmojiSelected={emoji => setMessage(message + emoji)}
          columns={9}
          containerStyle={styles.containerStyle}
          searchStyle={styles.emojiSearchBar}
        />
      )}
    </View>
  );
};

export default Conversation;
