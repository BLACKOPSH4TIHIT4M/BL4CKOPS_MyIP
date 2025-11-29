# 📖 BL4CKOPS IP Reconnaissance - User Guide

## What Is This Tool?

**BL4CKOPS IP Reconnaissance** is a **network diagnostics and intelligence platform** that helps you understand your internet connectivity and network environment.

Think of it as a multi-source "IP lookup toolkit" with advanced network diagnostic capabilities.

---

## 🔍 What Data Does This App Collect?

### When You Use It on Your Own Device (Localhost)
The app shows **information about YOUR device and YOUR internet**:

1. **Your Public IP Address**
   - From multiple sources (IPInfo, IP-API, IPCheck.ing, etc.)
   - Shows geolocation, ISP, country, city
   - Purpose: Understand your internet identity and location

2. **Your Local Network Interfaces**
   - Network adapters installed on your device
   - IP addresses, MAC addresses, netmask
   - Purpose: See what networks your device connects to

3. **DNS & WebRTC Leak Tests**
   - Checks if your DNS queries leak outside your VPN/proxy
   - Detects WebRTC IP leaks
   - Purpose: Privacy & security diagnostics

4. **Speed Tests**
   - Measures your internet speed (via Cloudflare API)
   - Purpose: Monitor connection quality

5. **System Information**
   - Browser type, OS, screen resolution
   - User agent, locale
   - Purpose: Device profile for diagnostics

---

### When You Use It on a LAN (Network Access)
If you access the app from another device on your local network:

1. **Target Device's Public IP** (if you query it)
2. **Your Local Network Connection Status**
   - DNS resolution tests
   - Connectivity to common services (Google, GitHub, etc.)
3. **Local Network IP Addresses** (if traceroute/connection info is enabled by admin)
   - Who else is on the network
   - Network routing information

---

## ⚠️ Important: This App Is TRANSPARENT & NON-INVASIVE

### What This App DOES NOT Do

❌ **Does NOT spy on other devices' content**
- Cannot access files, passwords, or personal data
- Cannot see what websites you visit
- Cannot see what you type or download

❌ **Does NOT upload your data to servers**
- Data stays on your device/local network
- If deployed behind a reverse proxy/firewall, only your network admin can see access logs

❌ **Does NOT install malware or tracking code**
- All code is open-source and auditable on GitHub
- No hidden background processes

---

## 🎯 Purpose & Use Cases

### Legitimate Uses
✅ **Self-Diagnostics**: Check your own IP, location, ISP  
✅ **Network Troubleshooting**: Verify DNS resolution, trace routing issues  
✅ **Privacy Testing**: Detect IP leaks from VPN/proxy  
✅ **Network Management**: Admins can see local network state  
✅ **Educational**: Learn how IP geolocation and network diagnostics work  
✅ **Speed Testing**: Monitor internet connection quality  

### Network Admin Uses (If Enabled)
- Monitor network connectivity and health
- Detect network issues via traceroute
- Identify active connections and ARP neighbors
- Rate-limited to prevent abuse

---

## 🔐 Privacy & Security

### Your Data Privacy
- **Local Deployment**: All data stays on your device / local network
- **Cloud Deployment**: Only your network admin/service provider sees access logs
- **No tracking cookies**: App respects privacy; optional Firebase auth only if you enable it
- **Open-source code**: See exactly what the app does on GitHub

### Rate Limiting
To prevent abuse, the app enforces rate limits:
- IP lookup services: 100 requests per 15 minutes
- Traceroute: 3 requests per minute (admin-only feature)
- Connection info: 6 requests per minute (admin-only feature)

---

## 🛠️ Features Overview

