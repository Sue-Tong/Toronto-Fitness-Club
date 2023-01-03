import { React, useState } from "react";
import TextField from "@mui/material/TextField";
import List from "./StudioList";
import "./StudioSearchingName.css";
import { makeStyles } from '@material-ui/core/styles';


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
  antiqueWhite: {
      color: "AntiqueWhite"
  },

  studio_button: {
    color: '#B3E5FC',
  }

});

function StudioSearchingName() {
  const classes = useStyles();
  const [inputText, setInputText] = useState("");
  let inputHandler = (e) => {
    // convert input text to lower case
    // var studio_name = e.target.value;
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  return (
    <div className="main">
      <h1>Search Studio</h1>
      <div className="search">
        <TextField
          id="outlined-basic"
          onChange={inputHandler}
          variant="outlined"
          fullWidth
          label="Enter studio name and search..."
        />
      </div>
      <List input={inputText} />
    </div>
  );
}

export default StudioSearchingName;