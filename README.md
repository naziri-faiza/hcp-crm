# AI-First CRM — HCP Interaction Module

An enterprise-grade CRM module for logging Healthcare Professional (HCP) interactions, powered by an AI assistant.

## Tech Stack

### Frontend
- **React.js** (Vite)
- **Redux Toolkit** — State management
- **React Router** — Client-side routing
- **Material UI** — Component library
- **Google Inter Font** — Typography
- **Axios** — HTTP client

### Backend
- **FastAPI** — API framework
- **SQLAlchemy** — ORM
- **PostgreSQL** — Database
- **Pydantic** — Data validation
- **Alembic** — Database migrations

### AI (Planned)
- **LangGraph** — Agent orchestration
- **Groq API** — LLM inference
- **Default Model:** gemma2-9b-it
- **Fallback Model:** llama-3.3-70b-versatile

---

## Project Structure

```
AI-First_CRM/
├── frontend/                  # React Vite application
│   ├── src/
│   │   ├── api/               # Axios client & API services
│   │   ├── app/               # Redux store & MUI theme
│   │   ├── assets/            # Static assets
│   │   ├── components/
│   │   │   ├── Chat/          # AI assistant chat components
│   │   │   ├── Common/        # Shared/reusable components
│   │   │   ├── Form/          # Interaction form components
│   │   │   └── Layout/        # Layout & header components
│   │   ├── features/          # Redux slices
│   │   ├── hooks/             # Custom React hooks
│   │   ├── pages/             # Page-level components
│   │   ├── routes/            # React Router configuration
│   │   └── utils/             # Utility functions & constants
│   └── index.html
│
└── backend/                   # FastAPI application
    ├── app/
    │   ├── ai/                # LangGraph & Groq integration
    │   ├── api/               # API route handlers
    │   ├── config/            # Application settings
    │   ├── core/              # Shared utilities
    │   ├── database/          # SQLAlchemy session & base
    │   ├── models/            # ORM models
    │   ├── schemas/           # Pydantic schemas
    │   └── services/          # Business logic layer
    ├── requirements.txt
    └── .env.example
```

---

## Getting Started

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The app will be available at `http://localhost:5173`

### Backend

```bash
cd backend
pip install -r requirements.txt
cp .env.example .env  # Configure your database & API keys
uvicorn app.main:app --reload
```

The API will be available at `http://localhost:8000`
API docs at `http://localhost:8000/docs`

---

## Features

- **Interaction Form** — 19 fields covering HCP info, interaction details, content, assessment, and follow-up
- **AI Assistant Panel** — Chat interface with suggestion chips (AI integration pending)
- **Responsive Layout** — Desktop (65/35 split), Tablet (stacked), Mobile (accordion)
- **Dark Mode** — Theme toggle with light/dark support
- **Redux State** — Centralized state management for form, chat, and UI

---

## Status

✅ Project foundation complete
⏳ API implementation — pending
⏳ Database migrations — pending
⏳ AI integration (LangGraph + Groq) — pending
⏳ Form validation & submission — pending
