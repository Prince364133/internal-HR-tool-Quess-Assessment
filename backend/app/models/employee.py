from sqlalchemy import Column, String, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database import Base

class Employee(Base):
    __tablename__ = "employees"

    id = Column(String(20), primary_key=True, index=True)
    full_name = Column(String(100), nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    department = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    attendances = relationship("Attendance", back_populates="employee", cascade="all, delete-orphan")
