# 🇮🇩 BL4CKOPS IP Reconnaissance Tool

**Advanced IP Intelligence Platform | Multi-Source IP Lookup & Network Diagnostics**

by **H4TIHIT4M**

---

## 🎯 Apa Itu BL4CKOPS IP Reconnaissance?

BL4CKOPS adalah aplikasi open-source terpadu untuk:
- ✅ Cek IP address Anda (IPv4, IPv6)
- ✅ Lookup informasi IP dari mana saja
- ✅ Deteksi DNS leak (VPN/Proxy testing)
- ✅ Test WebRTC leak
- ✅ Speed test jaringan
- ✅ Test konektivitas website
- ✅ DNS resolver dari berbagai sumber
- ✅ WHOIS lookup
- ✅ MTR test ke seluruh dunia
- ✅ Browser fingerprinting
- ✅ Security checklist 258 items

**Demo Live:** https://blackopsh4tihit4m.github.io/BL4CKOPS_MyIP/

---

## 🚀 Quick Start (Semua OS)

### 🖥️ Windows, macOS, Linux

**Option 1: Node.js (Recommended)**
```bash
git clone https://github.com/BLACKOPSH4TIHIT4M/BL4CKOPS_MyIP.git
cd BL4CKOPS_MyIP
npm install
npm start
```
Akses: `http://localhost:18966`

**Option 2: Docker**
```bash
docker run -p 18966:18966 ghcr.io/blackopsh4tihit4m/bl4ckops_ip_reconnaissance
```
Akses: `http://localhost:18966`

**Option 3: Vercel (Cloud - Free)**
```
https://vercel.com/new/clone?repository-url=https://github.com/BLACKOPSH4TIHIT4M/BL4CKOPS_MyIP
```

---

### 📱 Android & iOS

**Option 1: Browser (Instant)**
Buka di mobile browser:
```
https://github.com/BLACKOPSH4TIHIT4M/BL4CKOPS_MyIP/raw/main/MOBILE_DEPLOY.html
```
Atau akses langsung:
```
https://blackopsh4tihit4m.github.io/BL4CKOPS_MyIP/
```

**Option 2: Install as App (PWA)**
1. Buka link di atas
2. Tap **"Add to Home Screen"** (iOS) atau **"Install"** (Android)
3. Selesai! Aplikasi tersimpan di home screen

**Option 3: Local Network (LAN)**
```bash
# Di PC/laptop:
npm start

# Di HP (same network):
http://<YOUR_COMPUTER_IP>:18966
```
If you access the app from another device in the same LAN, you must add the host IP or hostname to `ALLOWED_DOMAINS` in your `.env` (or publicly accessible domain if using a reverse proxy):
```env
ALLOWED_DOMAINS=localhost,127.0.0.1,192.xxx.xx.xxxx
```
Replace `YOUR_SERVER_IP` with the actual IP of your server in the LAN. This ensures the API's `referer` and `host` checks pass when a browser on the LAN requests data.

