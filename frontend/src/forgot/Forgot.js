import React from 'react'
import './forgot.css'

export default function Forgot() {
    return (
        <div className="input">
            <span>
              Request password reset
            </span>
            <form>
                <div className="email-form">
                    <input name="form-control" className="form-control" placeholder="Enter your email" type="email" />
                </div>
            </form>
            <br/>
                <div className="form-group" >
                    <button type="submit" className="btn btn-primary btn-block"> Request password reset</button>
                </div>
                <a href="/login">
                    Remembered your password? Login here
                </a>
        </div>
    )
}