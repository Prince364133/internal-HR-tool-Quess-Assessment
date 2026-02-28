from pydantic import BaseModel, ConfigDict, Field, field_validator
from datetime import datetime
from app.utils.validators import validate_email_format

class EmployeeBase(BaseModel):
    id: str = Field(..., max_length=20, pattern=r"^EMP\d+$", description="Employee ID, e.g. EMP001")
    full_name: str = Field(..., min_length=2, max_length=100)
    email: str
    department: str = Field(...)

    @field_validator('email')
    @classmethod
    def check_email(cls, v: str) -> str:
        if not validate_email_format(v):
            raise ValueError("Invalid email format")
        return v

class EmployeeCreate(EmployeeBase):
    pass

class EmployeeResponse(EmployeeBase):
    created_at: datetime
    
    model_config = ConfigDict(from_attributes=True)
