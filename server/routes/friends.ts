import { Router, Request, Response } from 'express';
import { mockUsers, mockProfiles } from '../services/mockStore';

const router = Router();

// In-memory friendships store
export interface Friendship {
  id: string;
  user_id_1: string;
  user_id_2: string;
  status: 'pending' | 'accepted' | 'blocked';
  streak_count: number;
  last_interaction_at: string;
}

export const mockFriendships: Friendship[] = [
  { id: 'f1', user_id_1: 'u1', user_id_2: 'u2', status: 'accepted', streak_count: 5, last_interaction_at: new Date().toISOString() },
  { id: 'f2', user_id_1: 'u1', user_id_2: 'u3', status: 'accepted', streak_count: 12, last_interaction_at: new Date().toISOString() }
];

// Get User's Friends
router.get('/:userId', (req: Request, res: Response) => {
  const { userId } = req.params;
  const friendships = mockFriendships.filter(
    f => (f.user_id_1 === userId || f.user_id_2 === userId) && f.status === 'accepted'
  );

  const friends = friendships.map(f => {
    const friendId = f.user_id_1 === userId ? f.user_id_2 : f.user_id_1;
    const friendUser = mockUsers.find(u => u.id === friendId);
    const friendProfile = mockProfiles[friendId];
    return {
      friendshipId: f.id,
      id: friendId,
      username: friendUser?.username || 'Unknown',
      full_name: friendUser?.full_name || 'Bestie User',
      avatar_url: friendUser?.avatar_url,
      score: friendProfile?.score || 0,
      score_visible: friendProfile?.score_visible !== false,
      streak: f.streak_count,
      lastInteraction: f.last_interaction_at
    };
  });

  return res.json({ friends });
});

// Search User by Username
router.get('/search/:username', (req: Request, res: Response) => {
  const { username } = req.params;
  const match = mockUsers.filter(u => u.username.toLowerCase().includes(username.toLowerCase()));
  return res.json({ results: match });
});

// Send Friend Request
router.post('/request', (req: Request, res: Response) => {
  const { senderId, targetUsername } = req.body;
  const targetUser = mockUsers.find(u => u.username.toLowerCase() === targetUsername.toLowerCase());

  if (!targetUser) {
    return res.status(404).json({ error: 'User not found' });
  }

  if (targetUser.id === senderId) {
    return res.status(400).json({ error: 'Cannot add yourself as a friend' });
  }

  const existing = mockFriendships.find(
    f => (f.user_id_1 === senderId && f.user_id_2 === targetUser.id) ||
         (f.user_id_1 === targetUser.id && f.user_id_2 === senderId)
  );

  if (existing) {
    return res.status(400).json({ error: 'Friendship request already exists or active' });
  }

  const newF: Friendship = {
    id: `f_${Date.now()}`,
    user_id_1: senderId,
    user_id_2: targetUser.id,
    status: 'accepted', // auto-accept for demo smoothness
    streak_count: 1,
    last_interaction_at: new Date().toISOString()
  };

  mockFriendships.push(newF);

  // Increment Friend Score for both users (+10 pts)
  if (mockProfiles[senderId]) mockProfiles[senderId].score += 10;
  if (mockProfiles[targetUser.id]) mockProfiles[targetUser.id].score += 10;

  return res.json({ success: true, friendship: newF, targetUser });
});

// Generate Invite Link / Code
router.post('/generate-invite', (req: Request, res: Response) => {
  const { userId } = req.body;
  const code = `BESTIE-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
  return res.json({ code, inviteUrl: `https://besties.app/invite/${code}` });
});

// Achievements and Streaks Leaderboard
router.get('/leaderboard/:userId', (req: Request, res: Response) => {
  const leaderboard = Object.values(mockProfiles)
    .filter(p => p.score_visible)
    .map(p => {
      const u = mockUsers.find(user => user.id === p.user_id);
      return {
        userId: p.user_id,
        username: u?.username || 'Bestie',
        fullName: u?.full_name || 'User',
        avatarUrl: u?.avatar_url,
        score: p.score
      };
    })
    .sort((a, b) => b.score - a.score);

  const achievements = [
    { id: 'ach_1', title: 'First Snap 📸', description: 'Sent your first snap message', unlocked: true },
    { id: 'ach_2', title: 'Streak Master 🔥', description: 'Reached a 5-day streak with a friend', unlocked: true },
    { id: 'ach_3', title: 'Super Social 🌟', description: 'Earned 1000+ Friend Score', unlocked: true },
    { id: 'ach_4', title: 'Explorer 🗺️', description: 'Shared live location with 3 friends', unlocked: false }
  ];

  return res.json({ leaderboard, achievements });
});

export default router;
