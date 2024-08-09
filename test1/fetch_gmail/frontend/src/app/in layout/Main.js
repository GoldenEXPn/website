import React from "react";
import { Outlet } from 'react-router-dom';

function Main() {
  return (
    <div id="main" className="h-full w-full">
       <Outlet/>
    </div>
  );
}

export default Main;
