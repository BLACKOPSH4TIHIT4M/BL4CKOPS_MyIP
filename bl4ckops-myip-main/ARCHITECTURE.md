# BL4CKOPS IP Reconnaissance Tool - Design & Architecture

> **🇮🇩 Advanced IP Intelligence Platform | Multi-Source IP Lookup & Network Diagnostics**  
> Developed by H4TIHIT4M

---

## 📚 Documentation

| Document | Purpose |
|----------|---------|
| **[DESIGN.md](./DESIGN.md)** | Architecture, features, security layers, development patterns |
| **[API.md](./API.md)** | Complete API reference with examples and rate limiting |
| **[README.md](./README.md)** | Original project README with screenshots & features |

---

## 🔗 Repositories

| Repository | Purpose |
|------------|---------|
| **[BL4CKOPS_MyIP](https://github.com/BLACKOPSH4TIHIT4M/BL4CKOPS_MyIP)** | ⭐ Production code + security implementation |
| **[bl4ckops-ip-reconnaissance-tool](https://github.com/BLACKOPSH4TIHIT4M/bl4ckops-ip-reconnaissance-tool)** | 📐 Design, documentation & architecture |
| **[Orchids Project](https://www.orchids.app/projects/4febf5ec-0b97-4938-8745-ddc60da62855)** | 🎨 UI/UX Design (collaborative) |

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    USER BROWSER (18966)                     │
│  Vue 3 + Vite + Pinia + Firebase Authentication            │
│  - IP Information Dashboard                                 │
│  - Network Diagnostics Interface                           │
│  - Security Testing Tools                                  │
│  - Speed Test UI                                           │
│  - Admin Panel (Password Protected)                        │
└────────────────────────┬────────────────────────────────────┘
                         │ HTTPS
                         ▼
┌─────────────────────────────────────────────────────────────┐
│              EXPRESS.JS BACKEND (11966)                     │
│  Node.js + Rate Limiting + JWT Auth                        │
├─────────────────────────────────────────────────────────────┤
│ API Handlers:                                               │
│ ├─ IP Lookup (10+ sources: IPInfo, IP2Location, etc.)     │
│ ├─ Traceroute (Real system call - admin only)             │
│ ├─ Connection Info (Socket + ARP inspection)              │
│ ├─ DNS Resolver                                           │
│ ├─ WHOIS Lookup                                           │
│ ├─ Speed Test Integration (Cloudflare)                   │
│ └─ Admin Authentication (SHA256 + JWT)                   │
└────────────────────────┬──────────────────────────────────┘
                         │
        ┌────────────────┼────────────────┐
        ▼                ▼                ▼
   ┌─────────┐    ┌─────────┐    ┌─────────────┐
   │MaxMind  │    │ System  │    │ External    │
   │GeoIP2   │    │ Calls   │    │ APIs        │
   │.mmdb    │    │(trace   │    │(IPInfo,     │
   │files    │    │route,ss,│    │IP2Location, │
   │         │    │arp, lsof)   │etc.)        │
   └─────────┘    └─────────┘    └─────────────┘
```

---

## 🔐 Security Architecture

```
┌──────────────────────────────────────────────────────┐
│              3-LAYER SECURITY MODEL                  │
├──────────────────────────────────────────────────────┤
│ Layer 1: AUTHENTICATION                              │
│   ├─ Admin Password (SHA256 Hashed)                 │
│   ├─ JWT Tokens (24-hour expiration)                │
│   └─ Session Storage (cleared on browser close)     │
├──────────────────────────────────────────────────────┤
│ Layer 2: PROTECTION                                 │
│   ├─ Rate Limiting (per-endpoint config)            │
│   ├─ Referrer Validation                            │
│   ├─ CORS Security Headers                          │
│   └─ Abuse Logging                                  │
├──────────────────────────────────────────────────────┤
│ Layer 3: ENCRYPTION                                 │
│   ├─ AES-256-CBC Data Encryption                   │
│   ├─ Code Obfuscation (javascript-obfuscator)      │
│   └─ SSH Signed Commits                             │
└──────────────────────────────────────────────────────┘
```

---

## 📊 Data Flow

### IP Lookup Flow
```
User Input (IP)
       │
       ▼
Frontend Validation
       │
       ▼
Multiple API Calls (Parallel)
   ├─ IPInfo.io
   ├─ IPCheck.ing
   ├─ IP2Location
   ├─ MaxMind Local DB
   └─ Other providers...
       │
       ▼
Data Transformation (Unified Format)
       │
       ▼
Frontend Display (Card Grid)
```

### Admin Feature Flow
```
User Input (Password)
       │
       ▼
POST /api/admin/login
       │
       ├─ Compare with SHA256 hash
       │
       ▼
Generate JWT Token
       │
       ▼
Store in sessionStorage
       │
       ▼
Add to Authorization Header
       │
       ▼
Access /api/traceroute, /api/conn-info
```

---

## 🛠️ Technology Stack

### Frontend
```
Vue 3 (Composition API)
├─ Vite (Build tool)
├─ Pinia (State management)
├─ Vue Router (Navigation)
├─ Bootstrap 5 (UI Framework)
├─ vue-i18n (Internationalization)
└─ Firebase Auth (User authentication)
```

### Backend
```
Node.js + Express.js
├─ Rate Limiting (express-rate-limit)
├─ CORS (express-cors)
├─ JWT (jsonwebtoken)
├─ Crypto (Built-in)
└─ MaxMind GeoIP2 Reader
```

### Security
```
Cryptography
├─ SHA256 (Password hashing)
├─ AES-256-CBC (Data encryption)
├─ Ed25519 SSH Keys (Commits signing)
└─ JWT (Token-based auth)
```

---

## 📈 Performance Targets

| Metric | Target |
|--------|--------|
| Frontend Initial Load | < 3 seconds |
| API Response Time | < 500ms |
| Traceroute Execution | < 10 seconds |
| Speed Test | < 30 seconds |
| Database Lookup (MaxMind) | < 50ms |

---

## 🚀 Deployment Options

### Docker (Recommended)
```bash
docker build -t bl4ckops-myip .
docker run -p 18966:18966 -e BACKEND_PORT=11966 bl4ckops-myip
```

### Manual
```bash
npm install
npm run setup     # Configure admin password
npm start        # Start both frontend & backend
```

### Environment Variables
```env
BACKEND_PORT=11966
FRONTEND_PORT=18966
ADMIN_PASSWORD_HASH=<SHA256_HASH>
ADMIN_SECRET=<RANDOM_STRING>
ENCRYPTION_KEY=<RANDOM_STRING>
ALLOWED_DOMAINS=localhost,example.com
SECURITY_RATE_LIMIT=100
```

---

## 🧪 Testing Checklist

- [ ] Admin password setup works
- [ ] JWT token generation & validation
- [ ] Rate limiting per endpoint
- [ ] Traceroute real system call
- [ ] Connection info inspection
- [ ] Multi-source IP lookup
- [ ] DNS leak detection
- [ ] WebRTC leak detection
- [ ] Speed test integration
- [ ] CORS security headers
- [ ] Referrer validation
- [ ] SSH commit signing

---

## 📝 Development Workflow

```bash
# Clone production repo
git clone https://github.com/BLACKOPSH4TIHIT4M/BL4CKOPS_MyIP.git
cd BL4CKOPS_MyIP

# Install & setup
npm install
npm run setup        # Interactive password setup

# Development
npm run dev          # Vite (5173) + Backend (11966)

# Production build
npm run build        # Vite build to dist/
npm start           # Run both servers

# Security build
npm run build:prod  # With obfuscation
```

---

## 🎯 Feature Matrix

| Feature | Backend | Frontend | Admin Only |
|---------|---------|----------|-----------|
| IP Lookup | ✅ | ✅ | ❌ |
| Traceroute | ✅ | ✅ | ✅ |
| Connection Info | ✅ | ✅ | ✅ |
| DNS Leak Test | ✅ | ✅ | ❌ |
| WebRTC Test | ✅ | ✅ | ❌ |
| Speed Test | ✅ | ✅ | ❌ |
| Admin Panel | ✅ | ✅ | ✅ |
| Achievements | ✅ | ✅ | ❌ |

---

## 🔄 Integration Points

### External APIs
- **IPInfo.io** - IP geolocation & organization data
- **IP2Location** - IP location services
- **IPApi.is** - IP analysis
- **Cloudflare** - Speed test infrastructure
- **MaxMind** - Local GeoIP database

### Authentication
- **Firebase** - User authentication & sessions
- **Google OAuth** - Sign-in provider
- **GitHub OAuth** - Sign-in provider

---

## 📞 Support & Contact

- **Production Issues:** https://github.com/BLACKOPSH4TIHIT4M/BL4CKOPS_MyIP/issues
- **Design Feedback:** https://www.orchids.app/projects/4febf5ec-0b97-4938-8745-ddc60da62855
- **Email:** vbta014@gmail.com

---

## 📄 License

MIT License - See [LICENSE](../BL4CKOPS_MyIP/LICENSE)

---

**Last Updated:** November 29, 2025  
**Maintainer:** H4TIHIT4M  
**Status:** 🟢 Production Ready
