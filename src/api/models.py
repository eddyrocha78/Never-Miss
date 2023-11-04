from flask_sqlalchemy import SQLAlchemy


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

    def serialize(self):
        return {
            "id": self.id,
            "firstName": self.firstName,
            "lastName": self.lastName,
            "email": self.email
            # do not serialize the password, its a security breach
        }