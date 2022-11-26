from sqlalchemy import Column, Float, String, DateTime, ForeignKey, Integer, Numeric
from sqlalchemy.orm import declarative_base, relationship
from sqlalchemy.dialects.postgresql import UUID
from database import Base


class User(Base):
    __tablename__ = "User"

    id = Column(UUID(as_uuid=True), primary_key=True, index=True)
    school_id = Column(String, ForeignKey("School.id"))
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
    id = Column(String, primary_key=True, index=True)
    name = Column(String)
    address = Column(String)
    description = Column(String)
    created_at = Column(DateTime())

class Category(Base):
    __tablename__ = "Category"
    id = Column(UUID(as_uuid=True), primary_key=True, index=True)
    name = Column(String)


class Comment(Base):
    __tablename__ = "Comment"
    id = Column(UUID(as_uuid=True), primary_key=True, index=True)
    buyer_id = Column(UUID(as_uuid=True), ForeignKey("User.id"))
    seller_id = Column(UUID(as_uuid=True), ForeignKey("User.id"))
    content = Column(String)
    rating = Column(Integer)
    created_at = Column(DateTime())

    buyer = relationship("User", foreign_keys=[buyer_id])
    seller = relationship("User", foreign_keys=[seller_id])


class Post(Base):
    __tablename__ = "Post"
    id = Column(UUID(as_uuid=True), primary_key=True, index=True)
    seller_id = Column(UUID(as_uuid=True), ForeignKey("User.id"))
    title = Column(String)
    category_id = Column(UUID(as_uuid=True), ForeignKey("Category.id")) #Valeurs fixées, style checkbox
    jpeg = Column(String)
    description = Column(String)
    price = Column(Float)
    created_at = Column(DateTime())

    seller = relationship("User")
    category = relationship("Category")