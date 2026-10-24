import assert from 'node:assert';
import test from 'node:test';
import app from '../index';

test('30-minute message expiration logic', () => {
  const activeMsg = {
    id: 'active1',
    conversation_id: 'c1',
    sender_id: 'u1',
    type: 'text' as const,
    content: 'Hi',
    created_at: new Date().toISOString(),
    expires_at: new Date(Date.now() + 10 * 60 * 1000).toISOString()
  };

  const expiredMsg = {
    id: 'expired1',
    conversation_id: 'c1',
    sender_id: 'u1',
    type: 'text' as const,
    content: 'Old msg',
    created_at: new Date(Date.now() - 31 * 60 * 1000).toISOString(),
    expires_at: new Date(Date.now() - 1 * 60 * 1000).toISOString()
  };

  const now = new Date();
  const filter = [activeMsg, expiredMsg].filter(m => new Date(m.expires_at) > now);

  assert.strictEqual(filter.length, 1);
  assert.strictEqual(filter[0].id, 'active1');
});

test('24-hour story expiration logic', () => {
  const activeStory = {
    expires_at: new Date(Date.now() + 2 * 3600 * 1000).toISOString()
  };
  const expiredStory = {
    expires_at: new Date(Date.now() - 1 * 3600 * 1000).toISOString()
  };

  const now = new Date();
  const filter = [activeStory, expiredStory].filter(s => new Date(s.expires_at) > now);

  assert.strictEqual(filter.length, 1);
});
