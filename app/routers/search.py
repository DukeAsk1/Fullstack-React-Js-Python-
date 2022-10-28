from fastapi import APIRouter, Depends
from services import posts as posts_service
import schemas, models
from sqlalchemy.orm import Session

router = APIRouter(prefix="/search")


@router.post("/", tags=["search"])
async def search_product(post: schemas.Post, db: Session = Depends(models.get_db)):
    return posts_service.search_product(post=post, db=db)