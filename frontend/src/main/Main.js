import React, {Component} from 'react'
import './main.css'
import axios from "axios";
import img from './1.jpg'
import ticket from '../ticket.png'
export default class Main extends Component {

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
        <section className="event-list">
            <div className="card">
                <img src={img} className="card-img-top" />
                    <div className="card-body">
                        <a className="time">25.06, 14:00</a>
                        <h5 className="card-title">Basta</h5>
                        <a className="place">Kyiv, Stereo Plaza </a>
                        <div className="buy-link">
                            <a href="/event" className="stretched-link">Additional info</a>
                        </div>
                    </div>
            </div>
            <div className="card">
                <img src={img} className="card-img-top" />
                    <div className="card-body">
                        <a className="time">25.06, 14:00</a>
                        <h5 className="card-title">Basta</h5>
                        <a className="place">Kyiv, Stereo Plaza </a>
                        <div className="buy-link">
                            <a href="/event" className="stretched-link">Additional info</a>
                        </div>
                    </div>
            </div>
        </section>
            </div>
        )
    }
}