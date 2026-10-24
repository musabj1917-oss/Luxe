import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { mockMessages } from '../../server/routes/chats';
import { Message } from '../../server/services/mockStore';

export default function DirectChatScreen() {
  const { id, title } = useLocalSearchParams<{ id: string; title: string }>();
  const [messages, setMessages] = useState<Message[]>(
    mockMessages.filter(m => m.conversation_id === id)
  );
  const [inputText, setInputText] = useState('');
  const [isRecordingVoice, setIsRecordingVoice] = useState(false);

  const handleSendText = () => {
    if (!inputText.trim()) return;

    const newMsg: Message = {
      id: `msg_${Date.now()}`,
      conversation_id: id || 'c1',
      sender_id: 'u1',
      sender_username: 'alex_star',
      type: 'text',
      content: inputText.trim(),
      created_at: new Date().toISOString(),
      expires_at: new Date(Date.now() + 30 * 60 * 1000).toISOString()
    };

    setMessages(prev => [...prev, newMsg]);
    setInputText('');
  };

  const handleSendPhoto = () => {
    const samplePhotos = [
      'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600'
    ];
    const picked = samplePhotos[Math.floor(Math.random() * samplePhotos.length)];

    const photoMsg: Message = {
      id: `msg_${Date.now()}`,
      conversation_id: id || 'c1',
      sender_id: 'u1',
      sender_username: 'alex_star',
      type: 'photo',
      media_url: picked,
      created_at: new Date().toISOString(),
      expires_at: new Date(Date.now() + 30 * 60 * 1000).toISOString()
    };

    setMessages(prev => [...prev, photoMsg]);
  };

  const handleToggleVoice = () => {
    if (!isRecordingVoice) {
      setIsRecordingVoice(true);
    } else {
      setIsRecordingVoice(false);
      // Voice message recorded
      const voiceMsg: Message = {
        id: `msg_${Date.now()}`,
        conversation_id: id || 'c1',
        sender_id: 'u1',
        sender_username: 'alex_star',
        type: 'voice',
        duration: 8,
        created_at: new Date().toISOString(),
        expires_at: new Date(Date.now() + 30 * 60 * 1000).toISOString()
      };
      setMessages(prev => [...prev, voiceMsg]);
      Alert.alert('Voice Note Sent', '8 second voice snap sent.');
    }
  };

  const renderMessage = ({ item }: { item: Message }) => {
    const isMe = item.sender_id === 'u1';

    return (
      <View style={[styles.messageBubbleContainer, isMe ? styles.myBubbleContainer : styles.theirBubbleContainer]}>
        {!isMe && <Text style={styles.senderName}>@{item.sender_username}</Text>}

        <View style={[styles.messageBubble, isMe ? styles.myBubble : styles.theirBubble]}>
          {item.type === 'text' && <Text style={isMe ? styles.myText : styles.theirText}>{item.content}</Text>}

          {item.type === 'emoji' && <Text style={{ fontSize: 32 }}>{item.content}</Text>}

          {item.type === 'photo' && item.media_url && (
            <Image source={{ uri: item.media_url }} style={styles.snapImage} />
          )}

          {item.type === 'voice' && (
            <View style={styles.voiceRow}>
              <Ionicons name="play-circle" size={28} color={isMe ? '#000000' : '#FFFC00'} />
              <Text style={[styles.voiceText, { color: isMe ? '#000000' : '#FFFFFF' }]}>Voice Note ({item.duration || 5}s)</Text>
            </View>
          )}

          {/* 30-min disappearing badge indicator */}
          <View style={styles.expiryBadge}>
            <Ionicons name="hourglass-outline" size={10} color={isMe ? '#333333' : '#888888'} />
            <Text style={[styles.expiryText, { color: isMe ? '#333333' : '#888888' }]}>Expires in 30m</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      {/* Disclaimer Banner */}
      <View style={styles.disclaimerBar}>
        <Text style={styles.disclaimerText}>
          🔒 30-min disappearing active chat • Retained in server admin archive
        </Text>
      </View>

      <FlatList
        data={messages}
        keyExtractor={item => item.id}
        renderItem={renderMessage}
        contentContainerStyle={styles.messagesList}
      />

      {/* Input Bar */}
      <View style={styles.inputBar}>
        <TouchableOpacity style={styles.iconButton} onPress={handleSendPhoto}>
          <Ionicons name="image" size={24} color="#FFFC00" />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.iconButton, isRecordingVoice && styles.activeMic]} onPress={handleToggleVoice}>
          <Ionicons name={isRecordingVoice ? 'square' : 'mic'} size={24} color={isRecordingVoice ? '#FF3B30' : '#FFFC00'} />
        </TouchableOpacity>

        <TextInput
          style={styles.textInput}
          placeholder="Send a Snap or chat..."
          placeholderTextColor="#888888"
          value={inputText}
          onChangeText={setInputText}
        />

        <TouchableOpacity style={styles.sendButton} onPress={handleSendText}>
          <Ionicons name="arrow-up-circle" size={32} color="#FFFC00" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  disclaimerBar: {
    backgroundColor: '#1E1E1E',
    paddingVertical: 6,
    paddingHorizontal: 12,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#222222',
  },
  disclaimerText: {
    color: '#AAAAAA',
    fontSize: 11,
  },
  messagesList: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  messageBubbleContainer: {
    marginVertical: 6,
    maxWidth: '80%',
  },
  myBubbleContainer: {
    alignSelf: 'flex-end',
  },
  theirBubbleContainer: {
    alignSelf: 'flex-start',
  },
  senderName: {
    color: '#888888',
    fontSize: 11,
    marginBottom: 2,
    marginLeft: 4,
  },
  messageBubble: {
    padding: 12,
    borderRadius: 16,
  },
  myBubble: {
    backgroundColor: '#FFFC00',
    borderBottomRightRadius: 2,
  },
  theirBubble: {
    backgroundColor: '#222222',
    borderBottomLeftRadius: 2,
  },
  myText: {
    color: '#000000',
    fontSize: 15,
    fontWeight: '500',
  },
  theirText: {
    color: '#FFFFFF',
    fontSize: 15,
  },
  snapImage: {
    width: 200,
    height: 250,
    borderRadius: 12,
  },
  voiceRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  voiceText: {
    marginLeft: 8,
    fontWeight: 'bold',
    fontSize: 14,
  },
  expiryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  expiryText: {
    fontSize: 9,
    marginLeft: 3,
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#121212',
    borderTopWidth: 1,
    borderTopColor: '#222222',
  },
  iconButton: {
    padding: 6,
    marginRight: 4,
  },
  activeMic: {
    backgroundColor: '#330000',
    borderRadius: 15,
  },
  textInput: {
    flex: 1,
    backgroundColor: '#222222',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    color: '#FFFFFF',
    fontSize: 14,
    marginHorizontal: 6,
  },
  sendButton: {
    padding: 2,
  },
});
