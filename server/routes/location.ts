import { Router, Request, Response } from 'express';
import { mockUsers } from '../services/mockStore';

const router = Router();

export interface LocationUpdate {
  userId: string;
  username: string;
  avatarUrl?: string;
  latitude: number;
  longitude: number;
  updatedAt: string;
  isPaused: boolean;
  isSharing: boolean;
}

export const locationStore: Record<string, LocationUpdate> = {
  u1: {
    userId: 'u1',
    username: 'alex_star',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    latitude: 37.7749,
    longitude: -122.4194,
    updatedAt: new Date().toISOString(),
    isPaused: false,
    isSharing: true
  },
  u2: {
    userId: 'u2',
    username: 'taylor_swiftly',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    latitude: 37.7833,
    longitude: -122.4167,
    updatedAt: new Date(Date.now() - 3 * 60 * 1000).toISOString(),
    isPaused: false,
    isSharing: true
  }
};

// Get shared location map feed for approved friends
router.get('/friends-locations/:userId', (req: Request, res: Response) => {
  const activeLocations = Object.values(locationStore).filter(
    loc => loc.isSharing && !loc.isPaused
  );
  return res.json({ locations: activeLocations });
});

// Update current user location (opt-in)
router.post('/update', (req: Request, res: Response) => {
  const { userId, latitude, longitude, isSharing, isPaused } = req.body;

  if (!userId) {
    return res.status(400).json({ error: 'User ID required' });
  }

  const user = mockUsers.find(u => u.id === userId);

  locationStore[userId] = {
    userId,
    username: user?.username || 'Bestie',
    avatarUrl: user?.avatar_url,
    latitude: latitude || 37.7749,
    longitude: longitude || -122.4194,
    updatedAt: new Date().toISOString(),
    isSharing: isSharing !== undefined ? Boolean(isSharing) : true,
    isPaused: isPaused !== undefined ? Boolean(isPaused) : false
  };

  return res.json({ success: true, location: locationStore[userId] });
});

// Toggle pause or stop sharing controls
router.post('/controls', (req: Request, res: Response) => {
  const { userId, action } = req.body; // action: 'pause' | 'resume' | 'stop'

  if (!locationStore[userId]) {
    const user = mockUsers.find(u => u.id === userId);
    locationStore[userId] = {
      userId,
      username: user?.username || 'Bestie',
      avatarUrl: user?.avatar_url,
      latitude: 37.7749,
      longitude: -122.4194,
      updatedAt: new Date().toISOString(),
      isSharing: false,
      isPaused: false
    };
  }

  if (action === 'pause') {
    locationStore[userId].isPaused = true;
  } else if (action === 'resume') {
    locationStore[userId].isPaused = false;
    locationStore[userId].isSharing = true;
  } else if (action === 'stop') {
    locationStore[userId].isSharing = false;
    locationStore[userId].isPaused = false;
  }

  return res.json({ success: true, location: locationStore[userId] });
});

export default router;
