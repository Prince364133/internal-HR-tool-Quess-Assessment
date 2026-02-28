from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from app.routers import employees, attendance, dashboard
from app.database import engine, Base

# We are using alembic to create tables as per PRD "make sure alembic is properly initialized"
# But we can also auto-create for strictly local fallbacks if needed.
# Base.metadata.create_all(bind=engine)

app = FastAPI(title="HRMS Lite API")

# CORS Setup
origins = [
    "http://localhost:5173",
    "https://hrms-lite-frontend.vercel.app", # Placeholder for the generic vercel domain allowed
    "*" # allowing all for dev ease since the actual domain isn't known yet
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(employees.router)
app.include_router(attendance.router)
app.include_router(dashboard.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to HRMS Lite API"}

# Global Exception Handler Example (FastAPI handles 422 validations natively)
@app.exception_handler(Exception)
async def generic_exception_handler(request, exc):
    return JSONResponse(
        status_code=500,
        content={"detail": "An internal server error occurred. Please try again later."},
    )
