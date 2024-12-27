from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from uuid import UUID

from .. import schemas, crud
from ..database import SessionLocal

router = APIRouter(
    prefix="",  # Prefix boş olacak şekilde ayarlanmıştır
    tags=["schedules"],
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
# Program CRUD İşlemleri
# -----------------------------

@router.post("/", response_model=schemas.ScheduleResponse, status_code=status.HTTP_201_CREATED)
def create_schedule(schedule: schemas.ScheduleCreate, db: Session = Depends(get_db)):
    """
    Yeni bir program kaydı oluşturur.
    """
    # UUID doğrulama
    for field, value in {"student_id": schedule.student_id, "teacher_id": schedule.teacher_id}.items():
        try:
            UUID(str(value))
        except ValueError:
            raise HTTPException(status_code=400, detail=f"Invalid UUID format for {field}")

    # Öğrenci ve öğretmen varlığını kontrol et
    student = crud.get_student(db, schedule.student_id)
    if not student:
        raise HTTPException(status_code=404, detail=f"Student with id {schedule.student_id} not found")
    teacher = crud.get_teacher(db, schedule.teacher_id)
    if not teacher:
        raise HTTPException(status_code=404, detail=f"Teacher with id {schedule.teacher_id} not found")

    # Yeni program oluştur
    try:
        return crud.create_schedule(db=db, schedule=schedule)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred while creating the schedule: {str(e)}")


@router.get("/{schedule_id}", response_model=schemas.ScheduleResponse)
def read_schedule(schedule_id: UUID, db: Session = Depends(get_db)):
    """
    Belirli bir programı ID'ye göre getirir.
    """
    # UUID doğrulama
    try:
        UUID(str(schedule_id))
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid UUID format for schedule_id")
    # Programı getir
    if not (db_schedule := crud.get_schedule(db, schedule_id=schedule_id)):
        raise HTTPException(status_code=404, detail=f"Schedule with id {schedule_id} not found")

    return db_schedule


@router.get("/", response_model=List[schemas.ScheduleResponse])
def read_schedules(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """
    Tüm programları getirir.
    """
    try:
        return crud.get_schedules(db, skip=skip, limit=limit)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching schedules: {str(e)}")


@router.put("/{schedule_id}", response_model=schemas.ScheduleResponse)
def update_schedule(schedule_id: UUID, schedule: schemas.ScheduleUpdate, db: Session = Depends(get_db)):
    """
    Belirli bir programı günceller.
    """
    # UUID doğrulama
    try:
        UUID(str(schedule_id))
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid UUID format for schedule_id")

    # Programın varlığını kontrol et
    if not (db_schedule := crud.get_schedule(db, schedule_id=schedule_id)):
        raise HTTPException(status_code=404, detail=f"Schedule with id {schedule_id} not found")

    # Programı güncelle
    try:
        return crud.update_schedule(db=db, schedule_id=schedule_id, schedule=schedule)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error updating schedule: {str(e)}")


@router.delete("/{schedule_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_schedule(schedule_id: UUID, db: Session = Depends(get_db)):
    try:
        UUID(str(schedule_id))
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid UUID format")

    db_schedule = crud.get_schedule(db, schedule_id=schedule_id)
    if not db_schedule:
        raise HTTPException(status_code=404, detail=f"Schedule with id {schedule_id} not found")

    try:
        crud.delete_schedule(db=db, schedule_id=schedule_id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error deleting schedule: {str(e)}")