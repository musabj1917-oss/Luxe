import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import authRouter from './routes/auth';
import friendsRouter from './routes/friends';
import chatsRouter from './routes/chats';
import storiesRouter from './routes/stories';
import locationRouter from './routes/location';
import decoyRouter from './routes/decoy';
import userRouter from './routes/user';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    app: 'Besties Messenger API',
    retentionNotice: 'Messages expire after 30 mins; stories expire after 24 hours. Media archived for admin compliance.'
  });
});

// API Routes
app.use('/api/auth', authRouter);
app.use('/api/friends', friendsRouter);
app.use('/api/chats', chatsRouter);
app.use('/api/stories', storiesRouter);
app.use('/api/location', locationRouter);
app.use('/api/decoy', decoyRouter);
app.use('/api/user', userRouter);

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`⚡️ Besties Messenger Server running on port ${PORT}`);
  });
}

export default app;
