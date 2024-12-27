from sqlalchemy.orm import Session
from . import models, schemas
from uuid import UUID
from passlib.context import CryptContext
from fastapi import HTTPException

# Parola hashleme context'i
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# -----------------------------
# User CRUD
# -----------------------------

def get_user_by_username(db: Session, username: str):
    """
    Kullanıcıyı kullanıcı adına göre getirir.
    """
    print(f"get_user_by_username: Kullanıcı adı: {username}")
    return db.query(models.User).filter(models.User.username == username).first()

def get_user_by_id(db: Session, user_id: UUID):
    """
    Kullanıcıyı ID'ye göre getirir.
    """
    try:
        UUID(str(user_id))  # UUID doğrulama
    except ValueError:
        print("Invalid UUID format")
        return None

    print(f"get_user_by_id: Kullanıcı ID: {user_id}")
    return db.query(models.User).filter(models.User.id == str(user_id)).first()

def get_users(db: Session, skip: int = 0, limit: int = 100):
    """
    Tüm kullanıcıları getirir (sayfalama destekli).
    """
    print(f"get_users: Skip={skip}, Limit={limit}")
    return db.query(models.User).offset(skip).limit(limit).all()

def create_user(db: Session, user: schemas.UserCreate):
    """
    Yeni bir kullanıcı oluşturur.
    """
    print(f"create_user: Yeni kullanıcı oluşturuluyor: {user.username}")
    hashed_password = pwd_context.hash(user.password)
    db_user = models.User(
        username=user.username,
        email=user.email,
        hashed_password=hashed_password
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def update_user(db: Session, user_id: UUID, user_update: schemas.UserUpdate):
    """
    Mevcut bir kullanıcının bilgilerini günceller.
    """
    try:
        UUID(str(user_id))  # UUID doğrulama
    except ValueError:
        print("Invalid UUID format")
        return None

    print(f"update_user: Kullanıcı ID={user_id} güncelleniyor.")
    db_user = get_user_by_id(db, user_id)
    if db_user:
        update_data = user_update.model_dump(exclude_unset=True)
        for key, value in update_data.items():
            setattr(db_user, key, value)
        db.commit()
        db.refresh(db_user)
    return db_user

def delete_user(db: Session, user_id: UUID):
    """
    Mevcut bir kullanıcıyı siler.
    """
    try:
        UUID(str(user_id))  # UUID doğrulama
    except ValueError:
        print("Invalid UUID format")
        return None

    print(f"delete_user: Kullanıcı ID={user_id} siliniyor.")
    db_user = get_user_by_id(db, user_id)
    if db_user:
        db.delete(db_user)
        db.commit()
    return db_user

# -----------------------------
# Student CRUD
# -----------------------------

def get_student(db: Session, student_id: UUID):
    try:
        UUID(str(student_id))  # UUID doğrulama
    except ValueError:
        print("Invalid UUID format")
        return None

    print(f"get_student: Öğrenci ID={student_id}")
    return db.query(models.Student).filter(models.Student.id == str(student_id)).first()

def get_students(db: Session, skip: int = 0, limit: int = 100):
    print(f"get_students: Skip={skip}, Limit={limit}")
    return db.query(models.Student).offset(skip).limit(limit).all()

def create_student(db: Session, student: schemas.StudentCreate):
    print(f"create_student: Yeni öğrenci oluşturuluyor: {student.first_name} {student.last_name}")
    db_student = models.Student(
        first_name=student.first_name,
        last_name=student.last_name,
        email=student.email,
        date_of_birth=student.date_of_birth,
        grade=student.grade,
        contact_info=student.contact_info
    )
    db.add(db_student)
    db.commit()
    db.refresh(db_student)
    return db_student

def update_student(db: Session, student_id: UUID, student: schemas.StudentUpdate):
    try:
        UUID(str(student_id))  # UUID doğrulama
    except ValueError:
        print("Invalid UUID format")
        return None

    print(f"update_student: Öğrenci ID={student_id} güncelleniyor.")
    db_student = get_student(db, student_id)
    if db_student:
        update_data = student.model_dump(exclude_unset=True)
        for key, value in update_data.items():
            setattr(db_student, key, value)
        db.commit()
        db.refresh(db_student)
    return db_student

def delete_student(db: Session, student_id: UUID):
    try:
        UUID(str(student_id))  # UUID doğrulama
    except ValueError:
        print("Invalid UUID format")
        return None

    print(f"delete_student: Öğrenci ID={student_id} siliniyor.")
    db_student = get_student(db, student_id)
    if db_student:
        db.delete(db_student)
        db.commit()
    return db_student

# -----------------------------
# Teacher CRUD
# -----------------------------

def get_teacher(db: Session, teacher_id: UUID):
    try:
        UUID(str(teacher_id))  # UUID doğrulama
    except ValueError:
        print("Invalid UUID format")
        return None

    print(f"get_teacher: Öğretmen ID={teacher_id}")
    return db.query(models.Teacher).filter(models.Teacher.id == str(teacher_id)).first()

def get_teachers(db: Session, skip: int = 0, limit: int = 100):
    print(f"get_teachers: Skip={skip}, Limit={limit}")
    return db.query(models.Teacher).offset(skip).limit(limit).all()

def create_teacher(db: Session, teacher: schemas.TeacherCreate):
    print(f"create_teacher: Yeni öğretmen oluşturuluyor: {teacher.first_name} {teacher.last_name}")
    db_teacher = models.Teacher(
        first_name=teacher.first_name,
        last_name=teacher.last_name,
        email=teacher.email,
        subject_specialization=teacher.subject_specialization,
        contact_info=teacher.contact_info
    )
    db.add(db_teacher)
    db.commit()
    db.refresh(db_teacher)
    return db_teacher

def update_teacher(db: Session, teacher_id: UUID, teacher: schemas.TeacherUpdate):
    try:
        UUID(str(teacher_id))  # UUID doğrulama
    except ValueError:
        print("Invalid UUID format")
        return None

    print(f"update_teacher: Öğretmen ID={teacher_id} güncelleniyor.")
    db_teacher = get_teacher(db, teacher_id)
    if db_teacher:
        update_data = teacher.model_dump(exclude_unset=True)
        for key, value in update_data.items():
            setattr(db_teacher, key, value)
        db.commit()
        db.refresh(db_teacher)
    return db_teacher

def delete_teacher(db: Session, teacher_id: UUID):
    try:
        UUID(str(teacher_id))  # UUID doğrulama
    except ValueError:
        print("Invalid UUID format")
        return None

    print(f"delete_teacher: Öğretmen ID={teacher_id} siliniyor.")
    db_teacher = get_teacher(db, teacher_id)
    if db_teacher:
        db.delete(db_teacher)
        db.commit()
    return db_teacher

# -----------------------------
# Schedule CRUD
# -----------------------------

def get_schedule(db: Session, schedule_id: UUID):
    try:
        UUID(str(schedule_id))  # UUID doğrulama
    except ValueError:
        print("Invalid UUID format")
        return None

    print(f"get_schedule: Program ID={schedule_id}")
    return db.query(models.ClassSchedule).filter(models.ClassSchedule.id == str(schedule_id)).first()

def get_schedules(db: Session, skip: int = 0, limit: int = 100):
    print(f"get_schedules: Skip={skip}, Limit={limit}")
    return db.query(models.ClassSchedule).offset(skip).limit(limit).all()

def create_schedule(db: Session, schedule: schemas.ScheduleCreate):
    print(f"create_schedule: Yeni program oluşturuluyor: {schedule.title}")
    db_schedule = models.ClassSchedule(
        title=schedule.title,
        description=schedule.description,
        start_time=schedule.start_time,
        end_time=schedule.end_time,
        student_id=schedule.student_id,
        teacher_id=schedule.teacher_id
    )
    db.add(db_schedule)
    db.commit()
    db.refresh(db_schedule)
    return db_schedule

def update_schedule(db: Session, schedule_id: UUID, schedule: schemas.ScheduleUpdate):
    try:
        UUID(str(schedule_id))  # UUID doğrulama
    except ValueError:
        print("Invalid UUID format")
        return None

    print(f"update_schedule: Program ID={schedule_id} güncelleniyor.")
    db_schedule = get_schedule(db, schedule_id)
    if db_schedule:
        update_data = schedule.model_dump(exclude_unset=True)
        for key, value in update_data.items():
            setattr(db_schedule, key, value)
        db.commit()
        db.refresh(db_schedule)
    return db_schedule

def delete_schedule(db: Session, schedule_id: UUID):
    """
    Belirtilen programı (schedule) siler.
    """
    try:
        # UUID doğrulaması
        UUID(str(schedule_id))
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid UUID format")

    print(f"delete_schedule: Program ID={schedule_id} siliniyor.")

    # Programı veritabanından al
    db_schedule = get_schedule(db, schedule_id)
    if not db_schedule:
        raise HTTPException(status_code=404, detail=f"Schedule with ID {schedule_id} not found")

    try:
        # Programı sil ve değişiklikleri kaydet
        db.delete(db_schedule)
        db.commit()
        print(f"delete_schedule: Program ID={schedule_id} başarıyla silindi.")
        return {"message": "Schedule deleted successfully"}
    except Exception as e:
        print(f"delete_schedule: Program silinirken bir hata oluştu: {str(e)}")
        raise HTTPException(status_code=500, detail="An error occurred while deleting the schedule")