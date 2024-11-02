//TODO: should I combine both main?
//TODO: should I combine themeprovider?
import React, { useEffect } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import Main from "./Main";
import Bars from "./Bars";
import theme from "../../asset/styles/theme";

// import Menu from "./Menu";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {
  TokenProvider,
  useToken,
} from "../../components/elements/TokenContext";

const HomeLayout = () => {
  const { token, setToken } = useToken();
  console.log("AppLayout rendered");
  const data = useLoaderData();
  const navigate = useNavigate();
  
  console.log(data)
  // useEffect(() => {
  //   if (data?.token) {
  //     // Set token in context
  //     setToken(data.token);

  //     // Navigate to the app with the token in state
  //     // navigate("/app", { state: { token: data.token } });
  //   }
  // }, [data, setToken]);
  // const navigate = useNavigate();


  return (
    <div
      id="wrapper"
      className="relative flex h-screen justify-center items-center app fade-in"
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Bars />
        <Main />
      </ThemeProvider>
    </div>
  );
};

export default HomeLayout;
