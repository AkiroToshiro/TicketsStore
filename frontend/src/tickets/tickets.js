import React, {Component} from 'react'
import axios from "axios";

import './tickets.css'

export default class Tickets extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        }
    }

    componentDidMount() {
        let token = "JWT " + JSON.parse(localStorage.getItem("token"))
        fetch('http://127.0.0.1:8000/tickets/ticketslist', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: token
            }
        })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    })
                }
            )
    }

    render() {
        const {error, isLoaded, items} = this.state;
        if (error) {
            return <p> Error {error.message} </p>
        } else if (!isLoaded) {
            return <p> Loading ...</p>
        } else{
            return (
                <div>
                    <h2 className="desc">Your tickets </h2>
                        {items.map(item =>
                            <div>
                                <section className="tickets-list">
                                <div className="ticket-item">
                                    <h6 className="buy-title">{item.event.name}</h6>
                                    <div className="buy-time">{item.event.date}</div>
                                    <div className="buy-place">{item.event.place.place}</div>
                                    <div className="buy-price">{item.event.price}EUR</div>
                                    <button type="button" className="btn btn-light">Print ticket</button>
                                </div>
                                </section>
                                <br/>
                            </div>
                        )}
                </div>
            )
        }
    }
}