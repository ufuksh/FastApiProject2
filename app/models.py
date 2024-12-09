# app/models.py
import uuid
from sqlalchemy import Column, String, Date, ForeignKey, Table
from sqlalchemy.dialects.mysql import CHAR
from sqlalchemy.orm import relationship
from database import Base

# İlişkisel tablo
student_classes = Table(
    'student_classes',
    Base.metadata,
    Column('student_id', CHAR(36), ForeignKey('students.id'), primary_key=True),
    Column('class_id', CHAR(36), ForeignKey('class_schedules.id'), primary_key=True)
)

class Student(Base):
    __tablename__ = 'students'
    id = Column(CHAR(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    first_name = Column(String(50), nullable=False)
    last_name = Column(String(50), nullable=False)
    date_of_birth = Column(Date, nullable=False)
    grade = Column(String(10), nullable=False)
    contact_info = Column(String(100), nullable=True)
    classes = relationship('ClassSchedule', secondary=student_classes, back_populates='students')

class Teacher(Base):
    __tablename__ = 'teachers'
    id = Column(CHAR(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    first_name = Column(String(50), nullable=False)
    last_name = Column(String(50), nullable=False)
    subject_specialization = Column(String(100), nullable=False)
    contact_info = Column(String(100), nullable=True)
    classes = relationship('ClassSchedule', back_populates='teacher')

class ClassSchedule(Base):
    __tablename__ = 'class_schedules'
    id = Column(CHAR(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    class_name = Column(String(100), nullable=False)
    teacher_id = Column(CHAR(36), ForeignKey('teachers.id'), nullable=False)
    schedule_timings = Column(String(100), nullable=False)
    teacher = relationship('Teacher', back_populates='classes')
    students = relationship('Student', secondary=student_classes, back_populates='classes')
