# Vibe Audit 2.0 demo app

An intentionally vulnerable Express app. It is the "before" state for the Vibe Audit 2.0 demo (Meta Global AI Developer Hackathon 2026). Never deploy it.

Scanner and pipeline: https://github.com/buildwithdesi/vibeaudit-2

Five vulnerability classes are planted, one per file:

| Class | File | What is wrong |
|---|---|---|
| Secrets in code | `server/config.js` | A password and a connection string are typed into the source |
| Database injection | `routes/users.js` | Request parameters are pasted into SQL text |
| Missing authorization | `routes/users.js` | Anyone can read or delete any user |
| Command injection | `routes/network.js` | A query parameter lands inside a shell command |
| File path traversal | `routes/files.js` | A query parameter picks which file the server sends |
| Server-side request forgery | `routes/preview.js` | The server fetches any URL the client supplies |

The credentials are fake. The app never connects to anything.

Scan it:

```bash
git clone https://github.com/buildwithdesi/vibeaudit-2 && cd vibeaudit-2 && npm ci --ignore-scripts
node src/cli.ts audit https://github.com/buildwithdesi/vibeaudit-2-demo-app
```

The `main` branch is the before state. Patched branches produced by the pipeline are pushed as `vibeaudit2/patch-*` so the before and after can be compared.
