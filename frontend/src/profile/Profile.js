import React, {Component} from 'react'
import './profile.css'
import lock from './lock.png'
import user from './user.png'
import credirCard from './credit-card.png'
import ticket from '../ticket.png'

export default class Profile extends Component {

    render(){
        return (
        <div>
            <div className="header">
                <nav className="navbar navbar-light bg-light">
                    <a className="navbar-brand">
                        <img src={ticket} width="30" height="30" className="d-inline-block align-top" alt="" />
                        Tickets store
                    </a>
                    <div className="navbar-info">
                        <a href="/main" className="btn btn-outline-info"> Event list </a>
                        <a href="/tickets" className="btn btn-outline-info"> Your
                            tickets </a>
                        <a href="/profile" className="btn btn-outline-info"> Profile </a>
                        <a href="/login" className="btn btn-outline-info"> Log out </a>
                    </div>
                </nav>
            </div>
        <div class="contact">
            <label>
                <img src={user} width="30" height="30" class="d-inline-block align-top" alt="" />
                    Contacts</label>
            <div class="input-form">
                <input name="form-control" class="form-control" placeholder="Name" type="name" />
                    <input name="form-control" class="form-control" placeholder="Last name" type="lastName" />
                        <input name="form-control" class="form-control" placeholder="Email" type="email" />
                            <input name="form-control" class="form-control" placeholder="Number phone" type="numbePhone" />
            </div>
            <div class="form-group">
                <button type="submit" class="btn btn-primary btn-block"> Save </button>
            </div>
        </div>
        <div class="change-password">
            <label>
                <img src={lock} width="30" height="30" class="d-inline-block align-top" alt="" />
                    Change password
            </label>
        <div class="input-form">
            <input name="form-control" class="form-control" placeholder="Password" type="password" />
            <input name="form-control" class="form-control" placeholder="New password" type="password" />
            <input name="form-control" class="form-control" placeholder="Confirm password" type="password" />
        </div>
        <div class="form-group">
            <button type="submit" class="btn btn-primary btn-block"> Save </button>
        </div>
    </div>
        <div className="Card">
            <label>
                <img src={credirCard} width="30" height="30" class="d-inline-block align-top" alt="" />
                    Add payment
            </label>
        <div class="form-group">
            <button type="submit" class="btn btn-primary btn-block"> Add </button>
        </div>
    </div>
    </div>
        )
    }
}

