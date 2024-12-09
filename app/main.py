from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from .routers import students, teachers, schedules  # Diğer router'larınız

app = FastAPI(
    title="FastAPI Project",
    description="API Documentation for FastAPI Project",
    version="1.0.0",
)

# CORS ayarları
origins = [
    "http://localhost:8080",  # Geliştirme sırasında Vue.js uygulamanızın çalıştığı adres
    # Üretim ortamında frontend'inizin URL'sini ekleyin, örneğin:
    # "https://your-production-domain.com",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Router'ları ekleyin
app.include_router(students.router)
app.include_router(teachers.router)
app.include_router(schedules.router)

# Vue.js build dosyalarını sunma
app.mount("/", StaticFiles(directory="frontend/dist", html=True), name="frontend")

@app.get("/api/health")
def read_health():
    return {"status": "ok"}
