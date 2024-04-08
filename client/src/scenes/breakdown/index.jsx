import React from 'react';
import { Box } from "@mui/material";
import Header from 'components/Header';
import BreakdownChart from "components/BreakdownChart";



const Breakdown = () => {
  return (
    <Box mt="2rem" ml="1rem" mr="2rem">
        <Header title="BREAKDOWN" subtitle="Breakdown of Sales By Category" />
            <Box height="75vh" mt="40px"> 
                 <BreakdownChart />
            </Box>
    </Box>
  )
};

export default Breakdown;