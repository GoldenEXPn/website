import "./index.css";
import { json, redirect, useLoaderData, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { useToken } from "./components/elements/TokenContext";

export const handleGoogleCallback = async ({ request }) => {
  // Exchange callback's code for JWT tokens
  // const { token, setToken } = useToken();

  console.log('Handling Google Callback');

  // const { token, setToken } = useToken();

  const url = new URL(request.url);
  const code = url.searchParams.get("code");

  // if (token.token) {
  //   return redirect("/app");
  // }

  // console.log(token)

  if (code) {
    try {
      const response = await fetch(
        "http://localhost:8000/api/v1/auth/google/",
        {
          method: "POST",
          body: JSON.stringify({ code }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const jwtData = await response.json();
      // console.log(jwtData);

      if (jwtData) {
        // Return the token so that it can be accessed in the component
        return json({ token: jwtData });
      } else {
        // Redirect if token isn't found in response
        return redirect("/");
      }
    } catch (err) {
      console.error(err);
      throw new Response("Bad request", { status: 400 });
    }
  }
  throw new Response("Not Found", { status: 404 });
};

// export const Loader = () => {
//   const data = useLoaderData();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (data?.token) {
//       // Store token or pass it to other pages, e.g., navigating with state
//       navigate("/app", { state: { token: data.token } });
//     }
//   }, [data, navigate]);

//   return <div>Loading...</div>;
// };
