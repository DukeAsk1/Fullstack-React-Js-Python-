from sqlalchemy.orm import Session
from sqlalchemy.dialects.postgresql import UUID
from datetime import datetime, timedelta
import models, schemas
from fastapi import HTTPException, status, Depends,UploadFile,File
import uuid
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from passlib.context import CryptContext

SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# SCHOOL 

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

def get_list_school(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.School).offset(skip).limit(limit).all()

def create_list_school(db: Session,list_school):
    for i in list_school:
        school1 = models.School(**i)
        db.add(school1)
        db.commit()
        db.refresh(school1)
        school1.id = str(school1.id)

# USER

def create_user(db: Session, user: schemas.UserCreate):
    #fake_hashed_password = user.password + "notreallyhashed"
    db_user = models.User(**user.dict())
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    db_user.id = str(db_user.id)
    return db_user

def get_user(db: Session,user_name: str):
    return db.query(models.User).filter(models.User.username == user_name).first()

def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()

def get_list_user(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.User).offset(skip).limit(limit).all()

def create_list_user(db: Session,list_user):
    for i in list_user:
        db_user = models.User(**i)
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        #db_user.id = str(db_user.id)        

def get_users_by_school(db: Session, school_id: str):
    return db.query(models.User).filter(models.User.school_id == school_id).all()

# CATEGORY
        
def create_list_category(db: Session,list_category):
    for i in list_category:
        db_category = models.Category(**i)
        db.add(db_category)
        db.commit()
        db.refresh(db_category)

def get_all_category(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Category).offset(skip).limit(limit).all()

def get_category_id(db: Session,name:str):
    return db.query(models.Category.id).filter(models.Category.name == name)

# LOGIN

def verify_password(plain_password, base_password):
    if plain_password != base_password:
        return False
    else:
        return True

def authentificate_user(db: Session, username: str, pass_word: str):
    user = get_user(db, username)
    if not user:
        return False
    if pass_word != user.password:
        return False
    return user


def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

# POST

def create_list_posts(db: Session,list_posts):
    for i in list_posts:
        db_post = models.Post(id= str(uuid.uuid4()),**i)
        db.add(db_post)
        db.commit()
        db.refresh(db_post)
        #db_user.id = str(db_user.id)

def create_post(db: Session,post: schemas.Post, id:str):
    db_post = models.Post(**post.dict())
    db_post.seller_id = id
    db.add(db_post)
    db.commit()
    db.refresh(db_post)
    db_post.id = str(db_post.id)
    #print(db_post.id)
    return db_post

def add_image(db: Session, data, id:str):
    db_post = db.query(models.Post).filter(models.Post.id == id).first()
    print(data)
    for key, value in data.items():
        setattr(db_post, key, value)
    db.add(db_post)
    db.commit()
    db.refresh(db_post)
    return db_post

def get_post_by_id(db: Session, post_id: str):
    return db.query(models.Post).filter(models.Post.id == post_id).first()

def get_post_image(db: Session, post_id: str):
    return db.query(models.Post.jpeg).filter(models.Post.id == post_id).first()

def get_posts(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Post).offset(skip).limit(limit).all()


def get_posts_by_category(db: Session, cat: str, skip: int = 0, limit: int = 100):
    return db.query(models.Post).filter(models.Post.category == cat).offset(skip).limit(limit).all()




# COMMENT

def create_list_comment(db: Session, list_comment):
    for i in list_comment:
        db_comment = models.Comment(id= str(uuid.uuid4()),**i)
        db.add(db_comment)
        db.commit()
        db.refresh(db_comment)
        #db_comment.id = str(db_comment.id)

def create_comment(db: Session, comment: schemas.Comment, buyer_id: str, seller_id: str):
    #record = db.query(models.School).filter(models.School.id == school.id).first()
    #if record:
    #    raise HTTPException(status_code=409, detail="Already exists")
    db_comment = models.Comment(**comment.dict())
    db_comment.buyer_id=buyer_id
    db_comment.seller_id=seller_id
    db.add(db_comment)
    db.commit()
    db.refresh(db_comment)
    db_comment.id = str(db_comment.id)
    return db_comment

def get_all_comments(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Comment).offset(skip).limit(limit).all()

def get_comment(db: Session, user_id: int):
    return db.query(models.Comment).filter(models.Comment.id == user_id).first()

def get_comments_by_seller(db: Session, seller_id: str):
    return db.query(models.Comment).filter(models.Comment.seller_id == seller_id).all()





