# backend/app/routers/teachers.py

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from uuid import UUID

from .. import schemas, crud
from ..database import SessionLocal

router = APIRouter(
    prefix="",
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
    try:
        return crud.create_teacher(db=db, teacher=teacher)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error creating teacher: {str(e)}")


@router.get("/{teacher_id:uuid}", response_model=schemas.TeacherResponse)
def read_teacher(teacher_id: UUID, db: Session = Depends(get_db)):
    """
    Belirli bir öğretmeni ID'ye göre getirir.
    """
    try:
        # UUID formatını zaten FastAPI kontrol ediyor
        db_teacher = crud.get_teacher(db, teacher_id=teacher_id)
        if not db_teacher:
            raise HTTPException(status_code=404, detail="Teacher not found")
        return db_teacher
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid UUID format")


@router.get("/", response_model=List[schemas.TeacherResponse])
def read_teachers(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """
    Tüm öğretmen kayıtlarını getirir.
    """
    try:
        teachers = crud.get_teachers(db, skip=skip, limit=limit)
        return teachers
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error fetching teachers: {str(e)}")


@router.put("/{teacher_id:uuid}", response_model=schemas.TeacherResponse)
def update_teacher(teacher_id: UUID, teacher: schemas.TeacherUpdate, db: Session = Depends(get_db)):
    """
    Belirli bir öğretmen kaydını günceller.
    """
    try:
        db_teacher = crud.get_teacher(db, teacher_id=teacher_id)
        if not db_teacher:
            raise HTTPException(status_code=404, detail="Teacher not found")

        updated_teacher = crud.update_teacher(db=db, teacher_id=teacher_id, teacher=teacher)
        return updated_teacher
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid UUID format")
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error updating teacher: {str(e)}")


@router.delete("/{teacher_id:uuid}", response_model=dict, status_code=status.HTTP_200_OK)
def delete_teacher(teacher_id: UUID, db: Session = Depends(get_db)):
    """
    Belirli bir öğretmen kaydını siler.
    """
    try:
        db_teacher = crud.get_teacher(db, teacher_id=teacher_id)
        if not db_teacher:
            raise HTTPException(status_code=404, detail="Teacher not found")

        crud.delete_teacher(db=db, teacher_id=teacher_id)
        return {"message": "Teacher deleted successfully"}
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid UUID format")
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error deleting teacher: {str(e)}")