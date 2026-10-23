# 🩺 AI-First CRM — HCP Interaction Module

An AI-powered Customer Relationship Management module that helps medical representatives record Healthcare Professional (HCP) interactions using natural language. A LangGraph-powered AI assistant extracts structured information, populates the interaction form, and helps users manage interaction records efficiently.

## 🚀 Project Overview

AI-First CRM combines modern full-stack development with Generative AI to simplify healthcare interaction management.

Instead of filling every field manually, users can describe a meeting in natural language. The AI assistant extracts relevant details, suggests follow-up actions, and prepares structured data that users can review, edit, and save to PostgreSQL.

## ✨ Key Features

- 🤖 **AI-Powered Interaction Logging** — Extract structured details from natural-language input.
- 💬 **Conversational AI Assistant** — Interact with the CRM through chat.
- 📝 **Automatic Form Population** — Populate interaction fields from AI-extracted data.
- ✏️ **Editable AI Results** — Review and modify generated information before saving.
- 💾 **Interaction Management** — Create, retrieve, update, and delete interaction records.
- 🔍 **Interaction Search** — Find previously recorded interactions.
- 📄 **AI Summarization** — Generate concise interaction summaries.
- 💡 **Follow-up Suggestions** — Generate actionable next steps.
- 🔔 **User Feedback** — Toast notifications and loading indicators.
- 📱 **Responsive Interface** — A modern interface designed for convenient interaction management.

## 🛠️ Tech Stack

| Category | Technologies |
|---|---|
| Frontend | React.js, Redux Toolkit, Material UI, Axios, React Router |
| Backend | FastAPI, Python, SQLAlchemy, Pydantic |
| Database | PostgreSQL |
| Database Migrations | Alembic |
| AI Orchestration | LangGraph |
| LLM Provider | Groq API |
| Default AI Model | Gemma 2 9B IT |
| Fallback AI Model | Llama 3.3 70B Versatile |
| API Testing | Postman |
| Development Tools | Git, GitHub |

## 🧠 AI Workflow

```mermaid
flowchart TD
    A[User describes an HCP interaction] --> B[AI Assistant Chat]
    B --> C[LangGraph Workflow]
    C --> D[Groq LLM]
    D --> E[Structured Interaction Data]
    E --> F[Auto-populated CRM Form]
    F --> G[User Reviews and Edits]
    G --> H[FastAPI Backend]
    H --> I[(PostgreSQL Database)]
```

## 🤖 LangGraph AI Tools

The AI assistant supports five interaction-management capabilities:

1. **Log Interaction** — Extract details and prepare a structured interaction.
2. **Edit Interaction** — Modify interaction information based on user instructions.
3. **Search Interaction** — Find relevant existing interactions.
4. **Generate Follow-up Suggestions** — Recommend next steps based on interaction details.
5. **Summarize Interaction** — Produce a concise summary of an interaction.

## 🗄️ Database

PostgreSQL stores structured interaction records, including relevant information such as:

- Healthcare Professional details
- Hospital and meeting information
- Discussion topics and outcomes
- Follow-up actions
- AI-generated summaries

SQLAlchemy handles database operations, while Alembic manages schema migrations.

## 🔌 API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/interactions` | Create an interaction |
| GET | `/interactions` | Retrieve interactions |
| PUT | `/interactions/{id}` | Update an interaction |
| DELETE | `/interactions/{id}` | Delete an interaction |
| POST | `/ai/chat` | Process AI assistant messages |

Refer to the backend's API documentation for request formats, response schemas, and validation details.

## 📁 Project Structure

```text
AI-First_CRM/
├── frontend/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── redux/
│       ├── services/
│       └── App.jsx
├── backend/
│   ├── app/
│   │   ├── api/
│   │   ├── models/
│   │   ├── schemas/
│   │   ├── services/
│   │   ├── langgraph/
│   │   └── main.py
│   ├── alembic/
│   ├── requirements.txt
│   └── .env.example
├── README.md
└── .gitignore
```

*Directory names may vary depending on the actual repository structure.*

## ⚙️ Getting Started

### Prerequisites

- Python 3.10 or a compatible version specified by the project
- Node.js and npm
- PostgreSQL
- A Groq API key

### 1. Clone the repository

```bash
git clone https://github.com/naziri-faiza/hcp-crm.git
cd hcp-crm
```

### 2. Configure the backend

```bash
cd backend
python -m venv venv
```

On Windows:

```bash
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Create a `.env` file inside `backend/`:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/hcp_crm
GROQ_API_KEY=your_groq_api_key
AI_MODEL_DEFAULT=gemma2-9b-it
AI_MODEL_FALLBACK=llama-3.3-70b-versatile
```

Replace the database credentials and API key with your own values. Keep `.env` out of version control.

Run database migrations:

```bash
alembic upgrade head
```

Start the backend:

```bash
uvicorn app.main:app --reload
```

Backend: `http://localhost:8000`

API documentation: `http://localhost:8000/docs`

### 3. Configure the frontend

Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the local frontend URL printed by Vite in your terminal, typically `http://localhost:5173`.

## 📸 Screenshots

Add actual screenshots of the application here to demonstrate its interface and functionality.

Recommended screenshots:

- Dashboard
- AI Assistant chat
- Interaction form
- AI-populated fields
- Interaction search results
- Generated summary

Store screenshots in a directory such as `docs/screenshots/` and embed them using Markdown image links once the files exist.

## 🔮 Future Improvements

- Voice-based interaction logging
- OCR-assisted data extraction
- Calendar integration
- Email-based follow-up reminders
- Analytics and reporting dashboard
- Multilingual AI assistance
- Authentication and authorization enhancements

## 👩‍💻 Developed By

**Naziri Faiza**

MCA Graduate | Full Stack Developer | AI Application Developer

**Technologies:** React.js · FastAPI · PostgreSQL · LangGraph · Groq · Redux Toolkit

[GitHub](https://github.com/naziri-faiza) · [LinkedIn](https://www.linkedin.com/in/faiza-sadaf-iftekhar-ahmed-43a53b2a6/)
