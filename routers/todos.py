from fastapi import APIRouter, Depends, HTTPException, Path
from sqlalchemy.orm import Session
from starlette import status
from pydantic import BaseModel

from database import sessionLocal
from models import Todos
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

    # return db.query(Todos).all()
    return db.query(Todos).filter(Todos.owner_id == user.get("id")).all()

@router.get("/read_todos/{todo_id}", status_code=status.HTTP_200_OK)
async def read_todo(user: user_dependency, db:db_dependency,todo_id:int=Path(gt=0)):

    if user is None:
        raise HTTPException(status_code=404, detail="Authentication failed")

    todo_model=db.query(Todos).filter(Todos.id==todo_id)\
        .filter(Todos.owner_id == user.get('id')).first()
    if todo_model is not None:
        return todo_model

    raise HTTPException(status_code=404, detail="todo id:{todo_id} is not found" )


class TodoRequest(BaseModel):
    title : str
    description : str
    priority : str
    complete : bool


@router.post("/create_todo", status_code=status.HTTP_201_CREATED)
async def create_todos(user:user_dependency,
                       db: db_dependency,
                       todo_request:TodoRequest):
    if user is None:
        raise HTTPException(status_code=404, detail="Authentication failed")

    todo_model=Todos(**todo_request.model_dump(), owner_id=user.get("id"))
    db.add(todo_model)
    db.commit()


@router.put("/update_todo/{todo_id}", status_code=status.HTTP_204_NO_CONTENT)
async def update_todo(user: user_dependency, db:db_dependency,
                      todo_request:TodoRequest,
                      todo_id:int=Path(gt=0)):
    if user is None:
        raise HTTPException(status_code=404, detail="Authentication failed")

    todo_model=db.query(Todos).filter(Todos.id == todo_id).filter(Todos.owner_id == user.get('id')).first()

    if todo_model is None:
        raise HTTPException(status_code=404,detail="todo id {todo_id} is not found")

    todo_model.title=todo_request.title
    todo_model.description=todo_request.description
    todo_model.priority=todo_request.priority
    todo_model.complete=todo_request.complete
    # db.add(todo_model)
    db.commit()


@router.delete("/delete_todo/{todo_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_todo(user: user_dependency,
                      db:db_dependency,
                      todo_id:int=Path(gt=0)):

    if user is None:
        raise HTTPException(status_code=404, detail="Authentication failed")


    todo_model=db.query(Todos)\
        .filter(Todos.owner_id == user.get('id')).filter(Todos.id== todo_id).first

    if todo_model is None:
        raise HTTPException(status_code=404,detail="not found")

    db.query(Todos).filter(Todos.id == todo_id).filter(Todos.id== todo_id).delete()
    db.commit()



# if __name__ == '__main__':
#     import uvicorn
#     uvicorn.run("main:app", host="127.0.0.1", port=8000,reload=True)

