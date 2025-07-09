from flask import Blueprint, render_template, request, session, redirect, url_for, flash
from app.models import get_user_by_username
from werkzeug.security import check_password_hash
from functools import wraps

pages = Blueprint('pages', __name__)

def login_required(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        if 'user_id' not in session:
            # If the user is not logged in, redirect to login page
            return redirect(url_for('pages.login'))
        return f(*args, **kwargs)
    return wrapper

@pages.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']

        # Get the user from the database using a function from models.py
        user = get_user_by_username(username)

        if user and check_password_hash(user[2], password):  # user[2] is password_hash
            session['user_id'] = user[0]  # Store user ID in session
            flash('Login successful!', 'success')
            return redirect(url_for('pages.students'))  # Redirect to dashboard
        else:
            flash('Invalid credentials, please try again.', 'error')
            return redirect(url_for('pages.login'))  # Stay on login page

    return render_template('login.html')

@pages.route('/')
@login_required
def home():
    return render_template('index.html')

@pages.route('/students')
@login_required
def students():
    return render_template('students.html')

@pages.route('/addstudents')
@login_required
def add_students():
    return render_template('add_student.html')

@pages.route('/grades')
@login_required
def grade_students():
    return render_template('grades.html')

@pages.route('/addgrades')
@login_required
def add_grades():
    return render_template('add_grades.html')