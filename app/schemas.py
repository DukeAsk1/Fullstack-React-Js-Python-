from typing import Optional
from datetime import datetime
from pydantic import BaseModel, Field
from uuid import uuid4
from typing_extensions import Annotated


class User(BaseModel):
    id: Annotated[str, Field(default_factory=lambda: uuid4().hex)]
    firstname: str
    lastname: str
    username: str
    email: str
    password: str
    address: str
    description: Optional[str]
    created_at: Annotated[datetime, Field(default_factory=lambda: datetime.now())]

    class Config:
        orm_mode = True


class School(BaseModel):
    id: Annotated[str, Field(default_factory=lambda: uuid4().hex)]
    name: str
    address: str
    description: Optional[str]
    created_at: Annotated[datetime, Field(default_factory=lambda: datetime.now())]

    class Config:
        orm_mode = True


class Comment(BaseModel):
    id: Annotated[str, Field(default_factory=lambda: uuid4().hex)]
    content: str
    rating: int
    created_at: Annotated[datetime, Field(default_factory=lambda: datetime.now())]

    class Config:
        orm_mode = True


class Post(BaseModel):
    id: Annotated[str, Field(default_factory=lambda: uuid4().hex)]
    title: str
    jpeg: str
    description: str
    price: float
    created_at: Annotated[datetime, Field(default_factory=lambda: datetime.now())]

