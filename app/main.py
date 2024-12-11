import os
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from .routers import students, teachers, schedules

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

# API rotalarını dahil ediyoruz
app.include_router(students.router)
app.include_router(teachers.router)
app.include_router(schedules.router)

# Vue dist klasörünü absolute bir yol ile mount ediyoruz
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DIST_DIR = os.path.join(BASE_DIR, "frontend", "dist")

# StaticFiles mount işlemi
app.mount("/", StaticFiles(directory=DIST_DIR, html=True), name="static")
