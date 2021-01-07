import React, { useState } from 'react'
import facebookSvg from '../../assets/images/facebook.svg'
import googleSvg from '../../assets/images/google-icon.svg'
import signupJpg from '../../assets/images/signup.jpg'
import '../../assets/css/style.css'
import axios from 'axios'
import {API_BASE_URL} from '../Constants/constants'

export default (props) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [mobile, setMobile] = useState('')

 const handleRegistration = () => {
  axios({
    method: 'POST',
    url: API_BASE_URL + 'register/',
    headers: { 'Content-Type': 'application/json' },
    data: {username: username, password: password, mobileNumber: mobile}
  })
  .then((response) => {
    if(response.data == 'registered') {
      alert("Registration Successful") 
      props.setIsRegister(false)
    }
    else alert("login failed")
  })
  .catch((reason)=> alert("login failed"+reason))
     
 }
  return (
    <div>
      <header>
        <div className="head-container">
          <h1 className="title-container">Food Delight</h1>
        </div>
      </header>

      <main>
        <div className="main-container">
          <div className="social-btn">
            <form action="/auth/google" method="GET">
              <button type="submit" className="google-btn">
                <div className="btn-container">
                  <img
                    src={googleSvg}
                    alt="google icon"
                    width="30"
                    height="30"
                  />
                </div>
                <span className="google-btn-text">Sign up via Google</span>
              </button>
            </form>
            <form action="/auth/facebook" method="GET">
              <button type="submit" className="facebook-btn">
                <div className="btn-container">
                  <img
                    src={facebookSvg}
                    alt="facebookicon"
                    width="30"
                    height="30"
                  />
                </div>
                <span className="facebook-btn-text">Sign up via Facebook</span>
              </button>
            </form>
          </div>
          <div className="form-container">
            <h2 className="form-title">Sign up via Email</h2>

            <input
              type="text"
              className="form-input user-input"
              name="username"
              placeholder="Username"
              onChange={(evt)=>setUsername(evt.target.value)}
              required
            />

            <input
              type="password"
              className="form-input pass-input"
              id="password"
              name="password"
              placeholder="Password"
              onChange={(evt)=>setPassword(evt.target.value)}
              required
            />

            <input
              type="password"
              className="form-input conf-input"
              id="confirm_password"
              placeholder="Confirm Password"
              required
            />

            <input
              type="text"
              className="form-input mob-input"
              placeholder="Mobile Number"
              onChange={(evt)=>setMobile(evt.target.value)}
              required
            />
            <button className="signup-btn" 
              onClick={handleRegistration} >
              Register
            </button>

            <button 
              className="signin-btn"
              onClick={() => props.setIsRegister(false)}>
              Sign in
            </button>
          </div>
        </div>
      </main>
      <img className="food-image" src={signupJpg} alt="signup-image" />
    </div>
  )
}


