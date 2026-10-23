export interface User {
  id: string;
  google_id: string;
  email: string;
  username: string;
  full_name: string;
  avatar_url: string;
  decoy_pin_hash?: string;
  privacy_disclosure_accepted: boolean;
  created_at: string;
}

export interface Profile {
  user_id: string;
  bio: string;
  score: number;
  score_visible: boolean;
  location_sharing_enabled: boolean;
  status_message: string;
}

export interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  sender_username?: string;
  type: 'text' | 'emoji' | 'photo' | 'video' | 'voice';
  content?: string;
  media_url?: string;
  duration?: number;
  created_at: string;
  expires_at: string;
}

export interface Story {
  id: string;
  user_id: string;
  username: string;
  avatar_url: string;
  type: 'photo' | 'video';
  media_url: string;
  caption?: string;
  created_at: string;
  expires_at: string;
}

export const mockUsers: User[] = [
  {
    id: 'u1',
    google_id: 'google-101',
    email: 'alex@besties.app',
    username: 'alex_star',
    full_name: 'Alex Rivera',
    avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    decoy_pin_hash: '1234',
    privacy_disclosure_accepted: true,
    created_at: new Date().toISOString()
  },
  {
    id: 'u2',
    google_id: 'google-102',
    email: 'taylor@besties.app',
    username: 'taylor_swiftly',
    full_name: 'Taylor Kim',
    avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    privacy_disclosure_accepted: true,
    created_at: new Date().toISOString()
  },
  {
    id: 'u3',
    google_id: 'google-103',
    email: 'jordan@besties.app',
    username: 'jordan_vibe',
    full_name: 'Jordan Lee',
    avatar_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    privacy_disclosure_accepted: true,
    created_at: new Date().toISOString()
  }
];

export const mockProfiles: Record<string, Profile> = {
  u1: { user_id: 'u1', bio: 'Living my best life ⚡️', score: 1420, score_visible: true, location_sharing_enabled: true, status_message: 'At Coffee Shop ☕️' },
  u2: { user_id: 'u2', bio: 'Snap first, ask questions later 📸', score: 890, score_visible: true, location_sharing_enabled: true, status_message: 'Studying... 📚' },
  u3: { user_id: 'u3', bio: 'Besties forever! ✨', score: 2150, score_visible: true, location_sharing_enabled: false, status_message: 'Gym mode 💪' }
};

export const mockDecoyConversations = [
  {
    id: 'decoy-c1',
    title: 'Study Group Project 📚',
    is_group: true,
    last_message: 'Let us present slide 4 tomorrow.',
    updated_at: new Date().toISOString(),
    participants: [{ username: 'Professor_Oak' }, { username: 'Study_Bot' }]
  },
  {
    id: 'decoy-c2',
    title: 'Grocery Reminders 🛒',
    is_group: false,
    last_message: 'Don’t forget almond milk and oat bread!',
    updated_at: new Date().toISOString(),
    participants: [{ username: 'Roommate_Sam' }]
  }
];

export const mockDecoyMessages = [
  {
    id: 'dm1',
    conversation_id: 'decoy-c1',
    sender_username: 'Professor_Oak',
    type: 'text',
    content: 'Don’t forget to review chapter 5 before tomorrow morning class!',
    created_at: new Date(Date.now() - 3600000).toISOString()
  },
  {
    id: 'dm2',
    conversation_id: 'decoy-c2',
    sender_username: 'Roommate_Sam',
    type: 'text',
    content: 'Can you grab almond milk on your way back?',
    created_at: new Date(Date.now() - 1800000).toISOString()
  }
];

export const mockInvitations = [
  { code: 'BESTIES2025', created_by: 'u1', is_used: false },
  { code: 'VIP-GUEST', created_by: 'u1', is_used: false }
];
