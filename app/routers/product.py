from fastapi import APIRouter, Depends
from services import posts as posts_service
import schemas, models
from sqlalchemy.orm import Session

router = APIRouter(prefix="/product")


@router.post("/", tags=["product"])
async def product(post: schemas.Post, db: Session = Depends(models.get_db)):
    return posts_service.product(post=post, db=db)

@router.post("/{filter}", tags=["filter"])
async def product_filter(post: schemas.Post, db: Session = Depends(models.get_db)):
    return posts_service.product_filter(post=post, db=db)

