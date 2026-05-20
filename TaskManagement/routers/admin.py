from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import sessionLocal
from models import Tasks
from .auth import get_current_user


router=APIRouter(
    prefix="/admin",
    tags=["admin"]
)


def get_db():
    session=sessionLocal()
    try:
        yield session
    finally:
        session.close()

db_dependency=Annotated[Session, Depends(get_db)]
user_dependency=Annotated[dict, Depends(get_current_user)]

@router.get("/")
async def read_all(db:db_dependency, user:user_dependency):

    print(user.get('role'))
    if user is None or user.get('role') != "admin":
        raise HTTPException(status_code=403, detail="Forbidden")

    return db.query(Tasks).all()
