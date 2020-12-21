from flask import Blueprint
from flask_jwt_extended import jwt_required
from TicketsStore.schemas import TicketSchema
from flask_apispec import use_kwargs, marshal_with
from TicketsStore.models import Ticket
from TicketsStore import docs

tickets = Blueprint('tickets', __name__)


@tickets.route('/ticket', methods=['GET'])
@jwt_required
@marshal_with(TicketSchema(many=True))
def get_ticket_list():
    tickets = Ticket.get_ticket_list()
    return tickets


@tickets.route('/ticket/<int:ticket_id>', methods=['GET'])
@jwt_required
@marshal_with(TicketSchema(many=True))
def ticket_by_id(ticket_id):
    item = Ticket.ticket_by_id(ticket_id=ticket_id)
    return item


@tickets.route('/ticket/findByTags/<string:tag>', methods=['GET'])
@jwt_required
@marshal_with(TicketSchema(many=True))
def ticket_by_tag(tag):
    item = Ticket.ticket_by_tag(ticket_tag=tag)
    return item


@tickets.route('/ticket/findByStatus/<string:status>', methods=['GET'])
@jwt_required
@marshal_with(TicketSchema(many=True))
def ticket_by_status(status):
    item = Ticket.ticket_by_status(ticket_status=status)
    return item


docs.register(get_ticket_list, blueprint='tickets')
docs.register(ticket_by_id, blueprint='tickets')
docs.register(ticket_by_tag, blueprint='tickets')
docs.register(ticket_by_status, blueprint='tickets')
