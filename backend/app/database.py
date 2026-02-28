import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from dotenv import load_dotenv

load_dotenv()

# We will use sqlite fallback if DATABASE_URL is not set for local dev ease,
# but the PRD specifies postgresql. In actual deployment, DATABASE_URL must be correct.
SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./hrms.db")

# For sqlite we need connect_args, for postgresql we don't.
# We determine automatically based on the URL prefix.
if SQLALCHEMY_DATABASE_URL.startswith("sqlite"):
    engine = create_engine(
        SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
    )
else:
    engine = create_engine(SQLALCHEMY_DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
