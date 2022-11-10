from fastapi import APIRouter, Depends
from services import posts as posts_service
import schemas, models
from sqlalchemy.orm import Session

router = APIRouter(prefix="/home")


@router.post("/", tags=["home"])
async def home(post: schemas.Post, db: Session = Depends(models.get_db)):
    return posts_service.home(post=post, db=db)



