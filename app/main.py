import os
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from .routers import students, teachers, schedules, users

app = FastAPI()

# ----------------------------
# Statik Dosyaların Servis Edilmesi
# ----------------------------
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DIST_DIR = os.path.join(BASE_DIR, "..", "frontend", "dist")

# Vue.js build klasörünü "/static" altında servis et
app.mount("/static", StaticFiles(directory=DIST_DIR), name="static")

# ----------------------------
# Router'ların Dahil Edilmesi
# ----------------------------
app.include_router(students.router)
app.include_router(teachers.router)
app.include_router(schedules.router)
app.include_router(users.router)

# ----------------------------
# Vue.js Catch-All Endpoint
# ----------------------------
@app.get("/{full_path:path}")
async def catch_all(full_path: str):
    """
    Bilinmeyen tüm rotaları Vue.js uygulamasının index.html dosyasına yönlendirir.
    """
    index_file = os.path.join(DIST_DIR, "index.html")
    if os.path.exists(index_file):
        return FileResponse(index_file)
    return {"detail": "Not Found"}, 404
