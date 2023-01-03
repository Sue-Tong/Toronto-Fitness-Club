import React, { useState } from "react";
import axios from "axios"
import { API_URL } from "../../constants"

// from https://github.com/koolKai/react_login_profile
class Profile extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
        image: "",
        firstname: "",
        lastname: "",
        phone: "",
        email:"",
        save:"",
        phoneError:"",
        imageurl:"",
    };
}

    componentDidMount() {
    // fetch user data from database

    const PROFILE_URL = `${API_URL}accounts/profile/`;
    const token = localStorage.getItem('token');

    axios.get(PROFILE_URL, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    .then((res) => {
      this.setState({
        imageurl: `http://localhost:8000${res.data.avatar}`,
        firstname: res.data.first_name,
        lastname: res.data.last_name,
        phone: res.data.phone,
        email: res.data.email,
        phoneError: localStorage.getItem('error')
      })
      fetch(`http://localhost:8000${res.data.avatar}`)
          .then(response => response.blob()) // Get the image file as a Blob
          .then(blob => {
          // Use the Blob as a file object
          const file = new File([blob], 'image.png', { type: 'image/png' });
          this.setState({
            image: file,
          })
      });
    })
    .catch((error) => {
      const errors = error.response.data;
      this.setState({
        phoneError: errors.phone
      })
    });

   };

    imageHandler = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        this.setState({
          imageurl: reader.result
        })
      }
    };
    this.setState({image: e.target.files[0]});
    reader.readAsDataURL(e.target.files[0]);
  };


   handleSave = () =>{

  const formData = new FormData();
  formData.append('avatar', this.state.image);
  formData.append('phone', this.state.phone);
  formData.append('email', this.state.email);
  formData.append('first_name', this.state.firstname);
  formData.append('last_name', this.state.lastname);

  const token = localStorage.getItem('token');

    const PROFILE_URL = `${API_URL}accounts/profile/`;

    axios({
      baseURL: PROFILE_URL,
      method: "POST",
      data: formData,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) =>{
        this.setState({
          save: "Saved Successfully"
        })
        localStorage.removeItem('error');
      })

      .catch((error) => {
        const errors = error.response.data;
        this.setState({
          phoneError: errors.phone
        })
        localStorage.setItem('error', errors.phone);
      });
  }

  render(){ return (
      <section>
        <div className="container">
          <div className="row">
          <form onSubmit={this.handleSave} enctype="multipart/form-data" style={{width: "600%"}}>
            <div className="col-lg-40 profile-image">
              <div className="card mb-5" style={{ border: "none" }}>
                <div className="card-body text-center">
                <img
                      src={this.state.imageurl}
                      alt="avatar"
                      id="img"
                      class="rounded-circle account-img"
                      style={{
                        margin: "auto",
                        width: "153px",
                        height: "153px",
                        border: "2px solid gray",
                        borderRadius: "50%"
                      }}
                    />
                  <input
                    type="file"
                    name="image-upload"
                    id="input"
                    accept="image/*"
                    onChange={this.imageHandler}
                    style={{ display: "none" }}
                  />
                  <div className="label">
                    <label htmlFor="input" className="image-upload">
                      Edit your photo
                    </label>
                  </div>
                  <br/>
                  <h5 className="my-3">{this.state.firstname + " " + this.state.lastname}</h5>
                  <p className="text-muted mb-1">{this.state.phone ? this.state.phone : "Phone Number"}</p>
                  <p className="text-muted mb-4">{this.state.email ? this.state.email : "Email Address"}</p>
                  <div className="d-flex justify-content-center mb-2">
                  <a href="/card/update" target="_parent">
                    <button type="button" className="btn btn-primary">
                      Modify Payment Method
                    </button>
                  </a>
                  </div>
                  <div className="d-flex justify-content-center mb-2">
                  <a href="/payment/history" target="_parent">
                    <button type="button" className="btn btn-outline-primary ms-1">
                      Payment History
                    </button>
                  </a>
                  </div>
                  <div className="d-flex justify-content-center mb-2">
                  <a href="/payment/future" target="_parent">
                    <button type="button" className="btn btn-outline-primary ms-1">
                      Future Payment
                    </button>
                  </a>
                  </div>
                  <div className="d-flex justify-content-center mb-2">
                  <a href="/class/history" target="_parent">
                    <button type="button" className="btn btn-outline-primary ms-1">
                      Class History
                    </button>
                  </a>
                  </div>
                  <div className="d-flex justify-content-center mb-2">
                  <a href="/class/schdeule" target="_parent">
                    <button type="button" className="btn btn-outline-primary ms-1">
                      Class Schedule
                    </button>
                  </a>
                  </div>
                  <div className="d-flex justify-content-center mb-2">
                    <a href="/currentsubscribe" target="_parent">
                    <button type="button" className="btn btn-outline-primary ms-1">
                      Current Subscription
                    </button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-80">
              <div className="card mb-10" style={{ border: "none" }}>
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">First Name</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">
                        <input
                          className="form-control"
                          type="text"
                          name=""
                          id=""
                          style={{ border: "none" }}
                          placeholder="Enter your First Name"
                          value={this.state.firstname}
                          onChange={(e) => this.setState({
                            firstname: e.target.value
                          })}
                        />
                      </p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Last Name</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">
                        {" "}
                        <input
                          className="form-control"
                          type="text"
                          name=""
                          id=""
                          style={{ border: "none" }}
                          placeholder="Enter your Last Name"
                          value={this.state.lastname}
                          onChange={(e) => this.setState({
                            lastname: e.target.value
                          })}
                        />
                      </p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Phone Number</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">
                        {" "}
                        <input
                          className="form-control"
                          type="text"
                          name=""
                          id=""
                          style={{ border: "none" }}
                          placeholder="Enter your phone number"
                          value={this.state.phone}
                          onChange={(e) => this.setState({
                            phone: e.target.value
                          })}
                        />
                      </p>
                      <p style={{color:'red'}}>{this.state.phoneError}</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Email</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">
                        {" "}
                        <input
                          className="form-control"
                          type="text"
                          name=""
                          id=""
                          style={{ border: "none" }}
                          placeholder="Enter your Email"
                          value={this.state.email}
                          onChange={(e) => this.setState({
                            email: e.target.value
                          })}
                        />
                      </p>
                    </div>
                  </div>
                  <hr />
                </div>
              </div>
              <div
                className="item d-flex justify-content-around align-items-center"
                style={{ border: "none" }}
              >
                <button type="submit" className="btn btn-success">
                  Save
                </button>
                <p style={{color:'red'}}>{this.state.save}</p>
              </div>
            </div>
            </form>
          </div>
        </div>
      </section>
  );
};
};

export default Profile;