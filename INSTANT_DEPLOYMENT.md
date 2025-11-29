# 🚀 BL4CKOPS IP Reconnaissance Tool - ONE-CLICK DEPLOYMENT

**Instant Access dari GitHub - Semua Device (Android, iOS, Windows, Linux, macOS)**

---

## ⚡ QUICKSTART (Copy-Paste 1 Command)

### Option 1: Langsung dari Terminal

```bash
# Linux/macOS
curl -fsSL https://raw.githubusercontent.com/BLACKOPSH4TIHIT4M/BL4CKOPS_MyIP/main/start.sh | bash

# Windows (PowerShell)
irm https://raw.githubusercontent.com/BLACKOPSH4TIHIT4M/BL4CKOPS_MyIP/main/start.ps1 | iex
```

### Option 2: Browser - Instant Web Access

**Klik link ini langsung buka di browser (semua OS, tidak perlu install apapun):**

[🌐 **BL4CKOPS IP Tool - ONLINE**](https://blackopsh4tihit4m.github.io/BL4CKOPS_MyIP/)

---

## 📱 Supported Devices

✅ **Desktop**
- Windows 10/11
- macOS (Intel & Apple Silicon)
- Linux (Ubuntu, Debian, CentOS, etc)

✅ **Mobile**
- Android 8+
- iOS 13+
- iPadOS

✅ **Browser Support**
- Chrome/Chromium
- Firefox
- Safari
- Edge

---

## 🎯 Admin Monitoring Dashboard

**Akses Admin Panel:**

```
https://blackopsh4tihit4m.github.io/BL4CKOPS_MyIP/admin
```

**Login Admin:**
- Username: `admin@bl4ckops.io`
- Password: Dikirim via secure channel

---

## 📊 Real-Time User Tracking

Admin dapat melihat:

✅ **Device Information**
- Device Type (Phone, Tablet, Desktop)
- OS & Version (Android 12, iOS 17, Windows 11, etc)
- Browser & Version
- Device Manufacturer & Model

✅ **Network Information**
- User IP Address (Real, bukan mock)
- ISP & Network Provider
- Geographic Location (Country, City, Coordinates)
- IMSI (untuk mobile devices)
- Network Type (WiFi, 4G, 5G, etc)

✅ **User Activity**
- Timestamp setiap akses
- Tools yang digunakan
- Query history
- Session duration
- Referrer source

✅ **Alerts & Monitoring**
- Real-time user activity log
- Suspicious activity detection
- Geographic anomaly alerts
- Rate limit violations
- API abuse attempts

---

## 🔐 Privacy & Security

- **No installation required** - run from browser
- **Open source** - code transparent untuk audit
- **GDPR compliant** - user consent untuk tracking
- **End-to-end encrypted** - monitoring communication encrypted
- **Admin-only access** - dashboard protected dengan auth
- **Audit logs** - semua admin actions tercatat

---

## 📦 Local Deployment (Optional)

Jika ingin jalankan di server lokal:

### Requirement
- Node.js 18+
- npm or yarn

### Install & Run

```bash
# Clone repository
git clone https://github.com/BLACKOPSH4TIHIT4M/BL4CKOPS_MyIP.git
cd BL4CKOPS_MyIP

# Install
npm install

# Production build
npm run build

# Start servers
npm start

# Access
# Frontend: http://localhost:18966
# Backend: http://localhost:11966
# Admin: http://localhost:3000/admin
```

### Network Access (LAN)

Dari device lain di network yang sama:

```
http://[YOUR_IP]:18966
```

Contoh:
```
http://YOUR_LOCAL_IP:18966
```

---

## 🐳 Docker Deployment

**Easiest way untuk production:**

```bash
# Build
docker build -t bl4ckops-ip-tool:5.0.0 .

# Run
docker run -d \
  --name bl4ckops-ip \
  -p 18966:18966 \
  -p 11966:11966 \
  -p 3000:3000 \
  -e BACKEND_PORT=11966 \
  -e FRONTEND_PORT=18966 \
  -e ADMIN_PORT=3000 \
  bl4ckops-ip-tool:5.0.0

# Access
# Frontend: http://localhost:18966
# Admin: http://localhost:3000
```

---

## 📈 Admin Dashboard Features

### 1. Live User Monitoring
- Real-time active users counter
- User list dengan device info
- Map view untuk geographic distribution
- Timeline view untuk user journey

### 2. Analytics
- Daily active users (DAU)
- Monthly active users (MAU)
- Top tools used
- API response times
- Error rates

### 3. User Management
- Block/unblock users
- Rate limit adjustment
- Session termination
- User audit logs

### 4. System Health
- Server status
- API endpoint health
- Database connectivity
- Uptime monitoring
- Resource usage (CPU, Memory, Disk)

### 5. Security & Alerts
- Failed login attempts
- Suspicious geographic access
- Rate limit violations
- Malformed requests
- DDoS detection

---

## 🔌 API Integration

Untuk integrate dengan monitoring system Anda sendiri:

### Admin API Endpoints

```bash
# Get all active users
curl -H "Authorization: Bearer ADMIN_TOKEN" \
  https://api.bl4ckops.io/admin/users/active

# Get user details
curl -H "Authorization: Bearer ADMIN_TOKEN" \
  https://api.bl4ckops.io/admin/users/{userId}

# Get analytics
curl -H "Authorization: Bearer ADMIN_TOKEN" \
  https://api.bl4ckops.io/admin/analytics

# Get alerts
curl -H "Authorization: Bearer ADMIN_TOKEN" \
  https://api.bl4ckops.io/admin/alerts
```

---

## 📱 Mobile App Considerations

### Progressive Web App (PWA)
- Bisa di-install di home screen
- Works offline (cached resources)
- Native app-like experience
- Auto-updates

### Install di Mobile

**Android:**
1. Buka di Chrome
2. Menu → "Install app"

**iOS:**
1. Buka di Safari
2. Share → "Add to Home Screen"

---

## 🆘 Troubleshooting

### "Cannot reach the app"
```
- Check internet connection
- Verify firewall not blocking ports 18966, 11966
- Try accessing http://localhost:18966 (local machine)
```

### "Admin dashboard not loading"
```
- Clear browser cache (Ctrl+Shift+Delete)
- Try incognito/private mode
- Check admin credentials
- Verify API key in .env
```

### "User location not showing"
```
- Check browser location permission granted
- Enable GPS on mobile device
- Verify geolocation API enabled
```

---

## 📞 Support

**Issues or Questions?**
- GitHub Issues: https://github.com/BLACKOPSH4TIHIT4M/BL4CKOPS_MyIP/issues
- GitHub Discussions: https://github.com/BLACKOPSH4TIHIT4M/BL4CKOPS_MyIP/discussions
- Email: admin@bl4ckops.io

---

## 📜 License

Part of BL4CKOPS_OSINT Project  
License: See LICENSE file

---

**Created by**: H4TIHIT4M  
**Version**: 5.0.0  
**Last Updated**: November 2025

---

## 🎯 Next Steps

1. **Beginner**: Klik link online di atas untuk test instant
2. **Intermediate**: Clone repo dan jalankan `npm start` di lokal
3. **Advanced**: Deploy dengan Docker untuk production
4. **Admin**: Access admin panel untuk monitor users

**Ready to explore? Start now!** 🚀
