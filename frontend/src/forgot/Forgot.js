import React from 'react'
import './forgot.css'
import ticket from '../ticket.png'
export default function Forgot() {
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
    <div className="input">
  <span>
    Request password reset
  </span>
        <form>
            <div className="email-form">
                <input name="form-control" className="form-control" placeholder="Enter your email" type="email" />
            </div>
        </form>
        <br />
            <div className="form-group">
                <button type="submit" className="btn btn-primary btn-block"> Request password reset</button>
            </div>
            <a href="/login">
                Remembered your password? Login here
            </a>
    </div>
        </div>
    )
}