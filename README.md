# ProfoliX — Interactive Mobile Resume App 📱

A full-stack **interactive mobile resume application** built with React Native Expo (frontend) and Spring Boot (backend). Features a sleek dark glassmorphism UI with smooth animations.

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React Native, Expo SDK 54, TypeScript |
| **Backend** | Spring Boot 3.2, Java, Maven |
| **Database** | SQLite |
| **Design** | Dark theme, Glassmorphism, LinearGradient |

## 📱 Screens

- **Profile** — Hero section with animated stats, bio, education, achievements
- **Experience** — Timeline view with expandable detail modals
- **Skills** — Category tabs with animated progress bars
- **Projects** — Featured carousel + detail modals with GitHub links
- **Contact** — One-tap actions (call, email, LinkedIn, GitHub, portfolio)

## 🚀 Getting Started

### Prerequisites

- **Java 17+** (tested with Java 24)
- **Node.js 18+**
- **Expo Go** app on your phone (SDK 54)

### 1. Start Backend

```bash
cd backend

# Delete old DB to re-seed (optional)
del resume.db

# Build and run (Windows)
%USERPROFILE%\.m2\wrapper\dists\apache-maven-3.9.6\bin\mvn.cmd clean spring-boot:run
```

Backend runs at `http://localhost:8080`

### 2. Start Frontend

```bash
cd frontend
npm install
npx expo start --clear
```

Scan the QR code with **Expo Go** on your phone.

### 3. Update API URL

Edit `frontend/services/api.ts` and set `API_BASE_URL` to your machine's local IP:

```typescript
const API_BASE_URL = 'http://<YOUR_LOCAL_IP>:8080/api';
```

> Both phone and PC must be on the **same WiFi network**.

## 📡 API Endpoints

| Endpoint | Description |
|---|---|
| `GET /api/profile` | Profile info |
| `GET /api/experiences` | Work experience list |
| `GET /api/skills` | All skills |
| `GET /api/skills/categories` | Skills grouped by category |
| `GET /api/projects` | All projects |
| `GET /api/education` | Education history |
| `GET /api/achievements` | Certifications & achievements |

## 📁 Project Structure

```
NewMobileApp/
├── backend/                    # Spring Boot API
│   ├── src/main/java/com/profolix/resume/
│   │   ├── model/              # JPA Entities
│   │   ├── repository/         # Data repositories
│   │   ├── service/            # Business logic
│   │   ├── controller/         # REST endpoints
│   │   └── config/             # CORS + DataSeeder
│   └── pom.xml
├── frontend/                   # React Native Expo
│   ├── app/(tabs)/             # 5 tab screens
│   ├── components/             # Reusable UI components
│   ├── constants/theme.ts      # Design system
│   ├── services/api.ts         # API client
│   └── package.json
└── README.md
```

## ✏️ Customization

Edit `backend/src/main/java/.../config/DataSeeder.java` to update your resume data, then delete `resume.db` and restart the backend.

## 📄 License

MIT
