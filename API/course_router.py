from fastapi import APIRouter
from fastapi import HTTPException
from course_model import Course
import crud

router = APIRouter();

@router.get("/")
def get_courses():
    courses = crud.fetch_courses()
    return courses

@router.post("/")
def post_courses(course: Course):   
    try:
        crud.create_course(course)
        return {"success": "course created succesfully"}
    except :
        raise HTTPException(status_code=500, detail="Server Error")

@router.get("/{id}")
def get_course(id:int):
    course = crud.fetch_course(id)
    return course

@router.delete("/{id}")
def delete_course(id:int):
    course = crud.fetch_course(id)

    if not course:
        raise HTTPException(status_code=404, detail="Course Not found")

    course = crud.drop_course(id)
    return {"success": "Course was deleted successfully"}

