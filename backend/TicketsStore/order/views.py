from flask import Blueprint
from flask_jwt_extended import jwt_required, get_jwt_identity
from backend.TicketsStore import OrderSchema
from flask_apispec import marshal_with
from backend.TicketsStore import Order
from backend.TicketsStore import session
from backend.TicketsStore import docs

orders = Blueprint('orders', __name__)


@orders.route('/order/reserve/<int:ticket_id>', methods=['POST'])
@jwt_required
def reserve(ticket_id):
    if Order.check_order_by_ticket_id(ticket_id):
        return {'message': 'No Available'}, 204
    else:
        new_order = Order()
        new_order.ticket_id = ticket_id
        new_order.user_id = get_jwt_identity()
        new_order.status = 'Reserved'
        new_order.save()
        return {'message': 'Saccess'}, 200


@orders.route('/order/purchase/<int:ticket_id>', methods=['POST'])
@jwt_required
def purchase(ticket_id):
    if Order.check_order_by_ticket_id(ticket_id):
        check_status = Order.order_by_ticket_id(ticket_id)
        if check_status.status != 'Purchased':
            if check_status.user_id == get_jwt_identity():
                check_status.status = 'Purchased'
                check_status.save()
                return {'message': 'Saccess'}, 200
    else:
        new_order = Order()
        new_order.ticket_id = ticket_id
        new_order.user_id = get_jwt_identity()
        new_order.status = 'Purchased'
        new_order.save()
        return {'message': 'Saccess'}, 200
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
        return {'message': 'Saccess'}, 200
    return {'message': 'No Available'}, 204


@orders.route('/order', methods=['GET'])
@jwt_required
@marshal_with(OrderSchema(many=True))
def order_user_list():
    user_id = get_jwt_identity()
    orders = Order.get_order_user_list(user_id)
    return orders


docs.register(reserve, blueprint='orders')
docs.register(purchase, blueprint='orders')
#docs.register(update_order, blueprint='orders')
docs.register(delete_order, blueprint='orders')

