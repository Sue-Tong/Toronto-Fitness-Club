// import React, {useState} from "react";
import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import axios from "axios"
import { API_URL } from "../../constants"

// TODO: how to get the patment history for the specific user?
export default function StudioSubscribe() {
    const PAYMENT_URL = `${API_URL}subscription/`;
    const token = localStorage.getItem('token');
    const [paymentHistory,setPaymentHistory] = useState([]);//list of past payments
    const [message,setmessage] = useState("");
    
      axios.get(PAYMENT_URL, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then((res) => {
          setPaymentHistory(res.data);
        })
        .catch((error) => {
        })
    

    
    function handleSubmit(attribute, event){
      event.preventDefault();
      const SUBSCRIBE_URL = `${API_URL}subscription/add/`;

      axios({
        baseURL: SUBSCRIBE_URL,
        method: "POST",
        data: {
          id: attribute
          },
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then((res) => {
          setmessage(res.data.msg);
        })
        .catch((error) => {
          const errors = error.response.data;
          console.log(errors);
        });

    };

    function handleUpdate(attribute, event){
      event.preventDefault();
      const SUBSCRIBE_URL = `${API_URL}subscription/update/`;

      axios({
        baseURL: SUBSCRIBE_URL,
        method: "PUT",
        data: {
          id: attribute
          },
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then((res) => {
          setmessage(res.data.msg);
        })
        .catch((error) => {
          const errors = error.response.data;
          console.log(errors);
        });

    };

    function handleCancel(event){
      event.preventDefault();
      const SUBSCRIBE_URL = `${API_URL}subscription/cancel/`;
      axios({
        baseURL: SUBSCRIBE_URL,
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then((res) => {
          setmessage(res.data.msg);
        })
        .catch((error) => {
          const errors = error.response.data;
        });

    };
    

  const get_history_payment_details = () => {
    return paymentHistory.map(past_payment => {
      return (
        <TableRow>
          <TableCell>{past_payment.money}</TableCell>
          <TableCell>{past_payment.duration}</TableCell>
          <TableCell>
                    <form onSubmit={handleSubmit.bind(this, past_payment.id)}>
                    <button type="submit" className="btn btn-outline-primary ms-1">
                      Subscribe
                    </button>
                    </form>
        </TableCell>
        <TableCell>
                    <form onSubmit={handleUpdate.bind(this, past_payment.id)}>
                    <button type="submit" className="btn btn-outline-primary ms-1">
                      Change to this Subscription
                    </button>
                    </form>
        </TableCell>
        </TableRow>
      )
        
    })
  }

  return (
    <React.Fragment>
      <Title>Subscription Plans</Title>
      <Table size="large">
        <TableHead>
          {/* table row */}
          <TableRow>
            <TableCell>Money</TableCell>
            <TableCell>Duration</TableCell>
          </TableRow>
        </TableHead>
        {/* table body */}
        <TableBody>
            {get_history_payment_details()}
        </TableBody>
        <TableRow>
            <TableCell>
                    <form onSubmit={handleCancel}>
                    <button type="submit" className="btn btn-outline-primary ms-1">
                      Cancel Subscription
                    </button>
                    </form>
        </TableCell>
        </TableRow>
      </Table>
    <p style={{color:'red'}}>{message}</p>
  </React.Fragment>
  );
}