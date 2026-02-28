from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import date

from app.database import get_db
from app.models.employee import Employee
from app.models.attendance import Attendance
from app.schemas.attendance import AttendanceStatus

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])

@router.get("/summary")
def get_dashboard_summary(db: Session = Depends(get_db)):
    # Total employee count
    total_employees = db.query(Employee).count()
    
    # Breakdown by department
    # Returns [('Engineering', 5), ('HR', 2)]
    dept_breakdown_raw = db.query(Employee.department, func.count(Employee.id)).group_by(Employee.department).all()
    department_breakdown = {dept: count for dept, count in dept_breakdown_raw}
    
    # Today's present/absent count
    today = date.today()
    today_attendance = db.query(Attendance.status, func.count(Attendance.id)).filter(Attendance.date == today).group_by(Attendance.status).all()
    
    present_count = 0
    absent_count = 0
    
    for status, count in today_attendance:
        if status == AttendanceStatus.PRESENT.value:
            present_count = count
        elif status == AttendanceStatus.ABSENT.value:
            absent_count = count
            
    return {
        "total_employees": total_employees,
        "department_breakdown": department_breakdown,
        "today_attendance": {
            "present": present_count,
            "absent": absent_count
        }
    }
