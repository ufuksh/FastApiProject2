import os
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse, RedirectResponse
from .routers import students, teachers, schedules, users

# FastAPI uygulaması oluşturuluyor
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
    terms_of_service="http://example.com/terms/",
    contact={
        "name": "Support Team",
        "url": "http://example.com/contact/",
        "email": "support@example.com",
    },
    license_info={
        "name": "MIT License",
        "url": "https://opensource.org/licenses/MIT",
    },
)

# ----------------------------
# Statik Dosyaların Servis Edilmesi
# ----------------------------
# Vue.js frontend dist klasörünü servis etmek için StaticFiles kullanıyoruz.
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))  # Projenin ana dizini
DIST_DIR = os.path.join(BASE_DIR, "frontend", "dist")  # Vue.js dist dizini

# Vue dist klasörünü "/" kök dizinine mount ediyoruz.
app.mount("/", StaticFiles(directory=DIST_DIR, html=True), name="static")

# ----------------------------
# Router'ların Dahil Edilmesi
# ----------------------------
# Her bir modül için API rotalarını dahil ediyoruz
app.include_router(students.router)   # Öğrenciler için CRUD işlemleri
app.include_router(teachers.router)   # Öğretmenler için CRUD işlemleri
app.include_router(schedules.router)  # Ders programı için CRUD işlemleri
app.include_router(users.router)      # Kullanıcı login işlemleri

# ----------------------------
# Root Endpoint
# ----------------------------
@app.get("/ping", tags=["Health Check"])
def read_root():
    """
    Health check endpoint: API'nin çalıştığını doğrular.
    """
    return {"message": "API çalışıyor!"}

# ----------------------------
# Vue.js Catch-All Endpoint
# ----------------------------
@app.get("/{full_path:path}")
async def catch_all(full_path: str):
    """
    Vue.js tarafından ele alınmayan tüm rotalar için index.html döner.
    """
    # Direkt "/"'e yönlendirme
    return RedirectResponse("/")
