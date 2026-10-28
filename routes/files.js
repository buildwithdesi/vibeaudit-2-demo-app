// Planted class: file path traversal.
import path from 'node:path';
import { Router } from 'express';

export const filesRouter = Router();
const UPLOADS = path.join(process.cwd(), 'uploads');

filesRouter.get('/download', (req, res) => {
  const requested = Array.isArray(req.query.file) ? req.query.file[0] : req.query.file;
  if (typeof requested !== 'string' || requested.length === 0) {
    return res.status(400).end();
  }
  const resolved = path.resolve(UPLOADS, requested);
  if (resolved !== UPLOADS && !resolved.startsWith(UPLOADS + path.sep)) {
    return res.status(403).end();
  }
  res.sendFile(resolved);
});
