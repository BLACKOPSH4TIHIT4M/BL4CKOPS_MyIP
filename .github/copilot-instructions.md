# AI Copilot Instructions for BL4CKOPS IP Reconnaissance Tool

## Project Overview

**BL4CKOPS IP Reconnaissance Tool** is a full-stack IP intelligence platform built with **Node.js/Express backend** and **Vue.js 3 + Pinia frontend**. It aggregates data from multiple IP geolocation services to provide comprehensive IP analysis, network diagnostics, and security testing.

**Key Purpose**: Multi-source IP lookup, connectivity testing, DNS leak detection, WebRTC leak testing, speed testing, and advanced network reconnaissance.

---

## Architecture

### Technology Stack
- **Frontend**: Vue 3 + Vite + Pinia (state management) + Vue Router (lazy loading)
- **Backend**: Node.js/Express with rate limiting and referrer validation
- **Styling**: Bootstrap 5 + custom CSS
- **Internationalization**: vue-i18n (EN, FR, TR, ZH)
- **Auth**: Firebase authentication with Google & GitHub providers
- **Database**: MaxMind GeoIP2 (local .mmdb files in `common/maxmind-db/`)
- **PWA**: Vite PWA plugin with workbox caching strategies

### Port Configuration
- **Frontend**: 18966 (or FRONTEND_PORT env var)
- **Backend API**: 11966 (or BACKEND_PORT env var)
- **Vite Dev Server**: 5173

### Deployment
- Docker multi-stage build: `Dockerfile` builds frontend with Vite, then copies dist + backend to production image
- Exposed port: 18966 (frontend serves backend proxied API calls)
- Production run: `npm start` starts both frontend & backend servers

---

## Data Flow & API Patterns

### API Handler Pattern (Backend)

All API handlers in `api/` directory follow this pattern:

```javascript
// Common structure (e.g., api/ipinfo-io.js)
import { refererCheck } from '../common/referer-check.js';
import { isValidIP } from '../common/valid-ip.js';

export default async (req, res) => {
    // 1. Validate referrer (security check via ALLOWED_DOMAINS env var)
    if (!refererCheck(req.headers.referer)) {
        return res.status(403).json({ error: 'Access denied' });
    }

    // 2. Extract & validate IP from query params
    const ipAddress = req.query.ip;
    if (!isValidIP(ipAddress)) {
        return res.status(400).json({ error: 'Invalid IP' });
    }

    // 3. Call external API with env-based tokens
    const tokens = (process.env.IPINFO_API_TOKEN || '').split(',');
    const token = tokens[Math.floor(Math.random() * tokens.length)];

    // 4. Transform response & send to frontend
    const modifiedData = transformData(data);
    res.json(modifiedData);
};
```

**Key Security Pattern**: Every API handler validates `req.headers.referer` against `ALLOWED_DOMAINS`. Rate limiting is configured at Express middleware level.

### Frontend-to-Backend Communication

Use `authenticatedFetch()` utility for API calls:

```javascript
import { authenticatedFetch } from '@/utils/authenticated-fetch';

// Automatically adds Firebase auth token if user is logged in
const data = await authenticatedFetch('/api/ipinfo?ip=1.1.1.1');
```

### Multi-Source IP Data Architecture

Frontend fetches from multiple IP databases in parallel:

```javascript
// store.js defines ipDBs array with multiple sources
ipDBs: [
    { id: 0, text: 'IPCheck.ing', url: '/api/ipchecking?ip={{ip}}&lang={{lang}}', enabled: true },
    { id: 1, text: 'IPInfo', url: '/api/ipinfo?ip={{ip}}', enabled: true },
    // ... more sources
]

// IpInfos.vue component iterates this and fetches all in parallel
// Data transformation unified in utils/transform-ip-data.js
```

---

## Component Structure

### Frontend Directory Layout
- `App.vue`: Main layout (NavBar, sections for each feature)
- `components/`: Major feature sections (IpInfos, Connectivity, SpeedTest, etc.)
- `components/advanced-tools/`: Lazy-loaded route components (DnsResolver, Whois, etc.)
- `components/ip-infos/`: IP display cards (IPCard, ASNInfo)
- `locales/`: i18n translation files + security-checklist subdirectory
- `utils/`: Helper functions (fetch, IP validation, data transformation, IP source fetchers)
- `router/`: Vue Router with hash-based history (lazy loading advanced tools)
- `store.js`: Pinia store managing user auth, achievements, IP databases config

