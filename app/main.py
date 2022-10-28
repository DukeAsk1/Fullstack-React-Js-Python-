from fastapi import FastAPI, Depends,Header, Request, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional
from datetime import datetime
from pydantic import BaseModel, Field
from uuid import uuid4
from typing_extensions import Annotated

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os 

from sqlalchemy import Column, String, DateTime
from sqlalchemy.dialects.postgresql import UUID
#from database import engine, SessionLocal

from models import BaseSQL, engine
#from services import create_post
from routers import PostRouter, HealthRouter
from sqlalchemy.orm import Session
from fastapi import HTTPException
from datetime import datetime
#import models, schema
import json
from starlette_exporter import PrometheusMiddleware, handle_metrics
import base64



app = FastAPI(
    title="My title",
    description="My description",
    version="0.0.1",
)

origins = [
    "http://localhost:4200",
    "http://localhost:3000",
    "http://localhost:3001",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(PostRouter)
app.include_router(HealthRouter)

app.add_middleware(PrometheusMiddleware)
app.add_route("/metrics", handle_metrics)

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/date")
async def update_date():
    return {"Date today" : datetime.now()}

@app.on_event("startup")
async def startup_event():
    BaseSQL.metadata.create_all(bind=engine)

@app.get("/api/headers")
def read_hello(request: Request, x_userinfo: Optional[str] = Header(None, convert_underscores=True), ):
    print(request["headers"])
    return {"Headers": json.loads(base64.b64decode(x_userinfo))}

@app.get("/")
def read_root():
    return {"Hello": "World"}


# @app.post("/create", response_model=schema.Post)
# async def create(post: schema.Post, db: Session = Depends(get_db)):
#     return crud.create_post(db,post)

# @app.get("/posts", response_model=schema.Post)
# def get_posts(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
#     posts = crud.get_posts(db, skip=skip, limit=limit)
#     return posts

# @app.get("/posts/{post_id}", response_model=schema.Post)
# def get_post_by_id(post_id: int, db: Session = Depends(get_db)):
#     db_post = crud.get_post_by_id(post_id,db)
#     if db_post is None:
#         raise HTTPException(status_code=404, detail="User not found")
#     return db_post

# @app.post("/posts/{post_id}", response_model=schema.Post)
# async def update_post_by_id(post_id: int, db: Session = Depends(get_db)):
#     return crud.update_post_by_id(post_id,db)

# @app.post("/posts/{post_id}", response_model=schema.Post)
# async def delete_post_by_id(post_id: int, db: Session = Depends(get_db)):
#     return crud.delete_post_by_id(post_id,db)

# @app.post("/posts", tags=["posts"])
# async def create_post(db: Session, post: schema.Post) -> models.Post:
#     record = db.query(models.Post).filter(models.Post.id == post.id).first()
#     if record:
#         raise HTTPException(status_code=409, detail="Already exists")
#     db_post = models.Post(**post.dict())
#     db.add(db_post)
#     db.commit()
#     db.refresh(db_post)
#     db_post.id = str(db_post.id)
#     return db_post

# @app.get("/posts", tags=["posts"])
# async def get_posts(db: Session) -> models.Post:
#     record = db.query(models.Post)
#     if not record:
#         raise HTTPException(status_code=404, detail="Not Found") 
#     record.id = str(record.id)
#     return record

# @app.get("/posts/{post_id}", tags=["posts"])
# async def get_post_by_id(post_id: str, db: Session) -> models.Post:
#     record = db.query(models.Post).filter(models.Post.id == post_id).first()
#     if not record:
#         raise HTTPException(status_code=404, detail="Not Found") 
#     record.id = str(record.id)
#     return record

# @app.put("/posts/{post_id}", tags=["posts"])
# async def update_post_by_id(post_id: str, db: Session,post: schema.Post) -> models.Post:
#     record = db.query(models.Post).filter(models.Post.id == post_id).first()
#     record.description = 'modifier ca'
#     record.title = 'modifier ci'
#     db.commit()
#     record.id = str(record.id)
#     return record

# @app.delete("/{post_id}", tags=["posts"])
# async def delete_post_by_id(post_id,db: Session, post: schema.Post) -> models.Post:
#     record = db.query(models.Post).filter(models.Post.id == post_id).first()
#     if record:
#         raise HTTPException(status_code=409, detail="Already exists")
#     db_post = models.Post(**post.dict())
#     db.delete(db_post)
#     db.commit()
#     db.refresh(db_post)
#     db_post.id = str(db_post.id)




