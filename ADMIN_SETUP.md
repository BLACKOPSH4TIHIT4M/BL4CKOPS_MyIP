# 🔐 BL4CKOPS Admin Setup Guide

## Your Admin Password Setup

Your admin password has been securely configured:

**Password:** `IniMyIP@H4TIHIT4M`

### ✅ What's Already Done

1. **Password Hashed** - Password converted to one-way hash (cannot be reversed)
2. **Security Keys Generated** - ADMIN_SECRET and ENCRYPTION_KEY securely stored
3. **JWT Authentication** - Token-based access to admin features
4. **Rate Limiting** - Admin features protected per-request

### 📋 How It Works

```
Your Password (IniMyIP@H4TIHIT4M)
         ↓ (One-way hash)
SHA256 Hash (stored in .env)
         ↓
Admin Login API (/api/admin/login)
         ↓
Password Validation
         ↓ (If correct)
JWT Token Generated
         ↓
Access to Advanced Features (Traceroute, Connection Info)
```

### 🚀 Getting Started

#### Step 1: Install Dependencies
```bash
npm install
```

#### Step 2: Build Application
```bash
npm run build
```

#### Step 3: Start Server
```bash
npm start
```

#### Step 4: Access Application
```
http://localhost:18966
```

#### Step 5: Login to Admin Panel
1. Open admin/restricted features
2. You'll see login modal
3. Enter password: `IniMyIP@H4TIHIT4M`
4. Get JWT token (expires in 24 hours)
5. Access traceroute, connection info, and other admin features

---

## 🔒 Security Features

### Password Protection
- ✅ Password never stored in plain text
- ✅ One-way SHA256 hash only
- ✅ Cannot be reversed or decrypted
- ✅ Each login requires password validation

### JWT Token Authentication
- ✅ Token expires in 24 hours
- ✅ Stored in session storage (not persistent)
- ✅ Session ends when browser closes
- ✅ Each request validates token signature

### Obfuscation (Optional)
To deploy with code obfuscation:
```bash
npm run build:prod
```

This will:
- Build frontend with Vite
- Obfuscate backend API handlers
- Minimize reverse-engineering risk

---

## 📊 Admin Features Protected

Once logged in as admin, you get access to:

1. **Traceroute** - Network path tracing (3 requests/min rate limit)
2. **Connection Info** - Local sockets & ARP neighbors (6 requests/min rate limit)
3. **Admin Status** - Check authentication status
4. **Admin Dashboard** - (If enabled) System monitoring

---

## ⚠️ Security Reminders

### DO's
- ✅ Keep `.env` file safe and backed up
- ✅ Use strong passwords with mix of upper/lower/numbers/symbols
- ✅ Change password periodically using `npm run setup`
- ✅ Enable HTTPS in production
- ✅ Set `ALLOWED_DOMAINS` to restrict access

### DON'Ts
- ❌ Never commit `.env` to git
- ❌ Never share `.env` file
- ❌ Don't expose admin endpoints to public without authentication
- ❌ Don't use weak passwords
- ❌ Don't log passwords anywhere

---

## 🔧 Change Admin Password

If you need to change your admin password:

```bash
npm run setup
```

This will:
1. Prompt for new password
2. Validate password strength
3. Generate new security keys
4. Update `.env` file
5. No downtime needed - restart app and use new password

---

## 🐛 Troubleshooting

### Login Failed
- ✅ Check password spelling (case-sensitive)
- ✅ Verify ADMIN_PASSWORD_HASH is set in .env
- ✅ Check server is running on port 11966
- ✅ Check ALLOWED_DOMAINS includes your domain

### Features Showing Disabled
- ✅ Check if logged in as admin
- ✅ Verify token hasn't expired (24 hours)
- ✅ Try logging out and back in
- ✅ Check browser session storage

### Token Expired
- ✅ Login again with password
- ✅ New token will be generated
- ✅ Session storage is browser-based (auto-cleared on close)

---

## 📱 Multiple Devices

If accessing from different devices on same LAN:

1. Each device needs to login separately
2. Password is: `IniMyIP@H4TIHIT4M`
3. Each device gets its own JWT token
4. Tokens don't sync across devices (by design)

---

## 🌐 Production Deployment

For production with reverse proxy (Nginx/Apache):

```env
ALLOWED_DOMAINS="localhost,127.0.0.1,your-domain.com"
```

Admin panel will work with:
- Direct access: `http://your-domain.com:18966`
- Proxied access: `http://your-domain.com` (with reverse proxy)
- LAN access: `http://server-ip:18966`

---

## 📞 Support

If issues persist:
1. Check `.env` file has all required keys
2. Verify Node.js version 18+
3. Clear browser cache and cookies
4. Restart server completely
5. Check console logs for errors

---

**Status:** ✅ Setup Complete  
**Admin Password:** `IniMyIP@H4TIHIT4M`  
**Last Updated:** November 29, 2025

🔐 Your application is secure and ready for deployment!
- ✅ **Advanced Network Diagnostics**

Features lain tetap accessible tanpa login:
- IP Lookup (dari multiple sources)
- DNS/WebRTC Leak Tests
- Speed Test
- Global Latency Test
- dan lainnya

---

## ⚠️ Important Security Notes

1. **JANGAN SHARE `.env` FILE** - Contains hashed password & security keys
2. **BACKUP `.env`** - Jika lupa password, bisa restore dari backup
3. **GANTI PASSWORD BERKALA** - Jalankan `npm run setup` lagi untuk set password baru
4. **SECURE ENVIRONMENT** - Pastikan server hanya accessible dari trusted networks

---

## 🔑 Forgot Password?

Jalankan setup script lagi:
```bash
npm run setup
```

Masukkan password baru, dan `.env` akan di-update.

---

## 📊 Advanced Configuration

### Disable Advanced Features
Jika ingin disable Traceroute/Connection Info:

Edit `.env`:
```env
TRACEROUTE_ENABLED=false
CONN_INFO_ENABLED=false
```

### Custom Port
```env
BACKEND_PORT=11966
FRONTEND_PORT=18966
```

---

## 🚀 Production Deployment

Untuk production:

1. Generate strong password
2. Set `ALLOWED_DOMAINS` ke domain Anda
3. Use HTTPS (recommended via reverse proxy)
4. Backup `.env` securely
5. Use PM2 atau Docker untuk process management

---

## 🆘 Troubleshooting

### Admin Login Button Not Showing
- Check if `ADMIN_PASSWORD_HASH` is set di `.env`
- Restart aplikasi: `npm start`

### "Invalid Password" Error
- Double-check password Anda (case-sensitive!)
- Pastikan password memenuhi requirements (kecil, BESAR, angka)

### Session Expired
- Token expire setelah 24 jam
- Login lagi dengan password Anda

---

**Created by H4TIHIT4M | BL4CKOPS Project**
