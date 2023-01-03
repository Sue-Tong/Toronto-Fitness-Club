import React, { useState } from 'react'
import axios from "axios"
import { API_URL } from "../../constants"
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { ListItemAvatar, ListItemText } from "@mui/material";
import ListItemButton from '@mui/material/ListItemButton';
import { ListItem } from '@material-ui/core';
import './ListStudioPage.css'

import { getStaticContextFromError } from '@remix-run/router';
import { height } from '@mui/system';
// import '../../App.css'
import {useNavigate} from "react-router-dom";
import {
    FormControl,
    FormHelperText,
    Input,
  } from '@material-ui/core';


const useStyles = makeStyles({
  });

export default function ListStudioPage() {
    const classes = useStyles();
    const [studios,setStudios] = useState([]);
    const [paginNum,setPaginNum] = useState(3);
    const [curPagin,setCurPagin] = useState(0);
    const [studioInfo,setStudioInfo] = useState(false);
    const [studio,setStudio] = useState({});
    const [word,setWord] = useState("");
    const [searchInput, setSearchInput] = useState("");
    const [message,setmessage] = useState("");
    const token = localStorage.getItem('token');
    const STUDIOS_URL = `${API_URL}studio/`;
    const CLASS_URL = `${API_URL}studio/<int:id>/class/`;

    const navigate = useNavigate();

    axios.get(STUDIOS_URL)
  
      .then((res) => {
        setStudios(res.data);
        
      })
      .catch((error) => {
        
    });

    // Enroll and Drop Class
    const ENROLL_URL = `${API_URL}class/enrol/`;


    function handleEnrol(attribute, event){
        event.preventDefault();
        axios({
            baseURL: ENROLL_URL,
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
            });  
       
      };

      const user = (id) =>{
        if (token != null){
            return(
                    <form onSubmit={handleEnrol.bind(this, id)}>
                    <Button size="large" type="submit">
                            Enroll Class
                    </Button>
                    </form>
            )
        } else{
            return null;
        }
    }
 
    const getStudios = () => {

        return studios.slice(curPagin, curPagin+paginNum).map(studio => {
            return(

                <ListItem id='studios'>
                
                    <ListItemText  
                        primary={studio.name}
                        secondary={
                            <Typography>
                                Studio Name: {studio.name}
                                <br></br>
                                Studio Address: {studio.address}
                                <br></br>
                                Studio Phone Number: {studio.phone_number}
                                <br></br>
                                Studio Postal Code: {studio.postal_code}
                                <CardActions>
                                <Button size="small" onClick={()=>showStudioInfo(studio.id)}>Learn More</Button>
                                
                                </CardActions>
                                
                            </Typography>
                        }
                    />
               
            </ListItem>

              
            )
        })
    }
    const goBack = () => {
        if (curPagin > 0) {
            setCurPagin(curPagin-1);
        }
        
    }

    const goNext = () => {
        console.log(curPagin)
        if (curPagin < Math.ceil(studios.length/paginNum)-1) {
            setCurPagin(curPagin+1);
        }
        console.log(curPagin);
    }

    const showStudioInfo = (studioId) => {
        axios.get(STUDIOS_URL+`${studioId}/`)
          .then((res) => {
            setStudio(res.data);
          })
          .catch((error) => {

        });

        setStudioInfo(true);
    }

    const studioDetail = () => {
        const getStudioSubscriptions = () => {
            return studio?.amenity?.map(studio_subscription => {
                return (
                    <>
                        <Card>
                        <CardContent>
                            <Typography variant="body2"  color="textSecondary">
                                Amenity Type: {studio_subscription.type}
                            </Typography>
                            <Typography variant="body2"  color="textSecondary">
                                Amenity Quantity: {studio_subscription.quantity}
                            </Typography>                    
                        </CardContent>
                        </Card>
                    </>
                )
            })
        }

        const styles = {
            media: {
              height: 0,
              paddingTop: '56.25%', // 16:9,
              marginTop:'30'
            }
        };
        

        const getStudioImage = () => {
            return studio?.images?.map(studio_subscription => {
                return (
                    <>
                        <Card>
                        <CardMedia>
                        <img src={`http://localhost:8000${studio_subscription.image}`}/>
                        </CardMedia>
                        <CardContent>
                            <Typography variant="body2"  color="textSecondary">
                                Description: {studio_subscription.name}
                            </Typography>                   
                        </CardContent>
                        </Card>
                    </>
                )
            })
        }
        
        const getStudioClasses = () => {
            return studio?.classes?.map(studio_class => {

                return (
                    <>
                        <Card>
                        <CardContent>
                            <Typography variant="body2"  color="textSecondary">
                                Class status: {studio_class.status}
                            </Typography>
                            <Typography variant="body2"  color="textSecondary">
                                Class Name: {studio_class.name}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Class Coach: {studio_class.coach}
                            </Typography>
                            <Typography variant="body2"  color="textSecondary">
                                Class Capacity: {studio_class.capacity}
                            </Typography>
                            <Typography variant="body2"  color="textSecondary">
                                Class Current Student Number: {studio_class.current_student}
                            </Typography>
                            <Typography variant="body2"  color="textSecondary">
                                Class description: {studio_class.description}
                            </Typography>
                            <Typography variant="body2"  color="textSecondary">
                                Class Starts At: {studio_class.lessonStartTime}
                            </Typography>
                            <Typography variant="body2"  color="textSecondary">
                                Class Ends At: {studio_class.lessonEndTime}
                            </Typography>
                        </CardContent>
                        </Card>
                        <Card>
                    <CardContent>
                    {user(studio_class.id)}
                    </CardContent>
                </Card>
                    </>
                )
            })
        }

        return (
            <>
                <Button size="small" onClick={()=>setStudioInfo(false)}>{'Back'}</Button> 
                <Card>
                    <CardContent>
                        <Typography variant="h4"  color="textSecondary">
                            Studio Name: {studio.name}
                        </Typography>
                        <Typography  color="textSecondary">
                            Studio Address: {studio.address}
                        </Typography>
                        <Typography color="textSecondary">
                            Studio Phone Number: {studio.phone_number}
                        </Typography>
                        <Typography color="textSecondary">
                            Studio Postal Code: {studio.postal_code}
                        </Typography>
                    </CardContent>
                </Card>
                {getStudioImage()}
                <Card>
                    <CardContent>
                        <Typography variant="h4"  color="textSecondary">
                            Studio Classes:
                        </Typography>
                    </CardContent>
                </Card>
                {getStudioClasses()}
                <p style={{color:'red'}}>{message}</p>
                {getStudioSubscriptions()}


            </>
        )
    }


    return (
        <>
            {/* <div h2>Here To See All the studios</div> */}
            <>
                {studioInfo?
                <>
                    <div>
                        {studioDetail()}
                    </div>
                </>
                :
                <>
                
                    
                    <div id='studios'>
                    <Button size="large" className='left_button' variant='contained' onClick={()=>goBack()}>{'< Previous'}</Button>
                    <Button size="large" className='right_button' variant='contained' onClick={()=>goNext()}>{'Next >'}</Button>
                        {getStudios()}
                    </div>
                </>
                }
            </>
        </>
        
    )
}