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
    return render_template('login.html')

@pages.route('/')
@login_required
def home():
    return render_template('index.html')

@pages.route('/students')
@login_required
def students():
    return render_template('students.html')



@pages.route('/signuprequests')
@login_required
def signuprequests():
    return render_template('approve_user.html')

@pages.route('/grades')
@login_required
def grade_students():
    return render_template('grades.html')

@pages.route('/addgrades')
@login_required
def add_grades():
    return render_template('add_grades.html')


# TODO:
# * class route 
# * /class/id 

@pages.route('/')
@login_required
def home_page():
    return render_template('home.html')