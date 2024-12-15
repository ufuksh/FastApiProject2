from __future__ import annotations 
from pydantic import BaseModel, EmailStr
from typing import List, Optional
from uuid import UUID
from datetime import datetime

# -------------------------
# Student Schemas
# -------------------------
class StudentBase(BaseModel):
    name: str
    email: EmailStr

# Yeni öğrenci oluşturma
class StudentCreate(StudentBase):
    pass

# Öğrenci güncelleme
class StudentUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[EmailStr] = None

# Öğrenci okuma
class Student(StudentBase):
    id: UUID
    created_at: datetime
    schedules: List[Schedule] = []

    class Config:
        from_attributes = True

# -------------------------
# Teacher Schemas
# -------------------------
class TeacherBase(BaseModel):
    name: str
    email: EmailStr

# Yeni öğretmen oluşturma
class TeacherCreate(TeacherBase):
    pass

# Öğretmen güncelleme
class TeacherUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[EmailStr] = None

# Öğretmen okuma
class Teacher(TeacherBase):
    id: UUID
    created_at: datetime
    schedules: List[Schedule] = []

    class Config:
        from_attributes = True

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

# Yeni program oluşturma
class ScheduleCreate(ScheduleBase):
    pass

# Program güncelleme
class ScheduleUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    start_time: Optional[datetime] = None
    end_time: Optional[datetime] = None
    student_id: Optional[UUID] = None
    teacher_id: Optional[UUID] = None

# Program okuma
class Schedule(ScheduleBase):
    id: UUID
    created_at: datetime
    student: Student
    teacher: Teacher

    class Config:
        from_attributes = True

# -------------------------
# Forward References
# -------------------------
Student.update_forward_refs()
Teacher.update_forward_refs()
Schedule.update_forward_refs()
