from pydantic import BaseModel

class Course(BaseModel):
    id:int
    name: str
    lecturer: str
    description: str
    category: str
    price: float
    rating: float
    language: str
    students_count: int