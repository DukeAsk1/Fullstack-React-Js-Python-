from fastapi import FastAPI, Depends,Header, Request, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from typing import Optional
from datetime import datetime
from datetime import datetime
import json
import base64
from database import Base, engine, SessionLocal
import cruds, schemas
from sqlalchemy.orm import Session
import database

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


app = FastAPI(
    title="My title",
    description="My description",
    version="0.0.1",
)

@app.on_event("startup")
async def startup_event(db: Session = SessionLocal()):
    Base.metadata.create_all(bind=engine)
    # cruds.create_list_user(db)
    # cruds.create_list_school(db)
    

# @app.get("/")
# def read_root():
#     return {"Hello": "World"}

# @app.get("/date")
# async def update_date():
#     return {"Date today" : datetime.now()}

# @app.get("/api/headers")
# def read_hello(request: Request, x_userinfo: Optional[str] = Header(None, convert_underscores=True), ):
#     print(request["headers"])
#     return {"Headers": json.loads(base64.b64decode(x_userinfo))}

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.put("/create", response_model=schemas.School)
async def create(school: schemas.School, db: Session = Depends(get_db)):
    return cruds.create_school(db,school)

@app.get("/list_school")
def get_list_ids(db: Session= Depends(get_db)):
    return cruds.get_list_school(db)

# @app.put("/login")
# def get_login_info(user: schemas.UserLogin,db: Session= Depends(get_db)):
#     username = user.username
#     password = user.password
#     return cruds.get_login_user(db,username,password)

@app.post("/users", response_model=schemas.UserCreate)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = cruds.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return cruds.create_user(db=db, user=user)


# @app.get("/users", response_model=list[schemas.User])
# def read_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
#     users = cruds.get_users(db, skip=skip, limit=limit)
#     return users

@app.post("/login", response_model=schemas.UserLogin)
async def login_user(user: schemas.UserLogin, db: Session = Depends(get_db)):#form_data: OAuth2PasswordRequestForm = Depends())
    #user = await cruds.authentificate_user(db, form_data.username, form_data.password)
    user_info = cruds.get_user(db, user.username)
    if not user_info or user_info.password != user.password:
        raise HTTPException(
            status_code=400,#status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return user_info


@app.get("/users/{user_name}", response_model=schemas.UserBase)
def read_user(user_name:str, db: Session = Depends(get_db)):
    db_user = cruds.get_user(db, user_name)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user

@app.get("/list_user")
def get_list_ids(db: Session= Depends(get_db)):
    return cruds.get_list_user(db)







