from typing import Optional
from datetime import datetime
from pydantic import BaseModel, Field
from uuid import uuid4
from typing_extensions import Annotated
from fastapi import UploadFile

class UserBase(BaseModel):
    username: str
    id: str
    class Config:
        orm_mode = True

class UserLogin(UserBase):
    password: str
    

class UserCreate(UserBase):
    id: Annotated[str, Field(default_factory=lambda: uuid4().hex)]
    school_id: str
    firstname: str
    lastname: str
    email: str
    username : str
    password: str
    address: str
    city : str
    postal_code : str
    description : Optional[str]
    jpeg : Optional[str]
    created_at: Annotated[datetime, Field(default_factory=lambda: datetime.now())]

class Token(BaseModel):
    access_token: str
    token_type: str    
    
class TokenData(BaseModel):
    username: Optional[str] = None

    

class School(BaseModel):
    id: str
    name: str
    address: str
    description: Optional[str]
    jpeg : Optional[str]
    created_at: Annotated[datetime, Field(default_factory=lambda: datetime.now())]

    class Config:
        orm_mode = True

class Category(BaseModel):
    id: Annotated[str, Field(default_factory=lambda: uuid4().hex)]
    name: str

    class Config:
        orm_mode = True


class Comment(BaseModel):
    id: Annotated[str, Field(default_factory=lambda: uuid4().hex)]
    buyer_id : Annotated[str, Field(default_factory=lambda: uuid4().hex)]
    seller_id : Annotated[str, Field(default_factory=lambda: uuid4().hex)]
    content: str
    rating: int
    created_at: Annotated[datetime, Field(default_factory=lambda: datetime.now())]

    class Config:
        orm_mode = True


class Post(BaseModel):
    id: Annotated[str, Field(default_factory=lambda: uuid4().hex)]
    title: str
    category_id :  Annotated[str, Field(default_factory=lambda: uuid4().hex)]
    jpeg : Optional[str]
    description: Optional[str]
    seller_id : Annotated[str, Field(default_factory=lambda: uuid4().hex)]
    price: float
    created_at: Annotated[datetime, Field(default_factory=lambda: datetime.now())]

    class Config:
        orm_mode = True


