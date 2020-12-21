from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from TicketsStore.schemas import OrderSchema, ReserveOrderSchema
from flask_apispec import use_kwargs, marshal_with
from TicketsStore.models import Order, Ticket
from TicketsStore import session
from TicketsStore import docs

orders = Blueprint('orders', __name__)


@orders.route('/order/reserve/<int:ticket_id>', methods=['POST'])
@jwt_required
def reserve(ticket_id):
    check_status = Order.order_by_ticket_id(ticket_id)
    if not check_status:
        pass
    else:
        if check_status.status != 'Available':
            return {'message': 'No Available'}, 204
    new_order = Order()
    new_order.ticket_id = ticket_id
    new_order.user_id = get_jwt_identity()
    new_order.status = 'Reserved'
    new_order.save()
    return {'message': 'Saccess'}, 200


@orders.route('/order/purchase/<int:ticket_id>', methods=['POST'])
@jwt_required
def purchase(ticket_id):
    check_status = Order.order_by_ticket_id(ticket_id)
    if not check_status:
        new_order = Order()
        new_order.ticket_id = ticket_id
        new_order.user_id = get_jwt_identity()
        new_order.status = 'Purchased'
        new_order.save()
        return 200
    else:
        if check_status.status != 'Purchased':
            if check_status.user_id == get_jwt_identity():
                check_status.status = 'Purchased'
                check_status.save()
                return 200

    return {'message': 'No Available'}, 204


#@orders.route('/order/<int:order_id>', methods=['PUT'])
#@jwt_required
#@use_kwargs(OrderSchema)
#@marshal_with(OrderSchema)
#def update_order(order_id, **kwargs):
#    item = Order.query.filter(Order.id == order_id).first()
#    if not item:
#        return {'message': 'No order with this id'}, 400
#    if item.user_id == get_jwt_identity():
#        item.update(**kwargs)
#        return item
#    return 'Have no access', 402


@orders.route('/order/<int:order_id>', methods=['DELETE'])
@jwt_required
@marshal_with(OrderSchema)
def delete_order(order_id):
    item = Order.query.filter(Order.id == order_id).first()
    if item.user_id == get_jwt_identity():
        item.delete()
        session.commit()
        return '', 200
    return '', 400


docs.register(reserve, blueprint='orders')
docs.register(purchase, blueprint='orders')
#docs.register(update_order, blueprint='orders')
docs.register(delete_order, blueprint='orders')

