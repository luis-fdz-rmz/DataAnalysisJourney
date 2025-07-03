from flask import Blueprint, render_template

pages = Blueprint('pages', __name__)

@pages.route('/')
def home():
    return render_template('index.html')

@pages.route('/students')
def students():
    return render_template('students.html')
