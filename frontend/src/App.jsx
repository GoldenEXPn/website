// import logo from './logo.svg';
// import "./App.css";

/*
  dependable on the local address of the rest framework (backend location to get the logic)

  TODO: how to refresh everytime I make a submit post action
**/


/* 
  there is a difference between RouterProvider and BrowserRouter that
  RouterProvider allows loader functions between different routes, but 
  BrowerRouter is more simplistic
*/
import React, { useEffect } from "react";

import {
  createBrowserRouter,
  RouterProvider,
  // Route,
} from "react-router-dom";

// import

import Home from "./pages/out/home/index";
import News from "./pages/out/news/News.jsx";

import FadeWrapper from "./components/wrappers/FadeWrapper.jsx";
import LandingLayout from "./Layout/out layout/LandingLayout.jsx";
import AppLayout from "./Layout/in layout/AppLayout";

// import Auth from "./pages/auth/Auth";
// import DashBoard from "./pages/"
import { GoogleCallback, handleGoogleCallback} from "./loader.jsx";

const App = () => {
  useEffect(() => {
    // Function to update CSS variables
    const updateCSSVariables = () => {
      const documentWidth = window.innerWidth;
      document.documentElement.style.setProperty(
        "--document-width",
        `${documentWidth}px`
      );
    };
    // Initial update
    updateCSSVariables();

    // Update on window resize
    window.addEventListener("resize", updateCSSVariables);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener("resize", updateCSSVariables);
    };
  }, []);

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
              {/* <News /> */}
              <div>yep</div>
            </FadeWrapper>
          ),
        },
      ],
    },
    {
      path: "/auth/callback",
      element: <GoogleCallback />,  // Display something while processing the callback
      loader: handleGoogleCallback,
    },
    {
      path: "/app",
      element: (
          <AppLayout />
      ),

      // this should match the drawer content
      children: [
        {
          path: "",
          element: (
            <FadeWrapper>
              <div>yep</div>
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

export default App;
