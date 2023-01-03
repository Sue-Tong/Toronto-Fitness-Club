// import React, {useState} from "react";
import React, { useState } from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import axios from "axios"
import { API_URL } from "../../constants"
import ListStudioPage from './ListStudioPage';

// TODO: how to get the patment history for the specific user?
export default function Payment() {
    const PAYMENT_URL = `${API_URL}payment/history/`;
    const token = localStorage.getItem('token');
    const [paymentHistory,setPaymentHistory] = useState([]);//list of past payments

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

  const get_history_payment_details = () => {
    return paymentHistory.map(past_payment => {
      var d = new Date(past_payment.date);
      return (
        <TableRow>
          <TableCell>{d.toString()}</TableCell>
          <TableCell>{past_payment.number}</TableCell>
          <TableCell align="right">{past_payment.amount}</TableCell>
        </TableRow>
      )
        
    })
  }

  return (
    <React.Fragment>
      <Title>Payment History</Title>
      <Table size="large">
        <TableHead>
          {/* table row */}
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Payment Method</TableCell>
            <TableCell align="right">Amount</TableCell>
          </TableRow>
        </TableHead>

        {/* table body */}
        <TableBody>
            {get_history_payment_details()}
        </TableBody>
      </Table>
    {/* <Link color="primary" href="#" onClick={this.preventDefault} sx={{ mt: 3 }}>
      See future payments
    </Link> */}
    
  </React.Fragment>
  );
}

