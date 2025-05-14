import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  Image, 
  TextInput,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Define interfaces for our data types
interface Conversation {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
}

interface Message {
  id: string;
  text: string;
  sender: 'me' | 'other';
  time: string;
}

// Mock data for conversations
const mockConversations: Conversation[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    lastMessage: 'I can help you with React Native development',
    time: '10:30 AM',
    unread: 2,
  },
  {
    id: '2',
    name: 'Sarah Williams',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    lastMessage: 'When are you available for the cooking lesson?',
    time: 'Yesterday',
    unread: 0,
  },
  {
    id: '3',
    name: 'Michael Brown',
    avatar: 'https://randomuser.me/api/portraits/men/67.jpg',
    lastMessage: 'Thanks for the photography tips!',
    time: 'Yesterday',
    unread: 0,
  },
  {
    id: '4',
    name: 'Emily Davis',
    avatar: 'https://randomuser.me/api/portraits/women/17.jpg',
    lastMessage: 'I would love to exchange skills with you',
    time: 'Mon',
    unread: 1,
  },
  {
    id: '5',
    name: 'David Wilson',
    avatar: 'https://randomuser.me/api/portraits/men/91.jpg',
    lastMessage: 'Let me know when you want to start the Spanish lessons',
    time: 'Sun',
    unread: 0,
  },
];

// Mock data for messages in a conversation
const mockMessages: Message[] = [
  {
    id: '1',
    text: 'Hi there! I saw you\'re interested in learning React Native.',
    sender: 'other',
    time: '10:00 AM',
  },
  {
    id: '2',
    text: 'Yes, I\'ve been wanting to build mobile apps for a while now!',
    sender: 'me',
    time: '10:05 AM',
  },
  {
    id: '3',
    text: 'I can help you with that. I\'ve been developing with React Native for 3 years.',
    sender: 'other',
    time: '10:10 AM',
  },
  {
    id: '4',
    text: 'That would be great! I can offer cooking lessons in exchange if you\'re interested?',
    sender: 'me',
    time: '10:15 AM',
  },
  {
    id: '5',
    text: 'Sounds perfect! I\'ve been wanting to improve my cooking skills.',
    sender: 'other',
    time: '10:20 AM',
  },
  {
    id: '6',
    text: 'When would you like to start?',
    sender: 'other',
    time: '10:30 AM',
  },
];

export default function ChatScreen() {
  const [activeChat, setActiveChat] = useState<Conversation | null>(null);
  const [message, setMessage] = useState('');
  
  const renderConversationItem = ({ item }: { item: Conversation }) => (
    <TouchableOpacity 
      style={styles.conversationItem} 
      onPress={() => setActiveChat(item)}
    >
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.conversationContent}>
        <View style={styles.conversationHeader}>
          <Text style={styles.conversationName}>{item.name}</Text>
          <Text style={styles.conversationTime}>{item.time}</Text>
        </View>
        <View style={styles.conversationFooter}>
          <Text 
            style={styles.conversationLastMessage}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {item.lastMessage}
          </Text>
          {item.unread > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadText}>{item.unread}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderMessageItem = ({ item }: { item: Message }) => (
    <View style={[
      styles.messageContainer,
      item.sender === 'me' ? styles.myMessage : styles.otherMessage
    ]}>
      <View style={[
        styles.messageBubble,
        item.sender === 'me' ? styles.myMessageBubble : styles.otherMessageBubble
      ]}>
        <Text style={[
          styles.messageText,
          item.sender === 'me' ? styles.myMessageText : null
        ]}>{item.text}</Text>
      </View>
      <Text style={styles.messageTime}>{item.time}</Text>
    </View>
  );

  const handleSend = () => {
    if (message.trim() === '') return;
    
    // Here you would normally send the message to your backend
    // For now, we'll just clear the input
    setMessage('');
  };

  const renderChatScreen = () => (
    <KeyboardAvoidingView 
      style={styles.chatContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={80}
    >
      <SafeAreaView style={styles.chatHeader}>
        <TouchableOpacity onPress={() => setActiveChat(null)}>
          <Ionicons name="arrow-back" size={24} color="#4A90E2" />
        </TouchableOpacity>
        {activeChat && (
          <>
            <Image source={{ uri: activeChat.avatar }} style={styles.chatAvatar} />
            <View style={styles.chatHeaderInfo}>
              <Text style={styles.chatHeaderName}>{activeChat.name}</Text>
              <Text style={styles.chatHeaderStatus}>Online</Text>
            </View>
          </>
        )}
        <TouchableOpacity>
          <Ionicons name="call" size={24} color="#4A90E2" />
        </TouchableOpacity>
      </SafeAreaView>
      
      <FlatList
        data={mockMessages}
        renderItem={renderMessageItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.messagesList}
        inverted={false}
      />
      
      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.attachButton}>
          <Ionicons name="attach" size={24} color="#4A90E2" />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={message}
          onChangeText={setMessage}
          multiline
        />
        <TouchableOpacity 
          style={[styles.sendButton, !message.trim() && styles.sendButtonDisabled]}
          onPress={handleSend}
          disabled={!message.trim()}
        >
          <Ionicons name="send" size={24} color={message.trim() ? "#4A90E2" : "#B8B8B8"} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );

  return (
    <SafeAreaView style={styles.container}>
      {activeChat ? (
        renderChatScreen()
      ) : (
        <>
          <View style={styles.header}>
            <Text style={styles.title}>Messages</Text>
            <TouchableOpacity>
              <Ionicons name="create-outline" size={24} color="#4A90E2" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color="#8E8E93" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search conversations"
              placeholderTextColor="#8E8E93"
            />
          </View>
          
          <FlatList
            data={mockConversations}
            renderItem={renderConversationItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.conversationsList}
          />
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: 60,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEEEEE',
    borderRadius: 10,
    margin: 16,
    paddingHorizontal: 10,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  conversationsList: {
    paddingBottom: 20,
  },
  conversationItem: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  conversationContent: {
    flex: 1,
  },
  conversationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  conversationName: {
    fontSize: 16,
    fontWeight: '600',
  },
  conversationTime: {
    fontSize: 12,
    color: '#8E8E93',
  },
  conversationFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  conversationLastMessage: {
    fontSize: 14,
    color: '#8E8E93',
    flex: 1,
    marginRight: 8,
  },
  unreadBadge: {
    backgroundColor: '#4A90E2',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unreadText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  
  // Chat screen styles
  chatContainer: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  chatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingTop: 60,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  chatAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 16,
  },
  chatHeaderInfo: {
    flex: 1,
    marginLeft: 12,
  },
  chatHeaderName: {
    fontSize: 16,
    fontWeight: '600',
  },
  chatHeaderStatus: {
    fontSize: 12,
    color: '#4CD964',
  },
  messagesList: {
    padding: 16,
  },
  messageContainer: {
    marginBottom: 16,
    maxWidth: '80%',
  },
  myMessage: {
    alignSelf: 'flex-end',
  },
  otherMessage: {
    alignSelf: 'flex-start',
  },
  messageBubble: {
    padding: 12,
    borderRadius: 20,
  },
  myMessageBubble: {
    backgroundColor: '#4A90E2',
    borderBottomRightRadius: 4,
  },
  otherMessageBubble: {
    backgroundColor: '#E5E5EA',
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 16,
    color: '#000000',
  },
  myMessageText: {
    color: '#FFFFFF',
  },
  messageTime: {
    fontSize: 10,
    color: '#8E8E93',
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  attachButton: {
    padding: 8,
  },
  input: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    maxHeight: 100,
    fontSize: 16,
  },
  sendButton: {
    padding: 8,
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
});