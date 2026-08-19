# DevTrack 🚀

A full-stack job application tracker built to help developers manage their job search pipeline. Track applications, move them through a Kanban board, and visualise your progress with charts.

**Live Demo:** [devtrack-five-lake.vercel.app](https://devtrack-five-lake.vercel.app)

![DevTrack Dashboard](https://imgur.com/a/kUizVaR, https://imgur.com/a/EO6t8vC)

---

## Features

- 🔐 **Authentication** — Secure register and login with JWT
- 📋 **Application Tracking** — Add, edit and delete job applications
- 🗂️ **Kanban Board** — Drag and drop applications between stages
- 📊 **Stats Dashboard** — Visualise your pipeline with charts
- 📱 **Mobile Responsive** — Works on all screen sizes
- 🔒 **Secure** — HTTPS, bcrypt password hashing, protected routes

---

## Tech Stack

### Frontend
- React 18 + TypeScript
- Tailwind CSS
- Recharts (data visualisation)
- @hello-pangea/dnd (drag and drop)
- Lucide React (icons)
- Axios
- React Router v6

### Backend
- Node.js + Express + TypeScript
- PostgreSQL + Prisma ORM
- JWT Authentication
- bcrypt password hashing
- Zod validation
- Nginx reverse proxy

### DevOps
- AWS EC2 (backend hosting)
- Vercel (frontend hosting)
- Docker + Docker Compose (local development)
- GitHub Actions (CI/CD pipeline)
- Let's Encrypt SSL (HTTPS)
- PM2 (process management)

---

## Architecture

```
┌─────────────────────────────────────┐
│         React + TypeScript          │
│         (Vercel — HTTPS)            │
└──────────────┬──────────────────────┘
               │ HTTPS requests
┌──────────────▼──────────────────────┐
│      Node.js + Express + Nginx      │
│         (AWS EC2 — HTTPS)           │
└──────────────┬──────────────────────┘
               │ Prisma ORM
┌──────────────▼──────────────────────┐
│           PostgreSQL                │
│         (AWS EC2)                   │
└─────────────────────────────────────┘
```

---

## Getting Started

### Prerequisites
- Node.js 20+
- Docker Desktop
- Git

### Local Development

**1. Clone the repo**
```bash
git clone https://github.com/Selfmade20/devtrack.git
cd devtrack
```

**2. Start the database**
```bash
docker-compose up -d
```

**3. Set up the backend**
```bash
cd backend
npm install
cp .env.example .env
# Fill in your .env values
npx prisma migrate dev
npm run dev
```

**4. Set up the frontend**
```bash
cd frontend
npm install
cp .env.example .env
# Fill in your .env values
npm run dev
```

**5. Open the app**
```
Frontend: http://localhost:5173
Backend:  http://localhost:5000/health
```

---

## Environment Variables

### Backend `.env`
```env
PORT=5000
DATABASE_URL=postgresql://USER:PASSWORD@localhost:5432/devtrack
JWT_SECRET=your_jwt_secret
NODE_ENV=development
```

### Frontend `.env`
```env
VITE_API_URL=http://localhost:5000/api
```

---

## CI/CD Pipeline

Every push to `main` automatically:
1. SSHs into the EC2 server
2. Pulls latest code from GitHub
3. Installs dependencies
4. Builds TypeScript
5. Restarts the backend via PM2

---

## API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login and get JWT token |

### Applications
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/applications` | Get all applications |
| POST | `/api/applications` | Create an application |
| PATCH | `/api/applications/:id` | Update an application |
| DELETE | `/api/applications/:id` | Delete an application |

---

## Author

**Tebogo Selamolela**
- GitHub: [@Selfmade20](https://github.com/Selfmade20)
- LinkedIn: [www.linkedin.com/in/tebogo-selamolela-a86090159]

---

## License

MIT