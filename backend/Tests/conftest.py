from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, scoped_session
from sqlalchemy.ext.declarative import declarative_base
import pytest
import sys

sys.path.append('../..')

from backend.TicketsStore import app
from backend.TicketsStore import client
from backend.TicketsStore import *


@pytest.fixture
def client():
    engine = create_engine('mysql://root:4132@localhost/ticketsstoretest')

    session = scoped_session(sessionmaker(
        autocommit=False, autoflush=False, bind=engine))

    Base = declarative_base()
    Base.query = session.query_property()

    Base.metadata.create_all(bind=engine)




