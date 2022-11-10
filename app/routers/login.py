from fastapi import APIRouter, Depends
from services import posts as posts_service
import schemas, models
from sqlalchemy.orm import Session

router = APIRouter(prefix="/login")


@router.post("/", tags=["login"])
async def login(post: schemas.Post, db: Session = Depends(models.get_db)):
    return posts_service.login(post=post, db=db)

