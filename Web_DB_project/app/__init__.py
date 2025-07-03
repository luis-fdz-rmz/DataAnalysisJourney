from psycopg import connect
import os
from dotenv import load_dotenv
from flask import Flask
from app.routes.pages import pages
from app.routes.api import api


def create_app():
    app = Flask(__name__)

    conn = connect(
        host=os.getenv("DB_HOST"),
        dbname=os.getenv("DB_NAME"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD")
    )
    app.config["DB_CONN"] = conn
    app.register_blueprint(pages)
    app.register_blueprint(api)
    return app
