from fastapi import FastAPI, Depends,Header, Request
from typing import Optional
from datetime import datetime
from datetime import datetime
import json
import base64
from database import Base, engine, SessionLocal
import cruds, schemas
from sqlalchemy.orm import Session

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
async def startup_event():
    Base.metadata.create_all(bind=engine)

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/date")
async def update_date():
    return {"Date today" : datetime.now()}

@app.get("/api/headers")
def read_hello(request: Request, x_userinfo: Optional[str] = Header(None, convert_underscores=True), ):
    print(request["headers"])
    return {"Headers": json.loads(base64.b64decode(x_userinfo))}

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.put("/create_school", response_model=schemas.School)
async def create(school: schemas.School, db: Session = Depends(get_db)):
    return cruds.create_school(db,school)


@app.put("/create_user", response_model=schemas.User)
async def create(user: schemas.User, db: Session = Depends(get_db)):
    return cruds.create_user(db,user)


@app.get("/list_schools")
def get_list_schools(db: Session= Depends(get_db)):
    return cruds.get_list_schools(db)

@app.get("/list_users")
def get_list_users(db: Session= Depends(get_db)):
    return cruds.get_list_users(db)