from db import db_conn
from course_model import Course

def fetch_courses():
    conn = db_conn()
    c = conn.cursor()

    courses = c.execute("SELECT * FROM courses").fetchall()

    conn.close()

    return [Course(**course) for course in courses]

def create_course(course: Course):
    conn = db_conn()
    c = conn.cursor()

    c.execute("INSERT INTO courses(name,lecturer,description,category,price,rating,language,students_count) VALUES(?,?,?,?,?,?,?,?)",(course.name,course.lecturer,course.description,course.category,course.price,course.rating,course.language,course.students_count))

    conn.commit()
    conn.close()

def fetch_course(id:int):
    conn = db_conn()
    c = conn.cursor()

    course = c.execute("SELECT * FROM courses WHERE id=?",(id,)).fetchone()

    conn.close()

    return Course(**course)

def drop_course(id:int):
    conn = db_conn()
    c = conn.cursor()

    c.execute("DELETE FROM courses WHERE id=?",(id,))

    conn.commit()
    conn.close()



