# API Documentation

## Authentication Endpoints

### Admin Login
```
POST /api/admin/login
Content-Type: application/json

{
  "password": "YourAdminPassword"
}

Response (200):
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "expiresIn": 86400
}
```

## IP Information Endpoints

### Multi-Source IP Lookup
```
GET /api/ipchecking?ip=1.1.1.1&lang=en
GET /api/ipinfo?ip=1.1.1.1
GET /api/ipapi?ip=1.1.1.1
GET /api/ip2location?ip=1.1.1.1
GET /api/ip-sb?ip=1.1.1.1
GET /api/maxmind?ip=1.1.1.1

Response (200):
{
  "ip": "1.1.1.1",
  "country": "United States",
  "country_code": "US",
  "region": "California",
  "city": "Los Angeles",
  "latitude": 34.0522,
  "longitude": -118.2437,
  "asn": "AS13335",
  "organization": "Cloudflare",
  "isp": "Cloudflare Inc.",
  "timezone": "America/Los_Angeles",
  "accuracy_radius": 1000
}
```

## Network Diagnostics Endpoints

### Traceroute (Admin Only)
```
GET /api/traceroute?ip=8.8.8.8
Authorization: Bearer <admin_token>

Rate Limit: 3 requests per minute

Response (200):
{
  "ip": "8.8.8.8",
  "hops": [
    {
      "hop": 1,
      "ip": "192.XXX.XXX.1",
      "hostname": "router.local",
      "rtt": [0.5, 0.4, 0.45]
    },
    {
      "hop": 2,
      "ip": "203.0.113.1",
      "hostname": "isp-gw.example.com",
      "rtt": [5.2, 5.1, 5.3]
    }
  ],
  "status": "success"
}
```

### Connection Info (Admin Only)
```
GET /api/conn-info
Authorization: Bearer <admin_token>

Rate Limit: 6 requests per minute

Response (200):
{
  "tcp_connections": 25,
  "udp_connections": 8,
  "established": 15,
  "listening": 10,
  "arp_neighbors": [
    {
      "ip": "192.XXX.XXX.2",
      "mac": "aa:bb:cc:dd:ee:ff",
      "interface": "eth0",
      "state": "REACHABLE"
    }
  ],
  "timestamp": "2025-11-29T12:43:00Z"
}
```

### Access Info
```
GET /api/access-info

Response (200):
{
  "local_ip": "192.XXX.XXX.100",
  "public_ip": "203.0.113.45",
  "access_urls": [
    "http://192.XXX.XXX.100:18966",
    "http://bl4ckops.local:18966",
    "http://203.0.113.45:18966"
  ],
  "interfaces": {
    "eth0": {
      "ipv4": "192.XXX.XXX.100",
      "ipv6": "fe80::1",
      "mac": "aa:bb:cc:dd:ee:ff"
    }
  }
}
```

## Security Testing Endpoints

### DNS Leak Test
```
GET /api/dns-leak-test

Response (200):
{
  "dns_servers": [
    "8.8.8.8",
    "8.8.4.4"
  ],
  "leaked": false,
  "leaked_ips": []
}
```

### WebRTC Leak Test
```
GET /api/webrtc-test

Response (200):
{
  "local_ips": ["192.XXX.XXX.100"],
  "public_ips": ["203.0.113.45"],
  "leaked": false
}
```

## Speed Test Endpoints

### Start Speed Test
```
GET /api/speedtest/init

Response (200):
{
  "server": {
    "id": 1234,
    "name": "Jakarta, Indonesia",
    "sponsor": "ISP Name",
    "url": "https://speedtest.example.com",
    "lat": -6.2088,
    "lon": 106.8456
  },
  "client": {
    "ip": "203.0.113.45",
    "lat": -6.2000,
    "lon": 106.8000,
    "isp": "ISP Name"
  }
}
```

### Speedtest Results
```
GET /api/speedtest?server=1234

Response (200):
{
  "download": {
    "speed": 450.5,
    "unit": "Mbps"
  },
  "upload": {
    "speed": 45.2,
    "unit": "Mbps"
  },
  "ping": {
    "latency": 12.5,
    "unit": "ms"
  },
  "timestamp": "2025-11-29T12:43:00Z"
}
```

## Error Responses

### 400 - Bad Request
```json
{
  "error": "Invalid IP address",
  "code": "INVALID_IP"
}
```

### 403 - Forbidden
```json
{
  "error": "Access denied",
  "code": "ACCESS_DENIED"
}
```

### 429 - Too Many Requests
```json
{
  "error": "Rate limit exceeded",
  "code": "RATE_LIMIT",
  "retry_after": 60
}
```

### 500 - Server Error
```json
{
  "error": "Internal server error",
  "code": "SERVER_ERROR"
}
```

## Rate Limiting

| Endpoint | Limit | Window |
|----------|-------|--------|
| `/api/traceroute` | 3 | 1 minute |
| `/api/conn-info` | 6 | 1 minute |
| `/api/speedtest` | 2 | 5 minutes |
| Other endpoints | 100 | 15 minutes |

## Security Headers

All responses include:
```
X-Content-Type-Options: nosniff
X-Frame-Options: SAMEORIGIN
X-XSS-Protection: 1; mode=block
Content-Security-Policy: default-src 'self'
```

## CORS Configuration

Allowed origins configured via `CORS_ALLOWED_ORIGINS` environment variable.

Example:
```
CORS_ALLOWED_ORIGINS=http://localhost:18966,https://example.com
```
