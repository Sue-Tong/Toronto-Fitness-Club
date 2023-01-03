import { React, useState } from 'react'
// import data from "./ListData.json"
import axios from "axios"
import { API_URL } from "../../../constants"
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
    root: {
      minWidth: 275,
    },
    
    title: {
      fontSize: 20,
    },
    pos: {
      marginBottom: 12,
    },
  
    studio_button: {
    }
  
  });

function List(props) {
    const classes = useStyles();
    const STUDIOS_URL = `${API_URL}studio/`;
    const [studios,setStudios] = useState([]);

    axios.get(STUDIOS_URL)
  
      .then((res) => {const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  
  title: {
    fontSize: 20,
  },
  pos: {
    marginBottom: 12,
  },


});
        setStudios(res.data);
        
      })
      .catch((error) => {
        
    });

    const filteredData = studios.filter((el) => {
        //if no input the return the original
        if (props.input === '') {
            return el;
        }
        //return the item which contains the user input
        else {
            return el.name.toLowerCase().includes(props.input)
        }
    } )

    //show studio details

    return (
        <ul>
            {filteredData.map((studio) => (
                <li>
                    <Button variant="outlined" color="secondary">{studio.name}</Button>
                    <br></br>
                </li>
            ))}
        </ul>
    )
}

export default List;
