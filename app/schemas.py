from typing import Optional
from datetime import datetime
from pydantic import BaseModel, Field
from uuid import uuid4
from typing_extensions import Annotated
from fastapi import UploadFile


# class User(BaseModel):
#     id: Annotated[str, Field(default_factory=lambda: uuid4().hex)]
#     firstname: str
#     lastname: str
#     username: str
#     email: str
#     password: str
#     address: str
#     description: Optional[str]
#     created_at: Annotated[datetime, Field(default_factory=lambda: datetime.now())]

#     class Config:
#         orm_mode = True

class UserBase(BaseModel):
    username: str
    id: str
    class Config:
        orm_mode = True

class UserLogin(UserBase):
    password: str
    

class UserCreate(UserBase):
    id: Annotated[str, Field(default_factory=lambda: uuid4().hex)]
    school_id: Optional[Annotated[str, Field(default_factory=lambda: uuid4().hex)]]
    firstname: str
    lastname: str
    email: str
    username : str
    password: str
    address: str
    city = str
    postal_code = str
    description: Optional[str]
    #is_active : bool
    created_at: Annotated[datetime, Field(default_factory=lambda: datetime.now())]

class Token(BaseModel):
    access_token: str
    token_type: str    
    
class TokenData(BaseModel):
    username: Optional[str] = None

    

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
    #seller_id : Annotated[str, Field(default_factory=lambda: uuid4().hex)]
    title: str
    category : str
    jpeg : str
    description: Optional[str]
    price: float
    created_at: Annotated[datetime, Field(default_factory=lambda: datetime.now())]

    class Config:
        orm_mode = True
