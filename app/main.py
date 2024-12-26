import os
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from .routers import students, teachers, schedules, users

# FastAPI uygulaması
app = FastAPI()

# ----------------------------
# CORS Yapılandırması
# ----------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Geliştirme sırasında tüm kaynaklara izin ver
    allow_credentials=True,
    allow_methods=["*"],  # GET, POST, PUT, DELETE gibi tüm HTTP yöntemlerine izin ver
    allow_headers=["*"],  # Tüm header'lara izin ver
)

# ----------------------------
# Statik Dosyaların Servis Edilmesi
# ----------------------------
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DIST_DIR = os.path.abspath(os.path.join(BASE_DIR, "..", "frontend", "dist"))

# assets klasörü için özel mount
if os.path.exists(DIST_DIR):
    app.mount("/assets", StaticFiles(directory=os.path.join(DIST_DIR, "assets")), name="assets")
    app.mount("/", StaticFiles(directory=DIST_DIR, html=True), name="static")
else:
    print(f"Frontend dist klasörü bulunamadı: {DIST_DIR}")

# ----------------------------
# Router'ların Dahil Edilmesi
# ----------------------------
app.include_router(students.router, prefix="/api/students", tags=["students"])
app.include_router(teachers.router, prefix="/api/teachers", tags=["teachers"])
app.include_router(schedules.router, prefix="/api/schedules", tags=["schedules"])
app.include_router(users.router, prefix="/api/users", tags=["users"])

# ----------------------------
# Vue.js Catch-All Endpoint
# ----------------------------
@app.get("/{full_path:path}")
async def catch_all(full_path: str):
    index_file = os.path.join(DIST_DIR, "index.html")
    if os.path.exists(index_file):
        return FileResponse(index_file)
    return {"error": "index.html bulunamadı. Lütfen frontend'i build edin."}
