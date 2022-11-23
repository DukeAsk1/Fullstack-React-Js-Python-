from fastapi import FastAPI, Depends,Header, Request, HTTPException, status, UploadFile,File
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
#import fastapi_users
import models
from jose import JWTError, jwt
from typing import Union
import psycopg2
from PIL import Image
import io
from fastapi.middleware.cors import CORSMiddleware

SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
ALGORITHM = "HS256"
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")
ACCESS_TOKEN_EXPIRE_MINUTES = 30

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

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["POST", "GET"],
    allow_headers=[""],
)

@app.on_event("startup")
async def startup_event(db: Session = SessionLocal()):
    Base.metadata.create_all(bind=engine)
    data_user = json.loads(open('json_db/users.json').read())
    data_school = json.loads(open('json_db/schools.json').read())
    #print(len(data_user))
    cruds.create_list_user(db,data_user)
    cruds.create_list_school(db,data_school)
    

@app.get("/date")
async def update_date():
    return {"Date today" : datetime.now()}


@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.put("/create_school", response_model=schemas.School)
async def create(school: schemas.School, db: Session = Depends(get_db)):
    return cruds.create_school(db,school)

@app.get("/list_school")
def get_list_ids(db: Session= Depends(get_db)):
    return cruds.get_list_school(db)

@app.post("/users", response_model=schemas.UserCreate)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = cruds.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return cruds.create_user(db=db, user=user)


@app.post("/login", response_model=schemas.Token)
async def login(request: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.username == request.username).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Invalid Username')

    if user and not cruds.verify_password(request.password, user.password):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail='Invalid Password')

    # Generate a JWT Token
    access_token = cruds.create_access_token(data={"sub": user.username})

    return {"access_token": access_token, "token_type": "bearer"}



@app.get("/list_user")
def get_list_ids(db: Session= Depends(get_db)):
    return cruds.get_list_user(db)

async def get_current_user(db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)):# -> models.User:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED, #402
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = schemas.TokenData(username=username)
    except JWTError:
        raise credentials_exception
    user = cruds.get_user(db, token_data.username)
    if user is None:
        raise credentials_exception
    return user

async def get_current_active_user(current_user: schemas.UserBase = Depends(get_current_user)):
    print(current_user.username)
    current_user.id=str(current_user.id)
    if not current_user:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user


@app.get("/users/me/", response_model=schemas.UserBase)
async def read_users_me(current_user: schemas.UserBase = Depends(get_current_active_user)):
    return current_user


@app.get('/posts')
def get_posts(db: Session= Depends(get_db)):
    return cruds.get_posts(db)

@app.get('/posts/{post_id}', response_model=schemas.Post)
def get_post(post_id: int,db: Session= Depends(get_db)):
    return cruds.get_post_by_id(db,user_id=post_id)

@app.get('/posts/{cat_id}', response_model=schemas.Post)
def get_post(cat_id: str,db: Session= Depends(get_db)):
    return cruds.get_posts_by_category(db,cat=cat_id)

@app.post("/create_post", response_model = schemas.Post)
def create_post(post: schemas.Post, db: Session = Depends(get_db)):
    return cruds.create_post(db,post)

@app.post("/add_image")
def add_image(id: str, file: UploadFile=File(...), db: Session = Depends(get_db)):
    try:        
        im = Image.open(file.file)
        if im.mode in ("RGBA", "P"): 
            im = im.convert("RGB")
        buf = io.BytesIO()
        im.save(buf, 'JPEG', quality=50)
        # to get the entire bytes of the buffer use:
        contents = buf.getvalue()
        enc_data = base64.b64encode(contents)
        # or, to read from `buf` (which is a file-like object), call this first:
        buf.seek(0)  # to rewind the cursor to the start of the buffer
    except Exception:
        print('marche pas')
    return cruds.add_image(db=db, data=enc_data, id=id)

@app.post("/uploadfile")
def create_upload_file(file: UploadFile=File(...)):
    try:        
        im = Image.open(file.file)
        if im.mode in ("RGBA", "P"): 
            im = im.convert("RGB")
        buf = io.BytesIO()
        im.save(buf, 'JPEG', quality=50)
        # to get the entire bytes of the buffer use:
        contents = buf.getvalue()
        enc_data = base64.b64encode(contents)
        # or, to read from `buf` (which is a file-like object), call this first:
        buf.seek(0)  # to rewind the cursor to the start of the buffer
    except Exception:
        print('marche pas')
    return enc_data

@app.get('/usersbyschool')
def get_users_by_school(school_id: str, db: Session= Depends(get_db)):
    return cruds.get_users_by_school(db, school_id)