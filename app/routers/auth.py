from fastapi import APIRouter

router = APIRouter()

@router.post("/users/login")
def login(username: str, password: str):
    # Login işlemi
    return {"message": "Login successful"}
