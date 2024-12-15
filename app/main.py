import os
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from .routers import students, teachers, schedules, users

# FastAPI uygulaması
app = FastAPI(
    title="School Data Entry System",
    description="""
    API Documentation for School Data Entry System.

    This project includes CRUD operations for:
    - Students
    - Teachers
    - Class Schedules
    - User Authentication
    """,
    version="1.0.0",
)

# ----------------------------
# Statik Dosyaların Servis Edilmesi
# ----------------------------
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DIST_DIR = os.path.join(BASE_DIR, "frontend", "dist")

# Vue.js dist klasörünü "/" kök dizinine mount ediyoruz
app.mount("/", StaticFiles(directory=DIST_DIR, html=True), name="static")

# ----------------------------
# Router'ların Dahil Edilmesi
# ----------------------------
app.include_router(students.router)   # Öğrenci CRUD
app.include_router(teachers.router)   # Öğretmen CRUD
app.include_router(schedules.router)  # Ders Programı CRUD
app.include_router(users.router)      # Kullanıcı CRUD

# ----------------------------
# Vue.js Catch-All Endpoint
# ----------------------------
@app.get("/{full_path:path}")
async def catch_all(full_path: str):
    """
    Vue.js tarafından ele alınmayan tüm rotalar için index.html döner.
    """
    return FileResponse(os.path.join(DIST_DIR, "index.html"))
