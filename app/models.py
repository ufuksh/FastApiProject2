import uuid
from datetime import datetime
from sqlalchemy import Column, String, ForeignKey, DateTime, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.mysql import CHAR
from .database import Base


# -----------------------------
# User Model
# -----------------------------

class User(Base):
    __tablename__ = "users"

    id = Column(CHAR(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    username = Column(String(255), unique=True, index=True, nullable=False)
    email = Column(String(255), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    is_active = Column(Boolean, default=True)
    is_superuser = Column(Boolean, default=False)  # Optional: for admin privileges

    # Relationships (if any)
    # Örneğin, bir kullanıcının birden fazla programı olabilir
    # schedules = relationship("ClassSchedule", back_populates="user")  # İhtiyaca göre düzenleyin


# -----------------------------
# Student Model
# -----------------------------

class Student(Base):
    __tablename__ = "students"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()), index=True)
    first_name = Column(String(50), nullable=False)
    last_name = Column(String(50), nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    date_of_birth = Column(Date, nullable=True)
    grade = Column(String(10), nullable=True)
    contact_info = Column(String(20), nullable=True)

    # Relationship to schedules
    schedules = relationship("ClassSchedule", back_populates="student", cascade="all, delete-orphan")


# -----------------------------
# Teacher Model
# -----------------------------

class Teacher(Base):
    __tablename__ = "teachers"

    id = Column(CHAR(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    first_name = Column(String(255), index=True, nullable=False)  # First Name
    last_name = Column(String(255), index=True, nullable=False)   # Last Name
    email = Column(String(255), unique=True, index=True, nullable=False)  # Email
    subject_specialization = Column(String(255), nullable=True)   # Subject Specialization
    contact_info = Column(String(255), nullable=True)             # Contact Information
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationship to schedules
    schedules = relationship("ClassSchedule", back_populates="teacher", cascade="all, delete-orphan")


# -----------------------------
# ClassSchedule Model
# -----------------------------

class ClassSchedule(Base):
    __tablename__ = "schedules"  # Keeping the table name as 'schedules'

    id = Column(CHAR(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    title = Column(String(100), index=True, nullable=False)  # Title (max 100 characters)
    description = Column(String(255), nullable=True)         # Description
    start_time = Column(DateTime, nullable=False)            # Start Time
    end_time = Column(DateTime, nullable=False)              # End Time
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Foreign Keys
    student_id = Column(CHAR(36), ForeignKey("students.id"), nullable=False)
    teacher_id = Column(CHAR(36), ForeignKey("teachers.id"), nullable=False)

    # Relationships
    student = relationship("Student", back_populates="schedules")
    teacher = relationship("Teacher", back_populates="schedules")

    # Optional: If schedules are associated with a user (e.g., creator)
    # user_id = Column(CHAR(36), ForeignKey("users.id"), nullable=True)
    # user = relationship("User", back_populates="schedules")
