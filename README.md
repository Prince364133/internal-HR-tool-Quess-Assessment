# HRMS Lite

A complete, production-ready lightweight internal HR tool for managing employees and tracking daily attendance. Built as a single-admin system specifically focusing on clean, working core HR operations.

## 🔗 Live Links
- **Live URL**: [Pending Deployment](#) 
- **GitHub Repository**: [https://github.com/Prince364133/internal-HR-tool-Quess-Assessment](https://github.com/Prince364133/internal-HR-tool-Quess-Assessment)

## 🛠 Tech Stack

| Component | Technology | Description |
|---|---|---|
| **Frontend** | React, Vite, Tailwind CSS | High performance UI built with composable components. HeadlessUI and Lucide icons used. |
| **Backend** | Python, FastAPI | Asynchronous Python REST API providing lightning-fast endpoints. |
| **Database** | PostgreSQL, SQLAlchemy | Object-relational mapping using SQLAlchemy with Alembic managing migrations. |
| **Validation** | Pydantic V2 | Strong schema validation on incoming API requests and strict structural parsing. |

## 🚀 Local Setup Instructions

### 1. Backend Setup

The backend utilizes FastAPI and SQLAlchemy. By default, it uses SQLite if `DATABASE_URL` is omitted, but PostgreSQL is strictly recommended for production.

```bash
cd backend

# Create a virtual environment
python -m venv .venv
# Activate it (Windows)
.\.venv\Scripts\activate
# Activate it (Mac/Linux)
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run migrations to generate tables
alembic upgrade head

# Start the FastAPI server
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

### 2. Frontend Setup

The frontend depends on Vite and styled comprehensively using TailwindCSS.

```bash
cd frontend

# Install Node modules
npm install

# Start the development server
npm run dev
```

Visit `http://localhost:5173` in your browser.

## 🔒 Environment Variable Reference

Create local `.env` files in both directories following the respective `.env.example` configurations.

**Backend `.env`:**
```
# Provide your PostgreSQL connection string for Render deployment
DATABASE_URL=postgresql://user:password@host:5432/hrms_db
```

**Frontend `.env`:**
```
# Points to localhost on dev, and your deployed render backend URL on Vercel deployment
VITE_API_BASE_URL=http://localhost:8000
```


## 📝 Assumptions
- **Authentication**: No login or user sessions are required as per PRD constraints.
- **Cascading Deletions**: Deleting an employee forcefully cascades the deletion logic to any connected attendance logs historically to maintain clean DB constraints safely.
- **SQLite Fallback**: During generic local testing without a database environment configured in `.env`, the code falls back natively to a local file-based `hrms.db` SQLite schema. On Render, production `.env` config triggers a switch directly to PostgreSQL processing without any external model changes.
