from pydantic import BaseModel, ConfigDict, Field
from datetime import date
from enum import Enum

class AttendanceStatus(str, Enum):
    PRESENT = "Present"
    ABSENT = "Absent"

class AttendanceBase(BaseModel):
    employee_id: str = Field(..., max_length=20)
    date: date
    status: AttendanceStatus

class AttendanceCreate(AttendanceBase):
    pass

class AttendanceResponse(AttendanceBase):
    id: int

    model_config = ConfigDict(from_attributes=True)
