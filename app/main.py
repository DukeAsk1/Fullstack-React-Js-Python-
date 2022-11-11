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
async def startup_event(db: Session = SessionLocal()):
    Base.metadata.create_all(bind=engine)
    cruds.create_list_school(db)

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

@app.put("/create", response_model=schemas.School)
async def create(school: schemas.School, db: Session = Depends(get_db)):
    return cruds.create_school(db,school)

@app.get("/list")
def get_list_ids(db: Session= Depends(get_db)):
    return cruds.get_list(db)




