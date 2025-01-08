import React from "react";
import { Outlet } from 'react-router-dom';
import { Box } from "@mui/system";
import { Toolbar, Container } from "@mui/material";

function Main() {
  return (
    <Box component="main" sx={{ flexGrow: 1, height: '100%', overflow: 'auto'}}>
      <Toolbar />
      <Container maxWidth="large" sx={{ mt: 4, mb: 4 }}>
        <Outlet/>
      </Container>
    </Box>
    // <div id="main" className="h-full w-full">
       
    // </div>
  );
}

export default Main;
