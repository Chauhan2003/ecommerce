import React, { useState } from 'react'
import Layout from '../components/Layout'
import { Box, Button, TextField, Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const ForgetPassword = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleForgetPassword = async (e) => {
        e.preventDefault();
        const data = {
            email: email
        }
        try {
            const res = await axios.post('http://localhost:8000/api/v1/user/forgetpassword', data);
            toast.success(res.data.message);
            navigate('/login');
        } catch (err) {
            toast.error(err.response.data.message);
        }
    }
    return (
        <Layout title={'Forget Password'}>
            <Box sx={{
                width: '100%',
                height: '70vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Box
                    sx={{
                        margin: '20px 0',
                        minWidth: '400px',
                        padding: '10px',
                        width: '400px',
                        display: 'flex',
                        gap: '10px',
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
                        <Button
                            variant="contained"
                            sx={{
                                height: '50px',
                                width: '100%',
                                fontWeight: '600',
                                fontSize: '20px',
                            }}
                            onClick={handleForgetPassword}
                        >
                            Forget Password
                        </Button>
                    </Box>
                    <Typography marginTop={1}>
                        Go back to{' '}
                        <Link to="/login" className="underline text-blue-700">
                            Login
                        </Link>
                    </Typography>
                </Box>
            </Box>
        </Layout>
    )
}

export default ForgetPassword