Note: Use commas to separate values. The value of `ALLOWED_DOMAINS` is split on commas to build a allow-list used in referer host checks — the exact string `xxx.xx.xxx` needs to be present (don't omit commas or combine values without separators).

---

## 📊 Fitur Utama

### 🌐 IP Information
- Multi-source IP lookup (IPInfo, IPCheck.ing, IPAPI.is, IP2Location)
- Geolocation (Country, Region, City, Latitude, Longitude)
- ASN & Organization info
- ISP details
- Display IP pada map

### 🔍 Network Diagnostics
- **Connectivity Test**: Cek akses ke Google, GitHub, YouTube, ChatGPT, dll
- **DNS Leak Test**: Deteksi DNS leak saat menggunakan VPN
- **WebRTC Test**: Identifikasi IP yang digunakan WebRTC
- **Speed Test**: Test kecepatan jaringan dengan Cloudflare
- **Global Latency**: Test latensi ke server di berbagai negara
- **MTR Test**: Traceroute test across the globe

### 🛠️ Advanced Tools
- **DNS Resolver**: Resolve domain dari berbagai DNS providers
- **WHOIS Lookup**: Cari info domain & IP
- **MAC Lookup**: Cari info physical address
- **Browser Fingerprint**: Lihat fingerprint unik browser Anda
- **Censorship Check**: Cek apakah website diblokir di negara tertentu
- **Proxy Rule Test**: Test konfigurasi proxy software

### 🔒 Security & Privacy
- **Cybersecurity Checklist**: 258 item security checklist
- **Privacy Test**: Comprehensive privacy analysis
- Offline mode support (PWA)
- No data collection (local processing)

---

## 💻 System Requirements

### Desktop (Windows, macOS, Linux)
- **Minimum**: 
  - Node.js 18+ (atau Docker)
  - 100MB disk space
  - Modern browser

- **Recommended**:
  - Node.js 20+
  - 500MB disk space
  - Chrome/Safari/Firefox latest version

### Mobile (Android, iOS)
- Android 6+ / iOS 12+
- Modern browser (Chrome, Safari)
- No installation needed (browser-based)
- Optional: Install as PWA for offline access

---

## 🏗️ Architecture

### Technology Stack
- **Frontend**: Vue 3 + Vite + Pinia (state management)
- **Backend**: Node.js/Express
- **Database**: MaxMind GeoIP2 (local)
- **PWA**: Service Worker + Workbox
- **Languages**: 4 languages (EN, ZH, TR, FR)
- **Auth**: Firebase (optional)

### How It Works
```
User Browser (Mobile/Desktop)
    ↓
Frontend (Vue 3 - Port 18966)
    ↓
Backend API (Express - Port 11966)
    ↓
Multi-Source Data:
├── IPInfo.io
├── IPCheck.ing
├── IPAPI.is
├── IP2Location
├── MaxMind GeoIP2
├── Cloudflare
└── DNS Providers
    ↓
Real-Time Results displayed to User
```

---

## 🌍 Multi-OS Deployment

### Windows
```bash
# PowerShell
irm https://raw.githubusercontent.com/BLACKOPSH4TIHIT4M/BL4CKOPS_MyIP/main/start.ps1 | iex

# atau manual:
git clone https://github.com/BLACKOPSH4TIHIT4M/BL4CKOPS_MyIP.git
cd BL4CKOPS_MyIP
npm install
npm start
```

### macOS
```bash
# Homebrew (if needed)
brew install node

# Clone & Run
git clone https://github.com/BLACKOPSH4TIHIT4M/BL4CKOPS_MyIP.git
cd BL4CKOPS_MyIP
npm install
npm start
```

### Linux (Ubuntu/Debian)
```bash
# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Clone & Run
git clone https://github.com/BLACKOPSH4TIHIT4M/BL4CKOPS_MyIP.git
cd BL4CKOPS_MyIP
npm install
npm start
```

### Raspberry Pi
```bash
# Already has Node.js on Raspberry Pi OS
git clone https://github.com/BLACKOPSH4TIHIT4M/BL4CKOPS_MyIP.git
cd BL4CKOPS_MyIP
npm install
npm start
```

### Docker (All Platforms)
```bash
# Pull & Run
docker run -p 18966:18966 ghcr.io/blackopsh4tihit4m/bl4ckops_ip_reconnaissance

# atau build locally:
docker build -t bl4ckops-ip .
docker run -p 18966:18966 bl4ckops-ip
```

### Android/iOS
1. Open mobile browser
2. Visit: `https://blackopsh4tihit4m.github.io/BL4CKOPS_MyIP/`
3. Tap "Add to Home Screen" for offline access

---

## ⚙️ Configuration

### Environment Variables (Optional)
```env
# Ports
BACKEND_PORT=11966
FRONTEND_PORT=18966

# API Keys (optional - for advanced features)
GOOGLE_MAP_API_KEY="your_key"
IPINFO_API_TOKEN="your_token"
CLOUDFLARE_API="your_token"

# Security
ALLOWED_DOMAINS="localhost,127.0.0.1,your-domain.com"
SECURITY_RATE_LIMIT=100

# Languages
VITE_DEFAULT_LANGUAGE="en"
```

Setup:
```bash
cp .env.example .env
# Edit .env with your values
npm start
```

---

## 🎨 Features

### 🌗 Dark Mode
- Auto-switch based on system settings
- Manual toggle available
- Eye-friendly dark theme

### 📱 Responsive Design
- Fully responsive (mobile, tablet, desktop)
- Touch-optimized UI
- Progressive Web App (PWA)

### ⌨️ Keyboard Shortcuts
- Press `?` to view all shortcuts
- Fast keyboard navigation
- Accessibility-focused

### 🌍 Internationalization
- **English** (EN)
- **中文** (ZH)
- **Türkçe** (TR)
- **Français** (FR)

---

## 📊 API Endpoints

### Frontend Accessible
```
GET /api/configs              - Get available API configurations
GET /api/ipinfo?ip=<IP>       - IP information lookup
GET /api/speed                - Speed test
GET /api/dns-leak             - DNS leak test
GET /api/webrtc               - WebRTC leak detection
```

### Usage
```bash
# IP Lookup
curl http://localhost:18966/api/ipinfo?ip=8.8.8.8

# Speed Test
curl http://localhost:18966/api/speed

# DNS Leak Test  
curl http://localhost:18966/api/dns-leak
```

---

## 🔐 Security & Privacy

### Security Features
- Rate limiting (configurable)
- Referer validation for API access
- HTTPS support (recommended in production)
- No personal data stored
- Open-source (fully auditable)

### Privacy Policy
- ✅ No tracking/analytics (local only)
- ✅ No cookies (unless you enable)
- ✅ No data collection
- ✅ All processing local or via official APIs
- ✅ Can run completely offline (PWA)

---

## 🚀 Production Deployment

### Using Nginx (Reverse Proxy)
```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    location / {
        proxy_pass http://localhost:18966;
    }
    
    location /api {
        proxy_pass http://localhost:11966;
    }
}
```

### Using Apache
```apache
<VirtualHost *:80>
    ServerName your-domain.com
    
    ProxyPreserveHost On
    # Serve Frontend
    ProxyPass / http://127.0.0.1:18966/
    ProxyPassReverse / http://127.0.0.1:18966/

    # Forward API to backend
    ProxyPass /api/ http://127.0.0.1:11966/api/
    ProxyPassReverse /api/ http://127.0.0.1:11966/api/

    # Ensure forwarded host is sent so backend referer check can rely on it
    RequestHeader set X-Forwarded-Host "%{Host}s"
</VirtualHost>
```

### SSL/HTTPS
```bash
# Using Let's Encrypt + Certbot
sudo certbot certonly -d your-domain.com
# Configure your reverse proxy with SSL cert
```

### PM2 (Process Manager)
```bash
npm install -g pm2

# Create ecosystem.config.js
cat > ecosystem.config.js << EOF
module.exports = {
  apps: [{
    name: 'bl4ckops-frontend',
    script: 'npm',
    args: 'run start-frontend',
    instances: 1,
    autorestart: true,
  }, {
    name: 'bl4ckops-backend',
    script: 'npm',
    args: 'run start-backend',
    instances: 1,
    autorestart: true,
  }]
};
EOF

pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

---

## 📚 Project Structure

```
BL4CKOPS_MyIP/
├── frontend/                 # Vue 3 Frontend
│   ├── components/          # Vue components
│   ├── utils/               # Utility functions
│   ├── locales/             # i18n translations
│   └── style/               # CSS styling
├── api/                     # Backend API handlers
│   ├── ipinfo-io.js
│   ├── dns-resolver.js
│   └── ...
├── backend-server.js        # Express backend
├── frontend-server.js       # Frontend server
├── vite.config.js           # Vite configuration
├── package.json             # Dependencies
└── docker-compose.yml       # Docker setup
```

---

## 🤝 Contributing

We welcome contributions! Please:
1. Fork repository
2. Create feature branch (`git checkout -b feature/amazing`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing`)
5. Open Pull Request

---

## 📝 License

BL4CKOPS IP Reconnaissance Tool is licensed under **MIT License**.
See LICENSE file for details.

---

## 🙏 Credits

**Created by:** H4TIHIT4M  
**Based on:** MyIP (jason5ng32)  
**Repository:** https://github.com/BLACKOPSH4TIHIT4M/BL4CKOPS_MyIP

---

## 🇮🇩 Support

- **Issues**: https://github.com/BLACKOPSH4TIHIT4M/BL4CKOPS_MyIP/issues
- **Discussions**: https://github.com/BLACKOPSH4TIHIT4M/BL4CKOPS_MyIP/discussions
- **Wiki**: https://github.com/BLACKOPSH4TIHIT4M/BL4CKOPS_MyIP/wiki

---

**Status:** Production Ready ✅  
**Version:** 5.0.0  
**Last Updated:** November 29, 2025

🇮🇩 **by H4TIHIT4M** | BL4CKOPS
