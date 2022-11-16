from sqlalchemy.orm import Session
from datetime import datetime
import models, schemas
from fastapi import HTTPException


def get_school(db: Session, user_id: int):
    return db.query(models.School).filter(models.School.id == user_id).first()


def get_schools(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.School).offset(skip).limit(limit).all()


def create_school(db: Session, school: schemas.School):
    #record = db.query(models.School).filter(models.School.id == school.id).first()
    #if record:
    #    raise HTTPException(status_code=409, detail="Already exists")
    db_school = models.School(**school.dict())
    db.add(db_school)
    db.commit()
    db.refresh(db_school)
    db_school.id = str(db_school.id)
    return db_school

def create_user(db: Session, user: schemas.User):
    #record = db.query(models.User).filter(models.User.id == user.id).first()
    #if record:
    #    raise HTTPException(status_code=409, detail="Already exists")
    db_user = models.User(**user.dict())
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    db_user.id = str(db_user.id)
    return db_user


def get_list_schools(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.School).offset(skip).limit(limit).all()

def get_list_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.User).offset(skip).limit(limit).all()
