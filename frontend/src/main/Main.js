import React, {Component} from 'react'
import './main.css'
import axios from "axios";

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        }
    }

    componentDidMount() {
        fetch('http://127.0.0.1:8000/tickets/eventlist/')
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
        function addInfo(event_id) {
            localStorage.setItem("event", JSON.stringify(event_id));
            window.location.href = '/event';
        }
        const {error, isLoaded, items} = this.state;
        if (error) {
            return <p> Error {error.message} </p>
        } else if (!isLoaded) {
            return <p> Loading ...</p>
        } else {
            return (
                <div>
                    <section className="event-list">
                        {items.map(item =>
                            <div className="card">
                                <img src={item.frontimg} className="card-img-top"/>
                                <div className="card-body">
                                    <a className="time">{item.date}</a>
                                    <h5 className="card-title">{item.name}</h5>
                                    <a className="place">{item.place.place}</a>
                                    <div className="buy-link">
                                        <button type="submit" onClick={ () => addInfo(item.id)} className="btn btn-outline-info"> Additional info</button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </section>
                </div>
            )
        }
    }
}