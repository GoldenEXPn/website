// import logo from './logo.svg';
// import "./App.css";

/*
  dependable on the local address of the rest framework (backend location to get the logic)

  TODO: how to refresh everytime I make a submit post action
**/

import React, { useEffect } from "react";

import {
  createBrowserRouter,
  RouterProvider,
  // Route,
} from "react-router-dom";

// import

import Home from "./pages/out/home/index";
import News from "./pages/out/news/News";

import FadeWrapper from "./components/wrappers/FadeWrapper";
import LandingLayout from "./Layout/out layout/LandingLayout";
import { TokenProvider } from "./components/elements/TokenContext.js";
import AppLayout from "./Layout/in layout/AppLayout.js";

import{ handleGoogleCallback } from "./handleGoogleCallback";
import Loader from "./components/elements/Loader";

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
    // {
    //     path: "/google/callback",

    //     element: <Loader />,
    // },
    {
      path: "/google/callback",
      loader: handleGoogleCallback,
      element: <Loader />,
    },
    {
      path: "/app",
      element: (
        <TokenProvider>
          <AppLayout />
        </TokenProvider>
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
