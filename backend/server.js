import 'dotenv/config';
import express from 'express';
import session from 'express-session';
import cors from 'cors';
import crypto from 'crypto';

// Env
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const SESSION_SECRET = process.env.SESSION_SECRET || 'change_me_please';
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || 'http://localhost:5173';
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GOOGLE_REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI || 'http://localhost:3000/api/auth/google/callback';

if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
  console.warn('[WARN] GOOGLE_CLIENT_ID/SECRET non configurati. OAuth Google non funzionerà.');
}

// App
const app = express();

app.use(
  cors({
    origin: FRONTEND_ORIGIN,
    credentials: true,
  })
);

app.use(express.json());

app.use(
  session({
    name: 'sid',
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: 'lax',
      secure: !!process.env.COOKIE_SECURE,
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 giorni
    },
  })
);

// PKCE helpers
function base64url(buffer) {
  return buffer.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}
function randomString(length = 32) {
  return base64url(crypto.randomBytes(length));
}
function generateCodeVerifier() {
  // 43-128 char URL-safe string
  return base64url(crypto.randomBytes(64));
}
function generateCodeChallenge(verifier) {
  const hash = crypto.createHash('sha256').update(verifier).digest();
  return base64url(hash);
}

app.get('/api/health', (req, res) => {
  res.json({ ok: true, time: new Date().toISOString() });
});

// Se Google dovesse reindirizzare erroneamente alla root con ?code&state,
// inoltra verso la callback corretta mantenendo i parametri
app.get('/', (req, res, next) => {
  if (req.query && req.query.code && req.query.state) {
    const q = new URLSearchParams({
      code: String(req.query.code),
      state: String(req.query.state),
    });
    return res.redirect(`/api/auth/google/callback?${q.toString()}`);
  }
  return res.status(200).send('OK');
});

app.get('/api/auth/google', async (req, res, next) => {
  try {
    const state = randomString(16);
    const nonce = randomString(16);
    const codeVerifier = generateCodeVerifier();
    const codeChallenge = generateCodeChallenge(codeVerifier);

    req.session.oauthState = state;
    req.session.oauthNonce = nonce;
    req.session.codeVerifier = codeVerifier;

    const params = new URLSearchParams({
      client_id: GOOGLE_CLIENT_ID,
      redirect_uri: GOOGLE_REDIRECT_URI,
      response_type: 'code',
      scope: 'openid email profile',
      state,
      nonce,
      code_challenge: codeChallenge,
      code_challenge_method: 'S256',
      access_type: 'offline',
      include_granted_scopes: 'true',
      prompt: 'consent',
    });
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
    res.redirect(authUrl);
  } catch (err) {
    next(err);
  }
});

// Restituisce l'URL di autorizzazione senza fare redirect, così il frontend può gestire il flusso
app.get('/api/auth/google/init', async (req, res, next) => {
  try {
    const state = randomString(16);
    const nonce = randomString(16);
    const codeVerifier = generateCodeVerifier();
    const codeChallenge = generateCodeChallenge(codeVerifier);

    req.session.oauthState = state;
    req.session.oauthNonce = nonce;
    req.session.codeVerifier = codeVerifier;

    const params = new URLSearchParams({
      client_id: GOOGLE_CLIENT_ID,
      redirect_uri: GOOGLE_REDIRECT_URI,
      response_type: 'code',
      scope: 'openid email profile',
      state,
      nonce,
      code_challenge: codeChallenge,
      code_challenge_method: 'S256',
      access_type: 'offline',
      include_granted_scopes: 'true',
      prompt: 'consent',
    });
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
    res.json({ url: authUrl });
  } catch (err) {
    next(err);
  }
});

app.get('/api/auth/google/callback', async (req, res, next) => {
  try {
    const { code, state } = req.query;
    const savedState = req.session.oauthState;
    const codeVerifier = req.session.codeVerifier;

    if (!code || !state || !savedState || state !== savedState) {
      return res.status(400).send('Invalid state or code');
    }

    const body = new URLSearchParams({
      code: String(code),
      client_id: GOOGLE_CLIENT_ID,
      client_secret: GOOGLE_CLIENT_SECRET,
      redirect_uri: GOOGLE_REDIRECT_URI,
      grant_type: 'authorization_code',
      code_verifier: codeVerifier,
    });

    const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
    });
    if (!tokenRes.ok) {
      const errText = await tokenRes.text();
      return res.status(500).send(`Token exchange failed: ${errText}`);
    }
    const token = await tokenRes.json();

    const userRes = await fetch('https://openidconnect.googleapis.com/v1/userinfo', {
      headers: { Authorization: `Bearer ${token.access_token}` },
    });
    if (!userRes.ok) {
      const errText = await userRes.text();
      return res.status(500).send(`Userinfo failed: ${errText}`);
    }
    const userInfo = await userRes.json();

    req.session.user = {
      name: userInfo.name,
      email: userInfo.email,
      picture: userInfo.picture,
      sub: userInfo.sub,
    };
    req.session.isAuthenticated = true;

    // Cleanup
    delete req.session.oauthState;
    delete req.session.oauthNonce;
    delete req.session.codeVerifier;

    res.redirect(FRONTEND_ORIGIN + '/dashboard');
  } catch (err) {
    next(err);
  }
});

app.get('/api/auth/me', (req, res) => {
  if (req.session?.isAuthenticated && req.session?.user) {
    res.json({ user: req.session.user });
    return;
  }
  res.status(401).json({ error: 'not_authenticated' });
});

app.post('/api/auth/logout', (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('sid');
    res.json({ ok: true });
  });
});

// Error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'internal_error' });
});

app.listen(PORT, () => {
  console.log(`Backend listening on http://localhost:${PORT}`);
});


