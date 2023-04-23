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

function App() {
  const [major, setMajor] = React.useState("");
  const [units, setUnits] = React.useState(0);
  const [quarters, setQuarters] = React.useState(0);
  const [difficulty, setDifficulty] = React.useState("");

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
    // call fetch api backend and send post request with json in body
    // const request = {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(info),
    // };

    // // replace this
    // fetch("https://reqres.in/api/posts", request)
    //   .then((response) => response.json())
    //   .then((data) => console.log(data))
    //   .catch((error) => console.error(error));

    const url = '/generate'; // replace with your endpoint URL
    const data = info; // { username: 'foo', password: 'bar' }; // replace with your JSON data
    
    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(data => {
        
        data = JSON.stringify(data);
        console.log("got data:");
        console.log(typeof data);
        console.log(data);

        const json_str = data.match(/\{[\s\S]*\}/)[0];
        console.log(json_str);
        const schedule = JSON.parse(json_str);
        console.log(schedule);
        const explanation = data.split("Explanation:")[1].trim();

        // console.dir(schedule);
        console.log(explanation);
    
      })
      .catch(error => console.error(error));
    
  };

  return (
    <div className="App">
      <Stack direction="column" spacing={2}>
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
          <Button variant="outlined" id="button" onClick={onSubmit}>
            Generate my plan
          </Button>
        </Box>
      </Stack>
    </div>
  );
}

export default App;
