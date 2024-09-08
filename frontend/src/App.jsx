// import logo from './logo.svg';
// import "./App.css";


/*
  dependable on the local address of the rest framework (backend location to get the logic)

  TODO: how to refresh everytime I make a submit post action
**/
import axios from 'axios';

import React, { useEffect } from "react";

import { AppRouter } from './routes';

const address = 'http://localhost:8000'

class App extends React.Component {
  state = {details:[], }


  componentDidMount() {
    let data;
    axios.get(address)
      .then(res => {
        data = res.data;
        this.setState({
          details: data
        });
      }).catch(err => {})

      const updateCSSVariables = () => {
        const documentWidth = window.innerWidth;
        document.documentElement.style.setProperty('--document-width', `${documentWidth}px`);
      };
      updateCSSVariables();

      window.addEventListener('resize', updateCSSVariables);

    // Cleanup on component unmount
    this.cleanup = () => {
      window.removeEventListener('resize', updateCSSVariables);
    };
  }

  componentWillUnmount() {
    // Cleanup event listener
    if (this.cleanup) this.cleanup();
  }
  render() {
    return (
      <>
        <AppRouter />
        <div>
          <h1>Testing: React & Django Integration</h1>
          {this.state.details.length > 0 ? (
            this.state.details.map((output, index) => (
              <div key={index}>
                <h3>{"Title: " + output.email_title}</h3>
                <p>{"Content: " + output.content}</p>
              </div>
            ))
          ) : (
            <p>No data available</p>
          )}
        </div>
      </>
    )
  }
}
// const App = () => {

//   useEffect(() => {
//     // Function to update CSS variables
//     const updateCSSVariables = () => {
//       const documentWidth = window.innerWidth;
//       document.documentElement.style.setProperty('--document-width', `${documentWidth}px`);
//     };
//     // Initial update
//     updateCSSVariables();

//     // Update on window resize
//     window.addEventListener('resize', updateCSSVariables);

//     // Cleanup on component unmount
//     return () => {
//       window.removeEventListener('resize', updateCSSVariables);
//     };
//   }, []);

//   return (
//     <AppRouter />
//   );
// };

export default App;
