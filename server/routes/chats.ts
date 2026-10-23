import { Router, Request, Response } from 'express';
import { mockUsers, mockProfiles, Message } from '../services/mockStore';

const router = Router();

export interface Conversation {
  id: string;
  is_group: boolean;
  title?: string;
  participant_ids: string[];
  updated_at: string;
}

export const mockConversations: Conversation[] = [
  { id: 'c1', is_group: false, participant_ids: ['u1', 'u2'], updated_at: new Date().toISOString() },
  { id: 'c2', is_group: false, participant_ids: ['u1', 'u3'], updated_at: new Date().toISOString() },
  { id: 'c3', is_group: true, title: 'Squad 💛', participant_ids: ['u1', 'u2', 'u3'], updated_at: new Date().toISOString() }
];

export const mockMessages: Message[] = [
  {
    id: 'm1',
    conversation_id: 'c1',
    sender_id: 'u2',
    sender_username: 'taylor_swiftly',
    type: 'text',
    content: 'Hey Alex! Ready for the concert tonight? 🎟️',
    created_at: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    expires_at: new Date(Date.now() + 25 * 60 * 1000).toISOString()
  },
  {
    id: 'm2',
    conversation_id: 'c1',
    sender_id: 'u1',
    sender_username: 'alex_star',
    type: 'text',
    content: 'Yes!! Snapping you my outfit right now 💃',
    created_at: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
    expires_at: new Date(Date.now() + 28 * 60 * 1000).toISOString()
  },
  {
    id: 'm3',
    conversation_id: 'c3',
    sender_id: 'u3',
    sender_username: 'jordan_vibe',
    type: 'emoji',
    content: '🔥🎉🥳',
    created_at: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
    expires_at: new Date(Date.now() + 20 * 60 * 1000).toISOString()
  }
];

export const mediaArchiveStore: Message[] = [];

// Helper to check 30-min expiration
function filterActiveMessages(messages: Message[]): Message[] {
  const now = new Date();
  return messages.filter(m => new Date(m.expires_at) > now);
}

// Get user conversations
router.get('/list/:userId', (req: Request, res: Response) => {
  const { userId } = req.params;
  const userConvs = mockConversations.filter(c => c.participant_ids.includes(userId));

  const conversations = userConvs.map(c => {
    // Find active last message
    const convMsgs = filterActiveMessages(mockMessages.filter(m => m.conversation_id === c.id));
    const lastMsg = convMsgs[convMsgs.length - 1];

    let name = c.title;
    let avatarUrl: string | undefined;

    if (!c.is_group) {
      const otherId = c.participant_ids.find(id => id !== userId) || userId;
      const otherUser = mockUsers.find(u => u.id === otherId);
      name = otherUser?.full_name || otherUser?.username || 'Bestie';
      avatarUrl = otherUser?.avatar_url;
    }

    return {
      id: c.id,
      isGroup: c.is_group,
      title: name,
      avatarUrl,
      lastMessage: lastMsg ? (lastMsg.type === 'text' || lastMsg.type === 'emoji' ? lastMsg.content : `[${lastMsg.type.toUpperCase()}]`) : 'No recent active messages',
      updatedAt: lastMsg ? lastMsg.created_at : c.updated_at,
      hasUnread: false
    };
  });

  return res.json({ conversations });
});

// Get messages for a conversation (server filters out expired > 30 mins)
router.get('/messages/:convId', (req: Request, res: Response) => {
  const { convId } = req.params;

  // Active messages only for standard mobile client
  const activeMessages = filterActiveMessages(mockMessages.filter(m => m.conversation_id === convId));

  return res.json({
    conversationId: convId,
    messages: activeMessages,
    disclaimer: 'Messages automatically disappear from normal views 30 minutes after sending.'
  });
});

// Send new message
router.post('/send', (req: Request, res: Response) => {
  const { conversationId, senderId, type, content, mediaUrl, duration } = req.body;

  if (!conversationId || !senderId || !type) {
    return res.status(400).json({ error: 'Missing required message parameters' });
  }

  const sender = mockUsers.find(u => u.id === senderId);
  const now = new Date();
  const expiresAt = new Date(now.getTime() + 30 * 60 * 1000); // 30 mins server-side expiration

  const newMsg: Message = {
    id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
    conversation_id: conversationId,
    sender_id: senderId,
    sender_username: sender?.username || 'Bestie',
    type,
    content,
    media_url: mediaUrl,
    duration,
    created_at: now.toISOString(),
    expires_at: expiresAt.toISOString()
  };

  mockMessages.push(newMsg);

  // Archive a copy in mediaArchiveStore for protected admin dashboard
  mediaArchiveStore.push({ ...newMsg });

  // Increment Friend Score (+5 per message)
  if (mockProfiles[senderId]) {
    mockProfiles[senderId].score += 5;
  }

  return res.json({ success: true, message: newMsg });
});

// Create 1-on-1 or Group Conversation
router.post('/create', (req: Request, res: Response) => {
  const { participantIds, title, isGroup } = req.body;

  if (!participantIds || participantIds.length < 2) {
    return res.status(400).json({ error: 'At least two participants required' });
  }

  const existing = !isGroup && mockConversations.find(
    c => !c.is_group && c.participant_ids.length === 2 &&
         c.participant_ids.includes(participantIds[0]) && c.participant_ids.includes(participantIds[1])
  );

  if (existing) {
    return res.json({ conversation: existing });
  }

  const newConv: Conversation = {
    id: `c_${Date.now()}`,
    is_group: Boolean(isGroup),
    title: title || 'New Conversation',
    participant_ids: participantIds,
    updated_at: new Date().toISOString()
  };

  mockConversations.push(newConv);
  return res.json({ conversation: newConv });
});

export default router;
