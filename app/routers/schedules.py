from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from uuid import UUID

from .. import schemas, crud
from ..database import SessionLocal

router = APIRouter(
    prefix="",
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
    try:
        if not isinstance(schedule.student_id, UUID) or not isinstance(schedule.teacher_id, UUID):
            raise ValueError
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid UUID format for student_id or teacher_id")

    student = crud.get_student(db, schedule.student_id)
    if not student:
        raise HTTPException(status_code=404, detail=f"Student with id {schedule.student_id} not found")

    teacher = crud.get_teacher(db, schedule.teacher_id)
    if not teacher:
        raise HTTPException(status_code=404, detail=f"Teacher with id {schedule.teacher_id} not found")

    try:
        new_schedule = crud.create_schedule(db=db, schedule=schedule)
        return new_schedule
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred while creating the schedule: {str(e)}")


@router.get("/{schedule_id}", response_model=schemas.ScheduleResponse)
def read_schedule(schedule_id: UUID, db: Session = Depends(get_db)):
    """
    Belirli bir programı ID'ye göre getirir.
    """
    try:
        if not isinstance(schedule_id, UUID):
            raise ValueError
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid UUID format for schedule_id")

    db_schedule = crud.get_schedule(db, schedule_id=schedule_id)
    if not db_schedule:
        raise HTTPException(status_code=404, detail=f"Schedule with id {schedule_id} not found")

    return db_schedule


@router.get("/", response_model=List[schemas.ScheduleResponse])
def read_schedules(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """
    Tüm programları getirir.
    """
    try:
        schedules = crud.get_schedules(db, skip=skip, limit=limit)
        return schedules
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching schedules: {str(e)}")


@router.put("/{schedule_id}", response_model=schemas.ScheduleResponse)
def update_schedule(schedule_id: UUID, schedule: schemas.ScheduleUpdate, db: Session = Depends(get_db)):
    """
    Belirli bir programı günceller.
    """
    try:
        if not isinstance(schedule_id, UUID):
            raise ValueError
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid UUID format for schedule_id")

    db_schedule = crud.get_schedule(db, schedule_id=schedule_id)
    if not db_schedule:
        raise HTTPException(status_code=404, detail=f"Schedule with id {schedule_id} not found")

    try:
        updated_schedule = crud.update_schedule(db=db, schedule_id=schedule_id, schedule=schedule)
        return updated_schedule
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error updating schedule: {str(e)}")


@router.delete("/{schedule_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_schedule(schedule_id: UUID, db: Session = Depends(get_db)):
    """
    Belirli bir program kaydını siler.
    """
    try:
        if not isinstance(schedule_id, UUID):
            raise ValueError
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid UUID format for schedule_id")

    db_schedule = crud.get_schedule(db, schedule_id=schedule_id)
    if not db_schedule:
        raise HTTPException(status_code=404, detail=f"Schedule with id {schedule_id} not found")

    try:
        crud.delete_schedule(db=db, schedule_id=schedule_id)
        return {"message": "Schedule deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error deleting schedule: {str(e)}")