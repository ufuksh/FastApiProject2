from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from uuid import UUID
from typing import List

from .. import schemas, crud
from ..database import SessionLocal

# Öğrenci API Router
router = APIRouter(
    prefix="",  # API için uygun prefix, ana uygulamada "/api/students" olarak dahil edilecek
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
    print("POST: Yeni öğrenci ekleniyor:", student)
    new_student = crud.create_student(db=db, student=student)
    print("POST: Öğrenci eklendi:", new_student)
    return new_student


@router.get("/{student_id}", response_model=schemas.StudentResponse)
def read_student(student_id: UUID, db: Session = Depends(get_db)):
    """
    Belirli bir öğrenci kaydını ID'ye göre getirir.
    """
    print(f"GET: {student_id} ID'li öğrenci aranıyor.")
    db_student = crud.get_student(db, student_id=student_id)
    if not db_student:
        print(f"GET: {student_id} ID'li öğrenci bulunamadı.")
        raise HTTPException(status_code=404, detail="Student not found")
    print("GET: Öğrenci bulundu:", db_student)
    return db_student


@router.get("/", response_model=List[schemas.StudentResponse])
def read_students(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """
    Tüm öğrenci kayıtlarını getirir.
    """
    print(f"GET: Tüm öğrenciler getiriliyor. Skip={skip}, Limit={limit}")
    students = crud.get_students(db, skip=skip, limit=limit)
    if not students:
        print("GET: Hiç öğrenci kaydı bulunamadı.")
    else:
        print(f"GET: {len(students)} öğrenci bulundu.")
    return students

@router.put("/{student_id}", response_model=schemas.StudentResponse, status_code=status.HTTP_200_OK)
def update_student(student_id: UUID, student: schemas.StudentUpdate, db: Session = Depends(get_db)):
    """
    Belirli bir öğrenci kaydını günceller.
    """
    print(f"PUT: {student_id} ID'li öğrenci güncelleniyor.")
    db_student = crud.get_student(db, student_id=student_id)
    if not db_student:
        print(f"PUT: {student_id} ID'li öğrenci bulunamadı.")
        raise HTTPException(status_code=404, detail="Student not found")

    updated_student = crud.update_student(db=db, student_id=student_id, student=student)
    print(f"PUT: {student_id} ID'li öğrenci güncellendi:", updated_student)
    return updated_student




@router.delete("/{student_id:uuid}", response_model=dict, status_code=status.HTTP_200_OK)
def delete_student(student_id: UUID, db: Session = Depends(get_db)):
    print(f"DELETE için gelen student_id: {student_id}")
    db_student = crud.get_student(db, student_id=student_id)
    print(f"get_student sonucu: {db_student}")
    if not db_student:
        raise HTTPException(status_code=404, detail="Student not found")
    crud.delete_student(db=db, student_id=student_id)
    return {"message": "Student deleted successfully"}