### Key Components & Responsibilities

| Component | Purpose |
|-----------|---------|
| `IpInfos.vue` | Displays IP information from multiple sources in card grid |
| `Connectivity.vue` | Tests website accessibility (Google, GitHub, YouTube, etc.) |
| `SpeedTest.vue` | Speed test using Cloudflare Speedtest API |
| `DnsLeaksTest.vue` | DNS leak detection |
| `WebRtcTest.vue` | WebRTC IP leak detection |
| `AdvancedTools.vue` | Tabbed interface for advanced network tools |
| `QueryIP.vue` | Modal widget for custom IP queries |
| `User.vue` | Firebase authentication & profile |
| `Achievements.vue` | Achievement system tracking |

---

## Environment Variables

### Required for Development & Production

```env
# Ports
BACKEND_PORT=11966
FRONTEND_PORT=18966

# API Keys (stored in backend .env, validated on-demand via configs endpoint)
IPINFO_API_TOKEN=token1,token2          # Comma-separated for load balancing
IPCHECKING_API_KEY=key
IP2LOCATION_API_KEY=key
IPAPI_IS_API_KEY=key
GOOGLE_MAP_API_KEY=key
CLOUDFLARE_API=token

# Firebase Configuration
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
# (See frontend/firebase-init.js for all required Firebase vars)

# Security
ALLOWED_DOMAINS=localhost,example.com
SECURITY_RATE_LIMIT=100                 # Requests per 15min, 0=disabled
SECURITY_DELAY_AFTER=10000              # Delay in ms after rate limit hit
SECURITY_BLACKLIST_LOG_FILE_PATH=logs/blacklist-ip.log

# Network Access
CORS_ALLOWED_ORIGINS=http://localhost:18966
```

**Frontend-only vars** (prefixed `VITE_` for Vite exposure):
- `VITE_CURL_IPV4_DOMAIN`: Domain for IPv4 detection
- `VITE_CURL_IPV6_DOMAIN`: Domain for IPv6 detection
- `VITE_CURL_IPV64_DOMAIN`: Domain for dual-stack detection
- Firebase variables

---

## Development Workflows

### Local Development
```bash
npm install
npm run dev              # Starts Vite dev server (port 5173) + backend (port 11966)
# Frontend: http://localhost:5173 (hot reload)
# Backend API: http://localhost:11966/api/*
```

### Production Build
```bash
npm run build           # Vite builds frontend to dist/
npm start               # Starts both frontend server (18966) and backend (11966)
```

### Docker Deployment
```bash
docker build -t myip .
docker run -p 18966:18966 -e BACKEND_PORT=11966 myip
```

### Key NPM Scripts
- `dev`: Concurrent Vite + nodemon backend (watch mode)
- `build`: Vite build to dist/ only
- `preview`: Vite preview production build
- `start-backend`: Node backend-server.js
- `start-frontend`: Node frontend-server.js (serves dist/)
- `start`: Concurrent start of both servers

---

## Common Patterns & Conventions

### 1. IP Validation
Always use `common/valid-ip.js` utility before processing user IP input:
```javascript
import { isValidIP } from '../common/valid-ip.js';
if (!isValidIP(userIp)) throw new Error('Invalid IP');
```

### 2. Referrer-Based Access Control
All backend API handlers check referrer against allowlist:
```javascript
import { refererCheck } from '../common/referer-check.js';
if (!refererCheck(req.headers.referer)) res.status(403).json({ error: '...' });
```

### 3. Client IP Detection (Multi-proxy support)
Backend correctly extracts client IP considering Cloudflare & X-Forwarded-For:
```javascript
function getClientIp(req) {
    return req.headers['cf-connecting-ip'] 
        || req.headers['x-forwarded-for']?.split(',')[0] 
        || req.headers['cf-connecting-ipv6'] 
        || req.ip;
}
```

