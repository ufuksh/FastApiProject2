# backend/app/routers/students.py

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from .. import schemas, crud
from ..database import SessionLocal

router = APIRouter(
    prefix="",  # Main app includes this with "/api/students"
    tags=["students"],
)

def get_db():
    """
    Dependency to get DB session.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=schemas.StudentResponse, status_code=status.HTTP_201_CREATED)
def create_student(student: schemas.StudentCreate, db: Session = Depends(get_db)):
    """
    Create a new student.
    """
    print("POST: Yeni öğrenci ekleniyor:", student)
    new_student = crud.create_student(db=db, student=student)
    print("POST: Öğrenci eklendi:", new_student)
    return new_student

@router.get("/{student_id}/", response_model=schemas.StudentResponse, status_code=status.HTTP_200_OK)
def read_student(student_id: str, db: Session = Depends(get_db)):
    """
    Retrieve a student by ID.
    """
    print(f"GET: {student_id} ID'li öğrenci aranıyor.")
    db_student = crud.get_student(db, student_id=student_id)
    if not db_student:
        print(f"GET: {student_id} ID'li öğrenci bulunamadı.")
        raise HTTPException(status_code=404, detail="Student not found")
    print("GET: Öğrenci bulundu:", db_student)
    return db_student

@router.get("/", response_model=List[schemas.StudentResponse], status_code=status.HTTP_200_OK)
def read_students(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """
    Retrieve all students with pagination.
    """
    print(f"GET: Tüm öğrenciler getiriliyor. Skip={skip}, Limit={limit}")
    students = crud.get_students(db, skip=skip, limit=limit)
    if not students:
        print("GET: Hiç öğrenci kaydı bulunamadı.")
    else:
        print(f"GET: {len(students)} öğrenci bulundu.")
    return students

@router.patch("/{student_id}/", response_model=schemas.StudentResponse, status_code=status.HTTP_200_OK)
def update_student(student_id: str, student: schemas.StudentUpdate, db: Session = Depends(get_db)):
    """
    Update a student's information.
    """
    print(f"PATCH: {student_id} ID'li öğrenci güncelleniyor.")
    db_student = crud.get_student(db, student_id=student_id)
    if not db_student:
        print(f"PATCH: {student_id} ID'li öğrenci bulunamadı.")
        raise HTTPException(status_code=404, detail="Student not found")
    
    updated_student = crud.update_student(db=db, student_id=student_id, student=student)
    print(f"PATCH: {student_id} ID'li öğrenci güncellendi:", updated_student)
    return updated_student

@router.delete("/{student_id}/", response_model=dict, status_code=status.HTTP_200_OK)
def delete_student(student_id: str, db: Session = Depends(get_db)):
    """
    Delete a student by ID.
    """
    print(f"DELETE: {student_id} ID'li öğrenci siliniyor.")
    db_student = crud.delete_student(db=db, student_id=student_id)
    if not db_student:
        print(f"DELETE: {student_id} ID'li öğrenci bulunamadı.")
        raise HTTPException(status_code=404, detail="Student not found")
    print(f"DELETE: {student_id} ID'li öğrenci silindi.")
    return {"message": "Student deleted successfully"}
