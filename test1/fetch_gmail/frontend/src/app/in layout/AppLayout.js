//TODO: should I combine both main?
//TODO: should I combine themeprovider?


import Main from "./Main";
import Menu from "./Menu";
import Bars from "./Bars";
import theme from "../../asset/styles/theme"

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";


const HomeLayout = () => {
    return (
      <div id="wrapper" className="fade-in">
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Bars />
          <Menu />
          <Main />
        </ThemeProvider>
      </div>
    );
  };

export default HomeLayout;