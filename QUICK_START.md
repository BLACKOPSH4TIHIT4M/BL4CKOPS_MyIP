# 🚀 BL4CKOPS IP Reconnaissance - INSTANT DEPLOYMENT

## ⚡ One-Click Access for All Devices

### 📱 Mobile (Android & iOS)
**Instant - No Installation:**
```
https://blackopsh4tihit4m.github.io/BL4CKOPS_MyIP/
```
- Loads instantly in browser
- Tap "Add to Home Screen" for PWA install
- Works offline after first load
- All tools available

### 💻 Desktop (Linux, Windows, macOS)
**Quick 5-Minute Setup:**
```bash
git clone https://github.com/BLACKOPSH4TIHIT4M/BL4CKOPS_MyIP.git
cd BL4CKOPS_MyIP
npm install
npm start
# Open: http://localhost:18966
```

**Or Docker (All Platforms):**
```bash
docker run -p 18966:18966 ghcr.io/blackopsh4tihit4m/bl4ckops_ip_reconnaissance
```

**Or Cloud (Vercel - Free):**
```
https://vercel.com/new/clone?repository-url=https://github.com/BLACKOPSH4TIHIT4M/BL4CKOPS_MyIP
```

---

## 🌐 Network Access (Same LAN)

### Get Your Computer IP
**Linux/macOS:**
```bash
hostname -I  # e.g., 192.XXX.XXX.XXX (your actual local IP - e.g., 192.168.x.x)
```

**Windows:**
```cmd
ipconfig  # Look for IPv4 Address
```

### Update Configuration
Edit `.env` and add your IP:

```env
# Network Access Control
ALLOWED_DOMAINS="localhost,127.0.0.1,0.0.0.0,YOUR_IP_ADDRESS"
```

**Contoh:**
```env
ALLOWED_DOMAINS="localhost,127.0.0.1,0.0.0.0,YOUR_IP_ADDRESS"
```

### 3. **Restart Application**

```bash
# Stop (Ctrl+C di terminal yang running npm start)
# Restart
npm start
```

### 4. **Akses dari Device Lain**

Buka browser di device lain (PC, Laptop, Tablet, Smartphone) dan akses:

```
http://YOUR_IP_ADDRESS:18966
```

**Contoh:**
- **PC/Laptop**: http://YOUR_LOCAL_IP:18966
- **Smartphone/Tablet**: http://YOUR_LOCAL_IP:18966

---

## 📱 Akses dari Smartphone (Android/iOS)

### Requirements
- Smartphone terhubung di network yang SAMA dengan host
- Browser (Chrome, Safari, Firefox, atau aplikasi browser lainnya)

### Cara Akses

1. **Dapatkan IP Host** (lihat Step 1 di atas)

2. **Buka Browser di Smartphone**

3. **Ketik URL:**
   ```
   http://IP_HOST:18966
   ```
   
   Contoh: `http://YOUR_LOCAL_IP:18966`

4. **Enjoy!** Aplikasi akan responsif dan user-friendly di mobile

### Tips Smartphone
- **Bookmark halaman** untuk akses cepat
- **Install sebagai PWA** (Progressive Web App):
  - Chrome: Menu → Install app
  - Safari: Share → Add to Home Screen
  - Firefox: Menu → Install

---

## 🖥️ Akses dari Windows PC

1. **Temukan IP Address Host:**
   - Buka Command Prompt
   - Ketik: `ipconfig`
   - Cari "IPv4 Address" (format: 192.168.x.x atau 10.0.x.x)

2. **Buka Browser:**
   - Chrome, Firefox, Edge, atau Safari

3. **Akses:**
   ```
   http://IP_ADDRESS:18966
   ```

---

## 🍎 Akses dari Mac

1. **Temukan IP Address Host:**
   ```bash
   ifconfig | grep "inet " | grep -v "127.0.0.1"
   # Output: inet 192.XXX.XXX.XXX ...
   ```

2. **Buka Browser (Safari, Chrome, Firefox)**

3. **Akses:**
   ```
   http://IP_ADDRESS:18966
   ```

---

## 🐧 Akses dari Linux

1. **Temukan IP Address Host:**
   ```bash
   hostname -I
   # atau
   ip addr show
   ```

2. **Buka Browser**

3. **Akses:**
   ```
   http://IP_ADDRESS:18966
   ```

---

## 🐳 Docker Deployment (Semua Platform)

Cara termudah untuk deploy ke semua platform dengan Docker:

