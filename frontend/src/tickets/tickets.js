import React, {Component} from 'react'
import axios from "axios";

import ticket from '../ticket.png'
import './tickets.css'

export default class Tickets extends Component {
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
        <h2 className="desc">Your tickets </h2>
        <section className="tickets-list">
            <div className="ticket-item">
                <h6 className="buy-title">Basta</h6>
                <div className="buy-time">26 June 2021 20:00</div>
                <div className="buy-place">Stereo Plaza, Kyiv</div>
                <div className="buy-price">30 EUR</div>
                <button type="button" className="btn btn-light">Print ticket</button>
            </div>
        </section>
            </div>
        )
    }
}