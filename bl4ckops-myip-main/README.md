![BL4CKOPS Banner](./public/bl4ckops-banner.png)

# 🇮🇩 BL4CKOPS IP Reconnaissance Tool

> **Advanced IP Intelligence Platform | Multi-Source IP Lookup & Network Diagnostics**  
> Developed by **H4TIHIT4M** 🇮🇩

---

## 🔗 Project Links

| Link | Purpose |
|------|---------|
| **[Production Code](https://github.com/BLACKOPSH4TIHIT4M/BL4CKOPS_MyIP)** ⭐ | Full-stack application with security |
| **[Design Repository](https://github.com/BLACKOPSH4TIHIT4M/bl4ckops-ip-reconnaissance-tool)** 📐 | Architecture, documentation, designs |
| **[UI/UX Design](https://www.orchids.app/projects/4febf5ec-0b97-4938-8745-ddc60da62855)** 🎨 | Figma mockups & design system |

---

## 📚 Documentation

### System Design
- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - System architecture, security model, diagrams
- **[DESIGN.md](./DESIGN.md)** - Features, implementation details, patterns
- **[API.md](./API.md)** - Complete API reference with examples

### Original Content
- **[README.md](./README.md)** - Project overview & feature list

---

## ⭐ Key Features

✅ **Multi-Source IP Lookup** - 10+ providers (IPInfo, IP2Location, etc.)  
✅ **Network Diagnostics** - Traceroute, connection info, DNS resolver  
✅ **Security Testing** - DNS/WebRTC leak detection, browser fingerprinting  
✅ **Speed Testing** - Download, upload, latency measurements  
✅ **Admin Dashboard** - Password-protected advanced tools  

---

## 🏗️ Architecture Highlights

```
Frontend (Vue 3 + Vite)        Backend (Express.js)        Database
  18966              HTTPS       11966                    
    ↓                  ↓          ↓                          ↓
  UI Layer ────────→ API Layer ──────→ MaxMind GeoIP2
                                ├─ Real Traceroute
                                ├─ ARP Inspection
                                └─ 10+ IP Providers
```

---

## 🔐 Security Implementation

**3-Layer Model:**
1. **Authentication** - SHA256 password hashing + JWT tokens
2. **Protection** - Rate limiting, referrer validation
3. **Encryption** - AES-256-CBC, code obfuscation

**Protected Endpoints:**
- `/api/traceroute` - Admin only, 3 req/min
- `/api/conn-info` - Admin only, 6 req/min

---

## 🚀 Quick Start

### Production (5 minutes)
```bash
git clone https://github.com/BLACKOPSH4TIHIT4M/BL4CKOPS_MyIP.git
cd BL4CKOPS_MyIP
npm install
npm run setup        # Setup admin password
npm start           # Run on http://localhost:18966
```

### Docker
```bash
docker build -t bl4ckops .
docker run -p 18966:18966 bl4ckops
```

---

## 📊 Stack Overview

| Component | Technology |
|-----------|-----------|
| **Frontend** | Vue 3, Vite, Pinia, Bootstrap 5, Firebase |
| **Backend** | Node.js, Express, Rate Limiting |
| **Security** | SHA256, AES-256, JWT, SSH Keys |
| **Database** | MaxMind GeoIP2 (.mmdb) |
| **External** | IPInfo, IP2Location, Cloudflare |

---

## 📈 Performance

- Initial Load: < 3s
- API Response: < 500ms
- Traceroute: < 10s
- Speed Test: < 30s

---

## 🎯 Feature Matrix

| Feature | Status | Admin |
|---------|--------|-------|
| IP Lookup | ✅ | ❌ |
| Traceroute | ✅ | ✅ |
| Connection Info | ✅ | ✅ |
| DNS Leak Test | ✅ | ❌ |
| Speed Test | ✅ | ❌ |
| Security Checklist | ✅ | ❌ |

---

## 📞 Support

- **Issues:** https://github.com/BLACKOPSH4TIHIT4M/BL4CKOPS_MyIP/issues
- **Design Feedback:** https://www.orchids.app/projects/4febf5ec-0b97-4938-8745-ddc60da62855
- **Email:** vbta014@gmail.com

---

## 📄 License

MIT License - Open source and free to use

---

**Status:** 🟢 Production Ready  
**Last Updated:** November 29, 2025  
**Maintainer:** H4TIHIT4M 🇮🇩
