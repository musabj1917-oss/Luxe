import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { mockFriendships } from '../../server/routes/friends';
import { mockUsers, mockProfiles } from '../../server/services/mockStore';

export default function FriendsAndLeaderboardScreen() {
  const [activeTab, setActiveTab] = useState<'friends' | 'leaderboard'>('friends');
  const [searchQuery, setSearchQuery] = useState('');
  const [friendsList, setFriendsList] = useState(mockFriendships);

  const handleAddFriend = () => {
    if (!searchQuery.trim()) {
      Alert.alert('Username required', 'Type a username to add as friend.');
      return;
    }

    const newF = {
      id: `f_${Date.now()}`,
      user_id_1: 'u1',
      user_id_2: `u_${Date.now()}`,
      status: 'accepted' as const,
      streak_count: 1,
      last_interaction_at: new Date().toISOString()
    };

    setFriendsList([...friendsList, newF]);
    Alert.alert('Bestie Added!', `@${searchQuery.trim()} added to your friend list (+10 Friend Score).`);
    setSearchQuery('');
  };

  const handleGenerateInvite = () => {
    const code = `BESTIE-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
    Alert.alert('Invitation Code Created', `Share this code with your friend:\n\n${code}`);
  };

  const renderFriend = ({ item }: { item: typeof mockFriendships[0] }) => {
    const otherId = item.user_id_1 === 'u1' ? item.user_id_2 : item.user_id_1;
    const friendUser = mockUsers.find(u => u.id === otherId);
    const friendProfile = mockProfiles[otherId];

    return (
      <View style={styles.friendCard}>
        <View style={styles.friendAvatar}>
          <Ionicons name="person" size={24} color="#000000" />
        </View>

        <View style={styles.friendInfo}>
          <Text style={styles.friendName}>{friendUser?.full_name || 'Bestie'}</Text>
          <Text style={styles.friendHandle}>@{friendUser?.username || 'user'}</Text>
        </View>

        <View style={styles.badgesCol}>
          <View style={styles.streakBadge}>
            <Text style={styles.streakText}>🔥 {item.streak_count}d streak</Text>
          </View>
          <Text style={styles.scoreText}>⭐ {friendProfile?.score || 100} pts</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Tab Switcher */}
      <View style={styles.tabHeader}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'friends' && styles.activeTabButton]}
          onPress={() => setActiveTab('friends')}
        >
          <Text style={[styles.tabText, activeTab === 'friends' && styles.activeTabText]}>My Besties</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'leaderboard' && styles.activeTabButton]}
          onPress={() => setActiveTab('leaderboard')}
        >
          <Text style={[styles.tabText, activeTab === 'leaderboard' && styles.activeTabText]}>Leaderboard & Badges</Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'friends' ? (
        <View style={{ flex: 1 }}>
          {/* Add Friend & Invite Buttons */}
          <View style={styles.actionCard}>
            <View style={styles.searchRow}>
              <TextInput
                style={styles.searchInput}
                placeholder="Find username (e.g. taylor_swiftly)"
                placeholderTextColor="#888888"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
              <TouchableOpacity style={styles.addBtn} onPress={handleAddFriend}>
                <Ionicons name="person-add" size={18} color="#000000" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.inviteBtn} onPress={handleGenerateInvite}>
              <Ionicons name="link-outline" size={18} color="#000000" style={{ marginRight: 6 }} />
              <Text style={styles.inviteBtnText}>Generate Invitation Code</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={friendsList}
            keyExtractor={item => item.id}
            renderItem={renderFriend}
            contentContainerStyle={{ padding: 16 }}
          />
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollSection}>
          <Text style={styles.sectionHeader}>🏆 Friend Score Leaderboard</Text>
          <View style={styles.leaderboardBox}>
            <View style={styles.rankRow}>
              <Text style={styles.rankNum}>1. Jordan Lee (@jordan_vibe)</Text>
              <Text style={styles.rankScore}>⭐ 2,150 pts</Text>
            </View>
            <View style={styles.rankRow}>
              <Text style={styles.rankNum}>2. Alex Rivera (@alex_star)</Text>
              <Text style={styles.rankScore}>⭐ 1,420 pts</Text>
            </View>
            <View style={styles.rankRow}>
              <Text style={styles.rankNum}>3. Taylor Kim (@taylor_swiftly)</Text>
              <Text style={styles.rankScore}>⭐ 890 pts</Text>
            </View>
          </View>

          <Text style={styles.sectionHeader}>🎖️ Achievements</Text>
          <View style={styles.achieveCard}>
            <Ionicons name="camera" size={28} color="#FFFC00" />
            <View style={{ marginLeft: 12, flex: 1 }}>
              <Text style={styles.achieveTitle}>First Snap 📸</Text>
              <Text style={styles.achieveSub}>Sent your first snap message</Text>
            </View>
            <Ionicons name="checkmark-circle" size={24} color="#34C759" />
          </View>

          <View style={styles.achieveCard}>
            <Ionicons name="flame" size={28} color="#FFFC00" />
            <View style={{ marginLeft: 12, flex: 1 }}>
              <Text style={styles.achieveTitle}>Streak Master 🔥</Text>
              <Text style={styles.achieveSub}>Reached a 5-day streak with a bestie</Text>
            </View>
            <Ionicons name="checkmark-circle" size={24} color="#34C759" />
          </View>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  tabHeader: {
    flexDirection: 'row',
    backgroundColor: '#161616',
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
  },
  activeTabButton: {
    borderBottomWidth: 3,
    borderBottomColor: '#FFFC00',
  },
  tabText: {
    color: '#888888',
    fontSize: 14,
    fontWeight: '600',
  },
  activeTabText: {
    color: '#FFFC00',
    fontWeight: 'bold',
  },
  actionCard: {
    backgroundColor: '#1E1E1E',
    padding: 16,
    margin: 16,
    borderRadius: 12,
  },
  searchRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#2A2A2A',
    borderRadius: 8,
    paddingHorizontal: 12,
    color: '#FFFFFF',
    marginRight: 8,
  },
  addBtn: {
    backgroundColor: '#FFFC00',
    paddingHorizontal: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inviteBtn: {
    backgroundColor: '#FFFC00',
    paddingVertical: 10,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inviteBtnText: {
    color: '#000000',
    fontWeight: 'bold',
  },
  friendCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
  },
  friendAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFC00',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  friendInfo: {
    flex: 1,
  },
  friendName: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
  friendHandle: {
    color: '#888888',
    fontSize: 13,
  },
  badgesCol: {
    alignItems: 'flex-end',
  },
  streakBadge: {
    backgroundColor: '#3A2600',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    marginBottom: 4,
  },
  streakText: {
    color: '#FFFC00',
    fontSize: 11,
    fontWeight: 'bold',
  },
  scoreText: {
    color: '#CCCCCC',
    fontSize: 11,
  },
  scrollSection: {
    padding: 16,
  },
  sectionHeader: {
    color: '#FFFC00',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    marginTop: 8,
  },
  leaderboardBox: {
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  rankRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
  },
  rankNum: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  rankScore: {
    color: '#FFFC00',
    fontWeight: 'bold',
  },
  achieveCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
  },
  achieveTitle: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  achieveSub: {
    color: '#888888',
    fontSize: 12,
  },
});
