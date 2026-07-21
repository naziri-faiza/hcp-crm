# 🩺 AI-First CRM HCP Module

An enterprise-style AI-powered Customer Relationship Management (CRM) module designed for Healthcare Professionals (HCPs). The application enables medical representatives to log HCP interactions using natural language, while an AI Assistant automatically extracts structured information and populates the interaction form.

---

## 🚀 Project Overview

The AI-First CRM HCP Module combines modern full-stack development with Generative AI to streamline HCP interaction logging.
Users simply describe an interaction in natural language, and the AI Assistant extracts structured information such as HCP details, meeting topics, outcomes, follow-up actions, and more. The extracted data is automatically populated into the CRM form, where users can review, edit, and save the interaction to PostgreSQL.

---

# ✨ Key Features

- 🤖 AI-powered interaction logging
- 💬 AI Assistant chat interface
- 📝 Automatic form population
- ✏️ Manual editing after AI extraction
- 💾 Save interactions to PostgreSQL
- 🔍 Search existing interactions
- 📄 Interaction summarization
- 💡 AI-generated follow-up suggestions
- 📱 Responsive enterprise UI
- 🎨 Modern Material UI components
- 🔔 Toast notifications
- ⏳ AI loading spinner
- 🏷️ AI Filled badge for auto-populated fields

---

# 🛠 Tech Stack

## Frontend

- React.js
- Redux Toolkit
- Material UI
- Axios
- React Router

## Backend

- FastAPI
- SQLAlchemy
- Alembic
- Pydantic

## Database

- PostgreSQL

## AI

- LangGraph
- Groq API
- Gemma2-9B-IT
- Llama 3.3 70B (Fallback)

---

# 📁 Project Structure

```
AI-First_CRM
│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   ├── redux/
│   ├── services/
│   └── App.jsx
│
├── backend/
│   ├── app/
│   │   ├── api/
│   │   ├── models/
│   │   ├── schemas/
│   │   ├── services/
│   │   ├── langgraph/
│   │   └── main.py
│   │
│   ├── alembic/
│   ├── requirements.txt
│   └── .env.example
│
├── README.md
└── .gitignore
```

---

# 🤖 AI Workflow

```
User Prompt
      │
      ▼
AI Assistant Chat
      │
      ▼
LangGraph Workflow
      │
      ▼
Groq LLM
      │
      ▼
Structured JSON
      │
      ▼
Auto-fill CRM Form
      │
      ▼
User Review & Edit
      │
      ▼
Save to PostgreSQL
```

---

# 🧠 LangGraph Tools

The application implements five AI tools:

### 1. Log Interaction

Creates a structured HCP interaction from natural language.

---

### 2. Edit Interaction

Updates an existing interaction based on user input.

---

### 3. Search Interaction

Searches previous HCP interactions.

---

### 4. Generate Follow-up Suggestions

Provides AI-generated follow-up recommendations.

---

### 5. Summarize Interaction

Generates a concise summary of the interaction.

---

# 🗄 Database

PostgreSQL is used to store:

- HCP Details
- Hospital Information
- Meeting Information
- Discussion Topics
- Follow-up Actions
- AI Generated Summary

---

# 🔌 API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/interactions` | Create interaction |
| GET | `/interactions` | Get all interactions |
| PUT | `/interactions/{id}` | Update interaction |
| DELETE | `/interactions/{id}` | Delete interaction |
| POST | `/ai/chat` | AI interaction extraction |

---

# ⚙ Environment Variables

Create a `.env` file inside the backend directory.

```env
DATABASE_URL=postgresql://username:password@localhost:5432/hcp_crm

GROQ_API_KEY=your_groq_api_key

AI_MODEL_DEFAULT=gemma2-9b-it

AI_MODEL_FALLBACK=llama-3.3-70b-versatile
```

---

# ▶ Running the Project

## Backend

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

alembic upgrade head

uvicorn app.main:app --reload
```

Backend:

```
http://localhost:8000
```

Swagger:

```
http://localhost:8000/docs
```

---

## Frontend

```bash
cd frontend

npm install

npm run dev
```

Frontend:

```
http://localhost:5173
```

---

# 📸 Screenshots

Add screenshots here.

- Dashboard
- AI Assistant
- Interaction Form
- AI Auto Fill
- Search
- Summary
- PostgreSQL Data

---

# 🎯 Future Improvements

- Voice Input
- OCR Integration
- Calendar Integration
- Email Follow-up
- Analytics Dashboard
- Multi-language Support
- Authentication & Authorization

---

# 👩‍💻 Developed By

**Naziri Faiza**

MCA Graduate | Python Developer | AI Application Developer

Technologies:
React • FastAPI • PostgreSQL • LangGraph • Groq • Redux Toolkit • Material UI

---
