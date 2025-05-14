import React, { useState, useRef, useEffect } from 'react';
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
  SafeAreaView,
  Animated,
  Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';

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
  const scrollViewRef = useRef<FlatList>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [activeChat]);

  const renderConversationItem = ({ item }: { item: Conversation }) => (
    <TouchableOpacity 
      style={styles.conversationItem} 
      onPress={() => setActiveChat(item)}
      activeOpacity={0.7}
    >
      <View style={styles.avatarContainer}>
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
        {item.unread > 0 && (
          <View style={[styles.onlineIndicator, { backgroundColor: '#28693C' }]} />
        )}
      </View>
      <View style={styles.conversationContent}>
        <View style={styles.conversationHeader}>
          <Text style={styles.conversationName}>{item.name}</Text>
          <Text style={styles.conversationTime}>{item.time}</Text>
        </View>
        <View style={styles.conversationFooter}>
          <Text 
            style={[
              styles.conversationLastMessage,
              item.unread > 0 && styles.unreadMessage
            ]}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {item.lastMessage}
          </Text>
          {item.unread > 0 && (
            <View style={[styles.unreadBadge, { backgroundColor: '#28693C' }]}>
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
      {item.sender === 'other' && (
        <Image 
          source={{ uri: activeChat?.avatar }} 
          style={styles.messageBubbleAvatar} 
        />
      )}
      <View style={styles.messageContent}>
        <LinearGradient
          colors={item.sender === 'me' 
            ? ['#28693C', '#1D4D2C'] 
            : ['#F8F9FA', '#E9ECEF']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[
            styles.messageBubble,
            item.sender === 'me' ? styles.myMessageBubble : styles.otherMessageBubble
          ]}
        >
          <Text style={[
            styles.messageText,
            item.sender === 'me' ? styles.myMessageText : styles.otherMessageText
          ]}>{item.text}</Text>
        </LinearGradient>
        <Text style={[
          styles.messageTime,
          item.sender === 'me' ? styles.myMessageTime : styles.otherMessageTime
        ]}>{item.time}</Text>
      </View>
      {item.sender === 'me' && (
        <View style={styles.emptyAvatarSpace} />
      )}
    </View>
  );

  const handleSend = () => {
    if (message.trim() === '') return;
    
    // Here you would normally send the message to your backend
    // For now, we'll just clear the input
    setMessage('');
    
    // Scroll to bottom
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const renderChatScreen = () => (
    <KeyboardAvoidingView 
      style={styles.chatContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={80}
    >
      <LinearGradient
        colors={['#28693C', '#1D4D2C']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.chatHeader}
      >
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => setActiveChat(null)}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        {activeChat && (
          <>
            <Image source={{ uri: activeChat.avatar }} style={styles.chatAvatar} />
            <View style={styles.chatHeaderInfo}>
              <Text style={styles.chatHeaderName}>{activeChat.name}</Text>
              <View style={styles.onlineStatusContainer}>
                <View style={[styles.onlineDot, { backgroundColor: '#D4AF37' }]} />
                <Text style={styles.chatHeaderStatus}>Online</Text>
              </View>
            </View>
            <View style={styles.headerActions}>
              <TouchableOpacity style={styles.headerActionButton}>
                <Ionicons name="call" size={22} color="#FFFFFF" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.headerActionButton}>
                <Ionicons name="videocam" size={22} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </>
        )}
      </LinearGradient>
      
      <Animated.View style={[styles.messagesContainer, { opacity: fadeAnim }]}>
        <FlatList
          ref={scrollViewRef}
          data={mockMessages}
          renderItem={renderMessageItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.messagesList}
          showsVerticalScrollIndicator={false}
        />
      </Animated.View>
      
      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.attachButton}>
          <Ionicons name="add-circle" size={26} color="#28693C" />
        </TouchableOpacity>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Type a message..."
            placeholderTextColor="#9CA3AF"
            value={message}
            onChangeText={setMessage}
            multiline
          />
          <TouchableOpacity style={styles.emojiButton}>
            <Ionicons name="happy-outline" size={24} color="#9CA3AF" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity 
          style={[
            styles.sendButton, 
            message.trim() ? [styles.sendButtonActive, { backgroundColor: '#D4AF37' }] : styles.sendButtonInactive
          ]}
          onPress={handleSend}
          disabled={!message.trim()}
        >
          <Ionicons 
            name="send" 
            size={20} 
            color={message.trim() ? "#28693C" : "#9CA3AF"} 
          />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );

  const renderConversationsScreen = () => (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <LinearGradient
        colors={['#28693C', '#1D4D2C']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.header}
      >
        <Text style={styles.title}>Messages</Text>
        <TouchableOpacity style={[styles.newMessageButton, { backgroundColor: 'rgba(212, 175, 55, 0.3)' }]}>
          <Ionicons name="create-outline" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </LinearGradient>
      
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#9CA3AF" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search conversations"
          placeholderTextColor="#9CA3AF"
        />
      </View>
      
      <FlatList
        data={mockConversations}
        renderItem={renderConversationItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.conversationsList}
        showsVerticalScrollIndicator={false}
      />
    </Animated.View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      {activeChat ? renderChatScreen() : renderConversationsScreen()}
    </SafeAreaView>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: 60,
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  newMessageButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    margin: 16,
    paddingHorizontal: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#1F2937',
  },
  conversationsList: {
    paddingBottom: 20,
  },
  conversationItem: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 16,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#10B981',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  conversationContent: {
    flex: 1,
    justifyContent: 'center',
  },
  conversationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  conversationName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  conversationTime: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  conversationFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  conversationLastMessage: {
    fontSize: 14,
    color: '#6B7280',
    flex: 1,
    marginRight: 8,
  },
  unreadMessage: {
    color: '#1F2937',
    fontWeight: '500',
  },
  unreadBadge: {
    backgroundColor: '#6A11CB',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  unreadText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  
  // Chat screen styles
  chatContainer: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  chatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingTop: 60,
    paddingBottom: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  chatAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
  chatHeaderInfo: {
    flex: 1,
    marginLeft: 12,
  },
  chatHeaderName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  onlineStatusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  onlineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10B981',
    marginRight: 4,
  },
  chatHeaderStatus: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  headerActions: {
    flexDirection: 'row',
  },
  headerActionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  messagesContainer: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  messagesList: {
    padding: 16,
    paddingBottom: 32,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    maxWidth: '100%',
  },
  messageContent: {
    maxWidth: '75%',
  },
  myMessage: {
    justifyContent: 'flex-end',
  },
  otherMessage: {
    justifyContent: 'flex-start',
  },
  messageBubbleAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
    alignSelf: 'flex-end',
    marginBottom: 18,
  },
  emptyAvatarSpace: {
    width: 32,
    marginLeft: 8,
  },
  messageBubble: {
    padding: 12,
    borderRadius: 20,
    maxWidth: width * 0.65,
  },
  myMessageBubble: {
    borderBottomRightRadius: 4,
  },
  otherMessageBubble: {
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  myMessageText: {
    color: '#FFFFFF',
  },
  otherMessageText: {
    color: '#1F2937',
  },
  messageTime: {
    fontSize: 11,
    marginTop: 4,
    marginHorizontal: 4,
  },
  myMessageTime: {
    color: '#9CA3AF',
    alignSelf: 'flex-end',
  },
  otherMessageTime: {
    color: '#9CA3AF',
    alignSelf: 'flex-start',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  attachButton: {
    padding: 8,
    marginRight: 8,
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  input: {
    flex: 1,
    maxHeight: 100,
    fontSize: 16,
    color: '#1F2937',
  },
  emojiButton: {
    padding: 4,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  sendButtonActive: {
    backgroundColor: '#6A11CB',
  },
  sendButtonInactive: {
    backgroundColor: '#F3F4F6',
  },
});