import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, TextInput, Alert, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
  const router = useRouter();
  const [decoyEnabled, setDecoyEnabled] = useState(false);
  const [decoyPin, setDecoyPin] = useState('1234');
  const [scoreVisible, setScoreVisible] = useState(true);
  const [bio, setBio] = useState('Living my best life ⚡️');

  const handleSaveBio = () => {
    Alert.alert('Profile Saved', 'Your bio has been updated.');
  };

  const handleTestDecoyPin = () => {
    Alert.alert(
      'Decoy Mode Activated 🎭',
      'Entering isolated fictional demo conversations view. Real messages remain untouched.',
      [{ text: 'OK', onPress: () => router.push('/chats') }]
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account & Data',
      'Are you sure you want to permanently delete your Besties account and associated data?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete Permanently',
          style: 'destructive',
          onPress: () => {
            Alert.alert('Account Deleted', 'Your account and data have been removed.');
            router.replace('/auth');
          }
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Profile Header */}
      <View style={styles.headerBox}>
        <View style={styles.avatarCircle}>
          <Ionicons name="person" size={40} color="#000000" />
        </View>
        <Text style={styles.nameText}>Alex Rivera</Text>
        <Text style={styles.handleText}>@alex_star</Text>
        <View style={styles.scorePill}>
          <Text style={styles.scorePillText}>⭐ Friend Score: 1,420 pts</Text>
        </View>
      </View>

      {/* Profile Bio Section */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Status & Bio</Text>
        <TextInput
          style={styles.bioInput}
          value={bio}
          onChangeText={setBio}
          placeholder="Write your bio..."
          placeholderTextColor="#888888"
        />
        <TouchableOpacity style={styles.saveBtn} onPress={handleSaveBio}>
          <Text style={styles.saveBtnText}>Save Profile Changes</Text>
        </TouchableOpacity>
      </View>

      {/* Decoy PIN Security Section */}
      <View style={styles.card}>
        <View style={styles.rowBetween}>
          <View>
            <Text style={styles.cardTitle}>Decoy PIN Feature</Text>
            <Text style={styles.cardSub}>Opens fictional demo interface without altering real snaps</Text>
          </View>
          <Switch
            value={decoyEnabled}
            onValueChange={setDecoyEnabled}
            trackColor={{ false: '#333333', true: '#FFFC00' }}
            thumbColor={decoyEnabled ? '#000000' : '#888888'}
          />
        </View>

        {decoyEnabled && (
          <View style={{ marginTop: 12 }}>
            <Text style={styles.label}>Configured Decoy PIN</Text>
            <TextInput
              style={styles.input}
              value={decoyPin}
              onChangeText={setDecoyPin}
              keyboardType="number-pad"
              maxLength={4}
              secureTextEntry
            />
            <TouchableOpacity style={styles.testDecoyBtn} onPress={handleTestDecoyPin}>
              <Ionicons name="eye-outline" size={18} color="#000000" style={{ marginRight: 6 }} />
              <Text style={styles.testDecoyText}>Test Decoy Mode Interface</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Score Visibility & Privacy Controls */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Privacy & Leaderboards</Text>

        <View style={styles.rowBetween}>
          <Text style={styles.rowLabel}>Show Friend Score on Leaderboards</Text>
          <Switch
            value={scoreVisible}
            onValueChange={setScoreVisible}
            trackColor={{ false: '#333333', true: '#FFFC00' }}
            thumbColor={scoreVisible ? '#000000' : '#888888'}
          />
        </View>
      </View>

      {/* Admin Message Retention & Disclosure Section */}
      <View style={styles.disclosureBox}>
        <Ionicons name="shield-checkmark" size={24} color="#FFFC00" />
        <View style={{ marginLeft: 12, flex: 1 }}>
          <Text style={styles.disclosureTitle}>Clear Transparency Policy</Text>
          <Text style={styles.disclosureText}>
            Messages disappear from active views after 30 minutes, and stories expire after 24 hours.
            All messages and media are securely retained on the server for admin oversight and future admin dashboard functionality.
          </Text>
        </View>
      </View>

      {/* Account Deletion */}
      <TouchableOpacity style={styles.deleteBtn} onPress={handleDeleteAccount}>
        <Ionicons name="trash-outline" size={18} color="#FFFFFF" style={{ marginRight: 8 }} />
        <Text style={styles.deleteBtnText}>Delete Account & Erase Local Data</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  content: {
    padding: 16,
  },
  headerBox: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFFC00',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  nameText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  handleText: {
    color: '#888888',
    fontSize: 14,
    marginBottom: 8,
  },
  scorePill: {
    backgroundColor: '#282500',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#666000',
  },
  scorePillText: {
    color: '#FFFC00',
    fontSize: 12,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#1C1C1C',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  cardTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cardSub: {
    color: '#888888',
    fontSize: 12,
    maxWidth: 240,
  },
  bioInput: {
    backgroundColor: '#2A2A2A',
    borderRadius: 8,
    padding: 12,
    color: '#FFFFFF',
    marginTop: 10,
    marginBottom: 12,
  },
  saveBtn: {
    backgroundColor: '#FFFC00',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveBtnText: {
    color: '#000000',
    fontWeight: 'bold',
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowLabel: {
    color: '#DDDDDD',
    fontSize: 14,
  },
  label: {
    color: '#888888',
    fontSize: 12,
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#2A2A2A',
    borderRadius: 8,
    padding: 10,
    color: '#FFFFFF',
    marginBottom: 10,
  },
  testDecoyBtn: {
    backgroundColor: '#FFFC00',
    paddingVertical: 10,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  testDecoyText: {
    color: '#000000',
    fontWeight: 'bold',
  },
  disclosureBox: {
    flexDirection: 'row',
    backgroundColor: '#242200',
    padding: 14,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#555000',
  },
  disclosureTitle: {
    color: '#FFFC00',
    fontWeight: 'bold',
    fontSize: 13,
    marginBottom: 4,
  },
  disclosureText: {
    color: '#DDDDDD',
    fontSize: 11,
    lineHeight: 16,
  },
  deleteBtn: {
    backgroundColor: '#FF3B30',
    paddingVertical: 14,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  deleteBtnText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 15,
  },
});
