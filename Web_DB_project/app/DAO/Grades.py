import psycopg
import os 
from psycopg.rows import dict_row

class GradesDAO:
    def __init__(self, conn) -> None:
        self.conn = conn
        
    def getAllGrades(self) -> (dict[int, list] | dict[int, str]):
        if self.conn is not None:
            try:
                with self.conn.cursor(row_factory=dict_row) as cursor:
                    query = """
                            SELECT grade_id, student_name, grade_subject, grade_task, 
                            grade_type, grade, date_assigned, deadline, date_submitted
                            FROM Grades NATURAL INNER JOIN Students
                            ORDER BY student_id
                            """
                    cursor.execute(query)
                    result = cursor.fetchall()
                    return {200: result}
            except psycopg.Error as e: 
                return({400:f"Error fetching GradeDAO: {e}"})
        return {400: "GradeDAO connection to database failed"}
    
    def addGrade(self,data):
        if self.conn is not None:
            try:
                with self.conn.cursor(row_factory=dict_row) as cursor:
                    query = f"""
                            INSERT INTO Grades (student_id, grade_subject, grade_task, 
                            grade_type, grade, date_assigned, deadline, date_submitted)

                            VALUES (%s, %s, %s, %s,
                            %s, %s, %s,%s)
                            
                            RETURNING grade_id;
                            """
                    values = (data.get('student_id'), data.get('grade_subject'), int(data.get('grade_task')), 
                              data.get('grade_type'), int(data.get('grade')), 
                              data.get('date_assigned'), data.get('deadline'),
                              data.get('date_submitted'))
                    
                    cursor.execute(query, values)
                    result = cursor.fetchone()
                    if result is None:
                        print("Failed to add grade")
                        return {400: "Failed to add grade"}
                    else:
                        self.conn.commit()
                        return {200: result}
                    
            except psycopg.Error as e: 
                return({400:f"Error adding in GradeDAO: {e}"})
        return {400: "GradeDAO connection to database failed"}
    
        