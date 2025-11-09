import psycopg2
import psycopg2.extras
import os

DB_USER = os.getenv("DB_USER", "user")
DB_PASSWORD = os.getenv("DB_PASSWORD", "password")
DB_HOST = os.getenv("DB_HOST", "db")  
DB_PORT = os.getenv("DB_PORT", "5432")
DB_NAME = os.getenv("DB_NAME", "coursesdb")


def db_conn():
    conn = psycopg2.connect(
        dbname=DB_NAME,
        user=DB_USER,
        password=DB_PASSWORD,
        host=DB_HOST,
        port=DB_PORT
    )
    return conn


def create_table():
    conn = db_conn()
    cursor = conn.cursor()

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS courses(
        id SERIAL PRIMARY KEY,
        name VARCHAR(50),
        lecturer VARCHAR(50),
        description TEXT,
        category VARCHAR(50),
        price FLOAT,
        rating FLOAT,
        language VARCHAR(50),
        students_count INTEGER
    );
    """)

    conn.commit()
    conn.close()
