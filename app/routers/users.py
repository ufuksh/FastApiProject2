from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from sqlalchemy.orm import Session
from uuid import UUID
from passlib.context import CryptContext  # Parola hashleme için

from .. import crud, models
from ..database import SessionLocal

router = APIRouter(
    prefix="/users",
    tags=["users"],
)

# Parola hashleme context'i
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# -----------------------------
# Kullanıcı için Pydantic Modelleri
# -----------------------------
class UserCreate(BaseModel):
    username: str
    password: str
    email: str

class LoginRequest(BaseModel):
    username: str
    password: str

class UserUpdate(BaseModel):
    password: str

# -----------------------------
# Bağımlılık Fonksiyonu
# -----------------------------
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# -----------------------------
# Yeni Kullanıcı Oluşturma (POST)
# -----------------------------
@router.post("/", status_code=status.HTTP_201_CREATED)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    """
    Yeni bir kullanıcı oluşturur.
    """
    # Kullanıcı adı kontrolü
    db_user = crud.get_user_by_username(db, username=user.username)
    if db_user:
        raise HTTPException(status_code=400, detail="Username already exists")
    
    # Parola hashleme
    hashed_password = pwd_context.hash(user.password)
    
    # Yeni kullanıcı ekleme
    new_user = models.User(
        username=user.username,
        email=user.email,
        hashed_password=hashed_password
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"message": "User created successfully", "user": new_user.username}

# -----------------------------
# Kullanıcı Giriş (POST)
# -----------------------------
@router.post("/login")
def login(request: LoginRequest, db: Session = Depends(get_db)):
    """
    Kullanıcı girişini kontrol eder.
    """
    db_user = crud.get_user_by_username(db, username=request.username)
    if not db_user or not pwd_context.verify(request.password, db_user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid username or password")
    return {"message": "Login successful"}

# -----------------------------
# Kullanıcı Güncelleme (PUT)
# -----------------------------
@router.put("/{user_id}", response_model=dict)
def update_user(user_id: UUID, user: UserUpdate, db: Session = Depends(get_db)):
    """
    Mevcut bir kullanıcıyı günceller.
    """
    db_user = crud.get_user(db, user_id=user_id)
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Parola güncelleme (hashlenmiş şekilde)
    db_user.hashed_password = pwd_context.hash(user.password)
    db.commit()
    db.refresh(db_user)
    return {"message": "User updated successfully", "user": db_user.username}

# -----------------------------
# Kullanıcı Silme (DELETE)
# -----------------------------
@router.delete("/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_user(user_id: UUID, db: Session = Depends(get_db)):
    """
    Mevcut bir kullanıcıyı siler.
    """
    db_user = crud.get_user(db, user_id=user_id)
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    crud.delete_user(db, user_id=user_id)
    return {"message": "User deleted successfully"}
