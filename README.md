# Malifax Technologies - Full Stack Application

Complete self-hosted web application with Docker - Frontend, Backend, and Database all running locally.

---

## 🎯 Quick Start

```bash
# 1. Copy environment file (optional - uses defaults if skipped)
cp .env.example .env

# 2. Edit .env to customize ports (optional)
# nano .env

# 3. Start everything
docker-compose up -d

# 4. Seed database with default data (first time only)
./docker.sh  # Select option 8

# 5. Access application
open http://localhost:3080

# 6. Login to admin panel
Username: admin
Password: admin@123
```

**That's it!** 🎉

---

## 📦 What's Inside?

- **Frontend**: Next.js 15 + React 19 + TailwindCSS
- **Backend**: Express + TypeScript + JWT Auth
- **Database**: MongoDB 7
- **Deployment**: 100% Docker (no cloud dependencies)

---

## 🏗️ Architecture

```
┌─────────────────────────────────────┐
│         Docker Stack                │
│                                     │
│  Frontend (Next.js)  :3000         │
│       ↓                            │
│  Backend (Express)   :4000         │
│       ↓                            │
│  MongoDB             :27017        │
│       ↓                            │
│  Docker Volume (Data Persistence)  │
└─────────────────────────────────────┘
```

**All running locally** - No external services required!

---

## 🚀 Documentation

| Document | Description |
|----------|-------------|
| [QUICK-START.md](QUICK-START.md) | Get started in 1 minute |
| [DOCKER-SETUP.md](DOCKER-SETUP.md) | Complete Docker guide |
| [ARCHITECTURE.md](ARCHITECTURE.md) | System architecture |
| [API-CONFIG-GUIDE.md](API-CONFIG-GUIDE.md) | API configuration |
| [DEPLOYMENT-NOTES.md](DEPLOYMENT-NOTES.md) | Production deployment |
| [CONFIGURATION-SUMMARY.md](CONFIGURATION-SUMMARY.md) | Configuration overview |

---

## 🔧 Development

### With Docker (Recommended)
```bash
docker-compose up -d
docker-compose logs -f
```

### Without Docker
```bash
# Terminal 1: MongoDB (still use Docker for this)
docker-compose up -d mongodb

# Terminal 2: Backend
cd malifax-api
npm install
npm run dev

# Terminal 3: Frontend
cd malifax
npm install
npm run dev
```

---

## 📊 Services

| Service | Default Port | Configurable Via | URL |
|---------|--------------|------------------|-----|
| Frontend | 3080 | `FRONTEND_PORT` | http://localhost:3080 |
| Backend | 4200 | `BACKEND_PORT` | http://localhost:4200 |
| MongoDB | 27018 | `MONGO_PORT` | mongodb://localhost:27018 |

**Port Configuration:** Edit `.env` file to change ports (see `.env.example`)

---

## ⚙️ Configuration

### Environment Variables

All configuration is done via `.env` file:

```bash
# Copy example file
cp .env.example .env

# Edit configuration
nano .env
```

**Available variables:**
- `FRONTEND_PORT` - Frontend exposed port (default: 3080, avoids conflict with port 3000)
- `BACKEND_PORT` - Backend API exposed port (default: 4200, avoids conflict with port 4000)
- `MONGO_PORT` - MongoDB exposed port (default: 27018, avoids conflict with port 27017)
- `MONGO_USER` - MongoDB username (default: admin)
- `MONGO_PASSWORD` - MongoDB password (default: admin123)
- `MONGO_DB` - MongoDB database name (default: malifax)
- `JWT_SECRET` - JWT secret key for authentication
- `NEXT_PUBLIC_API_URL` - Backend API URL for frontend

### Example: Change Ports to Avoid Conflicts

```bash
# .env file
FRONTEND_PORT=8080
BACKEND_PORT=8081
MONGO_PORT=27018
```

Then access: `http://localhost:8080`

---

## 🔐 Security

- **JWT Authentication** for admin access
- **MongoDB credentials** configurable via docker-compose.yml
- **Environment variables** for sensitive data
- **Docker network isolation** for internal services

**Important**: Change default passwords before production deployment!

---

## 💾 Data Persistence

All data is stored in Docker volumes:
- **mongodb_data**: Database persistence
- Survives container restarts
- Can be backed up/restored

---

## 🛠️ Common Commands

```bash
# Start
docker-compose up -d

# Stop
docker-compose down

# View logs
docker-compose logs -f

# Rebuild
docker-compose up -d --build

# Check status
docker-compose ps

# Reset everything (including database)
docker-compose down -v
docker-compose up -d
```

---

## 📈 Features

### Frontend
- ✅ Responsive design (mobile + desktop)
- ✅ Modern UI with TailwindCSS
- ✅ Animations with Framer Motion
- ✅ Static generation for performance
- ✅ Admin panel for content management

### Backend
- ✅ RESTful API
- ✅ JWT authentication
- ✅ MongoDB integration
- ✅ CORS configuration
- ✅ Health checks
- ✅ Security headers (Helmet.js)

### Database
- ✅ MongoDB 7
- ✅ Persistent storage
- ✅ Automatic backups (configurable)
- ✅ Admin user creation

---

## 🌐 Production Deployment

Deploy on any server with Docker:

```bash
# On your VPS
git clone <repository>
cd malifax-web
docker-compose up -d
```

Optional: Setup nginx reverse proxy for custom domain.

See [DEPLOYMENT-NOTES.md](DEPLOYMENT-NOTES.md) for details.

---

## 🔄 Updates

```bash
git pull
docker-compose up -d --build
```

---

## 📝 Tech Stack

**Frontend:**
- Next.js 15.5.9
- React 19.1.0
- TypeScript 5
- TailwindCSS 4
- Framer Motion

**Backend:**
- Node.js 20
- Express 5
- TypeScript 5
- MongoDB with Mongoose
- JWT Authentication
- Bcrypt for passwords

**Infrastructure:**
- Docker & Docker Compose
- MongoDB 7
- Nginx (optional, for production)

---

## ⚠️ Important Notes

1. **Change default credentials** before production
2. **Set strong JWT_SECRET** in production
3. **Backup MongoDB data** regularly
4. **Don't expose MongoDB port** to internet
5. **Use HTTPS** in production

---

## 🆘 Troubleshooting

### Containers won't start
```bash
docker-compose logs <service-name>
```

### Database connection issues
```bash
docker exec -it malifax-mongodb mongosh -u admin -p admin123
```

### Port conflicts
```bash
# Check what's using the port
lsof -i :3080
lsof -i :4200

# Solution 1: Use default ports (already avoids common conflicts)
# Defaults: Frontend=3080, Backend=4200, MongoDB=27018

# Solution 2: Change ports in .env file if still conflicts
cp .env.example .env
nano .env
# Edit FRONTEND_PORT, BACKEND_PORT, MONGO_PORT
docker-compose up -d
```

More troubleshooting: [DOCKER-SETUP.md](DOCKER-SETUP.md#-troubleshooting)

---

## 🤝 Contributing

This is a private project, but improvements are welcome.

---

## 📄 License

Private - All rights reserved.

---

## 📞 Support

For issues or questions, check the documentation files or create an issue.

---

## ✨ Key Highlights

- 🐳 **100% Docker-based** - No cloud dependencies
- 🔒 **Self-hosted** - Full control over your data
- 📦 **All-in-one** - Frontend, Backend, Database included
- 🚀 **Easy deployment** - One command to start
- 💰 **Zero cloud costs** - Everything runs locally
- 🔧 **Production ready** - With proper security & persistence

---

**Start building with `docker-compose up -d` 🚀**
