from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from typing import List, Optional
from datetime import date

from app.database import get_db
from app.models.attendance import Attendance
from app.models.employee import Employee
from app.schemas.attendance import AttendanceCreate, AttendanceResponse

router = APIRouter(prefix="/attendance", tags=["Attendance"])

@router.post("", response_model=AttendanceResponse, status_code=status.HTTP_201_CREATED)
def mark_attendance(attendance: AttendanceCreate, db: Session = Depends(get_db)):
    # Check if employee exists
    employee = db.query(Employee).filter(Employee.id == attendance.employee_id).first()
    if not employee:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Employee not found")

    db_attendance = Attendance(**attendance.model_dump())
    db.add(db_attendance)
    try:
        db.commit()
        db.refresh(db_attendance)
        return db_attendance
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Attendance already marked for this employee on this date.")

@router.get("/{employee_id}", response_model=List[AttendanceResponse])
def get_attendance(employee_id: str, db: Session = Depends(get_db), date_filter: Optional[date] = Query(None, alias="date")):
    # Check if employee exists
    employee = db.query(Employee).filter(Employee.id == employee_id).first()
    if not employee:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Employee not found")

    query = db.query(Attendance).filter(Attendance.employee_id == employee_id)
    if date_filter:
        query = query.filter(Attendance.date == date_filter)
        
    return query.order_by(Attendance.date.desc()).all()
