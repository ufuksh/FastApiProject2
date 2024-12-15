from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from sqlalchemy.orm import Session
from uuid import UUID

from .. import crud, models
from ..database import SessionLocal

router = APIRouter(
    prefix="/users",
    tags=["users"],
)

# Kullanıcı için Pydantic modelleri
class UserCreate(BaseModel):
    username: str
    password: str
    email: str

class LoginRequest(BaseModel):
    username: str
    password: str

class UserUpdate(BaseModel):
    password: str

# Bağımlılık fonksiyonu
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# POST: Yeni kullanıcı oluşturma
@router.post("/", status_code=status.HTTP_201_CREATED)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    """
    Yeni bir kullanıcı oluşturur.
    """
    db_user = crud.get_user_by_username(db, username=user.username)
    if db_user:
        raise HTTPException(status_code=400, detail="Username already exists")
    
    new_user = models.User(
        username=user.username,
        email=user.email,
        password=user.password  # Parola burada hashlenmelidir
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"message": "User created successfully", "user": new_user.username}

# POST: Kullanıcı login
@router.post("/login")
def login(request: LoginRequest, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_username(db, username=request.username)
    if db_user and db_user.password == request.password:  # Parola hash kontrolü yapılmalı
        return {"message": "Login successful"}
    raise HTTPException(status_code=401, detail="Invalid username or password")

# PUT: Kullanıcı güncelleme
@router.put("/{user_id}", response_model=dict)
def update_user(user_id: UUID, user: UserUpdate, db: Session = Depends(get_db)):
    db_user = crud.get_user(db, user_id=user_id)
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    updated_user = crud.update_user(db, user_id=user_id, password=user.password)
    return {"message": "User updated successfully", "user": updated_user.username}

# DELETE: Kullanıcı silme
@router.delete("/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_user(user_id: UUID, db: Session = Depends(get_db)):
    db_user = crud.get_user(db, user_id=user_id)
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    crud.delete_user(db, user_id=user_id)
    return {"message": "User deleted successfully"}
