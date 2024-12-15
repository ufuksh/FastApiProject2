import os
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
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
# Router'ların Dahil Edilmesi
# ----------------------------
# Her bir modül için API rotalarını dahil ediyoruz
app.include_router(students.router)   # Öğrenciler için CRUD işlemleri
app.include_router(teachers.router)   # Öğretmenler için CRUD işlemleri
app.include_router(schedules.router)  # Ders programı için CRUD işlemleri
app.include_router(users.router)      # Kullanıcı login işlemleri

# ----------------------------
# Statik Dosyaların Servis Edilmesi
# ----------------------------
# Vue.js frontend dist klasörünü servis etmek için StaticFiles kullanıyoruz.
# Bu sayede tarayıcı üzerinden Vue.js dosyaları erişilebilir.
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))  # Projenin ana dizini
DIST_DIR = os.path.join(BASE_DIR, "frontend", "dist")  # Vue.js dist dizini

# Vue dist klasörünü "/" kök dizinine mount ediyoruz.
app.mount("/", StaticFiles(directory=DIST_DIR, html=True), name="static")

# ----------------------------
# Root Endpoint
# ----------------------------
# API'nin çalıştığını test etmek için basit bir root endpoint.
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
    Vue.js uygulamasını desteklemek için bilinmeyen rotaları yakalar ve
    index.html dosyasını döndürür.
    """
    index_file = os.path.join(DIST_DIR, "index.html")
    if os.path.exists(index_file):
        return FileResponse(index_file)
    return {"message": "Not Found"}, 404
