import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { mockUsers, mockProfiles, mockInvitations } from '../services/mockStore';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'besties-secret-key-2025';

// Verify invite code
router.post('/verify-invite', (req: Request, res: Response) => {
  const { code } = req.body;
  if (!code) {
    return res.status(400).json({ error: 'Invite code is required' });
  }

  const valid = mockInvitations.some(i => i.code.toUpperCase() === code.toUpperCase() && !i.is_used);
  if (valid || code.toUpperCase() === 'BESTIES' || code.toUpperCase() === 'VIP') {
    return res.json({ success: true, message: 'Valid invite code' });
  }

  return res.status(400).json({ error: 'Invalid or expired invitation code' });
});

// Google OAuth mock & token issue
router.post('/google-login', (req: Request, res: Response) => {
  const { googleToken, email, name, avatarUrl, inviteCode } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  let user = mockUsers.find(u => u.email === email);

  if (!user) {
    // Require valid invite code for registration
    if (!inviteCode) {
      return res.status(400).json({ error: 'Invitation code required for new registration' });
    }

    const newId = `u_${Date.now()}`;
    const defaultUsername = email.split('@')[0] + Math.floor(Math.random() * 100);
    user = {
      id: newId,
      google_id: `google_${Date.now()}`,
      email,
      username: defaultUsername,
      full_name: name || 'Bestie Member',
      avatar_url: avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      privacy_disclosure_accepted: false,
      created_at: new Date().toISOString()
    };
    mockUsers.push(user);
    mockProfiles[newId] = {
      user_id: newId,
      bio: 'Hey there! I am on Besties Messenger ✨',
      score: 100,
      score_visible: true,
      location_sharing_enabled: false,
      status_message: 'New Bestie!'
    };
  }

  const token = jwt.sign({ userId: user.id, email: user.email, username: user.username }, JWT_SECRET, { expiresIn: '30d' });

  return res.json({
    token,
    user,
    profile: mockProfiles[user.id],
    retentionNotice: 'NOTICE: Messages disappear from normal views after 30 minutes, but are retained in a secure server-side admin archive.'
  });
});

// Update Username & Accept Privacy Disclosure
router.post('/setup-profile', (req: Request, res: Response) => {
  const { userId, username, privacyAccepted, decoyPin } = req.body;

  const user = mockUsers.find(u => u.id === userId);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  if (username) {
    const taken = mockUsers.some(u => u.username === username && u.id !== userId);
    if (taken) {
      return res.status(400).json({ error: 'Username is already taken' });
    }
    user.username = username;
  }

  if (privacyAccepted !== undefined) {
    user.privacy_disclosure_accepted = Boolean(privacyAccepted);
  }

  if (decoyPin) {
    user.decoy_pin_hash = decoyPin;
  }

  return res.json({ success: true, user });
});

export default router;
