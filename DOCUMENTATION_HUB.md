# 📚 BL4CKOPS Documentation Hub

## 🔗 Quick Links

### Repositories
- **Production Code:** https://github.com/BLACKOPSH4TIHIT4M/BL4CKOPS_MyIP ⭐
- **Design & Documentation:** https://github.com/BLACKOPSH4TIHIT4M/bl4ckops-ip-reconnaissance-tool 📐
- **UI/UX Design:** https://www.orchids.app/projects/4febf5ec-0b97-4938-8745-ddc60da62855 🎨

---

## 📖 Documentation Structure

### Design Repository Docs

#### 1. **[ARCHITECTURE.md](https://github.com/BLACKOPSH4TIHIT4M/bl4ckops-ip-reconnaissance-tool/blob/main/ARCHITECTURE.md)** 🏗️
- System architecture diagrams (frontend, backend, database)
- Security architecture (3-layer model)
- Data flow diagrams
- Technology stack details
- Deployment options (Docker, manual)
- Performance targets
- Feature matrix

#### 2. **[DESIGN.md](https://github.com/BLACKOPSH4TIHIT4M/bl4ckops-ip-reconnaissance-tool/blob/main/DESIGN.md)** 🎯
- Project overview
- Feature set (IP analysis, network diagnostics, security testing)
- Frontend stack (Vue 3, Vite, Pinia, Firebase)
- Backend stack (Node.js, Express, MaxMind)
- Security implementation (3-layer model)
- Development workflow
- Design patterns

#### 3. **[API.md](https://github.com/BLACKOPSH4TIHIT4M/bl4ckops-ip-reconnaissance-tool/blob/main/API.md)** 📡
- Authentication endpoints (Admin login)
- IP information endpoints (10+ sources)
- Network diagnostics endpoints (Traceroute, Connection info)
- Security testing endpoints (DNS, WebRTC)
- Speed test endpoints
- Error responses & rate limiting
- CORS configuration
- Security headers

#### 4. **[README.md](https://github.com/BLACKOPSH4TIHIT4M/bl4ckops-ip-reconnaissance-tool/blob/main/README.md)** 📄
- Project overview
- Features list
- Screenshots & UI mockups
- Quick start guide
- Project timeline

---

## 🚀 Production Setup

### Quick Start (Production)
```bash
git clone https://github.com/BLACKOPSH4TIHIT4M/BL4CKOPS_MyIP.git
cd BL4CKOPS_MyIP
npm install
npm run setup        # Setup admin password (interactive)
npm start           # Run production servers
# Access: http://localhost:18966
```

### Development Setup
```bash
npm run dev          # Starts Vite dev server (5173) + backend (11966)
```

### Docker Deployment
```bash
docker build -t bl4ckops-myip .
docker run -p 18966:18966 -e BACKEND_PORT=11966 bl4ckops-myip
```

---

## 🔐 Security Features

### 3-Layer Security Model
1. **Authentication:** SHA256 password hashing + JWT tokens
2. **Protection:** Rate limiting, referrer validation, CORS
3. **Encryption:** AES-256-CBC, code obfuscation, SSH signed commits

### Protected Endpoints
- `/api/admin/*` - Admin-only
- `/api/traceroute` - Rate limited (3/min)
- `/api/conn-info` - Rate limited (6/min)

---

## 🎯 Feature Overview

### IP Analysis
✅ Multi-source IP lookup (10+ providers)  
✅ Geolocation mapping  
✅ ASN/Organization detection  
✅ ISP information  
✅ IPv4/IPv6 support  

### Network Diagnostics
✅ Real traceroute (system calls)  
✅ Connection state inspection  
✅ DNS resolver  
✅ WHOIS lookup  
✅ Access info detection  

### Security Testing
✅ DNS leak detection  
✅ WebRTC leak detection  
✅ Browser fingerprinting  
✅ Invisibility test  
✅ Censorship check  

### Speed Testing
✅ Cloudflare Speedtest  
✅ Latency measurement  
✅ CDN latency mapping  
✅ Download/upload speeds  

---

## 📊 Technology Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Vue 3, Vite, Pinia, Bootstrap 5, Firebase |
| **Backend** | Node.js, Express, Rate Limiting, JWT |
| **Security** | SHA256, AES-256, SSH Keys, Obfuscation |
| **Database** | MaxMind GeoIP2 (.mmdb files) |
| **External APIs** | IPInfo, IP2Location, Cloudflare, Firebase |

---

## 🔄 System Flow

```
User Browser (18966)
    ↓
Vue 3 Frontend
    ↓ HTTPS
Express Backend (11966)
    ├─ Local DB (MaxMind GeoIP2)
    ├─ System Calls (traceroute, arp, ss)
    └─ External APIs (IPInfo, IP2Location, etc.)
```

---

## 📈 Performance

| Operation | Target |
|-----------|--------|
| Initial Load | < 3s |
| API Response | < 500ms |
| Traceroute | < 10s |
| Speed Test | < 30s |
| DB Lookup | < 50ms |

---

## 🛠️ Development

### Key Files Structure
```
BL4CKOPS_MyIP/
├── backend-server.js          # Express setup
├── frontend-server.js         # Frontend server
├── api/                       # API handlers
│   ├── traceroute.js         # Real traceroute
│   ├── conn-info.js          # Connection info
│   ├── access-info.js        # Access detection
│   ├── admin-login.js        # Auth endpoint
│   └── ...                   # Other providers
├── common/
│   ├── admin-auth.js         # Auth middleware
│   ├── encryption.js         # AES encryption
│   ├── referer-check.js      # Security check
│   └── valid-ip.js           # IP validation
├── frontend/
│   ├── App.vue               # Main layout
│   ├── components/           # Vue components
│   ├── store.js              # Pinia store
│   └── router/               # Vue Router
└── public/                   # Static assets
```

### NPM Scripts
```bash
npm run dev              # Development mode
npm run build           # Build for production
npm run start           # Start production servers
npm run setup           # Setup admin password
npm run build:prod      # Build with obfuscation
```

---

## 🔗 Integration Points

### External Services
- **IPInfo.io** - IP geolocation
- **IP2Location** - Location services
- **Cloudflare** - Speed test, DDoS protection
- **Firebase** - User authentication
- **MaxMind** - Local GeoIP database

---

## 📞 Support

| Channel | Link |
|---------|------|
| **Issues** | https://github.com/BLACKOPSH4TIHIT4M/BL4CKOPS_MyIP/issues |
| **Design Feedback** | https://www.orchids.app/projects/4febf5ec-0b97-4938-8745-ddc60da62855 |
| **Email** | vbta014@gmail.com |

---

## 📜 License

MIT License - Open source and free to use

---

**Last Updated:** November 29, 2025  
**Status:** 🟢 Production Ready  
**Maintainer:** H4TIHIT4M 🇮🇩
