import psycopg
import os 
from psycopg.rows import dict_row

class StudentDAO:
    def __init__(self, conn) -> None:
        self.conn = conn
        
    def getAllStudents(self) -> (dict[int, list] | dict[int, str]):
        if self.conn is not None:
            try:
                with self.conn.cursor(row_factory=dict_row) as cursor:
                    query = """
                            SELECT student_id,student_name, gender, age, grade_level, parent_education, lunch_type, internet_access, extra_activities
                            FROM Students
                            ORDER BY student_id
                            """
                    cursor.execute(query)
                    result = cursor.fetchall()
                    return {200: result}
            except psycopg.Error as e: 
                return({400:f"Error fetching StudentDAO: {e}"})
        return {400: "StudentDAO connection to database failed"}
    
    def addStudent(self,data):
        if self.conn is not None:
            try:
                with self.conn.cursor(row_factory=dict_row) as cursor:
                    query = f"""
                            INSERT INTO Students (student_name, gender, age, grade_level,
                            parent_education, lunch_type, internet_access,extra_activities)

                            VALUES (%s, %s, %s, %s,
                            %s, %s, %s,%s)
                            
                            RETURNING student_id;
                            """
                    values = (data.get('student_name'), data.get('gender'), int(data.get('age')), int(data.get('grade_level')),
                            data.get('parent_education'), data.get('lunch_type'), bool(data.get('internet_access')),bool(data.get('extra_activities')))
                    
                    cursor.execute(query, values)
                    result = cursor.fetchone()
                    if result is None:
                        print("Failed to add student")
                        return {400: "Failed to add student"}
                    else:
                        self.conn.commit()
                        return {200: result}
                    
            except psycopg.Error as e: 
                return({400:f"Error adding in StudentDAO: {e}"})
        return {400: "StudentDAO connection to database failed"}
    
        