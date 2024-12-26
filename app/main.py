import os
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware

# Router dosyalarını import et
from .routers import students, teachers, schedules, users

app = FastAPI()

# ----------------------------
# CORS Ayarları
# ----------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ----------------------------
# Statik Dosyalar
# ----------------------------
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DIST_DIR = os.path.abspath(os.path.join(BASE_DIR, "..", "frontend", "dist"))

# Eğer build alınmış dist klasörü varsa /assets yoluna mount et
if os.path.exists(DIST_DIR):
    app.mount(
        "/assets",
        StaticFiles(directory=os.path.join(DIST_DIR, "assets")),
        name="assets",
    )
else:
    print(f"Frontend dist klasörü bulunamadı: {DIST_DIR}")

# ----------------------------
# FastAPI Router'ları
# ----------------------------
# API rotalarına /api prefix'i ekleyerek front-end ile çakışmayı engelliyoruz
app.include_router(students.router, prefix="/api/students", tags=["students"])
app.include_router(teachers.router, prefix="/api/teachers", tags=["teachers"])
app.include_router(schedules.router, prefix="/api/schedules", tags=["schedules"])
app.include_router(users.router, prefix="/api/users", tags=["users"])

# ----------------------------
# Vue.js Catch-All Endpoint
# ----------------------------
# Vue Router (history mode) ile /students, /teachers gibi URL'lere
# doğrudan girildiğinde index.html döndürülür.
@app.get("/{full_path:path}")
async def catch_all(full_path: str):
    index_file = os.path.join(DIST_DIR, "index.html")
    if os.path.exists(index_file):
        return FileResponse(index_file)
    return {"error": "index.html bulunamadı. Lütfen frontend'i build edin."}
