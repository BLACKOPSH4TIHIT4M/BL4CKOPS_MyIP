# 🚀 BL4CKOPS IP Reconnaissance Tool - Deployment Guide

**Status**: Production Ready  
**Version**: 5.0.0  
**Author**: H4TIHIT4M  
**Part of**: BL4CKOPS_OSINT Project  

---

## 📋 Daftar Isi

1. [Quick Start](#quick-start)
2. [Network Configuration](#network-configuration)
3. [Docker Deployment](#docker-deployment)
4. [Production Setup](#production-setup)
5. [Troubleshooting](#troubleshooting)

---

## 🚀 Quick Start

### Option 1: Local Development
```bash
# Clone & Setup
git clone https://github.com/BLACKOPSH4TIHIT4M/BL4CKOPS_MyIP.git
cd BL4CKOPS_MyIP

# Install & Run
npm install
npm run dev
```

**Akses**: http://localhost:18966 (Frontend) & http://localhost:5173 (Vite dev server)

### Option 2: Production Build
```bash
# Build
npm run build

# Start services
npm start
```

**Akses**: http://localhost:18966

---

## 🌐 Network Configuration

### Akses dari Network yang Sama

**Dapatkan IP lokal:**
```bash
# Linux/Mac
hostname -I

# Windows
ipconfig
```

**Akses dari device lain:**
```
http://[IP_ANDA]:18966
```

### Konfigurasi .env untuk Network

Edit `.env`:
```env
# Allow specific networks
ALLOWED_DOMAINS="localhost,127.0.0.1,your-lan-hostname,YOUR_SERVER_IP"
Note: `ALLOWED_DOMAINS` must be a comma-separated string of allowed hostnames or IP addresses (no spaces). For example:
```env
ALLOWED_DOMAINS=localhost,127.0.0.1,YOUR_SERVER_IP,mycompany.local
```
This value is used by the backend to validate `Referer` or `Host` headers. If you access from a device on the LAN, add the server IP or the reverse-proxy host so the requests pass validation.

# Backend/Frontend ports
BACKEND_PORT=11966
FRONTEND_PORT=18966
```

### Keamanan Network (IMPORTANT)

⚠️ **Jangan expose ke internet tanpa proteksi!**

Gunakan:
- **Firewall**: Batasi akses ke IP tertentu
- **VPN**: Akses hanya via VPN
- **Reverse Proxy**: Nginx/Apache dengan authentication
- **SSL/TLS**: Gunakan HTTPS

### Optional Features (Production-safe toggles)

Some diagnostic features are intentionally disabled by default for production deployments. Enable only when you trust the environment - they can leak network topology or runtime process details.

```env
# Admin monitor (local-only, opt-in)
ADMIN_MONITOR_ENABLED=false
# Connection info (listening sockets, established connections)
CONN_INFO_ENABLED=false
# Traceroute (runs system traceroute/tracert)
TRACEROUTE_ENABLED=false
```
### Rate Limits for diagnostic endpoints

To avoid abuse, the app limits requests to sensitive endpoints by IP. The defaults are:
- `TRACEROUTE` (server traceroute): 3 requests per minute per IP
- `CONN_INFO` (connection inspection): 6 requests per minute per IP

You can adjust the global rate-limiter through `SECURITY_RATE_LIMIT` which applies across `/api` endpoints.


Additional toggles:
```env
# Force local-only for these features (default true)
CONN_INFO_LOCAL_ONLY=true
TRACEROUTE_LOCAL_ONLY=true
``` 

---

## 🐳 Docker Deployment

### Build Image
```bash
docker build -t bl4ckops-ip-tool:5.0.0 .
```

### Run Container (Single)
```bash
docker run -d \
  -p 18966:18966 \
  -p 11966:11966 \
  -e BACKEND_PORT=11966 \
  -e FRONTEND_PORT=18966 \
  -e ALLOWED_DOMAINS="localhost,0.0.0.0" \
  --name bl4ckops-ip-prod \
  --restart unless-stopped \
  bl4ckops-ip-tool:5.0.0
```

### Using Docker Compose (Recommended)
```bash
# Production deployment
docker-compose -f docker-compose.yml up -d

# Check logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Verify Container
```bash
# Check status
docker ps | grep bl4ckops-ip

# View logs
docker logs bl4ckops-ip-prod

# Test connectivity
curl http://localhost:18966
```

---

## 🏢 Production Setup

### 1. System Requirements
- **OS**: Linux (Ubuntu 20.04+), macOS, or Windows Server 2019+
- **Runtime**: Node.js 18+ LTS
- **RAM**: Minimum 512MB, recommended 1GB+
- **Disk**: 2GB minimum (after npm install)
- **Network**: Ports 11966 & 18966 available

### 2. Install Node.js
```bash
# Ubuntu/Debian
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# macOS
brew install node@18

# Verify
node --version  # v18.x.x
npm --version   # 9.x.x
```

### 3. Setup Service (Systemd)

Create `/etc/systemd/system/bl4ckops-ip.service`:
```ini
[Unit]
Description=BL4CKOPS IP Reconnaissance Tool
After=network.target

[Service]
Type=simple
User=bl4ckops
WorkingDirectory=/opt/bl4ckops-ip-tool
Environment="NODE_ENV=production"
Environment="BACKEND_PORT=11966"
Environment="FRONTEND_PORT=18966"
ExecStart=/usr/bin/npm start
Restart=on-failure
RestartSec=10

[Install]
WantedBy=multi-user.target
```

### 4. Enable & Start Service
```bash
sudo systemctl daemon-reload
sudo systemctl enable bl4ckops-ip
sudo systemctl start bl4ckops-ip

# Check status
sudo systemctl status bl4ckops-ip

# View logs
sudo journalctl -u bl4ckops-ip -f
```

### 5. Reverse Proxy (Nginx)

Create `/etc/nginx/sites-available/bl4ckops-ip`:
```nginx
upstream bl4ckops_backend {
    server localhost:11966;
}

upstream bl4ckops_frontend {
    server localhost:18966;
}

server {
    listen 80;
    server_name your-domain.com;
    
    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com;
    
    # SSL certificates (use Let's Encrypt)
    ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;
    
    # Security headers
    add_header Strict-Transport-Security "max-age=31536000" always;
    add_header X-Content-Type-Options "nosniff" always;
    
    # Frontend
    location / {
        proxy_pass http://bl4ckops_frontend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
    
    # Backend API
    location /api/ {
        proxy_pass http://bl4ckops_backend/api/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # Timeouts for long-running requests
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }
}
```

Enable Nginx site:
```bash
sudo ln -s /etc/nginx/sites-available/bl4ckops-ip /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### 6. SSL/TLS (Let's Encrypt)
```bash
# Install Certbot
sudo apt-get install certbot python3-certbot-nginx

# Get certificate
sudo certbot certonly --nginx -d your-domain.com

# Auto-renewal
sudo systemctl enable certbot.timer
```

---

## 🔄 Integration dengan BL4CKOPS_OSINT

### Repository Structure
```
BL4CKOPS_REVEALED/
├── bl4ckops_osint.py         # Main OSINT tool
├── cli_runner.py             # CLI runner
├── manage_secrets.py         # Secrets manager
├── BL4CKOPS-MyIP/            # IP Reconnaissance (this module)
│   ├── frontend/
│   ├── api/
│   ├── backend-server.js
│   ├── package.json
│   └── README.md
├── deploy/                   # Deployment templates
├── docs/                     # Documentation
└── README.md
```

### Using as Module
```javascript
// In other BL4CKOPS services
import { getIPInfo } from './BL4CKOPS-MyIP/api/get-user-info.js';

const ipData = await getIPInfo('1.2.3.4');
```

---

## 🧪 Testing

### Development Testing
```bash
npm run build      # Build frontend
npm run preview    # Preview build
```

### Network Testing
```bash
# From another machine on same network
curl http://[IP]:18966

# Test API
curl http://[IP]:11966/api/ip-info
```

### Load Testing
```bash
# Install ab (Apache Bench)
ab -n 1000 -c 10 http://localhost:18966/

# Or use wrk
wrk -t4 -c100 -d30s http://localhost:18966/
```

---

## 🔐 Security Best Practices

### 1. Firewall
```bash
# Allow specific IPs only
sudo ufw allow from YOUR_LAN_SUBNET to any port 18966
sudo ufw allow from YOUR_LAN_SUBNET to any port 11966
```

### 2. Rate Limiting
Enable di `.env`:
```env
SECURITY_RATE_LIMIT=100         # 100 requests per 60 minutes
SECURITY_DELAY_AFTER=10         # Delay after 10 requests per 20 min
```

### 3. API Keys
```bash
# Never commit API keys!
# Store in .env locally only
GOOGLE_MAP_API_KEY="xxx"
IPINFO_API_TOKEN="yyy"
```

### 4. Monitoring
```bash
# Monitor process
pm2 install pm2-auto-pull
pm2 monit
```

---

## ❌ Troubleshooting

### Port Already in Use
```bash
# Find process using port
lsof -i :18966
lsof -i :11966

# Kill process
kill -9 <PID>

# Or use different ports in .env
BACKEND_PORT=12000
FRONTEND_PORT=19000
```

### Cannot Access from Network
```bash
# 1. Check firewall
sudo ufw status

# 2. Check service status
sudo systemctl status bl4ckops-ip

# 3. Verify port binding
netstat -tlnp | grep 18966

# 4. Test from local first
curl http://localhost:18966
```

### High Memory Usage
```bash
# Check memory
ps aux | grep node

# Set NODE memory limit
export NODE_OPTIONS="--max-old-space-size=512"
npm start
```

### Build Fails
```bash
# Clear cache
rm -rf node_modules dist package-lock.json

# Rebuild
npm install
npm run build
```

---

## 📞 Support & Contact

- 🐛 **Issues**: https://github.com/BLACKOPSH4TIHIT4M/BL4CKOPS_REVEALED/issues
- 💬 **Discussions**: GitHub Discussions
- 📧 **Contact**: H4TIHIT4M (GitHub)

---

## 📝 Version History

**v5.0.0** (2025-11-27)
- ✅ Rebranded to BL4CKOPS
- ✅ Added Indonesia flag branding
- ✅ Updated documentation to Indonesian
- ✅ Production-ready deployment
- ✅ Network configuration support

---

## ⚖️ License & Disclaimer

Part of **BL4CKOPS_OSINT** Project  
Created by **H4TIHIT4M**  
License: See LICENSE file

**DISCLAIMER**: This tool is for authorized security research only. Unauthorized access to systems is illegal. Users are responsible for compliance with local laws.

---

**Last Updated**: November 27, 2025  
**Status**: 🟢 Production Ready  
**Support**: Active
