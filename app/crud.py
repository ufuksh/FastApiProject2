from sqlalchemy.orm import Session
from . import models, schemas
from uuid import UUID

# -----------------------------
# User CRUD
# -----------------------------

def get_user_by_username(db: Session, username: str):
    """
    Retrieve a user by their username.

    :param db: Database session
    :param username: Username to search for
    :return: User object or None if not found
    """
    return db.query(models.User).filter(models.User.username == username).first()

def get_user_by_id(db: Session, user_id: UUID):
    """
    Retrieve a user by their ID.

    :param db: Database session
    :param user_id: UUID of the user
    :return: User object or None if not found
    """
    return db.query(models.User).filter(models.User.id == user_id).first()

def get_users(db: Session, skip: int = 0, limit: int = 100):
    """
    Retrieve multiple users with pagination.

    :param db: Database session
    :param skip: Number of records to skip
    :param limit: Maximum number of records to return
    :return: List of User objects
    """
    return db.query(models.User).offset(skip).limit(limit).all()

def create_user(db: Session, user: schemas.UserCreate):
    """
    Create a new user.

    :param db: Database session
    :param user: UserCreate schema containing user details
    :return: Created User object
    """
    db_user = models.User(
        username=user.username,
        email=user.email,
        hashed_password=user.hashed_password  # Ensure you hash the password before passing it here
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def update_user(db: Session, user_id: UUID, user_update: schemas.UserUpdate):
    """
    Update an existing user's information.

    :param db: Database session
    :param user_id: UUID of the user to update
    :param user_update: UserUpdate schema containing updated fields
    :return: Updated User object or None if not found
    """
    db_user = get_user_by_id(db, user_id)
    if db_user:
        if user_update.username:
            db_user.username = user_update.username
        if user_update.email:
            db_user.email = user_update.email
        if user_update.hashed_password:
            db_user.hashed_password = user_update.hashed_password  # Ensure password is hashed
        # Add other fields as necessary
        db.commit()
        db.refresh(db_user)
    return db_user

def delete_user(db: Session, user_id: UUID):
    """
    Delete a user by their ID.

    :param db: Database session
    :param user_id: UUID of the user to delete
    :return: Deleted User object or None if not found
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

def create_student(db: Session, student: schemas.Student):
    db_student = models.Student(
        id=student.id,
        name=student.name,
        email=student.email,
        created_at=student.created_at
    )
    db.add(db_student)
    db.commit()
    db.refresh(db_student)
    return db_student

def update_student(db: Session, student_id: UUID, student: schemas.StudentCreate):
    db_student = get_student(db, student_id)
    if db_student:
        db_student.first_name = student.first_name
        db_student.last_name = student.last_name
        db_student.date_of_birth = student.date_of_birth
        db_student.grade = student.grade
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
        subject_specialization=teacher.subject_specialization,
        contact_info=teacher.contact_info
    )
    db.add(db_teacher)
    db.commit()
    db.refresh(db_teacher)
    return db_teacher

def update_teacher(db: Session, teacher_id: UUID, teacher: schemas.TeacherCreate):
    db_teacher = get_teacher(db, teacher_id)
    if db_teacher:
        db_teacher.first_name = teacher.first_name
        db_teacher.last_name = teacher.last_name
        db_teacher.subject_specialization = teacher.subject_specialization
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
        class_name=schedule.class_name,
        assigned_teacher=schedule.assigned_teacher,
        schedule_timings=schedule.schedule_timings
    )
    db.add(db_schedule)
    db.commit()
    db.refresh(db_schedule)
    return db_schedule

def update_schedule(db: Session, schedule_id: UUID, schedule: schemas.ScheduleCreate):
    db_schedule = get_schedule(db, schedule_id)
    if db_schedule:
        db_schedule.class_name = schedule.class_name
        db_schedule.assigned_teacher = schedule.assigned_teacher
        db_schedule.schedule_timings = schedule.schedule_timings
        db.commit()
        db.refresh(db_schedule)
    return db_schedule

def delete_schedule(db: Session, schedule_id: UUID):
    db_schedule = get_schedule(db, schedule_id)
    if db_schedule:
        db.delete(db_schedule)
        db.commit()
    return db_schedule
