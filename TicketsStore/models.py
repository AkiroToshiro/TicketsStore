from TicketsStore import db, session, Base
from flask_jwt_extended import create_access_token
from datetime import timedelta
from passlib.hash import bcrypt
from .config import Config
from sqlalchemy.orm import relationship
from datetime import datetime


class Ticket(Base):
    __tablename__ = 'tickets'
    id = db.Column(db.Integer, primary_key=True)
    category = db.Column(db.String(35), nullable=True)
    name = db.Column(db.String(35), nullable=False)
    tags = db.Column(db.String(35), nullable=True)
    order = relationship("Order", uselist=False, backref="tickets")

    @classmethod
    def get_ticket_list(cls):
        try:
            tickets = cls.query.all()
            session.commit()
        except Exception:
            session.rollback()
            raise
        return tickets

    def update(self, **kwargs):
        for key, value in kwargs.items():
            setattr(self, key, value)
        session.commit()

    def save(self):
        try:
            session.add(self)
            session.commit()
        except Exception:
            session.rollback()
            raise

    @classmethod
    def ticket_by_id(cls, ticket_id):
        try:
            ticket = cls.query.filter(cls.id == ticket_id).first()
            if not ticket:
                raise Exception('No tutorials with this id')
        except Exception:
            session.rollback()
            raise
        return ticket

    @classmethod
    def ticket_by_tag(cls, ticket_tag):
        try:
            tickets = cls.query.filter(cls.tags == ticket_tag).all()
            if not tickets:
                raise Exception('No tickets with this tag')
        except Exception:
            session.rollback()
            raise
        session.commit()
        return tickets

    @classmethod
    def ticket_by_status(cls, ticket_status):
        try:
            tickets = cls.query.filter(cls.status == ticket_status).all()
            if not tickets:
                raise Exception('No tickets with this status')
            session.commit()
        except Exception:
            session.rollback()
            raise
        return tickets

    def delete(self):
        try:
            session.delete(self)
            session.commit()
        except Exception:
            session.rollback()
            raise


class Order(Base):
    __tablename__ = 'orders'
    id = db.Column(db.Integer, primary_key=True)
    ticket_id = db.Column(db.Integer, db.ForeignKey('tickets.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    order_date = db.Column(db.DateTime, default=datetime.now())
    status = db.Column(db.String(35), nullable=False)



    @classmethod
    def get_order_list(cls):
        try:
            orders = cls.query.all()
        except Exception:
            raise
        return orders

    @classmethod
    def get_order_user_list(cls, user_id):
        try:
            orders = cls.query.filter(cls.user_id == user_id).all()
        except Exception:
            raise
        return orders

    @classmethod
    def order_by_id(cls, order_id):
        try:
            order = cls.query.filter(cls.id == order_id).first()
            if not order:
                raise Exception('No order with this id')
        except Exception:
            raise
        return order

    @classmethod
    def order_by_ticket_id(cls, ticket_id):
        try:
            order = cls.query.filter(cls.ticket_id == ticket_id).first()
            if not order:
                raise
        except Exception:
            raise
        return order

    @classmethod
    def orders_by_user_id(cls, user_id):
        try:
            orders = cls.query.filter(cls.user_id == user_id).all()
            if not orders:
                raise Exception('This user haven`t orders')
        except Exception:
            session.rollback()
            raise
        return orders

    def save(self):
        try:
            session.add(self)
            session.commit()
        except Exception:
            session.rollback()
            raise

    def delete(self):
        try:
            session.delete(self)
            session.commit()
        except Exception:
            session.rollback()
            raise


class User(Base):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    firstName = db.Column(db.String(35), nullable=True)
    lastName = db.Column(db.String(35), nullable=True)
    email = db.Column(db.String(35), nullable=False, unique=True)
    password = db.Column(db.String(100), nullable=False)
    phone = db.Column(db.String(35), nullable=True)
    is_admin = db.Column(db.Boolean(), default=False)
    order_id = relationship('Order', backref='users', lazy=True)

    def __init__(self, **kwargs):
        self.firstName = kwargs.get('firstName')
        self.lastName = kwargs.get('lastName')
        self.email = kwargs.get('email')
        self.password = bcrypt.hash(kwargs.get('password'))
        self.phone = kwargs.get('phone')
        self.is_admin = kwargs.get('is_admin')

    @classmethod
    def register(cls, **kwargs):
        try:
            user = User(**kwargs)
            test_email = cls.query.filter(cls.email == user.email).first()
            if not test_email:
                session.add(user)
                session.commit()
                token = user.get_token()
            else:
                raise Exception('This email already registered')
        except Exception:
            raise
        return token

    def get_token(self, expire_time=24):
        expire_delta = timedelta(expire_time)
        token = create_access_token(
            identity=self.id,
            expires_delta=expire_delta,
        )
        return token

    @classmethod
    def authenticate(cls, email, password):
        try:
            test = cls.query.filter(cls.email == email).first()
            if not test:
                raise Exception('Wrong email or password')
            user = cls.query.filter(cls.email == email).first()
            if not bcrypt.verify(password, user.password):
                raise Exception('Wrong email or password')
        except Exception:
            raise
        return user

    @classmethod
    def get_user_list(cls):
        try:
            users = cls.query.all()
        except Exception:
            raise
        return users

    @classmethod
    def user_by_id(cls, user_id):
        try:
            user = cls.query.filter(cls.id == user_id).first()
            if not user:
                raise Exception('No user with this id')
        except Exception:
            raise
        return user

    @classmethod
    def check_user_admin(cls, user_id):
        try:
            user = cls.user_by_id(user_id)
            if user.is_admin:
                return True
        except Exception:
            raise
        return False

    def update(self, **kwargs):
        try:
            for key, value in kwargs.items():
                setattr(self, key, value)
            session.commit()
        except Exception:
            session.rollback()
            raise
        return self

    @classmethod
    def delete_user(cls, user_id):
        try:
            user = cls.user_by_id(user_id)
            session.delete(user)
            session.commit()
        except Exception:
            raise
        return {'message': 'Saccess'}