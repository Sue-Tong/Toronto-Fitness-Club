
import React, { useState } from "react";
import { API_URL } from "../../constants"
import {useNavigate} from "react-router-dom";
import axios from "axios";
import '../../App.css'

export default function Register() {
    const [username, setUsername] = useState("");
    const [password1, setPassword] = useState("");
    const [password2, setCPassword] = useState("");
    const [email, setEmail] = useState("");
    const [first_name, setFirst] = useState("");
    const [last_name, setLast] = useState("");

    const [usernameError, setUsernameError] = useState("");
    const [emailError, setemailError] = useState("");
    const [passwordError, setpasswordError] = useState("");
    const [password2Error, setpassword2Error] = useState("");
    const [firstnameError, setfirstnameError] = useState("");
    const [lastnameError, setlastnameError] = useState("");

    const navigate = useNavigate();

    function handleRegister(e) {
        e.preventDefault();

        const data = {
        username,
        password1,
        password2,
        email,
        first_name,
        last_name
        };

        let USER_URL = `${API_URL}accounts/register/`;

    axios({
      baseURL: USER_URL,
      method: "POST",
      data: data,
    })
    .then((res) => {
        navigate('/login');
    })

    .catch((error) => {
      // Handle error
        const errors = error.response.data;
        setUsernameError(errors.username);
        setemailError(errors.email);
        setpasswordError(errors.password1);
        setpassword2Error(errors.password2);
        setfirstnameError(errors.first_name);  
        setlastnameError(errors.last_name);
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
                      <h3 >Register</h3>
                      <form onSubmit={handleRegister}>
                      <p>
                        <label>Username</label><br/>
                        <input value={username} name="username" onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username" type="username"  />
                        <p style={{color:'red'}}>{usernameError}</p>
                    </p>
                    <p>
                        <label>Email address</label><br/>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" type="email"/>
                        <p style={{color:'red'}}>{emailError}</p>
                    </p>
                    <p>
                        <label>Password</label><br/>
                        <input value={password1} onChange={(e) => setPassword(e.target.value)} placeholder="Password"type="password"/>
                        <p style={{color:'red'}}>{passwordError}</p>
                    </p>
                    <p>
                        <label>Confirm Password</label><br/>
                        <input value={password2} onChange={(e) => setCPassword(e.target.value)} placeholder="Confirmed Passowrd"type="password"/>
                        <p style={{color:'red'}}>{password2Error}</p>
                    </p>
                    <p>
                        <label>First Name</label><br/>
                        <input value={first_name} onChange={(e) => setFirst(e.target.value)} placeholder="First Name" type="text" id="fname" name="fname"/>
                        <p style={{color:'red'}}>{firstnameError}</p>
                    </p>
                    <p>
                        <label>Last Name</label><br/>
                        <input value={last_name} onChange={(e) => setLast(e.target.value)} placeholder="Last Name" type="text" id="lname" name="lname"/>
                        <p style={{color:'red'}}>{lastnameError}</p>
                    </p>
                        <div className="text-center text-lg-start mt-4 pt-2">
                            <button
                              type="submit"
                              className="btn btn-primary btn-lg">
                              Register
                            </button>
                          <p className="small fw-bold mt-2 pt-1 mb-0">
                            Already have an account?{" "}
                            <a href="/login" className="link-danger">
                              Login
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
