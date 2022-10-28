from fastapi import APIRouter, Depends
from services import posts as posts_service
import schemas, models
from sqlalchemy.orm import Session

router = APIRouter(prefix="/upload")


@router.post("/", tags=["upload"])
async def upload_product(post: schemas.Post, db: Session = Depends(models.get_db)):
    return posts_service.upload_product(post=post, db=db)

