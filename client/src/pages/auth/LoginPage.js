import React, { useContext, useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import Layout from '../../components/Layout';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const naviagate = useNavigate()
  const [user, setUser] = useAuth();
  const location = useLocation();

  const handleLogin = async (e) => {
    e.preventDefault();

    const data = {
      email,
      password,
    };

    try {
      const res = await axios.post(`http://localhost:8000/api/v1/user/login`, data);
      setUser({
        ...user,
        user: res.data.user,
        token: res.data.token
      })
      localStorage.setItem('user', JSON.stringify(res.data));
      naviagate(location.state || '/');
      toast.success(res.data.message)
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <Layout>
      <Box
        sx={{
          width: '100%',
          height: '70vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            margin: '20px 0',
            minWidth: '400px',
            padding: '10px',
            width: '400px',
            display: 'flex',
            gap: '15px',
            flexDirection: 'column',
          }}
        >
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              gap: '15px',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <TextField
              onChange={(e) => setEmail(e.target.value)}
              required
              label="Email"
              type="email"
              variant="outlined"
              sx={{
                width: '100%',
              }}
            />
            <TextField
              onChange={(e) => setPassword(e.target.value)}
              required
              label="Password"
              type="password"
              sx={{
                width: '100%',
              }}
            />
            <Button
              variant="contained"
              sx={{
                height: '50px',
                width: '100%',
                fontWeight: '600',
                fontSize: '20px',
              }}
              onClick={handleLogin}
            >
              Login
            </Button>
          </Box>
          <Box>
            <Link to="/forgetpassword" className="underline text-blue-700">Forget Password</Link>
            <Typography marginTop={1}>
              Don't have an account?{' '}
              <Link to="/register" className="underline text-blue-700">
                Register
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default Login;
