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
import {useGetMessagesQuery} from '../../services/chatService';
import Loader from '../../components/Loader/Loader';
import {MessageType} from '../../types/chatTypes';
import SomethingWentWrong from '../../components/SomethingWentWrong/SomethingWentWrong';
import {useAppDispatch, useAppSelector} from '../../hooks';

const Conversation: React.FC = ({navigation, route}: any) => {
  const {chatDetails} = route.params;
  const [message, setMessage] = useState('');
  const [emojiModal, setEmojiModal] = useState(false);
  const user = {_id: '5353', username: 'rahul.123'};
  const dispatch = useAppDispatch();
  const chatt = useAppSelector(state => state.chat.chats);

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

  // useEffect(() => {
  //   socket.emit('joinChat', chatDetails._id);

  //   socket.on('newMessage', newMessage => {
  //     setMessages(prevMessages => [newMessage, ...prevMessages]);
  //   });

  //   return () => {
  //     socket.off('newMessage');
  //     socket.emit('leaveChat', chatDetails._id);
  //   };
  // }, []);

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

  // const sendMessage = () => {
  //   try {
  //     const messageObject: MessageType = {
  //       chatId: chatDetails._id,
  //       content: message,
  //       seenBy: [],
  //       receivedBy: [],
  //       sender: `${user._id}-${user.username}`,
  //       taggedUsers: [],
  //       category: 'text',
  //       uri: '',
  //       status: 'received',
  //     };
  //     setMessages(prevMessages => [messageObject, ...prevMessages]);
  //     dispatch(addMessage(messageObject));
  //     // socket.emit('newMessage', messageObject);
  //     setMessage('');
  //   } catch (error: any) {
  //     console.log('SendMessageException: ', error.message);
  //     showToast(error.message);
  //   }
  // };

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
          inverted={true}
          keyExtractor={(_, index: number) => index.toString()}
          contentContainerStyle={styles.contentContainerStyle}
          renderItem={({item}: {item: MessageType}) => {
            return (
              <View
                style={
                  item.sender.includes(user._id)
                    ? styles.sentMessage
                    : styles.receiveMessage
                }>
                <Text
                  style={getMessageStyle(
                    item.sender.split('-')[0] === user._id,
                    item.status,
                  )}>
                  {item.content}
                </Text>
                <View style={styles.msgExtraDetails}>
                  {item.sender.includes(user._id) ? (
                    <Octicons name="dot" size={15} color="green" />
                  ) : null}
                  <Text style={styles.msgTime}>10:30 PM</Text>
                </View>
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
        <TouchableOpacity activeOpacity={0.8} onPress={() => {}}>
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
