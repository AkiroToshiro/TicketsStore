import React, {Component} from 'react'
import './login.css'
import axios from "axios";
import ticket from '../ticket.png'

export default class Login extends Component{

    render() {
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
        <div className="login">
  <span>
    Login
  </span>
            <form>
                <div className="login-form">
                    <div className="email-form">
                        <label>Email</label>
                        <input name="form-control" className="form-control" placeholder="Email" type="email" />
                    </div>
                    <div className="password-form">
                        <label>Password</label>
                        <input className="form-control" placeholder="******" type="password" />
                    </div>
                </div>
                <div className="checkbox">
                    <label> <input type="checkbox" /> Save password </label>
                </div>
            </form>
            <br/>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary btn-block"> Login</button>
                </div>
                <a href="/register">
                    Sign up now
                </a>
                <a href="/forgot" className="txt1">
                    Forgot?
                </a>
        </div>
            </div>
        )
    }
}
