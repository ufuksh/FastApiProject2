import os
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware

# Router dosyalarını import et
from .routers import students, teachers, schedules, users

# FastAPI uygulaması
app = FastAPI(title="Öğrenci Yönetim Sistemi", version="1.0.0")

# ----------------------------
# CORS Ayarları
# ----------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Geliştirme sırasında "*" kullanılabilir, üretimde domain belirtin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ----------------------------
# FastAPI Router'ları
# ----------------------------
# API rotalarını /api prefix'iyle belirleyerek frontend ile çakışmayı önleriz
app.include_router(students.router, prefix="/api/students", tags=["students"])
app.include_router(teachers.router, prefix="/api/teachers", tags=["teachers"])
app.include_router(schedules.router, prefix="/api/schedules", tags=["schedules"])
app.include_router(users.router, prefix="/api/users", tags=["users"])

# ----------------------------
# Statik Dosyalar
# ----------------------------
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DIST_DIR = os.path.abspath(os.path.join(BASE_DIR, "..", "frontend", "dist"))

if os.path.exists(DIST_DIR):
    app.mount("/", StaticFiles(directory=DIST_DIR, html=True), name="static")
else:
    print(f"Frontend dist klasörü bulunamadı: {DIST_DIR}")

# ----------------------------
# Vue.js Catch-All Endpoint
# ----------------------------
@app.get("/{full_path:path}")
async def catch_all(full_path: str):
    """
    Vue Router (history mode) kullanıyorsanız, frontend URL'lerini handle eder.
    """
    # API rotalarını dışarıda tutarak diğer URL'leri frontend'e yönlendiriyoruz
    if full_path.startswith("api"):
        return {"error": "API yolları catch-all tarafından işlenmiyor."}

    # Vue.js frontend index.html dosyasını döndürüyoruz
    index_file = os.path.join(DIST_DIR, "index.html")
    if os.path.exists(index_file):
        return FileResponse(index_file)
    return {"error": "index.html bulunamadı. Lütfen frontend'i build edin."}