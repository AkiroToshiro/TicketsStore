from marshmallow import Schema, validate, fields
from datetime import datetime


class TicketSchema(Schema):
    id = fields.Integer(dump_only=True)
    category = fields.String(required=False, validate=[
        validate.Length(max=35)
    ])
    name = fields.String(required=True, validate=[
        validate.Length(max=35)
    ])
    tags = fields.String(required=False, validate=[
        validate.Length(max=35)
    ])
    message = fields.String(dump_only=True)


class UserSchema(Schema):
    id = fields.Integer(dump_only=True)
    firstName = fields.String(required=False, validate=[
        validate.Length(max=35)
    ])
    lastName = fields.String(required=False, validate=[
        validate.Length(max=35)
    ])
    email = fields.String(required=True, validate=[
        validate.Length(max=35)
    ])
    password = fields.String(required=True, validate=[
        validate.Length(max=100)
    ], load_only=True)
    phone = fields.String(required=False, validate=[
        validate.Length(max=35)
    ])
    message = fields.String(dump_only=True)


class AuthSchema(Schema):
    access_token = fields.String(dump_only=True)
    message = fields.String(dump_only=True)


class OrderSchema(Schema):
    id = fields.Integer(dump_only=True)
    ticket_id = fields.Integer(dump_only=False)
    user_id = fields.Integer(dump_only=True)
    order_date = fields.DateTime(default=datetime.now(), dump_only=True)
    status = fields.String(dump_only=True)
    message = fields.String(dump_only=True)


class ReserveOrderSchema(Schema):
    ticket_id = fields.Integer(dump_only=False)
    message = fields.String(dump_only=True)
# log = client.post('user/register', json={'username': 'testusers', 'lastName': 'Tests', 'email': 'email@email.ru', 'password': '4132', 'phone': '+380988071'})