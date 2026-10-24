import { Router, Request, Response } from 'express';
import { mockUsers, mockProfiles } from '../services/mockStore';

const router = Router();

// Get User Profile
router.get('/:userId', (req: Request, res: Response) => {
  const { userId } = req.params;
  const user = mockUsers.find(u => u.id === userId);
  const profile = mockProfiles[userId];

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  return res.json({ user, profile });
});

// Update Profile & Preferences
router.post('/update', (req: Request, res: Response) => {
  const { userId, bio, statusMessage, scoreVisible, locationSharingEnabled } = req.body;

  if (!mockProfiles[userId]) {
    return res.status(404).json({ error: 'Profile not found' });
  }

  if (bio !== undefined) mockProfiles[userId].bio = bio;
  if (statusMessage !== undefined) mockProfiles[userId].status_message = statusMessage;
  if (scoreVisible !== undefined) mockProfiles[userId].score_visible = Boolean(scoreVisible);
  if (locationSharingEnabled !== undefined) mockProfiles[userId].location_sharing_enabled = Boolean(locationSharingEnabled);

  return res.json({ success: true, profile: mockProfiles[userId] });
});

// Delete Account & Associated Data
router.delete('/:userId', (req: Request, res: Response) => {
  const { userId } = req.params;

  const idx = mockUsers.findIndex(u => u.id === userId);
  if (idx !== -1) {
    mockUsers.splice(idx, 1);
  }
  delete mockProfiles[userId];

  return res.json({ success: true, message: 'Account and associated local data successfully deleted.' });
});

export default router;
