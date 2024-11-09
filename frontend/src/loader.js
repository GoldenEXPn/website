import "./index.css";
import { json, redirect, useLoaderData, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { useToken } from "./components/elements/TokenContext";


// Exchange callback's code for JWT tokens
export const handleGoogleCallback = async ({ request }) => {

  console.log('Handling Google Callback');

  const url = new URL(request.url);
  const code = url.searchParams.get("code");

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

      if (jwtData) {
        // Return token to be accessed by userLoaderData()
        return json({ token: jwtData });
      } else {
        // Redirect to home page if no token is returned
        return redirect("/");
      }
    } catch (err) {
      console.error(err);
      throw new Response("Bad request", { status: 400 });
    }
  }
  throw new Response("Not Found", { status: 404 });
};

export const Loader = () => {
  const data = useLoaderData();
  const navigate = useNavigate();
  const { setToken } = useToken();

  useEffect(() => {
    if (data?.token) {
      // Store token in context
      setToken(data.token);

      // Navigate to the app
      navigate("/app");
    } else{
      // Redirect if no token
        navigate("/");
    }
  }, [data, navigate, setToken]);

  return <div>Loading...</div>;
};
