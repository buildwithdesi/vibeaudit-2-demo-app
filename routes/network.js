// Planted class: command injection.
import { execFile } from 'node:child_process';
import { Router } from 'express';

export const networkRouter = Router();

// The host comes from the query string and is passed as an argument without a shell.
networkRouter.get('/ping', (req, res) => {
  const host = req.query.host;
  if (typeof host !== 'string' || !/^(?!-)[A-Za-z0-9.-]{1,253}$/.test(host)) {
    return res.status(400).send('Invalid host');
  }
  execFile('ping', ['-c', '1', host], (error, stdout) => {
    if (error) return res.status(500).send(error.message);
    res.type('text').send(stdout);
  });
});
