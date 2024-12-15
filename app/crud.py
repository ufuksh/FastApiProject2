from sqlalchemy.orm import Session
from . import models, schemas
from uuid import UUID
from passlib.context import CryptContext  # Parola hashleme için

# Parola hashleme context'i
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# -----------------------------
# User CRUD
# -----------------------------

def get_user_by_username(db: Session, username: str):
    """
    Kullanıcıyı kullanıcı adına göre getirir.
    """
    return db.query(models.User).filter(models.User.username == username).first()

def get_user_by_id(db: Session, user_id: UUID):
    """
    Kullanıcıyı ID'ye göre getirir.
    """
    return db.query(models.User).filter(models.User.id == str(user_id)).first()

def get_users(db: Session, skip: int = 0, limit: int = 100):
    """
    Tüm kullanıcıları getirir (sayfalama destekli).
    """
    return db.query(models.User).offset(skip).limit(limit).all()

def create_user(db: Session, user: schemas.UserCreate):
    """
    Yeni bir kullanıcı oluşturur.
    """
    hashed_password = pwd_context.hash(user.password)  # Parolayı hashle
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
    db_user = get_user_by_id(db, user_id)
    if db_user:
        if user_update.password:
            db_user.hashed_password = pwd_context.hash(user_update.password)  # Yeni parolayı hashle
        db.commit()
        db.refresh(db_user)
    return db_user

def delete_user(db: Session, user_id: UUID):
    """
    Mevcut bir kullanıcıyı siler.
    """
    db_user = get_user_by_id(db, user_id)
    if db_user:
        db.delete(db_user)
        db.commit()
    return db_user

# -----------------------------
# Student CRUD
# -----------------------------

def get_student(db: Session, student_id: UUID):
    return db.query(models.Student).filter(models.Student.id == student_id).first()

def get_students(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Student).offset(skip).limit(limit).all()

def create_student(db: Session, student: schemas.StudentCreate):
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
    db_student = get_student(db, student_id)
    if db_student:
        if student.first_name:
            db_student.first_name = student.first_name
        if student.last_name:
            db_student.last_name = student.last_name
        if student.email:
            db_student.email = student.email
        if student.date_of_birth:
            db_student.date_of_birth = student.date_of_birth
        if student.grade:
            db_student.grade = student.grade
        if student.contact_info:
            db_student.contact_info = student.contact_info
        db.commit()
        db.refresh(db_student)
    return db_student

def delete_student(db: Session, student_id: UUID):
    db_student = get_student(db, student_id)
    if db_student:
        db.delete(db_student)
        db.commit()
    return db_student

# -----------------------------
# Teacher CRUD
# -----------------------------

def get_teacher(db: Session, teacher_id: UUID):
    return db.query(models.Teacher).filter(models.Teacher.id == teacher_id).first()

def get_teachers(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Teacher).offset(skip).limit(limit).all()

def create_teacher(db: Session, teacher: schemas.TeacherCreate):
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
    db_teacher = get_teacher(db, teacher_id)
    if db_teacher:
        if teacher.first_name:
            db_teacher.first_name = teacher.first_name
        if teacher.last_name:
            db_teacher.last_name = teacher.last_name
        if teacher.email:
            db_teacher.email = teacher.email
        if teacher.subject_specialization:
            db_teacher.subject_specialization = teacher.subject_specialization
        if teacher.contact_info:
            db_teacher.contact_info = teacher.contact_info
        db.commit()
        db.refresh(db_teacher)
    return db_teacher

def delete_teacher(db: Session, teacher_id: UUID):
    db_teacher = get_teacher(db, teacher_id)
    if db_teacher:
        db.delete(db_teacher)
        db.commit()
    return db_teacher

# -----------------------------
# Schedule CRUD
# -----------------------------

def get_schedule(db: Session, schedule_id: UUID):
    return db.query(models.ClassSchedule).filter(models.ClassSchedule.id == schedule_id).first()

def get_schedules(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.ClassSchedule).offset(skip).limit(limit).all()

def create_schedule(db: Session, schedule: schemas.ScheduleCreate):
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
    db_schedule = get_schedule(db, schedule_id)
    if db_schedule:
        if schedule.title:
            db_schedule.title = schedule.title
        if schedule.description:
            db_schedule.description = schedule.description
        if schedule.start_time:
            db_schedule.start_time = schedule.start_time
        if schedule.end_time:
            db_schedule.end_time = schedule.end_time
        if schedule.student_id:
            db_schedule.student_id = schedule.student_id
        if schedule.teacher_id:
            db_schedule.teacher_id = schedule.teacher_id
        db.commit()
        db.refresh(db_schedule)
    return db_schedule

def delete_schedule(db: Session, schedule_id: UUID):
    db_schedule = get_schedule(db, schedule_id)
    if db_schedule:
        db.delete(db_schedule)
        db.commit()
    return db_schedule
