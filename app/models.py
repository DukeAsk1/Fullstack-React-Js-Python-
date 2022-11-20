from sqlalchemy import Column, Float, String, DateTime, ForeignKey, Integer, Table
from sqlalchemy.orm import declarative_base, relationship
from sqlalchemy.dialects.postgresql import UUID
from database import Base


class User(Base):
    __tablename__ = "User"

    id = Column(UUID(as_uuid=True), primary_key=True, index=True)
    school_id = Column(UUID(as_uuid=True), ForeignKey("School.id"))
    firstname = Column(String)
    lastname = Column(String)
    username = Column(String)
    email = Column(String)
    password = Column(String)
    address = Column(String)
    city = Column(String)
    postal_code = (Column(Integer))
    description = Column(String)
    created_at = Column(DateTime())
    school = relationship("School")


class School(Base):
    __tablename__ = "School"
    id = Column(UUID(as_uuid=True), primary_key=True, index=True)
    name = Column(String)
    address = Column(String)
    description = Column(String)
    created_at = Column(DateTime())


class Comment(Base):
    __tablename__ = "Comment"
    id = Column(UUID(as_uuid=True), primary_key=True, index=True)
    buyer_id = Column(UUID(as_uuid=True), ForeignKey("User.id"))
    #buyer = relationship("User")
    #seller = relationship("User")
    content = Column(String)
    rating = Column(Integer)
    created_at = Column(DateTime())


class Post(Base):
    __tablename__ = "Post"
    id = Column(UUID(as_uuid=True), primary_key=True, index=True)
    #seller = relationship("User")
    seller_id = Column(UUID(as_uuid=True), ForeignKey("User.id"))
    title = Column(String)
    category : Column(String) #Valeurs fixées, style checkbox
    jpeg = Column(Integer)
    description = Column(String)
    price = Column(Float)
    created_at = Column(DateTime())