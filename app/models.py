import uuid
from datetime import datetime
from sqlalchemy import Column, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy_utils import UUIDType
from .database import Base


class Student(Base):
    __tablename__ = "students"

    id = Column(UUIDType(binary=False), primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String(255), index=True, nullable=False)  # İsim alanı
    email = Column(String(255), unique=True, index=True, nullable=False)  # Email alanı
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Öğrenciye ait ders programı ilişkisi
    schedules = relationship("Schedule", back_populates="student")


class Teacher(Base):
    __tablename__ = "teachers"

    id = Column(UUIDType(binary=False), primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String(255), index=True, nullable=False)  # İsim alanı
    email = Column(String(255), unique=True, index=True, nullable=False)  # Email alanı
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Öğretmene ait ders programı ilişkisi
    schedules = relationship("Schedule", back_populates="teacher")


class Schedule(Base):
    __tablename__ = "schedules"

    id = Column(UUIDType(binary=False), primary_key=True, default=lambda: str(uuid.uuid4()))
    title = Column(String(100), index=True, nullable=False)  # Başlık alanı (100 karakter ile sınırlandırıldı)
    description = Column(String(255), nullable=True)  # Açıklama alanı
    start_time = Column(DateTime, nullable=False)  # Başlangıç zamanı
    end_time = Column(DateTime, nullable=False)  # Bitiş zamanı
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Öğrenci ve öğretmen ilişkisi
    student_id = Column(UUIDType(binary=False), ForeignKey("students.id"), nullable=False)
    teacher_id = Column(UUIDType(binary=False), ForeignKey("teachers.id"), nullable=False)

    student = relationship("Student", back_populates="schedules")
    teacher = relationship("Teacher", back_populates="schedules")
