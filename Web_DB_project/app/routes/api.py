from flask import Blueprint, Flask, jsonify, request, current_app, session, redirect, url_for
import psycopg
from app.Handlers.Students import StudentHandler
from app.Handlers.Grades import GradesHandler
from app.Handlers.Users import UsersHandler
import os

api = Blueprint('api',__name__)



# <int:id> for id 

@api.route('/api/students', methods=['GET', 'POST'])
def api_students():
    conn = current_app.config['DB_CONN']
    if request.method == 'GET':
        return StudentHandler().getAllStudents(conn)
    elif request.method == 'POST':
        json_data = request.get_json()
        return StudentHandler().AddStudent(conn,json_data)
    else: 
        return jsonify("ERROR")


@api.route('/api/grades', methods=['GET', 'POST'])
def api_grades():
    conn = current_app.config['DB_CONN']
    if request.method == 'GET':
        return GradesHandler().getAllGrades(conn)
    elif request.method == 'POST':
        json_data = request.get_json()
        return GradesHandler().AddGrade(conn,json_data)
    else: 
        return jsonify("ERROR")


@api.route('/api/login', methods=['POST'])
def api_login():
    conn = current_app.config['DB_CONN']
    if request.method == 'POST':
        json_data = request.get_json()
        response = UsersHandler().CheckUser(conn,json_data)
        session['user_id'] = json_data.get('username')
        if response:
            return jsonify({'status': 'success', 'redirect': url_for('pages.students')}), 200
        else:
            return jsonify([{'error':400}]),400

    else: 
        return jsonify("ERROR")
    
@api.route('/api/signup', methods=['POST'])
def api_signup():
    conn = current_app.config['DB_CONN']
    if request.method == 'POST':
        json_data = request.get_json()
        response = UsersHandler().AddApprovalUser(conn,json_data)
        if response:
            print(response,flush=True)
            return jsonify({'status':'success'}),200
        else:
            return jsonify([{'error':400}]),400

    else: 
        return jsonify("ERROR")


@api.route('/api/approveUser', methods=['GET','POST'])
def api_approveUser():
    conn = current_app.config['DB_CONN']
    if request.method == 'GET':
        return UsersHandler().getApprovalUsers(conn)
    elif request.method == 'POST':
        json_data = request.get_json()
        response = UsersHandler().AddUser(conn,json_data)
        if response:
            print(response,flush=True)
            return jsonify({'status':'success'}),200
        else:
            return jsonify([{'error':400}]),400

    else: 
        return jsonify("ERROR")

@api.route('/api/removeUser', methods=['POST'])
def api_removeUser():
    conn = current_app.config['DB_CONN']
    if request.method == 'POST':
        json_data = request.get_json()
        response = UsersHandler().RemoveUser(conn,json_data)
        if response:
            print(response,flush=True)
            return jsonify({'status':'success'}),200
        else:
            return jsonify([{'error':400}]),400

    else: 
        return jsonify("ERROR")

@api.route('/api/logout', methods=['GET'])
def api_logout():
    session.pop('user_id', None)
    return jsonify({'status':'success', 'redirect':url_for('pages.login')})