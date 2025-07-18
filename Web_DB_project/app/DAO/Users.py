import psycopg
import os 
from psycopg.rows import dict_row
from werkzeug.security import check_password_hash as cph, generate_password_hash as gph

class UsersDAO:
    def __init__(self, conn) -> None:
        self.conn = conn
        
    def checkUser(self,data) -> (dict[int, list] | dict[int, str]):
        if self.conn is not None:
            try:
                with self.conn.cursor(row_factory=dict_row) as cursor:
                    query = f"""
                            SELECT password_hash
                            FROM Users 
                            WHERE (username = %s
                            OR email = %s);
                            """
                    values = (data.get('username', '""'), data.get('username', '""'))
                    cursor.execute(query, values)
                    result = cursor.fetchone()
                    if result and cph(result.get('password_hash'), data.get('password')):
                        return {200: 'success'}
                    else:
                        return {400: "Incorrect password, username or email"}
            except psycopg.Error as e: 
                return({400:f"Error fetching UsersDAO: {e}"})
        return {400: "UsersDAO connection to database failed"}
    
    def AddUser(self,data):
        if self.conn is not None:
            try:
                approve_id = data.get("approve_id")
                print(f"approve_id = {approve_id}", flush=True)
                if not approve_id:
                    return {400: "Failed to add user"}
                with self.conn.cursor(row_factory=dict_row) as cursor:
                    query = f"""
                            INSERT INTO Users(username, password_hash, email, user_name, user_role, gender, birthday)

                            SELECT username, password_hash, email, user_name, user_role, gender, birthday
                            FROM ApproveUsers
                            WHERE approve_id = %s
                            
                            RETURNING user_id, user_role;
                            """
                    values = (approve_id,)
                    cursor.execute(query, values)
                    result = cursor.fetchone()
                    self.conn.commit()
                    print(result,flush=True)
                    if result.get('user_role') is None or result.get('user_id') is None:
                        return 
                    user_role = result.get('user_role')
                    user_id = result.get('user_id')
                    if user_role == "STUDENT":
                        query = f"""
                                INSERT INTO STUDENTS(user_id, grade_level, parent_education, lunch_type, internet_access, extra_activities)

                                SELECT %s, grade_level, parent_education, lunch_type, internet_access, extra_activities
                                FROM ApproveUsers
                                WHERE approve_id = %s
                                
                                RETURNING user_id;
                                """
                    elif user_role == "PROFESSOR":
                        query = f"""
                                INSERT INTO Professors(user_id,department)

                                SELECT %s, department
                                FROM ApproveUsers
                                WHERE approve_id = %s
                                
                                RETURNING user_id;
                                """
                    values = (user_id,approve_id)
                    cursor.execute(query, values)
                    result = cursor.fetchone()
                    self.conn.commit()
                    print(f"result = {result}",flush=True)
                    if result.get('user_id') is None:
                        return {400: 'error'}
                    query = f"""
                                DELETE FROM ApproveUsers 
                                WHERE approve_id = %s
                                RETURNING approve_id;"""
                    values = (approve_id,)
                    cursor.execute(query, values)
                    result = cursor.fetchone()
                    self.conn.commit()
                    print(f"result = {result}",flush=True)
                    if result is None:
                        return {400: "Failed to add user"}
                    else:
                        return result
            except psycopg.Error as e: 
                return({400:f"Error adding in UsersDAO: {e}"})
        return {400: "UsersDAO connection to database failed"}
    

    def ApproveUser(self,data):
        if self.conn is not None:
            try:
                username = data.get('username')
                password_hash = gph(data.get('password_hash'))
                email = data.get('email')
                user_name = data.get('user_name')
                user_role = data.get('user_role')
                gender = data.get('gender')
                birthday = str(data.get('birthday'))
                grade_level = data.get('grade_level')
                parent_education = data.get('parent_education')
                lunch_type = data.get('lunch_type')
                internet_access = data.get('internet_access')
                extra_activities = data.get('extra_activities')
                department = data.get('department')

                with self.conn.cursor(row_factory=dict_row) as cursor:
                    query = f"""
                            INSERT INTO ApproveUsers (username, password_hash, email, user_name, user_role, gender, birthday,grade_level, parent_education, lunch_type, internet_access, extra_activities, department)

                            VALUES (%s, %s, %s, %s, %s, %s, %s,%s, %s, %s, %s, %s, %s)
                            
                            RETURNING approve_id;
                            """
                    values = (username, password_hash, email, user_name, user_role, gender, birthday, grade_level, parent_education, lunch_type, internet_access, extra_activities, department)
                    
                    cursor.execute(query, values)
                    result = cursor.fetchone()
                    print(result,flush=True)
                    if result is None:
                        return result
                    else:
                        self.conn.commit()
                        return result
                    
            except psycopg.Error as e: 
                return({400:f"Error adding in UsersDAO: {e}"})
        return {400: "UsersDAO connection to database failed"}
    
    def getUsersForApproval(self):
        if self.conn is not None:
            try:
                with self.conn.cursor(row_factory=dict_row) as cursor:
                    query = f"""
                            SELECT approve_id, username, password_hash, email, user_name, user_role, gender, birthday, grade_level, parent_education, lunch_type, internet_access, extra_activities, department
                            FROM ApproveUsers;
                            """
                    cursor.execute(query)
                    result = cursor.fetchall()
                    print(f"approval {result}", flush=True)
                    if result:
                        return {'message': result}
                    else:
                        return {'message': []}
            except psycopg.Error as e: 
                return({'message':f"Error fetching UsersDAO: {e}"})
        return {'message': "UsersDAO connection to database failed"}
    
    def removeUser(self, data):
        if self.conn is not None:
            if data.get('approve_id') is None:
                return {'message': 'No approve user ID'}
            try:
                with self.conn.cursor(row_factory=dict_row) as cursor:
                    query = f"""
                            DELETE FROM ApproveUsers 
                            WHERE approve_id = %s;
                            """
                    values = (data.get('approve_id'),)
                    cursor.execute(query, values)
                    result = cursor.fetchone()
                    if result:
                        return {200: 'success'}
                    else:
                        return {400: "No approve user ID"}
            except psycopg.Error as e: 
                return({400:f"Error fetching UsersDAO: {e}"})
        return {400: "UsersDAO connection to database failed"}