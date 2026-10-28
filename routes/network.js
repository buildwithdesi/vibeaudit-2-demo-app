// Planted class: command injection.
import { execFile } from 'node:child_process';
import { Router } from 'express';

export const networkRouter = Router();

networkRouter.get('/ping', (req, res) => {
  const host = String(req.query.host ?? '');
  if (!/^[A-Za-z0-9]([A-Za-z0-9.-]{0,251}[A-Za-z0-9])?$/.test(host)) return res.status(400).send('Invalid host');
  execFile('ping', ['-c', '1', host], (error, stdout) => {
    if (error) return res.status(500).send(error.message);
    res.type('text').send(stdout);
  });
});
