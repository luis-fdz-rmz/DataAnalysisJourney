from flask import Blueprint, Flask, jsonify, request, current_app
import psycopg
from app.Handlers.Students import StudentHandler
from app.Handlers.Grades import GradesHandler
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


@api.route('/api/grades', methods=['GET', 'POST'])
def grades():
    conn = current_app.config['DB_CONN']
    if request.method == 'GET':
        return GradesHandler().getAllGrades(conn)
    elif request.method == 'POST':
        json_data = request.get_json()
        return GradesHandler().AddGrade(conn,json_data)
    else: 
        return jsonify("ERROR")
