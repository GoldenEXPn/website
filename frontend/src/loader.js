import './index.css';
import { redirect } from 'react-router-dom';
import React from 'react';

export const handleGoogleCallback = async ({ request }) => {
    // Exchange callback's code for JWT tokens
  
    const url = new URL(request.url);
    const code = url.searchParams.get('code');
  
    if (code) {
      try {
        const response = await fetch('http://localhost:8000/api/v1/auth/google/', {
          method: 'POST',
          body: JSON.stringify({ code }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        const jwtData = await response.json();
        console.log(jwtData);
  
        return redirect('/app');
      } catch (err) {
        redirect('/')
        console.error(err);
        throw new Response('Bad request', { status: 400 });
      }
    }

    redirect('/')
    throw new Response('Not Found', { status: 404 });
  };


  export const Loader = () => {
    return (
      <div>
        yep
      </div>
    )
  }