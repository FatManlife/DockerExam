from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from course_router import router as c_router
from db import create_table

create_table()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router=c_router, prefix="/courses", tags="CourseRouter")
