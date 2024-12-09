# app/models.py
import uuid
from sqlalchemy import Column, String, ForeignKey, DateTime
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from .database import Base
from sqlalchemy_utils import UUIDType, ChoiceType
from datetime import datetime

class Student(Base):
    __tablename__ = "students"

    id = Column(UUIDType(binary=False), primary_key=True, default=uuid.uuid4)
    name = Column(String, index=True, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    schedules = relationship("Schedule", back_populates="student")


class Teacher(Base):
    __tablename__ = "teachers"

    id = Column(UUIDType(binary=False), primary_key=True, default=uuid.uuid4)
    name = Column(String, index=True, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    schedules = relationship("Schedule", back_populates="teacher")


class Schedule(Base):
    __tablename__ = "schedules"

    id = Column(UUIDType(binary=False), primary_key=True, default=uuid.uuid4)
    title = Column(String, index=True, nullable=False)
    description = Column(String, nullable=True)
    start_time = Column(DateTime, nullable=False)
    end_time = Column(DateTime, nullable=False)
    student_id = Column(UUIDType(binary=False), ForeignKey("students.id"), nullable=False)
    teacher_id = Column(UUIDType(binary=False), ForeignKey("teachers.id"), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    student = relationship("Student", back_populates="schedules")
    teacher = relationship("Teacher", back_populates="schedules")
