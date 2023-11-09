from flask_sqlalchemy import SQLAlchemy
from hmac import compare_digest


db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    firstName = db.Column(db.String(80), nullable=False)
    lastName = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    confirmPassword = db.Column(db.String(120), nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return f'<User {self.email}>'

    def check_password(self, password):
        return compare_digest(password, self.password)

    def serialize(self):
        return {
            "id": self.id,
            "firstName": self.firstName,
            "lastName": self.lastName,
            "email": self.email
            # do not serialize the password, its a security breach
        }

    
class FavoriteMovie(db.Model):
    id = db.Column(db.Integer, primary_key=True, unique=True)
    userId = db.Column(db.Integer, db.ForeignKey("user.id"))
    movieId = db.Column(db.Integer,  nullable=False)
    user = db.relationship(User)
    def __repr__(self):
        return '<FavoriteMovie %r>' % self.id

    def serialize(self):
        return {
            "id": self.id,
            "userId": self.userId,
            "movieId": self.movieId
        }

class FavoriteSeries(db.Model):
    id = db.Column(db.Integer, primary_key=True, unique=True)
    userId = db.Column(db.Integer, db.ForeignKey("user.id"))
    seriesId = db.Column(db.Integer, nullable=False)
    user = db.relationship(User)
    def __repr__(self):
        return '<FavoriteSeries %r>' % self.id

    def serialize(self):
        return {
            "id": self.id,
            "userId": self.userId,
            "seriesId": self.seriesId
        }
