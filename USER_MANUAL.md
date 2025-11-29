# 📘 BL4CKOPS IP Reconnaissance - User Manual

## Table of Contents
1. [Installation](#installation)
2. [Running the Application](#running-the-application)
3. [Features Overview](#features-overview)
4. [How to Use](#how-to-use)
5. [Admin Panel](#admin-panel)
6. [Troubleshooting](#troubleshooting)

---

## Installation

### Prerequisites
- **Node.js** (v16 or higher)
- **npm** (comes with Node.js)
- **Git** (optional, for cloning)

### Step 1: Clone or Download
```bash
git clone https://github.com/BLACKOPSH4TIHIT4M/BL4CKOPS_MyIP.git
cd BL4CKOPS_MyIP
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Setup Admin Password (Optional)
For admin features (network diagnostics, monitoring):
```bash
npm run setup
```
This creates an admin account with password authentication.

### Step 4: Configure Environment (Optional)
Create `.env` file from example:
```bash
cp .env.example .env
```

Edit `.env` for advanced features (API keys, ports, etc.)

---

## Running the Application

### Development Mode
```bash
npm run dev
```
- Starts **Vite dev server** on `http://localhost:5173`
- Starts **backend** on `http://localhost:11966`
- Hot reload enabled

### Production Mode
```bash
npm start
```
- Runs **frontend** on `http://localhost:18966`
- Runs **backend** on `http://localhost:11966`
- Optimized build

### Production Build with Obfuscation
```bash
npm run build:obfuscate
```
- Creates obfuscated code in `dist-obfuscated/`
- Protects source code from reverse engineering
- Ready for deployment

### Using Docker
```bash
docker run -d -p 18966:18966 --name bl4ckops-myip --restart always blackopsh4tihit4m/bl4ckops-myip
```

---

## Features Overview

### 🛜 IP Information
- **Your Public IP**: Detected from multiple sources
- **Geolocation**: Country, region, city, coordinates
- **ISP Info**: Internet Service Provider details
- **ASN**: Autonomous System Number

### 🔍 IP Query
- Search any IP address worldwide
- Get detailed information about target IP
- Multiple data sources for accuracy

### 🚦 Connectivity Tests
- Test access to popular services (Google, GitHub, YouTube, etc.)
- Determine if websites are blocked
- Useful for censorship/proxy testing

### 🚥 WebRTC Leak Detection
- Detects IP leaks during WebRTC connections
- Shows real IP even behind VPN

### 🛑 DNS Leak Test
- Tests for DNS leaks when using VPN/proxy
- Shows which DNS servers handle your queries

### 🚀 Speed Test
- Measures internet speed (download/upload)
- Uses Cloudflare edge networks globally
- Shows latency to multiple regions

### 📡 Global Latency Test
- Ping servers worldwide
- Measure response times from different countries
- Identify optimal network paths

### 🔦 DNS Resolver
- Resolve domain names to IP addresses
- Check DNS records (A, AAAA, MX, etc.)
- Multiple DNS sources for comparison

### 📋 MAC Lookup
- Query physical MAC addresses
- Find device manufacturer information
- Useful for network inventory

### 🖥️ Browser Fingerprint
- Analyze your browser fingerprint
- Shows unique device identification
- Privacy analysis

### 📓 Security Checklist
- 258-item cybersecurity checklist
- Self-assessment tool
- Best practices guide

### ⏱️ MTR Test
- Multi-hop network trace to target
- Shows every hop on network path
- Identifies congestion points

### 🚧 Censorship Check
- Check if websites are blocked in specific countries
- Useful for international access testing

### 📀 Whois Search
- Domain information lookup
- IP ownership details
- Registration information

---

## How to Use

### 1. Opening the App
```
Local: http://localhost:18966
LAN:  http://[your-device-ip]:18966
```

### 2. View Your IP
- App auto-detects and displays your IP on load
- Shows multiple sources for verification
- Geolocation map available

### 3. Search Any IP
- Use "Query IP" widget
- Enter target IP address
- View detailed information

### 4. Run Tests
- **Connectivity**: Click "Test Connection" to check service access
- **Speed**: Click "Speed Test" to measure bandwidth
- **DNS Leak**: Run to verify DNS protection
- **WebRTC**: Detect IP leaks

### 5. Dark Mode
- Toggle in bottom-right corner
- Automatically follows system preference
- Saves preference to localStorage

### 6. Mobile Access
- Responsive design for tablets/phones
- Touch-optimized interface
- PWA installable

### 7. Keyboard Shortcuts
Press `?` to see all available keyboard shortcuts

---

## Admin Panel

### Accessing Admin Features
1. Click profile icon (top-right)
2. Select "Login"
3. Enter admin password (setup during installation)
4. Unlock advanced diagnostics

### Admin Features
- **Traceroute**: Real traceroute to target
- **Connection Info**: Socket/connection diagnostics
- **Network Monitoring**: Active connections, listening ports
- **Rate Limit Status**: Monitor abuse protection

### Logging Out
Click profile → Logout

---

## Troubleshooting

### Port Already in Use
```bash
# Change ports via environment
FRONTEND_PORT=8080 BACKEND_PORT=8000 npm start
```

### API Keys Not Working
- Check `.env` file for correct API tokens
- Verify API rate limits not exceeded
- Some features optional without keys

### Can't Access from Other Devices
- Ensure firewall allows port 18966
- Check device IP: `hostname -I`
- Verify on same network

### Performance Issues
- Clear browser cache
- Disable unnecessary browser extensions
- Check internet connection speed

### Docker Issues
```bash
# Check logs
docker logs bl4ckops-myip

# Restart container
docker restart bl4ckops-myip

# Remove and rebuild
docker rm bl4ckops-myip
docker run -d -p 18966:18966 blackopsh4tihit4m/bl4ckops-myip
```

### Speed Test Not Working
- Cloudflare API may be blocked
- Try different test servers
- Check firewall/proxy settings

---

## Data Privacy

### What Gets Stored Locally
- Your preferences (dark mode, language)
- Admin session token (24h expiration)
- Recent searches (browser localStorage)

### What Gets Sent to APIs
- Your IP address (for geolocation)
- Queried IP addresses (for lookup)
- Speed test data (for measurements)
- DNS queries (for leak tests)

### What Never Gets Stored
- Passwords (encrypted + deleted after use)
- Payment information
- Personal browsing history
- Login credentials

---

## Support

For issues, documentation, or feature requests:
- **GitHub Issues**: https://github.com/BLACKOPSH4TIHIT4M/BL4CKOPS_MyIP/issues
- **Documentation Hub**: See [DOCUMENTATION_HUB.md](DOCUMENTATION_HUB.md)
- **Security**: See [SECURITY.md](SECURITY.md)

---

**Last Updated**: November 29, 2025  
**Version**: 5.0.0
