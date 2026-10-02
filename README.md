# SkillSync AI

An AI-powered interview preparation platform. Track DSA problems, assessments and mock interviews, see your progress in analytics, and ask an AI assistant (Google Gemini) for help.

## Features

- Register / login with JWT authentication (BCrypt-hashed passwords)
- **DSA Tracker**: log problems by topic, difficulty and status
- **Assessments**: record scores and see your average percentage
- **Interviews**: track companies, roles, status, feedback and ratings
- **Dashboard & Analytics**: charts of your progress
- **AI Assistant**: chat powered by Gemini
- Every user only sees and edits their own data

## Tech stack

| Layer    | Tech                                                      |
|----------|-----------------------------------------------------------|
| Frontend | React, Vite, React Router, Axios, Chart.js                |
| Backend  | Java 21, Spring Boot 3.5, Spring Security, JPA, JJWT      |
| Database | MySQL                                                     |
| AI       | Google Gemini API                                         |

## Project structure

```
SkillSync/
├── Backend/backend/   Spring Boot REST API (port 8080)
└── Frontend/          React + Vite app (port 5173)
```

## Getting started

### Prerequisites

- Java 21+
- Node.js 20+
- MySQL 8+

### 1. Database

```sql
CREATE DATABASE skillsync;
```

Tables are created automatically on first run.

### 2. Backend

```bash
cd Backend/backend
cp .env.example .env      # Windows: copy .env.example .env
```

Edit `.env` and set your MySQL password, a [Gemini API key](https://aistudio.google.com/apikey) and a random `JWT_SECRET` (32+ characters). Then:

```bash
./mvnw spring-boot:run    # Windows: .\mvnw.cmd spring-boot:run
```

The API runs at http://localhost:8080.

### 3. Frontend

```bash
cd Frontend
npm install
npm run dev
```

Open http://localhost:5173 and register an account.

## API overview

All endpoints except register/login require an `Authorization: Bearer <token>` header.

| Method | Endpoint                        | Description               |
|--------|---------------------------------|---------------------------|
| POST   | `/api/users/register`           | Create an account         |
| POST   | `/api/users/login`              | Get a JWT                 |
| GET/POST | `/api/problems`               | List / add DSA problems   |
| PUT/DELETE | `/api/problems/{id}`        | Update / delete a problem |
| GET/POST | `/api/assessments`            | List / add assessments    |
| GET/POST | `/api/interviews`             | List / add interviews     |
| GET    | `/api/{problems,assessments,interviews}/stats` | Your statistics |
| GET    | `/api/dashboard/{email}`        | Dashboard totals          |
| GET/PUT | `/api/profile/{email}`         | View / update profile     |
| POST   | `/api/ai/chat`                  | Ask the AI assistant      |
