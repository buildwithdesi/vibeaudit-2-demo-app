// Planted classes: database injection and missing authorization.
import { Router } from 'express';
import { db } from '../server/db.js';

export const usersRouter = Router();

// Anyone can call this, and the id is pasted straight into the SQL text.
usersRouter.get('/:id', async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  if (String(req.params.id) !== String(req.user.id)) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  const rows = await db.query('SELECT * FROM users WHERE id = ?', [req.params.id]);
  res.json(rows[0] ?? null);
});

usersRouter.delete('/:id', async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  if (String(req.params.id) !== String(req.user.id) && req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden' });
  }
  await db.query('DELETE FROM users WHERE id = ?', [req.params.id]);
  res.status(204).end();
});
