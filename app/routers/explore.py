from fastapi import APIRouter, Depends
from services import posts as posts_service
import schemas, models
from sqlalchemy.orm import Session

router = APIRouter(prefix="/explore")


@router.get("/", tags=["explore"])
async def explore_product(post: schemas.Post, db: Session = Depends(models.get_db)):
    return posts_service.explore_product(post=post, db=db)

@router.get("/schools", tags=["schools"])
async def explore_schools(post: schemas.Post, db: Session = Depends(models.get_db)):
    return posts_service.explore_schools(post=post, db=db)

@router.get("/area", tags=["area"])
async def explore_are(post: schemas.Post, db: Session = Depends(models.get_db)):
    return posts_service.explore_area(post=post, db=db)