import sqlite3

def db_conn():
    conn = sqlite3.connect("course.db")
    conn.row_factory = sqlite3.Row
    return conn 

def create_table():
    conn = db_conn()
    cursor = conn.cursor()

    cursor.execute("""
    Create table if not exists courses(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
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