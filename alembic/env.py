# alembic/env.py
import os
from logging.config import fileConfig
from sqlalchemy import engine_from_config, pool
from alembic import context
from dotenv import load_dotenv

# .env dosyasını yükleyin
load_dotenv()

# Alembic yapılandırmasını alın
config = context.config

# Config dosyasındaki logging ayarlarını yükleyin
fileConfig(config.config_file_name)

# Modelinizi içe aktarın
from app.models import Base  # Model dosyanızın doğru yolunu kullanın

# Hedef metadata'yı belirleyin
target_metadata = Base.metadata

def run_migrations_offline():
    """Offline migrasyon çalıştırma."""
    url = os.getenv("DATABASE_URL")
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()

def run_migrations_online():
    """Online migrasyon çalıştırma."""
    connectable = engine_from_config(
        config.get_section(config.config_ini_section),
        prefix='sqlalchemy.',
        poolclass=pool.NullPool
    )

    with connectable.connect() as connection:
        context.configure(
            connection=connection,
            target_metadata=target_metadata
        )

        with context.begin_transaction():
            context.run_migrations()

if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
