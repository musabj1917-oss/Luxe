import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function AuthScreen() {
  const router = useRouter();
  const [step, setStep] = useState<'invite' | 'google' | 'username'>('invite');
  const [inviteCode, setInviteCode] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [disclosureAccepted, setDisclosureAccepted] = useState(false);
  const [decoyPin, setDecoyPin] = useState('');

  const handleVerifyInvite = () => {
    if (!inviteCode.trim()) {
      Alert.alert('Invite Code Required', 'Besties Messenger is invite-only. Please enter a valid invite code.');
      return;
    }
    setStep('google');
  };

  const handleGoogleLogin = () => {
    // Simulated Google OAuth login flow for mobile demo
    setEmail('bestie_user@gmail.com');
    setStep('username');
  };

  const handleCompleteSetup = () => {
    if (!username.trim()) {
      Alert.alert('Username Required', 'Please choose a unique username.');
      return;
    }
    if (!disclosureAccepted) {
      Alert.alert('Disclosure Required', 'You must acknowledge message retention policies to continue.');
      return;
    }

    Alert.alert('Welcome to Besties!', `Registered as @${username.trim()}`);
    router.replace('/(tabs)');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <View style={styles.logoBadge}>
          <Ionicons name="chatbubbles" size={48} color="#000000" />
        </View>
        <Text style={styles.title}>Besties Messenger</Text>
        <Text style={styles.subtitle}>Private, expiring snaps & chats with your closest friends</Text>
      </View>

      {step === 'invite' && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Invitation Required</Text>
          <Text style={styles.cardSub}>Besties Messenger is an exclusive invite-only community.</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter Invitation Code (e.g., BESTIES)"
            placeholderTextColor="#888888"
            value={inviteCode}
            onChangeText={setInviteCode}
            autoCapitalize="characters"
          />

          <TouchableOpacity style={styles.yellowButton} onPress={handleVerifyInvite}>
            <Text style={styles.yellowButtonText}>Continue with Invitation</Text>
          </TouchableOpacity>
        </View>
      )}

      {step === 'google' && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Sign in with Google</Text>
          <Text style={styles.cardSub}>Authenticate securely with your Google account.</Text>

          <TouchableOpacity style={styles.googleButton} onPress={handleGoogleLogin}>
            <Ionicons name="logo-google" size={22} color="#FFFFFF" style={{ marginRight: 10 }} />
            <Text style={styles.googleButtonText}>Sign In with Google</Text>
          </TouchableOpacity>
        </View>
      )}

      {step === 'username' && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Choose Username & Security</Text>

          <Text style={styles.label}>Unique Username</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., alex_star"
            placeholderTextColor="#888888"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />

          <Text style={styles.label}>Optional Decoy PIN (Fictional Mode)</Text>
          <TextInput
            style={styles.input}
            placeholder="4-digit Decoy PIN (e.g., 1234)"
            placeholderTextColor="#888888"
            value={decoyPin}
            onChangeText={setDecoyPin}
            keyboardType="number-pad"
            maxLength={4}
            secureTextEntry
          />

          {/* Retention & Admin Archive Disclosure Notice */}
          <View style={styles.disclosureBox}>
            <Ionicons name="information-circle" size={24} color="#FFFC00" />
            <View style={{ marginLeft: 10, flex: 1 }}>
              <Text style={styles.disclosureTitle}>Privacy & Retention Policy Notice</Text>
              <Text style={styles.disclosureText}>
                Messages expire and disappear from normal chat views 30 minutes after sending.
                However, messages are NOT end-to-end encrypted and are saved in a protected server-side archive for future administrator inspection.
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.checkboxRow}
            onPress={() => setDisclosureAccepted(!disclosureAccepted)}
          >
            <Ionicons
              name={disclosureAccepted ? 'checkbox' : 'square-outline'}
              size={24}
              color={disclosureAccepted ? '#FFFC00' : '#888888'}
            />
            <Text style={styles.checkboxText}>I understand and accept the message retention policy.</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.yellowButton} onPress={handleCompleteSetup}>
            <Text style={styles.yellowButtonText}>Enter Besties App</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  content: {
    padding: 24,
    paddingTop: 60,
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logoBadge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFFC00',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFC00',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#CCCCCC',
    textAlign: 'center',
  },
  card: {
    width: '100%',
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#333333',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  cardSub: {
    fontSize: 13,
    color: '#AAAAAA',
    marginBottom: 18,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#DDDDDD',
    marginBottom: 6,
    marginTop: 10,
  },
  input: {
    backgroundColor: '#2A2A2A',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: '#FFFFFF',
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#444444',
  },
  yellowButton: {
    backgroundColor: '#FFFC00',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 20,
  },
  yellowButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  googleButton: {
    backgroundColor: '#4285F4',
    borderRadius: 10,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  googleButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  disclosureBox: {
    flexDirection: 'row',
    backgroundColor: '#2A2600',
    padding: 12,
    borderRadius: 10,
    marginTop: 16,
    borderColor: '#666000',
    borderWidth: 1,
  },
  disclosureTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#FFFC00',
    marginBottom: 4,
  },
  disclosureText: {
    fontSize: 11,
    color: '#DDDDDD',
    lineHeight: 16,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 14,
  },
  checkboxText: {
    fontSize: 12,
    color: '#CCCCCC',
    marginLeft: 8,
    flex: 1,
  },
});
