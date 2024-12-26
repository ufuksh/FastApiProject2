# app/database.py
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv

# Çevre değişkenlerini yükle
load_dotenv()

# Veritabanı bağlantı URL'sini kontrol et
DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    raise ValueError("DATABASE_URL çevre değişkeni ayarlanmadı. Lütfen .env dosyasını kontrol edin.")

# Veritabanı motorunu oluştur
try:
    engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False} if "sqlite" in DATABASE_URL else {})
except Exception as e:
    raise ValueError(f"Veritabanı motoru oluşturulurken bir hata oluştu: {e}")

# Oturum yönetimi için sessionmaker
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# ORM modelleri için Base
Base = declarative_base()
