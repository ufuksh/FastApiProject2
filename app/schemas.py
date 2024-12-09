# app/schemas.py
from pydantic import BaseModel, EmailStr, Field
from uuid import UUID
from datetime import date
from typing import List, Optional

class StudentBase(BaseModel):
    first_name: str
    last_name: str
    date_of_birth: date
    grade: str
    contact_info: Optional[EmailStr]

class StudentCreate(StudentBase):
    pass

class StudentRead(StudentBase):
    id: UUID
    class Config:
        orm_mode = True

class TeacherBase(BaseModel):
    first_name: str
    last_name: str
    subject_specialization: str
    contact_info: Optional[EmailStr]

class TeacherCreate(TeacherBase):
    pass

class TeacherRead(TeacherBase):
    id: UUID
    class Config:
        orm_mode = True

class ClassScheduleBase(BaseModel):
    class_name: str
    teacher_id: UUID
    schedule_timings: str
    student_ids: Optional[List[UUID]] = []

class ClassScheduleCreate(ClassScheduleBase):
    pass

class ClassScheduleRead(ClassScheduleBase):
    id: UUID
    teacher: TeacherRead
    students: List[StudentRead] = []
    class Config:
        orm_mode = True
