from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter()

# Kullanıcı login için veri modeli
class LoginRequest(BaseModel):
    username: str
    password: str

@router.post("/users/login")
def login(request: LoginRequest):
    # Örnek bir doğrulama (gerçek uygulamada veritabanı kullanmalısınız)
    if request.username == "test" and request.password == "1234":
        return {"message": "Login successful"}
    raise HTTPException(status_code=401, detail="Invalid username or password")
