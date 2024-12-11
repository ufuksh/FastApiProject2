import uuid
from sqlalchemy import Column, String, ForeignKey, DateTime, Integer
from sqlalchemy.orm import relationship
from sqlalchemy_utils import UUIDType
from datetime import datetime
from .database import Base


class Student(Base):
    __tablename__ = "students"

    id = Column(UUIDType(binary=False), primary_key=True, default=uuid.uuid4)
    name = Column(String(255), index=True, nullable=False)  # String uzunluğu eklendi
    email = Column(String(255), unique=True, index=True, nullable=False)  # String uzunluğu eklendi
    created_at = Column(DateTime, default=datetime.utcnow)

    schedules = relationship("Schedule", back_populates="student")


class Teacher(Base):
    __tablename__ = "teachers"

    id = Column(UUIDType(binary=False), primary_key=True, default=uuid.uuid4)
    name = Column(String(255), index=True, nullable=False)  # String uzunluğu eklendi
    email = Column(String(255), unique=True, index=True, nullable=False)  # String uzunluğu eklendi
    created_at = Column(DateTime, default=datetime.utcnow)

    schedules = relationship("Schedule", back_populates="teacher")


class Schedule(Base):
    __tablename__ = "schedules"

    id = Column(UUIDType(binary=False), primary_key=True, default=uuid.uuid4)
    title = Column(String(255), index=True, nullable=False)  # String uzunluğu eklendi
    description = Column(String(255), nullable=True)  # String uzunluğu eklendi
    start_time = Column(DateTime, nullable=False)
    end_time = Column(DateTime, nullable=False)
    student_id = Column(UUIDType(binary=False), ForeignKey("students.id"), nullable=False)
    teacher_id = Column(UUIDType(binary=False), ForeignKey("teachers.id"), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    student = relationship("Student", back_populates="schedules")
    teacher = relationship("Teacher", back_populates="schedules")
