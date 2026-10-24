import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { mockConversations, mockMessages } from '../../server/routes/chats';

export default function ChatsListScreen() {
  const router = useRouter();
  const [conversations] = useState(mockConversations);

  const renderItem = ({ item }: { item: typeof mockConversations[0] }) => {
    // Check recent message
    const msgs = mockMessages.filter(m => m.conversation_id === item.id);
    const lastMsg = msgs[msgs.length - 1];

    return (
      <TouchableOpacity
        style={styles.chatRow}
        onPress={() => router.push({ pathname: '/chat/[id]', params: { id: item.id, title: item.title || 'Bestie' } })}
      >
        <View style={styles.avatarContainer}>
          <View style={styles.avatarPlaceholder}>
            <Ionicons name={item.is_group ? 'people' : 'person'} size={24} color="#000000" />
          </View>
        </View>

        <View style={styles.chatDetails}>
          <View style={styles.chatHeaderRow}>
            <Text style={styles.chatTitle}>{item.title || 'Bestie Chat'}</Text>
            <View style={styles.timerBadge}>
              <Ionicons name="time-outline" size={12} color="#FFFC00" />
              <Text style={styles.timerText}>30m</Text>
            </View>
          </View>

          <Text style={styles.lastMessageText} numberOfLines={1}>
            {lastMsg ? `${lastMsg.sender_username}: ${lastMsg.content || '[' + lastMsg.type.toUpperCase() + ']'}` : 'Tap to start snapping!'}
          </Text>
        </View>

        <Ionicons name="chevron-forward" size={18} color="#555555" />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Retention Disclosure Bar */}
      <View style={styles.retentionBanner}>
        <Ionicons name="shield-checkmark" size={16} color="#000000" style={{ marginRight: 6 }} />
        <Text style={styles.retentionText}>
          Snaps expire in 30 mins • Protected admin archive enabled
        </Text>
      </View>

      <FlatList
        data={conversations}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  retentionBanner: {
    backgroundColor: '#FFFC00',
    paddingVertical: 8,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  retentionText: {
    color: '#000000',
    fontSize: 12,
    fontWeight: 'bold',
  },
  listContent: {
    paddingVertical: 8,
  },
  chatRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#1A1A1A',
  },
  avatarContainer: {
    marginRight: 14,
  },
  avatarPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFFC00',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatDetails: {
    flex: 1,
  },
  chatHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  chatTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  timerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#262400',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#666000',
  },
  timerText: {
    color: '#FFFC00',
    fontSize: 10,
    fontWeight: 'bold',
    marginLeft: 3,
  },
  lastMessageText: {
    color: '#888888',
    fontSize: 13,
  },
});
