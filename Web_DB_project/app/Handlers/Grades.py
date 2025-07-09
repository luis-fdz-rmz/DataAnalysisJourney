from flask import jsonify
from app.DAO.Grades import GradesDAO


class GradesHandler:
    def getAllGrades(self, conn):
        dao = GradesDAO(conn)
        dbtuples = dao.getAllGrades()
        if 200 in dbtuples:
            return jsonify({'message' : dbtuples[200]})
        else:
            return jsonify({'message':dbtuples.values()})
        
    def AddGrade(self, conn, data):
        if len(tuple(data)) != 8:
            return jsonify("information not match database requirements")
        dao = GradesDAO(conn)
        dbtuples = dao.addGrade(data)
        if 200 in dbtuples:
            return jsonify({'message' : dbtuples[200]})
        else:
            print(dbtuples.values())
            return jsonify({'message':dbtuples.values()})