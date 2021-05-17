import React, {Component} from 'react'
import axios from "axios";
import ticket from '../ticket.png'

import './event.css'

export default class Event extends Component {

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
        <section className="main-img">
            <img src="2.jpg" />
        </section>
        <section className="description">
            <h5 className="event-title">Basta</h5>
            <a className="time">25.06, 14:00</a>
            <div className="about-event">
                <h5 className="about-event-title"> About event </h5>
                <div className="about-event-description">
                    Basta in Kiev! On June 25 and 26, 2021, a big concert of the famous rapper Basta will take place in
                    the Stereo Plaza club in Kyiv.
                </div>
                <h5 className="about-event-title">BIG CONCERT OF BASTA IN KIEV</h5>
                <div className="about-event-description">
                    On June 25 and 26, Stereo Plaza Club will host loud concerts by the famous rapper, idol of millions
                    - Basti. For 4 years, everyone has missed a lot of live communication with your favorite artist. I'm
                    sure you won't be able to wait for Basta to appear on stage in the bright spotlight. And you
                    certainly will not be able to miss such an event.
                    Merschi book tickets. As the concert approaches, they will become more expensive.
                </div>
            </div>
        </section>
        <section className="buy">
            <div className="event-tickets-item">
                <div className="description">
                    <h6 className="buy-title">Basta</h6>
                    <div className="buy-time">26 June 2021 20:00</div>
                    <div className="buy-place">Stereo Plaza, Kyiv</div>
                    <div className="but-price">30 EUR</div>
                    <button className="btn btn-primary" type="button">Buy</button>
                </div>
            </div>
        </section>
            </div>
        )
    }
}
