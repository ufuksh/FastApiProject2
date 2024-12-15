import uuid
from datetime import datetime
from sqlalchemy import Column, String, ForeignKey, DateTime, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy_utils import UUIDType
from .database import Base


# -----------------------------
# User Model
# -----------------------------

class User(Base):
    __tablename__ = "users"

    id = Column(UUIDType(binary=False), primary_key=True, default=lambda: str(uuid.uuid4()))
    username = Column(String(255), unique=True, index=True, nullable=False)
    email = Column(String(255), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    is_active = Column(Boolean, default=True)
    is_superuser = Column(Boolean, default=False)  # Optional: for admin privileges

    # Relationships (if any)
    # For example, if a user can have multiple schedules or other related entities
    # schedules = relationship("Schedule", back_populates="user")  # Adjust as needed


# -----------------------------
# Student Model
# -----------------------------

class Student(Base):
    __tablename__ = "students"

    id = Column(UUIDType(binary=False), primary_key=True, default=lambda: str(uuid.uuid4()))
    first_name = Column(String(255), index=True, nullable=False)  # First Name
    last_name = Column(String(255), index=True, nullable=False)   # Last Name
    email = Column(String(255), unique=True, index=True, nullable=False)  # Email
    date_of_birth = Column(DateTime, nullable=True)  # Optional: Date of Birth
    grade = Column(String(50), nullable=True)        # Optional: Grade or Class
    contact_info = Column(String(255), nullable=True) # Optional: Contact Information
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationship to schedules
    schedules = relationship("ClassSchedule", back_populates="student", cascade="all, delete-orphan")


# -----------------------------
# Teacher Model
# -----------------------------

class Teacher(Base):
    __tablename__ = "teachers"

    id = Column(UUIDType(binary=False), primary_key=True, default=lambda: str(uuid.uuid4()))
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

    id = Column(UUIDType(binary=False), primary_key=True, default=lambda: str(uuid.uuid4()))
    title = Column(String(100), index=True, nullable=False)  # Title (max 100 characters)
    description = Column(String(255), nullable=True)         # Description
    start_time = Column(DateTime, nullable=False)            # Start Time
    end_time = Column(DateTime, nullable=False)              # End Time
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Foreign Keys
    student_id = Column(UUIDType(binary=False), ForeignKey("students.id"), nullable=False)
    teacher_id = Column(UUIDType(binary=False), ForeignKey("teachers.id"), nullable=False)

    # Relationships
    student = relationship("Student", back_populates="schedules")
    teacher = relationship("Teacher", back_populates="schedules")

    # Optional: If schedules are associated with a user (e.g., creator)
    # user_id = Column(UUIDType(binary=False), ForeignKey("users.id"), nullable=True)
    # user = relationship("User", back_populates="schedules")
