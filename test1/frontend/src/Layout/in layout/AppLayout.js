//TODO: should I combine both main?
//TODO: should I combine themeprovider?


import Main from "./Main";
import Bars from "./Bars";
import theme from "../../asset/styles/theme"

// import Menu from "./Menu";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";


const HomeLayout = () => {
    return (
      <div id="wrapper" className="relative flex h-screen justify-center items-center app fade-in">
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Bars />
          <Main />
        </ThemeProvider>
      </div>
    );
  };

export default HomeLayout;