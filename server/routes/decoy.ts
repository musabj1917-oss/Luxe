import { Router, Request, Response } from 'express';
import { mockUsers, mockDecoyConversations, mockDecoyMessages } from '../services/mockStore';

const router = Router();

// Verify Decoy PIN
router.post('/verify-pin', (req: Request, res: Response) => {
  const { userId, pin } = req.body;

  const user = mockUsers.find(u => u.id === userId);
  const correctPin = user?.decoy_pin_hash || '1234';

  if (pin === correctPin) {
    return res.json({
      isDecoy: true,
      message: 'Decoy interface unlocked.',
      conversations: mockDecoyConversations
    });
  }

  return res.status(401).json({ error: 'Incorrect Decoy PIN' });
});

// Get decoy conversation messages
router.get('/messages/:convId', (req: Request, res: Response) => {
  const { convId } = req.params;
  const msgs = mockDecoyMessages.filter(m => m.conversation_id === convId);
  return res.json({ conversationId: convId, isDecoy: true, messages: msgs });
});

export default router;
