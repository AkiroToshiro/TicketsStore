from flask import Blueprint
from TicketsStore import session
from TicketsStore.schemas import UserSchema, AuthSchema
from flask_apispec import use_kwargs, marshal_with
from flask_jwt_extended import jwt_required, get_jwt_identity
from TicketsStore.models import User
from TicketsStore import docs

users = Blueprint('users', __name__)


@users.route('/user/register', methods=['POST'])
@use_kwargs(UserSchema)
@marshal_with(AuthSchema)
def user_register(**kwargs):
    try:
        token = User.register(**kwargs)
    except Exception as e:
        return {'message': str(e)}, 400
    return {'access_token': token}


@users.route('/user/login', methods=['POST'])
@use_kwargs(UserSchema(only=('email', 'password')))
@marshal_with(AuthSchema)
def user_login(**kwargs):
    try:
        user = User.authenticate(**kwargs)
        token = user.get_token()
    except Exception as e:
        return {'message': str(e)}, 400
    return {'access_token': token}


@users.route('/user/update', methods=['PUT'])
@jwt_required
@use_kwargs(UserSchema)
def update_user(**kwargs):
    try:
        item = User.query.filter(User.id == get_jwt_identity()).first()
        item = item.update(**kwargs)
    except Exception as e:
        return {'message': str(e)}, 400
    return {'message': 'Success'}, 200


@users.route('/user', methods=['DELETE'])
@jwt_required
def delete_user():
    try:
        msg = User.delete_user(get_jwt_identity())
        return msg, 200
    except Exception as e:
        return {'message': str(e)}, 400


docs.register(user_register, blueprint='users')
docs.register(user_login, blueprint='users')
docs.register(update_user, blueprint='users')
docs.register(delete_user, blueprint='users')

# eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MDY5MDk2ODEsIm5iZiI6MTYwNjkwOTY4MSwianRpIjoiMzAwODIyZTctNDIwOC00ZWRjLTg3ZTMtZDQzZmNmMjU3ODliIiwiZXhwIjoxNjA4OTgzMjgxLCJpZGVudGl0eSI6MSwiZnJlc2giOmZhbHNlLCJ0eXBlIjoiYWNjZXNzIn0.mXtxKRITTpmXOhomZodwxvTUHwhaGwE5UW3dZc1wAKM
