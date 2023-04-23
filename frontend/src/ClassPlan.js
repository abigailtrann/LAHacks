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

export default function ClassPlan() {
  return (
    <div className="Overall">
      <Stack spacing={4}>
        <Box marginTop={15}>
          <Typography variant="h2" align="center">
            Your Current Plan
          </Typography>
        </Box>
        <Box>
          <TableContainer component={Paper} align="center">
            <Table aria-label="simple table"></Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontSize: 30 }} size="small">
                  Quarter
                </TableCell>
                <TableCell sx={{ fontSize: 30 }}>Class 1</TableCell>
                <TableCell sx={{ fontSize: 25 }}>Professor</TableCell>
                <TableCell sx={{ fontSize: 25 }}>Units</TableCell>
                <TableCell sx={{ fontSize: 30 }}>Class 2</TableCell>
                <TableCell sx={{ fontSize: 25 }}>Professor</TableCell>
                <TableCell sx={{ fontSize: 25 }}>Units</TableCell>
                <TableCell sx={{ fontSize: 30 }}>Class 3</TableCell>
                <TableCell sx={{ fontSize: 25 }}>Professor</TableCell>
                <TableCell sx={{ fontSize: 25 }}>Units</TableCell>
                <TableCell sx={{ fontSize: 30 }}>Class 4</TableCell>
                <TableCell sx={{ fontSize: 25 }}>Professor</TableCell>
                <TableCell sx={{ fontSize: 25 }}>Units</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((row) => (
                <TableRow key={row.class_1}>
                  <TableCell sx={{ fontSize: 25 }}>{row.quarter}</TableCell>
                  <TableCell sx={{ fontSize: 25 }}>
                    {row.class_1.name}
                  </TableCell>
                  <TableCell sx={{ fontSize: 25 }}>
                    {row.class_1.professor}
                  </TableCell>
                  <TableCell sx={{ fontSize: 25 }}>
                    {row.class_1.units}
                  </TableCell>
                  <TableCell sx={{ fontSize: 25 }}>
                    {row.class_2.name}
                  </TableCell>
                  <TableCell sx={{ fontSize: 25 }}>
                    {row.class_2.professor}
                  </TableCell>
                  <TableCell sx={{ fontSize: 25 }}>
                    {row.class_2.units}
                  </TableCell>
                  <TableCell sx={{ fontSize: 25 }}>
                    {row.class_3.name}
                  </TableCell>
                  <TableCell sx={{ fontSize: 25 }}>
                    {row.class_2.professor}
                  </TableCell>
                  <TableCell sx={{ fontSize: 25 }}>
                    {row.class_2.units}
                  </TableCell>
                  <TableCell sx={{ fontSize: 25 }}>
                    {row.class_4.name}
                  </TableCell>
                  <TableCell sx={{ fontSize: 25 }}>
                    {row.class_4.professor}
                  </TableCell>
                  <TableCell sx={{ fontSize: 25 }}>
                    {row.class_4.units}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </TableContainer>
        </Box>
        <Box>
          <Typography
            variant="h5"
            marginLeft={20}
            marginRight={20}
            marginTop={5}
            marginBottom={10}
          >
            There are several benefits to taking the course schedule I provided:
            Solid foundation in computer science fundamentals: The first-year
            courses provide a strong foundation in computer science fundamentals
            such as programming, data structures, algorithms, and computer
            systems. These courses prepare students for more advanced topics in
            later years. Broad exposure to different areas of computer science:
            The second-year courses provide exposure to a range of areas within
            computer science such as computer networks, software engineering,
            and artificial intelligence. This allows students to explore
            different areas and discover their interests. In-depth study of
            specialized topics: The third-year courses dive deeper into
            specialized topics such as operating systems, distributed systems,
            and machine learning. These courses provide a more in-depth
            understanding of specific areas within computer science. Preparation
            for a career in computer science: The fourth-year courses, including
            the senior capstone project and seminar, prepare students for a
            career in computer science by providing hands-on experience working
            on a real-world project and developing communication and
            presentation skills. In terms of why I arranged the classes in this
            order, I followed a logical progression from foundational courses to
            more specialized topics. The first year focuses on building a solid
            foundation in computer science fundamentals, while the second year
            provides exposure to a broad range of areas within computer science.
            In the third year, students dive deeper into specialized topics, and
            in the fourth year, they apply their knowledge to a real-world
            project and prepare for a career in computer science. Additionally,
            the order of the courses was designed to ensure that students have
            the necessary prerequisites for more advanced courses.
          </Typography>
        </Box>
      </Stack>
    </div>
  );
}

