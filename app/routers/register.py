from fastapi import APIRouter, Depends
from services import posts as posts_service
import schemas, models
from sqlalchemy.orm import Session

router = APIRouter(prefix="/register")


@router.post("/", tags=["register"])
async def register(post: schemas.Post, db: Session = Depends(models.get_db)):
    return posts_service.register(post=post, db=db)

@router.get("/confirm", tags=["confirm"])
async def confirm(post_id: str, db: Session = Depends(models.get_db)):
    return posts_service.confirm(post_id=post_id, db=db)

