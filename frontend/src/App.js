import "./App.css";
import * as React from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import "./LoadingAnimation.css";

const LoadingAnimation = () => {
  return (
    <div className="loading-animation-container">
      <div className="dot dot-1"></div>
      <div className="dot dot-2"></div>
      <div className="dot dot-3"></div>
    </div>
  );
};


function App() {
  const [major, setMajor] = React.useState("");
  const [units, setUnits] = React.useState(0);
  const [quarters, setQuarters] = React.useState(0);
  const [difficulty, setDifficulty] = React.useState("");
  const [displayResult, setDisplayResult] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const [text, setText] = React.useState(''); // Text to be displayed
  const [typedText, setTypedText] = React.useState(''); // Typed characters

  const handleMajorChange = (event) => {
    setMajor(event.target.value);
  };
  const handleDifficultyChange = (event) => {
    setDifficulty(event.target.value);
  };

  const info = {
    major,
    units,
    quarters,
    difficulty,
  };

  const onSubmit = () => {

    const url = '/generate'; // replace with your endpoint URL
    const data = info; // { username: 'foo', password: 'bar' }; // replace with your JSON data
    
    setIsLoading(true);
    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(data => {
        
        // data = JSON.stringify(data);
        console.log("got data:");
        console.log(typeof data);
        console.log(data);

        // console.log(json_str);
        const schedule = data['courses'];
        // console.log(schedule);
        const explanation =  data['explaination'];
        // console.dir(schedule);
        console.log(explanation);
        setDisplayResult(true);
        setText(explanation);
        setTypedText('');
    
      })
      .catch(error => console.error(error))
      .finally(()=>{
        setIsLoading(false);
      })
    
  };

  return (
    <div className="App">
      <Stack className="stack" direction="column" spacing={2}>
        <Typography variant="h2" marginTop={10}>
          Generate a 4-Year Plan
        </Typography>

        <Box marginTop={10}>
          <Typography variant="h4">What is your major?</Typography>
        </Box>
        <Box>
          <InputLabel>Major</InputLabel>
          <Select
            className="span"
            style={{ fontSize: "30px" }}
            value={major}
            label="Major"
            onChange={handleMajorChange}
          >
            <MenuItem value={"Computer Science"}>Computer Science</MenuItem>
            <MenuItem value={"Math"}>Math</MenuItem>
            <MenuItem value={"Psychology"}>Psychology</MenuItem>
          </Select>
        </Box>

        <Box marginTop={10}>
          <Typography variant="h4">
            How many units would you like to take per quarter?
          </Typography>
        </Box>
        <Box>
          <TextField
            className="span"
            inputProps={{ style: { fontSize: 30 } }}
            variant="outlined"
            value={units}
            onChange={(event) => {
              setUnits(event.target.value);
            }}
          ></TextField>
        </Box>

        <Box marginTop={10}>
          <Typography variant="h4">
            How many quarters do you have left before you graduate?
          </Typography>
        </Box>
        <Box>
          <TextField
            className="span"
            inputProps={{ style: { fontSize: 30 } }}
            variant="outlined"
            value={quarters}
            onChange={(event) => {
              setQuarters(event.target.value);
            }}
          ></TextField>
        </Box>

        <Box>
          <Typography variant="h4">
            How heavy do you want your courseload to be?
          </Typography>
        </Box>
        <Box>
          <InputLabel>Difficulty</InputLabel>
          <Select
            className="span"
            style={{ fontSize: "30px" }}
            value={difficulty}
            label="Difficulty"
            onChange={handleDifficultyChange}
          >
            <MenuItem value={"Easy"}>Easy</MenuItem>
            <MenuItem value={"Balanced"}>Balanced</MenuItem>
            <MenuItem value={"Heavy"}>Heavy</MenuItem>
          </Select>
        </Box>

        <Box>
          <Button variant="outlined" id="button" onClick={onSubmit} disabled={isLoading ? true: false}>
            Generate my plan
          </Button>
        </Box>
        <Box>
        <Typography variant="body1">
          {isLoading && 
          <LoadingAnimation />}
          {displayResult && 
            <>
              <Typography variant="h4">
                AI Explaination:
              </Typography>
              {text}
            </>
          }
        </Typography>
        </Box>
      </Stack>
      
      

    </div>

  );
}

export default App;
