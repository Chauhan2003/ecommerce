import React, { useEffect, useState } from 'react'
import { Box, CircularProgress, Typography } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'

const Spinner = () => {
    const [count, setCount] = useState(5);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((prevValue) => --prevValue);
        }, 1000);

        count === 0 && navigate('/login', {
            state: location.pathname
        });
        return () => clearInterval(interval);
    }, [count, navigate, location]);
    return (
        <Box sx={{
            width: '100%',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '20px'
        }}>
            <Box>
                <Typography fontSize={20}>Redirecting to you in {count} seconds</Typography>
            </Box>
            <Box>
                <CircularProgress />
            </Box>
        </Box>
    )
}

export default Spinner
