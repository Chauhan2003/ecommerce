import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Box, Button, TextField } from '@mui/material';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();
    const { id, token } = useParams();

    const handleUpdatePassword = async (e) => {
        e.preventDefault();
        if (password !== confirmpassword) {
            toast.error('Passwords do not match!');
            return;
        }

        const data = {
            password: password
        }

        try {
            const res = await axios.put(`http://localhost:8000/api/v1/user/resetpassword/${id}/${token}`, data)
            navigate('/login');
            toast.success(res.data.message);
        } catch (err) {
            toast.error(err.response.data.message);
        }
    }

    return (
        <Layout title={'Reset Password'}>
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
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            label="New Password"
                            type="password"
                            sx={{
                                width: '100%',
                            }}
                        />
                        <TextField
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            label="Confirm Password"
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
                            onClick={handleUpdatePassword}
                        >
                            Change Password
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Layout>
    );
}

export default ResetPassword;