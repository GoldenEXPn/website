import Header from "./Header";
import Footer from "./Footer";
import theme from "../../asset/styles/theme"

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
// import Container from '@mui/material/Container';

import { Outlet } from 'react-router-dom';

const HomeLayout = () => {
    return (
      <div id="wrapper" className="fade-in">
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Header />
          <Outlet/>
          <Footer />
        </ThemeProvider>
      </div>
    );
  };

export default HomeLayout;