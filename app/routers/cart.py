from fastapi import APIRouter, Depends
from services import posts as posts_service
import schemas, models
from sqlalchemy.orm import Session

router = APIRouter(prefix="/cart")


@router.post("/", tags=["cart"])
async def cart(post: schemas.Post, db: Session = Depends(models.get_db)):
    return posts_service.cart(post=post, db=db)

@router.post("/confirm", tags=["confirm_cart"])
async def cart_confirm(post: schemas.Post, db: Session = Depends(models.get_db)):
    return posts_service.cart_confirm(post=post, db=db)

@router.post("/confirm/payment", tags=["confirm_payment"])
async def confirm_payment(post: schemas.Post, db: Session = Depends(models.get_db)):
    return posts_service.confirm_payment(post=post, db=db)