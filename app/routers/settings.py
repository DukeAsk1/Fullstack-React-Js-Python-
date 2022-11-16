from fastapi import APIRouter, Depends
from services import posts as posts_service
import schemas, models
from sqlalchemy.orm import Session

router = APIRouter(prefix="/settings")


@router.get("/", tags=["settings"])
async def settings(post: schemas.Post, db: Session = Depends(models.get_db)):
    return posts_service.home(post=post, db=db)

@router.post("/{user_id}", tags=["user_id"])
async def user_profile(post: schemas.Post, db: Session = Depends(models.get_db)):
    return posts_service.user_profile(post=post, db=db)

@router.post("/{user_id}/your_product", tags=["your_product"])
async def user_product(post: schemas.Post, db: Session = Depends(models.get_db)):
    return posts_service.user_product(post=post, db=db)

@router.post("/{user_id}/your_purchase", tags=["your_purchase"])
async def user_purchase(post: schemas.Post, db: Session = Depends(models.get_db)):
    return posts_service.user_purchase(post=post, db=db)

@router.post("/preferences", tags=["preferences"])
async def preferences(post: schemas.Post, db: Session = Depends(models.get_db)):
    return posts_service.preferences(post=post, db=db)

@router.get("/log_out", tags=["log_out"])
async def log_our(post: schemas.Post, db: Session = Depends(models.get_db)):
    return posts_service.log_out(post=post, db=db)