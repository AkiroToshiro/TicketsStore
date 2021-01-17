from TicketsStore import client
import pytest

admin_auths = {
    'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MTAzMTY3NjUsIm5iZiI6MTYxMDMxNjc2NSwianRpIjoiODBkZTU3NGMtMjA4Ni00NjZkLWI0NmUtMzJlYjQyN2Q5NzI1IiwiZXhwIjoxNjEyMzkwMzY1LCJpZGVudGl0eSI6NCwiZnJlc2giOmZhbHNlLCJ0eXBlIjoiYWNjZXNzIn0.VXnb2sAMZguLDP8t8HPek94yoYx_pLulxYrh0tSNcOI'}

"""" User """


def register_check():
    log_bad_register = client.post('/user/register',
                                   json={'firstName': 'Max', 'lastName': 'Prima', 'email': 'mail@mail.ru',
                                         'password': '4132',
                                         'phone': '3809123'})
    assert log_bad_register.status_code == 500
    assert log_bad_register.get_json() == {'message': 'This email already registered'}

    log_good_register = client.post('/user/register',
                                    json={'firstName': 'Max', 'lastName': 'Prima', 'email': 'mail3@mail.ru',
                                          'password': '4132',
                                          'phone': '3809123'})
    assert log_good_register.status_code == 200
    assert log_good_register.get_json() == {'message': 'access'}


def login_check():
    log_good_login = client.post('/user/login', json={'email': 'mail@mail.ru', 'password': '4132'})
    assert log_good_login.status_code == 200
    assert log_good_login.get_json() == log_good_login.get_json()
    log_bad_login = client.post('/user/login', json={'email': 'mail@mail.ru', 'password': '413'})
    assert log_bad_login.status_code == 500
    assert log_bad_login.get_json() == {'message': 'Wrong email or password'}
    return log_good_login.get_json()


def update_check(auths):
    log = client.put('/user/update', json={'firstName': 'Test'}, headers=auths)
    assert log.get_json() == {'message': 'Success'}
    assert log.status_code == 200
    log = client.put('/user/update', json={'firstName2': 'Test'}, headers=auths)
    assert log.status_code == 422
    assert log.get_json() is None


def delete_check():
    token = client.post('/user/login', json={'email': 'mail3@mail.ru', 'password': '4132'}).get_json()
    auths = {'Authorization': 'Bearer ' + token['access_token']}
    log = client.delete('/user', headers=auths)
    assert log.get_json() == {'message': 'Success'}
    assert log.status_code == 200


"""" Ticket """


def get_ticket_check():
    log = client.get('/ticket')
    assert log.status_code == 200
    assert log.get_json() == log.get_json()


def get_ticket_by_id():
    log = client.get('/ticket/2')
    assert log.status_code == 200
    assert log.get_json() == {'category': 'Film', 'id': 2, 'name': 'Harry Potter 2', 'tags': 'Horror'}
    log = client.get('/ticket/3000')
    assert log.status_code == 404
    assert log.get_json() == {'message': 'No ticket with this id'}


def get_ticket_by_tag_check():
    log = client.get('/ticket/findByTags/Horror')
    assert log.status_code == 200

    log = client.get('/ticket/findByTags/Horro')
    assert log.status_code == 500


"""" Order """


def reserve_ticket_check(auths):
    log = client.post('/order/reserve/1', headers=auths)
    assert log.status_code == 200
    assert log.get_json() == {'message': 'Saccess'}
    log = client.post('/order/reserve/1', headers=admin_auths)
    assert log.status_code == 500
    assert log.get_json() == {'message': 'No Available'}
    log = client.post('/order/reserve/123123', headers=auths)
    assert log.status_code == 404
    assert log.get_json() == {'message': 'No ticket with this id'}


def purchase_ticket_check(auths):
    log = client.post('/order/purchase/1', headers=admin_auths)
    assert log.status_code == 500
    assert log.get_json() == {'message': 'No Available'}
    log = client.post('/order/purchase/1', headers=auths)
    assert log.status_code == 200
    assert log.get_json() == {'message': 'Saccess'}
    log2 = client.post('/order/purchase/14232', headers=auths)
    assert log2.status_code == 404
    assert log2.get_json() == {'message': 'No ticket with this id'}


