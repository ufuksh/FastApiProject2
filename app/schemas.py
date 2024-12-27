from __future__ import annotations
from pydantic import BaseModel, EmailStr
from typing import List, Optional
from uuid import UUID
from datetime import datetime

# -------------------------
# User Schemas
# -------------------------

class UserBase(BaseModel):
    username: str
    email: EmailStr

class UserCreate(UserBase):
    password: str  # Plain password; hash before storing

class UserUpdate(BaseModel):
    username: Optional[str] = None
    email: Optional[EmailStr] = None
    password: Optional[str] = None  # If password can be updated

class UserResponse(UserBase):
    id: UUID
    is_active: bool
    is_superuser: bool

    class Config:
        orm_mode = True

class UserLogin(BaseModel):
    username: str
    password: str

# -------------------------
# Student Schemas
# -------------------------

class StudentBase(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    date_of_birth: Optional[datetime] = None
    grade: Optional[str] = None
    contact_info: Optional[str] = None

class StudentCreate(StudentBase):
    pass

class StudentUpdate(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    email: Optional[EmailStr] = None
    date_of_birth: Optional[datetime] = None
    grade: Optional[str] = None
    contact_info: Optional[str] = None

class StudentResponse(StudentBase):
    id: UUID
    created_at: datetime
    updated_at: datetime
    schedules: List[ScheduleResponse] = []

    class Config:
        orm_mode = True

# -------------------------
# Teacher Schemas
# -------------------------

class TeacherBase(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    subject_specialization: Optional[str] = None
    contact_info: Optional[str] = None

class TeacherCreate(TeacherBase):
    pass

class TeacherUpdate(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    email: Optional[EmailStr] = None
    subject_specialization: Optional[str] = None
    contact_info: Optional[str] = None

class TeacherResponse(TeacherBase):
    id: UUID
    created_at: datetime
    updated_at: datetime
    schedules: List[ScheduleResponse] = []

    class Config:
        orm_mode = True

# -------------------------
# Schedule Schemas
# -------------------------

class ScheduleBase(BaseModel):
    title: str
    description: Optional[str] = None
    start_time: datetime
    end_time: datetime
    student_id: UUID
    teacher_id: UUID

class ScheduleCreate(ScheduleBase):
    pass

class ScheduleUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    start_time: Optional[datetime] = None
    end_time: Optional[datetime] = None
    student_id: Optional[UUID] = None
    teacher_id: Optional[UUID] = None

class ScheduleResponse(ScheduleBase):
    id: UUID
    created_at: datetime
    updated_at: datetime
    student: StudentResponse
    teacher: TeacherResponse

    class Config:
        orm_mode = True

# -------------------------
# Forward References
# -------------------------
# Necessary to resolve circular references between ScheduleResponse, StudentResponse, and TeacherResponse
StudentResponse.update_forward_refs()
TeacherResponse.update_forward_refs()
ScheduleResponse.update_forward_refs()