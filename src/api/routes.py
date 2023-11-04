"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
#from flask_jwt_extended import create_access_token, jwt_required, current_user


api = Blueprint('api', __name__)


# Simple in-memory storage for user data (replace with a database in production)
users = []

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


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