def order_user_list_check(auths):
    log = client.get('order', headers=auths)
    assert log.status_code == 200
    assert log.get_json() == log.get_json()


def delete_order_check(auths):
    log = client.delete('/order/2888', headers=auths)
    assert log.status_code == 500
    assert log.get_json() == {'message': 'No Available'}
    log2 = client.get('order', headers=auths)
    id = log2.get_json()
    id = id[0]['id']
    tmp = '/order/' + str(id)
    log = client.delete(tmp, headers=auths)
    assert log.status_code == 200
    assert log.get_json() == {'message': 'Saccess'}


""""Admin"""


def get_user_list(auths):
    log = client.get('user/list', headers = admin_auths)
    assert log.get_json() == log.get_json()
    assert log.status_code == 200
    log = client.get('user/list', headers = auths)
    assert log.get_json() == [{}]
    assert log.status_code == 500


def get_user_by_id(auths):
    log = client.get('user/4', headers=admin_auths)
    assert log.get_json() == log.get_json()
    assert log.status_code == 200
    log = client.get('user/4', headers=auths)
    assert log.get_json() == {'message': 'Haven`t perm'}
    assert log.status_code == 500
    log = client.get('user/123123', headers=admin_auths)
    assert log.get_json() == {'message': 'No user with this id'}
    assert log.status_code == 404


def add_ticket(auths):
    log = client.post('/ticket', json={'category': 'Film', 'name': 'Harry Potter 23', 'tags': 'Horror'},
                      headers=admin_auths)
    assert log.status_code == 200
    assert log.get_json() == log.get_json()
    log = client.post('/ticket', json={'category': 'Film', 'name': 'Harry Potter 23', 'tags': 'Horror'},
                      headers=auths)
    assert log.get_json() == {'message': 'Haven`t perm'}
    assert log.status_code == 500
    log = client.post('/ticket', json={'categsory': 'Film', 'name': 'Harry Potter 23', 'tags': 'Horror'},
                      headers=auths)
    assert log.status_code == 422
    assert log.get_json() is None


def update_ticket(auths):
    log = client.put('/ticket/1', json={'name': 'Harry Potter 58'}, headers=admin_auths)
    assert log.status_code == 200
    assert log.get_json() == {'message': 'Saccess'}
    log = client.put('/ticket/123123', json={'name': 'Harry Potter 58'}, headers=admin_auths)
    assert log.status_code == 404
    assert log.get_json() == {'message': 'No ticket with this id'}
    log = client.put('/ticket/1', json={'name': 'Harry Potter 58'}, headers=auths)
    assert log.get_json() == {'message': 'Haven`t perm'}
    assert log.status_code == 500


def main():

    register_check()
    login_check()
    token = login_check()
    auths = {'Authorization': 'Bearer ' + token['access_token']}
    update_check(auths)
    delete_check()

    get_ticket_check()
    get_ticket_by_id()
    get_ticket_by_tag_check()


    token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MTAzMTY2MzAsIm5iZiI6MTYxMDMxNjYzMCwianRpIjoiMGI1ZTNiNWUtY2NiNC00MzZlLWI4YTgtNGU2ZTlhMThhNjg4IiwiZXhwIjoxNjEyMzkwMjMwLCJpZGVudGl0eSI6OCwiZnJlc2giOmZhbHNlLCJ0eXBlIjoiYWNjZXNzIn0.MozE_jS0jVzKH3G03mkY0o_URAIr42lYk5QqRvelaBU'
    auths = {'Authorization': 'Bearer ' + token}
    reserve_ticket_check(auths)
    purchase_ticket_check(auths)
    delete_order_check(auths)
    order_user_list_check(auths)


    get_user_list(auths)
    get_user_by_id(auths)
    add_ticket(auths)
    update_ticket(auths)

if __name__ == 'test':
    main()

# eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MDg3MzU4MzMsIm5iZiI6MTYwODczNTgzMywianRpIjoiNTc1NDNmNWItMDhlMi00NDc5LWE5ZWEtMGM3NThkZWZmYzBkIiwiZXhwIjoxNjEwODA5NDMzLCJpZGVudGl0eSI6MzcsImZyZXNoIjpmYWxzZSwidHlwZSI6ImFjY2VzcyJ9.nwjcklhxJjLpOqqYppWlBncNC02JCFcur4eZirNywCo