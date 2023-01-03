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
export default function CurrentSubscription() {
    const token = localStorage.getItem('token');
    const [message,setmessage] = useState("");
    const [current,setCurrent] = useState([]);//list of past payments
    
    
    const SUBSCRIPTION_URL = `${API_URL}payment/future/`;

    axios.get(SUBSCRIPTION_URL, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => {
        setCurrent(res.data);
      })
      .catch((error) => {
      })

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

    }

    const get_history_payment_details = () => {
      return current.map(past_payment => {
        var d = new Date(past_payment.end_date);
        return (
          <TableRow>
            <TableCell>{d.toString()}</TableCell>
            <TableCell>{past_payment.plan}</TableCell>
            <TableCell>
                    <form onSubmit={handleCancel}>
                    <button type="submit" className="btn btn-outline-primary ms-1">
                      Cancel Subscription
                    </button>
                    </form>
        </TableCell>
          </TableRow>
        )
          
      })
    }


  return (
    <React.Fragment>
      <Title>Current Subscription</Title>
      <Table size="large">
        <TableHead>
          {/* table row */}
          <TableRow>
            <TableCell>End Date</TableCell>
            <TableCell>Current Plan</TableCell>
          </TableRow>
        </TableHead>
        {/* table body */}
        <TableBody>
          {get_history_payment_details()}
      </TableBody>
      </Table>
    <p style={{color:'red'}}>{message}</p>
  </React.Fragment>
  );
}
