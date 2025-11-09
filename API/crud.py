from course_model import Course
from db import db_conn
import psycopg2
import psycopg2.extras

def fetch_courses():
    conn = db_conn()
    cursor = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)

    cursor.execute("SELECT * FROM courses;")
    courses = cursor.fetchall()

    conn.close()
    return [Course(**course) for course in courses]


def create_course(course: Course):
    conn = db_conn()
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO courses(name, lecturer, description, category, price, rating, language, students_count)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
    """, (course.name, course.lecturer, course.description, course.category,
          course.price, course.rating, course.language, course.students_count))

    conn.commit()
    conn.close()


def fetch_course(id: int):
    conn = db_conn()
    cursor = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)

    cursor.execute("SELECT * FROM courses WHERE id = %s", (id,))
    course = cursor.fetchone()

    conn.close()
    return Course(**course)


def drop_course(id: int):
    conn = db_conn()
    cursor = conn.cursor()

    cursor.execute("DELETE FROM courses WHERE id = %s", (id,))
    conn.commit()
    conn.close()

