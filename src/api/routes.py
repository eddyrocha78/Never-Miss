"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
import requests
import json

api = Blueprint('api', __name__)

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


# Simple in-memory storage for user data (replace with a database in production)
users = []

@api.route('/signup', methods=['POST'])
def signup():
    # Process the information coming from the client
    data = request.get_json()
    print(data)

    # We create an instance without being recorded in the database
    user = User()
    first_name = data.get("first_name")
    last_name = data.get("last_name")
    email = data.get("email")
    password = data.get("password")
    confirm_password = data.get("confirm_password")
    is_active = True

    # Check if passwords match
    if password != '' & confirm_password !='' & password != confirm_password :
        return jsonify({'error': 'Password and Confirm Password do not match'}), 400

    # Check if the username is already taken
    if any(user['email'] == email for user in users):
        return jsonify({'error': 'Username already taken'}), 400

    # Store user data (in-memory storage, replace with a database in production)
    users.append({'first_name':first_name, 'last_name':last_name,'email': email, 'password': password})

    # We tell the database we want to record this user
    db.session.add(user)
    db.session.commit()

    return jsonify({'message': 'User registered successfully'}), 201


@api.route('/login', methods=['POST'])
def login():
    # Process the information coming from the client
    user_data = request.get_json()
    print(user_data)

    # We create an instance without being recorded in the database
    user = User.query.filter_by(email=user_data["email"]).first()

    if not user or not user.check_password(user_data["password"]):
        return jsonify({"message": "Wrong username or password"}), 401

    # Notice that we are passing in the actual sqlalchemy user object here
    access_token = create_access_token(identity=user.serialize())
    return jsonify(access_token=access_token)


@api.route('/get', methods=['GET'])
def getInfo():
    res = requests.get('https://api.themoviedb.org/3/movie/299054?language=en-US', headers={
    "accept": "application/json",
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NjJjYjAxZWFiNThjNGRlNzdjOWNhMmY0ZGM4ODQ0NyIsInN1YiI6IjY1Mzk1YmFhZWM0NTUyMDBlYTRkNDMxYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cz3I9EbEUfEny1vJHlbpG7zW_2dSZRBsGCrx6Xy3768"
})
    response_body = {
        "message": res.text
    }
    print(res.text)
    return jsonify(response_body), 200