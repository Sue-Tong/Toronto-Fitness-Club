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

export default function ListClassSchedule() {
  const CLASS_URL = `${API_URL}accounts/class_schedule/`;
  const token = localStorage.getItem('token');
  const [paymentHistory,setPaymentHistory] = useState([]);//list of past payments
  const [message,setmessage] = useState("");


    axios.get(CLASS_URL, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => {
        setPaymentHistory(res.data);

      })
      .catch((error) => {
      })

      function handleCancel(attribute,event){
        event.preventDefault();
        const SUBSCRIBE_URL = `${API_URL}accounts/class_drop/`;

        axios({
          baseURL: SUBSCRIBE_URL,
          method: "POST",
          data: {
            id: attribute,
            cancel: "all"
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
          });
  
      }

      const get_history_payment_details = () => {
        return paymentHistory.map(past_payment => {
          return (
            <TableRow>
              <TableCell>{past_payment["name"]}</TableCell>
              <TableCell align="right">{past_payment["schedule"]}</TableCell>
              <TableCell>
                    <form onSubmit={handleCancel.bind(this, past_payment['id'])}>
                    <button type="submit" className="btn btn-outline-primary ms-1">
                      Drop Class
                    </button>
                    </form>
        </TableCell>
            </TableRow>
          )
            
        })
      }
      

      return (
        <React.Fragment>
        <Title>Class Schedule</Title>
        <Table size="large">
          <TableHead>
            <TableRow>
              <TableCell>Class Name</TableCell>
              <TableCell>Class Schedule</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {get_history_payment_details()}
          </TableBody>
        </Table>
        <p style={{color:'red'}}>{message}</p>
      </React.Fragment>
    );
  };
