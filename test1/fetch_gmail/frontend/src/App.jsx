// import logo from './logo.svg';
// import "./App.css";
import React, { useEffect } from "react";

import {
  createBrowserRouter,
  RouterProvider,
  // Route,
} from "react-router-dom";

import Home from "./components/main out/Home";
import News from "./components/main out/News";
import FadeWrapper from "./components/wrappers/FadeWrapper";
import HomeLayout from "./app/out layout/HomeLayout";
import AppLayout from "./app/in layout/AppLayout";
//TODO: split this main into different pages.


const AppRouter = () => {
  // const { isLoggedIn } = useAuth();

  const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
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
    path: "/dashboard",
    element: <AppLayout />,
    children: [
      {
        path: "",
        element: (
          <FadeWrapper>
            {/* <DashBoard /> */}
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
