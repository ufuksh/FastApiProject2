from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from uuid import UUID
from typing import List

from .. import schemas, crud
from ..database import SessionLocal

# Öğrenci API Router
router = APIRouter(
    prefix="/students",
    tags=["students"],
)

# -----------------------------
# Bağımlılık Fonksiyonu
# -----------------------------
def get_db():
    """
    Veritabanı oturumunu başlatır ve kapatır.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# -----------------------------
# Öğrenci CRUD İşlemleri
# -----------------------------

@router.post("/", response_model=schemas.StudentResponse, status_code=status.HTTP_201_CREATED)
def create_student(student: schemas.StudentCreate, db: Session = Depends(get_db)):
    """
    Yeni bir öğrenci kaydı oluşturur.
    """
    return crud.create_student(db=db, student=student)


@router.get("/{student_id}", response_model=schemas.StudentResponse)
def read_student(student_id: UUID, db: Session = Depends(get_db)):
    """
    Belirli bir öğrenci kaydını ID'ye göre getirir.
    """
    db_student = crud.get_student(db, student_id=student_id)
    if not db_student:
        raise HTTPException(status_code=404, detail="Student not found")
    return db_student


@router.get("/", response_model=List[schemas.StudentResponse])
def read_students(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """
    Tüm öğrenci kayıtlarını getirir.
    """
    students = crud.get_students(db, skip=skip, limit=limit)
    return students


@router.put("/{student_id}", response_model=schemas.StudentResponse)
def update_student(student_id: UUID, student: schemas.StudentUpdate, db: Session = Depends(get_db)):
    """
    Belirli bir öğrenci kaydını günceller.
    """
    db_student = crud.get_student(db, student_id=student_id)
    if not db_student:
        raise HTTPException(status_code=404, detail="Student not found")
    
    updated_student = crud.update_student(db=db, student_id=student_id, student=student)
    return updated_student


@router.delete("/{student_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_student(student_id: UUID, db: Session = Depends(get_db)):
    """
    Belirli bir öğrenci kaydını siler.
    """
    db_student = crud.get_student(db, student_id=student_id)
    if not db_student:
        raise HTTPException(status_code=404, detail="Student not found")
    
    crud.delete_student(db=db, student_id=student_id)
    return {"message": "Student deleted successfully"}
