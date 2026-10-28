// Planted class: file path traversal.
import path from 'node:path';
import { Router } from 'express';

export const filesRouter = Router();
const UPLOADS = path.join(process.cwd(), 'uploads');

filesRouter.get('/download', (req, res) => {
  const requested = String(req.query.file ?? '');
  const resolved = path.resolve(UPLOADS, requested);
  if (resolved !== UPLOADS && !resolved.startsWith(UPLOADS + path.sep)) {
    return res.status(403).send('Forbidden');
  }
  res.sendFile(resolved);
});
