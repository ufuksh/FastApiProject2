# app/routers/teachers.py
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from uuid import UUID

from .. import schemas, crud
from ..database import SessionLocal

router = APIRouter(
    prefix="/teachers",
    tags=["teachers"],
)

# Bağımlılık fonksiyonu
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# POST: Yeni öğretmen oluşturma
@router.post("/", response_model=schemas.Teacher, status_code=status.HTTP_201_CREATED)
def create_teacher(teacher: schemas.TeacherCreate, db: Session = Depends(get_db)):
    db_teacher = crud.get_teacher(db, teacher_id=teacher.id)
    if db_teacher:
        raise HTTPException(status_code=400, detail="Teacher already registered")
    return crud.create_teacher(db=db, teacher=teacher)

# GET: Tek bir öğretmeni okuma
@router.get("/{teacher_id}", response_model=schemas.Teacher)
def read_teacher(teacher_id: UUID, db: Session = Depends(get_db)):
    db_teacher = crud.get_teacher(db, teacher_id=teacher_id)
    if db_teacher is None:
        raise HTTPException(status_code=404, detail="Teacher not found")
    return db_teacher

# GET: Tüm öğretmenleri listeleme
@router.get("/", response_model=List[schemas.Teacher])
def read_teachers(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    teachers = crud.get_teachers(db, skip=skip, limit=limit)
    return teachers

# PUT: Öğretmen güncelleme
@router.put("/{teacher_id}", response_model=schemas.Teacher)
def update_teacher(teacher_id: UUID, teacher: schemas.TeacherCreate, db: Session = Depends(get_db)):
    db_teacher = crud.get_teacher(db, teacher_id=teacher_id)
    if not db_teacher:
        raise HTTPException(status_code=404, detail="Teacher not found")
    
    updated_teacher = crud.update_teacher(db=db, teacher_id=teacher_id, teacher=teacher)
    return updated_teacher

# DELETE: Öğretmen silme
@router.delete("/{teacher_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_teacher(teacher_id: UUID, db: Session = Depends(get_db)):
    db_teacher = crud.get_teacher(db, teacher_id=teacher_id)
    if not db_teacher:
        raise HTTPException(status_code=404, detail="Teacher not found")
    
    crud.delete_teacher(db=db, teacher_id=teacher_id)
    return {"message": "Teacher deleted successfully"}
