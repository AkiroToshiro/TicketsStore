from flask import Flask
from sqlalchemy.orm import sessionmaker, scoped_session
from sqlalchemy import create_engine
import sqlalchemy as db
from sqlalchemy.ext.declarative import declarative_base
from flask_jwt_extended import JWTManager, jwt_required
from .config import Config
from apispec.ext.marshmallow import MarshmallowPlugin
from apispec import APISpec
from flask_apispec.extension import FlaskApiSpec
from TicketsStore.schemas import TicketSchema, UserSchema, AuthSchema

app = Flask(__name__)
app.config.from_object(Config)

client = app.test_client()

engine = create_engine('mysql://root:4132@localhost/ticketsstore')

session = scoped_session(sessionmaker(autocommit=False, autoflush=False, bind=engine))

Base = declarative_base()
Base.query = session.query_property()

jwt = JWTManager()

docs = FlaskApiSpec()

app.config.update({
    'APISPEC_SPEC': APISpec(
        title='TicketStore',
        version='v1',
        openapi_version='2.0',
        plugins=[MarshmallowPlugin()],
    ),
    'APISPEC_SWAGGER_URL': '/swagger/'
})


@app.teardown_appcontext
def shutdown_session(exception=None):
    session.remove()


from .ticket.views import tickets

from .users.views import users

from .order.views import orders

from .admin.views import admins

app.register_blueprint(tickets)
app.register_blueprint(users)
app.register_blueprint(orders)
app.register_blueprint(admins)

docs.init_app(app)
jwt.init_app(app)
