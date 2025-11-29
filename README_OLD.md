# 🔍 BL4CKOPS IP Reconnaissance Tool

**🇮🇩 Bagian Integral dari [BL4CKOPS_OSINT](https://github.com/BLACKOPSH4TIHIT4M/BL4CKOPS_REVEALED)**

Sebuah platform OSINT komprehensif dan profesional untuk pengumpulan, analisis, dan reconnaissance informasi IP. Tools ini dirancang untuk membantu profesional keamanan siber, penetration tester, researcher, dan praktisi OSINT dalam mengumpulkan intelligence IP dengan fitur-fitur canggih dan antarmuka yang intuitif.

**Dibuat oleh H4TIHIT4M | By H4TIHIT4M** ❤️

---

## 📌 Daftar Isi

- [Deskripsi & Kemampuan](#deskripsi--kemampuan)
- [Fungsi-Fungsi Utama](#fungsi-fungsi-utama)
- [Fitur Teknis](#fitur-teknis)
- [Instalasi](#instalasi)
- [Konfigurasi](#konfigurasi)
- [Penggunaan](#penggunaan)
- [API Endpoints](#api-endpoints)
- [Troubleshooting](#troubleshooting)

---

## 🎯 Deskripsi & Kemampuan

BL4CKOPS IP Reconnaissance Tool adalah aplikasi web full-stack berbasis **Node.js backend** dan **Vue.js 3 frontend** yang menyediakan rangkaian lengkap tools untuk:

✅ **Identifikasi & Profiling IP**  
✅ **Pengumpulan Intelligence Jaringan**  
✅ **Analisis Keamanan Konektivitas**  
✅ **Testing VPN/Proxy Configuration**  
✅ **Forensik Jaringan & Troubleshooting**  
✅ **Monitoring Infrastruktur & ASN**  
✅ **Privacy & Security Assessment**  

---

## 🚀 Fungsi-Fungsi Utama

### 1. 🌐 **IP Information & Geolocation** (Identifikasi IP Lengkap)

**Kemampuan:**
- Deteksi otomatis **IPv4 dan IPv6** dari multiple sources
- Query informasi detail IP apapun (milik orang lain)
- Resolusi **geografis & lokasi presisi**: Negara, Provinsi, Kota, Latitude/Longitude
- Identifikasi **ASN (Autonomous System Number)** & ISP
- Deteksi **IP Type**: Residential, Business, Hosting, Wireless, dll
- Quality Score: Evaluasi kualitas & reputasi IP
- Proxy/VPN Detection: Identifikasi jika IP adalah proxy atau VPN
- Native IP Detection: Verifikasi apakah IP native atau transit
- Support multiple data sources: IPInfo, IPCheck.ing, IPAPI.is, IP2Location, MaxMind

**Use Case:**
```
- Mapping infrastruktur target (penetration testing authorized)
- Verifikasi lokasi fisik server
- Identifikasi ISP & ASN untuk intelligence gathering
- Profiling untuk security assessment
```

---

### 2. 🔍 **IP Search & Lookup** (Pencarian IP Cepat)

**Kemampuan:**
- Search IP address dengan hasil instant
- Batch lookup multiple IPs (processing parallel)
- Export hasil dalam format JSON/CSV
- Caching hasil untuk performance optimal
- Reverse lookup capability
- Historical tracking (jika tersedia dari data source)

**Use Case:**
```
- Rapid IP investigation
- Bulk IP analysis untuk incident response
- Tracking IP changes over time
```

---

### 3. 📡 **Network Connectivity Check** (Test Aksesibilitas Website)

**Kemampuan:**
- Test koneksi ke website populer (Google, GitHub, YouTube, ChatGPT, dll)
- Response time measurement
- HTTP status code detection
- Redirect chain tracking
- SSL/TLS certificate validation
- Multi-region connectivity test
- Availability monitoring real-time
- Global accessibility indicator

**Use Case:**
```
- Diagnosa internet connectivity issues
- Verify website accessibility status
- Detect regional blocking atau censorship
- Monitor service uptime
```

---

### 4. 🔴 **WebRTC Detection** (Identifikasi IP WebRTC Leak)

**Kemampuan:**
- Deteksi IP yang digunakan WebRTC connections
- Mengidentifikasi IP leaks dari VPN/proxy
- Multiple candidate evaluation
- NAT type detection (Full Cone, Port Restricted, Symmetric)
- IPv4 & IPv6 leak identification
- Real-time connection analysis

**Use Case:**
```
- Verifikasi konfigurasi VPN/proxy
- Identify privacy leaks
- Network troubleshooting
- Privacy assessment
```

---

### 5. 🛑 **DNS Leak Test** (Testing DNS Endpoint)

**Kemampuan:**
- Detect DNS resolver endpoints
- Identify DNS leaks ketika menggunakan VPN/proxy
- Compare expected vs actual DNS endpoints
- ISP DNS detection
- Third-party DNS identification
- Cloudflare, Google DNS, OpenDNS detection
- DNS poisoning detection

**Use Case:**
```
- Validate VPN/proxy DNS routing
- Detect DNS hijacking
- Privacy verification
- ISP monitoring detection
```

---

### 6. ⚡ **Speed Test** (Tes Kecepatan Jaringan)

**Kemampuan:**
- Multi-region speed testing via Cloudflare edge network
- Download speed measurement (custom packet sizes)
- Upload speed measurement
- Latency & jitter calculation
- Quality scoring (Video Streaming, Gaming, Video Chatting)
- Connection stability analysis
- Real-time progress indication
- Bandwidth quality assessment

**Use Case:**
```
- Network performance profiling
- ISP service quality validation
- VPN performance comparison
- Connection stability assessment
```

---

### 7. 🌍 **Global Latency Test** (Ping Global Test)

**Kemampuan:**
- Ping ke server di 50+ region dunia
- Multi-continent latency measurement
- Packet loss calculation
- Response time analysis per region
- Geographic latency mapping
- Network stability assessment
- Regional performance comparison

**Metrics:**
- Min/Max/Average latency
- Packet loss percentage
- Total packets sent/received
- Connection quality indication

**Use Case:**
```
- Network routing analysis
- ISP performance profiling
- VPN routing optimization
- Global connectivity assessment
```

---

### 8. 📊 **MTR Test** (Traceroute Advanced)

**Kemampuan:**
- Multi-region MTR (My Traceroute) testing
- Hop-by-hop route analysis
- Packet loss per hop detection
- Latency per node measurement
- ISP backbone analysis
- Network congestion point identification
- Routing path visualization
- BGP route tracing

**Use Case:**
```
- Network path analysis
- Congestion point identification
- ISP routing optimization issues
- Traceback untuk incident response
```

---

### 9. 🚦 **Proxy Rule Testing** (Validasi Konfigurasi Proxy)

**Kemampuan:**
- Test domain-based proxy rules
- Verify correct proxy routing
- Multiple domain endpoint testing
- Rule effectiveness validation
- Traffic routing confirmation
- Leak detection dalam proxy configuration

**Use Case:**
```
- Proxy configuration verification
- Rule consistency testing
- Traffic routing validation
- Proxy effectiveness assessment
```

---

### 10. 🌐 **DNS Resolver** (Resolusi DNS Real-time)

**Kemampuan:**
- Multi-source DNS resolution
- Query dari 20+ DNS providers global
- A, AAAA, MX, NS, TXT, SOA records support
- DNS propagation checking
- DNS cache status
- Comparison result dari berbagai resolver
- DNS contamination detection
- DNSSEC validation

**Supported Resolvers:**
- Google DNS, Cloudflare, OpenDNS, Quad9
- ISP DNS, Public DNS services
- International DNS providers
- Custom DNS endpoints

**Use Case:**
```
- DNS troubleshooting
- DNS propagation verification
- DNS contamination detection
- DNS hijacking identification
```

---

### 11. 🚧 **Censorship Check** (Deteksi Blokir Website)

**Kemampuan:**
- Test website accessibility di 4 region censored (China, Saudi Arabia, Russia, Turkey)
- Control group testing (free internet regions)
- Blocking status determination
- Regional blocking pattern analysis
- ISP-level blocking detection
- Government censorship identification
- GFW (Great Firewall) detection

**Tested Regions:**
- Mainland China (GFW Detection)
- Saudi Arabia
- Russia
- Turkey
- Control regions (EU, US, Japan)

**Use Case:**
```
- Content availability assessment
- Censorship landscape mapping
- Website accessibility planning
- Regional compliance checking
```

---

### 12. 📋 **Whois Search** (Pencarian Registrasi Domain/IP)

**Kemampuan:**
- Domain registrar information
- IP registration data retrieval
- WHOIS record parsing
- Registrant contact information (public data)
- Registration date & expiry tracking
- Nameserver resolution
- ASN WHOIS information
- Historical WHOIS data (jika tersedia)

**Information Retrieved:**
- Domain owner/registrant
- Registrar details
- Registration dates
- Technical/Admin contacts
- Nameservers
- IP allocation details

**Use Case:**
```
- Domain ownership verification
- IP allocation tracking
- Contact information gathering (authorized)
- Infrastructure mapping
- Domain expiry monitoring
```

---

### 13. 📀 **MAC Address Lookup** (Query Informasi MAC)

**Kemampuan:**
- MAC address to manufacturer mapping
- Vendor identification
- MAC prefix lookup
- Address type classification (Unicast/Multicast)
- Scope detection (Global/Local)
- Registration information
- Manufacturer contact details

**Classification:**
- Residential vs Business interfaces
- Wireless vs Wired devices
- Random vs assigned addresses
- Private vs public ranges

**Use Case:**
```
- Device manufacturer identification
- Network device inventory
- MAC address validation
- Hardware fingerprinting
```

---

### 14. 🖥️ **Browser Fingerprinting** (Analisis Browser Unik)

**Kemampuan:**
- Multiple fingerprinting methods
- Browser & OS detection
- Hardware capability profiling
- WebGL fingerprint calculation
- Canvas fingerprint generation
- Timezone & locale detection
- Plugin & extension detection
- Screen & display information
- Font enumeration
- Audio context fingerprinting

**Fingerprint Components:**
- User Agent analysis
- Browser version & engine
- OS version & architecture
- Display resolution & color depth
- Installed fonts
- WebGL capabilities
- Hardware acceleration
- LocalStorage/SessionStorage
- Permission settings

**Use Case:**
```
- Browser uniqueness assessment
- Tracking vulnerability analysis
- Privacy risk evaluation
- Device fingerprinting research
```

---

### 15. ✅ **Security Checklist** (Panduan Keamanan Digital)

**Kemampuan:**
- Comprehensive 258-item security checklist
- Categorized by security domain
- Priority-based sorting
- Progress tracking
- Item-level descriptions
- Best practices guidance
- Implementation tips
- Resource linking

**Categories:**
- Password Security (30+ items)
- Browsing Security (25+ items)
- Email & Communication (20+ items)
- Device Security (40+ items)
- Mobile Security (35+ items)
- Network Security (25+ items)
- Data Protection (30+ items)
- Privacy Settings (25+ items)
- Incident Response (15+ items)

**Use Case:**
```
- Personal security audit
- Organization security baseline
- Employee training material
- Compliance checklist
- Security awareness
```

---

## ✨ Fitur Teknis

### 🌐 Antarmuka & User Experience

| Fitur | Deskripsi |
|-------|-----------|
| **Dark/Light Mode** | Tema otomatis sesuai sistem, opsi manual |
| **Minimalist Mode** | Mode mobile-optimized, tampilan ringkas |
| **Responsive Design** | Support desktop, tablet, smartphone |
| **PWA (Progressive Web App)** | Installable sebagai app, offline capability |
| **Keyboard Shortcuts** | `R` refresh, `D` dark mode, `?` bantuan, dll |
| **Multi-language** | ID, EN, 中文, Français, Türkçe |
| **Real-time Updates** | Live data refresh, auto-update capability |
| **Export Options** | JSON, CSV, PDF (jika tersedia) |

### 🔒 Keamanan & Privacy

| Fitur | Deskripsi |
|-------|-----------|
| **Rate Limiting** | 100 requests per 60 menit per IP (configurable) |
| **DDoS Protection** | IP blacklisting, connection throttling |
| **Domain Whitelist** | ALLOWED_DOMAINS environment variable |
| **HTTPS Support** | SSL/TLS encryption ready |
| **CORS Policy** | Controlled cross-origin access |
| **Input Validation** | Sanitization & validation semua inputs |
| **API Key Protection** | Environment variable based secrets |

### 🚀 Performance & Optimization

| Fitur | Deskripsi |
|-------|-----------|
| **Concurrent Processing** | Parallel API requests, async operations |
| **Caching Strategy** | Redis-compatible cache layer |
| **Compression** | Gzip compression untuk responses |
| **CDN Ready** | Static asset delivery optimization |
| **Lazy Loading** | Progressive component loading |
| **Bundle Optimization** | Vite minification & tree-shaking |
| **Database Indexing** | MaxMind GeoIP index optimization |

### 📊 Monitoring & Logging

| Fitur | Deskripsi |
|-------|-----------|
| **Request Logging** | API call tracking & analytics |
| **Error Reporting** | Structured error logging |
| **Performance Metrics** | Response time, throughput tracking |
| **User Analytics** | Event tracking (optional GA integration) |
| **Blacklist Logging** | Rate-limited IP logging |
| **Audit Trail** | Security event logging |

---

## 📋 Persyaratan Sistem

- **Node.js**: 18.x atau lebih baru
- **npm**: 9.x atau lebih baru (atau yarn/pnpm)
- **Browser**: Modern browser dengan ES6+, WebRTC support
- **Ports**: 18966 (frontend), 11966 (backend)
- **Memory**: Minimal 512MB RAM
- **Storage**: 500MB untuk dependencies + cache
- **CPU**: Minimal 1 core (2+ recommended)

---

## 🛠️ Instalasi & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/BLACKOPSH4TIHIT4M/BL4CKOPS_REVEALED.git
cd BL4CKOPS_REVEALED/BL4CKOPS-MyIP
```

### 2️⃣ Install Dependencies

```bash
npm install
```

Verifikasi:
```bash
npm list | grep -E "vue|express|vite"
```

### 3️⃣ Konfigurasi Environment

```bash
cp .env.example .env
```

Edit `.env` untuk production:

```env
# 🔧 Server Configuration
BACKEND_PORT=11966
FRONTEND_PORT=18966
ALLOWED_DOMAINS="localhost,127.0.0.1,yourdomain.com"

# 🔑 API Keys (optional)
GOOGLE_MAP_API_KEY="your_key_here"
IPINFO_API_TOKEN="your_token_here"
IPCHECKING_API_KEY="your_key_here"

# 🔒 Security
SECURITY_RATE_LIMIT=100
SECURITY_DELAY_AFTER=20
SECURITY_BLACKLIST_LOG_FILE_PATH="logs/blacklist-ip.log"

# 📊 Analytics (optional)
VITE_GOOGLE_ANALYTICS_ID="UA-XXXXXXXXX-X"
```

### 4️⃣ Jalankan Aplikasi

**Development Mode** (dengan hot-reload):
```bash
npm run dev
```

**Production Mode:**
```bash
npm run build
npm start
```

**Backend & Frontend Terpisah:**
```bash
# Terminal 1 - Backend
npm run start-backend

# Terminal 2 - Frontend  
npm run start-frontend
```

Akses: **http://localhost:18966**

---

## 🐳 Docker Deployment

### Build Image
```bash
docker build -t bl4ckops-ip-tool:latest .
```

### Run Container
```bash
docker run -d \
  -p 18966:18966 \
  -p 11966:11966 \
  -e BACKEND_PORT=11966 \
  -e FRONTEND_PORT=18966 \
  -e ALLOWED_DOMAINS="0.0.0.0" \
  --name bl4ckops-ip \
  --restart always \
  bl4ckops-ip-tool:latest
```

### Docker Compose
```bash
docker-compose up -d
```

---

## 🌐 Network Access

### Local Access
```
http://localhost:18966
```

### Network Access (Same LAN)
```bash
# Get local IP
hostname -I  # Linux
ipconfig    # Windows

# Access from other device
http://[LOCAL_IP]:18966
```

### Production Deployment
Gunakan reverse proxy (nginx) dengan SSL:

```nginx
server {
    listen 443 ssl;
    server_name yourdomain.com;
    
    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;
    
    location / {
        proxy_pass http://localhost:18966;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

---

## 🎮 Penggunaan Platform

### Dashboard Utama
1. **IP Information** - Informasi IP Anda & detail geolokasi
2. **Connectivity** - Test akses website global
3. **Advanced Tools** - Tools spesifik (WebRTC, DNS, Speed, dll)
4. **Preferences** - Konfigurasi user
5. **Security** - Security checklist & guidelines

### Keyboard Shortcuts
- `R` - Refresh semua data
- `D` - Toggle dark mode
- `M` - Toggle map
- `?` - Show bantuan
- `↑/↓` - Navigate cards

---

## 🔐 Security Notes

⚠️ **PENTING - Authorization Required**

Tools ini adalah **AUTHORIZED ONLY** untuk:
- ✅ Testing infrastruktur milik sendiri
- ✅ Authorized penetration testing (dengan permission tertulis)
- ✅ Security research & education (ethical hacking)
- ✅ Network troubleshooting & diagnostic
- ✅ Privacy assessment & validation

❌ **DILARANG untuk:**
- Hacking/unauthorized access
- Targeting/profiling tanpa izin
- Sistem bypass atau penetrasi tidak authorized
- Harassment atau threatening

**Disclaimer**: Pengguna bertanggung jawab atas penggunaan sesuai hukum setempat.

---

## 📦 Technology Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Vue 3, Vite, Bootstrap 5, Chart.js |
| **Backend** | Node.js, Express.js, dotenv |
| **Databases** | MaxMind GeoIP, WHOIS, Various APIs |
| **DevOps** | Docker, Docker Compose, nginx |
| **Tools** | concurrently, nodemon, PWA plugin |

---

## 🧪 Testing & Build

```bash
# Development build
npm run dev

# Production build
npm run build

# Preview build
npm run preview

# Test backend
npm run start-backend

# Test frontend
npm run start-frontend
```

---

## 📞 Support & Contact

- 🐛 **Report Issues**: [GitHub Issues](https://github.com/BLACKOPSH4TIHIT4M/BL4CKOPS_REVEALED/issues)
- 📧 **Email**: (via GitHub)
- 🔗 **GitHub**: https://github.com/BLACKOPSH4TIHIT4M
- 📱 **Repository**: https://github.com/BLACKOPSH4TIHIT4M/BL4CKOPS_REVEALED

---

## ⚖️ License & Attribution

**BL4CKOPS IP Reconnaissance Tool** adalah bagian dari **[BL4CKOPS_OSINT](https://github.com/BLACKOPSH4TIHIT4M/BL4CKOPS_REVEALED)** Project.

- **Author**: H4TIHIT4M
- **Contributors**: Community & Open Source Projects
- **License**: [See LICENSE](LICENSE)
- **Attribution**: Built with references dari berbagai tools OSINT open-source

---

## 🇮🇩 Catatan Lokal

Tools ini dikembangkan dengan mempertimbangkan infrastruktur dan kebutuhan Indonesia. Fitur-fitur seperti:
- Support bahasa Indonesia lengkap
- Multi-region testing dengan fokus Asia-Pasifik
- ISP Indonesia detection
- Local security best practices

---

**Dibuat dengan ❤️ oleh H4TIHIT4M**  
**🇮🇩 Bagian dari BL4CKOPS_OSINT Project**  
**"Bringing Indonesian Cybersecurity to Global Standards"**

