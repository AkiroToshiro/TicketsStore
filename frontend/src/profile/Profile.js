import React, {Component} from 'react'
import './profile.css'
import lock from './lock.png'
import user from './user.png'
import credirCard from './credit-card.png'


export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: null
        }
    }

    componentDidMount() {
        let token = "JWT " + JSON.parse(localStorage.getItem("token"))
        fetch('http://127.0.0.1:8000/user/userinfo/', {
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

    changePassword = e => {
        e.preventDefault();
        let token = "JWT " + JSON.parse(localStorage.getItem("token"))
        fetch('http://127.0.0.1:8000/user/changepassword/', {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: token
            },
            body: JSON.stringify({
                password1: this.password1,
                password2: this.password2,
                password3: this.password3
            })
        })
            .then(response => {
                return response.json();
            })
            .then(data=>{
                console.log(data)
                alert(data.statusMsg);
            })
    }

    changeUser = e => {
        e.preventDefault();
        let token = "JWT " + JSON.parse(localStorage.getItem("token"))
        fetch('http://127.0.0.1:8000/user/userUpdate/', {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: token
            },
            body: JSON.stringify({
                newFirstName: this.first_name,
                newSecondName: this.last_name,
                newEmail: this.email,
                newUsername: this.username
            })
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                alert(data.statusMsg);
            })
        }



        render() {

        const {error, isLoaded, items} = this.state;
        if (error) {
            return <p> Error {error.message} </p>
        } else if (!isLoaded) {
            return <p> Loading ...</p>
        } else {
            return(
                <div class="contact">
                    <label>
                        <img src={user} width="30" height="30" class="d-inline-block align-top" alt="" />
                        Contacts
                    </label>
                    <form onSubmit={this.changeUser}>
                        <div class="input-form" >
                            <input name="form-control" class="form-control" placeholder= {'First name: '+ items.first_name} type="name"
                                   onChange={e => this.first_name = e.target.value}/>
                            <input name="form-control" class="form-control" placeholder={'Last name: '+ items.last_name} type="lastName"
                                   onChange={e => this.last_name = e.target.value}/>
                            <input name="form-control" className="form-control" placeholder={'Username: '+ items.username} type="username"
                                   onChange={e => this.username = e.target.value}/>
                            <input name="form-control" class="form-control" placeholder={'Email: '+ items.email} type="email"
                                   onChange={e => this.email = e.target.value}/>
                        </div>
                        <div class="form-group">
                            <button type="submit"  class="btn btn-primary btn-block"> Save </button>
                        </div>
                    </form>
                    <div class="change-password">
                        <label>
                            <img src={lock} width="30" height="30" class="d-inline-block align-top" alt="" />
                            Change password
                        </label>
                        <form onSubmit={this.changePassword}>
                            <div class="input-form">
                                <input name="form-control" class="form-control" placeholder="Password" type="password"
                                       onChange={e => this.password3 = e.target.value}/>
                                <input name="form-control" class="form-control" placeholder="New password" type="password"
                                       onChange={e => this.password2 = e.target.value}/>
                                <input name="form-control" class="form-control" placeholder="Confirm password" type="password"
                                       onChange={e => this.password1 = e.target.value}/>
                            </div>
                            <div class="form-group">
                                <button type="submit" class="btn btn-primary btn-block"> Save </button>
                            </div>
                        </form>
                    </div>
                    <div class="Card">
                        <label>
                            <img src={credirCard} width="30" height="30" class="d-inline-block align-top" alt="" />
                            Add payment
                        </label>
                        <div class="form-group">
                            <button type="submit" class="btn btn-primary btn-block"> Add  </button>
                        </div>
                    </div>
                </div>
            )
        }
    }
}
