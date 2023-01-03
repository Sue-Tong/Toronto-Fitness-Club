import React, { useState } from 'react'
import axios from "axios"
import { API_URL } from "../../constants"
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { getStaticContextFromError } from '@remix-run/router';
// import '../../App.css'
// import {useNavigate} from "react-router-dom";

const useStyles = makeStyles({
    antiqueWhite: {
        color: "AntiqueWhite"
    },
  });

export default function ListClassPage() {
    useStyles();
    
    const STUDIO_URL = `${API_URL}studio/<int:id>/`; 
    const STUDIOS_URL = `${API_URL}studio/`;
    const CLASS_URL = `${API_URL}studio/<int:id>/class/`;

    const [studio,setStudio] = useState({});
    const [classes,setClasses] = useState({});
    
    
    axios.get(CLASS_URL)
  
      .then((res) => {
        setClasses(res.data);
        
      })
      .catch((error) => {
        
    });

    const getStudioClasses = () => {
        return classes.map(studio_class => {
            return (
                <ListItem>
                
                    <ListItemText 
                        primary={studio_class.studio}
                        secondary={
                            <Typography component={'span'}>
                                Class status: {studio_class.status}
                                <br></br>
                                Class Name: {studio_class.name}
                                <br></br>
                                Class Coach: {studio_class.coach}
                                <br></br>
                                Class Capacity: {studio_class.capacity}
                                <br></br>
                                Class Current Student Number: {studio_class.current_student}
                                <br></br>
                                Class description: {studio_class.description}
                                <br></br>
                                Class Starts At: {studio_class.lessonStartTime}
                                <br></br>
                                Class Ends At: {studio_class.lessonEndTime}
                            </Typography>
                        }
                    />
            
            </ListItem>
                    
            )
            })
    }

    return (
        <>
            <div>Here To See All the classes</div>
            <div>
                        {getStudioClasses()}
            </div>
            

        </>
        
    )

}