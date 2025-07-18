from flask import jsonify
from app.DAO.Users import UsersDAO


class UsersHandler:
    def CheckUser(self,conn,data):
        dao = UsersDAO(conn)
        dbtuples = dao.checkUser(data)
        if 200 in dbtuples:
            return jsonify({'status' : 'success'}), 200
        else:
            return

    def AddUser(self, conn, data):
        dao = UsersDAO(conn)
        dbtuples = dao.AddUser(data)
        if dbtuples:
            return dbtuples
        else:
            return jsonify({'message':'failed'}),400
    
    def AddApprovalUser(self, conn,data):
        dao =UsersDAO(conn)
        dbtuple = dao.ApproveUser(data)
        if dbtuple:
            return jsonify(dbtuple)
        else:
            return jsonify({'message':'failed'}),400
    
    def getApprovalUsers(self,conn):
        dao = UsersDAO(conn)
        dbtuples = dao.getUsersForApproval()
        return jsonify(dbtuples)
    
    def RemoveUser(self, conn,data):
        dao = UsersDAO(conn)
        dbtuples = dao.removeUser(data)
        return jsonify(dbtuples)
        