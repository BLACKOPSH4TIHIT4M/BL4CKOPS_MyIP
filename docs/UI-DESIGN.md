# BL4CKOPS IP Reconnaissance Tool - Design Documentation

## Overview
Full-stack IP intelligence platform dengan network diagnostics dan security features.

## Design Resources
- **Orchids Project:** https://www.orchids.app/projects/4febf5ec-0b97-4938-8745-ddc60da62855
- **Production Repository:** https://github.com/BLACKOPSH4TIHIT4M/BL4CKOPS_MyIP

## Architecture

### Frontend Stack
- **Framework:** Vue 3 + Vite
- **State Management:** Pinia
- **Styling:** Bootstrap 5 + Custom CSS
- **PWA:** Vite PWA Plugin with Workbox
- **i18n:** vue-i18n (EN, FR, TR, ZH)
- **Auth:** Firebase (Google & GitHub providers)

### Backend Stack
- **Runtime:** Node.js
- **Framework:** Express.js
- **API Pattern:** RESTful with modular handlers
- **Security:** Rate limiting, referrer validation, JWT auth
- **Database:** MaxMind GeoIP2 (.mmdb files)

### Port Configuration
- Frontend: 18966 (production) / 5173 (dev)
- Backend API: 11966
- Database: Local MaxMind GeoLite2 files

## Feature Set

### IP Analysis
- Multi-source IP lookup (10+ providers)
- Geolocation mapping
- ASN/Organization detection
- ISP information
- IPv4/IPv6 support

### Network Diagnostics
- Traceroute analysis (real system calls)
- Connection state inspection (socket + ARP)
- DNS resolver
- WHOIS lookup
- Access info detection

### Security Testing
- DNS leak detection
- WebRTC leak detection
- Browser fingerprinting
- Invisibility test
- Censorship check

### Speed Testing
- Cloudflare Speedtest integration
- Latency measurement
- CDN latency mapping
- Download/upload speed tests

## Security Implementation

### 3-Layer Security
1. **Admin Authentication:** SHA256 password hashing + JWT tokens
2. **Code Obfuscation:** javascript-obfuscator ready
3. **Data Encryption:** AES-256-CBC utilities

### Endpoints Protected
- `/api/admin/*` - Admin-only endpoints
- `/api/traceroute` - Rate limited (3/min)
- `/api/conn-info` - Rate limited (6/min)

### Environment Variables
- `ADMIN_PASSWORD_HASH` - SHA256 hashed admin password
- `ADMIN_SECRET` - JWT signing secret
- `ENCRYPTION_KEY` - AES encryption key
- API tokens for multiple IP data sources
- Firebase configuration

## Development Workflow

### Local Setup
```bash
npm install
npm run dev  # Starts Vite (5173) + backend (11966)
```

### Production Build
```bash
npm run build    # Vite build to dist/
npm start        # Run both frontend (18966) + backend (11966)
```

### Admin Setup
```bash
npm run setup    # Interactive password setup
```

### Security Build
```bash
npm run build:prod  # Obfuscate code
```

## Key Design Patterns

### Multi-Source Architecture
IP data aggregated from multiple providers in parallel:
- IPInfo.io, IPCheck.ing, IP2Location, IPApi.is, etc.
- Unified data transformation via `utils/transform-ip-data.js`
- Fallback mechanisms for provider failures

### Real System Integration
- Actual traceroute via system `traceroute` command
- Socket inspection via `ss`/`netstat`/`lsof`
- ARP neighbor table via `ip neigh`/`arp`
- Network interfaces via Node.js `os.networkInterfaces()`

### Rate Limiting
- Per-endpoint configuration
- Cloudflare-aware IP detection
- Abuse logging to file

### State Management
- Pinia store manages user auth, achievements, IP databases
- Firebase integration for user sessions
- LocalStorage for preferences (language, dark mode)

## Deployment

### Docker
```bash
docker build -t bl4ckops-myip .
docker run -p 18966:18966 -e BACKEND_PORT=11966 bl4ckops-myip
```

### Environment Setup
- `.env` file in root (ignored by git)
- `.env.example` for reference
- All sensitive keys configured at runtime

## Testing & Verification

### Security Checklist
- ✅ No hardcoded passwords
- ✅ No API keys in git history
- ✅ No private IPs in repository
- ✅ Admin password hashed (SHA256)
- ✅ JWT tokens with expiration
- ✅ Rate limiting enforced
- ✅ CORS properly configured
- ✅ Referrer validation active

### Performance Targets
- Frontend: <3s initial load
- API responses: <500ms
- Traceroute: <10s
- Speed test: <30s

## Future Enhancements
- GraphQL API support
- WebSocket real-time updates
- Machine learning for anomaly detection
- Custom dashboards per user
- Mobile app (React Native)
- API rate limiting tiers
- Advanced analytics & reporting

## License
MIT License - See LICENSE file

## Contact & Support
- GitHub Issues: https://github.com/BLACKOPSH4TIHIT4M/BL4CKOPS_MyIP/issues
- Email: vbta014@gmail.com
