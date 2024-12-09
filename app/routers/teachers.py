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

@router.post("/", response_model=schemas.Teacher, status_code=status.HTTP_201_CREATED)
def create_teacher(teacher: schemas.TeacherCreate, db: Session = Depends(get_db)):
    db_teacher = crud.get_teacher(db, teacher_id=teacher.id)
    if db_teacher:
        raise HTTPException(status_code=400, detail="Teacher already registered")
    return crud.create_teacher(db=db, teacher=teacher)

@router.get("/{teacher_id}", response_model=schemas.Teacher)
def read_teacher(teacher_id: UUID, db: Session = Depends(get_db)):
    db_teacher = crud.get_teacher(db, teacher_id=teacher_id)
    if db_teacher is None:
        raise HTTPException(status_code=404, detail="Teacher not found")
    return db_teacher

@router.get("/", response_model=List[schemas.Teacher])
def read_teachers(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    teachers = crud.get_teachers(db, skip=skip, limit=limit)
    return teachers
