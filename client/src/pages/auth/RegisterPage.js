import React, { useState } from 'react';
import { Avatar, Box, Button, IconButton, TextField, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

import Layout from '../../components/Layout';

const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();

        if (password !== cpassword) {
            toast.error('Passwords do not match!');
            return;
        }

        const data = {
            name,
            email,
            password,
            phone,
            address,
        };

        try {
            const res = await axios.post(`http://localhost:8000/api/v1/user/register`, data);
            console.log(res.data);
            toast.success(res.data.message);
        } catch (err) {
            toast.error(err.response.data.message);
        }
    };

    return (
        <Layout>
            <Box
                sx={{
                    width: '100%',
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
                            onChange={(e) => setName(e.target.value)}
                            required
                            label="Name"
                            type="text"
                            variant="outlined"
                            sx={{ width: '100%' }}
                        />
                        <TextField
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            label="Email"
                            type="email"
                            variant="outlined"
                            sx={{ width: '100%' }}
                        />
                        <TextField
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            label="Password"
                            type="password"
                            sx={{ width: '100%' }}
                        />
                        <TextField
                            onChange={(e) => setCPassword(e.target.value)}
                            required
                            label="Confirm Password"
                            type="password"
                            sx={{ width: '100%' }}
                        />
                        <TextField
                            onChange={(e) => setPhone(e.target.value)}
                            required
                            label="Phone"
                            type="number"
                            variant="outlined"
                            sx={{ width: '100%' }}
                        />
                        <TextField
                            onChange={(e) => setAddress(e.target.value)}
                            required
                            label="Address"
                            multiline
                            maxRows={2}
                            sx={{ width: '100%' }}
                        />
                        <Button
                            variant="contained"
                            sx={{
                                height: '50px',
                                width: '100%',
                                fontWeight: '600',
                                fontSize: '20px',
                            }}
                            onClick={handleRegister}
                        >
                            Register
                        </Button>
                    </Box>
                    <Typography>
                        Already have an account? <Link to="/login" className="underline text-blue-700">Login</Link>
                    </Typography>
                </Box>
            </Box>
        </Layout>
    );
};

export default RegisterPage;
