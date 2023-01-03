import React, { useState } from 'react'
import axios from "axios"
import { API_URL } from "../../constants"
import '../../App.css'
import {useNavigate} from "react-router-dom";


// from https://github.com/koolKai/react_login_profile

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [matchError, setMatchError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setpasswordError] = useState("");

  const navigate = useNavigate();

  function handleSave(e) {
    e.preventDefault();

    const data = {
      username,
      password
      };

    const LOGIN_URL = `${API_URL}accounts/login/`;

    axios({
      baseURL: LOGIN_URL,
      method: "POST",
      data: data,
    })
      .then((res) => {
        localStorage.setItem('token', res.data.token);
        navigate('/home');
      })
      .catch((error) => {
        const errors = error.response.data;
        console.log(errors);
        setUsernameError(errors.username);
        setpasswordError(errors.password);
        setMatchError(errors.all);
      });
  }
    return (
      <div className="container ">
      <section className="login">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-10">
            <div className="card">
              <div className="row g-0">
                <div className="col-md-5 col-lg-4 d-none d-md-block">
                  <img
                    src="https://media.sciencephoto.com/image/f0248317/800wm/F0248317-Woman_jogging_in_city_at_night.jpg"
                    alt="login form"
                    className="img-fluid"
                  />
                </div>
                <div className="col-md-7 col-lg-7 d-flex align-items-center mx-3">
                  <div className="card-body p-4 p-lg-5 text-black">
                    <h3 className="my-3">Login to your account</h3>
                    <form onSubmit={handleSave}>
                    <p>
                    <label>Username</label><br/>
                    <input value={username} name="username" onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username" type="username"  />
                    <p style={{color:'red'}}>{usernameError}</p>
                  </p>
                  <p>
                    <label>Password</label><br/>
                    <input value={password} name="password" type="password" onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"/>
                    <p style={{color:'red'}}>{passwordError}</p>
                    <p style={{color:'red'}}>{matchError}</p>
                  </p>
                      <div className="text-center text-lg-start mt-4 pt-2">
                          <button
                            type="submit"
                            className="btn btn-primary btn-lg">
                            Login
                          </button>
                        <p className="small fw-bold mt-2 pt-1 mb-0">
                          Don't have an account?{" "}
                          <a href="/register" className="link-danger">
                            Register
                          </a>
                        </p>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    )
}
