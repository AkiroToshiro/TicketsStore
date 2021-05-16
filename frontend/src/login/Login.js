import React, {Component} from 'react'
import './login.css'
import axios from "axios";


export default class Login extends Component{

    handleSubmit = e => {
        e.preventDefault();

        const data = {
            username: this.username,
            password: this.password
        }

        axios.post('http://127.0.0.1:8000/user/login/', data).
            then(res => {
            let token = localStorage.setItem("token", JSON.stringify(res.data.access));
            window.location.href = '/main';
        })
            .catch(err => {
                console.log(err)
            })
    };

    render() {
        return (
            <div className="login">
        <span>
            Login
        </span>
                <form onSubmit={this.handleSubmit}>
                    <div className="login-form">
                        <div className="email-form">
                            <label>Username</label>
                            <input name="form-control" className="form-control" placeholder="Username" type="username"
                            onChange={e => this.username = e.target.value}/>
                        </div>
                        <div className="password-form">
                            <label>Password</label>
                            <input className="form-control" placeholder="******" type="password"
                            onChange={e => this.password = e.target.value}/>
                        </div>
                    </div>
                    <div className="checkbox">
                        <label> <input type="checkbox"/> Save password </label>
                    </div>
                    <br/>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary btn-block"> Login</button>
                    </div>
                </form>
                <a href="/register">
                        Sign up now
                    </a>
                    <br/>
                    <a href="/forgot" className="txt1">
                        Forgot?
                    </a>
            </div>
        )
    }
}
