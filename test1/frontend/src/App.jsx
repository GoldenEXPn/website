// import logo from './logo.svg';
// import "./App.css";
import React, { useEffect } from "react";

import {
  createBrowserRouter,
  RouterProvider,
  // Route,
} from "react-router-dom";

import Home from "./components/logged out/Home";
import News from "./components/logged out/News";
import FadeWrapper from "./components/wrappers/FadeWrapper";
import LandingLayout from "./Layout/out layout/LandingLayout";
import AppLayout from "./Layout/in layout/AppLayout";
//TODO: split this main into different pages.


const AppRouter = () => {
  // const { isLoggedIn } = useAuth();

  const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingLayout />,
    children: [
      {
        path: "",
        element: (
          <FadeWrapper>
            <Home />
          </FadeWrapper>
        ),
        index: true,
      },
      {
        path: "news",
        element: (
          <FadeWrapper>
            <News />
          </FadeWrapper>
        ),
      },
    ],
  },
  {
    path: "/app",
    element: <AppLayout />,

    // this should match the drawer content
    children: [
      {
        path: "home",
        element: (
          <FadeWrapper>
            {/* <DashBoard /> */}
          </FadeWrapper>
        ),
        index: true,
      },
      {
        path: "setting",
        element: (
          <FadeWrapper>

            {/* TODO: change this to settings */}
            <News />
          </FadeWrapper>
        ),
      },
    ],
  },
]);


  return <RouterProvider router={router} />;
};

const App = () => {


  useEffect(() => {
    // Function to update CSS variables
    const updateCSSVariables = () => {
      const documentWidth = window.innerWidth;
      document.documentElement.style.setProperty('--document-width', `${documentWidth}px`);
    };

    // Initial update
    updateCSSVariables();

    // Update on window resize
    window.addEventListener('resize', updateCSSVariables);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener('resize', updateCSSVariables);
    };
  }, []);


  return (
    <AppRouter />
    // <div id="wrapper" className="fade-in">
    //   <ThemeProvider theme={theme}>
    //     <CssBaseline />
    //     <Header />
    //     <Main />
    //     <Footer />
    //     <CopyRight />
    //   </ThemeProvider>
    // </div>

  );
};

export default App;
