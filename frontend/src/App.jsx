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

import AppLayout from "./Layout/in layout/AppLayout.js";
// import AppLayout from "./Layout/in layout/AppLayout";

// import Auth from "./pages/auth/Auth";
// import DashBoard from "./pages/"
import { handleGoogleCallback, Loader } from "./loader.js";

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
      path: "/app",
      loader: handleGoogleCallback,
      element: <AppLayout />,

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

// class App extends React.Component {
//   state = {details:[], }

//   componentDidMount() {
//     let data;
//     axios.get(address)
//       .then(res => {
//         data = res.data;
//         this.setState({
//           details: data
//         });
//       }).catch(err => {})

//       const updateCSSVariables = () => {
//         const documentWidth = window.innerWidth;
//         document.documentElement.style.setProperty('--document-width', `${documentWidth}px`);
//       };
//       updateCSSVariables();

//       window.addEventListener('resize', updateCSSVariables);

//     // Cleanup on component unmount
//     this.cleanup = () => {
//       window.removeEventListener('resize', updateCSSVariables);
//     };
//   }

//   componentWillUnmount() {
//     // Cleanup event listener
//     if (this.cleanup) this.cleanup();
//   }
//   render() {
//     return (
//       <>
//         <AppRouter />
//         <div>
//           <h1>Testing: React & Django Integration</h1>
//           {this.state.details.length > 0 ? (
//             this.state.details.map((output, index) => (
//               <div key={index}>
//                 <h3>{"Title: " + output.email_title}</h3>
//                 <p>{"Content: " + output.content}</p>
//               </div>
//             ))
//           ) : (
//             <p>No data available</p>
//           )}
//         </div>
//       </>
//     )
//   }
// }
