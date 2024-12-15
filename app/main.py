import os
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from .routers import students, teachers, schedules, users

# FastAPI uygulaması
app = FastAPI()

# ----------------------------
# Statik Dosyaların Servis Edilmesi
# ----------------------------
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DIST_DIR = os.path.join(BASE_DIR, "..", "frontend", "dist")  # Vue.js build klasörü

# Vue build klasöründeki alt dizinleri mount ediyoruz
app.mount("/css", StaticFiles(directory=os.path.join(DIST_DIR, "css")), name="css")
app.mount("/js", StaticFiles(directory=os.path.join(DIST_DIR, "js")), name="js")
app.mount("/", StaticFiles(directory=DIST_DIR, html=True), name="root")

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
    Vue.js için bilinmeyen rotaları yakalar ve index.html döner.
    """
    return FileResponse(os.path.join(DIST_DIR, "index.html"))
