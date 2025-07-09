from psycopg import connect
import os


def get_db_connection():
    conn = connect(
        host=os.getenv("DB_HOST"),
        dbname=os.getenv("DB_NAME"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD")
    )
    return conn


def get_user_by_username(username):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT user_id, username, password_hash FROM Users WHERE username = %s", (username,))
    user = cursor.fetchone()
    cursor.close()
    conn.close()
    return user

def create_user(username, password_hash):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO Users (username, password_hash) VALUES (%s, %s)",
        (username, password_hash)
    )
    conn.commit()
    cursor.close()
    conn.close()


def update_user_password(user_id, new_password_hash):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(
        "UPDATE Users SET password_hash = %s WHERE user_id = %s",
        (new_password_hash, user_id)
    )
    conn.commit()
    cursor.close()
    conn.close()
