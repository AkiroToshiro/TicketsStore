import React, {Component} from 'react'
import axios from "axios";

import './event.css'

export default class Event extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: null
        }
    }

    componentDidMount() {
        let event_id = JSON.parse((localStorage.getItem("event")))
        fetch('http://127.0.0.1:8000/tickets/event/' + event_id)
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

        function buy() {
            let token = "JWT " + JSON.parse(localStorage.getItem("token"))
            let el = JSON.parse(localStorage.getItem("event"))
            fetch("http://127.0.0.1:8000/tickets/buy/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token
                },
                body: JSON.stringify({
                    event: el
                })
            })
                .then(response => {
                    return response.json();
                })
                .then(data=>{
                    alert(data.statusMsg);
                })
        }

        const {error, isLoaded, items} = this.state;
        console.log(items)
        if (error) {
            return <p> Error {error.message} </p>
        } else if (!isLoaded) {
            return <p> Loading ...</p>
        } else {
            return (
                <div>
                    <section className="main-img">
                        <img src="./2.jpg"/>
                    </section>
                    <section className="description">
                        <h5 className="event-title">{items.name}</h5>
                        <a className="time">{items.date}</a>
                        <div className="about-event">
                            <h5 className="about-event-title"> About event </h5>
                            <div className="about-event-description">
                                {items.about_event}
                            </div>
                            <h5 className="about-event-title">{items.afisha_name}</h5>
                            <div className="about-event-description">
                                {items.afisha_info}
                            </div>
                        </div>
                    </section>
                    <section className="buy">
                        <div className="event-tickets-item">
                            <div className="description">
                                <h6 className="buy-title">{items.name}</h6>
                                <div className="buy-time">{items.date}</div>
                                <div className="buy-place">{items.place.place}</div>
                                <div className="but-price">{items.price} EUR</div>
                                <button className="btn btn-primary" onClick={buy} type="button">Buy</button>
                            </div>
                        </div>
                    </section>
                </div>
            )
        }
    }
}
