"""
请求体参数
"""
from enum import Enum
import uvicorn


from fastapi import FastAPI
from pydantic import BaseModel, Field, EmailStr, field_validator,model_validator


class Book_info(BaseModel):
    name:str=Field(...,min_length=2,max_length=20)
    author:str=Field(min_length=2,max_length=10)
    publisher:str=Field(default="HM")
    price:int=Field(...,gt=0,)

app=FastAPI()

@app.post("/book")
async def post_book(book_info:Book_info):
    return book_info


#----------------------------------------------------------------

# 1.用系统内置的 EmailStr自动校验
class User(BaseModel):
    email: EmailStr

# 2.自己写校验
# class User(BaseModel):
#     email: str
#
#     @field_validator("email")
#     def validate_email(cls,v):
#         if not "@" in v:
#             raise ValueError("email error")
#         return v

@app.post("/user")
async def post_user(user:User):
    return user



class Status(str,Enum):
    ACTIVE="active"
    INACTIVE="inactive"

class Book_Status(BaseModel):
    status:Status=Field(default=Status.INACTIVE,description="active status")

@app.post("/status")
async def post_status(book:Book_Status):
    return book


if __name__ == '__main__':
    uvicorn.run("day07-Field:app", host="127.0.0.1", port=9000,reload=True)



