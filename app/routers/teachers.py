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
# Öğretmen CRUD İşlemleri
# -----------------------------

@router.post("/", response_model=schemas.TeacherResponse, status_code=status.HTTP_201_CREATED)
def create_teacher(teacher: schemas.TeacherCreate, db: Session = Depends(get_db)):
    """
    Yeni bir öğretmen kaydı oluşturur.
    """
    return crud.create_teacher(db=db, teacher=teacher)


@router.get("/{teacher_id}", response_model=schemas.TeacherResponse)
def read_teacher(teacher_id: UUID, db: Session = Depends(get_db)):
    """
    Belirli bir öğretmeni ID'ye göre getirir.
    """
    db_teacher = crud.get_teacher(db, teacher_id=teacher_id)
    if not db_teacher:
        raise HTTPException(status_code=404, detail="Teacher not found")
    return db_teacher


@router.get("/", response_model=List[schemas.TeacherResponse])
def read_teachers(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """
    Tüm öğretmen kayıtlarını getirir.
    """
    teachers = crud.get_teachers(db, skip=skip, limit=limit)
    return teachers


@router.put("/{teacher_id}", response_model=schemas.TeacherResponse)
def update_teacher(teacher_id: UUID, teacher: schemas.TeacherUpdate, db: Session = Depends(get_db)):
    """
    Belirli bir öğretmen kaydını günceller.
    """
    db_teacher = crud.get_teacher(db, teacher_id=teacher_id)
    if not db_teacher:
        raise HTTPException(status_code=404, detail="Teacher not found")
    
    updated_teacher = crud.update_teacher(db=db, teacher_id=teacher_id, teacher=teacher)
    return updated_teacher


@router.delete("/{teacher_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_teacher(teacher_id: UUID, db: Session = Depends(get_db)):
    """
    Belirli bir öğretmen kaydını siler.
    """
    db_teacher = crud.get_teacher(db, teacher_id=teacher_id)
    if not db_teacher:
        raise HTTPException(status_code=404, detail="Teacher not found")
    
    crud.delete_teacher(db=db, teacher_id=teacher_id)
    return {"message": "Teacher deleted successfully"}