const tableData = [
  {
    quarter: "Fall 2023",
    class_1: {
      name: "OC",
      units: 4,
      professor: "Dr. Johnson",
    },
    class_2: {
      name: "SA",
      units: 5,
      professor: "Dr. Lee",
    },
    class_3: {
      name: "NA",
      units: 4,
      professor: "Dr. Patel",
    },
    class_4: {
      name: "EU",
      units: 5,
      professor: "Dr. Kim",
    },
  },
  {
    quarter: "Winter 2023",
    class_1: {
      name: "EU",
      units: 4,
      professor: "Dr. Wang",
    },
    class_2: {
      name: "NA",
      units: 5,
      professor: "Dr. Rodriguez",
    },
    class_3: {
      name: "NA",
      units: 4,
      professor: "Dr. Nguyen",
    },
    class_4: {
      name: "NA",
      units: 4,
      professor: "Dr. Smith",
    },
  },
  {
    quarter: "Winter 2023",
    class_1: {
      name: "NA",
      units: 5,
      professor: "Dr. Martinez",
    },
    class_2: {
      name: "SA",
      units: 4,
      professor: "Dr. Chen",
    },
    class_3: {
      name: "NA",
      units: 4,
      professor: "Dr. Singh",
    },
    class_4: {
      name: "AS",
      units: 5,
      professor: "Dr. Brown",
    },
  },
  {
    quarter: "Summer 2023",
    class_1: {
      name: "NA",
      units: 5,
      professor: "Dr. Davis",
    },
    class_2: {
      name: "AF",
      units: 4,
      professor: "Dr. Wilson",
    },
    class_3: {
      name: "OC",
      units: 4,
      professor: "Dr. Patel",
    },
    class_4: {
      name: "OC",
      units: 5,
      professor: "Dr. Lee",
    },
  },
  {
    quarter: "Fall 2024",
    class_1: {
      name: "NA",
      units: 5,
      professor: "Dr. Garcia",
    },
    class_2: {
      name: "AS",
      units: 4,
      professor: "Dr. Nguyen",
    },
    class_3: {
      name: "AS",
      units: 5,
      professor: "Dr. Martinez",
    },
    class_4: {
      name: "NA",
      units: 4,
      professor: "Dr. Wilson",
    },
  },
  {
    quarter: "Fall 2024",
    class_1: {
      name: "NA",
      units: 5,
      professor: "Dr. Garcia",
    },
    class_2: {
      name: "AS",
      units: 4,
      professor: "Dr. Nguyen",
    },
    class_3: {
      name: "AS",
      units: 5,
      professor: "Dr. Martinez",
    },
    class_4: {
      name: "NA",
      units: 4,
      professor: "Dr. Wilson",
    },
  },
  {
    quarter: "Fall 2024",
    class_1: {
      name: "NA",
      units: 5,
      professor: "Dr. Garcia",
    },
    class_2: {
      name: "AS",
      units: 4,
      professor: "Dr. Nguyen",
    },
    class_3: {
      name: "AS",
      units: 5,
      professor: "Dr. Martinez",
    },
    class_4: {
      name: "NA",
      units: 4,
      professor: "Dr. Wilson",
    },
  },
  {
    quarter: "Fall 2024",
    class_1: {
      name: "NA",
      units: 5,
      professor: "Dr. Garcia",
    },
    class_2: {
      name: "AS",
      units: 4,
      professor: "Dr. Nguyen",
    },
    class_3: {
      name: "AS",
      units: 5,
      professor: "Dr. Martinez",
    },
    class_4: {
      name: "NA",
      units: 4,
      professor: "Dr. Wilson",
    },
  },
];
