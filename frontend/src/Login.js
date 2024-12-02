// src/Login.js
import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

const Login = () => {
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        // Send token to backend
        const res = await axios.post('http://localhost:8000/api/auth/google/', {
          token: tokenResponse.access_token,
        });
        // Store backend's auth token (JWT) in localStorage or cookies
        localStorage.setItem('authToken', res.data.token);
      } catch (err) {
        console.error(err);
      }
    },
    onError: (error) => console.error('Login Failed:', error),
    scope: 'openid email profile https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/gmail.metadata',
  });

  return <button onClick={() => login()}>Sign in with Google</button>;
};

export default Login;
