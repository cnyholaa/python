from fastapi import FastAPI

from database import engine
import models

from routers import auth,todos,admin

app = FastAPI()

models.Base.metadata.create_all(bind=engine)

app.include_router(auth.router)

app.include_router(todos.router)
app.include_router(admin.router)

# app.include_router(test.router)


if __name__ == '__main__':
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000,reload=True)

