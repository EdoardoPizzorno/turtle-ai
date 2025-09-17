Turtle-AI Backend

Node/Express backend con autenticazione Google OAuth (OIDC), sessione server-side e CORS verso il frontend Vite.

Requisiti
- Node 18+
- Credenziali Google OAuth 2.0 (tipo Web)

Setup
1. Copia `.env.example` in `.env` e compila i valori:
```
PORT=3000
SESSION_SECRET=change_me_please
FRONTEND_ORIGIN=http://localhost:5173
GOOGLE_CLIENT_ID=your_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_client_secret
GOOGLE_REDIRECT_URI=http://localhost:3000/api/auth/google/callback
```
2. Installazione pacchetti:
```
cd backend
npm i
```

Avvio
Sviluppo con autoreload:
```
npm run dev
```
Produzione:
```
npm start
```

Endpoints
- GET /api/health - healthcheck
- GET /api/auth/google - avvia login Google (redirect)
- GET /api/auth/google/callback - callback Google (imposta sessione e redirect al frontend)
- GET /api/auth/me - info utente (richiede sessione)
- POST /api/auth/logout - termina sessione

Note
- Il cookie di sessione è HttpOnly e SameSite=Lax. Se frontend e backend sono su domini diversi, abilita `COOKIE_SECURE=1` e configura `SameSite=None` (adeguando le impostazioni).

