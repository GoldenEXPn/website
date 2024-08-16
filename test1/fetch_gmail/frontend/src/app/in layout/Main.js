import React from "react";
import { Outlet } from 'react-router-dom';
import { Box } from "@mui/system";
function Main() {
  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Outlet/>
    </Box>
    // <div id="main" className="h-full w-full">
       
    // </div>
  );
}

export default Main;
