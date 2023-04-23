import "./ClassPlan.css";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography, Box, Stack } from "@mui/material";
import { useLocation } from "react-router-dom";

export default function ClassPlan(props) {
  const location = useLocation();
  console.log("location", location);
  const explaination = location.state?.explaination || "";

  const schedule = location.state?.schedule || [];
  console.log("keys schedule", Object.keys(schedule));
  return (
    <div className="Overall">
      <Stack spacing={4} className="classplan-stack">
        <Box marginTop={15}>
          <Typography variant="h2" align="center">
            Your Current Plan
          </Typography>
        </Box>
        <Box>
          {Object.keys(schedule).map((key) => {
            const courses = schedule[key];
            console.log("courses", courses);
            return (
              <>
                <Typography variant="h3" className="quarted-typo">{key}</Typography>
                <TableContainer
                  component={Paper}
                  align="center"
                  className="classpath-table"
                >
                  <Table aria-label="simple table"></Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontSize: 30 }}>Class</TableCell>
                      <TableCell sx={{ fontSize: 30 }}>Professor</TableCell>
                      <TableCell sx={{ fontSize: 30 }}>Units</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {courses.map((course) => (
                      <TableRow key={course.name}>
                        <TableCell sx={{ fontSize: 25 }}>
                          {course.name}
                        </TableCell>
                        <TableCell sx={{ fontSize: 25 }}>
                          {course.prof}
                        </TableCell>
                        <TableCell sx={{ fontSize: 25 }}>
                          {course.units}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </TableContainer>
              </>
            );
          })}
        </Box>

        <Box>
          <Typography
            variant="h5"
            marginLeft={5}
            marginRight={5}
            marginTop={5}
            marginBottom={10}
          >
            <Typography variant="h4">AI Explaination:</Typography>
            {explaination}
          </Typography>
        </Box>
      </Stack>
    </div>
  );
}
