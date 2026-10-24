import { Router, Request, Response } from 'express';
import { mockUsers, Story } from '../services/mockStore';

const router = Router();

export const mockStories: Story[] = [
  {
    id: 'st_1',
    user_id: 'u2',
    username: 'taylor_swiftly',
    avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    type: 'photo',
    media_url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600',
    caption: 'Backstage vibes! 🎸✨',
    created_at: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
    expires_at: new Date(Date.now() + 22 * 3600 * 1000).toISOString()
  },
  {
    id: 'st_2',
    user_id: 'u3',
    username: 'jordan_vibe',
    avatar_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    type: 'photo',
    media_url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600',
    caption: 'Sunset in California 🌇',
    created_at: new Date(Date.now() - 5 * 3600 * 1000).toISOString(),
    expires_at: new Date(Date.now() + 19 * 3600 * 1000).toISOString()
  }
];

// Get stories feed (filters out stories older than 24h)
router.get('/feed', (req: Request, res: Response) => {
  const now = new Date();
  const activeStories = mockStories.filter(s => new Date(s.expires_at) > now);
  return res.json({ stories: activeStories });
});

// Post a new photo/video story
router.post('/post', (req: Request, res: Response) => {
  const { userId, type, mediaUrl, caption } = req.body;

  if (!userId || !mediaUrl || !type) {
    return res.status(400).json({ error: 'User ID, media type and URL required' });
  }

  const user = mockUsers.find(u => u.id === userId);
  const now = new Date();
  const expiresAt = new Date(now.getTime() + 24 * 60 * 60 * 1000); // 24-hour expiration

  const newStory: Story = {
    id: `st_${Date.now()}`,
    user_id: userId,
    username: user?.username || 'Bestie',
    avatar_url: user?.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    type,
    media_url: mediaUrl,
    caption,
    created_at: now.toISOString(),
    expires_at: expiresAt.toISOString()
  };

  mockStories.unshift(newStory);
  return res.json({ success: true, story: newStory });
});

export default router;
