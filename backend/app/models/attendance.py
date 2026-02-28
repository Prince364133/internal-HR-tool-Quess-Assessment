from sqlalchemy import Column, Integer, String, Date, ForeignKey, UniqueConstraint
from sqlalchemy.orm import relationship
from app.database import Base

class Attendance(Base):
    __tablename__ = "attendances"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    employee_id = Column(String(20), ForeignKey("employees.id", ondelete="CASCADE"), nullable=False)
    date = Column(Date, nullable=False)
    status = Column(String, nullable=False) # "Present" or "Absent"

    __table_args__ = (
        UniqueConstraint('employee_id', 'date', name='uq_employee_date'),
    )

    employee = relationship("Employee", back_populates="attendances")
