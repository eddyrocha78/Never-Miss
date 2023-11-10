"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException

from flask import Flask, request, jsonify, url_for, Blueprint
from flask_sqlalchemy import SQLAlchemy

from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

from flask_cors import CORS
from api.models import db, User
from api.utils import generate_sitemap, APIException


api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api, supports_credentials=True)

# Simple in-memory storage for user data (replace with a database in production)
users = []

@api.route('/user', methods=['GET'])
@jwt_required()
def get_user():

    email = get_jwt_identity()
    json = {
        "email" : str(email["email"]),
        "id" : str(email["id"]),
        "name" : str(email["firstName"]),
        "lastName" : str(email["lastName"])
    }
    return jsonify(json)


@api.route('/signup', methods=['POST'])
def signup():
    # Process the information coming from the client
    user_data = request.get_json()
    print(user_data)

    # We create an instance without being recorded in the database
    user = User()
    user.firstName = user_data["firstName"]
    user.lastName = user_data["lastName"]
    user.email = user_data["email"]
    user.password = user_data["password"]
    user.confirmPassword = user_data["confirmPassword"]
    user.is_active = True

    if not (user.firstName and user.lastName and user.email and user.password and user.confirmPassword):
        return jsonify({'message': 'All fields are required'}), 400
    
    # Check if passwords match
    if (user.password != user.confirmPassword):
        return jsonify({'error': 'Password and Confirm Password do not match'}), 400

    # Check if the user with the same email already exists (you should use a database)
    existing_user = next((user for user in users if user['email'] == user.email), None)
    if existing_user:
        return jsonify({'message': 'User with this email already exists'}), 400


    # We tell the database we want to record this user and execute the command provided
    db.session.add(user)
    db.session.commit()

    return jsonify({'message': 'User registered successfully'}), 201


@api.route("/login", methods=["POST"])
def create_token():
    user_data = request.get_json()

    email = user_data.get("email", None)
    password = user_data.get("password", None)

    user = User.query.filter_by(email=email).one_or_none()
    if not user or not user.check_password(password):
        return jsonify("Bad username or password"), 401

    # Notice that we are passing in the actual sqlalchemy user object here
    access_token = create_access_token(identity=user.serialize())
    return jsonify(access_token=access_token)

    response_body = {
        "message": "The user has been created without a problem"
    }
    return jsonify(response_body), 200




@api.route('/users')
def handle_users():
    users = User.query.all()
    return jsonify([p.serialize() for p in users]), 200