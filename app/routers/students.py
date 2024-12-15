# app/routers/students.py
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from uuid import UUID

from .. import schemas, crud
from ..database import SessionLocal

router = APIRouter(
    prefix="/students",
    tags=["students"],
)

# Bağımlılık fonksiyonu
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# POST: Yeni öğrenci oluşturma
@router.post("/", response_model=schemas.Student, status_code=status.HTTP_201_CREATED)
def create_student(student: schemas.StudentCreate, db: Session = Depends(get_db)):
    db_student = crud.get_student(db, student_id=student.id)
    if db_student:
        raise HTTPException(status_code=400, detail="Student already registered")
    return crud.create_student(db=db, student=student)

# GET: Tek bir öğrenci okuma
@router.get("/{student_id}", response_model=schemas.Student)
def read_student(student_id: UUID, db: Session = Depends(get_db)):
    db_student = crud.get_student(db, student_id=student_id)
    if db_student is None:
        raise HTTPException(status_code=404, detail="Student not found")
    return db_student

# GET: Tüm öğrencileri listeleme
@router.get("/", response_model=List[schemas.Student])
def read_students(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    students = crud.get_students(db, skip=skip, limit=limit)
    return students

# PUT: Öğrenci güncelleme
@router.put("/{student_id}", response_model=schemas.Student)
def update_student(student_id: UUID, student: schemas.StudentCreate, db: Session = Depends(get_db)):
    db_student = crud.get_student(db, student_id=student_id)
    if not db_student:
        raise HTTPException(status_code=404, detail="Student not found")
    
    updated_student = crud.update_student(db=db, student_id=student_id, student=student)
    return updated_student

# DELETE: Öğrenci silme
@router.delete("/{student_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_student(student_id: UUID, db: Session = Depends(get_db)):
    db_student = crud.get_student(db, student_id=student_id)
    if not db_student:
        raise HTTPException(status_code=404, detail="Student not found")
    
    crud.delete_student(db=db, student_id=student_id)
    return {"message": "Student deleted successfully"}
