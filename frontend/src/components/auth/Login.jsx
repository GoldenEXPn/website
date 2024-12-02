import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import LoginIcon from "@mui/icons-material/Login";
import { useNavigate } from 'react-router-dom';
import api from '../../api';
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../../constants";

const Login = () => {

    const navigate = useNavigate();

    const login = useGoogleLogin({
      onSuccess: async (tokenResponse) => {
        try {
          // Send the token to your backend for further processing
          const response = await api.post('/api/google-auth/', {
            token: tokenResponse.access_token,
          });

          localStorage.setItem(ACCESS_TOKEN, response.data.jwt);

          navigate('/app');

          console.log('Login success, backend response:', response.data);
        } catch (error) {
          console.error('Failed to send token to backend:', error);
        }
      },
      onError: (error) => console.error('Google login failed:', error),
    });

    return (
        <button onClick={login} className="text-sm font-semibold leading-6 text-gray-900">
          {"Sign in "}
          <LoginIcon/>
        </button>
      );

}

export default Login;