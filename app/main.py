# app/main.py
from fastapi import FastAPI
from .routers import students, teachers, schedules, auth  # auth router daha önce oluşturulduysa

app = FastAPI(
    title="FastAPI Project",
    description="API Documentation for FastAPI Project",
    version="1.0.0",
    terms_of_service="http://example.com/terms/",
    contact={
        "name": "Support",
        "url": "http://example.com/contact/",
        "email": "support@example.com",
    },
    license_info={
        "name": "MIT License",
        "url": "https://opensource.org/licenses/MIT",
    },
)

app.include_router(auth.router)  # Eğer auth router kullanıyorsanız
app.include_router(students.router)
app.include_router(teachers.router)
app.include_router(schedules.router)

@app.get("/")
def read_root():
    return {"Hello": "World"}
