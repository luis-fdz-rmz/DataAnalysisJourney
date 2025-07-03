from flask import jsonify
from app.DAO.Students import StudentDAO


class StudentHandler:

    def mapToDict(self,tuple):
        dictionary = {}
        dictionary['student_id'] = tuple[0]
        dictionary['student_name'] = tuple[1] 
        dictionary['gender'] = tuple[2] 
        dictionary['age'] = tuple[3] 
        dictionary['grade_level'] = tuple[4]
        dictionary['parent_education'] = tuple[5] 
        dictionary['lunch_type'] = tuple[6] 
        dictionary['internet_access'] = tuple[7]
        dictionary['extra_activities'] = tuple[8]
        return dictionary
    
    def getAllStudents(self, conn):
        dao = StudentDAO(conn)
        dbtuples = dao.getAllStudents()
        if 200 in dbtuples:
            return jsonify(dbtuples[200])
        else:
            return jsonify(dbtuples.values())
        
    def AddStudent(self, conn, data):
        if len(tuple(data)) != 8:
            return jsonify("information not match database requirements")
        dao = StudentDAO(conn)
        dbtuples = dao.addStudent(data)
        if 200 in dbtuples:
            return jsonify(dbtuples[200])
        else:
            return jsonify(dbtuples.values())