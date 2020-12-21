from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from TicketsStore.schemas import UserSchema, TicketSchema, OrderSchema
from flask_apispec import use_kwargs, marshal_with
from TicketsStore.models import Order, Ticket, User
from TicketsStore import session
from TicketsStore import docs

admins = Blueprint('admins', __name__)


@admins.route('/user/list', methods=['GET'])
@jwt_required
@marshal_with(UserSchema(many=True))
def get_user_list():
    if User.check_user_admin(get_jwt_identity()):
        users = User.query.all()
        return users, 200
    return {'message': 'Haven`t perm'}, 402


@admins.route('/user/<int:user_id>', methods=['PUT'])
@jwt_required
@use_kwargs(UserSchema)
@marshal_with(UserSchema)
def update_user(user_id, **kwargs):
    if User.check_user_admin(get_jwt_identity()):
        item = User.query.filter(User.id == user_id).first()
        item.update(**kwargs)
        return item
    return {'message': 'Haven`t perm'}, 402


@admins.route('/user/<int:user_id>', methods=['DELETE'])
@jwt_required
def delete_user(user_id):
    if User.check_user_admin(get_jwt_identity()):
        User.delete_user(user_id)
        return {'message': 'Success'}, 202
    return {'message': 'Haven`t perm'}, 402


@admins.route('/ticket', methods=['POST'])
@jwt_required
@use_kwargs(TicketSchema)
@marshal_with(TicketSchema)
def add_ticket(**kwargs):
    if User.check_user_admin(get_jwt_identity()):
        new_ticket = Ticket(**kwargs)
        new_ticket.status = 'Available'
        new_ticket.save()
        return new_ticket
    return {'message': 'Haven`t perm'}, 402


@admins.route('/ticket/<int:ticket_id>', methods=['PUT'])
@jwt_required
@use_kwargs(TicketSchema)
@marshal_with(TicketSchema)
def update_ticket(ticket_id, **kwargs):
    if User.check_user_admin(get_jwt_identity()):
        item = Ticket.query.filter(Ticket.id == ticket_id).first()
        if not item:
            return {'message': 'No ticket with this id'}, 400
        item.update(**kwargs)
        return item
    return {'message': 'Haven`t perm'}, 402


@admins.route('/ticket/<int:ticket_id>', methods=['DELETE'])
@jwt_required
@marshal_with(TicketSchema)
def delete_ticket(ticket_id):
    if User.check_user_admin(get_jwt_identity()):
        item = Ticket.query.filter(Ticket.id == ticket_id).first()
        item.delete()
        session.commit()
        return '', 204
    return 'Have no access', 402


@admins.route('/order', methods=['GET'])
@jwt_required
@marshal_with(OrderSchema(many=True))
def get_order_list():
    if User.check_user_admin(get_jwt_identity()):
        tickets = Order.get_order_list()
        return tickets
    return 'Have no access', 402


@admins.route('/order/<int:order_id>', methods=['PUT'])
@jwt_required
@use_kwargs(OrderSchema)
@marshal_with(OrderSchema)
def update_order(order_id, **kwargs):
    if User.check_user_admin(get_jwt_identity()):
        item = Order.query.filter(Order.id == order_id).first()
        if not item:
            return {'message': 'No order with this id'}, 400
        item.update(**kwargs)
        return item
    return 'Have no access', 402


@admins.route('/order/<int:order_id>', methods=['DELETE'])
@jwt_required
@marshal_with(OrderSchema)
def delete_order(order_id):
    if User.check_user_admin(get_jwt_identity()):
        item = Order.query.filter(Order.id == order_id).first()
        if not item:
            return {'message': 'No order with this id'}, 400
        item.delete()
        session.commit()
        return '', 200
    return 'Have no access', 402


@admins.route('/order/<int:order_id>', methods=['GET'])
@jwt_required
@marshal_with(OrderSchema)
def order_by_id(order_id):
    if User.check_user_admin(get_jwt_identity()):
        item = Order.order_by_id(order_id=order_id)
        return item
    return  'Have no access', 402


docs.register(get_user_list, blueprint='admins')
docs.register(update_user, blueprint='admins')
docs.register(delete_user, blueprint='admins')
docs.register(add_ticket, blueprint='admins')
docs.register(update_ticket, blueprint='admins')
docs.register(delete_ticket, blueprint='admins')
docs.register(get_order_list, blueprint='admins')
docs.register(update_order, blueprint='admins')
docs.register(delete_order, blueprint='admins')
docs.register(order_by_id, blueprint='admins')