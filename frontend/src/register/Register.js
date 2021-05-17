import React, {Component} from 'react'
import axios from "axios";

import './register.css'

export default class Register extends Component {

    handleSubmit = e => {
        e.preventDefault();

        const data = {
            username: this.username,
            password: this.password,
            email: this.email
        }
        if (this.password1 != this.password2) {
            alert("Passwords do not match");
            window.location.reload();
        }else{
            axios.post('http://127.0.0.1:8000/user/register/', data).
            then(res => {
                alert(res.status);
                window.location.href = '/login';
            })
                .catch(err => {
                    console.log(err)
                })
        }
    };


    render() {
        return (
            <div className="login">
             <span>
                 Register
             </span>
                <form onSubmit={this.handleSubmit}>
                    <div className="login-form">
                        <div className="email-form">
                            <label>Email</label>
                            <input name="form-control" className="form-control" placeholder="Email" type="email"
                                   onChange={e => this.username = e.target.value}/>
                        </div>
                        <label>Username</label>
                        <div className="username-form">
                            <input name="form-control" className="form-control" placeholder="Username" type="username"
                                   onChange={e => this.email = e.target.value}/>
                        </div>
                        <div className="password-form">
                            <label>Password</label>
                            <input className="form-control" placeholder="******" type="password"
                                   onChange={e => this.password1 = e.target.value}/>
                            <label>Confirm password</label>
                            <input className="form-control" placeholder="******" type="password"
                                   onChange={e => this.password2 = e.target.value}/>
                        </div>
                    </div>
                <br/>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary btn-block"> Register</button>
                </div>
                </form>
                <a href="/login">
                    Already have an account?</a>
            </div>
        )
    }
}
