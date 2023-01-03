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


export default function PaymentFuture() {
  const PAYMENT_URL = `${API_URL}payment/future/`;
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
    var d = new Date(past_payment.end_date);
    return (
      <TableRow>
        <TableCell>{d.toString()}</TableCell>
        <TableCell>{past_payment.plan}</TableCell>
        <TableCell align="right">{past_payment.amount}</TableCell>
      </TableRow>
    )
      
  })
}

return (
  <React.Fragment>
    <Title>Future Payment</Title>
    <Table size="large">
      <TableHead>
        {/* table row */}
        <TableRow>
          <TableCell>Date</TableCell>
          <TableCell>Plan</TableCell>
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