| Feature | What It Does | Localhost Only? | Admin Only? |
|---------|-------------|-----------------|------------|
| **IP Lookup** | Shows your public IP, geolocation, ISP | No | No |
| **Local Network Info** | Shows your device's network interfaces | No | No |
| **DNS Leak Test** | Checks if DNS is leaking outside VPN | No | No |
| **WebRTC Leak Test** | Detects WebRTC IP leaks | No | No |
| **Speed Test** | Measures internet speed | No | No |
| **Browser/System Info** | Shows device profile | No | No |
| **Traceroute** | Network path tracing (real system `traceroute`) | Yes (default) | Optional |
| **Connection Info** | Shows listening sockets and ARP neighbors | Yes (default) | Optional |
| **Whois Lookup** | Reverse IP ownership lookup | No | No |
| **DNS Resolver** | Manual DNS query tool | No | No |
| **Global Latency Test** | Ping test to global servers | No | No |
| **Admin Dashboard** | System monitoring and analytics | N/A | Local port 9999 only |

---

## 🌐 How to Access

### On Your Own Device (Localhost)
```bash
# After running: npm start
Open: http://localhost:18966
```
- Full access to all diagnostic tools
- Shows YOUR IP and network info
- Traceroute/Connection Info disabled by default (admin-only)

### On Your Local Network (LAN)
```
Find your device's local IP:
- Linux/macOS: hostname -I
- Windows: ipconfig (look for IPv4 Address)

From another device on the same LAN, open:
http://YOUR_DEVICE_IP:18966
```
- Same tools as localhost
- Respects `ALLOWED_DOMAINS` security setting
- Admin-only features remain disabled unless explicitly enabled

### Public Deployment
- If deployed on the internet with a domain name:
  - Add domain to `ALLOWED_DOMAINS` environment variable
  - Rate limiting protects against abuse
  - All IP lookups are from public data sources (legal)

---

## ⚙️ Configuration

### Environment Variables

```env
# Enable optional diagnostic features (default: disabled for security)
TRACEROUTE_ENABLED=false              # Enable traceroute (local-only recommended)
TRACEROUTE_LOCAL_ONLY=true            # Restrict traceroute to localhost
CONN_INFO_ENABLED=false               # Enable connection info (local-only recommended)
CONN_INFO_LOCAL_ONLY=true             # Restrict to localhost

# Allow access from specific networks
ALLOWED_DOMAINS=localhost,127.0.0.1,YOUR_SERVER_IP,your-domain.com

# Rate limiting
SECURITY_RATE_LIMIT=100               # Requests per 15 minutes (0 = disabled)

# Admin panel (local-only by default)
ADMIN_MONITOR_ENABLED=false           # Port 9999, localhost only
```

---

## 🚨 Legal Disclaimer

### This Tool Is For Legitimate Purposes Only

This app collects and displays **publicly available IP information**:
- IP geolocation (licensed from MaxMind, IP-API, etc.)
- Public DNS records (standard DNS queries)
- Network diagnostics (traceroute is a standard networking tool)
- Your own device information (only accessible to you/your network)

### NOT For:
❌ Unauthorized network scanning or attacks  
❌ Extracting private data from other devices  
❌ DDoS or denial-of-service attacks  
❌ Bypassing network security  

**If deployed on a public network**, ensure you have proper authorization and comply with local laws and network policies.

---

## 📞 Support & Troubleshooting

### Common Questions

**Q: Can this app track me?**  
A: No. The app shows YOU information about the internet/network. It's transparent and non-invasive.

**Q: Does my data get uploaded anywhere?**  
A: Only third-party IP lookup services (IPInfo, IP-API, etc.) receive your IP address for geolocation. This is visible and documented.

**Q: Is this a security threat?**  
A: No. The app is a diagnostic tool. It doesn't provide access to files, passwords, or other devices' content. Rate limiting prevents abuse.

**Q: Can I use this behind a VPN?**  
A: Yes! The app shows if your DNS/WebRTC is leaking outside the VPN (privacy test).

**Q: Why are some features disabled?**  
A: Traceroute and Connection Info are disabled by default because they require `TRACEROUTE_ENABLED` or `CONN_INFO_ENABLED` environment flags. Admins can enable them if needed.

---

## 📚 Learn More

- **Source Code**: See exactly what the app does on GitHub
- **HOW_IT_WORKS.md**: Technical documentation
- **DEPLOYMENT.md**: Setup and configuration guide
- **ADMIN_DASHBOARD.md**: Admin features and monitoring

---

**Remember**: This tool is about transparency, not secrecy. Use it responsibly to diagnose, learn, and improve your network! 🚀
