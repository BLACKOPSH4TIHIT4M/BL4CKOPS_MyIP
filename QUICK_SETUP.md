# 🚀 QUICK START - ADMIN SECURITY SETUP

## 3 Steps to Get Started

### Step 1️⃣ - Setup Admin Password (REQUIRED FIRST)

```bash
npm run setup
```

This interactive script will:
- Ask you to create an admin password (min 8 chars)
- Password must have: uppercase, lowercase, numbers
- Confirm password
- Auto-generate security keys
- Save everything securely to `.env`

**Example:**
```
✓ Enter password: MyAdmin@2025
✓ Confirm:       MyAdmin@2025
✓ Saved to .env
```

---

### Step 2️⃣ - Start Application

```bash
npm start
```

Opens:
- Frontend: `http://localhost:18966`
- Backend: `http://localhost:11966`

---

### Step 3️⃣ - Login to Admin Panel

1. Open app: `http://localhost:18966`
2. Find **Advanced Tools** section
3. Click **Admin Login** button
4. Enter password from Step 1
5. Now you can access:
   - ✅ Traceroute Tool
   - ✅ Connection Info
   - ✅ Other admin features

---

## 🔐 What You Just Setup

| Feature | What it Does |
|---------|-------------|
| **Admin Password** | Protects advanced network tools |
| **Password Hash** | Your password stored securely (can't be reversed) |
| **JWT Token** | Auto-generated on login, expires 24h |
| **Encryption Keys** | Protect sensitive data in transit |
| **Code Obfuscation** | Backend code protected from reverse-engineering |

---

## ✅ You're Done!

Your BL4CKOPS application is now:
- 🔒 Secure
- 🎯 Protected
- 🚀 Ready to use

**Next:** Check `ADMIN_SETUP.md` for advanced configuration.

---

## 💡 Quick Tips

**Forgot password?**
```bash
npm run setup
```
Just run it again and create a new password!

**For production:**
```bash
npm run build:prod
```
This builds AND obfuscates your code!

**See all security details:**
Check `SECURITY_IMPLEMENTATION.md`

---

**That's it! Enjoy your secure IP reconnaissance tool! 🎉**
