# app/crud.py
from sqlalchemy.orm import Session
from . import models, schemas
from typing import List
from uuid import UUID

# Student CRUD
def get_student(db: Session, student_id: UUID):
    return db.query(models.Student).filter(models.Student.id == student_id).first()

def get_students(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Student).offset(skip).limit(limit).all()

def create_student(db: Session, student: schemas.StudentCreate):
    db_student = models.Student(
        first_name=student.first_name,
        last_name=student.last_name,
        date_of_birth=student.date_of_birth,
        grade=student.grade,
        contact_info=student.contact_info
    )
    db.add(db_student)
    db.commit()
    db.refresh(db_student)
    return db_student

# Teacher CRUD
def get_teacher(db: Session, teacher_id: UUID):
    return db.query(models.Teacher).filter(models.Teacher.id == teacher_id).first()

def get_teachers(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Teacher).offset(skip).limit(limit).all()

def create_teacher(db: Session, teacher: schemas.TeacherCreate):
    db_teacher = models.Teacher(
        first_name=teacher.first_name,
        last_name=teacher.last_name,
        subject_specialization=teacher.subject_specialization,
        contact_info=teacher.contact_info
    )
    db.add(db_teacher)
    db.commit()
    db.refresh(db_teacher)
    return db_teacher

# Schedule CRUD (ClassSchedule)
def get_schedule(db: Session, schedule_id: UUID):
    return db.query(models.ClassSchedule).filter(models.ClassSchedule.id == schedule_id).first()

def get_schedules(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.ClassSchedule).offset(skip).limit(limit).all()

def create_schedule(db: Session, schedule: schemas.ScheduleCreate):
    db_schedule = models.ClassSchedule(
        class_name=schedule.class_name,
        assigned_teacher=schedule.assigned_teacher,
        schedule_timings=schedule.schedule_timings
    )
    db.add(db_schedule)
    db.commit()
    db.refresh(db_schedule)
    return db_schedule
