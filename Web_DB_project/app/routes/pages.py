from flask import Blueprint, render_template

pages = Blueprint('pages', __name__)

@pages.route('/')
def home():
    return render_template('index.html')

@pages.route('/students')
def students():
    return render_template('students.html')

@pages.route('/addstudents')
def add_students():
    return render_template('add_student.html')

@pages.route('/grades')
def grade_students():
    return render_template('grades.html')

@pages.route('/addgrades')
def add_grades():
    return render_template('add_grades.html')