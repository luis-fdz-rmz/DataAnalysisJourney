from flask import Blueprint, Flask, jsonify, request, current_app
import psycopg
from app.Handlers.Students import StudentHandler
import os

api = Blueprint('api',__name__)



# <int:id> for id 

@api.route('/api/students', methods=['GET', 'POST'])
def students():
    conn = current_app.config['DB_CONN']
    if request.method == 'GET':
        return StudentHandler().getAllStudents(conn)
    elif request.method == 'POST':
        json_data = request.get_json()
        return StudentHandler().AddStudent(conn,json_data)
    else: 
        return jsonify("ERROR")
