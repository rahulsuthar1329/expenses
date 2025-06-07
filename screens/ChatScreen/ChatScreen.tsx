import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import styles from './ChatScreen.styled';
import Chat from '../../components/Chat/Chat';
import Octicons from 'react-native-vector-icons/Octicons';
import {useAppSelector} from '../../hooks';
import {useGetChatsQuery} from '../../services/chatService';
import Loader from '../../components/Loader/Loader';
import SomethingWentWrong from '../../components/SomethingWentWrong/SomethingWentWrong';

const ChatScreen = () => {
  const [search, setSearch] = useState('');
  const {user} = useAppSelector(state => state.user);
  console.log({user});

  const {data, error, isLoading} = useGetChatsQuery();

  if (isLoading) return <Loader />;
  if (error) return <SomethingWentWrong />;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Hi, {user?.username}</Text>
        <View style={styles.searchbar}>
          <Octicons name="search" size={20} color={'#949393'} />
          <TextInput
            value={search}
            onChangeText={e => setSearch(e)}
            placeholder="Search a person or group..."
            style={styles.search}
          />
        </View>
      </View>
      <View style={styles.recentContainer}>
        <Text style={styles.subHeading}>Recent</Text>
        <FlatList
          style={styles.recent}
          horizontal
          data={data?.chats}
          keyExtractor={(item, index) => index.toString() + item?.chatName}
          renderItem={({item}) => (
            <TouchableOpacity activeOpacity={0.8} style={styles.recentChat}>
              <Image
                source={{
                  uri:
                    item?.profileImage ||
                    'https://buffer.com/library/content/images/size/w1200/2023/10/free-images.jpg',
                }}
                style={styles.image}
              />
              <Text style={styles.name}>{item?.chatName?.split(' ')[0]}</Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.recentChatInnerStyles}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <View style={{height: Dimensions.get('window').height - 210}}>
        <Text style={styles.subHeading}>Messages</Text>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={data?.chats}
          contentContainerStyle={styles.conversationInnerStyle}
          keyExtractor={(item, index) => item?.chatName + index.toString()}
          renderItem={({item}) => <Chat chatDetails={item} />}
        />
      </View>
    </View>
  );
};

export default ChatScreen;
