import React, {useEffect, useState} from "react";
import axios from "axios"
import { API_URL } from "../../constants"

class PaymentMethod extends React.Component {
  
    constructor(props) {
        super(props);
    
        this.state = {
            name: "",
            cvv: "",
            card_number: "",
            expire_date:"",
        };
    }
    
    componentDidMount() {
      // fetch card data from database
  
      const PROFILE_URL = `${API_URL}card/get/`;
      const token = localStorage.getItem('token');
  
      axios.get(PROFILE_URL, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
  
      .then((res) => {
        this.setState({
          name: res.data.name,
          cvv: res.data.cvv,
          card_number: res.data.card_number,
          expire_date:res.data.expire_date
        })
      })}

    handleSave = () =>{
      const formData = new FormData();
      formData.append('name', this.state.name);
      formData.append('cvv', this.state.cvv);
      formData.append('card_number', this.state.card_number);
      formData.append('expire_date', this.state.expire_date);
      
    
      const token = localStorage.getItem('token');
    
        const Method_URL = `${API_URL}card/update/`;
    
        axios({
          baseURL: Method_URL,
          method: "POST",
          data: formData,
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
      }

      render(){ return (
        <section>
        <div className="container">
          <div className="row">
          <form onSubmit={this.handleSave} enctype="multipart/form-data" style={{width: "600%"}}>
            <div className="col-lg-80">
              <div className="card mb-10" style={{ border: "none" }}>
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Card Holder Name</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">
                        <input
                          className="form-control"
                          type="text"
                          name=""
                          id=""
                          style={{ border: "none" }}
                          placeholder="Enter your Card Holder Name"
                          value={this.state.name}
                          onChange={(e) => this.setState({
                            name: e.target.value
                          })}
                        />
                      </p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">CVV</p>
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
                          placeholder="Enter your Card CVV"
                          value={this.state.cvv}
                          onChange={(e) => this.setState({
                            cvv: e.target.value
                          })}
                        />
                      </p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Card Number</p>
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
                          placeholder="Enter your Card Number"
                          value={this.state.card_number}
                          onChange={(e) => this.setState({
                            card_number: e.target.value
                          })}
                        />
                      </p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Expiring Date</p>
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
                          placeholder="Enter your Card Expiring Date "
                          value={this.state.expire_date}
                          onChange={(e) => this.setState({
                            expire_date: e.target.value
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
                <a href="/home" target="_parent">
                    <button type="button" className="btn btn-primary">
                      Back to Profile Page
                    </button>
                  </a>
              </div>
            </div>
            </form>
          </div>
        </div>
        </section>
  );
};
};

export default PaymentMethod;