import os
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from .routers import students, teachers, schedules, users

# FastAPI uygulaması
app = FastAPI(
    title="School Data Entry System",
    version="1.0.0",
    description="CRUD operations for students, teachers, and schedules with user login.",
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
app.include_router(students.router)
app.include_router(teachers.router)
app.include_router(schedules.router)
app.include_router(users.router)
