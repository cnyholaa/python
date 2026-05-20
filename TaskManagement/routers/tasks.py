from fastapi import APIRouter, Depends, HTTPException, Path
from sqlalchemy.orm import Session
from starlette import status
from pydantic import BaseModel

from database import sessionLocal
from models import Tasks
from .auth import get_current_user

from typing import Annotated


router = APIRouter()

def get_db():
    db=sessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency=Annotated[Session,Depends(get_db)]
user_dependency=Annotated[dict,Depends(get_current_user)]
@router.get("/")
async def read_all(db:db_dependency, user:user_dependency):
    if user is None:
        raise HTTPException(status_code=404, detail="Authentication failed")

    # return db.query(Tasks).all()
    return db.query(Tasks).filter(Tasks.owner_id == user.get("id")).all()

@router.get("/read_tasks/{task_id}", status_code=status.HTTP_200_OK)
async def read_task(user: user_dependency, db:db_dependency,task_id:int=Path(gt=0)):

    if user is None:
        raise HTTPException(status_code=404, detail="Authentication failed")

    task_model=db.query(Tasks).filter(Tasks.id==task_id)\
        .filter(Tasks.owner_id == user.get('id')).first()
    if task_model is not None:
        return task_model

    raise HTTPException(status_code=404, detail="task id:{task_id} is not found" )


class TaskRequest(BaseModel):
    title : str
    description : str
    priority : str
    complete : bool


@router.post("/create_task", status_code=status.HTTP_201_CREATED)
async def create_tasks(user:user_dependency,
                       db: db_dependency,
                       task_request:TaskRequest):
    if user is None:
        raise HTTPException(status_code=404, detail="Authentication failed")

    task_model=Tasks(**task_request.model_dump(), owner_id=user.get("id"))
    db.add(task_model)
    db.commit()


@router.put("/update_task/{task_id}", status_code=status.HTTP_204_NO_CONTENT)
async def update_task(user: user_dependency, db:db_dependency,
                      task_request:TaskRequest,
                      task_id:int=Path(gt=0)):
    if user is None:
        raise HTTPException(status_code=404, detail="Authentication failed")

    task_model=db.query(Tasks).filter(Tasks.id == task_id).filter(Tasks.owner_id == user.get('id')).first()

    if task_model is None:
        raise HTTPException(status_code=404,detail="task id {task_id} is not found")

    task_model.title=task_request.title
    task_model.description=task_request.description
    task_model.priority=task_request.priority
    task_model.complete=task_request.complete
    # db.add(task_model)
    db.commit()


@router.delete("/delete_task/{task_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_task(user: user_dependency,
                      db:db_dependency,
                      task_id:int=Path(gt=0)):

    if user is None:
        raise HTTPException(status_code=404, detail="Authentication failed")


    task_model=db.query(Tasks)\
        .filter(Tasks.owner_id == user.get('id')).filter(Tasks.id== task_id).first

    if task_model is None:
        raise HTTPException(status_code=404,detail="not found")

    db.query(Tasks).filter(Tasks.id == task_id).filter(Tasks.id== task_id).delete()
    db.commit()