### Prerequisites
- Docker installed ([Download Docker](https://www.docker.com/products/docker-desktop))

### Step 1: Build Docker Image
```bash
cd /path/to/BL4CKOPS_MyIP
docker build -t bl4ckops-ip-tool:5.0.0 .
```

### Step 2: Run Container
```bash
docker run -d \
  --name bl4ckops-ip \
  -p 18966:18966 \
  -p 11966:11966 \
  -e BACKEND_PORT=11966 \
  -e FRONTEND_PORT=18966 \
  -e ALLOWED_DOMAINS="0.0.0.0" \
  bl4ckops-ip-tool:5.0.0
```

### Step 3: Access
```
http://localhost:18966        # Dari host
http://YOUR_IP:18966         # Dari network
```

---

## ⚙️ Environment Variables

File `.env` di root project mengontrol semua konfigurasi:

```env
# Server Ports
BACKEND_PORT=11966
FRONTEND_PORT=18966

# Network Access Control
# PENTING: Update dengan IP address Anda
ALLOWED_DOMAINS="localhost,127.0.0.1,0.0.0.0,YOUR_IP_HERE"

# API Keys (Optional - biarkan kosong jika tidak punya)
GOOGLE_MAP_API_KEY=""
IPINFO_API_TOKEN=""
IPCHECKING_API_KEY=""
IP2LOCATION_API_KEY=""

# Security
SECURITY_RATE_LIMIT=0
SECURITY_DELAY_AFTER=0
```

---

## 🔧 Troubleshooting

### "Cannot connect to http://YOUR_LOCAL_IP:18966"

**Solusi:**
1. Pastikan app masih running di host: `npm start`
2. Update `.env` dengan IP yang benar
3. Restart aplikasi
4. Cek firewall tidak blocking port 18966/11966
5. Pastikan device terhubung di network yang SAMA

### "Referer validation failed"

**Solusi:**
- Ini normal jika dari network berbeda
- Update ALLOWED_DOMAINS di `.env` dengan IP device Anda

### Port 18966 sudah digunakan

**Solusi:**
```bash
# Ganti port di .env
FRONTEND_PORT=18967

# Restart
npm start
```

### Slow performance dari smartphone

**Solusi:**
- Pastikan WiFi connection stabil
- Gunakan browser yang sama (jangan buka di multiple tabs)
- Coba restart browser

---

## 📊 Fitur-Fitur Utama

Setelah berhasil akses, Anda bisa menggunakan:

✅ **IP Information**
- Check IP address (IPv4 & IPv6)
- Geolocation lookup
- ASN & ISP information

✅ **Network Testing**
- Connectivity test (website availability)
- DNS leak detection
- WebRTC leak test
- Speed test
- Global latency test

✅ **Advanced Tools**
- DNS resolver
- WHOIS lookup
- MTR traceroute
- Proxy/VPN detection
- Browser fingerprinting
- Security checklist (258 items)

---

## 🎯 Network Diagram

```
┌─────────────────────────────────────┐
│         HOST MACHINE                │
│  (IP: YOUR_LOCAL_IP)              │
│                                     │
│  ┌──────────────────────────────┐  │
│  │  BL4CKOPS IP Tool            │  │
│  │  Frontend: :18966            │  │
│  │  Backend:  :11966            │  │
│  └──────────────────────────────┘  │
└─────────────────────────────────────┘
          ↑              ↑
    HTTP :18966    HTTP :11966
          │              │
    ┌─────┴──────────────┴──────┐
    │                            │
┌──────────────┐        ┌──────────────┐
│  PC/Laptop   │        │ Smartphone   │
│  (Browser)   │        │ (Browser)    │
│              │        │              │
│ 192.XXX.XXX.5│        │ 192.XXX.XXX.10│
└──────────────┘        └──────────────┘

All connected via same WiFi network
```

---

## 🚀 Deployment ke Internet (Optional)

Untuk expose ke internet dengan SSL, gunakan:

1. **Nginx Reverse Proxy** (recommended)
2. **Cloudflare Tunnels** (easiest)
3. **DigitalOcean/AWS** (scalable)

See `DEPLOYMENT.md` untuk setup production lengkap.

---

## 📝 Command Reference

```bash
# Development dengan hot reload
npm run dev

# Production build
npm run build

# Start production servers
npm start

# Stop server
Ctrl+C (di terminal)

# Check if ports are in use
# Linux/Mac
lsof -i :18966
lsof -i :11966

# Windows
netstat -ano | findstr :18966
```

---

## 💡 Tips

1. **Bookmark di Smartphone:**
   - Chrome: ⋮ → Install app
   - Safari: Share → Add to Home Screen
   - Jadi seperti native app!

2. **Akses Offline:**
   - PWA tersimpan di cache
   - Beberapa fitur bisa diakses offline

3. **Share dengan Teman:**
   - Share IP address: `http://YOUR_LOCAL_IP:18966`
   - Teman bisa langsung akses dari device mereka

4. **Debug:**
   - Buka DevTools (F12) di browser
   - Console untuk melihat error

---

## ❓ FAQ

**Q: Bisakah diakses dari internet?**
A: Default NO untuk security. Butuh setup Nginx/Cloudflare untuk expose.

**Q: Perlu API keys?**
A: Optional. Beberapa fitur lebih lengkap dengan API keys.

**Q: Aplikasi berjalan di mana?**
A: Di mesin HOST. Clients hanya akses via browser.

**Q: Berapa konsumsi resource?**
A: ~300MB RAM, CPU minimal. Cocok untuk:
- Development
- Local network testing
- Educational purposes

**Q: Bisakah dipakai dengan VPN?**
A: Ya, tapi update ALLOWED_DOMAINS sesuai IP VPN.

---

## 📞 Support

- **GitHub Issues**: [Report bugs](https://github.com/BLACKOPSH4TIHIT4M/BL4CKOPS_MyIP/issues)
- **Documentation**: See `README.md`, `DEPLOYMENT.md`
- **Copilot Instructions**: See `.github/copilot-instructions.md`

---

## ✅ Checklist Sebelum Deploy

- [ ] `npm install` berhasil
- [ ] `.env` sudah dikonfigurasi dengan IP Anda
- [ ] `npm start` berjalan tanpa error
- [ ] Bisa akses dari localhost
- [ ] Bisa akses dari network IP
- [ ] Frontend responsive di mobile

---

**Made with ❤️ by H4TIHIT4M**

🇮🇩 BL4CKOPS IP Reconnaissance Tool v5.0.0  
Part of BL4CKOPS_OSINT Project  
November 2025
