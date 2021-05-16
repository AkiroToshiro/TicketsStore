import React, {Component} from 'react'
import './header.css'
import axios from "axios";
import ticketlogo from './ticket.png'

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            res: []
        }
    }

    componentDidMount() {
        let token = JSON.parse(localStorage.getItem("token"));
        var data = {
            'token': token
        }
        axios.post('http://127.0.0.1:8000/user/token/verify/', data)
            .then(res => {
                this.setState({
                    isLoaded: true,
                    res: res.status
                })
            })
    }

    render() {
        function logout() {
            localStorage.removeItem("token");
            window.location.href = '/login';
        }
        const {error, isLoaded, res} = this.state;
        console.log(res)
        if (error) {
            return <p> Error {error.message} </p>
        }
        else {
            if (res == 200) {
                return (
                    <div className="header">
                        <nav className="navbar navbar-light bg-light">
                            <a className="navbar-brand">
                                <img src={ticketlogo} width="30" height="30" className="d-inline-block align-top"
                                     alt="" />
                                    Tickets store
                                </a>
                        <div className="navbar-info">
                            <a href="/main" className="btn btn-outline-info"> Event list </a>
                            <a href="/tickets" className="btn btn-outline-info"> Your
                                tickets </a>
                            <a href="/profile" className="btn btn-outline-info"> Profile </a>
                            <button type="submit" onClick={logout} className="btn btn-outline-info"> Log out</button>
                        </div>
                        </nav>
                    </div>
                )
            }
            else {
                return (
                    <div className="header">
                        <nav className="navbar navbar-light bg-light">
                            <a className="navbar-brand">
                                <img src={ticketlogo} width="30" height="30" className="d-inline-block align-top"
                                     alt="" />
                                Tickets store
                            </a>
                                 <div className="navbar-info">
                                     <a href="/main" className="btn btn-outline-info"> Event list </a>
                                     <a href="/login" className="btn btn-outline-info"> Login </a>
                                 </div>
                        </nav>
                    </div>
                )
            }
        }
    }
}