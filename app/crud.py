# app/crud.py
from sqlalchemy.orm import Session
from . import models, schemas

def get_student(db: Session, student_id: str):
    return db.query(models.Student).filter(models.Student.id == student_id).first()

def get_students(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Student).offset(skip).limit(limit).all()

def create_student(db: Session, student: schemas.StudentCreate):
    db_student = models.Student(**student.dict())
    db.add(db_student)
    db.commit()
    db.refresh(db_student)
    return db_student

def update_student(db: Session, student_id: str, student: schemas.StudentCreate):
    db_student = get_student(db, student_id)
    if db_student:
        for key, value in student.dict().items():
            setattr(db_student, key, value)
        db.commit()
        db.refresh(db_student)
    return db_student

def delete_student(db: Session, student_id: str):
    db_student = get_student(db, student_id)
    if db_student:
        db.delete(db_student)
        db.commit()
    return db_student