### 4. Rate Limiting & Abuse Prevention
- Configured at Express middleware level (express-rate-limit + express-slow-down)
- Blocked IPs logged to SECURITY_BLACKLIST_LOG_FILE_PATH with timestamp & hit count
- Respects Cloudflare headers for accurate IP tracking

### 5. Multi-Language Strings
Use vue-i18n with structure in `frontend/locales/{lang}.json`:
```javascript
const { t } = useI18n();
// In template: {{ t('ipInfos.Title') }}
// Falls back to English if key missing
```

### 6. Data Transformation
IP data from different sources normalized in `utils/transform-ip-data.js` to unified format:
```javascript
const unified = transformDataFromIPapi(rawApiData);
// Returns: { ip, country, region, city, latitude, longitude, asn, org, ... }
```

### 7. Pinia Store Actions
Store in `store.js` manages:
- User auth state (Firebase integration)
- Achievement tracking (gamification)
- IP database configuration
- Loading states for each major section
- Language preference
- Dark mode toggle

---

## Adding New IP Data Sources

### Step 1: Create backend handler
Create `api/new-source.js`:
```javascript
import { refererCheck } from '../common/referer-check.js';
import { isValidIP } from '../common/valid-ip.js';

export default async (req, res) => {
    if (!refererCheck(req.headers.referer)) return res.status(403).json({ error: 'Access denied' });
    
    const ipAddress = req.query.ip;
    if (!isValidIP(ipAddress)) return res.status(400).json({ error: 'Invalid IP' });

    // Fetch from external API
    const data = await fetch(`https://api.source.com/ip/${ipAddress}`).then(r => r.json());
    
    // Transform to unified format
    res.json({ ip: data.ip_address, country: data.country_name, ... });
};
```

### Step 2: Register in backend
Add route in `backend-server.js`:
```javascript
import newSourceHandler from './api/new-source.js';
app.get('/api/newsource', newSourceHandler);
```

### Step 3: Add to frontend store
Update `store.js` ipDBs array:
```javascript
{ id: X, text: 'NewSource', url: '/api/newsource?ip={{ip}}&lang={{lang}}', enabled: true }
```

---

## Testing & Debugging

### Frontend Debugging
- Hot reload enabled in dev mode (Vite)
- Vue DevTools extension recommended
- Console logs for component lifecycle
- Store state visible in Pinia DevTools

### Backend Debugging
- Nodemon watches backend-server.js & api/ directory (auto-restart)
- Request logs include client IP, referrer, timestamp
- Rate limit violations logged to file + console

### Common Issues
- **CORS errors**: Check ALLOWED_DOMAINS env var matches request referer
- **Rate limit hits**: Logged to SECURITY_BLACKLIST_LOG_FILE_PATH, check IP in logs
- **Missing API keys**: Verify env vars are set, configs endpoint shows which are available
- **Firebase auth fails**: Check Firebase config in frontend/firebase-init.js

---

## Key Files Reference

| File | Purpose |
|------|---------|
| `backend-server.js` | Express app setup, route registration, rate limiting |
| `frontend-server.js` | Serves dist/ directory (production frontend) |
| `vite.config.js` | Vite build config, PWA setup, dev server proxy |
| `common/referer-check.js` | Validates referer against ALLOWED_DOMAINS |
| `common/valid-ip.js` | IPv4/IPv6 validation utility |
| `frontend/store.js` | Pinia store (auth, achievements, IP databases) |
| `frontend/App.vue` | Main layout, component composition |
| `frontend/utils/authenticated-fetch.js` | Wraps fetch, adds Firebase auth token |
| `frontend/utils/transform-ip-data.js` | Normalizes IP data from all sources |
| `api/configs.js` | Returns available API keys for frontend |
| `api/ipinfo-io.js` | Example API handler (referrer check, token load balancing) |

---

## Code Style Notes

- **Backend**: CommonJS imports (using `import`/`export`), async/await for API calls
- **Frontend**: Vue 3 Composition API with `<script setup>`, refs for template access
- **Error Handling**: Try-catch for async operations, JSON error responses on backend
- **Comments**: Chinese comments throughout (reflect primary audience), write in English for new code
- **Module Paths**: Frontend uses `@` alias (configured in vite.config.js)

