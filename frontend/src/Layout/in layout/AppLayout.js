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
import { TokenProvider, useToken } from "../../components/elements/TokenContext";

const HomeLayout = () => {
  console.log("AppLayout rendered");
  const data = useLoaderData();
  useToken(data)
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (data?.token) {
  //     // Store token or pass it to other pages, e.g., navigating with state
  //     navigate("/app", { state: { token: data.token } });
  //   }
  // }, [data, navigate]);

  return (
    <div
      id="wrapper"
      className="relative flex h-screen justify-center items-center app fade-in"
    >
      <TokenProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Bars />
          <Main />
        </ThemeProvider>
      </TokenProvider>
    </div>
  );
};

export default HomeLayout;
